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
 * --only options: home, articles, wikipedia, publications, tags, weekly, about, legal, search, assets
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
import { generatePrivacyPage, generateTermsPage } from './pages/legal.js';
import { ensureDir } from './utils.js';
import { computeFailedGateIds } from '../editorial/publish-gate.js';
import { rm, cp, readFile, writeFile, readdir, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import type { Pool } from 'pg';

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

    // Publish gate: pre-scan eligible articles so listing queries and the
    // article generator can skip broken articles consistently. Skipped for
    // single-article runs (article.ts handles those inline).
    if (!singleArticleId) {
      console.info('Running publish gate pre-scan...');
      const failed = await computeFailedGateIds(pool);
      console.info(`  ${failed.length} article(s) hidden by publish gate\n`);
    }

    // Wikipedia staleness check: if the caller didn't ask for wikipedia
    // regen explicitly, but new wiki articles have landed since the
    // newest file in docs/wikipedia/ — or any article body references a
    // /wikipedia/<slug>/ that's missing on disk — force a wiki regen.
    // This is the systemic root cause of HX-002/003/004.
    let forceWikipedia = false;
    if (!singleArticleId && onlySet && !onlySet.has('wikipedia')) {
      forceWikipedia = await wikipediaIsStale(pool, OUTPUT_DIR);
      if (forceWikipedia) {
        console.info('Wikipedia pages are stale — forcing wikipedia regen this run.\n');
      }
    }

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

    if (shouldRun('wikipedia') || forceWikipedia) {
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

    if (shouldRun('legal')) {
      console.info('Generating legal pages...');
      await generatePrivacyPage(OUTPUT_DIR);
      await generateTermsPage(OUTPUT_DIR);
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

/**
 * Detect whether docs/wikipedia/ is stale relative to the database.
 *
 * Returns true if EITHER:
 *   (a) Any wikipedia_articles row has updated_at newer than the newest
 *       index.html under docs/wikipedia/, OR
 *   (b) Any rewritten article body references a /wikipedia/<slug>/ path
 *       whose docs/wikipedia/<slug>/index.html is missing on disk.
 *
 * This protects against the HX-002/003/004 root cause: running
 * `--only home,articles,tags` and forgetting `wikipedia`.
 */
async function wikipediaIsStale(pool: Pool, outputDir: string): Promise<boolean> {
  const wikiDir = join(outputDir, 'wikipedia');
  if (!existsSync(wikiDir)) {return true;}

  // Newest mtime under docs/wikipedia/. We sample by reading the
  // top-level entries' index.html mtimes — sufficient for staleness.
  let newestMs = 0;
  try {
    const entries = await readdir(wikiDir);
    for (const slug of entries) {
      try {
        const st = await stat(join(wikiDir, slug, 'index.html'));
        if (st.mtimeMs > newestMs) {newestMs = st.mtimeMs;}
      } catch { /* skip */ }
    }
  } catch {
    return true;
  }

  // (a) Any wiki row updated since the newest file?
  try {
    const { rows } = await pool.query<{ count: string }>(
      `SELECT COUNT(*) AS count FROM app.wikipedia_articles
       WHERE COALESCE(status, 'complete') = 'complete'
         AND content_path IS NOT NULL
         AND updated_at > to_timestamp($1)`,
      [newestMs / 1000],
    );
    if (parseInt(rows[0]?.count ?? '0', 10) > 0) {return true;}
  } catch {
    // Column may not exist in some envs — fall through to check (b).
  }

  // (b) Any inline /wikipedia/<slug>/ referenced by an article body that
  //     doesn't exist on disk yet?
  try {
    const { rows } = await pool.query<{ slug: string }>(
      `SELECT DISTINCT w.slug
       FROM app.article_wikipedia_links awl
       JOIN app.wikipedia_articles w ON w.id = awl.wikipedia_id
       WHERE COALESCE(w.status, 'complete') = 'complete'
         AND w.rewrite_dirty = false
         AND w.content_path IS NOT NULL`,
    );
    for (const { slug } of rows) {
      if (!existsSync(join(wikiDir, slug, 'index.html'))) {return true;}
    }
  } catch {
    /* ignore */
  }

  return false;
}

main().catch((err: unknown) => {
  console.error('Error:', err);
  process.exit(1);
});
