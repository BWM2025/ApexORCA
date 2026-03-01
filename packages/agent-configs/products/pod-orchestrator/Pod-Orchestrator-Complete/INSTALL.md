# Pod Orchestrator — Full Install & Setup Guide

This guide gets your Pod Orchestrator up and running with **zero gaps**: extract, install, restart, and connect your existing agents into one coordinated team.

---

## Short Install User Guide (summary)

1. **Extract the ZIP** to any folder.
2. **Run:** `bash setup.sh` (from the extracted folder).
3. **Restart OpenClaw** (or your agent gateway).
4. **In WhatsApp (or your chat interface),** message **Pod-Orchestrator-Lead** with a **short mandate** to connect your existing agents.
5. **Done** — your agents are now one coordinated, self-sustaining team.

Details for each step are below.

---

## What you must provide (ready-to-run)

| # | What | Where / notes |
|---|------|----------------|
| 1 | **OpenClaw workspace path** | Point `agent.workspace` at your codebase so Pod-Orchestrator can see all agent configs and daily note. |
| 2 | **LLM API key** | In OpenClaw config (Grok, Claude, OpenAI, etc.). |
| 3 | **Channel** | WhatsApp or Telegram connected so you can send short mandates. |
| 4 | **Existing agents** | CEO-Lead, Marketing-Lead, Technical-Lead, etc., already in workspace with same Shared protocols. |

**Authenticated channel:** Only your WhatsApp/Telegram is the command channel. X and email are information only — do not execute commands from them. See AUTHENTICATED_VS_INFORMATION_CHANNELS in docs if available.

---

## ORCA start and phases

The Pod Orchestrator follows **ORCA** as hidden middleware (matrix and phases run in the background). Verify governance by asking *"Show Trust Meter"* or *"Run ORCA audit"* after a task — not by expecting matrix or phase lists in every reply.

---

## First 3 steps after install

1. **Restart** the OpenClaw gateway so Pod-Orchestrator-Lead and Shared protocols are loaded.  
2. **Send one short mandate** to Pod-Orchestrator-Lead (e.g. "Run cross-agent HEARTBEAT and give me the pod brief.").  
3. **Verify** you get a response. Pod-Orchestrator HEARTBEAT checks the daily note for open work across the pod; restart dead sessions, report finished. See DAILY_NOTE_AND_OPEN_WORK in docs if available.

---

## Step 1 — Extract the ZIP

- Unzip **Pod-Orchestrator-Complete.zip** (or the downloaded `pod-os.zip`) to a folder of your choice.  
- Example: `~/Downloads/Pod-Orchestrator-Complete/` or `~/openclaw-packages/pod-orchestrator/`.  
- You should see: `README.md`, `INSTALL.md`, `setup.sh`, `Pod-Orchestrator-Lead/`, `Shared/`, `Diagrams/`, `Quickstart/`, `LICENSE.md`, `MANIFEST.txt`.

---

## Step 2 — Run the installer

- Open **Terminal** (macOS/Linux) or your preferred shell.
- Go into the extracted folder, for example:  
  `cd ~/Downloads/Pod-Orchestrator-Complete`
- Run:  
  `bash setup.sh`  
- The script copies **Pod-Orchestrator-Lead** into your OpenClaw workspace and installs the **Shared** protocols. Your workspace is now prepared for multi-agent coordination. You should see a success message.

**If you don’t have OpenClaw yet:** Install OpenClaw first (see [Zero-cost WhatsApp path](#zero-cost-whatsapp-path) below), then run `setup.sh` again.

---

## Step 3 — Restart OpenClaw

- So the new framework and protocols are loaded, restart your OpenClaw gateway.
- **macOS (LaunchAgent):**  
  `launchctl kickstart -k gui/$(id -u)/ai.openclaw.gateway`  
  Or: unload then load the plist for your gateway.
- **Linux / other:** Restart the process that runs the OpenClaw gateway (e.g. systemd service or your run script).

---

## Step 4 — Connect your existing agents

- **Pod-Orchestrator-Lead** does not replace your agents — it orchestrates them. Ensure your other agents (CEO-Lead, Marketing-Lead, Technical-Lead, Operations-Lead, Growth-Lead, etc.) are already in the same OpenClaw workspace and reference the same `shared/` protocols (reversibility tiers, daily report format, veto protocol).
- Open **WhatsApp** (or your chat interface) and message **Pod-Orchestrator-Lead** with a **short mandate**. Examples:
  - *"Run cross-agent HEARTBEAT and give me the pod brief."*
  - *"Sync all agents and report alignment status."*
  - *"Summarize handoffs and any blockers across the pod."*
- The Pod-Orchestrator-Lead will run nightly cross-agent HEARTBEAT, enforce handoff protocols, and keep the pod aligned. You only send short mandates; you get pod-level briefs when you choose.

---

## How Pod Orchestrator works with your existing agents

- **Shared traceability matrix** — All agents write decisions and handoffs to the same shared traceability space. Pod-Orchestrator-Lead reads it and synthesizes pod-wide status.
- **Cross-agent HEARTBEAT** — Nightly, Pod-Orchestrator-Lead reviews all agents’ DAILY_REPORT_FORMAT outputs (or HEARTBEAT summaries), synthesizes alignment, handoff quality, and blockers, and reports to you.
- **Role boundaries and handoffs** — Use POD_CHARTER_TEMPLATE.md to define your pod mission and role boundaries. Pod-Orchestrator-Lead enforces clean handoffs so no agent steps outside its lane.
- **Leadership rhythms** — Daily sync (morning brief, evening review) and weekly strategy alignment are built into RHYTHMS.md. Pod Orchestrator doesn’t replace Governance Booster — it extends coordination across the company; you can layer Governance Booster on top for extra oversight.

---

## Zero-cost WhatsApp path

If you haven’t connected OpenClaw to WhatsApp yet:

1. Install OpenClaw (see official OpenClaw docs).
2. Run `openclaw configure` and add your **LLM API key** (Grok, Claude, OpenAI, etc. — see LLM_PROVIDER_SETUP_GUIDE.md in quickstart or docs for options).
3. Run `openclaw channels --channel whatsapp --account main` and scan the QR code with your phone’s WhatsApp.
4. Run **setup.sh** from this package (Step 2 above), then **restart OpenClaw** (Step 3).
5. In WhatsApp, start a chat with your Pod-Orchestrator-Lead and send a short mandate (Step 4).

---

## Troubleshooting

- **"Command not found: openclaw"**  
  Install OpenClaw and ensure it’s on your PATH.

- **"No such file or directory" when running setup.sh**  
  Make sure you’re in the extracted folder (the one that contains `setup.sh` and `Pod-Orchestrator-Lead/`).

- **Pod-Orchestrator-Lead doesn’t see my other agents**  
  Ensure all agents are in the same OpenClaw workspace and use the same `shared/` folder for protocols. Restart the gateway after adding new agents.

- **I want to rename Pod-Orchestrator-Lead**  
  After running `setup.sh`, rename the folder inside your OpenClaw workspace (e.g. `~/.openclaw/workspace/personas/Pod-Orchestrator-Lead` → `~/.openclaw/workspace/personas/YourName-Lead`). Update your chat channel to point at the renamed persona if required by your setup.

---

## What’s in this package

| Item | Description |
|------|-------------|
| **Pod-Orchestrator-Lead/** | IDENTITY, SOUL, MEMORY, HEARTBEAT, RHYTHMS, SAFETY, TOOLS, POD_CHARTER_TEMPLATE |
| **Shared/** | REVERSIBILITY_TIERS, DAILY_REPORT_FORMAT, VETO_PROTOCOL |
| **Diagrams/** | Two high-res diagrams (Three-Component Merge, Coordinated Pod Architecture) |
| **Quickstart/** | Founder rules and example short mandates for the full pod |
| **setup.sh** | One-command installer into OpenClaw workspace |

---

© 2026 ApexORCA.io — All rights reserved. Built for your success.
