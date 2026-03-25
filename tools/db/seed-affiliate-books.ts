/**
 * Seed affiliate books from content/affiliate-books.json into the database.
 *
 * Reads the JSON file (array of {title, author, asin, ...} objects)
 * and upserts each entry into app.affiliate_books.
 *
 * Idempotent: uses ON CONFLICT (asin) DO UPDATE.
 *
 * Usage:
 *   npx tsx tools/db/seed-affiliate-books.ts
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { readFile } from 'fs/promises';
import { join } from 'path';

interface BookEntry {
  title: string;
  author: string;
  asin: string;
  category: string;
  description: string;
  gutenberg_url?: string;
  archive_url?: string;
}

async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL required');
  }

  const pool = new Pool({ connectionString: dbUrl });

  try {
    const filePath = join(process.cwd(), 'content', 'affiliate-books.json');
    const raw = await readFile(filePath, 'utf-8');
    const data = JSON.parse(raw) as BookEntry[];

    console.info(`Loaded ${data.length} books from affiliate-books.json`);

    let inserted = 0;
    let updated = 0;

    for (const entry of data) {
      if (!entry.title || !entry.author) {
        console.info(`  SKIP: missing title or author in entry`);
        continue;
      }

      const result = await pool.query(
        `INSERT INTO app.affiliate_books (title, author, asin, category, description, gutenberg_url, archive_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (asin) DO UPDATE SET
           title = EXCLUDED.title,
           author = EXCLUDED.author,
           category = EXCLUDED.category,
           description = EXCLUDED.description,
           gutenberg_url = EXCLUDED.gutenberg_url,
           archive_url = EXCLUDED.archive_url
         RETURNING (xmax = 0) AS is_insert`,
        [
          entry.title,
          entry.author,
          entry.asin,
          entry.category || 'books',
          entry.description || null,
          entry.gutenberg_url || null,
          entry.archive_url || null,
        ]
      );

      const isInsert = (result.rows[0] as { is_insert: boolean }).is_insert;
      if (isInsert) {
        inserted++;
      } else {
        updated++;
      }
    }

    console.info(`Done: ${inserted} inserted, ${updated} updated`);
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
