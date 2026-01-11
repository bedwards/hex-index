#!/usr/bin/env npx tsx
/**
 * CLI tool for running article ingestion
 *
 * Usage:
 *   npx tsx tools/ingest/run.ts --source sources.json
 *   npx tsx tools/ingest/run.ts --feed https://example.substack.com/feed --name "Example" --slug example
 *   npx tsx tools/ingest/run.ts --source sources.json --dry-run --verbose
 */

import { parseArgs } from 'util';
import { config } from 'dotenv';
import { Pool } from 'pg';
import {
  ingestSource,
  ingestBatch,
  loadSourcesFromFile,
  IngestionSource,
  IngestionOptions,
} from '../../src/ingestion/index.js';

// Load environment variables
config();

const { values } = parseArgs({
  options: {
    source: { type: 'string', short: 's' },
    feed: { type: 'string', short: 'f' },
    name: { type: 'string', short: 'n' },
    slug: { type: 'string' },
    author: { type: 'string', short: 'a' },
    library: { type: 'string', short: 'l', default: './library' },
    delay: { type: 'string', short: 'd', default: '1000' },
    max: { type: 'string', short: 'm' },
    since: { type: 'string' },
    'dry-run': { type: 'boolean', default: false },
    verbose: { type: 'boolean', short: 'v', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
  allowPositionals: true,
});

function printHelp(): void {
  console.info(`
Article Ingestion Tool

Usage:
  npx tsx tools/ingest/run.ts [options]

Options:
  -s, --source <file>   JSON file with publication sources
  -f, --feed <url>      Single feed URL to ingest
  -n, --name <name>     Publication name (required with --feed)
      --slug <slug>     Publication slug (required with --feed)
  -a, --author <name>   Override author name
  -l, --library <dir>   Library directory (default: ./library)
  -d, --delay <ms>      Delay between fetches in ms (default: 1000)
  -m, --max <n>         Max articles per publication
      --since <date>    Skip articles before this date (ISO format)
      --dry-run         Don't write files, just show what would happen
  -v, --verbose         Verbose output
  -h, --help            Show this help

Examples:
  # Ingest from a sources file
  npx tsx tools/ingest/run.ts --source content/sources.json --verbose

  # Ingest a single feed
  npx tsx tools/ingest/run.ts --feed https://example.substack.com/feed \\
    --name "Example Blog" --slug example --verbose

  # Dry run to see what would be ingested
  npx tsx tools/ingest/run.ts --source sources.json --dry-run --verbose

  # Ingest only recent articles
  npx tsx tools/ingest/run.ts --source sources.json --since 2025-01-01
`);
}

async function main(): Promise<void> {
  if (values.help) {
    printHelp();
    process.exit(0);
  }

  // Connect to database - REQUIRED for ingestion
  if (!process.env.DATABASE_URL) {
    console.error('Error: DATABASE_URL is required. Set it in .env or environment.');
    console.error('Ingestion requires a database to ensure articles are properly stored.');
    process.exit(1);
  }

  const db = new Pool({ connectionString: process.env.DATABASE_URL });

  // Verify database connection before proceeding
  try {
    await db.query('SELECT 1');
    if (values.verbose) {
      console.info('Connected to database');
    }
  } catch (err) {
    console.error('Error: Cannot connect to database. Is Docker running?');
    console.error(`  Run: npm run db:up`);
    console.error(`  Details: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  }

  // Build options
  const options: Partial<IngestionOptions> = {
    libraryDir: values.library ?? './library',
    fetchDelayMs: parseInt(values.delay ?? '1000', 10),
    dryRun: values['dry-run'] ?? false,
    verbose: values.verbose ?? false,
    db,
  };

  if (values.max) {
    options.maxArticlesPerPub = parseInt(values.max, 10);
  }

  if (values.since) {
    options.since = new Date(values.since);
  }

  // Determine sources
  let sources: IngestionSource[];

  if (values.source) {
    // Load from file
    try {
      sources = await loadSourcesFromFile(values.source);
      console.info(`Loaded ${sources.length} sources from ${values.source}`);
    } catch (err) {
      console.error(
        `Error loading sources: ${err instanceof Error ? err.message : String(err)}`
      );
      process.exit(1);
    }
  } else if (values.feed) {
    // Single feed
    if (!values.name || !values.slug) {
      console.error('Error: --name and --slug are required with --feed');
      process.exit(1);
    }

    sources = [
      {
        name: values.name,
        slug: values.slug,
        feedUrl: values.feed,
        author: values.author,
      },
    ];
  } else {
    console.error('Error: Either --source or --feed is required');
    printHelp();
    process.exit(1);
  }

  // Run ingestion
  console.info(
    `\nStarting ingestion${options.dryRun ? ' (dry run)' : ''}...\n`
  );

  if (sources.length === 1) {
    const result = await ingestSource(sources[0], options);

    console.info(`\nResults for ${result.source.name}:`);
    console.info(`  Status: ${result.success ? 'SUCCESS' : 'FAILED'}`);
    console.info(`  Articles processed: ${result.articlesProcessed}`);
    console.info(`  Articles skipped: ${result.articlesSkipped}`);
    console.info(`  Articles stored: ${result.articlesStored}`);
    console.info(`  Errors: ${result.errors.length}`);
    console.info(`  Duration: ${result.duration}ms`);

    if (result.errors.length > 0) {
      console.info('\nErrors:');
      for (const error of result.errors) {
        console.info(`  - [${error.phase}] ${error.error}`);
        if (error.articleTitle) {
          console.info(`    Article: ${error.articleTitle}`);
        }
      }
    }

    process.exit(result.success ? 0 : 1);
  } else {
    const result = await ingestBatch(sources, options);

    console.info('\n=== Batch Ingestion Results ===');
    console.info(`Total sources: ${result.totalSources}`);
    console.info(`Successful: ${result.successfulSources}`);
    console.info(`Failed: ${result.failedSources}`);
    console.info(`Total articles processed: ${result.totalArticlesProcessed}`);
    console.info(`Total articles stored: ${result.totalArticlesStored}`);
    console.info(`Total errors: ${result.totalErrors}`);
    console.info(`Total duration: ${result.duration}ms`);

    if (result.failedSources > 0) {
      console.info('\nFailed sources:');
      for (const r of result.results.filter((r) => !r.success)) {
        console.info(`  - ${r.source.name}: ${r.errors[0]?.error ?? 'Unknown error'}`);
      }
    }

    process.exit(result.failedSources === 0 ? 0 : 1);
  }
}

main().catch((err: unknown) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
