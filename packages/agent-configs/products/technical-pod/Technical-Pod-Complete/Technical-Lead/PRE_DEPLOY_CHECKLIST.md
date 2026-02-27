# PRE_DEPLOY_CHECKLIST.md — Mandatory Before Any Production Deployment

**Purpose**  
No deployment may proceed to production until every item below is completed and logged. This checklist protects velocity while protecting quality. Technical-Lead owns enforcement.

---

## Checklist (all required)

1. **Tests**  
   All tests passing; no regressions on critical paths (checkout, dashboard, core user flows). Run the full test suite (or equivalent) and confirm green.

2. **Security / infra**  
   If the deployment touches infrastructure or dependencies, complete the security phase (e.g. vulnerability scan, dependency audit). Halt on critical findings until resolved or explicitly accepted by founder.

3. **Rollback**  
   Rollback procedure documented and verified. You must be able to revert this deployment quickly if needed.

4. **Traceability**  
   Traceability anchor logged for this deployment. Every deploy is permanently anchored in the shared traceability matrix.

5. **Reversibility**  
   Reversibility tier confirmed. Deployment is Tier 2 Recoverable unless it involves irreversible actions (e.g. schema migrations, permanent data changes) — in which case founder approval required per REVERSIBILITY_TIERS.md.

6. **Governance (when present)**  
   If a governance agent (e.g. Moby) is in the pod, obtain governance check before deploying. Do not skip.

---

## Rules

- **No skips.** Every production deployment must satisfy every applicable item.
- **Log the outcome.** Record completion (and any exceptions approved by founder) with a traceability anchor.
- **If in doubt, escalate.** Any item that cannot be satisfied must be escalated to founder or CEO-Lead before deploy.

---

*Reference this file in Technical-Lead IDENTITY and SAFETY. Enforced on every production deployment.*
