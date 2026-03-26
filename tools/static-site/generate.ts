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
 *   npx tsx tools/static-site/generate.ts                    # Full regeneration
 *   npx tsx tools/static-site/generate.ts --clean            # Clean and regenerate
 *   npx tsx tools/static-site/generate.ts --only weekly      # Just the weekly page
 *   npx tsx tools/static-site/generate.ts --only home,tags   # Home + tag pages
 *   npx tsx tools/static-site/generate.ts --article <id>     # Single article + listings
 *
 * --only options: home, articles, wikipedia, publications, tags, weekly, about, search, assets
 * --article <uuid>: regenerates one article page + search index
 */

import { config } from 'dotenv';
import { createPool } from '../../src/db/queries.js';
import { generateHomePages } from './pages/home.js';
import { generateArticlePages } from './pages/article.js';
import { generateWikipediaPages } from './pages/wikipedia.js';
import { generatePublicationPages } from './pages/publication.js';
import { generateTagPages } from './pages/tag.js';
import { generateSearchIndex } from './pages/search-index.js';
import { generateWeeklyEpubs } from './pages/weekly.js';
import { generateAboutPage } from './pages/about.js';
import { ensureDir } from './utils.js';
import { rm, cp, readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

config();

const OUTPUT_DIR = join(process.cwd(), 'docs');
const PUBLIC_DIR = join(process.cwd(), 'public');

// ── CLI parsing ──────────────────────────────────────────────────────

const args = process.argv.slice(2);
const shouldClean = args.includes('--clean');

const onlyIdx = args.indexOf('--only');
const onlySet = onlyIdx >= 0 && args[onlyIdx + 1]
  ? new Set(args[onlyIdx + 1].split(',').map(s => s.trim().toLowerCase()))
  : null;

const articleIdx = args.indexOf('--article');
const singleArticleId = articleIdx >= 0 ? args[articleIdx + 1] : null;

function shouldRun(name: string): boolean {
  if (singleArticleId) {
    // --article mode: only run articles + search
    return name === 'articles' || name === 'search';
  }
  if (onlySet) {
    return onlySet.has(name);
  }
  return true; // full generation
}

// ── Main ─────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const mode = singleArticleId
    ? `article ${singleArticleId}`
    : onlySet
      ? `only: ${[...onlySet].join(', ')}`
      : 'full';

  console.info('Static Site Generator');
  console.info(`===================== [${mode}]\n`);

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('Error: DATABASE_URL not set');
    process.exit(1);
  }

  const pool = createPool(databaseUrl);

  try {
    // Clean output directory if requested, preserving CNAME for GitHub Pages
    if (shouldClean) {
      console.info('Cleaning output directory...');
      const cnameFile = join(OUTPUT_DIR, 'CNAME');
      let cnameContent: string | null = null;
      try {
        cnameContent = await readFile(cnameFile, 'utf-8');
      } catch (err: unknown) {
        if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
          throw err;
        }
      }
      await rm(OUTPUT_DIR, { recursive: true, force: true });
      if (cnameContent !== null) {
        await ensureDir(OUTPUT_DIR);
        await writeFile(cnameFile, cnameContent);
        console.info('  Preserved CNAME file');
      }
    }

    await ensureDir(OUTPUT_DIR);

    // Copy static assets
    if (shouldRun('assets') || (!onlySet && !singleArticleId)) {
      console.info('Copying static assets...');
      await cp(join(PUBLIC_DIR, 'styles.css'), join(OUTPUT_DIR, 'styles.css'));
      console.info('  Copied styles.css');

      const libraryImagesDir = join(process.cwd(), 'library', 'images');
      const outputImagesDir = join(OUTPUT_DIR, 'images');
      if (existsSync(libraryImagesDir)) {
        await ensureDir(outputImagesDir);
        const imageFiles = await readdir(libraryImagesDir);
        const webpFiles = imageFiles.filter(f => f.endsWith('.webp'));
        for (const file of webpFiles) {
          await cp(join(libraryImagesDir, file), join(outputImagesDir, file));
        }
        console.info(`  Copied ${webpFiles.length} article images\n`);
      } else {
        console.info('  No article images found\n');
      }
    }

    // Generate pages based on mode
    if (shouldRun('home')) {
      console.info('Generating home pages...');
      const homeResult = await generateHomePages(pool, OUTPUT_DIR);
      console.info(`  ${homeResult.pagesGenerated} pages, ${homeResult.articlesProcessed} articles\n`);
    }

    if (shouldRun('articles')) {
      console.info('Generating article pages...');
      const articleResult = await generateArticlePages(pool, OUTPUT_DIR, singleArticleId ?? undefined);
      console.info(`  ${articleResult.pagesGenerated} pages\n`);
    }

    if (shouldRun('wikipedia')) {
      console.info('Generating Wikipedia pages...');
      const wikiResult = await generateWikipediaPages(pool, OUTPUT_DIR);
      console.info(`  ${wikiResult.pagesGenerated} pages\n`);
    }

    if (shouldRun('publications')) {
      console.info('Generating publication pages...');
      const pubResult = await generatePublicationPages(pool, OUTPUT_DIR);
      console.info(`  ${pubResult.publicationsGenerated} publications, ${pubResult.pagesGenerated} pages\n`);
    }

    if (shouldRun('tags')) {
      console.info('Generating tag pages...');
      const tagResult = await generateTagPages(pool, OUTPUT_DIR);
      console.info(`  ${tagResult.tagsGenerated} tags, ${tagResult.pagesGenerated} pages\n`);
    }

    if (shouldRun('weekly')) {
      console.info('Generating weekly pages...');
      const weeklyResult = await generateWeeklyEpubs(pool, OUTPUT_DIR);
      console.info(`  ${weeklyResult.weeksGenerated} new epubs generated\n`);
    }

    if (shouldRun('about')) {
      console.info('Generating about page...');
      await generateAboutPage(OUTPUT_DIR);
      console.info('');
    }

    if (shouldRun('search')) {
      console.info('Generating search index...');
      await generateSearchIndex(pool, OUTPUT_DIR);
      console.info('');
    }

    console.info('Done.');

  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Error:', err);
  process.exit(1);
});
