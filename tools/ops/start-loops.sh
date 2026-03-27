#!/bin/bash
set -euo pipefail

SESSION="claude-loops"
CLONE="$HOME/vibe/hex-index-clones/claude-ops"

# Sync clone before starting
cd "$CLONE"
git checkout main 2>&1 | grep -v "Already on"
git pull --ff-only
npm ci --silent

# Kill existing session
tmux kill-session -t "$SESSION" 2>/dev/null || true

# Start fresh
tmux new-session -d -s "$SESSION" -c "$CLONE"

# Poll until tmux session is ready (up to 10s)
for i in $(seq 1 20); do
  tmux has-session -t "$SESSION" 2>/dev/null && break
  sleep 0.5
done
tmux has-session -t "$SESSION" 2>/dev/null || { echo "ERROR: tmux session failed to start"; exit 1; }

tmux send-keys -t "$SESSION" "claude --dangerously-skip-permissions" Enter

# Poll until claude process is running in the session (up to 30s)
for i in $(seq 1 60); do
  tmux list-panes -t "$SESSION" -F '#{pane_current_command}' 2>/dev/null | grep -q claude && break
  sleep 0.5
done
tmux list-panes -t "$SESSION" -F '#{pane_current_command}' 2>/dev/null | grep -q claude || { echo "ERROR: claude failed to start"; exit 1; }

tmux send-keys -t "$SESSION" "/loop 20m tools/claude-loop/scheduler-prompt.md" Enter

echo "Claude loops session started: $SESSION"
echo "Attach: tmux attach -t $SESSION"
echo "Expires in ~3 days. Restart with: bash tools/ops/start-loops.sh"
