/**
 * Tests for markdown converter
 */

import { describe, it, expect } from 'vitest';
import {
  htmlToMarkdown,
  extractLinks,
  generateFrontmatter,
  slugify,
  convertFeedItem,
  generateMarkdownFile,
} from './converter.js';
import { FeedItem } from '../feed/types.js';

describe('htmlToMarkdown', () => {
  it('converts paragraphs', () => {
    const html = '<p>Hello world</p>';
    expect(htmlToMarkdown(html)).toBe('Hello world');
  });

  it('converts headings', () => {
    const html = '<h1>Title</h1><h2>Subtitle</h2><h3>Section</h3>';
    const md = htmlToMarkdown(html);
    expect(md).toContain('# Title');
    expect(md).toContain('## Subtitle');
    expect(md).toContain('### Section');
  });

  it('converts bold and italic', () => {
    const html = '<p><strong>bold</strong> and <em>italic</em></p>';
    const md = htmlToMarkdown(html);
    expect(md).toContain('**bold**');
    expect(md).toContain('*italic*');
  });

  it('converts links', () => {
    const html = '<p>Check out <a href="https://example.com">this link</a></p>';
    const md = htmlToMarkdown(html);
    expect(md).toContain('[this link](https://example.com)');
  });

  it('converts lists', () => {
    const html = '<ul><li>Item 1</li><li>Item 2</li></ul>';
    const md = htmlToMarkdown(html);
    // Turndown adds some spacing, so check for the essential parts
    expect(md).toMatch(/-\s+Item 1/);
    expect(md).toMatch(/-\s+Item 2/);
  });

  it('converts code blocks', () => {
    const html = '<pre><code class="language-javascript">const x = 1;</code></pre>';
    const md = htmlToMarkdown(html);
    expect(md).toContain('```javascript');
    expect(md).toContain('const x = 1;');
    expect(md).toContain('```');
  });

  it('removes empty paragraphs', () => {
    const html = '<p>Hello</p><p></p><p>World</p>';
    const md = htmlToMarkdown(html);
    expect(md).not.toMatch(/\n{4,}/);
  });
});

describe('extractLinks', () => {
  it('extracts links from HTML', () => {
    const html = '<p>Check out <a href="https://example.com">this link</a></p>';
    const links = extractLinks(html, 'https://test.substack.com/p/article');

    expect(links).toHaveLength(1);
    expect(links[0].url).toBe('https://example.com');
    expect(links[0].text).toBe('this link');
    expect(links[0].type).toBe('external');
  });

  it('categorizes internal links', () => {
    const html = '<a href="https://test.substack.com/p/other-article">link</a>';
    const links = extractLinks(html, 'https://test.substack.com/p/article');

    expect(links[0].type).toBe('internal');
  });

  it('categorizes cross-publication links', () => {
    const html = '<a href="https://other.substack.com/p/article">link</a>';
    const links = extractLinks(html, 'https://test.substack.com/p/article');

    expect(links[0].type).toBe('cross-publication');
    expect(links[0].targetSlug).toBe('other/article');
  });

  it('ignores mailto and anchor links', () => {
    const html = '<a href="mailto:test@test.com">email</a><a href="#section">anchor</a>';
    const links = extractLinks(html, 'https://test.substack.com/p/article');

    expect(links).toHaveLength(0);
  });
});

describe('generateFrontmatter', () => {
  it('generates valid YAML frontmatter', () => {
    const metadata = {
      title: 'Test Article',
      author: 'Test Author',
      publication: 'Test Publication',
      publication_slug: 'test-publication',
      published_at: '2025-12-13T00:00:00.000Z',
      source_url: 'https://test.substack.com/p/test-article',
      word_count: 1000,
      estimated_read_time: 5,
    };

    const frontmatter = generateFrontmatter(metadata);

    expect(frontmatter).toContain('---');
    expect(frontmatter).toContain('title: "Test Article"');
    expect(frontmatter).toContain('author: "Test Author"');
    expect(frontmatter).toContain('word_count: 1000');
    expect(frontmatter).toContain('estimated_read_time: 5');
  });

  it('escapes special characters in strings', () => {
    const metadata = {
      title: 'Article: "With Quotes"',
      author: 'Author',
      publication: 'Pub',
      publication_slug: 'pub',
      published_at: '2025-12-13T00:00:00.000Z',
      source_url: 'https://test.substack.com/p/test',
      word_count: 100,
      estimated_read_time: 1,
    };

    const frontmatter = generateFrontmatter(metadata);
    expect(frontmatter).toContain('title: "Article: \\"With Quotes\\""');
  });

  it('includes tags when present', () => {
    const metadata = {
      title: 'Test',
      author: 'Author',
      publication: 'Pub',
      publication_slug: 'pub',
      published_at: '2025-12-13T00:00:00.000Z',
      source_url: 'https://test.substack.com/p/test',
      word_count: 100,
      estimated_read_time: 1,
      tags: { topic: 'economics', subtopic: 'inflation' },
    };

    const frontmatter = generateFrontmatter(metadata);
    expect(frontmatter).toContain('tags:');
    expect(frontmatter).toContain('topic: "economics"');
    expect(frontmatter).toContain('subtopic: "inflation"');
  });
});

describe('slugify', () => {
  it('converts title to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify("Hello, World! It's great")).toBe('hello-world-its-great');
  });

  it('handles multiple spaces and dashes', () => {
    expect(slugify('Hello   World---Test')).toBe('hello-world-test');
  });

  it('truncates long titles', () => {
    const longTitle = 'a'.repeat(150);
    expect(slugify(longTitle).length).toBeLessThanOrEqual(100);
  });
});

describe('htmlToMarkdown - Substack-specific', () => {
  it('converts figcaption to italic', () => {
    const html = '<figure><img src="test.jpg"/><figcaption>Image caption</figcaption></figure>';
    const md = htmlToMarkdown(html);
    expect(md).toContain('*Image caption*');
  });

  it('handles empty figcaption', () => {
    const html = '<figure><img src="test.jpg"/><figcaption></figcaption></figure>';
    const md = htmlToMarkdown(html);
    // Should not contain empty italic markers
    expect(md).not.toContain('**');
  });

  it('removes subscribe widgets', () => {
    const html = '<p>Content</p><div class="subscribe-widget">Subscribe!</div><p>More</p>';
    const md = htmlToMarkdown(html);
    expect(md).not.toContain('Subscribe');
    expect(md).toContain('Content');
    expect(md).toContain('More');
  });

  it('removes subscription widgets', () => {
    const html = '<p>Content</p><div class="subscription-widget">Sign up</div>';
    const md = htmlToMarkdown(html);
    expect(md).not.toContain('Sign up');
  });

  it('removes button wrappers', () => {
    const html = '<p>Content</p><div class="button-wrapper">Click me</div>';
    const md = htmlToMarkdown(html);
    expect(md).not.toContain('Click me');
  });
});

describe('extractLinks - edge cases', () => {
  it('handles invalid URLs as external', () => {
    const html = '<a href="not-a-valid-url">link</a>';
    const links = extractLinks(html, 'https://test.substack.com/p/article');

    expect(links).toHaveLength(1);
    expect(links[0].type).toBe('external');
  });

  it('ignores javascript links', () => {
    const html = '<a href="javascript:void(0)">click</a>';
    const links = extractLinks(html, 'https://test.substack.com/p/article');

    expect(links).toHaveLength(0);
  });
});

describe('convertFeedItem', () => {
  it('converts a feed item to ConvertedArticle', () => {
    const item: FeedItem = {
      title: 'Test Article',
      url: 'https://test.substack.com/p/test-article',
      author: 'Test Author',
      publishedAt: new Date('2025-01-15T12:00:00Z'),
      contentHtml: '<p>This is <strong>test</strong> content with a <a href="https://example.com">link</a>.</p>',
    };

    const result = convertFeedItem(item, { name: 'Test Pub', slug: 'test-pub' });

    expect(result.metadata.title).toBe('Test Article');
    expect(result.metadata.author).toBe('Test Author');
    expect(result.metadata.publication).toBe('Test Pub');
    expect(result.metadata.publication_slug).toBe('test-pub');
    expect(result.metadata.published_at).toBe('2025-01-15T12:00:00.000Z');
    expect(result.metadata.source_url).toBe('https://test.substack.com/p/test-article');
    expect(result.metadata.word_count).toBeGreaterThan(0);
    expect(result.metadata.estimated_read_time).toBeGreaterThanOrEqual(1);
    expect(result.markdown).toContain('**test**');
    expect(result.links).toHaveLength(1);
    expect(result.links[0].url).toBe('https://example.com');
  });
});

describe('generateMarkdownFile', () => {
  it('combines frontmatter and markdown content', () => {
    const article = {
      metadata: {
        title: 'Test',
        author: 'Author',
        publication: 'Pub',
        publication_slug: 'pub',
        published_at: '2025-01-15T00:00:00.000Z',
        source_url: 'https://test.substack.com/p/test',
        word_count: 100,
        estimated_read_time: 1,
      },
      markdown: 'This is the article content.',
      links: [],
    };

    const output = generateMarkdownFile(article);

    expect(output).toContain('---');
    expect(output).toContain('title: "Test"');
    expect(output).toContain('This is the article content.');
    // Frontmatter should be followed by blank line then content
    expect(output).toMatch(/---\n\nThis is the article content\./);
  });
});
