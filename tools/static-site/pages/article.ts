/**
 * Article page generator - shows excerpts with links to original
 * Copyright compliant: only excerpts, not full content
 */

import type { Pool } from 'pg';
import { staticReadingLayout } from '../templates.js';
import { writeFile, extractHtmlExcerpt, escapeHtml, formatDate } from '../utils.js';
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

interface WikipediaLink {
  slug: string;
  title: string;
  estimated_read_time_minutes: number;
  topic_summary: string;
}

/**
 * Get all articles for static generation
 */
async function getAllArticles(pool: Pool): Promise<ArticleRow[]> {
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
  `);
  return result.rows;
}

/**
 * Get linked Wikipedia articles for a Substack article
 */
async function getLinkedWikipedia(
  pool: Pool,
  articleId: string
): Promise<WikipediaLink[]> {
  const result = await pool.query<WikipediaLink>(`
    SELECT
      w.slug,
      w.title,
      w.estimated_read_time_minutes,
      awl.topic_summary
    FROM app.article_wikipedia_links awl
    JOIN app.wikipedia_articles w ON awl.wikipedia_id = w.id
    WHERE awl.article_id = $1
    ORDER BY awl.relevance_rank
  `, [articleId]);
  return result.rows;
}

/**
 * Generate article excerpt page HTML
 * Layout order: Title/byline → Deep Dives → Excerpt → Link to original
 */
function generateArticlePage(
  article: ArticleRow,
  excerpt: string,
  wikipediaLinks: WikipediaLink[]
): string {
  const date = formatDate(article.published_at);
  const pathToRoot = '../../';

  // Deep dives section if Wikipedia links exist - shown FIRST after header
  let deepDivesHtml = '';
  if (wikipediaLinks.length > 0) {
    const linkItems = wikipediaLinks
      .map(
        (w) => `
      <li class="deep-dive-item">
        <a href="${pathToRoot}wikipedia/${w.slug}/index.html">
          <strong>${escapeHtml(w.title)}</strong>
          <span class="read-time">${w.estimated_read_time_minutes} min read</span>
        </a>
        <p class="topic-summary">${escapeHtml(w.topic_summary)}</p>
      </li>`
      )
      .join('\n');

    deepDivesHtml = `
      <section class="deep-dives">
        <h2>Deep Dives</h2>
        <p class="deep-dives-intro">Explore related topics with these Wikipedia articles, rewritten for enjoyable reading:</p>
        <ul class="deep-dive-list">
          ${linkItems}
        </ul>
      </section>
    `;
  }

  const authorName = article.author_name ?? 'Unknown';
  const content = `
    <article class="article-page">
      <header class="article-header">
        <h1>${escapeHtml(article.title)}</h1>
        <div class="article-meta">
          <span class="author">By ${escapeHtml(authorName)}</span>
          <span class="separator">&middot;</span>
          <a href="${pathToRoot}publication/${article.publication_slug}/index.html" class="publication">
            ${escapeHtml(article.publication_name)}
          </a>
          ${date ? `<span class="separator">&middot;</span><time>${date}</time>` : ''}
          <span class="separator">&middot;</span>
          <span class="read-time">${article.estimated_read_time_minutes} min read</span>
        </div>
      </header>

      ${deepDivesHtml}

      <div class="article-excerpt">
        ${excerpt}
      </div>

      <div class="read-full-article">
        <a href="${article.original_url}" class="read-button" target="_blank" rel="noopener">
          Read full article on ${escapeHtml(article.publication_name)} &rarr;
        </a>
        <p class="copyright-note">
          This excerpt is provided for preview purposes.
          Full article content is available on the original publication.
        </p>
      </div>
    </article>
  `;

  return staticReadingLayout(article.title, content, pathToRoot);
}

/**
 * Generate all article pages
 */
export async function generateArticlePages(
  pool: Pool,
  outputDir: string
): Promise<{ pagesGenerated: number }> {
  const articles = await getAllArticles(pool);
  let pagesGenerated = 0;

  for (const article of articles) {
    const content = await loadArticleContent(article.content_path);
    // Use HTML excerpt to preserve formatting, 400 words for fair use
    const excerpt = extractHtmlExcerpt(content, 400);
    const wikipediaLinks = await getLinkedWikipedia(pool, article.id);

    const html = generateArticlePage(article, excerpt, wikipediaLinks);
    const filePath = join(outputDir, 'article', article.id, 'index.html');

    await writeFile(filePath, html);
    pagesGenerated++;

    if (pagesGenerated % 100 === 0) {
      console.info(`  Generated ${pagesGenerated} article pages...`);
    }
  }

  console.info(`  Generated ${pagesGenerated} article pages`);
  return { pagesGenerated };
}
