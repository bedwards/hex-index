-- Initial schema for hex-index personal library
-- Publications, Articles, and Article Links with JSONB flexible metadata

-- Publications table
CREATE TABLE IF NOT EXISTS app.publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    base_url VARCHAR(512) NOT NULL,
    feed_url VARCHAR(512) NOT NULL,
    description TEXT,
    author_name VARCHAR(255),
    last_fetched_at TIMESTAMP WITH TIME ZONE,
    article_count INTEGER DEFAULT 0,
    quality_score NUMERIC(3,2) DEFAULT 0.00,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for publication lookups
CREATE INDEX IF NOT EXISTS idx_publications_slug ON app.publications(slug);
CREATE INDEX IF NOT EXISTS idx_publications_quality ON app.publications(quality_score DESC);

-- Articles table
CREATE TABLE IF NOT EXISTS app.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    publication_id UUID NOT NULL REFERENCES app.publications(id) ON DELETE CASCADE,
    title VARCHAR(512) NOT NULL,
    slug VARCHAR(512) NOT NULL,
    original_url VARCHAR(1024) NOT NULL UNIQUE,
    content_path VARCHAR(512),
    author_name VARCHAR(255),
    published_at TIMESTAMP WITH TIME ZONE,
    word_count INTEGER,
    estimated_read_time_minutes INTEGER,
    tags JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    full_text_search TSVECTOR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for article queries
CREATE INDEX IF NOT EXISTS idx_articles_publication ON app.articles(publication_id);
CREATE INDEX IF NOT EXISTS idx_articles_published ON app.articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_publication_published
    ON app.articles(publication_id, published_at DESC);

-- GIN index for JSONB tag queries
-- Allows efficient queries like: tags @> '{"topic": "economics"}'
CREATE INDEX IF NOT EXISTS idx_articles_tags ON app.articles USING GIN (tags);

-- GIN index for full-text search
CREATE INDEX IF NOT EXISTS idx_articles_fts ON app.articles USING GIN (full_text_search);

-- Article links table (for inter-article graph)
CREATE TABLE IF NOT EXISTS app.article_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_article_id UUID NOT NULL REFERENCES app.articles(id) ON DELETE CASCADE,
    target_article_id UUID REFERENCES app.articles(id) ON DELETE SET NULL,
    target_url VARCHAR(1024) NOT NULL,
    link_text VARCHAR(512),
    context TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for link traversal
CREATE INDEX IF NOT EXISTS idx_article_links_source ON app.article_links(source_article_id);
CREATE INDEX IF NOT EXISTS idx_article_links_target ON app.article_links(target_article_id);

-- Function to update full_text_search on article insert/update
CREATE OR REPLACE FUNCTION app.update_article_fts()
RETURNS TRIGGER AS $$
BEGIN
    NEW.full_text_search :=
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.author_name, '')), 'B');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for automatic FTS update
DROP TRIGGER IF EXISTS trigger_article_fts ON app.articles;
CREATE TRIGGER trigger_article_fts
    BEFORE INSERT OR UPDATE OF title, author_name
    ON app.articles
    FOR EACH ROW
    EXECUTE FUNCTION app.update_article_fts();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION app.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS trigger_publications_updated ON app.publications;
CREATE TRIGGER trigger_publications_updated
    BEFORE UPDATE ON app.publications
    FOR EACH ROW
    EXECUTE FUNCTION app.update_updated_at();

DROP TRIGGER IF EXISTS trigger_articles_updated ON app.articles;
CREATE TRIGGER trigger_articles_updated
    BEFORE UPDATE ON app.articles
    FOR EACH ROW
    EXECUTE FUNCTION app.update_updated_at();

-- Function to update publication article_count
CREATE OR REPLACE FUNCTION app.update_publication_article_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE app.publications
        SET article_count = article_count + 1
        WHERE id = NEW.publication_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE app.publications
        SET article_count = article_count - 1
        WHERE id = OLD.publication_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for article_count maintenance
DROP TRIGGER IF EXISTS trigger_article_count ON app.articles;
CREATE TRIGGER trigger_article_count
    AFTER INSERT OR DELETE ON app.articles
    FOR EACH ROW
    EXECUTE FUNCTION app.update_publication_article_count();

-- Useful views

-- View for searching articles with publication info
CREATE OR REPLACE VIEW app.articles_with_publication AS
SELECT
    a.*,
    p.name as publication_name,
    p.slug as publication_slug,
    p.author_name as publication_author
FROM app.articles a
JOIN app.publications p ON a.publication_id = p.id;

-- View for article link counts (incoming links = influence)
CREATE OR REPLACE VIEW app.article_influence AS
SELECT
    a.id,
    a.title,
    a.publication_id,
    COUNT(al.id) as incoming_links
FROM app.articles a
LEFT JOIN app.article_links al ON al.target_article_id = a.id
GROUP BY a.id, a.title, a.publication_id
ORDER BY incoming_links DESC;
