/**
 * Tests for article ingestion pipeline
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { processArticle, ingestSource } from './pipeline.js';
import { FeedItem, Feed, FetchResult } from '../feed/types.js';
import { IngestionSource, IngestionOptions } from './types.js';
import * as storage from '../markdown/storage.js';
import * as fetcher from '../feed/fetcher.js';

// Mock the modules
vi.mock('../markdown/storage.js', () => ({
  articleExists: vi.fn(),
  storeArticle: vi.fn(),
}));

vi.mock('../feed/fetcher.js', () => ({
  fetchFeed: vi.fn(),
}));

// Mock the parser functions used by converter
vi.mock('../feed/parser.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../feed/parser.js')>();
  return {
    ...actual,
    countWords: vi.fn(() => 100),
    estimateReadTime: vi.fn(() => 1),
  };
});

const mockFeedItem: FeedItem = {
  title: 'Test Article',
  url: 'https://test.substack.com/p/test-article',
  author: 'Test Author',
  publishedAt: new Date('2025-01-01'),
  contentHtml: '<p>Test content</p>',
};

const mockSource: IngestionSource = {
  name: 'Test Publication',
  slug: 'test-publication',
  feedUrl: 'https://test.substack.com/feed',
};

const mockOptions: IngestionOptions = {
  libraryDir: './test-library',
  fetchDelayMs: 0,
  dryRun: false,
  verbose: false,
};

describe('processArticle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('skips existing articles', async () => {
    vi.mocked(storage.articleExists).mockReturnValue(true);

    const result = await processArticle(mockFeedItem, mockSource, mockOptions);

    expect(result.skipped).toBe(true);
    expect(result.skipReason).toBe('already exists');
    expect(storage.storeArticle).not.toHaveBeenCalled();
  });

  it('skips articles before since date', async () => {
    vi.mocked(storage.articleExists).mockReturnValue(false);

    const optionsWithSince = {
      ...mockOptions,
      since: new Date('2025-06-01'),
    };

    const result = await processArticle(
      mockFeedItem,
      mockSource,
      optionsWithSince
    );

    expect(result.skipped).toBe(true);
    expect(result.skipReason).toContain('published before');
  });

  it('converts and stores new articles', async () => {
    vi.mocked(storage.articleExists).mockReturnValue(false);
    vi.mocked(storage.storeArticle).mockResolvedValue({
      success: true,
      path: './test-library/test-publication/test-article.md',
    });

    const result = await processArticle(mockFeedItem, mockSource, mockOptions);

    expect(result.skipped).toBe(false);
    expect(result.converted).toBeDefined();
    expect(result.stored?.success).toBe(true);
    expect(storage.storeArticle).toHaveBeenCalled();
  });

  it('does not store in dry run mode', async () => {
    vi.mocked(storage.articleExists).mockReturnValue(false);

    const dryRunOptions = { ...mockOptions, dryRun: true };
    const result = await processArticle(
      mockFeedItem,
      mockSource,
      dryRunOptions
    );

    expect(result.skipped).toBe(false);
    expect(result.converted).toBeDefined();
    expect(result.stored).toBeUndefined();
    expect(storage.storeArticle).not.toHaveBeenCalled();
  });

  it('reports storage errors', async () => {
    vi.mocked(storage.articleExists).mockReturnValue(false);
    vi.mocked(storage.storeArticle).mockResolvedValue({
      success: false,
      error: 'Permission denied',
    });

    const result = await processArticle(mockFeedItem, mockSource, mockOptions);

    expect(result.skipped).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error?.phase).toBe('store');
    expect(result.error?.error).toBe('Permission denied');
  });

  it('overrides author when specified in source', async () => {
    vi.mocked(storage.articleExists).mockReturnValue(false);
    vi.mocked(storage.storeArticle).mockResolvedValue({
      success: true,
      path: './test.md',
    });

    const sourceWithAuthor = {
      ...mockSource,
      author: 'Custom Author',
    };

    const result = await processArticle(
      mockFeedItem,
      sourceWithAuthor,
      mockOptions
    );

    expect(result.converted?.metadata.author).toBe('Custom Author');
  });
});

// Helper to create mock Feed
const createMockFeed = (items: FeedItem[]): Feed => ({
  title: 'Test Feed',
  description: 'Test',
  link: 'https://test.substack.com',
  feedUrl: 'https://test.substack.com/feed',
  items,
});

// Helper to create mock FetchResult
const createSuccessFetchResult = (feed: Feed): FetchResult => ({
  success: true,
  feed,
  cached: false,
  fetchedAt: new Date(),
});

const createFailureFetchResult = (error: string): FetchResult => ({
  success: false,
  error,
  fetchedAt: new Date(),
});

describe('ingestSource', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns error on fetch failure', async () => {
    vi.mocked(fetcher.fetchFeed).mockResolvedValue(
      createFailureFetchResult('Network error')
    );

    const result = await ingestSource(mockSource, mockOptions);

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].phase).toBe('fetch');
  });

  it('processes all items in feed', async () => {
    const feed = createMockFeed([
      mockFeedItem,
      { ...mockFeedItem, title: 'Article 2' },
    ]);
    vi.mocked(fetcher.fetchFeed).mockResolvedValue(
      createSuccessFetchResult(feed)
    );
    vi.mocked(storage.articleExists).mockReturnValue(false);
    vi.mocked(storage.storeArticle).mockResolvedValue({
      success: true,
      path: './test.md',
    });

    const result = await ingestSource(mockSource, mockOptions);

    expect(result.success).toBe(true);
    expect(result.articlesProcessed).toBe(2);
    expect(result.articlesStored).toBe(2);
  });

  it('respects maxArticlesPerPub limit', async () => {
    const feed = createMockFeed([
      mockFeedItem,
      { ...mockFeedItem, title: 'Article 2' },
      { ...mockFeedItem, title: 'Article 3' },
    ]);
    vi.mocked(fetcher.fetchFeed).mockResolvedValue(
      createSuccessFetchResult(feed)
    );
    vi.mocked(storage.articleExists).mockReturnValue(false);
    vi.mocked(storage.storeArticle).mockResolvedValue({
      success: true,
      path: './test.md',
    });

    const result = await ingestSource(mockSource, {
      ...mockOptions,
      maxArticlesPerPub: 2,
    });

    expect(result.articlesProcessed).toBe(2);
  });

  it('counts skipped articles correctly', async () => {
    const feed = createMockFeed([
      mockFeedItem,
      { ...mockFeedItem, title: 'Article 2' },
    ]);
    vi.mocked(fetcher.fetchFeed).mockResolvedValue(
      createSuccessFetchResult(feed)
    );
    // First article exists, second doesn't
    vi.mocked(storage.articleExists)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    vi.mocked(storage.storeArticle).mockResolvedValue({
      success: true,
      path: './test.md',
    });

    const result = await ingestSource(mockSource, mockOptions);

    expect(result.articlesProcessed).toBe(2);
    expect(result.articlesSkipped).toBe(1);
    expect(result.articlesStored).toBe(1);
  });
});
