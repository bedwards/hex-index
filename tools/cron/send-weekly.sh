#!/bin/bash
# Job: Send weekly Reader email/text to subscribers
# Runs Friday morning — reads Google Sheet, sends via Gmail SMTP

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOCK_FILE="$PROJECT_DIR/logs/send-weekly.lock"
LOG_FILE="$PROJECT_DIR/logs/send-weekly-$(date +%Y%m%d-%H%M%S).log"

mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"

log()  { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
die()  { echo "[$(date '+%H:%M:%S')] FATAL: $*" | tee -a "$LOG_FILE" >&2; exit 1; }

# Lock
exec 9>"$LOCK_FILE"
if ! flock -n 9; then log "Another send-weekly running. Exiting."; exit 0; fi
echo $$ >"$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"; exec 9>&-' EXIT

RUN_START=$(date +%s)
log "=== Send Weekly Reader (PID $$) ==="

npx tsx tools/jobs/send-weekly.ts 2>&1 | tee -a "$LOG_FILE" || {
    EC=$?
    die "send-weekly.ts failed (exit $EC)"
}

RUN_E=$(( $(date +%s) - RUN_START ))
log "=== Send Weekly complete ($(( RUN_E/60 ))m $(( RUN_E%60 ))s) ==="
ln -sf "$LOG_FILE" "$PROJECT_DIR/logs/send-weekly-latest.log"
find "$PROJECT_DIR/logs" -name "send-weekly-*.log" -not -name "send-weekly-latest.log" -mtime +7 -delete
