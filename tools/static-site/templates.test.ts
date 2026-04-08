/**
 * Snapshot tests for multi-source commentary rendering (#450).
 * Covers single-source (no change), 2-source, and 4-source cases.
 */
import { describe, expect, it } from 'vitest';
import {
  renderArticleMeta,
  renderSourceExcerpt,
  renderInterlacedSourcesAndDeepDives,
  renderStaticArticleCard,
  renderTrendingHero,
  formatTimeAgo,
  type CommentarySource,
  type StaticArticle,
  type TrendingArticle,
} from './templates.js';

const PATH = '../../';

function mkSource(overrides: Partial<CommentarySource> = {}): CommentarySource {
  return {
    articleId: 'src-1',
    title: 'Primary Source Title',
    author: 'Jane Doe',
    publicationName: 'Example Pub',
    publicationSlug: 'example-pub',
    originalUrl: 'https://example.com/a',
    excerptHtml: '<p>Source excerpt text.</p>',
    isPrimary: true,
    position: 0,
    ...overrides,
  };
}

function mkStaticArticle(overrides: Partial<StaticArticle> = {}): StaticArticle {
  return {
    id: 'art-1',
    title: 'An Article',
    author: 'Jane Doe',
    publicationName: 'Example Pub',
    publicationSlug: 'example-pub',
    publishedAt: '2026-04-01T00:00:00Z',
    estimatedReadTimeMinutes: 7,
    excerpt: 'excerpt',
    url: 'https://example.com/a',
    imagePath: null,
    displayTag: null,
    ...overrides,
  };
}

describe('renderArticleMeta', () => {
  it('renders single-source meta unchanged', () => {
    const html = renderArticleMeta('Jane Doe', 'Example Pub', 'example-pub', '2026-04-01T00:00:00Z', 7, PATH, null);
    expect(html).toContain('<span class="author">Jane Doe</span>');
    expect(html).toContain('class="publication"');
    expect(html).toContain('7 min read');
    expect(html).not.toContain('multiple sources');
    expect(html).not.toContain('consolidated-meta');
  });

  it('renders consolidated meta with "multiple sources:" and N others suffix', () => {
    const primary = mkSource();
    const html = renderArticleMeta('ignored', 'ignored', 'ignored', '2026-04-01T00:00:00Z', 12, PATH, { primary, sourceCount: 3 });
    expect(html).toContain('consolidated-meta');
    expect(html).toContain('Multiple sources:');
    expect(html).toContain('Jane Doe');
    expect(html).toContain('Example Pub');
    expect(html).toContain('and 2 others');
    expect(html).not.toContain('by Brian Edwards');
    expect(html).not.toContain('min read');
  });

  it('renders consolidated meta singular "other" for 2 sources', () => {
    const primary = mkSource();
    const html = renderArticleMeta('x', 'x', 'x', '2026-04-01T00:00:00Z', 12, PATH, { primary, sourceCount: 2 });
    expect(html).toContain('and 1 other');
    expect(html).not.toContain('and 1 others');
  });
});

describe('renderSourceExcerpt', () => {
  it('renders a single source excerpt block', () => {
    const html = renderSourceExcerpt(mkSource(), PATH);
    expect(html).toContain('class="source-excerpt"');
    expect(html).toContain('<h3>Primary Source Title</h3>');
    expect(html).toContain('by Jane Doe');
    expect(html).toContain('Read full article');
  });

  it('renders an "Excerpt unavailable" fallback when excerptHtml is empty (regression #490)', () => {
    const src = mkSource({ excerptHtml: '' });
    const html = renderSourceExcerpt(src, PATH);
    expect(html).toContain('class="source-excerpt"');
    expect(html).toContain('Excerpt unavailable');
    expect(html).toContain('Read full article at Example Pub');
    // The card should not be empty: it must have a body element after source-meta
    expect(html).toMatch(/source-meta[\s\S]*<p>/);
  });

  it('renders fallback for whitespace-only excerptHtml', () => {
    const src = mkSource({ excerptHtml: '   \n  ' });
    const html = renderSourceExcerpt(src, PATH);
    expect(html).toContain('Excerpt unavailable');
  });

  it('renders "Watch video" label for YouTube sources', () => {
    const src = { ...mkSource(), originalUrl: 'https://www.youtube.com/watch?v=abc123' };
    const html = renderSourceExcerpt(src, PATH);
    expect(html).toContain('Watch video');
    expect(html).not.toContain('Read full article');
    expect(html).toContain('<p>Source excerpt text.</p>');
  });
});

describe('renderInterlacedSourcesAndDeepDives', () => {
  it('returns empty string when there are no sources (single-source article)', () => {
    expect(renderInterlacedSourcesAndDeepDives([], ['<section>dd</section>'], PATH)).toBe('');
  });

  it('interlaces 2 sources with 2 deep dives: s1, dd1, s2, dd2', () => {
    const sources = [
      mkSource({ articleId: 's1', title: 'Source One', position: 0 }),
      mkSource({ articleId: 's2', title: 'Source Two', position: 1, isPrimary: false }),
    ];
    const dds = ['<section class="dd1">dd1</section>', '<section class="dd2">dd2</section>'];
    const html = renderInterlacedSourcesAndDeepDives(sources, dds, PATH);

    const idxS1 = html.indexOf('Source One');
    const idxD1 = html.indexOf('dd1');
    const idxS2 = html.indexOf('Source Two');
    const idxD2 = html.indexOf('dd2');

    expect(idxS1).toBeGreaterThan(-1);
    expect(idxD1).toBeGreaterThan(idxS1);
    expect(idxS2).toBeGreaterThan(idxD1);
    expect(idxD2).toBeGreaterThan(idxS2);
    expect(html).toContain('<h2>Sources</h2>');
  });

  it('handles 4 sources with 3 deep dives: extra source placed after last deep dive', () => {
    const sources = [0, 1, 2, 3].map((i) =>
      mkSource({ articleId: `s${i}`, title: `Source ${i}`, position: i, isPrimary: i === 0 })
    );
    const dds = ['<section class="dd0">dd0</section>', '<section class="dd1">dd1</section>', '<section class="dd2">dd2</section>'];
    const html = renderInterlacedSourcesAndDeepDives(sources, dds, PATH);

    const positions = [
      html.indexOf('Source 0'),
      html.indexOf('dd0'),
      html.indexOf('Source 1'),
      html.indexOf('dd1'),
      html.indexOf('Source 2'),
      html.indexOf('dd2'),
      html.indexOf('Source 3'),
    ];
    for (let i = 0; i < positions.length; i++) {
      expect(positions[i]).toBeGreaterThan(-1);
      if (i > 0) {
        expect(positions[i]).toBeGreaterThan(positions[i - 1]);
      }
    }
  });

  it('respects position ordering even when passed out of order', () => {
    const sources = [
      mkSource({ articleId: 'sB', title: 'Source B', position: 1, isPrimary: false }),
      mkSource({ articleId: 'sA', title: 'Source A', position: 0, isPrimary: true }),
    ];
    const html = renderInterlacedSourcesAndDeepDives(sources, [], PATH);
    expect(html.indexOf('Source A')).toBeLessThan(html.indexOf('Source B'));
  });
});

describe('renderStaticArticleCard', () => {
  it('single-source card unchanged (no badge, no author override)', () => {
    const html = renderStaticArticleCard(mkStaticArticle(), PATH);
    expect(html).toContain('<span class="author">Jane Doe</span>');
    expect(html).not.toContain('source-count-badge');
    expect(html).not.toContain('consolidated');
    expect(html).not.toContain('Brian Edwards');
  });

  it('consolidated card renders "Multiple sources" with primary author and other count, no read time', () => {
    const html = renderStaticArticleCard(
      mkStaticArticle({ isConsolidated: true, sourceCount: 4, primarySourceAuthor: 'Ada Lovelace' }),
      PATH
    );
    expect(html).toContain('<span class="multi-source-label">Multiple sources:</span>');
    expect(html).toContain('<span class="primary-source">Ada Lovelace</span>');
    expect(html).toContain('and 3 others');
    expect(html).toContain('article-card consolidated');
    expect(html).not.toContain('Brian Edwards');
    expect(html).not.toContain('min read');
    expect(html).not.toContain('source-count-badge');
    expect(html).not.toContain('null');
  });

  it('consolidated card with 2 sources uses singular "other"', () => {
    const html = renderStaticArticleCard(
      mkStaticArticle({ isConsolidated: true, sourceCount: 2, primarySourceAuthor: 'Ada Lovelace' }),
      PATH
    );
    expect(html).toContain('and 1 other');
    expect(html).not.toContain('1 others');
  });

  it('does not mark as consolidated when only 1 source', () => {
    const html = renderStaticArticleCard(
      mkStaticArticle({ isConsolidated: true, sourceCount: 1 }),
      PATH
    );
    expect(html).not.toContain('Multiple sources');
    expect(html).not.toContain('Brian Edwards');
  });

  it('omits read-time span (no "null min read") when estimatedReadTimeMinutes is null', () => {
    const html = renderStaticArticleCard(
      mkStaticArticle({ estimatedReadTimeMinutes: null as unknown as number }),
      PATH
    );
    expect(html).not.toContain('null min read');
    expect(html).not.toContain('min read');
  });
});

function mkTrending(overrides: Partial<TrendingArticle> = {}): TrendingArticle {
  return {
    ...mkStaticArticle(),
    isConsolidated: true,
    sourceCount: 3,
    imagePath: 'images/foo.jpg',
    mostRecentSourceAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    ...overrides,
  };
}

describe('formatTimeAgo', () => {
  const now = new Date('2026-04-06T12:00:00Z');
  it('formats minutes', () => {
    expect(formatTimeAgo('2026-04-06T11:55:00Z', now)).toBe('5 minutes ago');
  });
  it('formats hours', () => {
    expect(formatTimeAgo('2026-04-06T09:00:00Z', now)).toBe('3 hours ago');
  });
  it('formats days', () => {
    expect(formatTimeAgo('2026-04-03T12:00:00Z', now)).toBe('3 days ago');
  });
  it('singularizes 1 day', () => {
    expect(formatTimeAgo('2026-04-05T12:00:00Z', now)).toBe('1 day ago');
  });
});

describe('renderTrendingHero', () => {
  it('returns empty string when there are no trending consolidations', () => {
    expect(renderTrendingHero([], './')).toBe('');
  });

  it('renders a section with header, card, image, badge, author, and time ago', () => {
    const html = renderTrendingHero([mkTrending({ id: 'abc', title: 'Big Story', sourceCount: 4 })], './');
    expect(html).toContain('class="trending-hero"');
    expect(html).toContain('Trending story lines');
    expect(html).toContain('class="trending-card"');
    expect(html).toContain('class="trending-grid"');
    expect(html).toContain('href="./article/abc/index.html"');
    expect(html).toContain('<h3 class="trending-title">Big Story</h3>');
    expect(html).not.toContain('Brian Edwards');
    expect(html).toContain('4 sources');
    expect(html).toContain('days ago');
    expect(html).toContain('src="./images/foo.jpg"');
    // Should not emit an <hr> above the section (issue #492)
    expect(html).not.toMatch(/<hr\b/);
  });

  it('renders multiple cards in order', () => {
    const html = renderTrendingHero([
      mkTrending({ id: 'first', title: 'First Story' }),
      mkTrending({ id: 'second', title: 'Second Story' }),
    ], './');
    expect(html.indexOf('First Story')).toBeLessThan(html.indexOf('Second Story'));
  });
});
