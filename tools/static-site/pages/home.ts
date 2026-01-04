/**
 * Home page generator - paginated article listings
 */

import type { Pool } from 'pg';
import {
  staticLayout,
  renderStaticArticleCard,
  renderStaticPagination,
  type StaticArticle,
} from '../templates.js';
import { writeFile, extractExcerpt } from '../utils.js';
import { join } from 'path';
import { readFile } from 'fs/promises';

/**
 * Load article content from filesystem
 */
async function loadArticleContent(contentPath: string | null): Promise<string> {
  if (!contentPath) {
    return '';
  }
  try {
    return await readFile(contentPath, 'utf-8');
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
  original_url: string;
}

/**
 * Get total article count
 */
async function getTotalArticleCount(pool: Pool): Promise<number> {
  const result = await pool.query<{ count: string }>(`
    SELECT COUNT(*) as count FROM app.articles
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
      a.original_url
    FROM app.articles a
    JOIN app.publications p ON a.publication_id = p.id
    ORDER BY a.published_at DESC NULLS LAST
    LIMIT $1 OFFSET $2
  `, [ARTICLES_PER_PAGE, offset]);

  const articles: StaticArticle[] = [];
  for (const row of result.rows) {
    const content = await loadArticleContent(row.content_path);
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
    });
  }
  return articles;
}

/**
 * Generate a single home page
 */
function generateHomePage(
  articles: StaticArticle[],
  currentPage: number,
  totalPages: number,
  pathToRoot: string
): string {
  const articleCards = articles
    .map((article) => renderStaticArticleCard(article, pathToRoot))
    .join('\n');

  const pagination = renderStaticPagination(currentPage, totalPages, pathToRoot);

  const content = `
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

  let articlesProcessed = 0;

  for (let page = 1; page <= totalPages; page++) {
    const articles = await getArticlesForPage(pool, page);
    articlesProcessed += articles.length;

    // Path to root differs based on page location
    const pathToRoot = page === 1 ? './' : '../../';

    const html = generateHomePage(articles, page, totalPages, pathToRoot);

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
