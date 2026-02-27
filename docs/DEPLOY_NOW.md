# Deploy ApexORCA — Zero-Cost Path

**This file:** OpenClaw/agent path (LLM key, WhatsApp/Telegram). For **website** deploy (GitHub, Vercel), see **DEPLOY_NOW.md** at repo root.

## Recommended LLM for this site builder

Grok via xAI API + your existing SuperGrok subscription.

1. Go to console.x.ai → create API key.
2. Run `openclaw configure` and add the Grok API key.
Expected cost: SuperGrok $30/month + token usage (~$10–40/month for moderate development with short mandates).

---

## Step 1: Add your LLM API key

```bash
openclaw configure
```

Choose your provider (xAI/Grok, Anthropic, OpenAI, etc.) and paste your API key. See **docs/LLM_PROVIDER_SETUP_GUIDE.md** for ranked options and setup.

## Step 2: WhatsApp Setup (your preferred channel)

In Terminal:

```bash
openclaw channels --channel whatsapp --account main
```

Or for Telegram:

```bash
openclaw channels --channel telegram --account main
```

Scan the QR code with your WhatsApp (or Telegram) app on your phone.

You now message your agents directly in WhatsApp/Telegram like texting a person.

## Step 3: Verify everything works

Open WhatsApp (or Telegram) on phone → message the linked number: **"Run your first HEARTBEAT and prepare founder brief"**

You should get a response from your lead persona within seconds.
