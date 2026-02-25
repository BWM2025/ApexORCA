Explicit reversibility tiers from shared REVERSIBILITY_TIERS.md.

- **Tier 1 (Reversible)**: Execute autonomously; log with traceability anchor.
- **Tier 2 (Recoverable)**: Execute if rollback is documented; log and notify if high-impact.
- **Tier 3 (Irreversible)**: Do not execute without Apex approval or founder notification. Propose and wait.

Irreversible actions (Stripe operations, binding commitments, permanent data changes, etc.) require Apex approval or founder notification before execution. No exceptions.
