-- Preserve original titles and track which need LLM cleanup
ALTER TABLE app.articles
  ADD COLUMN IF NOT EXISTS original_title TEXT,
  ADD COLUMN IF NOT EXISTS title_dirty BOOLEAN NOT NULL DEFAULT false;

-- Partial index for the Qwen job to find dirty titles quickly
CREATE INDEX IF NOT EXISTS idx_articles_title_dirty
  ON app.articles (published_at DESC)
  WHERE title_dirty = true;
