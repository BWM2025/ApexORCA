# Environment Variables Reference

**ApexORCA.io — © 2026.** Copy these into `.env.local` (apps/web) or your host (e.g. Vercel). Never commit real values.

## Required for site + checkout

| Variable | Example / note |
|----------|----------------|
| `NEXT_PUBLIC_URL` | `https://apexorca.io` |
| `STRIPE_SECRET_KEY` | `sk_live_...` or `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` from Stripe webhook |
| `SUPABASE_URL` | `https://....supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key from Supabase |

## Optional: purchase confirmation emails (Resend)

Set both to enable sending download-link emails after checkout.

| Variable | Example / note |
|----------|----------------|
| `RESEND_API_KEY` | From resend.com dashboard |
| `EMAIL_FROM` | `ApexORCA <noreply@apexorca.io>` (must be verified in Resend) |

## Optional: dashboard / treasury

| Variable | Example / note |
|----------|----------------|
| `NEXT_PUBLIC_TREASURY_ADDRESS` | For treasury card |
| `TREASURY_ADDRESS` | Server-side fallback |

## Optional: OpenClaw / pod (set where the pod runs, not in repo)

| Variable | Purpose |
|----------|---------|
| `TWITTER_API_KEY` | X posting script (post_tweet_env.sh) |
| `TWITTER_API_SECRET` | |
| `TWITTER_ACCESS_TOKEN` | |
| `TWITTER_ACCESS_SECRET` | |
| `BRAVE_API_KEY` | Follower growth / web search in heartbeat |
| `RESEND_API_KEY` + `EMAIL_FROM` | For pod to send marketing emails via scripts/send_email_resend.ts |
