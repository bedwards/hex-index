/**
 * One-time backfill: apply normalizeTitle() to all articles.
 * Updates any titles that change. Run after adding new normalizer rules.
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { normalizeTitle } from '../../src/shared/title-normalizer.js';

async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL required');
  }

  const pool = new Pool({ connectionString: dbUrl });

  try {
    const { rows } = await pool.query<{ id: string; title: string }>(
      'SELECT id, title FROM app.articles',
    );

    console.info(`Checking ${rows.length} articles...`);

    let updated = 0;
    for (const row of rows) {
      const normalized = normalizeTitle(row.title);
      if (normalized !== row.title) {
        await pool.query('UPDATE app.articles SET title = $1 WHERE id = $2', [
          normalized,
          row.id,
        ]);
        console.info(`  "${row.title}" -> "${normalized}"`);
        updated++;
      }
    }

    console.info(`\nDone: ${updated} titles updated out of ${rows.length}`);
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
