-- Migration 021: Topic tag overhaul (#349)
--
-- 1. Adds finer-grained tags so the Hex Digest premium epub can section
--    Literature, Media Criticism, Real Estate, and individual sports
--    (NFL, NBA, soccer) instead of bucketing them under generic "culture"
--    or "sports".
-- 2. Audits known false positives. The pre-existing keyword backfill in
--    migration 013 caught a lot of articles whose titles mention "season",
--    "league", "draft", "coach" in non-sports contexts. We don't blow
--    those rows away (the LLM may legitimately retag them) but we lower
--    obvious mismatches so they fall under the Digest 50+ threshold.

-- ── New tags ────────────────────────────────────────────────────────
INSERT INTO app.tags (slug, name, description) VALUES
  ('literature',  'Literature',  'Novels, poetry, literary criticism, authors, book reviews, the literary world'),
  ('media-criticism', 'Media Criticism', 'Critique of journalism, news outlets, press coverage, media bias, framing'),
  ('real-estate', 'Real Estate', 'Housing market, mortgages, property, REITs, commercial real estate, brokerage'),
  ('nfl',         'NFL',         'National Football League, American football, NFL teams, players, draft, Super Bowl'),
  ('nba',         'NBA',         'National Basketball Association, basketball, NBA teams, players, playoffs, finals'),
  ('soccer',      'Soccer',      'Association football, Premier League, La Liga, Bundesliga, MLS, World Cup, UEFA, FIFA')
ON CONFLICT (slug) DO NOTHING;

-- ── Audit existing assignments ──────────────────────────────────────
-- Lower confidence on tags that the keyword backfill commonly mis-fires on.
-- Articles that genuinely match will be re-scored 50+ on the next
-- scheduled tag-articles run.

-- music: drop political-music false positives ("the music of the spheres",
-- "this song", etc. — anything where the title obviously isn't about music)
UPDATE app.article_tags at
SET score = LEAST(at.score, 40)
WHERE at.tag_slug = 'music'
  AND at.score < 70
  AND EXISTS (
    SELECT 1 FROM app.articles a
    WHERE a.id = at.article_id
      AND LOWER(a.title) !~ '(music|song|album|band|guitar|piano|orchestra|symphony|jazz|rock|hip.?hop|rap|opera|concert|musician|singer|composer)'
  );

-- faith: drop political/cultural usage of "church", "priest", "gospel"
UPDATE app.article_tags at
SET score = LEAST(at.score, 40)
WHERE at.tag_slug = 'faith'
  AND at.score < 70
  AND EXISTS (
    SELECT 1 FROM app.articles a
    WHERE a.id = at.article_id
      AND LOWER(a.title) !~ '(faith|religion|religious|church|christian|catholic|protestant|jewish|judaism|islam|muslim|buddhis|hindu|theology|spiritual|prayer|scripture|bible|gospel|pope|priest|rabbi|imam)'
  );

-- sports: the migration 013 keyword sweep was aggressive. Demote any
-- sports tag whose article title doesn't actually contain a clear sports
-- keyword. Genuine sports articles get re-scored 50+ on next LLM pass.
UPDATE app.article_tags at
SET score = LEAST(at.score, 40)
WHERE at.tag_slug = 'sports'
  AND at.score >= 50
  AND EXISTS (
    SELECT 1 FROM app.articles a
    WHERE a.id = at.article_id
      AND LOWER(a.title) !~ '(ufc|mma|nfl|nba|mlb|nhl|f1|formula.?1|olympic|super.?bowl|world.?cup|quarterback|touchdown|playoff|boxing|wrestling|tennis|golf|soccer|football|basketball|baseball|hockey|athlete|espn|stadium)'
  );
