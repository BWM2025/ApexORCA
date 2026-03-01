#!/bin/bash
# memory_consolidation.sh — Daily consolidation for OpenClaw agents (macOS-safe)
# Run from repo root or scripts/; creates memory/ and knowledge_repo.md if missing.
# Schedule e.g. crontab: 0 2 * * * /path/to/ApexORCA\ Code\ Base/scripts/memory_consolidation.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

mkdir -p memory

# macOS: date -v-1d +%Y-%m-%d; Linux: date -d "yesterday" +%Y-%m-%d
if date -v-1d +%Y-%m-%d &>/dev/null; then
  LAST_DAY=$(date -v-1d +%Y-%m-%d)
else
  LAST_DAY=$(date -d "yesterday" +%Y-%m-%d)
fi

KNOWLEDGE_FILE="memory/knowledge_repo.md"
DAILY_NOTE="memory/daily_note_${LAST_DAY}.md"

# Ensure knowledge repo exists
if [ ! -f "$KNOWLEDGE_FILE" ]; then
  echo -e "# Knowledge Repo — ApexORCA\n\nConsolidated decisions and open tasks. Updated by memory_consolidation.sh or Apex.\n" > "$KNOWLEDGE_FILE"
fi

# Collect any memory files from last day (if they exist)
if [ -d memory ]; then
  FILES=$(find memory -maxdepth 1 -name "${LAST_DAY}*.md" -type f 2>/dev/null || true)
  if [ -n "$FILES" ]; then
    echo -e "\n## Consolidation $LAST_DAY\nSources: $FILES\nRun via Apex: summarize key decisions, progress, open tasks from these files and append to this repo.\n" >> "$KNOWLEDGE_FILE"
  else
    echo -e "\n## Consolidation $LAST_DAY\nNo dated memory files for this day. Apex can summarize last 24h from logs and append here.\n" >> "$KNOWLEDGE_FILE"
  fi
fi

# Create or update daily note for open tasks (heartbeat tracks this)
if [ ! -f "$DAILY_NOTE" ]; then
  echo -e "# Daily Note — $LAST_DAY\n\nOpen projects:\n- [ ] (none logged)\n" > "$DAILY_NOTE"
fi

echo "Consolidation complete. Summary appended to $KNOWLEDGE_FILE; daily note: $DAILY_NOTE"
