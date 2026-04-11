/**
 * Helpers for the weekly epub renderer.
 *
 * Wikipedia deep dives live in full on the public static site and in the
 * private library. Inside the weekly Reader epub we truncate them to the
 * first few top-level paragraphs and link out to the full rewrite. See #454.
 */

/**
 * Truncate a Wikipedia deep-dive HTML fragment to the first `maxParagraphs`
 * top-level `<p>` elements.
 *
 * Rules:
 * - Counts only top-level `<p>` tags; `<p>` nested inside lists, blockquotes,
 *   or other block elements does not count and is not preserved.
 * - Headings (`<h1>`–`<h6>`) and other top-level non-paragraph content that
 *   appear BEFORE the cutoff paragraph are preserved in place.
 * - Everything after the Nth top-level `<p>` is dropped.
 * - If fewer than `maxParagraphs` exist, the entire available content is kept
 *   (no padding).
 * - A "Read full deep dive" link to `readMoreUrl` is appended when provided.
 *
 * Pure function — no DOM, no I/O. Uses a lightweight regex tokenizer that is
 * good enough for the Qwen-generated fragments we emit (simple well-formed
 * markup: h2/h3, p, ul/li, blockquote, em/strong).
 */
export function truncateDeepDive(
  html: string,
  maxParagraphs: number = 3,
  readMoreUrl?: string
): string {
  if (!html) {
    return readMoreUrl ? renderReadMore(readMoreUrl) : '';
  }

  const tokens = tokenizeTopLevel(html);
  const kept: string[] = [];
  let paraCount = 0;

  for (const tok of tokens) {
    if (tok.kind === 'p') {
      if (paraCount >= maxParagraphs) {
        break;
      }
      kept.push(tok.raw);
      paraCount++;
      continue;
    }
    // Non-<p> top-level content (headings, etc.): keep only if we still have
    // budget for more paragraphs — otherwise we'd be leaving trailing headings
    // with no body.
    if (paraCount >= maxParagraphs) {
      break;
    }
    kept.push(tok.raw);
  }

  const body = kept.join('').trim();
  if (!readMoreUrl) {
    return body;
  }
  return `${body}${body ? '\n' : ''}${renderReadMore(readMoreUrl)}`;
}

function renderReadMore(url: string): string {
  return `<p class="deep-dive-read-more">Read full deep dive: <a href="${escapeAttr(url)}">${escapeText(url)}</a></p>`;
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function escapeText(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

interface TopToken {
  kind: 'p' | 'other';
  raw: string;
}

/**
 * Walk the HTML fragment tracking nesting depth so that only top-level tags
 * are classified. Text between top-level tags is attached to 'other' tokens.
 */
function tokenizeTopLevel(html: string): TopToken[] {
  const tokens: TopToken[] = [];
  const tagRe = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;

  let depth = 0;
  let topStart = -1;
  let topTag: string | null = null;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = tagRe.exec(html)) !== null) {
    const [full, slash, rawName] = match;
    const name = rawName.toLowerCase();
    const isClose = slash === '/';
    const isSelfClosing = full.endsWith('/>') || VOID_ELEMENTS.has(name);
    const start = match.index;
    const end = start + full.length;

    if (depth === 0 && !isClose) {
      // Starting a new top-level element.
      topStart = start;
      topTag = name;
      if (isSelfClosing) {
        tokens.push({
          kind: name === 'p' ? 'p' : 'other',
          raw: html.slice(topStart, end),
        });
        topStart = -1;
        topTag = null;
        cursor = end;
        continue;
      }
      depth = 1;
      cursor = end;
      continue;
    }

    if (!isClose && !isSelfClosing) {
      depth++;
      continue;
    }

    if (isClose) {
      depth--;
      if (depth === 0 && topStart >= 0) {
        tokens.push({
          kind: topTag === 'p' ? 'p' : 'other',
          raw: html.slice(topStart, end),
        });
        topStart = -1;
        topTag = null;
        cursor = end;
      }
    }
  }

  // Trailing whitespace/text outside any tag is ignored — the upstream
  // Qwen output is always tag-wrapped.
  void cursor;
  return tokens;
}

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

// ── Trending Story Lines nav helpers (#486) ─────────────────────────
//
// The weekly Reader epub leads with a "Trending Story Lines" section
// containing every consolidated commentary whose sources include at least
// one article published in the last 7 days. These pure helpers build the
// nav.xhtml and toc.ncx fragments for that section so weekly.ts can keep
// its rendering in one place and tests can exercise the structure without
// a database or archiver.
//
// Entries are written as article-0.xhtml .. article-(N-1).xhtml; the rest
// of the topic groups start at article-N and are rendered by the existing
// topic loop. If `titles` is empty the helpers return empty strings and
// the caller MUST omit the section heading entirely (no empty heading).

function escXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const TRENDING_SECTION_TITLE = 'Trending Story Lines';

/**
 * Build the nav.xhtml `<li>` for the "Trending Story Lines" section.
 * Returns empty string when `titles` is empty.
 *
 * Output shape matches the existing topic-group shape in weekly.ts:
 *   <li><a href="article-0.xhtml">Trending Story Lines</a>
 *     <ol>
 *       <li><a href="article-0.xhtml">Title 0</a></li>
 *       ...
 *     </ol>
 *   </li>
 */
export function renderTrendingNavSection(titles: string[]): string {
  if (titles.length === 0) {return '';}
  let out = `    <li><a href="article-0.xhtml">${escXml(TRENDING_SECTION_TITLE)}</a>\n      <ol>\n`;
  for (let i = 0; i < titles.length; i++) {
    out += `        <li><a href="article-${i}.xhtml">${escXml(titles[i])}</a></li>\n`;
  }
  out += `      </ol>\n    </li>\n`;
  return out;
}

/**
 * Build NCX navPoints for the "Trending Story Lines" section.
 * Returns { ncxHtml, nextPlayOrder } — the caller uses `nextPlayOrder`
 * as the starting playOrder for subsequent topic groups.
 *
 * Returns { ncxHtml: '', nextPlayOrder: startPlayOrder } when titles is
 * empty so the NCX contains no empty section.
 */
export function renderTrendingNcxSection(
  titles: string[],
  startPlayOrder: number
): { ncxHtml: string; nextPlayOrder: number } {
  if (titles.length === 0) {
    return { ncxHtml: '', nextPlayOrder: startPlayOrder };
  }
  let order = startPlayOrder;
  let out = `  <navPoint id="navpoint-${order}" playOrder="${order}">
    <navLabel><text>${escXml(TRENDING_SECTION_TITLE)}</text></navLabel>
    <content src="article-0.xhtml"/>\n`;
  order++;
  for (let i = 0; i < titles.length; i++) {
    out += `    <navPoint id="navpoint-${order}" playOrder="${order}">
      <navLabel><text>${escXml(titles[i])}</text></navLabel>
      <content src="article-${i}.xhtml"/>
    </navPoint>\n`;
    order++;
  }
  out += `  </navPoint>\n`;
  return { ncxHtml: out, nextPlayOrder: order };
}

// ── Epub chapter rendering ──────────────────────────────────────────
//
// Renders the <body>...</body> contents for one weekly-Reader chapter.
// Pure function: no DB, no I/O. The caller is responsible for fetching
// commentary sources, deep-dive content, and image bytes.
//
// For single-source articles (`is_consolidated=false`) the layout is the
// existing one: header → image → commentary body → affiliate books → deep
// dives.
//
// For consolidated commentary (`is_consolidated=true`) the layout follows
// the public-site template from issue #450: header (with multi-source
// attribution) → image → commentary body → interlaced source-excerpt /
// truncated deep-dive blocks → affiliate books.

function escAttr(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export interface EpubChapterSource {
  articleId: string;
  title: string;
  author: string;
  publicationName: string;
  originalUrl: string;
  /** Pre-extracted ~200-word excerpt HTML (already sanitized for XHTML). */
  excerptHtml: string;
  isPrimary: boolean;
  position: number;
}

export interface EpubChapterDeepDive {
  title: string;
  /**
   * Already-truncated, already-XHTML-sanitized deep dive body. Callers run
   * `truncateDeepDive` then their own xhtml cleaner before handing it in;
   * the chapter renderer embeds the string verbatim.
   */
  displayHtml: string;
  slug: string;
}

export interface EpubAffiliateBook {
  isbn10: string;
  isbn13?: string;
  title: string;
  author: string;
  description: string;
}

export interface EpubChapterInput {
  title: string;
  authorName: string;
  publicationName: string;
  publishedAt: string | null;
  estimatedReadTimeMinutes: number;
  /** Inline image tag (already built by caller, may be empty). */
  imageHtml: string;
  /** XHTML-ready commentary body. */
  bodyHtml: string;
  /** XHTML-ready affiliate books block (already built, may be empty). */
  affiliateHtml: string;
  /** XHTML-ready topic header (h2) for the first article in a topic group. */
  topicHeaderHtml: string;
  isConsolidated: boolean;
  /** Sorted by position; ignored when isConsolidated is false. */
  sources: EpubChapterSource[];
  deepDives: EpubChapterDeepDive[];
}

function formatDate(iso: string | null): string {
  if (!iso) {return '';}
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function renderDeepDiveBlock(dd: EpubChapterDeepDive): string {
  if (!dd.displayHtml) {return '';}
  return `
  <div class="deep-dive">
    <p class="deep-dive-label">Deep Dive</p>
    <h3>${escAttr(dd.title)}</h3>
    ${dd.displayHtml}
  </div>`;
}

function renderSourceExcerptBlock(src: EpubChapterSource): string {
  const isYouTube = /(?:youtube\.com|youtu\.be)/i.test(src.originalUrl);
  const linkLabel = isYouTube ? 'Watch video' : 'Read full article';
  return `
  <div class="source-excerpt">
    <h3>${escAttr(src.title)}</h3>
    <p class="source-meta">by ${escAttr(src.author)} · ${escAttr(src.publicationName)} · <a href="${escAttr(src.originalUrl)}">${linkLabel}</a></p>
    ${src.excerptHtml}
  </div>`;
}

/**
 * Render the body XHTML for a single weekly-Reader chapter.
 * Returns the HTML to place between `<body>` and `</body>`.
 *
 * Single-source: header → image → body → affiliates → deep dives.
 * Consolidated: header (multi-source attribution) → image → body →
 *   interlaced [source, deep-dive]* → affiliates.
 */
export function renderEpubChapterBody(input: EpubChapterInput): string {
  const date = formatDate(input.publishedAt);

  if (!input.isConsolidated) {
    let deepDiveHtml = '';
    for (const dd of input.deepDives) {
      deepDiveHtml += renderDeepDiveBlock(dd);
    }
    return `${input.topicHeaderHtml}
  ${input.imageHtml}
  <div class="article-header">
    <h1>${escAttr(input.title)}</h1>
    <p class="article-meta">${escAttr(input.authorName)} · ${escAttr(input.publicationName)}${date ? ` · ${date}` : ''}${input.estimatedReadTimeMinutes ? ` · ${input.estimatedReadTimeMinutes} min read` : ''}</p>
  </div>
  ${input.bodyHtml}
  ${input.affiliateHtml}
  ${deepDiveHtml}`;
  }

  // Consolidated: build multi-source attribution + interlaced sources/dds.
  const ordered = [...input.sources].sort((a, b) => a.position - b.position);
  const primary = ordered.find(s => s.isPrimary) ?? ordered[0];
  const attribution = primary
    ? `by Brian Edwards — multiple sources including ${escAttr(primary.author)}, ${escAttr(primary.publicationName)}`
    : `by Brian Edwards`;

  const interlacedParts: string[] = [];
  const max = Math.max(ordered.length, input.deepDives.length);
  for (let i = 0; i < max; i++) {
    if (i < ordered.length) {
      interlacedParts.push(renderSourceExcerptBlock(ordered[i]));
    }
    if (i < input.deepDives.length) {
      interlacedParts.push(renderDeepDiveBlock(input.deepDives[i]));
    }
  }
  const sourcesAndDeepDives = interlacedParts.length > 0
    ? `\n  <div class="source-excerpts">\n    <h2>Sources</h2>${interlacedParts.join('')}\n  </div>`
    : '';

  return `${input.topicHeaderHtml}
  ${input.imageHtml}
  <div class="article-header">
    <h1>${escAttr(input.title)}</h1>
    <p class="article-meta">${attribution}${date ? ` · ${date}` : ''}${input.estimatedReadTimeMinutes ? ` · ${input.estimatedReadTimeMinutes} min read` : ''}</p>
  </div>
  ${input.bodyHtml}${sourcesAndDeepDives}
  ${input.affiliateHtml}`;
}
