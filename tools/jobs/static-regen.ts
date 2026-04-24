/**
 * Job: Static site regeneration
 *
 * Checks if new "ready" articles exist in the DB that are not yet on the
 * public static site (docs/). If so, regenerates the site, commits, and pushes.
 *
 * Runs hourly via launchctl. Lightweight: incremental generation only.
 *
 * Usage:
 *   npx tsx tools/jobs/static-regen.ts              # Auto: check + regen if needed
 *   npx tsx tools/jobs/static-regen.ts --force       # Always regenerate
 */

import 'dotenv/config';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createPool } from '../../src/db/queries.js';

const args = process.argv.slice(2);
const force = args.includes('--force');

const COUNT_FILE = join(process.cwd(), 'docs', '.last-ready-count');

function now(): string {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
}

function run(cmd: string, label: string): string {
  console.info(`  ${label}...`);
  return execSync(cmd, { cwd: process.cwd(), encoding: 'utf-8' });
}

async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL required');
    process.exit(1);
  }

  const pool = createPool(dbUrl);

  try {
    // Get current ready count
    const { rows } = await pool.query<{ count: string }>(`
      SELECT COUNT(*) FROM app.articles
      WHERE (rewritten_content_path IS NOT NULL OR is_consolidated = true)
        AND consolidated_into IS NULL
        AND image_path IS NOT NULL
    `);
    const currentCount = parseInt(rows[0].count, 10);

    // Read last known count
    let lastCount = 0;
    if (existsSync(COUNT_FILE)) {
      lastCount = parseInt(readFileSync(COUNT_FILE, 'utf-8').trim(), 10);
    }

    const newArticles = currentCount - lastCount;

    console.info(`[${now()}] Ready articles: ${currentCount} (last regen: ${lastCount}, new: ${newArticles})`);

    if (!force && newArticles <= 0) {
      console.info('  No new articles — skipping regen');
      return;
    }

    // Regenerate
    console.info(`  Regenerating static site (${force ? 'forced' : `${newArticles} new articles`})...`);
    const genStart = Date.now();
    try {
      run('npm run static:generate 2>&1', 'Static generate');
    } catch (err) {
      console.error(`  Static generate failed: ${err instanceof Error ? err.message : String(err)}`);
      process.exit(1);
    }
    const genMs = Date.now() - genStart;
    console.info(`  Generated in ${(genMs / 1000).toFixed(1)}s`);

    // Commit and push
    console.info('  Committing...');
    try {
      // Update the count file
      writeFileSync(COUNT_FILE, String(currentCount));

      // Check if there are changes to commit
      const status = run('git status --porcelain', 'Git status');
      if (!status.trim()) {
        console.info('  No changes to commit');
        return;
      }

      // Add docs/ AND any new library/ source files (issue #474 guard)
      // The pre-commit hook requires library/ files to be staged with their docs/ counterparts
      run('git add docs/', 'Git add docs');
      run('git add library/rewritten/ library/wikipedia/', 'Git add library');
      run(`git commit -m "chore(static): regen for ${currentCount} ready (+${newArticles} new)"`, 'Git commit');
      run('git push', 'Git push');
      console.info(`  Pushed ${currentCount} ready articles to hex-index.com`);
    } catch (err) {
      // git push might fail if already up to date — that's ok
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('nothing to commit') || msg.includes('already up to date')) {
        console.info('  Already up to date');
      } else {
        console.error(`  Commit/push failed: ${msg}`);
      }
    }
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
