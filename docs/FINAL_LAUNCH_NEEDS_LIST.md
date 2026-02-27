# Final Launch Needs List — Fully Aligned (Grok + Cursor)

**ApexORCA.io — © 2026. Founder: B.W. Moore**  
**Date:** Feb 26, 2026

**→ For a single, reorganized walkthrough with checkboxes and “when you get back” steps, use [LAUNCH_CHECKLIST_COMPLETE.md](LAUNCH_CHECKLIST_COMPLETE.md).** This doc is the full reference; that one is the one to follow in order.

**Domain:** The production domain is **apexorca.io** (no other domain is used in this codebase).

---

## Status: Codebase

- All previous specs are applied (LLM guide, Big Sur notes, Grok recommendation, neutral placeholders, playbook, quickstart, scripts).
- No known gaps in the codebase; **production-clean** and launch-ready once the checklist below is done.

---

# PHASE 1 — Domain & Branding (Do First)

| # | Item | What you do |
|---|------|-------------|
| 1.1 | **Buy domain** | Register **apexorca.io** at Namecheap, Porkbun, or your registrar (~$12–15/year). |
| 1.2 | **Point DNS to host** | In Vercel: Project → Settings → Domains → Add apexorca.io. Follow DNS instructions (CNAME or A record). |
| 1.3 | **Set NEXT_PUBLIC_URL** | After DNS propagates, set `NEXT_PUBLIC_URL=https://apexorca.io` in production env (e.g. Vercel). Redeploy. |

---

# PHASE 2 — Stripe Live Keys (Required for Real Payments)

| # | Item | What you do |
|---|------|-------------|
| 2.1 | **Stripe Live mode** | In Stripe Dashboard, switch to **Live** mode. |
| 2.2 | **Create 8 Products + Prices** | Create one **Product** and one **one-time Price** for each item in the table in **docs/PRODUCTION_SETUP_WHAT_YOU_PROVIDE.md**: playbook ($39), ceo-pod ($129), marketing-pod ($59), technical-pod ($79), operations-pod ($99), governance-booster ($49), growth-engine ($19), pod-os ($29). |
| 2.3 | **Update priceMap** | Copy the 8 **live Price IDs** (`price_1...`) into `apps/web/lib/stripe.ts` → `priceMap`. Replace every test placeholder. |
| 2.4 | **Webhook** | Stripe Dashboard → Developers → Webhooks → Add endpoint: `https://apexorca.io/api/stripe/webhook`. Event: `checkout.session.completed`. Copy the **Signing secret** (`whsec_...`). |
| 2.5 | **Production env** | Add to production (e.g. Vercel): `STRIPE_SECRET_KEY=sk_live_...`, `STRIPE_WEBHOOK_SECRET=whsec_...`. |

---

# PHASE 3 — Supabase (Purchase Storage)

| # | Item | What you do |
|---|------|-------------|
| 3.1 | **Supabase project** | Create project; apply schema from `infra/supabase-schema.sql` (e.g. `purchases` table). |
| 3.2 | **Production env** | Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in production. (Server-only; never expose service role in client.) |

---

# PHASE 4 — LLM for You (Builder / OpenClaw)

| # | Item | What you do |
|---|------|-------------|
| 4.1 | **Grok API key** | Go to https://console.x.ai → create API key. |
| 4.2 | **OpenClaw config** | Run `openclaw configure` and add the Grok API key. (See **docs/LLM_PROVIDER_SETUP_GUIDE.md** for other providers.) |
| 4.3 | **Cost expectation** | SuperGrok ~$30/month + token usage ~$10–40/month for moderate use. Monitor in xAI console. |

---

# PHASE 5 — WhatsApp / Telegram (Optional — For Agents)

| # | Item | What you do |
|---|------|-------------|
| 5.1 | **WhatsApp** | After OpenClaw is installed: `openclaw channels --channel whatsapp --account main` (scan QR with phone). |
| 5.2 | **Telegram** | (Optional) `openclaw channels --channel telegram --account main`. |
| 5.3 | **Test** | Send a short mandate in WhatsApp/Telegram to verify. |

---

# PHASE 6 — Emails

| # | Item | What you do |
|---|------|-------------|
| 6.1 | **Domain emails** | Set up professional addresses: team@apexorca.io, support@apexorca.io, ceo-lead@apexorca.io (optional). |
| 6.2 | **Transactional (optional)** | To send purchase confirmation + download links by email: add Resend or SendGrid, verify sending domain, set `RESEND_API_KEY` (or equivalent) in production. See **docs/PRODUCTION_SETUP_WHAT_YOU_PROVIDE.md** §2. |

---

# PHASE 7 — Team Representation (X & LinkedIn)

*The **website** does not need X/LinkedIn API keys. These steps are for your **brand presence** and “Meet the Team” consistency.*

| # | Item | What you do |
|---|------|-------------|
| 7.1 | **X account** | Create @ApexOrca. Bio: e.g. “AI-powered company run by a full team of governed agents.” Pinned post / link in bio: “Meet the Team” with: CEO-Lead (strategic leadership), Marketing-Lead (content & campaigns), Technical-Lead (builds & ships), Operations-Lead (fulfillment & support), Growth-Lead (audience & distribution), Governance-Lead (alignment & safety). |
| 7.2 | **LinkedIn Company Page** | Create company page for apexorca.io. In About and Team sections, list the same 6 agents with short roles. |

---

# PHASE 8 — Build Outputs & Deploy

| # | Item | What you do |
|---|------|-------------|
| 8.1 | **Playbook PDF** | Run `npx tsx scripts/export-pdf.ts` from repo root. Confirm `apps/web/public/downloads/playbook.pdf` is correct. |
| 8.2 | **Product ZIPs** | Run `npx tsx scripts/generate-product-zips.ts`. Confirm all 7 product ZIPs (ceo-pod, marketing-pod, technical-pod, operations-pod, governance-booster, growth-engine, pod-os) are in `apps/web/public/downloads/`. Playbook PDF from export-pdf.ts. |
| 8.3 | **Deploy** | Push to GitHub; deploy to Vercel (root directory **apps/web**). Ensure all production env vars are set (NEXT_PUBLIC_URL, STRIPE_*, SUPABASE_*). |
| 8.4 | **Internal links** | After domain is live, update any remaining internal links to the new domain if needed. |

---

# TESTING

## Pre-launch (you or Cursor can run these now)

Run these **before** or **right after** deploy to confirm core functionality:

| # | Test | How |
|---|------|-----|
| T1 | **Build** | `cd apps/web && npm run build` — must complete without errors. |
| T2 | **Playbook export** | `npx tsx scripts/export-pdf.ts` — playbook.pdf appears in `apps/web/public/downloads/`. |
| T3 | **ZIP generation** | `npx tsx scripts/generate-product-zips.ts` — all expected ZIPs in `public/downloads/`. |
| T4 | **Stripe priceMap** | No missing slugs: all 8 product slugs in `getAllProductSlugs()` have a live Price ID in `apps/web/lib/stripe.ts` → `priceMap`. |

## Post-launch (you or AI agents can run these once site is live)

These can be run **by you or by AI agents** after the site is live (no secrets need to be shared with agents; they use the public site):

| # | Test | How |
|---|------|-----|
| T5 | **Homepage** | Open `https://apexorca.io` — loads, no broken layout. |
| T6 | **Marketplace** | Open `/marketplace` — products and prices render. |
| T7 | **Checkout** | Run a **full purchase flow** with a low-cost test product (e.g. $1 if you created one) — checkout → payment → redirect to success page. |
| T8 | **Success + downloads** | On success page, confirm download links appear and the linked files (ZIPs, playbook.pdf) are reachable. |
| T9 | **Webhook** | In Stripe Dashboard → Developers → Webhooks, confirm the endpoint shows successful events after a test purchase. |
| T10 | **Supabase** | In Supabase, confirm a row appears in `purchases` for the test purchase. |

**Can AI agents do this?** Yes. Once the site is live, you can ask Cursor or another agent to: (1) open the site and click through homepage → marketplace → one product; (2) you complete payment yourself; (3) agent verifies success page and download links. Agents can also run T1–T4 locally if they have the repo. You do **not** need to give agents Stripe keys or Supabase keys for T5–T8; for T9–T10 you can check yourself or give read-only access to a human.

---

# CREDENTIALS TO GIVE THE AI TEAM (When You Want Them to Operate)

Once the site is live, if you want the AI team to manage or monitor:

| Credential / access | Purpose |
|--------------------|---------|
| Grok API key | For OpenClaw agents. |
| Stripe live keys | Read-only for monitoring (or dashboard access). |
| Resend/SendGrid API key | If they will manage transactional email. |
| Domain email passwords | team@, support@, etc., if they handle inbox. |
| X and LinkedIn company page access | If they are to post on your behalf. |

They do **not** need your personal SuperGrok login or X Premium credentials.

---

# MINIMUM TO GO LIVE (If You Must Ship Today)

Absolute minimum:

1. **Domain:** NEXT_PUBLIC_URL set; DNS pointing to Vercel (or your host).
2. **Stripe:** Live secret key + webhook secret in env; webhook URL = `https://apexorca.io/api/stripe/webhook`; all 8 Price IDs (7 products + playbook) in `apps/web/lib/stripe.ts` → `priceMap`.
3. **Supabase:** SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in env; `purchases` table exists.
4. **Build:** Run export-pdf and generate-product-zips so `apps/web/public/downloads/` has ZIPs + playbook.pdf; then deploy.
5. **Deploy:** Push and deploy (e.g. Vercel) with the env vars above.
6. **Smoke test:** One full purchase (e.g. $1 test product) end-to-end.

Phases 4–7 (LLM, WhatsApp/Telegram, email, X/LinkedIn) can follow immediately after go-live.

---

# EXACT NEXT 3 STEPS TO GET LIVE TODAY

1. **Domain + env:** Ensure apexorca.io is registered and DNS points to Vercel. In Vercel, add `NEXT_PUBLIC_URL=https://apexorca.io` and all required env vars (Stripe live keys, webhook secret, Supabase URL + service role key).
2. **Stripe:** Create the 8 live Products/Prices in Stripe (Live mode) — playbook, ceo-pod, marketing-pod, technical-pod, operations-pod, governance-booster, growth-engine, pod-os. Add webhook `https://apexorca.io/api/stripe/webhook`, paste the 8 Price IDs into `apps/web/lib/stripe.ts` → `priceMap`, then push the code change and redeploy.
3. **Build, deploy, test:** Run `npx tsx scripts/export-pdf.ts` and `npx tsx scripts/generate-product-zips.ts`, push (including the updated stripe.ts and any new downloads), deploy on Vercel, then run one full purchase (e.g. $1 test) and confirm success page + downloads and webhook/Supabase.

After that, the site is live and you can run the rest of the phases (LLM, channels, email, X/LinkedIn) and/or hand the post-launch tests (T5–T10) to an AI agent.

---

**Biggie Treasury Activation (Day 3–5 post-launch)**  
**→ Final handoff copy for AI team: [docs/BIGGIE_HANDOFF.md](BIGGIE_HANDOFF.md).** To be completed by AI-CEO and team as CEO dictates. Follow **docs/BIGGIE_ACTIVATION_ROADMAP.md**. CEO-Lead proposes initial wallet and budget to founder; Governance-Lead enforces multi-sig and audits. Full handoff: personas in `packages/agent-configs/personas/biggie/` and `biggie-trading/`, plus docs/BIGGIE_MULTI_SIG_SETUP.md, BIGGIE_LEGAL_SECURITY_FRAMEWORK.md, BIGGIE_MARKETING_PLAN.md.

---

*Single reference for Stripe product list and email/domain detail: **docs/PRODUCTION_SETUP_WHAT_YOU_PROVIDE.md**.*  
*Where account/domain info goes and do AI agents need Porkbun: **docs/LAUNCH_ACCOUNTS_REFERENCE.md**.*  
*Forensic study (no working files, no conflicts): **docs/FORENSIC_STUDY_AND_FINAL_CHECKLIST.md** Part 1.*
