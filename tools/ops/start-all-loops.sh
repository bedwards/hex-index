#!/bin/sh
# Start all Claude loops in separate tmux sessions
# Usage: bash tools/ops/start-all-loops.sh
set -eu

CLONES="$HOME/vibe/hex-index-clones"

start_loop() {
  local name=$1
  local clone=$2
  local interval=$3
  local prompt=$4

  echo "=== Starting $name ==="

  # Kill existing session
  tmux kill-session -t "$name" 2>/dev/null || true

  # Update clone
  cd "$CLONES/$clone"
  git checkout main 2>/dev/null
  git pull --ff-only origin main
  npm ci --silent 2>/dev/null

  # Start session
  tmux new-session -d -s "$name" -c "$CLONES/$clone"
  tmux send-keys -t "$name" "claude --dangerously-skip-permissions" Enter
  sleep 5
  tmux send-keys -t "$name" "/loop $interval $prompt" Enter

  echo "  Started: /loop $interval $prompt"
}

start_loop "claude-ops"       "claude-ops"       "30m" "tools/claude-loop/ops-prompt.md"
start_loop "claude-editorial" "claude-editorial"  "2h"  "tools/claude-loop/editorial-prompt.md"
start_loop "claude-quality"   "claude-quality"    "2h"  "tools/claude-loop/quality-audit-prompt.md"
start_loop "claude-epub"      "claude-epub"       "30m" "tools/claude-loop/epub-review-prompt.md"
start_loop "claude-memory"    "claude-memory"     "24h" "tools/claude-loop/consolidate-memory-prompt.md"

echo ""
echo "All loops started. Sessions:"
tmux ls
echo ""
echo "Attach: tmux attach -t <name>"
echo "Refresh all (after 3-7 days): bash tools/ops/start-all-loops.sh"
