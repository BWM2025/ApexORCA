# Governance Booster — Full Install & Setup Guide

This guide gets your Governance Booster up and running with **zero gaps**: extract, run the installer, restart, and start governing.

---

## Short Install User Guide (summary)

1. **Extract the ZIP** to any folder.
2. **Run:** `bash apply-governance.sh` (from the extracted folder).
3. **Restart OpenClaw** (or your agent gateway).
4. **Governance-Lead is now active** as the wrapper layer — it will automatically audit, score, and govern any agents or pods you connect. Message your Governance-Lead with a short mandate to start using it.

Details for each step are below.

---

## What you must provide (ready-to-run)

| # | What | Where / notes |
|---|------|----------------|
| 1 | **OpenClaw workspace path** | Point `agent.workspace` so Governance-Lead can read agent HEARTBEAT logs and traceability. |
| 2 | **LLM API key** | In OpenClaw config (Grok, Claude, OpenAI, etc.). |
| 3 | **Channel** | WhatsApp or Telegram connected so you can send short mandates to Governance-Lead. |

**Authenticated channel:** Only your WhatsApp/Telegram is the command channel. X and email are information only — Governance-Lead does not execute commands from them. See AUTHENTICATED_VS_INFORMATION_CHANNELS in docs if available.

---

## ORCA start and phases

The Governance Booster follows **ORCA** as hidden middleware (matrix and phases run in the background). Verify governance by asking *"Show Trust Meter"* or *"Run ORCA audit"* after a task — not by expecting matrix or phase lists in every reply.

---

## First 3 steps after install

1. **Restart** the OpenClaw gateway so Governance-Lead and Shared protocols are loaded.  
2. **Send one short mandate** to Governance-Lead (e.g. "Run HEARTBEAT and give me the governance brief.").  
3. **Verify** you get a response.

---

## Step 1 — Extract the ZIP

- Unzip **Governance-Booster-Complete.zip** (or the downloaded `governance-booster.zip`) to a folder of your choice.  
- Example: `~/Downloads/Governance-Booster-Complete/` or `~/openclaw-packages/governance-booster/`.  
- You should see: `README.md`, `INSTALL.md`, `apply-governance.sh`, `Governance-Lead/`, `Shared/`, `Diagrams/`, `Quickstart/`, `LICENSE.md`, `MANIFEST.txt`.

---

## Step 2 — Run the installer

- Open **Terminal** (macOS/Linux) or your preferred shell.
- Go into the extracted folder, for example:  
  `cd ~/Downloads/Governance-Booster-Complete`
- Run:  
  `bash apply-governance.sh`  
- The script copies **Governance-Lead** into your OpenClaw workspace and installs the **Shared** protocols. Any existing agents that reference these protocols will now use the same governance standards. You should see a success message.

**If you don’t have OpenClaw yet:** Install OpenClaw first (see [Zero-cost WhatsApp path](#zero-cost-whatsapp-path) below), then run `apply-governance.sh` again.

---

## Step 3 — Restart OpenClaw

- So the new persona and protocols are loaded, restart your OpenClaw gateway.
- **macOS (LaunchAgent):**  
  `launchctl kickstart -k gui/$(id -u)/ai.openclaw.gateway`  
  Or: unload then load the plist for your gateway.
- **Linux / other:** Restart the process that runs the OpenClaw gateway (e.g. systemd service or your run script).

---

## Step 4 — Start using governance

- **Governance-Lead is now active** as the wrapper layer. It does not replace your agents — it wraps them. It will audit, score compliance, enforce reversibility, and veto high-risk actions when connected to your pod.
- Open **WhatsApp** (or your chat interface) and message your **Governance-Lead** with a **short mandate** to run an audit, get a compliance summary, or check on the pod. Examples:
  - *"Run HEARTBEAT and give me the governance brief."*
  - *"Audit all agents' last 24h and report compliance scores."*
  - *"Summarize top governance risks right now."*

---

## How the wrapper works

- **Governance-Lead** has READ access to agent HEARTBEAT logs and traceability matrices, WRITE access to compliance scores and recommendations, and HALT authority (veto) on any action pending CEO-Lead/founder review. It does not execute business operations — it governs.
- All agents in your workspace that reference **REVERSIBILITY_TIERS.md**, **DAILY_REPORT_FORMAT.md**, and **VETO_PROTOCOL.md** (in `shared/`) are now aligned with the same governance layer. Governance-Lead audits their outputs and scores compliance.
- When you add Pod OS or more pods later, Governance-Lead becomes the central oversight layer for the entire setup.

---

## Zero-cost WhatsApp path

If you haven’t connected OpenClaw to WhatsApp yet:

1. Install OpenClaw (see official OpenClaw docs).
2. Run `openclaw configure` and add your **LLM API key** (Grok, Claude, OpenAI, etc. — see LLM_PROVIDER_SETUP_GUIDE.md in quickstart or docs for options).
3. Run `openclaw channels --channel whatsapp --account main` and scan the QR code with your phone’s WhatsApp.
4. Run **apply-governance.sh** from this package (Step 2 above), then **restart OpenClaw** (Step 3).
5. In WhatsApp, start a chat with your Governance-Lead and send a short mandate (Step 4).

---

## Troubleshooting

- **"Command not found: openclaw"**  
  Install OpenClaw and ensure it’s on your PATH.

- **"No such file or directory" when running apply-governance.sh**  
  Make sure you’re in the extracted folder (the one that contains `apply-governance.sh` and `Governance-Lead/`).

- **Governance-Lead doesn’t respond**  
  Confirm the gateway is running and the WhatsApp (or chat) channel is connected. Restart the gateway after running `apply-governance.sh`.

- **I want to rename Governance-Lead to [MyName]-Lead**  
  After running `apply-governance.sh`, rename the folder inside your OpenClaw workspace (e.g. `~/.openclaw/workspace/personas/Governance-Lead` → `~/.openclaw/workspace/personas/YourName-Lead`). Update your chat channel to point at the renamed persona if required by your setup.

---

## What’s in this package

| Item | Description |
|------|-------------|
| **Governance-Lead/** | Persona files: IDENTITY, SOUL, MEMORY, HEARTBEAT, RHYTHMS, SAFETY, TOOLS (governance wrapper only) |
| **Shared/** | REVERSIBILITY_TIERS, DAILY_REPORT_FORMAT, VETO_PROTOCOL |
| **Diagrams/** | Two high-res diagrams (Three-Component Merge, Reversibility Tiers Pyramid) |
| **Quickstart/** | Founder rules and example short mandates |
| **apply-governance.sh** | One-command installer into OpenClaw workspace |

---

© 2026 ApexORCA.io — All rights reserved. Built for your success.
