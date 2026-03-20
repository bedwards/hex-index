/**
 * Search index generator
 * Emits a compact JSON file for client-side fuzzy search via Fuse.js
 */

import type { Pool } from 'pg';
import { writeFile } from '../utils.js';
import { join } from 'path';

interface IndexEntry {
  i: string;  // id
  t: string;  // title
  a: string;  // author
  p: string;  // publication name
  s: string;  // publication slug
  d: string;  // date (YYYY-MM-DD)
  r: number;  // read time minutes
}

/**
 * Generate search-index.json for client-side fuzzy search
 */
export async function generateSearchIndex(
  pool: Pool,
  outputDir: string
): Promise<{ articlesIndexed: number }> {
  const { rows } = await pool.query<{
    id: string;
    title: string;
    author_name: string | null;
    publication_name: string;
    publication_slug: string;
    published_at: string | null;
    estimated_read_time_minutes: number;
  }>(`
    SELECT
      a.id,
      a.title,
      a.author_name,
      p.name AS publication_name,
      p.slug AS publication_slug,
      a.published_at,
      a.estimated_read_time_minutes
    FROM app.articles a
    JOIN app.publications p ON a.publication_id = p.id
    ORDER BY a.published_at DESC NULLS LAST
  `);

  const index: IndexEntry[] = rows.map(r => ({
    i: r.id,
    t: r.title,
    a: r.author_name ?? '',
    p: r.publication_name,
    s: r.publication_slug,
    d: r.published_at ? new Date(r.published_at).toISOString().slice(0, 10) : '',
    r: r.estimated_read_time_minutes,
  }));

  const json = JSON.stringify(index);
  const filePath = join(outputDir, 'search-index.json');
  await writeFile(filePath, json);

  console.info(`  Indexed ${index.length} articles (${Math.round(json.length / 1024)}KB)`);
  return { articlesIndexed: index.length };
}
