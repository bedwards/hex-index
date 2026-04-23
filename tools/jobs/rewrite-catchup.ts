/**
 * Batch article rewrite using cloud LLM (Claude via Anthropic API).
 *
 * Designed for catchup mode: runs in parallel pi workers, each processing
 * a batch of articles. Uses cloud LLM, no GPU contention.
 *
 * Usage:
 *   npx tsx tools/jobs/rewrite-catchup.ts --article-id <id1> <id2> ... [--limit N] [--dry-run]
 */

import 'dotenv/config';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { createPool } from '../../src/db/queries.js';
import Anthropic from '@anthropic-ai/sdk';

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

function cleanPreamble(text: string): string {
  text = text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  text = text.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();
  // Strip common LLM preambles
  const preamblePatterns = [
    /^(?:Here is|Here's|Here's the|Here is the|Sure,?|Okay|OK|Alright|Certainly|Of course|I['']d be happy to|Let me)\s+[^.\n]*[.\n]/gi,
    /^(?:Below is|Below you['']ll find|The following is|I['']ve (?:prepared|written|created|generated))\s+[^.\n]*[.\n]/gi,
    /^Commentary:\s*/gi,
    /^Here['']s?\s+my?\s+(?:commentary|rewrite|analysis|response):\s*/gi,
  ];
  for (const pattern of preamblePatterns) {
    text = text.replace(pattern, '');
  }
  return text.trim();
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

// ── Rewrite prompt (same as article-rewrite.ts) ────────────────────
function buildPrompt(article: {
  title: string;
  author_name: string | null;
  publication_name: string;
  sourceText: string;
  wikiContext: string;
}): string {
  const namedAuthor = article.author_name && !/^(unknown|various|various authors?|staff|editor(s|ial)?( staff| board)?|admin|the[\s-]+editors?)$/i.test(article.author_name.trim())
    ? article.author_name.trim()
    : null;

  const authorContextBlock = namedAuthor
    ? `This piece was written by ${namedAuthor} for ${article.publication_name}. Treat ${namedAuthor} as the author throughout: attribute quotes and arguments to them by name, write about their specific framing and choices, and use their last name on second reference.`
    : `This piece ran in ${article.publication_name} without a single named author. Do NOT invent an author. Attribute quotes and arguments to ${article.publication_name} as the source ("${article.publication_name} reports...", "the piece argues...").`;

  const quoteAttributionExamples = namedAuthor
    ? `'${namedAuthor} writes, "..."' or 'As ${namedAuthor} puts it, "..."'`
    : `'${article.publication_name} reports, "..."', 'the piece argues that "..."', or — when a contributor is named in the source text itself — 'Smith, quoted in the piece, says "..."'`;

  return `You are a commentator at a curated reading library. Your readers are smart, busy people who use text-to-speech. Your job: write commentary on this piece that makes them glad they spent 15 minutes with you. You are not rewriting the article — you are commenting on the coverage, weaving in direct quotes and paraphrasing throughout.

EDITORIAL POLICY: Do NOT mention "Trump" or "Donald Trump" in your commentary. If the source article centers on Trump's actions or reactions, reframe around the underlying news event, the policy effect, the stakeholders affected, or institutional dynamics. Use "the administration", "the White House", "the executive branch", or the specific agency/official by name.

ABOUT THIS PIECE
${authorContextBlock}

TITLE: "${article.title}"
PUBLICATION: ${article.publication_name}
${article.wikiContext}

SOURCE TEXT:
${article.sourceText}

YOUR COMMENTARY APPROACH:

1. HOOK (opening 2-3 sentences):
Open by framing what makes this piece notable. Make the reader think "I need to hear this."

2. COMMENTARY (the meat):
- Write in third person. ${namedAuthor ? `First mention: full name. After: last name only.` : `Refer to the source as the publication.`}
- DIRECT QUOTES: Pull 4-8 of the strongest sentences from the source. Introduce each with attribution: ${quoteAttributionExamples}.
- PARAPHRASING: Between quotes, paraphrase the author's arguments. Add editorial judgment after each major point.
- Add clear ## section headings where the coverage shifts.
- Vary sentence AND paragraph length dramatically for rhythm.
- Replace jargon with plain language. Spell out acronyms.
- Remove self-referential platform language (newsletter CTAs, "subscribe", "like and share").

3. COUNTERPOINTS (woven in, not bolted on):
Where the argument is weakest, add a sentence: "Critics might note..." or "A counterargument worth considering..." 1-3 per article.

4. PULL QUOTE (one per article):
Select the single most striking sentence. Format as a blockquote (> ) between sections.

5. BOTTOM LINE (final section):
End with a ## Bottom Line section — 2-3 sentences of editorial judgment. Not a summary. A verdict.

TONE — CRITICAL:
- For articles involving conflict, war, or violence: center the human cost.
- Never glorify military operations. Write with gravity.
- Present multiple perspectives.
- Question official framing when the evidence warrants it.

FORMATTING:
- Do NOT start with the title.
- Do NOT start with "Imagine..."
- Do NOT write meta-commentary ("Here's the rewrite", "I've adapted...").
- Use **bold** for emphasis. ## for headings. > for pull quotes/blockquotes.
- Plain text only. No HTML.

Output ONLY the commentary text. No JSON wrapper, no code fences, no explanation.`;
}

// ── Main ────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) { throw new Error('DATABASE_URL required'); }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) { throw new Error('ANTHROPIC_API_KEY required'); }

  const anthropic = new Anthropic({ apiKey });
  const pool = createPool(dbUrl);

  try {
    // Get articles
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
          const { rows: wikiTopics } = await pool.query(`
            SELECT w.title FROM app.article_wikipedia_links awl
            JOIN app.wikipedia_articles w ON awl.wikipedia_id = w.id
            WHERE awl.article_id = $1
            ORDER BY awl.relevance_rank
          `, [article.id]);
          if (wikiTopics.length > 0) {
            wikiContext = `\nRELATED BACKGROUND: Companion deep dives on: ${wikiTopics.map((w: { title: string }) => w.title).join(', ')}. Weave in 1-2 brief contextual references.`;
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
        const response = await anthropic.messages.create({
          model: 'claude-opus-4-6-20250522',
          max_tokens: 12000,
          temperature: 0.5,
          messages: [{ role: 'user', content: prompt }],
        });
        const genMs = Date.now() - genStart;

        let rewrittenText = response.content
          .filter(c => c.type === 'text')
          .map(c => c.text)
          .join('\n');

        rewrittenText = cleanPreamble(rewrittenText);
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
            [rewritePath, article.id, 'claude-opus-4-6']
          );
        }

        const wordCount = countWords(rewrittenText);
        rewritten++;
        console.info(`  ✅ Rewrote: ${wordCount} words → ${rewritePath} (${contentSource}, ${genMs}ms)`);
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
