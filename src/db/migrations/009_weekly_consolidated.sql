-- Migration 009: Weekly consolidated articles
-- For the weekly Reader epub, sources with multiple articles in a week
-- get consolidated into a single slot with combined commentary and one deep dive.

CREATE TABLE IF NOT EXISTS app.weekly_consolidated (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_label TEXT NOT NULL,           -- e.g. "hex-index-2026-03-27"
  publication_id UUID NOT NULL REFERENCES app.publications(id) ON DELETE CASCADE,
  article_ids UUID[] NOT NULL,        -- the selected articles (1-3)
  consolidated_content_path TEXT,     -- path to consolidated commentary HTML
  deep_dive_wikipedia_id UUID REFERENCES app.wikipedia_articles(id),
  tag_slug TEXT REFERENCES app.tags(slug),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(week_label, publication_id)
);

CREATE INDEX IF NOT EXISTS idx_weekly_consolidated_week ON app.weekly_consolidated(week_label);
