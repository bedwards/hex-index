/**
 * Wikipedia scraper with rate limiting
 * Responsibly fetches Wikipedia content for rewriting
 */

import * as cheerio from 'cheerio';
import { WikipediaContent, WikipediaSection, ScraperOptions, DEFAULT_SCRAPER_OPTIONS } from './types.js';

// Rate limiting state
let lastRequestTime = 0;

/**
 * Delay between requests to be respectful to Wikipedia
 */
async function rateLimit(delayMs: number): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < delayMs) {
    await new Promise(resolve => setTimeout(resolve, delayMs - elapsed));
  }
  lastRequestTime = Date.now();
}

/**
 * Calculate word count from text
 */
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Estimate read time in minutes (assuming 200 WPM)
 */
function estimateReadTime(wordCount: number): number {
  return Math.ceil(wordCount / 200);
}

/**
 * Extract article title from Wikipedia URL
 */
export function extractTitleFromUrl(url: string): string {
  const match = url.match(/\/wiki\/([^#?]+)/);
  if (!match) {
    throw new Error(`Invalid Wikipedia URL: ${url}`);
  }
  return decodeURIComponent(match[1].replace(/_/g, ' '));
}

/**
 * Normalize Wikipedia URL to canonical form
 */
export function normalizeWikipediaUrl(url: string): string {
  // Handle various Wikipedia URL formats
  const match = url.match(/(?:https?:\/\/)?(?:en\.)?wikipedia\.org\/wiki\/([^#?]+)/);
  if (match) {
    return `https://en.wikipedia.org/wiki/${match[1]}`;
  }
  // Already a valid URL
  if (url.startsWith('https://en.wikipedia.org/wiki/')) {
    return url.split('#')[0].split('?')[0];
  }
  throw new Error(`Cannot normalize Wikipedia URL: ${url}`);
}

/**
 * Scrape a Wikipedia article
 */
export async function scrapeWikipedia(
  url: string,
  options: Partial<ScraperOptions> = {}
): Promise<WikipediaContent> {
  const opts = { ...DEFAULT_SCRAPER_OPTIONS, ...options };

  // Rate limit
  await rateLimit(opts.delayMs);

  const normalizedUrl = normalizeWikipediaUrl(url);

  // Fetch the page
  const response = await fetch(normalizedUrl, {
    headers: {
      'User-Agent': 'hex-index/1.0 (Personal reading library; contact@example.com)',
      'Accept': 'text/html',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Wikipedia: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Extract title
  const title = $('#firstHeading').text().trim() || extractTitleFromUrl(normalizedUrl);

  // Remove unwanted elements
  $('.mw-editsection').remove();
  $('.reference').remove();
  $('.reflist').remove();
  $('.navbox').remove();
  $('.sistersitebox').remove();
  $('.mbox-small').remove();
  $('.noprint').remove();
  $('.mw-empty-elt').remove();
  $('table.infobox').remove();
  $('table.sidebar').remove();
  $('.hatnote').remove();
  $('.shortdescription').remove();

  // Extract main content
  const content = $('#mw-content-text .mw-parser-output');

  // Extract sections
  const sections: WikipediaSection[] = [];
  let currentSection: WikipediaSection | null = null;
  const mainContentParagraphs: string[] = [];

  content.children().each((_, el) => {
    const $el = $(el);
    const tagName = 'tagName' in el ? el.tagName.toLowerCase() : undefined;

    // Handle headings
    if (tagName && tagName.match(/^h[2-6]$/)) {
      // Save previous section
      if (currentSection && currentSection.content.trim()) {
        sections.push(currentSection);
      }

      const level = parseInt(tagName[1], 10);
      const heading = $el.find('.mw-headline').text().trim() || $el.text().trim();

      // Skip certain sections
      if (['See also', 'References', 'External links', 'Notes', 'Further reading', 'Bibliography'].includes(heading)) {
        currentSection = null;
        return;
      }

      currentSection = {
        heading,
        level,
        content: '',
      };
    } else if (tagName === 'p') {
      const text = $el.text().trim();
      if (text) {
        if (currentSection) {
          currentSection.content += text + '\n\n';
        } else {
          mainContentParagraphs.push(text);
        }
      }
    } else if (tagName === 'ul' || tagName === 'ol') {
      const items: string[] = [];
      $el.find('li').each((_, li) => {
        const liText = $(li).text().trim();
        if (liText) {
          items.push(`- ${liText}`);
        }
      });
      if (items.length > 0) {
        const listText = items.join('\n') + '\n\n';
        if (currentSection) {
          currentSection.content += listText;
        } else {
          mainContentParagraphs.push(listText);
        }
      }
    } else if (tagName === 'blockquote') {
      const quote = $el.text().trim();
      if (quote) {
        const quoteText = `> ${quote}\n\n`;
        if (currentSection) {
          currentSection.content += quoteText;
        } else {
          mainContentParagraphs.push(quoteText);
        }
      }
    }
  });

  // Don't forget the last section
  const lastSection = currentSection as WikipediaSection | null;
  if (lastSection && lastSection.content.trim()) {
    sections.push(lastSection);
  }

  // Combine all content for word count
  const mainContent = mainContentParagraphs.join('\n\n');
  const allContent = mainContent + '\n\n' + sections.map(s => `${s.heading}\n\n${s.content}`).join('\n\n');
  const wordCount = countWords(allContent);

  return {
    title,
    url: normalizedUrl,
    mainContent,
    sections,
    wordCount,
    estimatedReadTime: estimateReadTime(wordCount),
  };
}

/**
 * Check if a Wikipedia article meets minimum read time requirements
 */
export async function checkWikipediaArticleLength(
  url: string,
  minReadTime: number = 10
): Promise<{ meetsMinimum: boolean; estimatedReadTime: number }> {
  try {
    const content = await scrapeWikipedia(url, { followLinks: false });
    return {
      meetsMinimum: content.estimatedReadTime >= minReadTime,
      estimatedReadTime: content.estimatedReadTime,
    };
  } catch {
    return { meetsMinimum: false, estimatedReadTime: 0 };
  }
}

/**
 * Search Wikipedia for a topic and return the best matching URL
 */
export async function searchWikipedia(query: string): Promise<string | null> {
  await rateLimit(1000);

  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=1`;

  const response = await fetch(searchUrl, {
    headers: {
      'User-Agent': 'hex-index/1.0 (Personal reading library)',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json() as { query?: { search?: Array<{ title: string }> } };
  const results = data.query?.search;

  if (!results || results.length === 0) {
    return null;
  }

  const title = results[0].title;
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
}

/**
 * Format Wikipedia content as clean HTML for reading
 */
export function formatContentAsHtml(content: WikipediaContent): string {
  const parts: string[] = [];

  // Main content paragraphs
  if (content.mainContent) {
    const paragraphs = content.mainContent.split('\n\n').filter(p => p.trim());
    for (const p of paragraphs) {
      if (p.startsWith('- ')) {
        // List
        const items = p.split('\n').map(item => `<li>${escapeHtml(item.replace(/^- /, ''))}</li>`);
        parts.push(`<ul>${items.join('')}</ul>`);
      } else if (p.startsWith('> ')) {
        // Blockquote
        parts.push(`<blockquote>${escapeHtml(p.replace(/^> /, ''))}</blockquote>`);
      } else {
        parts.push(`<p>${escapeHtml(p)}</p>`);
      }
    }
  }

  // Sections
  for (const section of content.sections) {
    const tag = `h${Math.min(section.level, 6)}`;
    parts.push(`<${tag}>${escapeHtml(section.heading)}</${tag}>`);

    const paragraphs = section.content.split('\n\n').filter(p => p.trim());
    for (const p of paragraphs) {
      if (p.startsWith('- ')) {
        const items = p.split('\n').map(item => `<li>${escapeHtml(item.replace(/^- /, ''))}</li>`);
        parts.push(`<ul>${items.join('')}</ul>`);
      } else if (p.startsWith('> ')) {
        parts.push(`<blockquote>${escapeHtml(p.replace(/^> /, ''))}</blockquote>`);
      } else {
        parts.push(`<p>${escapeHtml(p)}</p>`);
      }
    }
  }

  return parts.join('\n');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
