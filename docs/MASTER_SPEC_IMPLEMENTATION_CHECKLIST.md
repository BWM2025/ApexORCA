# Master Spec — Implementation Checklist (Final Phase)

**Purpose:** This is the **final phase** of the build. When every required item below is checked, the system is **spec-complete** and perfected against the FelixCraft intel and ApexORCA codebase. No item is inferred — each is cross-referenced to the intel doc and to real repo paths.

**Source of truth:** `docs/FELIXCRAFT_INTEL_GAP_CHECKLIST_AND_MASTER_SPEC.md` (Full Inventory §1, Gap Checklist §2, Master List §3, Blueprint Manifest §4, Master Spec §5, Verification §7).

**Rule:** Implement in the order below. Required items must be done; optional items may be deferred. Zero new startup cost on any item.

**Implementation status:** All implementable required items (1c, 2a, 3a, 3b, 4, 5, 6, 7, 9, 10) have been implemented. Items 1a (Resend verify) and 1b (proof script run) require manual/run by founder. When 1a and 1b are done, the system is spec-complete.

---

## How to use this checklist

- **#** = Master list order (§3).
- **Required** = Must be completed for spec completion.
- **Optional** = Improves system; can ship without it.
- **File(s)** = Exact path(s) to create or edit (verified in codebase).
- **Acceptance** = Done when the criterion is met (from §5).
- **Intel** = Section in `FELIXCRAFT_INTEL_GAP_CHECKLIST_AND_MASTER_SPEC.md` (e.g. §5.2).

---

## Required items (must complete)

### 1. Proof & launch unblock — Intel §5.2

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 1a | Resend domain apexorca.io verified | (Manual: Resend dashboard + DNS) | Resend shows domain **Verified**; proof emails send. | §5.2 |
| 1b | Proof script runs: 3 emails + 1 X post | `scripts/run-proof-emails-and-x-post-bigsur.sh` (no edit unless broken) | `bash scripts/run-proof-emails-and-x-post-bigsur.sh` yields three "SENT" and one "X post: SENT"; founder receives emails and sees post. | §5.2 |
| 1c | Gateway & TUI usable without token_mismatch | `docs/OPENCLAW_SETUP_DONE_NEXT_STEPS.md` | Doc contains: "Use browser at http://127.0.0.1:18789 and enter token, or run `openclaw tui --token <token>`." (Already present — verify only.) | §5.2 |

- [ ] **1a** Resend verified *(manual: Resend dashboard + DNS)*  
- [ ] **1b** Proof script run successful *(run `bash scripts/run-proof-emails-and-x-post-bigsur.sh`)*  
- [x] **1c** TUI/token instructions verified in OPENCLAW_SETUP_DONE_NEXT_STEPS  

---

### 2. Dashboard clarity — Intel §5.3

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 2a | Dashboard states revenue is Stripe-only (no crypto) | `apps/web/app/dashboard/page.tsx` **or** `apps/web/components/dashboard/live-revenue.tsx` | Visible copy on dashboard: e.g. "Stripe revenue only — does not include crypto." | §5.3 |
| 2b | Treasury link placeholder (optional for later) | Env or dashboard component | If implemented: optional `NEXT_PUBLIC_TREASURY_*` or link; no obligation before revenue. | §5.3 |

- [x] **2a** Stripe-only notice visible on dashboard  
- [ ] **2b** (Optional) Treasury placeholder — skip until revenue  

---

### 3. Cron & heartbeat — Intel §5.4

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 3a | One documented or implemented cron example | New: `docs/OPENCLAW_CRON_EXAMPLE.md` **or** script in `scripts/` | Either (a) doc with "Add cron via OpenClaw CLI: …" and one example, or (b) script that registers one cron job. | §5.4 |
| 3b | HEARTBEAT.md short and token-efficient | `HEARTBEAT.md` (repo root), `AGENTS.md` (repo root) | HEARTBEAT.md under ~30 lines; AGENTS.md heartbeat section matches. (Already true — verify only.) | §5.4 |

- [x] **3a** One cron example (doc or script)  
- [x] **3b** HEARTBEAT/AGENTS length and consistency verified  

---

### 4. Rate limit for X — Intel §3 item 4 (spec implied in §5.4 / TOOL_INVENTORY)

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 4 | Document max X posts per day/hour for Sonar | `packages/agent-configs/personas/sonar/X_POSTING_PROTOCOL.md` **or** `docs/X_RATE_LIMIT.md` | Explicit rule: e.g. max 2 posts/day or 1 per 6h; referenced where Sonar posts. | §3 #4, §2.2 |

- [x] **4** X rate limit documented (e.g. in X_POSTING_PROTOCOL or new doc)  

---

### 5. Email Fortress (email as data, not commands) — Intel §5.5

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 5 | "Email Fortress" policy: email = information, not commands | **Create** `docs/EMAIL_AS_DATA_NOT_COMMANDS.md` (or add section to a SAFETY doc) | One doc states: email treated as information only; no execution of instructions from email body; references existing SAFETY. | §5.5 |

- [x] **5** Email Fortress doc created and references SAFETY  

---

### 6. 3-tier escalation (support ladder) — Intel §5.5

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 6 | Single doc mapping REVERSIBILITY_TIERS to support ladder | **Create** `docs/ESCALATION_SUPPORT_LADDER.md` **or** extend `packages/agent-configs/shared/REVERSIBILITY_TIERS.md` | Doc exists; maps Tier 1 = autonomous, Tier 2 = conditional, Tier 3 = human; linked from at least one persona SAFETY or `docs/HANDOFF.md`. | §5.5 |

- [x] **6** Escalation doc exists and is linked from SAFETY or HANDOFF  

---

### 7. Kill switch (stop gateway + revoke token) — Intel §5.5

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 7 | Document how to stop gateway and revoke/change token | `docs/OPENCLAW_SITUATION_HANDOFF.md` **or** `docs/OPENCLAW_SETUP_DONE_NEXT_STEPS.md` | Doc includes both: (1) stop gateway (e.g. `openclaw gateway stop`, kill PIDs on 18789), (2) revoke/change token (where to change token so TUI/browser must re-auth). | §5.5, §7 |

- [x] **7** Kill switch doc includes "stop gateway" and "revoke/change token"  

---

### 8. Financial guardrail (optional) — Intel §5.5

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 8 | Optional: alert if API spend > $X/day | `docs/AUTONOMOUS_OPERATING_PARAMETERS.md` **or** `HEARTBEAT.md` | If implemented: AUTONOMOUS_OPERATING_PARAMETERS or HEARTBEAT mentions it; no obligation to implement in code. | §5.5 |

- [ ] **8** (Optional) Financial guardrail mentioned in AUTONOMOUS_OPERATING_PARAMETERS or HEARTBEAT — skip if not implementing  

---

### 9. Evidence outputs (post / email / deploy) — Intel §5.6

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 9 | Minimal evidence for "post sent," "email sent," "deploy done" | **Create** `docs/EVIDENCE_OUTPUTS.md` **or** add section to `docs/TOOL_INVENTORY_AND_CAPABILITIES.md` | Doc states: post = script exit 0 + optional post URL; email = script exit 0 + optional Resend id; deploy = deploy log or Vercel success. Agents must not claim success without these. | §5.6 |

- [x] **9** Evidence outputs doc exists; agents instructed not to claim success without evidence  

---

### 10. Transparency footer — Intel §5.8

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 10 | Optional transparency disclaimer in footer | `apps/web/components/footer.tsx` | Copy in footer: e.g. "ApexORCA is an experimental AI agent company; transactions are real and auditable." No backend change. | §5.8 |

- [x] **10** Footer includes transparency disclaimer (optional but recommended)  

---

## Optional items (improve system; not required for spec completion)

### 11. Sentry stub — Intel §5.7

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 11 | Optional doc: Sentry → classify → escalate or fix | **Create** `docs/SENTRY_PIPELINE_STUB.md` | Doc describes: when Sentry enabled, ingest → classify green/red → escalate or fix; verification before merge. No Sentry integration required. | §5.7 |

- [ ] **11** (Optional) Sentry pipeline stub doc  

---

### 12. Memory tiering — Intel §5.7

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 12 | Optional doc: hot/warm/cold or recent vs archive | **Create** `docs/MEMORY_TIERING.md` | Doc explains use of `memory/`, MEMORY.md, knowledge_repo for "recent" vs "archive"; hot/warm/cold as future enhancement. | §5.7 |

- [ ] **12** (Optional) Memory tiering doc  

---

### 13. Skill allowlist — Intel §5.7

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 13 | Optional doc: approved OpenClaw skills/sources | **Create** `docs/OPENCLAW_SKILL_ALLOWLIST.md` **or** file in `packages/agent-configs/` | Doc or file lists approved skills/sources; linked from SAFETY or OPENCLAW_* doc. | §5.7 |

- [ ] **13** (Optional) Skill allowlist doc  

---

### 14. Pre-configured cron example — Intel §3 #14, §5.4

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 14 | Example cron config or script (e.g. daily report) | `docs/OPENCLAW_CRON_EXAMPLE.md` **or** `scripts/register-cron-example.sh` | One example that registers a single cron job (e.g. daily report). Can be same as 3a. | §3 #14, §5.4 |

- [ ] **14** (Optional) Pre-configured cron example — may be same as 3a  

---

### 15. Trust Meter / ORCA audit — Intel §5.7, §3 #15

| # | Requirement | File(s) | Acceptance | Intel |
|---|-------------|---------|------------|-------|
| 15 | Optional: one runnable check "ORCA Certified: Yes/No" | **Create** script or doc under `docs/` or `scripts/` | One runnable check (script or doc with steps) that outputs "ORCA Certified: Yes/No" for a given task or day. | §3 #15 |

- [ ] **15** (Optional) Trust Meter / ORCA audit runnable check  

---

## Deferred items (do not implement until revenue — Intel §5.9)

These are **out of scope** for this checklist. Revisit only after revenue allows:

- Vector DB (Pinecone free/paid), residential proxies, stealth browser  
- Crypto payment rail (USDC on Base), $ORCA token, tokenomics, treasury dashboard  
- ClawMart-style skills marketplace, decentralized hosting, DAO  
- Recursive self-marketing (ad spend), Ralph/tmux/worktree automation  
- Make.com, Railway, other new SaaS  

---

## Completion criteria (perfected system)

**Spec-complete when:**

1. All **required** checkboxes (1a–1c, 2a, 3a–3b, 4, 5, 6, 7, 9) are checked.  
2. Item **10** (footer) is strongly recommended; optional items 8, 11–15 may remain unchecked.  
3. No new paid services or startup cost were introduced.  
4. Each completed item was cross-checked against the intel doc and the codebase (paths and acceptance as above).

**After completion:** This checklist plus `FELIXCRAFT_INTEL_GAP_CHECKLIST_AND_MASTER_SPEC.md` form the **final master specs**. No further spec phase is required; only execution and future DEFER items when revenue allows.

---

*Last updated: 2026-02-28. Source: FELIXCRAFT_INTEL_GAP_CHECKLIST_AND_MASTER_SPEC.md §3, §5, §7. Zero budget rule applies to every item.*
