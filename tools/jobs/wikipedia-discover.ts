/**
 * Job 2: Wikipedia topic discovery
 *
 * Deterministic orchestrator that:
 *   1. Finds articles without 3 wikipedia links (reverse chronological)
 *   2. For each, calls LLM once to identify 3 topics (returns JSON)
 *   3. Scrapes raw Wikipedia content for each topic
 *   4. Stores stub wikipedia_articles (status='stub') with raw content
 *   5. Links them to the article
 *
 * The LLM's only job: given article text, return JSON with 3 topic suggestions.
 * Everything else (validation, scraping, DB writes) is deterministic.
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { readFile } from 'fs/promises';
import { generateText } from '../../src/wikipedia/ollama.js';
import {
  scrapeWikipedia,
  searchWikipedia,
  normalizeWikipediaUrl,
  formatContentAsHtml,
} from '../../src/wikipedia/scraper.js';
import {
  extractWikipediaLinks,
  extractKeyTerms,
} from '../../src/wikipedia/analyzer.js';
import { slugify } from '../../src/wikipedia/rewriter.js';

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : 50;
const articleIdIdx = args.indexOf('--article-id');
const ARTICLE_IDS: string[] = [];
if (articleIdIdx >= 0) {
  // Collect all values after --article-id until next flag or end
  for (let i = articleIdIdx + 1; i < args.length && !args[i].startsWith('--'); i++) {
    ARTICLE_IDS.push(args[i]);
  }
}

// ── Types ───────────────────────────────────────────────────────────
interface TopicResult {
  topic: string;
  reason: string;
}

interface LlmResponse {
  topics: TopicResult[];
}

// ── Main ────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL required');
  }

  const pool = new Pool({ connectionString: dbUrl });

  try {
    // Find articles that don't have 3 wikipedia links yet
    let articleQuery: string;
    let articleParams: unknown[];
    if (ARTICLE_IDS.length > 0) {
      articleQuery = `
        SELECT
          a.id, a.title, a.content_path,
          p.name AS publication_name,
          COALESCE(wc.cnt, 0) AS link_count
        FROM app.articles a
        JOIN app.publications p ON a.publication_id = p.id
        LEFT JOIN (
          SELECT article_id, COUNT(*) AS cnt
          FROM app.article_wikipedia_links
          GROUP BY article_id
        ) wc ON wc.article_id = a.id
        WHERE a.content_path IS NOT NULL
          AND COALESCE(wc.cnt, 0) < 3
          AND a.id = ANY($1)
        ORDER BY a.published_at DESC NULLS LAST
      `;
      articleParams = [ARTICLE_IDS];
    } else {
      articleQuery = `
        SELECT
          a.id, a.title, a.content_path,
          p.name AS publication_name,
          COALESCE(wc.cnt, 0) AS link_count
        FROM app.articles a
        JOIN app.publications p ON a.publication_id = p.id
        LEFT JOIN (
          SELECT article_id, COUNT(*) AS cnt
          FROM app.article_wikipedia_links
          GROUP BY article_id
        ) wc ON wc.article_id = a.id
        WHERE a.content_path IS NOT NULL
          AND COALESCE(wc.cnt, 0) < 3
        ORDER BY a.published_at DESC NULLS LAST
        LIMIT $1
      `;
      articleParams = [LIMIT];
    }
    const { rows: articles } = await pool.query<{
      id: string;
      title: string;
      content_path: string;
      publication_name: string;
      link_count: string;
    }>(articleQuery, articleParams);

    console.info(`Found ${articles.length} articles needing wikipedia topics`);

    let discovered = 0;
    let errors = 0;

    for (const article of articles) {
      console.info(`\n[${discovered + errors + 1}/${articles.length}] ${article.title}`);

      try {
        const existingLinks = parseInt(article.link_count, 10);
        const slotsNeeded = 3 - existingLinks;

        // Load article HTML
        const htmlPath = join(process.cwd(), 'library', article.content_path);
        let articleHtml: string;
        try {
          articleHtml = await readFile(htmlPath, 'utf-8');
        } catch {
          console.info('  Skipping: content file not found');
          continue;
        }

        // Step 1: Try to get topics from existing wikipedia links in the article (no LLM)
        const existingWikiLinks = extractWikipediaLinks(articleHtml);
        const validatedTopics: Array<{ topic: string; url: string; reason: string }> = [];

        // Get already-linked wikipedia URLs to avoid duplicates
        const { rows: alreadyLinked } = await pool.query<{ original_url: string }>(`
          SELECT w.original_url
          FROM app.article_wikipedia_links awl
          JOIN app.wikipedia_articles w ON awl.wikipedia_id = w.id
          WHERE awl.article_id = $1
        `, [article.id]);
        const linkedUrls = new Set(alreadyLinked.map(r => r.original_url));

        for (const link of existingWikiLinks) {
          if (validatedTopics.length >= slotsNeeded) {break;}
          try {
            const normalized = normalizeWikipediaUrl(link);
            if (linkedUrls.has(normalized)) {continue;}
            const topicMatch = link.match(/\/wiki\/([^#?]+)/);
            if (topicMatch) {
              const topic = decodeURIComponent(topicMatch[1].replace(/_/g, ' '));
              validatedTopics.push({
                topic,
                url: normalized,
                reason: `Referenced in the article`,
              });
              linkedUrls.add(normalized);
              console.info(`  From article links: ${topic}`);
            }
          } catch { /* invalid url, skip */ }
        }

        // Step 2: If we still need more, ask the LLM
        if (validatedTopics.length < slotsNeeded) {
          const remaining = slotsNeeded - validatedTopics.length;
          const keyTerms = extractKeyTerms(articleHtml);

          const $ = (await import('cheerio')).load(articleHtml);
          $('.subscribe-widget, .subscription-widget, .share, .button-wrapper').remove();
          const articleText = $('body').text().slice(0, 3000);

          const alreadyUsed = validatedTopics.map(t => t.topic);

          const prompt = `Select ${remaining} Wikipedia articles that give readers essential context for this piece. Pick specific topics — named events, people, laws, concepts — not broad categories like "Economics" or "History."

ARTICLE: "${article.title}" from ${article.publication_name}

EXCERPT:
${articleText}

KEY TERMS: ${keyTerms.join(', ')}
${alreadyUsed.length > 0 ? `ALREADY SELECTED (do not repeat): ${alreadyUsed.join(', ')}` : ''}

GOOD EXAMPLE: {"topics": [{"topic": "Smoot–Hawley Tariff Act", "reason": "The article discusses trade policy history"}]}
BAD EXAMPLE: {"topics": [{"topic": "Economics", "reason": "Related to the topic"}]}

Output ONLY the JSON object. No explanation, no preamble, no markdown fences.
{"topics": [{"topic": "Exact Wikipedia Article Title", "reason": "One sentence"}]}`;

          const responseText = await generateText(prompt, {
            temperature: 0.3,
            numPredict: 2000,
          });

          // Parse LLM JSON response
          let llmTopics: TopicResult[] = [];
          try {
            // Strip markdown code fences and any residual think tags
            let cleaned = responseText.trim();
            cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
            cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();
            // Try to extract JSON object from the text
            const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0]) as LlmResponse;
              llmTopics = parsed.topics ?? [];
            } else {
              throw new Error('No JSON object found');
            }
          } catch {
            console.info(`  LLM returned invalid JSON, falling back to line parsing`);
            // Fallback: try to extract topic names from plain text
            // Filter out think-tag residue, short lines, JSON fragments
            const lines = responseText
              .replace(/<think>[\s\S]*?<\/think>/g, '')
              .split('\n')
              .map(l => l.replace(/^```\w*/, '').replace(/^\d+[.)]\s*/, '').replace(/^[-*]\s+/, '').trim())
              .filter(l =>
                l.length > 3 &&
                l.length < 150 &&
                !l.startsWith('{') && !l.startsWith('}') &&
                !l.startsWith('<') &&
                !l.startsWith('The user') &&
                !l.startsWith('Looking at') &&
                !l.startsWith('I ') &&
                !l.includes('```') &&
                !l.includes('topic') &&
                !l.includes('reason')
              );
            llmTopics = lines.slice(0, remaining).map(t => ({ topic: t, reason: 'Related topic' }));
          }

          console.info(`  LLM suggested: ${llmTopics.map(t => t.topic).join(', ')}`);

          // Validate each LLM topic against Wikipedia
          for (const lt of llmTopics) {
            if (validatedTopics.length >= slotsNeeded) {break;}
            if (alreadyUsed.some(t => t.toLowerCase() === lt.topic.toLowerCase())) {continue;}

            const url = await searchWikipedia(lt.topic);
            if (!url) {
              console.info(`    Not found on Wikipedia: ${lt.topic}`);
              continue;
            }

            try {
              const normalized = normalizeWikipediaUrl(url);
              if (linkedUrls.has(normalized)) {continue;}

              validatedTopics.push({ topic: lt.topic, url: normalized, reason: lt.reason });
              linkedUrls.add(normalized);
              alreadyUsed.push(lt.topic);
              console.info(`    Validated: ${lt.topic}`);
            } catch { /* invalid url */ }
          }
        }

        if (validatedTopics.length === 0) {
          console.info('  No valid topics found');
          continue;
        }

        // Step 3: Scrape Wikipedia and store stubs
        let rank = existingLinks + 1;
        for (const vt of validatedTopics) {
          try {
            // Check if wikipedia article already exists
            const { rows: existing } = await pool.query<{ id: string; status: string }>(
              'SELECT id, status FROM app.wikipedia_articles WHERE original_url = $1',
              [vt.url]
            );

            let wikiId: string;

            if (existing.length > 0) {
              wikiId = existing[0].id;
              console.info(`    Reusing existing: ${vt.topic} (${existing[0].status})`);
            } else {
              // Scrape and store as stub
              console.info(`    Scraping: ${vt.topic}`);
              const content = await scrapeWikipedia(vt.url);

              // Store raw scraped HTML (not rewritten)
              const slug = slugify(content.title);
              const contentPath = `wikipedia/${slug}.raw.html`;
              const fullPath = join(process.cwd(), 'library', contentPath);
              await mkdir(dirname(fullPath), { recursive: true });

              const rawHtml = formatContentAsHtml(content);
              await writeFile(fullPath, rawHtml, 'utf-8');

              // Ensure unique slug — append hash suffix on collision
              let finalSlug = slug;
              const { rows: slugCheck } = await pool.query<{ id: string }>(
                'SELECT id FROM app.wikipedia_articles WHERE slug = $1 AND original_url != $2',
                [slug, vt.url]
              );
              if (slugCheck.length > 0) {
                finalSlug = `${slug}-${vt.url.split('/').pop()?.slice(0, 20) ?? Date.now()}`;
              }

              // Insert as stub
              const { rows: inserted } = await pool.query<{ id: string }>(`
                INSERT INTO app.wikipedia_articles (
                  title, slug, original_url, content_path,
                  word_count, estimated_read_time_minutes, source_word_count, status
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'stub')
                ON CONFLICT (original_url) DO UPDATE SET
                  updated_at = NOW()
                RETURNING id
              `, [
                content.title,
                finalSlug,
                vt.url,
                contentPath,
                content.wordCount,
                content.estimatedReadTime,
                content.wordCount,
              ]);
              wikiId = inserted[0].id;
              console.info(`    Stored stub: ${vt.topic} (${content.wordCount} words)`);
            }

            // Link to article
            await pool.query(`
              INSERT INTO app.article_wikipedia_links (
                article_id, wikipedia_id, relevance_rank, topic_summary
              ) VALUES ($1, $2, $3, $4)
              ON CONFLICT (article_id, relevance_rank) DO UPDATE SET
                wikipedia_id = EXCLUDED.wikipedia_id,
                topic_summary = EXCLUDED.topic_summary
            `, [article.id, wikiId, rank, vt.reason]);
            rank++;
          } catch (err) {
            console.info(`    Failed: ${vt.topic} — ${err instanceof Error ? err.message : String(err)}`);
          }
        }

        discovered++;
      } catch (err) {
        errors++;
        console.info(`  Error: ${err instanceof Error ? err.message : String(err)}`);
      }

      // Brief pause
      await new Promise(r => setTimeout(r, 500));
    }

    console.info(`\nDone: ${discovered} articles enriched, ${errors} errors`);
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
