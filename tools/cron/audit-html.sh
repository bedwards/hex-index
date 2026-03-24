#!/bin/bash
# Audit and fix JSON metadata contamination in library HTML files.
# Runs daily at 03:30 UTC — after article-rewrite (02:05) and wiki-rewrite finish.
# Lightweight: no LLM, no Ollama, just deterministic regex cleanup.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOG_FILE="$PROJECT_DIR/logs/audit-html-$(date +%Y%m%d-%H%M%S).log"

mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"

log()  { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG_FILE"; }

log "=== Audit HTML (PID $$) ==="

# Run audit with --fix to auto-clean any contamination
npx tsx tools/jobs/audit-html.ts --fix --verbose 2>&1 | tee -a "$LOG_FILE"

EC=${PIPESTATUS[0]}
if [ "$EC" -ne 0 ]; then
    log "WARN: audit-html exited with $EC"
fi

log "=== Audit HTML complete ==="
ln -sf "$LOG_FILE" "$PROJECT_DIR/logs/audit-html-latest.log"
find "$PROJECT_DIR/logs" -name "audit-html-*.log" -not -name "audit-html-latest.log" -mtime +7 -delete
