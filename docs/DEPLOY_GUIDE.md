# Deploy to production (apexorca.io)

Deploy to the **real domain**, not localhost. All production traffic must use **https://apexorca.io**.

---

## 1. Set production env in Vercel

In **Vercel** → your project → **Settings** → **Environment Variables**, set these for **Production** (and Preview if you want):

| Variable | Production value | Required |
|----------|------------------|----------|
| **NEXT_PUBLIC_URL** | **https://apexorca.io** | Yes — must be the real domain |
| STRIPE_SECRET_KEY | Your live or test key | Yes for checkout |
| STRIPE_WEBHOOK_SECRET | From Stripe Dashboard (webhook for apexorca.io) | Yes for webhooks |
| STRIPE_PUBLISHABLE_KEY | pk_live_... or pk_test_... | Yes for client checkout |
| SUPABASE_URL | Your Supabase project URL | Yes for orders/dashboard |
| SUPABASE_SERVICE_ROLE_KEY | Your Supabase service role key | Yes |

**Critical:** `NEXT_PUBLIC_URL` must be **https://apexorca.io** in production. No `http://localhost:3000` — that is for local dev only.

---

## 2. Deploy to production

**Option A — Git (recommended)**  
Push to the branch Vercel uses for production (usually `main`):

```bash
cd "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"
git add -A && git commit -m "Deploy to production" && git push origin main
```

Vercel will build and deploy. The live site will be at **https://apexorca.io** (once the domain is connected in Vercel).

**Option B — Vercel CLI**  
From the repo root (or `apps/web` if your vercel.json is there):

```bash
cd "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"
vercel --prod
```

Use the project that has **apexorca.io** as the production domain.

---

## 3. Confirm production URL

- After deploy, open **https://apexorca.io** (not localhost:3000).
- Playbook, marketplace, and Stripe checkout must use the real domain so success/cancel redirects and webhooks work.

---

## Local vs production

| Environment | NEXT_PUBLIC_URL | Use |
|--------------|------------------|-----|
| **Local** | `http://localhost:3000` or unset (defaults to localhost) | Development only |
| **Production (Vercel)** | **https://apexorca.io** | Real domain — set in Vercel env and deploy |

Full env list: **CREDENTIALS_AND_ENV.md** (repo root).
