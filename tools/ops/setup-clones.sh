#!/bin/bash
# tools/ops/setup-clones.sh
# One-time setup of independent clones for each process

set -euo pipefail

REPO="git@github.com:bedwards/hex-index.git"
SOURCE_REPO="$HOME/hex-index"
BASE="$HOME/vibe/hex-index-clones"

mkdir -p "$BASE"

for name in qwen-batch auto-deploy claude-ops claude-editorial claude-quality claude-epub claude-memory; do
  if [ ! -d "$BASE/$name" ]; then
    echo "Cloning $name..."
    git clone "$REPO" "$BASE/$name"
    # Each clone needs its own node_modules
    (cd "$BASE/$name" && npm ci --silent)
    # Symlink shared config that isn't in git
    ln -sf "$SOURCE_REPO/.env" "$BASE/$name/.env"
    ln -sf "$SOURCE_REPO/.secrets" "$BASE/$name/.secrets"
    echo "Done: $BASE/$name"
  else
    echo "Already exists: $BASE/$name"
  fi
done
