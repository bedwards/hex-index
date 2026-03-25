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
  claude-ops/                         # Single Claude loops session (all automated tasks)
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

for name in qwen-batch auto-deploy claude-ops; do
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

## Claude Loops — Single Session Architecture

### One Session, One TUI, Many Tasks

All Claude loops run in **one tmux session** (`claude-loops`) with **one Claude TUI instance**. Brian controls this session. A single meta-scheduler loop dispatches focused tasks via background agents with worktrees, keeping each task's context window clean.

**Why one session:**
- Brian can `tmux attach -t claude-loops` and see everything
- No risk of multiple Claude sessions fighting over the same clone
- `/loop` auto-expires after 3 days; one session is easier to refresh
- Background agents with `isolation: "worktree"` provide the parallelism

**Clone:** `~/vibe/hex-index-clones/claude-ops` (single clone for all loop work)
**Tmux session:** `claude-loops`
**Meta-loop interval:** Every 20 minutes

### Important Constraints

- **Claude loops NEVER start Ollama/Qwen jobs.** GPU work is launchctl only.
- **Claude loops NEVER push directly to main.** All code changes go through PRs.
- **Every task spawns a background Agent** with `isolation: "worktree"` for a clean context window.
- **One task per cycle.** The scheduler picks the highest-priority task and runs it. No multi-tasking.
- **Tasks must be small and focused.** "Polish one article" not "review all articles." "Fix one failing PR" not "process all PRs."

### How to Start the Loops Session

From Brian's interactive Claude Code TUI (`~/hex-index`):

```
Hey Claude, start the loops session for me. Here's what to do:

1. Open a new tmux session called "claude-loops" in ~/vibe/hex-index-clones/claude-ops
2. Start Claude with --dangerously-skip-permissions
3. Run /loop 20m tools/claude-loop/scheduler-prompt.md
4. Confirm it's running with tmux ls
```

Or run the startup script:
```bash
bash tools/ops/start-loops.sh
```

To check on it:
```bash
tmux attach -t claude-loops    # Attach and watch
# Ctrl-B D to detach without stopping it
```

To restart after 3-day expiry:
```bash
bash tools/ops/start-loops.sh  # Kills old session, starts fresh
```

### Startup Script: `tools/ops/start-loops.sh`

```bash
#!/bin/bash
set -euo pipefail

SESSION="claude-loops"
CLONE="$HOME/vibe/hex-index-clones/claude-ops"

# Sync clone before starting
cd "$CLONE"
git checkout main 2>/dev/null
git pull --ff-only 2>/dev/null || git pull
npm ci --silent 2>/dev/null || true

# Kill existing session
tmux kill-session -t "$SESSION" 2>/dev/null || true

# Start fresh
tmux new-session -d -s "$SESSION" -c "$CLONE"
sleep 2
tmux send-keys -t "$SESSION" "claude --dangerously-skip-permissions" Enter
sleep 5
tmux send-keys -t "$SESSION" "/loop 20m tools/claude-loop/scheduler-prompt.md" Enter

echo "Claude loops session started: $SESSION"
echo "Attach: tmux attach -t $SESSION"
echo "Expires in ~3 days. Restart with: bash tools/ops/start-loops.sh"
```

### Meta-Loop Refresh

`/loop` expires after 3 days. A launchctl plist restarts the session automatically:

**Plist:** `com.hex-index.claude-loops-refresh`
**Schedule:** Every 2 days (172800 seconds)
**Action:** Runs `tools/ops/start-loops.sh`

This ensures the loops session never stays dead for long. Brian can also restart manually anytime.

---

### The Scheduler Prompt: `tools/claude-loop/scheduler-prompt.md`

This is the brain of the operation. Every 20 minutes, it picks the single highest-priority task and dispatches it as a background agent.

```markdown
# Hex Index Scheduler

You are the automated scheduler for hex-index.com, a curated news publication.
Every 20 minutes you pick ONE task, dispatch it as a background Agent with
`isolation: "worktree"`, and report what you did.

You run in ~/vibe/hex-index-clones/claude-ops. All code changes go through PRs.
You NEVER start Ollama/Qwen jobs. You NEVER push directly to main.

## Step 1: Check the Clock

```bash
echo "Day: $(date +%u) Hour: $(date +%H) Minute: $(date +%M)"
echo "Day name: $(date +%A)"
```

## Step 2: Pick ONE Task by Priority

Tasks are ordered by priority. Pick the FIRST one that has work to do.
Do NOT try to do multiple tasks in one cycle. Each task should take <15 minutes.

### P0: Fix Broken Main (if CI is red)

```bash
gh run list --branch main --limit 3 --json conclusion,name
```

If any check on main is failing, this overrides everything. Spawn an agent:
- Read the failure logs
- Create a fix PR from a worktree
- Post to Discord: "Scheduler: fixing broken main"

### P1: Epub Review (Thu 22:00 -- Fri 07:00 only)

Only active during the epub review window. If it's epub season, this is
the ONLY task you run — skip everything else.

Spawn an agent to review ONE article from the current epub:

```bash
psql "$DATABASE_URL" -c "
  SELECT wc.id, wc.week_label, wc.consolidated_content_path,
         wc.article_ids, wc.deep_dive_wikipedia_id
  FROM app.weekly_consolidated wc
  ORDER BY wc.created_at DESC
  LIMIT 5;
"
```

The agent should:
- Pick the next unreviewed article (track what was reviewed via Discord messages)
- Read the HTML, check against The Week magazine standard
- Fix issues: hook, voice (third person), quotes (4-8 attributed), counterpoints,
  Bottom Line section, typography, Speechify flow, clean HTML
- Edit files directly in library/rewrites/
- After fixes, trigger deploy: `cd ~/vibe/hex-index-clones/auto-deploy && bash tools/cron/auto-deploy.sh`
- Post to Discord: "Epub review: polished [article title], fixed [N] issues"

### P2: PR Pipeline (always)

```bash
gh pr list --state open --json number,title,statusCheckRollup,reviews,createdAt
```

Pick ONE PR to handle:
- **All checks green, approved** → merge: `gh pr merge --squash <number>`
- **Checks failing** → spawn agent to read failure, fix in the PR branch, push
- **Has Claude/Gemini review feedback** → spawn agent to address feedback
  (`npx tsx tools/github/pr-comments.ts --pr <number> --claude`)
- **Stale >24h** → investigate, fix or close with explanation
- **Draft** → skip

### P3: Issue Worker (pick one, work it to completion)

```bash
gh issue list --state open --json number,title,labels,assignees,updatedAt \
  --jq 'sort_by(.updatedAt) | reverse | .[:10]'
```

Pick ONE unassigned issue (or the highest-priority assigned-to-you issue).
Spawn an agent to:
1. Assign the issue: `gh issue edit <number> --add-assignee @me --add-label in-progress`
2. Read the issue description and understand the task
3. Implement the fix/feature in a worktree
4. Create a PR referencing the issue ("Closes #N" in the body)
5. Wait for CI + Claude/Gemini reviews (check in next cycle)
6. Do NOT try to merge in the same cycle — the PR pipeline (P2) handles merges

**Scope control:** If the issue is too large for one cycle, break it into sub-issues
and work on the smallest piece. Create issues for the remaining pieces.

### P4: Editorial — Polish One Article (recent content)

```bash
psql "$DATABASE_URL" -c "
  SELECT a.id, a.title, p.name as pub, a.rewritten_content_path, a.updated_at
  FROM app.articles a
  JOIN app.publications p ON a.publication_id = p.id
  WHERE a.rewritten_content_path IS NOT NULL
    AND a.published_at > NOW() - INTERVAL '7 days'
  ORDER BY a.updated_at ASC
  LIMIT 5;
"
```

Spawn an agent to pick the OLDEST-updated article and polish it:
- Run commentary audit: `npx tsx tools/jobs/commentary-audit.ts --article-id <id>`
- If score < 80, edit the HTML file directly in library/rewrites/
- Focus: hook paragraph, quote attribution, counterpoints, sentence rhythm,
  Bottom Line synthesis, first-person slips
- This is COMMENTARY on the article, not plagiarism. The rewrite must have
  its own analytical voice with attributed quotes from the original author.
- Post to Discord what was polished and the before/after audit score

### P5: Legacy Content Cleanup (older articles)

```bash
psql "$DATABASE_URL" -c "
  SELECT a.id, a.title, p.name as pub, a.rewritten_content_path,
         a.published_at, a.image_path IS NOT NULL as has_image,
         (SELECT count(*) FROM app.article_wikipedia_links awl WHERE awl.article_id = a.id) as wiki_count,
         jsonb_array_length(COALESCE(a.affiliate_links, '[]'::jsonb)) as affiliate_count
  FROM app.articles a
  JOIN app.publications p ON a.publication_id = p.id
  WHERE a.published_at < NOW() - INTERVAL '14 days'
    AND a.rewritten_content_path IS NOT NULL
  ORDER BY RANDOM()
  LIMIT 5;
"
```

Spawn an agent to pick ONE old article and bring it up to current standards:

**Check each of these — fix the first gap found:**

1. **Commentary vs plagiarism**: Read the rewrite. Is it original commentary with
   attributed quotes? Or does it just rephrase the original without attribution?
   If it reads like a summary or paraphrase, rewrite it as genuine commentary:
   hook → weave direct quotes ("Smith writes...") → counterpoints → Bottom Line.

2. **Missing features**: Does it have all 3 Wikipedia deep dives? An image?
   Affiliate links for any books mentioned? Tags? Fix the first missing item.

3. **HTML quality**: Run `npx tsx tools/jobs/audit-html.ts --article-id <id>`.
   Fix any Speechify-incompatible markup.

4. **Editorial guidelines**: Third person? Counterpoints? Varied typography?
   Run the commentary audit and fix if score < 80.

Only fix ONE article per cycle. Depth over breadth.

### P6: Backlog Grooming

```bash
gh issue list --state open --json number,title,labels,assignees,updatedAt,body \
  --jq 'sort_by(.updatedAt) | .[:20]'
```

Spawn an agent to do ONE of these (rotate between them):

**A. Close stale issues:**
- Issues with no activity for >14 days and no PR: close with explanation
- Issues labeled `blocked` where the blocker is resolved: remove label, update

**B. Create missing issues:**
- Check recent CI failures — any recurring patterns without an issue?
- Check `content/unresolved-mentions.json` — many unresolved? Create an issue
- Check for articles with no rewrite, no image, no tags — create batch issue
- Run `npm run gh:rate-limit` — if low, skip this step

**C. Prioritize and label:**
- Unassigned issues: label with priority (high/medium/low)
- Mislabeled issues: fix labels
- Duplicate issues: close the duplicate, link to the original

### P7: Ops Housekeeping

Rotate through these (one per cycle):

**A. Clone sync:**
```bash
for clone in qwen-batch auto-deploy claude-editorial claude-ops claude-epub; do
  dir="$HOME/vibe/hex-index-clones/$clone"
  cd "$dir"
  echo "=== $clone ==="
  git status --short
  git stash list
  git worktree list
  git checkout main 2>/dev/null && git pull --ff-only 2>/dev/null
done
```
- Uncommitted changes → commit to branch, push, create PR
- Stashes → apply to branch, push, drop stash
- Stale worktrees → remove if PR is merged
- Failed pull → investigate

**B. Deploy check:**
```bash
curl -s -o /dev/null -w "%{http_code}" https://bedwards.github.io/hex-index/
```
Spot-check a recent article renders correctly.

**C. Content gaps dashboard:**
```bash
psql "$DATABASE_URL" -c "
  SELECT
    COUNT(*) FILTER (WHERE rewritten_content_path IS NULL) as no_rewrite,
    COUNT(*) FILTER (WHERE image_path IS NULL AND rewritten_content_path IS NOT NULL) as no_image,
    COUNT(*) FILTER (WHERE NOT EXISTS (
      SELECT 1 FROM app.article_tags at2 WHERE at2.article_id = a.id
    )) as no_tags
  FROM app.articles a
  WHERE a.published_at > NOW() - INTERVAL '30 days';
"
```
Post dashboard to Discord if any counts are concerning.

**D. GPU observation:**
```bash
/Users/bedwards/vibe/sea-gang/tools/svc ls
```
- Verify expected job is running for current even/odd hour
- Note but do NOT intervene if stuck (timeout handles it)
- Never start or stop GPU services

**E. Rate limit check:**
```bash
npm run gh:rate-limit
```
If <100 remaining, post warning to Discord. Scale back PR operations.

## Step 3: Dispatch and Report

After picking a task:

1. **Spawn a background Agent** with `isolation: "worktree"` for code changes,
   or without isolation for read-only/content-edit tasks
2. **Wait for completion** (agents return results)
3. **Log to Discord**: `npm run discord:send -- --message "Scheduler [HH:MM]: <task> — <result>"`

Keep your own output minimal. The agents do the work. You coordinate.

## Schedule Awareness

The scheduler is aware of what runs when to avoid conflicts:

- **Even hours :05-:30**: wiki-discover is using Qwen GPU
- **Even hours :35-:60**: article-rewrite is using Qwen GPU
- **Odd hours :05-:30**: wiki-rewrite is using Qwen GPU
- **Odd hours :35-:60**: affiliate-suggest is using Qwen GPU
- **Thu 23:00**: build-weekly runs (auto-deploy clone)
- **Fri 07:30**: send-weekly runs (auto-deploy clone)

Claude tasks do NOT contend with GPU. But avoid running `auto-deploy.sh` while
`build-weekly` or `friday-publish` is running (check the lock file):
```bash
flock -n ~/hex-index/logs/auto-deploy.lock echo "deploy lock free" || echo "deploy locked"
```
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
- Is completely independent from the loops session

### Antigravity

**Directory:** `~/hex-index` (same directory, different tool)
**Purpose:** Visual development, UI work, browsing

Antigravity and Claude Code can share the same directory because:
- They don't modify files simultaneously (Brian switches between them)
- Both use git branches/worktrees for isolation
- Both create PRs for changes

### Three Sessions, No Conflicts

| Session | Directory | Purpose | Who Controls |
|---------|-----------|---------|-------------|
| Brian's Claude Code | ~/hex-index | Interactive dev | Brian |
| Antigravity | ~/hex-index | Visual IDE | Brian |
| claude-loops (tmux) | ~/vibe/hex-index-clones/claude-ops | Automated loops | Scheduler |

- Brian's sessions work on feature branches in `~/hex-index`
- The loops session works in a separate clone (`claude-ops`)
- All changes merge through PRs — branch protection prevents conflicts
- The loops session's background agents use worktrees within `claude-ops`

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
| Every 2 days | claude-loops-refresh | claude-ops | No |

### Claude Scheduler (single tmux session, single /loop 20m)

Every 20 minutes, picks ONE task by priority:

| Priority | Task | Scope | When |
|----------|------|-------|------|
| P0 | Fix broken main | One CI fix | If main is red |
| P1 | Epub review | One article | Thu 22:00 -- Fri 07:00 only |
| P2 | PR pipeline | One PR merge/fix | Always |
| P3 | Issue worker | One issue → PR | Always |
| P4 | Editorial polish | One recent article | Always |
| P5 | Legacy cleanup | One old article | Always |
| P6 | Backlog grooming | One grooming action | Always |
| P7 | Ops housekeeping | One maintenance task | Always |

### Interactive (Ad Hoc)

| Tool | Directory | Purpose |
|------|-----------|---------|
| Claude Code TUI | ~/hex-index | Brian's primary dev |
| Antigravity | ~/hex-index | Visual IDE |

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
  22:00  Scheduler detects epub season, switches to P1-only mode
  23:00  build-weekly (launchctl)        Consolidate + generate static site
  23:20  Scheduler: epub review pass 1   (one article)
  23:40  Scheduler: epub review pass 2   (next article)

Friday:
  00:00  Scheduler: epub review pass 3
  00:20  Scheduler: epub review pass 4
  ...continues every 20 min, one article per pass...
  05:00  friday-publish.sh (manual)      Pause GPU, final consolidation, deploy
  05:20  Scheduler: epub review (post-deploy check)
  05:40  Scheduler: epub review (final polish)
  06:00  Scheduler: epub review (last pass)
  07:00  Scheduler: epub season ends, resumes normal rotation
  07:30  send-weekly (launchctl)         Email + SMS to subscribers
```

### Why This Works Better Than Multiple Loops

- **~27 review passes** between Thu 22:00 and Fri 07:00 (one article per pass)
- Each pass has a **clean context window** (background agent with worktree)
- No coordination problems between separate loops
- Brian can see all activity in one tmux session
- The scheduler naturally handles priority — if main breaks during epub season,
  P0 overrides P1 and fixes main first, then resumes epub review

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

1. Scheduler detects within 20 minutes (P0 priority)
2. Posts to Discord
3. Spawns agent to create a fix PR from a worktree
4. If scheduler can't fix it, Brian gets notified via Discord

### Qwen Job Hangs

1. `timeout` in the cron script kills it after the time budget
2. `flock` releases automatically
3. Next scheduled job picks up where it left off
4. Scheduler observes (P7) but does NOT intervene

### Merge Conflicts

1. Each clone stays on main and uses worktrees for changes
2. Worktrees target narrow, specific files
3. If a PR has merge conflicts, scheduler (P2) rebases: `gh pr checkout <n> && git rebase main && git push -f`
4. Branch protection's `strict: true` ensures PRs are up-to-date before merge

### Lost Work

The scheduler (P7: ops housekeeping) actively prevents this:
- Checks all clones for uncommitted changes
- Commits and pushes anything found
- Converts stashes to branches
- Cleans up merged worktrees

---

## Monitoring Checklist

The scheduler cycles through these across P2-P7 tasks:

- [ ] Main branch CI is green (P0 if broken)
- [ ] No open PRs older than 24h (P2)
- [ ] All clones on main, up to date (P7-A)
- [ ] No stashes in any clone (P7-A)
- [ ] No orphaned worktrees (P7-A)
- [ ] GPU running expected job (P7-D, observe only)
- [ ] GitHub API rate limit > 100 (P7-E)
- [ ] Production site returns 200 (P7-B)
- [ ] Open issues triaged and labeled (P6)
- [ ] Recent articles meet editorial standards (P4)
- [ ] Legacy articles brought up to current standards (P5)
- [ ] Discord messages sent for significant actions (all tasks)

---

## Migration Steps

### Phase 1: Setup Clones (Day 1) -- DONE

1. ~~Run `tools/ops/setup-clones.sh`~~ Clones created manually
2. Verify each clone can `npm run typecheck` and `npm run test`
3. Update launchctl plists to use `qwen-batch` clone
4. Symlink `library/`, `logs/`, `.env`, `.secrets` in all clones -- DONE

### Phase 2: Write Scheduler Prompt (Day 1)

1. Create `tools/claude-loop/scheduler-prompt.md` from the plan above
2. Create `tools/ops/start-loops.sh`
3. Test the scheduler prompt manually first: start Claude in `claude-ops` clone,
   paste the prompt, verify it picks the right task

### Phase 3: Start Loops Session (Day 1)

1. Run `bash tools/ops/start-loops.sh`
2. `tmux attach -t claude-loops` and watch the first 2-3 cycles
3. Verify: agents spawn with worktrees, PRs get created, Discord gets messages
4. Detach and let it run

### Phase 4: Verify (Days 2-3)

1. Check Discord for scheduler activity messages
2. Watch through one full even/odd hour cycle (no GPU conflicts)
3. Watch through one Friday epub pipeline
4. Verify no git conflicts between clones
5. Confirm the 3-day refresh launchctl plist works

### Phase 5: Tune (Week 1)

1. Adjust 20m interval if too frequent/infrequent
2. Refine scheduler prompt based on actual behavior
3. Add task-specific prompts if agents need more guidance
4. Calibrate P5 (legacy cleanup) — how many old articles need work?
5. Monitor context window usage — is the meta-loop accumulating too much?

---

## Key Principles

1. **Clones for isolation, worktrees for PRs.** Long-running processes get their own clone. Short-lived code changes use worktrees within the clone. Background agents get clean context windows.

2. **One session, one scheduler.** All Claude automation runs in a single tmux session with a single `/loop 20m` meta-scheduler. The scheduler dispatches focused tasks as background agents. No multi-session coordination headaches.

3. **Small, focused tasks.** Each scheduler cycle does ONE thing well. "Polish one article" not "review all content." "Fix one failing PR" not "process all PRs." Depth over breadth.

4. **GPU is sacred.** Only launchctl controls the GPU. The scheduler observes but never touches. The `flock` lock is the final safety net.

5. **Everything through PRs.** No direct pushes to main. Branch protection enforces this. The scheduler merges PRs (P2), creates fix PRs (P0, P3), but never bypasses review.

6. **Never lose work.** No stashes. No uncommitted changes left lying around. The scheduler (P7) actively prevents this.

7. **Commentary, not plagiarism.** Article rewrites are original editorial commentary with attributed direct quotes from the original author. Not summaries. Not paraphrases. Not developmental editing. The legacy cleanup task (P5) specifically hunts for old articles that don't meet this standard.

8. **Deterministic where possible, LLM where necessary.** Ingestion, static site generation, epub building, email sending --- all deterministic code. Topic discovery, rewriting, commentary, affiliate suggestions --- Qwen. Editorial polish, issue work, quality review --- Claude.

9. **The Week magazine standard.** The epub is a curated weekly magazine for real subscribers. Every issue must be polished, well-ordered, and a pleasure to read aloud via Speechify. During epub season (Thu 22:00 -- Fri 07:00), the scheduler dedicates every cycle to epub review.
