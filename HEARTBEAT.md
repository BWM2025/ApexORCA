# HEARTBEAT.md

# Nightly (2AM): Run memory_consolidation.sh; consolidate dailies to MEMORY.md; check open projects.
# Hourly: Run build-all-files-markdown.py && build-manifest-tree.py; ensure consistency.
# On mismatch: Run build scripts; notify founder.

# Felix-style checklist (from FELIX_YOUTUBE_TRANSCRIPT_INTEL): use for periodic checks.
# - Check daily note (memory/YYYY-MM-DD.md) for open projects that should have sessions running.
# - If a session died → restart it; don't report. If finished → report to founder.
# - Run memory consolidation: scripts/memory_consolidation.sh (or nightly cron at 2am).
# - Update MEMORY.md from dailies when consolidating.
# - X: if PROMO_QUEUE has drafts and TWITTER_* env is set, post 1–2/day per protocol (autonomous).
