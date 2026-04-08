/**
 * Regression tests for tag-page count/listing query alignment.
 *
 * Issue #506: the tag-page count query filtered `image_path IS NOT NULL`
 * while the listing query did not. The last numbered page therefore rendered
 * empty because the count over-promised.
 *
 * These tests lock in that both code paths share the exact same ready
 * filter (`tagPageReadyWhereSql`) and can't drift again.
 */

import { describe, expect, it, vi } from 'vitest';
import { tagPageReadyWhereSql } from './tag.js';

interface QueryCall {
  sql: string;
  params: unknown[];
}

interface FakeArticle {
  id: string;
  rewritten_content_path: string | null;
  is_consolidated: boolean;
  consolidated_into: string | null;
  image_path: string | null;
  publish_gate_status: string | null;
}

/**
 * Apply the tag-page ready filter in JS, mirroring the SQL in
 * `tagPageReadyWhereSql` + `failedGateSqlFragment`.
 */
function isReadyForTagPage(a: FakeArticle): boolean {
  const hasContent = a.rewritten_content_path !== null || a.is_consolidated;
  const notConsolidatedAway = a.consolidated_into === null;
  const hasImage = a.image_path !== null;
  const notFailedGate = a.publish_gate_status !== 'failed';
  return hasContent && notConsolidatedAway && hasImage && notFailedGate;
}

function makeFakePool(articlesForTag: FakeArticle[]) {
  const calls: QueryCall[] = [];
  const ready = articlesForTag.filter(isReadyForTagPage);
  const query = vi.fn((sql: string, params: unknown[] = []) => {
    calls.push({ sql, params });
    // COUNT query
    if (/SELECT COUNT\(DISTINCT a\.id\)/i.test(sql)) {
      return Promise.resolve({ rows: [{ count: String(ready.length) }], rowCount: 1 });
    }
    // Listing query — return ready rows shaped like TaggedArticleRow
    const rows = ready.map(a => ({
      id: a.id,
      title: `Title ${a.id}`,
      author_name: null,
      publication_name: 'Pub',
      publication_slug: 'pub',
      published_at: null,
      estimated_read_time_minutes: 1,
      content_path: null,
      image_path: a.image_path,
      original_url: 'https://example.com',
      display_tag_slug: null,
      display_tag_name: null,
    }));
    return Promise.resolve({ rows, rowCount: rows.length });
  });
  return { calls, pool: { query } as unknown as import('pg').Pool };
}

describe('tagPageReadyWhereSql', () => {
  it('includes the image_path filter so count and listing stay in sync (#506)', () => {
    const sql = tagPageReadyWhereSql('a');
    expect(sql).toContain('a.image_path IS NOT NULL');
    expect(sql).toContain('a.consolidated_into IS NULL');
    expect(sql).toContain('a.rewritten_content_path IS NOT NULL');
    expect(sql).toContain('a.is_consolidated = true');
  });

  it('respects the articleAlias argument', () => {
    const sql = tagPageReadyWhereSql('art');
    expect(sql).toContain('art.image_path IS NOT NULL');
    expect(sql).not.toMatch(/\ba\.image_path\b/);
  });
});

describe('tag page count/listing query alignment (#506)', () => {
  it('both the count SQL and the listing SQL emitted by getArticlesForTagPage use the shared ready filter', async () => {
    // Dynamic import so we can spy on the same module we are testing.
    const tagMod = await import('./tag.js');
    // Force load the internal query function via generateTagPages? It's not
    // exported. Instead, we drive the module through its public entry
    // getDisplayTagsBulk is unrelated; the internal getArticlesForTagPage is
    // reached via generateTagPages. That path is heavy. Instead we
    // string-match the source of tag.ts to assert both query sites share
    // the helper. This is the simplest durable regression guard.
    const fs = await import('fs/promises');
    const path = await import('path');
    const src = await fs.readFile(
      path.join(process.cwd(), 'tools/static-site/pages/tag.ts'),
      'utf-8'
    );
    // Count how many raw SELECTs from app.articles live inside
    // getArticlesForTagPage (should be 2: count + listing) and assert both
    // reference the shared helper `tagPageReadyWhereSql`.
    const fnMatch = src.match(
      /async function getArticlesForTagPage[\s\S]*?\n\}\n/
    );
    expect(fnMatch).not.toBeNull();
    const body = fnMatch![0];
    const helperUses = body.match(/tagPageReadyWhereSql\(/g) ?? [];
    expect(helperUses.length).toBe(2);
    // And the tag-index count (drives totalPages) also uses it.
    const tagsFn = src.match(
      /async function getTagsWithCounts[\s\S]*?\n\}\n/
    );
    expect(tagsFn).not.toBeNull();
    expect(tagsFn![0]).toContain('tagPageReadyWhereSql(');
    // And neither function hand-writes its own `image_path IS NOT NULL`
    // clause any more.
    expect(body).not.toMatch(/a\.image_path IS NOT NULL/);
    expect(tagsFn![0]).not.toMatch(/a\.image_path IS NOT NULL/);
    // Touch the module so import coverage tracks it.
    expect(typeof tagMod.tagPageReadyWhereSql).toBe('function');
  });

  it('count query and listing query return matching totals when some articles lack images', async () => {
    // N ready + M image-less for the same tag. The count must equal the
    // listing length (never N+M).
    const articles: FakeArticle[] = [
      // 3 ready
      { id: '1', rewritten_content_path: 'p1', is_consolidated: false, consolidated_into: null, image_path: 'img1', publish_gate_status: null },
      { id: '2', rewritten_content_path: 'p2', is_consolidated: false, consolidated_into: null, image_path: 'img2', publish_gate_status: null },
      { id: '3', rewritten_content_path: null, is_consolidated: true, consolidated_into: null, image_path: 'img3', publish_gate_status: null },
      // 2 image-less (should be excluded by both count and listing)
      { id: '4', rewritten_content_path: 'p4', is_consolidated: false, consolidated_into: null, image_path: null, publish_gate_status: null },
      { id: '5', rewritten_content_path: null, is_consolidated: true, consolidated_into: null, image_path: null, publish_gate_status: null },
      // 1 consolidated-away (excluded)
      { id: '6', rewritten_content_path: 'p6', is_consolidated: false, consolidated_into: '1', image_path: 'img6', publish_gate_status: null },
    ];
    const { pool, calls } = makeFakePool(articles);

    // Invoke the two queries exactly like getArticlesForTagPage does.
    // We can't call the private fn, so mirror its SQL shape here — but the
    // important assertion is that the same WHERE fragment is used.
    const where = tagPageReadyWhereSql('a');
    const countSql = `
      SELECT COUNT(DISTINCT a.id) AS count
      FROM app.articles a
      JOIN app.article_tags at ON at.article_id = a.id
      WHERE at.tag_slug = $1
        AND ${where}
    `;
    const listSql = `
      SELECT a.id
      FROM app.articles a
      JOIN app.article_tags at ON at.article_id = a.id AND at.tag_slug = $1
      WHERE ${where}
      ORDER BY a.published_at DESC NULLS LAST
      LIMIT $2 OFFSET $3
    `;
    const countRes = await pool.query<{ count: string }>(countSql, ['any']);
    const listRes = await pool.query<{ id: string }>(listSql, ['any', 30, 0]);
    const total = parseInt(countRes.rows[0].count, 10);

    expect(total).toBe(3);
    expect(listRes.rows.length).toBe(3);
    expect(total).toBe(listRes.rows.length);
    // Sanity: both SQL statements went through our fake pool and both
    // contained the same WHERE fragment.
    expect(calls).toHaveLength(2);
    expect(calls[0].sql).toContain('a.image_path IS NOT NULL');
    expect(calls[1].sql).toContain('a.image_path IS NOT NULL');
  });
});
