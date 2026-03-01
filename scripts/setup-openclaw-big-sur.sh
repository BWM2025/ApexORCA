#!/bin/bash
# Permanent OpenClaw fix for Big Sur 11.7.11 (2014 MacBook Pro)
# Run once only. After this, use browser at http://127.0.0.1:18789 (gateway must be running).

set -e

echo "=== ApexORCA Permanent OpenClaw Fix for Big Sur ==="

# Force Node 18 (Big Sur compatible)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 18
nvm use 18
nvm alias default 18

# OpenClaw: use existing install (curl installer). Do NOT use npm install -g openclaw (placeholder).
export PATH="$HOME/.openclaw/bin:$PATH"
if ! grep -q '\.openclaw/bin' ~/.zshrc 2>/dev/null; then
  echo 'export PATH="$HOME/.openclaw/bin:$PATH"' >> ~/.zshrc
fi
[ -s ~/.zshrc ] && source ~/.zshrc 2>/dev/null || true

# Verify
if command -v openclaw >/dev/null 2>&1; then
  openclaw --version
else
  echo "OpenClaw not found. Install via official curl installer, then run this script again."
  exit 1
fi

echo ""
echo "✅ OpenClaw is now permanently fixed."
echo ""
echo "How to use from now on:"
echo "1. Start the gateway once (in Terminal): openclaw gateway --port 18789 &"
echo "2. Open your browser: http://127.0.0.1:18789"
echo "3. Type or paste your message to Apex and send."
echo ""
echo "You can close this terminal. PATH is in ~/.zshrc for every new terminal."
echo "Run this script again only if you reinstall OpenClaw."
