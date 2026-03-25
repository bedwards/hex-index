/**
 * Affiliate book utilities shared between the API server and static site generator.
 *
 * Moved here from tools/static-site/utils.ts so that both src/ (rootDir "src")
 * and tools/ can import them without violating TypeScript's rootDir constraint.
 */

/**
 * Build an Amazon affiliate URL from ASIN and tag
 */
export function buildAmazonUrl(asin: string, tag: string): string {
  return `https://www.amazon.com/dp/${encodeURIComponent(asin)}?tag=${encodeURIComponent(tag)}`;
}

/**
 * Affiliate book entry from content/affiliate-books.json
 */
export interface AffiliateBook {
  asin: string;
  category: string;
  description: string;
  gutenberg_url?: string;
  archive_url?: string;
}

/**
 * Parsed affiliate book with title and author extracted from the key
 */
export interface ParsedAffiliateBook extends AffiliateBook {
  title: string;
  author: string;
}

/**
 * Load and parse the affiliate books map from content/affiliate-books.json.
 * Call once at the top of a generation run, not per-page.
 * Returns a Map keyed by lowercase book title for fast lookup.
 */
export async function loadAffiliateBooks(projectRoot: string): Promise<Map<string, ParsedAffiliateBook>> {
  const { readFile } = await import('fs/promises');
  const { join } = await import('path');
  const filePath = join(projectRoot, 'content', 'affiliate-books.json');
  try {
    const raw = await readFile(filePath, 'utf-8');
    const data = JSON.parse(raw) as Record<string, AffiliateBook>;
    const map = new Map<string, ParsedAffiliateBook>();
    for (const [key, value] of Object.entries(data)) {
      const [title, author] = key.split('|');
      if (title && author) {
        map.set(title.toLowerCase(), { ...value, title, author });
      }
    }
    return map;
  } catch {
    console.warn('Warning: Could not load affiliate-books.json');
    return new Map();
  }
}

/**
 * Render purchase links footer for a Wikipedia page about a book.
 * Subtle: small text, no heading, just links.
 * Free sources first, paid second.
 */
export function renderBookPurchaseLinks(book: ParsedAffiliateBook, affiliateTag: string): string {
  const items: string[] = [];
  const searchQuery = encodeURIComponent(`${book.title} ${book.author}`);

  // Free sources first
  if (book.gutenberg_url) {
    items.push(`<li><a href="${book.gutenberg_url}" target="_blank" rel="noopener">Project Gutenberg (free)</a></li>`);
  }
  if (book.archive_url) {
    items.push(`<li><a href="${book.archive_url}" target="_blank" rel="noopener">Internet Archive (free)</a></li>`);
  }

  // Paid sources
  if (affiliateTag) {
    items.push(`<li><a href="${buildAmazonUrl(book.asin, affiliateTag)}" target="_blank" rel="noopener sponsored">Amazon (ebook) <small class="affiliate-disclosure">affiliate</small></a></li>`);
  }
  items.push(`<li><a href="https://www.kobo.com/search?query=${searchQuery}" target="_blank" rel="noopener">Kobo (ebook)</a></li>`);
  items.push(`<li><a href="https://www.betterworldbooks.com/search/results?q=${searchQuery}" target="_blank" rel="noopener">Better World Books</a></li>`);

  return `
    <footer class="book-links">
      <ul>
        ${items.join('\n        ')}
      </ul>
    </footer>
  `;
}
