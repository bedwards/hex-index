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
 * Backfill (issue #452) — walks historical articles in 14-day chunks
 * (created_at DESC) and applies Mode A to anything still single-source.
 * Idempotent: skips rows already marked is_consolidated or already
 * absorbed (consolidated_into IS NOT NULL). Honors --limit and --dry-run.
 *
 *   tsx tools/editorial/consolidate.ts --backfill --dry-run
 *   tsx tools/editorial/consolidate.ts --backfill --apply --limit 5
 *   tsx tools/editorial/consolidate.ts --backfill-status
 *
 * The LLM synthesis step is hidden behind the CommentarySynthesizer
 * interface (see consolidate-helpers.ts). The default implementation
 * spawns `claude -p` as a subprocess. Tests inject a fake.
 */

import 'dotenv/config';
import { spawn } from 'child_process';
import { randomUUID } from 'crypto';
import { appendFile, mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join, resolve } from 'path';
import type { Pool, PoolClient } from 'pg';
import type { CandidateGroup, QueryableDb } from './consolidation-candidates.js';
import {
  TIME_WINDOW_DAYS,
  findCandidatesInRange,
  findConsolidationCandidates,
} from './consolidation-candidates.js';
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
  synthesizeWithRetry,
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
      const basePrompt = buildSynthesisPrompt(sources);
      return await synthesizeWithRetry(basePrompt, async (prompt) => {
        const stdout = await runClaudeCli(prompt);
        return parseSynthesisJson(stdout);
      });
    },
    async reviseCommentary(existingTitle, existingHtml, sources, newSource) {
      const basePrompt = buildRevisionPrompt(existingTitle, existingHtml, sources, newSource);
      return await synthesizeWithRetry(basePrompt, async (prompt) => {
        const stdout = await runClaudeCli(prompt);
        return parseSynthesisJson(stdout);
      });
    },
  };
}

// ── Skipped-group log ───────────────────────────────────────────────

/** Append a single skip record to library/consolidation-skipped.log. */
export async function logSkippedGroup(
  articleIds: string[],
  reason: string,
  libraryRoot?: string,
): Promise<void> {
  const root = libraryRoot ?? LIBRARY_ROOT;
  const path = join(root, 'consolidation-skipped.log');
  const line = `${new Date().toISOString()} | ${articleIds.join(',')} | ${reason}\n`;
  try {
    await mkdir(dirname(path), { recursive: true });
    await appendFile(path, line, 'utf-8');
  } catch (err) {
    console.warn(`failed to write skipped log: ${String(err)}`);
  }
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

  let synth: SynthesisResult;
  try {
    synth = await synthesizer.synthesizeCommentary(sources);
  } catch (err) {
    const reason = `synthesis failed: ${err instanceof Error ? err.message : String(err)}`;
    console.warn(`  skip group ${String(groupIndex + 1)}: ${reason}`);
    await logSkippedGroup(rows.map((r) => r.id), reason, opts.libraryRoot);
    return null;
  }
  if (containsTrumpMention(synth.title) || containsTrumpMention(synth.html)) {
    const reason = 'synthesis violates no-Trump policy after retries';
    console.warn(`  skip group ${String(groupIndex + 1)}: ${reason}`);
    await logSkippedGroup(rows.map((r) => r.id), reason, opts.libraryRoot);
    return null;
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

// ── Backfill (issue #452) ───────────────────────────────────────────

export interface BackfillOptions {
  db: DbClient;
  synthesizer: CommentarySynthesizer;
  apply: boolean;
  /** Hard cap on groups processed per invocation (default 5). */
  limit?: number;
  /** Chunk size in days (default 14). */
  chunkDays?: number;
  /** Override "now" for deterministic tests. */
  now?: Date;
  /** Override the historical floor (default = oldest article in DB). */
  earliest?: Date;
  /** Injectable source loader for tests. */
  loadSources?: ModeAOptions['loadSources'];
  libraryRoot?: string;
  /** Optional progress sink (defaults to console.info). */
  log?: (msg: string) => void;
}

export interface BackfillResult {
  chunksScanned: number;
  groupsFound: number;
  groupsProcessed: number;
  plans: ConsolidationPlan[];
  hitLimit: boolean;
}

interface ChunkRange { start: Date; end: Date }

/** Inclusive earliest, exclusive latest — yields newest chunk first. */
export function buildBackfillChunks(
  earliest: Date,
  latest: Date,
  chunkDays: number,
): ChunkRange[] {
  const out: ChunkRange[] = [];
  const ms = chunkDays * 24 * 60 * 60 * 1000;
  let end = latest.getTime();
  const floor = earliest.getTime();
  while (end > floor) {
    const start = Math.max(floor, end - ms);
    out.push({ start: new Date(start), end: new Date(end) });
    end = start;
  }
  return out;
}

async function fetchEarliestArticleDate(db: QueryableDb): Promise<Date | null> {
  const { rows } = await db.query<{ min: Date | string | null }>(
    `SELECT MIN(created_at) AS min FROM app.articles`,
  );
  const v = rows[0]?.min ?? null;
  if (v === null) { return null; }
  return v instanceof Date ? v : new Date(v);
}

/**
 * Walk historical articles in 14-day chunks (newest first) and apply
 * Mode A consolidation to each candidate group, up to `limit`. Idempotent:
 * already-consolidated articles are excluded by `findCandidatesInRange`,
 * and `runModeA` re-checks before mutating.
 */
export async function runBackfill(opts: BackfillOptions): Promise<BackfillResult> {
  const limit = opts.limit ?? 5;
  const chunkDays = opts.chunkDays ?? TIME_WINDOW_DAYS;
  const now = opts.now ?? new Date();
  const log = opts.log ?? ((m: string) => { console.info(m); });
  const queryable = opts.db as unknown as QueryableDb;

  const earliest =
    opts.earliest ?? (await fetchEarliestArticleDate(queryable)) ?? new Date(now);
  const chunks = buildBackfillChunks(earliest, now, chunkDays);

  const result: BackfillResult = {
    chunksScanned: 0,
    groupsFound: 0,
    groupsProcessed: 0,
    plans: [],
    hitLimit: false,
  };

  for (const chunk of chunks) {
    result.chunksScanned++;
    log(
      `chunk ${result.chunksScanned}/${chunks.length}: ` +
      `${chunk.start.toISOString().slice(0, 10)} → ${chunk.end.toISOString().slice(0, 10)}`,
    );
    const groups = await findCandidatesInRange(queryable, {
      start: chunk.start,
      end: chunk.end,
    });
    result.groupsFound += groups.length;
    if (groups.length === 0) { continue; }
    log(`  ${groups.length} candidate group(s)`);

    for (const group of groups) {
      if (result.groupsProcessed >= limit) {
        result.hitLimit = true;
        break;
      }
      const plan = await runModeA({
        db: opts.db,
        synthesizer: opts.synthesizer,
        group,
        groupIndex: result.groupsProcessed,
        apply: opts.apply,
        libraryRoot: opts.libraryRoot,
        loadSources: opts.loadSources,
      });
      if (plan) {
        result.plans.push(plan);
        result.groupsProcessed++;
        log(formatPlan(plan));
        log('');
      }
    }
    if (result.hitLimit) { break; }
  }

  return result;
}

export interface BackfillStatus {
  totalArticles: number;
  alreadyConsolidated: number;
  estimatedRemainingGroups: number;
  earliest: Date | null;
  latest: Date | null;
}

/**
 * Quick status report for the backfill driver. Counts use efficient
 * aggregate queries; the "estimated remaining" walks chunks once with
 * candidate detection but does not mutate.
 */
export async function getBackfillStatus(
  db: DbClient,
  opts: { chunkDays?: number; now?: Date } = {},
): Promise<BackfillStatus> {
  const queryable = db as unknown as QueryableDb;
  const chunkDays = opts.chunkDays ?? TIME_WINDOW_DAYS;
  const now = opts.now ?? new Date();

  const totalRes = await queryable.query<{ count: string }>(
    `SELECT COUNT(*)::text AS count FROM app.articles`,
  );
  const total = Number(totalRes.rows[0]?.count ?? 0);

  let consolidated: number;
  try {
    const consRes = await queryable.query<{ count: string }>(
      `SELECT COUNT(*)::text AS count FROM app.articles
        WHERE consolidated_into IS NOT NULL OR is_consolidated = true`,
    );
    consolidated = Number(consRes.rows[0]?.count ?? 0);
  } catch {
    consolidated = 0;
  }

  const rangeRes = await queryable.query<{ min: Date | string | null; max: Date | string | null }>(
    `SELECT MIN(created_at) AS min, MAX(created_at) AS max FROM app.articles`,
  );
  const minRaw = rangeRes.rows[0]?.min ?? null;
  const maxRaw = rangeRes.rows[0]?.max ?? null;
  const earliest = minRaw === null ? null : (minRaw instanceof Date ? minRaw : new Date(minRaw));
  const latest = maxRaw === null ? null : (maxRaw instanceof Date ? maxRaw : new Date(maxRaw));

  let estimated = 0;
  if (earliest) {
    const chunks = buildBackfillChunks(earliest, now, chunkDays);
    for (const chunk of chunks) {
      const groups = await findCandidatesInRange(queryable, {
        start: chunk.start,
        end: chunk.end,
      });
      estimated += groups.length;
    }
  }

  return {
    totalArticles: total,
    alreadyConsolidated: consolidated,
    estimatedRemainingGroups: estimated,
    earliest,
    latest,
  };
}

export function formatBackfillStatus(s: BackfillStatus): string {
  const fmt = (d: Date | null): string => d ? d.toISOString().slice(0, 10) : '(none)';
  const lines: string[] = [];
  lines.push('Backfill status:');
  lines.push(`  total articles:           ${s.totalArticles}`);
  lines.push(`  already consolidated:     ${s.alreadyConsolidated}`);
  lines.push(`  est. remaining groups:    ${s.estimatedRemainingGroups}`);
  lines.push(`  date range:               ${fmt(s.earliest)} → ${fmt(s.latest)}`);
  return lines.join('\n');
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
  backfill: boolean;
  backfillStatus: boolean;
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
    return {
      dryRun: false,
      apply: true,
      limit: 1,
      addTo: { commentaryId, sourceId },
      backfill: false,
      backfillStatus: false,
    };
  }
  const apply = args.includes('--apply');
  const dryRun = args.includes('--dry-run') || !apply;
  const limitIdx = args.indexOf('--limit');
  const limit = limitIdx >= 0 ? Number(args[limitIdx + 1]) : 10;
  const backfill = args.includes('--backfill');
  const backfillStatus = args.includes('--backfill-status');
  return { dryRun, apply, limit, addTo: undefined, backfill, backfillStatus };
}

async function cliMain(): Promise<void> {
  const cli = parseArgs(process.argv);

  const { Pool } = await import('pg');
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) { throw new Error('DATABASE_URL required'); }
  const pool = new Pool({ connectionString: dbUrl });

  const synthesizer = makeClaudeCliSynthesizer();

  try {
    if (cli.backfillStatus) {
      const status = await getBackfillStatus(pool);
      console.info(formatBackfillStatus(status));
      return;
    }

    if (cli.backfill) {
      const limit = cli.limit > 0 ? cli.limit : 5;
      const result = await runBackfill({
        db: pool,
        synthesizer,
        apply: cli.apply,
        limit,
      });
      console.info(
        `Backfill: scanned ${result.chunksScanned} chunk(s), ` +
        `found ${result.groupsFound} group(s), processed ${result.groupsProcessed}` +
        (result.hitLimit ? ' (limit reached)' : ''),
      );
      return;
    }

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
      try {
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
      } catch (err) {
        const reason = err instanceof Error ? err.message : String(err);
        console.warn(`  group ${String(i + 1)} failed unexpectedly: ${reason}`);
        await logSkippedGroup(
          capped[i].articles.map((a) => a.id),
          `unexpected error: ${reason}`,
        );
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
