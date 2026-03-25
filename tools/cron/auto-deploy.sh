#!/bin/bash
# Single deployer service — the ONLY thing that regenerates the static site
# and deploys to GitHub Pages. All other jobs write to DB + library/ only.
#
# Runs every 30 minutes via launchd, or called directly by build-weekly.sh
# and friday-publish.sh for immediate deploys.
#
# Flow:
#   1. Acquire lock (prevent racing with itself)
#   2. Pull latest main
#   3. Regenerate static site from DB
#   4. If docs/ changed: create branch, PR, auto-merge
#   5. Clean up

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOCK_FILE="$PROJECT_DIR/logs/auto-deploy.lock"
LOG_FILE="$PROJECT_DIR/logs/auto-deploy-$(date +%Y%m%d-%H%M%S).log"

mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"

log()  { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
warn() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] WARN: $*" | tee -a "$LOG_FILE" >&2; }
die()  { echo "[$(date '+%Y-%m-%d %H:%M:%S')] FATAL: $*" | tee -a "$LOG_FILE" >&2; exit 1; }

step_start() { STEP_NAME="$1"; STEP_START=$(date +%s); log "── $STEP_NAME ──"; }
step_done()  { local e=$(( $(date +%s) - STEP_START )); log "── $STEP_NAME done ($(( e/60 ))m $(( e%60 ))s) ──"; }

# ── Lock: only one auto-deploy at a time ────────────────────────────
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
    log "Another auto-deploy is running. Exiting."
    exit 0
fi
echo $$ >"$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"; exec 9>&-' EXIT

RUN_START=$(date +%s)
log "=== Auto-Deploy (PID $$) ==="

# ── Step 1: Get latest main ──────────────────────────────────────────
step_start "Pull latest main"
git checkout main 2>&1 | tee -a "$LOG_FILE"
git pull --rebase 2>&1 | tee -a "$LOG_FILE" || {
    warn "Rebase failed, aborting and retrying with merge"
    git rebase --abort 2>/dev/null || true
    git pull 2>&1 | tee -a "$LOG_FILE" || die "Cannot pull latest main"
}
step_done

# ── Step 2: Ensure Postgres is running ───────────────────────────────
step_start "Postgres"
docker compose up -d postgres 2>&1 | tee -a "$LOG_FILE"
PG_RETRIES=0
until docker compose exec -T postgres pg_isready -U postgres -q 2>/dev/null; do
    PG_RETRIES=$((PG_RETRIES + 1))
    [ "$PG_RETRIES" -ge 30 ] && die "Postgres not ready after 30s"
    sleep 1
done
log "Postgres ready (${PG_RETRIES}s)"
step_done

# ── Step 3: Regenerate static site ───────────────────────────────────
step_start "Static site generation"
npm run static:generate 2>&1 | tee -a "$LOG_FILE"
step_done

# ── Step 4: Check for changes ────────────────────────────────────────
if git diff --quiet docs/ && git diff --quiet --cached docs/; then
    log "Nothing to deploy — docs/ unchanged"
    RUN_E=$(( $(date +%s) - RUN_START ))
    log "=== Auto-Deploy complete, no changes ($(( RUN_E/60 ))m $(( RUN_E%60 ))s) ==="
    ln -sf "$LOG_FILE" "$PROJECT_DIR/logs/auto-deploy-latest.log"
    find "$PROJECT_DIR/logs" -name "auto-deploy-*.log" -not -name "auto-deploy-latest.log" -mtime +7 -delete
    exit 0
fi

log "Changes detected in docs/"
git diff --stat docs/ 2>&1 | tee -a "$LOG_FILE"

# ── Step 5: Create deploy branch ─────────────────────────────────────
BRANCH="deploy/auto-$(date +%Y%m%d-%H%M%S)"
step_start "Create branch $BRANCH"
git checkout -b "$BRANCH" 2>&1 | tee -a "$LOG_FILE"
git add docs/
git commit -m "$(cat <<'EOF'
chore: auto-deploy static site
EOF
)" 2>&1 | tee -a "$LOG_FILE"
step_done

# ── Step 6: Push and create PR ───────────────────────────────────────
step_start "Push and create PR"
git push -u origin "$BRANCH" 2>&1 | tee -a "$LOG_FILE"

PR_URL=$(gh pr create \
    --title "chore: auto-deploy static site" \
    --body "$(cat <<'EOF'
Automated static site regeneration from current DB state.

This PR was created by the auto-deploy service. It regenerates `docs/` from the current database and deploys to GitHub Pages.
EOF
)" 2>&1 | tee -a "$LOG_FILE" | tail -1)

log "PR created: $PR_URL"

# Extract PR number
PR_NUMBER=$(echo "$PR_URL" | grep -o '[0-9]*$')

# Admin merge — docs/ is generated output, doesn't need CI review
gh pr merge "$PR_NUMBER" --squash --admin 2>&1 | tee -a "$LOG_FILE" && MERGED=true || {
    warn "Admin merge failed, falling back to auto-merge"
    gh pr merge "$PR_NUMBER" --squash --auto 2>&1 | tee -a "$LOG_FILE" || warn "Auto-merge also failed"
    MERGED=false
}
step_done

# ── Step 8: Return to main ───────────────────────────────────────────
step_start "Return to main"
git checkout main 2>&1 | tee -a "$LOG_FILE"
if [ "$MERGED" = true ]; then
    git pull 2>&1 | tee -a "$LOG_FILE"
    # Clean up merged branch
    git branch -d "$BRANCH" 2>/dev/null || true
    git push origin --delete "$BRANCH" 2>/dev/null || true
    log "Cleaned up branch $BRANCH"
fi
step_done

# ── Summary ──────────────────────────────────────────────────────────
RUN_E=$(( $(date +%s) - RUN_START ))
log "=== Auto-Deploy complete ($(( RUN_E/60 ))m $(( RUN_E%60 ))s) ==="
ln -sf "$LOG_FILE" "$PROJECT_DIR/logs/auto-deploy-latest.log"
find "$PROJECT_DIR/logs" -name "auto-deploy-*.log" -not -name "auto-deploy-latest.log" -mtime +7 -delete
