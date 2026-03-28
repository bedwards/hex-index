-- Content audits table for editorial quality scoring
-- Logs content quality scores from the editorial loop

CREATE TABLE IF NOT EXISTS app.content_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,          -- 'article', 'wikipedia', 'rewrite'
  content_id UUID NOT NULL,            -- references the article/wiki ID
  audited_by TEXT NOT NULL,            -- 'claude-editorial', 'claude-audit-site', etc.
  score_before INTEGER,                -- 0-100 score on first read
  score_after INTEGER,                 -- 0-100 score after fixes (NULL if no fixes)
  issues_found TEXT[] DEFAULT '{}',    -- list of problems detected
  changes_made TEXT[] DEFAULT '{}',    -- list of actions taken
  notes TEXT,                          -- optional notes
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_content_audits_content ON app.content_audits(content_type, content_id);
CREATE INDEX idx_content_audits_created ON app.content_audits(created_at);
