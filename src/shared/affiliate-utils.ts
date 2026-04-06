/**
 * Affiliate book utilities shared between the API server and static site generator.
 *
 * Uses ISBN-10 for Amazon links and ISBN-13 for Better World Books links.
 * ISBNs are resolved via the Open Library API at suggest time.
 */

/**
 * Build an Amazon affiliate URL from ISBN-10 and tag.
 * Uses Amazon search rather than /dp/ direct ASIN because Qwen-suggested ISBN-10s
 * often don't map to a live Amazon ASIN (reissues, Kindle editions, out-of-print
 * hardcovers) — /dp/ returns 404 in those cases, while /s?k= always finds the
 * book by ISBN search.
 */
export function buildAmazonUrl(isbn10: string, tag: string): string {
  return `https://www.amazon.com/s?k=${encodeURIComponent(isbn10)}&i=stripbooks&tag=${encodeURIComponent(tag)}`;
}

/**
 * Build a Better World Books URL from ISBN-13.
 */
export function buildBWBUrl(isbn13: string): string {
  return `https://www.betterworldbooks.com/product/detail/${encodeURIComponent(isbn13)}`;
}

/**
 * Affiliate book entry
 */
export interface AffiliateBook {
  title: string;
  author: string;
  isbn10: string;
  isbn13: string;
  category: string;
  description: string;
  gutenberg_url?: string;
  archive_url?: string;
}

/**
 * Alias kept for backward compatibility
 */
export type ParsedAffiliateBook = AffiliateBook;

/**
 * Load affiliate books from the database.
 * Returns a Map keyed by lowercase book title for fast lookup.
 */
export async function loadAffiliateBooks(pool: import('pg').Pool): Promise<Map<string, ParsedAffiliateBook>> {
  const map = new Map<string, ParsedAffiliateBook>();
  try {
    const { rows } = await pool.query<{
      title: string;
      author: string;
      isbn10: string;
      isbn13: string;
      category: string;
      description: string | null;
      gutenberg_url: string | null;
      archive_url: string | null;
    }>('SELECT title, author, isbn10, isbn13, category, description, gutenberg_url, archive_url FROM app.affiliate_books ORDER BY title');

    for (const row of rows) {
      map.set(row.title.toLowerCase(), {
        isbn10: row.isbn10,
        isbn13: row.isbn13,
        category: row.category,
        description: row.description ?? '',
        gutenberg_url: row.gutenberg_url ?? undefined,
        archive_url: row.archive_url ?? undefined,
        title: row.title,
        author: row.author,
      });
    }
  } catch {
    console.warn('Warning: Could not load affiliate books from database (table may not exist yet)');
  }
  return map;
}

/**
 * Render purchase links footer for a Wikipedia page about a book.
 * Free sources first, then Amazon (affiliate) and Better World Books.
 */
export function renderBookPurchaseLinks(book: ParsedAffiliateBook, affiliateTag: string): string {
  const items: string[] = [];

  // Free sources first
  if (book.gutenberg_url) {
    items.push(`<li><a href="${book.gutenberg_url}" target="_blank" rel="noopener">Project Gutenberg (free)</a></li>`);
  }
  if (book.archive_url) {
    items.push(`<li><a href="${book.archive_url}" target="_blank" rel="noopener">Internet Archive (free)</a></li>`);
  }

  // Paid sources: Amazon + Better World Books
  if (affiliateTag && book.isbn10) {
    items.push(`<li><a href="${buildAmazonUrl(book.isbn10, affiliateTag)}" target="_blank" rel="noopener sponsored">Amazon <small class="affiliate-disclosure">affiliate</small></a></li>`);
  }
  if (book.isbn13) {
    items.push(`<li><a href="${buildBWBUrl(book.isbn13)}" target="_blank" rel="noopener sponsored">Better World Books</a></li>`);
  }

  return `
    <footer class="book-links">
      <ul>
        ${items.join('\n        ')}
      </ul>
    </footer>
  `;
}
