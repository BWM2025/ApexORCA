# Production Setup — What You Need to Provide

**ApexORCA.io — © 2026. Founder: B.W. Moore**

This document lists everything **you** must provide so the site and integrations work in production. Use it as a checklist. If anything is missing, we can wire it once you supply the values.

---

## 1. Stripe (Payments) — Required for Live Sales

The app uses Stripe for checkout and records purchases in Supabase. For **production** you must provide the following.

### 1.1 From Stripe Dashboard (Live mode)

| What | Where in code | What you provide |
|------|----------------|-------------------|
| **Secret key** | `STRIPE_SECRET_KEY` (env) | Live secret key: `sk_live_...` |
| **Webhook signing secret** | `STRIPE_WEBHOOK_SECRET` (env) | From Stripe → Developers → Webhooks. Create endpoint URL: `https://apexorca.io/api/stripe/webhook`, event: `checkout.session.completed`, then copy the **Signing secret** (`whsec_...`). |
| **Price ID for each product** | `apps/web/lib/stripe.ts` → `priceMap` | Create one **Product** per row below, add a one-time **Price** in the correct amount, then paste each **Price ID** (`price_1...`) into `priceMap`. |

### 1.2 Products and prices to create in Stripe (Live)

**7 products + playbook = 8 items.** Create a **Product** (name as below) and one **Price** (one-time, amount in dollars). Then put each Price ID into `priceMap` in `apps/web/lib/stripe.ts`:

| Product slug | Product name (suggestion) | Amount | Replace in priceMap |
|--------------|---------------------------|--------|---------------------|
| playbook | ORCA Governance Playbook | $39 | playbook |
| ceo-pod | CEO Pod Full Package | $129 | ceo-pod |
| marketing-pod | Marketing Pod Full Package | $59 | marketing-pod |
| technical-pod | Technical Pod Full Package | $79 | technical-pod |
| operations-pod | Operations Pod Full Package | $99 | operations-pod |
| governance-booster | Governance Booster Full Package | $49 | governance-booster |
| growth-engine | Growth Engine Full Package | $19 | growth-engine |
| pod-os | Pod Orchestrator Full Package | $29 | pod-os |

**What I need from you:**  
- Confirm when you have created the live Products and Prices.  
- Send the **live Price IDs** (one per row above), or paste them into `priceMap` yourself and tell me when done.  
- Confirm you have set **STRIPE_SECRET_KEY** and **STRIPE_WEBHOOK_SECRET** in your production environment (e.g. Vercel/host env vars). Do **not** send the actual secret values; just confirm they are set.

---

## 2. Emails (ApexORCA.io)

### 2.1 Current state

- **Purchase fulfillment:** After payment, the customer sees download links on the **success page** (`/success?session_id=...`). The app **does not** currently send download links by email. The success page can say “Download links will be sent to your email” only if we add email sending (see below).
- **Contact / support:** There is no contact form or “email us” implementation in the repo. Any support email address would be for the footer, Privacy page, or legal.

### 2.2 If you want transactional email (e.g. “Download links sent to your email”)

To send purchase confirmation + download links by email we would:

- Use an email provider (e.g. **Resend** or **SendGrid**).
- Send one email when Stripe webhook fires `checkout.session.completed`, to the customer’s email from Stripe, with the same links shown on the success page.

**What you would need to provide:**

| Item | Purpose |
|------|--------|
| **Email provider** | Resend (resend.com) or SendGrid (or another). Resend is referenced in the agent configs (EMAIL_PROTOCOL). |
| **API key** | From the provider (e.g. Resend API key). To be set as env var (e.g. `RESEND_API_KEY`), not committed to the repo. |
| **Sending domain** | Domain used for “From” (e.g. `noreply@apexorca.io` or `downloads@apexorca.io`). You must verify the domain in the provider and set DNS as they require (SPF, DKIM, etc.). |
| **From address** | Exact “From” address (e.g. `ApexORCA <noreply@apexorca.io>`). |

**What I need from you (if you want this):**  
- Confirm you want transactional email for purchase fulfillment.  
- Tell me which provider (Resend preferred) and confirm you have or will create an account and verify `apexorca.io` (or your chosen subdomain).  
- Provide the **From** address you want. I will document the env var name; you add the API key in production only.

### 2.3 Marketing / newsletter

There is **no** newsletter or marketing-email signup or sending in the repo. If you want that later, we’d add a list provider (e.g. Resend audiences, Mailchimp, etc.) and you’d provide the same kind of info: API key, sending domain, From address.

---

## 3. X (Twitter), LinkedIn, and Other Accounts

### 3.1 ApexORCA **website** (this repo)

The **marketing site** (Next.js app) does **not** use X or LinkedIn API keys. It does not post to X or LinkedIn or log in with them. So for the **site** itself you do **not** need to provide X or LinkedIn credentials.

### 3.2 Where X / LinkedIn *are* used

- **Agent personas and playbook:** The playbook and product copy refer to “X posting,” “email,” “distribution,” etc. Those are used by the **OpenClaw pod** (Echo, Sonar, etc.) when customers run the agents on their own infrastructure.
- **EMAIL_PROTOCOL.md / X_POSTING_PROTOCOL.md:** These describe how the **customer’s** pod sends email (Resend/SendGrid) and posts to X. The customer supplies their own X API keys, Resend/SendGrid keys, etc., when they configure OpenClaw.
- **Your own accounts:** If **you** (ApexORCA.io) want to post to X or LinkedIn for marketing, that is outside this codebase — you’d use X’s or LinkedIn’s own tools or a separate tool (e.g. Buffer). No account credentials for **your** X or LinkedIn need to go into this repo unless we add a feature that posts on your behalf (not currently implemented).

**What I need from you:**  
- Nothing for X/LinkedIn for the **website** to function.  
- If you later want the **site** to display your X feed, or “Share on X/LinkedIn” buttons, we can add that; you’d only need the public profile URLs (or, for embedded feed, any required app keys per X/LinkedIn docs).

---

## 4. Supabase (Purchase storage)

The Stripe webhook writes to Supabase table `purchases` (see `infra/supabase-schema.sql`). The app reads from it for dashboard/stats (if used).

**What you need to provide (already required for production):**

| Env var | Purpose |
|---------|---------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-only; never expose in client) |

**What I need from you:**  
- Confirm these are set in production. Do **not** send the actual values.

---

## 5. Domain and public URL

| Env var | Purpose |
|---------|---------|
| `NEXT_PUBLIC_URL` | Full public URL of the site, e.g. `https://apexorca.io` |

Used for Stripe success/cancel URLs and Open Graph. Set this in production to your live domain.

---

## 6. Optional: Contact / support email

If you want a contact email on the site (footer, Privacy, “Contact us”):

- Provide the address (e.g. `support@apexorca.io` or `hello@apexorca.io`).
- We can add it to the footer and/or a simple “Contact” section. No backend needed unless you want a contact form (then we’d need email sending as in §2).

---

## 7. Summary checklist

- [ ] **Stripe:** Live secret key and webhook secret in env; webhook endpoint `https://apexorca.io/api/stripe/webhook`; all 8 Price IDs (7 products + playbook) created and set in `priceMap`.
- [ ] **Supabase:** `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` set in production.
- [ ] **URL:** `NEXT_PUBLIC_URL=https://apexorca.io` (or your canonical URL) in production.
- [ ] **Emails (optional):** If you want purchase emails, provide provider (Resend/SendGrid), From address, and confirm domain verification; I’ll wire the rest and document the env var.
- [ ] **X / LinkedIn:** Not required for the website; only if we add a specific feature later.
- [ ] **Contact email (optional):** Provide the address and where to show it (footer, Privacy, etc.).

Once you provide the Stripe Price IDs (and optionally email/contact details), the site can be fully operational for production on apexorca.io.
