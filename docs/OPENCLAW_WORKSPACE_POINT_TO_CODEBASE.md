# OpenClaw: Point Workspace to ApexORCA Code Base (Exact Steps)

**Goal:** So Apex and the pod have **full access** to the same codebase you see in Cursor (apps/web, docs, packages, scripts, content, memory, infra — **every file and folder**). One folder = one source of truth; OpenClaw gets full read/write to everything in the workspace path with **no exclusions**. See also docs/ONE_CODEBASE_SAME_VIEW.md and docs/OPENCLAW_FULL_ACCESS_WORKSPACE_VERIFICATION.md. Do these in order.

---

## Step 1 — Copy current workspace files into the codebase (so you don’t lose them)

Open **Terminal** and run:

```bash
OLD_WS="$HOME/.openclaw/workspace"
CODEBASE="/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"

# Create a small folder in the codebase for OpenClaw run-time state (optional; or copy to codebase root)
mkdir -p "$CODEBASE/.openclaw-workspace"

# Copy everything from the current workspace into that folder
cp -R "$OLD_WS"/* "$CODEBASE/.openclaw-workspace/" 2>/dev/null || true
cp "$OLD_WS"/.gitignore "$CODEBASE/.openclaw-workspace/" 2>/dev/null || true

# If you prefer workspace files at codebase root instead, use this instead of the above:
# cp -R "$OLD_WS"/* "$CODEBASE/" 2>/dev/null || true
```

If you’d rather keep HEARTBEAT, PROMO_QUEUE, etc. at the **root** of the codebase (so the agent sees them next to `apps/` and `docs/`), run this instead of the block above:

```bash
OLD_WS="$HOME/.openclaw/workspace"
CODEBASE="/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"
cp -n "$OLD_WS"/*.md "$CODEBASE/" 2>/dev/null || true
cp -n "$OLD_WS"/*.txt "$CODEBASE/" 2>/dev/null || true
mkdir -p "$CODEBASE/memory"
cp -R "$OLD_WS"/memory/* "$CODEBASE/memory/" 2>/dev/null || true
# Copy personas if you have custom ones in the old workspace
cp -R "$OLD_WS"/personas "$CODEBASE/" 2>/dev/null || true
```

---

## Step 2 — Set OpenClaw’s workspace to the codebase path

**2a.** Open the config file (create it if it doesn’t exist):

```bash
open -e "$HOME/.openclaw/openclaw.json"
```

If the file doesn’t exist, create it with this content (use your actual path):

```json
{
  "agent": {
    "workspace": "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"
  }
}
```

**2b.** If the file already exists and has other keys, add or update only the `agent.workspace` line so it looks like the above. The path must be the **full path** (no `~` — use `/Users/RECESS1/...`).

**2c. (Recommended)** To have the pod see the **same view as your sidebar** (codebase + APEXORCA_ALL_FILES_IN_ONE.md + APEXORCA_FULL_MANIFEST_AND_TREE.md in one place), set `agent.workspace` to the **parent** folder instead:

```json
"workspace": "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026"
```

Then the agents see the codebase folder, the all-in-one file, and the manifest tree together. When they change files, they must run the script and update the manifest per docs/ONE_CODEBASE_SAME_VIEW.md.

Save and close.

---

## Step 3 — Restart OpenClaw so it picks up the new workspace

In Terminal:

```bash
export PATH="$HOME/.openclaw/bin:$PATH"
openclaw gateway stop
sleep 2
openclaw gateway --port 18789 &
sleep 3
```

Then open the TUI or browser:

```bash
openclaw tui
```

Or open: **http://127.0.0.1:18789**

---

## Step 4 — What to say to Apex (copy and paste)

After you’ve done Steps 1–3 and opened a new chat (or the TUI), send this to Apex:

---

**Copy from here:**

Your workspace is now the ApexORCA codebase (same as what the founder sees in Cursor). You have full access to read and edit the repo. Follow docs/AUTONOMOUS_OPERATING_PARAMETERS.md and the pre-deploy checklist. When you or Oreo change the codebase (add/remove/move files), run `python3 scripts/build-all-files-markdown.py` from ApexORCA Code Base and update APEXORCA_FULL_MANIFEST_AND_TREE.md — see docs/ONE_CODEBASE_SAME_VIEW.md. Confirm you see the full codebase (apps/web, docs, packages, scripts).

**Copy to here.**

---

## If something goes wrong

- **Agent still doesn’t see apps/web:** Check that `~/.openclaw/openclaw.json` has the correct full path (no typo, no `~`). Restart the gateway again.
- **Revert:** Set `agent.workspace` back to `"$HOME/.openclaw/workspace"` (or `~/.openclaw/workspace`) in openclaw.json and restart. Your old workspace files are still in `~/.openclaw/workspace`.

---

## Summary

| What you did | Why |
|--------------|-----|
| Copied old workspace files into the codebase | So HEARTBEAT, PROMO_QUEUE, memory, etc. aren’t lost. |
| Set `agent.workspace` to the codebase path in openclaw.json | So OpenClaw uses the codebase as the workspace (one source of truth). |
| Restarted the gateway | So the new workspace path is loaded. |
| Sent the message to Apex | So Apex knows it has full access and what to do. |

No duplication of the repo. One folder = codebase = workspace. OpenClaw has **full access to everything** in that path; there are no exclusions. See docs/OPENCLAW_FULL_ACCESS_WORKSPACE_VERIFICATION.md to verify.

---

## Test after Step 3

In the UI, message Apex: **"Workspace test: run ls docs/ and list 5 files."** You should see e.g. LAUNCH_CHECKLIST_COMPLETE.md, ORCA_CORE_REFERENCE.md. If not, check `~/.openclaw/openclaw.json`: use `agent.workspace` (full path to codebase or parent folder), not `openclaw config set` — this codebase uses the JSON config.
