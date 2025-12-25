-- Move Wikipedia content storage to filesystem
-- Database stores metadata only, content_path points to file

-- Remove the content_html column - content lives on filesystem
ALTER TABLE app.wikipedia_articles DROP COLUMN IF EXISTS content_html;

-- Make content_path required (not nullable)
ALTER TABLE app.wikipedia_articles ALTER COLUMN content_path SET NOT NULL;
