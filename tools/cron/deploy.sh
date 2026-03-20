#!/bin/bash
# Shared deploy script — regenerate static site, commit, push
# All jobs call this instead of doing git operations directly
# Uses flock to ensure only one deploy at a time

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DEPLOY_LOCK="$PROJECT_DIR/logs/deploy.lock"
COMMIT_MSG="${1:-feat: auto-publish $(date +%Y-%m-%d\ %H:%M)}"

cd "$PROJECT_DIR"
mkdir -p "$PROJECT_DIR/logs"

exec 7>"$DEPLOY_LOCK"
flock 7  # Block until we get the lock (don't skip — we want to deploy)

# Pull latest first to avoid conflicts
git pull --rebase 2>&1 || {
    git rebase --abort 2>/dev/null || true
    # If rebase fails, stash our changes, pull, re-apply
    git stash 2>&1
    git pull 2>&1
    git stash pop 2>&1 || true
}

# Regenerate static site
npm run static:generate 2>&1

# Commit and push if there are changes
if ! git diff --quiet docs/ || ! git diff --quiet --cached docs/; then
    git add docs/
    git commit -m "$COMMIT_MSG" 2>&1

    for i in 1 2 3; do
        if git push 2>&1; then
            break
        fi
        git pull --rebase 2>&1 || { git rebase --abort 2>/dev/null; break; }
    done
fi

exec 7>&-
