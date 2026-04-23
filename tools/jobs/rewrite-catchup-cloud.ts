/**
 * Batch article rewrite using pi cloud LLM (atlascloud).
 *
 * Uses: pi --provider atlascloud --model qwen/qwen3.6-plus --print <prompt>
 * No GPU contention. Parallel-friendly.
 *
 * Usage:
 *   npx tsx tools/jobs/rewrite-catchup-cloud.ts --article-id <id1> <id2> ... [--limit N] [--dry-run]
 */

import 'dotenv/config';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { execSync } from 'child_process';
import { createPool } from '../../src/db/queries.js';

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const articleIdIdx = args.indexOf('--article-id');
const ARTICLE_IDS: string[] = [];
if (articleIdIdx >= 0) {
  for (let i = articleIdIdx + 1; i < args.length && !args[i].startsWith('--'); i++) {
    ARTICLE_IDS.push(args[i]);
  }
}
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : 50;
const dryRun = args.includes('--dry-run');

// ── Helpers ─────────────────────────────────────────────────────────
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function inlineMarkdown(escaped: string): string {
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

function textToHtml(text: string): string {
  const parts: string[] = [];
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

// ── Rewrite prompt ──────────────────────────────────────────────────
function buildPrompt(article: {
  title: string;
  author_name: string | null;
  publication_name: string;
  sourceText: string;
  wikiContext: string;
}): string {
  const rawAuthor = (article.author_name ?? '').trim();
  const isPlaceholder = rawAuthor === '' ||
    /^(unknown|various|various authors?|staff|editor(s|ial)?( staff| board)?|admin|the[\s-]+editors?)$/i.test(rawAuthor);
  const namedAuthor = isPlaceholder ? null : rawAuthor;

  const authorContext = namedAuthor
    ? `This piece was written by ${namedAuthor} for ${article.publication_name}. Treat ${namedAuthor} as the author throughout.`
    : `This piece ran in ${article.publication_name} without a single named author. Do NOT invent an author. Attribute quotes to the publication.`;

  const quoteAttribution = namedAuthor
    ? `'${namedAuthor} writes, "..."' or 'As ${namedAuthor} puts it, "..."'`
    : `'${article.publication_name} reports, "..."', 'the piece argues that "..."'`;

  return `You are a commentator at a curated reading library. Your readers are smart, busy people who use text-to-speech. Write commentary on this piece.

EDITORIAL POLICY: Do NOT mention "Trump" or "Donald Trump". Reframe around the underlying news event, policy effects, or institutional dynamics.

ABOUT THIS PIECE
${authorContext}
TITLE: "${article.title}"
PUBLICATION: ${article.publication_name}
${article.wikiContext}

SOURCE TEXT:
${article.sourceText}

YOUR COMMENTARY APPROACH:

1. HOOK (opening 2-3 sentences): Open by framing what makes this piece notable.

2. COMMENTARY:
- Write in third person. ${namedAuthor ? `First mention: full name. After: last name only.` : `Refer to the source as the publication.`}
- DIRECT QUOTES: Pull 4-8 of the strongest sentences. Introduce each with attribution: ${quoteAttribution}.
- PARAPHRASING: Between quotes, paraphrase arguments. Add editorial judgment.
- Add clear ## section headings where the coverage shifts.
- Vary sentence AND paragraph length dramatically.
- Replace jargon with plain language. Spell out acronyms.
- Remove self-referential platform language (newsletter CTAs, "subscribe", "like and share").

3. COUNTERPOINTS: Where the argument is weakest, add a sentence: "Critics might note..." 1-3 per article.

4. PULL QUOTE (one per article): Select the most striking sentence. Format as a blockquote (> ) between sections.

5. BOTTOM LINE: End with a ## Bottom Line section — 2-3 sentences. Not a summary. A verdict.

TONE:
- For conflict/war/violence: center the human cost. Never glorify military operations.
- Present multiple perspectives.
- Question official framing when warranted.

FORMATTING:
- Do NOT start with the title or "Imagine..."
- Do NOT write meta-commentary ("Here's the rewrite").
- Use **bold** for emphasis. ## for headings. > for blockquotes.
- Plain text only. No HTML.

Output ONLY the commentary text. No preamble, no JSON, no code fences.`;
}

// ── Call cloud LLM via pi CLI (Together) ────────────────────────────
function callCloudLlm(prompt: string, timeoutMs: number = 600_000): string {
  const result = execSync(
    `pi --provider together --model Qwen/Qwen3.5-397B-A17B --print ${JSON.stringify(prompt)}`,
    {
      encoding: 'utf-8',
      timeout: timeoutMs,
      maxBuffer: 50 * 1024 * 1024, // 50MB
      env: { ...process.env },
    }
  );
  return result.trim();
}

// ── Main ────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) { throw new Error('DATABASE_URL required'); }

  const pool = createPool(dbUrl);

  try {
    const placeholders = ARTICLE_IDS.map((_, i) => `$${i + 1}`).join(',');
    const { rows: articles } = await pool.query<{
      id: string;
      title: string;
      slug: string;
      author_name: string | null;
      full_content_path: string | null;
      content_path: string | null;
      publication_name: string;
      publication_slug: string;
    }>(`
      SELECT
        a.id, a.title, a.slug, a.author_name,
        a.full_content_path, a.content_path,
        p.name AS publication_name, p.slug AS publication_slug
      FROM app.articles a
      JOIN app.publications p ON a.publication_id = p.id
      WHERE a.id IN (${placeholders})
        AND a.consolidated_into IS NULL
        AND (a.rewritten_content_path IS NULL OR a.rewrite_dirty = true)
      ORDER BY a.published_at DESC NULLS LAST
    `, ARTICLE_IDS);

    if (articles.length === 0) {
      console.info('No articles to rewrite');
      return;
    }

    console.info(`Found ${articles.length} articles to rewrite (limit: ${LIMIT})`);
    const toProcess = articles.slice(0, LIMIT);

    let rewritten = 0;
    let errors = 0;

    for (const article of toProcess) {
      console.info(`\n[${rewritten + errors + 1}/${toProcess.length}] ${article.title}`);

      try {
        // Load content — try full_content_path first, fall back to content_path
        const fullPath = article.full_content_path
          ? join(process.cwd(), 'library', article.full_content_path)
          : null;
        let fullHtml: string;
        let contentSource = 'content_path';

        try {
          if (fullPath) {
            fullHtml = await readFile(fullPath, 'utf-8');
            contentSource = 'full_content_path';
          } else {
            throw new Error('no full_content_path');
          }
        } catch {
          if (!article.content_path) {
            console.info('  Skipping: no content file');
            errors++;
            continue;
          }
          fullHtml = await readFile(join(process.cwd(), 'library', article.content_path), 'utf-8');
          contentSource = 'content_path (RSS)';
        }

        const fullText = fullHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        if (fullText.length < 500) {
          console.info('  Skipping: too short');
          errors++;
          continue;
        }

        const textForLlm = fullText.slice(0, 15000);

        // Wiki context
        let wikiContext = '';
        try {
          const { rows: wikiTopics } = await pool.query<{ title: string }>(`
            SELECT w.title FROM app.article_wikipedia_links awl
            JOIN app.wikipedia_articles w ON awl.wikipedia_id = w.id
            WHERE awl.article_id = $1
            ORDER BY awl.relevance_rank
          `, [article.id]);
          if (wikiTopics.length > 0) {
            wikiContext = `\nRELATED BACKGROUND: Companion deep dives on: ${wikiTopics.map(w => w.title).join(', ')}. Weave in 1-2 brief contextual references.`;
          }
        } catch { /* no wiki topics */ }

        const prompt = buildPrompt({
          title: article.title,
          author_name: article.author_name,
          publication_name: article.publication_name,
          sourceText: textForLlm,
          wikiContext,
        });

        const genStart = Date.now();
        let responseText: string;
        try {
          responseText = callCloudLlm(prompt);
        } catch (err) {
          console.info(`  LLM call failed: ${err instanceof Error ? err.message : String(err)}`);
          errors++;
          continue;
        }
        const genMs = Date.now() - genStart;

        // Clean think tags and code fences
        let rewrittenText = responseText
          .replace(/<think>[\s\S]*?<\/think>/g, '')
          .replace(/^```\w*\n?/, '')
          .replace(/\n?```\s*$/, '')
          .trim();

        // Strip common LLM preambles
        rewrittenText = rewrittenText
          .replace(/^(?:Here is|Here's|Here's the|Here is the|Sure,?|Okay|OK|Alright|Certainly|Of course|Below is|Below you'll find|The following is|I['']d be happy to|Let me)\s+[^.\n]*[.\n]/gi, '')
          .replace(/^Commentary:\s*/gi, '')
          .replace(/^Here['']s?\s+my?\s+(?:commentary|rewrite|analysis|response):\s*/gi, '')
          .trim();

        if (rewrittenText.length < 200) {
          console.info('  Rewrite too short, skipping');
          errors++;
          continue;
        }

        const html = textToHtml(rewrittenText);
        const rewritePath = `rewritten/${article.publication_slug}/${article.slug}.html`;
        const rewriteFullPath = join(process.cwd(), 'library', rewritePath);

        if (!dryRun) {
          await mkdir(dirname(rewriteFullPath), { recursive: true });
          await writeFile(rewriteFullPath, html, 'utf-8');

          await pool.query(
            'UPDATE app.articles SET rewritten_content_path = $1, rewrite_dirty = false, rewrite_model = $3, rewritten_at = NOW(), updated_at = NOW() WHERE id = $2',
            [rewritePath, article.id, 'qwen3.6-plus (atlascloud)']
          );
        }

        const wordCount = countWords(rewrittenText);
        rewritten++;
        console.info(`  ✅ ${wordCount} words → ${rewritePath} (${contentSource}, ${genMs}ms)`);
      } catch (err) {
        errors++;
        console.info(`  ❌ Error: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    console.info(`\nDone: ${rewritten} rewritten, ${errors} errors`);
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
