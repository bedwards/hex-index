#!/bin/bash
# Static site regeneration
# Checks if new ready articles exist and regenerates docs/ if needed.
# No LLM required. Fast and deterministic.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOCK_FILE="$PROJECT_DIR/logs/static-regen.lock"
LOG_FILE="$PROJECT_DIR/logs/static-regen-$(date +%Y%m%d-%H%M%S).log"

mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"

log()  { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
warn() { echo "[$(date '+%H:%M:%S')] WARN: $*" | tee -a "$LOG_FILE" >&2; }
die()  { echo "[$(date '+%H:%M:%S')] FATAL: $*" | tee -a "$LOG_FILE" >&2; exit 1; }

# Lock
exec 9>"$LOCK_FILE"
if ! flock -n 9; then log "Another static-regen running. Exiting."; exit 0; fi
echo $$ >"$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"; exec 9>&-' EXIT

RUN_START=$(date +%s)
log "=== Static Regen (PID $$) ==="

# Run the regen tool
npm run job:static-regen 2>&1 | tee -a "$LOG_FILE"

RUN_E=$(( $(date +%s) - RUN_START ))
log "=== Static Regen complete ($(( RUN_E/60 ))m $(( RUN_E%60 ))s) ==="
ln -sf "$LOG_FILE" "$PROJECT_DIR/logs/static-regen-latest.log"
find "$PROJECT_DIR/logs" -name "static-regen-*.log" -not -name "static-regen-latest.log" -mtime +7 -delete
