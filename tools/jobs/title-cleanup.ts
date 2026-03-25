/**
 * Job: Title cleanup via Qwen LLM
 *
 * Finds articles with title_dirty = true and asks Qwen for a better title.
 * Deterministic cleanup happens first via normalizeTitle(); this job handles
 * titles that still need LLM judgment (too long, unclear, etc.).
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

// ── Main ────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL required');
  }

  const pool = new Pool({ connectionString: dbUrl });

  try {
    // Find articles with dirty titles
    const { rows: articles } = await pool.query<{
      id: string;
      title: string;
      content_path: string | null;
      full_content_path: string | null;
    }>(`
      SELECT id, title, content_path, full_content_path
      FROM app.articles
      WHERE title_dirty = true
      ORDER BY published_at DESC NULLS LAST
      LIMIT $1
    `, [LIMIT]);

    if (articles.length === 0) {
      console.info('No dirty titles to clean');
      return;
    }

    console.info(`Found ${articles.length} articles with dirty titles`);

    let cleaned = 0;
    let errors = 0;
    const today = new Date().toISOString().split('T')[0];

    for (const article of articles) {
      console.info(`\n[${cleaned + errors + 1}/${articles.length}] ${article.title}`);

      try {
        // Load excerpt for context
        let excerpt = '';
        const contentPath = article.full_content_path ?? article.content_path;
        if (contentPath) {
          try {
            const htmlPath = join(process.cwd(), 'library', contentPath);
            const html = await readFile(htmlPath, 'utf-8');
            excerpt = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500);
          } catch { /* title only */ }
        }

        const prompt = `TODAY'S DATE: ${today}

Suggest a better title for this article. The current title is too long, has bad formatting, or isn't descriptive enough.

CURRENT TITLE: "${article.title}"
EXCERPT: ${excerpt}

Requirements:
- Title case. No trailing punctuation. No parenthetical asides. Keep acronyms (AI, ICE, FBI, DOGE) uppercase. 60 chars ideal, 80 max.
- Descriptive and specific
- No clickbait
- No pipe separators or channel names

Output ONLY valid JSON:
{"title": "your suggested title"}`;

        const responseText = await generateText(prompt, {
          temperature: 0.3,
          numPredict: 500,
        });

        // Parse response
        let newTitle = '';
        try {
          let text = responseText.trim();
          text = text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
          text = text.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]) as { title: string };
            newTitle = parsed.title?.trim() ?? '';
          }
        } catch {
          console.info('  Failed to parse LLM response');
          errors++;
          continue;
        }

        if (!newTitle || newTitle.length > 100) {
          console.info(`  Bad title suggestion: "${newTitle}"`);
          errors++;
          continue;
        }

        // Update the title and clear the dirty flag
        await pool.query(
          `UPDATE app.articles SET title = $1, title_dirty = false WHERE id = $2`,
          [newTitle, article.id],
        );

        cleaned++;
        console.info(`  -> "${newTitle}"`);
      } catch (err: unknown) {
        errors++;
        console.info(`  Error: ${err instanceof Error ? err.message : String(err)}`);
      }

      // Small delay between LLM calls
      await new Promise(r => setTimeout(r, 500));
    }

    console.info(`\nDone: ${cleaned} cleaned, ${errors} errors`);
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
