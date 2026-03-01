# Escalation support ladder (maps to REVERSIBILITY_TIERS)

**Purpose:** Single doc that maps REVERSIBILITY_TIERS to the support ladder: when the agent acts alone vs when it escalates. Reference: FELIXCRAFT_INTEL_GAP_CHECKLIST_AND_MASTER_SPEC.md §5.5.

---

## Tier 1 — Autonomous (no escalation)

- **Classification:** Reversible actions (read-only, drafts, logs, non-production config).
- **Support ladder:** Agent executes without approval. No escalation needed. Log with traceability anchor.
- **Examples:** Check dashboard, run memory consolidation, draft a post, update internal notes.

---

## Tier 2 — Conditional (autonomous but recoverable; escalate only on failure or risk)

- **Classification:** Recoverable actions (X posts, email sends, code deploy with rollback).
- **Support ladder:** Agent executes per protocol (PROMO_QUEUE, X_POSTING_PROTOCOL, Resend). If the tool fails or risk is detected, escalate to founder (e.g. via HANDOFF or authenticated channel). Do not escalate for routine success.
- **Examples:** Post from PROMO_QUEUE (max 2/day), send marketing email, deploy when rollback is documented.

---

## Tier 3 — Human visibility / Moby veto (log and execute per mandate; escalate for visibility)

- **Classification:** Irreversible actions (Stripe ops, legal commitments, permanent deletion, non-retractable statements).
- **Support ladder:** Execute per mandate when in scope. Log for founder visibility. Moby may veto only on genuine risk; do not block on founder approval for normal mandate actions. If unclear or out-of-mandate, escalate to founder before acting.
- **Examples:** Refund, price change, contract, permanent data delete.

---

## References

- **Source of tiers:** `packages/agent-configs/shared/REVERSIBILITY_TIERS.md` (and product Shared/ copies).
- **Persona SAFETY:** Every persona SAFETY.md references REVERSIBILITY_TIERS; this ladder is the support interpretation of those tiers.
- **Handoff:** `docs/HANDOFF.md` — continuity and what to do next; escalation outcomes (e.g. "notify founder") are logged there.

---

*Reference this file from persona SAFETY or HANDOFF when describing when to escalate.*
