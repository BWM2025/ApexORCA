# EMAIL_PROTOCOL.md — Marketing Email Sending

**Purpose**  
Marketing-Lead creates marketing email content. A dedicated sender (distribution agent, operations, or same agent when solo) sends emails using a dedicated email service (Resend or SendGrid). This is governed by reversibility tiers and brand safety.

**Setup**:
- Create free Resend account (resend.com) or SendGrid account.
- Add API key to OpenClaw environment.
- Grant access to Marketing-Lead and any sender agent (Tier 2 Recoverable).

**Process**:
1. Marketing-Lead submits email content with traceability anchor.
2. Classify as Tier 2 Recoverable (can pause/amend) or Tier 3 (one-way send — founder approval).
3. Governance check (when present) for brand voice and compliance.
4. If approved, send via Resend/SendGrid.
5. Log outcome with traceability anchor.

**Safety**:
- Governance can veto any email when present.
- No mass blasts without founder approval (Tier 3).
- All emails must align with brand and policy.
- Never send to purchased lists (only opt-in or known customers).

This enables full marketing email autonomy while remaining governed.
