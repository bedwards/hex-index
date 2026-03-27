#!/usr/bin/env npx tsx
/**
 * Sync library/ HTML files to the database
 *
 * Creates DB records for HTML files in library/ that have no corresponding
 * article in the database. These are from a bulk scrape that predates the
 * ingestion pipeline.
 *
 * Usage:
 *   npx tsx tools/sync-library.ts --slug noahpinion
 *   npx tsx tools/sync-library.ts --slug noahpinion --slug astralcodexten
 *   npx tsx tools/sync-library.ts --all
 *   npx tsx tools/sync-library.ts --all --dry-run --verbose
 */

import 'dotenv/config';
import { parseArgs } from 'util';
import { Pool } from 'pg';
import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { access } from 'fs/promises';
import { fileURLToPath } from 'url';
import {
  createArticle,
  getPublicationBySlug,
} from '../src/db/queries.js';
import type { CreateArticleInput } from '../src/db/types.js';
import { parseFrontmatter } from '../src/markdown/storage.js';

// ── CLI ──────────────────────────────────────────────────────────────

const { values } = parseArgs({
  options: {
    slug: { type: 'string', multiple: true },
    all: { type: 'boolean', default: false },
    'dry-run': { type: 'boolean', default: false },
    verbose: { type: 'boolean', short: 'v', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

if (values.help) {
  console.info(`
Sync library/ HTML files to the database

Usage:
  npx tsx tools/sync-library.ts --slug <pub>          Sync one publication
  npx tsx tools/sync-library.ts --slug a --slug b     Sync multiple
  npx tsx tools/sync-library.ts --all                 Sync all with orphan files
  npx tsx tools/sync-library.ts --all --dry-run -v    Preview without writing

Options:
  --slug <pub>    Publication slug to sync (repeatable)
  --all           Sync all publications with orphan files
  --dry-run       Preview without writing to DB
  -v, --verbose   Detailed output
  -h, --help      Show this help
`);
  process.exit(0);
}

const dryRun = values['dry-run'] ?? false;
const verbose = values.verbose ?? false;
const __dirname = dirname(fileURLToPath(import.meta.url));
const LIBRARY_DIR = join(__dirname, '..', 'library');
const FULL_TEXT_DIR = join(LIBRARY_DIR, 'full-text');
const REWRITTEN_DIR = join(LIBRARY_DIR, 'rewritten');

// ── Helpers ──────────────────────────────────────────────────────────

/** Count words in HTML by stripping tags */
function countWords(html: string): number {
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&\w+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) {return 0;}
  return text.split(/\s+/).length;
}

/** Extract title from HTML */
function extractTitle(html: string): string | null {
  // Try <title> first
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    const title = titleMatch[1].trim();
    if (title) {return title;}
  }
  // Fall back to <h1>
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    // Strip nested tags from h1
    return h1Match[1].replace(/<[^>]+>/g, '').trim() || null;
  }
  return null;
}

/** Convert slug to title case as last resort */
function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** List HTML files in a directory, excluding .raw.html */
async function listHtmlFiles(dir: string): Promise<string[]> {
  try {
    const entries = await readdir(dir);
    return entries
      .filter((f) => f.endsWith('.html') && !f.endsWith('.raw.html'))
      .sort();
  } catch {
    return [];
  }
}

/** Get all publication slugs that have HTML files in library/ */
async function getLibraryPublications(): Promise<string[]> {
  const entries = await readdir(LIBRARY_DIR, { withFileTypes: true });
  return entries
    .filter(
      (e) =>
        e.isDirectory() &&
        e.name !== 'full-text' &&
        e.name !== 'rewritten' &&
        e.name !== 'wikipedia' &&
        e.name !== 'images'
    )
    .map((e) => e.name)
    .sort();
}

// ── Main ─────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  if (!values.all && (!values.slug || values.slug.length === 0)) {
    console.error('Error: --slug <pub> or --all is required');
    process.exit(1);
  }

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('Error: DATABASE_URL required. Set it in .env');
    process.exit(1);
  }

  const pool = new Pool({ connectionString: dbUrl });

  try {
    await pool.query('SELECT 1');
  } catch (err) {
    console.error('Error: Cannot connect to database. Is Docker running?');
    console.error(`  Run: npm run db:up`);
    console.error(`  Details: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  }

  // Determine which publications to process
  let slugs: string[];
  if (values.all) {
    slugs = await getLibraryPublications();
    if (verbose) {
      console.info(`Found ${slugs.length} publication directories in library/`);
    }
  } else {
    slugs = values.slug!;
  }

  let totalCreated = 0;
  let totalSkipped = 0;
  let totalErrored = 0;
  let totalOrphans = 0;

  for (const slug of slugs) {
    const pubDir = join(LIBRARY_DIR, slug);
    try {
      await access(pubDir);
    } catch {
      console.error(`  Directory not found: library/${slug}/`);
      totalErrored++;
      continue;
    }

    // Get publication from DB
    const pub = await getPublicationBySlug(pool, slug);
    if (!pub) {
      if (verbose) {
        console.info(`  Skipping ${slug}: no publication record in DB`);
      }
      continue;
    }

    // List HTML files on disk
    const htmlFiles = await listHtmlFiles(pubDir);
    if (htmlFiles.length === 0) {continue;}

    // Get existing articles for this publication (by content_path)
    const { rows: existingArticles } = await pool.query<{ content_path: string }>(
      `SELECT content_path FROM app.articles WHERE publication_id = $1 AND content_path IS NOT NULL`,
      [pub.id]
    );
    const existingPaths = new Set(existingArticles.map((a) => a.content_path));

    // Also get existing original_urls to avoid duplicates
    const { rows: existingUrls } = await pool.query<{ original_url: string }>(
      `SELECT original_url FROM app.articles WHERE publication_id = $1`,
      [pub.id]
    );
    const existingUrlSet = new Set(existingUrls.map((a) => a.original_url));

    // Find orphans
    const orphans: string[] = [];
    for (const file of htmlFiles) {
      const articleSlug = file.replace('.html', '');
      const contentPath = `${slug}/${articleSlug}.html`;
      if (!existingPaths.has(contentPath)) {
        orphans.push(file);
      }
    }

    if (orphans.length === 0) {continue;}

    totalOrphans += orphans.length;
    console.info(`\n${slug}: ${orphans.length} orphan files (${htmlFiles.length} total on disk, ${existingPaths.size} in DB)`);

    let created = 0;
    let skipped = 0;
    let errored = 0;

    for (const file of orphans) {
      const articleSlug = file.replace('.html', '');
      const contentPath = `${slug}/${articleSlug}.html`;
      const htmlPath = join(pubDir, file);
      const mdPath = join(pubDir, `${articleSlug}.md`);

      let title: string | null = null;
      let originalUrl: string | null = null;
      let publishedAt: Date | undefined;
      let authorName: string | undefined;
      let wordCount: number | undefined;
      let readTime: number | undefined;

      // Try reading .md frontmatter first
      let mdExists = false;
      try {
        await access(mdPath);
        mdExists = true;
      } catch {
        // no .md file
      }
      if (mdExists) {
        try {
          const mdContent = await readFile(mdPath, 'utf-8');
          const fm = parseFrontmatter(mdContent);
          if (fm) {
            if (typeof fm.title === 'string' && fm.title) {
              title = fm.title;
            }
            if (typeof fm.source_url === 'string' && fm.source_url) {
              originalUrl = fm.source_url;
            }
            if (typeof fm.author === 'string' && fm.author) {
              authorName = fm.author;
            }
            if (typeof fm.published_at === 'string' && fm.published_at) {
              publishedAt = new Date(fm.published_at);
            }
            if (typeof fm.word_count === 'number' && fm.word_count > 0) {
              wordCount = fm.word_count;
            }
            if (typeof fm.estimated_read_time === 'number' && fm.estimated_read_time > 0) {
              readTime = fm.estimated_read_time;
            }
          }
        } catch {
          // Fall through to HTML parsing
        }
      }

      // Read HTML for title fallback and word count
      let htmlContent: string | null = null;
      try {
        htmlContent = await readFile(htmlPath, 'utf-8');
      } catch (err) {
        console.error(`  ERROR reading ${file}: ${err instanceof Error ? err.message : String(err)}`);
        errored++;
        continue;
      }

      if (!title && htmlContent) {
        title = extractTitle(htmlContent);
      }
      if (!title) {
        title = slugToTitle(articleSlug);
      }

      // Compute word count from HTML if not from frontmatter
      if (!wordCount && htmlContent) {
        wordCount = countWords(htmlContent);
      }
      if (!readTime && wordCount) {
        readTime = Math.max(1, Math.round(wordCount / 200));
      }

      // Construct original_url if not from frontmatter
      if (!originalUrl) {
        originalUrl = `${pub.base_url}/p/${articleSlug}`;
      }

      // Skip if this URL already exists (avoid unique constraint violation)
      if (existingUrlSet.has(originalUrl)) {
        if (verbose) {
          console.info(`  SKIP ${articleSlug} (URL already in DB)`);
        }
        skipped++;
        continue;
      }

      // Check for full-text and rewritten paths
      const fullTextPath = join(FULL_TEXT_DIR, slug, file);
      let fullContentPath: string | undefined;
      try {
        await access(fullTextPath);
        fullContentPath = `full-text/${slug}/${articleSlug}.html`;
      } catch {
        // no full-text file
      }

      const rewrittenPath = join(REWRITTEN_DIR, slug, file);
      let rewrittenContentPath: string | undefined;
      try {
        await access(rewrittenPath);
        rewrittenContentPath = `rewritten/${slug}/${articleSlug}.html`;
      } catch {
        // no rewritten file
      }

      if (dryRun) {
        console.info(`  DRY-RUN would create: ${articleSlug}`);
        if (verbose) {
          console.info(`    title: ${title}`);
          console.info(`    url: ${originalUrl}`);
          console.info(`    words: ${wordCount ?? 'unknown'}, read_time: ${readTime ?? 'unknown'}min`);
          if (fullContentPath) {console.info(`    full_content_path: ${fullContentPath}`);}
          if (rewrittenContentPath) {console.info(`    rewritten_content_path: ${rewrittenContentPath}`);}
        }
        created++;
        continue;
      }

      // Create the article
      const input: CreateArticleInput = {
        publication_id: pub.id,
        title,
        slug: articleSlug,
        original_url: originalUrl,
        content_path: contentPath,
        full_content_path: fullContentPath,
        rewritten_content_path: rewrittenContentPath,
        author_name: authorName,
        published_at: publishedAt,
        word_count: wordCount,
        estimated_read_time_minutes: readTime,
        media_type: 'text',
      };

      try {
        await createArticle(pool, input);
        existingUrlSet.add(originalUrl); // Track to avoid dupes within batch
        created++;
        if (verbose) {
          console.info(`  CREATED ${articleSlug} (${wordCount ?? '?'} words)`);
        }
      } catch (err) {
        // Handle unique constraint violation (Postgres error code 23505)
        const pgErr = err as { code?: string; message?: string };
        if (pgErr.code === '23505') {
          if (verbose) {
            console.info(`  SKIP ${articleSlug} (duplicate URL)`);
          }
          skipped++;
        } else {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`  ERROR creating ${articleSlug}: ${msg}`);
          errored++;
        }
      }
    }

    console.info(`  -> created: ${created}, skipped: ${skipped}, errors: ${errored}`);
    totalCreated += created;
    totalSkipped += skipped;
    totalErrored += errored;
  }

  console.info(`\n=== Summary ===`);
  console.info(`Orphan files found: ${totalOrphans}`);
  console.info(`Created: ${totalCreated}`);
  console.info(`Skipped: ${totalSkipped}`);
  console.info(`Errors: ${totalErrored}`);
  if (dryRun) {
    console.info(`(dry run — no records written)`);
  }

  await pool.end();
}

main().catch((err: unknown) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
