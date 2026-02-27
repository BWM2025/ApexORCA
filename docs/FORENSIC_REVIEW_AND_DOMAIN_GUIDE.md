# ApexORCA.io — Forensic Review & Domain Guide

**Purpose:** Single reference for where every major component lives, how the domain (ApexORCA.io) is used, what must be done for production, and known gaps/errors.

---

## 1. Where products and playbook are in the codebase

### Products (marketplace + downloads)

| What | Location | Purpose |
|------|----------|---------|
| **Product definitions** (name, price, copy, whatYouGet, etc.) | `apps/web/lib/products.ts` | Single source for all marketplace products; used by product pages, Stripe checkout, and download labels. |
| **Download links** (which file/ZIP each product delivers) | `apps/web/lib/downloads.ts` | `getDownloadLinks(productId)` returns the list shown on the success page (e.g. "CEO Pod Complete (ZIP)" → `/downloads/ceo-pod.zip`). |
| **Stripe Price IDs** | `apps/web/lib/stripe.ts` | `priceMap[productId]` must match your Stripe Dashboard Price IDs. **Currently test placeholders** (e.g. `price_1QTestCEOPod456`); replace with live Price IDs for production. |
| **Checkout API** | `apps/web/app/api/stripe/checkout/route.ts` | POST with `productId` → creates Stripe Checkout session; `success_url` and `cancel_url` use `NEXT_PUBLIC_URL`. |
| **Success page** | `apps/web/app/success/page.tsx` | After payment, user is redirected here; page calls `/api/downloads?session_id=...` to get download links. |
| **Downloads API** | `apps/web/app/api/downloads/route.ts` | Validates Stripe session (paid), reads `productId` from session metadata, returns `getDownloadLinks(productId)`. |
| **Physical ZIP/PDF files** | `apps/web/public/downloads/` | All instant-download files: `playbook.pdf`, `ceo-pod.zip`, `marketing-pod.zip`, etc. These are **built**, not hand-edited (see below). |

### Product package sources (what gets zipped)

| Product | Package source (folder that gets zipped) | Build script |
|---------|------------------------------------------|--------------|
| CEO Pod | `packages/agent-configs/products/ceo-pod/CEO-Pod-Complete/` | `scripts/generate-product-zips.ts` → `ceo-pod.zip` |
| Marketing Pod | `packages/agent-configs/products/marketing-pod/Marketing-Pod-Complete/` | → `marketing-pod.zip` |
| Technical Pod | `packages/agent-configs/products/technical-pod/Technical-Pod-Complete/` | → `technical-pod.zip` |
| Operations Pod | `packages/agent-configs/products/operations-pod/Operations-Pod-Complete/` | → `operations-pod.zip` |
| Governance Booster | `packages/agent-configs/products/governance-booster/Governance-Booster-Complete/` | → `governance-booster.zip` |
| Growth Engine | `packages/agent-configs/products/growth-engine/Growth-Engine-Complete/` | → `growth-engine.zip` |
| Pod Orchestrator (Pod OS) | `packages/agent-configs/products/pod-orchestrator/Pod-Orchestrator-Complete/` | → `pod-os.zip` |

- **Other ZIPs** (e.g. full-pod-bundle, growth-suite) are built from `packages/agent-configs/personas/` and `skills/` (see `PRODUCT_SOURCES` in `scripts/generate-product-zips.ts`).
- **Run from repo root:** `npx tsx scripts/generate-product-zips.ts` → writes all ZIPs into `apps/web/public/downloads/`.

### Playbook (PDF)

| What | Location | Purpose |
|------|----------|---------|
| **Playbook source (Markdown)** | `content/playbook/playbook.md` | Master copy used by the PDF export script. **Also kept in sync with** `docs/playbook.mdx` (same content). Run `npx tsx scripts/export-pdf.ts` to build the PDF. |
| **Playbook figures** | `content/playbook/figures/` | Diagram images (e.g. `figure-1-three-component-merge.png`, `apexorca-logo.png`). Required filenames are in `content/playbook/README.md`. If the playbook Markdown references images, add the PNGs here so the PDF renders them. |
| **Playbook README** | `content/playbook/README.md` | Instructions and list of required figure filenames. |
| **PDF export script** | `scripts/export-pdf.ts` | Reads `content/playbook/playbook.md`, uses `content/playbook/figures/`, outputs `apps/web/public/downloads/playbook.pdf`. |
| **Playbook page (marketing)** | `apps/web/app/playbook/page.tsx` | Marketing page for the playbook product; download is `getDownloadLinks("playbook")` → `/downloads/playbook.pdf`. |

**Summary:** The **playbook text** lives in `content/playbook/playbook.md` (and `docs/playbook.mdx`). The **PDF** is built by `scripts/export-pdf.ts` and served from `apps/web/public/downloads/playbook.pdf`. Add any diagram PNGs to `content/playbook/figures/` if your playbook references them.

---

## 2. Agent personas (ApexORCA agents)

| What | Location | Purpose |
|------|----------|---------|
| **Apex (CEO)** | `packages/agent-configs/personas/apex/` | IDENTITY, SOUL, MEMORY, HEARTBEAT, RHYTHMS, SAFETY, TOOLS, PHASES, OVERNIGHT_PRODUCT_BUILD_PROTOCOL, etc. |
| **Echo (Marketing)** | `packages/agent-configs/personas/echo/` | Same structure. |
| **Oreo (Technical)** | `packages/agent-configs/personas/oreo/` | Same structure. |
| **Fin (Operations)** | `packages/agent-configs/personas/fin/` | Same structure. |
| **Sonar (Growth/Distribution)** | `packages/agent-configs/personas/sonar/` | Same structure + X_POSTING_PROTOCOL. |
| **Moby (Governance)** | `packages/agent-configs/personas/moby/` | Same structure. |
| **Shared protocols** | `packages/agent-configs/shared/` | REVERSIBILITY_TIERS, DAILY_REPORT_FORMAT, VETO_PROTOCOL, ECHO_SONAR_BOUNDARY, EMAIL_PROTOCOL, etc. |

The **downloadable product packages** (e.g. CEO Pod, Marketing Pod) are **neutralized copies** under `packages/agent-configs/products/<product>/` (e.g. CEO-Lead, Marketing-Lead) and are what customers install; the `personas/` folder is the internal ApexORCA reference (Apex, Echo, etc.).

---

## 3. ApexORCA.io domain — what’s already there and what you must do

### Already using ApexORCA / apexorca.io in code

- **Copyright / branding:** "© 2026 ApexORCA.io" (or "ApexORCA.io") appears in: product LICENSE/MANIFEST files, `lib/products.ts`, `lib/downloads.ts`, `lib/compliance.ts`, `footer.tsx`, `layout.tsx` (title, OpenGraph), `sitemap.xml`, `robots.txt`, and many docs/scripts.
- **Sitemap:** `apps/web/public/sitemap.xml` uses `https://apexorca.io/` for home, `/playbook`, `/marketplace`, `/dashboard`.
- **Robots:** `apps/web/public/robots.txt` allows `/` and disallows `/api/`; no domain in file (correct).
- **Compliance / legal:** `apps/web/lib/compliance.ts` sets `operator: "ApexORCA.io"` and jurisdiction (Toronto, Canada).
- **Layout metadata:** `apps/web/app/layout.tsx` now uses `metadataBase: new URL(baseUrl)` with `baseUrl = process.env.NEXT_PUBLIC_URL || "https://apexorca.io"`, so OpenGraph and canonical resolve to your live domain when deployed.

### What you must set for the live domain (no code change required if you use env)

1. **Environment variable (production)**  
   In your production host (Vercel, etc.), set:
   - `NEXT_PUBLIC_URL=https://apexorca.io`  
   This drives:
   - Stripe Checkout `success_url` and `cancel_url` (redirect back to ApexORCA.io after payment).
   - `metadataBase` so links and OG tags use `https://apexorca.io`.

2. **Domain purchase / DNS**  
   You said you have to pay for the domain. You do **not** need to give the codebase any “domain purchase” info. You need to:
   - Register **apexorca.io** (and optionally www.apexorca.io) with your registrar.
   - Point the domain to your hosting (e.g. Vercel: add apexorca.io in Project → Settings → Domains and follow their DNS instructions).

3. **Stripe (production)**  
   - Create **live** Price IDs in Stripe for each product and replace the test placeholders in `apps/web/lib/stripe.ts` (see Gaps below).
   - In Stripe Dashboard → Developers → Webhooks, set the webhook endpoint to `https://apexorca.io/api/stripe/webhook` and use the **live** signing secret in `STRIPE_WEBHOOK_SECRET`.

4. **Optional:** If you use a different production URL (e.g. www.apexorca.io), set `NEXT_PUBLIC_URL` to that instead; the code does not hardcode apexorca.io in redirect URLs.

---

## 4. Gaps and errors that must be fixed

### Critical (site/product functionality)

| Issue | Where | What to do |
|-------|--------|------------|
| **Playbook PDF source** | `content/playbook/playbook.md` | **Fixed.** The playbook content from `docs/playbook.mdx` is now in `content/playbook/playbook.md`, so `npx tsx scripts/export-pdf.ts` can build `playbook.pdf`. |
| **Playbook figures** | `content/playbook/figures/` | If your playbook Markdown references images (e.g. `![](figures/figure-1-three-component-merge.png)`), add those PNGs here with the names in `content/playbook/README.md`. If you have the images elsewhere (another folder or machine), copy them into `content/playbook/figures/`. |
| **Stripe Price IDs (see “Stripe” section below)** | `apps/web/lib/stripe.ts` | For **production** you must replace the placeholder Price IDs with your **live** Stripe Price IDs. See section below. |

### Production checklist (domain + env)

- [ ] Domain **apexorca.io** registered and DNS pointed to your host.
- [ ] Production env: `NEXT_PUBLIC_URL=https://apexorca.io` (or your canonical URL).
- [ ] Production env: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` set for production.
- [ ] Stripe webhook endpoint set to `https://apexorca.io/api/stripe/webhook` (live mode) and webhook secret in env.
- [ ] Run `npx tsx scripts/generate-product-zips.ts` and (after adding playbook.md + figures) `npx tsx scripts/export-pdf.ts` so `apps/web/public/downloads/` contains all ZIPs and `playbook.pdf`.

### Optional / nice-to-have

- **Canonical URL:** Layout now has `metadataBase`; if you want an explicit canonical on every page, you can add `alternates: { canonical: baseUrl }` (or per-page canonical) in metadata.
- **Supabase:** Ensure `purchases` table exists in production (see `infra/supabase-schema.sql` and `infra/apply-schema.sh`).

---

## 5. Stripe: what “test IDs” means and how to go live

**What’s in the code today**  
In `apps/web/lib/stripe.ts` there is a `priceMap` that maps each product (e.g. `ceo-pod`, `playbook`) to a **Stripe Price ID**. Right now those IDs are **placeholder test values** (e.g. `price_1QTestCEOPod456`). They are not real IDs from your Stripe account.

**What that means**  
- **Test mode:** In Stripe Dashboard you can create **test** products and prices (test mode). If you create a test price and put its real ID (e.g. `price_abc123...`) in `priceMap`, checkout will work in test mode: no real money, test cards only.  
- **Live mode:** When you want real payments on ApexORCA.io, you create **live** products and prices in Stripe (live mode) and put those **live** Price IDs in `priceMap`. You also use your **live** Stripe secret key and **live** webhook secret in production env.

**What you need to do for production**  
1. In Stripe Dashboard, switch to **Live** mode.  
2. For each product (playbook, ceo-pod, marketing-pod, technical-pod, operations-pod, governance-booster, x-growth, sentry-pro, aeo-booster, growth-engine, pod-os, and the bundles), create a **Product** and a **Price** (one-time, correct amount in dollars).  
3. Copy each **Price ID** (it looks like `price_1ABC...` or similar).  
4. In `apps/web/lib/stripe.ts`, replace the placeholder value for that product with your real Price ID.  
5. In production, set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` to your **live** keys, and set your Stripe webhook endpoint to `https://apexorca.io/api/stripe/webhook` (live).

No code logic change is required—only replacing the placeholder IDs with your real Stripe Price IDs and using live keys in production.

---

## 6. Quick reference — file map

```
ApexORCA Code Base/
├── apps/web/
│   ├── app/
│   │   ├── layout.tsx              # Site metadata, metadataBase (ApexORCA.io)
│   │   ├── page.tsx                # Home
│   │   ├── marketplace/            # Marketplace list + [slug] product pages
│   │   ├── success/page.tsx        # Post-purchase download links
│   │   ├── playbook/page.tsx       # Playbook marketing page
│   │   ├── dashboard/page.tsx      # Dashboard
│   │   └── api/
│   │       ├── downloads/route.ts  # GET ?session_id= → productId + links
│   │       ├── stripe/checkout/route.ts
│   │       └── stripe/webhook/route.ts
│   ├── lib/
│   │   ├── products.ts             # All product definitions (name, price, copy)
│   │   ├── downloads.ts            # productId → download links
│   │   ├── stripe.ts               # Stripe client + priceMap + createCheckoutSession
│   │   └── compliance.ts           # ApexORCA.io operator, data processing
│   ├── public/
│   │   ├── downloads/               # playbook.pdf, ceo-pod.zip, etc. (built)
│   │   ├── sitemap.xml             # https://apexorca.io/...
│   │   └── robots.txt
│   └── .env                        # NEXT_PUBLIC_URL, STRIPE_*, SUPABASE_*
├── content/playbook/
│   ├── README.md                   # Instructions
│   ├── playbook.md                 # Master playbook (source for PDF; intro, TOC, figures)
│   └── figures/                    # Add 9 PNGs here (names in README) for PDF
├── packages/agent-configs/
│   ├── personas/                   # apex, echo, oreo, fin, sonar, moby
│   ├── shared/                     # Shared protocols
│   ├── products/                   # One folder per product (ceo-pod, marketing-pod, ...)
│   │   └── <product>/<Product>-Complete/  # What gets zipped
│   └── skills/                     # x-growth, governance-booster, etc.
├── scripts/
│   ├── generate-product-zips.ts    # Build all ZIPs → apps/web/public/downloads/
│   └── export-pdf.ts               # Build playbook.pdf from content/playbook/
├── env.example                     # NEXT_PUBLIC_URL=https://apexorca.io, etc.
└── docs/
    └── FORENSIC_REVIEW_AND_DOMAIN_GUIDE.md  # This file
```

---

## 7. Summary

- **Products** are defined in `apps/web/lib/products.ts`; **download links** in `apps/web/lib/downloads.ts`; **ZIP contents** come from `packages/agent-configs/products/<product>/...` and are built by `scripts/generate-product-zips.ts` into `apps/web/public/downloads/`.
- **Playbook** source is `content/playbook/playbook.md` (intro, TOC, and all figure placements included); add PNGs to `content/playbook/figures/` per README; PDF is built by `scripts/export-pdf.ts` into `apps/web/public/downloads/playbook.pdf`.
- **ApexORCA.io** is already referenced in branding, sitemap, compliance, and layout; for production you set **NEXT_PUBLIC_URL=https://apexorca.io** and point the domain to your host. No “domain purchase” data is required inside the repo.
- **Must-fix for production:** Add figure PNGs to `content/playbook/figures/` if needed for PDF; replace Stripe test Price IDs with live IDs in `lib/stripe.ts`; set production env and Stripe webhook to live domain.
