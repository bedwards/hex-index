-- Migration 022: Multi-source commentary schema
-- Supports synthesizing up to 4 source articles into a single commentary.
-- The existing 1-to-1 Qwen rewrite pipeline continues to work unchanged;
-- consolidation happens AFTER Qwen is done, via a separate Claude worker.

-- Join table: commentary article -> source articles (max 4 per commentary)
CREATE TABLE IF NOT EXISTS app.commentary_sources (
  commentary_article_id UUID NOT NULL REFERENCES app.articles(id) ON DELETE CASCADE,
  source_article_id     UUID NOT NULL REFERENCES app.articles(id) ON DELETE CASCADE,
  is_primary            BOOLEAN NOT NULL DEFAULT false,
  position              SMALLINT NOT NULL DEFAULT 0,
  added_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (commentary_article_id, source_article_id)
);

CREATE INDEX IF NOT EXISTS idx_commentary_sources_source
  ON app.commentary_sources(source_article_id);

-- Unique partial index: enforces exactly one primary source per commentary
CREATE UNIQUE INDEX IF NOT EXISTS idx_commentary_sources_one_primary
  ON app.commentary_sources(commentary_article_id) WHERE is_primary;

-- Enforce max 4 sources per commentary via trigger
CREATE OR REPLACE FUNCTION app.check_max_sources() RETURNS trigger AS $$
BEGIN
  IF (SELECT COUNT(*) FROM app.commentary_sources
      WHERE commentary_article_id = NEW.commentary_article_id) > 4 THEN
    RAISE EXCEPTION 'commentary_sources exceeds max of 4 sources per commentary article';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_commentary_sources_max ON app.commentary_sources;
CREATE TRIGGER trg_commentary_sources_max
  AFTER INSERT OR UPDATE ON app.commentary_sources
  FOR EACH ROW EXECUTE FUNCTION app.check_max_sources();

-- Add consolidation columns to app.articles
ALTER TABLE app.articles
  ADD COLUMN IF NOT EXISTS is_consolidated BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE app.articles
  ADD COLUMN IF NOT EXISTS consolidated_into UUID
    REFERENCES app.articles(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_articles_consolidated_into
  ON app.articles(consolidated_into) WHERE consolidated_into IS NOT NULL;

-- View: commentary article with its sources aggregated
CREATE OR REPLACE VIEW app.v_commentary_with_sources AS
SELECT
  c.id AS commentary_id,
  c.title,
  c.author_name,
  c.rewritten_content_path,
  array_agg(s.id ORDER BY cs.position) FILTER (WHERE s.id IS NOT NULL) AS source_ids,
  array_agg(s.title ORDER BY cs.position) FILTER (WHERE s.id IS NOT NULL) AS source_titles,
  (SELECT s2.id FROM app.commentary_sources cs2
     JOIN app.articles s2 ON s2.id = cs2.source_article_id
     WHERE cs2.commentary_article_id = c.id AND cs2.is_primary) AS primary_source_id
FROM app.articles c
LEFT JOIN app.commentary_sources cs ON cs.commentary_article_id = c.id
LEFT JOIN app.articles s ON s.id = cs.source_article_id
WHERE c.is_consolidated = true
GROUP BY c.id;
