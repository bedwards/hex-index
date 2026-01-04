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
 * Returns approximately the first 200 words for copyright compliance
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
