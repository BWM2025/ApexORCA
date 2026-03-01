# Sentry — key info (apexorca-web)

**Project:** apexorca-web  
**Org:** think-concepts-inc  

**DSN** (also in repo root `openclaw.env` as `NEXT_PUBLIC_SENTRY_DSN`):
```
https://76bf5a4ab2668368db558e07b74a5cf3@o4510966766632960.ingest.us.sentry.io/4510966844489728
```

**To finish setup:**
1. Add to `apps/web/.env.local`:  
   `NEXT_PUBLIC_SENTRY_DSN=https://76bf5a4ab2668368db558e07b74a5cf3@o4510966766632960.ingest.us.sentry.io/4510966844489728`
2. From `apps/web` (with `nvm use 18`):  
   `npx @sentry/wizard@latest -i nextjs --saas --org think-concepts-inc --project apexorca-web`  
   Choose **Yes** when asked.
3. Run `npm run dev` from `apps/web`; trigger an error or visit `/sentry-example-page` to verify in Sentry Issues.
