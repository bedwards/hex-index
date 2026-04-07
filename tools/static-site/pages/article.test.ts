/**
 * Tests for generateArticlePage rendering — verifying the source date appears
 * on its own line directly under the byline for both single-source and
 * consolidated articles.
 */
import { describe, expect, it } from 'vitest';
import { generateArticlePage } from './article.js';
import type { CommentarySource } from '../templates.js';

interface ArticleRow {
  id: string;
  title: string;
  author_name: string | null;
  publication_name: string;
  publication_slug: string;
  published_at: string | null;
  estimated_read_time_minutes: number;
  content_path: string | null;
  rewritten_content_path: string | null;
  image_path: string | null;
  original_url: string;
  affiliate_links: Array<{ isbn10: string; isbn13: string; title: string; author: string; description: string }> | null;
  is_consolidated: boolean;
}

function mkArticle(overrides: Partial<ArticleRow> = {}): ArticleRow {
  return {
    id: 'art-1',
    title: 'A Test Article',
    author_name: 'Jane Doe',
    publication_name: 'Example Pub',
    publication_slug: 'example-pub',
    published_at: '2026-04-01T00:00:00Z',
    estimated_read_time_minutes: 7,
    content_path: null,
    rewritten_content_path: null,
    image_path: null,
    original_url: 'https://example.com/a',
    affiliate_links: null,
    is_consolidated: false,
    ...overrides,
  };
}

function mkSource(overrides: Partial<CommentarySource> = {}): CommentarySource {
  return {
    articleId: 'src-1',
    title: 'Primary Source',
    author: 'Primary Author',
    publicationName: 'Primary Pub',
    publicationSlug: 'primary-pub',
    originalUrl: 'https://example.com/p',
    excerptHtml: '<p>excerpt</p>',
    isPrimary: true,
    position: 0,
    ...overrides,
  };
}

describe('generateArticlePage source-date line', () => {
  it('renders a single-source article with the date on its own line under the byline', () => {
    const html = generateArticlePage(mkArticle(), '<p>body</p>', [], [], '', false, '', [], null);
    // exactly one <time> in the meta header area
    const headerStart = html.indexOf('article-header');
    const headerEnd = html.lastIndexOf('</header>');
    expect(headerEnd).toBeGreaterThan(-1);
    const header = html.slice(headerStart, headerEnd);
    expect(header).toContain('<div class="source-date"><time>');
    // date line comes after the article-meta closing tag, not inside it
    const metaOpenIdx = header.indexOf('article-meta');
    const sourceDateIdx = header.indexOf('source-date');
    expect(sourceDateIdx).toBeGreaterThan(metaOpenIdx);
    // not double-rendered: only one <time> tag in the header
    expect(header.match(/<time>/g)?.length ?? 0).toBe(1);
  });

  it('renders a consolidated article with the most-recent source date on its own line', () => {
    const sources = [
      mkSource({ articleId: 's0', position: 0, isPrimary: true }),
      mkSource({ articleId: 's1', position: 1, isPrimary: false, title: 'Source Two' }),
    ];
    const html = generateArticlePage(
      mkArticle({ is_consolidated: true, published_at: '2026-01-01T00:00:00Z' }),
      '<p>body</p>',
      [],
      [],
      '',
      true,
      '<p>excerpt</p>',
      sources,
      '2026-05-15T12:00:00Z'
    );
    const headerEnd = html.lastIndexOf('</header>');
    const header = html.slice(0, headerEnd);
    expect(header).toContain('consolidated-meta');
    expect(header).toContain('by Brian Edwards');
    expect(header).toContain('<div class="source-date"><time>');
    // The header should contain the formatted most-recent date, not the
    // commentary article's own published_at.
    expect(header).not.toContain('January 1, 2026');
    expect(header.match(/<time>/g)?.length ?? 0).toBe(1);
  });

  it('omits the source-date line when there is no date at all', () => {
    const html = generateArticlePage(
      mkArticle({ published_at: null }),
      '<p>body</p>',
      [],
      [],
      '',
      false,
      '',
      [],
      null
    );
    const header = html.slice(html.indexOf('article-header'), html.lastIndexOf('</header>'));
    expect(header).not.toContain('source-date');
    expect(header).not.toContain('<time>');
  });
});
