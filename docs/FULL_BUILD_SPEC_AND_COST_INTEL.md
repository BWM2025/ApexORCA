# Full Build Spec & Cost Intel — ApexORCA vs FelixCraft Intel

**Purpose:** This is the **complete** build from the FelixCraft intel — not a zero-budget subset. Every component from the intel is in scope. This doc gives you: (1) **what was left out because of cost**, (2) **what each of those things costs** (with real numbers where possible), (3) **how to add them back in an affordable way** (free tiers, add after first sale, etc.), and (4) **phased rollout** so you know exactly when to add each piece as revenue comes in.

**Use this for:** Deciding what to turn on after first sale; budgeting; and having the full spec in one place so nothing is “forgotten” because of cost. You make the call — this doc gives you the numbers.

---

## Part A — What we left out because of cost (and what it costs)

Everything below was deferred in the earlier spec **only** because it required paid services or significant new cost. Here is each item with cost intel and an affordable path to add it back.

### 1. Vector DB (long-term RAG, semantic memory)

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Pinecone (or similar) for embedding memory, long-term retrieval, “hot/warm/cold” at scale | Assumed paid | **Free tier:** 2GB, 5 indexes, no CC (Pinecone). Enough for ~100K vectors. **Paid:** Standard from ~$25/mo (usage-based on top). | **Add when:** After first sale. Start on **Pinecone free tier** (no monthly). If you outgrow 2GB, then consider Standard (~$25/mo) or another free-tier option (e.g. Supabase pgvector on existing Supabase). |

### 2. Residential proxies / stealth browser

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Bright Data (or similar) residential proxy rotation; optional stealth/fingerprint spoofing for scraping or anti-detection | Paid proxy + optional browser automation | **Proxies:** Pay-as-you-go ~$4/GB (Bright Data); plans from ~$499/mo for 141 GB. **Stealth browser:** Often bundled with proxy plans or separate (e.g. Puppeteer/Playwright with proxy). | **Add when:** Only if you need scraping or anti-blocking (e.g. lead research, trend scraping). **Affordable:** Use free tier or minimal pay-as-you-go (e.g. $20–50 one-time for a few GB to test). Skip entirely until you have a concrete use case that pays for it. |

### 3. Crypto payment rail (USDC on Base)

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Helio / MoonPay Commerce (or similar) for USDC/crypto checkout alongside Stripe | Integration + fees | **Upfront:** $0 to start (Helio/MoonPay Commerce). **Ongoing:** 2% per transaction (standard); 1% with HelioX Pass. No monthly minimum. | **Add when:** After first Stripe sales. **Affordable:** Turn on when you want crypto buyers; you only pay the % on crypto transactions. No fixed monthly cost. |

### 4. Sentry (error tracking + auto-fix pipeline)

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Sentry for errors + optional pipeline: ingest → triage → reproduce → fix → verify → PR | Assumed paid | **Free:** Developer plan — 5k errors/mo, 5GB logs, 1 cron monitor (enough for small app). **Paid:** Team ~$26/mo, Business ~$80/mo. | **Add when:** After first sale or when you care about production errors. **Affordable:** Start on **free plan**; upgrade only if you exceed 5k errors/mo or need more features. |

### 5. Make.com / automation (scheduled workflows, webhooks)

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Make.com for cron-like workflows (e.g. daily report → Slack, Sentry alert → channel) | Monthly subscription | **Free:** 1,000 operations/mo, 2 scenarios. **Paid:** Core ~$9–11/mo (10k ops), Pro ~$16–19/mo. | **Add when:** When you want off-OpenClaw automation (e.g. “if Stripe sale → post to Discord”). **Affordable:** Use free tier first; 1k ops can cover a few daily jobs. Or keep using OpenClaw cron only ($0). |

### 6. Railway (or similar) hosting for gateway/workers

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Railway (or Render, Fly) for running OpenClaw gateway or workers in the cloud 24/7 | Monthly hosting | **Railway:** $5 free trial; Hobby $5/mo (includes $5 credit); Pro $20/mo. **Render:** Free tier for static; paid for always-on. | **Add when:** When you want gateway/agents running 24/7 without your Mac. **Affordable:** Start with Hobby $5/mo or use existing Vercel + serverless for what you can; add Railway when revenue justifies it. |

### 7. Discord / Telegram community bot (upsell, community)

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Dedicated Discord or Telegram bot for community, announcements, upsell | OpenClaw has Telegram/WhatsApp; “bot” config + possible hosting | **Discord:** Bot is free; optional paid Nitro for server. **Telegram:** Bot API free. **Cost:** Mainly dev time + any hosting for bot process (can run on same Railway $5 or free tier elsewhere). | **Add when:** After first sales when you want a community channel. **Affordable:** Use OpenClaw’s existing Telegram/WhatsApp if already configured; or add a small bot on free hosting. |

### 8. $ORCA token + tokenomics + treasury dashboard

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Token launch (Base), liquidity, buy-back/burn, tokenomics config, dashboard widget for token metrics | Legal + listing + liquidity + dev | **Costs:** Legal/audit (varies); listing fees (exchange-dependent); liquidity (you provide capital); dev for dashboard/widget. Often **$5k–50k+** depending on scope. | **Add when:** When you have revenue and legal clarity; treat as a dedicated project. **Affordable:** Phase it: (1) treasury link on dashboard (free), (2) tokenomics doc + config (free), (3) actual launch + liquidity when you have budget. |

### 9. Decentralized hosting (Akash/Render) + DAO

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Akash or similar for decentralized compute; Snapshot/Tally for governance/DAO | Niche + setup cost | **Akash:** Pay-as-you-go compute (often cheaper than AWS for small workloads). **DAO:** Snapshot free; Tally free tier. **Cost:** Mainly time + gas/multisig for treasury. | **Add when:** When you want “run on decentralized infra” or “community votes on treasury.” **Affordable:** Start with Snapshot (free) for signaling; add Akash only if you have a concrete use case. |

### 10. Recursive self-marketing (15% revenue → ads, CAC/LTV)

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Allocate % of revenue to paid ads (Meta, X, etc.); tune CAC/LTV | Ad spend | **Cost:** Whatever you allocate (e.g. 15% of revenue). No fixed platform fee if you use native ad managers. | **Add when:** When you have steady revenue and want to scale. **Affordable:** Start with 5–10% of revenue after first $500–1k; scale up as LTV justifies. |

### 11. Google Sheets/Docs (service account JWT)

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Service account for reading/writing Google Sheets or Docs from the agent | Optional integration | **Cost:** Google Cloud free tier covers low usage; no monthly if you stay within free limits. | **Add when:** When you need Sheets/Docs in the loop. **Affordable:** Use free tier; add only when needed. |

### 12. Third-party revenue verification (e.g. TrustMRR)

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Public link to third-party verification of MRR/revenue (credibility) | Unknown cost / optional | **Cost:** Depends on provider; some are free for basic display, others subscription. | **Add when:** When you want extra credibility. **Affordable:** Research free or low-cost MRR verification; add as link from dashboard. |

### 13. ClawMart-style “skills” marketplace (sell agent skills)

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Marketplace where you sell OpenClaw “skills” or modules to other agents (not just products) | Product/market + dev | **Cost:** Dev time to build skill listing, delivery, and possibly revenue share. No fixed SaaS cost unless you use a platform. | **Add when:** When you have skills to sell and demand. **Affordable:** Extend current product marketplace (you already have it) to include “skills” as a product type; Stripe for payment. |

### 14. Info-product factory (multiple PDFs from templates)

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Automated generation of many info products (PDFs) from templates | Dev + possible PDF service | **Cost:** You already have export-pdf; scaling to “factory” is mostly logic + storage. No mandatory new SaaS. | **Add when:** When you want more than the playbook. **Affordable:** Build on existing export-pdf and templates; use Vercel/Supabase (already there). |

### 15. “Reverse engineering” scout (trends → product ideas)

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Agent use of web search / scraping to find trends and suggest product ideas | Could use paid search/scraping | **Cost:** If using existing OpenClaw tools (e.g. browser, web_search), no new cost. If you add a paid trend API, varies. | **Add when:** When you want automated trend → product pipeline. **Affordable:** Use free tools first; add paid data only if revenue justifies. |

### 16. Ralph loops / tmux / worktree (coding-at-scale)

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Bounded coding loops, stable tmux socket, git worktree isolation for parallel coding | Dev time; no direct SaaS cost | **Cost:** No monthly fee; implementation time. | **Add when:** When you do serious autonomous coding (e.g. Sentry auto-fix, multi-repo). **Affordable:** Add as docs + scripts when you need it; $0 extra SaaS. |

### 17. Audit logging (every tool invocation + artifacts)

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Structured log of every tool call + artifacts (E1–E6, S1–S6 style) | Could imply storage/DB | **Cost:** File-based = $0. If you use a logging service (e.g. Axiom, Better Stack), free tiers exist (~5GB/mo). | **Add when:** When you want full traceability. **Affordable:** Start with file-based audit log in repo or volume; move to service only if needed. |

### 18. Governance enhancements (fact-check, PII scrubber, goal anchor, max entropy breaker)

| What it is | Why it was left out | Cost (reality) | Affordable way to add it back |
|------------|---------------------|----------------|-------------------------------|
| Middleware: 2-source fact-check before commit, PII scrubber, re-read GOALS every N cycles, repeat-3x → reset to identity | Dev time | **Cost:** No SaaS; implementation and testing. | **Add when:** When you want stronger guardrails. **Affordable:** Add one at a time as docs + small code; $0 extra. |

---

## Part B — Cost summary table (quick reference)

| Item | Free / one-time | Low (~$5–25/mo) | Medium (~$25–100/mo) | High / variable |
|------|------------------|------------------|----------------------|------------------|
| Vector DB (Pinecone) | Free tier (2GB) | Standard ~$25/mo | — | Enterprise |
| Proxies (Bright Data) | — | Pay-as-you-go ~$20 for 5GB | ~$499/mo (141 GB) | Custom |
| Crypto payments (Helio) | $0 to start | 2% per txn only | — | — |
| Sentry | Free (5k errors/mo) | Team ~$26/mo | Business ~$80/mo | — |
| Make.com | 1k ops/mo | Core ~$9–11/mo | Pro ~$16–19/mo | — |
| Railway | $5 trial | Hobby $5/mo | Pro $20/mo | — |
| Discord/Telegram bot | Free API | Hosting $0–5/mo | — | — |
| $ORCA token / DAO | Snapshot free | — | Legal + liquidity (one-time) | $5k–50k+ for full launch |
| Recursive ads | — | 5–10% of revenue | 15% of revenue | Scale with revenue |
| Google Sheets/Docs | Free tier | — | — | — |
| TrustMRR-style | Varies | — | — | — |
| ClawMart skills | — | Dev only (Stripe existing) | — | — |
| Info-product factory | Existing stack | — | — | — |
| Scout / Ralph / tmux / audit / governance | $0 (dev time) | — | — | — |

---

## Part C — Exact costs & entry offers (inline list)

Every deferred/costly item: **startup/initial cost**, **ongoing cost**, **entry offers** (free trial, free tier, promo). Check each provider’s site for current terms.

---

**1. Pinecone (vector DB)**  
- **Startup / initial:** $0. No signup fee.  
- **Entry offer:** Free Starter plan — **no credit card required**. 2GB, 5 serverless indexes, ~100k vectors.  
- **Ongoing free:** Same as above, no expiry stated for Starter.  
- **Paid:** Standard from **$25/month** (includes usage credits); usage-based on top (e.g. $8.25 per 1M read units, $2 per 1M write, $0.33/GB storage). Enterprise from **$500/month**.  
- **Other:** 21-day Standard trial + $300 credits (check current offer on pinecone.io).

---

**2. Bright Data (residential proxies)**  
- **Startup / initial:** $0 to create account.  
- **Entry offer:** **Free trial, no credit card required.** Dollar-for-dollar matching on first deposit **up to $500**. Promo code **RESIGB50** = **50% off for 3 months** on residential proxies (verify on brightdata.com).  
- **Ongoing:** Pay-as-you-go **$4.00/GB** (no commitment). Or: 141 GB/mo **$499/mo** ($3.50/GB), 332 GB **$999/mo** ($3/GB), 798 GB **$1,999/mo** ($2.50/GB).  
- **Stealth browser / scraping:** Often bundled or separate product; check pricing by product.

---

**3. Helio / MoonPay Commerce (crypto payments USDC on Base)**  
- **Startup / initial:** **$0.** Free to join, no signup fee.  
- **Entry offer:** None needed; you only pay when you have transactions.  
- **Ongoing:** **2% per transaction** (standard). HelioX: **1%** (requires HelioX Pass NFT); custom for high volume. Optional: Swaps 0.25%, Blinks 0.75%, Auto-offramp 0.50%.  
- **No monthly minimum.**

---

**4. Sentry (error tracking)**  
- **Startup / initial:** $0.  
- **Entry offer:** **Free Developer plan** — 5,000 errors/month, 5GB logs, 5M spans, 50 replays, 1 uptime monitor, 1 cron monitor, 1GB attachments. No credit card for free. **14-day free trial of Business plan** for new users.  
- **Ongoing free:** Same 5k errors/mo (and limits above).  
- **Paid:** **Team $26/month** (50k errors base). **Business $80/month**. Enterprise custom. Overage: pay-as-you-go or reserve volume at discount.

---

**5. Make.com (automation)**  
- **Startup / initial:** $0.  
- **Entry offer:** **Free plan:** 1,000 operations/month, 2 active scenarios, 15-minute minimum interval. No credit card required.  
- **Ongoing free:** Same 1k ops/mo.  
- **Paid:** **Core ~$9–$10.59/month** (10k ops). **Pro ~$16–$18.82/month**. **Teams ~$29–$34.12/month**. Enterprise custom. Annual billing ~10–20% off.

---

**6. Railway (hosting gateway/workers)**  
- **Startup / initial:** $0.  
- **Entry offer:** **$5 free credit**, one-time, no credit card. Trial: up to 30 days or until $5 spent. Limit: 1 GB RAM, shared vCPU, max 5 services per project. **Full trial** (full network) if you connect GitHub. After trial: **Free plan** = **$1 free credit per month**.  
- **Ongoing:** **Hobby $5/month** (includes $5 credit; pay for overage). **Pro $20/month** ($20 credit). Usage: memory/CPU/volume/egress billed beyond credit.  
- **Render (alternative):** Free tier = 750 instance hours/mo; services spin down after 15 min inactivity (not true always-on). Paid for always-on.

---

**7. Discord / Telegram (community bot)**  
- **Startup / initial:** $0.  
- **Entry offer:** Discord Bot API and Telegram Bot API are **free**.  
- **Ongoing:** $0 for API. Optional: Discord Nitro for server perks; hosting for bot process (e.g. Railway $5, or free tier elsewhere).  
- **No platform fee for bots.**

---

**8. $ORCA token + tokenomics + treasury dashboard**  
- **Startup / initial:** **Variable.** Legal/audit: $1k–$20k+ depending on jurisdiction. Exchange listing: varies (some free, some fee). Liquidity: you supply capital (e.g. $5k–$50k+ for a modest pool). Dev for dashboard/widget: dev time or contractor.  
- **Entry offer:** None; this is a project, not a SaaS.  
- **Ongoing:** Gas for transactions; possible exchange fees; treasury management.  
- **Realistic range for “full” launch:** **$5,000–$50,000+** one-time depending on scope.

---

**9. Decentralized hosting (Akash) + DAO (Snapshot/Tally)**  
- **Akash:** Pay-as-you-go compute; no fixed monthly; you pay for usage (often lower than AWS for small workloads).  
- **Snapshot:** **Free** for creating proposals and voting.  
- **Tally:** **Free tier** for governance UI.  
- **Entry offer:** Snapshot/Tally free to use. Akash: sign up and pay as you go.  
- **No standard “startup fee”;** cost = usage + time.

---

**10. Recursive self-marketing (ad spend)**  
- **Startup / initial:** $0 (you choose budget).  
- **Entry offer:** Meta/X/Google ads: no platform fee to create account; you only pay when you run campaigns.  
- **Ongoing:** **Whatever you allocate** (e.g. 5%, 10%, 15% of revenue). No fixed monthly unless you set a cap.  
- **Minimum spend:** Often $1–5/day minimum per platform to run a campaign.

---

**11. Google Sheets/Docs (service account)**  
- **Startup / initial:** $0.  
- **Entry offer:** **Google Cloud free tier** covers low usage (e.g. Sheets API, Docs API within quotas). No credit card for free tier in many cases.  
- **Ongoing:** $0 if within free limits; overage billed (check current Google Cloud pricing).  
- **No monthly minimum for typical light agent use.**

---

**12. Third-party revenue verification (e.g. TrustMRR)**  
- **Startup / initial:** Depends on provider; some are free to list, some charge.  
- **Entry offer:** Varies by product.  
- **Ongoing:** Some free, some subscription; **check provider.**  
- **Not a single standard; research when you need it.**

---

**13. ClawMart-style skills marketplace**  
- **Startup / initial:** $0 (you already have Stripe + product marketplace).  
- **Entry offer:** N/A.  
- **Ongoing:** Dev time to add “skills” as a product type; Stripe fees per sale only. No new platform subscription.  
- **Cost = implementation, not SaaS.**

---

**14. Info-product factory (multiple PDFs)**  
- **Startup / initial:** $0 (you have export-pdf and templates).  
- **Entry offer:** N/A.  
- **Ongoing:** Build on existing Vercel/Supabase/scripts; no new service required.  
- **Cost = dev time.**

---

**15. “Reverse engineering” scout (trends → products)**  
- **Startup / initial:** $0 if using OpenClaw browser/web_search.  
- **Entry offer:** N/A.  
- **Ongoing:** $0 for open tools; paid trend/API if you add one (varies by provider).  
- **Optional paid data:** check provider (e.g. trend APIs).

---

**16. Ralph / tmux / worktree (coding-at-scale)**  
- **Startup / initial:** $0.  
- **Entry offer:** N/A.  
- **Ongoing:** $0. No SaaS; implementation and scripting.  
- **Cost = dev time only.**

---

**17. Audit logging (tool invocation + artifacts)**  
- **Startup / initial:** $0 for file-based (repo or volume).  
- **Entry offer:** N/A.  
- **Ongoing:** File-based = $0. If you use a logging service (e.g. Axiom, Better Stack): **free tiers ~5GB/month**; paid after.  
- **Cost = $0 or free tier to start.**

---

**18. Governance enhancements (fact-check, PII scrubber, goal anchor, entropy breaker)**  
- **Startup / initial:** $0.  
- **Entry offer:** N/A.  
- **Ongoing:** $0. Policy + code; no third-party subscription.  
- **Cost = dev time only.**

---

## Part D — Phased rollout (when to add what)

Use this to put things back in **in order of affordability** as soon as you have revenue.

### Phase 0 — Already done ($0 extra)

- Proof (Resend, X), dashboard Stripe notice, cron example, X rate limit, Email Fortress, escalation doc, kill switch, evidence outputs, footer, HEARTBEAT, OpenClaw gateway, Stripe, playbook, marketplace, REVERSIBILITY_TIERS, VETO, etc.

### Phase 1 — After first sale (first $50–200 revenue)

- **Sentry:** Turn on **free** Developer plan; wire errors so you see production issues. ($0)
- **Pinecone:** Create account; use **free tier** for long-term memory / RAG if you want semantic search. ($0)
- **Crypto checkout (Helio/MoonPay Commerce):** Add USDC-on-Base option; you only pay 2% on crypto txns. ($0 upfront)
- **Treasury link on dashboard:** If you have a Base wallet, add link (e.g. BaseScan). ($0)
- **Audit logging (file-based):** Log tool runs to a file or `memory/`; no new service. ($0)

### Phase 2 — When revenue is steady ($500+ / month or 5+ sales)

- **Sentry:** Upgrade to Team (~$26/mo) only if you exceed free tier or need team features.
- **Pinecone:** Move to Standard (~$25/mo) only if you outgrow 2GB.
- **Make.com:** Add **free** or Core (~$9/mo) for automation (e.g. “new sale → Discord/Slack”). 
- **Railway Hobby ($5/mo):** Run OpenClaw gateway or a small worker in the cloud so it’s not tied to your Mac.
- **Financial guardrail:** Document $50 (or $X) API cap in AUTONOMOUS_OPERATING_PARAMETERS; optional alert via Make or HEARTBEAT.
- **Trust Meter / ORCA audit:** One runnable script or doc (no new cost).
- **Skill allowlist doc:** Approved OpenClaw skills (no cost).
- **Recursive ads:** Allocate 5–10% of revenue to paid ads; run manually at first.

### Phase 3 — Scale (when revenue justifies)

- **Residential proxies / stealth:** Only if you have a concrete use case (e.g. lead research); start with minimal pay-as-you-go.
- **$ORCA token launch:** When you have legal clarity and budget (often $5k–50k+ one-time).
- **DAO / decentralized hosting:** When you want community governance or decentralized infra; Snapshot free, Akash/Render as needed.
- **ClawMart-style skills marketplace:** Extend product marketplace to “skills”; Stripe already there.
- **Info-product factory:** Scale PDF generation on existing stack.
- **Ralph / tmux / worktree:** When you do serious autonomous coding; $0 SaaS, dev time only.

---

## Part E — Full build list (everything in the intel)

This is the **complete** list of requirements from the FelixCraft intel. Nothing is omitted; each has a **cost tier** so you can decide when to implement.

### Core / runtime

| # | Requirement | Cost tier | Notes |
|---|-------------|-----------|--------|
| 1 | Gateway = single source of truth | FREE | We have |
| 2 | Multi-channel (WhatsApp, Telegram, Discord, web) | FREE | We have |
| 3 | Web Control UI (http://127.0.0.1:18789) | FREE | We have |
| 4 | Cron jobs (scheduled wakeups) | FREE | OpenClaw; doc added |
| 5 | Heartbeat (HEARTBEAT.md, checklist) | FREE | We have |
| 6 | Sub-agents (sessions_spawn, Apex coordinates) | FREE | We have |
| 7 | Identity (SOUL.md / IDENTITY.md) | FREE | We have |
| 8 | File-based memory (memory/, MEMORY.md) | FREE | We have |
| 9 | Lane queue (serial execution) | FREE | Doc/config; OpenClaw may handle |
| 10 | Three-tier memory (PARA, hot/warm/cold) | FREE then LOW | File-based first; Vector DB when Phase 1 (Pinecone free) |
| 11 | Vector DB (long-term RAG) | FREE then LOW | Phase 1: Pinecone free; Phase 2: ~$25/mo if needed |
| 12 | Stealth browser / fingerprint spoofing | MEDIUM | Proxies + dev; Phase 3 only if needed |
| 13 | Residential proxy rotation | MEDIUM–HIGH | Bright Data ~$4/GB or $499/mo; Phase 3 |
| 14 | Semantic snapshots (ARIA) | FREE | OpenClaw browser; document |
| 15 | Command allowlist + structure blocking | FREE | Document in SAFETY/TOOL_INVENTORY |
| 16 | Kill switch (stop gateway, revoke token) | FREE | Doc added |
| 17 | HITL thresholds ($ threshold in docs) | FREE | Add to AUTONOMOUS_OPERATING_PARAMETERS |
| 18 | Rate limit (X posts/day) | FREE | Doc added in X_POSTING_PROTOCOL |
| 19 | tmux stable socket | FREE | Dev time; Phase 3 if coding-at-scale |
| 20 | Ralph loops (bounded iteration) | FREE | Dev time; Phase 3 |
| 21 | PRD-driven + test-first | FREE | Doc/template |
| 22 | Worktree isolation (parallel coding) | FREE | Dev time; Phase 3 |
| 23 | Sentry Auto-Fix pipeline | FREE then LOW | Phase 1: Sentry free; Phase 2: Team $26/mo if needed |
| 24 | Email Fortress (email = data not commands) | FREE | Doc added |
| 25 | X via CLI (post_tweet_env.sh) | FREE | We have |
| 26 | 3-tier escalation (support ladder) | FREE | Doc added |
| 27 | Collaborative doc safety (section edits) | FREE | Policy doc |
| 28 | Google Sheets/Docs (JWT) | FREE | Free tier when needed |
| 29 | Skill allowlist (approved skills) | FREE | Doc |
| 30 | Secret scoping (no secrets in memory) | FREE | Doc exists |
| 31 | Audit logging (tool invocation + artifacts) | FREE then LOW | Phase 1: file-based; optional service later |
| 32 | Decentralized hosting (Akash/Render) | VARIABLE | Phase 3; pay-as-you-go |
| 33 | Governance DAO (Snapshot/Tally) | FREE + one-time | Snapshot free; token launch cost separate |
| 34 | Recursive self-marketing (15% → ads) | % of revenue | Phase 2: 5–10%; Phase 3: 15% |

### Site / business

| # | Requirement | Cost tier | Notes |
|---|-------------|-----------|--------|
| 35 | Homepage hero + positioning | FREE | We have |
| 36 | Primary paid product (playbook) | FREE | We have |
| 37 | Stripe checkout | FREE | We have (Stripe fees per txn) |
| 38 | Crypto payment rail (USDC Base) | FREE upfront | Phase 1: Helio 2% per txn only |
| 39 | Public transparency dashboard | FREE | We have |
| 40 | Stripe-only notice | FREE | Added |
| 41 | Revenue panels (7d/30d/lifetime) | FREE | We have |
| 42 | Third-party revenue verification (TrustMRR) | LOW (varies) | Phase 2; research free options |
| 43 | Crypto treasury link (BaseScan) | FREE | Phase 1 when wallet exists |
| 44 | Token metrics + token page | DEFER | With token launch (Phase 3) |
| 45 | Nav: Guide, Dashboard, $TOKEN, X, Marketplace | FREE | Add $ORCA when token |
| 46 | ClawMart-style skills marketplace | FREE (dev) | Phase 3; extend current marketplace |
| 47 | Transparency footer | FREE | Added |
| 48 | Live proof-of-work (GitHub/onchain link) | FREE | Optional |

### Automation / scheduling

| # | Requirement | Cost tier | Notes |
|---|-------------|-----------|--------|
| 49 | Pre-configured cron in persona bundle | FREE | Doc/example added |
| 50 | Heartbeat checklist (short) | FREE | We have |
| 51 | Daily executive report (cron) | FREE | OpenClaw cron or Make free |
| 52 | Weekly planning / backlog (cron) | FREE | Same |
| 53 | Scheduled social post (cron → X) | FREE | OpenClaw cron |
| 54 | Inbox check (heartbeat) | FREE | HEARTBEAT doc |
| 55 | Sentry alert check (webhook) | FREE then LOW | Phase 1: Sentry free |
| 56 | Sales/revenue change alert | FREE | Dashboard + optional Make |
| 57 | Catch-up when gateway was sleeping | FREE | OpenClaw / logic |

### Content / product factory

| # | Requirement | Cost tier | Notes |
|---|-------------|-----------|--------|
| 58 | Automated PDF (template) | FREE | export-pdf exists; extend |
| 59 | Info-product template | FREE | Doc/template |
| 60 | Reverse-engineering scout (trends → products) | FREE then LOW | OpenClaw tools first; paid API if needed |
| 61 | ClawMart skill arbitrage | FREE (dev) | Phase 3; skills as product type |
| 62 | Digital product vault + subscription | LOW | Stripe subscription; existing stack |

### Token / treasury

| # | Requirement | Cost tier | Notes |
|---|-------------|-----------|--------|
| 63 | $ORCA token launch (Base, liquidity) | HIGH (one-time) | Phase 3; $5k–50k+ |
| 64 | Tokenomics config (tokenomics.json) | FREE | Doc + config when ready |
| 65 | Stabledrop / incentive distribution | HIGH | With token launch |

### Governance / safety

| # | Requirement | Cost tier | Notes |
|---|-------------|-----------|--------|
| 66 | CEO supervisor / Constitution | FREE | We have |
| 67 | Zero hallucination (verify before claim) | FREE | SAFETY, TOOL_INVENTORY, EVIDENCE_OUTPUTS |
| 68 | Financial guardrail ($50 API cap) | FREE | Doc in AUTONOMOUS_OPERATING_PARAMETERS |
| 69 | Code integrity (audit Dev output) | FREE | Oreo checklist; formalize |
| 70 | Revenue priority formula | FREE | Doc |
| 71 | Self-evolution (rewrite identity) | FREE | Doc/policy; careful |
| 72–75 | REVERSIBILITY_TIERS, VETO, traceability, auth channels | FREE | We have |
| 76 | Trust Meter / ORCA audit runnable | FREE | Script or doc |
| 77 | Fact-check middleware (2 sources) | FREE | Policy + dev |
| 78 | Sandbox shield (sanitize input) | FREE | Doc + optional code |
| 79 | Recursive goal anchor (re-read GOALS) | FREE | HEARTBEAT or cron |
| 80 | Max entropy breaker (3x repeat → reset) | FREE | Logic in agent |
| 81 | PII scrubber | FREE | Middleware or doc |

### Marketing / X

| # | Requirement | Cost tier | Notes |
|---|-------------|-----------|--------|
| 82 | PROMO_QUEUE + post_tweet | FREE | We have |
| 83 | X_POSTING_PROTOCOL | FREE | We have |
| 84 | Live earnings ticker on homepage | FREE | Dashboard API |
| 85 | Alpha thread (4h schedule) | FREE | Cron + PROMO_QUEUE |
| 86 | Discord/Telegram community bot | FREE then LOW | Phase 2; OpenClaw or small bot |
| 87 | Build-in-public + trend replies | FREE | Strategy + tools |

### Evidence / verification

| # | Requirement | Cost tier | Notes |
|---|-------------|-----------|--------|
| 88 | Evidence locker (E1–E6, S1–S6) | FREE | File-based or Phase 1 audit log |
| 89 | Verification gates before “success” | FREE | EVIDENCE_OUTPUTS doc |
| 90 | PR with rationale + evidence (Sentry/coding) | FREE | Pipeline design; Sentry free |

---

## Part F — What to do next (redoing the spec with this)

1. **Treat this doc as the full build.** Everything above is in scope; cost tier tells you whether it’s $0 or when to add it.
2. **Use Part A and Part C (exact costs)** when you get first sale: go down the “Affordable way to add it back” column and turn on free tiers (Sentry, Pinecone, Helio) and file-based audit log.
3. **Use Part D (phased rollout)** to add paid items in order: Phase 1 → Phase 2 → Phase 3 as revenue grows.
4. **Update the implementation checklist** so it has two tracks: (a) **Phase 0 (done)** and (b) **Phase 1+ (full build)** with each item tagged by cost tier and phase. I can do that in a follow-up if you want.
5. **Keep FELIXCRAFT_INTEL_GAP_CHECKLIST_AND_MASTER_SPEC.md** as the inventory and gap truth; this doc (FULL_BUILD_SPEC_AND_COST_INTEL) is the **cost reality** and **complete spec** so nothing is left out because of cost — you see the numbers and decide.

---

*Cost figures are approximate (2024–2025); check each provider before committing. Free tiers and pricing can change.*
