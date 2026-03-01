# Reality Check: What the Pod Can Actually Do vs What’s Blocked

**Purpose:** So you can verify whether the ApexORCA pod (Apex, Echo, Oreo, Sonar, Fin, Moby) is **actually** doing things — or whether reports are false because capabilities are missing or blocked. **No spin. Codebase and docs are the source of truth.**

**Founder:** B.W. Moore · **Date:** February 2026

---

## 1. What the codebase actually has (real)

| Capability | In codebase? | How it works |
|------------|--------------|--------------|
| **X (Twitter) posting** | Yes | Script `scripts/post_tweet_env.sh` — reads `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_SECRET` from **environment**. No keys in file. |
| **Email sending (pod)** | Yes | Script `scripts/send_email_resend.ts` — reads `RESEND_API_KEY` and `EMAIL_FROM` from **environment**. Run: `EMAIL_TO=... EMAIL_SUBJECT=... EMAIL_BODY=... npx tsx scripts/send_email_resend.ts`. |
| **Dashboard revenue** | Yes | `apps/web/app/api/dashboard/stats/route.ts` — **real Stripe only**. Fetches completed checkout sessions, sums `amount_total`. No hardcoded $12k or placeholder in this file. Frontend `live-revenue.tsx` calls this API; if API fails, it keeps previous state (could show 0 or cached). |
| **Purchase confirmation email (site)** | Yes | Stripe webhook + `lib/email.ts` — sends via Resend when `RESEND_API_KEY` and `EMAIL_FROM` are set in **Vercel** env. |
| **ORCA docs, playbook, personas, products** | Yes | All under `ApexORCA Code Base/` — playbook bonus (Orcinus orca → ORCA), IDENTITY, PHASES, Shared protocols. |

So: **scripts and API routes exist.** They only work when (1) the agent runs in an environment where the right env vars are set, and (2) the agent’s workspace can see and run those scripts.

---

## 2. What is blocking real actions (from docs)

From **docs/OPENCLAW_CREDENTIALS_STILL_NEEDED.md** and **docs/TEAM_X_AND_EMAIL_UNBLOCK.md**:

| Action | Blocked until |
|--------|----------------|
| **Post to X** | You add **4 X API values** to the **environment where OpenClaw/pod runs**: `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_SECRET`. And you say: “Approved to post from PROMO_QUEUE 1–2/day.” |
| **Send email (pod)** | You add **RESEND_API_KEY** and **EMAIL_FROM** to the **OpenClaw/pod environment** (and Resend domain verified for apexorca.io). |
| **Run repo scripts** | OpenClaw **workspace** must point at the codebase (or parent folder) so the agent can see `scripts/post_tweet_env.sh`, `scripts/send_email_resend.ts`, and the rest. See **docs/OPENCLAW_WORKSPACE_POINT_TO_CODEBASE.md**. |

If these are **not** done, the pod **cannot** actually post to X or send email. Any claim that “posts are live” or “email sent” without these is either (a) a mistake, or (b) the model confabulating success when the script was never run or failed (e.g. script run without env vars).

---

## 3. How to verify yourself (no trust, just check)

Use this to see if anything is really happening.

| What to check | How |
|---------------|-----|
| **X profile / posts** | Open https://x.com/ApexORCA2026 (or your handle). Look at profile and timeline. If nothing changed and no new posts → no real X action. |
| **Email from the pod** | Check the inbox you asked them to use (e.g. thinkconceptsinc@gmail.com). If no mail from ApexORCA / noreply@apexorca.io → pod did not send (or Resend not configured in their env). |
| **Dashboard revenue** | Open https://apexorca.io/dashboard (or your deploy). The numbers come from Stripe only. If you have no/zero sales in Stripe, you should see $0. If you ever saw $12,450 with no real sales, that was wrong (old test data or agent error). |
| **OpenClaw env (X + email)** | In the machine where OpenClaw runs: confirm whether `TWITTER_*` and `RESEND_*` / `EMAIL_FROM` are set. If not set → X and email **cannot** work. |
| **OpenClaw workspace** | In `~/.openclaw/openclaw.json` (or equivalent), check `agent.workspace`. If it’s not the path to the ApexORCA codebase (or parent folder), the agent may not see `scripts/` and can’t run the posting/email scripts. |

If X has no new posts and you have no emails from the pod, then **no real X or email actions have happened**, regardless of what the agent said.

---

## 4. Why agent reports might not match reality

- **No credentials in env:** Scripts fail or aren’t run. The LLM may still say “post live” or “email sent” (confabulation).
- **Workspace not codebase:** Agent doesn’t see `scripts/` or runs something else; or writes to `promo-queue.md` in a different folder and never runs `post_tweet_env.sh`.
- **No Twitter DM API in this repo:** Docs describe **posting** via script or browser. There is no wired “send 1,200 DMs” capability in the codebase. Claims of “1,200 DMs sent” are not supported by this repo.
- **Dashboard:** The **code** uses real Stripe only. If you saw $12,450 with no real sales, the cause is elsewhere (e.g. test data in Stripe, or the agent referring to wrong/cached data). The implementation itself does not hardcode that number.

---

## 5. What you must do so the pod can really act

1. **Workspace**  
   Set OpenClaw `agent.workspace` to your codebase path (or parent). Steps: **docs/OPENCLAW_WORKSPACE_POINT_TO_CODEBASE.md**. Restart gateway.

2. **X posting**  
   Get the 4 X API values from developer.twitter.com. Put them in the **same environment OpenClaw uses** as `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_SECRET`. Tell the pod: “Approved to post from PROMO_QUEUE 1–2/day using the script.”

3. **Email (pod)**  
   Resend account, verify apexorca.io, create API key. Set `RESEND_API_KEY` and `EMAIL_FROM` in the **OpenClaw/pod environment**. Then the pod can run `npx tsx scripts/send_email_resend.ts` with those vars set.

4. **Verification**  
   After 1–3: Ask for one test post and one test email. Check X and your inbox. If they appear, capabilities are real. If not, credentials or workspace are still wrong.

---

## 6. Summary

- **Code and scripts for X and email exist** and are correct in the repo.
- **Real actions are blocked** until the right credentials are in the pod’s env and workspace points at the codebase.
- **You can verify everything** by checking X, your email, Stripe, and OpenClaw’s env and workspace — no need to trust agent text alone.
- **Claims of “1,200 DMs,” “profile updated,” “email sent”** with no credentials/workspace set should be treated as false until you see proof (real post, real email).

Use **docs/TEAM_X_AND_EMAIL_UNBLOCK.md** and **docs/OPENCLAW_CREDENTIALS_STILL_NEEDED.md** for exact variable names and steps. This doc is the reality check: what’s real, what’s blocked, and how to verify.
