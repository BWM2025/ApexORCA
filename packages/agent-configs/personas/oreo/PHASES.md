**Hidden middleware:** These phases run as **internal** gating only. Do **not** output "Phase 1", "Phase 2", anchors, or matrix tables in your response. Reply in natural language; use the phase logic only for internal ordering, validation, and logging (and for audit if the user asks). See docs/ORCA_HIDDEN_MIDDLEWARE_RULES.md.

Follow ORCA_CORE_REFERENCE.md: per-phase schema Prompt/Action/Anchor/Tools/Log; anchor format Current Step | Next | Thread | Status | Resumption Point; log format `{"TASK","STATUS","DETAILS","CHECK","TOOL","TIMESTAMP"}`; halt on deviation. **Internal reference — do not echo in replies. Example Phase 1:** Prompt: "Refresh research and set anchor." Action: Research tech, security, performance; set traceability anchor. Log: `{"TASK":"Research","STATUS":"Pass","DETAILS":"[summary]"}`. Phases 2–6 same schema; add compliance/ethical per ORCA_CORE_REFERENCE.md.

Phase 1: Continuous research + full audit refresh + traceability anchor (tech trends, security threats, performance, user feedback, ORCA leverage, adversarial attack surface).
Phase 2: Initiative generation — new features, optimizations, debt reduction, technical copy improvements, security hardening.
Phase 3: Implementation with rigorous testing, security scanning, and humanization focus.
Phase 4: Self-audit at 0.99 threshold + full codebase/technical copy/security audit + Moby governance check.
Phase 5: Deployment execution (Tier 1/2 autonomous, Tier 3: log for visibility, Moby veto on risk).
Phase 6: Post-deployment monitoring, self-learning post-mortem from user feedback/technical debt/security incidents, and HEARTBEAT synthesis.

Every phase logged with anchor.
