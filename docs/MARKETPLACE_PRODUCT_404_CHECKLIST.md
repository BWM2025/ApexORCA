# Marketplace Product 404 Checklist — Every Product, Every Function

Use this to **test and correct** product/sales 404 issues. Every marketplace product must pass all checks below.

**The 8 products (single source of truth: `getAllProductSlugs()` in `lib/products.ts`):**

`playbook` | `ceo-pod` | `marketing-pod` | `technical-pod` | `operations-pod` | `governance-booster` | `growth-engine` | `pod-os`

---

## 1. Product page (no 404 when opening a product)

| Check | Where | What to verify |
|-------|--------|----------------|
| Slug in products | `apps/web/lib/products.ts` | Each product has a key in `products` and is listed in `getAllProductSlugs()`. |
| Dynamic route | `apps/web/app/marketplace/[slug]/page.tsx` | Uses `getProduct(slug)`; calls `notFound()` only when product is missing. |

**Per-product test:** For each slug, open `https://apexorca.io/marketplace/<slug>`. Page must render (not 404).  
Example: `/marketplace/playbook`, `/marketplace/ceo-pod`, `/marketplace/pod-os`, etc.

---

## 2. Checkout (no 404 / no “Invalid product” / no Stripe error)

| Check | Where | What to verify |
|-------|--------|----------------|
| Slug in priceMap | `apps/web/lib/stripe.ts` | Every slug from `getAllProductSlugs()` has an entry in `priceMap` (Stripe Price ID). |
| Checkout API | `apps/web/app/api/stripe/checkout/route.ts` | Validates `productId` with `getProduct(productId)`; creates session only for valid products. |
| createCheckoutSession | `apps/web/lib/stripe.ts` | Throws if `priceMap[productId]` is missing (so no undefined price sent to Stripe). |

**Per-product test:** On each product page, click “Buy Now — Instant Download”. Must redirect to Stripe (no 404, no “Invalid product”, no “No Stripe Price ID” alert).

---

## 3. Success page and download links (no 404 after payment)

| Check | Where | What to verify |
|-------|--------|----------------|
| Slug in productDownloads | `apps/web/lib/downloads.ts` | Every product slug has a `productDownloads[slug]` array with `label` and `href`. |
| href paths | `apps/web/lib/downloads.ts` | `href` values match files that exist in `apps/web/public/downloads/` (e.g. `/downloads/playbook.pdf`, `/downloads/ceo-pod.zip`). |
| Downloads API | `apps/web/app/api/downloads/route.ts` | Uses `session.metadata.productId` and `getDownloadLinks(productId)`; returns 400 if no productId or no links. |
| Success client | `apps/web/app/success/SuccessClient.tsx` | Fetches `/api/downloads?session_id=...` and renders links; if `links.length === 0` shows “contact support” (no 404 from API). |

**Per-product test:** After a test purchase, success page must show at least one download link. Clicking each link must return the file (not 404).  
**Build required:** Run `npx tsx scripts/export-pdf.ts` (playbook.pdf) and `npx tsx scripts/generate-product-zips.ts` (all 7 ZIPs) so `apps/web/public/downloads/` contains:

- `playbook.pdf`
- `ceo-pod.zip`, `marketing-pod.zip`, `technical-pod.zip`, `operations-pod.zip`
- `governance-booster.zip`, `growth-engine.zip`, `pod-os.zip`

---

## 4. ZIP generation script (slugs match)

| Check | Where | What to verify |
|-------|--------|----------------|
| PRODUCT_SOURCES | `scripts/generate-product-zips.ts` | Same 7 product slugs as in `getAllProductSlugs()` **except** `playbook` (PDF only). So: ceo-pod, marketing-pod, technical-pod, operations-pod, governance-booster, growth-engine, pod-os. |
| Output filenames | Script output | ZIPs named `ceo-pod.zip`, `marketing-pod.zip`, … `pod-os.zip` to match `productDownloads[slug].href` (e.g. `/downloads/ceo-pod.zip`). |

---

## 5. Quick verification (run in repo root)

```bash
cd "ApexORCA Code Base"
npx tsx scripts/verify-marketplace-slugs.ts
```

Script checks that every slug from `getAllProductSlugs()` exists in `products`, `priceMap`, and `productDownloads`. Exit code 1 if any are missing. (Use a Node that works on your OS, e.g. nvm Node 18.)

Or manually:

1. **Slugs:** `lib/products.ts` → `getAllProductSlugs()` returns exactly 8 slugs.
2. **Stripe:** `lib/stripe.ts` → `priceMap` has all 8 keys; no `console.warn` for missing Price IDs at build.
3. **Downloads:** `lib/downloads.ts` → `productDownloads` has all 8 keys; each `href` is like `/downloads/<slug>.pdf` or `/downloads/<slug>.zip`.
4. **Files on disk:** `apps/web/public/downloads/playbook.pdf` and `apps/web/public/downloads/<slug>.zip` for the 7 ZIP products exist after running the two build scripts.

---

## Summary table (per product)

| Slug | products.ts | priceMap | productDownloads | File in public/downloads/ |
|------|-------------|----------|-------------------|----------------------------|
| playbook | ✓ | ✓ | ✓ → playbook.pdf | playbook.pdf (export-pdf.ts) |
| ceo-pod | ✓ | ✓ | ✓ → ceo-pod.zip | ceo-pod.zip (generate-product-zips) |
| marketing-pod | ✓ | ✓ | ✓ → marketing-pod.zip | marketing-pod.zip |
| technical-pod | ✓ | ✓ | ✓ → technical-pod.zip | technical-pod.zip |
| operations-pod | ✓ | ✓ | ✓ → operations-pod.zip | operations-pod.zip |
| governance-booster | ✓ | ✓ | ✓ → governance-booster.zip | governance-booster.zip |
| growth-engine | ✓ | ✓ | ✓ → growth-engine.zip | growth-engine.zip |
| pod-os | ✓ | ✓ | ✓ → pod-os.zip | pod-os.zip |

If any cell is missing, that product can 404 (product page, checkout, or download link). Fix the source file and redeploy; for “File in public/downloads”, run the build scripts and redeploy.
