# One Codebase — Same View for You and OpenClaw

**ApexORCA.io — © 2026. Founder: B.W. Moore**

This doc states how the codebase stays **one source of truth** for you (Cursor) and the agent team (OpenClaw), with controls so the agents don’t break it.

---

## 1. One codebase, full access

- **There is one codebase.** It lives at: **ApexORCA.io FEB 2026** (the folder that contains **ApexORCA Code Base**, the all-in-one file, and the manifest tree).
- **You (Cursor)** work in that folder. What you see in your sidebar is the codebase.
- **OpenClaw (Apex, Oreo, Echo, the pod)** must use **the same folder** as their workspace. When OpenClaw’s config points at that path, the agents see and edit the same files you see. No second copy, no “their” vs “your” codebase.
- **Full access:** OpenClaw has **full read and write access to every file and folder** under the workspace path. There are no exclusions — every file we put into this codebase is accessible to the Claw/OpenClaw agents. Verification: docs/OPENCLAW_FULL_ACCESS_WORKSPACE_VERIFICATION.md.
- **So:** Point OpenClaw’s workspace at the path that contains the codebase (see docs/OPENCLAW_WORKSPACE_POINT_TO_CODEBASE.md). After that, you and the team are looking at the same codebase. That is possible and maintainable.

---

## 2. Full access with controls (no one fucks it up)

- The agents have **full access** to read and edit the codebase so they can run the company autonomously: optimize, improve, fix, deploy (within the rules).
- They do **not** get to ignore guardrails. Controls in place:
  - **REVERSIBILITY_TIERS.md** — Tier 1/2/3 autonomous per mandate; Tier 3 log for visibility, Moby veto on risk.
  - **AUTONOMOUS_OPERATING_PARAMETERS.md** — What Oreo and Echo may do without asking; what is Tier 3 (log for visibility) (Stripe, schema, legal, etc.).
  - **Oreo SAFETY.md** — Pre-deploy checklist; no deploy that breaks the site or checkout.
  - **VETO_PROTOCOL.md** — Moby can halt any action for Apex review.
- So: full access to do their job; Tier 3 (pricing/legal/Stripe/schema/irreversible) executed per mandate with log; Moby veto on risk.

---

## 3. Keeping everything in sync (all-in-one + manifest)

Whenever the codebase is updated (by you in Cursor or by the agents in OpenClaw), the **all-in-one file** and **manifest tree** must stay in sync so the “single source of truth” stays accurate.

**Why the all-in-one matters:** **APEXORCA_ALL_FILES_IN_ONE.md** is the single markdown file used to communicate the full codebase to other LLMs (e.g. ChatGPT, Claude, other tools that accept a large context file). It must be **regenerated every time the codebase is modified** so those LLMs always see the current state. Same rule: run the script and update the manifest whenever files are added, removed, or moved.

**Rule for everyone (you and the pod):**

- After adding, removing, or moving files under **ApexORCA Code Base**, run:
  1. **Regenerate all-in-one:**  
     From the **ApexORCA Code Base** directory:  
     `python3 scripts/build-all-files-markdown.py`  
     (This updates **APEXORCA_ALL_FILES_IN_ONE.md** at the workspace root.)
  2. **Regenerate manifest tree:** Run `python3 scripts/build-manifest-tree.py` (updates **APEXORCA_FULL_MANIFEST_AND_TREE.md** tree + Last sync).
  3. **If needed:** Edit the manifest Full manifest tables to add descriptions for new key files.

**Oreo (and any agent that edits the codebase):** When you commit or push changes that add/remove/move files, run the steps above and include the all-in-one and manifest updates in the same commit (or the next one). This keeps the codebase, all-in-one, and manifest one consistent set. Reference this doc: docs/ONE_CODEBASE_SAME_VIEW.md.

---

## 4. Summary

| Question | Answer |
|----------|--------|
| Same codebase for me and OpenClaw? | Yes. Point OpenClaw’s workspace at the folder that contains the codebase. Then we’re all looking at the same files. |
| Can the team run autonomously with full access? | Yes. They have full read/edit access within REVERSIBILITY_TIERS and AUTONOMOUS_OPERATING_PARAMETERS. |
| Can they mess up the code without controls? | No. Tier 3 and dangerous changes: execute per mandate, log; Moby veto on risk. Pre-deploy checklist and Moby veto apply. |
| How do all-in-one and manifest stay updated? | After any change that adds/removes/moves files, run the script and update the manifest (you or Oreo). Oreo is responsible when the pod makes the change. |
| Why must the all-in-one be updated every time? | The founder uses APEXORCA_ALL_FILES_IN_ONE.md to share full codebase context with other LLMs; it must reflect the current codebase at all times. |

One codebase, same view, full access with guardrails, and a single rule to keep the all-in-one and manifest in sync.
