-- Migration 005: Job separation
-- Adds status tracking for wikipedia articles (stub vs rewritten)
-- Adds full_content_path for storing unabridged article text
-- Adds rewritten_content_path for LLM-rewritten article versions

-- Wikipedia articles can be stubs (scraped, not yet rewritten) or complete
ALTER TABLE app.wikipedia_articles
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'complete';

-- Mark any existing articles as complete (they were fully processed)
-- New stubs will be inserted with status = 'stub'

-- Articles: store the full feed HTML separately from the cleaned excerpt
-- full_content_path: raw full text from RSS feed (never published, used for rewrites)
-- rewritten_content_path: LLM-rewritten version of the full article
ALTER TABLE app.articles
  ADD COLUMN IF NOT EXISTS full_content_path TEXT,
  ADD COLUMN IF NOT EXISTS rewritten_content_path TEXT;

-- Index for job queries: find articles needing work
CREATE INDEX IF NOT EXISTS idx_wikipedia_articles_status
  ON app.wikipedia_articles (status);

CREATE INDEX IF NOT EXISTS idx_articles_rewritten
  ON app.articles (rewritten_content_path)
  WHERE rewritten_content_path IS NULL;

-- Composite index for "articles without enough wikipedia links" query
-- Used by Job 2 to find articles needing topic discovery
CREATE INDEX IF NOT EXISTS idx_article_wikipedia_links_article
  ON app.article_wikipedia_links (article_id);
