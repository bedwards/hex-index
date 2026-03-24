/**
 * Job: Affiliate book suggestions
 *
 * Two-tier affiliate link system:
 *   Tier 1 — Direct mentions (MANDATORY):
 *     Extract books/authors explicitly named in article content and Wikipedia deep dives.
 *     These MUST have affiliate links. Unresolved mentions are logged prominently
 *     and written to content/unresolved-mentions.json for expand-affiliate-map.ts.
 *
 *   Tier 2 — Curated recommendations (supplementary):
 *     Short LLM call: title + summary → 1-3 book suggestions (title + author only).
 *     Deterministic ASIN lookup from curated content/affiliate-books.json.
 *
 * The LLM does NOT generate ASINs — only book titles and authors.
 * ASINs come exclusively from the curated mapping file.
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { readFile, writeFile } from 'fs/promises';
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

/**
 * Look up any book by a given author in the curated map.
 * Returns the first match found.
 */
function lookupAuthor(
  bookMap: BookMap,
  author: string
): (BookEntry & { title: string; author: string }) | null {
  const authorLower = author.toLowerCase().trim();
  for (const [key, entry] of Object.entries(bookMap)) {
    const [mapTitle, mapAuthor] = key.split('|');
    if (mapAuthor && mapAuthor.toLowerCase().trim() === authorLower) {
      return { ...entry, title: mapTitle, author: mapAuthor };
    }
  }
  return null;
}

// ── Unresolved mentions tracking ────────────────────────────────────

interface UnresolvedEntry {
  type: 'book_mention' | 'author_mention';
  mentioned_in: string[];
  first_seen: string;
}

type UnresolvedMap = Record<string, UnresolvedEntry>;

async function loadUnresolvedMentions(): Promise<UnresolvedMap> {
  const filePath = join(process.cwd(), 'content', 'unresolved-mentions.json');
  try {
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as UnresolvedMap;
  } catch {
    return {};
  }
}

async function saveUnresolvedMentions(data: UnresolvedMap): Promise<void> {
  const filePath = join(process.cwd(), 'content', 'unresolved-mentions.json');
  await writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

function addUnresolvedMention(
  unresolved: UnresolvedMap,
  title: string,
  author: string,
  mentionType: 'book_mention' | 'author_mention',
  sourceRef: string
): void {
  const key = `${title}|${author}`;
  if (unresolved[key]) {
    if (!unresolved[key].mentioned_in.includes(sourceRef)) {
      unresolved[key].mentioned_in.push(sourceRef);
    }
  } else {
    unresolved[key] = {
      type: mentionType,
      mentioned_in: [sourceRef],
      first_seen: new Date().toISOString(),
    };
  }
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

// ── LLM: Curated book suggestions (existing logic) ─────────────────

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
      return parsed.filter(b => b.title && b.author).slice(0, 3);
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
 * Process direct mentions: resolve against book map, log unresolved.
 * Returns resolved AffiliateLink[] and updates unresolved map in-place.
 */
function resolveDirectMentions(
  mentions: DirectMention[],
  bookMap: BookMap,
  unresolved: UnresolvedMap,
  sourceRef: string
): AffiliateLink[] {
  const links: AffiliateLink[] = [];
  const seenAsins = new Set<string>();

  for (const mention of mentions) {
    if (mention.type === 'book_mention' && mention.title) {
      // Try to find the specific book
      const match = lookupBook(bookMap, mention.title, mention.author);
      if (match && !seenAsins.has(match.asin)) {
        seenAsins.add(match.asin);
        links.push({
          asin: match.asin,
          title: match.title,
          author: match.author,
          description: match.description,
          category: match.category,
        });
      } else if (!match) {
        console.info(`    MUST_RESOLVE: "${mention.title}" by ${mention.author} — direct mention, no ASIN in map`);
        addUnresolvedMention(unresolved, mention.title, mention.author, 'book_mention', sourceRef);
      }
    } else if (mention.type === 'author_mention' && mention.author) {
      // Try to find any book by this author
      const match = lookupAuthor(bookMap, mention.author);
      if (match && !seenAsins.has(match.asin)) {
        seenAsins.add(match.asin);
        links.push({
          asin: match.asin,
          title: match.title,
          author: match.author,
          description: match.description,
          category: match.category,
        });
      } else if (!match) {
        console.info(`    MUST_RESOLVE: author "${mention.author}" — direct mention, no ASIN in map`);
        addUnresolvedMention(unresolved, '', mention.author, 'author_mention', sourceRef);
      }
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

  const bookMap = await loadBookMap();
  const bookCount = Object.keys(bookMap).length;

  if (bookCount === 0) {
    console.info('No books in content/affiliate-books.json — nothing to match against');
    await pool.end();
    return;
  }

  console.info(`Loaded ${bookCount} books from affiliate mapping`);

  const unresolved = await loadUnresolvedMentions();

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

          // Combine all direct mentions and resolve
          const allMentions = [...articleMentions, ...wikiMentions];
          const directLinks = resolveDirectMentions(allMentions, bookMap, unresolved, articleRef);

          // ── Tier 2: Curated suggestions (existing logic) ───────
          const suggestions = await suggestBooks(article.title, summary);

          const seenAsins = new Set(directLinks.map(l => l.asin));
          const curatedLinks: AffiliateLink[] = [];
          const missed: string[] = [];
          for (const suggestion of suggestions) {
            const match = lookupBook(bookMap, suggestion.title, suggestion.author);
            if (match && !seenAsins.has(match.asin)) {
              seenAsins.add(match.asin);
              curatedLinks.push({
                asin: match.asin,
                title: match.title,
                author: match.author,
                description: match.description,
                category: match.category,
              });
            } else if (!match) {
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
            console.info(`  [${articlesProcessed}] ${article.title} → no matches in book map`);
          }
          if (missed.length > 0) {
            console.info(`    Missing from map: ${missed.join('; ')}`);
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
          const directLinks = resolveDirectMentions(mentions, bookMap, unresolved, wikiRef);
          console.info(`    Direct mentions: ${mentions.length}, resolved: ${directLinks.length}`);

          // ── Tier 2: Curated suggestions ────────────────────────
          const suggestions = await suggestBooks(wiki.title, summary);

          const seenAsins = new Set(directLinks.map(l => l.asin));
          const curatedLinks: AffiliateLink[] = [];
          for (const suggestion of suggestions) {
            const match = lookupBook(bookMap, suggestion.title, suggestion.author);
            if (match && !seenAsins.has(match.asin)) {
              seenAsins.add(match.asin);
              curatedLinks.push({
                asin: match.asin,
                title: match.title,
                author: match.author,
                description: match.description,
                category: match.category,
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

    // ── Save unresolved mentions ────────────────────────────────
    const unresolvedCount = Object.keys(unresolved).length;
    if (unresolvedCount > 0) {
      await saveUnresolvedMentions(unresolved);
      console.info(`\nWrote ${unresolvedCount} unresolved mentions to content/unresolved-mentions.json`);
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
