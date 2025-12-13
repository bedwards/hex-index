/**
 * Discovery Store
 *
 * Manages the accumulation and deduplication of discovered publications.
 * Stores results to filesystem for persistence across runs.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import {
  DiscoveredPublication,
  DiscoveryProgress,
  normalizeSubstackUrl,
  getFeedUrl,
} from './types.js';

const STORE_PATH = new URL('../../content/discovered-publications.json', import.meta.url).pathname;
const PROGRESS_PATH = new URL('../../content/discovery-progress.json', import.meta.url).pathname;

interface Store {
  publications: Map<string, DiscoveredPublication>; // keyed by slug
  progress: DiscoveryProgress;
}

let store: Store | null = null;

/**
 * Load store from disk or initialize empty
 */
export function loadStore(): Store {
  if (store) {return store;}

  const publications = new Map<string, DiscoveredPublication>();
  let progress: DiscoveryProgress = {
    totalDiscovered: 0,
    uniquePublications: 0,
    methodologiesRun: [],
    lastUpdated: new Date().toISOString(),
  };

  if (existsSync(STORE_PATH)) {
    try {
      const data = JSON.parse(readFileSync(STORE_PATH, 'utf-8')) as {
        publications: DiscoveredPublication[];
      };
      for (const pub of data.publications) {
        publications.set(pub.slug, pub);
      }
    } catch {
      console.error('Error loading store, starting fresh');
    }
  }

  if (existsSync(PROGRESS_PATH)) {
    try {
      progress = JSON.parse(readFileSync(PROGRESS_PATH, 'utf-8')) as DiscoveryProgress;
    } catch {
      console.error('Error loading progress, starting fresh');
    }
  }

  store = { publications, progress };
  return store;
}

/**
 * Save store to disk
 */
export function saveStore(): void {
  const s = loadStore();

  const pubArray = Array.from(s.publications.values()).sort((a, b) =>
    a.slug.localeCompare(b.slug)
  );

  writeFileSync(
    STORE_PATH,
    JSON.stringify({ publications: pubArray }, null, 2)
  );

  s.progress.uniquePublications = s.publications.size;
  s.progress.lastUpdated = new Date().toISOString();

  writeFileSync(PROGRESS_PATH, JSON.stringify(s.progress, null, 2));
}

/**
 * Add a discovered publication (deduplicates by slug)
 */
export function addPublication(pub: Partial<DiscoveredPublication> & { slug: string }): boolean {
  const s = loadStore();

  // Check if already exists
  if (s.publications.has(pub.slug)) {
    // Update if we have more info
    const existing = s.publications.get(pub.slug)!;
    if (pub.author && !existing.author) {existing.author = pub.author;}
    if (pub.description && !existing.description) {existing.description = pub.description;}
    if (pub.topics?.length && !existing.topics?.length) {existing.topics = pub.topics;}
    return false; // not new
  }

  // Normalize URLs
  const baseUrl = pub.baseUrl ?? `https://${pub.slug}.substack.com`;
  const feedUrl = pub.feedUrl ?? getFeedUrl(baseUrl);

  const fullPub: DiscoveredPublication = {
    name: pub.name ?? pub.slug,
    slug: pub.slug,
    baseUrl,
    feedUrl,
    author: pub.author,
    description: pub.description,
    topics: pub.topics,
    discoveredVia: pub.discoveredVia ?? 'unknown',
    discoveredAt: pub.discoveredAt ?? new Date().toISOString(),
    sourceUrl: pub.sourceUrl,
    validated: false,
  };

  s.publications.set(pub.slug, fullPub);
  s.progress.totalDiscovered++;
  return true; // new publication
}

/**
 * Add multiple publications from a URL extraction
 */
export function addFromUrls(
  urls: string[],
  methodology: string,
  sourceUrl?: string
): { added: number; duplicates: number } {
  let added = 0;
  let duplicates = 0;

  for (const url of urls) {
    const normalized = normalizeSubstackUrl(url);
    if (!normalized) {continue;}

    const slug = url.match(/https?:\/\/([a-z0-9-]+)\.substack\.com/i)?.[1];
    if (!slug) {continue;}

    // Skip known non-publication slugs
    if (['www', 'api', 'cdn', 'open', 'support', 'on'].includes(slug)) {
      continue;
    }

    const isNew = addPublication({
      slug,
      baseUrl: normalized,
      discoveredVia: methodology,
      sourceUrl,
    });

    if (isNew) {added++;}
    else {duplicates++;}
  }

  return { added, duplicates };
}

/**
 * Mark a methodology as completed
 */
export function markMethodologyComplete(methodology: string): void {
  const s = loadStore();
  if (!s.progress.methodologiesRun.includes(methodology)) {
    s.progress.methodologiesRun.push(methodology);
  }
}

/**
 * Get current stats
 */
export function getStats(): {
  total: number;
  methodologies: string[];
  topSources: { source: string; count: number }[];
} {
  const s = loadStore();

  const sourceCounts = new Map<string, number>();
  for (const pub of s.publications.values()) {
    const source = pub.discoveredVia;
    sourceCounts.set(source, (sourceCounts.get(source) ?? 0) + 1);
  }

  const topSources = Array.from(sourceCounts.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    total: s.publications.size,
    methodologies: s.progress.methodologiesRun,
    topSources,
  };
}

/**
 * Get all publications as array
 */
export function getAllPublications(): DiscoveredPublication[] {
  const s = loadStore();
  return Array.from(s.publications.values());
}

/**
 * CLI: Print stats
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  const stats = getStats();
  console.info(`\nDiscovery Store Stats`);
  console.info(`=====================`);
  console.info(`Total unique publications: ${stats.total}`);
  console.info(`\nMethodologies run: ${stats.methodologies.length}`);
  for (const m of stats.methodologies) {
    console.info(`  - ${m}`);
  }
  console.info(`\nTop discovery sources:`);
  for (const s of stats.topSources) {
    console.info(`  ${s.source}: ${s.count}`);
  }
}
