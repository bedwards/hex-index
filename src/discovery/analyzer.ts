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

/**
 * Analyze a single publication by its slug or feed URL
 */
export async function analyzePublication(
  slugOrUrl: string,
  options: { delayMs?: number } = {}
): Promise<PublicationAnalysis> {
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
 * Calculate quality score breakdown
 */
function calculateScoreBreakdown(
  activity: ActivityMetrics,
  content: ContentMetrics
): QualityScoreBreakdown {
  // Activity score (0-25): Based on recent posting frequency
  let activityScore = 0;
  if (activity.postsLast30Days >= 8) {
    activityScore = 25; // Very active (2+ per week)
  } else if (activity.postsLast30Days >= 4) {
    activityScore = 20; // Active (weekly)
  } else if (activity.postsLast30Days >= 2) {
    activityScore = 15; // Somewhat active
  } else if (activity.postsLast30Days >= 1) {
    activityScore = 10; // Minimally active
  } else {
    activityScore = 0; // Inactive
  }

  // Length score (0-25): Based on average read time
  let lengthScore = 0;
  if (content.avgReadTime >= 15) {
    lengthScore = 25; // Very long-form
  } else if (content.avgReadTime >= 10) {
    lengthScore = 22; // Long-form
  } else if (content.avgReadTime >= 7) {
    lengthScore = 18; // Medium-long
  } else if (content.avgReadTime >= 5) {
    lengthScore = 12; // Medium
  } else if (content.avgReadTime >= 3) {
    lengthScore = 6; // Short
  } else {
    lengthScore = 0; // Very short
  }

  // Depth score (0-25): Based on data-rich content
  let depthScore = 0;
  if (content.dataRichCount > 0 && content.avgWordCount > 0) {
    const dataRichPercentage =
      (content.dataRichCount / Math.max(activity.totalPosts, 1)) * 100;
    if (dataRichPercentage >= 50) {
      depthScore = 25;
    } else if (dataRichPercentage >= 30) {
      depthScore = 20;
    } else if (dataRichPercentage >= 15) {
      depthScore = 15;
    } else if (dataRichPercentage > 0) {
      depthScore = 10;
    }
  }

  // Consistency score (0-25): Based on posting regularity
  let consistencyScore = 0;
  if (activity.avgDaysBetweenPosts !== null) {
    if (activity.avgDaysBetweenPosts <= 3) {
      consistencyScore = 25; // Very consistent
    } else if (activity.avgDaysBetweenPosts <= 7) {
      consistencyScore = 20; // Weekly
    } else if (activity.avgDaysBetweenPosts <= 14) {
      consistencyScore = 15; // Bi-weekly
    } else if (activity.avgDaysBetweenPosts <= 30) {
      consistencyScore = 10; // Monthly
    } else {
      consistencyScore = 5; // Irregular
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
