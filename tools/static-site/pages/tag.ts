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
import { failedGateSqlFragment } from '../../editorial/publish-gate.js';
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
 * Get articles for a tag page. The display tag is always the page's own tag,
 * so every card on a tag page shows that tag consistently (fixes #503 Gemini HIGH
 * feedback: cards previously showed an unrelated alternate tag, or no tag at all
 * when an article had only one tag).
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
      AND (a.rewritten_content_path IS NOT NULL OR a.is_consolidated = true)
      AND a.consolidated_into IS NULL
      AND a.image_path IS NOT NULL
      AND ${failedGateSqlFragment('a')}
  `, [tagSlug]);
  const total = parseInt(countRows[0].count, 10);

  // Display tag = the page's own tag (joined via article_tags + tags)
  const { rows } = await pool.query<TaggedArticleRow>(`
    SELECT
      a.id, a.title, a.author_name,
      p.name AS publication_name, p.slug AS publication_slug,
      a.published_at, a.estimated_read_time_minutes,
      a.content_path, a.image_path, a.original_url,
      at.tag_slug AS display_tag_slug,
      t.name AS display_tag_name
    FROM app.articles a
    JOIN app.publications p ON a.publication_id = p.id
    JOIN app.article_tags at ON at.article_id = a.id AND at.tag_slug = $1
    JOIN app.tags t ON t.slug = at.tag_slug
    WHERE (a.rewritten_content_path IS NOT NULL OR a.is_consolidated = true)
      AND a.consolidated_into IS NULL
      AND ${failedGateSqlFragment('a')}
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
 * Get consolidation metadata (is_consolidated flag + source count) in bulk.
 * Returns empty map if commentary_sources table doesn't exist yet.
 */
export async function getConsolidationBulk(
  pool: Pool,
  articleIds: string[]
): Promise<Map<string, { isConsolidated: boolean; sourceCount: number; primaryAuthor: string | null }>> {
  const map = new Map<string, { isConsolidated: boolean; sourceCount: number; primaryAuthor: string | null }>();
  if (articleIds.length === 0) {return map;}
  try {
    const { rows } = await pool.query<{
      id: string;
      is_consolidated: boolean;
      source_count: string;
      primary_author: string | null;
    }>(`
      SELECT
        a.id,
        COALESCE(a.is_consolidated, false) AS is_consolidated,
        COALESCE((SELECT COUNT(*) FROM app.commentary_sources cs WHERE cs.commentary_article_id = a.id), 0)::text AS source_count,
        (
          SELECT s.author_name
          FROM app.commentary_sources cs
          JOIN app.articles s ON s.id = cs.source_article_id
          WHERE cs.commentary_article_id = a.id
          ORDER BY cs.is_primary DESC, cs.position ASC
          LIMIT 1
        ) AS primary_author
      FROM app.articles a
      WHERE a.id = ANY($1)
    `, [articleIds]);
    for (const row of rows) {
      map.set(row.id, {
        isConsolidated: row.is_consolidated,
        sourceCount: parseInt(row.source_count, 10),
        primaryAuthor: row.primary_author,
      });
    }
  } catch {
    // Graceful degrade when column/table missing
  }
  return map;
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
  const indexHtml = generateTagIndexPage(tags, '../');
  await writeFile(join(outputDir, 'tag', 'index.html'), indexHtml);
  pagesGenerated++;

  // Generate individual tag pages
  for (const tag of tags) {
    const totalArticles = parseInt(tag.article_count, 10);
    const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

    for (let page = 1; page <= totalPages; page++) {
      const { articles } = await getArticlesForTagPage(pool, tag.slug, page);

      const consolidationMap = await getConsolidationBulk(pool, articles.map(a => a.id));
      const staticArticles: StaticArticle[] = [];
      for (const a of articles) {
        const content = await loadContent(a.content_path);
        const consolidation = consolidationMap.get(a.id);
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
          // Always show the page's own tag on every card (see Gemini HIGH
          // feedback on PR #503). Falls back to DB name/slug; both should
          // always be present because of the JOIN on article_tags + tags.
          displayTag: {
            slug: a.display_tag_slug ?? tag.slug,
            name: a.display_tag_name ?? tag.name,
          },
          isConsolidated: consolidation?.isConsolidated ?? false,
          sourceCount: consolidation?.sourceCount ?? 0,
          primarySourceAuthor: consolidation?.primaryAuthor ?? null,
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
