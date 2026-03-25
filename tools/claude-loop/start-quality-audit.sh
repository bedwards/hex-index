#!/bin/bash
# Start a Claude Code quality audit loop (runs every 2 hours)
# Usage: Run in a tmux session
set -euo pipefail
cd "$(dirname "$0")/../.."

echo "Starting quality audit loop..."
echo "This will check Qwen-generated content every 2 hours."
echo "Run this in a tmux session. Press Ctrl+C to stop."

claude -p "$(cat tools/claude-loop/quality-audit-prompt.md)" --no-input
