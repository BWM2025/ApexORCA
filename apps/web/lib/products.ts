// lib/products.ts
// © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore
// Single source for product copy, pricing, and what-you-get. Download URLs per product → lib/downloads.ts

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
  playbook: {
    slug: "playbook",
    name: "ApexORCA™ Playbook: How to Hire a Governed AI with Real Agency",
    price: 39,
    headline: "The complete guide to building governed AI agents you can actually trust",
    blurb: "10+ chapters plus the full \"Orcinus orca to ORCA\" research paper. The playbook explains why most AI agents fail, how to get a governed pod running in one afternoon, ORCA Governance DNA (phase-locked execution, traceability, reversibility, Moby veto), and how the six agents (Apex, Moby, Echo, Oreo, Fin, Sonar) work together. The quickstart ZIP gives you the full template kit: SOUL, IDENTITY, MEMORY, HEARTBEAT, SAFETY, and protocols. Instant download: playbook PDF + quickstart ZIP.",
    whatYouGet: [
      "Full playbook (PDF) — 10+ chapters + \"Orcinus orca to ORCA\" research paper",
      "Quickstart ZIP: SOUL, IDENTITY, MEMORY, HEARTBEAT, SAFETY, and all protocols",
      "Zero-to-working: OpenClaw setup, channels, short mandates, HEARTBEAT, memory-first",
      "ORCA Governance DNA explained: phase-locked execution, traceability, reversibility, Moby veto",
      "Lifetime updates"
    ],
    whoItsFor: "Founders, creators, and teams who want reliable, autonomous AI employees",
    orcaDna: "Full ORCA Governance DNA embedded — phase-locking, traceability, self-audit, reversibility",
    priceLine: "One-time purchase • Instant download"
  },
  "ceo-pod": {
    slug: "ceo-pod",
    name: "CEO Pod Full Package",
    price: 129,
    headline: "The autonomous AI CEO that runs your entire company 24/7. ORCA-Governed.",
    blurb: "An autonomous AI CEO that makes real decisions—not suggestions—with full audit trails. Phase-locked execution means no drift: every mandate, heartbeat, and outcome is traceable. Run strategy, priorities, and cross-pod coordination 24/7 with an agency you can trust and revert.",
    whatYouGet: ["Full CEO Pod", "All templates", "Lifetime updates"],
    whoItsFor: "Founders who want an AI that runs the company",
    orcaDna: "Full ORCA Governance DNA",
    priceLine: "One-time purchase • Instant download"
  },
  "marketing-pod": {
    slug: "marketing-pod",
    name: "Marketing Pod Full Package",
    price: 59,
    headline: "The AI Marketing Director that researches, writes, posts, and converts",
    blurb: "An AI Marketing Director that researches, writes, and ships campaigns with full traceability. Every brief, asset, and post is phase-locked and on-brand; the Trust Meter shows you exactly what went out and why. No fabricated metrics, no off-brand drift.",
    whatYouGet: ["Full Marketing Pod", "All templates", "Lifetime updates"],
    whoItsFor: "Teams that want consistent, high-converting marketing",
    orcaDna: "Full ORCA Governance DNA",
    priceLine: "One-time purchase • Instant download"
  },
  "technical-pod": {
    slug: "technical-pod",
    name: "Technical Pod Full Package",
    price: 79,
    headline: "The AI CTO that builds, tests, deploys, and never ships broken code",
    blurb: "An AI CTO that builds, tests, and deploys with phase-locked workflows and 100% test coverage. Every commit and release is traceable; deviations halt execution so broken code never ships. Real technical agency you can audit and roll back.",
    whatYouGet: ["Full Technical Pod", "All templates", "Lifetime updates"],
    whoItsFor: "Teams that need reliable technical execution",
    orcaDna: "Full ORCA Governance DNA",
    priceLine: "One-time purchase • Instant download"
  },
  "operations-pod": {
    slug: "operations-pod",
    name: "Operations Pod Full Package",
    price: 99,
    headline: "The AI COO that handles fulfillment, customer ops, sales tracking, and everything in between",
    blurb: "An AI COO that handles fulfillment, customer ops, and sales tracking with full traceability. Phase-locked tasks and heartbeats mean nothing falls through the cracks—and you get a clear audit trail of what was done, when, and by which agent.",
    whatYouGet: ["Full Operations Pod", "All templates", "Lifetime updates"],
    whoItsFor: "Teams that want smooth operations",
    orcaDna: "Full ORCA Governance DNA",
    priceLine: "One-time purchase • Instant download"
  },
  "governance-booster": {
    slug: "governance-booster",
    name: "Governance Booster Full Package",
    price: 49,
    headline: "Instantly upgrade any OpenClaw agent with full ORCA Governance DNA",
    blurb: "Add ORCA Governance DNA to any OpenClaw agent in one afternoon. Phase-locking, self-audit, traceability, and reversibility so your existing agents get zero-drift, halt-on-deviation behavior—without rebuilding from scratch.",
    whatYouGet: ["Full Governance Booster", "All templates", "Lifetime updates"],
    whoItsFor: "Anyone who wants governed agents",
    orcaDna: "Full ORCA Governance DNA",
    priceLine: "One-time purchase • Instant download"
  },
  "growth-engine": {
    slug: "growth-engine",
    name: "Growth Engine Full Package",
    price: 19,
    headline: "Autonomous X/Twitter growth with ORCA governance",
    blurb: "Autonomous X/Twitter growth with ORCA governance: phase-locked posting, audience building, and engagement. No spam, no drift—every action is traceable and aligned with your voice. Build audience and reach without losing control.",
    whatYouGet: ["Full Growth Engine", "All templates", "Lifetime updates"],
    whoItsFor: "Teams that want consistent growth",
    orcaDna: "Full ORCA Governance DNA",
    priceLine: "One-time purchase • Instant download"
  },
  "pod-os": {
    slug: "pod-os",
    name: "Pod Orchestrator Full Package",
    price: 29,
    headline: "Manages, optimizes, coordinates multi-agent environments 24/7",
    blurb: "The coordination layer that turns your governed agents into one unified team. Pod Orchestrator handles handoffs, shared memory, cross-agent HEARTBEAT, and leadership rhythms so your CEO, Marketing, Technical, and other pods work as a single company—with full traceability across the whole pod. Install once; every pod you own becomes part of one system.",
    whatYouGet: ["Full Pod Orchestrator", "All templates", "Lifetime updates"],
    whoItsFor: "Teams running multiple agents",
    orcaDna: "Full ORCA Governance DNA",
    priceLine: "One-time purchase • Instant download"
  },
};

export function getProduct(slug: string): Product | undefined {
  return products[slug];
}

export function getProductIdsByCategory(): {
  personas: string[];
  skills: string[];
  bundles: string[];
} {
  return {
    personas: ["ceo-pod", "governance-booster", "marketing-pod", "technical-pod", "operations-pod", "growth-engine"],
    skills: ["playbook", "pod-os"],
    bundles: [],
  };
}

export function getAllProductSlugs(): string[] {
  return [
    "playbook",
    "ceo-pod",
    "marketing-pod",
    "technical-pod",
    "operations-pod",
    "governance-booster",
    "growth-engine",
    "pod-os",
  ];
}
