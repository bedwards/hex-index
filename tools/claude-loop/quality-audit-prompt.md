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

## Step 4: Score and Log (REQUIRED)

Every time you evaluate content, score it 0-100 and log to the database:

| Score | Meaning |
|-------|---------|
| 90-100 | Publication ready |
| 80-89 | Good but minor issues |
| 70-79 | Acceptable but needs work |
| 50-69 | Below standard |
| 0-49 | Reject |

After reviewing each item, INSERT an audit record:
```bash
psql "$DATABASE_URL" -c "INSERT INTO app.content_audits (content_type, content_id, audited_by, score_before, score_after, issues_found, changes_made, notes) VALUES ('<article|wikipedia>', '<id>', 'claude-quality-audit', <score_before>, <score_after>, ARRAY['issue1','issue2'], ARRAY['change1','change2'], 'optional notes');"
```

- `score_before`: score on first read, before any fixes
- `score_after`: score after fixes (NULL if no fixes needed, NULL if marked dirty for retry)
- `issues_found`: list of problems detected (from critical/warning checks above)
- `changes_made`: list of actions taken (e.g., 'marked dirty for retry', 'no action needed')

## Step 5: Report

Print a summary:
- Total items checked
- Critical issues found (and which articles)
- Warnings found
- Items marked for retry
