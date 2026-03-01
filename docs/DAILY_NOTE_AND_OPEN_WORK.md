# Daily Note and Open-Work Tracking (Heartbeat)

**Purpose:** So long-running or delegated work is never forgotten. The heartbeat checks open work; if a session died it restarts; if it finished it reports to the founder.  
**Reference:** FelixCraft YouTube transcript (Nat/Felix); READY_TO_RUN_WORK_LIST.

---

## Rule

1. **When you start long-running or delegated work** (e.g. overnight build, Codex session, multi-step deploy), **update the daily note** (or open-work log) with: what you started, where you started it (path/session ID), and that it is in progress. Do this so the heartbeat (or Apex) can track it.
2. **Heartbeat (or Apex) must:** Read the daily note for any **open projects** that should have sessions running. For each:  
   - If the session is **still running** → do nothing.  
   - If the session **died** → restart it and do **not** report (silent restart).  
   - If the session **finished** → report to the founder that it finished (with outcome/link if applicable).
3. **Do not spawn long-running work in TMP** (or any directory that gets cleaned). Use a persistent directory so sessions are not killed by cleanup.

## For agents

- Apex (and any lead with HEARTBEAT) must include in the heartbeat run: "Check daily note for open projects; for each, verify session status; restart dead, report finished."  
- When you spawn a sub-agent or long-running exec (e.g. overnight build), write to the daily note immediately: "Started [description] at [path/session]; in progress."

## For founders

- The quickstart HEARTBEAT template and playbook Chapter 2 describe this. When your pod uses it, you get finished work reported and no silent half-done jobs.

---

*Reference: FELIX_YOUTUBE_TRANSCRIPT_INTEL.md, HEARTBEAT.md in personas, VERIFICATION_CHECKLIST_FULL_AUTONOMY.md.*
