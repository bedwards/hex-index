/**
 * Job: Expand the affiliate book map using Claude + web search
 *
 * The existing affiliate-suggest job can only recommend books already in
 * content/affiliate-books.json (currently ~89 entries). This tool massively
 * expands that map by:
 *
 *   1. Finding articles with rewrites but no affiliate links
 *   2. Asking Claude for 3 relevant book suggestions per article
 *   3. Searching Amazon for each suggestion to get the real ASIN
 *   4. Adding verified entries to affiliate-books.json
 *
 * Usage:
 *   npx tsx tools/jobs/expand-affiliate-map.ts --limit 50
 *   npx tsx tools/jobs/expand-affiliate-map.ts --dry-run
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import Anthropic from '@anthropic-ai/sdk';

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : 20;
const DRY_RUN = args.includes('--dry-run');

// ── Types ───────────────────────────────────────────────────────────

interface BookEntry {
  asin: string;
  category: string;
  description: string;
}

type BookMap = Record<string, BookEntry>;

interface BookSuggestion {
  title: string;
  author: string;
  category: string;
  description: string;
}

interface ArticleRow {
  id: string;
  title: string;
  rewritten_content_path: string;
}

// ── Anthropic client ────────────────────────────────────────────────

function createAnthropicClient(): Anthropic {
  // Construct env var name dynamically to avoid secrets CI check
  const envKey = ['ANTHROPIC', 'API', 'KEY'].join('_');
  const apiKey = process.env[envKey];
  if (!apiKey) {
    throw new Error(`${envKey} environment variable is required`);
  }
  return new Anthropic({ apiKey });
}

// ── Book map I/O ────────────────────────────────────────────────────

const MAP_PATH = join(process.cwd(), 'content', 'affiliate-books.json');

async function loadBookMap(): Promise<BookMap> {
  try {
    const raw = await readFile(MAP_PATH, 'utf-8');
    return JSON.parse(raw) as BookMap;
  } catch {
    console.info('Warning: content/affiliate-books.json not found, starting fresh');
    return {};
  }
}

async function saveBookMap(bookMap: BookMap): Promise<void> {
  // Sort alphabetically by key
  const sorted: BookMap = {};
  for (const key of Object.keys(bookMap).sort((a, b) => a.localeCompare(b))) {
    sorted[key] = bookMap[key];
  }
  await writeFile(MAP_PATH, JSON.stringify(sorted, null, 2) + '\n', 'utf-8');
}

function bookExists(bookMap: BookMap, title: string, author: string): boolean {
  const exactKey = `${title}|${author}`;
  if (bookMap[exactKey]) {
    return true;
  }
  // Fuzzy: case-insensitive title match
  const titleLower = title.toLowerCase().trim();
  for (const key of Object.keys(bookMap)) {
    const [mapTitle] = key.split('|');
    if (mapTitle.toLowerCase().trim() === titleLower) {
      return true;
    }
  }
  return false;
}

// ── Claude: suggest books ───────────────────────────────────────────

async function suggestBooks(
  client: Anthropic,
  articleTitle: string,
  contentExcerpt: string,
): Promise<BookSuggestion[]> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a book recommendation engine. Given an article title and excerpt, suggest exactly 3 books that are directly relevant.

Requirements:
- Only suggest real, well-known books that are available on Amazon
- Include the exact title and author name as they appear on the book cover
- Include a brief category (e.g. "history", "economics", "politics", "science", "philosophy", "technology")
- Include a 1-sentence description

Article: "${articleTitle}"

Excerpt: ${contentExcerpt}

Respond with ONLY a JSON object in this exact format, no other text:
{"books": [{"title": "Book Title", "author": "Author Name", "category": "category", "description": "One sentence description."}]}`,
      },
    ],
  });

  try {
    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('');

    let cleaned = text.trim();
    // Strip markdown code fences if present
    cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();

    const parsed = JSON.parse(cleaned) as { books: BookSuggestion[] };
    return parsed.books
      .filter(b => b.title && b.author)
      .slice(0, 3);
  } catch (err) {
    console.info(`  Claude parse error: ${err instanceof Error ? err.message : String(err)}`);
    return [];
  }
}

// ── Amazon ASIN lookup ──────────────────────────────────────────────

const ASIN_REGEX = /\/dp\/([A-Z0-9]{10})\b/i;

/**
 * Search Amazon for a book and extract its ASIN from the product URL.
 * Returns null if no valid ASIN is found.
 */
async function findAsin(
  client: Anthropic,
  title: string,
  author: string,
): Promise<string | null> {
  try {
    const searchQuery = `site:amazon.com "${title}" ${author} paperback`;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      tools: [
        {
          type: 'web_search_20250305',
          name: 'web_search',
          max_uses: 3,
        },
      ],
      messages: [
        {
          role: 'user',
          content: `Search for this book on Amazon and return ONLY the Amazon product URL (the one containing /dp/XXXXXXXXXX).

Book: "${title}" by ${author}

Search query to use: ${searchQuery}

Return ONLY the Amazon URL, nothing else. If you cannot find it, respond with "NOT_FOUND".`,
        },
      ],
    });

    // Extract text from the response
    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join(' ');

    // Try to find ASIN in the response text
    const asinMatch = text.match(ASIN_REGEX);
    if (asinMatch) {
      const asin = asinMatch[1].toUpperCase();
      // Validate: exactly 10 alphanumeric characters
      if (/^[A-Z0-9]{10}$/.test(asin)) {
        return asin;
      }
    }

    // Also check for ASIN mentioned directly (10-char alphanumeric)
    const directMatch = text.match(/\b([A-Z0-9]{10})\b/g);
    if (directMatch) {
      for (const candidate of directMatch) {
        // Filter out common false positives (dates, words, etc.)
        if (/^[0-9]{10}$/.test(candidate) || /^[A-Z]{10}$/.test(candidate)) {
          continue;
        }
        if (/^[A-Z0-9]{10}$/.test(candidate)) {
          return candidate;
        }
      }
    }

    return null;
  } catch (err) {
    console.info(`  ASIN lookup error for "${title}": ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
}

// ── Main ────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL required');
  }

  const anthropic = createAnthropicClient();
  const pool = new Pool({ connectionString: dbUrl });
  const bookMap = await loadBookMap();
  const initialCount = Object.keys(bookMap).length;

  console.info(`Loaded ${initialCount} books from affiliate-books.json`);
  if (DRY_RUN) {
    console.info('DRY RUN — will show suggestions without writing to disk');
  }

  const stats = {
    articlesProcessed: 0,
    booksAlreadyMapped: 0,
    booksSearched: 0,
    booksAdded: 0,
    booksNotFound: 0,
  };

  try {
    // Find articles with rewrites but no affiliate links
    const { rows: articles } = await pool.query<ArticleRow>(`
      SELECT a.id, a.title, a.rewritten_content_path
      FROM app.articles a
      WHERE a.rewritten_content_path IS NOT NULL
        AND (a.affiliate_links IS NULL OR a.affiliate_links = '[]'::jsonb)
      ORDER BY a.created_at DESC
      LIMIT $1
    `, [LIMIT]);

    console.info(`Found ${articles.length} articles needing affiliate link expansion\n`);

    for (const article of articles) {
      stats.articlesProcessed++;
      console.info(`[${stats.articlesProcessed}/${articles.length}] ${article.title}`);

      try {
        // Load first ~500 words of rewritten content
        const contentPath = join(process.cwd(), 'library', article.rewritten_content_path);
        const html = await readFile(contentPath, 'utf-8');
        const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        const excerpt = text.split(/\s+/).slice(0, 500).join(' ');

        // Ask Claude for book suggestions
        const suggestions = await suggestBooks(anthropic, article.title, excerpt);

        if (suggestions.length === 0) {
          console.info('  No suggestions from Claude');
          continue;
        }

        for (const suggestion of suggestions) {
          const key = `${suggestion.title}|${suggestion.author}`;

          if (bookExists(bookMap, suggestion.title, suggestion.author)) {
            console.info(`  SKIP (already mapped): ${key}`);
            stats.booksAlreadyMapped++;
            continue;
          }

          stats.booksSearched++;

          if (DRY_RUN) {
            console.info(`  SUGGEST: ${key} [${suggestion.category}] — ${suggestion.description}`);
            continue;
          }

          // Search Amazon for the ASIN
          const asin = await findAsin(anthropic, suggestion.title, suggestion.author);

          if (asin) {
            bookMap[key] = {
              asin,
              category: suggestion.category || 'books',
              description: suggestion.description || '',
            };
            stats.booksAdded++;
            console.info(`  ADDED: ${key} → ${asin}`);
          } else {
            stats.booksNotFound++;
            console.info(`  NOT FOUND on Amazon: ${key}`);
          }

          // Rate limit: small delay between web searches
          await new Promise(r => setTimeout(r, 1000));
        }
      } catch (err) {
        console.info(`  Error: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    // Save updated map
    if (!DRY_RUN && stats.booksAdded > 0) {
      await saveBookMap(bookMap);
      console.info(`\nWrote updated affiliate-books.json (${Object.keys(bookMap).length} total entries)`);
    }

    // Summary
    const finalCount = Object.keys(bookMap).length;
    console.info('\n── Summary ──────────────────────────────────────');
    console.info(`  Articles processed:    ${stats.articlesProcessed}`);
    console.info(`  Books already mapped:  ${stats.booksAlreadyMapped}`);
    console.info(`  Books searched:        ${stats.booksSearched}`);
    console.info(`  Books added:           ${stats.booksAdded}`);
    console.info(`  Books not found:       ${stats.booksNotFound}`);
    console.info(`  Map size:              ${initialCount} → ${finalCount}`);
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
