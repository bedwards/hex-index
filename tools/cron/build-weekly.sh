#!/bin/bash
# Job: Build weekly Reader edition (regenerate static site + deploy)
# Runs Thursday night so epub is ready for Friday morning email

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOCK_FILE="$PROJECT_DIR/logs/build-weekly.lock"
LOG_FILE="$PROJECT_DIR/logs/build-weekly-$(date +%Y%m%d-%H%M%S).log"

mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"

log()  { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
die()  { echo "[$(date '+%H:%M:%S')] FATAL: $*" | tee -a "$LOG_FILE" >&2; exit 1; }

# Lock
exec 9>"$LOCK_FILE"
if ! flock -n 9; then log "Another build-weekly running. Exiting."; exit 0; fi
echo $$ >"$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"; exec 9>&-' EXIT

RUN_START=$(date +%s)
log "=== Build Weekly Reader Edition (PID $$) ==="

bash "$PROJECT_DIR/tools/cron/auto-deploy.sh" 2>&1 | tee -a "$LOG_FILE" || {
    EC=$?
    die "auto-deploy.sh failed (exit $EC)"
}

RUN_E=$(( $(date +%s) - RUN_START ))
log "=== Build Weekly complete ($(( RUN_E/60 ))m $(( RUN_E%60 ))s) ==="
ln -sf "$LOG_FILE" "$PROJECT_DIR/logs/build-weekly-latest.log"
find "$PROJECT_DIR/logs" -name "build-weekly-*.log" -not -name "build-weekly-latest.log" -mtime +7 -delete
