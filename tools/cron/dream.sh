#!/bin/bash
# Memory consolidation — runs during Thursday consolidation window
set -euo pipefail
cd "$(dirname "$0")/../.."

echo "=== Dream: Memory Consolidation ==="
echo "Started: $(date)"

# Run dream via claude CLI
claude -p "Run /dream — consolidate all memory files, prune stale entries, resolve contradictions. Be thorough but fast." --no-input

echo "Completed: $(date)"
