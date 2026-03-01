# Master Setup & Completion Checklist — No Gaps

**Purpose:** One list of **everything** that must be set up or done to complete the site and the full build. Each item is labeled **NEEDS YOU** (only you can do it), **DONE** (already implemented), or **TO DO** (we can do in code/docs). For every **NEEDS YOU** item there are step-by-step instructions below. Nothing is omitted.

**Why some things were left out at first:** You said zero budget — so anything that added a *paid* service at launch (Pinecone, Sentry, Make.com, Railway, proxies, crypto checkout, etc.) was deferred so we didn’t add cost before sales. That was the constraint, not a vague “worry.” The **full** build (including those) is now in `docs/FULL_BUILD_SPEC_AND_COST_INTEL.md` with exact costs and when to add each. This checklist covers both: (1) what to do **now** to finish launch, and (2) what exists for **later** (Phase 1+ in the cost doc).

**What’s built vs what’s not:**  
- **Built (Phase 0):** Dashboard Stripe notice, cron example doc, X rate limit in protocol, Email Fortress doc, escalation ladder doc, kill switch in docs, evidence outputs doc, transparency footer, HEARTBEAT, OpenClaw gateway script, Stripe/playbook/marketplace, REVERSIBILITY_TIERS, VETO, persona configs, proof scripts (they exist; they need *you* to run them and to have Resend/X credentials).  
- **Not built yet (need you):** Resend domain verification, creating `openclaw.env` and running the proof script, deploying the site if not already live.  
- **Not built yet (Phase 1+):** Sentry, Pinecone, Helio, Make.com, Railway, etc. — all are **spec’d and costed** in `FULL_BUILD_SPEC_AND_COST_INTEL.md`; you add them when you’re ready (after first sale, etc.).

---

## Quick key

| Label | Meaning |
|-------|--------|
| **NEEDS YOU** | Only you can do it (credentials, Resend dashboard, running a script on your machine, deployment, etc.). Instructions are in the section below. |
| **DONE** | Already implemented in repo/docs. |
| **TO DO** | Can be done in code or docs; either already done in this pass or instructions given. |
| **Phase 1+** | Add after first sale; see `FULL_BUILD_SPEC_AND_COST_INTEL.md` Part C (costs) and Part D (phases). |

---

## 1. NEEDS YOU — Complete instructions for each

Do these in order. Each one has exact steps.

---

### 1a — Resend: verify domain apexorca.io

**Why:** Proof emails (and any production email from apexorca.io) will only send once the domain is verified in Resend.

**Steps:**

1. Log in at [resend.com](https://resend.com).
2. Go to **Domains** and add **apexorca.io** (or your sending domain) if it’s not already added.
3. Resend will show DNS records (e.g. MX, TXT, DKIM). In your DNS provider (e.g. Porkbun, Cloudflare), add exactly those records.
4. In Resend, click **Verify**. Wait until status is **Verified**.
5. Keep **EMAIL_FROM** as `ApexORCA <noreply@apexorca.io>` (or the address you verified) in `openclaw.env`.

**Done when:** Resend shows the domain as **Verified**.

---

### 1b — Create openclaw.env and add credentials

**Why:** The proof script and OpenClaw need X (Twitter) and Resend keys to post and send email.

**Steps:**

1. Open **Terminal**.
2. Go to the codebase root:
   ```bash
   cd "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"
   ```
3. Create env from the example:
   ```bash
   cp scripts/openclaw.env.example openclaw.env
   open -e openclaw.env
   ```
4. Fill in every empty `""`:
   - **TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET** — From [developer.x.com](https://developer.x.com) → your app → Keys and tokens.
   - **RESEND_API_KEY** — From Resend → API Keys (create one if needed).
   - **EMAIL_FROM** — `ApexORCA <noreply@apexorca.io>` (must match a verified sender in Resend).
5. Save and close. Do **not** commit `openclaw.env` (it’s in `.gitignore`).

**Done when:** `openclaw.env` exists in the codebase root and contains real values (no empty quotes).

---

### 1c — Run the proof script (3 emails + 1 X post)

**Why:** Proves the stack works: Resend + X with your credentials.

**Steps:**

1. Resend domain must be **Verified** (1a) and `openclaw.env` must be filled (1b).
2. In Terminal:
   ```bash
   cd "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"
   bash scripts/run-proof-emails-and-x-post-bigsur.sh
   ```
3. You should see three “SENT” (emails) and one “X post: SENT.” Check your inbox and X.

**Done when:** You received the three proof emails and see the post on X. If anything fails, check Resend dashboard for bounces and X app permissions.

---

### 1d — Start OpenClaw gateway (when you want to use the agent)

**Why:** So you can talk to Apex via TUI or browser.

**Steps:**

1. In Terminal:
   ```bash
   cd "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"
   export PATH="$HOME/.openclaw/bin:$PATH"
   bash scripts/start-openclaw-gateway-with-env.sh
   ```
2. When you see “Gateway starting” (or similar), open either:
   - **Browser:** [http://127.0.0.1:18789](http://127.0.0.1:18789) — if prompted for token, use: `apexorca-secure-2026`
   - **TUI:** In a **new** terminal:
     ```bash
     export PATH="$HOME/.openclaw/bin:$PATH"
     openclaw tui --token apexorca-secure-2026
     ```

**Done when:** You can send a message to Apex and get a response. If you see “token_mismatch” or “unauthorized”, use the token exactly as above (see `docs/OPENCLAW_SETUP_DONE_NEXT_STEPS.md`).

---

### 1e — Deploy the website (if not already live)

**Why:** So apexorca.io (or your domain) serves the app and dashboard.

**Steps:**

1. Push the repo to GitHub (if you use Vercel from GitHub).
2. In Vercel: Import the repo (or use existing project). Set **Root Directory** to `apps/web`.
3. Add environment variables from your `env.vercel.txt` (or from `docs/ENV_VARS_REFERENCE.md`): Stripe, Supabase, Resend, etc.
4. Deploy. Set your domain (e.g. apexorca.io) in Vercel.
5. Confirm: [https://apexorca.io/dashboard](https://apexorca.io/dashboard) (or your URL) loads and shows the Stripe-only notice.

**Done when:** The site is live and the dashboard loads with no 404.

---

### 1f — Stripe products and webhook (if not already done)

**Why:** So playbook (and other products) can be purchased.

**Steps:**

1. In Stripe Dashboard, create products/prices that match `apps/web/lib/products.ts` (or your product list) — see `docs/STRIPE_PRODUCTS_AND_CODEBASE_ALIGNMENT.md`.
2. Set **Webhook** endpoint to `https://apexorca.io/api/stripe/webhook` (or your domain) and subscribe to `checkout.session.completed` (and any other events you use).
3. Add **STRIPE_WEBHOOK_SECRET** and **STRIPE_SECRET_KEY** to Vercel env (and to `env.vercel.txt` for your reference).

**Done when:** A test purchase completes and the webhook runs (order or revenue visible in dashboard).

---

### 1g — ApexORCA token (later, done outside — not a launch task)

**Why:** Per the FELIX model, the token is **not** something you do as part of launch. It’s **later** and **done outside** by community or a third party. You don’t deploy it now.

**Your role now:** Nothing. Ship launch (1a–1f). When a community/third party launches the ApexORCA token (name ApexORCA, symbol APEX/APEXO) on Base, you can add **dashboard tracking** then. You associate; you don’t issue.

**Who does the launch (when it happens):** Community or third party. Steps for whoever deploys: `docs/ORCA_TOKEN_LAUNCH_NOW.md`. Plan and legal: `docs/APEXORCA_TOKEN_PLAN_FELIX_MODEL_AND_LEGAL.md`.

**Done when:** N/A for launch. Token exists when community/third party deploys; you add tracking when it does.

---

## 2. DONE — Already implemented (no action unless you want to change something)

| # | Item | Where |
|---|------|--------|
| 1 | Dashboard “Stripe revenue only” notice | `apps/web/app/dashboard/page.tsx`, `apps/web/components/dashboard/live-revenue.tsx` |
| 2 | Cron example doc | `docs/OPENCLAW_CRON_EXAMPLE.md` |
| 3 | X rate limit (max 2 posts/day, 1 per 6h) | `packages/agent-configs/personas/sonar/X_POSTING_PROTOCOL.md` |
| 4 | Email Fortress (email = data not commands) | `docs/EMAIL_AS_DATA_NOT_COMMANDS.md` |
| 5 | 3-tier escalation ladder | `docs/ESCALATION_SUPPORT_LADDER.md` (linked from `docs/HANDOFF.md`) |
| 6 | Kill switch (stop gateway + revoke token) | `docs/OPENCLAW_SETUP_DONE_NEXT_STEPS.md`, `docs/OPENCLAW_SITUATION_HANDOFF.md` |
| 7 | Evidence outputs (post/email/deploy) | `docs/EVIDENCE_OUTPUTS.md`; referenced in `docs/TOOL_INVENTORY_AND_CAPABILITIES.md` |
| 8 | Transparency footer | `apps/web/components/footer.tsx` |
| 9 | TUI/token instructions | `docs/OPENCLAW_SETUP_DONE_NEXT_STEPS.md` |
| 10 | HEARTBEAT short and consistent | `HEARTBEAT.md`, `AGENTS.md` |
| 11 | Gateway start script with env | `scripts/start-openclaw-gateway-with-env.sh` |
| 12 | Proof script (Big Sur) | `scripts/run-proof-emails-and-x-post-bigsur.sh` |
| 13 | OpenClaw env example | `scripts/openclaw.env.example` |
| 14 | Full build + cost intel | `docs/FULL_BUILD_SPEC_AND_COST_INTEL.md` |
| 15 | Gap checklist + master spec | `docs/FELIXCRAFT_INTEL_GAP_CHECKLIST_AND_MASTER_SPEC.md` |
| 16 | Implementation checklist (Phase 0) | `docs/MASTER_SPEC_IMPLEMENTATION_CHECKLIST.md` |
| 17 | Financial guardrail mention | `docs/AUTONOMOUS_OPERATING_PARAMETERS.md` (see below) |
| 18 | Skill allowlist doc | `docs/OPENCLAW_SKILL_ALLOWLIST.md` (see below) |

---

## 3. TO DO (we can do) — Implemented in this pass or do when needed

| # | Item | Status | Where / instructions |
|---|------|--------|----------------------|
| 1 | Financial guardrail ($50 API cap or alert) | **Done in this pass** | Added to `docs/AUTONOMOUS_OPERATING_PARAMETERS.md` |
| 2 | Skill allowlist (approved OpenClaw skills) | **Done in this pass** | Created `docs/OPENCLAW_SKILL_ALLOWLIST.md` |
| 3 | Trust Meter / ORCA audit runnable | Optional | When you want it: one script or doc that outputs “ORCA Certified: Yes/No”; can be a small script that checks HEARTBEAT + REVERSIBILITY_TIERS + SAFETY refs. |
| 4 | Treasury link on dashboard | When you have a Base wallet | Add `NEXT_PUBLIC_TREASURY_ADDRESS` or link in dashboard; optional until revenue. |
| 5 | Regenerate all-in-one and manifest after file changes | When you add/remove/move files | Run: `cd "ApexORCA Code Base"` then `python3 scripts/build-all-files-markdown.py` then `python3 scripts/build-manifest-tree.py`. See `docs/ONE_CODEBASE_SAME_VIEW.md`. |

---

## 4. Phase 1+ (after first sale) — No gaps; add when ready

Everything below is **on the list** so nothing is forgotten. Costs and exact steps are in `docs/FULL_BUILD_SPEC_AND_COST_INTEL.md` (Part C = costs, Part D = phases).

| # | Item | What you do | Cost (see Part C) |
|---|------|-------------|-------------------|
| 1 | Sentry (errors) | Sign up, free plan; add DSN to app | Free 5k errors/mo |
| 2 | Pinecone (vector memory) | Sign up, free tier; add to agent flow if you want RAG | Free 2GB |
| 3 | Helio / MoonPay Commerce (crypto checkout) | Sign up, integrate widget; 2% per txn | $0 upfront |
| 4 | Treasury link on dashboard | Add BaseScan link when you have wallet | $0 |
| 5 | File-based audit log | Log tool runs to file or memory/ | $0 |
| 6 | Make.com (automation) | Free tier for “sale → Discord” etc. | Free 1k ops |
| 7 | Railway (gateway in cloud) | Optional; run gateway 24/7 | $5/mo Hobby |
| 8 | Trust Meter runnable | One script or doc | $0 |
| 9 | Skill allowlist | Done — see `docs/OPENCLAW_SKILL_ALLOWLIST.md` | $0 |
| 10 | Recursive ads (5–10% revenue) | When revenue is steady | % of revenue |
| 11 | ApexORCA token (APEX/APEXO) | Done **outside** by community/third party when they launch; you add dashboard tracking when it exists. Not you deploying at launch. | See `ORCA_TOKEN_LAUNCH_NOW.md`, `APEXORCA_TOKEN_PLAN_FELIX_MODEL_AND_LEGAL.md` |

Phase 2+ and Phase 3+ (Sentry Team, Pinecone paid, proxies, token launch, DAO, etc.) are in **Part D and Part E** of `FULL_BUILD_SPEC_AND_COST_INTEL.md`. Every item from the intel is listed there with cost tier and phase.

---

## 5. Single checklist (tick as you go)

**Launch (do first):**

- [ ] **1a** Resend domain verified (instructions in §1a above)
- [ ] **1b** `openclaw.env` created and filled with X + Resend keys (§1b)
- [ ] **1c** Proof script run successfully — 3 emails + 1 X post (§1c)
- [ ] **1d** Gateway started at least once; TUI or browser works (§1d)
- [ ] **1e** Site deployed (Vercel or other); dashboard loads (§1e)
- [ ] **1f** Stripe products + webhook configured; test purchase works (§1f)

*(1g Token is not a launch task — later, done outside by community/third party; you add tracking when it exists. See §1g.)*

**Already done (no action):**

- [x] Dashboard Stripe-only notice
- [x] Cron example doc
- [x] X rate limit in X_POSTING_PROTOCOL
- [x] Email Fortress doc
- [x] Escalation ladder doc + link in HANDOFF
- [x] Kill switch in docs
- [x] Evidence outputs doc
- [x] Transparency footer
- [x] Financial guardrail in AUTONOMOUS_OPERATING_PARAMETERS
- [x] Skill allowlist doc

**After first sale (Phase 1+):**

- [ ] Sentry free plan
- [ ] Pinecone free tier (if you want RAG)
- [ ] Helio/MoonPay Commerce (if you want crypto)
- [ ] Treasury link (if you have Base wallet)
- [ ] File-based audit log
- [ ] Rest per `FULL_BUILD_SPEC_AND_COST_INTEL.md` Part D

---

## 6. Where to get help for each area

| Area | Doc / location |
|------|-----------------|
| OpenClaw setup, env, gateway, TUI | `docs/OPENCLAW_SETUP_DONE_NEXT_STEPS.md` |
| Resend, X, proof script | This doc §1a–1c; `scripts/openclaw.env.example` |
| Deploy, Vercel, env vars | `docs/ENV_VARS_REFERENCE.md`, `docs/LAUNCH_CHECKLIST_COMPLETE.md` |
| Stripe products + codebase | `docs/STRIPE_PRODUCTS_AND_CODEBASE_ALIGNMENT.md` |
| Full build + every cost | `docs/FULL_BUILD_SPEC_AND_COST_INTEL.md` |
| Gap list + master spec | `docs/FELIXCRAFT_INTEL_GAP_CHECKLIST_AND_MASTER_SPEC.md` |
| One codebase, all-in-one, manifest | `docs/ONE_CODEBASE_SAME_VIEW.md` |
| $ORCA token (chain, deploy, liquidity, listing) | `docs/ORCA_TOKEN_LAUNCH_NOW.md`, this doc §1g |
| $ORCA naming / legal (avoid ORCA symbol) | `docs/ORCA_TOKEN_NAMING_LEGAL_MEMO.md` |
| $ORCA plan (FELIX model, community launch, legal) | `docs/APEXORCA_TOKEN_PLAN_FELIX_MODEL_AND_LEGAL.md` |
| List 9–18 (Snapshot, Tally, ads, Sheets, etc.) — not for launch tonight | `docs/LIST_9_TO_18_NOT_FOR_TONIGHT.md` |
| List 9–18 completion status + what 1a–1f means | `docs/LIST_9_TO_18_COMPLETION_STATUS.md` |

---

*This is the single checklist. Nothing is left off: launch items need you (§1); the rest is either done or in Phase 1+ with cost and instructions in FULL_BUILD_SPEC_AND_COST_INTEL.md.*
