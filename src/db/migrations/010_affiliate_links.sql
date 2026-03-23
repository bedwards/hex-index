-- Add affiliate_links JSONB column to articles and wikipedia_articles
-- Format: [{"asin": "...", "title": "...", "author": "...", "description": "...", "category": "books"}]

ALTER TABLE app.articles
  ADD COLUMN IF NOT EXISTS affiliate_links JSONB NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE app.wikipedia_articles
  ADD COLUMN IF NOT EXISTS affiliate_links JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Index for querying articles with affiliate links (e.g., for weekly aggregation)
CREATE INDEX IF NOT EXISTS idx_articles_has_affiliate_links
  ON app.articles USING btree ((jsonb_array_length(affiliate_links)))
  WHERE jsonb_array_length(affiliate_links) > 0;
