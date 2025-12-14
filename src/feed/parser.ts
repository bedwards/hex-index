/**
 * RSS/Atom feed parser
 * Handles both RSS 2.0 and Atom feed formats
 */

import { XMLParser } from 'fast-xml-parser';
import { Feed, FeedItem, MediaType } from './types.js';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  isArray: (name) => ['item', 'entry'].includes(name),
});

interface RSSChannel {
  title: string;
  description?: string;
  link: string;
  lastBuildDate?: string;
  'atom:link'?: { '@_href'?: string };
  item?: RSSItem[];
}

interface RSSItem {
  title: string;
  link: string;
  pubDate?: string;
  'dc:creator'?: string;
  author?: string;
  description?: string;
  'content:encoded'?: string | { '#text'?: string };
  guid?: string | { '#text': string };
  enclosure?: { '@_url'?: string; '@_type'?: string };
  'media:content'?: { '@_url'?: string; '@_type'?: string; '@_medium'?: string };
  category?: string | string[] | { '#text'?: string }[];
}

interface AtomFeed {
  title: string | { '#text': string };
  subtitle?: string;
  link?: AtomLink | AtomLink[];
  updated?: string;
  author?: { name?: string };
  entry?: AtomEntry[];
}

interface AtomLink {
  '@_href'?: string;
  '@_rel'?: string;
  '@_type'?: string;
}

interface AtomEntry {
  title: string | { '#text': string };
  link?: AtomLink | AtomLink[];
  published?: string;
  updated?: string;
  author?: { name?: string };
  summary?: string | { '#text': string };
  content?: string | { '#text': string; '@_type'?: string };
  id?: string;
  'media:thumbnail'?: { '@_url'?: string };
  'media:content'?: { '@_url'?: string; '@_type'?: string; '@_medium'?: string };
  category?: string | string[] | { '#text'?: string }[];
}

/**
 * Detect media type from RSS/Atom feed item metadata
 */
function detectMediaType(item: {
  enclosure?: { '@_type'?: string };
  'media:content'?: { '@_type'?: string; '@_medium'?: string };
  'content:encoded'?: string | { '#text'?: string };
  category?: string | string[] | { '#text'?: string }[];
}): MediaType {
  // Check enclosure type (RSS)
  if (item.enclosure?.['@_type']) {
    const type = item.enclosure['@_type'];
    if (type.startsWith('audio/')) {
      return 'audio';
    }
    if (type.startsWith('video/')) {
      return 'video';
    }
  }

  // Check Media RSS type
  if (item['media:content']?.['@_type']) {
    const type = item['media:content']['@_type'];
    if (type.startsWith('audio/')) {
      return 'audio';
    }
    if (type.startsWith('video/')) {
      return 'video';
    }
  }

  // Check for media attributes in Media RSS
  if (item['media:content']?.['@_medium']) {
    const medium = item['media:content']['@_medium'];
    if (medium === 'audio') {
      return 'audio';
    }
    if (medium === 'video') {
      return 'video';
    }
  }

  // Check categories for media indicators
  if (item.category) {
    const cats = Array.isArray(item.category) ? item.category : [item.category];
    for (const cat of cats) {
      const category = typeof cat === 'string' ? cat : (cat as { '#text'?: string })['#text'] || '';
      const lowerCat = category.toLowerCase();
      if (lowerCat.includes('podcast') || lowerCat.includes('audio')) {
        return 'audio';
      }
      if (lowerCat.includes('video')) {
        return 'video';
      }
    }
  }

  // Check HTML content for media tags and transcripts
  const content = item['content:encoded'];
  if (content) {
    const htmlContent = typeof content === 'string' ? content : content['#text'] || '';
    const lowerHtml = htmlContent.toLowerCase();

    // Check for media tags
    if (lowerHtml.includes('<video')) {
      return 'video';
    }
    if (lowerHtml.includes('<audio')) {
      return 'audio';
    }

    // Check for transcript indicators (these are audio/video with transcripts)
    if (lowerHtml.includes('transcript') || lowerHtml.includes('listen to this episode')) {
      return 'audio';
    }
  }

  return 'text';
}

/**
 * Parse XML content into a Feed object
 */
export function parseFeed(xml: string, feedUrl: string): Feed {
  const parsed = parser.parse(xml) as Record<string, unknown>;

  // Check if it's RSS
  if ('rss' in parsed) {
    return parseRSS(parsed.rss as { channel: RSSChannel }, feedUrl);
  }

  // Check if it's Atom
  if ('feed' in parsed) {
    return parseAtom(parsed.feed as AtomFeed, feedUrl);
  }

  throw new Error('Unknown feed format: expected RSS or Atom');
}

function parseRSS(rss: { channel: RSSChannel }, feedUrl: string): Feed {
  const channel = rss.channel;

  const items: FeedItem[] = (channel.item ?? []).map((item) => {
    const contentHtml = typeof item['content:encoded'] === 'string'
      ? item['content:encoded']
      : item['content:encoded']?.['#text'] ?? item.description ?? '';
    const summary = item.description && item['content:encoded'] ? item.description : undefined;

    // Extract image from enclosure or media:content (only if not audio/video)
    let imageUrl: string | undefined;
    const enclosureType = item.enclosure?.['@_type'];
    const isMediaEnclosure = enclosureType?.startsWith('audio/') || enclosureType?.startsWith('video/');

    if (item.enclosure?.['@_url'] && !isMediaEnclosure) {
      imageUrl = item.enclosure['@_url'];
    } else if (item['media:content']?.['@_url']) {
      imageUrl = item['media:content']['@_url'];
    }

    // Extract GUID
    const guid = typeof item.guid === 'string' ? item.guid : item.guid?.['#text'];

    // Detect media type
    const mediaType = detectMediaType({
      enclosure: item.enclosure,
      'media:content': item['media:content'],
      'content:encoded': item['content:encoded'],
      category: item.category,
    });

    return {
      title: item.title,
      url: item.link,
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
      author: item['dc:creator'] ?? item.author ?? channel.title,
      contentHtml,
      mediaType,
      summary,
      imageUrl,
      guid,
    };
  });

  return {
    title: channel.title,
    description: channel.description,
    link: channel.link,
    feedUrl: channel['atom:link']?.['@_href'] ?? feedUrl,
    lastBuildDate: channel.lastBuildDate ? new Date(channel.lastBuildDate) : undefined,
    items,
  };
}

function parseAtom(atom: AtomFeed, feedUrl: string): Feed {
  // Get feed link
  const links = Array.isArray(atom.link) ? atom.link : atom.link ? [atom.link] : [];
  const htmlLink = links.find((l) => l['@_rel'] === 'alternate' || !l['@_rel']);
  const selfLink = links.find((l) => l['@_rel'] === 'self');

  const items: FeedItem[] = (atom.entry ?? []).map((entry) => {
    // Get entry link
    const entryLinks = Array.isArray(entry.link) ? entry.link : entry.link ? [entry.link] : [];
    const entryHtmlLink = entryLinks.find((l) => l['@_rel'] === 'alternate' || !l['@_rel']);

    // Extract content
    const content = typeof entry.content === 'string' ? entry.content : entry.content?.['#text'] ?? '';
    const summary = typeof entry.summary === 'string' ? entry.summary : entry.summary?.['#text'];
    const title = typeof entry.title === 'string' ? entry.title : entry.title?.['#text'] ?? '';

    // Detect media type
    const mediaType = detectMediaType({
      'media:content': entry['media:content'],
      'content:encoded': content,
      category: entry.category,
    });

    return {
      title,
      url: entryHtmlLink?.['@_href'] ?? '',
      publishedAt: entry.published ? new Date(entry.published) : entry.updated ? new Date(entry.updated) : new Date(),
      author: entry.author?.name ?? atom.author?.name ?? '',
      contentHtml: content,
      mediaType,
      summary,
      imageUrl: entry['media:thumbnail']?.['@_url'],
      guid: entry.id,
    };
  });

  const title = typeof atom.title === 'string' ? atom.title : atom.title?.['#text'] ?? '';

  return {
    title,
    description: atom.subtitle,
    link: htmlLink?.['@_href'] ?? '',
    feedUrl: selfLink?.['@_href'] ?? feedUrl,
    author: atom.author?.name,
    lastBuildDate: atom.updated ? new Date(atom.updated) : undefined,
    items,
  };
}

/**
 * Extract text content from potentially HTML string
 */
export function extractTextContent(html: string): string {
  // Simple HTML tag stripping - for more complex needs, use a proper HTML parser
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Estimate read time from HTML content
 */
export function estimateReadTime(html: string): number {
  const text = extractTextContent(html);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  // Average reading speed: 200 words per minute
  return Math.ceil(wordCount / 200);
}

/**
 * Count words in HTML content
 */
export function countWords(html: string): number {
  const text = extractTextContent(html);
  return text.split(/\s+/).filter(Boolean).length;
}
