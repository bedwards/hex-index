# Quality Audit: Qwen Content Review

You are auditing recently generated content for quality problems. Check articles rewritten in the last 24 hours.

## Step 1: Find recent rewrites

```bash
docker exec hex-index-postgres psql -U postgres -d "hex-index" -t -A -c "
SELECT id, title, rewritten_content_path, 'article' as type
FROM app.articles
WHERE rewritten_content_path IS NOT NULL
AND updated_at > NOW() - INTERVAL '24 hours'
UNION ALL
SELECT id, title, content_path, 'wikipedia' as type
FROM app.wikipedia_articles
WHERE status = 'complete'
AND updated_at > NOW() - INTERVAL '24 hours'
ORDER BY type
"
```

## Step 2: For each result, read the HTML file

Read from `library/{content_path}`. Check for these problems:

### Critical (mark dirty for retry)
- Refusal text: "I can't help", "I'm not comfortable", "I cannot assist"
- Think tags: `<think>`, `</think>`
- LLM preamble: "Here's the rewrite", "I've adapted", "Sure, here's", "Certainly"
- Garbled/encoding issues: `â€™`, `â€"`, `Ã©` (mojibake)
- Repeated paragraphs (same paragraph appears twice)

### Warning (log but don't retry)
- Very short content (< 500 words for articles, < 1000 for Wikipedia)
- No section headings (no `<h2>` or `<h3>` tags in 1000+ word content)
- Code fences in prose (`<code>` blocks that look like markdown artifacts)

## Step 3: Fix problems

For critical issues, mark the article dirty:
```sql
-- For articles:
UPDATE app.articles SET rewrite_dirty = true WHERE id = '{id}';
-- For Wikipedia:
UPDATE app.wikipedia_articles SET rewrite_dirty = true, status = 'stub' WHERE id = '{id}';
```

## Step 4: Report

Print a summary:
- Total items checked
- Critical issues found (and which articles)
- Warnings found
- Items marked for retry
