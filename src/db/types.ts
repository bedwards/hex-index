/**
 * Database types for hex-index
 * These match the schema in migrations/001_initial_schema.sql
 */

export interface Publication {
  id: string;
  name: string;
  slug: string;
  base_url: string;
  feed_url: string;
  description: string | null;
  author_name: string | null;
  last_fetched_at: Date | null;
  article_count: number;
  quality_score: number;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}

export interface Article {
  id: string;
  publication_id: string;
  title: string;
  slug: string;
  original_url: string;
  content_path: string | null;
  author_name: string | null;
  published_at: Date | null;
  word_count: number | null;
  estimated_read_time_minutes: number | null;
  tags: Record<string, unknown>;
  metadata: Record<string, unknown>;
  full_text_search: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ArticleWithPublication extends Article {
  publication_name: string;
  publication_slug: string;
  publication_author: string | null;
}

export interface ArticleLink {
  id: string;
  source_article_id: string;
  target_article_id: string | null;
  target_url: string;
  link_text: string | null;
  context: string | null;
  created_at: Date;
}

export interface ArticleInfluence {
  id: string;
  title: string;
  publication_id: string;
  incoming_links: number;
}

// Input types for creating records
export interface CreatePublicationInput {
  name: string;
  slug: string;
  base_url: string;
  feed_url: string;
  description?: string;
  author_name?: string;
  quality_score?: number;
  metadata?: Record<string, unknown>;
}

export interface CreateArticleInput {
  publication_id: string;
  title: string;
  slug: string;
  original_url: string;
  content_path?: string;
  author_name?: string;
  published_at?: Date;
  word_count?: number;
  estimated_read_time_minutes?: number;
  tags?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface CreateArticleLinkInput {
  source_article_id: string;
  target_article_id?: string;
  target_url: string;
  link_text?: string;
  context?: string;
}

// Query types
export interface ArticleSearchParams {
  query?: string;
  tags?: Record<string, string>;
  publication_id?: string;
  min_read_time?: number;
  max_read_time?: number;
  from_date?: Date;
  to_date?: Date;
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  articles: ArticleWithPublication[];
  total: number;
  query: ArticleSearchParams;
}
