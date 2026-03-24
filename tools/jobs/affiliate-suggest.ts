/**
 * Job: Affiliate book suggestions
 *
 * Focused, single-purpose job:
 *   1. Finds articles/wikipedia with rewrites but no affiliate links
 *   2. Short LLM call: title + summary → 1-3 book suggestions (title + author only)
 *   3. Deterministic ASIN lookup from curated content/affiliate-books.json
 *   4. Stores matched books in affiliate_links JSONB
 *
 * The LLM does NOT generate ASINs — only book titles and authors.
 * ASINs come exclusively from the curated mapping file.
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { generateText } from '../../src/wikipedia/ollama.js';
import type { AffiliateLink } from '../../src/db/types.js';

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : 30;
const wikiOnly = args.includes('--wiki-only');
const articlesOnly = args.includes('--articles-only');

// ── Book mapping ────────────────────────────────────────────────────

interface BookEntry {
  asin: string;
  category: string;
  description: string;
}

type BookMap = Record<string, BookEntry>;

async function loadBookMap(): Promise<BookMap> {
  const mapPath = join(process.cwd(), 'content', 'affiliate-books.json');
  try {
    const raw = await readFile(mapPath, 'utf-8');
    return JSON.parse(raw) as BookMap;
  } catch {
    console.info('Warning: content/affiliate-books.json not found or invalid');
    return {};
  }
}

/**
 * Look up a book suggestion in the curated map.
 * Tries exact match first, then fuzzy title-only match.
 */
function lookupBook(
  bookMap: BookMap,
  title: string,
  author: string
): (BookEntry & { title: string; author: string }) | null {
  // Exact match: "Title|Author"
  const exactKey = `${title}|${author}`;
  if (bookMap[exactKey]) {
    return { ...bookMap[exactKey], title, author };
  }

  // Fuzzy: case-insensitive match on title portion of key
  const titleLower = title.toLowerCase().trim();
  for (const [key, entry] of Object.entries(bookMap)) {
    const [mapTitle] = key.split('|');
    if (mapTitle.toLowerCase().trim() === titleLower) {
      const [, mapAuthor] = key.split('|');
      return { ...entry, title: mapTitle, author: mapAuthor ?? author };
    }
  }

  return null;
}

// ── LLM suggestion ──────────────────────────────────────────────────

interface BookSuggestion {
  title: string;
  author: string;
}

async function suggestBooks(
  articleTitle: string,
  summary: string
): Promise<BookSuggestion[]> {
  const prompt = `Article: "${articleTitle}"
Summary: ${summary}

List 1-3 books directly relevant to this article. Only well-known, real books.
Output ONLY a JSON array. No preamble.
[{"title": "Book Title", "author": "Author Name"}]`;

  const response = await generateText(prompt, {
    temperature: 0.2,
    numPredict: 300,
    timeout: 60_000,
  });

  try {
    let cleaned = response.trim();
    cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();
    const arrMatch = cleaned.match(/\[[\s\S]*\]/);
    if (arrMatch) {
      const parsed = JSON.parse(arrMatch[0]) as BookSuggestion[];
      return parsed.filter(b => b.title && b.author).slice(0, 3);
    }
  } catch { /* parse failed */ }

  return [];
}

// ── Main ────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) { throw new Error('DATABASE_URL required'); }

  const pool = new Pool({ connectionString: dbUrl });
  const bookMap = await loadBookMap();
  const bookCount = Object.keys(bookMap).length;

  if (bookCount === 0) {
    console.info('No books in content/affiliate-books.json — nothing to match against');
    await pool.end();
    return;
  }

  console.info(`Loaded ${bookCount} books from affiliate mapping`);

  try {
    let articlesProcessed = 0;
    let articlesUpdated = 0;
    let wikiProcessed = 0;
    let wikiUpdated = 0;

    // ── Articles ──────────────────────────────────────────────────
    if (!wikiOnly) {
      const { rows: articles } = await pool.query<{
        id: string;
        title: string;
        rewritten_content_path: string;
      }>(`
        SELECT id, title, rewritten_content_path
        FROM app.articles
        WHERE rewritten_content_path IS NOT NULL
          AND jsonb_array_length(affiliate_links) = 0
        ORDER BY published_at DESC NULLS LAST
        LIMIT $1
      `, [LIMIT]);

      console.info(`Found ${articles.length} articles needing affiliate links`);

      for (const article of articles) {
        articlesProcessed++;
        try {
          // Load first 300 words of rewritten content
          const contentPath = join(process.cwd(), 'library', article.rewritten_content_path);
          const html = await readFile(contentPath, 'utf-8');
          const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          const summary = text.split(/\s+/).slice(0, 300).join(' ');

          // Short LLM call — suggest books
          const suggestions = await suggestBooks(article.title, summary);

          // Deterministic lookup — only keep books in our curated map
          const links: AffiliateLink[] = [];
          for (const suggestion of suggestions) {
            const match = lookupBook(bookMap, suggestion.title, suggestion.author);
            if (match) {
              links.push({
                asin: match.asin,
                title: match.title,
                author: match.author,
                description: match.description,
                category: match.category,
              });
            }
          }

          if (links.length > 0) {
            await pool.query(
              'UPDATE app.articles SET affiliate_links = $1, updated_at = NOW() WHERE id = $2',
              [JSON.stringify(links), article.id]
            );
            articlesUpdated++;
            console.info(`  [${articlesProcessed}] ${article.title} → ${links.length} books: ${links.map(l => l.title).join(', ')}`);
          } else {
            console.info(`  [${articlesProcessed}] ${article.title} → no matches in book map`);
          }
        } catch (err) {
          console.info(`  [${articlesProcessed}] Error: ${err instanceof Error ? err.message : String(err)}`);
        }

        await new Promise(r => setTimeout(r, 500));
      }
    }

    // ── Wikipedia articles ────────────────────────────────────────
    if (!articlesOnly) {
      const { rows: wikis } = await pool.query<{
        id: string;
        title: string;
        content_path: string;
      }>(`
        SELECT id, title, content_path
        FROM app.wikipedia_articles
        WHERE status = 'complete'
          AND content_path IS NOT NULL
          AND jsonb_array_length(affiliate_links) = 0
        ORDER BY created_at DESC
        LIMIT $1
      `, [LIMIT]);

      console.info(`Found ${wikis.length} wikipedia articles needing affiliate links`);

      for (const wiki of wikis) {
        wikiProcessed++;
        try {
          const contentPath = join(process.cwd(), 'library', wiki.content_path);
          const html = await readFile(contentPath, 'utf-8');
          const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          const summary = text.split(/\s+/).slice(0, 300).join(' ');

          const suggestions = await suggestBooks(wiki.title, summary);

          const links: AffiliateLink[] = [];
          for (const suggestion of suggestions) {
            const match = lookupBook(bookMap, suggestion.title, suggestion.author);
            if (match) {
              links.push({
                asin: match.asin,
                title: match.title,
                author: match.author,
                description: match.description,
                category: match.category,
              });
            }
          }

          if (links.length > 0) {
            await pool.query(
              'UPDATE app.wikipedia_articles SET affiliate_links = $1, updated_at = NOW() WHERE id = $2',
              [JSON.stringify(links), wiki.id]
            );
            wikiUpdated++;
            console.info(`  [${wikiProcessed}] ${wiki.title} → ${links.length} books`);
          } else {
            console.info(`  [${wikiProcessed}] ${wiki.title} → no matches`);
          }
        } catch (err) {
          console.info(`  [${wikiProcessed}] Error: ${err instanceof Error ? err.message : String(err)}`);
        }

        await new Promise(r => setTimeout(r, 500));
      }
    }

    console.info(`\nDone: ${articlesUpdated}/${articlesProcessed} articles, ${wikiUpdated}/${wikiProcessed} wikipedia updated`);
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
