#!/bin/bash
# Claude Quality Guardian
#
# Daily job that uses Claude Opus 4.6 (via Max subscription) to audit
# and improve content that MiniMax generated. Runs at 05:00 UTC when
# MiniMax jobs are quiet.
#
# Claude reads recently created/modified HTML files and:
#   1. Strips any remaining LLM artifacts regex missed
#   2. Fixes awkward phrasing, garbled sentences
#   3. Ensures editorial quality standards
#   4. Reports what it fixed
#
# This is NOT a rewrite — Claude makes surgical fixes to MiniMax output.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOCK_FILE="$PROJECT_DIR/logs/claude-quality.lock"
LOG_FILE="$PROJECT_DIR/logs/claude-quality-$(date +%Y%m%d-%H%M%S).log"

mkdir -p "$PROJECT_DIR/logs"
cd "$PROJECT_DIR"

log()  { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
warn() { echo "[$(date '+%H:%M:%S')] WARN: $*" | tee -a "$LOG_FILE" >&2; }

# Lock to prevent overlapping runs
exec 9>"$LOCK_FILE"
if ! flock -n 9; then log "Another claude-quality running. Exiting."; exit 0; fi
echo $$ >"$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"; exec 9>&-' EXIT

RUN_START=$(date +%s)
log "=== Claude Quality Guardian (PID $$) ==="

# Find HTML files modified in the last 26 hours (covers daily window + buffer)
REWRITTEN_FILES=$(find "$PROJECT_DIR/library/rewritten" -name '*.html' -mtime -1 2>/dev/null | sort)
WIKIPEDIA_FILES=$(find "$PROJECT_DIR/library/wikipedia" -name '*.html' -mtime -1 2>/dev/null | sort)

REWRITTEN_COUNT=$(echo "$REWRITTEN_FILES" | grep -c '.' || echo 0)
WIKIPEDIA_COUNT=$(echo "$WIKIPEDIA_FILES" | grep -c '.' || echo 0)
TOTAL=$((REWRITTEN_COUNT + WIKIPEDIA_COUNT))

log "Found $TOTAL files modified in last 24h ($REWRITTEN_COUNT articles, $WIKIPEDIA_COUNT wikipedia)"

if [ "$TOTAL" -eq 0 ]; then
    log "No recent files to audit. Exiting."
    exit 0
fi

# Cap at 30 files per run to keep costs reasonable
MAX_FILES=30
ALL_FILES=$(echo -e "${REWRITTEN_FILES}\n${WIKIPEDIA_FILES}" | head -n "$MAX_FILES")
AUDITING=$(echo "$ALL_FILES" | grep -c '.' || echo 0)
log "Auditing $AUDITING files (capped at $MAX_FILES)"

# Build the file list for Claude's prompt
FILE_LIST=""
for f in $ALL_FILES; do
    REL_PATH="${f#$PROJECT_DIR/}"
    FILE_LIST="${FILE_LIST}
- ${REL_PATH}"
done

# Run Claude Code CLI one-shot
# Uses Max subscription (Opus 4.6) — no API key needed
log "Launching Claude Opus 4.6 quality guardian..."

claude -p "You are the quality guardian for a curated reading library. A local LLM (MiniMax 122B) generates article commentary and Wikipedia essays. Your job: read each file, judge quality, and rewrite anything that falls short. You own the final quality.

FILES TO AUDIT AND IMPROVE:
${FILE_LIST}

For each file, read it and evaluate against these standards:

## ARTICLE COMMENTARY STANDARD (files in library/rewritten/)

Commentary should read like a sharp editorial responding to the original author:
- HOOK: Opens by framing what makes the piece notable — a surprising claim, distinctive evidence. Not a summary.
- THIRD PERSON: First mention uses full name, then last name only. Never first person.
- DIRECT QUOTES: 4-8 of the author's strongest sentences, properly attributed (\"Author writes, '...'\").
- PARAPHRASING: Between quotes, the author's arguments summarized then commented on. \"The core of the argument is...\" then editorial judgment.
- COUNTERPOINTS: 1-3 per piece, woven in naturally — \"Critics might note...\"
- PULL QUOTE: One blockquote (> ) with the most striking line.
- BOTTOM LINE: Final ## section — 2-3 sentences of verdict, not summary. Strongest point, biggest vulnerability, what to watch next.
- SECTION HEADINGS: Clear ## headings where coverage shifts.
- RHYTHM: Dramatic variation in sentence and paragraph length. Short punchy sentences after dense blocks.
- CLEAN PROSE: No jargon, no acronyms without explanation, no platform CTAs, no \"subscribe\", no self-referential AI language.

## WIKIPEDIA ESSAY STANDARD (files in library/wikipedia/)

Essays should read like engaging magazine features, not encyclopedias:
- Opens with a concrete fact, anecdote, or striking claim — NEVER \"Imagine...\"
- Explains from first principles for a smart but unfamiliar reader.
- Uses ## headings, > blockquotes, **bold** for emphasis.
- Writes with authority: cites dates, names, numbers.
- Varies paragraph length dramatically for rhythm.
- 1500-3000 words.
- Ends with the source-note paragraph (preserve this: <p class=\"source-note\">...).

## WHAT TO FIX

1. ARTIFACTS: JSON metadata, escaped JSON (\`&quot;\`, \`}}\`), code fences, XML tags, LLM self-reference (\"I should verify\", checklists with checkmarks), Chinese characters in English text.

2. WEAK WRITING: Flat openings, missing counterpoints, no pull quote, missing or weak Bottom Line, repetitive sentence structure, jargon without explanation, generic phrasing that could describe any article.

3. STRUCTURAL ISSUES: Missing ## headings, no Bottom Line section, empty paragraphs, orphaned tags.

4. GARBLED TEXT: Truncated sentences, incoherent transitions, repeated phrases.

## HOW TO FIX

- For artifacts, garble, and structural issues: edit surgically.
- For weak writing: REWRITE the section or paragraph to meet the standard above. You are not preserving MiniMax's voice — you are replacing it with quality editorial prose.
- If a file meets quality standards, skip it silently.
- If a file needs heavy rewriting (more than 30%% of content), rewrite the whole thing.
- Edit files in place using the Edit tool.
- Do NOT modify the source-note paragraph in Wikipedia articles.
- Do NOT add HTML tags — files use semantic HTML (<p>, <h2>, <blockquote>, etc.) generated by a textToHtml converter. Edit within existing tag structure.

After processing all files, output a brief summary: how many files reviewed, how many fixed, how many rewritten, key patterns you noticed." \
    --model opus \
    --allowedTools "Read,Edit,Glob,Grep,Bash(read-only)" \
    2>&1 | tee -a "$LOG_FILE"

EC=${PIPESTATUS[0]}
if [ "$EC" -ne 0 ]; then
    warn "Claude exited with code $EC"
fi

RUN_E=$(( $(date +%s) - RUN_START ))
log "=== Claude Quality Guardian complete ($(( RUN_E/60 ))m $(( RUN_E%60 ))s) ==="
ln -sf "$LOG_FILE" "$PROJECT_DIR/logs/claude-quality-latest.log"
find "$PROJECT_DIR/logs" -name "claude-quality-*.log" -not -name "claude-quality-latest.log" -mtime +7 -delete
