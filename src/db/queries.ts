/**
 * Database query helpers for hex-index
 * Provides typed functions for common operations
 */

import { Pool, PoolClient } from 'pg';
import {
  Publication,
  Article,
  ArticleWithPublication,
  ArticleLink,
  CreatePublicationInput,
  CreateArticleInput,
  CreateArticleLinkInput,
  ArticleSearchParams,
  SearchResult,
} from './types.js';

// Re-export types for convenience
export * from './types.js';

/**
 * Create a database connection pool
 */
export function createPool(connectionString: string): Pool {
  return new Pool({ connectionString });
}

// ============ Publications ============

export async function createPublication(
  client: Pool | PoolClient,
  input: CreatePublicationInput
): Promise<Publication> {
  const { rows } = await client.query<Publication>(
    `INSERT INTO app.publications (name, slug, base_url, feed_url, description, author_name, quality_score, metadata)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      input.name,
      input.slug,
      input.base_url,
      input.feed_url,
      input.description ?? null,
      input.author_name ?? null,
      input.quality_score ?? 0,
      JSON.stringify(input.metadata ?? {}),
    ]
  );
  return rows[0];
}

export async function getPublicationBySlug(
  client: Pool | PoolClient,
  slug: string
): Promise<Publication | null> {
  const { rows } = await client.query<Publication>(
    'SELECT * FROM app.publications WHERE slug = $1',
    [slug]
  );
  return rows[0] ?? null;
}

export async function getPublicationById(
  client: Pool | PoolClient,
  id: string
): Promise<Publication | null> {
  const { rows } = await client.query<Publication>(
    'SELECT * FROM app.publications WHERE id = $1',
    [id]
  );
  return rows[0] ?? null;
}

export async function listPublications(
  client: Pool | PoolClient,
  options?: { limit?: number; offset?: number; minQuality?: number }
): Promise<Publication[]> {
  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;
  const minQuality = options?.minQuality ?? 0;

  const { rows } = await client.query<Publication>(
    `SELECT * FROM app.publications
     WHERE quality_score >= $1
     ORDER BY quality_score DESC, article_count DESC
     LIMIT $2 OFFSET $3`,
    [minQuality, limit, offset]
  );
  return rows;
}

export async function updatePublicationLastFetched(
  client: Pool | PoolClient,
  id: string
): Promise<void> {
  await client.query(
    'UPDATE app.publications SET last_fetched_at = NOW() WHERE id = $1',
    [id]
  );
}

// ============ Articles ============

export async function createArticle(
  client: Pool | PoolClient,
  input: CreateArticleInput
): Promise<Article> {
  const { rows } = await client.query<Article>(
    `INSERT INTO app.articles
     (publication_id, title, slug, original_url, content_path, author_name,
      published_at, word_count, estimated_read_time_minutes, tags, metadata)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING *`,
    [
      input.publication_id,
      input.title,
      input.slug,
      input.original_url,
      input.content_path ?? null,
      input.author_name ?? null,
      input.published_at ?? null,
      input.word_count ?? null,
      input.estimated_read_time_minutes ?? null,
      JSON.stringify(input.tags ?? {}),
      JSON.stringify(input.metadata ?? {}),
    ]
  );
  return rows[0];
}

export async function getArticleByUrl(
  client: Pool | PoolClient,
  url: string
): Promise<Article | null> {
  const { rows } = await client.query<Article>(
    'SELECT * FROM app.articles WHERE original_url = $1',
    [url]
  );
  return rows[0] ?? null;
}

export async function getArticleById(
  client: Pool | PoolClient,
  id: string
): Promise<ArticleWithPublication | null> {
  const { rows } = await client.query<ArticleWithPublication>(
    'SELECT * FROM app.articles_with_publication WHERE id = $1',
    [id]
  );
  return rows[0] ?? null;
}

/**
 * Search articles with full-text search and JSONB tag filtering
 */
export async function searchArticles(
  client: Pool | PoolClient,
  params: ArticleSearchParams
): Promise<SearchResult> {
  const conditions: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  // Full-text search
  if (params.query) {
    conditions.push(`full_text_search @@ plainto_tsquery('english', $${paramIndex})`);
    values.push(params.query);
    paramIndex++;
  }

  // JSONB tag filtering
  if (params.tags && Object.keys(params.tags).length > 0) {
    conditions.push(`tags @> $${paramIndex}`);
    values.push(JSON.stringify(params.tags));
    paramIndex++;
  }

  // Publication filter
  if (params.publication_id) {
    conditions.push(`publication_id = $${paramIndex}`);
    values.push(params.publication_id);
    paramIndex++;
  }

  // Read time filters
  if (params.min_read_time) {
    conditions.push(`estimated_read_time_minutes >= $${paramIndex}`);
    values.push(params.min_read_time);
    paramIndex++;
  }
  if (params.max_read_time) {
    conditions.push(`estimated_read_time_minutes <= $${paramIndex}`);
    values.push(params.max_read_time);
    paramIndex++;
  }

  // Date filters
  if (params.from_date) {
    conditions.push(`published_at >= $${paramIndex}`);
    values.push(params.from_date);
    paramIndex++;
  }
  if (params.to_date) {
    conditions.push(`published_at <= $${paramIndex}`);
    values.push(params.to_date);
    paramIndex++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const limit = params.limit ?? 20;
  const offset = params.offset ?? 0;

  // Get total count
  const countQuery = `SELECT COUNT(*) FROM app.articles_with_publication ${whereClause}`;
  const { rows: countRows } = await client.query<{ count: string }>(countQuery, values);
  const total = parseInt(countRows[0].count, 10);

  // Get articles with relevance ranking
  let orderBy = 'published_at DESC';
  if (params.query) {
    orderBy = `ts_rank(full_text_search, plainto_tsquery('english', $1)) DESC, ${orderBy}`;
  }

  const articlesQuery = `
    SELECT * FROM app.articles_with_publication
    ${whereClause}
    ORDER BY ${orderBy}
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
  `;
  values.push(limit, offset);

  const { rows: articles } = await client.query<ArticleWithPublication>(
    articlesQuery,
    values
  );

  return { articles, total, query: params };
}

/**
 * Get articles by JSONB tag
 * Example: getArticlesByTag(pool, 'topic', 'economics')
 */
export async function getArticlesByTag(
  client: Pool | PoolClient,
  key: string,
  value: string,
  options?: { limit?: number; offset?: number }
): Promise<ArticleWithPublication[]> {
  const limit = options?.limit ?? 20;
  const offset = options?.offset ?? 0;

  const { rows } = await client.query<ArticleWithPublication>(
    `SELECT * FROM app.articles_with_publication
     WHERE tags @> $1
     ORDER BY published_at DESC
     LIMIT $2 OFFSET $3`,
    [JSON.stringify({ [key]: value }), limit, offset]
  );
  return rows;
}

/**
 * Get all unique tag keys and their value distributions
 */
export async function getTagDistribution(
  client: Pool | PoolClient
): Promise<Map<string, Map<string, number>>> {
  const { rows } = await client.query<{ key: string; value: string; count: string }>(`
    SELECT
      key,
      value,
      COUNT(*) as count
    FROM app.articles,
         jsonb_each_text(tags) AS t(key, value)
    GROUP BY key, value
    ORDER BY key, count DESC
  `);

  const distribution = new Map<string, Map<string, number>>();
  for (const row of rows) {
    if (!distribution.has(row.key)) {
      distribution.set(row.key, new Map());
    }
    distribution.get(row.key)!.set(row.value, parseInt(row.count, 10));
  }
  return distribution;
}

// ============ Article Links ============

export async function createArticleLink(
  client: Pool | PoolClient,
  input: CreateArticleLinkInput
): Promise<ArticleLink> {
  const { rows } = await client.query<ArticleLink>(
    `INSERT INTO app.article_links
     (source_article_id, target_article_id, target_url, link_text, context)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      input.source_article_id,
      input.target_article_id ?? null,
      input.target_url,
      input.link_text ?? null,
      input.context ?? null,
    ]
  );
  return rows[0];
}

export async function getArticleLinks(
  client: Pool | PoolClient,
  articleId: string
): Promise<ArticleLink[]> {
  const { rows } = await client.query<ArticleLink>(
    'SELECT * FROM app.article_links WHERE source_article_id = $1',
    [articleId]
  );
  return rows;
}

export async function getArticleBacklinks(
  client: Pool | PoolClient,
  articleId: string
): Promise<ArticleLink[]> {
  const { rows } = await client.query<ArticleLink>(
    'SELECT * FROM app.article_links WHERE target_article_id = $1',
    [articleId]
  );
  return rows;
}

export async function getMostLinkedArticles(
  client: Pool | PoolClient,
  limit = 20
): Promise<ArticleWithPublication[]> {
  const { rows } = await client.query<ArticleWithPublication>(
    `SELECT a.* FROM app.articles_with_publication a
     JOIN app.article_influence i ON a.id = i.id
     ORDER BY i.incoming_links DESC
     LIMIT $1`,
    [limit]
  );
  return rows;
}
