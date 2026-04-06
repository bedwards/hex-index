/**
 * Claude consolidation worker (issue #449).
 *
 * Consolidates up to 4 source articles reporting on the same story into
 * a single "by Brian Edwards" synthesis commentary. Runs AFTER the Qwen
 * 1-to-1 pipeline, on-demand from the unified Claude monitoring loop —
 * never on a launchctl schedule.
 *
 * CLI:
 *   tsx tools/editorial/consolidate.ts --dry-run
 *   tsx tools/editorial/consolidate.ts --apply
 *   tsx tools/editorial/consolidate.ts --apply --limit 3
 *   tsx tools/editorial/consolidate.ts --add-to <commentary_id> <source_id>
 *
 * The LLM synthesis step is hidden behind the CommentarySynthesizer
 * interface (see consolidate-helpers.ts). The default implementation
 * spawns `claude -p` as a subprocess. Tests inject a fake.
 */

import 'dotenv/config';
import { spawn } from 'child_process';
import { randomUUID } from 'crypto';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join, resolve } from 'path';
import type { Pool, PoolClient } from 'pg';
import type { CandidateGroup, QueryableDb } from './consolidation-candidates.js';
import { findConsolidationCandidates } from './consolidation-candidates.js';
import {
  type AffiliateLink,
  type CommentarySynthesizer,
  type SourceArticle,
  type SynthesisResult,
  type WikiLinkRow,
  buildRevisionPrompt,
  buildSynthesisPrompt,
  containsTrumpMention,
  makeStubSynthesizer,
  mergeAffiliateLinks,
  mergeWikipediaLinks,
  verifyCandidateGroup,
} from './consolidate-helpers.js';

// ── Types ───────────────────────────────────────────────────────────

type DbClient = Pool | PoolClient;

interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  author_name: string | null;
  publication_id: string;
  publication_name: string;
  original_url: string;
  rewritten_content_path: string | null;
  content_path: string | null;
  full_content_path: string | null;
  affiliate_links: AffiliateLink[] | null;
}

/** What a dry-run prints (and what mode A applies). */
export interface ConsolidationPlan {
  groupIndex: number;
  score: number;
  reasoning: string;
  sources: { id: string; title: string; publication: string }[];
  primarySourceId: string;
  synthesizedTitle: string;
  commentaryId: string;
  htmlPath: string;
}

// ── Default LLM implementation: `claude -p` subprocess ──────────────

/**
 * Run `claude -p "<prompt>"` and return stdout. Throws on non-zero exit.
 * The caller is expected to parse the JSON out of stdout.
 */
async function runClaudeCli(prompt: string): Promise<string> {
  return await new Promise<string>((resolvePromise, reject) => {
    const proc = spawn('claude', ['-p', prompt], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let out = '';
    let err = '';
    proc.stdout.on('data', (c: Buffer) => { out += c.toString(); });
    proc.stderr.on('data', (c: Buffer) => { err += c.toString(); });
    proc.on('error', reject);
    proc.on('close', (code) => {
      if (code === 0) { resolvePromise(out); }
      else { reject(new Error(`claude -p exited ${code}: ${err}`)); }
    });
  });
}

function parseSynthesisJson(stdout: string): SynthesisResult {
  // Claude may wrap JSON in prose; extract the first {...} block.
  const match = stdout.match(/\{[\s\S]*\}/);
  if (!match) { throw new Error(`no JSON object in claude output: ${stdout.slice(0, 200)}`); }
  const obj = JSON.parse(match[0]) as unknown;
  if (
    typeof obj !== 'object' || obj === null ||
    typeof (obj as Record<string, unknown>).title !== 'string' ||
    typeof (obj as Record<string, unknown>).html !== 'string' ||
    typeof (obj as Record<string, unknown>).primarySourceId !== 'string'
  ) {
    throw new Error('claude output missing required fields');
  }
  return obj as SynthesisResult;
}

/** Default synthesizer: shells out to `claude -p`. */
export function makeClaudeCliSynthesizer(): CommentarySynthesizer {
  return {
    async synthesizeCommentary(sources: SourceArticle[]): Promise<SynthesisResult> {
      const prompt = buildSynthesisPrompt(sources);
      const stdout = await runClaudeCli(prompt);
      const result = parseSynthesisJson(stdout);
      if (containsTrumpMention(result.title) || containsTrumpMention(result.html)) {
        throw new Error('synthesis violates no-Trump policy');
      }
      return result;
    },
    async reviseCommentary(existingTitle, existingHtml, sources, newSource) {
      const prompt = buildRevisionPrompt(existingTitle, existingHtml, sources, newSource);
      const stdout = await runClaudeCli(prompt);
      const result = parseSynthesisJson(stdout);
      if (containsTrumpMention(result.title) || containsTrumpMention(result.html)) {
        throw new Error('revision violates no-Trump policy');
      }
      return result;
    },
  };
}

// ── DB helpers ──────────────────────────────────────────────────────

async function loadArticleRows(
  db: DbClient,
  ids: string[],
): Promise<ArticleRow[]> {
  if (ids.length === 0) { return []; }
  const { rows } = await db.query<ArticleRow>(
    `SELECT a.id, a.title, a.slug, a.author_name,
            a.publication_id, p.name AS publication_name,
            a.original_url, a.rewritten_content_path,
            a.content_path, a.full_content_path,
            a.affiliate_links
       FROM app.articles a
       JOIN app.publications p ON p.id = a.publication_id
      WHERE a.id = ANY($1::uuid[])`,
    [ids],
  );
  return rows;
}

async function loadWikiLinks(db: DbClient, articleId: string): Promise<WikiLinkRow[]> {
  const { rows } = await db.query<WikiLinkRow>(
    `SELECT wikipedia_id, relevance_rank, topic_summary
       FROM app.article_wikipedia_links
      WHERE article_id = $1
      ORDER BY relevance_rank`,
    [articleId],
  );
  return rows;
}

async function countExistingSources(db: DbClient, commentaryId: string): Promise<number> {
  const { rows } = await db.query<{ count: string }>(
    `SELECT COUNT(*)::text AS count FROM app.commentary_sources
      WHERE commentary_article_id = $1`,
    [commentaryId],
  );
  return Number(rows[0]?.count ?? 0);
}

// ── Source loading (HTML from disk) ─────────────────────────────────

const LIBRARY_ROOT = resolve(process.cwd(), 'library');

async function rowToSourceArticle(row: ArticleRow): Promise<SourceArticle> {
  let rewritten = '';
  if (row.rewritten_content_path) {
    try {
      rewritten = await readFile(join(LIBRARY_ROOT, row.rewritten_content_path), 'utf-8');
    } catch {
      rewritten = '';
    }
  }
  let excerpt = '';
  const excerptPath = row.content_path ?? row.full_content_path;
  if (excerptPath) {
    try {
      const raw = await readFile(join(LIBRARY_ROOT, excerptPath), 'utf-8');
      excerpt = raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 1200);
    } catch {
      excerpt = '';
    }
  }
  return {
    id: row.id,
    title: row.title,
    author_name: row.author_name,
    publication_id: row.publication_id,
    publication_name: row.publication_name,
    original_url: row.original_url,
    rewritten_html: rewritten,
    excerpt,
  };
}

// ── Mode A: new consolidation ───────────────────────────────────────

export interface ModeAOptions {
  db: DbClient;
  synthesizer: CommentarySynthesizer;
  group: CandidateGroup;
  groupIndex: number;
  apply: boolean;
  libraryRoot?: string;
  /** Injectable source loader for tests. */
  loadSources?: (rows: ArticleRow[]) => Promise<SourceArticle[]>;
}

export async function runModeA(opts: ModeAOptions): Promise<ConsolidationPlan | null> {
  const { db, synthesizer, group, groupIndex, apply } = opts;

  const verdict = verifyCandidateGroup(group.articles);
  if (!verdict.ok) {
    console.warn(`  skip group ${groupIndex + 1}: ${verdict.reason}`);
    return null;
  }

  const rows = await loadArticleRows(db, group.articles.map((a) => a.id));
  if (rows.length !== group.articles.length) {
    console.warn(`  skip group ${groupIndex + 1}: could not load all rows`);
    return null;
  }

  // Idempotence: refuse to re-consolidate already-consolidated sources.
  const already = await db.query<{ id: string; consolidated_into: string | null }>(
    `SELECT id, consolidated_into FROM app.articles WHERE id = ANY($1::uuid[])
      AND (consolidated_into IS NOT NULL OR is_consolidated = true)`,
    [rows.map((r) => r.id)],
  );
  if (already.rows.length > 0) {
    console.warn(`  skip group ${groupIndex + 1}: already consolidated`);
    return null;
  }

  const loadSources = opts.loadSources ?? (async (rs) => Promise.all(rs.map(rowToSourceArticle)));
  const sources = await loadSources(rows);

  const synth = await synthesizer.synthesizeCommentary(sources);
  if (containsTrumpMention(synth.title) || containsTrumpMention(synth.html)) {
    throw new Error(`group ${groupIndex + 1}: synthesis violates no-Trump policy`);
  }

  const commentaryId = randomUUID();
  const htmlPath = join('rewritten', `consolidated-${commentaryId}.html`);

  const plan: ConsolidationPlan = {
    groupIndex,
    score: group.score,
    reasoning: group.reasoning,
    sources: rows.map((r) => ({
      id: r.id,
      title: r.title,
      publication: r.publication_name,
    })),
    primarySourceId: synth.primarySourceId,
    synthesizedTitle: synth.title,
    commentaryId,
    htmlPath,
  };

  if (!apply) { return plan; }

  // Apply: write HTML, insert commentary row, insert sources, mark
  // absorbed rows, merge wiki links + affiliate links.
  const libraryRoot = opts.libraryRoot ?? LIBRARY_ROOT;
  const absHtmlPath = join(libraryRoot, htmlPath);
  await mkdir(dirname(absHtmlPath), { recursive: true });
  await writeFile(absHtmlPath, synth.html, 'utf-8');

  const primaryRow =
    rows.find((r) => r.id === synth.primarySourceId) ?? rows[0];

  // Insert commentary article row. Slug derived from commentary id.
  const slug = `consolidated-${commentaryId.slice(0, 8)}`;
  await db.query(
    `INSERT INTO app.articles
       (id, publication_id, title, slug, original_url,
        rewritten_content_path, author_name,
        media_type, is_consolidated, affiliate_links)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'text', true, $8)`,
    [
      commentaryId,
      primaryRow.publication_id,
      synth.title,
      slug,
      `hex-index://consolidated/${commentaryId}`,
      htmlPath,
      'Brian Edwards',
      JSON.stringify([]),
    ],
  );

  // Insert commentary_sources rows.
  let position = 0;
  for (const row of rows) {
    const isPrimary = row.id === synth.primarySourceId;
    await db.query(
      `INSERT INTO app.commentary_sources
         (commentary_article_id, source_article_id, is_primary, position)
       VALUES ($1, $2, $3, $4)`,
      [commentaryId, row.id, isPrimary, position++],
    );
  }

  // Mark ALL sources (primary + non-primary) as consolidated_into so
  // they don't double-count alongside the consolidated commentary on
  // listings. is_primary on commentary_sources still distinguishes the
  // dominant voice for attribution. (#461)
  for (const row of rows) {
    await db.query(
      `UPDATE app.articles SET consolidated_into = $1, updated_at = NOW() WHERE id = $2`,
      [commentaryId, row.id],
    );
  }

  // Merge wiki deep dives.
  const perSourceLinks: WikiLinkRow[][] = [];
  for (const row of rows) {
    perSourceLinks.push(await loadWikiLinks(db, row.id));
  }
  const mergedWiki = mergeWikipediaLinks(perSourceLinks);
  for (const link of mergedWiki) {
    await db.query(
      `INSERT INTO app.article_wikipedia_links
         (article_id, wikipedia_id, relevance_rank, topic_summary)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (article_id, wikipedia_id) DO NOTHING`,
      [commentaryId, link.wikipedia_id, link.relevance_rank, link.topic_summary],
    );
  }

  // Merge affiliate links.
  const mergedAff = mergeAffiliateLinks(rows.map((r) => r.affiliate_links ?? []));
  await db.query(
    `UPDATE app.articles SET affiliate_links = $1 WHERE id = $2`,
    [JSON.stringify(mergedAff), commentaryId],
  );

  return plan;
}

// ── Mode B: add source to existing commentary ───────────────────────

export interface ModeBOptions {
  db: DbClient;
  synthesizer: CommentarySynthesizer;
  commentaryId: string;
  newSourceId: string;
  libraryRoot?: string;
}

export async function runModeB(opts: ModeBOptions): Promise<void> {
  const { db, synthesizer, commentaryId, newSourceId } = opts;
  const libraryRoot = opts.libraryRoot ?? LIBRARY_ROOT;

  // 4-source cap check (the DB trigger also enforces this).
  const existingCount = await countExistingSources(db, commentaryId);
  if (existingCount >= 4) {
    console.warn(`commentary ${commentaryId} already has 4 sources — skip`);
    return;
  }

  const commentaryRows = await loadArticleRows(db, [commentaryId]);
  const commentaryRow = commentaryRows[0];
  if (!commentaryRow) { throw new Error(`no such commentary ${commentaryId}`); }

  const { rows: existingSources } = await db.query<{ source_article_id: string }>(
    `SELECT source_article_id FROM app.commentary_sources
      WHERE commentary_article_id = $1
      ORDER BY position`,
    [commentaryId],
  );
  const existingRows = await loadArticleRows(db, existingSources.map((r) => r.source_article_id));
  const existingSrc = await Promise.all(existingRows.map(rowToSourceArticle));

  const newRows = await loadArticleRows(db, [newSourceId]);
  if (!newRows[0]) { throw new Error(`no such source ${newSourceId}`); }
  const newSrc = await rowToSourceArticle(newRows[0]);

  // Load existing commentary HTML.
  let existingHtml = '';
  if (commentaryRow.rewritten_content_path) {
    try {
      existingHtml = await readFile(
        join(libraryRoot, commentaryRow.rewritten_content_path),
        'utf-8',
      );
    } catch {
      existingHtml = '';
    }
  }

  const revised = await synthesizer.reviseCommentary(
    commentaryRow.title,
    existingHtml,
    existingSrc,
    newSrc,
  );
  if (containsTrumpMention(revised.title) || containsTrumpMention(revised.html)) {
    throw new Error('revision violates no-Trump policy');
  }

  // Write revised HTML to the same path (overwrite).
  const relPath = commentaryRow.rewritten_content_path
    ?? join('rewritten', `consolidated-${commentaryId}.html`);
  const absPath = join(libraryRoot, relPath);
  await mkdir(dirname(absPath), { recursive: true });
  await writeFile(absPath, revised.html, 'utf-8');

  await db.query(
    `UPDATE app.articles
        SET title = $2, rewritten_content_path = $3, updated_at = NOW()
      WHERE id = $1`,
    [commentaryId, revised.title, relPath],
  );

  // Insert new source (not primary unless it genuinely displaces — we
  // only displace if the synthesizer says so).
  const becomePrimary = revised.primarySourceId === newSourceId;
  await db.query(
    `INSERT INTO app.commentary_sources
       (commentary_article_id, source_article_id, is_primary, position)
     VALUES ($1, $2, $3, $4)`,
    [commentaryId, newSourceId, false, existingCount],
  );
  if (becomePrimary) {
    await db.query(
      `UPDATE app.commentary_sources SET is_primary = false WHERE commentary_article_id = $1`,
      [commentaryId],
    );
    await db.query(
      `UPDATE app.commentary_sources SET is_primary = true
        WHERE commentary_article_id = $1 AND source_article_id = $2`,
      [commentaryId, newSourceId],
    );
  }

  // Mark the new source consolidated_into the commentary.
  await db.query(
    `UPDATE app.articles SET consolidated_into = $1, updated_at = NOW() WHERE id = $2`,
    [commentaryId, newSourceId],
  );

  // Union wikipedia + affiliate links.
  const newWiki = await loadWikiLinks(db, newSourceId);
  const curWiki = await loadWikiLinks(db, commentaryId);
  const mergedWiki = mergeWikipediaLinks([curWiki, newWiki]);
  await db.query(`DELETE FROM app.article_wikipedia_links WHERE article_id = $1`, [commentaryId]);
  for (const link of mergedWiki) {
    await db.query(
      `INSERT INTO app.article_wikipedia_links
         (article_id, wikipedia_id, relevance_rank, topic_summary)
       VALUES ($1, $2, $3, $4)`,
      [commentaryId, link.wikipedia_id, link.relevance_rank, link.topic_summary],
    );
  }

  const mergedAff = mergeAffiliateLinks([
    commentaryRow.affiliate_links ?? [],
    newRows[0].affiliate_links ?? [],
  ]);
  await db.query(`UPDATE app.articles SET affiliate_links = $1 WHERE id = $2`, [
    JSON.stringify(mergedAff),
    commentaryId,
  ]);
}

// ── Plan printer ────────────────────────────────────────────────────

export function formatPlan(plan: ConsolidationPlan): string {
  const lines: string[] = [];
  lines.push(`Group ${plan.groupIndex + 1}  score=${plan.score.toFixed(3)}`);
  lines.push(`  ${plan.reasoning}`);
  lines.push(`  → new commentary id ${plan.commentaryId}`);
  lines.push(`  → title: ${plan.synthesizedTitle}`);
  lines.push(`  → html: library/${plan.htmlPath}`);
  lines.push(`  → primary: ${plan.primarySourceId}`);
  for (const s of plan.sources) {
    const marker = s.id === plan.primarySourceId ? '★' : ' ';
    lines.push(`    ${marker} (${s.publication}) ${s.title}  {${s.id}}`);
  }
  return lines.join('\n');
}

// ── CLI entrypoint ──────────────────────────────────────────────────

interface CliArgs {
  dryRun: boolean;
  apply: boolean;
  limit: number;
  addTo?: { commentaryId: string; sourceId: string };
}

export function parseArgs(argv: string[]): CliArgs {
  const args = argv.slice(2);
  const addToIdx = args.indexOf('--add-to');
  if (addToIdx >= 0) {
    const commentaryId = args[addToIdx + 1];
    const sourceId = args[addToIdx + 2];
    if (!commentaryId || !sourceId) {
      throw new Error('--add-to requires <commentary_id> <source_id>');
    }
    return { dryRun: false, apply: true, limit: 1, addTo: { commentaryId, sourceId } };
  }
  const apply = args.includes('--apply');
  const dryRun = args.includes('--dry-run') || !apply;
  const limitIdx = args.indexOf('--limit');
  const limit = limitIdx >= 0 ? Number(args[limitIdx + 1]) : 10;
  return { dryRun, apply, limit, addTo: undefined };
}

async function cliMain(): Promise<void> {
  const cli = parseArgs(process.argv);

  const { Pool } = await import('pg');
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) { throw new Error('DATABASE_URL required'); }
  const pool = new Pool({ connectionString: dbUrl });

  const synthesizer = makeClaudeCliSynthesizer();

  try {
    if (cli.addTo) {
      await runModeB({
        db: pool,
        synthesizer,
        commentaryId: cli.addTo.commentaryId,
        newSourceId: cli.addTo.sourceId,
      });
      console.info('add-to complete');
      return;
    }

    const groups = await findConsolidationCandidates(pool as unknown as QueryableDb, { limit: 2000 });
    console.info(`Found ${groups.length} candidate group(s)`);

    const capped = groups.slice(0, cli.limit);
    for (let i = 0; i < capped.length; i++) {
      const plan = await runModeA({
        db: pool,
        synthesizer,
        group: capped[i],
        groupIndex: i,
        apply: cli.apply,
      });
      if (plan) {
        console.info(formatPlan(plan));
        console.info('');
      }
    }
  } finally {
    await pool.end();
  }
}

// Export stub so tests can import it without the claude CLI installed.
export { makeStubSynthesizer };

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  cliMain().catch((err: unknown) => {
    console.error('Fatal:', err);
    process.exit(1);
  });
}
