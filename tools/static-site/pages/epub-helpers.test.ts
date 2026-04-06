import { describe, expect, it } from 'vitest';
import { truncateDeepDive } from './epub-helpers.js';

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
