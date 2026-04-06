/**
 * Weekly epub generator — creates downloadable epub editions grouped by topic
 * Also generates a listing page at /weekly/index.html with cover images and subscriber signup
 *
 * Week boundary: Saturday 00:00 UTC through Friday 12:30 UTC (7:30 AM US Central)
 * Topic order: The Week magazine style (most urgent/newsworthy first, lighter topics last)
 */

import type { Pool } from 'pg';
import { staticLayout } from '../templates.js';
import { writeFile, escapeHtml, ensureDir } from '../utils.js';
import { join } from 'path';
import { readFile, stat } from 'fs/promises';
import archiver from 'archiver';
import { createWriteStream, existsSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import { truncateDeepDive } from './epub-helpers.js';

// Placeholder — fill in when Brian creates the Google Sheet
const SUBSCRIBE_URL = 'https://script.google.com/macros/s/AKfycbw484H_YXlBlQ5lFGmz4-6nOls4jEBU5lWGL3yf5ZTQpyihux47AcwZ2MN2F1R9eFfoxw/exec';

// ── Editorial topic order (The Week magazine style) ────────────────

const TOPIC_ORDER = [
  'foreign-policy',
  'defense',
  'political-strategy',
  'economics',
  'housing-cities',
  'law-rights',
  'public-health',
  'science',
  'ai-tech',
  'china',
  'history',
  'philosophy',
  'culture',
  'sports',
  'writing-craft',
  'music',
  'faith',
  'media',
];

function topicSortKey(slug: string): number {
  const idx = TOPIC_ORDER.indexOf(slug);
  return idx >= 0 ? idx : TOPIC_ORDER.length;
}

// ── Types ──────────────────────────────────────────────────────────

interface AffiliateLink {
  isbn10: string;
  isbn13?: string;
  title: string;
  author: string;
  description: string;
  category: string;
}

interface WeeklyArticleRow {
  id: string;
  title: string;
  author_name: string | null;
  publication_name: string;
  publication_slug: string;
  published_at: string | null;
  estimated_read_time_minutes: number;
  content_path: string | null;
  rewritten_content_path: string | null;
  image_path: string | null;
  original_url: string;
  tag_slug: string;
  tag_name: string;
  tag_score: number;
  affiliate_links: AffiliateLink[] | null;
}

interface WikipediaDeepDive {
  slug: string;
  title: string;
  estimated_read_time_minutes: number;
}

interface WeekRange {
  /** ISO week label like "2026-w12" */
  label: string;
  /** Saturday 00:00 UTC */
  start: Date;
  /** Friday 12:30 UTC */
  end: Date;
  /** Human-readable like "March 15–21, 2026" */
  display: string;
  /** Exact cutoff timestamp stored in epub metadata */
  cutoff: string;
}

// ── Week math (Saturday–Friday) ──────────────────────────────────


/**
 * Get the week range for a given date.
 * Week runs Saturday 00:00 UTC to Friday 12:30 UTC.
 * The label shows "March 15–21, 2026" (Saturday to Friday dates).
 * The epub filename uses the ISO week of the Friday.
 */
function getWeekRange(date: Date): WeekRange {
  // Find the Saturday that starts this week
  // Saturday = day 6. If today is Sat, diff=0. If Sun, diff=-1. If Fri, diff=-6. etc.
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay(); // 0=Sun, 6=Sat
  // How many days back to get to Saturday
  const diffToSat = day >= 6 ? day - 6 : day + 1; // Sat=0, Sun=1, Mon=2, ..., Fri=6
  const saturday = new Date(d);
  saturday.setUTCDate(d.getUTCDate() - diffToSat);
  saturday.setUTCHours(0, 0, 0, 0);

  const friday = new Date(saturday);
  friday.setUTCDate(saturday.getUTCDate() + 6);
  friday.setUTCHours(12, 30, 0, 0);

  // Filename uses the Friday end date
  const label = `hex-index-${friday.getUTCFullYear()}-${String(friday.getUTCMonth() + 1).padStart(2, '0')}-${String(friday.getUTCDate()).padStart(2, '0')}`;

  const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' });
  const startMonth = monthFmt.format(saturday);
  const endMonth = monthFmt.format(friday);
  const year = saturday.getUTCFullYear();

  let display: string;
  if (startMonth === endMonth) {
    display = `${startMonth} ${saturday.getUTCDate()}–${friday.getUTCDate()}, ${year}`;
  } else {
    display = `${startMonth} ${saturday.getUTCDate()} – ${endMonth} ${friday.getUTCDate()}, ${year}`;
  }

  const cutoff = friday.toISOString();

  return { label, start: saturday, end: friday, display, cutoff };
}

function getWeeksToGenerate(maxWeeks: number): WeekRange[] {
  const weeks: WeekRange[] = [];
  const now = new Date();
  const PREVIEW_WINDOW_MS = 32 * 60 * 60 * 1000; // 32 hours before cutoff
  for (let i = 0; i < maxWeeks; i++) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i * 7);
    const week = getWeekRange(d);
    // Include if past cutoff, or within preview window (allows Thursday night editorial review)
    if (now >= week.end || (week.end.getTime() - now.getTime()) <= PREVIEW_WINDOW_MS) {
      weeks.push(week);
    }
  }
  return weeks;
}

// ── Content loading ────────────────────────────────────────────────

async function loadContent(contentPath: string | null): Promise<string> {
  if (!contentPath) {return '';}
  try {
    return await readFile(join(process.cwd(), 'library', contentPath), 'utf-8');
  } catch {
    return '';
  }
}

async function loadWikipediaContent(slug: string): Promise<string> {
  try {
    return await readFile(join(process.cwd(), 'library', 'wikipedia', `${slug}.html`), 'utf-8');
  } catch {
    return '';
  }
}

// ── Cover image generation ─────────────────────────────────────────

async function loadGeminiKey(): Promise<string> {
  try {
    const envPath = join(process.env.HOME ?? '/Users/bedwards', '.config', '.env');
    const content = await readFile(envPath, 'utf-8');
    const match = content.match(/GEMINI_API_KEY=(\S+)/);
    if (match) {return match[1];}
  } catch { /* fall through */ }
  throw new Error('GEMINI_API_KEY not found in ~/.config/.env');
}

const GEMINI_MODEL = 'gemini-2.5-flash-image';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

async function generateCoverImage(weekDisplay: string, geminiKey: string): Promise<Buffer | null> {
  const prompt = `Editorial magazine cover illustration. Hand-drawn charcoal on tea-stained parchment. Abstract composition suggesting reading, knowledge, and intellectual depth. Week of ${weekDisplay}. No text, no words, no letters. Vignette fading to pure white at edges.`;

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
  });

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: {
      'x-goog-api-key': geminiKey,
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

function processCoverImage(inputPath: string, outputPath: string): void {
  execSync(
    `magick "${inputPath}" -resize 600x800^ -gravity center -extent 600x800 -quality 85 "${outputPath}"`,
    { timeout: 15_000 }
  );
}

async function ensureCoverImage(
  weekLabel: string,
  weekDisplay: string,
  weeklyDir: string,
  pool?: Pool,
  weekStart?: Date,
  weekEnd?: Date,
): Promise<boolean> {
  const coverPath = join(weeklyDir, `cover-${weekLabel}.webp`);
  if (existsSync(coverPath)) {return true;}

  // Strategy 1: Use the best article image from this week's content.
  // This guarantees unique covers per week since each week has different articles.
  if (pool && weekStart && weekEnd) {
    try {
      const { rows } = await pool.query<{ image_path: string }>(`
        SELECT a.image_path
        FROM app.articles a
        WHERE a.published_at >= $1 AND a.published_at < $2
          AND a.image_path IS NOT NULL
        ORDER BY a.published_at DESC
        LIMIT 1
      `, [weekStart.toISOString(), weekEnd.toISOString()]);

      if (rows.length > 0) {
        const articleImagePath = join(process.cwd(), rows[0].image_path);
        if (existsSync(articleImagePath)) {
          console.info(`  Using article image as cover for ${weekLabel}`);
          processCoverImage(articleImagePath, coverPath);
          console.info(`  Cover image saved: cover-${weekLabel}.webp`);
          return true;
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.info(`  Article image lookup failed for ${weekLabel}: ${msg}`);
    }
  }

  // Strategy 2: Fall back to Gemini-generated cover
  try {
    const geminiKey = await loadGeminiKey();
    console.info(`  Generating cover image via Gemini for ${weekLabel}...`);

    const imageData = await generateCoverImage(weekDisplay, geminiKey);
    if (!imageData) {
      console.info(`  WARNING: No cover image for ${weekLabel} — no article images and Gemini returned nothing`);
      return false;
    }

    // Save raw PNG, then process to book cover dimensions
    const rawPath = join(weeklyDir, `cover-${weekLabel}-raw.png`);
    const { writeFile: fsWriteFile, unlink } = await import('fs/promises');
    await fsWriteFile(rawPath, imageData);
    processCoverImage(rawPath, coverPath);
    await unlink(rawPath);

    console.info(`  Cover image saved: cover-${weekLabel}.webp`);
    return true;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.info(`  WARNING: No cover image for ${weekLabel}: ${msg}`);
    return false;
  }
}

// ── Database queries ───────────────────────────────────────────────

/**
 * Get articles for a given week, each assigned to its highest-scored tag.
 * Articles included if published_at >= saturday 00:00 UTC AND published_at < friday 12:30 UTC.
 *
 * Digest section assignment uses a stricter threshold (DIGEST_TAG_MIN_SCORE)
 * than the Reader/private library tag pages (which include any tag scoring
 * 30+ at insert time). This keeps weak tag matches out of premium-epub
 * sections — articles whose top tag scores below the threshold fall back
 * to the default "culture" bucket. See issue #349.
 */
const DIGEST_TAG_MIN_SCORE = 50;

async function getArticlesForWeek(
  pool: Pool,
  weekStart: Date,
  weekEnd: Date
): Promise<WeeklyArticleRow[]> {
  const { rows } = await pool.query<WeeklyArticleRow>(`
    SELECT DISTINCT ON (a.id)
      a.id, a.title, a.author_name,
      p.name AS publication_name, p.slug AS publication_slug,
      a.published_at, a.estimated_read_time_minutes,
      a.content_path, a.rewritten_content_path, a.image_path, a.original_url,
      at.tag_slug, t.name AS tag_name, at.score AS tag_score,
      a.affiliate_links
    FROM app.articles a
    JOIN app.publications p ON a.publication_id = p.id
    LEFT JOIN app.article_tags at
      ON at.article_id = a.id AND at.score >= $3
    LEFT JOIN app.tags t ON t.slug = at.tag_slug
    WHERE a.published_at >= $1 AND a.published_at < $2
    ORDER BY a.id, at.score DESC NULLS LAST
  `, [weekStart.toISOString(), weekEnd.toISOString(), DIGEST_TAG_MIN_SCORE]);
  return rows;
}

async function getDeepDives(pool: Pool, articleId: string): Promise<WikipediaDeepDive[]> {
  const { rows } = await pool.query<WikipediaDeepDive>(`
    SELECT w.slug, w.title, w.estimated_read_time_minutes
    FROM app.article_wikipedia_links awl
    JOIN app.wikipedia_articles w ON awl.wikipedia_id = w.id
    WHERE awl.article_id = $1
    ORDER BY awl.relevance_rank
  `, [articleId]);
  return rows;
}

// ── XML helpers ────────────────────────────────────────────────────

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Sanitize HTML for XHTML: close void tags, remove invalid attributes
 */
function htmlToXhtml(html: string): string {
  return html
    // Remove doctype, html/head/body wrappers
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<html[^>]*>/gi, '')
    .replace(/<\/html>/gi, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<body[^>]*>/gi, '')
    .replace(/<\/body>/gi, '')
    // Remove scripts and styles
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Remove nav/header/footer/aside
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '')
    // Remove SVG and buttons
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '')
    .replace(/<button[^>]*>[\s\S]*?<\/button>/gi, '')
    // Remove comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Remove images from original articles (we add our own)
    .replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '')
    // Self-close void elements for XHTML
    .replace(/<(br|hr|img|input|meta|link)(\s[^>]*)?\s*>/gi, '<$1$2 />')
    // Fix & to &amp; (but not already escaped)
    .replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[\da-fA-F]+;)/g, '&amp;')
    .trim();
}

// ── Epub generation ────────────────────────────────────────────────

const EPUB_CSS = `body {
  font-family: 'Lexend', 'Roboto Slab', 'OpenDyslexic', sans-serif;
  font-size: 1em;
  line-height: 1.7;
  color: #1c1917;
  margin: 1em;
}
h1 { font-size: 1.15em; font-weight: 600; margin: 1.5em 0 0.5em; }
h2 { font-size: 1.1em; font-weight: 600; margin: 1.5em 0 0.5em; border-top: 1px solid #d6d0c8; padding-top: 0.8em; }
h3 { font-size: 1.02em; font-weight: 600; color: #44403c; margin: 1em 0 0.4em; }
p { margin: 0 0 0.8em; }
blockquote { border-left: 3px solid #9a3412; padding: 0.5em 0 0.5em 1em; margin: 1em 0; color: #44403c; font-style: italic; }
ul, ol { margin: 0.8em 0; padding-left: 1.5em; }
li { margin-bottom: 0.3em; }
a { color: #9a3412; }
img { max-width: 80%; height: auto; display: block; margin: 1em auto; }
.article-header { margin-bottom: 1.5em; padding-bottom: 1em; border-bottom: 1px solid #d6d0c8; }
.article-meta { font-size: 0.85em; color: #78716c; margin-top: 0.3em; }
.deep-dive { margin-top: 2em; padding-top: 1em; border-top: 1px solid #d6d0c8; }
.deep-dive-label { font-size: 0.8em; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #9a3412; margin-bottom: 0.5em; }
.topic-header { font-size: 1.15em; font-weight: 600; margin: 2em 0 1em; padding-bottom: 0.5em; border-bottom: 2px solid #1c1917; }
.cover-title { font-size: 1.3em; font-weight: 600; text-align: center; margin: 2em 0 0.3em; }
.cover-subtitle { font-size: 0.95em; text-align: center; color: #78716c; margin-bottom: 1em; }
.cover-image { max-width: 70%; height: auto; display: block; margin: 2em auto; }
.source-note { display: none; }
.toc-topic { font-size: 1.1em; font-weight: 600; color: #9a3412; margin: 1.5em 0 0.3em; }
.toc-article { margin: 0.3em 0 0.3em 1em; }
.toc-article a { text-decoration: none; }
.toc-meta { font-size: 0.8em; color: #78716c; }
.affiliate-section { margin-top: 2em; padding-top: 1em; border-top: 1px solid #d4d4d4; }
.affiliate-label { font-weight: bold; font-size: 0.95em; margin-bottom: 0.25em; }
.affiliate-section li { margin-bottom: 0.75em; }
.affiliate-book-description { font-size:0.85em; color:#78716c; }
.affiliate-disclosure { font-size:0.8em; color:#78716c; font-style:italic; }
.affiliate-books { list-style:none; padding:0; }
`;

interface ArticleForEpub {
  row: WeeklyArticleRow;
  content: string;
  deepDives: { title: string; content: string; slug: string }[];
  imageData: Buffer | null;
  imageExt: string;
  affiliateLinks: AffiliateLink[];
}

async function buildEpub(
  week: WeekRange,
  articlesByTopic: Map<string, ArticleForEpub[]>,
  outputPath: string,
  weeklyDir: string
): Promise<void> {
  await ensureDir(join(outputPath, '..'));

  return new Promise((resolve, reject) => {
    const output = createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', resolve);
    archive.on('error', reject);
    archive.pipe(output);

    // 1. mimetype — must be first, uncompressed
    archive.append('application/epub+zip', { name: 'mimetype', store: true });

    // 2. META-INF/container.xml
    archive.append(`<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`, { name: 'META-INF/container.xml' });

    // 3. Build article XHTML files and collect manifest/spine entries
    const manifestItems: string[] = [];
    const spineItems: string[] = [];
    let articleIndex = 0;

    // Sort topics by editorial order, not alphabetical
    const sortedTopics = [...articlesByTopic.keys()].sort((a, b) => topicSortKey(a) - topicSortKey(b));

    // Style
    archive.append(EPUB_CSS, { name: 'OEBPS/style.css' });
    manifestItems.push('<item id="style" href="style.css" media-type="text/css"/>');

    // Cover image (if available)
    let hasCoverImage = false;
    if (weeklyDir) {
      const coverPath = join(weeklyDir, `cover-${week.label}.webp`);
      if (existsSync(coverPath)) {
        try {
          const coverData = readFileSync(coverPath);
          archive.append(coverData, { name: 'OEBPS/images/cover.webp' });
          manifestItems.push('<item id="cover-image" href="images/cover.webp" media-type="image/webp" properties="cover-image"/>');

          const coverXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>Cover</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body style="text-align:center; margin:0; padding:0;">
  <img src="images/cover.webp" alt="Cover" style="max-width:100%; max-height:100vh;" />
</body>
</html>`;
          archive.append(coverXhtml, { name: 'OEBPS/cover.xhtml' });
          manifestItems.push('<item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>');
          spineItems.push('<itemref idref="cover"/>');
          hasCoverImage = true;
        } catch {
          // Cover not available, skip
        }
      }
    }

    // Title page with cover image
    const coverImageTag = existsSync(join(weeklyDir, `cover-${week.label}.webp`))
      ? `<img class="cover-image" src="images/cover.webp" alt=""/>`
      : '';
    const titleXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>Hex Index Reader</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
  ${coverImageTag}
  <p class="cover-title">Hex Index Reader</p>
  <p class="cover-subtitle">${escapeXml(week.display)}</p>
  <p style="text-align:center; margin-top:1em; color:#78716c; font-size:0.85em;">hex-index.com</p>
</body>
</html>`;
    archive.append(titleXhtml, { name: 'OEBPS/title.xhtml' });
    manifestItems.push('<item id="title" href="title.xhtml" media-type="application/xhtml+xml"/>');
    spineItems.push('<itemref idref="title"/>');

    // Add cover image to epub if it exists
    const coverFilePath = join(weeklyDir, `cover-${week.label}.webp`);
    if (existsSync(coverFilePath)) {
      archive.file(coverFilePath, { name: 'OEBPS/images/cover.webp' });
      manifestItems.push('<item id="cover-image" href="images/cover.webp" media-type="image/webp" properties="cover-image"/>');
    }

    // Nav (epub3) — build with topic grouping
    let navTocHtml = '';
    let navIdx = 0;
    for (const topic of sortedTopics) {
      const articles = articlesByTopic.get(topic)!;
      const topicName = articles[0].row.tag_name || 'Culture';
      navTocHtml += `    <li><a href="article-${navIdx}.xhtml">${escapeXml(topicName)}</a>\n      <ol>\n`;
      for (const article of articles) {
        navTocHtml += `        <li><a href="article-${navIdx}.xhtml">${escapeXml(article.row.title)}</a></li>\n`;
        navIdx++;
      }
      navTocHtml += `      </ol>\n    </li>\n`;
    }

    const navXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head><title>Table of Contents</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
  <nav epub:type="toc" id="toc">
    <h1>Table of Contents</h1>
    <ol>
${navTocHtml}    </ol>
  </nav>
</body>
</html>`;
    archive.append(navXhtml, { name: 'OEBPS/nav.xhtml' });
    manifestItems.push('<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>');
    spineItems.push('<itemref idref="nav"/>');

    // Articles
    for (const topic of sortedTopics) {
      const articles = articlesByTopic.get(topic)!;
      const topicName = articles[0].row.tag_name || 'Culture';

      let isFirstInTopic = true;
      for (const article of articles) {
        const aid = `article-${articleIndex}`;
        const authorName = article.row.author_name ?? 'Unknown';
        const date = article.row.published_at
          ? new Date(article.row.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
          : '';

        // Charcoal illustration image — inline at top of article
        let imageHtml = '';
        if (article.imageData) {
          const imgId = `img-${articleIndex}`;
          const imgFile = `images/${imgId}.${article.imageExt}`;
          archive.append(article.imageData, { name: `OEBPS/${imgFile}` });
          const mediaType = article.imageExt === 'webp' ? 'image/webp' : `image/${article.imageExt}`;
          manifestItems.push(`<item id="${imgId}" href="${imgFile}" media-type="${mediaType}"/>`);
          imageHtml = `<img src="../images/${imgId}.${article.imageExt}" alt="${escapeXml(article.row.title)}" />`;
        }

        // Deep dives — truncated to first 3 top-level paragraphs inside the
        // epub with a link out to the full rewrite on hex-index.com (#454).
        // The public static site and private library continue to render the
        // full deep-dive content; only the epub is trimmed.
        let deepDiveHtml = '';
        for (const dd of article.deepDives) {
          if (dd.content) {
            const fullUrl = `https://hex-index.com/wikipedia/${dd.slug}/`;
            const trimmed = truncateDeepDive(dd.content, 3, fullUrl);
            deepDiveHtml += `
  <div class="deep-dive">
    <p class="deep-dive-label">Deep Dive</p>
    <h3>${escapeXml(dd.title)}</h3>
    ${htmlToXhtml(trimmed)}
  </div>`;
          }
        }

        // Affiliate book recommendations
        const affiliateTag = process.env.AMAZON_AFFILIATE_TAG ?? '';
        let affiliateHtml = '';
        if (affiliateTag && article.affiliateLinks.length > 0) {
          const validLinks = article.affiliateLinks.filter(link => link.isbn10);
          if (validLinks.length > 0) {
            const bookItems = validLinks.map(link => {
              const url = `https://www.amazon.com/s?k=${encodeURIComponent(link.isbn10)}&i=stripbooks&tag=${encodeURIComponent(affiliateTag)}`;
              return `    <li><a href="${escapeXml(url)}"><strong>${escapeXml(link.title)}</strong></a> by ${escapeXml(link.author)}<br/><span class="affiliate-book-description">${escapeXml(link.description)}</span></li>`;
            }).join('\n');

            affiliateHtml = `
  <div class="affiliate-section">
    <p class="affiliate-label">Recommended Reading</p>
    <p class="affiliate-disclosure">As an Amazon Associate, Hex Index earns from qualifying purchases.</p>
    <ul class="affiliate-books">
${bookItems}
    </ul>
  </div>`;
          }
        }

        const topicHeaderHtml = isFirstInTopic
          ? `\n  <h2 class="topic-header">${escapeXml(topicName)}</h2>`
          : '';

        const articleXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>${escapeXml(article.row.title)}</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>${topicHeaderHtml}
  ${imageHtml}
  <div class="article-header">
    <h1>${escapeXml(article.row.title)}</h1>
    <p class="article-meta">${escapeXml(authorName)} &#183; ${escapeXml(article.row.publication_name)}${date ? ` &#183; ${date}` : ''} &#183; ${article.row.estimated_read_time_minutes} min read</p>
  </div>
  ${htmlToXhtml(article.content)}
  ${affiliateHtml}
  ${deepDiveHtml}
</body>
</html>`;

        archive.append(articleXhtml, { name: `OEBPS/${aid}.xhtml` });
        manifestItems.push(`<item id="${aid}" href="${aid}.xhtml" media-type="application/xhtml+xml"/>`);
        spineItems.push(`<itemref idref="${aid}"/>`);
        articleIndex++;
        isFirstInTopic = false;
      }
    }

    // NCX (for epub2 backward compatibility) — nested topic/article structure
    let ncxNavPoints = '';
    let ncxOrder = 1;
    ncxNavPoints += `  <navPoint id="navpoint-${ncxOrder}" playOrder="${ncxOrder}">
    <navLabel><text>Title Page</text></navLabel>
    <content src="title.xhtml"/>
  </navPoint>\n`;
    ncxOrder++;

    let ncxIdx = 0;
    for (const topic of sortedTopics) {
      const articles = articlesByTopic.get(topic)!;
      const topicName = articles[0].row.tag_name || 'Culture';
      ncxNavPoints += `  <navPoint id="navpoint-${ncxOrder}" playOrder="${ncxOrder}">
    <navLabel><text>${escapeXml(topicName)}</text></navLabel>
    <content src="article-${ncxIdx}.xhtml"/>\n`;
      ncxOrder++;

      for (const article of articles) {
        ncxNavPoints += `    <navPoint id="navpoint-${ncxOrder}" playOrder="${ncxOrder}">
      <navLabel><text>${escapeXml(article.row.title)}</text></navLabel>
      <content src="article-${ncxIdx}.xhtml"/>
    </navPoint>\n`;
        ncxOrder++;
        ncxIdx++;
      }
      ncxNavPoints += `  </navPoint>\n`;
    }

    const ncx = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="hex-index-weekly-${week.label}"/>
    <meta name="dtb:depth" content="2"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle><text>Hex Index Reader — ${escapeXml(week.display)}</text></docTitle>
  <navMap>
${ncxNavPoints}  </navMap>
</ncx>`;
    archive.append(ncx, { name: 'OEBPS/toc.ncx' });
    manifestItems.push('<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>');

    // content.opf — includes cutoff timestamp in metadata
    const opf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="uid" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="uid">hex-index-weekly-${week.label}</dc:identifier>
    <dc:title>Hex Index Reader — ${escapeXml(week.display)}</dc:title>
    <dc:creator>Hex Index</dc:creator>
    <dc:language>en</dc:language>
    <dc:date>${week.start.toISOString().split('T')[0]}</dc:date>
    <meta property="dcterms:modified">${new Date().toISOString().replace(/\.\d+Z$/, 'Z')}</meta>
    <meta property="hex:cutoff">${escapeXml(week.cutoff)}</meta>${hasCoverImage ? '\n    <meta name="cover" content="cover-image"/>' : ''}
  </metadata>
  <manifest>
    ${manifestItems.join('\n    ')}
  </manifest>
  <spine toc="ncx">
    ${spineItems.join('\n    ')}
  </spine>
</package>`;
    archive.append(opf, { name: 'OEBPS/content.opf' });

    void archive.finalize();
  });
}

// ── Main export ────────────────────────────────────────────────────

export async function generateWeeklyEpubs(
  pool: Pool,
  outputDir: string
): Promise<{ weeksGenerated: number }> {
  const weeks = getWeeksToGenerate(8);
  let weeksGenerated = 0;

  const weeklyDir = join(outputDir, 'weekly');
  await ensureDir(weeklyDir);

  interface WeekInfo {
    label: string;
    display: string;
    articleCount: number;
    fileSize: number;
    hasCover: boolean;
  }
  const weekInfos: WeekInfo[] = [];

  for (const week of weeks) {
    const epubPath = join(weeklyDir, `${week.label}.epub`);

    // Skip if epub already exists
    if (existsSync(epubPath)) {
      try {
        const s = await stat(epubPath);
        // Count articles for the listing page
        const { rows: countRows } = await pool.query<{ count: string }>(`
          SELECT COUNT(*) AS count FROM app.articles
          WHERE published_at >= $1 AND published_at < $2
        `, [week.start.toISOString(), week.end.toISOString()]);
        const count = parseInt(countRows[0].count, 10);
        if (count > 0) {
          // Generate cover image if missing — uses article image (no API call needed)
          const coverExists = await ensureCoverImage(week.label, week.display, weeklyDir, pool, week.start, week.end);
          weekInfos.push({
            label: week.label,
            display: week.display,
            articleCount: count,
            fileSize: s.size,
            hasCover: coverExists,
          });
        }
      } catch {
        // skip
      }
      continue;
    }

    // Get articles for this week
    const articles = await getArticlesForWeek(pool, week.start, week.end);
    if (articles.length === 0) {continue;}

    // Check for consolidated entries (from consolidate-weekly job)
    const { rows: consolidatedRows } = await pool.query<{
      publication_id: string;
      article_ids: string[];
      consolidated_content_path: string | null;
      deep_dive_wikipedia_id: string | null;
      tag_slug: string | null;
    }>(`
      SELECT publication_id, article_ids, consolidated_content_path, deep_dive_wikipedia_id, tag_slug
      FROM app.weekly_consolidated
      WHERE week_label = $1
    `, [week.label]).catch(() => ({ rows: [] as never[] }));

    // Build lookup: publication_id → consolidated entry
    const consolidatedByPub = new Map(consolidatedRows.map(r => [r.publication_id, r]));
    const hasConsolidation = consolidatedByPub.size > 0;

    // Group by topic (tag), using editorial order
    const byTopic = new Map<string, ArticleForEpub[]>();

    if (hasConsolidation) {
      // Use consolidated data: one entry per publication
      const seenPubs = new Set<string>();
      for (const row of articles) {
        // Find consolidated entry by checking if this article's publication matches
        let matchedCons: typeof consolidatedRows[0] | undefined;
        for (const [pubIdKey, c] of consolidatedByPub) {
          if (c.article_ids.includes(row.id)) {
            matchedCons = c;
            if (seenPubs.has(pubIdKey)) { break; } // already processed this pub
            seenPubs.add(pubIdKey);
            break;
          }
        }

        if (matchedCons && !seenPubs.has(`done:${matchedCons.publication_id}`)) {
          seenPubs.add(`done:${matchedCons.publication_id}`);

          // Use consolidated content if available, otherwise fall back to first article
          let content: string | undefined;
          if (matchedCons.consolidated_content_path) {
            content = await loadContent(matchedCons.consolidated_content_path);
          }
          if (!content) {
            content = row.rewritten_content_path
              ? await loadContent(row.rewritten_content_path)
              : await loadContent(row.content_path);
          }
          if (!content) { continue; }

          // Load single best deep dive
          const deepDives: { title: string; content: string; slug: string }[] = [];
          if (matchedCons.deep_dive_wikipedia_id) {
            const { rows: ddRows } = await pool.query<{ slug: string; title: string }>(`
              SELECT slug, title FROM app.wikipedia_articles WHERE id = $1
            `, [matchedCons.deep_dive_wikipedia_id]);
            if (ddRows.length > 0) {
              const ddContent = await loadWikipediaContent(ddRows[0].slug);
              if (ddContent) {
                deepDives.push({ title: ddRows[0].title, content: ddContent, slug: ddRows[0].slug });
              }
            }
          }

          // Use image from first selected article
          let imageData: Buffer | null = null;
          let imageExt = 'webp';
          if (row.image_path) {
            try {
              imageData = await readFile(join(process.cwd(), row.image_path));
              const ext = row.image_path.split('.').pop()?.toLowerCase();
              if (ext) { imageExt = ext; }
            } catch { imageData = null; }
          }

          const topicKey = matchedCons.tag_slug ?? row.tag_slug ?? 'culture';
          const affiliateLinks: AffiliateLink[] = row.affiliate_links ?? [];
          const entry: ArticleForEpub = { row, content, deepDives, imageData, imageExt, affiliateLinks };
          if (!byTopic.has(topicKey)) { byTopic.set(topicKey, []); }
          byTopic.get(topicKey)!.push(entry);
        } else if (!matchedCons) {
          // Article not in any consolidated entry — include as-is
          let content: string | undefined;
          if (row.rewritten_content_path) {
            content = await loadContent(row.rewritten_content_path);
          }
          if (!content) {
            content = await loadContent(row.content_path);
          }
          if (!content) { continue; }

          const deepDiveRows = await getDeepDives(pool, row.id);
          const deepDives: { title: string; content: string; slug: string }[] = [];
          for (const dd of deepDiveRows) {
            const ddContent = await loadWikipediaContent(dd.slug);
            deepDives.push({ title: dd.title, content: ddContent, slug: dd.slug });
          }

          let imageData: Buffer | null = null;
          let imageExt = 'webp';
          if (row.image_path) {
            try {
              imageData = await readFile(join(process.cwd(), row.image_path));
              const ext = row.image_path.split('.').pop()?.toLowerCase();
              if (ext) { imageExt = ext; }
            } catch { imageData = null; }
          }

          const topicKey = row.tag_slug || 'culture';
          const affiliateLinks2: AffiliateLink[] = row.affiliate_links ?? [];
          const entry: ArticleForEpub = { row, content, deepDives, imageData, imageExt, affiliateLinks: affiliateLinks2 };
          if (!byTopic.has(topicKey)) { byTopic.set(topicKey, []); }
          byTopic.get(topicKey)!.push(entry);
        }
      }
    } else {
      // No consolidation — original behavior
      for (const row of articles) {
        const topicKey = row.tag_slug || 'culture';

        let content: string | undefined;
        if (row.rewritten_content_path) {
          content = await loadContent(row.rewritten_content_path);
        }
        if (!content) {
          content = await loadContent(row.content_path);
        }
        if (!content) {continue;}

        const deepDiveRows = await getDeepDives(pool, row.id);
        const deepDives: { title: string; content: string; slug: string }[] = [];
        for (const dd of deepDiveRows) {
          const ddContent = await loadWikipediaContent(dd.slug);
          deepDives.push({ title: dd.title, content: ddContent, slug: dd.slug });
        }

        let imageData: Buffer | null = null;
        let imageExt = 'webp';
        if (row.image_path) {
          try {
            imageData = await readFile(join(process.cwd(), row.image_path));
            const ext = row.image_path.split('.').pop()?.toLowerCase();
            if (ext) {imageExt = ext;}
          } catch {
            imageData = null;
          }
        }

        const affiliateLinks: AffiliateLink[] = row.affiliate_links ?? [];
        const entry: ArticleForEpub = { row, content, deepDives, imageData, imageExt, affiliateLinks };
        if (!byTopic.has(topicKey)) {
          byTopic.set(topicKey, []);
        }
        byTopic.get(topicKey)!.push(entry);
      }
    }

    // Sort articles within each topic by published_at DESC, nulls last
    for (const [, topicArticles] of byTopic) {
      topicArticles.sort((a, b) => {
        if (!a.row.published_at && !b.row.published_at) {return 0;}
        if (!a.row.published_at) {return 1;}
        if (!b.row.published_at) {return -1;}
        return new Date(b.row.published_at).getTime() - new Date(a.row.published_at).getTime();
      });
    }

    if (byTopic.size === 0) {continue;}

    // Generate cover image for this week (if not already present)
    const hasCover = await ensureCoverImage(week.label, week.display, weeklyDir, pool, week.start, week.end);

    await buildEpub(week, byTopic, epubPath, weeklyDir);
    weeksGenerated++;

    const s = await stat(epubPath);
    weekInfos.push({
      label: week.label,
      display: week.display,
      articleCount: articles.length,
      fileSize: s.size,
      hasCover,
    });

    console.info(`  Generated ${week.label}.epub (${articles.length} articles)`);
  }

  // Sort newest first
  weekInfos.sort((a, b) => b.label.localeCompare(a.label));

  // Generate listing page
  const listingHtml = generateWeeklyListingPage(weekInfos);
  await writeFile(join(weeklyDir, 'index.html'), listingHtml);

  return { weeksGenerated };
}

// ── Weekly listing page ────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {return `${bytes} B`;}
  if (bytes < 1024 * 1024) {return `${(bytes / 1024).toFixed(0)} KB`;}
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface WeekListItem {
  label: string;
  display: string;
  articleCount: number;
  fileSize: number;
  hasCover: boolean;
}

function renderLatestEpubCard(week: WeekListItem): string {
  const epubUrl = `https://hex-index.com/weekly/${week.label}.epub`;
  const coverImg = week.hasCover
    ? `<img class="weekly-cover" src="cover-${week.label}.webp" alt="" width="120" height="160">`
    : '';
  return `
    <div class="weekly-item weekly-latest">
      ${coverImg}
      <div class="weekly-info">
        <h2>${escapeHtml(week.display)}</h2>
        <p class="weekly-item-meta">${week.articleCount} article${week.articleCount !== 1 ? 's' : ''} &middot; ${formatFileSize(week.fileSize)}</p>
        <a href="${escapeHtml(epubUrl)}" class="copy-url-btn" download>Download Latest</a>
      </div>
    </div>`;
}

function generateWeeklyListingPage(weeks: WeekListItem[]): string {
  const pathToRoot = '../';

  // Split latest epub from older ones
  const latestWeek = weeks.length > 0 ? weeks[0] : null;
  const olderWeeks = weeks.slice(1);

  const latestEpubHtml = latestWeek ? renderLatestEpubCard(latestWeek) : '';

  const olderWeekItems = olderWeeks.map(w => {
    const epubUrl = `https://hex-index.com/weekly/${w.label}.epub`;
    const coverImg = w.hasCover
      ? `<img class="weekly-cover" src="cover-${w.label}.webp" alt="" width="120" height="160">`
      : '';
    return `
    <div class="weekly-item">
      ${coverImg}
      <div class="weekly-info">
        <h2>${escapeHtml(w.display)}</h2>
        <p class="weekly-item-meta">${w.articleCount} article${w.articleCount !== 1 ? 's' : ''} &middot; ${formatFileSize(w.fileSize)}</p>
        <a href="${escapeHtml(epubUrl)}" class="copy-url-btn" download>Download</a>
      </div>
    </div>`;
  }).join('\n');

  const subscribeSection = `
    <section class="subscribe-card">
      <h2>Get the Reader</h2>
      <p>The Hex Index Reader delivered to your inbox every Friday morning.</p>
      <form id="subscribe-form">
        <div class="subscribe-fields">
          <input type="email" name="email" placeholder="Email" class="subscribe-input">
          <div class="subscribe-phone-row">
            <input type="tel" name="phone" placeholder="Phone (optional)" class="subscribe-input subscribe-phone">
            <select name="carrier" class="subscribe-select">
              <option value="">Carrier</option>
              <option value="att">AT&amp;T</option>
              <option value="verizon">Verizon</option>
              <option value="tmobile">T-Mobile</option>
              <option value="sprint">Sprint</option>
            </select>
          </div>
          <input type="text" name="hp" style="display:none" tabindex="-1" autocomplete="off">
          <button type="submit" class="subscribe-btn">Subscribe</button>
        </div>
        <p class="subscribe-note">Friday mornings, US Central. Unsubscribe anytime.</p>
      </form>
      <div id="subscribe-success" style="display:none">
        <p class="subscribe-confirmed">You're in! First edition arrives Friday.</p>
      </div>
    </section>`;

  const content = `
    <h1 class="section-title">Hex Index Reader</h1>
    ${latestEpubHtml}
    <p class="reader-recommendation">We recommend <a href="https://readest.com/" target="_blank" rel="noopener">Readest</a> and <a href="https://speechify.com/" target="_blank" rel="noopener">Speechify</a> for reading our epub files.</p>
    ${subscribeSection}
    ${olderWeekItems.length > 0 ? `<h2 class="section-subtitle">Previous Editions</h2><div class="weekly-list">${olderWeekItems}</div>` : ''}
    <script>
    function copyUrl(btn) {
      var url = btn.getAttribute('data-url');
      navigator.clipboard.writeText(url).then(function() {
        var orig = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function() {
          btn.textContent = orig;
          btn.classList.remove('copied');
        }, 2000);
      });
    }

    var SUBSCRIBE_URL = '${SUBSCRIBE_URL}';
    document.getElementById('subscribe-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var form = e.target;
      var data = {
        email: form.email.value,
        phone: form.phone.value,
        carrier: form.carrier.value,
        hp: form.hp.value
      };
      if (!data.email && !data.phone) { alert('Enter an email or phone number'); return; }
      if (!SUBSCRIBE_URL) { alert('Subscription coming soon!'); return; }
      fetch(SUBSCRIBE_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data)
      }).then(function() {
        form.style.display = 'none';
        document.getElementById('subscribe-success').style.display = '';
      });
    });
    </script>
  `;

  return staticLayout('Hex Index Reader', content, pathToRoot);
}
