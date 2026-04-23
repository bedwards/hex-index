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
import { cleanPreamble, cleanHtml } from './clean-llm-output.js';
import type { AffiliateLink } from '../../src/db/types.js';

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


// ── Main ────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {throw new Error('DATABASE_URL required');}

  const pool = new Pool({ connectionString: dbUrl });

  try {
    // Load curated tag pool for post-rewrite tagging
    const { rows: tags } = await pool.query<{ slug: string; name: string; description: string }>(
      'SELECT slug, name, description FROM app.tags ORDER BY slug'
    );
    const tagList = tags.map(t => `${t.slug}: ${t.name} — ${t.description}`).join('\n');
    const validSlugs = new Set(tags.map(t => t.slug));

    // Find articles with full text available but no rewrite yet
    // Prefer full_content_path (scraped), fall back to content_path (RSS feed)
    const { rows: articles } = await pool.query<{
      id: string;
      title: string;
      slug: string;
      original_url: string;
      full_content_path: string | null;
      content_path: string | null;
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
        a.content_path,
        a.author_name,
        p.name AS publication_name,
        p.slug AS publication_slug
      FROM app.articles a
      JOIN app.publications p ON a.publication_id = p.id
      WHERE (a.full_content_path IS NOT NULL OR a.content_path IS NOT NULL)
        AND a.consolidated_into IS NULL
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
        // Load full text — try full_content_path first, fall back to content_path
        const fullPath = article.full_content_path
          ? join(process.cwd(), 'library', article.full_content_path)
          : null;
        let fullHtml: string;
        let contentSource = 'content_path'; // default fallback label
        try {
          if (fullPath) {
            fullHtml = await readFile(fullPath, 'utf-8');
            contentSource = 'full_content_path';
          } else {
            throw new Error('no full_content_path');
          }
        } catch {
          // Fall back to content_path (RSS feed HTML, typically 2K-4K words)
          if (!article.content_path) {
            console.info('  Skipping: no content file available');
            continue;
          }
          const fallbackPath = join(process.cwd(), 'library', article.content_path);
          try {
            fullHtml = await readFile(fallbackPath, 'utf-8');
            contentSource = 'content_path (RSS fallback)';
          } catch {
            console.info('  Skipping: content file not found');
            continue;
          }
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

        // Author handling: a clean named author gets quoted by name; a missing,
        // unknown, or "Various"-style placeholder gets routed to publication-level
        // attribution instead, because attributing quotes to a non-name confuses
        // both the reader and the model. We strip these placeholders entirely
        // before they reach Qwen and switch the prompt to a more fluid mode.
        const rawAuthor = (article.author_name ?? '').trim();
        const isPlaceholderAuthor =
          rawAuthor === '' ||
          /^(unknown|various|various authors?|staff|editor(s|ial)?( staff| board)?|admin|the[\s-]+editors?)$/i.test(rawAuthor);
        const namedAuthor = isPlaceholderAuthor ? null : rawAuthor;

        // Build a fluid, natural-language preface that explains the situation to
        // the model rather than handing it a rigid template. Single named author
        // → standard "commentary on the author's coverage" framing. No-name /
        // placeholder → publication-as-voice framing where quotes are attributed
        // to the publication and to specific contributors only when the source
        // text itself names them inline.
        const authorContextBlock = namedAuthor
          ? `This piece was written by ${namedAuthor} for ${article.publication_name}. Treat ${namedAuthor} as the author throughout: attribute quotes and arguments to them by name, write about their specific framing and choices, and use their last name on second reference.`
          : `This piece ran in ${article.publication_name} without a single named author — it's a publication-level piece (a roundup, a staff editorial, a multi-contributor newsletter, a transcript of a panel, or similar). Do NOT invent or guess at an author. Do NOT use the words "Various", "Various Authors", "Unknown", or "Staff" as if they were a person's name; never write a sentence like 'Various writes...' or 'According to Various...'. Instead, attribute quotes and arguments to ${article.publication_name} as the source ("${article.publication_name} reports...", "the piece argues...", "the editors note..."). If the source text itself names a specific contributor, expert, or quoted speaker inline, you may attribute their specific quotes to that named person; otherwise the unit of attribution is the publication.`;

        const quoteAttributionExamples = namedAuthor
          ? `'${namedAuthor} writes, "..."' or 'As ${namedAuthor} puts it, "..."'`
          : `'${article.publication_name} reports, "..."', 'the piece argues that "..."', or — when a contributor is named in the source text itself — 'Smith, quoted in the piece, says "..."'`;

        const prompt = `You are a commentator at a curated reading library. Your readers are smart, busy people who use text-to-speech. Your job: write commentary on this piece that makes them glad they spent 15 minutes with you. You are not rewriting the article — you are commenting on the coverage, weaving in direct quotes and paraphrasing throughout.

EDITORIAL POLICY: Do NOT mention "Trump" or "Donald Trump" in your commentary. If the source article centers on Trump's actions or reactions, reframe around the underlying news event, the policy effect, the stakeholders affected, or institutional dynamics. The reader wants analysis of what is happening in the world — not coverage of one politician's personality or reactions. Use "the administration", "the White House", "the executive branch", or the specific agency/official by name when referring to the actions of US government actors.

ABOUT THIS PIECE
${authorContextBlock}

TITLE: "${article.title}"
PUBLICATION: ${article.publication_name}
${wikiContext}

SOURCE TEXT:
${textForLlm}

YOUR COMMENTARY APPROACH:

1. HOOK (opening 2-3 sentences):
Open by framing what makes this piece notable. What is its most surprising or distinctive claim? What evidence does it bring that you won't find elsewhere? Why should someone care right now? This is not a summary — it's a hook. Make the reader think "I need to hear this."

2. COMMENTARY (the meat):
Your commentary engages directly with the coverage — what was argued, how it was argued, and what it means. This is NOT a rewrite of the article. It is your editorial voice responding.
- Write in third person. ${namedAuthor ? `First mention of the author: full name. After that: last name only.` : `Refer to the source as the publication ("${article.publication_name}") or as "the piece" / "the article". Do not invent an author name.`}
- DIRECT QUOTES: Pull 4-8 of the strongest, most distinctive sentences from the source and quote them directly. Introduce each with attribution: ${quoteAttributionExamples}. Choose quotes that carry real weight — the ones a reader would highlight.
- PARAPHRASING: Between quotes, paraphrase the author's arguments in your own words. Summarize their reasoning, then comment on it. "The core of the argument is..." followed by your take: "This lands because..." or "This overlooks..."
- COMMENTARY LACED THROUGHOUT: After each major point or quote, add a sentence or two of editorial judgment. Does this evidence hold up? Is this framing effective? What context is missing? Your voice should be present on every page, not just at the end.
- Add clear ## section headings where the coverage shifts.
- Vary sentence AND paragraph length dramatically for rhythm.
- Replace jargon with plain language. Spell out acronyms.
- Remove self-referential platform language (newsletter CTAs, "subscribe", "like and share", channel plugs, "paid subscribers", "as I wrote last week").
- For video transcripts: clean up speech artifacts (stutters, repetition, filler). Quote cleaned-up versions of what was said, attributed to the speaker.

3. COUNTERPOINTS (woven in, not bolted on):
Where the argument is weakest or where reasonable people disagree, add a sentence: "Critics might note..." or "A counterargument worth considering..." Keep it brief. The overall stance remains the author's. 1-3 per article depending on length.

4. PULL QUOTE (one per article):
Select the single most striking sentence — either a direct quote from the author or your sharpest editorial line. Format as a blockquote (> ) between sections.

5. BOTTOM LINE (final section):
End with a ## Bottom Line section — 2-3 sentences of editorial judgment. Not a summary. A verdict: What's the strongest part of this argument? What's its biggest vulnerability? What should the reader watch for next?

TONE — CRITICAL:
- For articles involving conflict, war, or violence: center the human cost. Civilian casualties are not footnotes. Give them weight.
- Never glorify military operations or use breathless language about weapons/strikes. Write with gravity.
- Present multiple perspectives: military rationale AND humanitarian consequences, government claims AND civilian experience.
- Question official framing when the evidence warrants it. If "precision strikes" hit schools, say so plainly.
- For any topic with human suffering: write with empathy, not detachment.

FORMATTING:
- Do NOT start with the title. It's displayed separately.
- Do NOT start with "Imagine..." or any hypothetical device.
- Do NOT write meta-commentary ("Here's the rewrite", "I've adapted...").
- Use **bold** for emphasis. ## for headings. > for pull quotes/blockquotes.
- Plain text only. No HTML.

STYLE EXAMPLE:
"Matt Yglesias makes an argument that's been strangely absent from progressive discourse: the strongest case for zoning reform isn't economic efficiency — it's racial justice.

## The Forgotten Precedent

Yglesias opens with a case most readers won't know. "The first major Supreme Court victory against segregation wasn't Brown v. Board," he writes. "It was Buchanan v. Warley in 1917 — and it was about zoning." He traces how explicit racial zoning was struck down but land use policy quietly preserved the same boundaries. The argument is effective because it reframes something familiar — housing discrimination — through a lens that even policy wonks rarely use.

Drawing on Rothstein's *The Color of Law*, Yglesias argues that "the Civil Rights Act dismantled segregation in schools and lunch counters, but never touched the zoning codes that kept neighborhoods divided." This is the piece's strongest move: connecting a well-known book to a specific, actionable policy failure.

> Housing policy was built on racist foundations, and we never tore them up. We just stopped talking about it.

Critics might note that framing housing as the *primary* driver of structural racism risks minimizing the very real harms of policing and mass incarceration. The two systems reinforce each other. Yglesias acknowledges this but doesn't fully resolve it.

## Bottom Line

Yglesias's core argument is strong: the academic consensus on housing and racial inequality is clear, and the activist movement hasn't caught up. His biggest vulnerability is strategic — he admits the racial justice framing might hurt the political coalition needed to actually pass reform. That tension is unresolved, and it's the most interesting part of the piece."

Output ONLY the JSON. No preamble, no explanation, no markdown fences.
{"content": "your commentary text here"}`;

        const genStart = Date.now();
        const responseText = await generateText(prompt, {
          temperature: 0.5,
          numPredict: 12000,
          timeout: 900_000,
        });
        const genMs = Date.now() - genStart;

        // Parse response — extract content from JSON, strip preamble
        let rewrittenText: string;
        let affiliateLinks: AffiliateLink[] = [];
        let jsonParsed = false;
        try {
          let cleaned = responseText.trim();
          // Strip think tags and code fences
          cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
          cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();
          // Try to find JSON object anywhere in the response
          const jsonMatch = cleaned.match(/\{[\s\S]*"content"\s*:\s*"[\s\S]*"\s*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]) as { content: string; affiliateLinks?: AffiliateLink[] };
            rewrittenText = parsed.content ?? '';
            affiliateLinks = parsed.affiliateLinks ?? [];
            jsonParsed = true;
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

        // Clean LLM preamble — track if cleanup was needed
        const beforeClean = rewrittenText;
        rewrittenText = cleanPreamble(rewrittenText);
        const preambleCleaned = rewrittenText !== beforeClean;

        if (rewrittenText.length < 200) {
          console.info('  Rewrite too short, skipping');
          errors++;
          continue;
        }

        // Convert to HTML, clean any residual artifacts, and save
        const rawHtml = textToHtml(rewrittenText);
        const { cleaned: html, changed: htmlCleaned } = cleanHtml(rawHtml);
        const rewritePath = `rewritten/${article.publication_slug}/${article.slug}.html`;
        const rewriteFullPath = join(process.cwd(), 'library', rewritePath);

        await mkdir(dirname(rewriteFullPath), { recursive: true });
        await writeFile(rewriteFullPath, html, 'utf-8');

        // Update DB
        const modelName = process.env.OLLAMA_MODEL ?? 'unknown';
        await pool.query(
          'UPDATE app.articles SET rewritten_content_path = $1, rewrite_dirty = false, rewrite_model = $3, rewritten_at = NOW(), updated_at = NOW() WHERE id = $2',
          [rewritePath, article.id, modelName]
        );

        const wordCount = countWords(rewrittenText);
        rewritten++;
        console.info(`  Rewrote: ${wordCount} words → ${rewritePath}`);

        // Structured metrics for reporting
        console.info(`  METRIC: ${JSON.stringify({
          type: 'article-rewrite',
          title: article.title,
          slug: article.slug,
          content_source: contentSource,
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
        // ── Post-rewrite tagging ────────────────────────────────────
        try {
          const { rows: existingTags } = await pool.query<{ count: string }>(
            'SELECT COUNT(*) as count FROM app.article_tags WHERE article_id = $1',
            [article.id]
          );
          if (parseInt(existingTags[0].count, 10) < 2 && tagList.length > 0) {
            const tagExcerpt = textForLlm.slice(0, 500);

            // Get wiki topics for tagging context
            let tagWikiContext = '';
            try {
              const { rows: tagWikiTopics } = await pool.query<{ title: string }>(`
                SELECT w.title FROM app.article_wikipedia_links awl
                JOIN app.wikipedia_articles w ON awl.wikipedia_id = w.id
                WHERE awl.article_id = $1
              `, [article.id]);
              if (tagWikiTopics.length > 0) {
                tagWikiContext = `\nRelated topics: ${tagWikiTopics.map(w => w.title).join(', ')}`;
              }
            } catch { /* no wiki topics */ }

            const tagPrompt = `Score this article against each tag. Return ONLY valid JSON.

ARTICLE: "${article.title}" from ${article.publication_name}
EXCERPT: ${tagExcerpt}${tagWikiContext}

TAGS:
${tagList}

For each tag, score 0-100 how well it matches this article. 100 = primary topic. 50+ = clearly relevant. Below 30 = not relevant, omit it.

Return ONLY tags scoring 30+. Output valid JSON, no explanation:
{"tags": [{"slug": "tag-slug", "score": 85}]}`;

            const tagResponse = await generateText(tagPrompt, {
              temperature: 0.2,
              numPredict: 1500,
            });

            // Parse tag response
            let tagScores: Array<{ slug: string; score: number }> = [];
            let tagCleaned = tagResponse.trim();
            tagCleaned = tagCleaned.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
            tagCleaned = tagCleaned.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();
            const tagJsonMatch = tagCleaned.match(/\{[\s\S]*\}/);
            if (tagJsonMatch) {
              const parsed = JSON.parse(tagJsonMatch[0]) as { tags: Array<{ slug: string; score: number }> };
              tagScores = parsed.tags ?? [];
            }

            // Insert valid tags
            for (const ts of tagScores) {
              if (!validSlugs.has(ts.slug)) {continue;}
              if (ts.score < 30 || ts.score > 100) {continue;}
              await pool.query(
                `INSERT INTO app.article_tags (article_id, tag_slug, score, tag_model)
                 VALUES ($1, $2, $3, $4)
                 ON CONFLICT (article_id, tag_slug) DO UPDATE SET score = EXCLUDED.score, tag_model = EXCLUDED.tag_model`,
                [article.id, ts.slug, ts.score, modelName]
              );
            }

            const validTags = tagScores.filter(t => validSlugs.has(t.slug) && t.score >= 30 && t.score <= 100);
            if (validTags.length > 0) {
              console.info(`  Tagged: ${validTags.map(t => `${t.slug}:${t.score}`).join(', ')}`);
            }
          }
        } catch (tagErr) {
          console.info(`  Tagging failed (non-fatal): ${tagErr instanceof Error ? tagErr.message : String(tagErr)}`);
        }
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
