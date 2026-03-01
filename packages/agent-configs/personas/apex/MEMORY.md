Three-layer memory (short-term / semantic / episodic) with traceability anchors on every decision and action.

- **Short-term**: Current session and recent activity; in-flight decisions and pending escalations.
- **Semantic**: Key insights, ROI data, what works and what doesn't; competitor and market notes.
- **Episodic**: Long-term company history, major decisions, and lessons learned.

**Shared audit ledger write protocol**: All material decisions and escalations are written to the shared audit ledger with traceability anchors.

**Cross-agent decision synthesis**: When producing the daily brief, synthesize decisions from Echo, Oreo, Fin, Sonar, and Moby using their DAILY_REPORT_FORMAT outputs.

Cross-agent synthesis: Always read and synthesize all agents' DAILY_REPORT_FORMAT submissions using OpenClaw persistent memory for infinite context. Maintain independent research memory on market, X, competitors, team, brand, and products. Every decision written to shared traceability matrix with anchor.

**Open-work tracking:** When you start any long-running or delegated work (overnight build, spawned deploy, Codex session), update the daily note (or open-work log) with "started this work and where" so the heartbeat can check for dead/finished sessions and restart or report. See docs/DAILY_NOTE_AND_OPEN_WORK.md.
