/**
 * Article ingestion pipeline
 * Orchestrates: fetch RSS → parse → convert → store
 */

import { fetchFeed } from '../feed/fetcher.js';
import { FeedItem } from '../feed/types.js';
import { convertFeedItem, slugify } from '../markdown/converter.js';
import { storeArticle, articleExists } from '../markdown/storage.js';
import { LibraryConfig } from '../markdown/types.js';
import {
  IngestionSource,
  IngestionOptions,
  IngestionResult,
  IngestionError,
  BatchIngestionResult,
  ArticleProcessResult,
  DEFAULT_INGESTION_OPTIONS,
} from './types.js';

/**
 * Process a single article from a feed item
 */
export async function processArticle(
  item: FeedItem,
  source: IngestionSource,
  options: IngestionOptions
): Promise<ArticleProcessResult> {
  const config: LibraryConfig = { baseDir: options.libraryDir };
  const articleSlug = slugify(item.title);

  // Check if article already exists
  if (articleExists(source.slug, articleSlug, config)) {
    return {
      item,
      skipped: true,
      skipReason: 'already exists',
    };
  }

  // Check date filter
  if (options.since && item.publishedAt < options.since) {
    return {
      item,
      skipped: true,
      skipReason: `published before ${options.since.toISOString()}`,
    };
  }

  try {
    // Convert to markdown
    const converted = convertFeedItem(item, {
      name: source.name,
      slug: source.slug,
    });

    // Override author if specified in source
    if (source.author) {
      converted.metadata.author = source.author;
    }

    // Dry run - don't store
    if (options.dryRun) {
      return {
        item,
        converted,
        skipped: false,
      };
    }

    // Store to filesystem
    const stored = await storeArticle(converted, config);

    if (!stored.success) {
      return {
        item,
        converted,
        skipped: false,
        error: {
          articleTitle: item.title,
          articleUrl: item.url,
          error: stored.error ?? 'Unknown storage error',
          phase: 'store',
        },
      };
    }

    return {
      item,
      converted,
      stored,
      skipped: false,
    };
  } catch (err) {
    return {
      item,
      skipped: false,
      error: {
        articleTitle: item.title,
        articleUrl: item.url,
        error: err instanceof Error ? err.message : String(err),
        phase: 'convert',
      },
    };
  }
}

/**
 * Ingest articles from a single source
 */
export async function ingestSource(
  source: IngestionSource,
  options: Partial<IngestionOptions> = {}
): Promise<IngestionResult> {
  const opts = { ...DEFAULT_INGESTION_OPTIONS, ...options };
  const startTime = Date.now();
  const errors: IngestionError[] = [];
  let articlesProcessed = 0;
  let articlesSkipped = 0;
  let articlesStored = 0;

  if (opts.verbose) {
    console.info(`Ingesting from ${source.name} (${source.feedUrl})`);
  }

  // Fetch the feed (fetcher already parses)
  const fetchResult = await fetchFeed(source.feedUrl, {
    delayMs: opts.fetchDelayMs,
  });

  if (!fetchResult.success || !fetchResult.feed) {
    return {
      source,
      success: false,
      articlesProcessed: 0,
      articlesSkipped: 0,
      articlesStored: 0,
      errors: [
        {
          error: fetchResult.error ?? 'Failed to fetch feed',
          phase: 'fetch',
        },
      ],
      duration: Date.now() - startTime,
    };
  }

  // Get items from parsed feed
  let items: FeedItem[] = fetchResult.feed.items;

  // Limit articles if specified
  if (opts.maxArticlesPerPub && items.length > opts.maxArticlesPerPub) {
    items = items.slice(0, opts.maxArticlesPerPub);
  }

  // Process each article
  for (const item of items) {
    articlesProcessed++;

    const result = await processArticle(item, source, opts);

    if (result.skipped) {
      articlesSkipped++;
      if (opts.verbose) {
        console.info(`  Skipped: ${item.title} (${result.skipReason})`);
      }
    } else if (result.error) {
      errors.push(result.error);
      if (opts.verbose) {
        console.info(`  Error: ${item.title} - ${result.error.error}`);
      }
    } else if (result.stored?.success) {
      articlesStored++;
      if (opts.verbose) {
        console.info(`  Stored: ${item.title} → ${result.stored.path}`);
      }
    } else if (opts.dryRun) {
      articlesStored++; // Count as stored in dry run
      if (opts.verbose) {
        console.info(`  Would store: ${item.title}`);
      }
    }
  }

  return {
    source,
    success: errors.length === 0,
    articlesProcessed,
    articlesSkipped,
    articlesStored,
    errors,
    duration: Date.now() - startTime,
  };
}

/**
 * Ingest articles from multiple sources
 */
export async function ingestBatch(
  sources: IngestionSource[],
  options: Partial<IngestionOptions> = {}
): Promise<BatchIngestionResult> {
  const opts = { ...DEFAULT_INGESTION_OPTIONS, ...options };
  const startTime = Date.now();
  const results: IngestionResult[] = [];

  for (const source of sources) {
    const result = await ingestSource(source, opts);
    results.push(result);

    // Delay between sources
    if (sources.indexOf(source) < sources.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, opts.fetchDelayMs));
    }
  }

  const successfulSources = results.filter((r) => r.success).length;
  const failedSources = results.filter((r) => !r.success).length;
  const totalArticlesProcessed = results.reduce(
    (sum, r) => sum + r.articlesProcessed,
    0
  );
  const totalArticlesStored = results.reduce(
    (sum, r) => sum + r.articlesStored,
    0
  );
  const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);

  return {
    totalSources: sources.length,
    successfulSources,
    failedSources,
    totalArticlesProcessed,
    totalArticlesStored,
    totalErrors,
    results,
    duration: Date.now() - startTime,
  };
}

/**
 * Load sources from a JSON file
 */
export async function loadSourcesFromFile(
  filePath: string
): Promise<IngestionSource[]> {
  const { readFile } = await import('fs/promises');
  const content = await readFile(filePath, 'utf-8');
  const data = JSON.parse(content) as {
    publications?: Array<{
      name: string;
      slug: string;
      feedUrl?: string;
      url?: string;
      author?: string;
    }>;
  };

  if (!data.publications || !Array.isArray(data.publications)) {
    throw new Error('Invalid sources file: expected { publications: [...] }');
  }

  return data.publications
    .filter((pub) => pub.feedUrl ?? pub.url)
    .map((pub) => ({
      name: pub.name,
      slug: pub.slug,
      feedUrl: pub.feedUrl ?? `${pub.url}/feed`,
      author: pub.author,
    }));
}
