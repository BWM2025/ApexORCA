#!/bin/bash
# Pod Orchestrator — One-command installer into OpenClaw workspace
# Sets up the coordination layer so existing agents work as one unified team.
# © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="${OPENCLAW_WORKSPACE:-$HOME/.openclaw/workspace}"

echo "🚀 Installing Pod Orchestrator into OpenClaw..."

mkdir -p "$WORKSPACE/personas"
mkdir -p "$WORKSPACE/shared"

# Copy Pod-Orchestrator-Lead framework
if [ -d "$SCRIPT_DIR/Pod-Orchestrator-Lead" ]; then
  cp -R "$SCRIPT_DIR/Pod-Orchestrator-Lead" "$WORKSPACE/personas/Pod-Orchestrator-Lead"
  echo "  ✅ Pod-Orchestrator-Lead framework installed"
else
  echo "  ⚠️  Pod-Orchestrator-Lead folder not found (run from extracted ZIP)"
  exit 1
fi

# Copy shared protocols (same as other pods — ensures alignment)
if [ -d "$SCRIPT_DIR/Shared" ]; then
  for f in "$SCRIPT_DIR/Shared"/*.md; do
    [ -f "$f" ] && cp "$f" "$WORKSPACE/shared/"
  done
  echo "  ✅ Shared protocols installed"
fi

echo ""
echo "✅ Pod Orchestrator installed to $WORKSPACE"
echo ""
echo "Next steps:"
echo "  1. Restart OpenClaw (e.g. launchctl kickstart -k gui/\$(id -u)/ai.openclaw.gateway)"
echo "  2. In WhatsApp, message Pod-Orchestrator-Lead with a short mandate to connect your existing agents."
echo "  3. See INSTALL.md for how to connect agents and zero-cost WhatsApp setup."
echo ""
echo "Your agents are now one coordinated team. Short mandates only — the pod runs the rest."
