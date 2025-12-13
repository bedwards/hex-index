/**
 * Types for markdown conversion and storage
 */

export interface ArticleMetadata {
  title: string;
  author: string;
  publication: string;
  publication_slug: string;
  published_at: string;
  source_url: string;
  word_count: number;
  estimated_read_time: number;
  tags?: Record<string, string>;
}

export interface ConvertedArticle {
  metadata: ArticleMetadata;
  markdown: string;
  links: ExtractedLink[];
}

export interface ExtractedLink {
  url: string;
  text: string;
  context?: string;
  type: 'internal' | 'cross-publication' | 'external';
  targetSlug?: string; // For internal/cross-publication links
}

export interface StorageResult {
  success: boolean;
  path?: string;
  error?: string;
}

export interface LibraryConfig {
  /** Base directory for library storage (default: ./library) */
  baseDir: string;
}

export const DEFAULT_LIBRARY_CONFIG: LibraryConfig = {
  baseDir: './library',
};
