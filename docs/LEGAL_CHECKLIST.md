# ApexORCA.io — Legal, Copyright, Trademark & Disclaimers Checklist

**Purpose:** Expert-style checklist for software/digital products. Operator: Toronto, Canada. Offerings: global.  
**Disclaimer:** This is not legal advice. Have a qualified lawyer (e.g. Ontario/Canadian tech counsel) review before launch.

**Related:** See **COMPLIANCE_CHECKLIST.md** for privacy (PIPEDA/GDPR), payment (PCI), data processing, and code references (`lib/compliance.ts`).

---

## 1. Copyright

| Item | Status | Notes / Action |
|------|--------|----------------|
| **Ownership statement** | ✅ | `lib/products.ts`: "© 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore" |
| **Root LICENSE** | ✅ Updated | Proprietary; add year and owner (see below). |
| **Footer copyright** | ✅ Updated | "© 2026 ApexORCA.io. All rights reserved." + jurisdiction. |
| **Source files** | Optional | Critical files (e.g. products, core libs) can carry a short © line; not required in every file. |
| **Year** | ✅ | Use 2026 consistently. |

**Recommendation:** If you operate under a registered business (e.g. Canadian corporation), use the legal entity name in footer and LICENSE (e.g. "© 2026 [Legal Entity Name]. All rights reserved.").

---

## 2. Trademark

| Item | Status | Notes / Action |
|------|--------|----------------|
| **ApexORCA / ApexORCA.io** | ⚠️ | Use consistently. Consider ™ on first prominent use (e.g. "ApexORCA™" in hero or footer) until registered. |
| **ORCA Governance DNA™** | ✅ | Already used with ™ in competitor-comparison.tsx. |
| **Logos** | ✅ | Alt text "ApexORCA" is fine; no need for ™ in alt. |
| **Third-party names** | ✅ | FelixCraft.ai, OpenClaw, CrewAI, Auto-GPT, LangChain used for factual comparison; no claim of affiliation. Add "X" if referring to platform (Twitter → X). |

**Recommendation:** For Canada + global, consider trademark search and registration in Canada and key markets (e.g. US). Document first use in commerce (e.g. date of first sale).

---

## 3. Disclaimers

| Item | Status | Notes / Action |
|------|--------|----------------|
| **General disclaimer** | ✅ Added | Footer: "Not legal, tax, or professional advice. Digital products as-is." |
| **AI / automation** | ⚠️ | Recommend in Terms: outcomes depend on user setup; no guarantee of results; AI outputs not warranted. |
| **Financial / investment** | ✅ | No crypto on site; dashboard shows USD. No investment advice. |
| **Jurisdiction** | ✅ Added | Footer: "Offered from Toronto, Canada." so users know governing law base. |
| **Limitation of liability** | ❌ | Needs full Terms of Service (see below). |

---

## 4. Terms of Service & Privacy Policy

| Item | Status | Notes / Action |
|------|--------|----------------|
| **Terms of Service** | ❌ Missing | **Recommended:** Add `/terms` page and link in footer. Cover: use of site, purchase terms, refunds (Stripe/digital goods), disclaimer of warranties, limitation of liability, governing law (Ontario/Canada), dispute resolution. |
| **Privacy Policy** | ❌ Missing | **Recommended:** Add `/privacy` page and link in footer. Cover: what you collect (email, payment via Stripe), how used, retention, third parties (Stripe, hosting), Canada PIPEDA + global (e.g. GDPR if you have EU users), contact. |
| **Cookie / consent** | ⚠️ | If using non-essential cookies or analytics (e.g. EU visitors), consider banner or consent; otherwise note in Privacy. |

**Recommendation:** Before offering globally, add at least basic Terms and Privacy; link both in footer. Have a lawyer tailor them for Ontario/Canada and any target jurisdictions.

---

## 5. Consumer-Facing (Canada + Global)

| Item | Status | Notes / Action |
|------|--------|----------------|
| **Pricing** | ✅ | USD with $; clear one-time purchase. |
| **Refunds** | ⚠️ | Define in Terms (e.g. per Stripe/digital-goods policy; no refund once download link sent). |
| **Contact** | ⚠️ | Provide contact (e.g. email or form) for support and legal inquiries; consider adding to footer. |
| **Accessibility** | Optional | Note any commitment (e.g. best efforts toward WCAG) in Terms or separate statement. |

---

## 6. Logos & Brand Assets

| Item | Status | Notes / Action |
|------|--------|----------------|
| **Your logos** | ✅ | Used with consistent alt text "ApexORCA"; no third-party logos claimed as yours. |
| **Third-party logos** | N/A | Not used; competitor names are text only (appropriate). |

---

## 7. Summary of Changes Applied (Codebase)

- **Footer:** Copyright "© 2026 ApexORCA.io. All rights reserved."; jurisdiction "Offered from Toronto, Canada."; short disclaimer "Not legal, tax, or professional advice. Digital products as-is."
- **LICENSE:** Year and owner added (2026, ApexORCA.io / B.W. Moore).
- **This checklist:** Created `docs/LEGAL_CHECKLIST.md` for ongoing use.

---

## 8. Professional Opinion (Non-Legal)

- **Strong:** Copyright in key code and footer; ORCA Governance DNA™ usage; no crypto; clear pricing; jurisdiction and disclaimer in footer.
- **Should do before or soon after launch:** Add Terms of Service and Privacy Policy; link from footer; define refunds and liability.
- **Consider:** One ™ on primary "ApexORCA" use if unregistered; contact email in footer; lawyer review for Ontario/Canada and target markets.

**End of checklist.**
