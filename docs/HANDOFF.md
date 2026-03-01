# Handoff — What’s in the workspace and what to do next

**Purpose:** So any session (Cursor, OpenClaw, Apex, or you) sees the same truth. This file is the continuity. Update it when something changes.

**Last updated:** 2026-02-28. All credentials and env vars: see **CREDENTIALS_AND_ENV.md** (repo root) for the full list, where to set them, and how agents get access.

---

## One workspace

- **Workspace path:** `/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base`
- **Rule:** Everything you see (apps/, docs/, scripts/, packages/) is the same place OpenClaw uses. One folder = one source of truth.

---

## Credentials (agent: X, Resend)

- **Where:** File **`openclaw.env`** in the **repo root**. It is filled with your keys (TWITTER_*, RESEND_*, EMAIL_FROM, BRAVE_API_KEY) from the transcript.
- **How the agent gets them:** Start the gateway with `bash scripts/start-openclaw-gateway-with-env.sh`. That script loads openclaw.env. Then the agent can post and send email.
- **Site (Vercel):** Use **`env.vercel.txt`** in the repo root — copy each line into Vercel → Project → Environment Variables so the live site has Stripe, Supabase, Resend.
- **Full vault (all accounts, passwords, keys):** **`CREDENTIALS_VAULT.txt`** in the repo root. Every credential Apex and agents need for autonomous operation is there: X API keys + X account password, Resend, Brave API + Brave account login, Grok, Vercel username + token, Stripe, Supabase (URL, keys, DB password), GitHub password, founder email. Do not commit; agents read it when they need any login or key.
- **Verified:** Env file lives in workspace; start script loads workspace openclaw.env first. No separate ~/.openclaw for agent secrets.

---

## What to do next (to get results)

1. Create **openclaw.env** in the repo root (if not already) and put in your X and Resend keys.
2. Run: `cd "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"` then `bash scripts/start-openclaw-gateway-with-env.sh`.
3. Open OpenClaw (TUI or http://127.0.0.1:18789). Ask Apex to run one test post and one test email and paste the exec output.

---

## Path with spaces

- The path contains spaces. Any script or exec that uses this path must **quote it** (e.g. `"$CODEBASE"` or `'/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base'`). Unquoted ls or exec can fail with "No such file or directory."

---

## Escalation (when agent escalates to human)

- **Support ladder:** See **docs/ESCALATION_SUPPORT_LADDER.md** — maps Tier 1 (autonomous), Tier 2 (conditional/recoverable), Tier 3 (human visibility / Moby veto) to when to escalate. REVERSIBILITY_TIERS in shared/ is the source of truth; the ladder doc is the support interpretation.

---

## Launch checklist

- **File:** docs/LAUNCH_CHECKLIST_COMPLETE.md (steps 1–24).
- Code and docs are in place; env for the agent is in the workspace (openclaw.env). Steps that only a human can do (domain, Stripe in Vercel, Supabase in Vercel, etc.) stay unchecked until done. When you complete a step, check it in that file so the next session sees progress.
