/**
 * Shared utilities for static site generation
 */

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Format a date string for display
 */
export function formatDate(dateStr: string | null): string {
  if (!dateStr) {return '';}
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Extract plain text excerpt from HTML content
 * Returns approximately the first N words for copyright compliance
 * Used for listings/cards where we need plain text
 */
export function extractExcerpt(htmlContent: string, wordLimit: number = 200): string {
  // Strip HTML tags
  const text = htmlContent
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

  // Split into words and take the limit
  const words = text.split(/\s+/);
  if (words.length <= wordLimit) {
    return text;
  }

  // Find a good sentence break near the word limit
  const truncatedWords = words.slice(0, wordLimit);
  let excerpt = truncatedWords.join(' ');

  // Try to end at a sentence boundary
  const lastPeriod = excerpt.lastIndexOf('.');
  const lastQuestion = excerpt.lastIndexOf('?');
  const lastExclaim = excerpt.lastIndexOf('!');
  const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclaim);

  // Only use sentence boundary if it's reasonably close to the end (within last 50 chars)
  if (lastSentenceEnd > excerpt.length - 100) {
    excerpt = excerpt.substring(0, lastSentenceEnd + 1);
  } else {
    excerpt += '...';
  }

  return excerpt;
}

/**
 * Extract HTML excerpt preserving paragraph structure
 * Returns approximately the first N words with HTML formatting intact
 * Used for article pages where we want rich formatting
 */
export function extractHtmlExcerpt(htmlContent: string, wordLimit: number = 400): string {
  // Remove wrapper elements, scripts, styles, and other non-content elements
  const cleaned = htmlContent
    // Remove doctype and html/head/body wrappers
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<html[^>]*>/gi, '')
    .replace(/<\/html>/gi, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<body[^>]*>/gi, '')
    .replace(/<\/body>/gi, '')
    // Remove scripts and styles
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Remove navigation and other structural elements
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '')
    // Remove SVG elements (icons, buttons)
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '')
    .replace(/<button[^>]*>[\s\S]*?<\/button>/gi, '')
    // Remove comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Remove original images — we use our own generated illustrations
    .replace(/<img[^>]*>/gi, '')
    .replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '')
    // Strip iframe/embed/object/video/audio and Substack/Spotify embed wrappers
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<embed[^>]*>/gi, '')
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, '')
    .replace(/<video[^>]*>[\s\S]*?<\/video>/gi, '')
    .replace(/<audio[^>]*>[\s\S]*?<\/audio>/gi, '')
    .replace(/<div[^>]*class="[^"]*embedded-post[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<div[^>]*class="[^"]*captioned-image[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<div[^>]*class="[^"]*spotify[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    // Recover Substack <span class="mention-wrap" data-attrs='{"name":"..."}'></span>
    // widgets: their visible text lives only in the data-attrs JSON, so a naive tag
    // strip leaves an empty string and produces artifacts like ", , ". Pull the name
    // out before the generic span stripper runs.
    .replace(
      /<span[^>]*class="[^"]*mention-wrap[^"]*"[^>]*data-attrs="([^"]*)"[^>]*>[\s\S]*?<\/span>/gi,
      (_m: string, attrs: string) => {
        try {
          const decoded = attrs.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
          const parsed = JSON.parse(decoded) as { name?: string };
          return parsed.name ? parsed.name : '';
        } catch {
          return '';
        }
      }
    )
    // Dissolve section headings: turn h1-h6 into a self-contained paragraph so the
    // heading text becomes a sentence on its own. We must close the <p> we open here,
    // otherwise an immediately-following <p> in the source produces invalid nested
    // <p><p>...</p></p> markup. (See PR #495 review.)
    .replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, '<p>$1.</p> ')
    // Strip horizontal rules
    .replace(/<hr[^>]*\/?>/gi, '')
    // Strip lists, blockquotes, tables, divs, spans, structural elements
    .replace(/<\/?(ul|ol|li|blockquote|table|thead|tbody|tr|td|th|div|span|section|article|header|footer|nav|aside)[^>]*>/gi, '')
    // Strip <a> tags entirely (keep inner text) — excerpts are plain text, no links
    .replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1')
    // Strip inline emphasis entirely: no bold, no italics
    .replace(/<\/?(em|strong|i|b)[^>]*>/gi, '')
    // Strip attributes from remaining text-level tags (only <p> and <br> survive)
    .replace(/<(p|br)[^>]*>/gi, (_m, tag) => `<${tag}>`)
    // Strip emoji + pictographs + dingbats + symbols. Covers the major Unicode blocks used
    // for emoji, plus variation selectors and zero-width joiners that stitch them together.
    // eslint-disable-next-line no-misleading-character-class
    .replace(/[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '')
    // Collapse empty-token punctuation runs left behind by stripped widgets/links
    // (e.g. ", , and" → ", and"; ", ." → ".") so the prose reads cleanly.
    .replace(/,(\s*,)+/g, ',')
    .replace(/\(\s*\)/g, '')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();

  // Count words to find where to truncate
  let wordCount = 0;
  let result = '';
  let inTag = false;
  let currentWord = '';

  for (const char of cleaned) {

    if (char === '<') {
      inTag = true;
      if (currentWord.trim()) {
        wordCount++;
        currentWord = '';
      }
      result += char;
    } else if (char === '>') {
      inTag = false;
      result += char;
    } else if (inTag) {
      result += char;
    } else if (/\s/.test(char)) {
      if (currentWord.trim()) {
        wordCount++;
        currentWord = '';
      }
      result += char;
      if (wordCount >= wordLimit) {
        break;
      }
    } else {
      currentWord += char;
      result += char;
    }
  }

  // Close any unclosed tags
  const openTags: string[] = [];
  const tagPattern = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
  let match;
  while ((match = tagPattern.exec(result)) !== null) {
    const fullMatch = match[0];
    const tagName = match[1].toLowerCase();
    // Skip self-closing and void elements
    if (fullMatch.endsWith('/>') || ['br', 'hr', 'img', 'input', 'meta', 'link'].includes(tagName)) {
      continue;
    }
    if (fullMatch.startsWith('</')) {
      const idx = openTags.lastIndexOf(tagName);
      if (idx !== -1) {
        openTags.splice(idx, 1);
      }
    } else {
      openTags.push(tagName);
    }
  }

  // Close remaining open tags in reverse order
  for (let i = openTags.length - 1; i >= 0; i--) {
    result += `</${openTags[i]}>`;
  }

  // Add ellipsis if we truncated
  if (wordCount >= wordLimit) {
    // Try to add ellipsis before the last closing tag
    const lastClosingTag = result.lastIndexOf('</');
    if (lastClosingTag > 0) {
      result = result.substring(0, lastClosingTag) + '...' + result.substring(lastClosingTag);
    } else {
      result += '...';
    }
  }

  return result.trim();
}

/**
 * Generate a relative path from one URL to another
 * Used for navigation in static HTML files
 */
export function relativePath(from: string, to: string): string {
  const fromParts = from.split('/').filter(Boolean);
  const toParts = to.split('/').filter(Boolean);

  // Remove filename from 'from' path (keep directory)
  if (fromParts.length > 0 && fromParts[fromParts.length - 1].includes('.')) {
    fromParts.pop();
  }

  // Calculate relative path
  let commonLength = 0;
  for (let i = 0; i < Math.min(fromParts.length, toParts.length); i++) {
    if (fromParts[i] === toParts[i]) {
      commonLength++;
    } else {
      break;
    }
  }

  const upCount = fromParts.length - commonLength;
  const downParts = toParts.slice(commonLength);

  const relativeParts = [...Array<string>(upCount).fill('..'), ...downParts];
  return relativeParts.length === 0 ? './' : relativeParts.join('/');
}

/**
 * Ensure a directory exists, creating it recursively if needed
 */
export async function ensureDir(dir: string): Promise<void> {
  const { mkdir } = await import('fs/promises');
  await mkdir(dir, { recursive: true });
}

/**
 * Write file with directory creation
 */
export async function writeFile(filePath: string, content: string): Promise<void> {
  const { writeFile: fsWriteFile } = await import('fs/promises');
  const { dirname } = await import('path');
  await ensureDir(dirname(filePath));
  await fsWriteFile(filePath, content, 'utf-8');
}

/**
 * Calculate estimated read time in minutes
 */
export function estimateReadTime(content: string): number {
  const words = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

// Affiliate utilities re-exported from src/shared/affiliate-utils.ts
// (moved there so the API server's tsconfig rootDir:"src" can import them)
export {
  buildAmazonUrl,
  buildBWBUrl,
  loadAffiliateBooks,
  renderBookPurchaseLinks,
} from '../../src/shared/affiliate-utils.js';
export type { AffiliateBook, ParsedAffiliateBook } from '../../src/shared/affiliate-utils.js';

/**
 * Clean YouTube transcript text by removing speech artifacts.
 * Strips filler words, speaker markers, stuttered/repeated words,
 * and normalizes whitespace. Designed for Speechify TTS readability.
 */
export function cleanTranscript(text: string): string {
  return text
    // Remove >> speaker change markers
    .replace(/>>/g, '')
    // Remove bracketed annotations like [Music], [Laughter], [Speaking in foreign language]
    // Cap at 40 chars to avoid swallowing long bracket spans in non-transcript content
    .replace(/\[[^\]]{1,40}\]/g, '')
    // Remove standalone filler words (case-insensitive, word boundaries)
    // Multi-word fillers first (uh huh before uh)
    .replace(/\buh huh,?\s*/gi, '')
    .replace(/\byou know,?\s*/gi, '')
    .replace(/\bI mean,?\s*/gi, '')
    // Single-word fillers: um, uh, ah, er (unambiguous fillers)
    .replace(/\b(?:um|uh|ah|er),?\s*/gi, '')
    // Collapse stuttered/repeated words: "the the the" → "the"
    .replace(/\b(\w+)(?:\s+\1){1,}\b/gi, '$1')
    // Clean up resulting double punctuation
    .replace(/,\s*,/g, ',')
    .replace(/\.\s*\./g, '.')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Slugify a string for use in URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
