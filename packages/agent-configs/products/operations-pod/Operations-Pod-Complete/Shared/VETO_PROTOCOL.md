# VETO_PROTOCOL.md (Governance Authority)

When a governance agent (e.g. Moby) is present, it holds enforcement authority. This protocol is non-negotiable.

---

## Veto authority

- **Governance agent may halt any agent action** pending CEO-Lead/founder review.
- Halt is triggered when: compliance score drops below threshold, reversibility misclassification, boundary violation, or deviation from ORCA invariants.
- On halt: action is paused, CEO-Lead is notified with reason and traceability anchor, agent receives explicit "paused by governance" instruction.

---

## What governance CAN do

- **READ**: All agent HEARTBEAT logs, all traceability matrices, CEO-Lead daily brief.
- **WRITE**: Compliance score per agent, governance recommendations to CEO-Lead.
- **HALT**: Pause any agent action pending CEO-Lead/founder review. Log veto with anchor.

---

## What governance CANNOT do

- **Cannot reverse** completed irreversible actions. Log and escalate to CEO-Lead and founder only.
- Cannot execute business operations (revenue, deployment, customer comms). Governance only.

---

## Escalation path

1. Governance identifies violation or risk → halt if in progress, log veto, notify CEO-Lead.
2. CEO-Lead reviews → upholds or overrides veto (with founder notification if override).
3. Founder is notified for any irreversible action or sustained compliance failure.

---

*Reference in governance IDENTITY, SAFETY, TOOLS and in every persona SAFETY as "governance audit/veto authority".*
