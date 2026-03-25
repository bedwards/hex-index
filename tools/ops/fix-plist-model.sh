#!/bin/bash
# Fix Qwen model in launchctl plists
# Run manually: bash tools/ops/fix-plist-model.sh
set -euo pipefail

WRONG_MODEL="qwen3:235b-a22b"
RIGHT_MODEL="qwen3:235b-a22b"
PLIST_DIR="$HOME/Library/LaunchAgents"

for plist in \
  com.hex-index.wiki-rewrite.plist \
  com.hex-index.wiki-discover.plist \
  com.hex-index.affiliate-suggest.plist \
  com.hex-index.article-rewrite.plist; do

  file="$PLIST_DIR/$plist"
  if [ -f "$file" ]; then
    if grep -q "$WRONG_MODEL" "$file"; then
      sed -i '' "s|$WRONG_MODEL|$RIGHT_MODEL|g" "$file"
      echo "Fixed: $plist"
      # Reload the job
      launchctl unload "$file" 2>/dev/null || true
      launchctl load "$file"
      echo "  Reloaded"
    else
      echo "OK: $plist (already correct)"
    fi
  else
    echo "SKIP: $plist (not found)"
  fi
done

echo "Done. Verify with: launchctl list | grep hex-index"
