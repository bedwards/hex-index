/**
 * Integration tests for migration 022: commentary_sources.
 *
 * Applies the migration DDL inside a transaction and rolls back, so it works
 * whether or not the migration has been run against the live database. Tests
 * are skipped if DATABASE_URL is not reachable (e.g. CI without postgres).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Pool, PoolClient } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import {
  addSourceToCommentary,
  getCommentarySources,
  markAsConsolidated,
} from './queries.js';

config();

const MIGRATION_SQL = readFileSync(
  join(import.meta.dirname, 'migrations', '022_commentary_sources.sql'),
  'utf-8'
);

let pool: Pool | null = null;
let dbAvailable = false;

async function checkDb(): Promise<boolean> {
  if (!process.env.DATABASE_URL) {return false;}
  try {
    const p = new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 1500,
    });
    await p.query('SELECT 1');
    pool = p;
    return true;
  } catch {
    return false;
  }
}

/**
 * Run fn inside a transaction that is always rolled back. The migration DDL is
 * applied first so tests exercise the trigger + unique index even on a DB that
 * hasn't been migrated yet. If the migration has already been applied, the
 * IF NOT EXISTS / OR REPLACE guards make re-running it a no-op.
 */
async function withRollback<T>(
  fn: (client: PoolClient, pubId: string, a1: string, a2: string) => Promise<T>
): Promise<T> {
  if (!pool) {throw new Error('pool not initialized');}
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(MIGRATION_SQL);

    // Create scratch publication + articles for the test
    const pub = await client.query<{ id: string }>(
      `INSERT INTO app.publications (name, slug, base_url, feed_url)
       VALUES ($1, $1, 'https://x.test', 'https://x.test/feed')
       RETURNING id`,
      [`test-pub-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`]
    );
    const pubId = pub.rows[0].id;

    async function mkArticle(slug: string): Promise<string> {
      const r = await client.query<{ id: string }>(
        `INSERT INTO app.articles (publication_id, title, slug, original_url)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [pubId, slug, `${slug}-${Date.now()}`, `https://x.test/${slug}-${Date.now()}`]
      );
      return r.rows[0].id;
    }

    const commentaryId = await mkArticle('commentary');
    const s1 = await mkArticle('src1');
    await client.query(
      'UPDATE app.articles SET is_consolidated = true WHERE id = $1',
      [commentaryId]
    );

    return await fn(client, commentaryId, s1, await mkArticle('src2'));
  } finally {
    await client.query('ROLLBACK').catch(() => {});
    client.release();
  }
}

beforeAll(async () => {
  dbAvailable = await checkDb();
});

afterAll(async () => {
  if (pool) {await pool.end();}
});

describe('migration 022: commentary_sources', () => {
  it('trigger rejects a 5th source', async () => {
    if (!dbAvailable) {return;}
    await withRollback(async (client, commentaryId) => {
      const ids: string[] = [];
      for (let i = 0; i < 5; i++) {
        const r = await client.query<{ id: string }>(
          `INSERT INTO app.articles (publication_id, title, slug, original_url)
           SELECT publication_id,
                  'trig-' || $1::text,
                  'trig-' || $1::text || '-' || extract(epoch from now())::text,
                  'https://x.test/trig-' || $1::text || '-' || random()::text
             FROM app.articles WHERE id = $2
           RETURNING id`,
          [i, commentaryId]
        );
        ids.push(r.rows[0].id);
      }

      for (let i = 0; i < 4; i++) {
        await client.query(
          `INSERT INTO app.commentary_sources (commentary_article_id, source_article_id, position)
           VALUES ($1, $2, $3)`,
          [commentaryId, ids[i], i]
        );
      }

      await expect(
        client.query(
          `INSERT INTO app.commentary_sources (commentary_article_id, source_article_id, position)
           VALUES ($1, $2, 4)`,
          [commentaryId, ids[4]]
        )
      ).rejects.toThrow(/exceeds max of 4/);
    });
  });

  it('unique primary index allows only one primary per commentary', async () => {
    if (!dbAvailable) {return;}
    await withRollback(async (client, commentaryId, s1, s2) => {
      await client.query(
        `INSERT INTO app.commentary_sources (commentary_article_id, source_article_id, is_primary, position)
         VALUES ($1, $2, true, 0)`,
        [commentaryId, s1]
      );

      // A second non-primary is fine
      await client.query(
        `INSERT INTO app.commentary_sources (commentary_article_id, source_article_id, is_primary, position)
         VALUES ($1, $2, false, 1)`,
        [commentaryId, s2]
      );

      // A second primary violates the unique partial index
      await expect(
        client.query(
          `UPDATE app.commentary_sources
             SET is_primary = true
             WHERE commentary_article_id = $1 AND source_article_id = $2`,
          [commentaryId, s2]
        )
      ).rejects.toThrow();
    });
  });

  it('helpers round-trip: add, list, re-primary, markAsConsolidated', async () => {
    if (!dbAvailable) {return;}
    await withRollback(async (client, commentaryId, s1, s2) => {
      const a = await addSourceToCommentary(client, commentaryId, s1, true, 0);
      expect(a.is_primary).toBe(true);
      expect(a.commentary_article_id).toBe(commentaryId);

      const b = await addSourceToCommentary(client, commentaryId, s2, false, 1);
      expect(b.is_primary).toBe(false);

      let rows = await getCommentarySources(client, commentaryId);
      expect(rows).toHaveLength(2);
      expect(rows[0].source_article_id).toBe(s1);
      expect(rows[1].source_article_id).toBe(s2);

      // Re-parent primary — helper should demote the existing primary first
      await addSourceToCommentary(client, commentaryId, s2, true, 1);
      rows = await getCommentarySources(client, commentaryId);
      const primary = rows.filter((r) => r.is_primary);
      expect(primary).toHaveLength(1);
      expect(primary[0].source_article_id).toBe(s2);

      // markAsConsolidated flips the FK column
      await markAsConsolidated(client, s1, commentaryId);
      const { rows: check } = await client.query<{ consolidated_into: string | null }>(
        'SELECT consolidated_into FROM app.articles WHERE id = $1',
        [s1]
      );
      expect(check[0].consolidated_into).toBe(commentaryId);
    });
  });
});
