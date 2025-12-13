/**
 * Tests for RSS/Atom feed parser
 */

import { describe, it, expect } from 'vitest';
import { parseFeed, extractTextContent, estimateReadTime, countWords } from './parser.js';

describe('parseFeed', () => {
  it('parses RSS 2.0 feed', () => {
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Test Publication</title>
        <description>A test publication</description>
        <link>https://test.substack.com</link>
        <item>
          <title>Test Article</title>
          <link>https://test.substack.com/p/test-article</link>
          <pubDate>Mon, 13 Dec 2025 12:00:00 GMT</pubDate>
          <dc:creator>Test Author</dc:creator>
          <description>This is a summary.</description>
          <content:encoded><![CDATA[<p>This is the full content.</p>]]></content:encoded>
        </item>
      </channel>
    </rss>`;

    const feed = parseFeed(rssXml, 'https://test.substack.com/feed');

    expect(feed.title).toBe('Test Publication');
    expect(feed.description).toBe('A test publication');
    expect(feed.link).toBe('https://test.substack.com');
    expect(feed.items).toHaveLength(1);

    const item = feed.items[0];
    expect(item.title).toBe('Test Article');
    expect(item.url).toBe('https://test.substack.com/p/test-article');
    expect(item.author).toBe('Test Author');
    expect(item.summary).toBe('This is a summary.');
    expect(item.contentHtml).toContain('This is the full content.');
  });

  it('parses Atom feed', () => {
    const atomXml = `<?xml version="1.0" encoding="UTF-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>Test Publication</title>
      <subtitle>A test publication</subtitle>
      <link href="https://test.substack.com" rel="alternate"/>
      <link href="https://test.substack.com/feed" rel="self"/>
      <author><name>Test Author</name></author>
      <entry>
        <title>Test Article</title>
        <link href="https://test.substack.com/p/test-article" rel="alternate"/>
        <published>2025-12-13T12:00:00Z</published>
        <author><name>Entry Author</name></author>
        <summary>This is a summary.</summary>
        <content type="html"><![CDATA[<p>This is the full content.</p>]]></content>
      </entry>
    </feed>`;

    const feed = parseFeed(atomXml, 'https://test.substack.com/feed');

    expect(feed.title).toBe('Test Publication');
    expect(feed.description).toBe('A test publication');
    expect(feed.link).toBe('https://test.substack.com');
    expect(feed.items).toHaveLength(1);

    const item = feed.items[0];
    expect(item.title).toBe('Test Article');
    expect(item.url).toBe('https://test.substack.com/p/test-article');
    expect(item.author).toBe('Entry Author');
    expect(item.summary).toBe('This is a summary.');
    expect(item.contentHtml).toContain('This is the full content.');
  });

  it('throws on unknown feed format', () => {
    const invalidXml = `<?xml version="1.0"?><unknown><data/></unknown>`;
    expect(() => parseFeed(invalidXml, 'https://test.com/feed')).toThrow('Unknown feed format');
  });

  it('extracts image from enclosure', () => {
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Test</title>
        <link>https://test.substack.com</link>
        <item>
          <title>Article with Image</title>
          <link>https://test.substack.com/p/test</link>
          <pubDate>Mon, 13 Dec 2025 12:00:00 GMT</pubDate>
          <dc:creator>Author</dc:creator>
          <enclosure url="https://example.com/image.jpg" type="image/jpeg"/>
        </item>
      </channel>
    </rss>`;

    const feed = parseFeed(rssXml, 'https://test.substack.com/feed');
    expect(feed.items[0].imageUrl).toBe('https://example.com/image.jpg');
  });

  it('extracts image from media:content', () => {
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
      <channel>
        <title>Test</title>
        <link>https://test.substack.com</link>
        <item>
          <title>Article with Media</title>
          <link>https://test.substack.com/p/test</link>
          <pubDate>Mon, 13 Dec 2025 12:00:00 GMT</pubDate>
          <dc:creator>Author</dc:creator>
          <media:content url="https://example.com/media.jpg" medium="image"/>
        </item>
      </channel>
    </rss>`;

    const feed = parseFeed(rssXml, 'https://test.substack.com/feed');
    expect(feed.items[0].imageUrl).toBe('https://example.com/media.jpg');
  });
});

describe('extractTextContent', () => {
  it('strips HTML tags', () => {
    const html = '<p>Hello <strong>world</strong>!</p>';
    expect(extractTextContent(html)).toBe('Hello world!');
  });

  it('decodes HTML entities', () => {
    const html = '&amp; &lt; &gt; &quot; &#39;';
    expect(extractTextContent(html)).toBe('& < > " \'');
  });

  it('normalizes whitespace', () => {
    const html = '  Hello   \n\n  world  ';
    expect(extractTextContent(html)).toBe('Hello world');
  });
});

describe('estimateReadTime', () => {
  it('estimates read time for short content', () => {
    const shortHtml = '<p>' + 'word '.repeat(100) + '</p>';
    expect(estimateReadTime(shortHtml)).toBe(1); // 100 words = 0.5 min, rounded up to 1
  });

  it('estimates read time for longer content', () => {
    const longHtml = '<p>' + 'word '.repeat(600) + '</p>';
    expect(estimateReadTime(longHtml)).toBe(3); // 600 words = 3 min
  });
});

describe('countWords', () => {
  it('counts words in HTML', () => {
    const html = '<p>This is a <strong>test</strong> with some words.</p>';
    expect(countWords(html)).toBe(7);
  });

  it('handles empty content', () => {
    expect(countWords('')).toBe(0);
    expect(countWords('<p></p>')).toBe(0);
  });
});
