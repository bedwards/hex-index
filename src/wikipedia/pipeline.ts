/**
 * Wikipedia enrichment pipeline
 * Orchestrates topic analysis, scraping, rewriting, and database updates
 */

import { Pool } from 'pg';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { TopicSuggestion, EnrichmentResult, WikipediaArticle } from './types.js';
import { analyzeArticleForTopics, quickAnalyzeForTopics } from './analyzer.js';
import { scrapeWikipedia, normalizeWikipediaUrl } from './scraper.js';
import { rewriteWikipediaArticle, slugify } from './rewriter.js';

const LIBRARY_PATH = join(process.cwd(), 'library', 'wikipedia');

interface ArticleInfo {
  id: string;
  title: string;
  contentPath: string | null;
  publicationName: string;
}

/**
 * Ensure the Wikipedia library directory exists
 */
async function ensureLibraryDir(): Promise<void> {
  await mkdir(LIBRARY_PATH, { recursive: true });
}

/**
 * Load article HTML content from library
 */
async function loadArticleHtml(contentPath: string | null): Promise<string | null> {
  if (!contentPath) {
    return null;
  }
  try {
    const { readFile } = await import('fs/promises');
    const fullPath = join(process.cwd(), 'library', contentPath);
    return await readFile(fullPath, 'utf-8');
  } catch {
    return null;
  }
}

/**
 * Check if article already has Wikipedia links
 */
async function hasWikipediaLinks(pool: Pool, articleId: string): Promise<boolean> {
  const result = await pool.query<{ count: string }>(
    'SELECT COUNT(*) FROM app.article_wikipedia_links WHERE article_id = $1',
    [articleId]
  );
  return parseInt(result.rows[0].count, 10) > 0;
}

/**
 * Check if Wikipedia article already exists by URL
 */
async function getExistingWikipediaArticle(
  pool: Pool,
  url: string
): Promise<WikipediaArticle | null> {
  const result = await pool.query<WikipediaArticle>(
    'SELECT * FROM app.wikipedia_articles WHERE original_url = $1',
    [url]
  );
  return result.rows[0] ?? null;
}

/**
 * Save Wikipedia article to database and file system
 */
async function saveWikipediaArticle(
  pool: Pool,
  title: string,
  url: string,
  html: string,
  wordCount: number,
  readTime: number,
  sourceWordCount: number
): Promise<WikipediaArticle> {
  const slug = slugify(title);
  const contentPath = `wikipedia/${slug}.html`;
  const fullPath = join(process.cwd(), 'library', contentPath);

  // Ensure directory exists
  await mkdir(dirname(fullPath), { recursive: true });

  // Write HTML file
  await writeFile(fullPath, html, 'utf-8');

  // Insert into database
  const result = await pool.query<WikipediaArticle>(`
    INSERT INTO app.wikipedia_articles (
      title, slug, original_url, content_html, content_path,
      word_count, estimated_read_time_minutes, source_word_count
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (original_url) DO UPDATE SET
      content_html = EXCLUDED.content_html,
      content_path = EXCLUDED.content_path,
      word_count = EXCLUDED.word_count,
      estimated_read_time_minutes = EXCLUDED.estimated_read_time_minutes,
      updated_at = NOW()
    RETURNING *
  `, [title, slug, url, html, contentPath, wordCount, readTime, sourceWordCount]);

  return result.rows[0];
}

/**
 * Link Wikipedia article to Substack article
 */
async function linkWikipediaToArticle(
  pool: Pool,
  articleId: string,
  wikipediaId: string,
  rank: number,
  topicSummary: string
): Promise<void> {
  await pool.query(`
    INSERT INTO app.article_wikipedia_links (
      article_id, wikipedia_id, relevance_rank, topic_summary
    ) VALUES ($1, $2, $3, $4)
    ON CONFLICT (article_id, relevance_rank) DO UPDATE SET
      wikipedia_id = EXCLUDED.wikipedia_id,
      topic_summary = EXCLUDED.topic_summary
  `, [articleId, wikipediaId, rank, topicSummary]);
}

/**
 * Enrich a single article with Wikipedia content
 */
export async function enrichArticleWithWikipedia(
  pool: Pool,
  articleId: string,
  options: { force?: boolean; useQuickAnalysis?: boolean } = {}
): Promise<EnrichmentResult> {
  const result: EnrichmentResult = {
    articleId,
    success: false,
    wikipediaArticles: [],
    errors: [],
  };

  try {
    // Check if already enriched
    if (!options.force && await hasWikipediaLinks(pool, articleId)) {
      result.success = true;
      return result;
    }

    // Get article info
    const articleResult = await pool.query<ArticleInfo>(`
      SELECT a.id, a.title, a.content_path as "contentPath", p.name as "publicationName"
      FROM app.articles a
      JOIN app.publications p ON a.publication_id = p.id
      WHERE a.id = $1
    `, [articleId]);

    if (articleResult.rows.length === 0) {
      result.errors.push('Article not found');
      return result;
    }

    const article = articleResult.rows[0];

    // Load article HTML
    const articleHtml = await loadArticleHtml(article.contentPath);
    if (!articleHtml) {
      result.errors.push('Article content not found');
      return result;
    }

    // Analyze for topics
    console.info(`  Analyzing topics for: ${article.title}`);
    let topics: TopicSuggestion[];
    try {
      if (options.useQuickAnalysis) {
        topics = await quickAnalyzeForTopics(articleHtml);
      } else {
        topics = await analyzeArticleForTopics(articleHtml, article.title, article.publicationName);
      }
    } catch (err) {
      result.errors.push(`Topic analysis failed: ${err instanceof Error ? err.message : String(err)}`);
      return result;
    }

    if (topics.length === 0) {
      result.errors.push('No suitable Wikipedia topics found');
      return result;
    }

    console.info(`  Found ${topics.length} topics: ${topics.map(t => t.topic).join(', ')}`);

    // Process each topic
    let rank = 1;
    for (const topic of topics) {
      try {
        const normalizedUrl = normalizeWikipediaUrl(topic.wikipediaUrl);

        // Check if we already have this Wikipedia article
        let wikiArticle = await getExistingWikipediaArticle(pool, normalizedUrl);

        if (!wikiArticle) {
          console.info(`  Scraping: ${topic.topic}`);
          const content = await scrapeWikipedia(normalizedUrl);

          console.info(`  Rewriting: ${topic.topic} (${content.wordCount} words source)`);
          const rewritten = await rewriteWikipediaArticle(
            content,
            article.title,
            articleHtml.slice(0, 1000)
          );

          console.info(`  Saving: ${topic.topic} (${rewritten.wordCount} words, ${rewritten.estimatedReadTimeMinutes} min)`);
          wikiArticle = await saveWikipediaArticle(
            pool,
            content.title,
            normalizedUrl,
            rewritten.html,
            rewritten.wordCount,
            rewritten.estimatedReadTimeMinutes,
            content.wordCount
          );
        } else {
          console.info(`  Using existing: ${topic.topic}`);
        }

        // Link to article
        await linkWikipediaToArticle(pool, articleId, wikiArticle.id, rank, topic.reason);
        result.wikipediaArticles.push(wikiArticle);
        rank++;
      } catch (err) {
        result.errors.push(`Failed to process ${topic.topic}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    result.success = result.wikipediaArticles.length > 0;
  } catch (err) {
    result.errors.push(`Enrichment failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  return result;
}

/**
 * Retrofit existing articles with Wikipedia enrichment
 */
export async function retrofitExistingArticles(
  pool: Pool,
  options: {
    limit?: number;
    startFrom?: 'newest' | 'oldest';
    publicationSlug?: string;
  } = {}
): Promise<{ processed: number; enriched: number; errors: string[] }> {
  const { limit = 100, startFrom = 'newest', publicationSlug } = options;

  await ensureLibraryDir();

  // Build query for articles without Wikipedia links
  let query = `
    SELECT a.id, a.title, a.published_at
    FROM app.articles a
    LEFT JOIN app.article_wikipedia_links awl ON a.id = awl.article_id
    WHERE awl.id IS NULL
      AND a.content_path IS NOT NULL
  `;

  const params: (string | number)[] = [];

  if (publicationSlug) {
    query += ` AND a.publication_id = (SELECT id FROM app.publications WHERE slug = $1)`;
    params.push(publicationSlug);
  }

  query += startFrom === 'newest'
    ? ' ORDER BY a.published_at DESC NULLS LAST'
    : ' ORDER BY a.published_at ASC NULLS LAST';

  query += ` LIMIT $${params.length + 1}`;
  params.push(limit);

  const articlesResult = await pool.query<{ id: string; title: string; published_at: string }>(
    query,
    params
  );

  const articles = articlesResult.rows;
  console.info(`Found ${articles.length} articles to enrich`);

  let processed = 0;
  let enriched = 0;
  const errors: string[] = [];

  for (const article of articles) {
    processed++;
    console.info(`[${processed}/${articles.length}] ${article.title}`);

    const result = await enrichArticleWithWikipedia(pool, article.id, { force: false });

    if (result.success && result.wikipediaArticles.length > 0) {
      enriched++;
      console.info(`  ✓ Added ${result.wikipediaArticles.length} Wikipedia articles`);
    } else if (result.errors.length > 0) {
      for (const err of result.errors) {
        errors.push(`${article.title}: ${err}`);
        console.info(`  ✗ ${err}`);
      }
    }

    // Brief pause between articles to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  return { processed, enriched, errors };
}

/**
 * Get enrichment statistics
 */
export async function getEnrichmentStats(pool: Pool): Promise<{
  totalArticles: number;
  enrichedArticles: number;
  totalWikipediaArticles: number;
  averageReadTime: number;
}> {
  const [totalResult, enrichedResult, wikiResult, avgResult] = await Promise.all([
    pool.query<{ count: string }>('SELECT COUNT(*) FROM app.articles'),
    pool.query<{ count: string }>('SELECT COUNT(DISTINCT article_id) FROM app.article_wikipedia_links'),
    pool.query<{ count: string }>('SELECT COUNT(*) FROM app.wikipedia_articles'),
    pool.query<{ avg: string }>('SELECT AVG(estimated_read_time_minutes) FROM app.wikipedia_articles'),
  ]);

  return {
    totalArticles: parseInt(totalResult.rows[0].count, 10),
    enrichedArticles: parseInt(enrichedResult.rows[0].count, 10),
    totalWikipediaArticles: parseInt(wikiResult.rows[0].count, 10),
    averageReadTime: parseFloat(avgResult.rows[0].avg) || 0,
  };
}
