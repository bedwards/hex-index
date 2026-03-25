#!/bin/sh
set -eux
cd ~/vibe/hex-index-clones/claude-editorial
git checkout main
git pull --ff-only origin main
npm ci --silent
tmux new-session -d -s claude-editorial -c ~/vibe/hex-index-clones/claude-editorial
tmux send-keys -t claude-editorial "claude --dangerously-skip-permissions" Enter
sleep 5
tmux send-keys -t claude-editorial "/loop 2h tools/claude-loop/editorial-prompt.md" Enter
tmux attach -t claude-editorial
