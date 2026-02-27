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
    name: "ApexORCA Playbook: How to Hire a Governed AI with Real Agency",
    price: 39,
    headline: "The complete guide to building governed AI agents you can actually trust",
    blurb: "75-page playbook + full template kit. Includes the complete \"Orcinus orca to ORCA\" research paper.",
    whatYouGet: [
      "Full 75-page playbook (PDF)",
      "All governance templates and starter kits",
      "One-click installer scripts",
      "Traceability matrix & audit tools",
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
    blurb: "Zero drift. Real decisions with full traceability.",
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
    blurb: "ORCA-Governed so every campaign is traceable and on-brand.",
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
    blurb: "Phase-locked development with 100% test coverage and full traceability.",
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
    blurb: "ORCA-Governed so nothing falls through the cracks.",
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
    blurb: "Phase-locking, self-audit, traceability, and zero drift.",
    whatYouGet: ["Full Governance Booster", "All templates", "Lifetime updates"],
    whoItsFor: "Anyone who wants governed agents",
    orcaDna: "Full ORCA Governance DNA",
    priceLine: "One-time purchase • Instant download"
  },
  "growth-engine": {
    slug: "growth-engine",
    name: "Growth Engine Full Package",
    price: 79,
    headline: "Autonomous X/Twitter growth with ORCA governance",
    blurb: "Phase-locked posting, audience building, and engagement — no spam, no drift.",
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
    blurb: "ORCA-Governed Pod Orchestrator.",
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
    personas: ["ceo-pod", "marketing-pod", "technical-pod", "operations-pod"],
    skills: ["playbook", "governance-booster", "growth-engine", "pod-os"],
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
