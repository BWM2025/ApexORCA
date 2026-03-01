# Credentials and Environment Variables — Full Codebase Reference

**Purpose:** Single source of truth for every credential and env var used anywhere in the repo. **Agents and humans:** use this doc to see what is required, where it is used, and where to set it. All credentials are accessible when the correct env files are loaded and the workspace includes this repo.

---

## How agents get access to credentials

- **OpenClaw pod / gateway:** Credentials are loaded from **`openclaw.env`** at the **repo root** (same folder as `apps/`, `docs/`, `scripts/`). The script `scripts/start-openclaw-gateway-with-env.sh` sources `openclaw.env` before starting the gateway, so the pod has access to all vars listed there. **Ensure:** (1) `openclaw.env` exists (copy from `scripts/openclaw.env.example`, fill values), (2) workspace points to this codebase so scripts and docs are visible, (3) gateway is started with that script so env is in scope.
- **Next.js app (apps/web):** Credentials come from **`apps/web/.env`** (and optionally `apps/web/.env.local`). For production, set the same vars in **Vercel** → Project → Settings → Environment Variables. Copy variable names from **`env.example`** (repo root) into `apps/web/.env` or Vercel; never commit real values.
- **Scripts run manually or by exec:** When running `scripts/send_email_resend.ts`, `scripts/post_tweet_env.sh`, or similar, env must be in the shell. Either run from a shell that has already `source openclaw.env` (or equivalent), or pass vars inline. See **docs/TOOL_INVENTORY_AND_CAPABILITIES.md** for which tools need which vars.

---

## Full list of env vars (name, where used, where to set)

| Variable | Where used in codebase | Where to set | Required for |
|----------|------------------------|--------------|--------------|
| **NEXT_PUBLIC_URL** | `apps/web/lib/stripe.ts`, `apps/web/lib/email.ts`, `apps/web/app/layout.tsx` | `apps/web/.env` or Vercel | Checkout success/cancel URLs, email links |
| **STRIPE_SECRET_KEY** | `apps/web/lib/stripe.ts`, `infra/test-stripe-webhook.ts` | `apps/web/.env` or Vercel, or `openclaw.env` if scripts need it | Stripe checkout, webhook tests |
| **STRIPE_WEBHOOK_SECRET** | `apps/web/app/api/stripe/webhook/route.ts` | `apps/web/.env` or Vercel | Webhook signature verification |
| **STRIPE_PUBLISHABLE_KEY** | Client-side checkout (if used) | `apps/web/.env` or Vercel or `openclaw.env` | Optional for some flows |
| **SUPABASE_URL** | `apps/web/app/api/stripe/webhook/route.ts`, `apps/web/app/api/dashboard/stats/route.ts`, `infra/supabase-client.ts` | `apps/web/.env` or Vercel | DB for orders, dashboard stats |
| **SUPABASE_SERVICE_ROLE_KEY** | Same as above | `apps/web/.env` or Vercel | Service role for server-side DB |
| **TREASURY_ADDRESS** or **NEXT_PUBLIC_TREASURY_ADDRESS** | `apps/web/app/api/treasury/route.ts`, `apps/web/components/dashboard/treasury-card.tsx` | `apps/web/.env` or Vercel (optional) | Treasury API and dashboard card |
| **NEXT_PUBLIC_SENTRY_DSN** | `apps/web/instrumentation.ts`, `apps/web/sentry.client.config.ts` | `apps/web/.env.local` or Vercel (optional) | Sentry error reporting |
| **RESEND_API_KEY** | `apps/web/lib/email.ts`, `scripts/send_email_resend.ts`, `scripts/send_email_resend.js` | `openclaw.env` (for pod/exec), or `apps/web/.env` if web sends email | Sending email via Resend |
| **EMAIL_FROM** | Same as above | `openclaw.env` or `apps/web/.env` | From address for Resend |
| **EMAIL_TO**, **EMAIL_SUBJECT**, **EMAIL_BODY** | `scripts/send_email_resend.*` (cli args or env) | Env or command-line when calling script | One-off email script |
| **RESEND_ERROR_FILE** | `scripts/send_email_resend.*` | Optional env | Log errors to file |
| **TWITTER_API_KEY**, **TWITTER_API_SECRET**, **TWITTER_ACCESS_TOKEN**, **TWITTER_ACCESS_SECRET** | X posting scripts (e.g. `post_tweet_env.sh`), **docs/TOOL_INVENTORY_AND_CAPABILITIES.md** | `openclaw.env` (pod must have these for exec X posting) | Post to X via exec |
| **BRAVE_API_KEY** | OpenClaw web_search tool (config), **docs/TOOL_INVENTORY_AND_CAPABILITIES.md** | OpenClaw config (web section) or `openclaw.env` if gateway passes it | web_search tool |
| **GROK_API_KEY** | OpenClaw/LLM provider config | OpenClaw / LLM config or `openclaw.env` | LLM for agents |
| **VERCEL_TOKEN** | Deploy / automation | `openclaw.env` or deploy env | Vercel CLI / deploy |
| **PINECONE_API_KEY**, **PINECONE_ENV** | Optional RAG / vector | `openclaw.env` if used | Vector DB (if enabled) |
| **BRIGHT_DATA_*** (API key, host, port, user, pass) | Proxy / scraping if used | `openclaw.env` | Bright Data proxy (if used) |
| **DISCORD_APPLICATION_ID**, **DISCORD_PUBLIC_KEY**, **DISCORD_BOT_TOKEN** | Discord bot if used | `openclaw.env` | Discord integration (if used) |
| **TELEGRAM_BOT_TOKEN** | Telegram channel for pod | `openclaw.env` or OpenClaw channel config | Telegram commands/messages |

---

## Where to set (summary)

| Context | File or place | Who uses it |
|---------|----------------|-------------|
| **Next.js (web app)** | `apps/web/.env` (dev), Vercel env (prod) | Server routes, Stripe, Supabase, Sentry |
| **OpenClaw pod / gateway** | `openclaw.env` at repo root, sourced by `scripts/start-openclaw-gateway-with-env.sh` | Agents (exec, email, X, web_search, etc.) |
| **Example templates** | `env.example` (root), `scripts/openclaw.env.example` | Copy to `.env` / `openclaw.env` and fill; agents read examples to know variable names |

---

## Agent checklist

- **Need to post to X?** TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET in env when exec runs `post_tweet_env.sh`. See TOOL_INVENTORY_AND_CAPABILITIES.md.
- **Need to send email?** RESEND_API_KEY, EMAIL_FROM in env when exec runs `send_email_resend.ts`. Same doc.
- **Need web search?** BRAVE_API_KEY in OpenClaw web config.
- **Need Stripe/checkout?** Next.js must have STRIPE_* and SUPABASE_* in `apps/web/.env` or Vercel.
- **Full list of variable names** (no values): see `env.example` and `scripts/openclaw.env.example`.
