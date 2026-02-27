#!/usr/bin/env bash
# © 2026 ApexORCA.io — B.W. Moore
# Makes the OpenClaw main agent run as Apex (CEO). Run once so personas are active.

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PERSONAS_DIR="$(cd "$SCRIPT_DIR/../personas" && pwd)"
AGENT_DIR="$HOME/.openclaw/agents/main/agent"
WORKSPACE_PERSONAS="$HOME/.openclaw/workspace/personas"

mkdir -p "$AGENT_DIR"

# Copy Apex persona into main agent dir so the agent IS Apex
echo "Installing Apex (CEO) as main agent..."
for f in SOUL.md IDENTITY.md MEMORY.md HEARTBEAT.md RHYTHMS.md SAFETY.md TOOLS.md OVERNIGHT_PRODUCT_BUILD_PROTOCOL.md; do
  if [ -f "$PERSONAS_DIR/apex/$f" ]; then
    cp "$PERSONAS_DIR/apex/$f" "$AGENT_DIR/"
  fi
done

# Ensure workspace personas exist (for other agents / skills)
mkdir -p "$WORKSPACE_PERSONAS"
for name in apex echo oreo fin moby sonar biggie biggie-trading; do
  if [ -d "$PERSONAS_DIR/$name" ]; then
    cp -r "$PERSONAS_DIR/$name" "$WORKSPACE_PERSONAS/" 2>/dev/null || true
  fi
done

# Copy launch spec into agent dir so Apex can read it
if [ -f "$SCRIPT_DIR/../../../docs/LAUNCH_SPEC.md" ]; then
  cp "$SCRIPT_DIR/../../../docs/LAUNCH_SPEC.md" "$AGENT_DIR/"
fi

# Tell Apex the site is live and to run the launch
cat > "$AGENT_DIR/SITE_AND_LAUNCH.md" << 'EOF'
# Site is live — execute launch

- **Live site:** https://apexorca.io  
- **Dashboard:** https://apexorca.io/dashboard  
- **Marketplace:** https://apexorca.io/marketplace  

Founder (Brad) has deployed. Your job: run the launch plan and keep the company running autonomously.

**Launch plan (do in order):**
1. Post on X with the dashboard link (or coordinate Sonar to do it).
2. Share the interactive demo link everywhere relevant.
3. Highlight the orca paper bonus in messaging.
4. Use the comparison table (on the live site) to show superiority vs FelixCraft.ai.

Full copy and checklist: see LAUNCH_SPEC.md in the ApexORCA repo docs/ folder, or ask for it. Run HEARTBEAT, prepare founder brief, and execute the launch. Do not ask "who am I" — you are Apex, CEO of ApexORCA.io.
EOF

# Remove bootstrap so agent stops asking "who am I"
rm -f "$AGENT_DIR/BOOTSTRAP.md" 2>/dev/null || true

echo "Done. Apex is now the main agent."
echo "Restart OpenClaw (or the gateway) so it picks up the identity."
echo "Fix API key if you see provider errors: run openclaw configure and add your LLM API key (see LLM_PROVIDER_SETUP_GUIDE.md for options)."
