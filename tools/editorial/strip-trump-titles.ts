/**
 * Editorial backfill: strip "Trump" / "Donald Trump" from existing
 * `app.articles.title` values using the shared normalizeTitle() function
 * (which now applies stripTrump).
 *
 * Usage:
 *   npx tsx tools/editorial/strip-trump-titles.ts           # dry run (default)
 *   npx tsx tools/editorial/strip-trump-titles.ts --apply   # perform updates
 *
 * Do NOT run this as part of an automated loop — the loop owner will run
 * it manually after merge.
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { normalizeTitle } from '../../src/shared/title-normalizer.js';

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply');
  const dryRun = !apply;

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL required');
  }

  const pool = new Pool({ connectionString: dbUrl });

  try {
    const { rows } = await pool.query<{ id: string; title: string }>(
      `SELECT id, title FROM app.articles WHERE title ~* 'trump' ORDER BY published_at DESC NULLS LAST`,
    );

    console.info(`Found ${rows.length} articles matching /trump/i`);
    console.info(dryRun ? '(dry run — no updates will be made)' : '(APPLY mode — updates will be written)');
    console.info('');

    let changed = 0;
    let unchanged = 0;
    for (const row of rows) {
      const normalized = normalizeTitle(row.title);
      if (normalized !== row.title) {
        console.info(`  [${row.id}]`);
        console.info(`    old: "${row.title}"`);
        console.info(`    new: "${normalized}"`);
        changed++;
        if (apply) {
          await pool.query('UPDATE app.articles SET title = $1 WHERE id = $2', [
            normalized,
            row.id,
          ]);
        }
      } else {
        unchanged++;
      }
    }

    console.info('');
    console.info(`Summary: ${changed} would change, ${unchanged} unchanged (of ${rows.length} matched)`);
    if (dryRun && changed > 0) {
      console.info('Re-run with --apply to write these updates.');
    }
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
