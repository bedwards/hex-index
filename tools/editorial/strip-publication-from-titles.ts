/**
 * Backfill: strip redundant publication name prefix/suffix from every article
 * title. Deterministic, 100% precise (joins app.articles to app.publications).
 *
 * Run:
 *   npx tsx tools/editorial/strip-publication-from-titles.ts            # dry-run
 *   npx tsx tools/editorial/strip-publication-from-titles.ts --apply    # write
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { stripPublicationFromTitle } from '../../src/shared/strip-publication.js';

interface Row {
  id: string;
  title: string;
  publication_name: string;
}

async function main(): Promise<void> {
  const apply = process.argv.includes('--apply');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL ?? 'postgresql://postgres@localhost:5432/hex-index',
  });

  try {
    const { rows } = await pool.query<Row>(`
      SELECT a.id, a.title, p.name AS publication_name
      FROM app.articles a
      JOIN app.publications p ON p.id = a.publication_id
      WHERE a.title IS NOT NULL AND a.title <> ''
      ORDER BY a.created_at DESC
    `);

    let changed = 0;
    let unchanged = 0;
    const samples: { before: string; after: string; pub: string }[] = [];

    for (const row of rows) {
      const newTitle = stripPublicationFromTitle(row.title, row.publication_name);
      if (newTitle !== row.title) {
        changed++;
        if (samples.length < 30) {
          samples.push({ before: row.title, after: newTitle, pub: row.publication_name });
        }
        if (apply) {
          await pool.query('UPDATE app.articles SET title = $1 WHERE id = $2', [newTitle, row.id]);
        }
      } else {
        unchanged++;
      }
    }

    console.info(`\n=== strip-publication-from-titles ${apply ? '(APPLIED)' : '(DRY-RUN)'} ===`);
    console.info(`Total scanned:  ${rows.length}`);
    console.info(`Changed:        ${changed}`);
    console.info(`Unchanged:      ${unchanged}`);
    console.info(`\nFirst ${samples.length} changes:`);
    for (const s of samples) {
      console.info(`  [${s.pub}]`);
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
