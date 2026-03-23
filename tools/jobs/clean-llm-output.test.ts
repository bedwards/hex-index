import { describe, expect, it } from 'vitest';
import { cleanPreamble, cleanHtml } from './clean-llm-output.js';

describe('cleanPreamble', () => {
  it('strips think tags', () => {
    expect(cleanPreamble('<think>reasoning</think>actual content')).toBe('actual content');
  });

  it('strips JSON wrapper {"content": "..."}', () => {
    expect(cleanPreamble('{"content": "Hello world"}')).toBe('Hello world');
  });

  it('strips multi-key JSON with title/author/body', () => {
    const input = '{"title": "Test", "author": "Author", "body": "Actual content here"}';
    expect(cleanPreamble(input)).toBe('Actual content here');
  });

  it('strips Wikipedia URL-keyed JSON', () => {
    const input = '{"https://en.wikipedia.org/wiki/Test": "Essay text here"}';
    expect(cleanPreamble(input)).toBe('Essay text here');
  });

  it('strips trailing ```json blocks', () => {
    const input = 'Good content here. ```json {"commentary": "stuff"}```';
    expect(cleanPreamble(input)).toBe('Good content here.');
  });

  it('strips LLM preamble', () => {
    expect(cleanPreamble("Here's the rewritten article:\n\nActual content")).toBe('Actual content');
  });

  it('strips XML parameter tags', () => {
    expect(cleanPreamble('content</parameter>')).toBe('content');
  });

  it('strips LLM self-reference', () => {
    expect(cleanPreamble('Good content.\nI should verify this is complete.')).toBe('Good content.');
  });

  it('strips leading markdown title', () => {
    expect(cleanPreamble('## Title\n\nContent here')).toBe('Content here');
  });

  it('preserves clean content unchanged', () => {
    const clean = 'This is a perfectly clean essay about history.\n\n## Section Two\n\nMore content here.';
    expect(cleanPreamble(clean)).toBe(clean);
  });
});

describe('cleanHtml', () => {
  it('strips JSON wrapper from first paragraph', () => {
    const input = '<p>{"title": "Test", "author": "Author", "body": "## Actual Content</p>';
    const { cleaned, changed } = cleanHtml(input);
    expect(changed).toBe(true);
    expect(cleaned).toBe('<p>## Actual Content</p>');
  });

  it('strips nested JSON wrapper {"": {"title": ...}}', () => {
    const input = '<p>{"": {"title": "Test", "body": "## Content</p>';
    const { cleaned, changed } = cleanHtml(input);
    expect(changed).toBe(true);
    expect(cleaned).toBe('<p>## Content</p>');
  });

  it('strips trailing "}} from paragraphs', () => {
    const input = '<p>Good content here.&quot;}}</p>';
    const { cleaned, changed } = cleanHtml(input);
    expect(changed).toBe(true);
    expect(cleaned).toBe('<p>Good content here.</p>');
  });

  it('strips wiki URL JSON wrapper', () => {
    const input = '<p class="source-note">note</p>\n<p>{&quot;https://en.wikipedia.org/wiki/Test&quot;: &quot;Essay content&quot;}</p>';
    const { cleaned, changed } = cleanHtml(input);
    expect(changed).toBe(true);
    expect(cleaned).toContain('Essay content');
    expect(cleaned).not.toContain('https://en.wikipedia.org');
  });

  it('strips LLM self-reference paragraphs', () => {
    const input = '<p>Good content.</p>\n<p>I should verify the content is comprehensive before finalizing.</p>';
    const { cleaned, changed } = cleanHtml(input);
    expect(changed).toBe(true);
    expect(cleaned).toBe('<p>Good content.</p>');
  });

  it('strips verification checklists', () => {
    const input = '<p>Good content.</p>\n<p>1. Birth/death: ✓ 2. Key fact: ✓</p>';
    const { cleaned, changed } = cleanHtml(input);
    expect(changed).toBe(true);
    expect(cleaned).toBe('<p>Good content.</p>');
  });

  it('strips <p>---</p> separators', () => {
    const input = '<p>Content before.</p>\n<p>---</p>\n<p>Content after.</p>';
    const { cleaned, changed } = cleanHtml(input);
    expect(changed).toBe(true);
    expect(cleaned).not.toContain('<p>---</p>');
    expect(cleaned).toContain('Content before');
    expect(cleaned).toContain('Content after');
  });

  it('strips CJK garble from English text', () => {
    const input = '<p>This is the核心 of the argument.</p>';
    const { cleaned, changed } = cleanHtml(input);
    expect(changed).toBe(true);
    expect(cleaned).toBe('<p>This is the of the argument.</p>');
  });

  it('does not change clean content', () => {
    const clean = '<p>This is perfectly clean content.</p>\n<h2>Section</h2>\n<p>More content here.</p>';
    const { cleaned, changed } = cleanHtml(clean);
    expect(changed).toBe(false);
    expect(cleaned).toBe(clean);
  });

  it('strips XML parameter tags', () => {
    const input = '<p>content&lt;/parameter&gt;</p>';
    const { cleaned, changed } = cleanHtml(input);
    expect(changed).toBe(true);
    expect(cleaned).toBe('<p>content</p>');
  });

  it('strips &lt;ctrl&gt; artifacts', () => {
    const input = '<p>content&lt;ctrl&gt;more content</p>';
    const { cleaned, changed } = cleanHtml(input);
    expect(changed).toBe(true);
    expect(cleaned).toBe('<p>contentmore content</p>');
  });

  it('strips placeholder text paragraphs', () => {
    const input = '<p>{&quot;your adapted article text here&quot;}**</p>\n<p>Real content.</p>';
    const { cleaned, changed } = cleanHtml(input);
    expect(changed).toBe(true);
    expect(cleaned).toBe('<p>Real content.</p>');
  });
});
