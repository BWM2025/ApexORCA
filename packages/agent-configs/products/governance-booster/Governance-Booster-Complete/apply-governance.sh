#!/bin/bash
# Governance Booster — One-command installer into OpenClaw workspace
# Applies governance layer to any existing agent or pod. Does not replace agents — wraps them.
# © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="${OPENCLAW_WORKSPACE:-$HOME/.openclaw/workspace}"

echo "🚀 Applying Governance Booster to OpenClaw..."

mkdir -p "$WORKSPACE/personas"
mkdir -p "$WORKSPACE/shared"

# Copy Governance-Lead persona (governance wrapper)
if [ -d "$SCRIPT_DIR/Governance-Lead" ]; then
  cp -R "$SCRIPT_DIR/Governance-Lead" "$WORKSPACE/personas/Governance-Lead"
  echo "  ✅ Governance-Lead persona installed"
else
  echo "  ⚠️  Governance-Lead folder not found (run from extracted ZIP)"
  exit 1
fi

# Copy shared governance protocols (all agents can reference these)
if [ -d "$SCRIPT_DIR/Shared" ]; then
  for f in "$SCRIPT_DIR/Shared"/*.md; do
    [ -f "$f" ] && cp "$f" "$WORKSPACE/shared/"
  done
  echo "  ✅ Shared governance protocols installed"
fi

echo ""
echo "✅ Governance Booster applied to $WORKSPACE"
echo ""
echo "Next steps:"
echo "  1. Restart OpenClaw (e.g. launchctl kickstart -k gui/\$(id -u)/ai.openclaw.gateway)"
echo "  2. Governance-Lead is now the wrapper layer — it will audit and govern any agents you connect."
echo "  3. Message Governance-Lead with a short mandate to run an audit or get a compliance brief."
echo "  4. See INSTALL.md for zero-cost WhatsApp setup and troubleshooting."
echo ""
echo "Governance is live. Your agents are now governed."
