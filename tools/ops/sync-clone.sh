#!/bin/bash
# tools/ops/sync-clone.sh
# Shared function for syncing a clone to origin/main with robust error handling.
# Source this file, then call: sync_clone /path/to/clone

sync_clone() {
  local clone_dir="${1:?sync_clone requires a directory argument}"

  cd "$clone_dir" || {
    echo "ERROR: cannot cd to $clone_dir"
    return 1
  }

  git checkout main 2>/dev/null

  echo "Syncing clone: $clone_dir"
  git fetch origin main

  if git pull --ff-only origin main; then
    echo "Clone synced successfully: $clone_dir"
    return 0
  fi

  echo "WARNING: git pull --ff-only failed in $clone_dir, resetting to origin/main"

  if git reset --hard origin/main; then
    echo "Reset to origin/main succeeded: $clone_dir"
    return 0
  fi

  echo "ERROR: git reset --hard origin/main also failed in $clone_dir"

  # File a GitHub issue so the failure is visible
  local repo_root
  repo_root="$(git rev-parse --show-toplevel 2>/dev/null || echo "$clone_dir")"
  if command -v npm >/dev/null 2>&1 && [ -f "$repo_root/package.json" ]; then
    (cd "$repo_root" && npm run gh:issue -- \
      --title "Clone sync failed: $clone_dir" \
      --labels "bug,priority:high") || true
  fi

  return 1
}
