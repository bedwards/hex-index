#!/bin/sh
set -eux
cd ~/vibe/hex-index-clones/claude-quality
git checkout main
git pull --ff-only origin main
npm ci --silent
tmux new-session -d -s claude-quality -c ~/vibe/hex-index-clones/claude-quality
tmux send-keys -t claude-quality "claude --dangerously-skip-permissions" Enter
sleep 5
tmux send-keys -t claude-quality "/loop 2h tools/claude-loop/quality-audit-prompt.md" Enter
tmux attach -t claude-quality
