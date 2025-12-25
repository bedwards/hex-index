/**
 * Types for Wikipedia integration
 */

export interface WikipediaContent {
  title: string;
  url: string;
  mainContent: string;
  sections: WikipediaSection[];
  wordCount: number;
  estimatedReadTime: number;
}

export interface WikipediaSection {
  heading: string;
  level: number;
  content: string;
}

export interface TopicSuggestion {
  topic: string;
  wikipediaUrl: string;
  reason: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface WikipediaArticle {
  id: string;
  title: string;
  slug: string;
  originalUrl: string;
  contentHtml: string;
  contentPath: string | null;
  wordCount: number;
  estimatedReadTimeMinutes: number;
  sourceWordCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleWikipediaLink {
  id: string;
  articleId: string;
  wikipediaId: string;
  relevanceRank: number;
  topicSummary: string;
  createdAt: Date;
}

export interface EnrichmentResult {
  articleId: string;
  success: boolean;
  wikipediaArticles: WikipediaArticle[];
  errors: string[];
}

export interface ScraperOptions {
  followLinks: boolean;
  minReadTime: number;
  maxReadTime: number;
  delayMs: number;
}

export const DEFAULT_SCRAPER_OPTIONS: ScraperOptions = {
  followLinks: true,
  minReadTime: 10,
  maxReadTime: 60,
  delayMs: 1000,
};
