# Stripe Products ↔ Codebase Alignment

Single source of truth for matching Stripe Product catalog to the website marketplace and `priceMap`. **Keep Stripe product names and prices identical to this table.**

## Canonical 8 products (Stripe ↔ codebase)

| Stripe product name (exact) | Codebase slug | Price (USD) | Category on site |
|-----------------------------|---------------|-------------|------------------|
| (Playbook — use same product name as in Stripe) | `playbook` | $39 | Skills & Boosters |
| CEO Pod Full Package | `ceo-pod` | $129 | Personas (Full Pods) |
| Marketing Pod Full Package | `marketing-pod` | $59 | Personas (Full Pods) |
| Technical Pod Full Package | `technical-pod` | $79 | Personas (Full Pods) |
| COO Operations Pod Full Package | `operations-pod` | $99 | Personas (Full Pods) |
| Governance Booster Full Package | `governance-booster` | $49 | Skills & Boosters |
| Growth Engine Full Package | `growth-engine` | $19 | Skills & Boosters |
| Pod Orchestrator Full Package | `pod-os` | $29 | Skills & Boosters |

## Where it lives in code

- **Product definitions (name, price, copy):** `apps/web/lib/products.ts` — keys = slugs above; `price` must match the USD column.
- **Stripe Price IDs:** `apps/web/lib/stripe.ts` → `priceMap`. Keys = slugs. Use **test** Price IDs for test purchases (card 4242…); switch to **live** Price IDs for production.
- **Marketplace UI:** `apps/web/app/marketplace/page.tsx` + `persona-grid.tsx` (Personas) and `skill-grid.tsx` (Skills & Boosters). They use `getProductIdsByCategory()` from `products.ts` — no hardcoded product lists.
- **Slug list for dashboard/build:** `getAllProductSlugs()` in `products.ts` returns the 8 slugs above.

## Triple-check after changes

1. Stripe dashboard: 8 products, names and prices match the table.
2. `products.ts`: 8 entries; `price` and display names match.
3. `stripe.ts`: `priceMap` has all 8 slugs; test vs live IDs as intended.
4. Marketplace shows exactly 4 Personas + 4 Skills & Boosters; no extra products (e.g. no "Pipeline Security Booster" or "AEO Visibility Booster" — only these 8).
