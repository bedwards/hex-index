#!/usr/bin/env npx tsx
/**
 * Static site generator for GitHub Pages
 *
 * Generates a copyright-compliant static version of the library:
 * - Substack articles: excerpts only with links to originals
 * - Wikipedia articles: full content (we own the copyright on rewrites)
 * - No search, no database dependency
 * - Paginated listings
 *
 * Usage:
 *   npx tsx tools/static-site/generate.ts
 *   npx tsx tools/static-site/generate.ts --clean   # Remove existing docs/ first
 */

import { config } from 'dotenv';
import { createPool } from '../../src/db/queries.js';
import { generateHomePages } from './pages/home.js';
import { generateArticlePages } from './pages/article.js';
import { generateWikipediaPages } from './pages/wikipedia.js';
import { generatePublicationPages } from './pages/publication.js';
import { ensureDir } from './utils.js';
import { rm, cp } from 'fs/promises';
import { join } from 'path';

config();

const OUTPUT_DIR = join(process.cwd(), 'docs');
const PUBLIC_DIR = join(process.cwd(), 'public');

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const shouldClean = args.includes('--clean');

  console.info('Static Site Generator');
  console.info('=====================\n');

  // Check database connection
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('Error: DATABASE_URL not set');
    process.exit(1);
  }

  const pool = createPool(databaseUrl);

  try {
    // Clean output directory if requested
    if (shouldClean) {
      console.info('Cleaning output directory...');
      await rm(OUTPUT_DIR, { recursive: true, force: true });
    }

    // Ensure output directory exists
    await ensureDir(OUTPUT_DIR);

    // Copy static assets
    console.info('Copying static assets...');
    await cp(join(PUBLIC_DIR, 'styles.css'), join(OUTPUT_DIR, 'styles.css'));
    console.info('  Copied styles.css\n');

    // Generate home pages
    console.info('Generating home pages...');
    const homeResult = await generateHomePages(pool, OUTPUT_DIR);
    console.info(`  ${homeResult.pagesGenerated} pages, ${homeResult.articlesProcessed} articles\n`);

    // Generate article pages
    console.info('Generating article pages...');
    const articleResult = await generateArticlePages(pool, OUTPUT_DIR);
    console.info(`  ${articleResult.pagesGenerated} pages\n`);

    // Generate Wikipedia pages
    console.info('Generating Wikipedia pages...');
    const wikiResult = await generateWikipediaPages(pool, OUTPUT_DIR);
    console.info(`  ${wikiResult.pagesGenerated} pages\n`);

    // Generate publication pages
    console.info('Generating publication pages...');
    const pubResult = await generatePublicationPages(pool, OUTPUT_DIR);
    console.info(`  ${pubResult.publicationsGenerated} publications, ${pubResult.pagesGenerated} pages\n`);

    // Summary
    console.info('=====================');
    console.info('Generation complete!\n');
    console.info('Summary:');
    console.info(`  Home pages: ${homeResult.pagesGenerated}`);
    console.info(`  Article pages: ${articleResult.pagesGenerated}`);
    console.info(`  Wikipedia pages: ${wikiResult.pagesGenerated}`);
    console.info(`  Publication pages: ${pubResult.pagesGenerated}`);
    console.info(`\nOutput: ${OUTPUT_DIR}`);

  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Error:', err);
  process.exit(1);
});
