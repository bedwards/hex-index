-- Migration 013: Add Sports topic tag and retag existing articles

INSERT INTO app.tags (slug, name, description) VALUES
  ('sports', 'Sports', 'UFC, F1, Olympics, football, basketball, athletics, competition')
ON CONFLICT (slug) DO NOTHING;

-- Tag articles that mention sports topics in their titles
INSERT INTO app.article_tags (article_id, tag_slug, score)
SELECT a.id, 'sports', 80
FROM app.articles a
WHERE (
  LOWER(a.title) ~ '(ufc|mma|nfl|nba|mlb|nhl|f1|formula.?1|olympics|super.?bowl|world.?cup|championship|quarterback|touchdown|playoff|boxing|wrestling|tennis|golf|soccer|football|basketball|baseball|hockey|athlete)'
  OR LOWER(a.title) ~ '(espn|sports|stadium|coach|draft|season|league|tournament|referee|penalty|knockout|medal)'
)
AND NOT EXISTS (
  SELECT 1 FROM app.article_tags at WHERE at.article_id = a.id AND at.tag_slug = 'sports'
)
ON CONFLICT (article_id, tag_slug) DO UPDATE SET score = GREATEST(app.article_tags.score, EXCLUDED.score);
