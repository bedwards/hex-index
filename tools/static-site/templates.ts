/**
 * Template functions for static site generation
 * Adapted from src/api/pages.ts for static HTML output
 */

import { escapeHtml, formatDate } from './utils.js';

export interface StaticArticle {
  id: string;
  title: string;
  author: string;
  publicationName: string;
  publicationSlug: string;
  publishedAt: string | null;
  estimatedReadTimeMinutes: number;
  excerpt: string;
  url: string;
}

export interface StaticWikipediaArticle {
  id: string;
  slug: string;
  title: string;
  content: string;
  estimatedReadTimeMinutes: number;
  originalUrl: string;
  parentArticleId: string;
  parentArticleTitle: string;
}

/**
 * Base layout for static pages - no search bar, relative paths
 */
export function staticLayout(
  title: string,
  content: string,
  pathToRoot: string = './'
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} - Hex Index</title>
  <link rel="stylesheet" href="${pathToRoot}styles.css">
</head>
<body>
  <header class="site-header">
    <nav>
      <a href="${pathToRoot}index.html" class="logo">Hex Index</a>
    </nav>
  </header>
  <main>
    ${content}
  </main>
  <footer class="site-footer">
    <p>A curated reading library</p>
  </footer>
</body>
</html>`;
}

/**
 * Reading layout for article/Wikipedia pages - minimal header for Speechify
 */
export function staticReadingLayout(
  title: string,
  content: string,
  pathToRoot: string = './'
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} - Hex Index</title>
  <link rel="stylesheet" href="${pathToRoot}styles.css">
</head>
<body class="reading-mode">
  <header class="reading-header">
    <a href="${pathToRoot}index.html" class="back-link">&larr; Back to Library</a>
  </header>
  <main class="reading-content">
    ${content}
  </main>
</body>
</html>`;
}

/**
 * Render an article card for listings
 */
export function renderStaticArticleCard(
  article: StaticArticle,
  pathToRoot: string = './'
): string {
  const date = formatDate(article.publishedAt);

  return `<article class="article-card">
  <a href="${pathToRoot}article/${article.id}/index.html" class="article-link">
    <h2 class="article-title">${escapeHtml(article.title)}</h2>
  </a>
  <div class="article-meta">
    <span class="author">${escapeHtml(article.author)}</span>
    <span class="separator">&middot;</span>
    <a href="${pathToRoot}publication/${article.publicationSlug}/index.html" class="publication">
      ${escapeHtml(article.publicationName)}
    </a>
    ${date ? `<span class="separator">&middot;</span><time>${date}</time>` : ''}
    <span class="separator">&middot;</span>
    <span class="read-time">${article.estimatedReadTimeMinutes} min read</span>
  </div>
</article>`;
}

/**
 * Render a Wikipedia article card for listings
 */
export function renderStaticWikipediaCard(
  wiki: StaticWikipediaArticle,
  pathToRoot: string = './'
): string {
  return `<article class="article-card wikipedia-card">
  <a href="${pathToRoot}wikipedia/${wiki.slug}/index.html" class="article-link">
    <h2 class="article-title">${escapeHtml(wiki.title)}</h2>
  </a>
  <div class="article-meta">
    <span class="type-badge">Wikipedia Deep Dive</span>
    <span class="separator">&middot;</span>
    <span class="read-time">${wiki.estimatedReadTimeMinutes} min read</span>
  </div>
</article>`;
}

/**
 * Render pagination controls
 */
export function renderStaticPagination(
  currentPage: number,
  totalPages: number,
  baseUrl: string
): string {
  if (totalPages <= 1) {return '';}

  const links: string[] = [];

  // Previous link
  if (currentPage > 1) {
    const prevUrl = currentPage === 2 ? `${baseUrl}index.html` : `${baseUrl}page/${currentPage - 1}/index.html`;
    links.push(`<a href="${prevUrl}" class="pagination-link prev">&larr; Newer</a>`);
  } else {
    links.push(`<span class="pagination-link prev disabled">&larr; Newer</span>`);
  }

  // Page numbers
  const pageNumbers: string[] = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  if (start > 1) {
    pageNumbers.push(`<a href="${baseUrl}index.html" class="pagination-page">1</a>`);
    if (start > 2) {
      pageNumbers.push(`<span class="pagination-ellipsis">...</span>`);
    }
  }

  for (let i = start; i <= end; i++) {
    const url = i === 1 ? `${baseUrl}index.html` : `${baseUrl}page/${i}/index.html`;
    if (i === currentPage) {
      pageNumbers.push(`<span class="pagination-page current">${i}</span>`);
    } else {
      pageNumbers.push(`<a href="${url}" class="pagination-page">${i}</a>`);
    }
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      pageNumbers.push(`<span class="pagination-ellipsis">...</span>`);
    }
    const lastUrl = `${baseUrl}page/${totalPages}/index.html`;
    pageNumbers.push(`<a href="${lastUrl}" class="pagination-page">${totalPages}</a>`);
  }

  links.push(`<div class="pagination-pages">${pageNumbers.join('')}</div>`);

  // Next link
  if (currentPage < totalPages) {
    const nextUrl = `${baseUrl}page/${currentPage + 1}/index.html`;
    links.push(`<a href="${nextUrl}" class="pagination-link next">Older &rarr;</a>`);
  } else {
    links.push(`<span class="pagination-link next disabled">Older &rarr;</span>`);
  }

  return `<nav class="pagination">${links.join('')}</nav>`;
}
