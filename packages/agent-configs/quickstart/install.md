# Quick Start — Zero-Cost WhatsApp (or Telegram) Setup

1. Run `openclaw configure` and add your LLM API key (Grok, Claude, OpenAI, or other). See **LLM_PROVIDER_SETUP_GUIDE.md** in this ZIP for provider options and setup.
2. Run `openclaw channels --channel whatsapp --account main` (or `--channel telegram`) and scan QR with your phone's WhatsApp (or Telegram).
3. Message your lead persona in WhatsApp/Telegram: short mandates only. The pod runs autonomously.
4. Drop persona folders into ~/.openclaw/workspace (already done by setup.sh).
5. Restart gateway: `launchctl unload ~/Library/LaunchAgents/ai.openclaw.gateway.plist && sleep 2 && launchctl load ~/Library/LaunchAgents/ai.openclaw.gateway.plist`

You now talk to your agents exactly like texting. No novels. Spot-checks only when you decide.

**Founder Rule:** Message your lead persona with short mandates only. The pod runs the company autonomously. Spot-checks only when you decide.
