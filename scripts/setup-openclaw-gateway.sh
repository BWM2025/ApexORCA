#!/bin/bash
set -e
export PATH="$HOME/.openclaw/bin:$PATH"

# PATH in shell profile so every terminal has openclaw
PROFILE="$HOME/.zshrc"
[ -f "$HOME/.bash_profile" ] && [ ! -f "$HOME/.zshrc" ] && PROFILE="$HOME/.bash_profile"
if ! grep -q '\.openclaw/bin' "$PROFILE" 2>/dev/null; then
  echo "export PATH=\"\$HOME/.openclaw/bin:\$PATH\"" >> "$PROFILE"
fi

# So LaunchAgent uses OpenClaw's Node (Big Sur fix)
PLIST="$HOME/Library/LaunchAgents/ai.openclaw.gateway.plist"
if [ -f "$PLIST" ]; then
  OPENCLAW_PATH="$HOME/.openclaw/bin:/usr/bin:/bin"
  if /usr/libexec/PlistBuddy -c "Print :EnvironmentVariables:PATH" "$PLIST" 2>/dev/null; then
    /usr/libexec/PlistBuddy -c "Set :EnvironmentVariables:PATH $OPENCLAW_PATH" "$PLIST"
  else
    /usr/libexec/PlistBuddy -c "Add :EnvironmentVariables dict" "$PLIST" 2>/dev/null || true
    /usr/libexec/PlistBuddy -c "Add :EnvironmentVariables:PATH string $OPENCLAW_PATH" "$PLIST" 2>/dev/null || \
    /usr/libexec/PlistBuddy -c "Set :EnvironmentVariables:PATH $OPENCLAW_PATH" "$PLIST"
  fi
fi

# Clear port and any stale daemon
openclaw gateway stop 2>/dev/null || true
launchctl bootout "gui/$(id -u)/ai.openclaw.gateway" 2>/dev/null || true
sleep 1
for pid in $(lsof -ti :18789 2>/dev/null); do kill -9 "$pid" 2>/dev/null; done
sleep 1

# Start gateway
if [ -f "$PLIST" ]; then
  launchctl load "$PLIST" 2>/dev/null || true
  sleep 2
  launchctl kickstart -k "gui/$(id -u)/ai.openclaw.gateway" 2>/dev/null || true
  openclaw gateway start 2>/dev/null || true
else
  nohup openclaw gateway --port 18789 >> /tmp/openclaw-gateway.log 2>&1 &
  sleep 5
fi
openclaw gateway status

echo ""
echo "Gateway is running. To open the agent, run:  openclaw tui"
