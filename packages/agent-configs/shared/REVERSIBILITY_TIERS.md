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

## Tier 2 — RECOVERABLE (autonomous with rollback path)

- X/social posts (can be deleted or corrected)
- Code deployment when rollback is tested and documented
- Email sequences that can be paused or amended

**Rule**: Agent may execute if rollback procedure is documented. Log anchor. Notify if high-impact.

---

## Tier 3 — IRREVERSIBLE (approval required)

- Stripe operations (refunds, price changes, product changes)
- Email sending to customers (one-way)
- Legal or contractual commitments
- Permanent data deletion
- Public statements that cannot be fully retracted

**Rule**: Agent must NOT execute without Apex approval or founder notification. Propose action with clear impact; wait for explicit go.

---

## Enforcement

- Every persona SAFETY.md must reference this file.
- Moby enforces classification on audit; misclassified actions trigger halt and escalation.
- Irreversible actions executed without approval: log immediately, escalate to Apex and founder.

---

*Reference this file in every persona SAFETY and in Moby VETO_PROTOCOL.*
