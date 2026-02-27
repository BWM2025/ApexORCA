# Launch Accounts Reference — Where Everything Goes

**ApexORCA.io — © 2026. Founder: B.W. Moore**  
**Use this doc when adding launch setup info: what accounts exist, where secrets go, and whether AI agents need access.**

---

## Rule: Secrets never go in the codebase

- **API keys, passwords, webhook secrets, service-role keys:** Store only in **environment variables** (e.g. Vercel → Environment Variables) or a secure vault. Use **env.example** and **docs/PRODUCTION_SETUP_WHAT_YOU_PROVIDE.md** to document *which* variables are needed — never paste real values into the repo.
- **Registrant/contact details** (name, address, email, phone): Keep in your registrar/host only or in a private record. Do not commit into the repo.

---

## Domain: apexorca.io (Porkbun)

| What | Where it goes | In codebase? |
|------|----------------|--------------|
| **Domain name** | Used everywhere as **apexorca.io** (NEXT_PUBLIC_URL, links, docs). | Yes — already set across codebase and docs. |
| **Registrar / DNS** | Porkbun: nameservers, DNS records, DNSSEC, domain lock, auto-renew. | No — managed in Porkbun UI. Only *document* here that domain is at Porkbun and that DNS is pointed at Vercel (or your host). |
| **SSL** | Vercel provisions SSL automatically when you add apexorca.io to the project. No separate Porkbun SSL needed. | No — just note in checklist: “SSL via Vercel once domain is connected.” |

### Do AI agents need Porkbun access?

**No, for normal launch and operation.**  
- You (or a human) point DNS at Vercel once; the site and agents do not need to log into Porkbun.  
- **Only if** you later ask agents to *manage DNS programmatically* (e.g. add subdomains or change records via API) would they need **Porkbun API keys**. Those keys would go in **env vars** (e.g. `PORKBUN_API_KEY`, `PORKBUN_SECRET`) and must **never** be committed. For standard launch, leave API access as you prefer; agents do not need it.

---

## Other accounts — where secrets and info go

| Account | What the app needs | Where it goes | AI agents need access? |
|---------|---------------------|---------------|-------------------------|
| **Vercel** | Deploy; env vars (NEXT_PUBLIC_URL, Stripe, Supabase, etc.). | Env vars in Vercel project. GitHub link for deploy. | Only if they deploy; can use Vercel CLI or you deploy. |
| **Stripe** | Live secret key, webhook secret, 8 Price IDs. | Env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET. Price IDs in `apps/web/lib/stripe.ts` → priceMap. | No keys in repo. Read-only or dashboard access only if you want them to monitor. |
| **Supabase** | URL + service role key for purchases. | Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY. | No keys in repo. Read-only if you want them to verify purchases. |
| **Resend/SendGrid** (optional) | API key for transactional email. | Env: RESEND_API_KEY (or equivalent). | Only if they will manage email; key in env, not repo. |
| **Grok / xAI** (for OpenClaw) | API key for agents. | In OpenClaw config (not in this repo). | Per your choice; key never in repo. |

---

## Single checklist for “what to add when you have it”

When you receive or create credentials or account details:

1. **Domain (Porkbun):** Confirm apexorca.io DNS points to Vercel; no secrets to add.
2. **Vercel:** Add all env vars (NEXT_PUBLIC_URL, Stripe, Supabase, optional Resend). No secrets in repo.
3. **Stripe:** Create 8 Products/Prices in Live mode, webhook, then put Price IDs in `apps/web/lib/stripe.ts` → priceMap; put secret + webhook secret in Vercel env.
4. **Supabase:** Create project, apply `infra/supabase-schema.sql`, put URL + service role key in Vercel env.
5. **Optional email:** Add Resend/SendGrid key to Vercel env if you enable transactional email.

**Detail for each:** **docs/PRODUCTION_SETUP_WHAT_YOU_PROVIDE.md** and **docs/FINAL_LAUNCH_NEEDS_LIST.md**.

---

## Process: Keep manifest and all-in-one in sync

After **any** change that adds, renames, or removes files under **ApexORCA Code Base/**:

1. **Regenerate the all-in-one:**  
   From repo root: `python3 scripts/build-all-files-markdown.py`  
   → Updates **APEXORCA_ALL_FILES_IN_ONE.md** (at workspace root).

2. **Update the manifest/tree:**  
   Edit **APEXORCA_FULL_MANIFEST_AND_TREE.md** (at workspace root): add or remove the file in the directory tree and in the relevant manifest table; adjust file counts if needed.

This keeps the manifest tree and all-in-one aligned with the codebase.

---

*Reference: Stripe/product list and email setup → **docs/PRODUCTION_SETUP_WHAT_YOU_PROVIDE.md**. Full launch phases → **docs/FINAL_LAUNCH_NEEDS_LIST.md**.*
