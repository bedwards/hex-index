/**
 * Template functions for static site generation
 * Adapted from src/api/pages.ts for static HTML output
 */

import { escapeHtml, formatDate } from './utils.js';
import { readFileSync } from 'fs';
import { join } from 'path';

const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8')) as { version: string };
const VERSION = pkg.version;

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
  imagePath: string | null;
  displayTag: { slug: string; name: string } | null;
  isConsolidated?: boolean;
  sourceCount?: number;
}

export interface TrendingArticle extends StaticArticle {
  /** ISO timestamp of the most recent source's created_at (drives ordering + "time ago"). */
  mostRecentSourceAt: string;
}

/**
 * Format an ISO timestamp as a short relative phrase: "3 days ago", "5 hours ago", etc.
 * Exported for tests.
 */
export function formatTimeAgo(iso: string, now: Date = new Date()): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) {return '';}
  const diffMs = Math.max(0, now.getTime() - then);
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) {return 'just now';}
  if (mins < 60) {return `${mins} minute${mins === 1 ? '' : 's'} ago`;}
  const hours = Math.floor(mins / 60);
  if (hours < 24) {return `${hours} hour${hours === 1 ? '' : 's'} ago`;}
  const days = Math.floor(hours / 24);
  if (days < 7) {return `${days} day${days === 1 ? '' : 's'} ago`;}
  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
}

/**
 * Render the "Trending story lines" hero section for the home page.
 * Returns an empty string when there are no qualifying consolidations,
 * so the home page renders identically to before.
 */
export function renderTrendingHero(
  trending: TrendingArticle[],
  pathToRoot: string = './'
): string {
  if (trending.length === 0) {return '';}

  const cards = trending.map((a) => {
    const articleUrl = `${pathToRoot}article/${a.id}/index.html`;
    const imgHtml = a.imagePath
      ? `<a href="${articleUrl}" class="trending-thumb-link"><img class="trending-thumb" src="${pathToRoot}${a.imagePath}" alt="${escapeHtml(a.title)}" loading="lazy"></a>`
      : '';
    const sourceCount = a.sourceCount ?? 0;
    const timeAgo = formatTimeAgo(a.mostRecentSourceAt);
    return `<article class="trending-card">
  ${imgHtml}
  <div class="trending-body">
    <a href="${articleUrl}" class="trending-link">
      <h3 class="trending-title">${escapeHtml(a.title)}</h3>
    </a>
    <div class="trending-meta">
      <span class="trending-author">by Brian Edwards</span>
      <span class="source-count-badge">${sourceCount} sources</span>
      ${timeAgo ? `<span class="trending-time">${escapeHtml(timeAgo)}</span>` : ''}
    </div>
  </div>
</article>`;
  }).join('\n');

  return `<section class="trending-hero" aria-label="Trending story lines">
  <h2 class="trending-hero-title">Trending story lines</h2>
  <div class="trending-grid">
    ${cards}
  </div>
</section>`;
}

/**
 * A source article that was synthesized into a multi-source commentary.
 * Position is 0-based and determines ordering + interlacing with deep dives.
 */
export interface CommentarySource {
  articleId: string;
  title: string;
  author: string;
  publicationName: string;
  publicationSlug: string;
  originalUrl: string;
  excerptHtml: string;
  isPrimary: boolean;
  position: number;
}

/**
 * Render the top article-meta line.
 * For single-source articles: {author} · {publication} · {date} · {read-time}
 * For consolidated commentary: by Brian Edwards · multiple sources including
 *   {primary author}, {primary publication} · {date} · {read-time}
 */
export function renderArticleMeta(
  author: string,
  publicationName: string,
  publicationSlug: string,
  publishedAt: string | null,
  readTimeMinutes: number,
  pathToRoot: string,
  consolidated?: { primary: CommentarySource; sourceCount: number } | null
): string {
  const date = formatDate(publishedAt);
  const dateHtml = date ? `<span class="separator">&middot;</span><time>${date}</time>` : '';
  const readHtml = `<span class="separator">&middot;</span><span class="read-time">${readTimeMinutes} min read</span>`;

  if (consolidated && consolidated.primary) {
    const p = consolidated.primary;
    const others = Math.max(0, consolidated.sourceCount - 1);
    return `
      <div class="article-meta consolidated-meta">
        <span class="multi-source-label">Multiple sources:</span>
        <a href="${p.originalUrl}" target="_blank" rel="noopener" class="primary-source">${escapeHtml(p.author)}</a>
        <a href="${pathToRoot}publication/${p.publicationSlug}/index.html" class="publication">${escapeHtml(p.publicationName)}</a>${others > 0 ? `<span class="other-sources">and ${others} other${others === 1 ? '' : 's'}</span>` : ''}
        ${dateHtml}
      </div>`;
  }

  return `
      <div class="article-meta">
        <span class="author">${escapeHtml(author)}</span>
        <span class="separator">&middot;</span>
        <a href="${pathToRoot}publication/${publicationSlug}/index.html" class="publication">
          ${escapeHtml(publicationName)}
        </a>
        ${dateHtml}
        ${readHtml}
      </div>`;
}

/**
 * Render a single source excerpt block.
 */
export function renderSourceExcerpt(
  source: CommentarySource,
  pathToRoot: string
): string {
  const isYouTube = /(?:youtube\.com|youtu\.be)/i.test(source.originalUrl);
  const linkLabel = isYouTube ? 'Watch video' : 'Read full article';
  return `<article class="source-excerpt">
      <h3>${escapeHtml(source.title)}</h3>
      <div class="source-meta">by ${escapeHtml(source.author)} &middot; <a href="${pathToRoot}publication/${source.publicationSlug}/index.html">${escapeHtml(source.publicationName)}</a> &middot; <a href="${source.originalUrl}" target="_blank" rel="noopener">${linkLabel}</a></div>
      ${source.excerptHtml}
    </article>`;
}

/**
 * Interlace source excerpts with deep dive card HTML fragments.
 * Rule: source[0], deepdive[0], source[1], deepdive[1], ...
 * Any leftover sources or deep dives are appended at the end.
 */
export function renderInterlacedSourcesAndDeepDives(
  sources: CommentarySource[],
  deepDiveHtmls: string[],
  pathToRoot: string
): string {
  if (sources.length === 0) {return '';}

  const ordered = [...sources].sort((a, b) => a.position - b.position);
  const parts: string[] = [];
  const max = Math.max(ordered.length, deepDiveHtmls.length);
  for (let i = 0; i < max; i++) {
    if (i < ordered.length) {
      parts.push(renderSourceExcerpt(ordered[i], pathToRoot));
    }
    if (i < deepDiveHtmls.length) {
      parts.push(deepDiveHtmls[i]);
    }
  }
  return `<section class="source-excerpts">
      <h2>Sources</h2>
      ${parts.join('\n')}
    </section>`;
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
    <nav class="container">
      <a href="${pathToRoot}index.html" class="logo">Hex Index</a>
      <a href="${pathToRoot}tag/index.html" class="header-link">Topics</a>
      <a href="${pathToRoot}weekly/index.html" class="header-link">Reader</a>
      <a href="${pathToRoot}about/index.html" class="header-link">About</a>
      <div class="search-wrap">
        <input type="text" id="search" class="search-input" placeholder="Search" autocomplete="off" spellcheck="false">
      </div>
    </nav>
  </header>
  <main class="container">
    <div id="search-results" class="article-list" style="display:none"></div>
    <div id="main-content">
      ${content}
    </div>
  </main>
  <footer class="site-footer">
    <div class="container">
      <p>A curated reading library &middot; v${VERSION}</p>
      <p><a href="${pathToRoot}privacy/index.html">Privacy</a> &middot; <a href="${pathToRoot}terms/index.html">Terms</a></p>
    </div>
  </footer>
  <script src="https://cdn.jsdelivr.net/npm/fuse.js@7.1.0/dist/fuse.min.js"></script>
  <script>
  (function() {
    var input = document.getElementById('search');
    var results = document.getElementById('search-results');
    var main = document.getElementById('main-content');
    if (!input || !results || !main) return;

    var fuse = null;
    var indexLoaded = false;
    var pathToRoot = '${pathToRoot}';

    function loadIndex() {
      if (indexLoaded) return Promise.resolve();
      indexLoaded = true;
      return fetch(pathToRoot + 'search-index.json')
        .then(function(r) { return r.json(); })
        .then(function(data) {
          fuse = new Fuse(data, {
            keys: [
              { name: 't', weight: 3 },
              { name: 'a', weight: 2 },
              { name: 'p', weight: 1 }
            ],
            threshold: 0.4,
            distance: 300,
            minMatchCharLength: 2,
            ignoreLocation: true,
          });
        });
    }

    function renderResults(items) {
      if (items.length === 0) {
        results.innerHTML = '<p style="padding:1rem;color:var(--ink-muted)">No results</p>';
        return;
      }
      results.innerHTML = items.slice(0, 30).map(function(r) {
        var a = r.item;
        return '<article class="article-card"><div>' +
          '<a href="' + pathToRoot + 'article/' + a.i + '/index.html" class="article-link">' +
          '<h2 class="article-title">' + esc(a.t) + '</h2></a>' +
          '<div class="article-meta">' +
          '<span class="author">' + esc(a.a) + '</span>' +
          '<span class="separator">&middot;</span>' +
          '<a href="' + pathToRoot + 'publication/' + a.s + '/index.html" class="publication">' + esc(a.p) + '</a>' +
          (a.d ? '<span class="separator">&middot;</span><time>' + a.d + '</time>' : '') +
          '<span class="separator">&middot;</span>' +
          '<span class="read-time">' + a.r + ' min read</span>' +
          '</div></div></article>';
      }).join('');
    }

    function esc(s) {
      var d = document.createElement('div');
      d.textContent = s;
      return d.innerHTML;
    }

    var debounce;
    input.addEventListener('input', function() {
      clearTimeout(debounce);
      var q = input.value.trim();
      if (q.length < 2) {
        results.style.display = 'none';
        main.style.display = '';
        return;
      }
      debounce = setTimeout(function() {
        loadIndex().then(function() {
          if (!fuse) return;
          var hits = fuse.search(q);
          results.style.display = '';
          main.style.display = 'none';
          renderResults(hits);
        });
      }, 100);
    });

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        input.value = '';
        results.style.display = 'none';
        main.style.display = '';
      }
    });
  })();
  </script>
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
    <a href="${pathToRoot}index.html" class="back-link" id="back-link">&larr; Back to Library</a>
  </header>
  <main class="reading-content">
    ${content}
  </main>
  <footer class="site-footer">
    <div class="container">
      <p><a href="${pathToRoot}privacy/index.html">Privacy</a> &middot; <a href="${pathToRoot}terms/index.html">Terms</a></p>
    </div>
  </footer>
  <script>
  (function() {
    var params = new URLSearchParams(window.location.search);
    var from = params.get('from');
    if (from) {
      var names = {
        'foreign-policy':'Foreign Policy','ai-tech':'AI & Tech','housing-cities':'Housing & Cities',
        'political-strategy':'Political Strategy','history':'History','science':'Science',
        'culture':'Culture','economics':'Economics','faith':'Faith','writing-craft':'Writing & Craft',
        'music':'Music','law-rights':'Law & Rights','public-health':'Public Health',
        'philosophy':'Philosophy','media':'Media','defense':'Defense','china':'China'
      };
      var link = document.getElementById('back-link');
      if (link) {
        var name = names[from] || from;
        link.href = '${pathToRoot}tag/' + from + '/index.html';
        link.textContent = '\\u2190 Back to ' + name;
      }
    }
  })();
  </script>
</body>
</html>`;
}

/**
 * Render an article card for listings
 */
export function renderStaticArticleCard(
  article: StaticArticle,
  pathToRoot: string = './',
  fromTag?: string
): string {
  const date = formatDate(article.publishedAt);
  const articleUrl = `${pathToRoot}article/${article.id}/index.html${fromTag ? `?from=${fromTag}` : ''}`;

  const thumbHtml = article.imagePath
    ? `<a href="${articleUrl}" class="article-thumb-link"><img class="article-thumb" src="${pathToRoot}${article.imagePath}" alt="${escapeHtml(article.title)}" loading="lazy" width="180" height="94"></a>`
    : '';

  const isConsolidated = article.isConsolidated && (article.sourceCount ?? 0) > 1;
  const displayAuthor = isConsolidated ? 'Brian Edwards' : article.author;
  const badgeHtml = isConsolidated
    ? `<span class="source-count-badge">${article.sourceCount} sources</span>`
    : '';

  return `<article class="article-card${isConsolidated ? ' consolidated' : ''}">
  <div>
    <a href="${articleUrl}" class="article-link">
      <h2 class="article-title">${escapeHtml(article.title)}</h2>
    </a>
    <div class="article-meta">
      <span class="author">${escapeHtml(displayAuthor)}</span>${badgeHtml ? `
      ${badgeHtml}` : ''}
      <span class="separator">&middot;</span>
      <a href="${pathToRoot}publication/${article.publicationSlug}/index.html" class="publication">
        ${escapeHtml(article.publicationName)}
      </a>
      ${date ? `<span class="separator">&middot;</span><time>${date}</time>` : ''}
      <span class="separator">&middot;</span>
      <span class="read-time">${article.estimatedReadTimeMinutes} min read</span>${article.displayTag ? `
      <span class="separator">&middot;</span>
      <a href="${pathToRoot}tag/${article.displayTag.slug}/index.html" class="article-tag">${escapeHtml(article.displayTag.name)}</a>` : ''}
    </div>
  </div>
  ${thumbHtml}
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
