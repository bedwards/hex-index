#!/bin/bash
# Job 2: Wikipedia topic discovery
# Self-budgeting: queries DB for pending work, caps --limit to fit TIME_BUDGET

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOCK_FILE="$PROJECT_DIR/logs/wiki-discover.lock"
LOG_FILE="$PROJECT_DIR/logs/wiki-discover-$(date +%Y%m%d-%H%M%S).log"
OLLAMA_URL="${OLLAMA_URL:-http://127.0.0.1:11434}"
OLLAMA_MODEL="${OLLAMA_MODEL:-qwen3.5:122b-a10b}"

# Tuning constants
TIME_BUDGET=600         # 10 minutes — fast job, runs first at :05, done by :15
SECS_PER_ITEM=10

mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"

log()  { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
warn() { echo "[$(date '+%H:%M:%S')] WARN: $*" | tee -a "$LOG_FILE" >&2; }
die()  { echo "[$(date '+%H:%M:%S')] FATAL: $*" | tee -a "$LOG_FILE" >&2; exit 1; }

step_start() { STEP_NAME="$1"; STEP_START=$(date +%s); log "── $STEP_NAME ──"; }
step_done()  { local e=$(( $(date +%s) - STEP_START )); log "── $STEP_NAME done ($(( e/60 ))m $(( e%60 ))s) ──"; }

# Per-job lock (non-blocking — only one instance)
exec 9>"$LOCK_FILE"
if ! flock -n 9; then log "Another wiki-discover running. Exiting."; exit 0; fi
echo $$ >"$LOCK_FILE"

# Shared LLM lock — wait up to 5 min for other LLM jobs to finish
LLM_LOCK="$PROJECT_DIR/logs/llm.lock"
exec 8>"$LLM_LOCK"
if ! flock -w 300 8; then log "LLM busy for 5 min. Skipping."; exit 0; fi

trap 'rm -f "$LOCK_FILE"; exec 9>&-; exec 8>&-' EXIT

RUN_START=$(date +%s)
log "=== Job 2: Wikipedia Discover (PID $$) ==="

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

# Ollama
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

# Calculate limit from time budget
PENDING=$(docker compose exec -T postgres psql -U postgres -d hex-index -t -c "
    SELECT COUNT(*) FROM app.articles a
    LEFT JOIN (SELECT article_id, COUNT(*) AS cnt FROM app.article_wikipedia_links GROUP BY article_id) wc ON wc.article_id = a.id
    WHERE a.content_path IS NOT NULL AND COALESCE(wc.cnt, 0) < 3;
" 2>/dev/null | tr -d ' ')
LIMIT=$(( TIME_BUDGET / SECS_PER_ITEM ))
[ "$LIMIT" -gt "${PENDING:-0}" ] && LIMIT="${PENDING:-0}"
[ "$LIMIT" -lt 1 ] && LIMIT=1
log "Pending: ${PENDING:-?}, Budget: ${TIME_BUDGET}s, Limit: $LIMIT (est $(( LIMIT * SECS_PER_ITEM / 60 ))m)"

# Run discovery
step_start "Topic discovery ($LIMIT articles)"
timeout "$TIME_BUDGET" npx tsx tools/jobs/wikipedia-discover.ts --limit "$LIMIT" 2>&1 | tee -a "$LOG_FILE" || {
    EC=$?
    [ "$EC" -eq 124 ] && warn "Hit time budget" || warn "Failed (exit $EC)"
}
step_done

RUN_E=$(( $(date +%s) - RUN_START ))
log "=== Job 2 complete ($(( RUN_E/60 ))m $(( RUN_E%60 ))s) ==="
ln -sf "$LOG_FILE" "$PROJECT_DIR/logs/wiki-discover-latest.log"
find "$PROJECT_DIR/logs" -name "wiki-discover-*.log" -not -name "wiki-discover-latest.log" -mtime +7 -delete
