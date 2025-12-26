/**
 * Article ingestion pipeline
 * Orchestrates: fetch RSS → parse → convert → store → database
 */

import { fetchFeed } from '../feed/fetcher.js';
import { FeedItem } from '../feed/types.js';
import { convertFeedItem, slugify } from '../markdown/converter.js';
import { storeArticle, articleExists } from '../markdown/storage.js';
import { LibraryConfig } from '../markdown/types.js';
import { config } from '../config.js';
import {
  createPublication,
  getPublicationBySlug,
  createArticle,
  getArticleByUrl,
} from '../db/queries.js';
import { enrichArticleWithWikipedia } from '../wikipedia/pipeline.js';
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
  options: IngestionOptions,
  publicationId?: string
): Promise<ArticleProcessResult> {
  const libraryConfig: LibraryConfig = { baseDir: options.libraryDir };
  const articleSlug = slugify(item.title);

  // Check if article already exists in filesystem
  if (articleExists(source.slug, articleSlug, libraryConfig)) {
    return {
      item,
      skipped: true,
      skipReason: 'already exists',
    };
  }

  // Filter: Only text posts (no audio/video)
  if (config.textOnly && item.mediaType !== 'text') {
    return {
      item,
      skipped: true,
      skipReason: `${item.mediaType} content (text-only filter)`,
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
    // Convert to markdown and HTML
    const converted = convertFeedItem(item, {
      name: source.name,
      slug: source.slug,
    });

    // Override author if specified in source
    if (source.author) {
      converted.metadata.author = source.author;
    }

    // Filter: Minimum read time
    if (converted.metadata.estimated_read_time < config.minReadTimeMinutes) {
      return {
        item,
        skipped: true,
        skipReason: `${converted.metadata.estimated_read_time} min read (minimum: ${config.minReadTimeMinutes} min)`,
      };
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
    const stored = await storeArticle(converted, libraryConfig);

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

    // Insert into database if pool provided
    let newArticleId: string | undefined;
    if (options.db && publicationId) {
      try {
        // Check if article already exists in DB by URL
        const existing = await getArticleByUrl(options.db, item.url);
        if (!existing) {
          const newArticle = await createArticle(options.db, {
            publication_id: publicationId,
            title: item.title,
            slug: articleSlug,
            original_url: item.url,
            content_path: stored.path,
            author_name: converted.metadata.author,
            published_at: item.publishedAt,
            word_count: converted.metadata.word_count,
            estimated_read_time_minutes: converted.metadata.estimated_read_time,
            media_type: item.mediaType,
            tags: converted.metadata.tags,
          });
          newArticleId = newArticle.id;
        }
      } catch (dbErr) {
        // Log but don't fail - filesystem storage succeeded
        if (options.verbose) {
          console.info(`  DB insert failed: ${dbErr instanceof Error ? dbErr.message : String(dbErr)}`);
        }
      }
    }

    // Enrich new articles with Wikipedia content
    if (options.db && newArticleId && options.enrichWithWikipedia !== false) {
      try {
        if (options.verbose) {
          console.info(`  Enriching with Wikipedia: ${item.title}`);
        }
        const enrichResult = await enrichArticleWithWikipedia(options.db, newArticleId);
        if (enrichResult.success && enrichResult.wikipediaArticles.length > 0) {
          if (options.verbose) {
            console.info(`    Added ${enrichResult.wikipediaArticles.length} Wikipedia articles`);
          }
        }
      } catch (enrichErr) {
        // Log but don't fail - article storage succeeded
        if (options.verbose) {
          console.info(`  Wikipedia enrichment failed: ${enrichErr instanceof Error ? enrichErr.message : String(enrichErr)}`);
        }
      }
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

  // Get or create publication in database
  let publicationId: string | undefined;
  if (opts.db) {
    try {
      let publication = await getPublicationBySlug(opts.db, source.slug);
      if (!publication) {
        // Create new publication
        publication = await createPublication(opts.db, {
          name: source.name,
          slug: source.slug,
          base_url: source.feedUrl.replace('/feed', ''),
          feed_url: source.feedUrl,
          author_name: source.author,
        });
      }
      publicationId = publication.id;
    } catch (dbErr) {
      if (opts.verbose) {
        console.info(`  DB publication error: ${dbErr instanceof Error ? dbErr.message : String(dbErr)}`);
      }
    }
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

    const result = await processArticle(item, source, opts, publicationId);

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
