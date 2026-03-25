#!/bin/sh
set -eux
cd ~/vibe/hex-index-clones/claude-ops
git checkout main
git pull --ff-only origin main
npm ci --silent
tmux new-session -d -s claude-ops -c ~/vibe/hex-index-clones/claude-ops
tmux send-keys -t claude-ops "claude --dangerously-skip-permissions" Enter
sleep 5
tmux send-keys -t claude-ops "/loop 30m tools/claude-loop/ops-prompt.md" Enter
tmux attach -t claude-ops
