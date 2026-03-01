# Verification Checklist — Full Autonomy (No Bottlenecks)

**Purpose:** One checklist so you can confirm the pod is **fully capable** and **actually working** — not just saying it. When every item is done, the company can run with full autonomy and your approvals only where critically needed (Tier 3).

**Founder:** B.W. Moore · **Date:** February 2026

---

## 1. Workspace and codebase access

| # | Item | How to verify | Done? |
|---|------|----------------|-------|
| 1.1 | OpenClaw workspace points at codebase (or parent) | Check `~/.openclaw/openclaw.json` (or equivalent): `agent.workspace` = full path to ApexORCA codebase or parent folder. Restart gateway after change. | [ ] |
| 1.2 | Agent can see scripts and docs | From OpenClaw, agent can read e.g. `scripts/post_tweet_env.sh`, `scripts/send_email_resend.ts`, `docs/TEAM_X_AND_EMAIL_UNBLOCK.md`. | [ ] |

**Reference:** docs/OPENCLAW_WORKSPACE_POINT_TO_CODEBASE.md

---

## 2. X (Twitter) posting

| # | Item | How to verify | Done? |
|---|------|----------------|-------|
| 2.1 | Four X API values in pod environment | TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET set where OpenClaw/pod runs (env or config). Not in repo. | [ ] |
| 2.2 | Exec allowed for post script | Agent can run e.g. `./scripts/post_tweet_env.sh "Test"` or equivalent from workspace; no security deny. | [ ] |
| 2.3 | Founder approval to post | You have told the pod: “Approved to post from PROMO_QUEUE 1–2/day” (or equivalent). | [ ] |
| 2.4 | **Live test** | One real post from the pod. Check https://x.com/ApexORCA2026 (or your handle) — new post visible. | [ ] |

**Reference:** docs/TEAM_X_AND_EMAIL_UNBLOCK.md §2

---

## 3. Email (pod sending)

| # | Item | How to verify | Done? |
|---|------|----------------|-------|
| 3.1 | Resend API key + EMAIL_FROM in pod environment | RESEND_API_KEY and EMAIL_FROM set where OpenClaw/pod runs. Domain apexorca.io verified in Resend. | [ ] |
| 3.2 | Exec allowed for email script | Agent can run e.g. `npx tsx scripts/send_email_resend.ts` with env vars; no security deny. | [ ] |
| 3.3 | **Live test** | Pod sends one test email to your address (e.g. thinkconceptsinc@gmail.com). You receive it. | [ ] |

**Reference:** docs/TEAM_X_AND_EMAIL_UNBLOCK.md §3

---

## 4. Browser (X profile, scraping)

| # | Item | How to verify | Done? |
|---|------|----------------|-------|
| 4.1 | Chrome extension attached | When the pod uses the browser tool, a Chrome tab is attached and extension badge is ON. | [ ] |
| 4.2 | **Optional live test** | Pod edits X profile (bio/photo) via browser; you see the change on x.com. | [ ] |

---

## 5. Dashboard and revenue

| # | Item | How to verify | Done? |
|---|------|----------------|-------|
| 5.1 | Dashboard shows real Stripe data | Open https://apexorca.io/dashboard (or your deploy). Numbers match Stripe (or $0 if no sales). No hardcoded placeholder. | [ ] |
| 5.2 | Stripe webhook secret in production | STRIPE_WEBHOOK_SECRET (whsec_...) set in Vercel (or production env) for live checkout. | [ ] |

---

## 6. Autonomy and approvals (no unnecessary bottlenecks)

| # | Item | How to verify | Done? |
|---|------|----------------|-------|
| 6.1 | Tier 1/2 = autonomous | REVERSIBILITY_TIERS and AUTONOMOUS_OPERATING_PARAMETERS are in effect: Tier 1/2 actions (posts, drafts, recoverable deploys, content) do not require your approval each time. | [ ] |
| 6.2 | Tier 3 = approval only | Stripe changes, legal, irreversible actions: pod proposes and waits for you (or Apex on your behalf with prior auth). | [ ] |
| 6.3 | Moby veto only for governance | Moby does not block Tier 1/2; only halts on compliance/reversibility violation. VETO_PROTOCOL referenced. | [ ] |

**Reference:** REVERSIBILITY_TIERS.md, AUTONOMOUS_OPERATING_PARAMETERS.md, VETO_PROTOCOL.md

---

## 7. Agent truthfulness and verification

| # | Item | How to verify | Done? |
|---|------|----------------|-------|
| 7.1 | Agents have tool inventory | All personas (Apex, Echo, Oreo, Sonar, Fin, Moby) can see docs/TOOL_INVENTORY_AND_CAPABILITIES.md (in workspace or linked from IDENTITY/SAFETY). | [ ] |
| 7.2 | No success without tool confirmation | Agents do not report “post live” or “email sent” unless the relevant tool (exec, browser) confirmed success. Failures reported honestly. | [ ] |

**Reference:** docs/TOOL_INVENTORY_AND_CAPABILITIES.md §5, docs/REALITY_CHECK_WHAT_POD_CAN_ACTUALLY_DO.md

---

## 8. Optional (growth / research)

| # | Item | How to verify | Done? |
|---|------|----------------|-------|
| 8.1 | Brave API key (web_search) | Set in OpenClaw config (web section) if pod should use web_search for lead research. | [ ] |
| 8.2 | Supabase (purchases/decisions) | SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in Vercel if dashboard should show purchases table. | [ ] |

---

## Summary: “Fully capable” when

- **2.4** and **3.3** are done (one real X post, one real email received).
- **1.1**, **2.1**, **3.1** are done (workspace, X keys, Resend keys).
- **6.1**, **6.2**, **6.3** are in effect (autonomy for Tier 1/2, approval only for Tier 3, Moby veto only for governance).

Then the pod can act every day without bottlenecks; you approve only where critical.

**Run this checklist after any credential or workspace change to re-verify.**
