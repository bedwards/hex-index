/**
 * Search API routes
 * Provides full-text search and JSONB tag filtering
 */

import { Router, Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import { z } from 'zod';
import {
  searchArticles,
  getTagDistribution,
  listPublications,
  getArticleById,
  ArticleSearchParams,
} from '../db/queries.js';

// Request validation schemas
const SearchQuerySchema = z.object({
  q: z.string().optional(),
  tags: z.string().optional(), // JSON string of tag filters
  publication: z.string().optional(), // Publication slug
  date_from: z.iso.datetime().optional(),
  date_to: z.iso.datetime().optional(),
  min_read_time: z.coerce.number().int().min(0).optional(),
  max_read_time: z.coerce.number().int().min(0).optional(),
  sort: z.enum(['relevance', 'date', 'read_time']).optional().default('relevance'),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  offset: z.coerce.number().int().min(0).optional().default(0),
});

const PublicationsQuerySchema = z.object({
  min_quality: z.coerce.number().int().min(0).max(100).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  offset: z.coerce.number().int().min(0).optional().default(0),
});

const ArticleIdSchema = z.object({
  id: z.uuid(),
});

// Helper to parse tags from query string
function parseTags(tagsString?: string): Record<string, string> | undefined {
  if (!tagsString) {
    return undefined;
  }
  try {
    const parsed = JSON.parse(tagsString) as unknown;
    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
      return parsed as Record<string, string>;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

// Helper to convert tag distribution Map to JSON-serializable format
function tagDistributionToJson(
  distribution: Map<string, Map<string, number>>
): Record<string, Record<string, number>> {
  const result: Record<string, Record<string, number>> = {};
  for (const [key, values] of distribution) {
    result[key] = {};
    for (const [value, count] of values) {
      result[key][value] = count;
    }
  }
  return result;
}

// Type-safe wrapper for async route handlers
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

function asyncHandler(fn: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Create search router with database pool
 */
export function createSearchRouter(pool: Pool): Router {
  const router = Router();

  /**
   * GET /api/search
   * Full-text search with tag filtering, pagination, and sorting
   */
  router.get(
    '/search',
    asyncHandler(async (req: Request, res: Response) => {
      // Validate query parameters
      const parseResult = SearchQuerySchema.safeParse(req.query);
      if (!parseResult.success) {
        res.status(400).json({
          error: 'Invalid query parameters',
          details: z.treeifyError(parseResult.error),
        });
        return;
      }

      const query = parseResult.data;
      const tags = parseTags(query.tags);

      // Build search params
      const searchParams: ArticleSearchParams = {
        query: query.q,
        tags,
        publication_slug: query.publication,
        min_read_time: 10, // query.min_read_time,
        max_read_time: query.max_read_time,
        from_date: query.date_from ? new Date(query.date_from) : undefined,
        to_date: query.date_to ? new Date(query.date_to) : undefined,
        limit: query.limit,
        offset: query.offset,
      };

      const result = await searchArticles(pool, searchParams);

      res.json({
        articles: result.articles,
        total: result.total,
        limit: query.limit,
        offset: query.offset,
        has_more: query.offset + result.articles.length < result.total,
      });
    })
  );

  /**
   * GET /api/tags
   * List all unique tag keys and their value distributions
   */
  router.get(
    '/tags',
    asyncHandler(async (_req: Request, res: Response) => {
      const distribution = await getTagDistribution(pool);
      res.json({
        tags: tagDistributionToJson(distribution),
      });
    })
  );

  /**
   * GET /api/publications
   * List publications with article counts
   */
  router.get(
    '/publications',
    asyncHandler(async (req: Request, res: Response) => {
      const parseResult = PublicationsQuerySchema.safeParse(req.query);
      if (!parseResult.success) {
        res.status(400).json({
          error: 'Invalid query parameters',
          details: z.treeifyError(parseResult.error),
        });
        return;
      }

      const query = parseResult.data;
      const publications = await listPublications(pool, {
        minQuality: query.min_quality,
        limit: query.limit,
        offset: query.offset,
      });

      res.json({
        publications,
        total: publications.length,
        limit: query.limit,
        offset: query.offset,
      });
    })
  );

  /**
   * GET /api/articles/:id
   * Get a single article by ID
   */
  router.get(
    '/articles/:id',
    asyncHandler(async (req: Request, res: Response) => {
      const parseResult = ArticleIdSchema.safeParse(req.params);
      if (!parseResult.success) {
        res.status(400).json({
          error: 'Invalid article ID',
          details: z.treeifyError(parseResult.error),
        });
        return;
      }

      const article = await getArticleById(pool, parseResult.data.id);
      if (!article) {
        res.status(404).json({ error: 'Article not found' });
        return;
      }

      res.json({ article });
    })
  );

  return router;
}

export { SearchQuerySchema, PublicationsQuerySchema, ArticleIdSchema };
