#!/usr/bin/env bash
# Quick PR status check for the editorial loop
#
# Usage: bash tools/claude-loop/check-prs.sh
#    or: npm run claude:check-prs

set -euo pipefail

cd "$HOME/hex-index"

echo "=== Open PRs ==="
gh pr list --state open --json number,title,createdAt,statusCheckRollup --template '{{range .}}#{{.number}} {{.title}} ({{timeago .createdAt}})
  {{range .statusCheckRollup}}  {{.name}}: {{.conclusion}}
  {{end}}
{{end}}'

echo ""
echo "=== Recently Merged (24h) ==="
gh pr list --state merged --json number,title,mergedAt --template '{{range .}}#{{.number}} {{.title}} ({{timeago .mergedAt}})
{{end}}' | head -10

echo ""
echo "=== CI Status (last 5 runs) ==="
gh run list --limit 5 --json conclusion,name,headBranch --template '{{range .}}{{.name}} [{{.headBranch}}]: {{.conclusion}}
{{end}}'
