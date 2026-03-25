#!/bin/bash
# Job 4: Article rewrite
# Self-budgeting: queries DB for pending rewrites, caps --limit to fit TIME_BUDGET

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOCK_FILE="$PROJECT_DIR/logs/article-rewrite.lock"
LOG_FILE="$PROJECT_DIR/logs/article-rewrite-$(date +%Y%m%d-%H%M%S).log"
OLLAMA_URL="${OLLAMA_URL:-http://127.0.0.1:11434}"
OLLAMA_MODEL="${OLLAMA_MODEL:-gpt-oss:120b}"

TIME_BUDGET=1500        # 25 minutes — fits even-hour Qwen slot
SECS_PER_ITEM=50

mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"

log()  { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
warn() { echo "[$(date '+%H:%M:%S')] WARN: $*" | tee -a "$LOG_FILE" >&2; }
die()  { echo "[$(date '+%H:%M:%S')] FATAL: $*" | tee -a "$LOG_FILE" >&2; exit 1; }

step_start() { STEP_NAME="$1"; STEP_START=$(date +%s); log "── $STEP_NAME ──"; }
step_done()  { local e=$(( $(date +%s) - STEP_START )); log "── $STEP_NAME done ($(( e/60 ))m $(( e%60 ))s) ──"; }

exec 9>"$LOCK_FILE"
if ! flock -n 9; then log "Another article-rewrite running. Exiting."; exit 0; fi
echo $$ >"$LOCK_FILE"

LLM_LOCK="$PROJECT_DIR/logs/llm.lock"
exec 8>"$LLM_LOCK"
if ! flock -w 300 8; then log "LLM busy for 5 min. Skipping."; exit 0; fi

trap 'rm -f "$LOCK_FILE"; exec 9>&-; exec 8>&-' EXIT

RUN_START=$(date +%s)
log "=== Job 4: Article Rewrite (PID $$) ==="

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

step_start "Ollama"
OLLAMA_OK=false
for i in 1 2 3; do
    if curl -sf "${OLLAMA_URL}/api/tags" >/dev/null 2>&1; then
        LOADED=$(curl -sf "${OLLAMA_URL}/api/ps" | grep -o "\"$OLLAMA_MODEL\"" || true)
        if [ -n "$LOADED" ]; then
            OLLAMA_OK=true; log "Ollama ready"; break
        else
            warn "Model not loaded, warming up..."
            curl -sf "${OLLAMA_URL}/api/chat" -d "{\"model\":\"$OLLAMA_MODEL\",\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}],\"options\":{\"num_predict\":1},\"keep_alive\":-1,\"stream\":false}" >/dev/null 2>&1 || true
            sleep 10
        fi
    else
        warn "Ollama not responding (attempt $i/3)"; sleep 5
    fi
done
[ "$OLLAMA_OK" = false ] && die "Ollama unavailable"
step_done

PENDING=$(docker compose exec -T postgres psql -U postgres -d hex-index -t -c "
    SELECT COUNT(*) FROM app.articles WHERE full_content_path IS NOT NULL AND (rewritten_content_path IS NULL OR rewrite_dirty = true);
" 2>/dev/null | tr -d ' ')
LIMIT=$(( TIME_BUDGET / SECS_PER_ITEM ))
[ "$LIMIT" -gt "${PENDING:-0}" ] && LIMIT="${PENDING:-0}"
[ "$LIMIT" -lt 1 ] && LIMIT=1
log "Pending rewrites: ${PENDING:-?}, Budget: ${TIME_BUDGET}s, Limit: $LIMIT (est $(( LIMIT * SECS_PER_ITEM / 60 ))m)"

step_start "Article rewrite ($LIMIT articles)"
timeout "$TIME_BUDGET" npx tsx tools/jobs/article-rewrite.ts --limit "$LIMIT" 2>&1 | tee -a "$LOG_FILE" || {
    EC=$?
    [ "$EC" -eq 124 ] && warn "Hit time budget" || warn "Failed (exit $EC)"
}
step_done

RUN_E=$(( $(date +%s) - RUN_START ))
log "=== Job 4 complete ($(( RUN_E/60 ))m $(( RUN_E%60 ))s) ==="
ln -sf "$LOG_FILE" "$PROJECT_DIR/logs/article-rewrite-latest.log"
find "$PROJECT_DIR/logs" -name "article-rewrite-*.log" -not -name "article-rewrite-latest.log" -mtime +7 -delete
