# Library Sync Incident - 2026-04-23

## Summary

Synced ~68 new publication folders from interactive clone to main repository, restoring 3263 articles to hex-index.com with working images.

## Timeline

| Time | Event |
|------|-------|
| Earlier today | Site showed April 23 dates (incorrect - were set to NOW()) |
| First fix attempt | Reset dates to created_at/source dates (April 16-18) |
| Discovery | Articles had rewritten_content_path but NULL content_path and image_path |
| Root cause found | Image generator skips articles without content_path |
| Final fix | Set content_path = rewritten_content_path, generated 48 images |

## Root Cause Analysis

### The Data Flow Problem

```
┌─────────────────────────────────────────────────────────────────┐
│                    ARTICLE PIPELINE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. INGEST (yt-ingest.ts / substack scraper)                    │
│     → Sets: content_path, published_at (from source)            │
│     → image_path = NULL                                         │
│                                                                  │
│  2. REWRITE (article-rewrite.ts via Qwen)                       │
│     → Sets: rewritten_content_path, rewritten_at                │
│     → Does NOT set: content_path, image_path                    │
│     → Does NOT modify: published_at                             │
│                                                                  │
│  3. IMAGE GEN (generate-images.ts)                              │
│     → Requires: content_path IS NOT NULL                        │
│     → Sets: image_path                                          │
│     → SKIPS articles where content_path IS NULL                 │
│                                                                  │
│  4. PUBLISH GATE (publish-gate.ts)                              │
│     → Hides articles where ANY of:                              │
│       - rewritten_content_path IS NULL                          │
│       - consolidated_into IS NOT NULL                           │
│       - image_path IS NULL    ← THIS FAILED                     │
│       - published_at IS NULL                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### What Went Wrong

1. **Interactive clone had rewritten articles** with `content_path = NULL` (only `rewritten_content_path` set)

2. **Synced library files** but not database state → DB still had `content_path = NULL`

3. **Image generation skipped these articles** because:
   ```sql
   WHERE image_path IS NULL AND content_path IS NOT NULL
   ```

4. **Publish gate hid them** because `image_path IS NULL`

### The Bad Fix That Made It Worse

```sql
-- WRONG: Set all to NOW()
UPDATE app.articles SET published_at = NOW() 
WHERE rewritten_content_path IS NOT NULL;
```

This made articles appear with today's date, but images still didn't render because image_path was still NULL.

## The Correct Fix

### Step 1: Backfill content_path
```sql
UPDATE app.articles 
SET content_path = rewritten_content_path 
WHERE content_path IS NULL 
  AND rewritten_content_path IS NOT NULL 
  AND consolidated_into IS NULL;
-- 225 articles updated
```

### Step 2: Generate missing images
```bash
npm run job:generate-images -- --limit 50
# Generated 48 images for April 19-23 articles
```

### Step 3: Fix any remaining NULL published_at
```sql
-- For consolidated articles, use max of source dates
UPDATE app.articles a
SET published_at = (
  SELECT MAX(sa.published_at)
  FROM app.commentary_sources cs
  JOIN app.articles sa ON cs.source_article_id = sa.id
  WHERE cs.commentary_article_id = a.id
    AND sa.published_at IS NOT NULL
)
WHERE a.original_url LIKE 'hex-index://consolidated/%';
```

### Step 4: Regenerate and deploy
```bash
npm run static:generate
git add -A
git commit -m "fix: backfill content_path and generate images"
git push
```

## Key Lessons

### 1. published_at Should Reflect Source Date
- For direct ingests: Use the source's publication date
- For consolidated articles: Use MAX(source articles' published_at)
- Never use NOW() unless it's actually when the source was published

### 2. content_path is Required for Image Generation
The image generator reads article content to build AI prompts:
```typescript
const htmlPath = join(process.cwd(), 'library', article.content_path);
const html = await readFile(htmlPath, 'utf-8');
const excerpt = extractExcerpt(html); // Used in image prompt
```

**Rule:** If an article has `rewritten_content_path` but no `content_path`, set `content_path = rewritten_content_path` before running image generation.

### 3. Publish Gate Requirements (ALL must be true)
```sql
WHERE rewritten_content_path IS NOT NULL
  AND consolidated_into IS NULL
  AND image_path IS NOT NULL
  AND published_at IS NOT NULL
```

### 4. Sync Strategy for Interactive Clone
When syncing from interactive clone:
1. Copy `library/rewritten/**` files
2. Copy `library/images/**` files  
3. Copy `library/full-text/**` files (if any new)
4. Run SQL to backfill content_path where needed
5. Run image generation for any remaining NULL image_path
6. Regenerate static site
7. Commit and PR

## Files Involved

| File | Purpose |
|------|---------|
| `tools/jobs/generate-images.ts` | Generates article thumbnail images via Gemini |
| `tools/editorial/publish-gate.ts` | Filters articles for publication |
| `tools/static-site/generate.ts` | Builds static site from DB |
| `app.articles` table | Source of truth for article metadata |

## Verification Commands

```bash
# Check articles ready for publication
docker exec -e PGPASSWORD=postgres hex-index-postgres psql -U postgres -d hex-index -c \
  "SELECT COUNT(*) FROM app.articles 
   WHERE rewritten_content_path IS NOT NULL 
     AND consolidated_into IS NULL 
     AND image_path IS NOT NULL 
     AND published_at IS NOT NULL;"

# Find articles missing images
docker exec -e PGPASSWORD=postgres hex-index-postgres psql -U postgres -d hex-index -c \
  "SELECT title, content_path, image_path FROM app.articles 
   WHERE rewritten_content_path IS NOT NULL 
     AND consolidated_into IS NULL 
     AND image_path IS NULL;"

# Verify site has images
curl -s https://hex-index.com/ | grep -c 'class="article-thumb"'
```

## PRs Created

| PR | Branch | Status | Purpose |
|----|--------|--------|---------|
| #565 | `feat/sync-library-2026-04-23` | ✅ Merged | Initial library sync |
| #567 | `fix/missing-images` | ✅ Merged | NULL image_path for 72 missing files |
| #569 | `fix/april-23-articles` | ⏳ Pending | Backfill content_path + 48 new images |

## Final State

- **3263 articles** published on hex-index.com
- **5563 images** in library/images/
- Homepage shows April 22-23 articles correctly
- All images rendering (HTTP 200)
