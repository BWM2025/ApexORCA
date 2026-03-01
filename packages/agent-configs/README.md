# Agent configs — your prepared agent folders

**All your extensively prepared agent folders are here.** Nothing in this tree was removed.

## Where everything lives

| What | Path |
|------|------|
| **Personas (main pod)** | `personas/` — **apex**, **echo**, **sonar**, **oreo**, **fin**, **moby**, biggie, biggie-trading |
| **Shared protocols** | `shared/` — ORCA training, DAILY_REPORT_FORMAT, POD_TEAM_ROSTER, VETO_PROTOCOL, etc. |
| **Product bundles** | `products/` — CEO Pod, Marketing Pod, Technical Pod, Operations Pod, Growth Engine, Pod Orchestrator, Governance Booster (each with *-Complete, Lead persona, Shared, Quickstart, INSTALL, README) |
| **Quickstart** | `quickstart/` — setup scripts that copy personas into OpenClaw workspace |

Each persona folder (e.g. `personas/apex/`) contains IDENTITY.md, HEARTBEAT.md, JOB_DESCRIPTION.md, SAFETY.md, TOOLS.md, PHASES.md, MEMORY.md, SOUL.md, RHYTHMS.md, and any protocol/initiative docs.

## So OpenClaw sees them

OpenClaw must use **this repo** as its workspace. In `~/.openclaw/openclaw.json` set:

```json
"agent": { "workspace": "/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base" }
```

Then the gateway has full access to `packages/agent-configs/` (and docs, scripts, memory). If the workspace was pointing at `~/.openclaw/workspace` instead, OpenClaw would be reading from there, not from this codebase. See **docs/OPENCLAW_WORKSPACE_POINT_TO_CODEBASE.md**.

## Quick copy to ~/.openclaw/workspace (optional)

If you want a copy in the default OpenClaw workspace:

```bash
CODEBASE="/Users/RECESS1/Desktop/ApexORCA.io FEB 2026/ApexORCA Code Base"
mkdir -p ~/.openclaw/workspace/personas
cp -R "$CODEBASE/packages/agent-configs/personas/"* ~/.openclaw/workspace/personas/
cp -R "$CODEBASE/packages/agent-configs/shared" ~/.openclaw/workspace/
```

**Recommended:** Point the workspace at the codebase (above) so there is one source of truth and no sync issues.
