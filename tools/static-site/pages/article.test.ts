import { describe, expect, it, vi } from 'vitest';
import { autoNullBrokenArticlePaths, generateArticlePage } from './article.js';

interface QueryCall {
  sql: string;
  params: unknown[];
}

function makeFakePool() {
  const calls: QueryCall[] = [];
  return {
    calls,
    pool: {
      query: vi.fn((sql: string, params: unknown[]) => {
        calls.push({ sql, params });
        return Promise.resolve({ rows: [], rowCount: 0 });
      }),
    },
  };
}

describe('autoNullBrokenArticlePaths', () => {
  it('NULLs content_path when the source file is missing/empty', async () => {
    const { pool, calls } = makeFakePool();
    // loadContent returns '' to simulate a missing file (matches loadArticleContent's catch).
    const loadContent = vi.fn((_path: string | null) => Promise.resolve(''));

    const result = await autoNullBrokenArticlePaths({
      pool,
      articleId: 'art-1',
      isConsolidated: false,
      contentPath: 'missing/file.html',
      rewrittenContentPath: null,
      loadContent,
    });

    expect(result.contentNulled).toBe(true);
    expect(result.rewriteNulled).toBe(false);
    expect(calls).toHaveLength(1);
    expect(calls[0].sql).toContain('UPDATE app.articles SET content_path = NULL');
    expect(calls[0].params).toEqual(['art-1']);
  });

  it('NULLs both content_path and rewritten_content_path when both files are broken', async () => {
    const { pool, calls } = makeFakePool();
    const loadContent = vi.fn((_path: string | null) => Promise.resolve(''));

    const result = await autoNullBrokenArticlePaths({
      pool,
      articleId: 'art-2',
      isConsolidated: false,
      contentPath: 'src.html',
      rewrittenContentPath: 'rewrite.html',
      loadContent,
    });

    expect(result.contentNulled).toBe(true);
    expect(result.rewriteNulled).toBe(true);
    expect(calls).toHaveLength(2);
    expect(calls[0].sql).toContain('content_path = NULL');
    expect(calls[1].sql).toContain('rewritten_content_path = NULL');
    expect(calls[1].sql).toContain('rewrite_dirty = true');
  });

  it('does not NULL content_path when source content is present', async () => {
    const { pool, calls } = makeFakePool();
    const longContent = '<p>' + 'word '.repeat(100) + '</p>';
    const loadContent = vi.fn((path: string | null) =>
      Promise.resolve(path === 'good.html' ? longContent : ''),
    );

    const result = await autoNullBrokenArticlePaths({
      pool,
      articleId: 'art-3',
      isConsolidated: false,
      contentPath: 'good.html',
      rewrittenContentPath: null,
      loadContent,
    });

    expect(result.contentNulled).toBe(false);
    expect(calls).toHaveLength(0);
    expect(result.rawContent).toBe(longContent);
  });

  it('skips path checks for consolidated commentary articles', async () => {
    const { pool, calls } = makeFakePool();
    const loadContent = vi.fn((_path: string | null) => Promise.resolve(''));

    const result = await autoNullBrokenArticlePaths({
      pool,
      articleId: 'art-4',
      isConsolidated: true,
      contentPath: 'src.html',
      rewrittenContentPath: 'rewrite.html',
      loadContent,
    });

    expect(result.contentNulled).toBe(false);
    expect(result.rewriteNulled).toBe(false);
    expect(calls).toHaveLength(0);
  });

  it('does not issue an UPDATE when content_path is already null', async () => {
    const { pool, calls } = makeFakePool();
    const loadContent = vi.fn((_path: string | null) => Promise.resolve(''));

    const result = await autoNullBrokenArticlePaths({
      pool,
      articleId: 'art-5',
      isConsolidated: false,
      contentPath: null,
      rewrittenContentPath: 'rewrite.html',
      loadContent,
    });

    expect(result.contentNulled).toBe(false);
    expect(result.rewriteNulled).toBe(true);
    expect(calls).toHaveLength(1);
    expect(calls[0].sql).toContain('rewritten_content_path = NULL');
  });
});

describe('generateArticlePage with rewrite but missing content_path', () => {
  it('still renders the rewrite when content_path is null and excerpt is empty', () => {
    const article = {
      id: 'art-render-1',
      title: 'A Test Article',
      author_name: 'Jane Doe',
      publication_name: 'Test Pub',
      publication_slug: 'test-pub',
      published_at: '2026-04-01T00:00:00Z',
      estimated_read_time_minutes: 5,
      content_path: null,
      rewritten_content_path: 'rewrites/art-render-1.html',
      image_path: 'images/art-render-1.jpg',
      original_url: 'https://example.com/post',
      affiliate_links: null,
      is_consolidated: false,
    };
    const rewriteHtml = '<p>This is the editorial commentary body of the rewrite.</p>';

    const html = generateArticlePage(
      article,
      rewriteHtml,
      [],
      [],
      '',
      true, // isFullRewrite
      '', // empty excerpt because content_path is null
      [],
    );

    expect(html).toContain('A Test Article');
    expect(html).toContain('editorial commentary body of the rewrite');
    expect(html).toContain('Jane Doe');
  });
});
