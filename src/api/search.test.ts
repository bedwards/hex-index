/**
 * Tests for Search API routes
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import express, { Request, Response, NextFunction } from 'express';
import { createSearchRouter } from './search.js';
import { Pool } from 'pg';
import * as queries from '../db/queries.js';
import { ArticleWithPublication, Publication } from '../db/types.js';

// Mock the queries module
vi.mock('../db/queries.js', () => ({
  searchArticles: vi.fn(),
  getTagDistribution: vi.fn(),
  listPublications: vi.fn(),
  getArticleById: vi.fn(),
}));

// Create a minimal mock pool
const mockPool = {} as Pool;

// Helper type for router layer
interface RouterLayer {
  route?: {
    path: string;
    stack: Array<{ handle: (req: Request, res: Response, next: NextFunction) => void }>;
  };
}

// Helper to make HTTP-like requests to the router
async function testRequest(
  router: express.Router,
  _method: 'get' | 'post',
  path: string,
  query?: Record<string, string>
) {
  return new Promise<{ status: number; body: unknown }>((resolve) => {
    const req = {
      query: query ?? {},
      params: {},
    } as unknown as Request;

    let statusCode = 200;
    let responseBody: unknown = null;

    const res = {
      status(code: number) {
        statusCode = code;
        return this;
      },
      json(data: unknown) {
        responseBody = data;
        resolve({ status: statusCode, body: responseBody });
      },
    } as unknown as Response;

    // Find matching route and call handler
    const stack = router.stack as RouterLayer[];
    const handlers = stack.filter(
      (layer) => layer.route?.path === path.split('?')[0]
    );

    if (handlers.length === 0) {
      resolve({ status: 404, body: { error: 'Not found' } });
      return;
    }

    const handler = handlers[0].route!.stack[0].handle;
    handler(req, res, () => {
      // Next handler
    });
  });
}

describe('Search API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /search', () => {
    it('returns search results with pagination info', async () => {
      const mockArticles: ArticleWithPublication[] = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          publication_id: '223e4567-e89b-12d3-a456-426614174000',
          title: 'Test Article',
          slug: 'test-article',
          original_url: 'https://test.substack.com/p/test-article',
          content_path: null,
          publication_name: 'Test Publication',
          publication_slug: 'test',
          publication_author: 'Test Author',
          author_name: 'Author',
          published_at: new Date('2024-01-01'),
          word_count: 1000,
          estimated_read_time_minutes: 5,
          media_type: 'text' as const,
          tags: { topic: 'economics' },
          metadata: {},
          full_text_search: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      vi.mocked(queries.searchArticles).mockResolvedValue({
        articles: mockArticles,
        total: 1,
        query: { query: 'test' },
      });

      const router = createSearchRouter(mockPool);
      const { status, body } = await testRequest(router, 'get', '/search', { q: 'test' });

      expect(status).toBe(200);
      expect(body).toMatchObject({
        articles: mockArticles,
        total: 1,
        limit: 20,
        offset: 0,
        has_more: false,
      });
    });

    it('accepts tag filters as JSON', async () => {
      vi.mocked(queries.searchArticles).mockResolvedValue({
        articles: [],
        total: 0,
        query: {},
      });

      const router = createSearchRouter(mockPool);
      await testRequest(router, 'get', '/search', {
        tags: JSON.stringify({ topic: 'economics' }),
      });

      expect(queries.searchArticles).toHaveBeenCalledWith(
        mockPool,
        expect.objectContaining({
          tags: { topic: 'economics' },
        })
      );
    });

    it('accepts pagination parameters', async () => {
      vi.mocked(queries.searchArticles).mockResolvedValue({
        articles: [],
        total: 100,
        query: {},
      });

      const router = createSearchRouter(mockPool);
      const { body } = await testRequest(router, 'get', '/search', {
        limit: '50',
        offset: '10',
      });

      expect(queries.searchArticles).toHaveBeenCalledWith(
        mockPool,
        expect.objectContaining({
          limit: 50,
          offset: 10,
        })
      );
      expect(body).toMatchObject({ limit: 50, offset: 10 });
    });

    it('calculates has_more correctly', async () => {
      vi.mocked(queries.searchArticles).mockResolvedValue({
        articles: new Array(20).fill({ id: '123' }) as ArticleWithPublication[],
        total: 50,
        query: {},
      });

      const router = createSearchRouter(mockPool);
      const { body } = await testRequest(router, 'get', '/search', { limit: '20' });

      expect(body).toMatchObject({ has_more: true });
    });
  });

  describe('GET /tags', () => {
    it('returns tag distribution as JSON', async () => {
      const distribution = new Map<string, Map<string, number>>();
      distribution.set('topic', new Map([['economics', 10], ['technology', 5]]));
      distribution.set('type', new Map([['analysis', 8], ['opinion', 3]]));

      vi.mocked(queries.getTagDistribution).mockResolvedValue(distribution);

      const router = createSearchRouter(mockPool);
      const { status, body } = await testRequest(router, 'get', '/tags');

      expect(status).toBe(200);
      expect(body).toEqual({
        tags: {
          topic: { economics: 10, technology: 5 },
          type: { analysis: 8, opinion: 3 },
        },
      });
    });
  });

  describe('GET /publications', () => {
    it('returns publications list', async () => {
      const mockPublications: Publication[] = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Test Publication',
          slug: 'test',
          base_url: 'https://test.substack.com',
          feed_url: 'https://test.substack.com/feed',
          description: 'A test publication',
          author_name: 'Test Author',
          last_fetched_at: null,
          quality_score: 80,
          article_count: 50,
          metadata: {},
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      vi.mocked(queries.listPublications).mockResolvedValue(mockPublications);

      const router = createSearchRouter(mockPool);
      const { status, body } = await testRequest(router, 'get', '/publications');

      expect(status).toBe(200);
      expect(body).toMatchObject({
        publications: mockPublications,
        total: 1,
      });
    });

    it('filters by minimum quality score', async () => {
      vi.mocked(queries.listPublications).mockResolvedValue([]);

      const router = createSearchRouter(mockPool);
      await testRequest(router, 'get', '/publications', { min_quality: '70' });

      expect(queries.listPublications).toHaveBeenCalledWith(
        mockPool,
        expect.objectContaining({
          minQuality: 70,
        })
      );
    });
  });

  describe('GET /articles/:id', () => {
    it('returns article by ID', async () => {
      const mockArticle: ArticleWithPublication = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        publication_id: '223e4567-e89b-12d3-a456-426614174000',
        title: 'Test Article',
        slug: 'test-article',
        original_url: 'https://test.substack.com/p/test',
        content_path: null,
        author_name: 'Author',
        published_at: new Date(),
        word_count: 1000,
        estimated_read_time_minutes: 5,
        media_type: 'text' as const,
        tags: {},
        metadata: {},
        full_text_search: null,
        created_at: new Date(),
        updated_at: new Date(),
        publication_name: 'Test Publication',
        publication_slug: 'test',
        publication_author: null,
      };

      vi.mocked(queries.getArticleById).mockResolvedValue(mockArticle);

      const router = createSearchRouter(mockPool);
      const stack = router.stack as RouterLayer[];

      // Need to simulate params extraction
      const req = {
        params: { id: '123e4567-e89b-12d3-a456-426614174000' },
        query: {},
      } as unknown as Request;

      let responseStatus = 200;
      let responseBody: unknown = null;

      const res = {
        status(code: number) {
          responseStatus = code;
          return this;
        },
        json(data: unknown) {
          responseBody = data;
        },
      } as unknown as Response;

      const handlers = stack.filter((layer) => layer.route?.path === '/articles/:id');
      const handler = handlers[0].route!.stack[0].handle;

      // Call handler and wait for async operations
      await new Promise<void>((resolve) => {
        handler(req, res, () => resolve());
        // Give async handler time to complete
        setTimeout(resolve, 10);
      });

      expect(responseStatus).toBe(200);
      expect(responseBody).toEqual({ article: mockArticle });
    });

    it('returns 404 for non-existent article', async () => {
      vi.mocked(queries.getArticleById).mockResolvedValue(null);

      const router = createSearchRouter(mockPool);
      const stack = router.stack as RouterLayer[];

      const req = {
        params: { id: '123e4567-e89b-12d3-a456-426614174000' },
        query: {},
      } as unknown as Request;

      let responseStatus = 200;
      let responseBody: unknown = null;

      const res = {
        status(code: number) {
          responseStatus = code;
          return this;
        },
        json(data: unknown) {
          responseBody = data;
        },
      } as unknown as Response;

      const handlers = stack.filter((layer) => layer.route?.path === '/articles/:id');
      const handler = handlers[0].route!.stack[0].handle;

      await new Promise<void>((resolve) => {
        handler(req, res, () => resolve());
        setTimeout(resolve, 10);
      });

      expect(responseStatus).toBe(404);
      expect(responseBody).toEqual({ error: 'Article not found' });
    });

    it('returns 400 for invalid UUID', async () => {
      const router = createSearchRouter(mockPool);
      const stack = router.stack as RouterLayer[];

      const req = {
        params: { id: 'not-a-uuid' },
        query: {},
      } as unknown as Request;

      let responseStatus = 200;
      let responseBody: unknown = null;

      const res = {
        status(code: number) {
          responseStatus = code;
          return this;
        },
        json(data: unknown) {
          responseBody = data;
        },
      } as unknown as Response;

      const handlers = stack.filter((layer) => layer.route?.path === '/articles/:id');
      const handler = handlers[0].route!.stack[0].handle;

      await new Promise<void>((resolve) => {
        handler(req, res, () => resolve());
        setTimeout(resolve, 10);
      });

      expect(responseStatus).toBe(400);
      expect(responseBody).toMatchObject({ error: 'Invalid article ID' });
    });
  });
});
