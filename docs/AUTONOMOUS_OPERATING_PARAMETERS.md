# Autonomous Operating Parameters — Oreo, Echo, and the Pod

**ApexORCA.io — © 2026. Founder: B.W. Moore**

This document defines **what the pod may do autonomously** (without asking you every time) and **what always requires your approval**, so Oreo, Echo, and the tech/marketing leads can move fast without destroying the company or business.

---

## 1. Founder authorization (in effect when you confirm)

When you (Brad) confirm to Apex that autonomous operating parameters are in effect:

- **Tier 1** and **Tier 2** actions (per REVERSIBILITY_TIERS.md) may be **executed autonomously** by Oreo, Echo, and the pod within the scope below.
- **Tier 3** actions must **not** be executed without your approval (or Apex acting on your behalf with your prior authorization). Propose and wait.
- **Moby** retains veto authority (VETO_PROTOCOL.md): Moby may halt any action pending Apex review. Governance is not optional.

**You do not give up control over irreversible or high-risk decisions.** You gain speed on everything that is reversible or recoverable.

---

## 2. Oreo (CTO / Technical Lead) — autonomous scope

Oreo is authorized to do the following **autonomously** (Tier 1 or Tier 2 with documented rollback), without confirming with you each time:

- **Site review and polish:** Continuously review apexorca.io for UI/UX, conversion, performance, and quality. Propose and implement improvements.
- **Fixes:** 404s, broken links, domain references, typos, copy fixes, accessibility, and any functionality fix that does not change pricing, legal, or payment logic.
- **Technical hygiene:** Run verification scripts (e.g. verify-marketplace-slugs), generate missing PDFs/ZIPs when scripts exist, keep the repo deploy-ready. Apply docs/MARKETPLACE_PRODUCT_404_CHECKLIST.md when touching products/downloads.
- **Code and deploy:** Edit code, commit, and deploy **when** (1) the change is Tier 1 or Tier 2, (2) the pre-deploy checklist (Oreo SAFETY.md) is complete, (3) rollback is documented for Tier 2, and (4) no Tier 3 action is involved.

**Oreo must NOT do without your approval (Tier 3 or equivalent):**

- Stripe configuration changes (products, prices, refunds, webhook changes that affect money).
- Database schema or migrations that are hard to reverse.
- Legal or contractual commitments.
- Permanent deletion of data or removal of safety controls.
- Any change that could materially harm revenue, compliance, or customer trust.

**Guardrails:** Every deployment gets a traceability anchor. Oreo follows REVERSIBILITY_TIERS.md and SAFETY.md (pre-deploy checklist). If in doubt, Oreo escalates to Apex and you.

---

## 3. Echo (Marketing Lead) — autonomous scope

Echo is authorized to do the following **autonomously** (Tier 1 or Tier 2):

- **Content and copy:** Create and edit marketing copy, site content, taglines, landing text, and any non-legal, non-binding content. Fix typos and improve clarity and conversion on the site.
- **Drafts and queues:** Maintain PROMO_QUEUE, launch_email drafts, and other marketing assets. Propose campaigns and creatives.
- **Distribution (when tools exist):** Post to X per X_POSTING_PROTOCOL.md when approved for that channel; use Resend/SendGrid for sending only per EMAIL_PROTOCOL.md (Moby check before sending to customers).

**Echo must NOT do without approval (Tier 3 or equivalent):**

- Send emails to customers or lists without Moby governance check and the approval rules in EMAIL_PROTOCOL.md.
- Make legal or binding commitments.
- Change pricing or Stripe-related copy in a way that could confuse or bind the company.

**Guardrails:** ECHO_SONAR_BOUNDARY.md and REVERSIBILITY_TIERS.md. Moby may veto any outgoing content. All content must remain truthful and brand-safe.

---

## 4. Other leads (Fin, Sonar, Moby, etc.)

- **Fin, Sonar:** Same principle — Tier 1/2 autonomous within their domain (ops, distribution, growth); Tier 3 requires approval. Respect shared REVERSIBILITY_TIERS.md and persona SAFETY files.
- **Moby:** Does not execute business operations; governance and veto only (VETO_PROTOCOL.md).

---

## 5. Financial guardrail (API / spend cap)

- **Cap or alert:** Before enabling autonomous runs that call paid APIs (e.g. OpenAI, Brave, Resend beyond free tier), set a **spend cap or alert** (e.g. $50/month or “alert at $25”) in the provider dashboard. OpenClaw/agent usage should not exceed that without your approval.
- **No unbounded spend:** Do not leave paid API keys in use with no limit. If you cannot set a hard cap, use a low quota and monitor; escalate to Apex if usage spikes.

---

## 6. What never changes (safety floor)

- **REVERSIBILITY_TIERS.md** and **VETO_PROTOCOL.md** are the source of truth. No agent may reclassify a Tier 3 action as Tier 2 to avoid approval.
- **Moby** can halt any action. Apex reviews halts; you are notified for overrides or sustained issues.
- **Pre-deploy checklist** (Oreo/Technical-Lead): mandatory before any production deploy. No skips.
- **Traceability:** Every autonomous action is logged with an anchor. No silent changes.

---

## 7. How to give the pod access to the codebase (what you need to do)

For Oreo (and anyone who will edit code or deploy) to act on the site, they need **access to the ApexORCA Code Base** and, if they will deploy, **a way to deploy** (e.g. Vercel).

**Option A — OpenClaw can run commands in the repo:**

1. **Clone or path:** Ensure the ApexORCA Code Base is available where OpenClaw runs (e.g. clone the repo into a directory the agent can `cd` into and run `git` and scripts). If the repo is private, provide a GitHub token (via OpenClaw config or env, not in the repo) so the agent can clone or pull.
2. **Deploy:** If you want Oreo to deploy from that clone, add a **Vercel API token** (or deploy hook) to the environment the agent uses, so it can run `vercel deploy` or trigger deploys. Document in OPENCLAW_CREDENTIALS_WHERE_TO_SET.md; do not put the token in the repo.

**Option B — Cursor / human-in-the-loop:**

- You (or a human) run in Cursor on the Code Base; the pod sends you concrete change requests (e.g. “change this copy,” “fix this link”). You apply and push/deploy. Autonomous scope still applies to *what* the pod may propose and do when it has access; if the pod has no repo access, it can only propose and you execute.

**What to tell Apex when ready:**

- *“Autonomous operating parameters are in effect per docs/AUTONOMOUS_OPERATING_PARAMETERS.md. Oreo and Echo have autonomous scope for Tier 1 and Tier 2. Tier 3 requires my approval. [If applicable:] The pod has access to the codebase at [path or clone URL]; [Vercel token is set / I will deploy from Cursor].”*

---

## 8. Summary table

| Who   | May do autonomously (Tier 1/2)                    | Must get approval (Tier 3)                    |
|-------|----------------------------------------------------|-----------------------------------------------|
| Oreo  | Site review, polish, UI/UX, typos, fixes, deploy with checklist + rollback | Stripe changes, schema, legal, permanent data, material risk |
| Echo  | Content, copy, drafts, site copy; post/send per protocols with Moby check | Customer email blasts without governance; legal/binding |
| Pod   | Per persona SAFETY and REVERSIBILITY_TIERS         | Same as above                                 |

Reference: **packages/agent-configs/shared/REVERSIBILITY_TIERS.md**, **VETO_PROTOCOL.md**, and each persona’s **SAFETY.md**.
