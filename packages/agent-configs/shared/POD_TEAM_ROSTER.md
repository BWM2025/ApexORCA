# Pod Team Roster — Who Is on the Team (CEO and All Agents)

**Purpose:** Single source of truth so **Apex (CEO) and every agent** have full awareness of the pod: who the agents are, their roles, where their configs live, and how to coordinate. Read this at session start so the CEO is never without team awareness.

---

## System access (all agents)

- **Workspace = entire codebase.** When OpenClaw `agent.workspace` points at the ApexORCA codebase (see docs/OPENCLAW_WORKSPACE_POINT_TO_CODEBASE.md), every agent has **full read access** to:
  - **docs/** — All deployment, setup, tool inventory, governance, and launch docs.
  - **packages/agent-configs/** — All persona configs (personas/apex, personas/echo, personas/oreo, personas/fin, personas/sonar, personas/moby), shared protocols, product sheets.
  - **scripts/** — Post, email, gateway, and utility scripts (exec when env and allowlist allow).
  - **memory/** — Shared memory, knowledge_repo, daily note, open-work log (see docs/DAILY_NOTE_AND_OPEN_WORK.md).
  - **apps/web**, **content**, **infra** — Full repo. No exclusions.
- **Credentials:** Env vars (X, Resend, etc.) are loaded from **openclaw.env** at repo root when the gateway is started with `scripts/start-openclaw-gateway-with-env.sh`. Full list: **CREDENTIALS_AND_ENV.md** (repo root).
- **Tool list and claim-success rules:** **docs/TOOL_INVENTORY_AND_CAPABILITIES.md** — all 21 OpenClaw tools, who can use what, when you may claim success.

---

## Pod roster (who is on the team)

| Agent | Role | Config path (workspace-relative) | Apex coordinates via |
|-------|------|-----------------------------------|------------------------|
| **Apex** | CEO — strategy, pod coordination, quality, outcomes | packages/agent-configs/personas/apex/ | — (you) |
| **Echo** | Marketing — copy, campaigns, humanization, X/email content | packages/agent-configs/personas/echo/ | sessions_spawn, sessions_send; audit Echo copy for humanization |
| **Sonar** | Growth — distribution, virality, X posting, lead lists | packages/agent-configs/personas/sonar/ | sessions_spawn, sessions_send; X_POSTING_PROTOCOL in personas/sonar/ |
| **Oreo** | Technical — build, deploy, security, ORCA codebase audits | packages/agent-configs/personas/oreo/ | sessions_spawn, sessions_send; overnight build technical lead |
| **Fin** | Operations — fulfillment, support, ops automation | packages/agent-configs/personas/fin/ | sessions_spawn, sessions_send |
| **Moby** | Governance — veto on Tier 3/irreversible, compliance, audit | packages/agent-configs/personas/moby/ | sessions_send for audit requests; Moby can veto; do not bypass |

All paths above are relative to the **workspace root** (the ApexORCA codebase). To read another agent’s IDENTITY or HEARTBEAT: e.g. `packages/agent-configs/personas/echo/IDENTITY.md`.

---

## How Apex stays aware of the team

- **Synthesize reports:** Read all agents’ **DAILY_REPORT_FORMAT** outputs (shared/DAILY_REPORT_FORMAT.md). They submit nightly; Apex synthesizes them into the APEX DAILY BRIEF (see personas/apex/HEARTBEAT.md).
- **Spawn and send:** Use **sessions_spawn** (mode=run or mode=session with thread=true per docs/OPENCLAW_SUBAGENT_SPAWN_SPEC.md) to assign tasks to Echo, Oreo, Fin, Sonar. Use **sessions_send** to send directives or share context. Use **agents_list** to see allowed agent IDs if needed.
- **Open-work and daily note:** Long-running or delegated work must be recorded in the daily note / open-work log so the heartbeat can check for dead or finished sessions (docs/DAILY_NOTE_AND_OPEN_WORK.md).
- **Memory:** Use **memory_search** / **memory_get** for prior decisions and knowledge_repo. Shared memory and traceability matrix keep decisions auditable across the pod.

---

## Reference

- **Apex orchestration (24/7, never claim no team awareness):** shared/APEX_ORCHESTRATION_RULES.md  
- **Training index (all materials):** shared/ORCA_TRAINING_INDEX.md  
- **Subagent spawn rules:** docs/OPENCLAW_SUBAGENT_SPAWN_SPEC.md  
- **Tool inventory (full access map):** docs/TOOL_INVENTORY_AND_CAPABILITIES.md  
- **Credentials and env:** CREDENTIALS_AND_ENV.md (repo root)
