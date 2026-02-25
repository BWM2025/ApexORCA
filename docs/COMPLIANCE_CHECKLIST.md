# ApexORCA.io — Compliance Checklist

**Operator:** Toronto, Canada. **Offerings:** Global (digital products).  
**This is not legal advice.** Have a qualified lawyer or compliance advisor review for your situation.

---

## 1. What Compliance Applies to You

| Area | Applies? | Notes |
|------|----------|--------|
| **PIPEDA (Canada)** | ✅ Yes | You collect email + purchase data; Canadian federal privacy law applies. |
| **Ontario / provincial** | ✅ Yes | Consumer protection, contract law; Toronto = Ontario. |
| **GDPR (EU/EEA)** | ⚠️ If you have EU customers | If you sell to or target EU/UK, GDPR applies (lawful basis, rights, etc.). |
| **CCPA/CPRA (California)** | ⚠️ If you have California users | If you have Cal. residents’ data, disclosure/rights may apply. |
| **PCI-DSS (payment cards)** | ✅ Delegated to Stripe | You do not store card data; Stripe is PCI-compliant. You are not in scope for card storage. |
| **Accessibility (e.g. WCAG)** | Optional | No legal requirement in Canada for private sites; consider best-efforts statement. |

---

## 2. Current State in Codebase

| Item | Status | Where |
|------|--------|--------|
| **Card data** | ✅ Not stored | Stripe Checkout; no PAN/card in your DB or logs. |
| **Personal data stored** | ✅ Defined | `purchases` table: `user_email`, `product_id`, `session_id`, `amount`, `purchased_at`. See `lib/compliance.ts` and webhook. |
| **Data processing summary** | ✅ In code | `apps/web/lib/compliance.ts` — single source of truth for “what we collect/process” (feeds Privacy/Terms and audits). |
| **Privacy Policy** | ❌ Missing | No `/privacy` page; required for PIPEDA (notice) and GDPR if EU. |
| **Terms of Service** | ❌ Missing | No `/terms` page; needed for refunds, liability, governing law. |
| **Cookie/consent** | ⚠️ Minimal | Next.js may set session cookies; no analytics in code. If you add analytics or non-essential cookies, add consent (e.g. banner) and document in Privacy. |
| **Data retention** | ❌ Not in code | No automated purge; retention should be stated in Privacy and optionally implemented (e.g. Supabase job or policy). |
| **User rights (access/erasure)** | ❌ No flow | PIPEDA/GDPR expect way to access/correct/delete data; no in-app flow yet. Document in Privacy and add process (manual or form). |
| **Footer disclaimer** | ✅ | Jurisdiction + “not legal advice” + third-party names. |
| **Enterprise checklist (product copy)** | ✅ | Playbook mentions “GDPR, HIPAA, SOX, IRB ready” as product feature; that’s template readiness, not your app’s compliance. |

---

## 3. Gaps to Address

1. **Privacy Policy (`/privacy`)**  
   - What you collect (email, purchase data).  
   - Purpose (fulfillment, support, legal).  
   - Legal basis (PIPEDA consent; GDPR if applicable).  
   - Retention, storage (Supabase), third parties (Stripe, Supabase, hosting).  
   - Rights (access, correction, erasure, complaint) and contact.  
   - Keep in sync with `lib/compliance.ts`.

2. **Terms of Service (`/terms`)**  
   - Use of site and products, refunds, limitation of liability, governing law (Ontario/Canada), dispute resolution.

3. **Consent**  
   - PIPEDA: notice + meaningful consent. Privacy Policy + checkout (Stripe collects email) is often sufficient; confirm with counsel.  
   - If you add non-essential cookies or targeting, add consent mechanism and document in Privacy.

4. **Data retention**  
   - Define in Privacy (e.g. purchase records X years). Optionally implement in Supabase (scheduled delete or policy).

5. **User rights**  
   - Provide contact (e.g. email) for access/erasure requests; document in Privacy. Optionally add a simple “Contact us about your data” link.

---

## 4. What Is in the Code (Compliance-Relevant)

- **`apps/web/lib/compliance.ts`**  
  - Exports `DATA_PROCESSING` (what you collect, where, purpose, third parties). Use for Privacy Policy and audits.

- **Stripe webhook**  
  - Writes only `product_id`, `user_email`, `session_id`, `amount` to `purchases`. No card data.

- **Dashboard API**  
  - Reads `purchases` for “recent decisions”; no extra PII exposed beyond what’s stored.

- **No analytics/tracking in repo**  
  - If you add later, document and get consent if required (e.g. EU).

---

## 5. Summary

- **You have:** No card storage (PCI delegated to Stripe), clear personal data scope (email + purchase data), jurisdiction and disclaimers in footer, and a single place in code (`lib/compliance.ts`) that describes data processing for compliance and Privacy.
- **You do not have yet:** Privacy Policy, Terms of Service, data retention policy in practice, or a formal user-rights flow (access/erasure). Adding `/privacy` and `/terms` and linking them from the footer will address the main compliance gaps for Canada and set you up for GDPR if you have EU users.

**End of checklist.**
