# ORCA Matrix and Halt Template (Shared)

**Purpose:** Single shared reference for traceability matrix schema and deviation-halt format. Every ORCA agent and product should use this structure. See ORCA_CORE_REFERENCE.md for full phase format and behavior.

**For agents:** Use this schema **internally** (create/update matrix, log halt JSON). Do **not** dump the matrix or halt JSON into the chat in normal replies. If the user asks for an audit ("Run ORCA audit", "Show matrix"), you may then show a summary or the relevant matrix/halt for that request.

---

## 1. Traceability Matrix Schema

Create or load at **task/session start**. Update every phase.

**Columns (minimum):**

| Column      | Meaning |
|------------|--------|
| **Task**   | Phase name or task identifier. |
| **Evidence** | Output, artifact, or proof produced (e.g. file path, summary, anchor). |
| **Status** | Pass \| Fail. |
| **Log**    | Structured log entry for this row (see §2 below). |
| **Timestamp** | ISO 8601 (e.g. `2026-02-26T12:00:00-05:00`). |

**Example (text/JSON):**

```json
[
  {"Task": "Start", "Evidence": "Matrix created", "Status": "Pass", "Log": {"TASK": "Start", "STATUS": "Pass", "DETAILS": "Matrix created", "TIMESTAMP": "2026-02-26T12:00:00-05:00"}, "Timestamp": "2026-02-26T12:00:00-05:00"},
  {"Task": "Phase 1 Mandate", "Evidence": "[summary]", "Status": "Pass", "Log": {"TASK": "Mandate", "STATUS": "Pass", "DETAILS": "...", "CHECK": "...", "TOOL": "...", "TIMESTAMP": "..."}, "Timestamp": "..."}
]
```

**Per-phase log schema (used inside Log column):**

```json
{"TASK": "<phase name>", "STATUS": "Pass|Fail", "DETAILS": "<summary>", "CHECK": "<validation>", "TOOL": "<if any>", "TIMESTAMP": "<ISO8601>"}
```

---

## 2. Deviation Halt Format

On skip/drift/missing validation/reversibility violation: **halt immediately** (log this JSON internally). Do not proceed. Notify founder. Resume only after fix. **In agent replies:** respond in natural language (e.g. "Can't do that — risk too high; let's adjust X."); do not reply with raw JSON unless the user asked for an audit.

**Standard halt (JSON):**

```json
{"ORCA": "v1", "STATUS": "Fail", "DETAILS": "<reason>", "TOOL": "<tool or None>", "TIMESTAMP": "<ISO8601>"}
```

**Example:**

```json
{"ORCA": "v1", "STATUS": "Fail", "DETAILS": "Matrix creation failed", "TOOL": "None", "TIMESTAMP": "2026-02-26T12:05:00-05:00"}
```

**Moby veto / governance halt:** Use same structure; DETAILS can reference VETO_PROTOCOL (e.g. "Compliance below threshold", "Reversibility misclassification"). Log veto with anchor and notify Apex.

---

## 3. Anchor Format (for resumption)

Per phase, emit an anchor so work is resumable:

```
Current Step: [phase name or number] | Next: [next phase] | Thread: [id] | Status: Pass|Fail | Resumption Point: [optional]
```

On halt: set `Status: Fail` and `Resumption Point` to the phase/task to resume after correction.

---

*Reference: ORCA_CORE_REFERENCE.md, VETO_PROTOCOL.md, persona SAFETY.md (Deviation halt), REVERSIBILITY_TIERS.md.*
