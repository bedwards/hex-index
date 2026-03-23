/**
 * Job: Consolidate weekly Reader articles by source
 *
 * Runs Thursday night before epub generation. For each publication (source)
 * with multiple articles in the current week:
 *   1. Selects the best 3 that differentiate from one another (LLM)
 *   2. Rewrites commentary covering all selected articles (LLM)
 *   3. Picks the single best deep dive from all available (LLM)
 *   4. Stores consolidated entry in app.weekly_consolidated
 *
 * Sources with only one article are stored as-is (no LLM needed).
 * The epub generator reads from weekly_consolidated when available.
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { generateText } from '../../src/wikipedia/ollama.js';
import { cleanPreamble } from './clean-llm-output.js';

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const weekLabelIdx = args.indexOf('--week');
const WEEK_LABEL = weekLabelIdx >= 0 ? args[weekLabelIdx + 1] : null;

// ── HTML conversion (shared with article-rewrite) ───────────────────
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

// ── Types ───────────────────────────────────────────────────────────

interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  author_name: string | null;
  original_url: string;
  publication_id: string;
  publication_name: string;
  publication_slug: string;
  published_at: string | null;
  rewritten_content_path: string | null;
  content_path: string | null;
  tag_slug: string | null;
  tag_score: number | null;
}

interface DeepDiveRow {
  wikipedia_id: string;
  title: string;
  slug: string;
  article_id: string;
  article_title: string;
  estimated_read_time_minutes: number;
}

// ── Week calculation (matches weekly.ts) ────────────────────────────

function getWeekRange(date: Date): { label: string; start: Date; end: Date } {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay();
  const diffToSat = day >= 6 ? day - 6 : day + 1;
  const saturday = new Date(d);
  saturday.setUTCDate(d.getUTCDate() - diffToSat);
  saturday.setUTCHours(0, 0, 0, 0);

  const friday = new Date(saturday);
  friday.setUTCDate(saturday.getUTCDate() + 6);
  friday.setUTCHours(12, 30, 0, 0);

  const label = `hex-index-${friday.getUTCFullYear()}-${String(friday.getUTCMonth() + 1).padStart(2, '0')}-${String(friday.getUTCDate()).padStart(2, '0')}`;

  return { label, start: saturday, end: friday };
}

// ── Main ────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) { throw new Error('DATABASE_URL required'); }

  const pool = new Pool({ connectionString: dbUrl });

  try {
    // Run migration if needed
    await pool.query(`
      CREATE TABLE IF NOT EXISTS app.weekly_consolidated (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        week_label TEXT NOT NULL,
        publication_id UUID NOT NULL REFERENCES app.publications(id) ON DELETE CASCADE,
        article_ids UUID[] NOT NULL,
        consolidated_content_path TEXT,
        deep_dive_wikipedia_id UUID REFERENCES app.wikipedia_articles(id),
        tag_slug TEXT REFERENCES app.tags(slug),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(week_label, publication_id)
      )
    `);

    // Add affiliate_links column if not present
    await pool.query(`
      ALTER TABLE app.weekly_consolidated ADD COLUMN IF NOT EXISTS affiliate_links JSONB NOT NULL DEFAULT '[]'::jsonb
    `);

    const baseWeek = getWeekRange(new Date());
    const week = WEEK_LABEL
      ? { ...baseWeek, label: WEEK_LABEL }
      : baseWeek;

    console.info(`Consolidating week: ${week.label}`);

    // Check if already consolidated
    const { rows: existing } = await pool.query<{ count: string }>(
      'SELECT COUNT(*) AS count FROM app.weekly_consolidated WHERE week_label = $1',
      [week.label]
    );
    if (parseInt(existing[0].count, 10) > 0) {
      console.info('Already consolidated for this week. Use --force to re-run.');
      if (!args.includes('--force')) { return; }
      await pool.query('DELETE FROM app.weekly_consolidated WHERE week_label = $1', [week.label]);
      console.info('Cleared existing consolidation.');
    }

    // Get all articles for the week with their best tag
    const { rows: articles } = await pool.query<ArticleRow>(`
      SELECT DISTINCT ON (a.id)
        a.id, a.title, a.slug, a.author_name, a.original_url,
        a.publication_id, p.name AS publication_name, p.slug AS publication_slug,
        a.published_at, a.rewritten_content_path, a.content_path,
        at.tag_slug, at.score AS tag_score
      FROM app.articles a
      JOIN app.publications p ON a.publication_id = p.id
      LEFT JOIN app.article_tags at ON at.article_id = a.id
      WHERE a.published_at >= $1 AND a.published_at < $2
      ORDER BY a.id, at.score DESC NULLS LAST
    `, [week.start.toISOString(), week.end.toISOString()]);

    if (articles.length === 0) {
      console.info('No articles for this week');
      return;
    }

    // Group by publication
    const byPub = new Map<string, ArticleRow[]>();
    for (const a of articles) {
      if (!byPub.has(a.publication_id)) { byPub.set(a.publication_id, []); }
      byPub.get(a.publication_id)!.push(a);
    }

    console.info(`${articles.length} articles across ${byPub.size} sources`);

    let consolidated = 0;
    let llmCalls = 0;

    for (const [pubId, pubArticles] of byPub) {
      const pubName = pubArticles[0].publication_name;
      const pubSlug = pubArticles[0].publication_slug;

      if (pubArticles.length === 1) {
        // Single article — no consolidation needed (deterministic)
        const a = pubArticles[0];
        const deepDive = await getBestDeepDive(pool, [a.id]);
        const singleLinks = await getTopAffiliateLinks(pool, [a.id]);

        await pool.query(`
          INSERT INTO app.weekly_consolidated
            (week_label, publication_id, article_ids, consolidated_content_path, deep_dive_wikipedia_id, tag_slug, affiliate_links)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (week_label, publication_id) DO UPDATE SET
            article_ids = EXCLUDED.article_ids,
            consolidated_content_path = EXCLUDED.consolidated_content_path,
            deep_dive_wikipedia_id = EXCLUDED.deep_dive_wikipedia_id,
            tag_slug = EXCLUDED.tag_slug,
            affiliate_links = EXCLUDED.affiliate_links,
            updated_at = NOW()
        `, [week.label, pubId, [a.id], a.rewritten_content_path ?? a.content_path, deepDive?.wikipedia_id ?? null, a.tag_slug, JSON.stringify(singleLinks)]);

        console.info(`  ${pubName}: 1 article (no consolidation needed)`);
        consolidated++;
        continue;
      }

      // Multiple articles from same source — need LLM
      console.info(`  ${pubName}: ${pubArticles.length} articles, selecting best 3...`);

      // Load content summaries for selection
      const summaries: Array<{ id: string; title: string; excerpt: string }> = [];
      for (const a of pubArticles) {
        const contentPath = a.rewritten_content_path ?? a.content_path;
        if (!contentPath) { continue; }
        try {
          const html = await readFile(join(process.cwd(), 'library', contentPath), 'utf-8');
          const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          summaries.push({ id: a.id, title: a.title, excerpt: text.slice(0, 500) });
        } catch { /* skip */ }
      }

      // Step 1: Select best 3 (or all if <=3) — deterministic if <=3
      let selectedIds: string[];
      if (summaries.length <= 3) {
        selectedIds = summaries.map(s => s.id);
      } else {
        // LLM picks best 3 that differentiate
        const selectionPrompt = `From these ${summaries.length} articles by ${pubName}, pick the 3 that are most distinct from each other and most worth reading. Return ONLY a JSON array of the article numbers (1-indexed).

${summaries.map((s, i) => `${i + 1}. "${s.title}"\n   ${s.excerpt}`).join('\n\n')}

Output ONLY the JSON array. Example: [1, 3, 5]`;

        const selResp = await generateText(selectionPrompt, { temperature: 0.2, numPredict: 100 });
        llmCalls++;

        try {
          const cleaned = selResp.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
          const match = cleaned.match(/\[[\d\s,]+\]/);
          if (match) {
            const indices = JSON.parse(match[0]) as number[];
            selectedIds = indices
              .filter(i => i >= 1 && i <= summaries.length)
              .slice(0, 3)
              .map(i => summaries[i - 1].id);
          } else {
            selectedIds = summaries.slice(0, 3).map(s => s.id);
          }
        } catch {
          selectedIds = summaries.slice(0, 3).map(s => s.id);
        }
      }

      const selectedArticles = pubArticles.filter(a => selectedIds.includes(a.id));
      console.info(`    Selected: ${selectedArticles.map(a => a.title).join(', ')}`);

      // Step 2: Generate consolidated commentary covering all selected articles
      const articleTexts: string[] = [];
      for (const a of selectedArticles) {
        const contentPath = a.rewritten_content_path ?? a.content_path;
        if (!contentPath) { continue; }
        try {
          const html = await readFile(join(process.cwd(), 'library', contentPath), 'utf-8');
          const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          articleTexts.push(`ARTICLE: "${a.title}" by ${a.author_name ?? 'Unknown'}\n${text.slice(0, 4000)}`);
        } catch { /* skip */ }
      }

      const consolidationPrompt = `You are a commentator at a curated reading library. Write a single consolidated commentary covering these ${selectedArticles.length} pieces from ${pubName}. Your readers use text-to-speech.

${articleTexts.join('\n\n---\n\n')}

APPROACH:
- Open with a hook that frames what ${pubName} covered this week and why it matters
- Weave together the key arguments, direct quotes, and insights from all ${selectedArticles.length} pieces
- Use third person. Attribute quotes and arguments to their authors by name.
- Pull 2-4 direct quotes total across all pieces
- Add 1-2 counterpoints
- End with a ## Bottom Line that covers the overall thread
- Use ## headings, > for pull quotes, **bold** for emphasis
- Do NOT start with the title or "Imagine..."
- Plain text only, no HTML

Output ONLY the JSON. No preamble.
{"content": "your consolidated commentary here"}`;

      const consResp = await generateText(consolidationPrompt, {
        temperature: 0.5,
        numPredict: 12000,
        timeout: 900_000,
      });
      llmCalls++;

      // Parse response
      let consolidatedText: string;
      try {
        const cleaned = consResp.replace(/<think>[\s\S]*?<\/think>/g, '').trim()
          .replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();
        const jsonMatch = cleaned.match(/\{[\s\S]*"content"\s*:\s*"[\s\S]*"\s*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]) as { content: string };
          consolidatedText = parsed.content ?? '';
        } else {
          consolidatedText = cleaned;
        }
      } catch {
        consolidatedText = consResp
          .replace(/<think>[\s\S]*?<\/think>/g, '')
          .replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '')
          .replace(/^\s*\{\s*"content"\s*:\s*"/, '')
          .replace(/"\s*\}\s*$/, '')
          .trim();
      }

      consolidatedText = cleanPreamble(consolidatedText);

      if (consolidatedText.length < 200) {
        console.info('    Consolidated text too short, falling back to first article');
        const fallback = selectedArticles[0];
        const fallbackLinks = await getTopAffiliateLinks(pool, selectedIds);
        await pool.query(`
          INSERT INTO app.weekly_consolidated
            (week_label, publication_id, article_ids, consolidated_content_path, deep_dive_wikipedia_id, tag_slug, affiliate_links)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (week_label, publication_id) DO UPDATE SET
            article_ids = EXCLUDED.article_ids,
            consolidated_content_path = EXCLUDED.consolidated_content_path,
            deep_dive_wikipedia_id = EXCLUDED.deep_dive_wikipedia_id,
            tag_slug = EXCLUDED.tag_slug,
            affiliate_links = EXCLUDED.affiliate_links,
            updated_at = NOW()
        `, [week.label, pubId, selectedIds, fallback.rewritten_content_path ?? fallback.content_path, null, fallback.tag_slug, JSON.stringify(fallbackLinks)]);
        consolidated++;
        continue;
      }

      // Save consolidated content
      const html = textToHtml(consolidatedText);
      const contentPath = `consolidated/${week.label}/${pubSlug}.html`;
      const fullPath = join(process.cwd(), 'library', contentPath);
      await mkdir(dirname(fullPath), { recursive: true });
      await writeFile(fullPath, html, 'utf-8');

      // Step 3: Pick best deep dive (deterministic if only one available)
      const allArticleIds = selectedIds;
      const deepDive = await getBestDeepDive(pool, allArticleIds);

      // Determine the dominant tag
      const tagCounts = new Map<string, number>();
      for (const a of selectedArticles) {
        if (a.tag_slug) {
          tagCounts.set(a.tag_slug, (tagCounts.get(a.tag_slug) ?? 0) + (a.tag_score ?? 0));
        }
      }
      let bestTag: string | null = null;
      let bestScore = 0;
      for (const [tag, score] of tagCounts) {
        if (score > bestScore) { bestTag = tag; bestScore = score; }
      }

      const topLinks = await getTopAffiliateLinks(pool, selectedIds);

      await pool.query(`
        INSERT INTO app.weekly_consolidated
          (week_label, publication_id, article_ids, consolidated_content_path, deep_dive_wikipedia_id, tag_slug, affiliate_links)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (week_label, publication_id) DO UPDATE SET
          article_ids = EXCLUDED.article_ids,
          consolidated_content_path = EXCLUDED.consolidated_content_path,
          deep_dive_wikipedia_id = EXCLUDED.deep_dive_wikipedia_id,
          tag_slug = EXCLUDED.tag_slug,
          affiliate_links = EXCLUDED.affiliate_links,
          updated_at = NOW()
      `, [week.label, pubId, selectedIds, contentPath, deepDive?.wikipedia_id ?? null, bestTag, JSON.stringify(topLinks)]);

      console.info(`    Consolidated: ${contentPath} (deep dive: ${deepDive?.title ?? 'none'})`);
      consolidated++;

      await new Promise(r => setTimeout(r, 1000));
    }

    console.info(`\nDone: ${consolidated} sources consolidated, ${llmCalls} LLM calls`);
  } finally {
    await pool.end();
  }
}

/**
 * Aggregate the best affiliate links across selected articles, deduped by ASIN.
 */
async function getTopAffiliateLinks(
  pool: Pool,
  articleIds: string[],
  limit: number = 3
): Promise<Array<{asin: string; title: string; author: string; description: string; category: string}>> {
  if (articleIds.length === 0) { return []; }

  const { rows } = await pool.query<{ affiliate_links: Array<{asin: string; title: string; author: string; description: string; category: string}> }>(`
    SELECT affiliate_links FROM app.articles
    WHERE id = ANY($1) AND affiliate_links IS NOT NULL AND jsonb_array_length(affiliate_links) > 0
  `, [articleIds]);

  // Flatten and dedupe by ASIN, take first N
  const seen = new Set<string>();
  const all: Array<{asin: string; title: string; author: string; description: string; category: string}> = [];
  for (const row of rows) {
    for (const link of row.affiliate_links) {
      if (!seen.has(link.asin)) {
        seen.add(link.asin);
        all.push(link);
      }
    }
  }
  return all.slice(0, limit);
}

/**
 * Pick the best deep dive from all articles' wikipedia links.
 * If only one available, return it (deterministic).
 * If multiple, pick the one with the highest word count (deterministic heuristic — no LLM needed).
 */
async function getBestDeepDive(
  pool: Pool,
  articleIds: string[]
): Promise<DeepDiveRow | null> {
  if (articleIds.length === 0) { return null; }

  const { rows } = await pool.query<DeepDiveRow>(`
    SELECT
      w.id AS wikipedia_id, w.title, w.slug,
      awl.article_id, a.title AS article_title,
      w.estimated_read_time_minutes
    FROM app.article_wikipedia_links awl
    JOIN app.wikipedia_articles w ON awl.wikipedia_id = w.id
    JOIN app.articles a ON awl.article_id = a.id
    WHERE awl.article_id = ANY($1)
      AND w.status = 'complete'
    ORDER BY w.word_count DESC NULLS LAST, awl.relevance_rank ASC
  `, [articleIds]);

  return rows[0] ?? null;
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
