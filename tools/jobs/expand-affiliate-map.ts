/**
 * Job: Expand affiliate book map with Ollama web search
 *
 * Resolves unresolved book/author mentions from content/unresolved-mentions.json
 * by using Qwen 3 235B via Ollama's built-in web search tools to find real
 * Amazon ASINs.
 *
 * The tool calling flow:
 *   1. Send prompt + web_search/web_fetch tool definitions to Ollama
 *   2. Model requests tool calls (search Amazon, fetch product pages)
 *   3. We execute the tool calls against Ollama's cloud API
 *   4. Send results back, loop until the model returns a final answer
 *   5. Parse the ASIN from the response, validate, add to book map
 *
 * Usage:
 *   npx tsx tools/jobs/expand-affiliate-map.ts --limit 50
 *   npx tsx tools/jobs/expand-affiliate-map.ts --dry-run
 */

import 'dotenv/config';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { Pool } from 'pg';

// ── Load OLLAMA_API_KEY from ~/.config/.env if not already set ────
async function loadExtraEnv(): Promise<void> {
  if (process.env.OLLAMA_API_KEY) {
    return;
  }
  try {
    const homedir = process.env.HOME ?? '/Users/bedwards';
    const envPath = join(homedir, '.config', '.env');
    const raw = await readFile(envPath, 'utf-8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#') || !trimmed.includes('=')) {
        continue;
      }
      const eqIdx = trimmed.indexOf('=');
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (key === 'OLLAMA_API_KEY' && !process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // ~/.config/.env doesn't exist, that's fine
  }
}

// ── CLI args ────────────────────────────────────────────────────────
const cliArgs = process.argv.slice(2);
const limitIdx = cliArgs.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? parseInt(cliArgs[limitIdx + 1], 10) : 20;
const DRY_RUN = cliArgs.includes('--dry-run');

// ── Constants ───────────────────────────────────────────────────────
const ITEM_TIMEOUT_MS = 120_000;
const OLLAMA_CLOUD_BASE = 'https://ollama.com/api';

// ── Types ───────────────────────────────────────────────────────────

interface BookEntry {
  title: string;
  author: string;
  asin: string;
  category: string;
  description: string;
}

type BookMap = BookEntry[];

interface UnresolvedEntry {
  type: 'book_mention' | 'author_mention';
  mentioned_in: string[];
  first_seen: string;
}

type UnresolvedMap = Record<string, UnresolvedEntry>;

interface OllamaToolCall {
  function: {
    name: string;
    arguments: Record<string, unknown>;
  };
}

interface OllamaMessage {
  role: string;
  content: string;
  tool_calls?: OllamaToolCall[];
}

interface OllamaChatResponse {
  message: OllamaMessage;
}

interface ResolvedBook {
  asin: string;
  title: string;
  author: string;
  description: string;
  category: string;
}

interface ResolvedError {
  error: string;
}

// ── File I/O ────────────────────────────────────────────────────────

const MAP_PATH = join(process.cwd(), 'content', 'affiliate-books.json');
const UNRESOLVED_PATH = join(process.cwd(), 'content', 'unresolved-mentions.json');

async function loadBookMap(): Promise<BookMap> {
  try {
    const raw = await readFile(MAP_PATH, 'utf-8');
    return JSON.parse(raw) as BookMap;
  } catch {
    console.info('Warning: content/affiliate-books.json not found, starting fresh');
    return [];
  }
}

async function saveBookMap(bookMap: BookMap): Promise<void> {
  const sorted = [...bookMap].sort((a, b) => a.title.localeCompare(b.title));
  await writeFile(MAP_PATH, JSON.stringify(sorted, null, 2) + '\n', 'utf-8');
}

async function loadUnresolvedMentions(): Promise<UnresolvedMap> {
  try {
    const raw = await readFile(UNRESOLVED_PATH, 'utf-8');
    return JSON.parse(raw) as UnresolvedMap;
  } catch {
    return {};
  }
}

async function saveUnresolvedMentions(data: UnresolvedMap): Promise<void> {
  await writeFile(UNRESOLVED_PATH, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

// ── Validation ──────────────────────────────────────────────────────

function isValidAsin(asin: string): boolean {
  if (asin.length !== 10) {
    return false;
  }
  if (!/^[A-Z0-9]+$/i.test(asin)) {
    return false;
  }
  // Must start with B or a digit
  return /^[B0-9]/i.test(asin);
}

function bookExistsByAsin(bookMap: BookMap, asin: string): boolean {
  return bookMap.some(entry => entry.asin === asin);
}

function bookExistsByTitle(bookMap: BookMap, title: string): boolean {
  const titleLower = title.toLowerCase().trim();
  return bookMap.some(entry => entry.title.toLowerCase().trim() === titleLower);
}

// ── Ollama tool calling ─────────────────────────────────────────────

const OLLAMA_TOOLS = [
  {
    type: 'function' as const,
    function: {
      name: 'web_search',
      description: 'Search the web for information',
      parameters: {
        type: 'object',
        properties: {
          query: { description: 'Search query', type: 'string' },
          max_results: { description: 'Max results', type: 'integer' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'web_fetch',
      description: 'Fetch a web page',
      parameters: {
        type: 'object',
        properties: {
          url: { description: 'URL to fetch', type: 'string' },
        },
        required: ['url'],
      },
    },
  },
];

async function executeToolCall(
  toolName: string,
  toolArgs: Record<string, unknown>,
  apiKey: string,
): Promise<string> {
  if (toolName === 'web_search') {
    const query = typeof toolArgs.query === 'string' ? toolArgs.query : '';
    const maxResults = typeof toolArgs.max_results === 'number' ? toolArgs.max_results : 5;
    console.info(`    [tool] web_search: "${query}"`);

    const res = await fetch(`${OLLAMA_CLOUD_BASE}/web_search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ query, max_results: maxResults }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      const text = await res.text();
      return JSON.stringify({ error: `web_search failed: HTTP ${res.status} ${text}` });
    }
    const data: unknown = await res.json();
    return JSON.stringify(data);
  }

  if (toolName === 'web_fetch') {
    const url = typeof toolArgs.url === 'string' ? toolArgs.url : '';
    console.info(`    [tool] web_fetch: ${url}`);

    const res = await fetch(`${OLLAMA_CLOUD_BASE}/web_fetch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ url }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      const text = await res.text();
      return JSON.stringify({ error: `web_fetch failed: HTTP ${res.status} ${text}` });
    }
    const data: unknown = await res.json();
    return JSON.stringify(data);
  }

  return JSON.stringify({ error: `Unknown tool: ${toolName}` });
}

async function resolveWithOllama(
  prompt: string,
  ollamaUrl: string,
  ollamaModel: string,
  apiKey: string,
): Promise<ResolvedBook | ResolvedError> {
  const messages: OllamaMessage[] = [
    { role: 'user', content: prompt },
  ];

  const startTime = Date.now();
  let iterations = 0;
  const maxIterations = 10;

  while (iterations < maxIterations) {
    if (Date.now() - startTime > ITEM_TIMEOUT_MS) {
      return { error: 'Timed out after 120s' };
    }

    iterations++;

    const res = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: ollamaModel,
        messages,
        tools: OLLAMA_TOOLS,
        options: { temperature: 0.1, num_predict: 4000 },
        keep_alive: -1,
        stream: false,
      }),
      signal: AbortSignal.timeout(ITEM_TIMEOUT_MS),
    });

    if (!res.ok) {
      const text = await res.text();
      return { error: `Ollama HTTP ${res.status}: ${text}` };
    }

    const data = (await res.json()) as OllamaChatResponse;
    const assistantMsg = data.message;

    // If there are tool calls, execute them and continue the loop
    if (assistantMsg.tool_calls && assistantMsg.tool_calls.length > 0) {
      // Add assistant message to history
      messages.push({
        role: 'assistant',
        content: assistantMsg.content ?? '',
        tool_calls: assistantMsg.tool_calls,
      });

      // Execute each tool call and add results
      for (const toolCall of assistantMsg.tool_calls) {
        const toolResult = await executeToolCall(
          toolCall.function.name,
          toolCall.function.arguments,
          apiKey,
        );
        messages.push({
          role: 'tool',
          content: toolResult,
        });
      }

      continue;
    }

    // No tool calls — parse the final response
    let content = (assistantMsg.content ?? '').trim();
    // Strip thinking tags
    content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return { error: `No JSON in response: ${content.slice(0, 200)}` };
    }

    try {
      const parsed = JSON.parse(jsonMatch[0]) as Record<string, unknown>;
      if ('error' in parsed) {
        return { error: String(parsed.error) };
      }
      if ('asin' in parsed && 'title' in parsed && 'author' in parsed) {
        return {
          asin: typeof parsed.asin === 'string' ? parsed.asin : JSON.stringify(parsed.asin),
          title: typeof parsed.title === 'string' ? parsed.title : JSON.stringify(parsed.title),
          author: typeof parsed.author === 'string' ? parsed.author : JSON.stringify(parsed.author),
          description: typeof parsed.description === 'string' ? parsed.description : '',
          category: typeof parsed.category === 'string' ? parsed.category : 'books',
        };
      }
      return { error: `Unexpected JSON shape: ${jsonMatch[0].slice(0, 200)}` };
    } catch (parseErr) {
      return { error: `JSON parse failed: ${parseErr instanceof Error ? parseErr.message : String(parseErr)}` };
    }
  }

  return { error: `Exceeded ${maxIterations} tool-calling iterations` };
}

// ── Prompt builders ─────────────────────────────────────────────────

function buildBookPrompt(title: string, author: string): string {
  return `Find the Amazon ASIN for this book:
Title: "${title}"
Author: "${author}"

Search Amazon for this exact book. Find the product page and extract the ASIN (the 10-character alphanumeric identifier in the URL, like /dp/B08N5WRWNW or /dp/0399590528).

IMPORTANT:
- Only return a VERIFIED ASIN that you found on an actual Amazon page
- Do NOT make up or guess ASINs
- The ASIN must be for this specific book (not a different edition unless the exact one isn't available)
- Prefer paperback or hardcover editions over Kindle

After verifying, respond with ONLY this JSON (no other text):
{"asin": "THE_ASIN", "title": "Exact Title", "author": "Exact Author", "description": "One sentence about why this book matters", "category": "books"}

If you cannot find a verified ASIN, respond with:
{"error": "reason"}`;
}

function buildAuthorPrompt(author: string): string {
  return `Find an Amazon book by this author: ${author}

Search for the most notable or well-known book by this author. Find the Amazon product page and extract the ASIN.

IMPORTANT:
- Only return a VERIFIED ASIN that you found on an actual Amazon page
- Do NOT make up or guess ASINs
- The ASIN must be for this specific book (not a different edition unless the exact one isn't available)
- Prefer paperback or hardcover editions over Kindle

After verifying, respond with ONLY this JSON (no other text):
{"asin": "THE_ASIN", "title": "Exact Title", "author": "Exact Author", "description": "One sentence about why this book matters", "category": "books"}

If you cannot find a verified ASIN, respond with:
{"error": "reason"}`;
}

// ── Main ────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  await loadExtraEnv();

  const apiKey = process.env.OLLAMA_API_KEY;
  if (!apiKey) {
    throw new Error(
      'OLLAMA_API_KEY is required. Get one at https://ollama.com/settings/keys\n' +
      'Set it in .env or ~/.config/.env',
    );
  }

  const ollamaUrl = process.env.OLLAMA_URL ?? 'http://127.0.0.1:11434';
  const ollamaModel = process.env.OLLAMA_MODEL ?? 'gpt-oss:120b';

  const bookMap = await loadBookMap();
  const unresolved = await loadUnresolvedMentions();
  const initialMapCount = bookMap.length;
  const unresolvedKeys = Object.keys(unresolved);

  console.info(`Loaded ${initialMapCount} books from affiliate-books.json`);
  console.info(`Found ${unresolvedKeys.length} unresolved mentions`);

  if (unresolvedKeys.length === 0) {
    console.info('Nothing to resolve. Run affiliate-suggest.ts first to populate unresolved-mentions.json.');
    return;
  }

  const toProcess = unresolvedKeys.slice(0, LIMIT);
  console.info(`Processing ${toProcess.length} items (limit: ${LIMIT})`);

  if (DRY_RUN) {
    console.info('\nDRY RUN — showing what would be processed:\n');
    for (const key of toProcess) {
      const entry = unresolved[key];
      const [title, author] = key.split('|');
      console.info(`  ${entry.type}: "${title}" by ${author} (mentioned in ${entry.mentioned_in.length} sources)`);
    }
    return;
  }

  const stats = {
    processed: 0,
    added: 0,
    failed: 0,
    skipped: 0,
    searchesUsed: 0,
  };

  for (const key of toProcess) {
    stats.processed++;
    const entry = unresolved[key];
    const [title, author] = key.split('|');

    console.info(`\n[${stats.processed}/${toProcess.length}] ${entry.type}: "${title || '(no title)'}" by ${author}`);

    // Skip if already in book map (may have been added in a previous iteration)
    if (title && bookExistsByTitle(bookMap, title)) {
      console.info('  SKIP: already in book map');
      stats.skipped++;
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- cleaning resolved entries from map
      delete unresolved[key];
      continue;
    }

    const prompt = entry.type === 'book_mention' && title
      ? buildBookPrompt(title, author)
      : buildAuthorPrompt(author);

    try {
      stats.searchesUsed++;
      const result = await resolveWithOllama(prompt, ollamaUrl, ollamaModel, apiKey);

      if ('error' in result) {
        console.info(`  FAILED: ${result.error}`);
        stats.failed++;
        continue;
      }

      // Validate the ASIN
      const asin = result.asin.toUpperCase();
      if (!isValidAsin(asin)) {
        console.info(`  INVALID ASIN: "${result.asin}" — skipping`);
        stats.failed++;
        continue;
      }

      // Check for duplicate ASIN
      if (bookExistsByAsin(bookMap, asin)) {
        console.info(`  DUPLICATE ASIN: ${asin} already in map — skipping`);
        stats.skipped++;
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- cleaning resolved entries from map
        delete unresolved[key];
        continue;
      }

      // Validate non-empty fields
      if (!result.title || !result.author || !result.description) {
        console.info('  INVALID: missing title, author, or description');
        stats.failed++;
        continue;
      }

      // Add to book map
      bookMap.push({
        title: result.title,
        author: result.author,
        asin,
        category: result.category || 'books',
        description: result.description,
      });

      // Remove from unresolved
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- cleaning resolved entries from map
      delete unresolved[key];

      stats.added++;
      console.info(`  ADDED: ${result.title} by ${result.author} → ${asin}`);
    } catch (err) {
      console.info(`  ERROR: ${err instanceof Error ? err.message : String(err)}`);
      stats.failed++;
    }

    // Brief delay between items to be a good citizen
    await new Promise(r => setTimeout(r, 1000));
  }

  // Save updated files (JSON backup)
  if (stats.added > 0 || stats.skipped > 0) {
    await saveBookMap(bookMap);
    console.info(`\nWrote updated affiliate-books.json (${bookMap.length} total entries)`);
  }

  // Sync to database if DATABASE_URL is available
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl && stats.added > 0) {
    const pool = new Pool({ connectionString: dbUrl });
    try {
      let dbUpserted = 0;
      for (const entry of bookMap) {
        if (!entry.title || !entry.author) { continue; }
        await pool.query(
          `INSERT INTO app.affiliate_books (title, author, asin, category, description)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (asin) DO UPDATE SET
             title = EXCLUDED.title,
             author = EXCLUDED.author,
             category = EXCLUDED.category,
             description = EXCLUDED.description`,
          [entry.title, entry.author, entry.asin, entry.category || 'books', entry.description || null]
        );
        dbUpserted++;
      }
      console.info(`Synced ${dbUpserted} books to database`);
    } catch (err) {
      console.info(`Warning: Could not sync to database: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      await pool.end();
    }
  }

  await saveUnresolvedMentions(unresolved);
  const remainingUnresolved = Object.keys(unresolved).length;
  console.info(`Wrote updated unresolved-mentions.json (${remainingUnresolved} remaining)`);

  // Summary
  console.info('\n── Summary ──────────────────────────────────────');
  console.info(`  Processed:          ${stats.processed}`);
  console.info(`  Added to map:       ${stats.added}`);
  console.info(`  Skipped (dupes):    ${stats.skipped}`);
  console.info(`  Failed:             ${stats.failed}`);
  console.info(`  Web searches used:  ${stats.searchesUsed} / 100 daily budget`);
  console.info(`  Map size:           ${initialMapCount} → ${bookMap.length}`);
  console.info(`  Unresolved:         ${unresolvedKeys.length} → ${remainingUnresolved}`);
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
