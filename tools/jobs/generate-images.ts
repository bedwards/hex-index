/**
 * Job 5: Article image generation
 *
 * Deterministic orchestrator that:
 *   1. Finds articles without images (reverse chronological)
 *   2. Sends article title + excerpt to Gemini for editorial illustration
 *   3. Processes with ImageMagick to create consistent thumbnails
 *   4. Stores in library/images/ and updates DB
 *
 * Uses Gemini API (not CLI) for image generation.
 * Uses ImageMagick for resizing/cropping to consistent thumbnail dimensions.
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { execSync } from 'child_process';
import * as cheerio from 'cheerio';

// ── Config ──────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : 30;

// Load Gemini key from ~/.config/.env
async function loadGeminiKey(): Promise<string> {
  try {
    const envPath = join(process.env.HOME ?? '/Users/bedwards', '.config', '.env');
    const content = await readFile(envPath, 'utf-8');
    const match = content.match(/GEMINI_API_KEY=(\S+)/);
    if (match) {return match[1];}
  } catch { /* fall through */ }
  throw new Error('GEMINI_API_KEY not found in ~/.config/.env');
}

let GEMINI_KEY = '';
const GEMINI_MODEL = 'gemini-2.5-flash-image';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Social media preview aspect ratio (1.91:1), 2x retina
const THUMB_W = 1200;
const THUMB_H = 630;

// ── Gemini image generation ─────────────────────────────────────────
async function generateImage(articleTitle: string, excerpt: string): Promise<Buffer | null> {
  const prompt = `Hand-drawn charcoal illustration. Broad, confident strokes. Overlapping metaphor and imagery — abstract, evocative, not literal. DO NOT include any text, words, letters, or numbers in the image.

Tea-stained warm parchment background at center, with a smooth vignette that fades to pure white at all edges. The white must be clean #FFFFFF at the borders.

This illustrates the following article:

"${articleTitle}"

${excerpt.slice(0, 1500)}`;

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
  });

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: {
      'x-goog-api-key': GEMINI_KEY,
      'Content-Type': 'application/json',
    },
    body,
    signal: AbortSignal.timeout(60_000),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini ${response.status}: ${text.slice(0, 200)}`);
  }

  const data = await response.json() as {
    candidates?: Array<{
      content?: {
        parts?: Array<{
          inlineData?: { mimeType: string; data: string };
          text?: string;
        }>;
      };
    }>;
  };

  const parts = data.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part.inlineData?.data) {
      return Buffer.from(part.inlineData.data, 'base64');
    }
  }

  return null;
}

// ── ImageMagick processing ──────────────────────────────────────────
function processImage(inputPath: string, outputPath: string): void {
  // Resize to social preview, apply radial vignette fading to pure white at edges
  // Screen-composite with an inverted radial gradient guarantees white edges
  execSync(
    `magick "${inputPath}" -resize ${THUMB_W}x${THUMB_H}^ -gravity center -extent ${THUMB_W}x${THUMB_H} ` +
    `\\( -size ${THUMB_W}x${THUMB_H} radial-gradient:white-black -sigmoidal-contrast 2,55% -negate \\) ` +
    `-alpha off -compose screen -composite -quality 85 "${outputPath}"`,
    { timeout: 15_000 }
  );
}

// ── Main ────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  GEMINI_KEY = await loadGeminiKey();

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {throw new Error('DATABASE_URL required');}

  const pool = new Pool({ connectionString: dbUrl });

  try {
    // Find articles without images
    const { rows: articles } = await pool.query<{
      id: string;
      title: string;
      content_path: string;
      publication_slug: string;
      slug: string;
    }>(`
      SELECT a.id, a.title, a.content_path, p.slug AS publication_slug, a.slug
      FROM app.articles a
      JOIN app.publications p ON a.publication_id = p.id
      WHERE a.image_path IS NULL
        AND a.content_path IS NOT NULL
      ORDER BY a.published_at DESC NULLS LAST
      LIMIT $1
    `, [LIMIT]);

    if (articles.length === 0) {
      console.info('No articles need images');
      return;
    }

    console.info(`Found ${articles.length} articles needing images`);

    const imagesDir = join(process.cwd(), 'library', 'images');
    await mkdir(imagesDir, { recursive: true });

    let generated = 0;
    let errors = 0;

    for (const article of articles) {
      console.info(`\n[${generated + errors + 1}/${articles.length}] ${article.title}`);

      try {
        // Load excerpt for context
        let excerpt = '';
        try {
          const htmlPath = join(process.cwd(), 'library', article.content_path);
          const html = await readFile(htmlPath, 'utf-8');
          const $ = cheerio.load(html);
          $('.subscribe-widget, .subscription-widget, .share, .button-wrapper').remove();
          excerpt = $('body').text().slice(0, 500);
        } catch { /* use title only */ }

        // Generate image
        const imageData = await generateImage(article.title, excerpt);
        if (!imageData) {
          console.info('  No image returned from Gemini');
          errors++;
          continue;
        }

        // Save raw PNG
        const rawPath = join(imagesDir, `${article.id}.png`);
        await writeFile(rawPath, imageData);

        // Process to thumbnail WebP
        const thumbPath = join(imagesDir, `${article.id}.webp`);
        processImage(rawPath, thumbPath);

        // Clean up raw PNG
        const { unlink } = await import('fs/promises');
        await unlink(rawPath);

        // Relative path for DB and static site
        const imagePath = `images/${article.id}.webp`;

        // Update DB
        await pool.query(
          'UPDATE app.articles SET image_path = $1, updated_at = NOW() WHERE id = $2',
          [imagePath, article.id]
        );

        // Also copy to docs/ for the static site
        const docsImageDir = join(process.cwd(), 'docs', 'images');
        await mkdir(docsImageDir, { recursive: true });
        const { copyFile } = await import('fs/promises');
        await copyFile(thumbPath, join(docsImageDir, `${article.id}.webp`));

        generated++;
        console.info(`  Generated thumbnail (${(await import('fs')).statSync(thumbPath).size} bytes)`);
      } catch (err: unknown) {
        errors++;
        const msg = err instanceof Error ? err.message : String(err);
        console.info(`  Error: ${msg}`);
      }

      // Rate limit — Gemini has per-minute quotas
      await new Promise(r => setTimeout(r, 2000));
    }

    console.info(`\nDone: ${generated} images generated, ${errors} errors`);
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
