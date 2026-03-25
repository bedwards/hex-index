#!/usr/bin/env bash
# Start the Claude editorial loop in a tmux session
# Run this every 3 days to refresh the session
#
# Usage: bash tools/claude-loop/start-session.sh
#    or: npm run claude:start

set -euo pipefail

SESSION="claude-editor"
PROJECT_DIR="/Users/bedwards/hex-index"
PROMPT_FILE="$PROJECT_DIR/tools/claude-loop/editorial-prompt.md"

if [ ! -f "$PROMPT_FILE" ]; then
  echo "ERROR: Editorial prompt not found at $PROMPT_FILE"
  exit 1
fi

# Kill existing session if any
tmux kill-session -t "$SESSION" 2>/dev/null || true

# Create new session
tmux new-session -d -s "$SESSION" -c "$PROJECT_DIR"

# Send the claude command
tmux send-keys -t "$SESSION" "claude" Enter

# Wait for Claude to start
sleep 5

# Send the loop command with the editorial prompt file path
tmux send-keys -t "$SESSION" "/loop 2h $PROMPT_FILE" Enter

echo "Claude editorial session started in tmux session '$SESSION'"
echo "Attach with: tmux attach -t $SESSION"
echo "Session will run for up to 3 days before needing refresh"
