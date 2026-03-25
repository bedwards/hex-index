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

3. **Fix problems** by marking articles dirty:
```sql
UPDATE app.articles SET rewrite_dirty = true WHERE id = '<id>';
```

4. **Regenerate the epub**: After fixing, regenerate:
```bash
npm run static:generate
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

## Important
- The first draft epub goes live immediately when build-weekly runs Thursday night
- Your improved version replaces it on the live site
- Always regenerate and deploy after making changes
- Track what you've reviewed so you don't repeat work
