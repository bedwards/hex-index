/**
 * Job 4: Article rewrite
 *
 * Deterministic orchestrator that:
 *   1. Finds articles with full_content_path but no rewritten_content_path
 *   2. Sends full article text to LLM for rewriting
 *   3. Stores rewritten content on filesystem, updates DB
 *
 * The LLM rewrites the full Substack article in our style —
 * clean prose, Speechify-friendly, no subscription widgets or CTAs.
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { generateText } from '../../src/wikipedia/ollama.js';

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : 20;

// ── HTML conversion ─────────────────────────────────────────────────
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

/**
 * Strip LLM preamble deterministically — no LLM involved.
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

  // Strip common LLM preamble patterns at the very start
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

  // Strip residual JSON wrapper if the whole thing starts with {"content":
  cleaned = cleaned.replace(/^\s*\{\s*"content"\s*:\s*"/, '').replace(/"\s*\}\s*$/, '').trim();

  // Strip leading title (# or ##) — the title is already displayed in the page header
  cleaned = cleaned.replace(/^#{1,2}\s+.+\n+/, '').trim();

  return cleaned;
}

// ── Main ────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {throw new Error('DATABASE_URL required');}

  const pool = new Pool({ connectionString: dbUrl });

  try {
    // Find articles with full text available but no rewrite yet
    const { rows: articles } = await pool.query<{
      id: string;
      title: string;
      slug: string;
      original_url: string;
      full_content_path: string;
      author_name: string;
      publication_name: string;
      publication_slug: string;
    }>(`
      SELECT
        a.id,
        a.title,
        a.slug,
        a.original_url,
        a.full_content_path,
        a.author_name,
        p.name AS publication_name,
        p.slug AS publication_slug
      FROM app.articles a
      JOIN app.publications p ON a.publication_id = p.id
      WHERE a.full_content_path IS NOT NULL
        AND a.rewritten_content_path IS NULL
      ORDER BY a.published_at DESC NULLS LAST
      LIMIT $1
    `, [LIMIT]);

    if (articles.length === 0) {
      console.info('No articles to rewrite');
      return;
    }

    console.info(`Found ${articles.length} articles to rewrite`);

    let rewritten = 0;
    let errors = 0;

    for (const article of articles) {
      console.info(`\n[${rewritten + errors + 1}/${articles.length}] ${article.title}`);

      try {
        // Load full text
        const fullPath = join(process.cwd(), 'library', article.full_content_path);
        let fullHtml: string;
        try {
          fullHtml = await readFile(fullPath, 'utf-8');
        } catch {
          console.info('  Skipping: full content file not found');
          continue;
        }

        // Strip HTML to plain text for LLM
        const fullText = fullHtml
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (fullText.length < 500) {
          console.info('  Skipping: article too short for rewrite');
          continue;
        }

        // Cap at ~15k chars to fit in context
        const textForLlm = fullText.slice(0, 15000);

        const prompt = `You are a senior editor adapting this article for publication in a curated reading library. Your job is substantive editorial work — not just cleanup, but genuine improvement.

TITLE: "${article.title}"
AUTHOR: ${article.author_name ?? 'Unknown'}
PUBLICATION: ${article.publication_name}

SOURCE TEXT:
${textForLlm}

EDITORIAL MANDATE:

Structure & Organization:
- Restructure for clarity if the original meanders. Lead with the strongest insight.
- Add clear section breaks (## headings) where the topic shifts. Name them well.
- Cut tangential asides that don't serve the core argument.
- If the original buries the lede, fix it.

Prose Quality:
- Tighten every sentence. Cut filler words, throat-clearing, hedging.
- Vary sentence length dramatically — follow a long analytical sentence with a short punchy one.
- Vary paragraph length — a one-sentence paragraph after a dense block creates rhythm.
- Replace jargon with plain language. Spell out acronyms on first use.
- Explain concepts from first principles when the original assumes knowledge.

Voice & Attribution:
- CRITICAL: Convert to third person. Replace "I", "me", "my", "we" with the author's name and appropriate third-person pronouns (he/she/they). Example: "I think this policy is misguided" → "Yglesias argues this policy is misguided."
- Preserve the author's arguments, evidence, and conclusions faithfully.
- Preserve their distinctive style — sharpen it, don't flatten it.
- Do NOT invent facts, quotes, or claims not in the original.
- ADD light editorial counterpoints — a sentence or two where the argument is weakest or where reasonable people disagree. Frame these as "Critics might note..." or "A counterargument is..." Keep it balanced and brief. The overall stance remains the author's.

Reading Experience:
- Optimize for text-to-speech listening (Speechify). Every paragraph should sound natural read aloud.
- Use clear paragraph breaks for natural speech pauses.
- Remove all subscription prompts, share buttons, CTAs, "subscribe to read more" text.
- Remove self-referential newsletter language ("as I wrote last week", "paid subscribers know").

CRITICAL FORMATTING RULES:
- Do NOT start with the article title. The title is displayed separately. Begin with the first sentence of content.
- Do NOT start with "Imagine..." or any hypothetical framing device.
- Do NOT write a preamble like "Here's the rewrite" or "I've adapted this article."
- Use **bold** for emphasis. Use ## for section headings. Use > for blockquotes.

STYLE EXAMPLE (this is the quality bar — note third person, light critique):
"Yglesias argues the racial justice movement has a housing problem. For two decades, activists have centered criminal justice reform as the primary front against structural racism. But the academic literature tells a different story — one where housing policy, not policing, is the deepest root of racial inequality in America. Critics might note that this framing oversimplifies; criminal justice and housing intersect in ways that resist clean separation. Still, his core point stands: the movement's strategic focus doesn't match where the research points."

Output ONLY the JSON. No preamble, no explanation, no markdown fences.
{"content": "your adapted article text here"}

Write plain text only. Use blank lines between paragraphs. Use ## for section headings. Use > for blockquotes. No HTML tags.`;

        const responseText = await generateText(prompt, {
          temperature: 0.5,
          numPredict: 12000,
          timeout: 900_000,
        });

        // Parse response — extract content from JSON, strip preamble
        let rewrittenText: string;
        try {
          let cleaned = responseText.trim();
          // Strip think tags and code fences
          cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
          cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();
          // Try to find JSON object anywhere in the response
          const jsonMatch = cleaned.match(/\{[\s\S]*"content"\s*:\s*"[\s\S]*"\s*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]) as { content: string };
            rewrittenText = parsed.content ?? '';
          } else {
            // No JSON wrapper — use raw text
            rewrittenText = cleaned;
          }
        } catch {
          // JSON parse failed — strip any {"content": prefix/suffix manually
          rewrittenText = responseText
            .replace(/<think>[\s\S]*?<\/think>/g, '')
            .replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '')
            .replace(/^\s*\{\s*"content"\s*:\s*"/, '')
            .replace(/"\s*\}\s*$/, '')
            .trim();
        }

        // Clean LLM preamble
        rewrittenText = cleanPreamble(rewrittenText);

        if (rewrittenText.length < 200) {
          console.info('  Rewrite too short, skipping');
          errors++;
          continue;
        }

        // Convert to HTML and save
        const html = textToHtml(rewrittenText);
        const rewritePath = `rewritten/${article.publication_slug}/${article.slug}.html`;
        const rewriteFullPath = join(process.cwd(), 'library', rewritePath);

        await mkdir(dirname(rewriteFullPath), { recursive: true });
        await writeFile(rewriteFullPath, html, 'utf-8');

        // Update DB
        await pool.query(
          'UPDATE app.articles SET rewritten_content_path = $1, updated_at = NOW() WHERE id = $2',
          [rewritePath, article.id]
        );

        const wordCount = countWords(rewrittenText);
        rewritten++;
        console.info(`  Rewrote: ${wordCount} words → ${rewritePath}`);
      } catch (err) {
        errors++;
        console.info(`  Error: ${err instanceof Error ? err.message : String(err)}`);
      }

      await new Promise(r => setTimeout(r, 1000));
    }

    console.info(`\nDone: ${rewritten} articles rewritten, ${errors} errors`);
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
