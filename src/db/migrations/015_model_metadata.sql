-- Track which model generated content
ALTER TABLE app.articles
  ADD COLUMN IF NOT EXISTS rewrite_model TEXT,
  ADD COLUMN IF NOT EXISTS rewritten_at TIMESTAMPTZ;

ALTER TABLE app.wikipedia_articles
  ADD COLUMN IF NOT EXISTS rewrite_model TEXT,
  ADD COLUMN IF NOT EXISTS rewritten_at TIMESTAMPTZ;

ALTER TABLE app.article_tags
  ADD COLUMN IF NOT EXISTS tagged_by TEXT;

ALTER TABLE app.article_wikipedia_links
  ADD COLUMN IF NOT EXISTS discovered_by TEXT;

-- Backfill existing data as 'unknown'
UPDATE app.articles SET rewrite_model = 'unknown' WHERE rewritten_content_path IS NOT NULL AND rewrite_model IS NULL;
UPDATE app.wikipedia_articles SET rewrite_model = 'unknown' WHERE status = 'complete' AND rewrite_model IS NULL;
