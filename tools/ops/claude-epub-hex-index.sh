#!/bin/sh
set -eux
cd ~/vibe/hex-index-clones/claude-epub
git checkout main
git pull --ff-only origin main
npm ci --silent
tmux new-session -d -s claude-epub -c ~/vibe/hex-index-clones/claude-epub
tmux send-keys -t claude-epub "claude --dangerously-skip-permissions" Enter
sleep 5
tmux send-keys -t claude-epub "/loop 30m tools/claude-loop/epub-review-prompt.md" Enter
tmux attach -t claude-epub
