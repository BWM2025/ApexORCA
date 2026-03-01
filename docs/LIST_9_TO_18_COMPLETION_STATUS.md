# List 9–18 completion status + what “1a–1f” means

**You said:** Get the site operational, don’t skip anything you need, but if AI can do it then it’s off your list. This doc is the single place to see what’s done and what’s left.

---

## What “1a–1f” is (your launch list — from MASTER_SETUP_AND_COMPLETION_CHECKLIST.md §1)

| ID | Name | What to do |
|----|------|------------|
| **1a** | Resend: verify domain | resend.com → Domains → add apexorca.io → add DNS records → Verify |
| **1b** | openclaw.env | Create from example, fill X + Resend + EMAIL_FROM (and any others the script needs) |
| **1c** | Proof script | Run `bash scripts/run-proof-emails-and-x-post-bigsur.sh` (3 emails + 1 X post) |
| **1d** | Gateway | Run `bash scripts/start-openclaw-gateway-with-env.sh` when you want to use the agent |
| **1e** | Deploy site | Vercel/Railway: Root = apps/web, env vars from env.vercel.txt, domain apexorca.io |
| **1f** | Stripe | Products + webhook (apexorca.io/api/stripe/webhook), webhook secret in env |

**Site is live when:** 1a, 1b, 1c, 1e, 1f are done. 1d is for using the agent (optional for “site up”).

---

## List 9–18: completion status and who does it

| # | Item | Status | Who does it | Notes |
|----|------|--------|-------------|--------|
| **9** | Snapshot | **NOT DONE** | **You** | snapshot.org, connect wallet, create space. Only when you want DAO voting. |
| **9** | Tally | **NOT DONE** | **You** | tally.xyz, connect wallet, create DAO. Only when you want DAO. |
| **10** | Recursive ads (Meta) | **NOT DONE** | **You** | business.facebook.com, ad account, billing. When you run ads. |
| **10** | Recursive ads (Google) | **NOT DONE** | **You** | ads.google.com, account, billing. When you run ads. |
| **11** | Google Sheets/Docs | **NOT DONE** | **You** | Only if app uses it. console.cloud.google.com, project, service account, JSON key. |
| **12** | TrustMRR-style | **NOT DONE** | **You** | Only when you pick a provider. Sign up, get API key. |
| **13** | ClawMart skills | **DONE** | **AI** | Codebase has skills (playbook, governance-booster, growth-engine, pod-os), SkillGrid, Stripe checkout. No signup. |
| **14** | Info-product factory | **DONE** | — | No new account if you stay on site + Stripe. Gumroad/Teachable = you, later, if you add. |
| **15** | Scout (Brave) | **DONE** | — | BRAVE_API_KEY already in openclaw.env. No action. |
| **16** | Ralph / tmux / worktree | **DONE** | — | No accounts. Install when you need (brew install tmux, git worktree). Docs in codebase. |
| **17** | Audit logging | **DONE** | **AI** | File-based: script + doc added. No account. See `scripts/audit-log-append.sh` and docs. |
| **18** | Governance enhancements | **DONE** | **AI** | Voting, escalation, Moby documented. See `docs/GOVERNANCE_ENHANCEMENTS.md`, ESCALATION_SUPPORT_LADDER, HANDOFF. |

---

## Your list (only what you have to do)

**To get the site live tonight:** Do **1a, 1b, 1c, 1e, 1f** (and 1d if you want the gateway). Nothing from 9–18 is required for the site to be operational.

**Later (when you want them):**  
9 Snapshot, 9 Tally, 10 Meta ads, 10 Google ads, 11 Google Sheets (if app uses), 12 TrustMRR (if you pick a provider). All are **you** — no AI signup.

**Already done (no action for you):** 13 ClawMart skills, 14 info-product (Stripe), 15 Brave, 16 Ralph/tmux/worktree, 17 file-based audit, 18 governance docs. AI did or codebase had it.

---

## Why 9–18 were on the list

They were on the list so **nothing was forgotten** — Snapshot, Tally, ads, Sheets, etc. are options when you’re ready. They are **not** required for the site to be up and selling. The only things required for that are 1a–1f. The items that could be done by AI (13, 17, 18) are done; the rest are either done (14, 15, 16) or explicitly **you, later** (9, 10, 11, 12).
