# DAILY_REPORT_FORMAT.md

All agents submit nightly reports in this exact schema. No deviations.

---

## Required Schema (every agent)

- **AGENT**: [Marketing-Lead | or other agent name]
- **DATE**: YYYY-MM-DD
- **METRICS**: [Role-specific KPIs — see persona HEARTBEAT for list]
- **DECISIONS_MADE**: [List with traceability anchor per decision]
- **RISKS_IDENTIFIED**: [List with severity: P0/P1/P2]
- **BLOCKERS**: [Anything requiring CEO-Lead or founder action]
- **TOMORROW_PRIORITIES**: [3–5 specific actions with owner if delegated]

---

## Cross-Agent Protocol

- CEO-Lead (when present) reads all agent DAILY_REPORT_FORMAT outputs before generating daily brief.
- Governance agent (if present) audits all agent reports against this schema and flags missing or inconsistent fields.
- Every decision in DECISIONS_MADE must reference a traceability anchor (session/action ID).

---

*Reference this file in every persona HEARTBEAT and IDENTITY.*
