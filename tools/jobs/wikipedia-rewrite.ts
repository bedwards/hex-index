/**
 * Job 3: Wikipedia rewrite
 *
 * Deterministic orchestrator that:
 *   1. Finds articles with stub wikipedia entries (reverse chronological)
 *   2. For each article, collects its stub wikipedia articles
 *   3. Sends all stubs to LLM in one call — returns JSON with rewritten content
 *   4. Stores rewritten content, updates status to 'complete'
 *
 * The LLM's only job: given raw wikipedia text + context, return JSON with
 * rewritten prose for each article (keyed by wikipedia URL).
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { generateText } from '../../src/wikipedia/ollama.js';

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : 30;

// ── Types ───────────────────────────────────────────────────────────
interface StubRow {
  wiki_id: string;
  wiki_title: string;
  wiki_slug: string;
  original_url: string;
  content_path: string;
  source_word_count: number;
  article_id: string;
  article_title: string;
}

// ── HTML conversion (same as rewriter.ts) ───────────────────────────
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Convert inline markdown (**bold**, *italic*) to HTML after escaping */
function inlineMarkdown(escaped: string): string {
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

function textToHtml(text: string, sourceUrl: string, sourceTitle: string): string {
  const parts: string[] = [];
  parts.push(`<p class="source-note">Based on <a href="${escapeHtml(sourceUrl)}">Wikipedia: ${escapeHtml(sourceTitle)}</a></p>`);

  const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
  let inList = false;

  for (const block of blocks) {
    const lines = block.split('\n');

    if (lines.length === 1 && lines[0].startsWith('## ')) {
      if (inList) { parts.push('</ul>'); inList = false; }
      const level = lines[0].startsWith('### ') ? 'h3' : 'h2';
      const heading = lines[0].replace(/^#{2,3}\s+/, '');
      parts.push(`<${level}>${escapeHtml(heading)}</${level}>`);
      continue;
    }

    if (lines.every(l => l.startsWith('> ') || l.startsWith('>'))) {
      if (inList) { parts.push('</ul>'); inList = false; }
      const quoteText = lines.map(l => l.replace(/^>\s?/, '')).join(' ');
      parts.push(`<blockquote>${inlineMarkdown(escapeHtml(quoteText))}</blockquote>`);
      continue;
    }

    if (lines.every(l => /^[-*]\s/.test(l))) {
      if (!inList) { parts.push('<ul>'); inList = true; }
      for (const line of lines) {
        const item = line.replace(/^[-*]\s+/, '');
        parts.push(`<li>${inlineMarkdown(escapeHtml(item))}</li>`);
      }
      continue;
    }

    if (inList) { parts.push('</ul>'); inList = false; }
    const paraText = lines.join(' ');
    parts.push(`<p>${inlineMarkdown(escapeHtml(paraText))}</p>`);
  }

  if (inList) { parts.push('</ul>'); }
  return parts.join('\n');
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Strip LLM preamble from generated content.
 * Models often output "Here's the rewrite:" or "I see the structure..." before actual content.
 * Rules:
 *   1. Strip <think>...</think> blocks
 *   2. If there's a "---" on its own line and the text before it is < 500 chars, chop everything before it
 *   3. Strip common preamble patterns at the start
 */
function cleanPreamble(text: string): string {
  let cleaned = text.trim();

  // Strip think tags
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

  // Strip code fences
  cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();

  // If there's a --- separator and the preamble before it is short, chop it
  const separatorMatch = cleaned.match(/^([\s\S]*?)\n---+\n([\s\S]+)$/);
  if (separatorMatch && separatorMatch[1].length < 500) {
    cleaned = separatorMatch[2].trim();
  }

  // Strip common LLM preamble patterns
  const preamblePatterns = [
    /^(?:Here(?:'s| is) (?:the |my )?(?:rewritten|rewrite|adapted|revised)[\s\S]*?:\s*\n+)/i,
    /^(?:I (?:see|understand|notice|'ll|will|have)[\s\S]*?(?:\.|:)\s*\n+)/i,
    /^(?:(?:Sure|OK|Okay|Certainly|Of course)[,.!]?\s*[\s\S]*?(?:\.|:)\s*\n+)/i,
    /^(?:Let me[\s\S]*?(?:\.|:)\s*\n+)/i,
    /^(?:The following[\s\S]*?(?:\.|:)\s*\n+)/i,
  ];
  for (const pattern of preamblePatterns) {
    cleaned = cleaned.replace(pattern, '').trim();
  }

  return cleaned;
}

// ── Main ────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {throw new Error('DATABASE_URL required');}

  const pool = new Pool({ connectionString: dbUrl });

  try {
    // Find articles that have stub (unrewritten) wikipedia entries
    const { rows: stubs } = await pool.query<StubRow>(`
      SELECT
        w.id AS wiki_id,
        w.title AS wiki_title,
        w.slug AS wiki_slug,
        w.original_url,
        w.content_path,
        w.source_word_count,
        a.id AS article_id,
        a.title AS article_title
      FROM app.wikipedia_articles w
      JOIN app.article_wikipedia_links awl ON awl.wikipedia_id = w.id
      JOIN app.articles a ON awl.article_id = a.id
      WHERE w.status = 'stub'
      ORDER BY a.published_at DESC NULLS LAST
      LIMIT $1
    `, [LIMIT * 3]); // up to 3 stubs per article

    if (stubs.length === 0) {
      console.info('No stub wikipedia articles to rewrite');
      return;
    }

    // Group stubs by article
    const byArticle = new Map<string, { articleTitle: string; stubs: StubRow[] }>();
    for (const stub of stubs) {
      if (!byArticle.has(stub.article_id)) {
        byArticle.set(stub.article_id, { articleTitle: stub.article_title, stubs: [] });
      }
      byArticle.get(stub.article_id)!.stubs.push(stub);
    }

    console.info(`Found ${stubs.length} stubs across ${byArticle.size} articles`);

    let rewritten = 0;
    let errors = 0;
    let articlesProcessed = 0;

    for (const [, { articleTitle, stubs: articleStubs }] of byArticle) {
      articlesProcessed++;
      if (articlesProcessed > LIMIT) {break;}

      console.info(`\n[${articlesProcessed}] ${articleTitle} (${articleStubs.length} stubs)`);

      // Load raw content for each stub
      const stubContents: Array<{ stub: StubRow; rawText: string }> = [];
      for (const stub of articleStubs) {
        try {
          const rawPath = join(process.cwd(), 'library', stub.content_path);
          const rawHtml = await readFile(rawPath, 'utf-8');
          // Strip HTML tags to get plain text for the LLM
          const rawText = rawHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          stubContents.push({ stub, rawText: rawText.slice(0, 8000) }); // cap per article
        } catch {
          console.info(`  Skipping ${stub.wiki_title}: raw content not found`);
        }
      }

      if (stubContents.length === 0) {continue;}

      // Rewrite each stub individually — simpler, more reliable
      for (const { stub, rawText } of stubContents) {
        try {
          await rewriteSingle(pool, stub, rawText, articleTitle);
          rewritten++;
        } catch (err) {
          errors++;
          console.info(`  Error on ${stub.wiki_title}: ${err instanceof Error ? err.message : String(err)}`);
        }
      }

      await new Promise(r => setTimeout(r, 1000));
    }

    console.info(`\nDone: ${rewritten} rewrites, ${errors} errors`);
  } finally {
    await pool.end();
  }
}

/**
 * Fallback: rewrite a single stub individually
 */
async function rewriteSingle(
  pool: Pool,
  stub: StubRow,
  rawText: string,
  articleTitle: string
): Promise<void> {
  const prompt = `Rewrite this Wikipedia article as an engaging essay for a general reader.

ARTICLE: ${stub.wiki_title}
CONTENT: ${rawText}

CONTEXT: Related to "${articleTitle}".

Guidelines:
- Start with an interesting hook
- Explain from first principles
- Vary paragraph length
- Aim for 10-30 minutes of reading
- Plain text only. Blank lines between paragraphs. ## for headings. > for quotes.

Return ONLY valid JSON: {"${stub.original_url}": "your rewritten text here"}`;

  const responseText = await generateText(prompt, {
    temperature: 0.8,
    numPredict: 12000,
  });

  let text: string;
  try {
    let cleaned = responseText.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
    }
    const parsed = JSON.parse(cleaned) as Record<string, string>;
    text = parsed[stub.original_url] ?? Object.values(parsed)[0] ?? '';
  } catch {
    // Last resort: use the raw text as the rewrite
    text = responseText;
  }

  text = cleanPreamble(text);
  if (text.length > 100) {
    await saveRewrite(pool, stub, text);
    console.info(`  Rewrote (single): ${stub.wiki_title}`);
  }
}

/**
 * Save rewritten content to filesystem and update DB
 */
async function saveRewrite(
  pool: Pool,
  stub: StubRow,
  plainText: string
): Promise<void> {
  const html = textToHtml(plainText, stub.original_url, stub.wiki_title);
  const slug = stub.wiki_slug;
  const contentPath = `wikipedia/${slug}.html`;
  const fullPath = join(process.cwd(), 'library', contentPath);

  await mkdir(dirname(fullPath), { recursive: true });
  await writeFile(fullPath, html, 'utf-8');

  const textOnly = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const wordCount = countWords(textOnly);
  const readTime = Math.ceil(wordCount / 200);

  await pool.query(`
    UPDATE app.wikipedia_articles
    SET content_path = $1,
        word_count = $2,
        estimated_read_time_minutes = $3,
        status = 'complete',
        updated_at = NOW()
    WHERE id = $4
  `, [contentPath, wordCount, readTime, stub.wiki_id]);
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
