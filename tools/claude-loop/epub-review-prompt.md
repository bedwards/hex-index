# Epub Review Loop

You monitor for newly generated weekly Reader epubs and perform editorial review when one appears.

## Check for new epub

```bash
# Get the latest epub file
LATEST_EPUB=$(ls -t docs/weekly/*.epub 2>/dev/null | head -1)
echo "Latest epub: $LATEST_EPUB"

# Check if we already reviewed it
TRACKING_FILE="tools/claude-loop/.epub-reviewed"
if [ -f "$TRACKING_FILE" ] && grep -q "$(basename "$LATEST_EPUB")" "$TRACKING_FILE"; then
  echo "Already reviewed. Nothing to do."
  exit 0
fi

echo "Current date: $(date)"
```

If the latest epub has already been reviewed (its filename appears in the tracking file), print "Already reviewed" and stop. Do nothing else.

If there IS a new unreviewed epub:

## Review process

1. **Read the epub content**: The epub is generated from articles in the database. Query for the articles in this week's consolidation:
```sql
SELECT a.title, a.rewritten_content_path, t.name as tag
FROM app.weekly_consolidated wc
JOIN app.articles a ON a.id = ANY(wc.article_ids)
LEFT JOIN app.article_tags at ON at.article_id = a.id
LEFT JOIN app.tags t ON t.slug = at.tag_slug
WHERE wc.epub_filename = '<latest epub filename>'
ORDER BY at.score DESC
```

2. **Check each article's rewritten content** for:
   - LLM artifacts (think tags, preamble, refusals)
   - Garbled text or encoding issues
   - Missing section headings
   - Very short content
   - Duplicate paragraphs

3. **Fix problems in place** — do NOT mark articles dirty for Qwen to retry. Edit the HTML files directly:
   - Edit affected files in `library/rewrites/` to strip think tags, LLM preamble, refusal text, fix encoding, remove duplicates
   - Use an Agent worker with `isolation: "worktree"` to create a branch, make fixes, and create a PR

4. **Regenerate affected pages**: After fixing, regenerate only what changed:
```bash
npm run static:generate -- --only articles,weekly   # If fixing article content
npm run static:generate -- --article <id>           # If fixing a single article
```

5. **Deploy**: Commit and push docs/ changes so the improved epub goes live. Use a worktree + PR:
```bash
# Create a worktree, commit docs/ changes, push, create PR
```
Do not push directly to main. All changes go through PRs.

6. **Mark as reviewed**:
```bash
echo "$(basename "$LATEST_EPUB")" >> tools/claude-loop/.epub-reviewed
```

## Content Scoring (REQUIRED)

Every time you evaluate content, score it 0-100 and log to the database:

| Score | Meaning |
|-------|---------|
| 90-100 | Publication ready |
| 80-89 | Good but minor issues |
| 70-79 | Acceptable but needs work |
| 50-69 | Below standard |
| 0-49 | Reject |

After reviewing each article in the epub, INSERT an audit record:
```bash
psql "$DATABASE_URL" -c "INSERT INTO app.content_audits (content_type, content_id, audited_by, score_before, score_after, issues_found, changes_made, notes) VALUES ('article', '<article-id>', 'claude-epub-review', <score_before>, <score_after>, ARRAY['issue1','issue2'], ARRAY['change1','change2'], 'epub review for <epub-filename>');"
```

- `score_before`: score on first read, before any fixes
- `score_after`: score after fixes (NULL if no fixes needed)
- `issues_found`: list of problems detected
- `changes_made`: list of actions taken (e.g., 'fixed in place via PR', 'regenerated page')

## Important
- The first draft epub goes live immediately when build-weekly runs Thursday night
- Your improved version replaces it on the live site
- Always regenerate and deploy after making changes
- Track what you've reviewed so you don't repeat work
