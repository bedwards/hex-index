-- Migration 008: Tag/label system
-- Articles can have multiple tags, each scored 0-100
-- Display logic computed at render time

CREATE TABLE IF NOT EXISTS app.tags (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS app.article_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES app.articles(id) ON DELETE CASCADE,
  tag_slug TEXT NOT NULL REFERENCES app.tags(slug) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(article_id, tag_slug)
);

CREATE INDEX IF NOT EXISTS idx_article_tags_article ON app.article_tags(article_id);
CREATE INDEX IF NOT EXISTS idx_article_tags_tag ON app.article_tags(tag_slug);
CREATE INDEX IF NOT EXISTS idx_article_tags_score ON app.article_tags(score DESC);

-- Seed the curated tag pool
INSERT INTO app.tags (slug, name, description) VALUES
  ('foreign-policy', 'Foreign Policy', 'International relations, war, diplomacy, geopolitics'),
  ('ai-tech', 'AI & Tech', 'Artificial intelligence, software, hardware, digital infrastructure'),
  ('housing-cities', 'Housing & Cities', 'Urban planning, zoning, real estate, transportation'),
  ('political-strategy', 'Political Strategy', 'Elections, polling, party dynamics, political tactics'),
  ('history', 'History', 'Historical events, figures, and analysis'),
  ('science', 'Science', 'Research, medicine, biology, physics, climate'),
  ('culture', 'Culture', 'Arts, film, literature, social trends, entertainment'),
  ('economics', 'Economics', 'Markets, fiscal policy, trade, labor, inequality'),
  ('faith', 'Faith', 'Religion, theology, spirituality, church affairs'),
  ('writing-craft', 'Writing & Craft', 'The craft of writing, publishing, literary analysis'),
  ('music', 'Music', 'Music theory, history, instruments, artists, production'),
  ('law-rights', 'Law & Rights', 'Legal analysis, civil rights, constitutional issues'),
  ('public-health', 'Public Health', 'Epidemiology, healthcare systems, pandemic response'),
  ('philosophy', 'Philosophy', 'Ethics, epistemology, metaphysics, political philosophy'),
  ('media', 'Media', 'Journalism, news industry, social media, information ecosystem'),
  ('defense', 'Defense', 'Military technology, weapons systems, defense policy'),
  ('china', 'China', 'Chinese politics, economy, US-China relations, Asia-Pacific')
ON CONFLICT (slug) DO NOTHING;
