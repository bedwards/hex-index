-- Wikipedia integration schema
-- Stores rewritten Wikipedia articles and links them to Substack articles

-- Wikipedia articles (rewritten for enjoyable reading)
CREATE TABLE IF NOT EXISTS app.wikipedia_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(512) NOT NULL,
    slug VARCHAR(512) NOT NULL UNIQUE,
    original_url VARCHAR(1024) NOT NULL UNIQUE,
    content_html TEXT NOT NULL,
    content_path VARCHAR(512),
    word_count INTEGER,
    estimated_read_time_minutes INTEGER,
    source_word_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for Wikipedia article lookups
CREATE INDEX IF NOT EXISTS idx_wikipedia_articles_slug ON app.wikipedia_articles(slug);
CREATE INDEX IF NOT EXISTS idx_wikipedia_articles_read_time ON app.wikipedia_articles(estimated_read_time_minutes DESC);

-- Many-to-many: Substack articles to Wikipedia articles
CREATE TABLE IF NOT EXISTS app.article_wikipedia_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES app.articles(id) ON DELETE CASCADE,
    wikipedia_id UUID NOT NULL REFERENCES app.wikipedia_articles(id) ON DELETE CASCADE,
    relevance_rank INTEGER NOT NULL CHECK (relevance_rank BETWEEN 1 AND 3),
    topic_summary TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(article_id, wikipedia_id),
    UNIQUE(article_id, relevance_rank)
);

-- Indexes for link traversal
CREATE INDEX IF NOT EXISTS idx_article_wikipedia_links_article ON app.article_wikipedia_links(article_id);
CREATE INDEX IF NOT EXISTS idx_article_wikipedia_links_wikipedia ON app.article_wikipedia_links(wikipedia_id);

-- Trigger for updated_at on wikipedia_articles
DROP TRIGGER IF EXISTS trigger_wikipedia_articles_updated ON app.wikipedia_articles;
CREATE TRIGGER trigger_wikipedia_articles_updated
    BEFORE UPDATE ON app.wikipedia_articles
    FOR EACH ROW
    EXECUTE FUNCTION app.update_updated_at();

-- View for articles with their Wikipedia links
CREATE OR REPLACE VIEW app.articles_with_wikipedia AS
SELECT
    a.*,
    p.name as publication_name,
    p.slug as publication_slug,
    COALESCE(
        json_agg(
            json_build_object(
                'id', w.id,
                'title', w.title,
                'slug', w.slug,
                'read_time', w.estimated_read_time_minutes,
                'topic_summary', awl.topic_summary,
                'rank', awl.relevance_rank
            ) ORDER BY awl.relevance_rank
        ) FILTER (WHERE w.id IS NOT NULL),
        '[]'
    ) as wikipedia_links
FROM app.articles a
JOIN app.publications p ON a.publication_id = p.id
LEFT JOIN app.article_wikipedia_links awl ON a.id = awl.article_id
LEFT JOIN app.wikipedia_articles w ON awl.wikipedia_id = w.id
GROUP BY a.id, p.name, p.slug;
