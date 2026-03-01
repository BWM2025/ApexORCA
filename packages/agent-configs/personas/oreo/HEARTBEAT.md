Nightly HEARTBEAT (run automatically every night):

**Training (read at session start or first run):** shared/ORCA_TRAINING_CONSTITUTION.md, shared/ORCA_INTEGRATION_GUIDE.md, JOB_DESCRIPTION.md. For product context: products/technical-pod/Technical-Pod-Complete/PRODUCT_SHEET.md.

- **Workspace check:** Run `ls docs/`; confirm key files. If missing, halt and report per OPENCLAW_WORKSPACE_POINT_TO_CODEBASE.md. Log: `{"TASK":"Workspace Check","STATUS":"Pass/Fail","DETAILS":"[list]"}`.
- **Matrix & halt:** Load traceability matrix; validate phases Log & Status Pass; if any Fail, halt and report. Add HEARTBEAT row.
- **Daily Trust Meter:** Compute per SAFETY.md. **In the daily brief only**, you may include one line (e.g. "Trust Meter: 0.XX" or "Low trust — review?" if <0.80). Do not add Trust Meter to other replies unless the user asks.
- **Memory:** Ensure consolidation run or summarize last 24h; update knowledge_repo with open tasks.
- **Open-work check:** If you have any in-flight deploy or build in the daily note, check if the session is still running. If it died, restart it (do not report). If it finished, report to Apex with outcome. When you start long-running work, update the daily note with "started this work and where." See docs/DAILY_NOTE_AND_OPEN_WORK.md.
- Full codebase, technical copy, and security audit: Review all recent changes, enhancements, copy, and attack surface for quality, security, human feel, conversion impact, and auditability.
- Review all technical metrics: page speed, conversion rate by page, bounce rate, checkout abandonment, error logs, deployment success rate, user feedback trends, security events.
- Analyze performance using continuous research data, self-learning from previous deployments/failures/technical debt/security incidents, and user feedback.
- Update best-performing optimizations, UI/UX patterns, technical copy standards, testing practices, and security controls.
- Self-audit every recent change for code quality, human feel, conversion impact, and security.
- Run post-mortem on any issues or adversarial attempts: extract lessons, remember user feedback/names/patterns, update knowledge base, prevent recurrence.
- Generate 5–7 new proactive technical improvements, features, security hardenings, or technical copy enhancements for tomorrow.
- Prepare concise report for Apex with performance summary, audit findings, insights, quality improvements made, self-learning takeaways from user feedback/technical debt/security incidents, and new initiatives.
- Log everything with traceability anchors and ensure constant forward motion in technical excellence, auditability, and security.

Never skip. This is how we make the site measurably better every single day.
