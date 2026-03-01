# REVERSIBILITY_TIERS.md (SHARED)

Every action must be classified before execution. No exceptions.

---

## Tier 1 — REVERSIBLE (autonomous allowed)

- Read-only operations (analytics, dashboards, research)
- Draft content, drafts, internal notes
- A/B test configuration (non-production)
- Logging, audit writes, traceability writes

**Rule**: Agent may execute without approval. Log with traceability anchor.

---

## Tier 2 — RECOVERABLE (autonomous; no founder approval)

- X/social posts (can be deleted or corrected). Post from PROMO_QUEUE per protocol.
- Code deployment when rollback is tested and documented.
- Email sending (marketing, transactional, launch emails). Can be paused or amended.
- Email sequences that can be paused or amended.

**Rule**: Agent executes autonomously. Log anchor. No founder approval required. Company runs 24/7.

---

## Tier 3 — IRREVERSIBLE (log and execute per mandate; Moby can veto only on true risk)

- Stripe operations (refunds, price changes, product changes)
- Legal or contractual commitments
- Permanent data deletion
- Public statements that cannot be fully retracted

**Rule**: Execute per mandate when in scope. Log for founder visibility. Do NOT block on founder approval. Moby may veto only on genuine risk; otherwise agents proceed. No "wait for explicit go" for normal mandate actions.

---

## Enforcement

- Every persona SAFETY.md must reference this file.
- Moby enforces classification on audit; misclassified actions trigger halt and escalation.
- Irreversible actions executed without approval: log immediately, escalate to Apex and founder.

---

*Reference this file in every persona SAFETY and in Moby VETO_PROTOCOL.*
