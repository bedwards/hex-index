/**
 * Types for Substack publication discovery
 */

export interface DiscoveredPublication {
  // Core identifiers
  name: string;
  slug: string;
  baseUrl: string;
  feedUrl: string;

  // Metadata
  author?: string;
  description?: string;
  topics?: string[];

  // Discovery metadata
  discoveredVia: string; // methodology that found it
  discoveredAt: string; // ISO timestamp
  sourceUrl?: string; // where we found the reference

  // Validation status
  validated?: boolean;
  lastPostDate?: string;
  subscriberCount?: number;
}

export interface DiscoveryProgress {
  totalDiscovered: number;
  uniquePublications: number;
  methodologiesRun: string[];
  lastUpdated: string;
}

export interface DiscoveryResult {
  methodology: string;
  publications: DiscoveredPublication[];
  errors: string[];
  timestamp: string;
}

// Known Substack URL patterns
export const SUBSTACK_PATTERNS = {
  // Standard: name.substack.com
  standard: /https?:\/\/([a-z0-9-]+)\.substack\.com/gi,
  // Custom domain pointing to Substack (harder to detect)
  // These need to be validated by checking for /feed endpoint
};

/**
 * Extract Substack slug from URL
 */
export function extractSubstackSlug(url: string): string | null {
  const match = url.match(/https?:\/\/([a-z0-9-]+)\.substack\.com/i);
  if (match) {
    return match[1];
  }
  return null;
}

/**
 * Normalize a Substack URL to base form
 */
export function normalizeSubstackUrl(url: string): string | null {
  const slug = extractSubstackSlug(url);
  if (slug) {
    return `https://${slug}.substack.com`;
  }
  return null;
}

/**
 * Generate feed URL from base URL
 */
export function getFeedUrl(baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, '')}/feed`;
}
