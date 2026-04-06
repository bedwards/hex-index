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
