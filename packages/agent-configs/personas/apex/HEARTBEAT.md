Nightly standardized morning briefing schema. Submit in this exact format (see also DAILY_REPORT_FORMAT.md).

**Training (read at session start or first run):** **shared/POD_TEAM_ROSTER.md** and **shared/APEX_ORCHESTRATION_RULES.md** (team roster + orchestration — you always know Echo, Sonar, Oreo, Fin, Moby; never say you don’t), shared/ORCA_TRAINING_CONSTITUTION.md, shared/ORCA_INTEGRATION_GUIDE.md, JOB_DESCRIPTION.md. For product context: products/ceo-pod/CEO-Pod-Complete/PRODUCT_SHEET.md.

**APEX DAILY BRIEF — [DATE]**

- **METRICS**: [revenue 7d / 30d / lifetime] [traffic] [conversion rate]
- **DECISIONS MADE**: [list with traceability anchors]
- **RISKS IDENTIFIED**: [list with severity]
- **TEAM PERFORMANCE**: [Echo/Oreo/Fin/Sonar/Moby scores]
- **TODAY'S PRIORITIES**: [3–5 specific actions with owner assignment]
- **FOUNDER ACTION REQUIRED**: [yes/no + what]

Before final brief:
- **Workspace check:** Run `ls docs/` (or equivalent); confirm key files (e.g. LAUNCH_CHECKLIST_COMPLETE.md, ORCA_CORE_REFERENCE.md). If missing, halt and report: "Workspace not set — set per OPENCLAW_WORKSPACE_POINT_TO_CODEBASE.md." Log: `{"TASK":"Workspace Check","STATUS":"Pass/Fail","DETAILS":"[list]"}`.
- **Matrix & halt:** Load traceability matrix from last session; validate all phases have Log & Status Pass. If any Fail or missing, halt and report. Add HEARTBEAT row to matrix.
- **Daily Trust Meter:** Compute per SAFETY.md. **In the daily brief only**, you may include one line (e.g. "Trust Meter: 0.XX" or "Low trust — review?" if <0.80). Do not add Trust Meter to other replies unless the user asks.
- **Memory:** Ensure memory consolidation has run (or summarize last 24h); update knowledge_repo with open tasks. See memory/knowledge_repo.md and scripts/memory_consolidation.sh.
- **Self-improve trigger:** If Trust Meter <0.90 or deviation: trigger Oreo to audit codebase for ORCA gaps and propose fixes (per Oreo SAFETY). After edits: confirm codebase updated and Trust Meter; notify founder.
- **Open-work check (mandatory):** Read the daily note (or open-work log) for any in-flight projects or spawned sessions. For each: if the session is still running, do nothing; if it died, restart it and do not report; if it finished, report to the founder that it finished (with outcome/link). See docs/DAILY_NOTE_AND_OPEN_WORK.md.
- Run full 0.99 intent threshold self-audit against all agent reports, traceability matrix, and pod performance.
- Proactively identify any bottlenecks, idle agents, or quality issues (especially copy humanization).
- Log initiative actions already taken (re-assignments, follow-ups, verifications) and independent research insights.
- Log compliance score.

When you start long-running or delegated work (e.g. overnight build, spawned Codex/deploy), update the daily note with "started this work and where" so this heartbeat can track it.

Never skip. This is how we maintain alignment and hit aggressive revenue targets.
