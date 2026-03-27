CREATE TABLE IF NOT EXISTS app.content_audits (
  id SERIAL PRIMARY KEY,
  content_type TEXT NOT NULL,           -- 'article', 'wikipedia', 'title', 'affiliate'
  content_id TEXT NOT NULL,             -- article or wikipedia article UUID
  audited_by TEXT NOT NULL,             -- 'claude-editorial', 'claude-quality', 'claude-epub'
  score_before INTEGER CHECK (score_before BETWEEN 0 AND 100),
  score_after INTEGER CHECK (score_after BETWEEN 0 AND 100),
  issues_found TEXT[],                  -- ['missing_counterpoints', 'no_bottom_line', 'think_tags']
  changes_made TEXT[],                  -- ['added_counterpoint', 'fixed_title_case', 'removed_preamble']
  notes TEXT,                           -- free-form editorial notes
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_content_audits_content ON app.content_audits (content_type, content_id);
CREATE INDEX idx_content_audits_score ON app.content_audits (score_before);
