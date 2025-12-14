/**
 * Types for RSS/Atom feed parsing
 */

export type MediaType = 'text' | 'audio' | 'video';

export interface FeedItem {
  title: string;
  url: string;
  publishedAt: Date;
  author: string;
  contentHtml: string;
  mediaType: MediaType;
  summary?: string;
  imageUrl?: string;
  guid?: string;
}

export interface Feed {
  title: string;
  description?: string;
  link: string;
  feedUrl: string;
  author?: string;
  lastBuildDate?: Date;
  items: FeedItem[];
}

export interface FetchOptions {
  /** Delay between requests in milliseconds (default: 2000) */
  delayMs?: number;
  /** Number of retry attempts (default: 3) */
  retries?: number;
  /** Timeout in milliseconds (default: 30000) */
  timeoutMs?: number;
  /** User agent string */
  userAgent?: string;
}

export interface FetchResult {
  success: boolean;
  feed?: Feed;
  error?: string;
  cached?: boolean;
  fetchedAt: Date;
}

export const DEFAULT_FETCH_OPTIONS: Required<FetchOptions> = {
  delayMs: 2000,
  retries: 3,
  timeoutMs: 30000,
  userAgent: 'hex-index/1.0 (Personal Library; https://github.com/bedwards/hex-index)',
};
