# OpenClaw Skill Allowlist — ApexORCA Pod

**Purpose:** Approved OpenClaw skills/sources the pod may use. Reduces supply-chain risk: only skills on this list are considered vetted for autonomous use. Add or remove entries as you adopt or retire skills.

**Founder:** B.W. Moore · **Date:** February 2026

---

## 1. Approved skills (use these)

| Skill / source | What it does | Who may use | Notes |
|----------------|--------------|-------------|--------|
| **Built-in tools** (read, edit, write, exec, browser, message, web_fetch, memory_*, sessions_*, subagents) | Core OpenClaw tool set | All pod agents per TOOL_INVENTORY_AND_CAPABILITIES.md | No external skill; allowlist N/A. |
| **post_tweet_env.sh** | Post to X via API | Sonar, Apex (or delegated) | Exec allowlist; requires TWITTER_* in env. |
| **send_email_resend.ts** | Send email via Resend | Echo, Apex (or delegated) | Exec allowlist; requires RESEND_API_KEY, EMAIL_FROM. |
| **web_search** (Brave) | Web search | Sonar, Echo | Requires Brave API key in OpenClaw config. |

**If you add OpenClaw plugins or third-party skills later:** Add them here with name, purpose, who may use, and any version/pin (e.g. “sentry-pro @ 1.2.0”).

---

## 2. Not approved / do not use

- **Unlisted third-party skills:** Do not enable or invoke OpenClaw skills from unknown or unlisted sources until they are added to §1.
- **Arbitrary exec:** Only scripts and commands explicitly allowed in the exec allowlist (and referenced in TOOL_INVENTORY or here) may be run.

---

## 3. How to add a new skill

1. Decide what the skill does and which agent(s) may use it.
2. Add one row to the table in §1 (skill name, what it does, who, notes).
3. If it uses exec, ensure the exec allowlist in OpenClaw config allows the path/command.
4. If it’s a paid API (e.g. Brave), document in TOOL_INVENTORY and set financial guardrail per AUTONOMOUS_OPERATING_PARAMETERS.md §5.

---

*This is the single allowlist for “approved” OpenClaw skills. Keep it in sync with TOOL_INVENTORY_AND_CAPABILITIES.md.*
