/**
 * Types for Substack publication discovery and quality scoring
 */

export interface PublicationAnalysis {
  /** Publication name */
  name: string;
  /** Substack slug (e.g., "noahpinion") */
  slug: string;
  /** Full feed URL */
  feedUrl: string;
  /** Publication URL */
  url: string;
  /** Author name */
  author: string;
  /** Detected topics/categories */
  topics: string[];
  /** Quality score (0-100) */
  qualityScore: number;
  /** Breakdown of quality score components */
  scoreBreakdown: QualityScoreBreakdown;
  /** Activity metrics */
  activity: ActivityMetrics;
  /** Content metrics */
  content: ContentMetrics;
  /** Analysis timestamp */
  analyzedAt: string;
}

export interface QualityScoreBreakdown {
  /** Score for posting frequency (0-25) */
  activityScore: number;
  /** Score for post length (0-25) */
  lengthScore: number;
  /** Score for content depth indicators (0-25) */
  depthScore: number;
  /** Score for consistency (0-25) */
  consistencyScore: number;
}

export interface ActivityMetrics {
  /** Total posts in feed */
  totalPosts: number;
  /** Posts in last 30 days */
  postsLast30Days: number;
  /** Posts in last 7 days */
  postsLast7Days: number;
  /** Date of most recent post */
  lastPostDate: string | null;
  /** Average days between posts */
  avgDaysBetweenPosts: number | null;
}

export interface ContentMetrics {
  /** Average word count per post */
  avgWordCount: number;
  /** Average estimated read time in minutes */
  avgReadTime: number;
  /** Minimum word count */
  minWordCount: number;
  /** Maximum word count */
  maxWordCount: number;
  /** Posts with 10+ minute read time */
  longFormCount: number;
  /** Percentage of posts that are long-form */
  longFormPercentage: number;
  /** Posts containing data/charts indicators */
  dataRichCount: number;
}

export interface DiscoveryOptions {
  /** Minimum quality score to include (default: 50) */
  minQualityScore: number;
  /** Maximum publications to analyze (default: unlimited) */
  maxPublications?: number;
  /** Delay between fetches in ms (default: 2000) */
  fetchDelayMs: number;
  /** Verbose output */
  verbose: boolean;
}

export const DEFAULT_DISCOVERY_OPTIONS: DiscoveryOptions = {
  minQualityScore: 50,
  fetchDelayMs: 2000,
  verbose: false,
};

export interface DiscoveryResult {
  /** Successfully analyzed publications */
  publications: PublicationAnalysis[];
  /** Publications that passed quality threshold */
  qualityPublications: PublicationAnalysis[];
  /** Failed analyses */
  errors: Array<{ slug: string; error: string }>;
  /** Total time taken */
  duration: number;
}
