import { describe, it, expect, vi, beforeEach } from 'vitest';
import { scrapeSubstackArticle, isStub, isSubstackUrl } from './substack.js';

describe('Substack Scraper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('isSubstackUrl', () => {
    it('should identify valid substack URLs', () => {
      expect(isSubstackUrl('https://example.substack.com/p/article')).toBe(true);
      expect(isSubstackUrl('https://substack.com/p/article')).toBe(true);
    });

    it('should reject non-substack URLs', () => {
      expect(isSubstackUrl('https://example.com')).toBe(false);
      expect(isSubstackUrl('https://medium.com/article')).toBe(false);
    });

    it('should handle invalid URLs', () => {
      expect(isSubstackUrl('not a url')).toBe(false);
    });
  });

  describe('isStub', () => {
    it('should detect stub content (under threshold)', () => {
      const stub = '<p>This is a short excerpt with only a few words.</p>';
      expect(isStub(stub, 200)).toBe(true);
    });

    it('should detect full content (over threshold)', () => {
      const fullContent = '<p>' + 'word '.repeat(250) + '</p>';
      expect(isStub(fullContent, 200)).toBe(false);
    });

    it('should strip HTML tags when counting', () => {
      const html = '<p><strong>One</strong> <em>two</em> <a href="#">three</a></p>';
      const words = html.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean);
      expect(words.length).toBe(3);
      expect(isStub(html, 5)).toBe(true);
    });
  });

  describe('scrapeSubstackArticle', () => {
    it('should handle timeout errors', async () => {
      // Mock fetch to timeout
      global.fetch = vi.fn(() =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new DOMException('Aborted', 'AbortError')), 100)
        )
      ) as typeof fetch;

      const result = await scrapeSubstackArticle('https://example.substack.com/p/test', {
        timeout: 50,
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Timeout');
    });

    it('should handle HTTP errors', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found',
        } as Response)
      ) as typeof fetch;

      const result = await scrapeSubstackArticle('https://example.substack.com/p/test');

      expect(result.success).toBe(false);
      expect(result.error).toContain('404');
    });

    it('should handle missing article body', async () => {
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Test</title></head>
          <body>
            <h1>No article body here</h1>
          </body>
        </html>
      `;

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve(html),
        } as Response)
      ) as typeof fetch;

      const result = await scrapeSubstackArticle('https://example.substack.com/p/test');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Could not find article body');
    });

    it('should successfully scrape article with proper structure', async () => {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Test Article - Publication Name</title>
            <meta property="og:title" content="Test Article">
            <meta property="article:published_time" content="2025-01-15T12:00:00Z">
            <meta name="author" content="John Doe">
          </head>
          <body>
            <h1 class="post-title">Test Article</h1>
            <time datetime="2025-01-15T12:00:00Z">January 15, 2025</time>
            <div class="body markup">
              <p>This is the article content with enough words to pass the stub test threshold.</p>
              <p>${'Lorem ipsum '.repeat(50)}</p>
              <div class="subscription-widget-wrap">Subscribe now!</div>
              <button>Click me</button>
            </div>
          </body>
        </html>
      `;

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve(html),
        } as Response)
      ) as typeof fetch;

      const result = await scrapeSubstackArticle('https://example.substack.com/p/test');

      expect(result.success).toBe(true);
      expect(result.title).toBe('Test Article');
      expect(result.author).toBe('John Doe');
      expect(result.publishedAt).toEqual(new Date('2025-01-15T12:00:00Z'));
      expect(result.html).toContain('article content');
      expect(result.html).not.toContain('Subscribe now');
      expect(result.html).not.toContain('<button>');
    });

    it('should enforce rate limiting', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve(`
            <!DOCTYPE html>
            <html><body><div class="body markup"><p>Content</p></div></body></html>
          `),
        } as Response)
      ) as typeof fetch;

      const start = Date.now();

      await scrapeSubstackArticle('https://example.substack.com/p/test1', {
        rateLimitDelay: 100,
      });

      await scrapeSubstackArticle('https://example.substack.com/p/test2', {
        rateLimitDelay: 100,
      });

      const elapsed = Date.now() - start;

      // Should take at least 100ms due to rate limiting
      expect(elapsed).toBeGreaterThanOrEqual(100);
    });
  });
});
