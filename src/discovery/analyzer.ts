/**
 * Publication analyzer - fetches and analyzes Substack publications
 */

import { fetchFeed } from '../feed/fetcher.js';
import { countWords, estimateReadTime } from '../feed/parser.js';
import {
  PublicationAnalysis,
  ActivityMetrics,
  ContentMetrics,
  QualityScoreBreakdown,
} from './types.js';

// Indicators of data-rich content
const DATA_INDICATORS = [
  'chart',
  'graph',
  'data',
  'statistic',
  'percent',
  '%',
  'analysis',
  'research',
  'study',
  'survey',
  'table',
  'figure',
];

// Scoring thresholds - constants for quality score calculation
const SCORING_THRESHOLDS = {
  // Activity thresholds (posts per 30 days)
  ACTIVITY_VERY_ACTIVE: 8,    // 25 points - 2+ posts per week
  ACTIVITY_ACTIVE: 4,          // 20 points - weekly posts
  ACTIVITY_SOMEWHAT_ACTIVE: 2, // 15 points
  ACTIVITY_MINIMAL: 1,         // 10 points

  // Read time thresholds (minutes)
  LENGTH_VERY_LONG: 15,  // 25 points
  LENGTH_LONG: 10,       // 22 points
  LENGTH_MEDIUM_LONG: 7, // 18 points
  LENGTH_MEDIUM: 5,      // 12 points
  LENGTH_SHORT: 3,       // 6 points

  // Data-rich percentage thresholds
  DEPTH_HIGH: 50,    // 25 points - 50%+ posts are data-rich
  DEPTH_MEDIUM: 30,  // 20 points
  DEPTH_LOW: 15,     // 15 points

  // Consistency thresholds (avg days between posts)
  CONSISTENCY_VERY_REGULAR: 3,  // 25 points
  CONSISTENCY_WEEKLY: 7,        // 20 points
  CONSISTENCY_BIWEEKLY: 14,     // 15 points
  CONSISTENCY_MONTHLY: 30,      // 10 points
} as const;

// Score values (typed as number for assignment compatibility)
const SCORES: {
  MAX_CATEGORY: number;
  ACTIVITY: { VERY_ACTIVE: number; ACTIVE: number; SOMEWHAT: number; MINIMAL: number; INACTIVE: number };
  LENGTH: { VERY_LONG: number; LONG: number; MEDIUM_LONG: number; MEDIUM: number; SHORT: number; VERY_SHORT: number };
  DEPTH: { HIGH: number; MEDIUM: number; LOW: number; SOME: number; NONE: number };
  CONSISTENCY: { VERY_REGULAR: number; WEEKLY: number; BIWEEKLY: number; MONTHLY: number; IRREGULAR: number };
} = {
  MAX_CATEGORY: 25,
  ACTIVITY: { VERY_ACTIVE: 25, ACTIVE: 20, SOMEWHAT: 15, MINIMAL: 10, INACTIVE: 0 },
  LENGTH: { VERY_LONG: 25, LONG: 22, MEDIUM_LONG: 18, MEDIUM: 12, SHORT: 6, VERY_SHORT: 0 },
  DEPTH: { HIGH: 25, MEDIUM: 20, LOW: 15, SOME: 10, NONE: 0 },
  CONSISTENCY: { VERY_REGULAR: 25, WEEKLY: 20, BIWEEKLY: 15, MONTHLY: 10, IRREGULAR: 5 },
};

// Topic keywords for classification
const TOPIC_KEYWORDS: Record<string, string[]> = {
  economics: ['economy', 'economic', 'inflation', 'gdp', 'monetary', 'fiscal', 'market'],
  finance: ['finance', 'investment', 'stock', 'bond', 'banking', 'credit'],
  technology: ['tech', 'software', 'hardware', 'startup', 'silicon'],
  ai: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'llm', 'gpt', 'neural'],
  science: ['science', 'scientific', 'research', 'experiment', 'study'],
  history: ['history', 'historical', 'century', 'war', 'ancient'],
  politics: ['politics', 'political', 'policy', 'government', 'election'],
  health: ['health', 'medical', 'medicine', 'disease', 'vaccine', 'hospital'],
  climate: ['climate', 'environment', 'carbon', 'energy', 'renewable'],
  philosophy: ['philosophy', 'philosophical', 'ethics', 'moral'],
};

// Valid slug pattern: alphanumeric, hyphens, underscores (no path traversal or special chars)
const VALID_SLUG_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,62}$/;

// Valid URL pattern for feed URLs
const VALID_FEED_URL_PATTERN = /^https?:\/\/[a-zA-Z0-9][a-zA-Z0-9._-]*\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._/-]*)?$/;

/**
 * Validate slug or URL input to prevent injection attacks
 */
export function validateSlugOrUrl(input: string): { valid: boolean; error?: string } {
  if (!input || typeof input !== 'string') {
    return { valid: false, error: 'Input must be a non-empty string' };
  }

  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Input cannot be empty' };
  }

  // If it's a URL, validate the URL pattern
  if (trimmed.includes('://')) {
    if (!VALID_FEED_URL_PATTERN.test(trimmed)) {
      return { valid: false, error: 'Invalid feed URL format' };
    }
    return { valid: true };
  }

  // Check for path traversal attempts (for non-URL inputs)
  if (trimmed.includes('..') || trimmed.includes('//')) {
    return { valid: false, error: 'Invalid characters in input' };
  }

  // Otherwise validate as a slug
  if (!VALID_SLUG_PATTERN.test(trimmed)) {
    return { valid: false, error: 'Invalid slug format. Use only letters, numbers, hyphens, and underscores.' };
  }

  return { valid: true };
}

/**
 * Analyze a single publication by its slug or feed URL
 */
export async function analyzePublication(
  slugOrUrl: string,
  options: { delayMs?: number } = {}
): Promise<PublicationAnalysis> {
  // Validate input
  const validation = validateSlugOrUrl(slugOrUrl);
  if (!validation.valid) {
    throw new Error(validation.error ?? 'Invalid input');
  }

  // Normalize to feed URL
  const feedUrl = slugOrUrl.includes('://')
    ? slugOrUrl
    : `https://${slugOrUrl}.substack.com/feed`;

  const slug = extractSlug(feedUrl);

  // Fetch the feed
  const result = await fetchFeed(feedUrl, { delayMs: options.delayMs ?? 2000 });

  if (!result.success || !result.feed) {
    throw new Error(result.error ?? 'Failed to fetch feed');
  }

  const feed = result.feed;
  const items = feed.items;

  // Calculate activity metrics
  const activity = calculateActivityMetrics(items);

  // Calculate content metrics
  const content = calculateContentMetrics(items);

  // Detect topics
  const topics = detectTopics(feed.title, feed.description ?? '', items);

  // Calculate quality score
  const scoreBreakdown = calculateScoreBreakdown(activity, content);
  const qualityScore =
    scoreBreakdown.activityScore +
    scoreBreakdown.lengthScore +
    scoreBreakdown.depthScore +
    scoreBreakdown.consistencyScore;

  return {
    name: feed.title,
    slug,
    feedUrl,
    url: feed.link,
    author: feed.author ?? items[0]?.author ?? 'Unknown',
    topics,
    qualityScore,
    scoreBreakdown,
    activity,
    content,
    analyzedAt: new Date().toISOString(),
  };
}

/**
 * Extract slug from feed URL
 */
function extractSlug(feedUrl: string): string {
  const match = feedUrl.match(/https?:\/\/([^.]+)\.substack\.com/);
  return match ? match[1] : feedUrl;
}

/**
 * Calculate activity metrics from feed items
 */
function calculateActivityMetrics(
  items: Array<{ publishedAt: Date }>
): ActivityMetrics {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const sortedDates = items
    .map((i) => i.publishedAt)
    .sort((a, b) => b.getTime() - a.getTime());

  const postsLast30Days = sortedDates.filter((d) => d >= thirtyDaysAgo).length;
  const postsLast7Days = sortedDates.filter((d) => d >= sevenDaysAgo).length;

  // Calculate average days between posts
  let avgDaysBetweenPosts: number | null = null;
  if (sortedDates.length >= 2) {
    const gaps: number[] = [];
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const gap =
        (sortedDates[i].getTime() - sortedDates[i + 1].getTime()) /
        (1000 * 60 * 60 * 24);
      gaps.push(gap);
    }
    avgDaysBetweenPosts = gaps.reduce((a, b) => a + b, 0) / gaps.length;
  }

  return {
    totalPosts: items.length,
    postsLast30Days,
    postsLast7Days,
    lastPostDate: sortedDates[0]?.toISOString() ?? null,
    avgDaysBetweenPosts,
  };
}

/**
 * Calculate content metrics from feed items
 */
function calculateContentMetrics(
  items: Array<{ contentHtml: string }>
): ContentMetrics {
  if (items.length === 0) {
    return {
      avgWordCount: 0,
      avgReadTime: 0,
      minWordCount: 0,
      maxWordCount: 0,
      longFormCount: 0,
      longFormPercentage: 0,
      dataRichCount: 0,
    };
  }

  const wordCounts = items.map((i) => countWords(i.contentHtml));
  const readTimes = items.map((i) => estimateReadTime(i.contentHtml));

  const avgWordCount = wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length;
  const avgReadTime = readTimes.reduce((a, b) => a + b, 0) / readTimes.length;

  const longFormCount = readTimes.filter((t) => t >= 10).length;

  // Count data-rich posts
  const dataRichCount = items.filter((item) => {
    const content = item.contentHtml.toLowerCase();
    return DATA_INDICATORS.some((ind) => content.includes(ind));
  }).length;

  return {
    avgWordCount: Math.round(avgWordCount),
    avgReadTime: Math.round(avgReadTime * 10) / 10,
    minWordCount: Math.min(...wordCounts),
    maxWordCount: Math.max(...wordCounts),
    longFormCount,
    longFormPercentage: Math.round((longFormCount / items.length) * 100),
    dataRichCount,
  };
}

/**
 * Detect topics from feed content
 */
function detectTopics(
  title: string,
  description: string,
  items: Array<{ title: string; contentHtml: string }>
): string[] {
  const allText = [
    title,
    description,
    ...items.slice(0, 10).map((i) => i.title),
    ...items.slice(0, 5).map((i) => i.contentHtml.slice(0, 1000)),
  ]
    .join(' ')
    .toLowerCase();

  const detectedTopics: string[] = [];

  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    const matchCount = keywords.filter((kw) => allText.includes(kw)).length;
    if (matchCount >= 2) {
      detectedTopics.push(topic);
    }
  }

  return detectedTopics;
}

/**
 * Calculate quality score breakdown using defined thresholds
 */
function calculateScoreBreakdown(
  activity: ActivityMetrics,
  content: ContentMetrics
): QualityScoreBreakdown {
  // Activity score (0-25): Based on recent posting frequency
  let activityScore = SCORES.ACTIVITY.INACTIVE;
  if (activity.postsLast30Days >= SCORING_THRESHOLDS.ACTIVITY_VERY_ACTIVE) {
    activityScore = SCORES.ACTIVITY.VERY_ACTIVE;
  } else if (activity.postsLast30Days >= SCORING_THRESHOLDS.ACTIVITY_ACTIVE) {
    activityScore = SCORES.ACTIVITY.ACTIVE;
  } else if (activity.postsLast30Days >= SCORING_THRESHOLDS.ACTIVITY_SOMEWHAT_ACTIVE) {
    activityScore = SCORES.ACTIVITY.SOMEWHAT;
  } else if (activity.postsLast30Days >= SCORING_THRESHOLDS.ACTIVITY_MINIMAL) {
    activityScore = SCORES.ACTIVITY.MINIMAL;
  }

  // Length score (0-25): Based on average read time
  let lengthScore = SCORES.LENGTH.VERY_SHORT;
  if (content.avgReadTime >= SCORING_THRESHOLDS.LENGTH_VERY_LONG) {
    lengthScore = SCORES.LENGTH.VERY_LONG;
  } else if (content.avgReadTime >= SCORING_THRESHOLDS.LENGTH_LONG) {
    lengthScore = SCORES.LENGTH.LONG;
  } else if (content.avgReadTime >= SCORING_THRESHOLDS.LENGTH_MEDIUM_LONG) {
    lengthScore = SCORES.LENGTH.MEDIUM_LONG;
  } else if (content.avgReadTime >= SCORING_THRESHOLDS.LENGTH_MEDIUM) {
    lengthScore = SCORES.LENGTH.MEDIUM;
  } else if (content.avgReadTime >= SCORING_THRESHOLDS.LENGTH_SHORT) {
    lengthScore = SCORES.LENGTH.SHORT;
  }

  // Depth score (0-25): Based on data-rich content percentage
  // Guard against division by zero with Math.max
  let depthScore = SCORES.DEPTH.NONE;
  if (content.dataRichCount > 0 && content.avgWordCount > 0) {
    const dataRichPercentage =
      (content.dataRichCount / Math.max(activity.totalPosts, 1)) * 100;
    if (dataRichPercentage >= SCORING_THRESHOLDS.DEPTH_HIGH) {
      depthScore = SCORES.DEPTH.HIGH;
    } else if (dataRichPercentage >= SCORING_THRESHOLDS.DEPTH_MEDIUM) {
      depthScore = SCORES.DEPTH.MEDIUM;
    } else if (dataRichPercentage >= SCORING_THRESHOLDS.DEPTH_LOW) {
      depthScore = SCORES.DEPTH.LOW;
    } else if (dataRichPercentage > 0) {
      depthScore = SCORES.DEPTH.SOME;
    }
  }

  // Consistency score (0-25): Based on posting regularity
  let consistencyScore = 0;
  if (activity.avgDaysBetweenPosts !== null) {
    if (activity.avgDaysBetweenPosts <= SCORING_THRESHOLDS.CONSISTENCY_VERY_REGULAR) {
      consistencyScore = SCORES.CONSISTENCY.VERY_REGULAR;
    } else if (activity.avgDaysBetweenPosts <= SCORING_THRESHOLDS.CONSISTENCY_WEEKLY) {
      consistencyScore = SCORES.CONSISTENCY.WEEKLY;
    } else if (activity.avgDaysBetweenPosts <= SCORING_THRESHOLDS.CONSISTENCY_BIWEEKLY) {
      consistencyScore = SCORES.CONSISTENCY.BIWEEKLY;
    } else if (activity.avgDaysBetweenPosts <= SCORING_THRESHOLDS.CONSISTENCY_MONTHLY) {
      consistencyScore = SCORES.CONSISTENCY.MONTHLY;
    } else {
      consistencyScore = SCORES.CONSISTENCY.IRREGULAR;
    }
  }

  return {
    activityScore,
    lengthScore,
    depthScore,
    consistencyScore,
  };
}

/**
 * Analyze multiple publications
 */
export async function analyzePublications(
  slugsOrUrls: string[],
  options: { delayMs?: number; verbose?: boolean; onProgress?: (current: number, total: number, slug: string) => void } = {}
): Promise<{
  results: PublicationAnalysis[];
  errors: Array<{ slug: string; error: string }>;
}> {
  const results: PublicationAnalysis[] = [];
  const errors: Array<{ slug: string; error: string }> = [];

  for (let i = 0; i < slugsOrUrls.length; i++) {
    const slugOrUrl = slugsOrUrls[i];
    const slug = slugOrUrl.includes('://') ? extractSlug(slugOrUrl) : slugOrUrl;

    if (options.onProgress) {
      options.onProgress(i + 1, slugsOrUrls.length, slug);
    }

    try {
      const analysis = await analyzePublication(slugOrUrl, {
        delayMs: options.delayMs,
      });
      results.push(analysis);

      if (options.verbose) {
        console.info(
          `  ✓ ${analysis.name}: score=${analysis.qualityScore}, readTime=${analysis.content.avgReadTime}min`
        );
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      errors.push({ slug, error: errorMsg });

      if (options.verbose) {
        console.info(`  ✗ ${slug}: ${errorMsg}`);
      }
    }
  }

  return { results, errors };
}
