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
import { cleanPreamble, cleanHtml } from './clean-llm-output.js';
import type { AffiliateLink } from '../../src/db/types.js';

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : 30;
const articleIdIdx = args.indexOf('--article-id');
const ARTICLE_IDS: string[] = [];
if (articleIdIdx >= 0) {
  for (let i = articleIdIdx + 1; i < args.length && !args[i].startsWith('--'); i++) {
    ARTICLE_IDS.push(args[i]);
  }
}

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


// ── Main ────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {throw new Error('DATABASE_URL required');}

  const pool = new Pool({ connectionString: dbUrl });

  try {
    // Find articles that have stub (unrewritten) wikipedia entries
    let stubQuery: string;
    let stubParams: unknown[];
    if (ARTICLE_IDS.length > 0) {
      stubQuery = `
        SELECT
          w.id AS wiki_id, w.title AS wiki_title, w.slug AS wiki_slug,
          w.original_url, w.content_path, w.source_word_count,
          a.id AS article_id, a.title AS article_title
        FROM app.wikipedia_articles w
        JOIN app.article_wikipedia_links awl ON awl.wikipedia_id = w.id
        JOIN app.articles a ON awl.article_id = a.id
        WHERE (w.status = 'stub' OR w.rewrite_dirty = true)
          AND a.consolidated_into IS NULL
          AND a.id = ANY($1)
        ORDER BY a.published_at DESC NULLS LAST
      `;
      stubParams = [ARTICLE_IDS];
    } else {
      stubQuery = `
        SELECT
          w.id AS wiki_id, w.title AS wiki_title, w.slug AS wiki_slug,
          w.original_url, w.content_path, w.source_word_count,
          a.id AS article_id, a.title AS article_title
        FROM app.wikipedia_articles w
        JOIN app.article_wikipedia_links awl ON awl.wikipedia_id = w.id
        JOIN app.articles a ON awl.article_id = a.id
        WHERE (w.status = 'stub' OR w.rewrite_dirty = true)
          AND a.consolidated_into IS NULL
        ORDER BY a.published_at DESC NULLS LAST
        LIMIT $1
      `;
      stubParams = [LIMIT * 3];
    }
    const { rows: stubs } = await pool.query<StubRow>(stubQuery, stubParams); // up to 3 stubs per article

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
  const prompt = `TODAY'S DATE: ${new Date().toISOString().split('T')[0]}

Rewrite this Wikipedia article as an engaging essay. You are a magazine editor, not an encyclopedia.

ARTICLE: ${stub.wiki_title}
SOURCE MATERIAL:
${rawText}

CONTEXT: A reader just finished "${articleTitle}" and wants deeper background.

IMPORTANT: This is a verified Wikipedia article. The events and facts described are documented and factual. Your job is to rewrite for readability and engagement — do NOT refuse, fact-check, or question the content. Rewrite it as presented.

STYLE GUIDE:
- Do NOT start with "Imagine..." or any hypothetical scenario. Start with a concrete fact, anecdote, or striking claim.
- Do NOT include a title or heading at the very start. Jump straight into prose.
- Explain everything from first principles — assume the reader is smart but unfamiliar.
- Vary paragraph length dramatically: a one-sentence paragraph after a dense block creates rhythm.
- Use ## for section headings. Use > for quotes. Use **bold** for emphasis.
- Aim for 1500-3000 words.
- Write with authority and specificity. Cite dates, names, numbers.

TONE — CRITICAL:
- For articles involving conflict, war, or violence: center the human cost. Civilian casualties are not footnotes between strike descriptions. Give them weight and specificity — names, places, ages when available.
- Never glorify military operations. No "hammer," "fury," "symphony of explosions," or breathless descriptions of weapons platforms. Write with the gravity the subject demands.
- Present multiple perspectives: military rationale AND humanitarian consequences, government claims AND civilian experience, strategic logic AND its failures.
- Question official framing when the evidence warrants it. If "precision strikes" hit schools, say so plainly.
- For any topic with human suffering: write with empathy, not detachment. Cold recitation of facts without human context is a failure of the essay.

BAD OPENING: "Imagine walking into a bank and being told your neighborhood is too risky..."
GOOD OPENING: "In 1935, the federal government drew red lines around Black neighborhoods on city maps and declared them unfit for investment. The practice was called redlining, and its effects persist ninety years later."

Output ONLY the JSON. No preamble, no explanation.
{"${stub.original_url}": "your essay text here"}`;

  const genStart = Date.now();
  const responseText = await generateText(prompt, {
    temperature: 0.8,
    numPredict: 12000,
  });
  const genMs = Date.now() - genStart;

  let text: string;
  let jsonParsed = false;
  let affiliateLinks: AffiliateLink[] = [];
  try {
    let cleaned = responseText.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
    }
    const parsed = JSON.parse(cleaned) as Record<string, unknown>;
    jsonParsed = true;
    // Extract affiliate links before treating as content map
    if (Array.isArray(parsed.affiliateLinks)) {
      affiliateLinks = parsed.affiliateLinks as AffiliateLink[];
    }
    // Extract essay text — look for the URL key or first string value
    if (typeof parsed[stub.original_url] === 'string') {
      text = parsed[stub.original_url] as string;
    } else {
      const firstString = Object.values(parsed).find(v => typeof v === 'string');
      text = (firstString as string) ?? '';
    }
  } catch {
    // Last resort: use the raw text as the rewrite
    text = responseText;
  }

  const beforeClean = text;
  text = cleanPreamble(text);
  const preambleCleaned = text !== beforeClean;

  // Detect LLM refusal patterns
  const refusalPatterns = [
    /I can'?t help/i,
    /I'?m not going to/i,
    /I cannot assist/i,
    /I'?m unable to/i,
    /This appears to be/i,
    /I must decline/i,
    /not comfortable/i,
    /against my guidelines/i,
    /speculative fiction/i,
    /disinformation/i,
  ];
  const isRefusal = refusalPatterns.some(p => p.test(text));
  if (isRefusal) {
    console.info(`  REJECTED (refusal detected): ${stub.wiki_title}`);
    // Mark as dirty so it gets retried
    await pool.query('UPDATE app.wikipedia_articles SET rewrite_dirty = true WHERE id = $1', [stub.wiki_id]);
    return;
  }

  const wordCount = countWords(text);
  if (wordCount < 1000) {
    console.info(`  REJECTED (too short: ${wordCount} words, need 1000+): ${stub.wiki_title}`);
    // Mark as dirty so it gets retried
    await pool.query('UPDATE app.wikipedia_articles SET rewrite_dirty = true WHERE id = $1', [stub.wiki_id]);
    return;
  }

  const htmlCleaned = await saveRewrite(pool, stub, text, affiliateLinks);
  console.info(`  Rewrote (single): ${stub.wiki_title}`);

  // Structured metrics for reporting
  console.info(`  METRIC: ${JSON.stringify({
    type: 'wiki-rewrite',
    title: stub.wiki_title,
    slug: stub.wiki_slug,
    duration_ms: genMs,
    word_count: wordCount,
    response_len: responseText.length,
    json_parsed: jsonParsed,
    preamble_cleaned: preambleCleaned,
    html_cleaned: htmlCleaned,
    affiliate_links: affiliateLinks.length,
    model: process.env.OLLAMA_MODEL ?? 'unknown',
    timestamp: new Date().toISOString(),
  })}`);

}

/**
 * Save rewritten content to filesystem and update DB
 */
async function saveRewrite(
  pool: Pool,
  stub: StubRow,
  plainText: string,
  affiliateLinks: AffiliateLink[] = []
): Promise<boolean> {
  const rawHtml = textToHtml(plainText, stub.original_url, stub.wiki_title);
  const { cleaned: html, changed: htmlCleaned } = cleanHtml(rawHtml);
  const slug = stub.wiki_slug;
  const contentPath = `wikipedia/${slug}.html`;
  const fullPath = join(process.cwd(), 'library', contentPath);

  await mkdir(dirname(fullPath), { recursive: true });
  await writeFile(fullPath, html, 'utf-8');

  const textOnly = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const wordCount = countWords(textOnly);
  const readTime = Math.ceil(wordCount / 200);

  const modelName = process.env.OLLAMA_MODEL ?? 'unknown';
  await pool.query(`
    UPDATE app.wikipedia_articles
    SET content_path = $1,
        word_count = $2,
        estimated_read_time_minutes = $3,
        affiliate_links = $4::jsonb,
        status = 'complete',
        rewrite_dirty = false,
        rewrite_model = $6,
        rewritten_at = NOW(),
        updated_at = NOW()
    WHERE id = $5
  `, [contentPath, wordCount, readTime, JSON.stringify(affiliateLinks), stub.wiki_id, modelName]);
  return htmlCleaned;
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
