# Wikipedia Integration Design

This document describes the Wikipedia integration feature for hex-index. The goal is to enrich Substack articles with related, rewritten Wikipedia content that provides deeper context on topics mentioned in the articles.

**IMPORTANT**: This feature uses one-shot Claude Code instances (Opus 4.5) for Wikipedia rewrites. Each rewrite is autonomous and follows the instructions in this document.

## Overview

For each Substack article in the library:
1. Analyze the article to identify 3 specific topics worth exploring
2. Find corresponding Wikipedia articles (minimum 10-minute read each)
3. Scrape and rewrite each Wikipedia article for enjoyable reading
4. Store the rewritten articles locally with links to originals
5. Display related Wikipedia articles on the Substack article page

## Design Principles

### Topic Selection

Select topics that are:
- **Specific, not general** - "Battle of Thermopylae" not "Ancient Greece"
- **Mentioned or linked in the article** - events, concepts, people, places, science
- **Educational gap fillers** - things a typical reader of this content probably doesn't know deeply
- **Substantive** - Wikipedia source must be minimum 10-minute read

Avoid:
- Topics the reader likely already knows well
- Overly broad subjects
- Topics without substantial Wikipedia coverage

### Wikipedia Rewriting Guidelines

The rewritten articles are **not encyclopedias**. They are enjoyable reading material optimized for Speechify text-to-speech. Each rewrite must:

1. **Don't bury the lede** - Lead with the most interesting hook
2. **Vary paragraph length** - Mix short punchy paragraphs with longer explanatory ones
3. **Vary sentence length** - Rhythm matters for audio; avoid monotony
4. **Spell out acronyms** - First use: "the North Atlantic Treaty Organization (NATO)"
5. **Avoid jargon** - If you must use a term, explain it immediately
6. **Explain from first principles** - Don't assume prior knowledge
7. **Differentiate concepts** - Explain how X differs from similar Y, and its opposite Z
8. **Enrich with connections** - Add Claude's knowledge of interesting related facts
9. **Flow naturally** - This is an essay, not a reference document
10. **Credit sources** - Link to the original Wikipedia article at the top

### Length Guidelines

- **Source material**: Follow Wikipedia links to gather 10 minutes to 1 hour of reading material
- **Output essay**: Match the depth of content - can range from 10 minutes to 1 hour read
- **Quality over quantity** - A focused 15-minute essay is better than a padded 45-minute one

## Database Schema

Add to `src/db/init.sql`:

```sql
-- Wikipedia articles (rewritten for reading)
CREATE TABLE app.wikipedia_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  original_url TEXT NOT NULL,
  content_html TEXT NOT NULL,
  content_path TEXT,
  word_count INTEGER,
  estimated_read_time_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Many-to-many relationship: Substack articles to Wikipedia articles
CREATE TABLE app.article_wikipedia_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES app.articles(id) ON DELETE CASCADE,
  wikipedia_id UUID NOT NULL REFERENCES app.wikipedia_articles(id) ON DELETE CASCADE,
  relevance_rank INTEGER NOT NULL CHECK (relevance_rank BETWEEN 1 AND 3),
  topic_summary TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(article_id, wikipedia_id),
  UNIQUE(article_id, relevance_rank)
);

CREATE INDEX idx_wikipedia_articles_slug ON app.wikipedia_articles(slug);
CREATE INDEX idx_article_wikipedia_links_article ON app.article_wikipedia_links(article_id);
CREATE INDEX idx_article_wikipedia_links_wikipedia ON app.article_wikipedia_links(wikipedia_id);
```

## File Structure

```
library/
  substack/           # Existing Substack articles
    publication-slug/
      article-slug.html
  wikipedia/          # Rewritten Wikipedia articles
    topic-slug.html
```

## Implementation Components

### 1. Topic Analyzer (`src/wikipedia/analyzer.ts`)

Analyzes a Substack article to identify 3 Wikipedia topics:

```typescript
interface TopicSuggestion {
  topic: string;           // e.g., "Dunbar's number"
  wikipediaUrl: string;    // e.g., "https://en.wikipedia.org/wiki/Dunbar%27s_number"
  reason: string;          // Why this topic is relevant
  estimatedDepth: string;  // "deep" | "moderate" | "surface"
}

async function analyzeArticleForTopics(
  articleHtml: string,
  articleTitle: string,
  publicationContext: string
): Promise<TopicSuggestion[]>
```

### 2. Wikipedia Scraper (`src/wikipedia/scraper.ts`)

Responsibly scrapes Wikipedia content:

```typescript
interface WikipediaContent {
  title: string;
  url: string;
  mainContent: string;      // Main article HTML
  linkedContent: string[];  // Content from followed links
  wordCount: number;
  estimatedReadTime: number;
}

async function scrapeWikipedia(
  url: string,
  options: {
    followLinks: boolean;
    minReadTime: number;    // 10 minutes
    maxReadTime: number;    // 60 minutes
    respectRobots: boolean; // Always true
    delayMs: number;        // Rate limiting
  }
): Promise<WikipediaContent>
```

Rate limiting:
- Minimum 1 second between requests
- Respect robots.txt
- Use appropriate User-Agent
- Cache aggressively

### 3. Wikipedia Rewriter (`src/wikipedia/rewriter.ts`)

Spawns one-shot Claude Code instances to rewrite articles:

```typescript
interface RewriteResult {
  html: string;
  wordCount: number;
  estimatedReadTime: number;
}

async function rewriteWikipediaArticle(
  content: WikipediaContent,
  contextFromSubstack: string,
  readerProfile: string
): Promise<RewriteResult>
```

The rewriter spawns a Claude Code instance with:
- The Wikipedia content to rewrite
- Context about the Substack article that triggered this
- Reader profile (inferred from Substack subscriptions)
- The rewriting guidelines from this document
- Instructions to save to database and commit

### 4. Integration Pipeline (`src/wikipedia/pipeline.ts`)

Orchestrates the full flow:

```typescript
async function enrichArticleWithWikipedia(
  articleId: string,
  options: { force: boolean }
): Promise<void>

async function retrofitExistingArticles(
  options: {
    limit: number;
    startFrom: 'newest' | 'oldest';
  }
): Promise<void>
```

### 5. Ingestion Hook

Modify `src/ingestion/pipeline.ts` to call Wikipedia enrichment after article ingestion:

```typescript
// After successful article ingestion
await enrichArticleWithWikipedia(articleId, { force: false });
```

## CLI Commands

Add to `package.json` scripts:

```json
{
  "wikipedia:analyze": "npx tsx src/wikipedia/cli.ts analyze",
  "wikipedia:scrape": "npx tsx src/wikipedia/cli.ts scrape",
  "wikipedia:rewrite": "npx tsx src/wikipedia/cli.ts rewrite",
  "wikipedia:enrich": "npx tsx src/wikipedia/cli.ts enrich",
  "wikipedia:retrofit": "npx tsx src/wikipedia/cli.ts retrofit"
}
```

Usage:
```bash
# Analyze a single article for topics
npm run wikipedia:analyze -- --article-id <uuid>

# Scrape a Wikipedia URL
npm run wikipedia:scrape -- --url "https://en.wikipedia.org/wiki/..."

# Rewrite scraped content (spawns Claude Code instance)
npm run wikipedia:rewrite -- --wikipedia-id <uuid>

# Full enrichment for one article
npm run wikipedia:enrich -- --article-id <uuid>

# Retrofit all existing articles (newest first)
npm run wikipedia:retrofit -- --limit 100
```

## UI Changes

### Article Page (`src/api/pages.ts`)

Add related Wikipedia articles at top of article page:

```html
<aside class="related-wikipedia">
  <h2>Deep Dives</h2>
  <ul>
    <li>
      <a href="/wikipedia/dunbars-number">Dunbar's Number</a>
      <span class="read-time">12 min read</span>
      <p class="topic-summary">The cognitive limit on social relationships mentioned in the article</p>
    </li>
    <!-- ... 2 more -->
  </ul>
</aside>
```

### Article List

Include Wikipedia articles in the main article list, distinguished by type:

```html
<article class="article-card article-card--wikipedia">
  <span class="article-type">Wikipedia</span>
  <h2><a href="/wikipedia/dunbars-number">Dunbar's Number</a></h2>
  <!-- ... -->
</article>
```

### Wikipedia Article Page

New route `/wikipedia/:slug` that renders the rewritten article:

```html
<article class="article content-width">
  <header class="article-header">
    <span class="article-type">Wikipedia Rewrite</span>
    <h1>Dunbar's Number</h1>
    <p class="original-source">
      Based on <a href="https://en.wikipedia.org/wiki/Dunbar%27s_number">Wikipedia</a>
    </p>
  </header>
  <div class="article-content">
    <!-- Rewritten content -->
  </div>
</article>
```

## One-Shot Claude Code Instance Protocol

When spawning a Claude Code instance for Wikipedia rewriting:

### Prompt Template

```
You are rewriting a Wikipedia article for the hex-index reading library.

## Source Material
- Original Wikipedia URL: {url}
- Title: {title}
- Content: {scraped_content}

## Context
This Wikipedia article is related to a Substack article titled "{substack_title}"
from {publication_name}. The reader subscribed to this publication likely has
interests in: {inferred_interests}

## Your Task
Rewrite this Wikipedia content as an enjoyable essay for reading with Speechify.

### Writing Guidelines
1. Don't bury the lede - hook the reader immediately
2. Vary paragraph length - mix punchy with explanatory
3. Vary sentence length - create rhythm for audio
4. Spell out acronyms on first use
5. Avoid jargon - explain terms immediately
6. Explain from first principles - no assumed knowledge
7. Differentiate from similar concepts and opposites
8. Add interesting connections from your knowledge
9. Flow naturally - this is an essay, not a reference
10. Link to original Wikipedia at the top

### Output Requirements
1. Write the rewritten HTML content
2. Save to library/wikipedia/{slug}.html
3. Update the database with the new article
4. Run verification: npm run typecheck && npm run lint && npm run test
5. If verification passes, commit and push to GitHub main branch

### Commit Message Format
feat: add Wikipedia rewrite - {title}

Rewritten from {original_url} for enjoyable reading.
Related to Substack article: {substack_title}

Word count: {word_count}
Read time: {read_time} minutes
```

### Spawning Command

```bash
claude --model opus \
  --prompt "$(cat /tmp/wikipedia-rewrite-prompt.txt)" \
  --allowedTools "Read,Write,Edit,Bash,Glob,Grep" \
  --max-turns 50
```

## Verification Scripts

### `tools/wikipedia/verify.ts`

```typescript
// Verify all Wikipedia articles have:
// 1. Valid HTML content
// 2. Link to original source
// 3. Minimum read time (10 minutes)
// 4. Database entries
// 5. Correct file paths

async function verifyWikipediaArticles(): Promise<VerificationResult>
```

### `tools/wikipedia/stats.ts`

```typescript
// Report on Wikipedia integration status:
// - Total Wikipedia articles
// - Articles pending enrichment
// - Average read time
// - Coverage by publication

async function reportWikipediaStats(): Promise<void>
```

## Rollout Plan

### Phase 1: Infrastructure
1. Add database schema
2. Create library/wikipedia/ directory
3. Implement scraper with rate limiting
4. Implement topic analyzer

### Phase 2: Rewriting
1. Implement rewriter with Claude Code spawning
2. Add verification scripts
3. Test with 5 articles manually

### Phase 3: UI
1. Add Wikipedia routes to pages.ts
2. Add related articles section to article page
3. Include Wikipedia in article listings

### Phase 4: Automation
1. Hook into ingestion pipeline
2. Create retrofit command
3. Run retrofit on existing articles (newest first)

### Phase 5: Polish
1. Add error handling and retry logic
2. Add progress reporting
3. Add stats dashboard

## Error Handling

- **Wikipedia unavailable**: Queue for retry, continue with other articles
- **Claude Code instance fails**: Log error, mark article for manual review
- **Rate limited**: Back off exponentially, resume later
- **Content too short**: Skip topic, find alternative
- **Duplicate detection**: Check slug before creating, skip if exists

## Monitoring

Log all operations to enable debugging:
- Topic analysis results
- Scraping attempts and outcomes
- Rewrite spawning and completion
- Database updates
- Git commits

## Related Issues

- [Issue #54](https://github.com/bedwards/hex-index/issues/54): Database schema for Wikipedia integration
- [Issue #55](https://github.com/bedwards/hex-index/issues/55): Wikipedia scraper with rate limiting
- [Issue #56](https://github.com/bedwards/hex-index/issues/56): Topic analyzer for Substack articles
- [Issue #57](https://github.com/bedwards/hex-index/issues/57): Wikipedia rewriter with Claude Code spawning
- [Issue #58](https://github.com/bedwards/hex-index/issues/58): UI for Wikipedia articles
- [Issue #59](https://github.com/bedwards/hex-index/issues/59): Ingestion pipeline integration
- [Issue #60](https://github.com/bedwards/hex-index/issues/60): Retrofit existing articles
