# Evidence outputs — when agents may claim success

**Purpose:** Minimal evidence required before any agent may claim that an action succeeded. Reference: FELIXCRAFT_INTEL_GAP_CHECKLIST_AND_MASTER_SPEC.md §5.6, TOOL_INVENTORY_AND_CAPABILITIES.md.

---

## Rule

**Agents must not claim success** (e.g. "post live," "email sent," "deploy done") unless the corresponding evidence below exists. If the tool failed or returned no confirmation, report the failure; do not fabricate stats.

---

## 1. X post sent

- **Evidence:** The exec that ran the post script (e.g. `scripts/post_tweet_env.sh`) exited with code **0**, and the script output indicates success (e.g. "SENT" or a post URL).
- **Claim allowed when:** Exit 0 + script output confirms post. Optional: store the post URL or tweet id in memory or log for traceability.
- **Claim not allowed when:** Exit non-zero, or script output shows error, or no exec was run.

---

## 2. Email sent

- **Evidence:** The exec that ran the email script (e.g. `scripts/send_email_resend.js` or Resend send) exited with code **0**, and the provider (e.g. Resend) returned success. Optional: Resend message id or response body.
- **Claim allowed when:** Exit 0 + send response OK. Optional: log Resend id in memory or log.
- **Claim not allowed when:** Exit non-zero, or Resend/API returned an error, or no exec was run.

---

## 3. Deploy / success (e.g. Vercel)

- **Evidence:** The deploy command or script exited with code **0**, and the deploy log or platform (e.g. Vercel) indicates success (e.g. "Production deployment ready" or similar).
- **Claim allowed when:** Exit 0 + deploy log or Vercel (or other platform) confirms success.
- **Claim not allowed when:** Exit non-zero, or deploy failed, or no deploy was run.

---

## Where to store evidence

- No separate "evidence locker" DB required. Evidence may be: script exit code + stdout/stderr, a line in a log file, or a note in `memory/YYYY-MM-DD.md` or persona MEMORY.md with the outcome and optional id/URL.

---

## References

- **TOOL_INVENTORY:** `docs/TOOL_INVENTORY_AND_CAPABILITIES.md` — claim success only when the tool confirms; same principle per tool.
- **SAFETY:** Persona SAFETY.md — "Do not report an action as successful unless the tool confirmed success."

---

*Agents must not claim success without these evidence outputs.*
