#!/bin/sh
set -eux
cd ~/vibe/hex-index-clones/claude-memory
git checkout main
git pull --ff-only origin main
npm ci --silent
tmux new-session -d -s claude-memory -c ~/vibe/hex-index-clones/claude-memory
tmux send-keys -t claude-memory "claude --dangerously-skip-permissions" Enter
sleep 5
tmux send-keys -t claude-memory "/loop 24h tools/claude-loop/consolidate-memory-prompt.md" Enter
tmux attach -t claude-memory
