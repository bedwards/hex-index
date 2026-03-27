#!/bin/sh
# tools/ops/sync-clone.sh
# Shared clone sync logic with robust error handling.
# Usage: . tools/ops/sync-clone.sh && sync_clone /path/to/clone
#
# On ff-only failure, attempts git reset --hard origin/main.
# If reset also fails, creates a GitHub issue and exits non-zero.

sync_clone() {
  local clone_dir="$1"
  local clone_name
  clone_name="$(basename "$clone_dir")"

  cd "$clone_dir" || {
    echo "FATAL: clone directory does not exist: $clone_dir"
    return 1
  }

  git checkout main 2>/dev/null

  # Fetch latest from origin
  git fetch origin main

  # Attempt fast-forward pull
  if git pull --ff-only origin main 2>/dev/null; then
    return 0
  fi

  echo "WARNING: git pull --ff-only failed for $clone_name — clone has diverged from origin/main"
  echo "Attempting git reset --hard origin/main (clones should never have local changes on main)..."

  if git reset --hard origin/main; then
    echo "OK: reset $clone_name to origin/main successfully"
    return 0
  fi

  echo "FATAL: git reset --hard origin/main also failed for $clone_name"

  # Create a GitHub issue if the reset fails — npm may not be available,
  # so fall back to gh CLI directly
  if command -v gh >/dev/null 2>&1; then
    gh issue create \
      --title "ops: clone $clone_name failed to sync — manual intervention required" \
      --label "bug,priority:high" \
      --body "$(cat <<ISSUE_EOF
## Problem
Clone \`$clone_name\` at \`$clone_dir\` failed both \`git pull --ff-only\` and \`git reset --hard origin/main\`.

## Details
- **Clone**: \`$clone_dir\`
- **Host**: $(hostname)
- **Time**: $(date -u '+%Y-%m-%dT%H:%M:%SZ')
- **Branch**: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')
- **HEAD**: $(git rev-parse HEAD 2>/dev/null || echo 'unknown')
- **Status**:
\`\`\`
$(git status --short 2>/dev/null || echo 'git status failed')
\`\`\`

## Resolution
SSH into the machine and manually fix the clone:
\`\`\`bash
cd $clone_dir
git fetch origin
git reset --hard origin/main
\`\`\`
ISSUE_EOF
)" 2>/dev/null && echo "GitHub issue created for $clone_name sync failure" \
    || echo "WARNING: failed to create GitHub issue (gh CLI error)"
  else
    echo "WARNING: gh CLI not available — could not create GitHub issue"
  fi

  return 1
}
