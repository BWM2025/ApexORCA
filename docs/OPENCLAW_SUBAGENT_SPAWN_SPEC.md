# OpenClaw Subagent Spawn Spec (for Apex / Oreo / Team)

**Purpose:** Avoid spawn errors and ensure subagents run correctly. Follow this when using the spawn/sessions tool.

---

## Rule: `mode="session"` requires `thread=true`

OpenClaw returns:
```text
"error": "mode=\"session\" requires thread=true so the subagent can stay bound to a thread."
```
when you spawn with `mode="session"` but omit `thread: true`.

---

## What to do

| Use case | Parameters |
|----------|------------|
| **One-shot task** (clone repo, run script, report back) | `mode="run"` — no thread needed. Subagent runs to completion and auto-reports. |
| **Persistent session** (ongoing chat, multi-turn) | `mode="session"` **and** `thread: true`. Always include `thread: true` when using session mode. |

**For all agents (Apex, Oreo, etc.):** When spawning sub-agents, use `mode="run"` for one-shot tasks or `mode="session"` with **thread=true** for persistent sessions. Do not use `mode="session"` without thread=true.

---

## Reference

- OpenClaw docs: https://docs.openclaw.ai/tools/ (sessions/spawn).
- This spec is the source of truth for the ApexORCA team so spawns do not fail with the thread error.
