# ApexORCA.io

Nature's Apex Intelligence for Your AI Agents

The superior FelixCraft.ai clone with embedded ORCA Governance DNA from real orca research.

## OpenClaw Quick Start (Big Sur)

Run once:

```bash
cd "ApexORCA Code Base"
bash scripts/setup-openclaw-big-sur.sh
```

Then: Open browser → **http://127.0.0.1:18789** (start gateway with `openclaw gateway --port 18789 &` if the page doesn’t load).

## Quick Start

1. Open **ApexORCA.io FEB 2026** as your workspace (on Desktop). All paths are relative to this root.
2. `cd ApexORCA Code Base/apps/web && npm install`
3. Copy `env.example` to `apps/web/.env` and set `NEXT_PUBLIC_URL`, Stripe keys, Supabase. **All credentials and env vars for the entire codebase:** see **CREDENTIALS_AND_ENV.md** (agents and humans).
4. `npm run dev`

## Features

- Live dashboard with real revenue and treasury
- ORCA-Governed internal agents: Apex, Echo, Oreo, Fin, Moby, Sonar
- Governance Booster skill
- One-time purchases via Stripe

## Deploy (real domain — apexorca.io)

Deploy to **production (https://apexorca.io)**, not localhost. In Vercel set **NEXT_PUBLIC_URL=https://apexorca.io** and other env vars, then push to main or run `vercel --prod`. See **docs/DEPLOY_GUIDE.md**.

Built with ORCA v7.
