-- Clean up: delete article_wikipedia_links with empty topic_summary values
-- so the wiki-discover job re-processes those articles with proper descriptions.
--
-- The wiki-discover job finds articles with < 3 wikipedia links, so deleting
-- these links will cause those articles to be picked up on the next run.
-- The underlying wikipedia_articles are kept (they'll be reused via ON CONFLICT).

DELETE FROM app.article_wikipedia_links
WHERE TRIM(topic_summary) = '';

-- Prevent future empty topic_summary values
ALTER TABLE app.article_wikipedia_links
  ADD CONSTRAINT topic_summary_not_empty CHECK (TRIM(topic_summary) <> '');
