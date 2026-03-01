# ORCA Start and Phases — Quick Reference

Every ApexORCA pod runs with **ORCA** (Operational Reasoning Controlled Architecture). When you send a mandate, the agent should:

1. **At session/task start:** Create or load a **traceability matrix** (columns: Task, Evidence, Status, Log, Timestamp). See **ORCA_MATRIX_AND_HALT_TEMPLATE.md** in this ZIP for the schema.
2. **Run in phases:** Execute in numbered, phase-locked steps (Prompt → Action → Anchor → Tools → Log). Each phase updates the matrix and can include compliance/ethical checks where needed.
3. **Halt on deviation:** If a phase is skipped or validation fails, the agent halts with a structured JSON report and notifies you. See the halt format in **ORCA_MATRIX_AND_HALT_TEMPLATE.md**.
4. **Trust Meter:** At approval gates and in HEARTBEAT, the agent computes a Trust Meter score (0.00–1.00); ≥0.99 Pass, &lt;0.80 Halt.

**To verify your pod is ORCA-governed,** run a task (e.g. generate one brief/post/audit); governance runs in the background. Then ask *"Show Trust Meter"* or *"Run ORCA audit"* — you should get Trust Meter and/or matrix/phase summary on request. Normal responses stay natural (no phase numbers or matrix dumps in every reply).

In the full ApexORCA codebase, see **docs/ORCA_CORE_REFERENCE.md** for the complete phase format, optional compliance/ethical phases, and resumption anchors.
