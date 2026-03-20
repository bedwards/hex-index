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
      parts.push(`<blockquote>${escapeHtml(quoteText)}</blockquote>`);
      continue;
    }

    if (lines.every(l => /^[-*]\s/.test(l))) {
      if (!inList) { parts.push('<ul>'); inList = true; }
      for (const line of lines) {
        const item = line.replace(/^[-*]\s+/, '');
        parts.push(`<li>${escapeHtml(item)}</li>`);
      }
      continue;
    }

    if (inList) { parts.push('</ul>'); inList = false; }
    const paraText = lines.join(' ');
    parts.push(`<p>${escapeHtml(paraText)}</p>`);
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
- Preserve the author's arguments, evidence, and conclusions faithfully.
- Preserve their distinctive voice and style — sharpen it, don't flatten it.
- Do NOT add your own opinions, analysis, or commentary.
- Do NOT invent facts, quotes, or claims not in the original.

Reading Experience:
- Optimize for text-to-speech listening (Speechify). Every paragraph should sound natural read aloud.
- Use clear paragraph breaks for natural speech pauses.
- Remove all subscription prompts, share buttons, CTAs, "subscribe to read more" text.
- Remove self-referential newsletter language ("as I wrote last week", "paid subscribers know").

CRITICAL: Do NOT start with the article title. Begin immediately with the first sentence of content. The title is already displayed separately — repeating it looks broken.

Return ONLY valid JSON: {"content": "your adapted article text here"}

Write plain text only. Use blank lines between paragraphs. Use ## for section headings. Use > for blockquotes. No HTML tags.`;

        const responseText = await generateText(prompt, {
          temperature: 0.5,
          numPredict: 12000,
          timeout: 900_000,
        });

        // Parse response
        let rewrittenText: string;
        try {
          let cleaned = responseText.trim();
          if (cleaned.startsWith('```')) {
            cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
          }
          const parsed = JSON.parse(cleaned) as { content: string };
          rewrittenText = parsed.content ?? '';
        } catch {
          // If JSON parse fails, use raw response
          rewrittenText = responseText;
        }

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
