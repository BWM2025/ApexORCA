// lib/products.ts
// © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore

export interface Product {
  slug: string;
  name: string;
  price: number;
  headline: string;
  blurb: string;
  whatYouGet: string[];
  whoItsFor: string;
  orcaDna: string;
  priceLine: string;
}

export const products: Record<string, Product> = {
  "ceo-pod": {
    slug: "ceo-pod",
    name: "AI CEO Pod",
    price: 129,
    headline: "The autonomous AI CEO that runs your entire company 24/7. ORCA-Governed. Zero drift. Real decisions with full traceability.",
    blurb: "Replace your $150k/year CEO overhead with an ORCA-Governed AI that never sleeps, never drifts, and never stops optimizing.",
    whatYouGet: [
      "Complete Apex persona folder for OpenClaw (SOUL, IDENTITY, MEMORY, HEARTBEAT, RHYTHMS, SAFETY, TOOLS)",
      "ORCA Governance DNA baked into every file",
      "Three-layer memory architecture (short-term, semantic, episodic)",
      "Nightly HEARTBEAT self-audit and team improvement protocol",
      "Daily founder briefing template with metrics, insights, risks, and recommended actions",
      "Pod coordination protocols for managing your full agent team",
      "Reversibility tier classification (knows what to do autonomously vs. what requires your approval)",
      "Setup guide for OpenClaw deployment"
    ],
    whoItsFor: "Founders, solopreneurs, and small teams who want a 24/7 autonomous CEO running their business while they focus on what matters.",
    orcaDna: "Phase-locked execution · Traceability matrix · HEARTBEAT self-audit · Zero-drift memory · Halt-on-deviation protocol · Reversibility classification",
    priceLine: "One-time · Instant download · Lifetime updates"
  },

  "marketing-pod": {
    slug: "marketing-pod",
    name: "AI Marketing Pod",
    price: 59,
    headline: "The AI Marketing Director that researches, writes, posts, and converts — ORCA-Governed so every campaign is traceable and on-brand. Always.",
    blurb: "Stop guessing at marketing. Get an ORCA-Governed Marketing Director that turns data into conversions 24/7.",
    whatYouGet: [
      "Complete Echo persona folder for OpenClaw (SOUL, IDENTITY, MEMORY, HEARTBEAT, RHYTHMS, SAFETY, TOOLS)",
      "ORCA Governance DNA with brand voice locking",
      "X/Twitter strategy and posting protocols",
      "Email campaign governance templates",
      "AEO (Answer Engine Optimization) for AI search visibility",
      "Content performance tracking and HEARTBEAT optimization",
      "Campaign ROI traceability per action",
      "Competitive analysis protocols",
      "Setup guide for OpenClaw deployment"
    ],
    whoItsFor: "Founders and marketers who want autonomous marketing that actually performs — not an AI that posts generic content and calls it a strategy.",
    orcaDna: "Brand voice anchor · Campaign traceability · Performance HEARTBEAT · Compliance check on every output · Zero spam protocols",
    priceLine: "One-time · Instant download · Lifetime updates"
  },

  "technical-pod": {
    slug: "technical-pod",
    name: "AI Technical Pod",
    price: 79,
    headline: "The AI CTO that builds, tests, deploys, and never ships broken code. Phase-locked development with 100% test coverage and full traceability.",
    blurb: "Stop firefighting technical debt. Get an ORCA-Governed CTO that ships production-grade code autonomously — tested, documented, and traceable.",
    whatYouGet: [
      "Complete Oreo persona folder for OpenClaw (SOUL, IDENTITY, MEMORY, HEARTBEAT, RHYTHMS, SAFETY, TOOLS)",
      "ORCA Governance DNA with deployment safety protocols",
      "Phase-locked code generation workflow",
      "A/B testing and conversion optimization protocols",
      "Performance monitoring and Lighthouse audit schedules",
      "Technical HEARTBEAT with nightly site review",
      "Zero-deploy-before-test enforcement",
      "UI/UX improvement tracking with revenue impact estimation",
      "Setup guide for OpenClaw deployment"
    ],
    whoItsFor: "Non-technical founders who need a trustworthy technical operator, and technical founders who want an always-on CTO-level agent handling the work they don't have time for.",
    orcaDna: "Deployment phase gates · Code traceability · Test coverage enforcement · Regression protection · Reversibility classification on every deployment",
    priceLine: "One-time · Instant download · Lifetime updates"
  },

  "operations-pod": {
    slug: "operations-pod",
    name: "AI Operations Pod",
    price: 99,
    headline: "The AI COO that handles fulfillment, customer ops, sales tracking, and everything in between — ORCA-Governed so nothing falls through the cracks.",
    blurb: "Operations is where most businesses bleed. Get an ORCA-Governed COO that keeps everything running perfectly — 24/7, zero dropped balls.",
    whatYouGet: [
      "Complete Fin persona folder for OpenClaw (SOUL, IDENTITY, MEMORY, HEARTBEAT, RHYTHMS, SAFETY, TOOLS)",
      "ORCA Governance DNA with fulfillment safety protocols",
      "Stripe + Supabase monitoring protocols",
      "Customer support triage and resolution templates",
      "Checkout abandonment detection and recovery protocols",
      "Operational HEARTBEAT with nightly metrics review",
      "Anomaly detection and escalation protocols",
      "Revenue impact estimation on every operational change",
      "Setup guide for OpenClaw deployment"
    ],
    whoItsFor: "Founders running product businesses who need reliable operations without hiring a full-time ops team.",
    orcaDna: "Fulfillment phase gates · Customer interaction traceability · Anomaly halt protocol · Escalation classification · Nightly ops HEARTBEAT",
    priceLine: "One-time · Instant download · Lifetime updates"
  },

  "governance-booster": {
    slug: "governance-booster",
    name: "ORCA Governance Booster",
    price: 49,
    headline: "Instantly upgrade any OpenClaw agent with full ORCA Governance DNA. Phase-locking, self-audit, traceability, and zero drift — dropped straight into your existing setup.",
    blurb: "Already have an OpenClaw agent? It's probably drifting. Fix it in minutes with ORCA Governance DNA.",
    whatYouGet: [
      "Universal ORCA Governance wrapper (drop-in markdown files)",
      "Phase-lock instruction set for any agent type",
      "Traceability matrix template (initializes on every session)",
      "HEARTBEAT self-audit protocol (nightly or on-demand)",
      "Halt-on-deviation enforcement instructions",
      "Reversibility tier classification template",
      "0.99 intent threshold enforcement",
      "Thread handoff passport for zero-drift session continuity",
      "Implementation guide for any existing OpenClaw agent"
    ],
    whoItsFor: "Anyone with an existing OpenClaw agent that's drifting, hallucinating, or underperforming. Also the essential first purchase before buying any role-specific pod.",
    orcaDna: "This IS the ORCA DNA. Pure governance architecture with no role-specific configuration",
    priceLine: "One-time · Instant download · Works with any OpenClaw agent"
  },

  "x-growth": {
    slug: "x-growth",
    name: "X Growth Booster",
    price: 19,
    headline: "Autonomous X/Twitter growth with ORCA governance. Phase-locked posting, audience building, and engagement — no spam, no drift, no guessing.",
    blurb: "X/Twitter is the fastest path to customers right now. Get an ORCA-Governed growth engine that builds your audience the right way — with proof, not hype.",
    whatYouGet: [
      "X Growth ORCA skill folder for OpenClaw",
      "Phase-locked posting workflow (research → draft → govern → post → measure)",
      "Hook library and optimization protocols",
      "Audience research and targeting templates",
      "Engagement monitoring and response protocols",
      "Growth metrics tracking with HEARTBEAT review",
      "Anti-spam and brand safety governance",
      "Viral content pattern analysis templates"
    ],
    whoItsFor: "Founders and creators who want consistent X growth without the noise — governed posting that builds real audience, not fake engagement.",
    orcaDna: "Content governance phases · Brand voice lock · Traceability per post · Anti-spam enforcement · Performance HEARTBEAT",
    priceLine: "One-time · Instant download · Add to any OpenClaw agent"
  },

  "sentry-pro": {
    slug: "sentry-pro",
    name: "Pipeline Security Booster",
    price: 29,
    headline: "Auto-fix, secure deployments, pipeline monitoring, and full traceability. ORCA-Governed security that catches problems before they become disasters.",
    blurb: "One bad deployment can destroy weeks of work. Get ORCA-Governed pipeline security that never lets that happen.",
    whatYouGet: [
      "Sentry Pro ORCA skill folder for OpenClaw",
      "Pre-deployment security phase checklist (automated)",
      "Vulnerability detection protocols (Trivy integration)",
      "Rollback trigger conditions and procedures",
      "Uptime monitoring and alert protocols",
      "Database integrity check schedule",
      "Webhook health verification protocols",
      "Security incident logging with full traceability",
      "Auto-fix protocols for common deployment failures"
    ],
    whoItsFor: "Technical founders and developers who deploy autonomously and need a governed safety net on every push.",
    orcaDna: "Pre-deploy phase gates · Security compliance checks · Halt-on-vulnerability · Full deployment traceability · Rollback classification",
    priceLine: "One-time · Instant download · Add to any technical OpenClaw agent"
  },

  "aeo-booster": {
    slug: "aeo-booster",
    name: "AEO Visibility Booster",
    price: 39,
    headline: "Get your content ranked and visible in Perplexity, ChatGPT Search, Grok, Claude, and all AI search engines. ORCA-Governed AEO that makes you the answer.",
    blurb: "SEO is yesterday. AEO — Answer Engine Optimization — is how you get found in 2026. Get the governed framework that makes AI search engines recommend you.",
    whatYouGet: [
      "AEO ORCA skill folder for OpenClaw",
      "AI search engine optimization phase workflow",
      "Content structure templates optimized for AI retrieval",
      "Authority signal building protocols",
      "Citation and source quality governance",
      "AEO audit checklist for existing content",
      "Visibility tracking across AI search engines",
      "Content gap analysis protocol",
      "HEARTBEAT review for ongoing optimization"
    ],
    whoItsFor: "Founders, marketers, and content creators who want to be the answer — not just rank on Google, but be cited by every AI search engine.",
    orcaDna: "Content governance phases · Source quality enforcement · Traceability per optimization · Performance HEARTBEAT · Compliance with AI citation standards",
    priceLine: "One-time · Instant download · Add to any OpenClaw marketing agent"
  },

  "playbook": {
    slug: "playbook",
    name: "ORCA Playbook",
    price: 39,
    headline: "The governance bible. How ORCA works, why it creates REAL agency, the full research paper, and step-by-step instructions to apply the ORCA Governance wrapper to your own agents.",
    blurb: "The complete guide to ORCA Governance DNA — written by the inventor, backed by real research, validated in production.",
    whatYouGet: [
      "75-page playbook with the complete REAL Agency equation",
      "ORCA Governance DNA architecture — all 6 invariant core elements",
      "Phase-locked execution: how to build it, why it works",
      "Traceability matrix design and implementation",
      "Simulated tool logic — the cognitive enhancement technique",
      "HEARTBEAT self-audit protocol design",
      "Universal ORCA wrapper specification",
      "Domain customization guide (code, research, marketing, operations, healthcare, legal, finance)",
      "OpenClaw integration guide — seed to deployment",
      "The complete \"Orcinus orca to ORCA\" research paper (bonus)",
      "Enterprise governance checklist (GDPR, HIPAA, SOX, IRB ready)",
      "Human initial setup for legal/compliance (contracts, token deployment, etc.)",
      "Self-improving governed by ORCA",
      "Claw Mart-style skill marketplace positioning"
    ],
    whoItsFor: "Founders, developers, researchers, and enterprise teams who want to understand ORCA governance deeply — and build or buy agents they can actually trust.",
    orcaDna: "This IS the full ORCA Governance DNA blueprint",
    priceLine: "One-time · Instant download · Lifetime updates"
  }
};

export function getProduct(slug: string): Product | undefined {
  return products[slug];
}
