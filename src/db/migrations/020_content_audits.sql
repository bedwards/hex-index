CREATE TABLE IF NOT EXISTS app.content_audits (
  id SERIAL PRIMARY KEY,
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,
  audited_by TEXT NOT NULL,
  score_before INTEGER CHECK (score_before BETWEEN 0 AND 100),
  score_after INTEGER CHECK (score_after BETWEEN 0 AND 100),
  issues_found TEXT[],
  changes_made TEXT[],
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_content_audits_content ON app.content_audits (content_type, content_id);
CREATE INDEX idx_content_audits_score ON app.content_audits (score_before);
