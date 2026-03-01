# OpenClaw cron — one example

**Purpose:** Document how to add a single cron job so the gateway (or agent) runs on a schedule. No new paid scheduler; OpenClaw cron only. Reference: FELIXCRAFT_INTEL_GAP_CHECKLIST_AND_MASTER_SPEC.md §5.4.

---

## Add cron via OpenClaw CLI

OpenClaw supports scheduled jobs. Use the workspace that points to this codebase so cron runs in the same context as HEARTBEAT and scripts.

**One example: daily report or scheduled X post**

1. Ensure the gateway is running and the workspace is this repo (see `docs/OPENCLAW_SETUP_DONE_NEXT_STEPS.md`).
2. Register a cron job via OpenClaw (exact syntax depends on your OpenClaw version; see [docs.openclaw.ai](https://docs.openclaw.ai) for `cron` tool):
   - **Example (conceptual):** Schedule a daily run at 02:00 that triggers memory consolidation and a short report:
     - Job: run `scripts/memory_consolidation.sh` from workspace root (or have the agent run HEARTBEAT checklist and report).
   - **Example (scheduled X):** Schedule a run at 12:00 and 18:00 that has the agent check PROMO_QUEUE and post one item per `packages/agent-configs/personas/sonar/X_POSTING_PROTOCOL.md` (max 2 posts/day per rate limit).
3. Persist the job so it survives gateway restarts (if your OpenClaw install supports persisted cron).

**Minimal doc example (no script):**

- **What:** One cron job, e.g. “Daily at 2 AM: run memory consolidation and update MEMORY.md.”
- **How:** In OpenClaw workspace, add a cron entry (via CLI or config) that invokes the agent or `scripts/memory_consolidation.sh` at 2 AM local time.
- **Where:** Workspace = this codebase; env loaded via `scripts/start-openclaw-gateway-with-env.sh` so scripts have access to the same env.

---

*This satisfies the spec: one documented cron example. No paid scheduler required.*
