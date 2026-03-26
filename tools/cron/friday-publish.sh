#!/bin/bash
# Friday morning epub pipeline
#
# Orchestrates the weekly Reader publication:
#   1. Pauses GPU (minimax) services
#   2. Runs consolidation (LLM — picks best articles per source, consolidates commentary)
#   3. Builds epub + deploys static site (deterministic)
#   4. Resumes GPU services
#
# Designed to run early Friday morning (e.g. 05:00 CT / 11:00 UTC).
# The send-weekly service handles email/text at 07:30 CT separately.
#
# Usage: bash tools/cron/friday-publish.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOCK_FILE="$PROJECT_DIR/logs/friday-publish.lock"
LOG_FILE="$PROJECT_DIR/logs/friday-publish-$(date +%Y%m%d-%H%M%S).log"
SVC="$HOME/vibe/sea-gang/tools/svc"

mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"

log()  { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
warn() { echo "[$(date '+%H:%M:%S')] WARN: $*" | tee -a "$LOG_FILE" >&2; }
die()  { echo "[$(date '+%H:%M:%S')] FATAL: $*" | tee -a "$LOG_FILE" >&2; exit 1; }

step_start() { STEP_NAME="$1"; STEP_START=$(date +%s); log "── $STEP_NAME ──"; }
step_done()  { local e=$(( $(date +%s) - STEP_START )); log "── $STEP_NAME done ($(( e/60 ))m $(( e%60 ))s) ──"; }

# Lock
exec 9>"$LOCK_FILE"
if ! flock -n 9; then log "Another friday-publish running. Exiting."; exit 0; fi
echo $$ >"$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"; exec 9>&-' EXIT

RUN_START=$(date +%s)
log "=== Friday Publish Pipeline (PID $$) ==="

# ── Step 1: Pause GPU services ─────────────────────────────────────
step_start "Pause GPU services"
GPU_SERVICES=(
    "com.hex-index.article-rewrite"
    "com.hex-index.wiki-discover"
    "com.hex-index.wiki-rewrite"
)
for svc_name in "${GPU_SERVICES[@]}"; do
    "$SVC" stop "$svc_name" 2>&1 | tee -a "$LOG_FILE" || warn "Failed to stop $svc_name"
done
log "GPU services paused"
step_done

# ── Step 2: Ensure Postgres is running ──────────────────────────────
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

# ── Step 3: Run migration for weekly_consolidated table ──────────
step_start "Run migration 009"
docker compose exec -T postgres psql -U postgres -d hex-index -f /dev/stdin < "$PROJECT_DIR/src/db/migrations/009_weekly_consolidated.sql" 2>&1 | tee -a "$LOG_FILE" || warn "Migration may already exist"
step_done

# ── Step 4: Consolidate articles by source (LLM step) ──────────
step_start "Consolidate weekly articles"
# This is the only LLM step — picks best articles per source and consolidates commentary
# Acquire LLM lock to prevent conflicts
LLM_LOCK="$PROJECT_DIR/logs/llm.lock"
exec 8>"$LLM_LOCK"
if ! flock -w 60 8; then warn "LLM busy for 60s, proceeding without consolidation"; else
    timeout 1800 npx tsx tools/jobs/consolidate-weekly.ts --force 2>&1 | tee -a "$LOG_FILE" || {
        EC=$?
        [ "$EC" -eq 124 ] && warn "Consolidation hit 30min budget" || warn "Consolidation failed (exit $EC)"
    }
fi
exec 8>&-
step_done

# ── Step 5: Build epub + deploy (fully deterministic) ────────────
step_start "Build weekly epub + deploy"
# Deployment is now handled by the Claude monitoring loop, which detects
# library/ changes every 5 minutes and creates deploy PRs automatically.
log "Skipping auto-deploy — deployment handled by Claude monitoring loop"
step_done

# ── Step 6: Resume GPU services ─────────────────────────────────
step_start "Resume GPU services"
for svc_name in "${GPU_SERVICES[@]}"; do
    "$SVC" start "$svc_name" 2>&1 | tee -a "$LOG_FILE" || warn "Failed to start $svc_name"
done
log "GPU services resumed"
step_done

RUN_E=$(( $(date +%s) - RUN_START ))
log "=== Friday Publish complete ($(( RUN_E/60 ))m $(( RUN_E%60 ))s) ==="
log "Epub published. Email/text will be sent by send-weekly at 07:30 CT."
ln -sf "$LOG_FILE" "$PROJECT_DIR/logs/friday-publish-latest.log"
find "$PROJECT_DIR/logs" -name "friday-publish-*.log" -not -name "friday-publish-latest.log" -mtime +7 -delete
