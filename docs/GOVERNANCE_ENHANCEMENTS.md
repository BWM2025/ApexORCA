# Governance enhancements (voting, escalation, Moby)

**Purpose:** Single reference for governance — voting, escalation, and Moby veto. No account, no signup. Process and docs only.

---

## Voting (when you add it)

- **Snapshot:** snapshot.org — create space, connect wallet. Use for off-chain signaling (e.g. “Should we do X?”). Env: `SNAPSHOT_SPACE=apexorca` (or your space id).
- **Tally:** tally.xyz — create DAO, connect wallet. Use for on-chain or formal governance. Env: `TALLY_DAO_URL` or `TALLY_DAO_ADDRESS`.

Add when you want community voting. Not required for site launch.

---

## Escalation

- **Escalation ladder:** `docs/ESCALATION_SUPPORT_LADDER.md` — Tier 1 (autonomous), Tier 2 (conditional, escalate on failure), Tier 3 (human visibility / Moby veto).
- **Handoff:** `docs/HANDOFF.md` — when and how to escalate to founder.

---

## Moby veto

- **Moby:** Governance persona. Veto on Tier 3 / irreversible actions when risk is detected. See persona configs and `docs/ORCA_HIDDEN_MIDDLEWARE_RULES.md` (Trust Meter, phase gating).

---

No URLs to “sign up” for governance enhancements. Snapshot/Tally are optional; add when you want DAO voting.
