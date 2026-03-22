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
  rewritten_content_path: string | null;
  image_path: string | null;
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
      a.rewritten_content_path,
      a.image_path,
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
 * Insert a generated image into the middle of article text
 * Places it after the 2nd paragraph as a floating illustration
 */
function injectImageIntoText(html: string, imageSrc: string): string {
  const imgTag = `<figure class="inline-illustration">
    <img src="${imageSrc}" alt="" loading="lazy" width="600" height="315">
  </figure>`;

  // Find the end of the 2nd </p> tag and insert after it
  let count = 0;
  const closingP = /<\/p>/gi;
  let match: RegExpExecArray | null;
  while ((match = closingP.exec(html)) !== null) {
    count++;
    if (count === 2) {
      const insertPos = match.index + match[0].length;
      return html.slice(0, insertPos) + '\n' + imgTag + '\n' + html.slice(insertPos);
    }
  }

  // Fewer than 2 paragraphs — put it at the end
  return html + '\n' + imgTag;
}

/**
 * Generate article excerpt page HTML
 * Layout order: Title/byline → Deep Dives → Excerpt → Link to original
 */
function generateArticlePage(
  article: ArticleRow,
  contentHtml: string,
  wikipediaLinks: WikipediaLink[],
  isFullRewrite: boolean = false,
  excerptHtml: string = ''
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
      <section id="deep-dives" class="deep-dives">
        <h2>Deep Dives</h2>
        <p class="deep-dives-intro">Explore related topics with these Wikipedia articles, rewritten for enjoyable reading:</p>
        <ul class="deep-dive-list">
          ${linkItems}
        </ul>
      </section>
    `;
  }

  const authorName = article.author_name ?? 'Unknown';
  const pubName = escapeHtml(article.publication_name);
  const authorEsc = escapeHtml(authorName);
  const isYouTube = article.original_url.includes('youtube.com');

  // Content section label + nav links
  const hasDeepDives = wikipediaLinks.length > 0;
  const contentLabel = isFullRewrite
    ? `<div class="content-label">
        <span class="label-text">Commentary by <a href="${pathToRoot}about/index.html">Brian Edwards</a></span>
        <nav class="content-nav">
          ${hasDeepDives ? `<a href="#deep-dives">Deep dives</a><span class="separator">&middot;</span>` : ''}
          <a href="${article.original_url}" target="_blank" rel="noopener">${isYouTube ? 'Original video' : 'Original article'} &rarr;</a>
        </nav>
      </div>`
    : `<div class="content-label">
        <span class="label-text">${isYouTube ? 'Transcript excerpt' : 'Excerpt'} from <a href="${pathToRoot}publication/${article.publication_slug}/index.html">${pubName}</a></span>
        <nav class="content-nav">
          <a href="${article.original_url}" target="_blank" rel="noopener">${isYouTube ? 'Watch on YouTube' : 'Read full article'} &rarr;</a>
        </nav>
      </div>`;

  // If we have a rewrite, show excerpt + button together in a card at the bottom
  const excerptSection = isFullRewrite && excerptHtml
    ? `<section id="excerpt" class="excerpt-card">
        <div class="content-label">
          <span class="label-text">${isYouTube ? 'Transcript excerpt' : 'Excerpt from the original article'} on ${pubName}</span>
        </div>
        <div class="article-excerpt">
          ${excerptHtml}
        </div>
        <div class="excerpt-card-cta">
          <a href="${article.original_url}" class="read-button" target="_blank" rel="noopener">
            ${isYouTube ? 'Watch on YouTube' : `Read the entire original on ${pubName}`} &rarr;
          </a>
        </div>
      </section>`
    : '';

  // For non-rewrite, contentHtml IS the excerpt; for rewrite, load it separately
  const mainContent = isFullRewrite ? contentHtml : contentHtml;
  const content = `
    <article class="article-page">
      <header class="article-header">
        <h1>${escapeHtml(article.title)}</h1>
        <div class="article-meta">
          <span class="author">${authorEsc}</span>
          <span class="separator">&middot;</span>
          <a href="${pathToRoot}publication/${article.publication_slug}/index.html" class="publication">
            ${pubName}
          </a>
          ${date ? `<span class="separator">&middot;</span><time>${date}</time>` : ''}
          <span class="separator">&middot;</span>
          <span class="read-time">${article.estimated_read_time_minutes} min read</span>
        </div>
      </header>

      ${contentLabel}

      ${isFullRewrite ? `
      <div class="article-content">
        ${article.image_path ? injectImageIntoText(mainContent, `${pathToRoot}${article.image_path}`) : mainContent}
      </div>

      ${deepDivesHtml}

      ${excerptSection}
      ` : `
      ${deepDivesHtml}
      <div class="excerpt-card">
        <div class="article-excerpt">
          ${mainContent}
        </div>
        <div class="excerpt-card-cta">
          <a href="${article.original_url}" class="read-button" target="_blank" rel="noopener">
            ${isYouTube ? `Watch on YouTube` : `Continue reading on ${pubName}`} &rarr;
          </a>
          <p class="cta-note">${isYouTube ? `Watch the full video by ${authorEsc} on YouTube.` : `The full article by ${authorEsc} is available on ${pubName}.`}</p>
        </div>
      </div>
      `}
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
    // If we have a rewritten version, use full content; otherwise excerpt
    const hasRewrite = !!article.rewritten_content_path;
    const rawContent = await loadArticleContent(article.content_path);
    const excerpt = extractHtmlExcerpt(rawContent, 400);

    let displayContent: string;
    if (hasRewrite) {
      displayContent = await loadArticleContent(article.rewritten_content_path);
    } else {
      displayContent = excerpt;
    }
    const wikipediaLinks = await getLinkedWikipedia(pool, article.id);

    const html = generateArticlePage(article, displayContent, wikipediaLinks, hasRewrite, hasRewrite ? excerpt : '');
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
