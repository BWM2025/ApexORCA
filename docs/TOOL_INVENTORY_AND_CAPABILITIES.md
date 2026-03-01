# Tool Inventory and Capabilities — OpenClaw Pod

**Purpose:** Single source of truth for every tool the pod has, how it maps to the codebase, who needs it, what’s required for it to work, and when you may claim success. **No bottlenecks from missing tools or wrong assumptions.** Full autonomy; posts, emails, deploys run without founder approval. Tier 3: execute per mandate, log for visibility.

**Founder:** B.W. Moore · **Date:** February 2026

**Credentials and env (entire codebase):** All env vars and where to set them so agents have access: **CREDENTIALS_AND_ENV.md** (repo root). Use that plus the table below for tool-specific requirements.

**Team awareness (Apex and all agents):** Who is on the pod (Echo, Sonar, Oreo, Fin, Moby), their roles, config paths, and full system/doc access: **packages/agent-configs/shared/POD_TEAM_ROSTER.md**. Apex reads this at session start so the CEO has full awareness of the team.

---

## 1. What this is and how to use it

- **OpenClaw** exposes a fixed set of tools (read, edit, write, exec, browser, message, etc.). The pod can only do what these tools allow.
- **This doc** lists each tool, maps it to codebase scripts/protocols, states **requirements** (env vars, extension, allowlist), **who needs it**, **costs**, and **when you may claim success**.
- **Agents:** Use this so you never claim "post live" or "email sent" unless the tool actually succeeded. If a tool fails or isn't configured, say so; do not fabricate stats. See **docs/EVIDENCE_OUTPUTS.md** for minimal evidence (post = exit 0 + output; email = exit 0 + Resend OK; deploy = exit 0 + log).
- **Agents (legacy):** Use this so you never claim “post live” or “email sent” unless the tool actually succeeded. If a tool fails or isn’t configured, say so; do not fabricate stats.
- **Founder:** Use this to see what’s blocking full autonomy (credentials, workspace, extension) and to verify the pod is “fully capable.”

---

## 2. The 21 OpenClaw tools (canonical list for this pod)

**OpenClaw’s full scope:** OpenClaw exposes more than 21 tools (e.g. `apply_patch`, `bash`, `cron`, `gateway`, image/media tools, and plugins/skills). See [docs.openclaw.ai/tools](https://docs.openclaw.ai/tools) for the complete list and tool groups (`group:fs`, `group:runtime`, `group:automation`, etc.). **This inventory** lists the 21 tools we map to codebase scripts, requirements, and claim-success rules. If you enable additional tools via `openclaw.json` (e.g. `cron` for scheduled X, `gateway` for webhooks), treat them like exec/message: document requirements and when agents may claim success.

| # | Tool | What it does | Codebase / usage | Who needs it | Requirements | Costs | Claim success only when |
|---|------|--------------|------------------|--------------|--------------|-------|--------------------------|
| 1 | **read** | Read file contents (text/images; truncation for large) | PROMO_QUEUE, ORCA docs, memory, scripts | All | File in workspace | Free | N/A (read either works or fails) |
| 2 | **edit** | Replace exact text in file | promo-queue, scripts, memory logs | All | Exact match; file in workspace | Free | N/A |
| 3 | **write** | Create/overwrite file | FOLLOW_LIST, heartbeat-state, drafts | All | Workspace writable | Free | N/A |
| 4 | **exec** | Run shell commands (background/PTY) | **post_tweet_env.sh**, **send_email_resend.ts**, git, deploy | Apex, Oreo, Sonar, Echo, Fin | **Exec allowlist** must allow script path; **env vars** for X: TWITTER_*; for email: RESEND_API_KEY, EMAIL_FROM; workspace = codebase so script path exists | Free (scripts); provider if cloud CLI | **X:** exec exit 0 and script output confirms post. **Email:** exec exit 0 and Resend response OK. **Deploy:** exec exit 0 and deploy log success. |
| 5 | **process** | List/poll/log/kill exec sessions | Long-running exec (deploy, batch) | Apex, Oreo, Fin | Session from exec | Free | N/A |
| 6 | **browser** | Control web browser (snapshot, click, type) | X profile edit, lead scraping, signup flows | Sonar, Echo, Apex | **Chrome tab attached via extension (badge ON)**. Without it, browser actions fail. | Free (your Chrome) | **Profile/post:** You see the change on the live site (e.g. x.com/ApexORCA2026). |
| 7 | **canvas** | Node canvases (present, eval, snapshot) | UI preview, marketing assets | Echo, Oreo | Gateway URL/token; paired nodes | Free | N/A |
| 8 | **nodes** | Paired nodes (notify, camera, screen, run) | Alerts, remote commands | Apex | Paired nodes/gateway | Free | N/A |
| 9 | **message** | Send/poll messages in channels | WhatsApp, Telegram, Slack (channel messages) | Apex, Echo, Sonar | Channel configured (e.g. WhatsApp); **not** SMTP/Resend — email to Gmail is via **exec** + send_email_resend.ts | Free (channel); paid if Slack premium etc. | Message API returns success for that channel. **Do not** say “email sent to Gmail” from message tool; email = exec + Resend script. |
| 10 | **tts** | Text to speech | Audio for content | Echo | Channel/output config | Free or ElevenLabs if configured | N/A |
| 11 | **agents_list** | List allowed agent IDs | Spawn coordination | Apex | runtime=subagent | Free | N/A |
| 12 | **sessions_list** | List sessions, filters | Monitor sub-agents | Apex | — | Free | N/A |
| 13 | **sessions_history** | History for session | Review sub-agent logs | Apex | sessionKey | Free | N/A |
| 14 | **sessions_send** | Send message to another session | Share ORCA paper, directives, tool list | Apex | sessionKey/label | Free | N/A |
| 15 | **sessions_spawn** | Spawn sub-agent (run or session) | Scale tasks (echo-marketing, sonar-outreach) | Apex | mode=session requires **thread=true** (see OPENCLAW_SUBAGENT_SPAWN_SPEC.md) | Free; ACP may have model costs | Spawn returns sessionKey; sub-agent run is separate. |
| 16 | **subagents** | List/steer/kill sub-agents | Manage team | Apex | — | Free | N/A |
| 17 | **session_status** | Session usage, time, model | Token/cost monitoring | All | — | Free | N/A |
| 18 | **web_search** | Search web (Brave API) | FelixCraft research, lead discovery, AI channels | Sonar, Echo | **Brave API key** in OpenClaw config (web section). Without it, search fails. | ~$0.005/query after $5 free/month (e.g. ~$30 for 6k queries) | Results returned; no “DMs sent” — this is search only. |
| 19 | **web_fetch** | Fetch URL content (HTML → markdown) | Dashboard scrape, X page, docs | All | HTTP/HTTPS; no dynamic JS (use browser for that) | Free | N/A |
| 20 | **memory_search** | Semantic search MEMORY.md + memory/*.md | Recall creds, ORCA, past tasks | All | Memory files in workspace | Free | N/A |
| 21 | **memory_get** | Read memory snippets by path/lines | After search, get full context | All | path from search | Free | N/A |

---

## 3. Codebase mapping (what uses which tool)

| Action | How it’s done | Tool | Requirement |
|--------|----------------|------|-------------|
| **Post to X** | Run `TWEET_TEXT="..." ./scripts/post_tweet_env.sh` (or equivalent) from workspace where script exists | **exec** | TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET in env; workspace = codebase; exec allowed for that path. |
| **Send email (e.g. to Gmail)** | Run `EMAIL_TO=... EMAIL_SUBJECT=... EMAIL_BODY=... npx tsx scripts/send_email_resend.ts` | **exec** | RESEND_API_KEY, EMAIL_FROM in env; workspace = codebase; exec allowed. |
| **Edit X profile / post via browser** | browser (navigate, click, type) on x.com | **browser** | Chrome tab attached (extension badge ON). |
| **Deploy site** | exec: git push, or Vercel CLI, or API | **exec** | Vercel token in env if needed; exec allowed; workspace = codebase. |
| **Scrape leads / research** | web_search (Brave) or web_fetch or browser | **web_search**, **web_fetch**, **browser** | Brave key for web_search; browser needs extension for x.com etc. |
| **Coordinate team** | sessions_send, sessions_spawn, subagents | **sessions_send**, **sessions_spawn**, **subagents** | sessionKey, thread=true for session mode. |

**Critical:** “Message” in OpenClaw = channel messages (WhatsApp, Telegram, Slack). **Email to an arbitrary address (e.g. thinkconceptsinc@gmail.com)** is **not** the message tool — it is **exec** + `scripts/send_email_resend.ts` with Resend. So “email sent” is only true if that exec succeeded and Resend returned success.

---

## 4. Bottlenecks (what blocks full autonomy)

| Blocker | What’s needed | Where to set |
|---------|----------------|--------------|
| **X posting** | 4 X API values + exec allowed + workspace = codebase | OpenClaw/pod env: TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET. Post from PROMO_QUEUE 1–2/day autonomously (no approval required). |
| **Email (pod)** | Resend API key + EMAIL_FROM + exec allowed + workspace = codebase | OpenClaw/pod env: RESEND_API_KEY, EMAIL_FROM. Domain verified in Resend. |
| **Browser (X profile, scraping)** | Chrome tab attached (extension) | User attaches tab; extension badge ON. |
| **Workspace** | Agent sees scripts and docs | agent.workspace in OpenClaw config = codebase path (or parent). See OPENCLAW_WORKSPACE_POINT_TO_CODEBASE.md. |
| **Exec allowlist** | Scripts and commands allowed | OpenClaw exec security mode allows post_tweet_env.sh, send_email_resend.ts, npx, git, etc. See **docs/OPENCLAW_SKILL_ALLOWLIST.md** for approved skills. |
| **Brave (web_search)** | API key | OpenClaw config, web section. |
| **Tier 3 actions** | Execute per mandate; log for visibility | Per REVERSIBILITY_TIERS; no tool change — policy. No founder approval required. |

---

## 5. Truthfulness rule (all agents)

- **Do not report an action as successful** (e.g. “post live,” “email sent,” “1,200 DMs sent”) **unless the tool that performed it confirmed success** (e.g. exec exit 0 and script/output success, or browser snapshot showing the change).
- **If a tool fails or is not configured** (e.g. exec 401 for X, missing Resend key), **report the failure**; do not fabricate stats or delivery.
- **DMs on X:** The codebase has no Twitter DM API integration. Do not claim “DMs sent” unless you have a verified mechanism (e.g. API with DM scope and confirmed response). Otherwise say “DM attempt” or “not available.”
- Reference: **docs/REALITY_CHECK_WHAT_POD_CAN_ACTUALLY_DO.md** and **docs/VERIFICATION_CHECKLIST_FULL_AUTONOMY.md**.

---

## 6. Who needs which tools (summary)

| Agent | Primary tools | Critical for autonomy |
|-------|----------------|------------------------|
| **Apex** | read, edit, write, exec, sessions_*, subagents, message, web_fetch, memory_* | exec (for running X/email scripts if delegated), sessions_send/spawn, workspace = codebase |
| **Echo** | read, edit, write, exec (email script), browser, message, web_search, web_fetch, memory_* | exec + RESEND for email; content in PROMO_QUEUE for Sonar |
| **Sonar** | read, edit, write, exec (post_tweet), browser, web_search, web_fetch, memory_* | exec + TWITTER_* for X; browser for profile if extension on |
| **Oreo** | read, edit, write, exec (deploy, verify scripts), browser, web_fetch, memory_* | exec allowlist + workspace = codebase; pre-deploy checklist |
| **Fin** | read, edit, write, exec, web_fetch, memory_* | exec for treasury scripts; Stripe/Supabase via API or app |
| **Moby** | read, memory_*, sessions_* (read-only oversight) | No exec for business ops; veto only |

---

*Use this inventory so the pod and founder share one picture of what’s real, what’s blocked, and when agents may claim success. Full autonomy; no founder approval for posts, emails, deploys.*
