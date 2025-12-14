#!/usr/bin/env npx tsx
/**
 * Cleanup script to remove video/audio posts from the library
 * Keeps only text posts, removes media content from database and filesystem
 *
 * Usage:
 *   npm run cleanup:media -- --dry-run    # Preview what would be removed
 *   npm run cleanup:media                 # Execute cleanup
 */

import { parseArgs } from 'util';
import { config } from 'dotenv';
import { createPool } from '../src/db/queries.js';
import { fetchFeed } from '../src/feed/fetcher.js';
import { listPublications, getArticleByUrl, getPublicationById } from '../src/db/queries.js';
import { unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import type { Publication, Article } from '../src/db/types.js';

interface FeedItem {
  title?: string;
  url?: string;
  enclosure?: {
    '@_type'?: string;
  };
  'media:content'?: {
    '@_type'?: string;
    '@_medium'?: string;
  };
  'content:encoded'?: string | { '#text'?: string };
  categories?: string | string[] | { '#text'?: string }[];
}

// Load environment variables
config();

const { values } = parseArgs({
  options: {
    'dry-run': { type: 'boolean', default: false },
    verbose: { type: 'boolean', short: 'v', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
  allowPositionals: true,
});

if (values.help) {
  console.info(`
Media Post Cleanup Script

Removes all video/audio posts from the library, keeping only text posts.

Usage:
  npm run cleanup:media -- --dry-run    # Preview deletions
  npm run cleanup:media -- --verbose    # Show detailed progress
  npm run cleanup:media                 # Execute cleanup

Options:
  --dry-run    Preview what would be removed without deleting
  --verbose    Show detailed progress information
  --help       Show this help message

What it does:
- Fetches current RSS feeds for all publications
- Detects video/audio posts via feed metadata and content analysis
- Removes media posts from database AND filesystem
- Preserves all text posts
- Updates publication article counts
`);
  process.exit(0);
}

const DRY_RUN = values['dry-run'] || false;
const VERBOSE = values.verbose || false;

// Database connection
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const pool = createPool(databaseUrl);

// Library directory
const LIBRARY_DIR = './library';

/**
 * Detect if a feed item represents video/audio content
 */
function detectMediaType(feedItem: FeedItem): 'text' | 'audio' | 'video' {
  const { enclosure, 'media:content': mediaContent, 'content:encoded': content, categories } = feedItem;

  // Check enclosure type (RSS)
  if (enclosure?.['@_type']) {
    const type = enclosure['@_type'];
    if (type.startsWith('audio/')) {
      return 'audio';
    }
    if (type.startsWith('video/')) {
      return 'video';
    }
  }

  // Check Media RSS type
  if (mediaContent?.['@_type']) {
    const type = mediaContent['@_type'];
    if (type.startsWith('audio/')) {
      return 'audio';
    }
    if (type.startsWith('video/')) {
      return 'video';
    }
  }

  // Check for media attributes in Media RSS
  if (mediaContent?.['@_medium']) {
    const medium = mediaContent['@_medium'];
    if (medium === 'audio') {
      return 'audio';
    }
    if (medium === 'video') {
      return 'video';
    }
  }

  // Check categories for media indicators
  if (categories) {
    const cats = Array.isArray(categories) ? categories : [categories];
    for (const cat of cats) {
      const category = typeof cat === 'string' ? cat : (cat as { '#text'?: string })['#text'] || '';
      const lowerCat = category.toLowerCase();
      if (lowerCat.includes('podcast') || lowerCat.includes('audio')) {
        return 'audio';
      }
      if (lowerCat.includes('video')) {
        return 'video';
      }
    }
  }

  // Check HTML content for media tags
  if (content) {
    const htmlContent = typeof content === 'string' ? content : (content as { '#text'?: string })['#text'] || '';
    if (htmlContent.includes('<video')) {
      return 'video';
    }
    if (htmlContent.includes('<audio')) {
      return 'audio';
    }
    if (htmlContent.toLowerCase().includes('transcript')) {
      return 'audio'; // Audio with transcript
    }
  }

  return 'text';
}

/**
 * Get the filesystem path for an article
 */
function getArticlePath(publicationSlug: string, articleSlug: string): string {
  return join(LIBRARY_DIR, publicationSlug, `${articleSlug}.html`);
}

/**
 * Delete an article from database
 */
async function deleteArticle(pool: ReturnType<typeof createPool>, articleId: string): Promise<void> {
  await pool.query('DELETE FROM app.articles WHERE id = $1', [articleId]);
}

/**
 * Process a single publication
 */
async function processPublication(publication: Publication): Promise<{
  processed: number;
  removed: number;
  errors: number;
}> {
  let processed = 0;
  let removed = 0;
  let errors = 0;

  if (VERBOSE) {
    console.info(`\n📚 Processing publication: ${publication.name}`);
  }

  try {
    // Fetch current feed
    const feedResult = await fetchFeed(publication.feed_url, { delayMs: 1000 });

    if (!feedResult.success || !feedResult.feed) {
      console.error(`❌ Failed to fetch feed for ${publication.name}: ${feedResult.error}`);
      return { processed: 0, removed: 0, errors: 1 };
    }

    const feed = feedResult.feed;

    if (VERBOSE) {
      console.info(`📡 Fetched ${feed.items.length} items from feed`);
    }

    // Process each feed item
    for (const item of feed.items) {
      processed++;

      // Determine media type
      const mediaType = detectMediaType(item);

      if (mediaType === 'text') {
        if (VERBOSE) {
          console.info(`✅ Keeping text post: ${item.title}`);
        }
        continue;
      }

      // This is a media post - check if it exists in our library
      const existingArticle: Article | null = await getArticleByUrl(pool, item.url);

      if (!existingArticle) {
        if (VERBOSE) {
          console.info(`ℹ️  Media post not in library: ${item.title} (${mediaType})`);
        }
        continue;
      }

      // Get publication info for the slug
      const articlePublication: Publication | null = await getPublicationById(pool, existingArticle.publication_id);
      if (!articlePublication) {
        console.error(`❌ Could not find publication for article ${item.title}`);
        continue;
      }

      // Article exists - remove it
      if (VERBOSE || DRY_RUN) {
        console.info(`${DRY_RUN ? '🗑️  Would remove' : '🗑️  Removing'} ${mediaType} post: ${item.title}`);
      }

      if (!DRY_RUN) {
        try {
          // Delete from filesystem
          const articlePath = getArticlePath(articlePublication.slug, existingArticle.slug);
          if (existsSync(articlePath)) {
            await unlink(articlePath);
            if (VERBOSE) {
              console.info(`🗂️  Deleted file: ${articlePath}`);
            }
          }

          // Delete from database
          await deleteArticle(pool, existingArticle.id);
          if (VERBOSE) {
            console.info(`🗃️  Deleted from database: ${existingArticle.id}`);
          }

          removed++;
        } catch (err) {
          console.error(`❌ Error removing article ${item.title}: ${err}`);
          errors++;
        }
      } else {
        removed++; // Count as removed in dry run
      }
    }

  } catch (err) {
    console.error(`❌ Error processing publication ${publication.name}: ${err}`);
    errors++;
  }

  return { processed, removed, errors };
}

/**
 * Main execution
 */
async function main() {
  console.info(`${DRY_RUN ? '🔍 DRY RUN MODE' : '🧹 CLEANUP MODE'}: Removing video/audio posts from library\n`);

  try {
    // Get all publications
    const publications = await listPublications(pool, {});

    if (publications.length === 0) {
      console.info('ℹ️  No publications found in library');
      return;
    }

    console.info(`📚 Found ${publications.length} publications to process\n`);

    // Process all publications
    let totalProcessed = 0;
    let totalRemoved = 0;
    let totalErrors = 0;

    for (const publication of publications) {
      const result = await processPublication(publication);
      totalProcessed += result.processed;
      totalRemoved += result.removed;
      totalErrors += result.errors;
    }

    // Summary
    console.info(`\n📊 Cleanup Summary:`);
    console.info(`   Publications processed: ${publications.length}`);
    console.info(`   Articles checked: ${totalProcessed}`);
    console.info(`   Media posts ${DRY_RUN ? 'would be' : ''} removed: ${totalRemoved}`);
    console.info(`   Errors: ${totalErrors}`);

    if (DRY_RUN) {
      console.info(`\n💡 To execute the actual cleanup, run without --dry-run flag`);
    } else {
      console.info(`\n✅ Cleanup completed successfully!`);
      console.info(`💡 Run 'npx tsx tools/check-db.ts' to verify article count`);
    }

  } catch (err) {
    console.error(`❌ Fatal error: ${err}`);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the script
main().catch((err: unknown) => {
  console.error(`❌ Unhandled error: ${err}`);
  process.exit(1);
});