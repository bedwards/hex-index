/**
 * Tests for publication analyzer
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzePublication } from './analyzer.js';
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
});
