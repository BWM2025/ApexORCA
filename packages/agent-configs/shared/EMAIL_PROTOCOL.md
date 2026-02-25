# EMAIL_PROTOCOL.md — Marketing Email Sending

**Purpose**  
Echo creates marketing email content. Sonar or Fin sends emails using a dedicated email service (Resend or SendGrid). This is governed by ORCA DNA.

**Setup**:
- Create free Resend account (resend.com) or SendGrid account.
- Add API key to OpenClaw environment.
- Give the key to Echo and Sonar only (Tier 2 Recoverable).

**Process**:
1. Echo submits email content with traceability anchor.
2. Sonar or Fin classifies as Tier 2 Recoverable.
3. Moby checks for brand voice and compliance.
4. If approved, send via Resend/SendGrid.
5. Log outcome with traceability anchor.

**Safety**:
- Moby can veto any email.
- No mass blasts without Apex approval (Tier 3).
- All emails must link to dashboard or playbook.
- Never send to purchased lists (only opt-in or Stripe customers).

This enables full marketing email autonomy while remaining governed.
