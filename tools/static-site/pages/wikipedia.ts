/**
 * Wikipedia page generator - shows full content (we own the copyright on rewrites)
 */

import type { Pool } from 'pg';
import { staticReadingLayout } from '../templates.js';
import { writeFile, escapeHtml, renderBookPurchaseLinks, loadAffiliateBooks, buildAmazonUrl, buildBWBUrl } from '../utils.js';
import type { ParsedAffiliateBook } from '../utils.js';
import { join } from 'path';
import { readFile } from 'fs/promises';

interface WikipediaRow {
  id: string;
  slug: string;
  title: string;
  content_path: string;
  original_url: string;
  estimated_read_time_minutes: number;
  status: string;
  affiliate_links: Array<{ isbn10: string; isbn13: string; title: string; author: string; description: string }> | null;
}

interface RelatedArticle {
  id: string;
  title: string;
  author: string;
  publication_name: string;
  topic_summary: string;
}

/**
 * Get all Wikipedia articles for static generation
 */
async function getAllWikipediaArticles(pool: Pool): Promise<WikipediaRow[]> {
  const result = await pool.query<WikipediaRow>(`
    SELECT
      id,
      slug,
      title,
      content_path,
      original_url,
      estimated_read_time_minutes,
      COALESCE(status, 'complete') AS status,
      affiliate_links
    FROM app.wikipedia_articles
    ORDER BY created_at DESC
  `);
  return result.rows;
}

/**
 * Get related Substack articles that link to this Wikipedia article
 */
async function getRelatedArticles(
  pool: Pool,
  wikipediaId: string
): Promise<RelatedArticle[]> {
  const result = await pool.query<RelatedArticle>(`
    SELECT
      a.id,
      a.title,
      a.author_name as author,
      p.name as publication_name,
      awl.topic_summary
    FROM app.article_wikipedia_links awl
    JOIN app.articles a ON awl.article_id = a.id
    JOIN app.publications p ON a.publication_id = p.id
    WHERE awl.wikipedia_id = $1
    ORDER BY a.published_at DESC NULLS LAST
  `, [wikipediaId]);
  return result.rows;
}

/**
 * Read Wikipedia content from filesystem.
 * Content paths are relative to library/ directory.
 * Returns empty string if missing — caller must skip.
 */
async function readWikipediaContent(contentPath: string): Promise<string> {
  try {
    const fullPath = join(process.cwd(), 'library', contentPath);
    return await readFile(fullPath, 'utf-8');
  } catch {
    return '';
  }
}

/**
 * Generate Wikipedia page HTML
 */
function generateWikipediaPage(
  wiki: WikipediaRow,
  content: string,
  relatedArticles: RelatedArticle[],
  affiliateBooksMap: Map<string, ParsedAffiliateBook>
): string {
  const pathToRoot = '../../';
  const affiliateTag = process.env.AMAZON_AFFILIATE_TAG ?? '';

  // Check if this Wikipedia article is about a book
  const matchedBook = affiliateBooksMap.get(wiki.title.toLowerCase());
  const purchaseLinksHtml = matchedBook
    ? renderBookPurchaseLinks(matchedBook, affiliateTag)
    : '';

  // Check if this Wikipedia article is about an author who has books
  const authorBooks: ParsedAffiliateBook[] = [];
  if (!matchedBook) {
    for (const [, book] of affiliateBooksMap) {
      if (wiki.title.toLowerCase().includes(book.author.toLowerCase())) {
        authorBooks.push(book);
      }
    }
  }

  let authorBooksHtml = '';
  if (authorBooks.length > 0) {
    const bookItems = authorBooks
      .map((book) => {
        const links: string[] = [];
        if (affiliateTag && book.isbn10) {
          links.push(`<a href="${buildAmazonUrl(book.isbn10, affiliateTag)}" target="_blank" rel="noopener sponsored">Amazon</a>`);
        }
        if (book.isbn13) {
          links.push(`<a href="${buildBWBUrl(book.isbn13)}" target="_blank" rel="noopener sponsored">Better World Books</a>`);
        }
        const buyText = links.length > 0 ? ` — ${links.join(' · ')}` : '';
        return `<li>${escapeHtml(book.title)}${buyText} — ${escapeHtml(book.description)}</li>`;
      })
      .join('\n          ');

    authorBooksHtml = `
      <div class="author-books">
        <p>Books by this author:</p>
        <ul>
          ${bookItems}
        </ul>
      </div>`;
  }

  // Related articles section
  let relatedHtml = '';
  if (relatedArticles.length > 0) {
    const articleItems = relatedArticles
      .map(
        (a) => `
      <li class="related-article-item">
        <a href="${pathToRoot}article/${a.id}/index.html">
          <strong>${escapeHtml(a.title)}</strong>
        </a>
        <span class="article-meta">
          by ${escapeHtml(a.author)} in ${escapeHtml(a.publication_name)}
        </span>
      </li>`
      )
      .join('\n');

    relatedHtml = `
      <section class="related-articles">
        <h2>Related Articles</h2>
        <p class="related-intro">This deep dive was written in connection with these articles:</p>
        <ul class="related-list">
          ${articleItems}
        </ul>
      </section>
    `;
  }

  const isStub = wiki.status === 'stub';
  const badgeText = isStub ? 'Wikipedia Deep Dive (Coming Soon)' : 'Wikipedia Deep Dive';
  const contentBlock = isStub
    ? `<div class="wikipedia-stub">
        <p>This deep dive is being prepared. In the meantime, you can read the original article on Wikipedia.</p>
        <p><a href="${wiki.original_url}" target="_blank" rel="noopener" class="read-button">
          Read on Wikipedia &rarr;
        </a></p>
      </div>`
    : `<div class="wikipedia-content">${content}</div>`;

  const footerNote = isStub
    ? ''
    : `<p class="rewrite-note">
        This article has been rewritten from Wikipedia source material for enjoyable reading.
        Content may have been condensed, restructured, or simplified.
      </p>`;

  const pageContent = `
    <article class="wikipedia-page">
      <header class="wikipedia-header">
        <div class="type-badge">${badgeText}</div>
        <h1>${escapeHtml(wiki.title)}</h1>
        <div class="article-meta">
          <span class="read-time">${wiki.estimated_read_time_minutes} min read</span>
        </div>
      </header>

      ${authorBooksHtml}

      ${contentBlock}

      ${purchaseLinksHtml}

      <footer class="wikipedia-footer">
        <p class="source-link">
          <a href="${wiki.original_url}" target="_blank" rel="noopener">
            View original Wikipedia article &rarr;
          </a>
        </p>
        ${footerNote}
      </footer>

      ${relatedHtml}
    </article>
  `;

  return staticReadingLayout(wiki.title, pageContent, pathToRoot);
}

/**
 * Generate all Wikipedia pages
 */
export async function generateWikipediaPages(
  pool: Pool,
  outputDir: string
): Promise<{ pagesGenerated: number }> {
  const wikiArticles = await getAllWikipediaArticles(pool);
  const affiliateBooksMap = await loadAffiliateBooks(pool);
  let pagesGenerated = 0;

  let _skipped = 0;
  for (const wiki of wikiArticles) {
    const content = await readWikipediaContent(wiki.content_path);
    // Skip wiki pages whose content file is missing or trivially small.
    // Empty or near-empty pages look broken on the public site; better to 404.
    if (content.trim().length < 200) {
      _skipped++;
      continue;
    }
    const relatedArticles = await getRelatedArticles(pool, wiki.id);

    const html = generateWikipediaPage(wiki, content, relatedArticles, affiliateBooksMap);
    const filePath = join(outputDir, 'wikipedia', wiki.slug, 'index.html');

    await writeFile(filePath, html);
    pagesGenerated++;

    if (pagesGenerated % 100 === 0) {
      console.info(`  Generated ${pagesGenerated} Wikipedia pages...`);
    }
  }

  console.info(`  Generated ${pagesGenerated} Wikipedia pages`);
  return { pagesGenerated };
}
