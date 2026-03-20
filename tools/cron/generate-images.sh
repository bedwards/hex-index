#!/bin/bash
# Job 5: Generate article thumbnail images via Gemini
# No local LLM required — uses Gemini API

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOCK_FILE="$PROJECT_DIR/logs/gen-images.lock"
LOG_FILE="$PROJECT_DIR/logs/gen-images-$(date +%Y%m%d-%H%M%S).log"

mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"

log()  { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
warn() { echo "[$(date '+%H:%M:%S')] WARN: $*" | tee -a "$LOG_FILE" >&2; }
die()  { echo "[$(date '+%H:%M:%S')] FATAL: $*" | tee -a "$LOG_FILE" >&2; exit 1; }

step_start() { STEP_NAME="$1"; STEP_START=$(date +%s); log "── $STEP_NAME ──"; }
step_done()  { local e=$(( $(date +%s) - STEP_START )); log "── $STEP_NAME done ($(( e/60 ))m $(( e%60 ))s) ──"; }

exec 9>"$LOCK_FILE"
if ! flock -n 9; then log "Another gen-images running. Exiting."; exit 0; fi
echo $$ >"$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"; exec 9>&-' EXIT

RUN_START=$(date +%s)
log "=== Job 5: Generate Images (PID $$) ==="

# Postgres
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

# Generate images
step_start "Image generation"
timeout 3600 npx tsx tools/jobs/generate-images.ts --limit 200 2>&1 | tee -a "$LOG_FILE" || {
    EC=$?
    [ "$EC" -eq 124 ] && warn "Hit 2h timeout" || warn "Failed (exit $EC)"
}
step_done

# Static site + push
step_start "Static site"
npm run static:generate 2>&1 | tee -a "$LOG_FILE"
step_done

step_start "Publish"
if git diff --quiet docs/ && git diff --quiet --cached docs/; then
    log "No new content"
else
    git add docs/
    git commit -m "feat: article images $(date +%Y-%m-%d\ %H:%M)" 2>&1 | tee -a "$LOG_FILE"
    for i in 1 2 3; do
        if git push 2>&1 | tee -a "$LOG_FILE"; then break; fi
        git pull --rebase 2>&1 | tee -a "$LOG_FILE" || { git rebase --abort 2>/dev/null; warn "Rebase failed"; break; }
    done
fi
step_done

RUN_E=$(( $(date +%s) - RUN_START ))
log "=== Job 5 complete ($(( RUN_E/60 ))m $(( RUN_E%60 ))s) ==="
ln -sf "$LOG_FILE" "$PROJECT_DIR/logs/gen-images-latest.log"
find "$PROJECT_DIR/logs" -name "gen-images-*.log" -not -name "gen-images-latest.log" -mtime +7 -delete
