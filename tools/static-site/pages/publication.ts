/**
 * Publication page generator - paginated article listings per publication
 */

import type { Pool } from 'pg';
import {
  staticLayout,
  renderStaticArticleCard,
  renderStaticPagination,
  type StaticArticle,
} from '../templates.js';
import { writeFile, extractExcerpt, escapeHtml } from '../utils.js';
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

interface PublicationRow {
  id: string;
  slug: string;
  name: string;
  author_name: string | null;
  url: string | null;
}

interface ArticleRow {
  id: string;
  title: string;
  author_name: string | null;
  published_at: string | null;
  estimated_read_time_minutes: number;
  content_path: string | null;
  original_url: string;
}

/**
 * Get all publications with article counts
 */
async function getAllPublications(pool: Pool): Promise<PublicationRow[]> {
  const result = await pool.query<PublicationRow>(`
    SELECT
      p.id,
      p.slug,
      p.name,
      p.author_name,
      p.base_url as url
    FROM app.publications p
    WHERE EXISTS (SELECT 1 FROM app.articles a WHERE a.publication_id = p.id)
    ORDER BY p.name
  `);
  return result.rows;
}

/**
 * Get article count for a publication
 */
async function getPublicationArticleCount(
  pool: Pool,
  publicationId: string
): Promise<number> {
  const result = await pool.query<{ count: string }>(`
    SELECT COUNT(*) as count FROM app.articles WHERE publication_id = $1
  `, [publicationId]);
  return parseInt(result.rows[0].count, 10);
}

/**
 * Get articles for a publication page
 */
async function getPublicationArticles(
  pool: Pool,
  publicationId: string,
  page: number
): Promise<ArticleRow[]> {
  const offset = (page - 1) * ARTICLES_PER_PAGE;

  const result = await pool.query<ArticleRow>(`
    SELECT
      id,
      title,
      author_name,
      published_at,
      estimated_read_time_minutes,
      content_path,
      original_url
    FROM app.articles
    WHERE publication_id = $1
    ORDER BY published_at DESC NULLS LAST
    LIMIT $2 OFFSET $3
  `, [publicationId, ARTICLES_PER_PAGE, offset]);

  return result.rows;
}

/**
 * Generate publication page HTML
 */
function generatePublicationPage(
  publication: PublicationRow,
  articles: StaticArticle[],
  currentPage: number,
  totalPages: number,
  pathToRoot: string
): string {
  const articleCards = articles
    .map((article) => renderStaticArticleCard(article, pathToRoot))
    .join('\n');

  const baseUrl = `${pathToRoot}publication/${publication.slug}/`;
  const pagination = renderStaticPagination(currentPage, totalPages, baseUrl);

  const authorInfo = publication.author_name
    ? `<p class="publication-author">By ${escapeHtml(publication.author_name)}</p>`
    : '';

  const urlInfo = publication.url
    ? `<p class="publication-url"><a href="${publication.url}" target="_blank" rel="noopener">Visit publication &rarr;</a></p>`
    : '';

  const content = `
    <section class="publication-page">
      <header class="publication-header">
        <h1>${escapeHtml(publication.name)}</h1>
        ${authorInfo}
        ${urlInfo}
      </header>

      <div class="article-list">
        ${articleCards}
        ${pagination}
      </div>
    </section>
  `;

  return staticLayout(publication.name, content, pathToRoot);
}

/**
 * Generate all publication pages (paginated)
 */
export async function generatePublicationPages(
  pool: Pool,
  outputDir: string
): Promise<{ publicationsGenerated: number; pagesGenerated: number }> {
  const publications = await getAllPublications(pool);
  let publicationsGenerated = 0;
  let pagesGenerated = 0;

  for (const pub of publications) {
    const totalArticles = await getPublicationArticleCount(pool, pub.id);
    const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

    for (let page = 1; page <= totalPages; page++) {
      const articles = await getPublicationArticles(pool, pub.id, page);

      const staticArticles: StaticArticle[] = [];
      for (const row of articles) {
        const content = await loadArticleContent(row.content_path);
        staticArticles.push({
          id: row.id,
          title: row.title,
          author: row.author_name ?? 'Unknown',
          publicationName: pub.name,
          publicationSlug: pub.slug,
          publishedAt: row.published_at,
          estimatedReadTimeMinutes: row.estimated_read_time_minutes,
          excerpt: extractExcerpt(content),
          url: row.original_url,
        });
      }

      // Path to root differs based on page location
      const pathToRoot = page === 1 ? '../../' : '../../../../';

      const html = generatePublicationPage(
        pub,
        staticArticles,
        page,
        totalPages,
        pathToRoot
      );

      // Write to appropriate location
      const filePath =
        page === 1
          ? join(outputDir, 'publication', pub.slug, 'index.html')
          : join(outputDir, 'publication', pub.slug, 'page', String(page), 'index.html');

      await writeFile(filePath, html);
      pagesGenerated++;
    }

    publicationsGenerated++;

    if (publicationsGenerated % 20 === 0) {
      console.info(`  Generated pages for ${publicationsGenerated} publications...`);
    }
  }

  console.info(`  Generated ${pagesGenerated} pages for ${publicationsGenerated} publications`);
  return { publicationsGenerated, pagesGenerated };
}
