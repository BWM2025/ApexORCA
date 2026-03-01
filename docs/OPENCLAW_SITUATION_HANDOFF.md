# OpenClaw Situation — Complete Handoff for Next Helper

**Purpose:** So another thread or person can understand exactly what’s going on and what’s been tried, without re-explaining or repeating the same failed steps.

**Machine:** MacBook Pro 2014, macOS Big Sur 11.7. User: RECESS1. Home: `/Users/RECESS1`.

**What the user needs:** OpenClaw gateway **running and staying running** so they can open the TUI anytime and use the agent. Also the ApexORCA site deployed so the “site/dashboard 404” alert stops (separate from marketplace product 404s, which are fixed in code).

---

## Scale of the runaround (from conversation export)

From the exported Cursor conversation (`cursor_apexorca_and_felixcraft_ai_compa.md`):

- **User explicitly asked to get OpenClaw running / keep it running / "I need it running"** at least **10+ times** in different messages (e.g. "having trouble getting open claw", "I had OpenClaw running... what's going on?", "get this fucking running", "I've asked for it 50 fucking times", "I need my fucking system up and running", "Set it up so it's fucking working right now", "How many fucking times have I said that?", etc.).
- **"Connection error" in the TUI** appears **dozens of times** in a single paste (repeated lines in the export around 11851–11981 and similar blocks).
- User said they were sent in **"the fourth circle... doing the same fucking thing"** and to **stop making files** and give **instructions inline**.
- User reported **13 hours one day, 14.5 the day before, 19.5 the day before that** trying to get things live, not eating, no money left.
- Multiple **new terminals / quit and restart Terminal** because of too many windows and the same steps repeated.
- **WhatsApp linking** also failed repeatedly in the export (408 Request Time-out, QR attempts ended).

So the next helper should assume: the user has already been through many cycles of "run this, then run that", new docs, new scripts, and inline pastes. The goal is **one working flow** that gets the gateway up and keeps it up, **without** adding more doc variants or "try this then try that" options.

---

## Problems (exact)

1. **dyld: Symbol not found — Node crash on login / in some terminals**  
   - Error: `Symbol not found: __ZNSt3__113basic_filebufIcNS_11char_traitsIcEEE4openEPKcj`, `Referenced from: /usr/local/bin/node (which was built for Mac OS X 13.5)`, `Expected in: /usr/lib/libc++.1.dylib`.  
   - Cause: `/usr/local/bin/node` was built for macOS 13.5; Big Sur’s system libc++ doesn’t have that symbol, so that Node binary crashes.  
   - Effect: Anything that invokes `node` (or a script that uses system PATH and ends up calling that Node) can crash or print this repeatedly. OpenClaw itself is installed via official curl installer under `~/.openclaw/` and bundles its own Node at `~/.openclaw/tools/node-v22.22.0/bin/node` — that one is fine **if** the shell PATH puts `$HOME/.openclaw/bin` first so `openclaw` uses it.

2. **“Gateway already running” but TUI shows “Connection error” for hours**  
   - User runs something like `openclaw gateway --port 18789 & sleep 10 && openclaw tui`.  
   - OpenClaw reports gateway already running (e.g. pid 78542), port 18789 in use.  
   - TUI starts but never connects: repeated “Connection error.”  
   - Cause: The process holding 18789 is a **stale** gateway (or an old LaunchAgent instance) that no longer accepts WebSocket connections. So “already running” is misleading — the listener is dead or stuck.  
   - Effect: User thinks gateway is up but can’t use the agent.

3. **LaunchAgent (daemon) doesn’t keep the gateway up**  
   - Plist: `~/Library/LaunchAgents/ai.openclaw.gateway.plist` (installed by OpenClaw onboarding).  
   - Observed: `openclaw gateway status` shows “Gateway service not loaded” or “Runtime: stopped (state pending)”, while port 18789 is sometimes busy (e.g. PID 30659, `node … openclaw-gateway`). So either the supervised service exits right after start, or something else is holding the port and the service isn’t the one listening.  
   - Likely cause on Big Sur: LaunchAgent runs with minimal environment; if PATH isn’t set in the plist, it may use `/usr/local/bin/node` (the broken one) and crash, or OpenClaw’s CLI may not be found.  
   - Effect: User cannot rely on “start once, stays running”; they have to keep starting it or leave a terminal open.

4. **Port 18789 conflicts**  
   - Multiple times the port was in use by a process that wasn’t a healthy gateway (stale PID 78542, 30659, etc.).  
   - Effect: New gateway can’t bind, or TUI connects to nothing useful. Killing the PID on 18789 and then starting a fresh gateway was part of what eventually got a working TUI session.

5. **Site/dashboard 404 (separate from OpenClaw)**  
   - OpenClaw’s HEARTBEAT (in `~/.openclaw/workspace/HEARTBEAT.md`) tells the agent to fetch `https://apexorca.io/dashboard`.  
   - That URL returns 404 / “deployment not found” because nothing is deployed there (or the Vercel project/URL is wrong).  
   - This is **not** the same as the marketplace product 404s (those were fixed in code). Fix is deployment: push repo, Vercel, Root Directory `apps/web`, set `NEXT_PUBLIC_URL`, deploy.

---

## What was tried

- **PATH fix in shell**  
  - `export PATH="$HOME/.openclaw/bin:$PATH"` so `openclaw` uses OpenClaw’s Node.  
  - Added to `~/.zshrc` (or suggested) so every new terminal has it.  
  - Result: When user runs commands with this PATH, OpenClaw CLI and gateway work; dyld errors in that session are from something else calling system Node, not from `openclaw` itself.

- **One-liner: start gateway in background then TUI**  
  - `openclaw gateway --port 18789 & sleep 10 && openclaw tui`.  
  - Result: Often failed because “gateway already running” (stale process); TUI then showed Connection error. Not reliable when port was already held by a dead/stale gateway.

- **Stop everything first, then start gateway + TUI**  
  - `openclaw gateway stop`, `launchctl bootout gui/$(id -u)/ai.openclaw.gateway`, then gateway + sleep + tui.  
  - Result: Sometimes worked: after stopping and clearing the port, a fresh gateway started and TUI connected. User saw “gateway connected | idle” at least once. Not persisted as a single “run once and forget” solution.

- **Plist fix for LaunchAgent**  
  - Edit `~/Library/LaunchAgents/ai.openclaw.gateway.plist` to add `EnvironmentVariables` / `PATH` = `$HOME/.openclaw/bin:/usr/bin:/bin` so the daemon uses OpenClaw’s Node.  
  - Documented in GET_THIS_RUNNING.md; also implemented in a setup script.  
  - Result: Script was run from this environment and timed out; user was told to run the script locally. No confirmation that the daemon then stayed running reliably after the plist edit.

- **Setup script**  
  - `scripts/setup-openclaw-gateway.sh`: add PATH to profile, fix plist PATH, stop gateway and LaunchAgent, kill PIDs on 18789, load plist, kickstart/start gateway, then print “run openclaw tui”.  
  - Result: Run from Cursor’s terminal with full permissions; script began (stopped LaunchAgent, etc.) then timed out (likely a blocking `openclaw` call or slow start). User was then given a one-block paste to run in their own Terminal.

- **Fallback one-block paste (no daemon)**  
  - Stop gateway and LaunchAgent, kill port 18789, `nohup openclaw gateway --port 18789 &`, sleep 8, then `openclaw tui`.  
  - Result: Intended so user gets one paste that starts gateway in background and opens TUI in the same window. No confirmation from user that this was run or that it worked.

- **Many doc/runbook iterations**  
  - GET_THIS_RUNNING.md was rewritten multiple times (run every time; stop-first; one-time daemon setup + “openclaw tui” anytime; single script; single paste).  
  - Result: User frustrated by “endless files” and feeling no actual progress toward “gateway stays running, I just open TUI.”

---

## What actually worked (at least once)

- **TUI connected** when: stale gateway was stopped, port 18789 cleared, and a **fresh** gateway was started (either in the same terminal or by the daemon), then `openclaw tui` was run with PATH set so `openclaw` used OpenClaw’s Node. User saw “gateway connected | idle” and “agent main | session main (openclaw-tui) | xai/grok-4”.
- **Stopping the mess:** `openclaw gateway stop` plus `launchctl bootout gui/$(id -u)/ai.openclaw.gateway` (and when needed killing the PID on 18789) was necessary before a clean start.

---

## What was never achieved

- **Gateway staying running reliably** after closing the terminal or across reboots, without the user having to run a multi-step block or leave a terminal open. The LaunchAgent path was never confirmed as “fixed and stable” on this machine.
- **Single, definitive “do this once then just run openclaw tui”** flow that the user could rely on.

---

## OpenClaw install and paths (for reference)

- Install: Official curl installer; lives under `~/.openclaw/` (not npm). Binary: `~/.openclaw/bin/openclaw`. Node: `~/.openclaw/tools/node-v22.22.0/bin/node`.
- Workspace (HEARTBEAT, etc.): `~/.openclaw/workspace`. Agent config: `~/.openclaw/agents/main/agent/auth-profiles.json` (xAI/Grok key was configured).
- Gateway port: 18789. Default URL: `ws://127.0.0.1:18789`.

---

## Kill switch (stop gateway + revoke token)

- **Stop gateway:** `openclaw gateway stop`. If port 18789 is stuck: `lsof -i :18789`, then `kill <PID>`. Unload LaunchAgent: `launchctl bootout gui/$(id -u)/ai.openclaw.gateway`.
- **Revoke/change token:** Change `gateway.auth.token` in `~/.openclaw/openclaw.json` (or workspace OpenClaw config) to a new value; restart the gateway. TUI and browser will need the new token. See **docs/OPENCLAW_SETUP_DONE_NEXT_STEPS.md** for the full "Kill switch" section.

---

## Suggested next steps for whoever helps next

1. **Reproduce on their side if possible:** On a Big Sur (or similar) Mac, install OpenClaw, then try to get the gateway to stay running via the LaunchAgent and confirm TUI connects after reboot or after closing all terminals.
2. **Verify plist:** Ensure `~/Library/LaunchAgents/ai.openclaw.gateway.plist` has `EnvironmentVariables` → `PATH` including `$HOME/.openclaw/bin` (or the full path to that directory) so the daemon never uses `/usr/local/bin/node`.
3. **Single runnable flow:** One script or one paste that: (a) stops gateway and unloads LaunchAgent, (b) kills any process on 18789, (c) starts the gateway (either via LaunchAgent with fixed plist or via nohup in background), (d) verifies gateway is up, (e) tells user to run `openclaw tui`. No extra doc iterations — just make that flow work and leave one short instruction.
4. **Site 404:** Separate task. Deploy the ApexORCA app to Vercel (Root Directory `apps/web`, set `NEXT_PUBLIC_URL`). See LAUNCH_CHECKLIST_COMPLETE.md in this repo.

---

## Files in this repo that reference OpenClaw / gateway / running

- **docs/OPENCLAW_SETUP_DONE_NEXT_STEPS.md** — Gateway, TUI, token, kill switch.
- **scripts/start-openclaw-gateway-with-env.sh** — Start gateway with env loaded from repo root `openclaw.env`.

This handoff is the full picture so the next person doesn’t repeat the same attempts and can focus on making the gateway stay running and “openclaw tui” be the only step the user needs.
