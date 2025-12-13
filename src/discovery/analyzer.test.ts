/**
 * Tests for publication analyzer
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzePublication, validateSlugOrUrl } from './analyzer.js';
import * as fetcher from '../feed/fetcher.js';
import { Feed, FetchResult } from '../feed/types.js';

vi.mock('../feed/fetcher.js', () => ({
  fetchFeed: vi.fn(),
}));

const createMockFeed = (items: Array<{ title: string; contentHtml: string; publishedAt: Date; author: string }>): Feed => ({
  title: 'Test Publication',
  description: 'A test publication about economics',
  link: 'https://test.substack.com',
  feedUrl: 'https://test.substack.com/feed',
  author: 'Test Author',
  items: items.map((item) => ({
    title: item.title,
    url: `https://test.substack.com/p/${item.title.toLowerCase().replace(/\s+/g, '-')}`,
    publishedAt: item.publishedAt,
    author: item.author,
    contentHtml: item.contentHtml,
  })),
});

const createSuccessFetchResult = (feed: Feed): FetchResult => ({
  success: true,
  feed,
  cached: false,
  fetchedAt: new Date(),
});

describe('analyzePublication', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('analyzes a publication with good metrics', async () => {
    const now = new Date();
    const items = [
      {
        title: 'Recent Post About Economics',
        contentHtml: '<p>' + 'word '.repeat(2000) + 'chart analysis data statistics</p>',
        publishedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        author: 'Test Author',
      },
      {
        title: 'Another Economic Analysis',
        contentHtml: '<p>' + 'word '.repeat(1800) + 'data research study</p>',
        publishedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        author: 'Test Author',
      },
      {
        title: 'Market Data Review',
        contentHtml: '<p>' + 'word '.repeat(2200) + 'chart graph percent</p>',
        publishedAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
        author: 'Test Author',
      },
    ];

    vi.mocked(fetcher.fetchFeed).mockResolvedValue(
      createSuccessFetchResult(createMockFeed(items))
    );

    const result = await analyzePublication('test', { delayMs: 0 });

    expect(result.name).toBe('Test Publication');
    expect(result.slug).toBe('test');
    expect(result.author).toBe('Test Author');
    expect(result.activity.totalPosts).toBe(3);
    expect(result.activity.postsLast30Days).toBe(3);
    expect(result.content.avgWordCount).toBeGreaterThan(1500);
    expect(result.content.avgReadTime).toBeGreaterThan(5);
    expect(result.qualityScore).toBeGreaterThan(50);
    expect(result.topics).toContain('economics');
  });

  it('detects inactive publications', async () => {
    const now = new Date();
    const items = [
      {
        title: 'Old Post',
        contentHtml: '<p>' + 'word '.repeat(500) + '</p>',
        publishedAt: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        author: 'Author',
      },
    ];

    vi.mocked(fetcher.fetchFeed).mockResolvedValue(
      createSuccessFetchResult(createMockFeed(items))
    );

    const result = await analyzePublication('inactive', { delayMs: 0 });

    expect(result.activity.postsLast30Days).toBe(0);
    expect(result.scoreBreakdown.activityScore).toBe(0);
    expect(result.qualityScore).toBeLessThan(50);
  });

  it('calculates content metrics correctly', async () => {
    const items = [
      {
        title: 'Long Post',
        contentHtml: '<p>' + 'word '.repeat(3000) + '</p>',
        publishedAt: new Date(),
        author: 'Author',
      },
      {
        title: 'Short Post',
        contentHtml: '<p>' + 'word '.repeat(500) + '</p>',
        publishedAt: new Date(),
        author: 'Author',
      },
    ];

    vi.mocked(fetcher.fetchFeed).mockResolvedValue(
      createSuccessFetchResult(createMockFeed(items))
    );

    const result = await analyzePublication('mixed', { delayMs: 0 });

    expect(result.content.minWordCount).toBe(500);
    expect(result.content.maxWordCount).toBe(3000);
    expect(result.content.avgWordCount).toBe(1750);
  });

  it('throws on fetch failure', async () => {
    vi.mocked(fetcher.fetchFeed).mockResolvedValue({
      success: false,
      error: 'Network error',
      fetchedAt: new Date(),
    });

    await expect(analyzePublication('broken', { delayMs: 0 })).rejects.toThrow(
      'Network error'
    );
  });

  it('detects multiple topics', async () => {
    const items = [
      {
        title: 'AI and Technology Future',
        contentHtml: '<p>artificial intelligence machine learning ml llm technology software</p>',
        publishedAt: new Date(),
        author: 'Author',
      },
    ];

    const feed = createMockFeed(items);
    feed.description = 'A publication about AI and technology trends';

    vi.mocked(fetcher.fetchFeed).mockResolvedValue(
      createSuccessFetchResult(feed)
    );

    const result = await analyzePublication('aitech', { delayMs: 0 });

    expect(result.topics).toContain('ai');
    expect(result.topics).toContain('technology');
  });

  it('counts data-rich posts', async () => {
    const items = [
      {
        title: 'Data Analysis',
        contentHtml: '<p>chart graph data statistics analysis</p>',
        publishedAt: new Date(),
        author: 'Author',
      },
      {
        title: 'Opinion Piece',
        contentHtml: '<p>I think this is good because reasons</p>',
        publishedAt: new Date(),
        author: 'Author',
      },
    ];

    vi.mocked(fetcher.fetchFeed).mockResolvedValue(
      createSuccessFetchResult(createMockFeed(items))
    );

    const result = await analyzePublication('mixed', { delayMs: 0 });

    expect(result.content.dataRichCount).toBe(1);
  });

  it('handles empty feed gracefully', async () => {
    const emptyFeed: Feed = {
      title: 'Empty Publication',
      description: 'No posts yet',
      link: 'https://empty.substack.com',
      feedUrl: 'https://empty.substack.com/feed',
      author: 'Empty Author',
      items: [],
    };

    vi.mocked(fetcher.fetchFeed).mockResolvedValue(
      createSuccessFetchResult(emptyFeed)
    );

    const result = await analyzePublication('empty', { delayMs: 0 });

    expect(result.name).toBe('Empty Publication');
    expect(result.activity.totalPosts).toBe(0);
    expect(result.activity.postsLast30Days).toBe(0);
    expect(result.activity.avgDaysBetweenPosts).toBeNull();
    expect(result.content.avgWordCount).toBe(0);
    expect(result.content.avgReadTime).toBe(0);
    expect(result.content.longFormCount).toBe(0);
    expect(result.content.dataRichCount).toBe(0);
    expect(result.qualityScore).toBe(0);
  });

  it('handles full feed URL input', async () => {
    const items = [
      {
        title: 'Test Post',
        contentHtml: '<p>' + 'word '.repeat(1000) + '</p>',
        publishedAt: new Date(),
        author: 'Author',
      },
    ];

    vi.mocked(fetcher.fetchFeed).mockResolvedValue(
      createSuccessFetchResult(createMockFeed(items))
    );

    const result = await analyzePublication('https://test.substack.com/feed', { delayMs: 0 });

    expect(result.slug).toBe('test');
    expect(result.feedUrl).toBe('https://test.substack.com/feed');
  });

  it('calculates consistency score based on posting regularity', async () => {
    const now = new Date();
    // Posts every 2 days - very consistent
    const items = [
      {
        title: 'Post 1',
        contentHtml: '<p>content</p>',
        publishedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        author: 'Author',
      },
      {
        title: 'Post 2',
        contentHtml: '<p>content</p>',
        publishedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
        author: 'Author',
      },
      {
        title: 'Post 3',
        contentHtml: '<p>content</p>',
        publishedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
        author: 'Author',
      },
    ];

    vi.mocked(fetcher.fetchFeed).mockResolvedValue(
      createSuccessFetchResult(createMockFeed(items))
    );

    const result = await analyzePublication('consistent', { delayMs: 0 });

    expect(result.scoreBreakdown.consistencyScore).toBe(25); // Very consistent (<=3 days)
    expect(result.activity.avgDaysBetweenPosts).toBeCloseTo(2, 1);
  });

  it('rejects invalid slug with path traversal', async () => {
    await expect(analyzePublication('../etc/passwd', { delayMs: 0 })).rejects.toThrow(
      'Invalid characters in input'
    );
  });

  it('rejects empty slug', async () => {
    await expect(analyzePublication('', { delayMs: 0 })).rejects.toThrow(
      'Input must be a non-empty string'
    );
  });
});

describe('validateSlugOrUrl', () => {
  it('validates valid slugs', () => {
    expect(validateSlugOrUrl('noahpinion')).toEqual({ valid: true });
    expect(validateSlugOrUrl('astral-codex-ten')).toEqual({ valid: true });
    expect(validateSlugOrUrl('test_123')).toEqual({ valid: true });
    expect(validateSlugOrUrl('A123')).toEqual({ valid: true });
  });

  it('validates valid URLs', () => {
    expect(validateSlugOrUrl('https://noahpinion.substack.com/feed')).toEqual({ valid: true });
    expect(validateSlugOrUrl('http://example.com/rss')).toEqual({ valid: true });
  });

  it('rejects invalid slugs', () => {
    expect(validateSlugOrUrl('')).toEqual({ valid: false, error: 'Input must be a non-empty string' });
    expect(validateSlugOrUrl('   ')).toEqual({ valid: false, error: 'Input cannot be empty' });
    expect(validateSlugOrUrl('../etc/passwd')).toEqual({ valid: false, error: 'Invalid characters in input' });
    expect(validateSlugOrUrl('slug with spaces')).toEqual({ valid: false, error: 'Invalid slug format. Use only letters, numbers, hyphens, and underscores.' });
    expect(validateSlugOrUrl('-invalid')).toEqual({ valid: false, error: 'Invalid slug format. Use only letters, numbers, hyphens, and underscores.' });
  });

  it('rejects invalid URLs', () => {
    expect(validateSlugOrUrl('https://')).toEqual({ valid: false, error: 'Invalid feed URL format' });
    expect(validateSlugOrUrl('https://a')).toEqual({ valid: false, error: 'Invalid feed URL format' });
    expect(validateSlugOrUrl('ftp://example.com')).toEqual({ valid: false, error: 'Invalid feed URL format' });
  });

  it('handles non-string input', () => {
    // @ts-expect-error Testing invalid input type
    expect(validateSlugOrUrl(null)).toEqual({ valid: false, error: 'Input must be a non-empty string' });
    // @ts-expect-error Testing invalid input type
    expect(validateSlugOrUrl(undefined)).toEqual({ valid: false, error: 'Input must be a non-empty string' });
  });
});
