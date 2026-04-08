/**
 * Shared trending-consolidations query.
 *
 * A "trending" commentary is a consolidated commentary article with at least
 * one source article whose most-recent source timestamp (published_at or
 * created_at) is within the last 7 days. Results are ordered by that
 * most-recent source timestamp DESC.
 *
 * Both the public home hero (tools/static-site/pages/home.ts) and the
 * weekly Reader epub (tools/static-site/pages/weekly.ts) consume this so
 * the two stay in sync. See issue #486.
 */

import type { Pool } from 'pg';
import { failedGateSqlFragment } from '../../editorial/publish-gate.js';

export interface TrendingConsolidationRef {
  commentaryArticleId: string;
  mostRecentSourceAt: string;
  sourceCount: number;
}

/**
 * Return ordered refs for every consolidated commentary with ≥1 source
 * ≤7 days old, most-recent source DESC.
 *
 * This is the single source of truth for the trending criteria — callers
 * that need more columns (title, author, etc.) should take these IDs and
 * join to `app.articles` themselves.
 */
export async function getTrendingConsolidationRefs(
  pool: Pool
): Promise<TrendingConsolidationRef[]> {
  const { rows } = await pool.query<{
    id: string;
    most_recent_source_created_at: string;
    source_count: string;
  }>(`
    SELECT
      a.id,
      mr.most_recent_source_created_at,
      mr.source_count
    FROM app.articles a
    JOIN (
      SELECT
        cs.commentary_article_id,
        MAX(src.created_at) AS most_recent_source_created_at,
        COUNT(*) AS source_count
      FROM app.commentary_sources cs
      JOIN app.articles src ON src.id = cs.source_article_id
      GROUP BY cs.commentary_article_id
      HAVING MAX(GREATEST(COALESCE(src.published_at, 'epoch'::timestamptz), src.created_at))
             >= NOW() - INTERVAL '7 days'
    ) mr ON mr.commentary_article_id = a.id
    WHERE (
      (a.rewritten_content_path IS NOT NULL OR a.is_consolidated = true)
      AND (a.consolidated_into IS NULL)
      AND (a.image_path IS NOT NULL)
      AND ${failedGateSqlFragment('a')}
    )
      AND a.is_consolidated = true
    ORDER BY mr.most_recent_source_created_at DESC
  `);
  return rows.map((r) => ({
    commentaryArticleId: r.id,
    mostRecentSourceAt: r.most_recent_source_created_at,
    sourceCount: parseInt(r.source_count, 10),
  }));
}
