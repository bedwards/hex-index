-- Add affiliate_links JSONB column to articles and wikipedia_articles
-- Format: [{"asin": "...", "title": "...", "author": "...", "description": "...", "category": "books"}]

ALTER TABLE app.articles
  ADD COLUMN IF NOT EXISTS affiliate_links JSONB NOT NULL DEFAULT '[]'::jsonb
  CHECK (jsonb_typeof(affiliate_links) = 'array');

ALTER TABLE app.wikipedia_articles
  ADD COLUMN IF NOT EXISTS affiliate_links JSONB NOT NULL DEFAULT '[]'::jsonb
  CHECK (jsonb_typeof(affiliate_links) = 'array');

-- Index for querying articles with affiliate links (e.g., for weekly aggregation)
CREATE INDEX IF NOT EXISTS idx_articles_has_affiliate_links
  ON app.articles USING btree ((jsonb_array_length(affiliate_links)))
  WHERE jsonb_array_length(affiliate_links) > 0;

CREATE INDEX IF NOT EXISTS idx_wikipedia_articles_has_affiliate_links
  ON app.wikipedia_articles USING btree ((jsonb_array_length(affiliate_links)))
  WHERE jsonb_array_length(affiliate_links) > 0;

-- Refresh the articles_with_publication view to include new column
CREATE OR REPLACE VIEW app.articles_with_publication AS
SELECT
  a.*,
  p.name AS publication_name,
  p.slug AS publication_slug,
  p.author_name AS publication_author
FROM app.articles a
JOIN app.publications p ON a.publication_id = p.id;
