-- Migration 007: Dirty flags for content re-processing
-- Instead of deleting content, mark it dirty so the next job rewrites it in place

-- Article rewrites: version tracks which prompt generated it
ALTER TABLE app.articles
  ADD COLUMN IF NOT EXISTS rewrite_dirty BOOLEAN NOT NULL DEFAULT false;

-- Wikipedia rewrites: same pattern
ALTER TABLE app.wikipedia_articles
  ADD COLUMN IF NOT EXISTS rewrite_dirty BOOLEAN NOT NULL DEFAULT false;

-- Index for finding dirty items efficiently
CREATE INDEX IF NOT EXISTS idx_articles_rewrite_dirty
  ON app.articles (rewrite_dirty) WHERE rewrite_dirty = true;

CREATE INDEX IF NOT EXISTS idx_wikipedia_rewrite_dirty
  ON app.wikipedia_articles (rewrite_dirty) WHERE rewrite_dirty = true;
