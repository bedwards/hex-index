#!/bin/bash
# Job 1: Ingest RSS feeds, store in DB, generate static site, deploy
# No LLM required. Fast and deterministic.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOCK_FILE="$PROJECT_DIR/logs/ingest.lock"
LOG_FILE="$PROJECT_DIR/logs/ingest-$(date +%Y%m%d-%H%M%S).log"

mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"

log()  { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
warn() { echo "[$(date '+%H:%M:%S')] WARN: $*" | tee -a "$LOG_FILE" >&2; }
die()  { echo "[$(date '+%H:%M:%S')] FATAL: $*" | tee -a "$LOG_FILE" >&2; exit 1; }

step_start() { STEP_NAME="$1"; STEP_START=$(date +%s); log "── $STEP_NAME ──"; }
step_done()  { local e=$(( $(date +%s) - STEP_START )); log "── $STEP_NAME done ($(( e/60 ))m $(( e%60 ))s) ──"; }

# Lock
exec 9>"$LOCK_FILE"
if ! flock -n 9; then log "Another ingest running. Exiting."; exit 0; fi
echo $$ >"$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"; exec 9>&-' EXIT

RUN_START=$(date +%s)
log "=== Job 1: Ingest (PID $$) ==="

# Postgres (docker-compose.yml has restart: unless-stopped, so it auto-starts with Docker)
step_start "Postgres"
docker compose up -d postgres 2>&1 | tee -a "$LOG_FILE"
PG_RETRIES=0
until docker compose exec -T postgres pg_isready -U postgres -q 2>/dev/null; do
    PG_RETRIES=$((PG_RETRIES + 1))
    [ "$PG_RETRIES" -ge 30 ] && die "Postgres not ready after 30s"
    sleep 1
done
log "Postgres ready (${PG_RETRIES}s)"
step_done

# Migrate
step_start "Migrate"
npm run db:migrate 2>&1 | tee -a "$LOG_FILE"
step_done

# Ingest (no wikipedia enrichment)
step_start "RSS ingestion"
npm run ingest -- --source content/ingest-subscribed.json --no-enrich 2>&1 | tee -a "$LOG_FILE"
step_done

RUN_E=$(( $(date +%s) - RUN_START ))
log "=== Job 1 complete ($(( RUN_E/60 ))m $(( RUN_E%60 ))s) ==="
ln -sf "$LOG_FILE" "$PROJECT_DIR/logs/ingest-latest.log"
find "$PROJECT_DIR/logs" -name "ingest-*.log" -not -name "ingest-latest.log" -mtime +7 -delete
