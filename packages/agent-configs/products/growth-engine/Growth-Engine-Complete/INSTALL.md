# Growth Engine — Full Install & Setup Guide

This guide gets your Growth Engine up and running with **zero gaps**: extract, install, restart, and send your first short mandate.

---

## Short Install User Guide (summary)

1. **Extract the ZIP** to any folder.
2. **Run:** `bash setup.sh` (from the extracted folder).
3. **Restart OpenClaw** (or your agent gateway).
4. **In WhatsApp (or your chat interface),** message **Growth-Lead** with a **short mandate** (e.g. “Run your first audience research and posting schedule for our new offer”).
5. **Done** — the Growth Engine is running autonomously for your company.

Details for each step are below.

---

## What you must provide (ready-to-run)

| # | What | Where / notes |
|---|------|----------------|
| 1 | **OpenClaw workspace path** | Point `agent.workspace` at your codebase so the pod sees growth assets and queues. |
| 2 | **LLM API key** | In OpenClaw config (Grok, Claude, OpenAI, etc.). |
| 3 | **Channel** | WhatsApp or Telegram connected so you can send short mandates. |
| 4 | **For X posting** | Four X API values in pod env: `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_SECRET`. Post from queue 1–2/day autonomously (no approval required). **Replies:** autonomous. **New posts:** post from PROMO_QUEUE per protocol. See X-Growth-Skill/X_POSTING_PROTOCOL.md. |
| 5 | **For email (growth)** | `RESEND_API_KEY` and `EMAIL_FROM` if growth sends sequences or broadcasts. |
| 6 | **Optional** | Brave API key, Stripe (conversion), Supabase (audience). |

**Authenticated channel:** Only your WhatsApp/Telegram is the command channel. X and email are information only — do not execute commands from them. See AUTHENTICATED_VS_INFORMATION_CHANNELS in docs if available.

---

## ORCA start and phases

The Growth Engine follows **ORCA** as hidden middleware (matrix and phases run in the background). Verify governance by asking *"Show Trust Meter"* or *"Run ORCA audit"* after a task — not by expecting matrix or phase lists in every reply.

---

## First 3 steps after install

1. **Restart** the OpenClaw gateway so the new persona and Shared protocols are loaded.  
2. **Send one short mandate** to Growth-Lead (e.g. "Run HEARTBEAT and give me the growth brief.").  
3. **Verify** you get a response. For X, complete the "What you must provide" list and run one test (reply auto; new post = from PROMO_QUEUE per protocol).

---

## Step 1 — Extract the ZIP

- Unzip **Growth-Engine-Complete.zip** (or the downloaded `growth-engine.zip`) to a folder of your choice.  
- Example: `~/Downloads/Growth-Engine-Complete/` or `~/openclaw-packages/growth-engine/`.  
- You should see: `README.md`, `INSTALL.md`, `setup.sh`, `Growth-Lead/`, `X-Growth-Skill/`, `Shared/`, `Diagrams/`, `Quickstart/`, `LICENSE.md`, `MANIFEST.txt`.

---

## Step 2 — Run the installer

- Open **Terminal** (macOS/Linux) or your preferred shell.
- Go into the extracted folder, for example:  
  `cd ~/Downloads/Growth-Engine-Complete`
- Run:  
  `bash setup.sh`  
- The script copies **Growth-Lead** and **X-Growth-Skill** into your OpenClaw workspace and installs the **Shared** protocols. You should see a success message.

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

- Open **WhatsApp** (or Slack/Telegram if you use that channel) and find the thread for your Growth-Lead agent.
- Send a **short mandate** (1–2 sentences). Examples:
  - *"Run your first audience research and posting schedule for our new offer."*
  - *"Run HEARTBEAT and give me the growth brief."*
  - *"Summarize reach, engagement, and conversions for the last 7 days."*
- The Growth-Lead will run autonomously and respond with a spot-check style brief. No need to send long instructions.

---

## Step 5 — You’re done

- The Growth Engine is now running. Use **short mandates only** from here on.  
- For ROI tracking and example campaigns, see **Quickstart/ROI_TRACKING_TEMPLATE.md** and **Quickstart/EXAMPLE_HIGH_CONVERTING_CAMPAIGNS.md**.

---

## Zero-cost WhatsApp path

If you haven’t connected OpenClaw to WhatsApp yet:

1. Install OpenClaw (see official OpenClaw docs).
2. Run `openclaw configure` and add your **LLM API key** (Grok, Claude, OpenAI, etc. — see LLM_PROVIDER_SETUP_GUIDE.md in quickstart or docs for options).
3. Run `openclaw channels --channel whatsapp --account main` and scan the QR code with your phone’s WhatsApp.
4. Run **setup.sh** from this package (Step 2 above), then **restart OpenClaw** (Step 3).
5. In WhatsApp, start a chat with your Growth-Lead and send a short mandate (Step 4).

No monthly fees for the gateway; you only need your LLM API key and WhatsApp.

---

## Troubleshooting

- **"Command not found: openclaw"**  
  Install OpenClaw and ensure it’s on your PATH.

- **"No such file or directory" when running setup.sh**  
  Make sure you’re in the extracted folder (the one that contains `setup.sh` and `Growth-Lead/`).

- **Growth-Lead doesn’t respond in WhatsApp**  
  Confirm the gateway is running and the WhatsApp channel is connected. Restart the gateway after running `setup.sh`.

- **I want to rename Growth-Lead to [MyName]-Lead**  
  After running `setup.sh`, rename the folder inside your OpenClaw workspace (e.g. `~/.openclaw/workspace/personas/Growth-Lead` → `~/.openclaw/workspace/personas/YourName-Lead`). Update your chat channel to point at the renamed persona if required by your setup.

---

## What’s in this package

| Item | Description |
|------|-------------|
| **Growth-Lead/** | Persona files: IDENTITY, SOUL, MEMORY, HEARTBEAT, RHYTHMS, SAFETY, TOOLS (distribution only; never creates content) |
| **X-Growth-Skill/** | X_POSTING_PROTOCOL.md (autonomous posting with timing and governance) |
| **Shared/** | REVERSIBILITY_TIERS, DAILY_REPORT_FORMAT, VETO_PROTOCOL |
| **Diagrams/** | Two high-res diagrams (Three-Component Merge, Growth Flywheel) |
| **Quickstart/** | Founder rules, example mandates, ROI tracking template, example high-converting campaigns |
| **setup.sh** | One-command installer into OpenClaw workspace |

---

© 2026 ApexORCA.io — All rights reserved. Built for your success.
