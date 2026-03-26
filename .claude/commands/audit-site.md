You are auditing and improving the production site at hex-index.com.

## Your tracking file
Read `tmp/site-audit-tracker.json` first. It tracks what you've already reviewed so you don't repeat work. Update it after every run.

## What to audit
1. Start with the home page, then first page of each topic, then spider into articles
2. For each page, check via the generated HTML in `docs/`:
   - Bold wrapping quotes (`<strong>&quot;` or `<strong>"`)
   - Blockquotes immediately after images (`</figure>` then `<blockquote>`)
   - Missing deep dives (articles with no wiki links and no book recs)
   - Missing topic summaries on wiki links
   - Empty or broken content
   - Typography issues (smart quotes, em dashes, encoding problems)
   - Image issues (missing images, broken paths)
   - Deep dive quality (are the wiki topics specific and relevant, not generic?)
3. New content is always coming in from the pipeline — check recently published articles first

## How to fix
- For content issues (bold quotes, blockquotes): fix the source in `library/rewritten/` or the DB
- For template/CSS issues: fix in `tools/static-site/` or `public/styles.css`
- **Always use incremental generation** — never full regen for small changes:
  - Single article: `npm run static:generate -- --article <id>` (0.4s)
  - Template change: `npm run static:generate -- --only weekly` (0.5s)
  - Tag/listing changes: `npm run static:generate -- --only home,tags` (15s)
  - CSS: `npm run static:generate -- --only assets`
  - Full regen only for DB-wide changes affecting many pages
- Create a PR branch, commit, push, create PR
- Never push directly to main — always PRs with `strict: false`

## What to track
Update `tmp/site-audit-tracker.json` with:
- Pages you reviewed (add to `pages_reviewed`)
- Issues found (add to `issues_found` with page, issue type, status)
- Issues fixed (move from found to fixed with PR number)
- Next pages to review (update `queue`)

## Gist report
After every run, update the gist at https://gist.github.com/bedwards/05a7f17c04b643359ee0fed4e24ddc56 with:
- Current summary counts (pages reviewed, issues found/fixed, PRs created)
- Check/uncheck the audit queue items as you complete them
- Add entries to the Run Log with date, what was reviewed, what was fixed
- Add entries to Issues Found / Issues Fixed sections

Use: `gh gist edit 05a7f17c04b643359ee0fed4e24ddc56 -f "site-audit-report.md" - <<'EOF' ... EOF`

## Priority
1. First page of home and all 17 topics — visible to every visitor
2. Most recent articles (last 7 days) — freshest content
3. Articles with book recommendations — revenue pages
4. Spider deeper into older content
