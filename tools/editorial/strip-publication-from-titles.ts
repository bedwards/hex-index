/**
 * Backfill: strip redundant publication name prefix/suffix from every article
 * title. Deterministic, 100% precise (joins app.articles to app.publications).
 *
 * Run:
 *   npx tsx tools/editorial/strip-publication-from-titles.ts                  # dry-run
 *   npx tsx tools/editorial/strip-publication-from-titles.ts --apply          # write
 *   npx tsx tools/editorial/strip-publication-from-titles.ts --apply --batch-size 1000
 *
 * Updates are wrapped in a transaction (per --batch-size chunk) so the
 * backfill is atomic and fast. Per-row UPDATEs are preserved so the diff log
 * remains meaningful.
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { stripPublicationFromTitle } from '../../src/shared/strip-publication.js';

interface Row {
  id: string;
  title: string;
  publication_name: string;
}

function parseBatchSize(): number {
  const idx = process.argv.indexOf('--batch-size');
  if (idx >= 0 && idx + 1 < process.argv.length) {
    const n = parseInt(process.argv[idx + 1], 10);
    if (Number.isFinite(n) && n > 0) { return n; }
  }
  return 500;
}

async function main(): Promise<void> {
  const apply = process.argv.includes('--apply');
  const batchSize = parseBatchSize();

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

    // Pre-compute the changes so we can batch transactions.
    const updates: { id: string; newTitle: string }[] = [];
    for (const row of rows) {
      const newTitle = stripPublicationFromTitle(row.title, row.publication_name);
      if (newTitle !== row.title) {
        changed++;
        updates.push({ id: row.id, newTitle });
        if (samples.length < 30) {
          samples.push({ before: row.title, after: newTitle, pub: row.publication_name });
        }
      } else {
        unchanged++;
      }
    }

    if (apply && updates.length > 0) {
      for (let i = 0; i < updates.length; i += batchSize) {
        const chunk = updates.slice(i, i + batchSize);
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          for (const u of chunk) {
            await client.query('UPDATE app.articles SET title = $1 WHERE id = $2', [u.newTitle, u.id]);
          }
          await client.query('COMMIT');
        } catch (err) {
          await client.query('ROLLBACK');
          throw err;
        } finally {
          client.release();
        }
        console.info(`  committed ${Math.min(i + batchSize, updates.length)}/${updates.length}`);
      }
    }

    console.info(`\n=== strip-publication-from-titles ${apply ? '(APPLIED)' : '(DRY-RUN)'} ===`);
    console.info(`Total scanned:  ${rows.length}`);
    console.info(`Changed:        ${changed}`);
    console.info(`Unchanged:      ${unchanged}`);
    console.info(`Batch size:     ${batchSize}`);
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
