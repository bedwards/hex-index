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
  type CommentarySource,
  type StaticArticle,
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
  it('renders single-source meta with date on its own line under the byline', () => {
    const html = renderArticleMeta('Jane Doe', 'Example Pub', 'example-pub', '2026-04-01T00:00:00Z', 7, PATH, null);
    expect(html).toContain('<span class="author">Jane Doe</span>');
    expect(html).toContain('class="publication"');
    expect(html).toContain('7 min read');
    expect(html).not.toContain('multiple sources');
    expect(html).not.toContain('consolidated-meta');
    // date is on its own line under the byline, not inline in the meta
    expect(html).toContain('<div class="source-date"><time>');
    const metaEnd = html.indexOf('</div>');
    const dateIdx = html.indexOf('source-date');
    expect(dateIdx).toBeGreaterThan(metaEnd);
    // should not double-render: only one <time> element
    expect(html.match(/<time>/g)?.length ?? 0).toBe(1);
  });

  it('omits source-date line entirely when no date is provided', () => {
    const html = renderArticleMeta('Jane Doe', 'Example Pub', 'example-pub', null, 7, PATH, null);
    expect(html).not.toContain('source-date');
    expect(html).not.toContain('<time>');
  });

  it('renders consolidated meta with "by Brian Edwards" and uses mostRecentSourceAt for date line', () => {
    const primary = mkSource();
    const html = renderArticleMeta(
      'ignored',
      'ignored',
      'ignored',
      '2026-04-01T00:00:00Z',
      12,
      PATH,
      { primary, mostRecentSourceAt: '2026-05-15T12:00:00Z' }
    );
    expect(html).toContain('consolidated-meta');
    expect(html).toContain('by Brian Edwards');
    expect(html).toContain('multiple sources including');
    expect(html).toContain('Jane Doe');
    expect(html).toContain('Example Pub');
    expect(html).toContain('12 min read');
    // date line uses the most-recent source date, not the commentary's publishedAt
    expect(html).toContain('<div class="source-date"><time>');
    expect(html).toContain('2026'); // formatted somewhere
    // ensure the date line appears after the consolidated-meta div
    const metaIdx = html.indexOf('consolidated-meta');
    const dateIdx = html.indexOf('source-date');
    expect(dateIdx).toBeGreaterThan(metaIdx);
    expect(html.match(/<time>/g)?.length ?? 0).toBe(1);
  });

  it('consolidated with null mostRecentSourceAt omits the date line', () => {
    const primary = mkSource();
    const html = renderArticleMeta(
      'ignored', 'ignored', 'ignored', '2026-04-01T00:00:00Z', 12, PATH,
      { primary, mostRecentSourceAt: null }
    );
    expect(html).toContain('consolidated-meta');
    expect(html).not.toContain('source-date');
    expect(html).not.toContain('<time>');
  });
});

describe('renderSourceExcerpt', () => {
  it('renders a single source excerpt block', () => {
    const html = renderSourceExcerpt(mkSource(), PATH);
    expect(html).toContain('class="source-excerpt"');
    expect(html).toContain('<h3>Primary Source Title</h3>');
    expect(html).toContain('by Jane Doe');
    expect(html).toContain('Read full article');
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

  it('consolidated card renders "Brian Edwards" author + N sources badge', () => {
    const html = renderStaticArticleCard(
      mkStaticArticle({ isConsolidated: true, sourceCount: 4 }),
      PATH
    );
    expect(html).toContain('<span class="author">Brian Edwards</span>');
    expect(html).toContain('<span class="source-count-badge">4 sources</span>');
    expect(html).toContain('article-card consolidated');
  });

  it('does not mark as consolidated when only 1 source', () => {
    const html = renderStaticArticleCard(
      mkStaticArticle({ isConsolidated: true, sourceCount: 1 }),
      PATH
    );
    expect(html).not.toContain('source-count-badge');
    expect(html).not.toContain('Brian Edwards');
  });
});
