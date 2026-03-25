#!/bin/bash
# Job 5: Generate article images via Gemini API
# Self-budgeting: no GPU needed, runs independently of LLM jobs
# Generates in batches, deploys after each batch

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOCK_FILE="$PROJECT_DIR/logs/gen-images.lock"
LOG_FILE="$PROJECT_DIR/logs/gen-images-$(date +%Y%m%d-%H%M%S).log"

TIME_BUDGET=1200        # 20 minutes total
SECS_PER_ITEM=3         # ~3 sec per image (Gemini API + ImageMagick)
BATCH_SIZE=50           # Process in batches of 50

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

# Calculate total limit from time budget
PENDING=$(docker compose exec -T postgres psql -U postgres -d hex-index -t -c "
    SELECT COUNT(*) FROM app.articles WHERE image_path IS NULL AND content_path IS NOT NULL;
" 2>/dev/null | tr -d ' ')
TOTAL_LIMIT=$(( TIME_BUDGET / SECS_PER_ITEM ))
[ "$TOTAL_LIMIT" -gt "${PENDING:-0}" ] && TOTAL_LIMIT="${PENDING:-0}"
[ "$TOTAL_LIMIT" -lt 1 ] && { log "No articles need images"; exit 0; }
log "Pending: ${PENDING:-?}, Budget: ${TIME_BUDGET}s, Total limit: $TOTAL_LIMIT"

# Generate in batches
GENERATED=0
while [ "$GENERATED" -lt "$TOTAL_LIMIT" ]; do
    REMAINING=$(( TOTAL_LIMIT - GENERATED ))
    THIS_BATCH=$(( REMAINING > BATCH_SIZE ? BATCH_SIZE : REMAINING ))

    step_start "Image batch ($GENERATED-$(( GENERATED + THIS_BATCH )))"
    BEFORE=$(docker compose exec -T postgres psql -U postgres -d hex-index -t -c "SELECT COUNT(*) FROM app.articles WHERE image_path IS NOT NULL;" 2>/dev/null | tr -d ' ')

    timeout 300 npx tsx tools/jobs/generate-images.ts --limit "$THIS_BATCH" 2>&1 | tee -a "$LOG_FILE" || {
        EC=$?
        [ "$EC" -eq 124 ] && warn "Batch timed out" || warn "Batch failed (exit $EC)"
    }

    AFTER=$(docker compose exec -T postgres psql -U postgres -d hex-index -t -c "SELECT COUNT(*) FROM app.articles WHERE image_path IS NOT NULL;" 2>/dev/null | tr -d ' ')
    NEW_IMAGES=$(( AFTER - BEFORE ))
    GENERATED=$(( GENERATED + THIS_BATCH ))

    [ "$NEW_IMAGES" -eq 0 ] && { log "No more articles need images"; break; }
    step_done
done

RUN_E=$(( $(date +%s) - RUN_START ))
log "=== Job 5 complete ($(( RUN_E/60 ))m $(( RUN_E%60 ))s) ==="
ln -sf "$LOG_FILE" "$PROJECT_DIR/logs/gen-images-latest.log"
find "$PROJECT_DIR/logs" -name "gen-images-*.log" -not -name "gen-images-latest.log" -mtime +7 -delete
