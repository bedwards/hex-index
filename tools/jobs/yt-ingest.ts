/**
 * Job 6: YouTube ingest
 *
 * Deterministic, no LLM. Scrapes YouTube channels for new videos/streams,
 * extracts transcripts via ytinfo, stores to the same DB tables and filesystem
 * as Substack articles. Downstream jobs (rewrite, discover, images) treat
 * YouTube content identically to Substack.
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';


// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const sourceIdx = args.indexOf('--source');
const SOURCE_FILE = sourceIdx >= 0 ? args[sourceIdx + 1] : 'content/youtube-sources.json';

// ── Types ───────────────────────────────────────────────────────────
interface YouTubeChannel {
  name: string;
  slug: string;
  url: string;
  author?: string;
}

interface YtInfo {
  url: string;
  channel: string;
  title: string;
  description: string;
  transcript: string;
}

// ── YouTube scraping (deterministic, no LLM) ────────────────────────

/**
 * Get video IDs from a channel's videos and streams pages
 */
async function getChannelVideoIds(channelUrl: string): Promise<string[]> {
  const ids = new Set<string>();

  for (const tab of ['/videos', '/streams']) {
    try {
      const response = await fetch(`${channelUrl}${tab}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
        signal: AbortSignal.timeout(15_000),
      });
      if (!response.ok) {continue;}
      const html = await response.text();

      // Extract video IDs from YouTube's embedded JSON
      const matches = html.matchAll(/"videoId":"([^"]+)"/g);
      for (const m of matches) {
        ids.add(m[1]);
      }
    } catch {
      // Channel tab might not exist
    }
  }

  return [...ids];
}

/**
 * Get publish date from YouTube video page
 */
async function getPublishDate(videoUrl: string): Promise<Date | null> {
  try {
    const response = await fetch(videoUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {return null;}
    const html = await response.text();
    const match = html.match(/"publishDate":"([^"]+)"/);
    if (match) {return new Date(match[1]);}
  } catch { /* ignore */ }
  return null;
}

/**
 * Get video info + transcript via ytinfo CLI
 */
function getVideoInfo(videoUrl: string): YtInfo | null {
  try {
    const tmpFile = `/tmp/ytinfo-${Date.now()}.json`;
    execSync(`ytinfo "${videoUrl}" -o "${tmpFile}"`, {
      timeout: 60_000,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    const data = JSON.parse(readFileSync(tmpFile, 'utf-8')) as YtInfo;
    unlinkSync(tmpFile);
    return data;
  } catch {
    return null;
  }
}

/**
 * Convert transcript text to clean HTML (same format as Substack articles)
 */
function transcriptToHtml(transcript: string, _title: string): string {
  // Split into paragraphs on double newlines or long pauses
  const rawParagraphs = transcript.split(/\n\n+/);

  // If no paragraph breaks, split on sentences roughly every 3-5 sentences
  let paragraphs: string[];
  if (rawParagraphs.length <= 2) {
    const sentences = transcript.split(/(?<=[.!?])\s+/);
    paragraphs = [];
    for (let i = 0; i < sentences.length; i += 4) {
      paragraphs.push(sentences.slice(i, i + 4).join(' '));
    }
  } else {
    paragraphs = rawParagraphs;
  }

  const htmlParts = paragraphs
    .map(p => p.trim())
    .filter(p => p.length > 10)
    .map(p => {
      const escaped = p
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<p>${escaped}</p>`;
    });

  return htmlParts.join('\n');
}

/**
 * Slugify a title (same as converter.ts)
 */
function slugify(title: string): string {
  if (!title) {return 'untitled';}
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100);
}

// ── Main ────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {throw new Error('DATABASE_URL required');}

  // Load channel sources
  const sourcesContent = await readFile(SOURCE_FILE, 'utf-8');
  const sources = JSON.parse(sourcesContent) as { channels: YouTubeChannel[] };
  console.info(`Loaded ${sources.channels.length} YouTube channels`);

  const pool = new Pool({ connectionString: dbUrl });

  try {
    let ingested = 0;
    let skipped = 0;
    let errors = 0;

    for (const channel of sources.channels) {
      console.info(`\n${channel.name} (${channel.url})`);

      // Get or create publication
      let pubId: string;
      const { rows: existingPub } = await pool.query<{ id: string }>(
        'SELECT id FROM app.publications WHERE slug = $1',
        [channel.slug]
      );

      if (existingPub.length > 0) {
        pubId = existingPub[0].id;
      } else {
        const { rows: newPub } = await pool.query<{ id: string }>(
          `INSERT INTO app.publications (name, slug, base_url, feed_url, author_name)
           VALUES ($1, $2, $3, $4, $5) RETURNING id`,
          [channel.name, channel.slug, channel.url, `${channel.url}/videos`, channel.author ?? channel.name]
        );
        pubId = newPub[0].id;
        console.info(`  Created publication: ${channel.name}`);
      }

      // Get video IDs from channel
      const videoIds = await getChannelVideoIds(channel.url);
      console.info(`  Found ${videoIds.length} videos`);

      for (const videoId of videoIds) {
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        // Check if already ingested
        const { rows: existing } = await pool.query<{ id: string }>(
          'SELECT id FROM app.articles WHERE original_url = $1',
          [videoUrl]
        );
        if (existing.length > 0) {
          skipped++;
          continue;
        }

        // Get video info + transcript
        const info = getVideoInfo(videoUrl);
        if (!info || !info.transcript || info.transcript.length < 500) {
          // No transcript or too short
          continue;
        }

        const wordCount = info.transcript.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);

        // Apply same 10-minute minimum as Substack
        if (readTime < 10) {
          skipped++;
          continue;
        }

        const articleSlug = slugify(info.title);
        const html = transcriptToHtml(info.transcript, info.title);

        // Store HTML to filesystem (same structure as Substack)
        const contentPath = `${channel.slug}/${articleSlug}.html`;
        const fullPath = join(process.cwd(), 'library', channel.slug, `${articleSlug}.html`);
        await mkdir(join(process.cwd(), 'library', channel.slug), { recursive: true });
        await writeFile(fullPath, html, 'utf-8');

        // Also store full transcript for rewrites (same as full_content_path)
        const fullContentPath = `full-text/${channel.slug}/${articleSlug}.html`;
        const fullContentFullPath = join(process.cwd(), 'library', 'full-text', channel.slug, `${articleSlug}.html`);
        await mkdir(join(process.cwd(), 'library', 'full-text', channel.slug), { recursive: true });
        await writeFile(fullContentFullPath, html, 'utf-8');

        // Insert into DB — same table as Substack articles
        try {
          await pool.query(
            `INSERT INTO app.articles
             (publication_id, title, slug, original_url, content_path, full_content_path,
              author_name, published_at, word_count, estimated_read_time_minutes, media_type, tags, metadata)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'text', $11, $12)`,
            [
              pubId,
              info.title,
              articleSlug,
              videoUrl,
              contentPath,
              fullContentPath,
              channel.author ?? info.channel,
              await getPublishDate(videoUrl),
              wordCount,
              readTime,
              JSON.stringify({ source: 'youtube' }),
              JSON.stringify({ videoId, description: info.description?.slice(0, 500) }),
            ]
          );
          ingested++;
          console.info(`  + ${info.title} (${readTime} min read)`);
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          if (msg.includes('duplicate')) {
            skipped++;
          } else {
            errors++;
            console.info(`  Error: ${msg}`);
          }
        }

        // Brief pause between videos
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    console.info(`\nDone: ${ingested} ingested, ${skipped} skipped, ${errors} errors`);
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
