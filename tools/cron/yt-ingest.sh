#!/bin/bash
# Job 6: YouTube ingest
# No LLM required. Scrapes YouTube channels for new videos/streams,
# extracts transcripts, stores to DB, generates static site, deploys.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOCK_FILE="$PROJECT_DIR/logs/yt-ingest.lock"
LOG_FILE="$PROJECT_DIR/logs/yt-ingest-$(date +%Y%m%d-%H%M%S).log"
TIME_BUDGET=600  # 10 minutes — no LLM needed

mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"

log()  { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
warn() { echo "[$(date '+%H:%M:%S')] WARN: $*" | tee -a "$LOG_FILE" >&2; }
die()  { echo "[$(date '+%H:%M:%S')] FATAL: $*" | tee -a "$LOG_FILE" >&2; exit 1; }

step_start() { STEP_NAME="$1"; STEP_START=$(date +%s); log "── $STEP_NAME ──"; }
step_done()  { local e=$(( $(date +%s) - STEP_START )); log "── $STEP_NAME done ($(( e/60 ))m $(( e%60 ))s) ──"; }

# Lock
exec 9>"$LOCK_FILE"
if ! flock -n 9; then log "Another yt-ingest running. Exiting."; exit 0; fi
echo $$ >"$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"; exec 9>&-' EXIT

RUN_START=$(date +%s)
log "=== Job 6: YouTube Ingest (PID $$) ==="

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

# YouTube ingest
step_start "YouTube ingestion"
npx tsx tools/jobs/yt-ingest.ts --source content/youtube-sources.json 2>&1 | tee -a "$LOG_FILE"
step_done

# Deploy (shared lock — regenerate, commit, push)
step_start "Deploy"
bash "$PROJECT_DIR/tools/cron/deploy.sh" "feat: youtube ingest $(date +%Y-%m-%d\ %H:%M)" 2>&1 | tee -a "$LOG_FILE"
step_done

RUN_E=$(( $(date +%s) - RUN_START ))
log "=== Job 6 complete ($(( RUN_E/60 ))m $(( RUN_E%60 ))s) ==="
ln -sf "$LOG_FILE" "$PROJECT_DIR/logs/yt-ingest-latest.log"
find "$PROJECT_DIR/logs" -name "yt-ingest-*.log" -not -name "yt-ingest-latest.log" -mtime +7 -delete
