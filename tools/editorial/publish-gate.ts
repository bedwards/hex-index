#!/usr/bin/env npx tsx
/**
 * Publish gate — enforces quality invariants before an article goes live
 * on the static site. Protects against the HX-001..004 class of incidents:
 *
 *   HX-001  consolidated commentary with zero wiki deep dives
 *   HX-002  article body references /wikipedia/<slug>/ whose page is
 *           missing on disk (root cause: stale static generation)
 *   HX-003  same root cause as HX-002, multi-source consolidated
 *   HX-004  same root cause as HX-002
 *
 * See docs-internal/quality-tracker.md for the full postmortem.
 *
 * Three entry points:
 *   1. runPublishGate(pool, articleId) — library API used by the static
 *      generator to decide whether to render a page.
 *   2. --scan CLI — batch-reports failing articles across the site.
 *   3. --hide CLI — additionally NULLs image_path on failing articles to
 *      remove them from listings until they're fixed.
 *
 * Usage:
 *   npx tsx tools/editorial/publish-gate.ts --scan
 *   npx tsx tools/editorial/publish-gate.ts --scan --hide
 */

import type { Pool } from 'pg';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';
import { config } from 'dotenv';

export interface PublishGateResult {
  ok: boolean;
  failures: string[];
}

interface ArticleRow {
  id: string;
  rewritten_content_path: string | null;
  is_consolidated: boolean;
}

interface WikiRow {
  slug: string;
  status: string | null;
  rewrite_dirty: boolean | null;
  content_path: string | null;
}

function libraryDir(): string {
  return join(process.cwd(), 'library');
}

/**
 * Extract `/wikipedia/<slug>/` references from an article body. Matches
 * absolute (`/wikipedia/foo/`) and relative (`../wikipedia/foo/`) forms,
 * as well as `../wikipedia/foo/index.html`. Case-insensitive.
 */
export function extractWikipediaSlugsFromBody(html: string): string[] {
  const slugs = new Set<string>();
  const re = /href\s*=\s*["'](?:\.\.\/|\/)?wikipedia\/([a-z0-9][a-z0-9-]*)\/?(?:index\.html)?["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    slugs.add(m[1].toLowerCase());
  }
  return [...slugs];
}

async function fileExistsNonEmpty(path: string, minBytes = 1): Promise<boolean> {
  try {
    const st = await stat(path);
    return st.isFile() && st.size >= minBytes;
  } catch {
    return false;
  }
}

async function readIfExists(path: string): Promise<string | null> {
  try {
    return await readFile(path, 'utf-8');
  } catch {
    return null;
  }
}

/**
 * Run the publish gate against a single article. Returns `{ok, failures}`
 * where `failures` is a human-readable list of reasons the article would
 * be hidden. `ok === true` iff the list is empty.
 */
export async function runPublishGate(
  pool: Pool,
  articleId: string,
): Promise<PublishGateResult> {
  const failures: string[] = [];

  const { rows } = await pool.query<ArticleRow>(
    `SELECT id, rewritten_content_path, COALESCE(is_consolidated, false) AS is_consolidated
     FROM app.articles WHERE id = $1`,
    [articleId],
  );
  if (rows.length === 0) {
    return { ok: false, failures: [`article ${articleId} not found`] };
  }
  const article = rows[0];

  // 1. Body file exists and is non-empty (>200 chars). Consolidated
  //    commentaries also use rewritten_content_path (synthesized), so the
  //    same check applies to both article kinds.
  let bodyHtml = '';
  if (!article.rewritten_content_path) {
    failures.push('no rewritten_content_path set');
  } else {
    const fullPath = join(libraryDir(), article.rewritten_content_path);
    const content = await readIfExists(fullPath);
    if (content === null) {
      failures.push(`body file missing: ${article.rewritten_content_path}`);
    } else if (content.trim().length <= 200) {
      failures.push(
        `body file too small (<=200 chars): ${article.rewritten_content_path}`,
      );
    } else {
      bodyHtml = content;
    }
  }

  // 2. Every inline /wikipedia/<slug>/ link must resolve to a DB row that
  //    is complete, not dirty, has a content_path, and whose library file
  //    exists on disk.
  if (bodyHtml) {
    const slugs = extractWikipediaSlugsFromBody(bodyHtml);
    if (slugs.length > 0) {
      const { rows: wikiRows } = await pool.query<WikiRow>(
        `SELECT slug, status, rewrite_dirty, content_path
         FROM app.wikipedia_articles
         WHERE slug = ANY($1::text[])`,
        [slugs],
      );
      const wikiMap = new Map(wikiRows.map((r) => [r.slug.toLowerCase(), r]));
      for (const slug of slugs) {
        const w = wikiMap.get(slug);
        if (!w) {
          failures.push(`wiki link /${slug}/ has no DB row`);
          continue;
        }
        if ((w.status ?? 'complete') !== 'complete') {
          failures.push(`wiki link /${slug}/ status=${w.status}`);
          continue;
        }
        if (w.rewrite_dirty) {
          failures.push(`wiki link /${slug}/ rewrite_dirty=true`);
          continue;
        }
        if (!w.content_path) {
          failures.push(`wiki link /${slug}/ content_path is NULL`);
          continue;
        }
        const fp = join(libraryDir(), w.content_path);
        if (!(await fileExistsNonEmpty(fp))) {
          failures.push(`wiki link /${slug}/ library file missing: ${w.content_path}`);
        }
      }
    }
  }

  // 3. Consolidated commentaries must have at least one wiki deep-dive
  //    linked via article_wikipedia_links (HX-001).
  if (article.is_consolidated) {
    const { rows: linkRows } = await pool.query<{ count: string }>(
      `SELECT COUNT(*) AS count FROM app.article_wikipedia_links WHERE article_id = $1`,
      [articleId],
    );
    const n = parseInt(linkRows[0]?.count ?? '0', 10);
    if (n === 0) {
      failures.push('consolidated article has zero deep-dive links (HX-001)');
    }
  }

  return { ok: failures.length === 0, failures };
}

// ── Cross-request cache of failed article IDs ───────────────────────
// Populated once per static-generator run via computeFailedGateIds(), then
// consumed by listing queries (home/publication/tag) to filter out broken
// articles without a per-request DB round trip.

let failedGateIds: Set<string> = new Set<string>();

export function getFailedGateIds(): ReadonlySet<string> {
  return failedGateIds;
}

/** Build a SQL fragment for WHERE clauses that filters failed-gate IDs. */
export function failedGateSqlFragment(articleAlias = 'a'): string {
  const ids = [...failedGateIds];
  if (ids.length === 0) {return 'TRUE';}
  const list = ids.map((id) => `'${id.replace(/'/g, "''")}'`).join(',');
  return `${articleAlias}.id NOT IN (${list})`;
}

/**
 * Scan every article eligible for publication and run the publish gate.
 * Populates the module-level failed-gate set and returns the detailed
 * results for reporting / CLI use.
 */
export async function computeFailedGateIds(
  pool: Pool,
): Promise<Array<{ id: string; failures: string[] }>> {
  const { rows } = await pool.query<{ id: string }>(
    `SELECT id FROM app.articles
     WHERE (rewritten_content_path IS NOT NULL OR is_consolidated = true)
       AND consolidated_into IS NULL
       AND image_path IS NOT NULL`,
  );
  const failed: Array<{ id: string; failures: string[] }> = [];
  const set = new Set<string>();
  for (const { id } of rows) {
    const result = await runPublishGate(pool, id);
    if (!result.ok) {
      failed.push({ id, failures: result.failures });
      set.add(id);
    }
  }
  failedGateIds = set;
  return failed;
}

/** Test-only hook. */
export function _setFailedGateIdsForTest(ids: Iterable<string>): void {
  failedGateIds = new Set(ids);
}

// ── CLI ─────────────────────────────────────────────────────────────

async function mainCli(): Promise<void> {
  config();
  const args = process.argv.slice(2);
  if (!args.includes('--scan')) {
    console.error('Usage: publish-gate.ts --scan [--hide]');
    process.exit(2);
  }
  const hide = args.includes('--hide');

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('Error: DATABASE_URL not set');
    process.exit(1);
  }

  const { createPool } = await import('../../src/db/queries.js');
  const pool = createPool(databaseUrl);
  try {
    console.info('Publish gate: scanning eligible articles...');
    const failed = await computeFailedGateIds(pool);
    console.info(`\n${failed.length} article(s) failed the publish gate:\n`);
    for (const f of failed) {
      console.info(`  ${f.id}`);
      for (const reason of f.failures) {
        console.info(`    - ${reason}`);
      }
    }
    if (hide && failed.length > 0) {
      console.info(`\n--hide: NULLing image_path on ${failed.length} article(s)...`);
      await pool.query(
        `UPDATE app.articles SET image_path = NULL WHERE id = ANY($1::text[])`,
        [failed.map((f) => f.id)],
      );
      console.info('Done.');
    }
  } finally {
    await pool.end();
  }
}

// Run CLI only when invoked directly (not when imported).
const isDirectRun = (() => {
  try {
    const argv1 = process.argv[1] ?? '';
    return argv1.endsWith('publish-gate.ts') || argv1.endsWith('publish-gate.js');
  } catch {
    return false;
  }
})();

if (isDirectRun) {
  mainCli().catch((err: unknown) => {
    console.error('Error:', err);
    process.exit(1);
  });
}
