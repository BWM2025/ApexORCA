#!/usr/bin/env bash
# Same as run-proof-emails-and-x-post.sh but loads nvm first (Big Sur: avoid /usr/local/bin/node dyld crash).
# Run from anywhere: bash scripts/run-proof-emails-and-x-post-bigsur.sh (from ApexORCA Code Base root)
# Or from home: bash "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base/scripts/run-proof-emails-and-x-post-bigsur.sh"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CODEBASE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$CODEBASE_ROOT"

# Load nvm so Node 18/20 is used (Big Sur: /usr/local/bin/node crashes)
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  \. "$NVM_DIR/nvm.sh"
  nvm use 18 2>/dev/null || nvm use 20 2>/dev/null || true
  echo "Using node: $(which node) ($(node -v))"
else
  echo "WARNING: nvm not found. If you see dyld errors, install nvm and Node 18."
fi

exec bash "$SCRIPT_DIR/run-proof-emails-and-x-post.sh"
