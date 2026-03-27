-- Unify model metadata column naming convention
-- Rename tagged_by → tag_model and discovered_by → discover_model
-- to match the established rewrite_model pattern

ALTER TABLE app.article_tags
  RENAME COLUMN tagged_by TO tag_model;

ALTER TABLE app.article_wikipedia_links
  RENAME COLUMN discovered_by TO discover_model;
