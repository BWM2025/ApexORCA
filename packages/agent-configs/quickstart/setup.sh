#!/bin/bash
# © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore
# Auto-install script for ApexORCA personas and skills into OpenClaw

echo "🚀 Installing ApexORCA ORCA-Governed Agents..."

# Create workspace if it doesn't exist
mkdir -p ~/.openclaw/workspace/personas
mkdir -p ~/.openclaw/workspace/skills

# Copy personas
cp -r personas/apex ~/.openclaw/workspace/personas/ 2>/dev/null || true
cp -r personas/echo ~/.openclaw/workspace/personas/ 2>/dev/null || true
cp -r personas/oreo ~/.openclaw/workspace/personas/ 2>/dev/null || true
cp -r personas/fin ~/.openclaw/workspace/personas/ 2>/dev/null || true
cp -r personas/moby ~/.openclaw/workspace/personas/ 2>/dev/null || true
cp -r personas/sonar ~/.openclaw/workspace/personas/ 2>/dev/null || true
cp -r personas/biggie ~/.openclaw/workspace/personas/ 2>/dev/null || true
cp -r personas/biggie-trading ~/.openclaw/workspace/personas/ 2>/dev/null || true

# Copy skills
cp -r skills/governance-booster ~/.openclaw/workspace/skills/ 2>/dev/null || true
cp -r skills/x-growth ~/.openclaw/workspace/skills/ 2>/dev/null || true
cp -r skills/sentry-pro ~/.openclaw/workspace/skills/ 2>/dev/null || true

# Copy shared protocols
cp -r shared/*.md ~/.openclaw/workspace/ 2>/dev/null || true

echo "✅ ApexORCA agents installed successfully!"
echo ""
echo "Next steps:"
echo "1. Restart OpenClaw"
echo "2. Message Apex: 'Run your first HEARTBEAT and prepare founder brief'"
echo "3. Check live dashboard: apexorca.io/dashboard"
echo ""
echo "Welcome to REAL Agency."
echo ""
echo "✅ Zero-cost LLM & WhatsApp setup complete."
echo "Next: openclaw configure (add your LLM API key) then openclaw channels --channel whatsapp (or telegram)"
