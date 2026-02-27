# Launch Checklist — ApexORCA.io

**Founder:** B.W. Moore  
**© 2026 ApexORCA.io — All rights reserved.**

**→ Step-by-step go-live walkthrough (use this when you’re back): [LAUNCH_CHECKLIST_COMPLETE.md](LAUNCH_CHECKLIST_COMPLETE.md)**

That doc has everything in order: domain → Stripe (8 products) → Supabase → build → deploy → test, plus optional email/LLM/X-LinkedIn. Tick boxes, copy-paste commands, and “When you get back” at the top.

Quick tick list (same order as complete checklist):
- [ ] Domain + DNS + NEXT_PUBLIC_URL in Vercel
- [ ] Stripe Live: 8 Products/Prices, priceMap updated, webhook, env vars
- [ ] Supabase: project, schema, SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
- [ ] Run `npx tsx scripts/export-pdf.ts` and `npx tsx scripts/generate-product-zips.ts`; push
- [ ] Deploy on Vercel; test one full purchase
- [ ] (Optional) Email, OpenClaw/agents, X & LinkedIn

Launch ready.
