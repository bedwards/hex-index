/**
 * hex-index Reading UI
 * Clean, typography-focused interface for reading Substack articles
 */

// Types
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
  publication_author: string | null;
}

interface Publication {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  author_name: string | null;
  article_count: number;
  quality_score: number;
}

interface SearchResult {
  articles: Article[];
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
}

interface _TagDistribution {
  tags: Record<string, Record<string, number>>;
}

// State
let currentArticles: Article[] = [];
let currentArticleIndex = 0;

// Router
type Route = 'home' | 'article' | 'publication' | 'search';

interface RouterState {
  route: Route;
  params: Record<string, string>;
}

function parseRoute(): RouterState {
  const hash = window.location.hash.slice(1) || '/';
  const [path, query] = hash.split('?');
  const params: Record<string, string> = {};

  if (query) {
    for (const pair of query.split('&')) {
      const [key, value] = pair.split('=');
      params[key] = decodeURIComponent(value || '');
    }
  }

  if (path.startsWith('/article/')) {
    return { route: 'article', params: { id: path.slice(9) } };
  }
  if (path.startsWith('/publication/')) {
    return { route: 'publication', params: { slug: path.slice(13) } };
  }
  if (path.startsWith('/search')) {
    return { route: 'search', params };
  }
  return { route: 'home', params };
}

function navigate(path: string): void {
  window.location.hash = path;
}

// API helpers
async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`/api${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

// Components
function renderHeader(): string {
  return `
    <header class="header">
      <div class="container header-inner">
        <a href="#/" class="logo">hex-index</a>
        <nav class="nav">
          <a href="#/">Articles</a>
          <a href="#/search">Search</a>
        </nav>
        <div class="search-bar">
          <input type="search" class="search-input" placeholder="Search articles..." id="search-input">
        </div>
      </div>
    </header>
  `;
}

function renderKeyboardHints(): string {
  return `
    <div class="keyboard-hint">
      <kbd>j</kbd> next <kbd>k</kbd> prev <kbd>/</kbd> search
    </div>
  `;
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

function renderArticleCard(article: Article, index: number): string {
  const readTime = article.estimated_read_time_minutes
    ? `${article.estimated_read_time_minutes} min read`
    : '';

  return `
    <article class="article-card" data-index="${index}">
      <h2 class="article-card-title">
        <a href="#/article/${article.id}">${escapeHtml(article.title)}</a>
      </h2>
      <div class="article-card-meta">
        <a href="#/publication/${article.publication_slug}">${escapeHtml(article.publication_name)}</a>
        ${article.author_name ? `<span>by ${escapeHtml(article.author_name)}</span>` : ''}
        ${article.published_at ? `<span>${formatDate(article.published_at)}</span>` : ''}
        ${readTime ? `<span>${readTime}</span>` : ''}
      </div>
      ${Object.keys(article.tags).length > 0 ? `
        <div class="tags">
          ${Object.entries(article.tags)
            .map(([key, value]) => `<a href="#/search?tags=${encodeURIComponent(JSON.stringify({ [key]: value }))}" class="tag">${escapeHtml(value)}</a>`)
            .join('')}
        </div>
      ` : ''}
    </article>
  `;
}

function renderArticleList(articles: Article[], total: number): string {
  if (articles.length === 0) {
    return `
      <div class="empty">
        <p>No articles found.</p>
        <p>Start by ingesting some feeds!</p>
      </div>
    `;
  }

  return `
    <div class="article-list">
      ${articles.map((a, i) => renderArticleCard(a, i)).join('')}
    </div>
    ${total > articles.length ? `
      <div class="pagination">
        <span>${articles.length} of ${total} articles</span>
      </div>
    ` : ''}
  `;
}

async function renderArticle(id: string): Promise<string> {
  try {
    const data = await fetchApi<{ article: Article }>(`/articles/${id}`);
    const article = data.article;

    // Try to load content from content_path if available
    let content = '<p>Article content not yet available in the library.</p>';
    if (article.content_path) {
      try {
        const contentResponse = await fetch(`/library/${article.content_path}`);
        if (contentResponse.ok) {
          content = await contentResponse.text();
        }
      } catch {
        // Content not available
      }
    }

    const readTime = article.estimated_read_time_minutes
      ? `${article.estimated_read_time_minutes} min read`
      : '';

    return `
      <article class="article content-width">
        <header class="article-header">
          <h1 class="article-title">${escapeHtml(article.title)}</h1>
          <div class="article-meta">
            <span class="article-author">${escapeHtml(article.author_name || 'Unknown author')}</span>
            <span class="article-separator">·</span>
            <a href="#/publication/${article.publication_slug}" class="article-publication">
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
          ${content}
        </div>
        <footer class="article-footer">
          <div class="article-source">
            Originally published on <a href="${escapeHtml(article.original_url)}" target="_blank" rel="noopener">
              ${escapeHtml(article.publication_name)}
            </a>
          </div>
        </footer>
      </article>
    `;
  } catch (err) {
    return `<div class="error">Failed to load article: ${err instanceof Error ? err.message : 'Unknown error'}</div>`;
  }
}

async function renderPublication(slug: string): Promise<string> {
  try {
    // Fetch publication articles
    const data = await fetchApi<SearchResult>(`/search?publication=${slug}&limit=50`);

    // Get publication info from first article or fetch publications list
    const pubData = await fetchApi<{ publications: Publication[] }>('/publications');
    const publication = pubData.publications.find((p) => p.slug === slug);

    if (!publication) {
      return `<div class="error">Publication not found</div>`;
    }

    currentArticles = data.articles;
    currentArticleIndex = 0;

    return `
      <div class="content-width">
        <header class="publication-header">
          <h1 class="publication-name">${escapeHtml(publication.name)}</h1>
          ${publication.author_name ? `
            <p class="publication-author">by ${escapeHtml(publication.author_name)}</p>
          ` : ''}
          ${publication.description ? `
            <p class="publication-description">${escapeHtml(publication.description)}</p>
          ` : ''}
          <div class="publication-stats">
            <span>${publication.article_count} articles</span>
            <span>Quality score: ${publication.quality_score}</span>
          </div>
        </header>
        ${renderArticleList(data.articles, data.total)}
      </div>
    `;
  } catch (err) {
    return `<div class="error">Failed to load publication: ${err instanceof Error ? err.message : 'Unknown error'}</div>`;
  }
}

async function renderSearch(query: string, tags?: string): Promise<string> {
  const params = new URLSearchParams();
  if (query) {
    params.set('q', query);
  }
  if (tags) {
    params.set('tags', tags);
  }
  params.set('limit', '50');

  try {
    const data = await fetchApi<SearchResult>(`/search?${params.toString()}`);
    currentArticles = data.articles;
    currentArticleIndex = 0;

    return `
      <div class="container">
        <h1 class="page-title">
          ${query ? `Search results for "${escapeHtml(query)}"` : 'All Articles'}
        </h1>
        ${renderArticleList(data.articles, data.total)}
      </div>
    `;
  } catch (err) {
    return `<div class="error">Search failed: ${err instanceof Error ? err.message : 'Unknown error'}</div>`;
  }
}

async function renderHome(): Promise<string> {
  try {
    const data = await fetchApi<SearchResult>('/search?limit=50');
    currentArticles = data.articles;
    currentArticleIndex = 0;

    return `
      <div class="container">
        <h1 class="page-title">Latest Articles</h1>
        ${renderArticleList(data.articles, data.total)}
      </div>
    `;
  } catch {
    // API might not be available (no database)
    return `
      <div class="container">
        <h1 class="page-title">hex-index</h1>
        <div class="empty">
          <p>Welcome to hex-index, your personal Substack library.</p>
          <p>The database is not configured yet. Run <code>npm run db:up</code> to start.</p>
        </div>
      </div>
    `;
  }
}

// Utility
function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Main render function
async function render(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) {
    return;
  }

  const state = parseRoute();

  app.innerHTML = `
    <a href="#main" class="skip-link">Skip to content</a>
    ${renderHeader()}
    <main id="main" class="container">
      <div class="loading">Loading...</div>
    </main>
    ${renderKeyboardHints()}
  `;

  const main = document.getElementById('main');
  if (!main) {
    return;
  }

  let content: string;

  switch (state.route) {
    case 'article':
      content = await renderArticle(state.params.id);
      break;
    case 'publication':
      content = await renderPublication(state.params.slug);
      break;
    case 'search':
      content = await renderSearch(state.params.q || '', state.params.tags);
      break;
    default:
      content = await renderHome();
  }

  main.innerHTML = content;
}

// Keyboard navigation
function setupKeyboardNavigation(): void {
  document.addEventListener('keydown', (e) => {
    // Don't handle if typing in input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    const state = parseRoute();

    switch (e.key) {
      case 'j':
        // Next article
        if (state.route === 'home' || state.route === 'search' || state.route === 'publication') {
          if (currentArticleIndex < currentArticles.length - 1) {
            currentArticleIndex++;
            const cards = document.querySelectorAll('.article-card');
            cards[currentArticleIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
        break;

      case 'k':
        // Previous article
        if (state.route === 'home' || state.route === 'search' || state.route === 'publication') {
          if (currentArticleIndex > 0) {
            currentArticleIndex--;
            const cards = document.querySelectorAll('.article-card');
            cards[currentArticleIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
        break;

      case 'Enter':
        // Open selected article
        if (state.route === 'home' || state.route === 'search' || state.route === 'publication') {
          const article = currentArticles[currentArticleIndex];
          if (article) {
            navigate(`/article/${article.id}`);
          }
        }
        break;

      case '/':
        // Focus search
        e.preventDefault();
        document.getElementById('search-input')?.focus();
        break;

      case 'Escape':
        // Go back or blur search
        if (document.activeElement instanceof HTMLInputElement) {
          document.activeElement.blur();
        } else if (state.route === 'article') {
          window.history.back();
        }
        break;
    }
  });
}

// Search handling
function setupSearch(): void {
  document.addEventListener('submit', (e) => {
    if (e.target instanceof HTMLFormElement) {
      return;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement && e.target.id === 'search-input') {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
          navigate(`/search?q=${encodeURIComponent(query)}`);
        }
      }
    }
  });
}

// Initialize
function init(): void {
  // Initial render
  void render();

  // Handle route changes
  window.addEventListener('hashchange', () => void render());

  // Setup interactions
  setupKeyboardNavigation();
  setupSearch();
}

// Start app
init();
