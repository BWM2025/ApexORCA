/**
 * ApexORCA.io — Data processing & compliance (single source of truth)
 * Use this for Privacy Policy content, audits, and staying consistent with code.
 * Operator: Toronto, Canada. Offerings: global.
 * © 2026 ApexORCA.io. All rights reserved.
 */

export const DATA_PROCESSING = {
  operator: "ApexORCA.io",
  jurisdiction: "Toronto, Ontario, Canada",
  offerings: "Global (digital products)",

  /** Personal data we collect and process */
  personalData: [
    {
      item: "Email address",
      source: "Stripe Checkout (customer provides at payment)",
      storedIn: "Supabase `purchases` table (user_email)",
      purpose: "Order fulfillment, delivery of digital product, support, and legal compliance",
      thirdParties: ["Stripe (payment processor)", "Supabase (database)", "Hosting provider"],
    },
    {
      item: "Purchase records",
      source: "Stripe webhook (checkout.session.completed)",
      storedIn: "Supabase `purchases` (product_id, session_id, amount, purchased_at)",
      purpose: "Order history, support, analytics, and legal/tax records",
      thirdParties: ["Stripe", "Supabase"],
    },
  ],

  /** What we do NOT collect or store */
  notCollected: [
    "Payment card numbers or full card data (handled entirely by Stripe; we are not in PCI scope for card storage)",
    "Passwords (we do not run user accounts; Stripe manages payment identity)",
    "Sensitive categories (health, biometrics, etc.) unless user provides in free text and we do not use for processing)",
  ],

  /** Legal frameworks to address in Privacy Policy */
  legalFrameworks: [
    "PIPEDA (Canada) — primary; we operate from Canada",
    "GDPR (EU/EEA) — if we have customers in the EU/UK",
    "CCPA/CPRA (California) — if we have California residents’ data",
  ],

  /** Cookie usage (minimal) */
  cookies: [
    "Next.js / hosting may set strictly necessary session or technical cookies; we do not currently use analytics or advertising cookies in code.",
  ],
} as const;
