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
}

interface Publication {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  author_name: string | null;
  article_count: number;
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

function renderArticleCard(article: Article): string {
  const readTime = article.estimated_read_time_minutes
    ? `${article.estimated_read_time_minutes} min read`
    : '';

  return `
    <article class="article-card">
      <h2 class="article-card-title">
        <a href="/article/${escapeHtml(article.id)}">${escapeHtml(article.title)}</a>
      </h2>
      <div class="article-card-meta">
        <a href="/publication/${escapeHtml(article.publication_slug)}">${escapeHtml(article.publication_name)}</a>
        ${article.author_name ? `<span>by ${escapeHtml(article.author_name)}</span>` : ''}
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

  // Home page - list recent articles
  router.get('/', async (_req: Request, res: Response) => {
    try {
      const limit = 30;
      const offset = parseInt(_req.query.offset as string) || 0;

      const countResult = await pool.query<{ count: string }>('SELECT COUNT(*) FROM app.articles');
      const total = parseInt(countResult.rows[0].count, 10);

      const result = await pool.query<Article>(`
        SELECT a.*, p.name as publication_name, p.slug as publication_slug
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

      const result = await pool.query<Article>(`
        SELECT a.*, p.name as publication_name, p.slug as publication_slug
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

  // Article page
  router.get('/article/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const result = await pool.query<Article>(`
        SELECT a.*, p.name as publication_name, p.slug as publication_slug
        FROM app.articles a
        JOIN app.publications p ON a.publication_id = p.id
        WHERE a.id = $1
      `, [id]);

      if (result.rows.length === 0) {
        res.status(404).send(layout('Not Found', '<div class="container error">Article not found</div>'));
        return;
      }

      const article = result.rows[0];

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

      const content = `
        <article class="article content-width">
          <header class="article-header">
            <h1 class="article-title">${escapeHtml(article.title)}</h1>
            <div class="article-meta">
              <span class="article-author">${escapeHtml(article.author_name || 'Unknown author')}</span>
              <span class="article-separator">·</span>
              <a href="/publication/${escapeHtml(article.publication_slug)}" class="article-publication">
                ${escapeHtml(article.publication_name)}
              </a>
              ${article.published_at ? `
                <span class="article-separator">·</span>
                <span class="article-date">${formatDate(article.published_at)}</span>
              ` : ''}
              ${readTime ? `
                <span class="article-separator">·</span>
                <span class="article-read-time">${readTime}</span>
              ` : ''}
            </div>
          </header>
          <div class="article-content">
            ${articleContent}
          </div>
          <footer class="article-footer">
            <a href="/" class="back-link">&larr; Back to articles</a>
            <div class="article-source">
              Originally published on <a href="${escapeHtml(article.original_url)}" target="_blank" rel="noopener">
                ${escapeHtml(article.publication_name)}
              </a>
            </div>
          </footer>
        </article>
      `;

      res.send(layout(article.title, content));
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
      const articlesResult = await pool.query<Article>(`
        SELECT a.*, p.name as publication_name, p.slug as publication_slug
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

  return router;
}
