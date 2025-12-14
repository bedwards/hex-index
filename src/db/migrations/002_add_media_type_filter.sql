-- Add media_type column to articles table for filtering audio/video posts
-- Part of implementing text-only, 10-minute minimum read time filtering

-- Add media_type column with constraint
ALTER TABLE app.articles
ADD COLUMN IF NOT EXISTS media_type TEXT
CHECK (media_type IN ('text', 'audio', 'video'))
DEFAULT 'text';

-- Add index for filtering queries
CREATE INDEX IF NOT EXISTS idx_articles_media_type ON app.articles(media_type);

-- Add composite index for common query pattern: text posts with minimum read time
CREATE INDEX IF NOT EXISTS idx_articles_text_readable
ON app.articles(media_type, estimated_read_time_minutes)
WHERE media_type = 'text' AND estimated_read_time_minutes >= 10;

-- View already includes media_type automatically since it selects a.* from articles
