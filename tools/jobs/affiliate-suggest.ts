/**
 * Job: Affiliate book suggestions
 *
 * Two-tier affiliate link system:
 *   Tier 1 — Direct mentions (MANDATORY):
 *     Extract books/authors explicitly named in article content and Wikipedia deep dives.
 *     ISBNs resolved via Open Library API (free, no key, no rate limits).
 *
 *   Tier 2 — Curated recommendations (supplementary):
 *     Short LLM call: title + summary → 1-3 book suggestions (title + author only).
 *     ISBNs resolved via Open Library API.
 *
 * The LLM does NOT generate ISBNs — only book titles and authors.
 * ISBNs come exclusively from the Open Library API.
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
const resetMode = args.includes('--reset');
// const useClaude = args.includes('--use-claude');

// ── Open Library ISBN lookup ────────────────────────────────────────

interface OpenLibraryResult {
  isbn10: string;
  isbn13: string;
}

// Cache to avoid repeated API calls within a single run
const isbnCache = new Map<string, OpenLibraryResult | null>();

async function lookupISBN(title: string, author: string): Promise<OpenLibraryResult | null> {
  const cacheKey = `${title.toLowerCase()}|${author.toLowerCase()}`;
  if (isbnCache.has(cacheKey)) {return isbnCache.get(cacheKey)!;}

  try {
    const params = new URLSearchParams({
      title,
      author,
      limit: '3',
      fields: 'isbn,title,author_name',
    });
    const url = `https://openlibrary.org/search.json?${params}`;
    const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!response.ok) {
      console.info(`    Open Library API error: ${response.status}`);
      isbnCache.set(cacheKey, null);
      return null;
    }

    const data = await response.json() as {
      docs: Array<{ isbn?: string[]; title?: string; author_name?: string[] }>;
    };

    if (!data.docs || data.docs.length === 0) {
      isbnCache.set(cacheKey, null);
      return null;
    }

    // Find the first doc with ISBNs
    for (const doc of data.docs) {
      if (!doc.isbn || doc.isbn.length === 0) {continue;}

      let isbn10 = '';
      let isbn13 = '';
      for (const isbn of doc.isbn) {
        if (isbn.length === 10 && !isbn10) {isbn10 = isbn;}
        if (isbn.length === 13 && !isbn13) {isbn13 = isbn;}
        if (isbn10 && isbn13) {break;}
      }

      if (isbn10 || isbn13) {
        const result = { isbn10, isbn13 };
        isbnCache.set(cacheKey, result);
        return result;
      }
    }

    isbnCache.set(cacheKey, null);
    return null;
  } catch (err) {
    console.info(`    Open Library lookup failed for "${title}": ${err instanceof Error ? err.message : String(err)}`);
    isbnCache.set(cacheKey, null);
    return null;
  }
}

// Also check the DB for previously resolved books
async function lookupFromDb(pool: Pool, title: string, author: string): Promise<OpenLibraryResult | null> {
  try {
    const { rows } = await pool.query<{ isbn10: string; isbn13: string }>(
      'SELECT isbn10, isbn13 FROM app.affiliate_books WHERE lower(title) = lower($1) AND lower(author) = lower($2)',
      [title, author]
    );
    if (rows.length > 0 && rows[0].isbn10) {
      return { isbn10: rows[0].isbn10, isbn13: rows[0].isbn13 ?? '' };
    }
  } catch { /* table may not exist */ }
  return null;
}

async function resolveISBN(pool: Pool, title: string, author: string): Promise<OpenLibraryResult | null> {
  // Try DB first (cached from previous runs)
  const dbResult = await lookupFromDb(pool, title, author);
  if (dbResult) {return dbResult;}

  // Fall back to Open Library API
  const apiResult = await lookupISBN(title, author);

  // Cache in DB for future runs
  if (apiResult) {
    try {
      await pool.query(
        `INSERT INTO app.affiliate_books (title, author, isbn10, isbn13, category, description)
         VALUES ($1, $2, $3, $4, 'books', '')
         ON CONFLICT (lower(title), lower(author)) DO UPDATE SET isbn10 = $3, isbn13 = $4`,
        [title, author, apiResult.isbn10, apiResult.isbn13]
      );
    } catch { /* ignore constraint violations */ }
  }

  return apiResult;
}

// ── LLM: Direct mention extraction ─────────────────────────────────

interface DirectMention {
  title: string;
  author: string;
  type: 'book_mention' | 'author_mention';
}

async function extractDirectMentions(
  articleTitle: string,
  summary: string
): Promise<DirectMention[]> {
  const prompt = `Read the following article and list every book and author that is explicitly mentioned by name.

Article: "${articleTitle}"
Content: ${summary}

List ONLY books/authors that are explicitly named in the text. Do NOT recommend or suggest books.
Output ONLY a JSON array. No preamble.
[{"title": "Book Title", "author": "Author Name", "type": "book_mention"}, {"title": "", "author": "Author Name", "type": "author_mention"}]

If a book title is mentioned, include it with its author.
If only an author is mentioned (no specific book), include just the author name with an empty title.
If no books or authors are explicitly mentioned, output an empty array: []`;

  const response = await generateText(prompt, {
    temperature: 0.1,
    numPredict: 2000,
    timeout: 120_000,
  });

  try {
    let cleaned = response.trim();
    cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();
    const arrMatch = cleaned.match(/\[[\s\S]*\]/);
    if (arrMatch) {
      const parsed = JSON.parse(arrMatch[0]) as DirectMention[];
      return parsed
        .filter(m => (m.title || m.author) && (m.type === 'book_mention' || m.type === 'author_mention'))
        .map(m => ({
          title: m.title ?? '',
          author: m.author ?? '',
          type: m.type,
        }));
    }
    console.info(`    Direct mention LLM response (no array found): ${cleaned.slice(0, 200)}`);
  } catch (err) {
    console.info(`    Direct mention parse error: ${err instanceof Error ? err.message : String(err)}`);
    console.info(`    Raw response: ${response.slice(0, 300)}`);
  }

  return [];
}

// ── Generic bestseller blocklist ─────────────────────────────────────
// These books get recommended for everything. Block them unless the article
// is specifically about the book or its core subject matter.
const GENERIC_BESTSELLERS = new Set([
  'thinking, fast and slow',
  'sapiens',
  'sapiens: a brief history of humankind',
  'atomic habits',
  'the art of war',
  'how to win friends and influence people',
  'freakonomics',
  'outliers',
  'the 48 laws of power',
  'meditations',
  'the prince',
  'the lean startup',
  'good to great',
  'the 7 habits of highly effective people',
  'rich dad poor dad',
  'the power of habit',
  'start with why',
  'zero to one',
  'the subtle art of not giving a f*ck',
  'educated',
  'becoming',
  'quiet',
  'grit',
  'mindset',
  'deep work',
  'the four agreements',
  'the alchemist',
  'mans search for meaning',
  "man's search for meaning",
  'influence: the psychology of persuasion',
  'influence',
  'thinking in bets',
  'antifragile',
  'the black swan',
  'nudge',
  'predictably irrational',
  'blink',
  'the tipping point',
  'guns, germs, and steel',
  'a brief history of time',
]);

function isGenericBestseller(title: string): boolean {
  return GENERIC_BESTSELLERS.has(title.toLowerCase().trim());
}

// ── LLM: Curated book suggestions (existing logic) ─────────────────

interface BookSuggestion {
  title: string;
  author: string;
  relevance?: string;
}

async function suggestBooks(
  articleTitle: string,
  summary: string
): Promise<BookSuggestion[]> {
  const prompt = `Article: "${articleTitle}"
Summary: ${summary}

Recommend 1-3 books that are SPECIFICALLY about the exact topic of this article.

STRICT RULES:
- Each book MUST be directly about the article's specific subject matter, not tangentially related
- Do NOT recommend generic popular bestsellers (e.g., "Thinking, Fast and Slow", "Sapiens", "Atomic Habits", "The Art of War", "How to Win Friends and Influence People", "Freakonomics", "Outliers", "The 48 Laws of Power", "Meditations" by Marcus Aurelius) UNLESS the article is specifically about that book or its core topic
- A book about "decision-making" is NOT relevant to an article about Ted Cruz. A book about "leadership" is NOT relevant to an article about cryptocurrency.
- The book must be something a reader would seek out BECAUSE of the specific topic discussed in this article
- Prefer niche, subject-specific books over broad popular titles
- Only suggest real, published books

For each suggestion, include a one-sentence "relevance" explanation connecting the book to the article's specific topic.

Output ONLY a JSON array. No preamble.
[{"title": "Book Title", "author": "Author Name", "relevance": "Why this book is specifically relevant to this article's topic"}]`;

  const response = await generateText(prompt, {
    temperature: 0.2,
    numPredict: 2000,
    timeout: 120_000,
  });

  try {
    let cleaned = response.trim();
    cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();
    const arrMatch = cleaned.match(/\[[\s\S]*\]/);
    if (arrMatch) {
      const parsed = JSON.parse(arrMatch[0]) as BookSuggestion[];
      const filtered = parsed
        .filter(b => b.title && b.author)
        .filter(b => {
          if (isGenericBestseller(b.title)) {
            console.info(`    BLOCKED generic bestseller: "${b.title}" by ${b.author}`);
            return false;
          }
          return true;
        });
      return filtered.slice(0, 3);
    }
    console.info(`    LLM response (no array found): ${cleaned.slice(0, 200)}`);
  } catch (err) {
    console.info(`    LLM parse error: ${err instanceof Error ? err.message : String(err)}`);
    console.info(`    Raw response: ${response.slice(0, 300)}`);
  }

  return [];
}

// ── Helpers ─────────────────────────────────────────────────────────

function htmlToSummary(html: string, maxWords: number = 300): string {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.split(/\s+/).slice(0, maxWords).join(' ');
}

/**
 * Process direct mentions: resolve ISBNs via Open Library.
 * Returns resolved AffiliateLink[].
 */
async function resolveDirectMentions(
  pool: Pool,
  mentions: DirectMention[],
  _sourceRef: string
): Promise<AffiliateLink[]> {
  const links: AffiliateLink[] = [];
  const seenIsbns = new Set<string>();

  for (const mention of mentions) {
    if (mention.type === 'book_mention' && mention.title) {
      const isbns = await resolveISBN(pool, mention.title, mention.author);
      if (isbns && !seenIsbns.has(isbns.isbn10 || isbns.isbn13)) {
        seenIsbns.add(isbns.isbn10 || isbns.isbn13);
        links.push({
          isbn10: isbns.isbn10,
          isbn13: isbns.isbn13,
          title: mention.title,
          author: mention.author,
          description: '',
          category: 'books',
        });
      } else if (!isbns) {
        console.info(`    NO_ISBN: "${mention.title}" by ${mention.author} — not found on Open Library`);
      }
    } else if (mention.type === 'author_mention' && mention.author) {
      // For author-only mentions, we can't look up a specific book without a title
      console.info(`    AUTHOR_ONLY: "${mention.author}" — skipping (no specific book title)`);
    }
  }

  return links;
}

// ── Main ────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) { throw new Error('DATABASE_URL required'); }

  const pool = new Pool({ connectionString: dbUrl });

  // ── Reset mode ────────────────────────────────────────────────
  if (resetMode) {
    const { rowCount: articleCount } = await pool.query(
      "UPDATE app.articles SET affiliate_links = '[]', updated_at = NOW() WHERE jsonb_array_length(affiliate_links) > 0"
    );
    const { rowCount: wikiCount } = await pool.query(
      "UPDATE app.wikipedia_articles SET affiliate_links = '[]', updated_at = NOW() WHERE jsonb_array_length(affiliate_links) > 0"
    );
    console.info(`Reset: ${articleCount ?? 0} articles and ${wikiCount ?? 0} wikipedia articles cleared for re-processing`);
    await pool.end();
    return;
  }

  console.info('Using Open Library API for ISBN resolution');

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
          const summary = htmlToSummary(html);

          // ── Tier 1: Direct mention extraction ──────────────────
          const articleRef = `article:${article.id}`;

          // Extract from article content
          const articleMentions = await extractDirectMentions(article.title, summary);
          console.info(`    Direct mentions from article: ${articleMentions.length}`);

          // Extract from linked Wikipedia deep dives
          const { rows: linkedWikis } = await pool.query<{
            id: string;
            title: string;
            content_path: string;
          }>(`
            SELECT wa.id, wa.title, wa.content_path
            FROM app.article_wikipedia_links awl
            JOIN app.wikipedia_articles wa ON awl.wikipedia_id = wa.id
            WHERE awl.article_id = $1
              AND wa.status = 'complete'
              AND wa.content_path IS NOT NULL
          `, [article.id]);

          const wikiMentions: DirectMention[] = [];
          for (const wiki of linkedWikis) {
            try {
              const wikiPath = join(process.cwd(), 'library', wiki.content_path);
              const wikiHtml = await readFile(wikiPath, 'utf-8');
              const wikiSummary = htmlToSummary(wikiHtml);
              const mentions = await extractDirectMentions(wiki.title, wikiSummary);
              for (const m of mentions) {
                wikiMentions.push(m);
              }
              console.info(`    Direct mentions from wiki "${wiki.title}": ${mentions.length}`);
            } catch (err) {
              console.info(`    Error reading wiki content for "${wiki.title}": ${err instanceof Error ? err.message : String(err)}`);
            }
            await new Promise(r => setTimeout(r, 500));
          }

          // Combine all direct mentions and resolve via Open Library
          const allMentions = [...articleMentions, ...wikiMentions];
          const directLinks = await resolveDirectMentions(pool, allMentions, articleRef);

          // ── Tier 2: Curated suggestions ───────────────────────
          const suggestions = await suggestBooks(article.title, summary);

          const seenIsbns = new Set(directLinks.map(l => l.isbn10 || l.isbn13));
          const curatedLinks: AffiliateLink[] = [];
          const missed: string[] = [];
          for (const suggestion of suggestions) {
            const isbns = await resolveISBN(pool, suggestion.title, suggestion.author);
            if (isbns && !seenIsbns.has(isbns.isbn10 || isbns.isbn13)) {
              seenIsbns.add(isbns.isbn10 || isbns.isbn13);
              curatedLinks.push({
                isbn10: isbns.isbn10,
                isbn13: isbns.isbn13,
                title: suggestion.title,
                author: suggestion.author,
                description: '',
                category: 'books',
              });
            } else if (!isbns) {
              missed.push(`${suggestion.title} by ${suggestion.author}`);
            }
          }

          // Combine: direct mentions first, then curated
          const links = [...directLinks, ...curatedLinks];

          if (links.length > 0) {
            await pool.query(
              'UPDATE app.articles SET affiliate_links = $1, updated_at = NOW() WHERE id = $2',
              [JSON.stringify(links), article.id]
            );
            articlesUpdated++;
            const directCount = directLinks.length;
            const curatedCount = curatedLinks.length;
            console.info(`  [${articlesProcessed}] ${article.title} → ${links.length} books (${directCount} direct, ${curatedCount} curated): ${links.map(l => l.title).join(', ')}`);
          } else {
            console.info(`  [${articlesProcessed}] ${article.title} → no ISBNs found`);
          }
          if (missed.length > 0) {
            console.info(`    Not on Open Library: ${missed.join('; ')}`);
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
          const summary = htmlToSummary(html);

          // ── Tier 1: Direct mention extraction ──────────────────
          const wikiRef = `wikipedia:${wiki.id}`;
          const mentions = await extractDirectMentions(wiki.title, summary);
          const directLinks = await resolveDirectMentions(pool, mentions, wikiRef);
          console.info(`    Direct mentions: ${mentions.length}, resolved: ${directLinks.length}`);

          // ── Tier 2: Curated suggestions ────────────────────────
          const suggestions = await suggestBooks(wiki.title, summary);

          const seenIsbns = new Set(directLinks.map(l => l.isbn10 || l.isbn13));
          const curatedLinks: AffiliateLink[] = [];
          for (const suggestion of suggestions) {
            const isbns = await resolveISBN(pool, suggestion.title, suggestion.author);
            if (isbns && !seenIsbns.has(isbns.isbn10 || isbns.isbn13)) {
              seenIsbns.add(isbns.isbn10 || isbns.isbn13);
              curatedLinks.push({
                isbn10: isbns.isbn10,
                isbn13: isbns.isbn13,
                title: suggestion.title,
                author: suggestion.author,
                description: '',
                category: 'books',
              });
            }
          }

          const links = [...directLinks, ...curatedLinks];

          if (links.length > 0) {
            await pool.query(
              'UPDATE app.wikipedia_articles SET affiliate_links = $1, updated_at = NOW() WHERE id = $2',
              [JSON.stringify(links), wiki.id]
            );
            wikiUpdated++;
            console.info(`  [${wikiProcessed}] ${wiki.title} → ${links.length} books (${directLinks.length} direct, ${curatedLinks.length} curated)`);
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
