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

const GOVERNANCE_INCLUDED = [
  "Governance Dashboard folder (live logs, self-audit scores, OpenClaw memory snapshots)",
  "Security & Trust Manifesto (one-page: how ORCA protects customers and brand while preserving creativity and autonomy)",
];

export const products: Record<string, Product> = {
  "playbook": {
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
    headline: "The autonomous CEO that actually runs your company while you sleep.",
    blurb: `You no longer need to micromanage every detail.
You now have a full leadership pod — governed, traceable, self-improving — that thinks, decides, and executes like a senior executive team.

Raw AI gives intelligence. OpenClaw gives persistence and real action. Governance gives structure, safety, and relentless improvement. Together they become your CEO Pod — the flagship system that turns chaotic capability into reliable, scalable agency.

Three components that actually work: Raw AI (creativity, reasoning, initiative) + OpenClaw Runtime (persistent memory, real tools, scheduled execution, WhatsApp/Slack) + Structured Governance (phase-locking, traceability, self-audit, reversibility tiers, continuous learning). When all three are combined, you get an AI team you can trust with real responsibility.

This CEO Pod is built from the same governed leadership system that powers high-performing companies today. It coordinates your operation while you focus on vision and high-level decisions — enabling overnight builds, real-time transparency, and scaling without burnout.`,
    whatYouGet: [
      "Full CEO-Lead persona folder — ready to drop into OpenClaw (rename to [YourName]-Lead if you prefer)",
      "All shared governance protocols required by the CEO role (reversibility tiers, daily report format, veto protocol, boundaries)",
      "Complete installation & setup scripts (zero-cost WhatsApp path included)",
      "Pre-configured memory architecture + traceability matrix starter",
      "4 key diagrams (high-resolution PNGs): Three-Component Merge, Pod Architecture, Overnight Build Workflow, Growth Flywheel",
      "Quickstart guide + founder communication rules (short mandates only)",
      "Lifetime updates to the CEO Pod configuration",
    ],
    whoItsFor: "Solo founders drowning in operations who want their time back. Creators & small teams ready to scale without hiring expensive executives. Anyone who wants a real leadership layer instead of another chatbot. Founders tired of raw agents that require constant babysitting and drift.",
    orcaDna: "Every decision traceable with permanent anchors · Self-audit loops run nightly · Phase-locking prevents chaos · Reversibility tiers keep power safe · Governance oversight enforces boundaries and vetoes risky actions",
    priceLine: "$129 one-time. No subscriptions. No monthly fees. No limits. Buy once, install once — the pod runs forever and improves itself every day.",
  },

  "marketing-pod": {
    slug: "marketing-pod",
    name: "Marketing Pod Full Package",
    price: 59,
    headline: "Your autonomous marketing director that never sleeps, never drifts, and actually moves the needle.",
    blurb: `Stop writing endless content yourself. Stop hoping random AI posts convert.
You now have a full Marketing Pod — governed, traceable, and relentlessly focused on turning strangers into paying customers while you sleep.

Raw AI gives creativity and speed. OpenClaw gives persistent memory and real execution (posting, emailing, analytics). Governance gives structure, brand safety, and continuous improvement. Together they become your dedicated Marketing Pod.

Three components that actually work: Raw AI (the ideas and words) + OpenClaw Runtime (post, email, and track results across sessions) + Structured Governance (every piece of content stays on-brand, traceable, self-audited, and optimized over time). When all three are combined, marketing stops being a time sink and becomes a reliable, self-improving growth engine.

This Marketing Pod is built from the same governed system that powers high-performing marketing today. It creates the content, optimizes distribution timing, tracks real results, and feeds learnings back into the next campaign — all governed, all traceable, all improving every day. The difference between hoping marketing works and knowing it's improving every single day is massive.`,
    whatYouGet: [
      "Full Marketing-Lead persona folder — ready to drop into OpenClaw (rename to [YourName]-Lead if you prefer)",
      "All shared governance protocols required by the Marketing role (reversibility tiers, daily report format, email protocol, content/distribution boundary)",
      "Complete installation & setup scripts (zero-cost WhatsApp path included)",
      "Pre-configured memory architecture + traceability matrix starter",
      "3 key diagrams (high-resolution PNGs): Three-Component Merge, Universal Governance Phases, Growth Flywheel",
      "Quickstart guide + founder communication rules (short mandates only)",
      "Lifetime updates to the Marketing Pod configuration",
    ],
    whoItsFor: "Founders spending hours writing content and posting but seeing inconsistent results. Creators & small teams who need reliable marketing without hiring a full-time marketer. Anyone tired of generic AI content that feels off-brand or doesn't convert. Founders who want marketing that learns and improves every single day instead of resetting every session.",
    orcaDna: "Every piece of content and every post traceable with permanent anchors · Self-audit loops after every campaign · Phase-locking ensures no skipped steps · Strict content/distribution boundary (Marketing-Lead owns what is said) · Governance checks every campaign for brand safety and reversibility before it goes live",
    priceLine: "$59 one-time. No subscriptions. No monthly fees. No limits. Buy once, install once — your Marketing Pod runs forever and improves itself every day.",
  },

  "technical-pod": {
    slug: "technical-pod",
    name: "Technical Pod Full Package",
    price: 79,
    headline: "Your autonomous CTO that builds, optimizes, and ships while you focus on the big picture.",
    blurb: `Stop spending nights debugging, testing, and tweaking features yourself. Stop watching raw AI agents break things or ship half-finished work.
You now have a full Technical Pod — governed, traceable, and obsessively focused on building fast, shipping reliably, and continuously improving your product.

Raw AI gives intelligence and code generation. OpenClaw gives persistent memory, real tool execution, and deployment capability. Governance gives phase-locking, self-audit, reversibility tiers, and zero-drift reliability. Together they become your dedicated Technical Pod.

Three components that actually work: Raw AI (fast code generation, problem solving, innovation) + OpenClaw Runtime (persistent memory across sessions, real tool use, deployment, testing) + Structured Governance (disciplined phase-locking, self-audit before every deploy, reversibility classification, continuous technical improvement). When all three are combined, you get a technical team that moves fast without breaking things — and gets better every day.

This Technical Pod is built from the same governed system that powers high-performing technical teams today. It handles feature development, performance optimization, testing, and deployment — all governed, all traceable, all improving every night. The difference between hoping your tech works and knowing your CTO-level agent is handling it reliably is massive.`,
    whatYouGet: [
      "Full Technical-Lead persona folder — ready to drop into OpenClaw (rename to [YourName]-Lead if you prefer)",
      "All shared governance protocols required by the Technical role (reversibility tiers, daily report format, veto protocol)",
      "Complete installation & setup scripts (zero-cost WhatsApp path included)",
      "Pre-deploy checklist (PRE_DEPLOY_CHECKLIST.md) enforced before any deployment",
      "Pre-configured memory architecture + traceability matrix starter",
      "4 key diagrams (high-resolution PNGs): Three-Component Merge, Three-Layer Memory, Reversibility Tiers, Overnight Build Workflow",
      "Quickstart guide + founder communication rules (short mandates only)",
      "Lifetime updates to the Technical Pod configuration",
    ],
    whoItsFor: "Founders who are tired of being the only one who can fix technical issues. Creators & small teams building products that need reliable development velocity. Anyone who has watched raw AI agents ship broken code or lose context between sessions. Founders who want technical work to feel like a senior CTO instead of a risky gamble.",
    orcaDna: "Every change and deployment traceable with permanent anchors · Self-audit loops before every deploy · Phase-locking ensures no skipped steps · Strict reversibility (Tier 1/2 autonomous, Tier 3 approval) · Pre-deploy checklist enforced so nothing ships without proper validation",
    priceLine: "$79 one-time. No subscriptions. No monthly fees. No limits. Buy once, install once — your Technical Pod runs forever and improves itself every day.",
  },

  "operations-pod": {
    slug: "operations-pod",
    name: "Operations Pod Full Package",
    price: 99,
    headline: "Your autonomous COO that runs fulfillment, support, and operations so you never have to chase orders, refunds, or customer issues again.",
    blurb: `Stop being the bottleneck in your own business. Stop waking up to missed orders, support tickets, or fulfillment errors.
You now have a full Operations Pod — governed, traceable, and obsessively focused on smooth fulfillment, fast customer support, accurate tracking, and operational efficiency at scale.

Raw AI gives smart problem-solving. OpenClaw gives persistent memory, real tool execution, and scheduled operations. Governance gives structure, reversibility tiers, self-audit, and continuous improvement. Together they become your dedicated Operations Pod.

Three components that actually work: Raw AI (intelligent handling of edge cases, customer questions, optimization ideas) + OpenClaw Runtime (persistent memory across days, real fulfillment tools, scheduled tasks, dashboard integration) + Structured Governance (phase-locking for every process, self-audit before fulfillment, reversibility tiers, nightly improvement loops). When all three are combined, operations stop being a daily fire drill and become a quiet, reliable engine that scales with your business.

This Operations Pod is built from the same governed system that powers high-performing operations today. It handles every order, every support ticket, every fulfillment step, and every operational optimization — all governed, all traceable, all improving every night. The difference between being buried in ops and having a reliable COO-level system handling it is massive.`,
    whatYouGet: [
      "Full Operations-Lead persona folder — ready to drop into OpenClaw (rename to [YourName]-Lead if you prefer)",
      "All shared governance protocols required by the Operations role (reversibility tiers, daily report format, veto protocol)",
      "Complete installation & setup scripts (zero-cost WhatsApp path included)",
      "Fulfillment checklist (FULFILLMENT_CHECKLIST.md) enforced before any customer-facing action",
      "Pre-configured memory architecture + traceability matrix starter",
      "3 key diagrams (high-resolution PNGs): Three-Component Merge, Pod Architecture, Growth Flywheel",
      "Quickstart guide + founder communication rules (short mandates only)",
      "Lifetime updates to the Operations Pod configuration",
    ],
    whoItsFor: "Founders drowning in customer support tickets, order tracking, and fulfillment headaches. Creators & small teams scaling products that require reliable operations without hiring a full-time ops person. Anyone tired of operations being the chaotic part of their business. Founders who want operations to feel like a senior COO instead of constant manual work.",
    orcaDna: "Every fulfillment action, support reply, and process change traceable with permanent anchors · Self-audit loops before any customer-facing action · Phase-locking ensures no skipped steps · Strict reversibility (Tier 1/2 autonomous, Tier 3 approval) · Nightly operational review and optimization",
    priceLine: "$99 one-time. No subscriptions. No monthly fees. No limits. Buy once, install once — your Operations Pod runs forever and improves itself every day.",
  },

  "governance-booster": {
    slug: "governance-booster",
    name: "Governance Booster Full Package",
    price: 49,
    headline: "Add the missing governance layer to any agent or pod in minutes — and instantly turn raw power into reliable, auditable agency.",
    blurb: `You already have agents that can think and act. Now give them the operating system that makes them trustworthy.
The Governance Booster is the single add-on that brings full structured ORCA Governance DNA to any OpenClaw agent or pod you already own.

Raw AI gives intelligence. OpenClaw gives persistence and action. Governance gives structure, traceability, self-audit, and safety. This is the exact missing piece that turns impressive demos into agents you can actually trust with real work.

Three components that actually work: Raw AI (creativity and reasoning) + OpenClaw Runtime (persistent memory and real tool execution) + Structured Governance (phase-locking, traceability anchors, self-audit loops, reversibility tiers, continuous improvement). Install once and every agent you add instantly becomes governed — no more drift, no more hallucinations going unnoticed, no more risky actions without oversight.

This Governance Booster is built from the exact same structured governance system that powers high-performing agent setups today. It audits every action, scores compliance, enforces reversibility, and keeps everything aligned and safe — while your other agents focus on their roles. The difference between hoping your agents stay reliable and knowing they are governed every single day is massive.`,
    whatYouGet: [
      "Full Governance-Lead persona folder — ready to drop into any OpenClaw agent or pod (rename to [YourName]-Lead if you prefer)",
      "All core shared governance protocols (reversibility tiers, daily report format, veto protocol)",
      "One-click installation script (apply-governance.sh) that applies governance to existing agents",
      "Pre-configured traceability matrix starter and self-audit templates",
      "2 key diagrams (high-resolution PNGs): Three-Component Merge, Reversibility Tiers Pyramid",
      "Quickstart guide + how to add the Governance-Lead to any persona or pod",
      "Lifetime updates to the Governance Booster configuration",
    ],
    whoItsFor: "Anyone who already has agents or pods and wants to add real governance without rebuilding everything. Founders who have experienced drift, hallucinations, or unsafe actions and want to fix it immediately. Users who want to upgrade their current setup to full structured governance standards. Anyone building multiple agents who needs a central governance layer to keep everything aligned and safe.",
    orcaDna: "Automatic classification of every action using reversibility tiers · Nightly HEARTBEAT audits across all connected agents with compliance scoring · Veto authority on high-risk or misclassified actions · Full traceability matrix enforcement · Self-audit loops that catch problems before they reach you",
    priceLine: "$49 one-time. No subscriptions. No monthly fees. Works with every pod and agent you own now or in the future. Buy once, install once — your entire agent system becomes governed forever.",
  },

  "growth-engine": {
    slug: "growth-engine",
    name: "Growth Engine Full Package",
    price: 79,
    headline: "Your autonomous Growth Engine that finds the right audiences, times posts perfectly, and turns attention into revenue — while you focus on the product.",
    blurb: `Stop guessing when to post. Stop watching great content disappear into the void. Stop doing manual distribution work that never scales.
You now have a full Growth Engine — governed, traceable, and obsessively focused on getting the right eyes on your offer at the right time.

Raw AI gives smart targeting and messaging ideas. OpenClaw gives persistent memory, real posting tools, and cross-platform execution. Governance gives structure, brand safety, performance self-audit, and continuous optimization. Together they become your dedicated Growth Engine.

Three components that actually work: Raw AI (audience research, hook ideas, engagement strategy) + OpenClaw Runtime (persistent memory of what worked, real posting across X and email, scheduled execution) + Structured Governance (phase-locking for every campaign, traceability on every post, self-audit of results, strict content/distribution boundary). When all three are combined, growth stops being guesswork and becomes a reliable, self-improving flywheel that compounds your revenue.

This Growth Engine is built from the exact same governed system that powers high-performing growth today. It researches audiences, optimizes posting times, distributes content across channels, tracks real engagement and conversions, and feeds learnings back to improve the next round — all governed, all traceable. The difference between hoping people see your work and knowing your growth engine is working 24/7 and driving measurable revenue is massive.`,
    whatYouGet: [
      "Full Growth-Lead persona folder — ready to drop into OpenClaw (rename to [YourName]-Lead if you prefer)",
      "X-Growth skill with autonomous posting protocols (X_POSTING_PROTOCOL.md)",
      "All shared governance protocols required by the Growth role (reversibility tiers, daily report format, veto protocol)",
      "Complete installation & setup scripts (zero-cost WhatsApp path included)",
      "Pre-configured memory architecture + traceability matrix starter",
      "ROI tracking template + example high-converting campaigns (in Quickstart/)",
      "2 key diagrams (high-resolution PNGs): Three-Component Merge, Growth Flywheel",
      "Quickstart guide + founder communication rules (short mandates only)",
      "Lifetime updates to the Growth Engine configuration",
    ],
    whoItsFor: "Founders who create great content but struggle to get it seen by the right people. Creators & small teams who need consistent, high-quality distribution without doing it manually. Anyone tired of posting into the void or guessing the best time and channel. Founders who want growth to feel like a professional, revenue-focused engine instead of sporadic effort.",
    orcaDna: "Every post and campaign traceable with permanent anchors · Strict content/distribution boundary (Growth-Lead never writes content — only distributes and optimizes) · Self-audit loops after every campaign · Phase-locking ensures no skipped steps · Governance check on every post for brand voice and reversibility before it goes live",
    priceLine: "$79 one-time. No subscriptions. No monthly fees. No limits. Buy once, install once — your Growth Engine runs forever and improves itself every day.",
  },

  "pod-os": {
    slug: "pod-os",
    name: "Pod Orchestrator Full Package",
    price: 29,
    headline: "The orchestration layer that turns your individual governed agents into one unified, self-sustaining company.",
    blurb: `You have powerful agents. Now give them the central nervous system they need to work together without chaos, duplicated effort, or constant human coordination.
Pod Orchestrator is the lightweight coordination layer that connects any number of your governed agents into one unified team — with shared memory, clean handoffs, leadership rhythms, and full traceability across the entire pod.

Raw AI gives each agent intelligence. OpenClaw gives each agent persistence and real action. Governance gives each agent structure and safety. Pod Orchestrator adds the missing piece: coordination at scale — so your agents feel like a real company instead of separate tools.

Three components at the company level: Raw AI (each agent's creativity and reasoning) + OpenClaw Runtime (persistent memory and real tool execution for every agent) + Structured Governance (phase-locking, traceability, self-audit for every agent). Pod Orchestrator sits on top and orchestrates all three across multiple agents so they hand off work cleanly, share knowledge instantly, and stay aligned with your overall mission.

This Pod Orchestrator is built from the exact same coordination system that powers high-performing multi-agent setups today. It connects any combination of your agents into one unified team — with shared memory, clean handoffs, and nightly cross-agent reviews. The difference between having powerful individual agents and having a single, self-sustaining company is everything.`,
    whatYouGet: [
      "Full Pod-Orchestrator-Lead framework — ready to drop into your existing OpenClaw workspace (rename to [YourName]-Lead if you prefer)",
      "Central Pod Charter template (POD_CHARTER_TEMPLATE.md) + shared memory architecture",
      "Cross-agent HEARTBEAT protocol and handoff templates",
      "Leadership & synchronization scripts (daily/weekly pod syncs)",
      "Complete installation & setup guide (works with any combination of your existing agents/pods)",
      "2 key diagrams (high-resolution PNGs): Three-Component Merge, Coordinated AI Pod Architecture",
      "Quickstart guide + founder communication rules for managing the entire pod",
      "Lifetime updates to the Pod Orchestrator coordination layer",
    ],
    whoItsFor: "Founders who already have 2+ governed agents or pods and want them to work together without manual coordination. Anyone scaling from a single agent to a real team and needing clean handoffs and shared memory. Creators who want their marketing, technical, and operations agents to operate as one unified company. Users who hate context loss, duplicated work, or agents stepping on each other's toes.",
    orcaDna: "Shared traceability matrix that spans all agents · Centralized HEARTBEAT that reviews cross-agent performance nightly · Enforced role boundaries and handoff protocols · Leadership rhythms (daily syncs, weekly reviews) built on phase-locking and self-audit · Governance oversight that watches the entire pod",
    priceLine: "$29 one-time. Lifetime access. Instant download. The most affordable way to turn your agents into a real company. Buy once, install once — your entire pod becomes coordinated forever.",
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
    bundles: [], // Reserved for future bundles; marketplace currently shows only personas + skills.
  };
}

/** All product slugs (single source for checkout + downloads). Use to keep stripe priceMap and lib/downloads.ts in sync. 7 products + playbook = 8. */
// Required for dashboard/stats/route.ts — returns all active product slugs
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
