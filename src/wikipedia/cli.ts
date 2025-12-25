#!/usr/bin/env npx tsx
/**
 * CLI for Wikipedia enrichment operations
 *
 * Commands:
 *   retrofit [--limit N] [--publication SLUG]   Enrich existing articles with Wikipedia
 *   stats                                        Show enrichment statistics
 *   enrich <article-id>                          Enrich a single article
 */

import { config } from 'dotenv';
import { createPool } from '../db/queries.js';
import { enrichArticleWithWikipedia, retrofitExistingArticles, getEnrichmentStats } from './pipeline.js';

config();

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.info(`Usage: npx tsx src/wikipedia/cli.ts <command> [options]

Commands:
  retrofit [--limit N] [--publication SLUG]   Enrich existing articles
  stats                                       Show enrichment statistics
  enrich <article-id>                         Enrich a single article
`);
    process.exit(1);
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }

  const pool = createPool(databaseUrl);

  try {
    switch (command) {
      case 'retrofit': {
        const limitIdx = args.indexOf('--limit');
        const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : 10;

        const pubIdx = args.indexOf('--publication');
        const publicationSlug = pubIdx >= 0 ? args[pubIdx + 1] : undefined;

        console.info(`Retrofitting articles with Wikipedia enrichment...`);
        console.info(`  Limit: ${limit}`);
        if (publicationSlug) {
          console.info(`  Publication: ${publicationSlug}`);
        }
        console.info();

        const result = await retrofitExistingArticles(pool, {
          limit,
          startFrom: 'newest',
          publicationSlug,
        });

        console.info();
        console.info('Summary:');
        console.info(`  Processed: ${result.processed}`);
        console.info(`  Enriched: ${result.enriched}`);
        console.info(`  Errors: ${result.errors.length}`);

        if (result.errors.length > 0) {
          console.info('\nErrors:');
          for (const err of result.errors.slice(0, 10)) {
            console.info(`  - ${err}`);
          }
          if (result.errors.length > 10) {
            console.info(`  ... and ${result.errors.length - 10} more`);
          }
        }
        break;
      }

      case 'stats': {
        const stats = await getEnrichmentStats(pool);
        console.info('Wikipedia Enrichment Statistics:');
        console.info(`  Total articles: ${stats.totalArticles}`);
        console.info(`  Enriched articles: ${stats.enrichedArticles} (${((stats.enrichedArticles / stats.totalArticles) * 100).toFixed(1)}%)`);
        console.info(`  Wikipedia articles: ${stats.totalWikipediaArticles}`);
        console.info(`  Average read time: ${stats.averageReadTime.toFixed(1)} minutes`);
        break;
      }

      case 'enrich': {
        const articleId = args[1];
        if (!articleId) {
          console.error('Article ID required');
          process.exit(1);
        }

        console.info(`Enriching article: ${articleId}`);
        const result = await enrichArticleWithWikipedia(pool, articleId, { force: true });

        if (result.success) {
          console.info(`Added ${result.wikipediaArticles.length} Wikipedia articles:`);
          for (const wiki of result.wikipediaArticles) {
            console.info(`  - ${wiki.title} (${wiki.estimatedReadTimeMinutes} min)`);
          }
        } else {
          console.error('Enrichment failed:');
          for (const err of result.errors) {
            console.error(`  - ${err}`);
          }
          process.exit(1);
        }
        break;
      }

      default:
        console.error(`Unknown command: ${command}`);
        process.exit(1);
    }
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Error:', err);
  process.exit(1);
});
