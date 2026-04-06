/**
 * Server-side HTML page rendering
 *
 * Web 1.0 style - each page is a full HTML document served by the server.
 * This is required for Speechify Chrome extension text highlighting to work correctly.
 * Speechify needs full page loads to properly track and highlight text.
 *
 * DO NOT convert this back to a Single Page App (SPA) - it will break Speechify!
 */

import { Router, Request, Response } from 'express';
import { Pool } from 'pg';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { loadAffiliateBooks, renderBookPurchaseLinks, buildAmazonUrl } from '../shared/affiliate-utils.js';
import type { ParsedAffiliateBook } from '../shared/affiliate-utils.js';

interface Article {
  id: string;
  title: string;
  slug: string;
  original_url: string;
  content_path: string | null;
  author_name: string | null;
  published_at: string | null;
  word_count: number | null;
  estimated_read_time_minutes: number | null;
  tags: Record<string, string>;
  publication_name: string;
  publication_slug: string;
  is_consolidated?: boolean;
}

interface CommentarySourceRow {
  source_article_id: string;
  title: string;
  author_name: string | null;
  publication_name: string;
  publication_slug: string;
  original_url: string;
  content_path: string | null;
  is_primary: boolean;
  position: number;
}

interface Publication {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  author_name: string | null;
  article_count: number;
}

interface WikipediaArticle {
  id: string;
  title: string;
  slug: string;
  original_url: string;
  content_path: string | null;
  word_count: number | null;
  estimated_read_time_minutes: number | null;
}

interface WikipediaLink {
  wikipedia_id: string;
  title: string;
  slug: string;
  read_time: number | null;
  topic_summary: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) {
    return '';
  }
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function layout(title: string, content: string, currentPath: string = '/'): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} - hex-index</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <a href="#main" class="skip-link">Skip to content</a>

  <header class="header">
    <div class="container header-inner">
      <a href="/" class="logo">hex-index</a>
      <nav class="nav">
        <a href="/"${currentPath === '/' ? ' class="active"' : ''}>Articles</a>
        <a href="/search"${currentPath === '/search' ? ' class="active"' : ''}>Search</a>
      </nav>
      <form action="/search" method="get" class="search-bar">
        <input type="search" name="q" class="search-input" placeholder="Search articles...">
      </form>
    </div>
  </header>

  <main id="main" class="main">
    ${content}
  </main>

  <footer class="footer">
    <div class="container">
      <p>hex-index - Personal Substack Library</p>
    </div>
  </footer>
</body>
</html>`;
}

/**
 * Minimal layout optimized for Speechify text-to-speech reading
 * - Simple header with just hex-index link
 * - No nav, no search, no footer
 * - Clean semantic HTML for text highlighting
 */
function readingLayout(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} - hex-index</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="reading-mode">
  <a href="#main" class="skip-link">Skip to content</a>

  <header class="header header-minimal">
    <div class="container header-inner">
      <a href="/" class="logo">hex-index</a>
    </div>
  </header>

  <main id="main" class="main">
    ${content}
  </main>
</body>
</html>`;
}

function renderArticleCard(article: Article & { source_count?: number }): string {
  const readTime = article.estimated_read_time_minutes
    ? `${article.estimated_read_time_minutes} min read`
    : '';

  const isConsolidated = article.is_consolidated && (article.source_count ?? 0) > 1;
  const displayAuthor = isConsolidated ? 'Brian Edwards' : article.author_name;
  const badge = isConsolidated
    ? `<span class="source-count-badge">${article.source_count} sources</span>`
    : '';

  return `
    <article class="article-card${isConsolidated ? ' consolidated' : ''}">
      <h2 class="article-card-title">
        <a href="/article/${escapeHtml(article.id)}">${escapeHtml(article.title)}</a>
      </h2>
      <div class="article-card-meta">
        <a href="/publication/${escapeHtml(article.publication_slug)}">${escapeHtml(article.publication_name)}</a>
        ${displayAuthor ? `<span>by ${escapeHtml(displayAuthor)}</span>` : ''}
        ${badge}
        ${article.published_at ? `<span>${formatDate(article.published_at)}</span>` : ''}
        ${readTime ? `<span>${readTime}</span>` : ''}
      </div>
    </article>
  `;
}

function renderArticleList(articles: Article[], total: number, offset: number, limit: number, baseUrl: string): string {
  if (articles.length === 0) {
    return `
      <div class="empty">
        <p>No articles found.</p>
      </div>
    `;
  }

  const hasNext = offset + limit < total;
  const hasPrev = offset > 0;
  const nextOffset = offset + limit;
  const prevOffset = Math.max(0, offset - limit);

  return `
    <div class="article-list">
      ${articles.map(a => renderArticleCard(a)).join('')}
    </div>
    <div class="pagination">
      <span>Showing ${offset + 1}-${Math.min(offset + articles.length, total)} of ${total} articles</span>
      <div class="pagination-links">
        ${hasPrev ? `<a href="${baseUrl}${baseUrl.includes('?') ? '&' : '?'}offset=${prevOffset}">&larr; Previous</a>` : ''}
        ${hasNext ? `<a href="${baseUrl}${baseUrl.includes('?') ? '&' : '?'}offset=${nextOffset}">Next &rarr;</a>` : ''}
      </div>
    </div>
  `;
}

export function createPagesRouter(pool: Pool): Router {
  const router = Router();
  const libraryPath = join(process.cwd(), 'library');

  // Load affiliate books map once at router creation
  let affiliateBooksMap: Map<string, ParsedAffiliateBook> = new Map();
  void loadAffiliateBooks(pool).then(map => { affiliateBooksMap = map; });

  // Home page - list recent articles
  router.get('/', async (_req: Request, res: Response) => {
    try {
      const limit = 30;
      const offset = parseInt(_req.query.offset as string) || 0;

      const countResult = await pool.query<{ count: string }>('SELECT COUNT(*) FROM app.articles');
      const total = parseInt(countResult.rows[0].count, 10);

      const result = await pool.query<Article & { source_count?: number }>(`
        SELECT a.*, p.name as publication_name, p.slug as publication_slug,
               COALESCE((SELECT COUNT(*) FROM app.commentary_sources cs WHERE cs.commentary_article_id = a.id), 0)::int AS source_count
        FROM app.articles a
        JOIN app.publications p ON a.publication_id = p.id
        ORDER BY a.published_at DESC NULLS LAST
        LIMIT $1 OFFSET $2
      `, [limit, offset]);

      const content = `
        <div class="container">
          <h1 class="page-title">Latest Articles</h1>
          ${renderArticleList(result.rows, total, offset, limit, '/')}
        </div>
      `;

      res.send(layout('Latest Articles', content, '/'));
    } catch (err) {
      console.error('Error rendering home:', err);
      res.status(500).send(layout('Error', '<div class="container error">Failed to load articles</div>'));
    }
  });

  // Search page
  router.get('/search', async (req: Request, res: Response) => {
    try {
      const query = (req.query.q as string) || '';
      const limit = 30;
      const offset = parseInt(req.query.offset as string) || 0;

      let whereClause = '';
      const params: (string | number)[] = [];
      let paramIndex = 1;

      if (query) {
        whereClause = `WHERE a.full_text_search @@ plainto_tsquery('english', $${paramIndex})`;
        params.push(query);
        paramIndex++;
      }

      const countResult = await pool.query<{ count: string }>(
        `SELECT COUNT(*) FROM app.articles a ${whereClause}`,
        params
      );
      const total = parseInt(countResult.rows[0].count, 10);

      const orderBy = query
        ? `ORDER BY ts_rank(a.full_text_search, plainto_tsquery('english', $1)) DESC, a.published_at DESC`
        : 'ORDER BY a.published_at DESC NULLS LAST';

      params.push(limit, offset);

      const result = await pool.query<Article & { source_count?: number }>(`
        SELECT a.*, p.name as publication_name, p.slug as publication_slug,
               COALESCE((SELECT COUNT(*) FROM app.commentary_sources cs WHERE cs.commentary_article_id = a.id), 0)::int AS source_count
        FROM app.articles a
        JOIN app.publications p ON a.publication_id = p.id
        ${whereClause}
        ${orderBy}
        LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
      `, params);

      const baseUrl = query ? `/search?q=${encodeURIComponent(query)}` : '/search';
      const pageTitle = query ? `Search: ${query}` : 'All Articles';

      const content = `
        <div class="container">
          <h1 class="page-title">${query ? `Results for "${escapeHtml(query)}"` : 'All Articles'}</h1>
          <form action="/search" method="get" class="search-form">
            <input type="search" name="q" value="${escapeHtml(query)}" class="search-input-large" placeholder="Search articles..." autofocus>
            <button type="submit" class="search-button">Search</button>
          </form>
          ${renderArticleList(result.rows, total, offset, limit, baseUrl)}
        </div>
      `;

      res.send(layout(pageTitle, content, '/search'));
    } catch (err) {
      console.error('Error rendering search:', err);
      res.status(500).send(layout('Error', '<div class="container error">Search failed</div>'));
    }
  });

  // Article page - optimized for Speechify text-to-speech
  router.get('/article/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const result = await pool.query<Article & { affiliate_links: Array<{ isbn10: string; isbn13: string; title: string; author: string; description: string }> | null }>(`
        SELECT a.*, p.name as publication_name, p.slug as publication_slug,
               COALESCE(a.is_consolidated, false) AS is_consolidated
        FROM app.articles a
        JOIN app.publications p ON a.publication_id = p.id
        WHERE a.id = $1
      `, [id]);

      if (result.rows.length === 0) {
        res.status(404).send(layout('Not Found', '<div class="container error">Article not found</div>'));
        return;
      }

      const article = result.rows[0];

      // Get related Wikipedia articles
      const wikiResult = await pool.query<WikipediaLink>(`
        SELECT w.id as wikipedia_id, w.title, w.slug, w.estimated_read_time_minutes as read_time, awl.topic_summary
        FROM app.article_wikipedia_links awl
        JOIN app.wikipedia_articles w ON awl.wikipedia_id = w.id
        WHERE awl.article_id = $1
        ORDER BY awl.relevance_rank
      `, [id]);
      const wikiLinks = wikiResult.rows;

      // Fetch commentary sources (multi-source consolidation, #450)
      let commentarySources: CommentarySourceRow[] = [];
      if (article.is_consolidated) {
        try {
          const csRes = await pool.query<CommentarySourceRow>(`
            SELECT s.id AS source_article_id, s.title, s.author_name,
                   p.name AS publication_name, p.slug AS publication_slug,
                   s.original_url, s.content_path, cs.is_primary, cs.position
            FROM app.commentary_sources cs
            JOIN app.articles s ON s.id = cs.source_article_id
            JOIN app.publications p ON p.id = s.publication_id
            WHERE cs.commentary_article_id = $1
            ORDER BY cs.position ASC
          `, [id]);
          commentarySources = csRes.rows;
        } catch {
          commentarySources = [];
        }
      }
      const isConsolidated = (article.is_consolidated ?? false) && commentarySources.length > 1;
      const primarySource = isConsolidated
        ? (commentarySources.find(s => s.is_primary) ?? commentarySources[0])
        : null;

      // Load article content from library
      let articleContent = '<p>Article content not available.</p>';
      if (article.content_path) {
        try {
          const contentPath = join(libraryPath, article.content_path);
          articleContent = await readFile(contentPath, 'utf-8');
        } catch {
          // Content file not found
        }
      }

      const readTime = article.estimated_read_time_minutes
        ? `${article.estimated_read_time_minutes} min read`
        : '';

      // Extract subtitle from tags if present
      const subtitle = article.tags?.subtitle || '';

      // Build book deep dives from affiliate_links — merged into deep dives section
      const rawAffiliateLinks = Array.isArray(article.affiliate_links) ? article.affiliate_links : [];
      const bookItems: string[] = [];
      for (const link of rawAffiliateLinks) {
        // Check if this book has a Wikipedia page
        const wikiResult2 = await pool.query<{ slug: string }>(
          `SELECT slug FROM app.wikipedia_articles WHERE LOWER(title) = LOWER($1) AND status = 'complete' LIMIT 1`,
          [link.title]
        );
        const wikiSlug = wikiResult2.rows[0]?.slug ?? null;
        const affiliateTag = process.env.AMAZON_AFFILIATE_TAG ?? '';
        let inner: string;
        if (wikiSlug) {
          inner = `<a href="/wikipedia/${escapeHtml(wikiSlug)}">${escapeHtml(link.title)}${link.author ? ` by ${escapeHtml(link.author)}` : ''}</a>`;
        } else if (link.isbn10 && affiliateTag) {
          inner = `<a href="${buildAmazonUrl(link.isbn10, affiliateTag)}" target="_blank" rel="noopener">${escapeHtml(link.title)}${link.author ? ` by ${escapeHtml(link.author)}` : ''}</a> <span class="read-time">view on Amazon</span>`;
        } else {
          inner = `<span>${escapeHtml(link.title)}${link.author ? ` by ${escapeHtml(link.author)}` : ''}</span>`;
        }
        bookItems.push(`<li>${inner}</li>`);
      }

      // Render Wikipedia deep dives section - compact list before content
      // Includes both Wikipedia articles and books (merged into one list)
      const allDeepDiveItems = [
        ...bookItems,
        ...wikiLinks.map(w => `
              <li><a href="/wikipedia/${escapeHtml(w.slug)}">${escapeHtml(w.title)}</a></li>
            `),
      ];
      const wikiSection = allDeepDiveItems.length > 0 ? `
        <nav class="deep-dives" aria-label="Related Wikipedia articles">
          <p class="deep-dives-label">Deep Dives</p>
          <ul class="deep-dives-list">
            ${allDeepDiveItems.join('')}
          </ul>
        </nav>
      ` : '';

      // Build the sources section. For multi-source commentary, render each
      // contributing source. For single-source articles, render the article
      // itself in the same source-excerpt style for visual consistency.
      const renderExcerpt = async (contentPath: string | null): Promise<string> => {
        if (!contentPath) {return '';}
        try {
          const raw = await readFile(join(libraryPath, contentPath), 'utf-8');
          const text = raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          const words = text.split(' ').slice(0, 200).join(' ');
          return `<p>${escapeHtml(words)}${text.split(' ').length > 200 ? '…' : ''}</p>`;
        } catch {
          return '';
        }
      };

      let sourcesSectionHtml = '';
      const parts: string[] = [];
      const ytLabel = (url: string) => /(?:youtube\.com|youtu\.be)/i.test(url) ? 'Watch video' : 'Read full article';
      if (isConsolidated) {
        for (const src of commentarySources) {
          const excerpt = await renderExcerpt(src.content_path);
          parts.push(`
            <article class="source-excerpt">
              <h3>${escapeHtml(src.title)}</h3>
              <div class="source-meta">by ${escapeHtml(src.author_name ?? 'Unknown')} · <a href="/publication/${escapeHtml(src.publication_slug)}">${escapeHtml(src.publication_name)}</a> · <a href="${escapeHtml(src.original_url)}" target="_blank" rel="noopener">${ytLabel(src.original_url)}</a></div>
              ${excerpt}
            </article>
          `);
        }
      } else {
        const excerpt = await renderExcerpt(article.content_path);
        parts.push(`
          <article class="source-excerpt">
            <h3>${escapeHtml(article.title)}</h3>
            <div class="source-meta">by ${escapeHtml(article.author_name ?? 'Unknown')} · <a href="/publication/${escapeHtml(article.publication_slug)}">${escapeHtml(article.publication_name)}</a> · <a href="${escapeHtml(article.original_url)}" target="_blank" rel="noopener">${ytLabel(article.original_url)}</a></div>
            ${excerpt}
          </article>
        `);
      }
      sourcesSectionHtml = `
        <section class="source-excerpts">
          <h2>Sources</h2>
          ${parts.join('\n')}
        </section>
      `;

      // Optimized article layout for Speechify:
      // 1. Title (h1) - Speechify starts here by default
      // 2. Subtitle (if present)
      // 3. Meta: author, date, reading time
      // 4. Source link to original Substack
      // 5. Deep Dives links (Wikipedia articles + books)
      // 6. Article content
      const content = `
        <article class="article content-width">
          <header class="article-header">
            <h1 class="article-title">${escapeHtml(article.title)}</h1>
            ${subtitle ? `<p class="article-subtitle">${escapeHtml(subtitle)}</p>` : ''}
            ${isConsolidated && primarySource ? `
            <p class="article-meta consolidated-meta">
              <span class="author">by Brian Edwards</span> · multiple sources including
              <a href="${escapeHtml(primarySource.original_url)}" target="_blank" rel="noopener">${escapeHtml(primarySource.author_name ?? 'Unknown')}</a>,
              <a href="/publication/${escapeHtml(primarySource.publication_slug)}">${escapeHtml(primarySource.publication_name)}</a>
              ${article.published_at ? ` · ${formatDate(article.published_at)}` : ''}
              ${readTime ? ` · ${readTime}` : ''}
            </p>
            ` : `
            <p class="article-meta">
              ${escapeHtml(article.author_name || 'Unknown author')}
              ${article.published_at ? ` · ${formatDate(article.published_at)}` : ''}
              ${readTime ? ` · ${readTime}` : ''}
            </p>
            <p class="article-source">
              <a href="${escapeHtml(article.original_url)}" target="_blank" rel="noopener">Read on ${escapeHtml(article.publication_name)}</a>
            </p>
            `}
          </header>
          ${wikiSection}
          <div class="article-content">
            ${articleContent}
          </div>
          ${sourcesSectionHtml}
        </article>
      `;

      res.send(readingLayout(article.title, content));
    } catch (err) {
      console.error('Error rendering article:', err);
      res.status(500).send(layout('Error', '<div class="container error">Failed to load article</div>'));
    }
  });

  // Publication page
  router.get('/publication/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const limit = 30;
      const offset = parseInt(req.query.offset as string) || 0;

      // Get publication info
      const pubResult = await pool.query<Publication>(`
        SELECT * FROM app.publications WHERE slug = $1
      `, [slug]);

      if (pubResult.rows.length === 0) {
        res.status(404).send(layout('Not Found', '<div class="container error">Publication not found</div>'));
        return;
      }

      const publication = pubResult.rows[0];

      // Get articles count
      const countResult = await pool.query<{ count: string }>(
        'SELECT COUNT(*) FROM app.articles WHERE publication_id = $1',
        [publication.id]
      );
      const total = parseInt(countResult.rows[0].count, 10);

      // Get articles
      const articlesResult = await pool.query<Article & { source_count?: number }>(`
        SELECT a.*, p.name as publication_name, p.slug as publication_slug,
               COALESCE((SELECT COUNT(*) FROM app.commentary_sources cs WHERE cs.commentary_article_id = a.id), 0)::int AS source_count
        FROM app.articles a
        JOIN app.publications p ON a.publication_id = p.id
        WHERE p.slug = $1
        ORDER BY a.published_at DESC NULLS LAST
        LIMIT $2 OFFSET $3
      `, [slug, limit, offset]);

      const content = `
        <div class="container content-width">
          <header class="publication-header">
            <h1 class="publication-name">${escapeHtml(publication.name)}</h1>
            ${publication.author_name ? `
              <p class="publication-author">by ${escapeHtml(publication.author_name)}</p>
            ` : ''}
            ${publication.description ? `
              <p class="publication-description">${escapeHtml(publication.description)}</p>
            ` : ''}
            <div class="publication-stats">
              <span>${total} articles</span>
            </div>
          </header>
          ${renderArticleList(articlesResult.rows, total, offset, limit, `/publication/${slug}`)}
        </div>
      `;

      res.send(layout(publication.name, content));
    } catch (err) {
      console.error('Error rendering publication:', err);
      res.status(500).send(layout('Error', '<div class="container error">Failed to load publication</div>'));
    }
  });

  // Wikipedia article page - optimized for Speechify text-to-speech
  router.get('/wikipedia/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;

      const result = await pool.query<WikipediaArticle>(`
        SELECT * FROM app.wikipedia_articles WHERE slug = $1
      `, [slug]);

      if (result.rows.length === 0) {
        res.status(404).send(layout('Not Found', '<div class="container error">Wikipedia article not found</div>'));
        return;
      }

      const wiki = result.rows[0];

      // Load content from library
      let wikiContent = '<p>Content not available.</p>';
      if (wiki.content_path) {
        try {
          const contentPath = join(libraryPath, wiki.content_path);
          wikiContent = await readFile(contentPath, 'utf-8');
        } catch {
          // Content file not found
        }
      }

      const readTime = wiki.estimated_read_time_minutes
        ? `${wiki.estimated_read_time_minutes} min read`
        : '';

      // Find which Substack articles link to this Wikipedia article
      const linksResult = await pool.query<{ article_id: string; title: string }>(`
        SELECT a.id as article_id, a.title
        FROM app.article_wikipedia_links awl
        JOIN app.articles a ON awl.article_id = a.id
        WHERE awl.wikipedia_id = $1
        ORDER BY a.published_at DESC
        LIMIT 5
      `, [wiki.id]);
      const relatedArticles = linksResult.rows;

      const relatedSection = relatedArticles.length > 0 ? `
        <nav class="related-articles" aria-label="Related Substack articles">
          <p class="related-label">From your reading</p>
          <ul>
            ${relatedArticles.map(a => `
              <li><a href="/article/${escapeHtml(a.article_id)}">${escapeHtml(a.title)}</a></li>
            `).join('')}
          </ul>
        </nav>
      ` : '';

      // Check if this Wikipedia article is about a book
      const matchedBook = affiliateBooksMap.get(wiki.title.toLowerCase());
      const affiliateTag = process.env.AMAZON_AFFILIATE_TAG ?? '';
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
            const amazonUrl = affiliateTag && book.isbn10 ? buildAmazonUrl(book.isbn10, affiliateTag) : '';
            const link = amazonUrl
              ? `<a href="${amazonUrl}" target="_blank" rel="noopener">${escapeHtml(book.title)}</a>`
              : escapeHtml(book.title);
            return `<li>${link} &mdash; ${escapeHtml(book.description)} <small>Affiliate link</small></li>`;
          })
          .join('\n            ');

        authorBooksHtml = `
        <div class="author-books">
          <p>Books by this author:</p>
          <ul>
            ${bookItems}
          </ul>
        </div>`;
      }

      // Optimized Wikipedia layout for Speechify:
      // 1. Type badge + Title
      // 2. Meta: read time, source link
      // 3. Related Substack articles
      // 4. Content
      // 5. Purchase links (if it's a book)
      const content = `
        <article class="article content-width wikipedia-article">
          <header class="article-header">
            <p class="article-type-badge">Wikipedia Deep Dive</p>
            <h1 class="article-title">${escapeHtml(wiki.title)}</h1>
            <p class="article-meta">
              ${readTime ? `${readTime} · ` : ''}<a href="${escapeHtml(wiki.original_url)}" target="_blank" rel="noopener">View on Wikipedia</a>
            </p>
          </header>
          ${relatedSection}
          ${authorBooksHtml}
          <div class="article-content">
            ${wikiContent}
          </div>
          ${purchaseLinksHtml}
        </article>
      `;

      res.send(readingLayout(wiki.title, content));
    } catch (err) {
      console.error('Error rendering Wikipedia article:', err);
      res.status(500).send(layout('Error', '<div class="container error">Failed to load article</div>'));
    }
  });

  return router;
}
