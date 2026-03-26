/**
 * Article page generator - shows excerpts with links to original
 * Copyright compliant: only excerpts, not full content
 */

import type { Pool } from 'pg';
import { staticReadingLayout } from '../templates.js';
import { writeFile, extractHtmlExcerpt, escapeHtml, formatDate, buildAmazonUrl, buildBWBUrl, loadAffiliateBooks, cleanTranscript } from '../utils.js';
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
  affiliate_links: Array<{ isbn10: string; isbn13: string; title: string; author: string; description: string }> | null;
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
      a.original_url,
      a.affiliate_links
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

  // Find the end of the 2nd </p> tag and insert after it,
  // but skip positions where a <blockquote> immediately follows
  let count = 0;
  const closingP = /<\/p>/gi;
  let match: RegExpExecArray | null;
  let fallbackPos: number | null = null;
  while ((match = closingP.exec(html)) !== null) {
    count++;
    if (count >= 2) {
      const insertPos = match.index + match[0].length;
      const afterInsert = html.slice(insertPos).trimStart();
      if (!afterInsert.startsWith('<blockquote')) {
        return html.slice(0, insertPos) + '\n' + imgTag + '\n' + html.slice(insertPos);
      }
      // Remember first valid position in case all remaining have blockquotes
      if (fallbackPos === null) {
        fallbackPos = insertPos;
      }
    }
  }

  // All positions after 2nd paragraph had blockquotes — use the first one we found
  if (fallbackPos !== null) {
    return html.slice(0, fallbackPos) + '\n' + imgTag + '\n' + html.slice(fallbackPos);
  }

  // Fewer than 2 paragraphs — put it at the end
  return html + '\n' + imgTag;
}

/**
 * A book from affiliate_links that may or may not have a Wikipedia page
 */
interface BookDeepDive {
  title: string;
  author: string;
  description: string;
  wikiSlug: string | null;
  isbn10: string | null;
  isbn13: string | null;
}

/**
 * Generate article excerpt page HTML
 * Layout order: Title/byline → Deep Dives → Excerpt → Link to original
 */
function generateArticlePage(
  article: ArticleRow,
  contentHtml: string,
  wikipediaLinks: WikipediaLink[],
  bookDeepDives: BookDeepDive[],
  isFullRewrite: boolean = false,
  excerptHtml: string = ''
): string {
  const date = formatDate(article.published_at);
  const pathToRoot = '../../';

  // Merge Wikipedia links and books into a single deep dives list
  const wikiItems = wikipediaLinks
    .map(
      (w) => {
        const summary = w.topic_summary && w.topic_summary.trim()
          ? `<p class="topic-summary">${escapeHtml(w.topic_summary)}</p>`
          : '';
        return `
      <li class="deep-dive-item">
        <a href="${pathToRoot}wikipedia/${w.slug}/index.html">
          <strong>${escapeHtml(w.title)}</strong>
        </a>
        ${summary}
      </li>`;
      }
    )
    .join('\n');

  const affiliateTag = process.env.AMAZON_AFFILIATE_TAG ?? '';

  const bookItems = bookDeepDives
    .map((b) => {
      let titleLink: string;
      const buyLinks: string[] = [];
      if (b.wikiSlug) {
        titleLink = `<a href="${pathToRoot}wikipedia/${b.wikiSlug}/index.html">
          <strong>${escapeHtml(b.title)}</strong>
        </a>`;
      } else if (b.isbn10 && affiliateTag) {
        titleLink = `<a href="${buildAmazonUrl(b.isbn10, affiliateTag)}" target="_blank" rel="noopener">
          <strong>${escapeHtml(b.title)}</strong>
        </a>`;
      } else {
        titleLink = `<strong>${escapeHtml(b.title)}</strong>`;
      }
      if (b.isbn10 && affiliateTag) {
        buyLinks.push(`<a href="${buildAmazonUrl(b.isbn10, affiliateTag)}" target="_blank" rel="noopener sponsored" class="buy-link">Amazon</a>`);
      }
      if (b.isbn13) {
        buyLinks.push(`<a href="${buildBWBUrl(b.isbn13)}" target="_blank" rel="noopener" class="buy-link">Better World Books</a>`);
      }
      const buyHtml = buyLinks.length > 0
        ? `<span class="read-time">${buyLinks.join(' · ')}</span>`
        : '';
      return `
      <li class="deep-dive-item">
        ${titleLink}
        ${buyHtml}
        <span class="deep-dive-author">by ${escapeHtml(b.author)}</span>
        <p class="topic-summary">${escapeHtml(b.description)}</p>
      </li>`;
    })
    .join('\n');

  const allItems = bookItems + wikiItems;
  let deepDivesHtml = '';
  if (allItems.trim()) {
    deepDivesHtml = `
      <section id="deep-dives" class="deep-dives">
        <h2>Deep Dives</h2>
        <p class="deep-dives-intro">Explore these related deep dives:</p>
        <ul class="deep-dive-list">
          ${allItems}
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
 * Look up a Wikipedia article slug by book title (case-insensitive)
 */
async function findWikiSlugForBook(
  pool: Pool,
  bookTitle: string
): Promise<string | null> {
  const result = await pool.query<{ slug: string }>(
    `SELECT slug FROM app.wikipedia_articles WHERE LOWER(title) = LOWER($1) AND status = 'complete' LIMIT 1`,
    [bookTitle]
  );
  return result.rows[0]?.slug ?? null;
}

/**
 * Generate all article pages
 */
export async function generateArticlePages(
  pool: Pool,
  outputDir: string
): Promise<{ pagesGenerated: number }> {
  const articles = await getAllArticles(pool);
  const affiliateBooksMap = await loadAffiliateBooks(pool);
  let pagesGenerated = 0;

  for (const article of articles) {
    // If we have a rewritten version, use full content; otherwise excerpt
    const hasRewrite = !!article.rewritten_content_path;
    const rawContent = await loadArticleContent(article.content_path);
    const isYouTube = article.original_url.includes('youtube.com') || article.original_url.includes('youtu.be');
    const rawExcerpt = extractHtmlExcerpt(rawContent, 400);
    // Clean speech artifacts from YouTube transcript excerpts
    const excerpt = isYouTube ? cleanTranscript(rawExcerpt) : rawExcerpt;

    let displayContent: string;
    if (hasRewrite) {
      displayContent = await loadArticleContent(article.rewritten_content_path);
    } else {
      displayContent = excerpt;
    }
    const wikipediaLinks = await getLinkedWikipedia(pool, article.id);

    // Build book deep dives from affiliate_links on the article
    const rawAffiliateLinks = Array.isArray(article.affiliate_links) ? article.affiliate_links : [];
    const bookDeepDives: BookDeepDive[] = [];
    for (const link of rawAffiliateLinks) {
      // Check if this book has a Wikipedia page
      const wikiSlug = await findWikiSlugForBook(pool, link.title);
      // Use description from the affiliate books map if available, fall back to article's affiliate_links
      const mapEntry = affiliateBooksMap.get(link.title.toLowerCase());
      bookDeepDives.push({
        title: link.title,
        author: link.author,
        description: mapEntry?.description ?? link.description,
        wikiSlug,
        isbn10: link.isbn10 ?? mapEntry?.isbn10 ?? null,
        isbn13: link.isbn13 ?? mapEntry?.isbn13 ?? null,
      });
    }

    const html = generateArticlePage(article, displayContent, wikipediaLinks, bookDeepDives, hasRewrite, hasRewrite ? excerpt : '');
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
