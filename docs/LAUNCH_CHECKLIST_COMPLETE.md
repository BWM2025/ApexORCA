# Complete Ordered Launch Checklist — Aligned (Grok + Cursor)

**ApexORCA.io — © 2026. Founder: B.W. Moore**  
**Single list. Do in order. Check off as you go. No gaps. 8 items only.**

---

## When you return — start here

1. Open this file and pick up at the step you’re on.
2. **Exact next 3 steps** (see bottom of doc) get the site live; do those first if you want to go live fast.
3. Phases 4–7 (LLM, WhatsApp/Telegram, emails, X/LinkedIn) can be done right after go-live or handed to the AI team.

**Domain:** apexorca.io (the only domain used in this codebase)

---

## Quick reference

| What | Where / value |
|------|----------------|
| **Vercel root directory** | `apps/web` |
| **Stripe webhook URL** | `https://apexorca.io/api/stripe/webhook` |
| **Stripe webhook event** | `checkout.session.completed` |
| **Production env vars** | NEXT_PUBLIC_URL, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY |

**8 Stripe products only** (slug in code = priceMap key; create in Live mode):

| Slug (use in priceMap) | Product name | Price |
|------------------------|--------------|-------|
| playbook | ORCA Governance Playbook | $39 |
| ceo-pod | CEO Pod Full Package | $129 |
| marketing-pod | Marketing Pod Full Package | $59 |
| technical-pod | Technical Pod Full Package | $79 |
| operations-pod | Operations Pod Full Package | $99 |
| governance-booster | Governance Booster Full Package | $49 |
| growth-engine | Growth Engine Full Package | $19 |
| pod-os | Pod Orchestrator Full Package | $29 |

*(Display name is “Pod Orchestrator”; the slug in code and Stripe priceMap is `pod-os`.)*

---

# Phase 1: Domain & Branding (Do First — Today)

- [ ] **1** — Buy **apexorca.io** at Namecheap/Porkbun (~$12–15/year) if not already owned.
- [ ] **2** — In Vercel → Project → **Domains** → **Add** apexorca.io and follow DNS instructions (CNAME or A record).
- [ ] **3** — Once DNS is live, set `NEXT_PUBLIC_URL=https://apexorca.io` in production (Vercel → Environment Variables) and redeploy.

---

# Phase 2: Stripe (8 Items Only)

- [ ] **4** — Switch Stripe Dashboard to **Live** mode.
- [ ] **5** — Create exactly these **8 Products + one-time Prices** in Stripe (Live):

  - playbook — $39  
  - ceo-pod — $129  
  - marketing-pod — $59  
  - technical-pod — $79  
  - operations-pod — $99  
  - governance-booster — $49  
  - growth-engine — $19  
  - pod-os (Pod Orchestrator) — $29  

- [ ] **6** — Copy the 8 live **Price IDs** (`price_1...`) into `apps/web/lib/stripe.ts` → `priceMap` (replace test placeholders).
- [ ] **7** — In Stripe: **Developers** → **Webhooks** → **Add endpoint** → URL: `https://apexorca.io/api/stripe/webhook`, event: `checkout.session.completed`. Copy the **signing secret** (`whsec_...`).
- [ ] **8** — Add to production .env (Vercel): `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` (live values). Commit and push only the updated `stripe.ts` (Price IDs); never commit secret keys.

---

# Phase 3: Supabase

- [ ] **9** — Ensure `purchases` table exists: run `infra/supabase-schema.sql` in Supabase SQL Editor if needed.
- [ ] **10** — Add to production .env (Vercel): `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

---

# Phase 4: LLM for You (Builder)

- [ ] **11** — Go to https://console.x.ai → create Grok API key.
- [ ] **12** — Run `openclaw configure` and add the Grok API key (full guide in `docs/LLM_PROVIDER_SETUP_GUIDE.md`).
- [ ] **13** — Expected cost: SuperGrok $30/month + $10–40/month token usage (short mandates keep it low).

---

# Phase 5: WhatsApp / Telegram for Agents

- [ ] **14** — After OpenClaw is installed: `openclaw channels --channel whatsapp --account main` (scan QR with phone).
- [ ] **15** — (Optional) `openclaw channels --channel telegram --account main`.
- [ ] **16** — Test with one short mandate in WhatsApp/Telegram.

---

# Phase 6: Emails

- [ ] **17** — Set up domain emails: team@apexorca.io, support@apexorca.io, ceo-lead@apexorca.io, etc.
- [ ] **18** — (Optional) Add Resend or SendGrid for transactional emails; add the API key to production .env.

---

# Phase 7: Team Representation (X & LinkedIn)

- [ ] **19** — **X account:** Bio = “AI-powered company run by a full team of governed agents.” Pinned post/link: “Meet the Team” with the 6 neutral roles (CEO-Lead, Marketing-Lead, Technical-Lead, Operations-Lead, Growth-Lead, Governance-Lead).
- [ ] **20** — **LinkedIn Company Page:** Create page for apexorca.io; list the same 6 agents in About and Team sections.

---

# Phase 8: Build & Deploy

Run from **repo root** (e.g. `cd "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"`):

- [ ] **21** — Run `npx tsx scripts/export-pdf.ts` — confirm `apps/web/public/downloads/playbook.pdf` exists.
- [ ] **22** — Run `npx tsx scripts/generate-product-zips.ts` — confirm 7 product ZIPs in `apps/web/public/downloads/` (ceo-pod, marketing-pod, technical-pod, operations-pod, governance-booster, growth-engine, pod-os).  
  (Optional) Run `npx tsx scripts/generate-quickstart-zip.ts` for `quickstart.zip` in the same folder.
- [ ] **23** — Push code to GitHub (including updated `stripe.ts` and downloads). Deploy to Vercel (root: `apps/web`), all env vars set.
- [ ] **24** — Test one full purchase end-to-end: marketplace → Buy → pay → success page → download link works. In Stripe check webhook success; in Supabase check `purchases` has one row.

**When 1–24 are done (through Phase 8), the site is live and functional.**

---

# Phase 9: Give Credentials to AI Team (After Site Is Live)

When you want the AI team to operate or monitor:

| Give them | Purpose |
|-----------|---------|
| Grok API key | OpenClaw agents |
| Stripe read-only access | Monitoring |
| Resend/SendGrid key | If transactional email is used |
| Domain email logins | If they handle inbox |
| X & LinkedIn company page access | If they post on your behalf |

They do **not** need your SuperGrok login or X Premium credentials.

---

# Exact Next 3 Steps When You Return

1. **Buy apexorca.io and add it to Vercel** — then set `NEXT_PUBLIC_URL=https://apexorca.io` and redeploy.
2. **Stripe + Supabase:** Create the 8 live Stripe Products/Prices; add webhook `https://apexorca.io/api/stripe/webhook`; paste the 8 Price IDs into `apps/web/lib/stripe.ts` → `priceMap`; add to production .env: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (if Supabase isn’t done yet, do Phase 3 steps 9–10 first). Push and redeploy.
3. **Run the two build scripts** (`npx tsx scripts/export-pdf.ts` and `npx tsx scripts/generate-product-zips.ts`), push, then **test one full purchase** end-to-end.

After these 3 steps the site is live and functional. The rest (LLM, WhatsApp/Telegram, emails, X/LinkedIn, credentials for AI team) can be done immediately after or handed to the AI team.

---

**Everything is verified complete and ready. No gaps. No overlaps. 8 items only. Checklist is ordered and actionable.**

When you return, say **“I’m back — start with step 1”** (or the step you’re on) and we’ll execute. You’ve got this. The build is solid. Let’s get it live.

---

*Reference: Stripe/product detail → `docs/PRODUCTION_SETUP_WHAT_YOU_PROVIDE.md`. Website deploy → root `DEPLOY_NOW.md`. OpenClaw/agent → `docs/DEPLOY_NOW.md`. **Biggie handoff (final copy)** → `docs/BIGGIE_HANDOFF.md`.*
