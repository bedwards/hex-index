/**
 * Job 7: Tag articles
 *
 * Deterministic orchestrator + LLM for tag assignment.
 * Reads article title + excerpt, asks LLM to score against curated tag pool.
 * Stores scores in article_tags table.
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { generateText } from '../../src/wikipedia/ollama.js';

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : 50;
const minTagsIdx = args.indexOf('--min-tags');
const MIN_TAGS = minTagsIdx >= 0 ? parseInt(args[minTagsIdx + 1], 10) : 2;

// ── Main ────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {throw new Error('DATABASE_URL required');}

  const pool = new Pool({ connectionString: dbUrl });

  try {
    // Load the curated tag pool
    const { rows: tags } = await pool.query<{ slug: string; name: string; description: string }>(
      'SELECT slug, name, description FROM app.tags ORDER BY slug'
    );
    const tagList = tags.map(t => `${t.slug}: ${t.name} — ${t.description}`).join('\n');

    // Find articles with fewer than MIN_TAGS tags
    const { rows: articles } = await pool.query<{
      id: string;
      title: string;
      content_path: string | null;
      publication_name: string;
    }>(`
      SELECT a.id, a.title, a.content_path, p.name AS publication_name
      FROM app.articles a
      JOIN app.publications p ON a.publication_id = p.id
      WHERE a.content_path IS NOT NULL
        AND (SELECT COUNT(*) FROM app.article_tags at WHERE at.article_id = a.id) < $1
      ORDER BY a.published_at DESC NULLS LAST
      LIMIT $2
    `, [MIN_TAGS, LIMIT]);

    if (articles.length === 0) {
      console.info('No articles need tagging');
      return;
    }

    console.info(`Found ${articles.length} articles to tag`);

    let tagged = 0;
    let errors = 0;

    for (const article of articles) {
      console.info(`\n[${tagged + errors + 1}/${articles.length}] ${article.title}`);

      try {
        // Load excerpt for context
        let excerpt = '';
        if (article.content_path) {
          try {
            const htmlPath = join(process.cwd(), 'library', article.content_path);
            const html = await readFile(htmlPath, 'utf-8');
            excerpt = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 1000);
          } catch { /* title only */ }
        }

        // Get wiki topics if any
        const { rows: wikiTopics } = await pool.query<{ title: string }>(`
          SELECT w.title FROM app.article_wikipedia_links awl
          JOIN app.wikipedia_articles w ON awl.wikipedia_id = w.id
          WHERE awl.article_id = $1
        `, [article.id]);
        const wikiContext = wikiTopics.length > 0
          ? `\nRelated topics: ${wikiTopics.map(w => w.title).join(', ')}`
          : '';

        const prompt = `Score this article against each tag. Return ONLY valid JSON.

ARTICLE: "${article.title}" from ${article.publication_name}
EXCERPT: ${excerpt.slice(0, 500)}${wikiContext}

TAGS:
${tagList}

For each tag, score 0-100 how well it matches this article. 100 = primary topic. 50+ = clearly relevant. Below 30 = not relevant, omit it.

Return ONLY tags scoring 30+. Output valid JSON, no explanation:
{"tags": [{"slug": "tag-slug", "score": 85}]}`;

        const responseText = await generateText(prompt, {
          temperature: 0.2,
          numPredict: 1500,
        });

        // Parse response
        let tagScores: Array<{ slug: string; score: number }> = [];
        try {
          let cleaned = responseText.trim();
          cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
          cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();
          const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]) as { tags: Array<{ slug: string; score: number }> };
            tagScores = parsed.tags ?? [];
          }
        } catch {
          console.info('  Failed to parse tags');
          errors++;
          continue;
        }

        // Validate and insert
        const validSlugs = new Set(tags.map(t => t.slug));
        let inserted = 0;
        for (const ts of tagScores) {
          if (!validSlugs.has(ts.slug)) {continue;}
          if (ts.score < 30 || ts.score > 100) {continue;}

          try {
            const modelName = process.env.OLLAMA_MODEL ?? 'unknown';
            await pool.query(
              `INSERT INTO app.article_tags (article_id, tag_slug, score, tagged_by)
               VALUES ($1, $2, $3, $4)
               ON CONFLICT (article_id, tag_slug) DO UPDATE SET score = EXCLUDED.score, tagged_by = EXCLUDED.tagged_by`,
              [article.id, ts.slug, ts.score, modelName]
            );
            inserted++;
          } catch { /* skip duplicates */ }
        }

        tagged++;
        console.info(`  Tagged: ${tagScores.map(t => `${t.slug}:${t.score}`).join(', ')} (${inserted} saved)`);
      } catch (err: unknown) {
        errors++;
        console.info(`  Error: ${err instanceof Error ? err.message : String(err)}`);
      }

      await new Promise(r => setTimeout(r, 500));
    }

    console.info(`\nDone: ${tagged} tagged, ${errors} errors`);
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
