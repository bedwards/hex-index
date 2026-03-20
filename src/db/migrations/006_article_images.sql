-- Migration 006: Article images
-- Stores path to generated article thumbnail images

ALTER TABLE app.articles
  ADD COLUMN IF NOT EXISTS image_path TEXT;

-- Index for finding articles without images
CREATE INDEX IF NOT EXISTS idx_articles_image
  ON app.articles (image_path)
  WHERE image_path IS NULL;
