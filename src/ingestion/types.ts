/**
 * Types for article ingestion pipeline
 */

import { Pool } from 'pg';
import { FeedItem } from '../feed/types.js';
import { ConvertedArticle, StorageResult } from '../markdown/types.js';

export interface IngestionSource {
  /** Publication name */
  name: string;
  /** Publication slug for storage */
  slug: string;
  /** RSS feed URL */
  feedUrl: string;
  /** Optional author override */
  author?: string;
}

export interface IngestionOptions {
  /** Base directory for article storage (default: ./library) */
  libraryDir: string;
  /** Delay between feed fetches in ms (default: 1000) */
  fetchDelayMs: number;
  /** Maximum articles to process per publication (default: unlimited) */
  maxArticlesPerPub?: number;
  /** Skip articles older than this date */
  since?: Date;
  /** Dry run - don't write files */
  dryRun: boolean;
  /** Verbose logging */
  verbose: boolean;
  /** Database pool for inserting articles (optional - if not provided, only stores to filesystem) */
  db?: Pool;
}

export const DEFAULT_INGESTION_OPTIONS: IngestionOptions = {
  libraryDir: './library',
  fetchDelayMs: 1000,
  dryRun: false,
  verbose: false,
};

export interface IngestionResult {
  source: IngestionSource;
  success: boolean;
  articlesProcessed: number;
  articlesSkipped: number;
  articlesStored: number;
  errors: IngestionError[];
  duration: number;
}

export interface IngestionError {
  articleTitle?: string;
  articleUrl?: string;
  error: string;
  phase: 'fetch' | 'parse' | 'convert' | 'store';
}

export interface BatchIngestionResult {
  totalSources: number;
  successfulSources: number;
  failedSources: number;
  totalArticlesProcessed: number;
  totalArticlesStored: number;
  totalErrors: number;
  results: IngestionResult[];
  duration: number;
}

export interface ArticleProcessResult {
  item: FeedItem;
  converted?: ConvertedArticle;
  stored?: StorageResult;
  skipped: boolean;
  skipReason?: string;
  error?: IngestionError;
}
