/**
 * Home page generator - paginated article listings
 */

import type { Pool } from 'pg';
import {
  staticLayout,
  renderStaticArticleCard,
  renderStaticPagination,
  renderTrendingHero,
  type StaticArticle,
  type TrendingArticle,
} from '../templates.js';
import { writeFile, extractExcerpt } from '../utils.js';
import { failedGateSqlFragment } from '../../editorial/publish-gate.js';
import { getDisplayTagsBulk, getConsolidationBulk } from './tag.js';
import { getTrendingConsolidationRefs } from './trending.js';
import { join } from 'path';
import { readFile } from 'fs/promises';

/**
 * Load article content from filesystem
 * Content paths are relative to library/ directory
 */
async function loadArticleContent(contentPath: string | null): Promise<string> {
  if (!contentPath) {
    return '';
  }
  try {
    // Content paths are relative to library/ directory
    const fullPath = join(process.cwd(), 'library', contentPath);
    return await readFile(fullPath, 'utf-8');
  } catch {
    return '';
  }
}

const ARTICLES_PER_PAGE = 30;

interface ArticleRow {
  id: string;
  title: string;
  author_name: string | null;
  publication_name: string;
  publication_slug: string;
  published_at: string | null;
  estimated_read_time_minutes: number;
  content_path: string | null;
  image_path: string | null;
  original_url: string;
}

/**
 * Get total article count
 */
/** WHERE clause filtering out in-flight (not-yet-rewritten) articles, absorbed
 *  sources, and articles that failed this run's publish gate. */
function readyWhereSql(): string {
  return `(
    (a.rewritten_content_path IS NOT NULL OR a.is_consolidated = true)
    AND (a.consolidated_into IS NULL)
    AND (a.image_path IS NOT NULL)
    AND ${failedGateSqlFragment('a')}
  )`;
}

async function getTotalArticleCount(pool: Pool): Promise<number> {
  const result = await pool.query<{ count: string }>(`
    SELECT COUNT(*) as count FROM app.articles a WHERE ${readyWhereSql()}
  `);
  return parseInt(result.rows[0].count, 10);
}

/**
 * Get articles for a specific page
 */
async function getArticlesForPage(
  pool: Pool,
  page: number
): Promise<StaticArticle[]> {
  const offset = (page - 1) * ARTICLES_PER_PAGE;

  const result = await pool.query<ArticleRow>(`
    SELECT
      a.id,
      a.title,
      a.author_name,
      p.name as publication_name,
      p.slug as publication_slug,
      a.published_at,
      a.estimated_read_time_minutes,
      a.content_path,
      a.image_path,
      a.original_url
    FROM app.articles a
    JOIN app.publications p ON a.publication_id = p.id
    WHERE ${readyWhereSql()}
    ORDER BY a.published_at DESC NULLS LAST
    LIMIT $1 OFFSET $2
  `, [ARTICLES_PER_PAGE, offset]);

  const articleIds = result.rows.map(r => r.id);
  const tagMap = await getDisplayTagsBulk(pool, articleIds);
  const consolidationMap = await getConsolidationBulk(pool, articleIds);

  const articles: StaticArticle[] = [];
  for (const row of result.rows) {
    const content = await loadArticleContent(row.content_path);
    const consolidation = consolidationMap.get(row.id);
    articles.push({
      id: row.id,
      title: row.title,
      author: row.author_name ?? 'Unknown',
      publicationName: row.publication_name,
      publicationSlug: row.publication_slug,
      publishedAt: row.published_at,
      estimatedReadTimeMinutes: row.estimated_read_time_minutes,
      excerpt: extractExcerpt(content),
      url: row.original_url,
      imagePath: row.image_path,
      displayTag: tagMap.get(row.id) ?? null,
      isConsolidated: consolidation?.isConsolidated ?? false,
      sourceCount: consolidation?.sourceCount ?? 0,
      primarySourceAuthor: consolidation?.primaryAuthor ?? null,
    });
  }
  return articles;
}

/**
 * Get consolidated commentaries with at least one source article
 * (published or created) within the last 7 days. Ordered by the
 * most-recent source's created_at DESC.
 */
export async function getTrendingConsolidations(
  pool: Pool
): Promise<TrendingArticle[]> {
  // Trending criteria lives in ./trending.ts — the shared module is the
  // single source of truth for the "≥1 source ≤7 days old" rule so the
  // web hero and the weekly Reader epub (#486) stay in sync.
  const refs = await getTrendingConsolidationRefs(pool);
  if (refs.length === 0) {return [];}

  const ids = refs.map((r) => r.commentaryArticleId);
  const result = await pool.query<ArticleRow>(`
    SELECT
      a.id,
      a.title,
      a.author_name,
      p.name as publication_name,
      p.slug as publication_slug,
      a.published_at,
      a.estimated_read_time_minutes,
      a.content_path,
      a.image_path,
      a.original_url
    FROM app.articles a
    JOIN app.publications p ON a.publication_id = p.id
    WHERE a.id = ANY($1::uuid[])
  `, [ids]);

  const byId = new Map(result.rows.map((r) => [r.id, r]));
  const out: TrendingArticle[] = [];
  for (const ref of refs) {
    const row = byId.get(ref.commentaryArticleId);
    if (!row) {continue;}
    out.push({
      id: row.id,
      title: row.title,
      author: row.author_name ?? 'Unknown',
      publicationName: row.publication_name,
      publicationSlug: row.publication_slug,
      publishedAt: row.published_at,
      estimatedReadTimeMinutes: row.estimated_read_time_minutes,
      excerpt: '',
      url: row.original_url,
      imagePath: row.image_path,
      displayTag: null,
      isConsolidated: true,
      sourceCount: ref.sourceCount,
      primarySourceAuthor: null,
      mostRecentSourceAt: ref.mostRecentSourceAt,
    });
  }
  return out;
}

/**
 * Generate a single home page
 */
function generateHomePage(
  articles: StaticArticle[],
  currentPage: number,
  totalPages: number,
  pathToRoot: string,
  trending: TrendingArticle[] = []
): string {
  const articleCards = articles
    .map((article) => renderStaticArticleCard(article, pathToRoot))
    .join('\n');

  const pagination = renderStaticPagination(currentPage, totalPages, pathToRoot);

  // Only render the trending hero on page 1.
  const heroHtml = currentPage === 1 ? renderTrendingHero(trending, pathToRoot) : '';

  const content = `
    ${heroHtml}
    <section class="article-list">
      ${articleCards}
      ${pagination}
    </section>
  `;

  return staticLayout('Home', content, pathToRoot);
}

/**
 * Generate all home pages (paginated)
 */
export async function generateHomePages(
  pool: Pool,
  outputDir: string
): Promise<{ pagesGenerated: number; articlesProcessed: number }> {
  const totalArticles = await getTotalArticleCount(pool);
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
  const trending = await getTrendingConsolidations(pool);

  let articlesProcessed = 0;

  for (let page = 1; page <= totalPages; page++) {
    const articles = await getArticlesForPage(pool, page);
    articlesProcessed += articles.length;

    // Path to root differs based on page location
    const pathToRoot = page === 1 ? './' : '../../';

    const html = generateHomePage(articles, page, totalPages, pathToRoot, trending);

    // Write to appropriate location
    const filePath =
      page === 1
        ? join(outputDir, 'index.html')
        : join(outputDir, 'page', String(page), 'index.html');

    await writeFile(filePath, html);

    console.info(`  Generated home page ${page}/${totalPages}`);
  }

  return { pagesGenerated: totalPages, articlesProcessed };
}
