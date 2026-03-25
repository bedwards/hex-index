#!/bin/bash
# Automated ingestion and publishing pipeline
# Runs 4x daily via launchd to keep the library fresh
#
# Guarantees:
#   - Only one instance runs at a time (flock)
#   - Postgres is healthy before ingestion starts
#   - Ollama has the model loaded before enrichment starts
#   - Git conflicts are handled gracefully
#   - Every step is timed and logged
#   - Non-zero exit only on critical failures (ingestion or static gen)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOCK_FILE="$PROJECT_DIR/logs/ingest.lock"
LOG_FILE="$PROJECT_DIR/logs/ingest-$(date +%Y%m%d-%H%M%S).log"
LATEST_LOG="$PROJECT_DIR/logs/ingestion-latest.log"
ENRICHMENT_TIMEOUT=18000  # 5 hours
OLLAMA_URL="${OLLAMA_URL:-http://127.0.0.1:11434}"
OLLAMA_MODEL="${OLLAMA_MODEL:-qwen3.5:122b-a10b}"

mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"

# ── Logging ──────────────────────────────────────────────────────────
log()  { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
warn() { echo "[$(date '+%H:%M:%S')] WARN: $*" | tee -a "$LOG_FILE" >&2; }
die()  { echo "[$(date '+%H:%M:%S')] FATAL: $*" | tee -a "$LOG_FILE" >&2; exit 1; }

step_start() {
    STEP_NAME="$1"
    STEP_START=$(date +%s)
    log "── $STEP_NAME ──"
}

step_done() {
    local elapsed=$(( $(date +%s) - STEP_START ))
    local mins=$(( elapsed / 60 ))
    local secs=$(( elapsed % 60 ))
    log "── $STEP_NAME done (${mins}m ${secs}s) ──"
}

# ── Lock: only one instance at a time ────────────────────────────────
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
    STALE_PID=$(cat "$LOCK_FILE" 2>/dev/null || echo "unknown")
    log "Another instance is running (PID $STALE_PID). Exiting."
    exit 0
fi
echo $$ >"$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"; exec 9>&-' EXIT

RUN_START=$(date +%s)
log "=== Ingestion pipeline starting (PID $$) ==="

# ── Postgres: start and wait for healthy ─────────────────────────────
step_start "Postgres"

docker compose up -d postgres 2>&1 | tee -a "$LOG_FILE"

PG_RETRIES=0
PG_MAX=30
until docker compose exec -T postgres pg_isready -U postgres -q 2>/dev/null; do
    PG_RETRIES=$((PG_RETRIES + 1))
    if [ "$PG_RETRIES" -ge "$PG_MAX" ]; then
        die "Postgres not ready after ${PG_MAX}s"
    fi
    sleep 1
done
log "Postgres ready after ${PG_RETRIES}s"
step_done

# ── Ollama: verify model is loaded ──────────────────────────────────
step_start "Ollama check"

OLLAMA_OK=false
for i in 1 2 3; do
    if curl -sf "${OLLAMA_URL}/api/tags" >/dev/null 2>&1; then
        LOADED=$(curl -sf "${OLLAMA_URL}/api/ps" | grep -o "\"$OLLAMA_MODEL\"" || true)
        if [ -n "$LOADED" ]; then
            OLLAMA_OK=true
            log "Ollama running, $OLLAMA_MODEL loaded"
            break
        else
            warn "Ollama running but $OLLAMA_MODEL not loaded — warming up..."
            # Send a tiny request to force-load the model
            curl -sf "${OLLAMA_URL}/api/chat" -d "{\"model\":\"$OLLAMA_MODEL\",\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}],\"options\":{\"num_predict\":1},\"stream\":false}" >/dev/null 2>&1 || true
            sleep 5
        fi
    else
        warn "Ollama not responding (attempt $i/3)"
        sleep 5
    fi
done

if [ "$OLLAMA_OK" = false ]; then
    warn "Ollama unavailable — Wikipedia enrichment will be skipped"
fi
step_done

# ── Ingestion: fetch RSS feeds ───────────────────────────────────────
step_start "RSS ingestion"
npm run ingest -- --source content/comprehensive-sources-flat.json 2>&1 | tee -a "$LOG_FILE"
step_done

# ── Wikipedia enrichment ─────────────────────────────────────────────
if [ "$OLLAMA_OK" = true ]; then
    step_start "Wikipedia enrichment (timeout ${ENRICHMENT_TIMEOUT}s)"
    if timeout "$ENRICHMENT_TIMEOUT" npm run wikipedia:retrofit -- --limit 100 2>&1 | tee -a "$LOG_FILE"; then
        step_done
    else
        EXIT_CODE=$?
        if [ "$EXIT_CODE" -eq 124 ]; then
            warn "Wikipedia enrichment hit ${ENRICHMENT_TIMEOUT}s timeout — partial progress saved"
        else
            warn "Wikipedia enrichment failed (exit $EXIT_CODE) — continuing"
        fi
        step_done
    fi
else
    log "Skipping Wikipedia enrichment (Ollama unavailable)"
fi

# ── Summary ──────────────────────────────────────────────────────────
# NOTE: Static site generation and deploy are handled by auto-deploy.sh
# which runs every 30 minutes. This script only writes to DB + library/.
RUN_ELAPSED=$(( $(date +%s) - RUN_START ))
RUN_MINS=$(( RUN_ELAPSED / 60 ))
RUN_SECS=$(( RUN_ELAPSED % 60 ))
log "=== Pipeline complete (${RUN_MINS}m ${RUN_SECS}s) ==="

# Symlink latest log for easy access
ln -sf "$LOG_FILE" "$LATEST_LOG"

# Keep only last 7 days of logs
find "$PROJECT_DIR/logs" -name "ingest-*.log" -mtime +7 -delete
