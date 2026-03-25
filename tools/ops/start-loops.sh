#!/bin/bash
set -euo pipefail

SESSION="claude-loops"
CLONE="$HOME/vibe/hex-index-clones/claude-ops"

# Sync clone before starting
cd "$CLONE"
git checkout main 2>&1 | grep -v "Already on"
git pull --ff-only || git pull
npm ci --silent

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
