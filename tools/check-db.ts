#!/usr/bin/env npx tsx
import { createPool } from '../src/db/queries.js';
import { config } from 'dotenv';
config();

async function checkDB() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL not set');
    return;
  }

  const pool = createPool(databaseUrl);
  try {
    const result = await pool.query('SELECT COUNT(*) FROM app.publications');
    console.info('Publications count:', (result.rows[0] as { count: string }).count);

    const articles = await pool.query('SELECT COUNT(*) FROM app.articles');
    console.info('Articles count:', (articles.rows[0] as { count: string }).count);
  } finally {
    await pool.end();
  }
}

checkDB().catch(console.error);