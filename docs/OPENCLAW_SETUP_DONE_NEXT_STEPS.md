# OpenClaw setup — what’s done and what you do next

**Purpose:** Workspace is set. Here’s exactly what you do to add credentials and start the gateway so the agents can post and send email.  
**Owner:** B.W. Moore · © 2026 ApexORCA.io

---

## Done for you

- **Workspace:** `~/.openclaw/openclaw.json` now has  
  `"workspace": "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"`  
  so the agents see the full codebase (scripts, docs, apps, packages).
- **Startup script:** `scripts/start-openclaw-gateway-with-env.sh` — starts the gateway with env vars loaded from **the workspace** (same codebase OpenClaw uses).
- **One workspace:** Everything you and Cursor see (code, docs, scripts) is the same workspace OpenClaw uses. Credentials for the agent live **in that workspace** in `openclaw.env` (repo root, gitignored). No separate directory for secrets.

---

## What you do next (3 steps)

### Step 1 — Create your env file in the workspace (one time)

The env file lives **in the codebase root** (same folder as `apps/`, `docs/`, `scripts/`). One place. OpenClaw’s workspace = this folder, so the agent and you share it.

1. Open **Terminal**.
2. Run (from the codebase root):

```bash
cd "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"
cp scripts/openclaw.env.example openclaw.env
open -e openclaw.env
```

3. In the file that opens, **replace the empty quotes** with your real values:
   - **TWITTER_*** — From [developer.x.com](https://developer.x.com) → your app → Keys and tokens (API Key, API Secret, Access Token, Access Token Secret).
   - **RESEND_API_KEY** — From [resend.com](https://resend.com) → API Keys.
   - **EMAIL_FROM** — Keep as `ApexORCA <noreply@apexorca.io>` or use another address you verified in Resend.

4. Save and close. `openclaw.env` is in `.gitignore` — it is not committed. It lives in the workspace so OpenClaw and you use the same place.

### Step 2 — Start the gateway with env loaded

In Terminal:

```bash
cd "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"
bash scripts/start-openclaw-gateway-with-env.sh
```

If you see “Loaded env from ...” and “Gateway starting,” you’re good. If you see “No env file found,” do Step 1 first.

### Step 3 — Open the TUI or browser

- **Browser (easiest):** Open **http://127.0.0.1:18789** — if it asks for a token, use: `apexorca-secure-2026`
- **TUI:** In a new terminal, pass the gateway token so it matches the gateway:
  ```bash
  export PATH="$HOME/.openclaw/bin:$PATH"
  openclaw tui --token apexorca-secure-2026
  ```
  If you see "unauthorized" or "token_mismatch", the TUI wasn’t sending the token; the `--token` flag fixes that.

Then tell Apex: “Workspace is the codebase. Env is set. Run one test post and one test email and show me the exec output.”

---

## If the gateway was already running

Stop it first so it picks up the new workspace and env:

```bash
export PATH="$HOME/.openclaw/bin:$PATH"
openclaw gateway stop
sleep 3
```

Then run Step 2 above (the start script now stops any existing gateway before starting).

---

## Kill switch: stop gateway or revoke/change token

**Stop the gateway (emergency stop):**

```bash
export PATH="$HOME/.openclaw/bin:$PATH"
openclaw gateway stop
```

If the process is stuck, kill whatever is on port 18789: `lsof -i :18789` then `kill <PID>`. On macOS you can also unload the LaunchAgent: `launchctl bootout gui/$(id -u)/ai.openclaw.gateway` (see **docs/OPENCLAW_SITUATION_HANDOFF.md** for full steps).

**Revoke or change the token** (so TUI/browser must re-authenticate):

1. Edit the gateway config where the token is set. Typically `~/.openclaw/openclaw.json` under `gateway.auth.token` (or the same in the workspace if your setup uses a local config). Change the token value to a new secret.
2. Restart the gateway (`openclaw gateway stop` then run `bash scripts/start-openclaw-gateway-with-env.sh` again).
3. Anyone using the old token (TUI or browser) will get "unauthorized" until they use the new token. Share the new token only through a secure channel.

---

## If you see "token_mismatch" or "unauthorized" when opening TUI

The gateway expects the token set in `openclaw.json` (`gateway.auth.token`). Use it when starting the TUI:

```bash
openclaw tui --token apexorca-secure-2026
```

Or in the browser at http://127.0.0.1:18789, if it asks for a token, enter: **apexorca-secure-2026**

---

## If you see "WhatsApp session logged out" / 401 in the logs

WhatsApp needs to be re-authenticated. Run:

```bash
openclaw channels login
```

Follow the prompts (e.g. QR scan). This is optional if you only want to use the browser or TUI to talk to Apex.

---

## If you see "dyld: Symbol not found" or "built for Mac OS X 13.5"

That means `/usr/local/bin/node` was built for a newer macOS than yours; the system’s libc++ doesn’t match. **Fix:** Use Node from **nvm** (or install Node for your macOS version). See **docs/BUILDER_BIG_SUR_NOTES.md** for the full steps (load nvm, `nvm use 18`, ensure nvm’s `node` is first in PATH, then run openclaw). Once nvm’s Node is first in PATH, the dyld error goes away.

---

## Summary

| Done | You do |
|------|--------|
| Workspace in openclaw.json = ApexORCA code base | Create **openclaw.env** in the codebase root (same workspace) with your X + Resend keys |
| Start script loads env from workspace | Run `bash scripts/start-openclaw-gateway-with-env.sh` |
| — | Open TUI or http://127.0.0.1:18789 and test with Apex |

After that, the agents can run `scripts/post_tweet_env.sh` and `scripts/send_email_resend.ts` and prove they can post and send email.
