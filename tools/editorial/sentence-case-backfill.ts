/**
 * One-shot: convert every article title in app.articles to sentence case.
 *
 * The sentence-case helper now lives in src/shared/sentence-case.ts so it can
 * be reused by the ingest-time title normalizer and the Qwen title-cleanup
 * job. This script is a thin wrapper that iterates over app.articles and
 * applies the shared helper.
 *
 * Run:
 *   npx tsx tools/editorial/sentence-case-backfill.ts            # dry-run, prints diff
 *   npx tsx tools/editorial/sentence-case-backfill.ts --apply    # writes UPDATEs
 */

import 'dotenv/config';
import { Pool } from 'pg';
import {
  toSentenceCase,
  KNOWN_ACRONYMS,
  PROPER_NOUNS_LC,
} from '../../src/shared/sentence-case.js';

// Re-export so any external importer that used this module keeps working.
export { toSentenceCase, KNOWN_ACRONYMS, PROPER_NOUNS_LC };

async function main(): Promise<void> {
  const apply = process.argv.includes('--apply');
  const limit = process.argv.includes('--limit')
    ? parseInt(process.argv[process.argv.indexOf('--limit') + 1] ?? '0', 10)
    : 0;

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL ?? 'postgresql://postgres@localhost:5432/hex-index',
  });

  try {
    const limitClause = limit > 0 ? `LIMIT ${limit}` : '';
    const { rows } = await pool.query<{ id: string; title: string }>(`
      SELECT id, title
      FROM app.articles
      WHERE title IS NOT NULL AND title <> ''
      ORDER BY created_at DESC
      ${limitClause}
    `);

    let changed = 0;
    let unchanged = 0;
    const samples: { before: string; after: string }[] = [];

    for (const row of rows) {
      const newTitle = toSentenceCase(row.title);
      if (newTitle !== row.title) {
        changed++;
        if (samples.length < 25) {samples.push({ before: row.title, after: newTitle });}
        if (apply) {
          await pool.query('UPDATE app.articles SET title = $1 WHERE id = $2', [newTitle, row.id]);
        }
      } else {
        unchanged++;
      }
    }

    console.info(`\n=== Sentence-case backfill ${apply ? '(APPLIED)' : '(DRY-RUN)'} ===`);
    console.info(`Total scanned:  ${rows.length}`);
    console.info(`Changed:        ${changed}`);
    console.info(`Already OK:     ${unchanged}`);
    console.info(`\nFirst ${samples.length} changes:`);
    for (const s of samples) {
      console.info(`  - ${s.before}`);
      console.info(`  + ${s.after}`);
    }
  } finally {
    await pool.end();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  });
}
