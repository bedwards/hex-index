/**
 * Job 4: Article rewrite
 *
 * Deterministic orchestrator that:
 *   1. Finds articles with full_content_path but no rewritten_content_path
 *   2. Sends full article text to LLM for rewriting
 *   3. Stores rewritten content on filesystem, updates DB
 *
 * The LLM rewrites the full article in our style —
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
const articleIdIdx = args.indexOf('--article-id');
const ARTICLE_IDS: string[] = [];
if (articleIdIdx >= 0) {
  for (let i = articleIdIdx + 1; i < args.length && !args[i].startsWith('--'); i++) {
    ARTICLE_IDS.push(args[i]);
  }
}

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

  // Strip residual JSON wrapper — catches {"content": "..."}, {"text": "..."}, etc.
  const jsonWrapperMatch = cleaned.match(/^\s*\{\s*"(?:content|text|[^"]+)"\s*:\s*"([\s\S]*)"\s*\}\s*$/);
  if (jsonWrapperMatch) {
    cleaned = jsonWrapperMatch[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .trim();
  }

  // Strip malformed JSON prefix — model sometimes echoes the placeholder key
  // e.g. {"your adapted article text here"}":"actual content...
  cleaned = cleaned.replace(/^\s*\{[^}]*\}["'\s:]+/, '').trim();

  // Strip JSON metadata prefix: title", "author": "Name", "piece": "actual content
  cleaned = cleaned.replace(/^[^"]*",\s*"(?:author|title)":\s*"[^"]*",\s*"(?:piece|content|text)":\s*"/, '').trim();

  // Strip {"content": ["text... (array variant from MiniMax)
  cleaned = cleaned.replace(/^\s*\{\s*"(?:content|text|piece)"\s*:\s*\[\s*"?/, '').trim();
  cleaned = cleaned.replace(/"\s*\]?\s*\}\s*$/, '').trim();

  // Strip leading title (# or ##) — the title is already displayed in the page header
  cleaned = cleaned.replace(/^#{1,2}\s+.+\n+/, '').trim();

  // Unescape JSON string escapes that survived parsing
  cleaned = cleaned.replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, '\n').replace(/\\\\/g, '\\');

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
        AND (a.rewritten_content_path IS NULL OR a.rewrite_dirty = true)
        ${ARTICLE_IDS.length > 0 ? `AND a.id = ANY($2)` : ''}
      ORDER BY a.published_at DESC NULLS LAST
      LIMIT $1
    `, ARTICLE_IDS.length > 0 ? [LIMIT, ARTICLE_IDS] : [LIMIT]);

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

        // Get related wikipedia topics for this article (if any)
        let wikiContext = '';
        try {
          const { rows: wikiTopics } = await pool.query<{ title: string }>(`
            SELECT w.title FROM app.article_wikipedia_links awl
            JOIN app.wikipedia_articles w ON awl.wikipedia_id = w.id
            WHERE awl.article_id = $1
            ORDER BY awl.relevance_rank
          `, [article.id]);
          if (wikiTopics.length > 0) {
            wikiContext = `\nRELATED BACKGROUND: This article has companion deep dives on: ${wikiTopics.map(w => w.title).join(', ')}. Weave in 1-2 brief historical or contextual references from these topics where they naturally strengthen the argument. Do not summarize them — just drop in a specific fact, date, or connection that adds depth.`;
          }
        } catch { /* no wiki topics available */ }

        const prompt = `You are a senior editor at a curated reading library. Your readers are smart, busy people who use text-to-speech to listen to long-form articles. Your job: take this piece and make them glad they spent 15 minutes with it.

TITLE: "${article.title}"
AUTHOR: ${article.author_name ?? 'Unknown'}
PUBLICATION: ${article.publication_name}
${wikiContext}

SOURCE TEXT:
${textForLlm}

YOUR EDITORIAL APPROACH:

1. PITCH (opening 2-3 sentences):
Open by selling the reader on why this piece is worth their time. What is the author's most surprising or distinctive claim? What evidence do they bring that you won't find elsewhere? Why should someone care right now? This is not a summary — it's a pitch. Make the reader think "I need to hear this."

2. ADAPTED BODY (the meat):
- Convert to third person throughout. Replace "I"/"me"/"my" with the author's name and pronouns. First mention: full name. After that: last name only.
- Restructure for clarity. Lead with the strongest insight. Cut tangents.
- Add clear ## section headings where the topic shifts.
- Tighten every sentence. Cut filler, hedging, throat-clearing.
- Vary sentence AND paragraph length dramatically for rhythm.
- Replace jargon with plain language. Spell out acronyms.
- Remove self-referential platform language (newsletter CTAs, "subscribe", "like and share", channel plugs, "paid subscribers", "as I wrote last week").
- CRITICAL: Do NOT copy sentences from the source. Rewrite everything in your own words. Paraphrasing is not enough — restructure, reframe, rethink the presentation. Your reader could read the original; give them a reason to read yours instead.
- For video transcripts: clean up speech artifacts (stutters, repetition, "um", "you know", filler). Convert spoken dialogue into polished prose. If someone is quoted speaking, clean up the quote but keep the substance. Do NOT reproduce transcript verbatim.

3. COUNTERPOINTS (woven in, not bolted on):
Where the argument is weakest or where reasonable people disagree, add a sentence: "Critics might note..." or "A counterargument worth considering..." Keep it brief. The overall stance remains the author's. 1-3 per article depending on length.

4. PULL QUOTE (one per article):
Select the single most striking or quotable sentence from your adaptation. Format it as a blockquote (> ) between sections. This is the sentence someone would highlight or share.

5. BOTTOM LINE (final section):
End with a ## Bottom Line section — 2-3 sentences of editorial judgment. Not a summary. A verdict: What's the strongest part of this argument? What's its biggest vulnerability? What should the reader watch for next?

FORMATTING:
- Do NOT start with the title. It's displayed separately.
- Do NOT start with "Imagine..." or any hypothetical device.
- Do NOT write meta-commentary ("Here's the rewrite", "I've adapted...").
- Use **bold** for emphasis. ## for headings. > for pull quotes/blockquotes.
- Plain text only. No HTML.

STYLE EXAMPLE:
"Matt Yglesias makes an argument that's been strangely absent from progressive discourse: the strongest case for zoning reform isn't economic efficiency — it's racial justice. Drawing on Rothstein's *The Color of Law* and a 1917 Supreme Court case most activists have never heard of, Yglesias builds a case that housing policy, not criminal justice, is where structural racism runs deepest.

## The Forgotten Precedent

The first major anti-segregation victory at the Supreme Court wasn't Brown v. Board of Education. It was Buchanan v. Warley in 1917 — a case striking down explicit racial zoning. Yglesias argues this history matters because land use policy was designed under conditions of deep racism, and the Civil Rights Act never unwound it.

> Housing policy was built on racist foundations, and we never tore them up. We just stopped talking about it.

Critics might note that framing housing as the *primary* driver of structural racism risks minimizing the very real harms of policing and mass incarceration. The two systems reinforce each other.

## Bottom Line

Yglesias's core argument is strong: the academic consensus on housing and racial inequality is clear, and the activist movement hasn't caught up. His biggest vulnerability is strategic — he admits the racial justice framing might hurt the political coalition needed to actually pass reform. That tension is unresolved, and it's the most interesting part of the piece."

Output ONLY the JSON. No preamble, no explanation, no markdown fences.
{"content": "your adapted article text here"}`;

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
          'UPDATE app.articles SET rewritten_content_path = $1, rewrite_dirty = false, updated_at = NOW() WHERE id = $2',
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
