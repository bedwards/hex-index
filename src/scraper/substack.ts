/**
 * Substack article scraper
 * Fetches full article content from Substack URLs when RSS only provides excerpts
 */

import * as cheerio from 'cheerio';

export interface ScrapedArticle {
  /** Full article HTML content */
  html: string;
  /** Article title */
  title: string;
  /** Author name */
  author?: string;
  /** Publication date */
  publishedAt?: Date;
  /** Whether scraping was successful */
  success: boolean;
  /** Error message if failed */
  error?: string;
}

interface ScrapeOptions {
  /** Timeout in milliseconds */
  timeout?: number;
  /** User-Agent header */
  userAgent?: string;
  /** Rate limit delay (ms) before next request */
  rateLimitDelay?: number;
}

const DEFAULT_OPTIONS: Required<ScrapeOptions> = {
  timeout: 30000, // 30 seconds
  userAgent: 'HexIndexReader/1.0 (Personal Reading Library; +https://github.com/bedwards/hex-index)',
  rateLimitDelay: 2000, // 2 seconds between requests
};

let lastRequestTime = 0;

/**
 * Scrape full article content from a Substack URL
 */
export async function scrapeSubstackArticle(
  url: string,
  options: ScrapeOptions = {}
): Promise<ScrapedArticle> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Rate limiting: ensure minimum delay between requests
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < opts.rateLimitDelay) {
    const delay = opts.rateLimitDelay - timeSinceLastRequest;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  lastRequestTime = Date.now();

  try {
    // Fetch the page
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), opts.timeout);

    const response = await fetch(url, {
      headers: {
        'User-Agent': opts.userAgent,
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        html: '',
        title: '',
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const html = await response.text();

    // Parse with cheerio
    const $ = cheerio.load(html);

    // Extract article content from Substack's DOM structure
    // Substack uses <div class="body markup"> for article content
    const articleBody = $('.body.markup').first();

    if (articleBody.length === 0) {
      return {
        html: '',
        title: '',
        success: false,
        error: 'Could not find article body in HTML (class="body markup" not found)',
      };
    }

    // Extract title
    const title =
      $('h1.post-title').first().text().trim() ||
      $('meta[property="og:title"]').attr('content') ||
      $('title').text().trim();

    // Extract author
    const author =
      $('.pencraft.frontend-pencraft-Text-module__text--size-14')
        .first()
        .text()
        .trim() ||
      $('meta[name="author"]').attr('content') ||
      $('meta[property="article:author"]').attr('content');

    // Extract publish date
    let publishedAt: Date | undefined;
    const dateStr =
      $('time').first().attr('datetime') ||
      $('meta[property="article:published_time"]').attr('content');
    if (dateStr) {
      publishedAt = new Date(dateStr);
    }

    // Clean the article HTML
    // Remove Substack-specific elements that shouldn't be in reading view
    articleBody.find('.subscription-widget-wrap').remove(); // Subscribe buttons
    articleBody.find('.captioned-button-wrap').remove(); // CTA buttons
    articleBody.find('.available-content-inner').remove(); // Paywall notices
    articleBody.find('button').remove(); // All buttons
    articleBody.find('.subscription-widget').remove(); // Subscribe widgets

    // Get the cleaned HTML
    const cleanedHtml = articleBody.html() || '';

    // Wrap in proper HTML structure
    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body>
  <article>
    <h1>${escapeHtml(title)}</h1>
    ${author ? `<p class="author">By ${escapeHtml(author)}</p>` : ''}
    ${publishedAt ? `<time datetime="${publishedAt.toISOString()}">${publishedAt.toLocaleDateString()}</time>` : ''}
    <div class="content">
      ${cleanedHtml}
    </div>
  </article>
</body>
</html>
    `.trim();

    return {
      html: fullHtml,
      title,
      author,
      publishedAt,
      success: true,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        html: '',
        title: '',
        success: false,
        error: `Timeout after ${opts.timeout}ms`,
      };
    }

    return {
      html: '',
      title: '',
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Check if article content appears to be a stub (RSS excerpt only)
 */
export function isStub(html: string, wordCountThreshold = 200): boolean {
  // Remove HTML tags and count words
  const text = html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const words = text.split(/\s+/).filter(Boolean);

  return words.length < wordCountThreshold;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Check if URL is a Substack article
 */
export function isSubstackUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname.endsWith('.substack.com') ||
      parsed.hostname === 'substack.com'
    );
  } catch {
    return false;
  }
}
