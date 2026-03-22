/**
 * Tag page generator — filtered article listings by tag
 * Also provides helper to get display tag for any article
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

const ARTICLES_PER_PAGE = 30;

interface TagRow {
  slug: string;
  name: string;
  article_count: string;
}

interface TaggedArticleRow {
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
  display_tag_slug: string | null;
  display_tag_name: string | null;
}

async function loadContent(contentPath: string | null): Promise<string> {
  if (!contentPath) {return '';}
  try {
    return await readFile(join(process.cwd(), 'library', contentPath), 'utf-8');
  } catch {
    return '';
  }
}

/**
 * Get all tags with article counts
 */
async function getTagsWithCounts(pool: Pool): Promise<TagRow[]> {
  const { rows } = await pool.query<TagRow>(`
    SELECT t.slug, t.name, COUNT(at.id)::text AS article_count
    FROM app.tags t
    JOIN app.article_tags at ON at.tag_slug = t.slug
    GROUP BY t.slug, t.name
    HAVING COUNT(at.id) > 0
    ORDER BY t.name ASC
  `);
  return rows;
}

/**
 * Get articles for a tag page, with display tag logic:
 * Show the highest-scored tag that ISN'T the current filter tag
 */
async function getArticlesForTagPage(
  pool: Pool,
  tagSlug: string,
  page: number
): Promise<{ articles: TaggedArticleRow[]; total: number }> {
  const offset = (page - 1) * ARTICLES_PER_PAGE;

  // Count total
  const { rows: countRows } = await pool.query<{ count: string }>(`
    SELECT COUNT(DISTINCT a.id) AS count
    FROM app.articles a
    JOIN app.article_tags at ON at.article_id = a.id
    WHERE at.tag_slug = $1
  `, [tagSlug]);
  const total = parseInt(countRows[0].count, 10);

  // Get articles with their display tag (highest scored tag that isn't the filter)
  const { rows } = await pool.query<TaggedArticleRow>(`
    SELECT
      a.id, a.title, a.author_name,
      p.name AS publication_name, p.slug AS publication_slug,
      a.published_at, a.estimated_read_time_minutes,
      a.content_path, a.image_path, a.original_url,
      alt_tag.tag_slug AS display_tag_slug,
      alt_t.name AS display_tag_name
    FROM app.articles a
    JOIN app.publications p ON a.publication_id = p.id
    JOIN app.article_tags at ON at.article_id = a.id AND at.tag_slug = $1
    LEFT JOIN LATERAL (
      SELECT at2.tag_slug
      FROM app.article_tags at2
      WHERE at2.article_id = a.id AND at2.tag_slug != $1
      ORDER BY at2.score DESC
      LIMIT 1
    ) alt_tag ON true
    LEFT JOIN app.tags alt_t ON alt_t.slug = alt_tag.tag_slug
    ORDER BY a.published_at DESC NULLS LAST
    LIMIT $2 OFFSET $3
  `, [tagSlug, ARTICLES_PER_PAGE, offset]);

  return { articles: rows, total };
}

/**
 * Get display tag for an article on the home page (highest scored)
 */
export async function getDisplayTag(
  pool: Pool,
  articleId: string
): Promise<{ slug: string; name: string } | null> {
  const { rows } = await pool.query<{ slug: string; name: string }>(`
    SELECT at.tag_slug AS slug, t.name
    FROM app.article_tags at
    JOIN app.tags t ON t.slug = at.tag_slug
    WHERE at.article_id = $1
    ORDER BY at.score DESC
    LIMIT 1
  `, [articleId]);
  return rows[0] ?? null;
}

/**
 * Get all display tags for articles in bulk (for home page performance)
 */
export async function getDisplayTagsBulk(
  pool: Pool,
  articleIds: string[]
): Promise<Map<string, { slug: string; name: string }>> {
  if (articleIds.length === 0) {return new Map();}

  const { rows } = await pool.query<{ article_id: string; slug: string; name: string }>(`
    SELECT DISTINCT ON (at.article_id)
      at.article_id, at.tag_slug AS slug, t.name
    FROM app.article_tags at
    JOIN app.tags t ON t.slug = at.tag_slug
    WHERE at.article_id = ANY($1)
    ORDER BY at.article_id, at.score DESC
  `, [articleIds]);

  const map = new Map<string, { slug: string; name: string }>();
  for (const row of rows) {
    map.set(row.article_id, { slug: row.slug, name: row.name });
  }
  return map;
}

/**
 * Generate tag listing page (shows all tags)
 */
function generateTagIndexPage(tags: TagRow[], pathToRoot: string): string {
  const tagItems = tags.map(t => `
    <a href="${pathToRoot}tag/${t.slug}/index.html" class="tag-card">
      <span class="tag-name">${t.name}</span>
      <span class="tag-count">${t.article_count}</span>
    </a>
  `).join('\n');

  const content = `
    <h1 class="section-title">Topics</h1>
    <div class="tag-grid">
      ${tagItems}
    </div>
  `;

  return staticLayout('Topics', content, pathToRoot);
}

/**
 * Generate a single tag page
 */
function generateTagPage(
  tagName: string,
  tagSlug: string,
  articles: StaticArticle[],
  currentPage: number,
  totalPages: number,
  pathToRoot: string
): string {
  const cards = articles.map(a => renderStaticArticleCard(a, pathToRoot, tagSlug)).join('\n');
  const pagination = renderStaticPagination(currentPage, totalPages, pathToRoot + `tag/${tagSlug}/`);

  const content = `
    <div class="tag-page-header">
      <h1 class="section-title">${tagName}</h1>
      <a href="${pathToRoot}tag/index.html" class="back-to-tags">&larr; All topics</a>
    </div>
    <section class="article-list">
      ${cards}
      ${pagination}
    </section>
  `;

  return staticLayout(tagName, content, pathToRoot);
}

/**
 * Generate all tag pages
 */
export async function generateTagPages(
  pool: Pool,
  outputDir: string
): Promise<{ tagsGenerated: number; pagesGenerated: number }> {
  const tags = await getTagsWithCounts(pool);

  if (tags.length === 0) {
    console.info('  No tags with articles');
    return { tagsGenerated: 0, pagesGenerated: 0 };
  }

  let pagesGenerated = 0;

  // Generate tag index page
  const indexHtml = generateTagIndexPage(tags, '../../');
  await writeFile(join(outputDir, 'tag', 'index.html'), indexHtml);
  pagesGenerated++;

  // Generate individual tag pages
  for (const tag of tags) {
    const totalArticles = parseInt(tag.article_count, 10);
    const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

    for (let page = 1; page <= totalPages; page++) {
      const { articles } = await getArticlesForTagPage(pool, tag.slug, page);

      const staticArticles: StaticArticle[] = [];
      for (const a of articles) {
        const content = await loadContent(a.content_path);
        staticArticles.push({
          id: a.id,
          title: a.title,
          author: a.author_name ?? 'Unknown',
          publicationName: a.publication_name,
          publicationSlug: a.publication_slug,
          publishedAt: a.published_at,
          estimatedReadTimeMinutes: a.estimated_read_time_minutes,
          excerpt: extractExcerpt(content),
          url: a.original_url,
          imagePath: a.image_path,
          displayTag: a.display_tag_name ? { slug: a.display_tag_slug!, name: a.display_tag_name } : null,
        });
      }

      const pathToRoot = page === 1 ? '../../' : '../../../../';
      const html = generateTagPage(tag.name, tag.slug, staticArticles, page, totalPages, pathToRoot);
      const filePath = page === 1
        ? join(outputDir, 'tag', tag.slug, 'index.html')
        : join(outputDir, 'tag', tag.slug, 'page', String(page), 'index.html');
      await writeFile(filePath, html);
      pagesGenerated++;
    }
  }

  console.info(`  Generated ${pagesGenerated} pages for ${tags.length} tags`);
  return { tagsGenerated: tags.length, pagesGenerated };
}
