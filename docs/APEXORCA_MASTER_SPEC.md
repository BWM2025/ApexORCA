# ApexORCA.io — Master Specification (Human-Readable)

**Version:** 1.0  
**Last updated:** 2026-02-24  
**Operator:** ApexORCA.io (Toronto, Ontario, Canada)  
**Offerings:** Global (digital products — ORCA personas and skills for OpenClaw)  
**Machine-readable companion:** `APEXORCA_MASTER_SPEC.json`

This document is the single master spec covering legal, compliance, security (including OpenClaw and this codebase), and scale/load. It is intended for humans and for tooling that consumes `APEXORCA_MASTER_SPEC.json`.

---

## Part 1 — Legal

### 1.1 Copyright

| Item | Status | Reference |
|------|--------|-----------|
| Ownership | ✅ | © 2026 ApexORCA.io. All rights reserved. Founder: B.W. Moore |
| Root LICENSE | ✅ | Proprietary; year and owner set |
| Footer | ✅ | Copyright + jurisdiction in `components/footer.tsx` |
| Year | ✅ | 2026 used consistently |

### 1.2 Trademark

| Item | Status | Notes |
|------|--------|--------|
| ApexORCA / ApexORCA.io | ⚠️ | Use consistently; consider ™ until registered |
| ORCA Governance DNA™ | ✅ | Used with ™ in competitor comparison |
| Third-party names | ✅ | FelixCraft.ai, OpenClaw, CrewAI, etc. — comparison only; no affiliation |

### 1.3 Disclaimers

| Item | Status | Notes |
|------|--------|--------|
| General | ✅ | Footer: not legal/tax/professional advice; digital products as-is |
| Jurisdiction | ✅ | Offered from Toronto, Canada |
| AI / automation | ⚠️ | Recommend in Terms: no guarantee of results; AI outputs not warranted |
| Limitation of liability | ❌ | Requires full Terms of Service |

### 1.4 Gaps

- **Terms of Service:** Missing. Add `/terms`; cover use, refunds, liability, governing law (Ontario/Canada).
- **Privacy Policy:** Missing. Add `/privacy`; align with `lib/compliance.ts` and COMPLIANCE_CHECKLIST.md.

---

## Part 2 — Compliance

### 2.1 Frameworks That Apply

| Framework | Applies | Notes |
|-----------|---------|--------|
| PIPEDA (Canada) | ✅ Yes | Primary; we collect email + purchase data |
| Ontario / provincial | ✅ Yes | Consumer protection, contract law |
| GDPR (EU/EEA) | ⚠️ If EU customers | Lawful basis, rights, notice |
| CCPA/CPRA (California) | ⚠️ If CA users | Disclosure and rights |
| PCI-DSS | ✅ Delegated | No card storage; Stripe is PCI-compliant |
| WCAG / accessibility | Optional | No legal requirement; best-efforts if desired |

### 2.2 Data Processing (Source of Truth: `apps/web/lib/compliance.ts`)

**Personal data we collect and store:**

- **Email:** From Stripe Checkout; stored in Supabase `purchases.user_email`. Purpose: fulfillment, support, legal.
- **Purchase records:** From Stripe webhook; stored in Supabase `purchases` (product_id, session_id, amount, purchased_at). Purpose: order history, support, legal/tax.

**We do NOT collect or store:**

- Payment card numbers (Stripe only).
- Passwords (no user accounts).
- Sensitive categories (health, biometrics) for processing.

**Third parties:** Stripe (payment), Supabase (database), hosting provider.

### 2.3 Current State in Code

| Item | Status |
|------|--------|
| Card data | ✅ Not stored |
| Data processing defined in code | ✅ `lib/compliance.ts` |
| Stripe webhook writes only PII above | ✅ |
| Privacy Policy page | ❌ Missing |
| Terms of Service page | ❌ Missing |
| Data retention (in code) | ❌ Not implemented |
| User rights (access/erasure) flow | ❌ Not implemented |

### 2.4 Gaps to Address

1. Add `/privacy` and link in footer; keep in sync with `lib/compliance.ts`.
2. Add `/terms` and link in footer.
3. Define retention in Privacy; optionally implement in Supabase.
4. Provide contact for access/erasure; document in Privacy.

---

## Part 3 — Security

### 3.1 OpenClaw (Third-Party Ecosystem)

ApexORCA sells **content** (personas and skills) for use with **OpenClaw**. We do **not** operate OpenClaw servers. Our codebase does not include or run OpenClaw.

**OpenClaw security crisis (early 2026):**

- **CVE-2026-25253 (CVSS 8.8):** One-click RCE via WebSocket hijacking; authentication token exfiltration via `gatewayUrl`. **Patched in OpenClaw v2026.1.29** (Jan 29, 2026). Mitigations: WebSocket origin validation; gateway URL confirmation modal; user must approve new gateways.
- **Other issues reported:** Credentials in plaintext; auth disabled by default; large number of internet-exposed instances; malicious skills on ClawHub (e.g. infostealers). Many issues are deployment/configuration (auth off, public exposure) rather than unpatched code.
- **Recommendation for customers:** (1) Use **OpenClaw v2026.1.29 or later**. (2) Enable authentication and do not expose gateway to the public internet unless necessary and hardened. (3) Only install skills from trusted sources; our products are delivered as files for known personas/skills. (4) Rotate gateway and API keys after any suspected compromise.

**ApexORCA exposure:**

- **We are not liable for OpenClaw’s code or deployment.** Our docs and playbook already recommend governance and security (e.g. `docs/playbook.mdx` Ch. 5, `packages/agent-configs/skills/governance-booster/SECURITY.md`). Consider adding a short “OpenClaw security” note in docs or FAQ: recommend patched version and secure deployment.

### 3.2 ApexORCA Codebase Security

| Control | Status | Notes |
|--------|--------|--------|
| Stripe webhook | ✅ | Signature verified with `STRIPE_WEBHOOK_SECRET`; no insert without valid event |
| Purchase recording | ✅ | Only source of truth is Stripe webhook; legacy `/api/purchases` removed (was unauthenticated) |
| Checkout | ✅ | `productId` validated against catalog (`getProduct`); only valid products create sessions |
| Dashboard API | ⚠️ | `GET /api/dashboard/stats` is unauthenticated; returns revenue and recent purchase summary. Intentional if “transparency” is desired; otherwise protect (e.g. auth or remove) |
| Monitor API | ⚠️ | `GET /api/monitor` returns static mock; no sensitive data |
| Secrets | ✅ | No secrets in repo; `STRIPE_*`, `SUPABASE_*`, `NEXT_PUBLIC_*` via env |
| Input validation | ✅ | Checkout: productId type and allowlist; webhook: uses Stripe payload only |
| PII in logs | ⚠️ | Webhook logs productId and sessionId (not email); avoid logging full email in production |

**Risks addressed:**

- **Forged purchases:** Removed unauthenticated `POST /api/purchases`; only webhook can write to `purchases`.
- **Invalid checkout:** Checkout validates `productId` against product catalog before creating Stripe session.

**Recommendations:**

- If dashboard is not meant to be public, add authentication or restrict by IP/env.
- Ensure production env has `STRIPE_WEBHOOK_SECRET` set and that webhook endpoint is the one registered in Stripe.
- Consider rate limiting on checkout and webhook (e.g. at edge or in Stripe).

---

## Part 4 — Scale and Load

### 4.1 Architecture

- **Frontend / API:** Next.js (App Router); typically deployed on Vercel (serverless).
- **Payments:** Stripe (Checkout + webhooks). Stripe handles high throughput.
- **Data:** Supabase (PostgreSQL). Purchases table is append-heavy, read-moderate (dashboard).

### 4.2 Expected Limits (Typical Deployment)

| Layer | Limit / behavior | Notes |
|-------|-------------------|--------|
| Vercel (Pro/Hobby) | Up to 30k concurrent executions; burst ~1k/10s/region | 503 if burst exceeded |
| Vercel (Enterprise) | 100k+ concurrent | Plan-dependent |
| Supabase (free tier) | Limited connections, row limits | Upgrade for production |
| Supabase (Pro) | Higher connections, more storage | Sufficient for moderate volume |
| Stripe | High; Checkout and webhooks scale with Stripe’s infra | Not the bottleneck |

### 4.3 Flow Volume (Rough Guidance)

- **Page views / marketing:** Static and server-rendered; can handle high traffic. Edge caching and CDN (Vercel) apply.
- **Checkout:** One serverless invocation per “Create checkout” click. Even hundreds of concurrent checkouts per minute is well within typical limits.
- **Webhooks:** One invocation per successful payment. Volume is proportional to sales (e.g. 10–1000/day is trivial).
- **Dashboard:** One GET per dashboard load; low frequency (internal use).

**Conclusion:** The stack can handle **moderate to high load** for a digital-product business (thousands of page views per day, hundreds of purchases per day) without architectural change. For very high volume (e.g. tens of thousands of purchases per day), ensure Supabase plan and connection pooling are adequate and consider rate limiting and monitoring.

### 4.4 Bottlenecks to Watch

- **Supabase connections:** Serverless can create many short-lived connections; use connection pooling (e.g. Supabase pooler) if you see connection limits.
- **Stripe webhook idempotency:** Webhook handler is idempotent per session (insert by session_id); duplicate events do not create duplicate rows if you add a unique constraint on `session_id` (recommended).
- **Dashboard latency:** If `purchases` grows very large, keep using `order('purchased_at', { ascending: false }).limit(5)` and indexed `purchased_at`; add pagination if you ever show more.

---

## Part 5 — Document References

| Document | Purpose |
|----------|---------|
| `docs/LEGAL_CHECKLIST.md` | Detailed legal checklist |
| `docs/COMPLIANCE_CHECKLIST.md` | Detailed compliance checklist |
| `docs/OPENCLAW_SECURITY_NOTE.md` | OpenClaw security note for customers |
| `apps/web/lib/compliance.ts` | Data processing (code) |
| `APEXORCA_MASTER_SPEC.json` | Machine-readable version of this spec |
| `APEXORCA_v1_Launch_Spec.md` | Product and UX launch spec |

---

**End of Master Spec (human-readable).**
