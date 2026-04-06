import { describe, expect, it } from 'vitest';
import {
  truncateDeepDive,
  renderEpubChapterBody,
  type EpubChapterDeepDive,
  type EpubChapterSource,
} from './epub-helpers.js';

const URL = 'https://hex-index.com/wikipedia/example-topic/';

describe('truncateDeepDive', () => {
  it('returns only the read-more link for zero-paragraph input', () => {
    const out = truncateDeepDive('', 3, URL);
    expect(out).toContain('Read full deep dive');
    expect(out).toContain(URL);
    expect(out).not.toContain('<p>Body');
  });

  it('returns empty string for empty input with no url', () => {
    expect(truncateDeepDive('', 3)).toBe('');
  });

  it('keeps a single paragraph when only one exists (no padding)', () => {
    const html = '<p>Only one.</p>';
    const out = truncateDeepDive(html, 3, URL);
    expect(out).toContain('<p>Only one.</p>');
    expect(out).toContain('Read full deep dive');
    // Only one <p> from the source; read-more adds exactly one more.
    expect(out.match(/<p\b/g)?.length).toBe(2);
  });

  it('keeps exactly three paragraphs when three exist', () => {
    const html = '<p>One.</p><p>Two.</p><p>Three.</p>';
    const out = truncateDeepDive(html, 3, URL);
    expect(out).toContain('<p>One.</p>');
    expect(out).toContain('<p>Two.</p>');
    expect(out).toContain('<p>Three.</p>');
    expect(out).toContain('Read full deep dive');
  });

  it('truncates five paragraphs down to three and drops the rest', () => {
    const html =
      '<p>One.</p><p>Two.</p><p>Three.</p><p>Four.</p><p>Five.</p>';
    const out = truncateDeepDive(html, 3, URL);
    expect(out).toContain('<p>One.</p>');
    expect(out).toContain('<p>Two.</p>');
    expect(out).toContain('<p>Three.</p>');
    expect(out).not.toContain('<p>Four.</p>');
    expect(out).not.toContain('<p>Five.</p>');
    // 3 source paragraphs + 1 read-more.
    expect(out.match(/<p\b/g)?.length).toBe(4);
  });

  it('preserves a heading that appears before the paragraphs', () => {
    const html =
      '<h2>Origins</h2><p>One.</p><p>Two.</p><p>Three.</p><p>Four.</p>';
    const out = truncateDeepDive(html, 3, URL);
    expect(out).toContain('<h2>Origins</h2>');
    expect(out).toContain('<p>One.</p>');
    expect(out).toContain('<p>Three.</p>');
    expect(out).not.toContain('<p>Four.</p>');
    // Heading comes before first paragraph.
    expect(out.indexOf('<h2>')).toBeLessThan(out.indexOf('<p>One.'));
  });

  it('does not count <p> nested inside lists or blockquotes', () => {
    const html =
      '<p>Top one.</p>' +
      '<blockquote><p>Nested quote p.</p></blockquote>' +
      '<p>Top two.</p>' +
      '<ul><li><p>Nested list p.</p></li></ul>' +
      '<p>Top three.</p>' +
      '<p>Top four (should drop).</p>';
    const out = truncateDeepDive(html, 3, URL);
    expect(out).toContain('<p>Top one.</p>');
    expect(out).toContain('<p>Top two.</p>');
    expect(out).toContain('<p>Top three.</p>');
    expect(out).not.toContain('Top four');
    // The nested <blockquote> appears before the 3rd top-level <p>, so it
    // is preserved in place as non-paragraph top-level content.
    expect(out).toContain('<blockquote>');
  });

  it('omits the read-more link when no url is provided', () => {
    const html = '<p>One.</p><p>Two.</p>';
    const out = truncateDeepDive(html, 3);
    expect(out).not.toContain('Read full deep dive');
    expect(out).toContain('<p>One.</p>');
    expect(out).toContain('<p>Two.</p>');
  });

  it('respects a custom maxParagraphs value', () => {
    const html = '<p>One.</p><p>Two.</p><p>Three.</p>';
    const out = truncateDeepDive(html, 1, URL);
    expect(out).toContain('<p>One.</p>');
    expect(out).not.toContain('<p>Two.</p>');
    expect(out).not.toContain('<p>Three.</p>');
  });
});

// ── renderEpubChapterBody ───────────────────────────────────────────

function makeDeepDive(i: number): EpubChapterDeepDive {
  return {
    title: `Deep Dive ${i}`,
    // Pre-truncated/sanitized: 3 paragraphs + read-more link, mirroring the
    // pipeline that runs `truncateDeepDive` then `htmlToXhtml` upstream.
    displayHtml:
      `<p>DD${i} para one.</p><p>DD${i} para two.</p><p>DD${i} para three.</p>` +
      `<p class="deep-dive-read-more">Read full deep dive: <a href="https://hex-index.com/wikipedia/dd${i}/">link</a></p>`,
    slug: `dd${i}`,
  };
}

function makeSource(i: number, isPrimary = false): EpubChapterSource {
  return {
    articleId: `src-${i}`,
    title: `Source ${i} Title`,
    author: `Author ${i}`,
    publicationName: `Publication ${i}`,
    originalUrl: `https://example.com/source-${i}`,
    excerptHtml: `<p>Source ${i} excerpt prose.</p>`,
    isPrimary,
    position: i,
  };
}

describe('renderEpubChapterBody', () => {
  it('renders single-source chapter unchanged from legacy layout', () => {
    const out = renderEpubChapterBody({
      title: 'Solo Article',
      authorName: 'Jane Writer',
      publicationName: 'Some Pub',
      publishedAt: '2026-04-01T12:00:00Z',
      estimatedReadTimeMinutes: 7,
      imageHtml: '<img src="../images/img-0.webp" alt="Solo Article" />',
      bodyHtml: '<p>Body paragraph one.</p><p>Body paragraph two.</p>',
      affiliateHtml: '',
      topicHeaderHtml: '\n  <h2 class="topic-header">Culture</h2>',
      isConsolidated: false,
      sources: [],
      deepDives: [makeDeepDive(1)],
    });

    // Header + meta line uses the original single-source attribution.
    expect(out).toContain('<h1>Solo Article</h1>');
    expect(out).toContain('Jane Writer');
    expect(out).toContain('Some Pub');
    expect(out).toContain('7 min read');
    expect(out).not.toContain('multiple sources');
    expect(out).not.toContain('Brian Edwards');

    // Body is rendered.
    expect(out).toContain('<p>Body paragraph one.</p>');

    // Deep dive is rendered after body and contains its truncated content
    // (the upstream caller already ran truncateDeepDive, so we expect 3 p's).
    expect(out).toContain('<h3>Deep Dive 1</h3>');
    expect(out).toContain('DD1 para one.');
    expect(out).toContain('DD1 para three.');
    expect(out).toContain('Read full deep dive');

    // No multi-source plumbing.
    expect(out).not.toContain('Sources');
    expect(out).not.toContain('source-excerpt');
  });

  it('renders consolidated 2-source chapter with multi-source attribution and interlacing', () => {
    const sources = [makeSource(0, true), makeSource(1, false)];
    const deepDives = [makeDeepDive(1), makeDeepDive(2)];

    const out = renderEpubChapterBody({
      title: 'Consolidated Story',
      authorName: 'ignored',
      publicationName: 'ignored',
      publishedAt: '2026-04-01T12:00:00Z',
      estimatedReadTimeMinutes: 12,
      imageHtml: '',
      bodyHtml: '<p>Synthesized commentary body.</p>',
      affiliateHtml: '<div class="affiliate-section">books</div>',
      topicHeaderHtml: '',
      isConsolidated: true,
      sources,
      deepDives,
    });

    // Multi-source attribution line uses the primary source.
    expect(out).toContain('by Brian Edwards');
    expect(out).toContain('multiple sources including Author 0, Publication 0');
    // Read time is preserved.
    expect(out).toContain('12 min read');

    // Commentary body comes before the Sources section.
    const bodyIdx = out.indexOf('Synthesized commentary body');
    const sourcesIdx = out.indexOf('<h2>Sources</h2>');
    expect(bodyIdx).toBeGreaterThan(0);
    expect(sourcesIdx).toBeGreaterThan(bodyIdx);

    // Interlacing order: source0, dd1, source1, dd2.
    const s0 = out.indexOf('Source 0 Title');
    const dd1 = out.indexOf('Deep Dive 1');
    const s1 = out.indexOf('Source 1 Title');
    const dd2 = out.indexOf('Deep Dive 2');
    expect(s0).toBeGreaterThan(0);
    expect(dd1).toBeGreaterThan(s0);
    expect(s1).toBeGreaterThan(dd1);
    expect(dd2).toBeGreaterThan(s1);

    // Affiliate books appear after the interlaced section.
    const booksIdx = out.indexOf('affiliate-section');
    expect(booksIdx).toBeGreaterThan(dd2);

    // Deep dive truncation preserved (3 source paragraphs + 1 read-more per dd).
    expect(out).toContain('DD1 para one.');
    expect(out).toContain('DD1 para three.');
    expect(out).toContain('DD2 para three.');
    // Each dd's read-more link survives.
    expect((out.match(/Read full deep dive/g) ?? []).length).toBe(2);

    // Each source appears exactly once — no double-counting of absorbed
    // sources.
    expect((out.match(/Source 0 Title/g) ?? []).length).toBe(1);
    expect((out.match(/Source 1 Title/g) ?? []).length).toBe(1);
  });

  it('renders consolidated 3-source chapter with three interlaced excerpts', () => {
    const sources = [
      makeSource(0, true),
      makeSource(1, false),
      makeSource(2, false),
    ];
    const deepDives = [makeDeepDive(1), makeDeepDive(2), makeDeepDive(3)];

    const out = renderEpubChapterBody({
      title: 'Three-source Story',
      authorName: 'ignored',
      publicationName: 'ignored',
      publishedAt: null,
      estimatedReadTimeMinutes: 15,
      imageHtml: '',
      bodyHtml: '<p>Body.</p>',
      affiliateHtml: '',
      topicHeaderHtml: '',
      isConsolidated: true,
      sources,
      deepDives,
    });

    // Primary attribution chosen from is_primary, not from position alone.
    expect(out).toContain('Author 0, Publication 0');

    // All three sources appear exactly once.
    for (let i = 0; i < 3; i++) {
      expect((out.match(new RegExp(`Source ${i} Title`, 'g')) ?? []).length).toBe(1);
    }

    // All three deep dives appear, each with truncated content + read-more.
    for (let i = 1; i <= 3; i++) {
      expect(out).toContain(`Deep Dive ${i}`);
      expect(out).toContain(`DD${i} para three.`);
    }
    expect((out.match(/Read full deep dive/g) ?? []).length).toBe(3);

    // Strict interlacing: s0 < dd1 < s1 < dd2 < s2 < dd3.
    const positions = [
      out.indexOf('Source 0 Title'),
      out.indexOf('Deep Dive 1'),
      out.indexOf('Source 1 Title'),
      out.indexOf('Deep Dive 2'),
      out.indexOf('Source 2 Title'),
      out.indexOf('Deep Dive 3'),
    ];
    for (let i = 1; i < positions.length; i++) {
      expect(positions[i]).toBeGreaterThan(positions[i - 1]);
    }
  });

  it('falls back to first source when no source is marked primary', () => {
    const sources = [makeSource(0, false), makeSource(1, false)];
    const out = renderEpubChapterBody({
      title: 'No-primary',
      authorName: 'ignored',
      publicationName: 'ignored',
      publishedAt: null,
      estimatedReadTimeMinutes: 5,
      imageHtml: '',
      bodyHtml: '<p>Body.</p>',
      affiliateHtml: '',
      topicHeaderHtml: '',
      isConsolidated: true,
      sources,
      deepDives: [],
    });
    expect(out).toContain('Author 0, Publication 0');
    expect(out).toContain('multiple sources');
  });
});
