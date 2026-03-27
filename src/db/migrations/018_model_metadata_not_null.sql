-- Add NOT NULL constraints to model metadata columns
-- First backfill any remaining NULLs, then add constraints with defaults

-- Backfill NULLs in app.articles
UPDATE app.articles SET rewrite_model = 'unknown' WHERE rewrite_model IS NULL;
UPDATE app.articles SET rewritten_at = COALESCE(updated_at, NOW()) WHERE rewritten_at IS NULL;

-- Backfill NULLs in app.wikipedia_articles
UPDATE app.wikipedia_articles SET rewrite_model = 'unknown' WHERE rewrite_model IS NULL;
UPDATE app.wikipedia_articles SET rewritten_at = COALESCE(updated_at, NOW()) WHERE rewritten_at IS NULL;

-- Backfill NULLs in app.article_tags
UPDATE app.article_tags SET tagged_by = 'unknown' WHERE tagged_by IS NULL;

-- Backfill NULLs in app.article_wikipedia_links
UPDATE app.article_wikipedia_links SET discovered_by = 'unknown' WHERE discovered_by IS NULL;

-- Add NOT NULL constraints with defaults

ALTER TABLE app.articles
  ALTER COLUMN rewrite_model SET DEFAULT 'unknown',
  ALTER COLUMN rewrite_model SET NOT NULL,
  ALTER COLUMN rewritten_at SET DEFAULT NOW(),
  ALTER COLUMN rewritten_at SET NOT NULL;

ALTER TABLE app.wikipedia_articles
  ALTER COLUMN rewrite_model SET DEFAULT 'unknown',
  ALTER COLUMN rewrite_model SET NOT NULL,
  ALTER COLUMN rewritten_at SET DEFAULT NOW(),
  ALTER COLUMN rewritten_at SET NOT NULL;

ALTER TABLE app.article_tags
  ALTER COLUMN tagged_by SET DEFAULT 'unknown',
  ALTER COLUMN tagged_by SET NOT NULL;

ALTER TABLE app.article_wikipedia_links
  ALTER COLUMN discovered_by SET DEFAULT 'unknown',
  ALTER COLUMN discovered_by SET NOT NULL;
