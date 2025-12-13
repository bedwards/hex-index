/**
 * Filesystem storage for articles
 * Stores markdown files in library/{publication-slug}/{article-slug}.md
 */

import { mkdir, writeFile, readFile, readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { existsSync } from 'fs';
import {
  ConvertedArticle,
  StorageResult,
  LibraryConfig,
  DEFAULT_LIBRARY_CONFIG,
} from './types.js';
import { generateMarkdownFile, slugify } from './converter.js';

/**
 * Ensure directory exists
 */
async function ensureDir(dir: string): Promise<void> {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

/**
 * Get the storage path for an article
 */
export function getArticlePath(
  publicationSlug: string,
  articleSlug: string,
  config: LibraryConfig = DEFAULT_LIBRARY_CONFIG
): string {
  return join(config.baseDir, publicationSlug, `${articleSlug}.md`);
}

/**
 * Store an article to the filesystem
 */
export async function storeArticle(
  article: ConvertedArticle,
  config: LibraryConfig = DEFAULT_LIBRARY_CONFIG
): Promise<StorageResult> {
  try {
    const articleSlug = slugify(article.metadata.title);
    const path = getArticlePath(article.metadata.publication_slug, articleSlug, config);

    // Ensure directory exists
    await ensureDir(dirname(path));

    // Generate and write markdown
    const content = generateMarkdownFile(article);
    await writeFile(path, content, 'utf-8');

    return { success: true, path };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Check if an article already exists
 */
export function articleExists(
  publicationSlug: string,
  articleSlug: string,
  config: LibraryConfig = DEFAULT_LIBRARY_CONFIG
): boolean {
  const path = getArticlePath(publicationSlug, articleSlug, config);
  return existsSync(path);
}

/**
 * Read an article from the filesystem
 */
export async function readArticle(
  publicationSlug: string,
  articleSlug: string,
  config: LibraryConfig = DEFAULT_LIBRARY_CONFIG
): Promise<string | null> {
  const path = getArticlePath(publicationSlug, articleSlug, config);
  try {
    return await readFile(path, 'utf-8');
  } catch {
    return null;
  }
}

/**
 * List all publications in the library
 */
export async function listPublications(
  config: LibraryConfig = DEFAULT_LIBRARY_CONFIG
): Promise<string[]> {
  try {
    const entries = await readdir(config.baseDir, { withFileTypes: true });
    return entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }
}

/**
 * List all articles in a publication
 */
export async function listArticles(
  publicationSlug: string,
  config: LibraryConfig = DEFAULT_LIBRARY_CONFIG
): Promise<string[]> {
  try {
    const pubDir = join(config.baseDir, publicationSlug);
    const entries = await readdir(pubDir);
    return entries
      .filter((e) => e.endsWith('.md'))
      .map((e) => e.replace('.md', ''))
      .sort();
  } catch {
    return [];
  }
}

/**
 * Get library statistics
 */
export async function getLibraryStats(
  config: LibraryConfig = DEFAULT_LIBRARY_CONFIG
): Promise<{
  publications: number;
  articles: number;
  totalSize: number;
}> {
  let publications = 0;
  let articles = 0;
  let totalSize = 0;

  try {
    const pubs = await listPublications(config);
    publications = pubs.length;

    for (const pub of pubs) {
      const arts = await listArticles(pub, config);
      articles += arts.length;

      for (const art of arts) {
        const path = getArticlePath(pub, art, config);
        const stats = await stat(path);
        totalSize += stats.size;
      }
    }
  } catch {
    // Ignore errors
  }

  return { publications, articles, totalSize };
}

/**
 * Parse frontmatter from a markdown file
 */
export function parseFrontmatter(markdown: string): Record<string, unknown> | null {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {return null;}

  const yaml = match[1];
  const result: Record<string, unknown> = {};

  // Simple YAML parser for our frontmatter format
  const lines = yaml.split('\n');
  let currentKey: string | null = null;
  let currentObject: Record<string, string> | null = null;

  for (const line of lines) {
    // Nested object entry
    if (line.startsWith('  ') && currentKey) {
      const match = line.match(/^\s+(\w+):\s*"?([^"]*)"?$/);
      if (match && currentObject) {
        currentObject[match[1]] = match[2];
      }
      continue;
    }

    // Top-level entry
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      const key = keyMatch[1];
      let value: unknown = keyMatch[2];

      // Handle quoted strings
      if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n');
      }

      // Handle numbers
      if (typeof value === 'string' && /^\d+$/.test(value)) {
        value = parseInt(value, 10);
      }

      // Check if this is a nested object start
      if (value === '') {
        currentKey = key;
        currentObject = {};
        result[key] = currentObject;
      } else {
        result[key] = value;
        currentKey = null;
        currentObject = null;
      }
    }
  }

  return result;
}
