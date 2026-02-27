#!/bin/bash
# Growth Engine — One-command installer into OpenClaw workspace
# © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="${OPENCLAW_WORKSPACE:-$HOME/.openclaw/workspace}"

echo "🚀 Installing Growth Engine into OpenClaw..."

mkdir -p "$WORKSPACE/personas"
mkdir -p "$WORKSPACE/shared"
mkdir -p "$WORKSPACE/skills"

# Copy Growth-Lead persona
if [ -d "$SCRIPT_DIR/Growth-Lead" ]; then
  cp -R "$SCRIPT_DIR/Growth-Lead" "$WORKSPACE/personas/Growth-Lead"
  echo "  ✅ Growth-Lead persona installed"
else
  echo "  ⚠️  Growth-Lead folder not found (run from extracted ZIP)"
  exit 1
fi

# Copy X-Growth-Skill
if [ -d "$SCRIPT_DIR/X-Growth-Skill" ]; then
  cp -R "$SCRIPT_DIR/X-Growth-Skill" "$WORKSPACE/skills/X-Growth-Skill"
  echo "  ✅ X-Growth-Skill installed"
fi

# Copy shared protocols (Growth role only)
if [ -d "$SCRIPT_DIR/Shared" ]; then
  for f in "$SCRIPT_DIR/Shared"/*.md; do
    [ -f "$f" ] && cp "$f" "$WORKSPACE/shared/"
  done
  echo "  ✅ Shared protocols installed"
fi

echo ""
echo "✅ Growth Engine installed to $WORKSPACE"
echo ""
echo "Next steps:"
echo "  1. Restart OpenClaw (e.g. launchctl kickstart -k gui/\$(id -u)/ai.openclaw.gateway)"
echo "  2. In WhatsApp, message Growth-Lead with a short mandate (1–2 sentences)."
echo "  3. See INSTALL.md for zero-cost WhatsApp setup and troubleshooting."
echo ""
echo "Welcome to your autonomous Growth Engine. Short mandates only — the pod runs the rest."
