#!/usr/bin/env bash
# Start OpenClaw gateway with env vars loaded from the WORKSPACE (codebase).
# Same workspace OpenClaw uses = one place for code, docs, and credentials.
# 1. Copy scripts/openclaw.env.example to openclaw.env (in repo root, next to apps/ and docs/)
# 2. Edit openclaw.env and add your real values
# 3. Run: bash scripts/start-openclaw-gateway-with-env.sh

set -e
# Codebase root = workspace root (parent of scripts/)
CODEBASE_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
# Prefer env file IN the workspace so OpenClaw and you share one place
ENV_FILE="${CODEBASE_ROOT}/openclaw.env"
if [ ! -f "$ENV_FILE" ]; then
  ENV_FILE="${HOME}/.openclaw/openclaw.env"
fi
if [ -f "$ENV_FILE" ]; then
  set -a
  source "$ENV_FILE"
  set +a
  echo "Loaded env from $ENV_FILE"
else
  echo "No env file found. Create openclaw.env in the codebase root:"
  echo "  cp \"${CODEBASE_ROOT}/scripts/openclaw.env.example\" \"${CODEBASE_ROOT}/openclaw.env\""
  echo "  Then edit openclaw.env and add your keys. Run this script again."
  exit 1
fi

export PATH="${HOME}/.openclaw/bin:${PATH}"
echo "Stopping any existing gateway..."
openclaw gateway stop 2>/dev/null || true
sleep 3
# If port 18789 still in use, kill all processes on it (openclaw stop sometimes doesn't when service not loaded)
if command -v lsof >/dev/null 2>&1; then
  for pid in $(lsof -ti :18789 2>/dev/null); do
    echo "Killing process on port 18789 (pid $pid)..."
    kill -9 "$pid" 2>/dev/null || true
  done
  [ -n "$(lsof -ti :18789 2>/dev/null)" ] && sleep 2
fi
echo "Starting gateway with env..."
openclaw gateway --port 18789 &
sleep 2
echo "Done. TUI: openclaw tui   or open http://127.0.0.1:18789"
