#!/bin/bash
# Burn down the wikipedia topic discovery backlog using Claude API
# Usage: bash tools/jobs/backlog-discover.sh [LIMIT]
# Example: bash tools/jobs/backlog-discover.sh 100
set -euo pipefail
cd "$(dirname "$0")/../.."

LIMIT="${1:-50}"
echo "Running wikipedia-discover with Claude API (limit: $LIMIT)"
npx tsx tools/jobs/wikipedia-discover.ts --limit "$LIMIT" --use-claude
echo "Done. Check backlog: docker exec hex-index-postgres psql -U postgres -d hex-index -t -c \"SELECT COUNT(*) FROM app.articles a WHERE a.content_path IS NOT NULL AND NOT EXISTS (SELECT 1 FROM app.article_wikipedia_links awl WHERE awl.article_id = a.id);\""
