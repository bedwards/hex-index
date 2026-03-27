-- Backfill: delete article_wikipedia_links with lazy topic_summary values
-- so the wiki-discover job re-processes those articles with proper descriptions.
--
-- The wiki-discover job finds articles with < 3 wikipedia links, so deleting
-- these links will cause those articles to be picked up on the next run.
-- The underlying wikipedia_articles are kept (they'll be reused via ON CONFLICT).

DELETE FROM app.article_wikipedia_links
WHERE TRIM(LOWER(topic_summary)) IN (
  'referenced in the article',
  'referenced in the article.',
  'mentioned in the article',
  'mentioned in the article.',
  'related topic'
);
