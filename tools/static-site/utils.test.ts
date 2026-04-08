import { describe, expect, it } from 'vitest';
import { cleanTranscript, escapeHtml, formatDate, extractExcerpt, extractHtmlExcerpt, relativePath, estimateReadTime, slugify } from './utils.js';

describe('cleanTranscript', () => {
  it('removes >> speaker change markers', () => {
    expect(cleanTranscript('>> So today we are talking about AI.')).toBe(
      'So today we are talking about AI.'
    );
  });

  it('removes multiple >> markers', () => {
    expect(cleanTranscript('>> Hello >> World')).toBe('Hello World');
  });

  it('strips filler words: um, uh, ah, er', () => {
    expect(cleanTranscript('Um, this is important')).toBe('this is important');
    expect(cleanTranscript('So uh the thing is')).toBe('So the thing is');
    expect(cleanTranscript('And ah we moved on')).toBe('And we moved on');
    expect(cleanTranscript('It was, er, complicated')).toBe('It was, complicated');
  });

  it('strips "uh huh"', () => {
    expect(cleanTranscript('Uh huh, that makes sense')).toBe('that makes sense');
  });

  it('collapses stuttered/repeated words', () => {
    expect(cleanTranscript('the the the thing')).toBe('the thing');
    expect(cleanTranscript('I I think so')).toBe('I think so');
    expect(cleanTranscript('we we we need to go')).toBe('we need to go');
  });

  it('removes bracketed annotations', () => {
    expect(cleanTranscript('Hello [Music] world')).toBe('Hello world');
    expect(cleanTranscript('[Laughter] That was funny')).toBe('That was funny');
    expect(cleanTranscript('And then [Applause] thank you')).toBe('And then thank you');
    expect(cleanTranscript('[FOREIGN] Some text')).toBe('Some text');
    expect(cleanTranscript('Text [Background noise] more')).toBe('Text more');
  });

  it('normalizes whitespace', () => {
    expect(cleanTranscript('too   many    spaces')).toBe('too many spaces');
    expect(cleanTranscript('  leading and trailing  ')).toBe('leading and trailing');
  });

  it('cleans double punctuation from removals', () => {
    expect(cleanTranscript('Hello,, world')).toBe('Hello, world');
    expect(cleanTranscript('End.. Start')).toBe('End. Start');
  });

  it('handles combined artifacts in a realistic transcript', () => {
    const input = '>> Um, so the the thing is, uh, we need to [Music] figure this out.';
    const result = cleanTranscript(input);
    expect(result).toBe('so the thing is, we need to figure this out.');
  });

  it('returns empty string for empty input', () => {
    expect(cleanTranscript('')).toBe('');
  });

  it('preserves clean text unchanged', () => {
    const clean = 'This is a perfectly clean sentence with no artifacts.';
    expect(cleanTranscript(clean)).toBe(clean);
  });

  it('preserves HTML tags', () => {
    const input = '<p>Um, this is <strong>important</strong></p>';
    const result = cleanTranscript(input);
    expect(result).toBe('<p>this is <strong>important</strong></p>');
  });

  it('does not corrupt long bracket spans', () => {
    // Brackets over 40 chars should be preserved (not transcript annotations)
    const longBracket = '[This is a very long bracket span that exceeds forty characters and should stay]';
    expect(cleanTranscript(longBracket)).toBe(longBracket);
  });
});

describe('escapeHtml', () => {
  it('escapes all special characters', () => {
    expect(escapeHtml('<div class="test">&\'value\'')).toBe(
      '&lt;div class=&quot;test&quot;&gt;&amp;&#039;value&#039;'
    );
  });

  it('returns plain text unchanged', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });
});

describe('formatDate', () => {
  it('formats a date string', () => {
    const result = formatDate('2026-03-15T00:00:00Z');
    expect(result).toContain('Mar');
    expect(result).toContain('2026');
  });

  it('returns empty string for null', () => {
    expect(formatDate(null)).toBe('');
  });
});

describe('extractExcerpt', () => {
  it('returns full text when under word limit', () => {
    expect(extractExcerpt('<p>Hello world</p>', 10)).toBe('Hello world');
  });

  it('strips HTML tags and decodes entities', () => {
    expect(extractExcerpt('<p>A &amp; B</p>')).toBe('A & B');
  });

  it('truncates at sentence boundary when possible', () => {
    const long = '<p>' + Array(300).fill('word').join(' ') + '. More words here.</p>';
    const result = extractExcerpt(long, 200);
    expect(result.length).toBeLessThan(long.length);
  });

  it('strips script and style tags', () => {
    expect(extractExcerpt('<script>alert("x")</script><p>Hello</p>')).toBe('Hello');
  });
});

describe('extractHtmlExcerpt', () => {
  it('strips bold/strong — excerpts are plain prose', () => {
    const html = '<p>Hello <strong>bold</strong> world</p>';
    const result = extractHtmlExcerpt(html, 100);
    expect(result).toContain('Hello bold world');
    expect(result).not.toContain('<strong>');
  });

  it('strips italics — no em/i', () => {
    const html = '<p>Hello <em>stress</em> world</p>';
    const result = extractHtmlExcerpt(html, 100);
    expect(result).toContain('Hello stress world');
    expect(result).not.toContain('<em>');
  });

  it('dissolves section headings into text', () => {
    const html = '<h2>Section Title</h2><p>Body.</p>';
    const result = extractHtmlExcerpt(html, 100);
    expect(result).not.toContain('<h2>');
    expect(result).toContain('Section Title');
  });

  it('strips <a> tags', () => {
    const html = '<p>See <a href="http://example.com">the link</a> here</p>';
    const result = extractHtmlExcerpt(html, 100);
    expect(result).not.toContain('<a');
    expect(result).toContain('the link');
  });

  it('strips horizontal rules and lists', () => {
    const html = '<p>A</p><hr/><ul><li>one</li><li>two</li></ul><p>B</p>';
    const result = extractHtmlExcerpt(html, 100);
    expect(result).not.toContain('<hr');
    expect(result).not.toContain('<ul');
    expect(result).not.toContain('<li');
  });

  it('closes unclosed <p> tags after truncation', () => {
    const words = Array(20).fill('word').join(' ');
    const html = `<p>${words}</p>`;
    const result = extractHtmlExcerpt(html, 5);
    expect(result).toContain('</p>');
  });

  it('strips scripts, styles, and nav elements', () => {
    const html = '<nav>Nav</nav><script>x</script><p>Content</p>';
    const result = extractHtmlExcerpt(html, 100);
    expect(result).not.toContain('Nav');
    expect(result).toContain('Content');
  });

  it('adds ellipsis when truncated', () => {
    const words = Array(20).fill('word').join(' ');
    const html = `<p>${words}</p>`;
    const result = extractHtmlExcerpt(html, 5);
    expect(result).toContain('...');
  });

  // Regression for PR #495: heading-to-paragraph conversion left a dangling
  // <p> open, producing <p>Heading. <p>next</p></p> in rendered articles.
  it('does not nest <p> inside <p> when a heading is followed by a paragraph', () => {
    const html = '<h1>No Save Point</h1><p>Shashank Joshi: hello</p>';
    const result = extractHtmlExcerpt(html, 100);
    expect(result).not.toMatch(/<p>[^<]*<p>/);
    expect(result).toContain('No Save Point');
    expect(result).toContain('Shashank Joshi');
  });

  // Regression for PR #495: Substack mention-wrap widgets store the visible
  // name only inside data-attrs JSON. Stripping the span without recovering
  // the name produced ", , and" double-comma artifacts.
  it('recovers names from Substack mention-wrap data-attrs', () => {
    const html = '<p>Joshi of The Economist, <span class="mention-wrap" data-attrs="{&quot;name&quot;:&quot;Justin Mc&quot;}"></span>, and <span class="mention-wrap" data-attrs="{&quot;name&quot;:&quot;Tony Stark&quot;}"></span> drop in.</p>';
    const result = extractHtmlExcerpt(html, 100);
    expect(result).toContain('Justin Mc');
    expect(result).toContain('Tony Stark');
    expect(result).not.toMatch(/,\s*,/);
  });

  it('collapses double commas left by stripped widgets without recoverable names', () => {
    const html = '<p>Foo, <span class="mention-wrap" data-attrs="{}"></span>, and bar drop in.</p>';
    const result = extractHtmlExcerpt(html, 100);
    expect(result).not.toMatch(/,\s*,/);
  });
});

describe('extractHtmlExcerpt — escapeHtml on URLs (PR #495)', () => {
  it('renderSourceExcerpt escapes quote-bearing URLs', async () => {
    const { renderSourceExcerpt } = await import('./templates.js');
    const html = renderSourceExcerpt(
      {
        articleId: 'a',
        title: 'T',
        author: 'A',
        publicationName: 'P',
        publicationSlug: 'p',
        originalUrl: 'https://example.com/a"><script>alert(1)</script>',
        excerptHtml: '',
        isPrimary: true,
        position: 0,
      },
      '../../'
    );
    // The raw quote/script must not appear unescaped in the output
    expect(html).not.toContain('"><script>');
    expect(html).toContain('&quot;');
  });
});

describe('relativePath', () => {
  it('computes relative path between sibling directories', () => {
    expect(relativePath('article/index.html', 'about/index.html')).toBe('../about/index.html');
  });

  it('returns ./ for same directory', () => {
    expect(relativePath('index.html', '')).toBe('./');
  });
});

describe('estimateReadTime', () => {
  it('returns at least 1 minute', () => {
    expect(estimateReadTime('short')).toBe(1);
  });

  it('estimates based on 200 words per minute', () => {
    const text = Array(400).fill('word').join(' ');
    expect(estimateReadTime(text)).toBe(2);
  });

  it('strips HTML tags before counting', () => {
    const text = '<p>' + Array(400).fill('word').join(' ') + '</p>';
    expect(estimateReadTime(text)).toBe(2);
  });
});

describe('slugify', () => {
  it('converts to lowercase kebab-case', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('strips special characters', () => {
    expect(slugify('Hello! @World#')).toBe('hello-world');
  });

  it('collapses multiple hyphens', () => {
    expect(slugify('a  --  b')).toBe('a-b');
  });
});
