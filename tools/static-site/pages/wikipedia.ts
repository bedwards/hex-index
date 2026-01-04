/**
 * Wikipedia page generator - shows full content (we own the copyright on rewrites)
 */

import type { Pool } from 'pg';
import { staticReadingLayout } from '../templates.js';
import { writeFile, escapeHtml } from '../utils.js';
import { join } from 'path';
import { readFile } from 'fs/promises';

interface WikipediaRow {
  id: string;
  slug: string;
  title: string;
  content_path: string;
  original_url: string;
  estimated_read_time_minutes: number;
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
      estimated_read_time_minutes
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
 * Read Wikipedia content from filesystem
 */
async function readWikipediaContent(contentPath: string): Promise<string> {
  try {
    return await readFile(contentPath, 'utf-8');
  } catch {
    console.warn(`  Warning: Could not read content at ${contentPath}`);
    return '<p>Content not available.</p>';
  }
}

/**
 * Generate Wikipedia page HTML
 */
function generateWikipediaPage(
  wiki: WikipediaRow,
  content: string,
  relatedArticles: RelatedArticle[]
): string {
  const pathToRoot = '../../';

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

  const pageContent = `
    <article class="wikipedia-page">
      <header class="wikipedia-header">
        <div class="type-badge">Wikipedia Deep Dive</div>
        <h1>${escapeHtml(wiki.title)}</h1>
        <div class="article-meta">
          <span class="read-time">${wiki.estimated_read_time_minutes} min read</span>
        </div>
      </header>

      <div class="wikipedia-content">
        ${content}
      </div>

      <footer class="wikipedia-footer">
        <p class="source-link">
          <a href="${wiki.original_url}" target="_blank" rel="noopener">
            View original Wikipedia article &rarr;
          </a>
        </p>
        <p class="rewrite-note">
          This article has been rewritten from Wikipedia source material for enjoyable reading.
          Content may have been condensed, restructured, or simplified.
        </p>
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
  let pagesGenerated = 0;

  for (const wiki of wikiArticles) {
    const content = await readWikipediaContent(wiki.content_path);
    const relatedArticles = await getRelatedArticles(pool, wiki.id);

    const html = generateWikipediaPage(wiki, content, relatedArticles);
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
