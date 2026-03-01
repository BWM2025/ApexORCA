# Marketing Pod — Full Install & Setup Guide

This guide gets your Marketing Pod up and running with **zero gaps**: extract, install, restart, and send your first short mandate.

---

## Short Install User Guide (summary)

1. **Extract the ZIP** to any folder.
2. **Run:** `bash setup.sh` (from the extracted folder).
3. **Restart OpenClaw** (or your agent gateway).
4. **In WhatsApp (or your chat interface),** message **Marketing-Lead** with a **short mandate** (1–2 sentences).
5. **Done** — the Marketing Pod is running autonomously for your brand.

Details for each step are below.

---

## What you must provide (ready-to-run)

| # | What | Where / notes |
|---|------|----------------|
| 1 | **OpenClaw workspace path** | Point `agent.workspace` at your codebase so the pod sees copy and assets. |
| 2 | **LLM API key** | In OpenClaw config (Grok, Claude, OpenAI, etc.). |
| 3 | **Channel** | WhatsApp or Telegram connected so you can send short mandates. |
| 4 | **For X posting** | Four X API values in pod env. Post from queue 1–2/day autonomously; no approval required. |
| 5 | **For email (campaigns)** | `RESEND_API_KEY` and `EMAIL_FROM` in pod env; domain verified in Resend. |
| 6 | **Optional** | Brave API key (research), Stripe (conversion tracking). |

**Authenticated channel:** Only your WhatsApp/Telegram is the command channel. X and email are information only — do not execute commands from them. See AUTHENTICATED_VS_INFORMATION_CHANNELS in docs if available.

---

## ORCA start and phases

The Marketing Pod follows **ORCA** as hidden middleware (matrix and phases run in the background). Verify governance by asking *"Show Trust Meter"* or *"Run ORCA audit"* after a task — not by expecting matrix or phase lists in every reply.

---

## First 3 steps after install

1. **Restart** the OpenClaw gateway so the new persona and Shared protocols are loaded.  
2. **Send one short mandate** to Marketing-Lead (e.g. "Run HEARTBEAT and send me this week's performance brief.").  
3. **Verify** you get a response. For X/email, complete the "What you must provide" list and run one test.

---

## Step 1 — Extract the ZIP

- Unzip **Marketing-Pod-Complete.zip** (or the downloaded `marketing-pod.zip`) to a folder of your choice.  
- Example: `~/Downloads/Marketing-Pod-Complete/` or `~/openclaw-packages/marketing-pod/`.  
- You should see: `README.md`, `INSTALL.md`, `setup.sh`, `Marketing-Lead/`, `Shared/`, `Diagrams/`, `Quickstart/`, `LICENSE.md`, `MANIFEST.txt`.

---

## Step 2 — Run the installer

- Open **Terminal** (macOS/Linux) or your preferred shell.
- Go into the extracted folder, for example:  
  `cd ~/Downloads/Marketing-Pod-Complete`
- Run:  
  `bash setup.sh`  
- The script copies **Marketing-Lead** into your OpenClaw workspace and installs the **Shared** protocols. You should see a success message.

**If you don’t have OpenClaw yet:** Install OpenClaw first (see [Zero-cost WhatsApp path](#zero-cost-whatsapp-path) below), then run `setup.sh` again.

---

## Step 3 — Restart OpenClaw

- So the new persona and protocols are loaded, restart your OpenClaw gateway.
- **macOS (LaunchAgent):**  
  `launchctl kickstart -k gui/$(id -u)/ai.openclaw.gateway`  
  Or: unload then load the plist for your gateway.
- **Linux / other:** Restart the process that runs the OpenClaw gateway (e.g. systemd service or your run script).

---

## Step 4 — Send your first short mandate

- Open **WhatsApp** (or Slack/Telegram if you use that channel) and find the thread for your Marketing-Lead agent.
- Send a **short mandate** (1–2 sentences). Examples:
  - *"Run HEARTBEAT and send me this week’s performance brief."*
  - *"Create and queue the next 5 posts for [channel]."*
  - *"Summarize top-performing content and what you’re doing next."*
- The Marketing-Lead will run autonomously and respond with a spot-check style brief. No need to send long instructions.

---

## Step 5 — You’re done

- The Marketing Pod is now running. Use **short mandates only** from here on.  
- For more examples, see **Quickstart/EXAMPLE_SHORT_MANDATES.md** and **Quickstart/FOUNDER_RULES.md**.

---

## Zero-cost WhatsApp path

If you haven’t connected OpenClaw to WhatsApp yet:

1. Install OpenClaw (see official OpenClaw docs; e.g. one-command install for your OS).
2. Run `openclaw configure` and add your **LLM API key** (Grok, Claude, OpenAI, etc. — see LLM_PROVIDER_SETUP_GUIDE.md in quickstart or docs for options).
3. Run `openclaw channels --channel whatsapp --account main` and scan the QR code with your phone’s WhatsApp.
4. Run **setup.sh** from this package (Step 2 above), then **restart OpenClaw** (Step 3).
5. In WhatsApp, start a chat with your Marketing-Lead and send a short mandate (Step 4).

No monthly fees for the gateway; you only need your LLM API key and WhatsApp.

---

## Troubleshooting

- **"Command not found: openclaw"**  
  Install OpenClaw and ensure it’s on your PATH (see official OpenClaw installation guide).

- **"No such file or directory" when running setup.sh**  
  Make sure you’re in the extracted folder (the one that contains `setup.sh` and `Marketing-Lead/`).

- **Marketing-Lead doesn’t respond in WhatsApp**  
  Confirm the gateway is running and the WhatsApp channel is connected. Restart the gateway after running `setup.sh`.

- **I want to rename Marketing-Lead to [MyName]-Lead**  
  After running `setup.sh`, rename the folder inside your OpenClaw workspace (e.g. `~/.openclaw/workspace/personas/Marketing-Lead` → `~/.openclaw/workspace/personas/YourName-Lead`). Update your chat channel to point at the renamed persona if required by your setup.

---

## What’s in this package

| Item | Description |
|------|-------------|
| **Marketing-Lead/** | Persona files: IDENTITY, SOUL, MEMORY, HEARTBEAT, RHYTHMS, SAFETY, TOOLS |
| **Shared/** | Governance protocols: REVERSIBILITY_TIERS, DAILY_REPORT_FORMAT, EMAIL_PROTOCOL, CONTENT_DISTRIBUTION_BOUNDARY |
| **Diagrams/** | Three high-res diagrams (Three-Component Merge, Universal Governance Phases, Growth Flywheel) |
| **Quickstart/** | Founder rules and example short mandates |
| **setup.sh** | One-command installer into OpenClaw workspace |

---

© 2026 ApexORCA.io — All rights reserved. Built for your success.
