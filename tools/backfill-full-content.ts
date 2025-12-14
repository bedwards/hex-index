#!/usr/bin/env npx tsx
/**
 * Backfill full content for stub articles
 *
 * This tool identifies articles in the database that are RSS stubs (excerpts only)
 * and fetches the full content from the Substack URL.
 *
 * Usage:
 *   npx tsx tools/backfill-full-content.ts [--limit N] [--dry-run] [--force]
 *
 * Options:
 *   --limit N    Process only N articles (for testing)
 *   --dry-run    Show what would be updated without making changes
 *   --force      Re-fetch articles even if they're not detected as stubs
 */

import { config } from 'dotenv';
import pg from 'pg';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { scrapeSubstackArticle, isStub, isSubstackUrl } from '../src/scraper/substack.js';

config();

const { Pool } = pg;

interface Article {
  id: string;
  title: string;
  original_url: string;
  content_path: string;
  word_count: number;
}

interface BackfillStats {
  total: number;
  stubs: number;
  processed: number;
  succeeded: number;
  failed: number;
  skipped: number;
  errors: Array<{ url: string; error: string }>;
}

async function backfillFullContent(options: {
  limit?: number;
  dryRun?: boolean;
  force?: boolean;
}): Promise<void> {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const libraryDir = process.env.LIBRARY_DIR || 'library';

  try {
    console.info('🔍 Analyzing articles in database...\n');

    // Get all articles (or limited set)
    const query = options.limit
      ? 'SELECT id, title, original_url, content_path, word_count FROM app.articles ORDER BY published_at DESC LIMIT $1'
      : 'SELECT id, title, original_url, content_path, word_count FROM app.articles ORDER BY published_at DESC';

    const params = options.limit ? [options.limit] : [];
    const result = await pool.query<Article>(query, params);

    const stats: BackfillStats = {
      total: result.rows.length,
      stubs: 0,
      processed: 0,
      succeeded: 0,
      failed: 0,
      skipped: 0,
      errors: [],
    };

    console.info(`📊 Found ${stats.total} articles to analyze`);

    // Identify stubs by reading HTML files
    for (const article of result.rows) {
      if (!article.content_path) {
        continue;
      }

      const htmlPath = join(libraryDir, article.content_path);
      try {
        const html = await readFile(htmlPath, 'utf-8');
        if (options.force || isStub(html)) {
          stats.stubs++;
        }
      } catch {
        // File doesn't exist or can't be read - count as stub
        stats.stubs++;
      }
    }

    console.info(`📝 Identified ${stats.stubs} stub articles (${((stats.stubs / stats.total) * 100).toFixed(1)}%)\n`);

    if (stats.stubs === 0) {
      console.info('✅ No stubs found. Library is up to date!');
      return;
    }

    if (options.dryRun) {
      console.info('🔍 DRY RUN MODE - No changes will be made\n');
    }

    // Process each stub
    for (const article of result.rows) {
      if (!article.content_path) {
        continue;
      }

      const htmlPath = join(libraryDir, article.content_path);

      // Read current HTML content
      let currentHtml = '';
      try {
        currentHtml = await readFile(htmlPath, 'utf-8');
      } catch {
        // File doesn't exist
        currentHtml = '';
      }

      if (!options.force && !isStub(currentHtml) && currentHtml !== '') {
        continue;
      }

      stats.processed++;

      // Check if URL is a Substack URL
      if (!isSubstackUrl(article.original_url)) {
        stats.skipped++;
        console.info(`⏭️  Skipping non-Substack URL: ${article.original_url}`);
        continue;
      }

      console.info(`\n[${stats.processed}/${stats.stubs}] Processing: ${article.title}`);
      console.info(`   URL: ${article.original_url}`);

      if (options.dryRun) {
        console.info('   [DRY RUN] Would fetch full content');
        stats.succeeded++;
        continue;
      }

      try {
        // Scrape full content
        const scraped = await scrapeSubstackArticle(article.original_url);

        if (!scraped.success) {
          stats.failed++;
          stats.errors.push({
            url: article.original_url,
            error: scraped.error || 'Unknown error',
          });
          console.error(`   ❌ Failed: ${scraped.error}`);
          continue;
        }

        // Calculate new word count
        const text = scraped.html
          .replace(/<[^>]*>/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        const newWordCount = text.split(/\s+/).filter(Boolean).length;

        // Update HTML file
        await writeFile(htmlPath, scraped.html, 'utf-8');

        // Update database with new word count and scraped flag
        await pool.query(
          `UPDATE app.articles
           SET word_count = $1,
               estimated_read_time_minutes = $2,
               metadata = jsonb_set(
                 COALESCE(metadata, '{}'::jsonb),
                 '{scraped}',
                 'true'
               )
           WHERE id = $3`,
          [newWordCount, Math.ceil(newWordCount / 200), article.id]
        );

        stats.succeeded++;
        const oldWords = article.word_count || 0;
        console.info(`   ✅ Updated: ${oldWords} → ${newWordCount} words`);

        // Progress update every 10 articles
        if (stats.processed % 10 === 0) {
          console.info(`\n📊 Progress: ${stats.succeeded} succeeded, ${stats.failed} failed, ${stats.skipped} skipped`);
        }
      } catch (error) {
        stats.failed++;
        const errorMessage = error instanceof Error ? error.message : String(error);
        stats.errors.push({
          url: article.original_url,
          error: errorMessage,
        });
        console.error(`   ❌ Error: ${errorMessage}`);
      }
    }

    // Final report
    console.info('\n' + '='.repeat(60));
    console.info('📊 BACKFILL COMPLETE\n');
    console.info(`Total articles:     ${stats.total}`);
    console.info(`Stubs identified:   ${stats.stubs}`);
    console.info(`Processed:          ${stats.processed}`);
    console.info(`✅ Succeeded:       ${stats.succeeded}`);
    console.info(`❌ Failed:          ${stats.failed}`);
    console.info(`⏭️  Skipped:         ${stats.skipped}\n`);

    if (stats.errors.length > 0) {
      console.info('Errors:\n');
      for (const error of stats.errors.slice(0, 10)) {
        console.info(`  ${error.url}`);
        console.info(`    └─ ${error.error}\n`);
      }
      if (stats.errors.length > 10) {
        console.info(`  ... and ${stats.errors.length - 10} more errors\n`);
      }
    }

    console.info('='.repeat(60));
  } finally {
    await pool.end();
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options: { limit?: number; dryRun?: boolean; force?: boolean } = {};

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--limit' && args[i + 1]) {
    options.limit = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === '--dry-run') {
    options.dryRun = true;
  } else if (args[i] === '--force') {
    options.force = true;
  }
}

backfillFullContent(options).catch((error: unknown) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
