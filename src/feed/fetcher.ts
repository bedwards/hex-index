/**
 * RSS/Atom feed fetcher with rate limiting and caching
 */

import { Feed, FetchOptions, FetchResult, DEFAULT_FETCH_OPTIONS } from './types.js';
import { parseFeed } from './parser.js';

// Simple in-memory cache
const feedCache = new Map<string, { feed: Feed; fetchedAt: Date }>();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

// Rate limiting state
let lastFetchTime = 0;

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Ensure rate limit is respected
 */
async function waitForRateLimit(delayMs: number): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastFetchTime;
  if (elapsed < delayMs) {
    await sleep(delayMs - elapsed);
  }
  lastFetchTime = Date.now();
}

/**
 * Fetch a URL with timeout
 */
async function fetchWithTimeout(
  url: string,
  timeoutMs: number,
  userAgent: string
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': userAgent,
        Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml',
      },
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Fetch and parse an RSS/Atom feed
 */
export async function fetchFeed(
  feedUrl: string,
  options: FetchOptions = {}
): Promise<FetchResult> {
  const opts = { ...DEFAULT_FETCH_OPTIONS, ...options };

  // Check cache first
  const cached = feedCache.get(feedUrl);
  if (cached && Date.now() - cached.fetchedAt.getTime() < CACHE_TTL_MS) {
    return {
      success: true,
      feed: cached.feed,
      cached: true,
      fetchedAt: cached.fetchedAt,
    };
  }

  // Wait for rate limit
  await waitForRateLimit(opts.delayMs);

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < opts.retries; attempt++) {
    try {
      const response = await fetchWithTimeout(feedUrl, opts.timeoutMs, opts.userAgent);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const xml = await response.text();
      const feed = parseFeed(xml, feedUrl);

      // Update cache
      const fetchedAt = new Date();
      feedCache.set(feedUrl, { feed, fetchedAt });

      return {
        success: true,
        feed,
        cached: false,
        fetchedAt,
      };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      // Don't retry on client errors (4xx)
      if (lastError.message.includes('HTTP 4')) {
        break;
      }

      // Wait before retry
      if (attempt < opts.retries - 1) {
        await sleep(opts.delayMs * (attempt + 1));
      }
    }
  }

  return {
    success: false,
    error: lastError?.message ?? 'Unknown error',
    fetchedAt: new Date(),
  };
}

/**
 * Fetch multiple feeds with rate limiting
 */
export async function fetchFeeds(
  feedUrls: string[],
  options: FetchOptions = {},
  onProgress?: (completed: number, total: number, current: string) => void
): Promise<Map<string, FetchResult>> {
  const results = new Map<string, FetchResult>();
  const total = feedUrls.length;

  for (let i = 0; i < feedUrls.length; i++) {
    const url = feedUrls[i];
    if (onProgress) {
      onProgress(i, total, url);
    }

    const result = await fetchFeed(url, options);
    results.set(url, result);
  }

  if (onProgress) {
    onProgress(total, total, 'done');
  }

  return results;
}

/**
 * Clear the feed cache
 */
export function clearCache(): void {
  feedCache.clear();
}

/**
 * Get cache statistics
 */
export function getCacheStats(): { size: number; urls: string[] } {
  return {
    size: feedCache.size,
    urls: Array.from(feedCache.keys()),
  };
}

/**
 * Build a Substack feed URL from a publication slug or base URL
 */
export function getSubstackFeedUrl(slugOrUrl: string): string {
  // If it's already a full URL
  if (slugOrUrl.startsWith('http')) {
    const url = new URL(slugOrUrl);
    // Ensure it ends with /feed
    if (!url.pathname.endsWith('/feed')) {
      url.pathname = '/feed';
    }
    return url.toString();
  }

  // It's a slug
  return `https://${slugOrUrl}.substack.com/feed`;
}
