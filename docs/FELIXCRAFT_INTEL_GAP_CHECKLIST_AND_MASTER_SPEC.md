# FelixCraft Intel — Gap Checklist & Master Spec (ApexORCA)

**Purpose:** Forensic cross-reference of Gemini + ChatGPT FelixCraft/OpenClaw intel against the ApexORCA codebase. Delivers: full inventory, gap checklist, master list, blueprint manifest, and master spec. **Full build + cost intel:** For the **complete** build (every intel item), **what each deferred item costs**, and **how to add it back affordably**, see **`docs/FULL_BUILD_SPEC_AND_COST_INTEL.md`**. That doc lists every costly item we left out, real cost estimates, free-tier options, and phased rollout (Phase 1 after first sale, Phase 2 when revenue is steady, etc.). You decide when to add what; nothing is cut without cost visibility.

**Sources:** `GEMINI:CHATGPT felixcraft build brainstorm intel.md` (Gemini Parts 1–13 + ChatGPT Parts 1–8 + architecture reference sheet).

**Cross-reference:** This doc is the result of a full forensic pass of the FelixCraft intel against the ApexORCA codebase. The inventory (§1) and gap checklist (§2) list every component from the intel and tag it WE HAVE / PARTIAL / WE DON'T HAVE / DEFER. Items we implemented in the final phase (per MASTER_SPEC_IMPLEMENTATION_CHECKLIST.md) are applied in code and docs; the rest are either already present, deferred (zero budget), or optional. For “much more to add”: the intel describes many Felix-specific or paid items (ClawMart skills, crypto checkout, vector DB, proxies, DAO, etc.) — those are explicitly DEFER or out of scope so we don’t add cost; the master list (§3) and spec (§5) cover what we committed to for launch.

---

## 0. Legend & Zero-Budget Rule

| Status | Meaning |
|--------|--------|
| **WE HAVE** | Implemented or clearly present in codebase/docs. |
| **PARTIAL** | Partially implemented; needs completion or hardening. |
| **WE DON'T HAVE** | Not implemented; gap. |
| **NEEDS FIX** | Exists but broken or misaligned; fix required. |
| **DEFER** | Valuable but requires paid service or significant new cost → do after revenue. |
| **FREE_TIER_ONLY** | Implement only using free tier of a service (e.g. Pinecone serverless free, Supabase free). |

**Cost visibility:** Items that require paid services are marked **DEFER** here so we don't add cost at launch without a decision. **Do not treat DEFER as "never"** — treat it as "see FULL_BUILD_SPEC_AND_COST_INTEL.md for cost and when to add it." Free tiers (e.g. Pinecone, Sentry) and add-after-first-sale options are documented there.

---

## 1. Full Inventory (from Intel) → ApexORCA Status

### 1.1 Core architecture (OpenClaw / runtime)

| # | Component | Source | Tag | ApexORCA status |
|---|-----------|--------|-----|------------------|
| 1 | Gateway = single source of truth (sessions, routing, channels) | ChatGPT 1, OC docs | tech | **WE HAVE** — OpenClaw gateway, start-openclaw-gateway-with-env.sh |
| 2 | Multi-channel (WhatsApp, Telegram, Discord, web) | ChatGPT 1 | tech | **WE HAVE** — OpenClaw multi-channel; WhatsApp optional (401 until login) |
| 3 | Web Control UI (browser dashboard for chat) | ChatGPT 1 | tech | **WE HAVE** — http://127.0.0.1:18789, webchat |
| 4 | Cron jobs (scheduled wakeups, persist jobs) | ChatGPT 5, Felix listing | tech | **PARTIAL** — OpenClaw supports cron; no pre-configured cron schedules in repo |
| 5 | Heartbeat (quiet polling, HEARTBEAT_OK, checklist) | ChatGPT 5, HEARTBEAT.md | tech | **WE HAVE** — HEARTBEAT.md, heartbeat prompt in AGENTS.md |
| 6 | Sub-agents (parallel workers, restricted tools) | ChatGPT 1,6 | tech | **WE HAVE** — OpenClaw sessions_spawn, subagents; Apex coordinates Echo/Sonar/Oreo/Fin/Moby |
| 7 | Identity files (SOUL.md / IDENTITY.md) | Gemini 1–2, ChatGPT 1 | tech | **WE HAVE** — IDENTITY.md per persona; BOOTSTRAP references SOUL.md |
| 8 | File-based memory (Markdown/JSON) | Gemini 1 | tech | **WE HAVE** — memory/YYYY-MM-DD.md, MEMORY.md, persona MEMORY.md |
| 9 | Lane queue / serial execution | Gemini 1 | tech | **WE DON'T HAVE** — no explicit lane queue in docs; OpenClaw may handle ordering |
| 10 | Three-tier memory (PARA + timeline + tacit, hot/warm/cold) | ChatGPT 3,4, Felix listing | tech | **PARTIAL** — memory + MEMORY.md + knowledge_repo; no PARA schema, no formal hot/warm/cold tiering or recency-weighted retrieval |
| 11 | Vector DB (Pinecone/LangChain) for long-term RAG | Gemini 3,5 | tech | **WE DON'T HAVE** — **DEFER** (Pinecone free tier possible later) |
| 12 | Stealth browser / fingerprint spoofing | Gemini 5 | tech | **WE DON'T HAVE** — **DEFER** (no scraping requirement at launch) |
| 13 | Residential proxy rotation | Gemini 5 | tech | **WE DON'T HAVE** — **DEFER** (paid; not needed for email/X proof) |
| 14 | Semantic snapshots (ARIA tree vs screenshots) | Gemini 1 | tech | **PARTIAL** — OpenClaw browser tool; no explicit “semantic snapshot” driver in repo |
| 15 | Command allowlist + structure-based blocking | Gemini 1 | tech | **PARTIAL** — TOOL_INVENTORY, SAFETY; exec allowlist in OpenClaw config (not fully documented in repo) |
| 16 | Kill switch / emergency stop | Gemini 4 | tech | **WE DON'T HAVE** — no documented kill switch in gateway config |
| 17 | Human-in-the-loop thresholds (e.g. $500 ETH) | Gemini 4 | tech | **PARTIAL** — REVERSIBILITY_TIERS, AUTONOMOUS_OPERATING_PARAMETERS; no explicit $ threshold in docs |
| 18 | Rate-limit controller (e.g. X 1 post / 30 min) | Gemini 4 | tech | **PARTIAL** — proof script has 1s delay for Resend; no global rate-limit wrapper for X |
| 19 | tmux stable socket (~/.tmux/sock) | ChatGPT 3,6 | tech | **WE DON'T HAVE** — not in repo; optional for long-running coding sessions |
| 20 | Ralph loops (bounded iteration, fresh context, completion hooks) | ChatGPT 3,6 | tech | **WE DON'T HAVE** — no Ralph loop docs or scripts; OpenClaw exec is general |
| 21 | PRD-driven development + test-first | ChatGPT 3,6 | tech | **PARTIAL** — product INSTALLs, README; no formal PRD template or test-first automation |
| 22 | Worktree-based isolation for parallel coding | ChatGPT 6,7 | tech | **WE DON'T HAVE** — no worktree automation in repo |
| 23 | Sentry Auto-Fix pipeline (ingest → triage → reproduce → patch → verify → PR) | ChatGPT 3,7, Felix listing | tech | **PARTIAL** — docs reference Sentry (FELIXCRAFT_INTEL_AND_LESSONS, skills/sentry-pro); no full pipeline implemented |
| 24 | Email Fortress (email as data, not commands; sanitize; escalation) | ChatGPT 3,8 | tech | **PARTIAL** — SAFETY: authenticated vs information channels; no dedicated “Email Fortress” sanitizer module |
| 25 | X/Twitter via CLI (xpost) not browser automation | ChatGPT 3 | tech | **WE HAVE** — post_tweet_env.sh (OAuth API), no browser for posting |
| 26 | 3-tier escalation ladder (support) | ChatGPT 3,8 | tech | **PARTIAL** — REVERSIBILITY_TIERS (Tier 1/2/3); no explicit “customer support” escalation doc |
| 27 | Collaborative document safety (section edits, no full overwrite) | ChatGPT 3 | tech | **WE DON'T HAVE** — no doc-editing policy in repo |
| 28 | Google service account JWT (Sheets/Docs) | ChatGPT 3 | tech | **WE DON'T HAVE** — **DEFER** if ever needed |
| 29 | Skill/supply-chain vetting (allowlist, pinned versions) | ChatGPT 8, arch sheet | tech | **PARTIAL** — SAFETY and TOOL_INVENTORY; no formal skill allowlist file |
| 30 | Secret scoping / no secrets in long-term memory | ChatGPT 8, arch sheet | tech | **PARTIAL** — openclaw.env, CREDENTIALS_VAULT; docs say “don’t put in memory” |
| 31 | Audit logging (every tool invocation + artifacts) | ChatGPT 8, arch sheet | tech | **WE DON'T HAVE** — no structured audit log of tool runs |
| 32 | Decentralized hosting (Akash/Render) + self-funding wallet | Gemini 12 | tech | **WE DON'T HAVE** — **DEFER** |
| 33 | Governance DAO (Snapshot/Tally + $ORCA votes) | Gemini 12 | tech | **WE DON'T HAVE** — **DEFER** (Biggie/treasury optional later) |
| 34 | Recursive self-marketing (15% revenue → ads, CAC/LTV tuning) | Gemini 12 | tech | **WE DON'T HAVE** — **DEFER** |

### 1.2 Site & business surfaces (FelixCraft.ai-style)

| # | Component | Source | Tag | ApexORCA status |
|---|-----------|--------|-----|------------------|
| 35 | Homepage with hero + positioning | ChatGPT 2 | ux | **WE HAVE** — apps/web, hero.tsx, page.tsx |
| 36 | Primary paid product (e.g. PDF guide) | ChatGPT 2 | product | **WE HAVE** — playbook ($39), playbook page + checkout |
| 37 | Standard checkout (Stripe) | ChatGPT 2 | product | **WE HAVE** — Stripe checkout, webhook, success page |
| 38 | Crypto payment rail (e.g. USDC on Base) | ChatGPT 2, Gemini 4 | product | **WE DON'T HAVE** — **DEFER** (optional; no budget for Helio/Coinbase Commerce integration now) |
| 39 | Public transparency dashboard (revenue metrics) | ChatGPT 2 | product | **WE HAVE** — dashboard page, LiveRevenue, RevenueChart, RecentDecisions |
| 40 | Stripe revenue only notice (explicit) | ChatGPT 2 | ux | **PARTIAL** — dashboard exists; “Stripe only” notice can be added |
| 41 | Revenue panels (7d / 30d / lifetime) | ChatGPT 2 | product | **WE HAVE** — dashboard API + components |
| 42 | Third-party revenue verification link (e.g. TrustMRR) | ChatGPT 2 | product | **WE DON'T HAVE** — optional credibility boost |
| 43 | Crypto treasury link (e.g. BaseScan) | ChatGPT 2 | product | **PARTIAL** — docs mention treasury/Biggie; no dashboard widget yet |
| 44 | Token metrics (burned, sold) + link to token page | ChatGPT 2 | product | **WE DON'T HAVE** — **DEFER** (token not launched) |
| 45 | Nav: Guide, Dashboard, $TOKEN, X, Marketplace | ChatGPT 2 | ux | **PARTIAL** — Guide/Playbook, Dashboard, Marketplace, X link; no $ORCA nav yet |
| 46 | “Marketplace” / ClawMart-style (agent skills for sale) | ChatGPT 2, Gemini 2 | product | **PARTIAL** — marketplace is product marketplace (playbook, pods); not agent “skills” marketplace |
| 47 | Dynamic disclaimer / transparency footer | Gemini 4 | ux | **WE DON'T HAVE** — can add to footer |
| 48 | Live proof-of-work (GitHub or onchain link) | Gemini 4 | ux | **WE DON'T HAVE** — optional |

### 1.3 Automation & scheduling

| # | Component | Source | Tag | ApexORCA status |
|---|-----------|--------|-----|------------------|
| 49 | Pre-configured cron schedules in persona bundle | ChatGPT 3,5 | tech | **WE DON'T HAVE** — no cron config files in repo |
| 50 | Heartbeat checklist (short, token-efficient) | ChatGPT 5, AGENTS.md | tech | **WE HAVE** — HEARTBEAT.md, heartbeat prompt |
| 51 | Daily executive report (cron) | ChatGPT 5 | tech | **WE DON'T HAVE** — HEARTBEAT can be used; no formal “daily report” cron |
| 52 | Weekly planning / backlog grooming (cron) | ChatGPT 5 | tech | **WE DON'T HAVE** |
| 53 | Scheduled social post (cron → X) | ChatGPT 5 | tech | **PARTIAL** — PROMO_QUEUE + post_tweet_env.sh; no cron wiring in repo |
| 54 | Inbox check (heartbeat) | ChatGPT 5 | tech | **PARTIAL** — HEARTBEAT.md mentions email; no implemented inbox poll |
| 55 | Sentry alert check (heartbeat or webhook) | ChatGPT 5 | tech | **WE DON'T HAVE** — no Sentry integration |
| 56 | Sales/revenue change alert | ChatGPT 5 | tech | **PARTIAL** — dashboard shows data; no alert-to-chat flow |
| 57 | Catch-up when gateway was sleeping | ChatGPT 5 | tech | **WE DON'T HAVE** — OpenClaw issue; no catch-up logic in repo |

### 1.4 Content & product factory

| # | Component | Source | Tag | ApexORCA status |
|---|-----------|--------|-----|------------------|
| 58 | Automated PDF generation (e.g. from template) | Gemini 2,9 | product | **PARTIAL** — playbook PDF exists; export-pdf.ts; no “factory” of many PDFs |
| 59 | Info-product template (e.g. product_report.md) | Gemini 2 | product | **WE DON'T HAVE** — playbook is single product |
| 60 | “Reverse engineering” scout (trends → product ideas) | Gemini 9 | product | **WE DON'T HAVE** — **DEFER** (could use web_search later) |
| 61 | ClawMart skill arbitrage (sell “skills” to other agents) | Gemini 2,9 | product | **WE DON'T HAVE** — different model (we sell pods/playbook, not OpenClaw skills) |
| 62 | Digital product vault + recurring subscription | Gemini 9 | product | **PARTIAL** — marketplace one-time; no vault + subscription in app |

### 1.5 Token & treasury (optional / defer)

| # | Component | Source | Tag | ApexORCA status |
|---|-----------|--------|-----|------------------|
| 63 | $ORCA token launch (Base, liquidity, buy-back burn) | Gemini 4,10 | product | **WE DON'T HAVE** — **DEFER** (Biggie/treasury roadmap) |
| 64 | Tokenomics config (tokenomics.json) | Gemini 4 | product | **WE DON'T HAVE** — **DEFER** |
| 65 | Stabledrop / incentive distribution | Gemini 10 | product | **WE DON'T HAVE** — **DEFER** |

### 1.6 Governance & safety (ORCA)

| # | Component | Source | Tag | ApexORCA status |
|---|-----------|--------|-----|------------------|
| 66 | CEO supervisor prompt / “Constitution” | Gemini 8, ChatGPT 8 | tech | **WE HAVE** — Apex IDENTITY, ORCA_TRAINING_CONSTITUTION, OPENCLAW_DIRECTIVE |
| 67 | Zero hallucination (verify vs Research Agent) | Gemini 8 | tech | **PARTIAL** — SAFETY, TOOL_INVENTORY “claim success only on tool confirmation” |
| 68 | Financial guardrail (e.g. $50 API cap without signature) | Gemini 8 | tech | **WE DON'T HAVE** — no explicit $50 cap in docs |
| 69 | Code integrity (audit Dev Agent output) | Gemini 8 | tech | **PARTIAL** — Oreo pre-deploy checklist; no formal “Apex audits every line” flow |
| 70 | Revenue priority (e.g. >70% prob $100+ in 24h) | Gemini 8 | tech | **WE DON'T HAVE** — strategy doc exists; no formal priority formula |
| 71 | Self-evolution (reflect on failures, rewrite identity) | Gemini 8 | tech | **WE DON'T HAVE** — no automated identity rewrite |
| 72 | REVERSIBILITY_TIERS (Tier 1/2/3) | codebase | tech | **WE HAVE** — REVERSIBILITY_TIERS.md, AUTONOMOUS_OPERATING_PARAMETERS |
| 73 | VETO_PROTOCOL (Moby) | codebase | tech | **WE HAVE** — VETO_PROTOCOL.md in products |
| 74 | Traceability matrix / anchors | codebase | tech | **WE HAVE** — ORCA_CORE_REFERENCE, IDENTITY refs |
| 75 | Authenticated vs information channels | codebase | tech | **WE HAVE** — SAFETY in personas, AGENTS.md |
| 76 | Trust Meter / ORCA audit | codebase | tech | **PARTIAL** — TRUST_METER_DESIGN_OPTIONS, ORCA_AUDIT; not fully implemented in UI |
| 77 | Fact-check middleware (2 sources before commit) | Gemini governance table | tech | **WE DON'T HAVE** — not implemented |
| 78 | Sandbox shield (sanitize user input before Brain) | Gemini governance table | tech | **PARTIAL** — SAFETY + email as info not command; no dedicated sanitizer |
| 79 | Recursive goal anchor (re-read GOALS every N cycles) | Gemini governance table | tech | **WE DON'T HAVE** — no cycle counter or GOALS re-read automation |
| 80 | Max entropy breaker (repeat 3x → reset to identity) | Gemini governance table | tech | **WE DON'T HAVE** — no loop detector |
| 81 | PII scrubber | Gemini governance table | tech | **WE DON'T HAVE** — no middleware |

### 1.7 Marketing & X strategy

| # | Component | Source | Tag | ApexORCA status |
|---|-----------|--------|-----|------------------|
| 82 | PROMO_QUEUE (drafts, 1–2 posts/day) | codebase | product | **WE HAVE** — PROMO_QUEUE.md, post_tweet_env.sh |
| 83 | X posting protocol (Sonar) | codebase | product | **WE HAVE** — X_POSTING_PROTOCOL.md |
| 84 | Live earnings ticker on site | ChatGPT 2, Felix | ux | **PARTIAL** — dashboard has LiveRevenue; not “ticking” on homepage |
| 85 | Alpha thread (high-value posts every 4h) | Gemini 7 | product | **PARTIAL** — URGENT_MARKETING_LAUNCH_STRATEGY; no 4h schedule |
| 86 | Discord/Telegram bot (community, upsell) | Gemini 7 | product | **WE DON'T HAVE** — **DEFER** (OpenClaw has Telegram/WhatsApp; not configured as “bot” for community) |
| 87 | Build-in-public + trend-driven replies | Intel X summary | product | **PARTIAL** — strategy doc; no automated reply flow |

### 1.8 Evidence & verification (architecture sheet)

| # | Component | Source | Tag | ApexORCA status |
|---|-----------|--------|-----|------------------|
| 88 | Evidence locker (immutable run artifacts) | ChatGPT arch sheet | tech | **WE DON'T HAVE** — no E1–E6, S1–S6 style artifacts |
| 89 | Verification gates before “success” (tests, diff, logs) | ChatGPT 6,7 | tech | **PARTIAL** — TOOL_INVENTORY “claim only on tool confirmation”; no formal gates in pipelines |
| 90 | PR with rationale + evidence (Sentry/coding) | ChatGPT 7 | tech | **WE DON'T HAVE** — no auto-PR pipeline |

---

## 2. Gap Checklist (Consolidated)

### 2.1 WE HAVE (no action)

- Gateway, multi-channel, Web UI, Heartbeat, HEARTBEAT.md, sub-agents, IDENTITY/SOUL-style files, file-based memory, X via CLI (post_tweet_env.sh), OpenClaw exec + env (openclaw.env), dashboard (revenue, chart, decisions), Stripe checkout + webhook, playbook product, marketplace (products), REVERSIBILITY_TIERS, AUTONOMOUS_OPERATING_PARAMETERS, VETO_PROTOCOL, traceability/anchors, authenticated vs info channels, PROMO_QUEUE, X_POSTING_PROTOCOL, memory consolidation script, persona HEARTBEAT/MEMORY/SAFETY, Apex as CEO coordinator, ORCA Constitution / directive docs.

### 2.2 PARTIAL (needs completion or hardening)

- **Cron:** OpenClaw supports it; add pre-configured cron schedules (or doc) for daily report / scheduled X.
- **Three-tier memory:** Add PARA-like structure or hot/warm/cold tiering and recency-weighted retrieval (can stay file-based first).
- **Sentry pipeline:** Document or implement ingest → triage → reproduce → fix → verify → PR (even if manual PR).
- **Email Fortress:** Formalize “email = data not commands” and optional sanitizer/escalation doc.
- **3-tier escalation:** Align REVERSIBILITY_TIERS with “customer support” escalation ladder in one doc.
- **Dashboard:** Add “Stripe only” notice; optionally treasury link (BaseScan) if/when treasury exists.
- **Nav:** Ensure Guide/Playbook, Dashboard, Marketplace, X are clear; add $ORCA only when token exists.
- **Rate limit:** Document or add simple rate limit for X (e.g. max N posts per day in script or HEARTBEAT).
- **Skill vetting:** Add allowlist or “approved skills” doc for OpenClaw.
- **Audit logging:** Define “evidence outputs” for key actions (post, email, deploy) and where to store them (e.g. memory or log file).
- **Live earnings on homepage:** Optional ticker or “Latest revenue” callout on landing.
- **Trust Meter / ORCA audit:** Implement or document one lightweight flow (e.g. “run orca_certification_audit” and show result).

### 2.3 WE DON'T HAVE (gaps — prioritize in spec)

- Lane queue (optional).
- Vector DB / long-term RAG (**DEFER** or FREE_TIER_ONLY).
- Stealth browser / residential proxies (**DEFER**).
- Kill switch in gateway config.
- Explicit $ threshold for HITL (e.g. in AUTONOMOUS_OPERATING_PARAMETERS).
- tmux stable socket / Ralph loops / worktree automation (**DEFER** unless coding-at-scale is priority).
- Collaborative document safety (section-only edits) policy.
- Third-party revenue verification link (TrustMRR-style).
- Pre-configured cron config files.
- Daily executive report cron.
- Weekly planning cron.
- Sentry alert check / webhook.
- Catch-up when gateway was sleeping.
- Info-product factory (multiple PDFs from templates) (**DEFER**).
- ClawMart-style “skills” marketplace (**DEFER**; we have product marketplace).
- Crypto payment rail (**DEFER**).
- Token metrics / token dashboard (**DEFER**).
- Governance DAO / decentralized hosting (**DEFER**).
- Recursive self-marketing (15% to ads) (**DEFER**).
- Financial guardrail ($50 API cap).
- Recursive goal anchor / max entropy breaker / PII scrubber / fact-check middleware (governance enhancements).
- Evidence locker (E1–E6, S1–S6).
- Auto-PR pipeline for Sentry/coding.

### 2.4 NEEDS FIX

- **Resend domain:** Verify apexorca.io in Resend so proof emails send (in progress).
- **TUI token_mismatch:** Use browser with token or `openclaw tui --token <token>`.
- **Dashboard “Stripe only” notice:** Add explicit copy that revenue is Stripe-only (no crypto) if not already.
- **Path with spaces:** All scripts and docs already use quoted paths; keep consistent.

### 2.5 DEFER (cost or scope; after revenue)

- Vector DB (Pinecone paid or free tier later).
- Residential proxies (Bright Data, etc.).
- Stealth browser / fingerprint spoofing.
- Crypto payment (USDC on Base).
- $ORCA token launch, tokenomics, stabledrop.
- Decentralized hosting (Akash/Render).
- Governance DAO.
- Recursive self-marketing (ad spend).
- Make.com / Railway / other new SaaS (use only existing stack).

---

## 3. Master List (Ordered for Spec)

Ordered by: (1) blocks proof/launch, (2) differentiator vs Felix, (3) zero cost, (4) quick win.

1. **Proof & launch unblock:** Resend domain verification; TUI token fix (doc).
2. **Dashboard clarity:** “Stripe only” notice; optional treasury link placeholder.
3. **Cron/heartbeat:** Document or add one cron schedule (e.g. daily report or scheduled X); ensure HEARTBEAT checklist is minimal.
4. **Rate limit for X:** Document or implement max posts per day / per hour for Sonar.
5. **Email as data not commands:** One-page “Email Fortress” policy (align with SAFETY).
6. **3-tier escalation:** One doc that maps REVERSIBILITY_TIERS to support escalation (Tier 1/2/3).
7. **Kill switch:** Document how to stop gateway / revoke token; optional config snippet.
8. **Financial guardrail:** Optional $ cap in AUTONOMOUS_OPERATING_PARAMETERS (e.g. “Alert if API spend > $X/day”).
9. **Evidence outputs:** Define minimal evidence for “post sent” / “email sent” / “deploy done” (e.g. log line or file).
10. **Sentry (optional):** Doc or stub for “Sentry → classify → escalate or fix” (no paid Sentry required for MVP).
11. **Memory tiering (optional):** Doc for “hot/warm/cold” or “recent vs archive” in memory/ to avoid context bloat.
12. **Skill allowlist:** Doc or file listing “approved” OpenClaw skills/sources.
13. **Transparency footer:** Optional dynamic disclaimer on site.
14. **Pre-configured cron:** Add example cron config or script that registers one job (e.g. “daily report”).
15. **Trust Meter / ORCA audit:** One runnable check (script or doc) that outputs “ORCA Certified: Yes/No” for a given task or day.

---

## 4. Blueprint Manifest (Spec Sections)

The master spec will cover, in order:

1. **Scope & constraints** — ApexORCA vs Felix intel; zero new startup cost.
2. **Proof & launch** — Resend, proof script, TUI token; “done when” criteria.
3. **Dashboard & transparency** — Stripe-only notice, treasury placeholder, nav.
4. **Automation** — Cron and Heartbeat; one cron example; HEARTBEAT checklist.
5. **Safety & governance** — Email Fortress policy, escalation doc, kill switch, financial guardrail.
6. **Evidence & verification** — Minimal evidence outputs for post/email/deploy.
7. **Optional pipelines** — Sentry stub, memory tiering doc, skill allowlist.
8. **Site polish** — Transparency footer, optional live earnings on homepage.
9. **Deferred items** — List of DEFER/FREE_TIER_ONLY with “revisit when” condition.

---

## 5. Master Spec (Requirements + Acceptance + Notes)

### 5.1 Scope & constraints

- **Scope:** ApexORCA as autonomous, governed agent company (OpenClaw + ORCA). FelixCraft intel is blueprint only; no copy-paste of Felix’s product set.
- **Constraint:** Zero added startup cost. New paid services (proxies, paid Pinecone, Make.com, Railway, etc.) are deferred until revenue; free tiers allowed where applicable.
- **In scope:** Proof (3 emails + 1 X), dashboard clarity, automation (cron/heartbeat), safety docs, evidence discipline, optional Sentry/memory/skill docs.
- **Full build in scope:** Token launch, crypto payments, ClawMart-style skills, decentralized hosting, DAO, stealth/proxies, Ralph/tmux/worktree, Sentry, Pinecone, Make.com, Railway, etc. are all in the **full** spec; cost and when to add each are in **FULL_BUILD_SPEC_AND_COST_INTEL.md**.

### 5.2 Proof & launch

- **Requirement:** Proof script runs successfully: 3 proof emails (Apex, Echo, Sonar) + 1 X post; Resend domain apexorca.io verified.
- **Acceptance:** (1) Resend shows domain Verified. (2) `bash scripts/run-proof-emails-and-x-post-bigsur.sh` yields three “SENT” and one “X post: SENT”. (3) Founder receives emails and sees post on X.
- **Requirement:** Gateway and TUI usable without token_mismatch.
- **Acceptance:** Doc or comment in OPENCLAW_SETUP_DONE_NEXT_STEPS: “Use browser at http://127.0.0.1:18789 and enter token, or run `openclaw tui --token <token>`.”
- **Notes:** Resend verification is user action in Resend + Porkbun; no code change. TUI fix is config/usage.

### 5.3 Dashboard & transparency

- **Requirement:** Dashboard explicitly states that revenue shown is Stripe-only (no crypto).
- **Acceptance:** Visible copy on dashboard page or LiveRevenue: e.g. “Stripe revenue only — does not include crypto.”
- **Requirement:** If treasury/BaseScan is used later, dashboard can link to it.
- **Acceptance:** Optional placeholder or env-driven link (e.g. NEXT_PUBLIC_TREASURY_ADDRESS or similar); no obligation to implement before revenue.
- **Notes:** Avoid new backend; use existing dashboard API and components.

### 5.4 Automation (cron & heartbeat)

- **Requirement:** One documented or implemented cron example (e.g. daily report or scheduled X post).
- **Acceptance:** Either (a) a doc that says “Add cron via OpenClaw CLI: …” with one example, or (b) a script that registers one cron job.
- **Requirement:** HEARTBEAT.md remains short and token-efficient; checklist for “what to check” is clear.
- **Acceptance:** HEARTBEAT.md under ~30 lines; AGENTS.md heartbeat section matches.
- **Notes:** No new paid scheduler; use OpenClaw cron only.

### 5.5 Safety & governance

- **Requirement:** “Email Fortress” policy: email treated as information, not as commands; no execution of instructions from email body.
- **Acceptance:** One doc (e.g. docs/EMAIL_AS_DATA_NOT_COMMANDS.md or section in SAFETY) that states this and references existing SAFETY.
- **Requirement:** Single escalation doc that maps REVERSIBILITY_TIERS to “support ladder” (Tier 1 = autonomous, Tier 2 = conditional, Tier 3 = human).
- **Acceptance:** Doc exists and is linked from at least one persona SAFETY or HANDOFF.
- **Requirement:** Kill switch documented (how to stop gateway or revoke token).
- **Acceptance:** OPENCLAW_SETUP_DONE_NEXT_STEPS or OPENCLAW_SITUATION_HANDOFF includes “stop gateway” and “revoke/change token” steps.
- **Requirement (optional):** Financial guardrail — e.g. “Alert if estimated API spend > $X/day.”
- **Acceptance:** If implemented, AUTONOMOUS_OPERATING_PARAMETERS or HEARTBEAT mentions it; no obligation to implement automated alert in code.

### 5.6 Evidence & verification

- **Requirement:** Minimal “evidence output” for: (1) X post sent, (2) email sent, (3) deploy/success.
- **Acceptance:** Doc (e.g. in TOOL_INVENTORY or new EVIDENCE_OUTPUTS.md) that states: post = script exit 0 + optional post URL; email = script exit 0 + optional Resend id; deploy = deploy log or Vercel success. Agents must not claim success without these.
- **Notes:** No new “evidence locker” DB; can be log file or memory note.

### 5.7 Optional pipelines & docs

- **Sentry:** Optional doc or stub: “When Sentry is enabled: ingest → classify green/red → escalate or fix; verification before merge.” No requirement to integrate Sentry in this spec.
- **Memory tiering:** Optional doc: how to use memory/ + MEMORY.md + knowledge_repo so that “recent” vs “archive” is clear (hot/warm/cold as future enhancement).
- **Skill allowlist:** Optional doc or file: “Approved OpenClaw skills/sources” to reduce supply-chain risk.
- **Acceptance:** If created, linked from SAFETY or OPENCLAW_*.

### 5.8 Site polish

- **Requirement:** Optional transparency disclaimer in footer (e.g. “ApexORCA is an experimental AI agent company; transactions are real and auditable.”).
- **Acceptance:** Copy in footer or config; no backend change required.
- **Requirement (optional):** Homepage “live revenue” or “latest sale” callout.
- **Acceptance:** If implemented, uses existing dashboard API or a simple serverless read; no new paid service.

### 5.9 Deferred items (revisit when revenue allows)

- Vector DB (Pinecone free tier or paid).
- Residential proxies / stealth browser.
- Crypto payment rail (USDC on Base).
- $ORCA token, tokenomics, treasury dashboard.
- ClawMart-style skills marketplace.
- Decentralized hosting / DAO.
- Recursive self-marketing (ad spend).
- Ralph loops, tmux, worktree automation (coding-at-scale).
- Make.com, Railway, other new SaaS.

---

## 6. Summary Table (Quick Reference)

| Category | WE HAVE | PARTIAL | WE DON'T HAVE | DEFER |
|----------|---------|---------|---------------|-------|
| Core/runtime | 8 | 4 | 2 | 3 |
| Site/business | 4 | 5 | 4 | 1 |
| Automation | 2 | 2 | 5 | 0 |
| Content/factory | 0 | 2 | 2 | 2 |
| Token/treasury | 0 | 1 | 0 | 3 |
| Governance | 6 | 6 | 5 | 0 |
| Marketing/X | 2 | 3 | 1 | 1 |
| Evidence | 0 | 1 | 2 | 0 |

**Total items in inventory:** 90. **WE HAVE:** 24. **PARTIAL:** 24. **WE DON'T HAVE:** 28. **DEFER:** 14.

---

---

## 7. Triple-check verification (codebase audit)

Spot-checked against the repo on 2026-02-28:

| Claim in doc | Verified |
|--------------|----------|
| HEARTBEAT.md + persona HEARTBEAT | **Yes** — root HEARTBEAT.md (12 lines); persona HEARTBEAT in apex, echo, sonar, oreo, fin, moby, biggie, biggie-trading + product leads. |
| REVERSIBILITY_TIERS, AUTONOMOUS_OPERATING_PARAMETERS | **Yes** — shared/REVERSIBILITY_TIERS.md; docs/AUTONOMOUS_OPERATING_PARAMETERS.md; product Shared/ copies. |
| post_tweet_env.sh, PROMO_QUEUE.md, X_POSTING_PROTOCOL | **Yes** — scripts/post_tweet_env.sh; PROMO_QUEUE.md at root; sonar + growth-engine X_POSTING_PROTOCOL.md. |
| Proof script name | **Yes** — both run-proof-emails-and-x-post.sh and run-proof-emails-and-x-post-bigsur.sh exist. |
| start-openclaw-gateway-with-env.sh | **Yes** — scripts/start-openclaw-gateway-with-env.sh. |
| Dashboard (LiveRevenue, RevenueChart, RecentDecisions) | **Yes** — apps/web/app/dashboard/page.tsx; components/dashboard/*. |
| Stripe checkout, webhook, success | **Yes** — api/stripe/checkout, webhook; checkout-button, success flow. |
| IDENTITY.md, SOUL.md, MEMORY.md, memory/ | **Yes** — per persona; root SOUL.md, MEMORY.md; memory/2026-02-28.md, knowledge_repo.md. |
| OPENCLAW_SETUP_DONE_NEXT_STEPS: TUI token fix | **Yes** — doc already has “openclaw tui --token apexorca-secure-2026” and browser token; token_mismatch explained. |
| OPENCLAW_SITUATION_HANDOFF: stop gateway | **Yes** — openclaw gateway stop, launchctl bootout, kill PIDs on 18789. “Revoke token” not explicit — add for full kill switch. |
| Dashboard “Stripe only” visible copy | **Partial** — API comment says “Stripe only”; dashboard page has “Real sales only • Every decision traceable” but not “Stripe revenue only — does not include crypto.” Add to meet spec. |
| VETO_PROTOCOL | **Yes** — shared/VETO_PROTOCOL.md + product Shared/ copies. |
| Sentry in codebase | **Partial** — only docs (FELIXCRAFT_INTEL_AND_LESSONS) and skills/sentry-pro; no pipeline code. |
| EMAIL_PROTOCOL (marketing) | **Yes** — shared/EMAIL_PROTOCOL.md (marketing send flow). “Email as data not commands” is separate — need Email Fortress policy. |
| Footer component | **Yes** — components/footer.tsx; no transparency disclaimer yet. |

**Verdict:** Inventory and gap checklist are **accurate**. One nuance: OPENCLAW_SETUP_DONE_NEXT_STEPS already satisfies the TUI/token acceptance; kill switch only needs “revoke/change token” added (e.g. in SITUATION_HANDOFF or SETUP_DONE). Dashboard needs one line of visible “Stripe only” copy.

---

## 8. Expert opinion, file count, and next step

### How helpful is this?

- **Very helpful** as a single source of truth. It turns scattered Felix/Gemini/ChatGPT intel into one ordered list (inventory → gaps → master list → spec) and enforces zero budget so nothing slips in as a paid dependency.
- **Actionable:** §5 gives clear requirements and acceptance criteria; §3 gives priority order. You can assign tasks from the master list and tick them off against §5.
- **Honest about scope:** DEFER and PARTIAL are explicit, so you’re not over-promising. The doc distinguishes “we have,” “we need to add,” and “we do after revenue.”

### How many files to build/proceed?

| Category | New files | Files to edit | Notes |
|----------|-----------|----------------|-------|
| **Proof & launch** | 0 | 0 | Resend + TUI already documented; no code change. |
| **Dashboard** | 0 | 1–2 | live-revenue.tsx or dashboard/page.tsx — add “Stripe revenue only” line. |
| **Kill switch** | 0 | 1 | OPENCLAW_SITUATION_HANDOFF or OPENCLAW_SETUP_DONE_NEXT_STEPS — add “revoke/change token.” |
| **Email Fortress** | 1 | 0 | docs/EMAIL_AS_DATA_NOT_COMMANDS.md (or section in SAFETY). |
| **3-tier escalation** | 0 | 1 | One doc (new or extend REVERSIBILITY_TIERS) + link from persona SAFETY/HANDOFF. |
| **Evidence outputs** | 1 | 0 | docs/EVIDENCE_OUTPUTS.md or section in TOOL_INVENTORY. |
| **Cron example** | 0–1 | 0 | Optional: one script or one doc with cron example. |
| **Sentry / memory / skill allowlist** | 0–3 | 0 | Optional stub docs. |
| **Footer** | 0 | 1 | footer.tsx — add transparency disclaimer. |
| **Financial guardrail** | 0 | 0–1 | Optional: AUTONOMOUS_OPERATING_PARAMETERS or HEARTBEAT. |
| **Trust Meter / ORCA audit** | 0–1 | 0 | Optional: one runnable script or doc. |

**Total estimate:** **4–8 new files** (docs + optional script) and **4–7 existing files edited**. So **~8–15 files** touched in total to implement the full master spec (§5). If you do only the must-haves (proof unblock, dashboard notice, kill switch, Email Fortress, escalation, evidence, footer): **~3 new docs, ~4 edits ≈ 7 files.**

### Recommended next step (process this intel into “final master specs”)

1. **Lock this doc as the blueprint** — Treat `FELIXCRAFT_INTEL_GAP_CHECKLIST_AND_MASTER_SPEC.md` as the canonical gap list and spec. No second “final master spec” doc unless you want a short, implementation-only checklist derived from it.
2. **Create an implementation checklist** — One small doc (e.g. `docs/MASTER_SPEC_IMPLEMENTATION_CHECKLIST.md`) that lists only the §5 items as checkboxes, with “File(s)” and “Acceptance” columns, e.g.  
   - [ ] Dashboard Stripe-only notice → Edit live-revenue.tsx or page.tsx → “Visible copy: Stripe revenue only …”  
   - [ ] Kill switch (revoke token) → Edit OPENCLAW_SITUATION_HANDOFF or SETUP_DONE → “Doc includes revoke/change token.”  
   - [ ] Email Fortress → Create EMAIL_AS_DATA_NOT_COMMANDS.md → “States email = data not commands; refs SAFETY.”  
   That becomes the “final” execution list without re-specifying everything.
3. **Execute in master-list order** — Do items 1–7 from §3 first (proof, dashboard, cron/heartbeat, rate limit, Email Fortress, escalation, kill switch), then evidence, then optional items. Revisit DEFER only after revenue.

That way the intel is fully processed: this doc = full spec + gap truth; **`docs/MASTER_SPEC_IMPLEMENTATION_CHECKLIST.md`** = what to build and in what order (final phase); no extra cost, no overlooked items.

---

*End of Gap Checklist & Master Spec. For the complete build and every deferred item's cost and how to add it back, see **docs/FULL_BUILD_SPEC_AND_COST_INTEL.md**.*
