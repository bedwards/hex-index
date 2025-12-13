/**
 * HTML to Markdown converter
 * Handles Substack-specific HTML patterns
 */

import TurndownService from 'turndown';
import {
  ArticleMetadata,
  ConvertedArticle,
  ExtractedLink,
} from './types.js';
import { FeedItem } from '../feed/types.js';
import { countWords, estimateReadTime } from '../feed/parser.js';

// Configure Turndown for clean markdown output
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
  strongDelimiter: '**',
  linkStyle: 'inlined',
});

// Custom rule for Substack image captions
turndown.addRule('substackCaption', {
  filter: (node) => {
    return node.nodeName === 'FIGCAPTION' ||
      (node.nodeName === 'DIV' && node.classList?.contains('image-caption'));
  },
  replacement: (content) => {
    return content ? `\n*${content.trim()}*\n` : '';
  },
});

// Custom rule for Substack buttons/CTAs (remove them)
turndown.addRule('substackCTA', {
  filter: (node) => {
    const classList = node.classList;
    return classList?.contains('subscribe-widget') ||
      classList?.contains('subscription-widget') ||
      classList?.contains('button-wrapper');
  },
  replacement: () => '',
});

// Custom rule for code blocks with language hints
turndown.addRule('codeBlock', {
  filter: (node) => {
    return node.nodeName === 'PRE' && node.querySelector('code') !== null;
  },
  replacement: (_content, node) => {
    const code = (node).querySelector('code');
    if (!code) {return '';}

    const text = code.textContent ?? '';
    const lang = code.className?.match(/language-(\w+)/)?.[1] ?? '';

    return `\n\`\`\`${lang}\n${text}\n\`\`\`\n`;
  },
});

/**
 * Convert HTML to Markdown
 */
export function htmlToMarkdown(html: string): string {
  // Pre-process HTML to handle common issues
  const processed = html
    // Remove empty paragraphs
    .replace(/<p>\s*<\/p>/gi, '')
    // Convert Substack dividers
    .replace(/<hr\s*\/?>/gi, '\n---\n')
    // Clean up excessive whitespace
    .replace(/\n{3,}/g, '\n\n');

  return turndown.turndown(processed).trim();
}

/**
 * Clean HTML for Speechify-compatible reading
 * Removes Substack widgets, subscription prompts, and cleans up structure
 */
export function cleanHtmlForReading(html: string): string {
  return html
    // Remove Substack subscription widgets
    .replace(/<div[^>]*class="[^"]*subscribe[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<div[^>]*class="[^"]*subscription[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    // Remove button wrappers
    .replace(/<div[^>]*class="[^"]*button-wrapper[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    // Remove share widgets
    .replace(/<div[^>]*class="[^"]*share[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    // Remove empty paragraphs
    .replace(/<p>\s*<\/p>/gi, '')
    // Remove excessive whitespace
    .replace(/\n{3,}/g, '\n\n')
    // Clean up line breaks
    .replace(/\s*\n\s*/g, '\n')
    .trim();
}

/**
 * Extract all links from HTML content
 */
export function extractLinks(html: string, sourceUrl: string): ExtractedLink[] {
  const links: ExtractedLink[] = [];

  // Simple regex to extract links - works for our RSS content
  const linkRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/gi;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    const url = match[1];
    const text = match[2].trim();

    // Skip empty links, anchors, mailto, etc.
    if (!url || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('javascript:')) {
      continue;
    }

    const link: ExtractedLink = {
      url,
      text,
      type: categorizeLink(url, sourceUrl),
    };

    // Extract slug for Substack links
    const slugMatch = url.match(/([a-z0-9-]+)\.substack\.com\/p\/([a-z0-9-]+)/i);
    if (slugMatch) {
      link.targetSlug = `${slugMatch[1]}/${slugMatch[2]}`;
    }

    links.push(link);
  }

  return links;
}

/**
 * Categorize a link as internal, cross-publication, or external
 */
function categorizeLink(linkUrl: string, sourceUrl: string): 'internal' | 'cross-publication' | 'external' {
  try {
    const link = new URL(linkUrl);
    const source = new URL(sourceUrl);

    // Same host = internal
    if (link.host === source.host) {
      return 'internal';
    }

    // Another Substack = cross-publication
    if (link.host.endsWith('.substack.com')) {
      return 'cross-publication';
    }

    // Everything else = external
    return 'external';
  } catch {
    // If URL parsing fails, assume external
    return 'external';
  }
}

/**
 * Generate YAML frontmatter from metadata
 */
export function generateFrontmatter(metadata: ArticleMetadata): string {
  const lines = [
    '---',
    `title: "${escapeYamlString(metadata.title)}"`,
    `author: "${escapeYamlString(metadata.author)}"`,
    `publication: "${escapeYamlString(metadata.publication)}"`,
    `publication_slug: "${metadata.publication_slug}"`,
    `published_at: "${metadata.published_at}"`,
    `source_url: "${metadata.source_url}"`,
    `word_count: ${metadata.word_count}`,
    `estimated_read_time: ${metadata.estimated_read_time}`,
  ];

  if (metadata.tags && Object.keys(metadata.tags).length > 0) {
    lines.push('tags:');
    for (const [key, value] of Object.entries(metadata.tags)) {
      lines.push(`  ${key}: "${escapeYamlString(value)}"`);
    }
  }

  lines.push('---');
  return lines.join('\n');
}

/**
 * Escape special characters in YAML strings
 */
function escapeYamlString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
}

/**
 * Generate a slug from a title
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100);
}

/**
 * Convert a feed item to a ConvertedArticle
 */
export function convertFeedItem(
  item: FeedItem,
  publication: { name: string; slug: string }
): ConvertedArticle {
  const markdown = htmlToMarkdown(item.contentHtml);
  const html = cleanHtmlForReading(item.contentHtml);
  const links = extractLinks(item.contentHtml, item.url);

  const metadata: ArticleMetadata = {
    title: item.title,
    author: item.author,
    publication: publication.name,
    publication_slug: publication.slug,
    published_at: item.publishedAt.toISOString(),
    source_url: item.url,
    word_count: countWords(item.contentHtml),
    estimated_read_time: estimateReadTime(item.contentHtml),
  };

  return { metadata, markdown, html, links };
}

/**
 * Generate full markdown file content with frontmatter
 */
export function generateMarkdownFile(article: ConvertedArticle): string {
  const frontmatter = generateFrontmatter(article.metadata);
  return `${frontmatter}\n\n${article.markdown}`;
}
