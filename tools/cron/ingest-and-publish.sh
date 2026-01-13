#!/bin/bash
# Automated ingestion and publishing script
# Runs 4x daily via cron to keep the library fresh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOG_FILE="$PROJECT_DIR/logs/ingest-$(date +%Y%m%d-%H%M%S).log"

# Ensure logs directory exists
mkdir -p "$PROJECT_DIR/logs"

cd "$PROJECT_DIR"

echo "=== Starting ingestion at $(date) ===" | tee -a "$LOG_FILE"

# Ensure Docker and database are running
if ! docker compose ps postgres | grep -q "running"; then
    echo "Starting database..." | tee -a "$LOG_FILE"
    docker compose up -d postgres
    sleep 5
fi

# Run ingestion
echo "Running ingestion..." | tee -a "$LOG_FILE"
npm run ingest -- --source content/comprehensive-sources-flat.json 2>&1 | tee -a "$LOG_FILE"

# Enrich articles with Wikipedia deep dives
echo "Running Wikipedia enrichment..." | tee -a "$LOG_FILE"
npm run wikipedia:retrofit -- --limit 100 2>&1 | tee -a "$LOG_FILE"

# Generate static site
echo "Generating static site..." | tee -a "$LOG_FILE"
npm run static:generate 2>&1 | tee -a "$LOG_FILE"

# Commit and push if there are changes
if ! git diff --quiet docs/; then
    echo "Publishing changes..." | tee -a "$LOG_FILE"
    git add docs/
    git commit -m "chore: automated content update $(date +%Y-%m-%d)"
    git push
    echo "Published successfully!" | tee -a "$LOG_FILE"
else
    echo "No new content to publish." | tee -a "$LOG_FILE"
fi

echo "=== Completed at $(date) ===" | tee -a "$LOG_FILE"

# Keep only last 7 days of logs
find "$PROJECT_DIR/logs" -name "ingest-*.log" -mtime +7 -delete
