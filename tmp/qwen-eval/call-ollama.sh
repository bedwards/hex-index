#!/bin/bash
# Usage: ./call-ollama.sh <temp> <num_predict> <system_prompt_file> <user_prompt_file> <output_file>
TEMP=$1
NUM_PREDICT=$2
SYSTEM_FILE=$3
USER_FILE=$4
OUTPUT_FILE=$5

SYSTEM_PROMPT=""
if [ -f "$SYSTEM_FILE" ]; then
  SYSTEM_PROMPT=$(cat "$SYSTEM_FILE" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))')
fi
USER_PROMPT=$(cat "$USER_FILE" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))')

if [ -n "$SYSTEM_PROMPT" ] && [ "$SYSTEM_PROMPT" != '""' ]; then
  MESSAGES='[{"role":"system","content":'$SYSTEM_PROMPT'},{"role":"user","content":'$USER_PROMPT'}]'
else
  MESSAGES='[{"role":"user","content":'$USER_PROMPT'}]'
fi

BODY=$(cat <<ENDJSON
{
  "model": "qwen3.5:122b-a10b",
  "messages": $MESSAGES,
  "options": {
    "temperature": $TEMP,
    "num_predict": $NUM_PREDICT,
    "top_p": 0.95
  },
  "think": false,
  "keep_alive": -1,
  "stream": false
}
ENDJSON
)

echo "START: $(date '+%Y-%m-%d %H:%M:%S')"
START_EPOCH=$(date +%s)

RESPONSE=$(curl -s -X POST http://127.0.0.1:11434/api/chat \
  -H "Content-Type: application/json" \
  -d "$BODY" \
  --max-time 900)

END_EPOCH=$(date +%s)
echo "END: $(date '+%Y-%m-%d %H:%M:%S')"
DURATION=$((END_EPOCH - START_EPOCH))
echo "DURATION: ${DURATION}s"

# Extract content and eval_count
CONTENT=$(echo "$RESPONSE" | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d.get("message",{}).get("content",""))')
EVAL_COUNT=$(echo "$RESPONSE" | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d.get("eval_count",0))')
PROMPT_EVAL_COUNT=$(echo "$RESPONSE" | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d.get("prompt_eval_count",0))')
TOTAL_DURATION=$(echo "$RESPONSE" | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d.get("total_duration",0))')
EVAL_DURATION=$(echo "$RESPONSE" | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d.get("eval_duration",0))')

echo "EVAL_COUNT: $EVAL_COUNT"
echo "PROMPT_EVAL_COUNT: $PROMPT_EVAL_COUNT"

# Calculate tokens/sec from Ollama's internal timing
if [ "$EVAL_DURATION" -gt 0 ] 2>/dev/null; then
  TPS=$(python3 -c "print(f'{$EVAL_COUNT / ($EVAL_DURATION / 1e9):.1f}')")
  echo "TOKENS_PER_SEC: $TPS"
fi

# Strip think tags and save content
echo "$CONTENT" | sed 's/<think>.*<\/think>//g' > "$OUTPUT_FILE"
WORD_COUNT=$(wc -w < "$OUTPUT_FILE" | tr -d ' ')
echo "WORD_COUNT: $WORD_COUNT"
