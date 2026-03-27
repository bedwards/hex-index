# Hex Index Operations Plan

## The Concurrency Problem

Five independent processes need to work on the same codebase without stepping on each other:

| Process | Runtime | Git Needs | GPU | Frequency |
|---------|---------|-----------|-----|-----------|
| **Qwen launchctl jobs** | launchd | Read main, write DB/filesystem | Yes (serial, locked) | Even/odd hours |
| **Claude editorial loop** | tmux + `/loop` | Read main, PR for code changes | No | Every 2h |
| **Claude ops loop** | tmux + `/loop` | Read main, PR for code changes | No | Every 30m |
| **Brian's Claude Code** | Interactive TUI | Feature branches, PRs | No | Ad hoc |
| **Antigravity** | Interactive IDE | Feature branches, PRs | No | Ad hoc |

### Why Independent Clones, Not Worktrees

Worktrees share a single `.git` directory. If one process runs `git pull --rebase` on main while another is mid-commit, they corrupt each other's state. Worktrees are excellent for short-lived background agents within a single Claude session (and we still use them for that). But for **long-running, independently-scheduled processes**, independent clones are the right isolation boundary.

Each clone:
- Has its own `.git` directory (no shared locks)
- Can `git pull` independently without affecting others
- Uses worktrees internally for code-change PRs
- Shares the same Postgres database and `library/` filesystem (that's fine --- DB handles concurrency, filesystem writes are per-article)

---

## Clone Layout

```
~/hex-index/                          # Brian's interactive sessions (Claude Code + Antigravity)
~/vibe/hex-index-clones/
  qwen-batch/                         # Launchctl Qwen jobs (GPU work)
  auto-deploy/                        # Static site regeneration + GitHub Pages
  claude-editorial/                   # Claude editorial loop (content quality)
  claude-ops/                         # Claude ops loop (PRs, CI, health, cleanup)
  claude-epub/                        # Claude Friday epub review (weekly)
```

### Clone Setup Script

```bash
#!/bin/bash
# tools/ops/setup-clones.sh
# One-time setup of independent clones for each process

set -euo pipefail

REPO="git@github.com:bedwards/hex-index.git"
BASE="$HOME/vibe/hex-index-clones"

mkdir -p "$BASE"

for name in qwen-batch auto-deploy claude-editorial claude-ops claude-epub; do
  if [ ! -d "$BASE/$name" ]; then
    echo "Cloning $name..."
    git clone "$REPO" "$BASE/$name"
    # Each clone needs its own node_modules
    (cd "$BASE/$name" && npm ci --silent)
    # Symlink shared config that isn't in git
    ln -sf "$HOME/hex-index/.env" "$BASE/$name/.env"
    ln -sf "$HOME/hex-index/.secrets" "$BASE/$name/.secrets"
    echo "Done: $BASE/$name"
  else
    echo "Already exists: $BASE/$name"
  fi
done
```

### Clone Hygiene Rules

1. **Clones stay on `main`**. They pull regularly. They never have uncommitted work on main.
2. **Code changes use worktrees** within the clone. The worktree creates a branch, commits, pushes, creates a PR.
3. **After PR merges**, the worktree is deleted and the clone pulls latest main.
4. **Stashes are forbidden**. If there's uncommitted work, commit it to a branch and push. Stashes are invisible to other processes.
5. **Each clone owns its own `node_modules/`** (installed via `npm ci` on setup, refreshed when `package-lock.json` changes).

---

## Launchctl Jobs (Qwen GPU Work)

### Working Directory Change

All launchctl plist files must set `WorkingDirectory` to `~/vibe/hex-index-clones/qwen-batch` instead of `~/hex-index`. This isolates GPU jobs from interactive sessions completely.

### Schedule (Unchanged)

The existing even/odd hour pattern is solid. No changes needed:

```
EVEN HOURS (00, 02, 04, ..., 22):
  :00  ingest + yt-ingest + gen-images    [no GPU]
  :05  wiki-discover                       [Qwen, 25 min]
  :35  article-rewrite                     [Qwen, 25 min]

ODD HOURS (01, 03, 05, ..., 23):
  :05  wiki-rewrite                        [Qwen, 25 min]
  :35  affiliate-suggest                   [Qwen, 25 min]
```

### GPU Lock (Unchanged)

The `flock`-based `llm.lock` system works well. Each job:
1. Acquires lock (waits up to 5 min)
2. Runs with time budget (`timeout`)
3. Releases lock on exit

### Launchctl Jobs to Keep Enabled

| Plist | Clone | GPU | Notes |
|-------|-------|-----|-------|
| `com.hex-index.postgres-watchdog` | N/A | No | Runs every 5 min, ensures Docker Postgres is up |
| `com.hex-index.ingest` | qwen-batch | No | Hourly RSS ingestion |
| `com.hex-index.yt-ingest` | qwen-batch | No | YouTube transcript scraping |
| `com.hex-index.gen-images` | qwen-batch | No | Gemini API (no local GPU) |
| `com.hex-index.wiki-discover` | qwen-batch | Qwen | Even :05 |
| `com.hex-index.wiki-rewrite` | qwen-batch | Qwen | Odd :05 |
| `com.hex-index.article-rewrite` | qwen-batch | Qwen | Even :35 |
| `com.hex-index.affiliate-suggest` | qwen-batch | Qwen | Odd :35 |
| `com.hex-index.tag-articles` | qwen-batch | Qwen | Even :35 (shares slot with article-rewrite, lock arbitrates) |
| `com.hex-index.build-weekly` | auto-deploy | No | Thursday 23:00 |
| `com.hex-index.send-weekly` | auto-deploy | No | Friday 07:30 |

### Auto-Deploy

The `auto-deploy.sh` script runs from the `auto-deploy` clone. It's called by:
- `build-weekly.sh` (Thursday night)
- `friday-publish.sh` (Friday morning)
- Claude ops loop (on-demand when changes detected)

It does NOT run on a timer. Instead, the Claude ops loop triggers it when needed (see below).

---

## Claude Loops

Claude loops run in tmux sessions using the Max subscription (`claude --dangerously-skip-permissions`). They use `/loop` for recurring execution. Each loop runs in its own clone.

### Important Constraints

- **Claude loops NEVER start Ollama/Qwen jobs.** GPU work is launchctl only.
- **Claude loops NEVER push directly to main.** All code changes go through PRs.
- **Claude loops use worktrees** within their clone for any code changes.
- **Claude loops are aware of each other** via Discord coordination.
- **Each loop runs in a separate tmux session** with a descriptive name.

### Loop 1: Ops Loop (`claude-ops`)

**Clone:** `~/vibe/hex-index-clones/claude-ops`
**Tmux session:** `claude-ops`
**Interval:** Every 30 minutes
**Purpose:** The operational backbone. Keeps everything running smoothly.

#### Prompt: `tools/claude-loop/ops-prompt.md`

```markdown
# Hex Index Ops Loop

You are the operations manager for hex-index. Every 30 minutes, you ensure
everything is running smoothly. You do NOT create content --- you keep the
system healthy.

## 1. PR Pipeline (highest priority)

```bash
gh pr list --state open --json number,title,statusCheckRollup,reviews,createdAt,autoMergeRequest
```

For each open PR:
- **All checks green, no unresolved reviews** --> merge it: `gh pr merge --squash <number>`
- **Checks failing** --> read the failure, fix it in a worktree, push to the PR branch
- **Claude/Gemini review feedback** --> read it: `npx tsx tools/github/pr-comments.ts --pr <number> --claude`
  - Security issues: fix immediately
  - Style/test suggestions: fix if quick, otherwise note and move on
- **Stale PR (>24h)** --> investigate, fix or close with explanation
- **Draft PRs** --> skip (someone is working on it)

## 2. Main Branch Health

```bash
gh run list --limit 5 --json conclusion,name,headBranch
```

If main is red:
1. Check Discord: `npm run discord:read -- --filter "main"`
2. Post you're on it: `npm run discord:send -- --message "Ops: fixing main branch CI"`
3. Fix via PR from a worktree (never push directly)

## 3. Clone Sync

Keep all clones up to date with origin/main. For each clone:

```bash
for clone in qwen-batch auto-deploy claude-editorial claude-ops claude-epub; do
  dir="$HOME/vibe/hex-index-clones/$clone"
  if [ -d "$dir" ]; then
    echo "=== $clone ==="
    cd "$dir"
    # Check for uncommitted changes
    if ! git diff --quiet || ! git diff --quiet --cached; then
      echo "WARNING: $clone has uncommitted changes"
      git stash list
      git status --short
    else
      git checkout main 2>/dev/null
      git pull --ff-only 2>/dev/null || echo "WARN: $clone cannot fast-forward"
    fi
    # Check for stale worktrees
    git worktree list
  fi
done
```

- If a clone has uncommitted changes: commit them to a branch, push, create PR
- If a clone has stale worktrees (merged PR, no activity): `git worktree remove <path>`
- If a clone has stale branches: delete if merged, investigate if not
- **Never discard uncommitted work.** Always commit and push first.
- If `package-lock.json` changed after pull: `npm ci`

## 4. Stash Cleanup

Stashes are invisible and dangerous. For each clone:
```bash
git stash list
```
If stashes exist:
- Apply each one to a new branch
- Commit, push, create a PR or issue
- Drop the stash only after the commit is pushed to origin

## 5. GPU Status Check

```bash
$HOME/vibe/sea-gang/tools/svc ls
```

- Verify the expected Qwen job is running (check even/odd hour schedule)
- If a job appears stuck (running >30 min), note it but **do not kill it** --- the timeout mechanism handles this
- If Ollama is loaded but no job should be running, that's fine (model stays warm)
- **Never start or stop GPU services.** That's launchctl's job.

## 6. Deploy Trigger

Check if the static site needs regeneration:
```bash
psql "$DATABASE_URL" -c "
  SELECT COUNT(*) as changed
  FROM app.articles
  WHERE updated_at > (
    SELECT COALESCE(MAX(created_at), '1970-01-01')
    FROM app.weekly_consolidated
  )
"
```

If content has changed since last deploy:
```bash
cd ~/vibe/hex-index-clones/auto-deploy
git checkout main && git pull --ff-only
bash tools/cron/auto-deploy.sh
```

## 7. Issue Triage

```bash
gh issue list --state open --json number,title,labels,assignees,updatedAt --jq '.[] | select(.assignees | length == 0)'
```

- Unassigned issues: assign to `@me` if actionable, or label `needs-triage`
- In-progress issues with no PR after 48h: investigate
- Blocked issues: check if blocker is resolved

## 8. Rate Limit Check

```bash
npm run gh:rate-limit
```

If <100 requests remaining, scale back PR operations until reset.

## Working Style

- **Terse output.** Log what you did, not what you're about to do.
- **One fix per cycle.** Don't try to fix everything at once.
- **Post to Discord** after significant actions: `npm run discord:send -- --message "Ops: <action>"`
- **All code changes through PRs** via worktrees within this clone.
- **Never touch GPU services.** Observe only.
```

### Loop 2: Editorial Loop (`claude-editorial`)

**Clone:** `~/vibe/hex-index-clones/claude-editorial`
**Tmux session:** `claude-editorial`
**Interval:** Every 2 hours
**Purpose:** Content quality. Reviews, rewrites, fixes editorial issues.

#### Prompt: `tools/claude-loop/editorial-prompt.md` (Updated)

The existing editorial prompt is mostly good. Key changes:

1. **Remove PR merge authority** --- that's now the ops loop's job
2. **Remove deploy trigger** --- that's now the ops loop's job
3. **Add clone awareness** --- work in `claude-editorial` clone, use worktrees for code changes
4. **Sharpen epub review** --- more specific quality criteria
5. **Add commentary polish** --- Claude rewrites Qwen's output to match guidelines

```markdown
# Hex Index Editorial Loop

You are the developmental contributing editor for hex-index. Every 2 hours,
you review and improve content quality. You do NOT manage PRs, deployments,
or infrastructure --- the ops loop handles that.

## Priority 1: Friday Epub Review (Thu 23:00 -- Fri 07:30 only)

If today is Thursday after 23:00 or Friday before 07:30:

The weekly epub has been built and needs editorial review before it goes to
subscribers at 07:30 CT. This is your highest priority.

### Epub Structure Review

```bash
# Find the current week's epub
ls docs/weekly/ | sort | tail -5
```

The epub should read like The Week magazine:
1. **Opening section**: 2-3 biggest stories of the week (politics, economics, global)
2. **Ideas & Commentary**: Thought-provoking analysis pieces
3. **Culture & Science**: Lighter but substantive pieces
4. **Deep Dives**: The Wikipedia explorations that enrich the articles
5. **Books**: Curated affiliate recommendations that connect to the week's themes

Check the Table of Contents. Is it ordered well? Does it tell a story of the week?

### Per-Article Quality Check

For each article in the epub, read the full HTML and verify:

- **Hook**: Does the opening paragraph grab you? Would you keep reading?
- **Voice**: Third person, commentary style. Not summary, not developmental editing.
- **Direct quotes**: 4-8 attributed quotes from the original author. "Smith writes..."
- **Counterpoints**: At least one opposing view acknowledged.
- **Bottom Line**: A `## Bottom Line` section that synthesizes.
- **Typography**: Varied sentence/paragraph length. Section headings. Pull quotes in `<blockquote>`.
- **Speechify flow**: Read it mentally as audio. Awkward transitions? Redundant phrases?
  Jargon that needs spelling out? Acronyms that need expansion?
- **Clean HTML**: Semantic tags only. No empty `<p>`, no widget cruft, no stray CSS.

### Fixing Issues

Edit rewrite files directly:
```bash
# Find the rewrite file
psql "$DATABASE_URL" -c "SELECT id, title, rewritten_content_path FROM app.articles WHERE id = '<id>'"
```

Edit `library/rewrites/<publication>/<slug>.html` with fixes. The auto-deploy service
will pick up changes within 30 minutes, or for urgent Friday fixes:
```bash
cd ~/vibe/hex-index-clones/auto-deploy
bash tools/cron/auto-deploy.sh
```

## Priority 2: Polish Qwen Commentary (Recent 7 Days)

Qwen writes good first-draft commentary. Claude makes it great.

```bash
psql "$DATABASE_URL" -c "
  SELECT a.id, a.title, p.name as publication, a.rewritten_content_path,
         a.updated_at
  FROM app.articles a
  JOIN app.publications p ON a.publication_id = p.id
  WHERE a.rewritten_content_path IS NOT NULL
    AND a.published_at > NOW() - INTERVAL '7 days'
  ORDER BY a.published_at DESC
  LIMIT 10;
"
```

For each recent rewrite:
1. Read the HTML file
2. Run the commentary audit: `npx tsx tools/jobs/commentary-audit.ts --article-id <id>`
3. If score < 80 or if you notice quality issues, edit the file directly:
   - Strengthen the hook paragraph
   - Add missing counterpoints
   - Improve quote attribution ("writes" not just floating quotes)
   - Vary sentence rhythm (mix 5-word punches with longer analytical sentences)
   - Ensure the Bottom Line is a synthesis, not a summary
   - Fix any first-person slips
4. Do NOT mark articles dirty or trigger re-processing --- edit in place

## Priority 3: Content Gaps

```bash
psql "$DATABASE_URL" -c "
  SELECT a.id, a.title, a.rewritten_content_path IS NOT NULL as has_rewrite,
         a.image_path IS NOT NULL as has_image,
         (SELECT count(*) FROM app.article_wikipedia_links awl WHERE awl.article_id = a.id) as wiki_count,
         jsonb_array_length(COALESCE(a.affiliate_links, '[]'::jsonb)) as affiliate_count,
         (SELECT count(*) FROM app.article_tags at2 WHERE at2.article_id = a.id) as tag_count
  FROM app.articles a
  WHERE a.published_at > NOW() - INTERVAL '7 days'
  ORDER BY a.published_at DESC;
"
```

Fix the highest-impact gap:
- **Missing rewrite**: Mark dirty so next Qwen cycle picks it up:
  `UPDATE app.articles SET rewritten_content_path = NULL WHERE id = '<id>'`
- **Missing Wikipedia** (wiki_count < 3): `npx tsx tools/jobs/wikipedia-discover.ts --use-claude --article-id <id>`
- **Missing image**: `npx tsx tools/jobs/generate-images.ts --article-id <id>`
- **Missing tags**: `npx tsx tools/jobs/tag-articles.ts --article-id <id>`
- **Missing affiliate links with book mentions**: Check `content/unresolved-mentions.json`

## Priority 4: Verify Production Site

After any content changes:
```bash
curl -s -o /dev/null -w "%{http_code}" https://bedwards.github.io/hex-index/
```

Spot-check a recent article page renders correctly.

## Working Style

- **Quality over quantity.** 1 article polished to perfection > 5 articles touched lightly.
- **Edit in place** for content fixes (HTML files in library/).
- **Use worktrees** within this clone for code changes.
- **Never touch GPU services.** Never start Qwen jobs.
- **Post to Discord** after editorial work: `npm run discord:send -- --message "Editorial: polished 3 articles for Friday epub"`
```

### Loop 3: Epub Review Loop (`claude-epub`)

**Clone:** `~/vibe/hex-index-clones/claude-epub`
**Tmux session:** `claude-epub`
**Interval:** Every 1 hour (runs Thu 22:00 -- Fri 07:00 only)
**Purpose:** Intensive epub review during the pre-publish window.

This is a special-purpose loop that starts Thursday evening and stops Friday morning. It runs more frequently than the editorial loop and focuses exclusively on epub quality.

#### Prompt: `tools/claude-loop/epub-prompt.md`

```markdown
# Hex Index Epub Review Loop

You are reviewing the weekly epub for publication to subscribers at 07:30 CT Friday.
This is a time-sensitive, intensive review. You run every hour from Thursday evening
through Friday morning.

## Check: Is It Epub Season?

```bash
day=$(date +%a)  # Mon, Thu, Fri
hour=$(date +%H)
if [ "$day" = "Thu" ] && [ "$hour" -ge "22" ]; then
  echo "ACTIVE: Thursday evening review window"
elif [ "$day" = "Fri" ] && [ "$hour" -lt "7" ]; then
  echo "ACTIVE: Friday morning review window"
else
  echo "INACTIVE: Not epub season. Sleeping."
  exit 0
fi
```

If inactive, do nothing. Wait for next cycle.

## The Week Magazine Standard

The epub must read like a curated weekly magazine. Each issue tells the story
of the week through carefully ordered sections.

### Table of Contents Order

1. **Lead stories** (2-3): The week's most consequential events or ideas
2. **Analysis** (2-3): Deeper dives into policy, economics, strategy
3. **Ideas** (2-3): Intellectual commentary, philosophy, culture
4. **Science & Tech** (1-2): When available
5. **Deep Dives** (2-3): The best Wikipedia explorations from this week
6. **Recommended Reading**: Affiliate book picks that connect to themes

Review the TOC. Does the ordering make narrative sense? Would a reader feel
guided through the week's intellectual landscape?

### Per-Article Checklist

For each article, verify:

- [ ] Opening hook is compelling (would you keep reading?)
- [ ] Third person throughout (no "I", "we", "you" outside quotes)
- [ ] 4-8 direct quotes attributed to original author
- [ ] At least 1 counterpoint or alternative perspective
- [ ] Bottom Line section that synthesizes (not summarizes)
- [ ] Varied paragraph length (1-sentence punches mixed with longer analysis)
- [ ] Section headings break up the text
- [ ] At least 1 blockquote for visual/audio emphasis
- [ ] No jargon without explanation
- [ ] No acronyms without first spelling out
- [ ] Clean HTML (no empty tags, no widget artifacts)
- [ ] Speechify-ready (reads well as audio when you imagine it aloud)

### Fix Everything You Find

Edit files directly in `library/rewrites/`. After each batch of fixes:
```bash
cd ~/vibe/hex-index-clones/auto-deploy
bash tools/cron/auto-deploy.sh
```

### Quality Log

After each review cycle, record what you found and fixed:
```bash
npm run discord:send -- --message "Epub review: checked N articles, fixed X issues. Quality: [good/needs-work/ready]"
```
```

### Loop Scheduling: Starting and Stopping

#### Startup Script: `tools/ops/start-loops.sh`

```bash
#!/bin/bash
# Start all Claude loops in their respective clones
# Run once after machine restart or when loops need refresh

set -euo pipefail

BASE="$HOME/vibe/hex-index-clones"

start_loop() {
  local name=$1
  local clone=$2
  local prompt=$3
  local interval=$4

  # Kill existing session
  tmux kill-session -t "$name" 2>/dev/null || true

  # Start new tmux session in the clone directory
  tmux new-session -d -s "$name" -c "$BASE/$clone"
  sleep 2
  tmux send-keys -t "$name" "claude --dangerously-skip-permissions" Enter
  sleep 5
  tmux send-keys -t "$name" "/loop $interval $prompt" Enter

  echo "Started $name (every $interval) in $BASE/$clone"
}

# Ops loop: every 30 minutes
start_loop "claude-ops" "claude-ops" "tools/claude-loop/ops-prompt.md" "30m"

# Editorial loop: every 2 hours
start_loop "claude-editorial" "claude-editorial" "tools/claude-loop/editorial-prompt.md" "2h"

echo ""
echo "Active tmux sessions:"
tmux ls
echo ""
echo "Attach with: tmux attach -t <session-name>"
```

#### Friday Epub Startup: `tools/ops/start-epub-review.sh`

```bash
#!/bin/bash
# Start the epub review loop Thursday evening
# Called manually or by a launchctl job at Thu 22:00

set -euo pipefail

BASE="$HOME/vibe/hex-index-clones"

tmux kill-session -t "claude-epub" 2>/dev/null || true
tmux new-session -d -s "claude-epub" -c "$BASE/claude-epub"
sleep 2
tmux send-keys -t "claude-epub" "claude --dangerously-skip-permissions" Enter
sleep 5
tmux send-keys -t "claude-epub" "/loop 1h tools/claude-loop/epub-prompt.md" Enter

echo "Epub review loop started. Will run until Friday 07:00."
echo "Attach with: tmux attach -t claude-epub"
```

#### Stop Epub Review: `tools/ops/stop-epub-review.sh`

```bash
#!/bin/bash
# Stop the epub review loop Friday morning after send-weekly runs
tmux kill-session -t "claude-epub" 2>/dev/null || true
echo "Epub review loop stopped."
```

---

## Interactive Sessions (Brian's Workspace)

### Claude Code TUI

**Directory:** `~/hex-index` (the original clone)
**Purpose:** Ad-hoc feature work, bug fixes, conversations with Brian

This is Brian's primary workspace. It:
- Uses worktrees for code changes (Agent with `isolation: "worktree"`)
- Creates PRs for all changes
- Never conflicts with clones because it's a separate `.git`

### Antigravity

**Directory:** `~/hex-index` (same directory, different tool)
**Purpose:** Visual development, UI work, browsing

Antigravity and Claude Code can share the same directory because:
- They don't modify files simultaneously (Brian switches between them)
- Both use git branches/worktrees for isolation
- Both create PRs for changes

### Avoiding Conflicts

- Brian's interactive sessions work on feature branches
- Automated clones stay on main
- All changes merge through PRs
- Branch protection prevents direct pushes
- Auto-merge handles the queue

---

## Complete Schedule

### Launchctl (Always Running)

| Time | Job | Clone | GPU |
|------|-----|-------|-----|
| Every 5m | postgres-watchdog | N/A | No |
| Every hour :00 | ingest | qwen-batch | No |
| Even :00 | yt-ingest | qwen-batch | No |
| Even :00 | gen-images | qwen-batch | No (Gemini API) |
| Even :05 | wiki-discover | qwen-batch | Qwen 25m |
| Even :35 | article-rewrite | qwen-batch | Qwen 25m |
| Odd :05 | wiki-rewrite | qwen-batch | Qwen 25m |
| Odd :35 | affiliate-suggest | qwen-batch | Qwen 25m |
| Thu 23:00 | build-weekly | auto-deploy | No |
| Fri 07:30 | send-weekly | auto-deploy | No |

### Claude Loops (tmux, Max Subscription)

| Session | Clone | Interval | Active |
|---------|-------|----------|--------|
| claude-ops | claude-ops | 30m | Always |
| claude-editorial | claude-editorial | 2h | Always |
| claude-epub | claude-epub | 1h | Thu 22:00 -- Fri 07:00 |

### Interactive (Ad Hoc)

| Tool | Directory | Purpose |
|------|-----------|---------|
| Claude Code TUI | ~/hex-index | Brian's primary dev |
| Antigravity | ~/hex-index | Visual dev, UI work |

---

## GPU Timeline (24-Hour Example)

```
00:00  [ingest, yt-ingest, gen-images start]     no GPU
00:05  [wiki-discover starts]                     GPU: Qwen
00:30  [wiki-discover finishes]                   GPU: idle
00:35  [article-rewrite starts]                   GPU: Qwen
01:00  [article-rewrite finishes, ingest]         GPU: idle
01:05  [wiki-rewrite starts]                      GPU: Qwen
01:30  [wiki-rewrite finishes]                    GPU: idle
01:35  [affiliate-suggest starts]                 GPU: Qwen
02:00  [affiliate-suggest finishes, ingest]       GPU: idle
02:05  [wiki-discover starts]                     GPU: Qwen
...pattern repeats...
```

Each Qwen job gets a clean 25-minute window. The 5-minute gap at the top of each hour ensures no overlap. The `flock` lock provides a safety net if any job runs long.

---

## Friday Pipeline (Detailed)

```
Thursday:
  22:00  start-epub-review.sh           Start epub review loop
  23:00  build-weekly (launchctl)        Consolidate + generate static site
  23:05  claude-epub loop fires          First epub review pass

Friday:
  00:05  claude-epub loop fires          Second review pass
  01:05  claude-epub loop fires          Third review pass
  ...continues hourly...
  05:00  friday-publish.sh (manual)      Pause GPU, final consolidation, deploy
  05:05  claude-epub loop fires          Final review after fresh deploy
  06:05  claude-epub loop fires          Last check
  07:00  stop-epub-review.sh            Stop epub loop
  07:30  send-weekly (launchctl)         Email + SMS to subscribers
```

### Why This Works

- **Thursday 23:00**: `build-weekly` generates the epub from current DB state
- **Thu 23:05 -- Fri 06:05**: Claude reviews 8+ times, fixing quality issues each pass
- **Friday 05:00**: `friday-publish` does a final consolidation with latest Qwen output, regenerates
- **Friday 05:05 -- 06:05**: Claude does 2 more passes on the final version
- **Friday 07:30**: Email/SMS goes out with a thoroughly reviewed epub

---

## Disaster Recovery

### Clone Gets Corrupted

```bash
# Nuclear option: re-clone
rm -rf ~/vibe/hex-index-clones/<name>
cd ~/vibe/hex-index-clones
git clone git@github.com:bedwards/hex-index.git <name>
cd <name> && npm ci
ln -sf ~/hex-index/.env .env
ln -sf ~/hex-index/.secrets .secrets
```

### Main Branch Breaks

1. Ops loop detects within 30 minutes
2. Posts to Discord
3. Creates a fix PR from a worktree
4. If ops loop can't fix it, Brian gets notified via Discord

### Qwen Job Hangs

1. `timeout` in the cron script kills it after the time budget
2. `flock` releases automatically
3. Next scheduled job picks up where it left off
4. Ops loop observes but does NOT intervene

### Merge Conflicts

1. Each clone stays on main and uses worktrees for changes
2. Worktrees target narrow, specific files
3. If a PR has merge conflicts, the ops loop attempts a rebase:
   ```bash
   gh pr checkout <n> && git rebase main
   ```
   - If the rebase **succeeds** (no conflicts), push with lease protection:
     ```bash
     git push --force-with-lease
     ```
   - If the rebase **fails** (conflict markers), abort immediately and file an issue:
     ```bash
     git rebase --abort
     npm run gh:issue -- --title "Rebase conflict on PR #<n>" \
       --labels "bug,ops-loop" \
       --body "Automated rebase of PR #<n> onto main failed with conflicts. Requires manual resolution."
     ```
   - **Never use `git push -f` or `git push --force`** — always use `git push --force-with-lease` to avoid overwriting concurrent work.
   - **Never force-push without human confirmation** when running inside the ops loop. If the push is non-trivial (e.g., rewriting history beyond a simple rebase), notify via Discord and wait for Brian to approve before proceeding.
4. Branch protection's `strict: true` ensures PRs are up-to-date before merge

### Lost Work

The ops loop actively prevents this:
- Checks all clones for uncommitted changes every 30 minutes
- Commits and pushes anything found
- Converts stashes to branches
- Cleans up merged worktrees

---

## Monitoring Checklist

The ops loop checks these every 30 minutes:

- [ ] Main branch CI is green
- [ ] No open PRs older than 24h
- [ ] All clones on main, up to date
- [ ] No stashes in any clone
- [ ] No orphaned worktrees
- [ ] GPU running expected job (or idle between jobs)
- [ ] GitHub API rate limit > 100
- [ ] Production site returns 200
- [ ] Discord messages sent for significant actions

---

## Migration Steps

### Phase 1: Setup Clones (Day 1)

1. Run `tools/ops/setup-clones.sh`
2. Verify each clone can `npm run typecheck` and `npm run test`
3. Update launchctl plists to use `qwen-batch` clone
4. Update `auto-deploy.sh` to run from `auto-deploy` clone

### Phase 2: Start Loops (Day 1)

1. Write the ops and epub prompt files
2. Run `tools/ops/start-loops.sh`
3. Monitor the first few cycles via `tmux attach -t claude-ops`
4. Verify ops loop can merge PRs, sync clones, check health

### Phase 3: Verify (Days 2-3)

1. Watch the system through one full even/odd hour cycle
2. Watch through one Friday epub pipeline
3. Check Discord for loop activity messages
4. Verify no git conflicts between clones

### Phase 4: Tune (Week 1)

1. Adjust loop intervals if too frequent/infrequent
2. Refine prompts based on actual loop behavior
3. Add any missing checks to ops loop
4. Polish epub review criteria

---

## Key Principles

1. **Clones for isolation, worktrees for PRs.** Long-running processes get their own clone. Short-lived code changes use worktrees within the clone.

2. **Separation of concerns.** Ops loop manages process. Editorial loop manages content. Epub loop manages the weekly publication. Qwen generates. Brian directs.

3. **GPU is sacred.** Only launchctl controls the GPU. Claude loops observe but never touch. The `flock` lock is the final safety net.

4. **Everything through PRs.** No direct pushes to main. Branch protection enforces this. Auto-merge handles the queue.

5. **Never lose work.** No stashes. No uncommitted changes left lying around. The ops loop actively prevents this every 30 minutes.

6. **Deterministic where possible, LLM where necessary.** Ingestion, static site generation, epub building, email sending --- all deterministic. Topic discovery, rewriting, commentary, affiliate suggestions --- LLM. Editorial polish --- Claude.

7. **The Week magazine standard.** The epub is a curated weekly magazine for real subscribers. Every issue must be polished, well-ordered, and a pleasure to read aloud via Speechify.
