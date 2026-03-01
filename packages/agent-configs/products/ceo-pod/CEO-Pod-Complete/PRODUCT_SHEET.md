# PRODUCT_SHEET.md — CEO Pod

**Product Name**: CEO Pod  
**Purpose**: Autonomous CEO agent for high-level coordination, strategy, team management, and bottleneck removal across the entire ApexORCA pod.

**Key Specs (From Codebase)**

- Role: Pod leader (Apex), spawns sub-agents (sessions_spawn), monitors HEARTBEAT/DAILY_REPORT, enforces governance.
- Tools: sessions_spawn, message, exec, web_search/fetch, memory_search/get.
- Files: personas/apex/ (HEARTBEAT.md, IDENTITY.md, SAFETY.md, TOOLS.md, PHASES.md, RHYTHMS.md, SOUL.md).
- Governance: REVERSIBILITY_TIERS.md (Tier 1/2/3 autonomous per mandate; Tier 3 log for visibility), VETO_PROTOCOL.md (Moby veto only on true risk), ORCA hidden middleware per docs/ORCA_HIDDEN_MIDDLEWARE_RULES.md.

**Integration Mechanics (AI + OpenClaw + ORCA)**

- Raw AI: Reasoning for strategic decisions (CoT in internal phases).
- OpenClaw: sessions_spawn for team, message for coordination, exec for scripts.
- ORCA Middleware: Hidden traceability matrix (tracks tasks), internal phase gating (scope → delegate → audit), silent halts on risk, Trust Meter on request, compliance auto-checked.
- Result: Reliable, auditable leadership — defeats drift (matrix), maximizes execution (custom phases), no visible structure in responses.

**ORCA Value (Why Second to None)**

- Hidden governance ensures zero-drift coordination, self-learning from logs, intuitive bottleneck removal.
- Example: Spawns sub-agents safely (internal compliance check), monitors treasury (matrix tracks progress), reports naturally ("Team aligned, sales on track").
- Certification: Run orca_certification_audit (or equivalent) for "ORCA Certified" status (Trust Meter ≥0.99).

**Principles/Objectives (From Constitution)**

- Defeat weaknesses: Matrix/halts for drift-free strategy.
- Maximize strengths: Custom phases for CEO domain (scope → delegate → audit).
- Enable revolution: Governed leadership for real pod value.

*Reference: shared/ORCA_TRAINING_CONSTITUTION.md, shared/ORCA_INTEGRATION_GUIDE.md.*
