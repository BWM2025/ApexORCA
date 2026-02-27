/**
 * Generate all marketplace product ZIPs for instant download.
 * Run from repo root: npx tsx scripts/generate-product-zips.ts
 * Output: apps/web/public/downloads/*.zip (same location as playbook.pdf).
 * Requires: npm i -D archiver
 * © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore
 */
import { createWriteStream, mkdirSync, existsSync, copyFileSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const AGENT_CONFIGS = join(ROOT, "packages", "agent-configs");
const PLAYBOOK_FIGURES = join(ROOT, "content", "playbook", "figures");
const OUT_DIR = join(ROOT, "apps", "web", "public", "downloads");

/** When slug is ceo-pod, zip the full CEO-Pod-Complete tree (single root folder). */
const CEO_POD_PACKAGE = join(AGENT_CONFIGS, "products", "ceo-pod", "CEO-Pod-Complete");

/** When slug is marketing-pod, zip the full Marketing-Pod-Complete tree. */
const MARKETING_POD_PACKAGE = join(AGENT_CONFIGS, "products", "marketing-pod", "Marketing-Pod-Complete");

/** When slug is technical-pod, zip the full Technical-Pod-Complete tree. */
const TECHNICAL_POD_PACKAGE = join(AGENT_CONFIGS, "products", "technical-pod", "Technical-Pod-Complete");

/** Diagram name in playbook/figures → name in ZIP Diagrams/ folder. */
const CEO_POD_DIAGRAMS: [string, string][] = [
  ["figure-1-three-component-merge.png", "figure-1-three-component-merge.png"],
  ["figure-6-pod-architecture.png", "figure-6-pod-architecture.png"],
  ["figure-7-overnight-build-workflow-flowchart.png", "figure-7-overnight-build-workflow.png"],
  ["figure-8-growth-efficiency-flywheel.png", "figure-8-growth-flywheel.png"],
];

const MARKETING_POD_DIAGRAMS: [string, string][] = [
  ["figure-1-three-component-merge.png", "figure-1-three-component-merge.png"],
  ["figure-4-six-phase-cycle-flowchart.png", "figure-4-six-phase-cycle.png"],
  ["figure-8-growth-efficiency-flywheel.png", "figure-8-growth-flywheel.png"],
];

const TECHNICAL_POD_DIAGRAMS: [string, string][] = [
  ["figure-1-three-component-merge.png", "figure-1-three-component-merge.png"],
  ["figure-3-three-layer-memory-stack.png", "figure-3-three-layer-memory-stack.png"],
  ["figure-5-reversibility-tiers-pyramid.png", "figure-5-reversibility-tiers.png"],
  ["figure-7-overnight-build-workflow-flowchart.png", "figure-7-overnight-build-workflow.png"],
];

/** When slug is operations-pod, zip the full Operations-Pod-Complete tree. */
const OPERATIONS_POD_PACKAGE = join(AGENT_CONFIGS, "products", "operations-pod", "Operations-Pod-Complete");

const OPERATIONS_POD_DIAGRAMS: [string, string][] = [
  ["figure-1-three-component-merge.png", "figure-1-three-component-merge.png"],
  ["figure-6-pod-architecture.png", "figure-6-pod-architecture.png"],
  ["figure-8-growth-efficiency-flywheel.png", "figure-8-growth-flywheel.png"],
];

/** When slug is governance-booster, zip the full Governance-Booster-Complete tree. */
const GOVERNANCE_BOOSTER_PACKAGE = join(AGENT_CONFIGS, "products", "governance-booster", "Governance-Booster-Complete");

const GOVERNANCE_BOOSTER_DIAGRAMS: [string, string][] = [
  ["figure-1-three-component-merge.png", "figure-1-three-component-merge.png"],
  ["figure-5-reversibility-tiers-pyramid.png", "figure-5-reversibility-tiers.png"],
];

/** When slug is growth-engine, zip the full Growth-Engine-Complete tree. */
const GROWTH_ENGINE_PACKAGE = join(AGENT_CONFIGS, "products", "growth-engine", "Growth-Engine-Complete");

const GROWTH_ENGINE_DIAGRAMS: [string, string][] = [
  ["figure-1-three-component-merge.png", "figure-1-three-component-merge.png"],
  ["figure-8-growth-efficiency-flywheel.png", "figure-8-growth-flywheel.png"],
];

/** When slug is pod-os, zip the full Pod-Orchestrator-Complete tree. */
const POD_ORCHESTRATOR_PACKAGE = join(AGENT_CONFIGS, "products", "pod-orchestrator", "Pod-Orchestrator-Complete");

const POD_ORCHESTRATOR_DIAGRAMS: [string, string][] = [
  ["figure-1-three-component-merge.png", "figure-1-three-component-merge.png"],
  ["figure-6-pod-architecture.png", "figure-6-pod-architecture.png"],
];

/** Product slug → relative path(s). null = skip. 7 products only (playbook PDF is built by export-pdf.ts). */
const PRODUCT_SOURCES: Record<string, string[] | null> = {
  "ceo-pod": [],
  "marketing-pod": [],
  "technical-pod": [],
  "operations-pod": [],
  "governance-booster": [],
  "growth-engine": [],
  "pod-os": [],
};

function addDirToArchive(archive: import("archiver").Archiver, sourceDir: string): void {
  const fullPath = join(AGENT_CONFIGS, sourceDir);
  if (!existsSync(fullPath)) {
    console.warn("  Skip (missing):", sourceDir);
    return;
  }
  const name = sourceDir.split("/").pop()!;
  archive.directory(fullPath, name);
}

/** Copy playbook figures into package Diagrams/ when present. */
function copyDiagrams(packageDir: string, diagramList: [string, string][]): void {
  const diagramsDir = join(packageDir, "Diagrams");
  if (!existsSync(diagramsDir)) return;
  for (const [srcName, destName] of diagramList) {
    const src = join(PLAYBOOK_FIGURES, srcName);
    if (existsSync(src)) {
      copyFileSync(src, join(diagramsDir, destName));
    }
  }
}

async function buildCeoPodZip(): Promise<boolean> {
  if (!existsSync(CEO_POD_PACKAGE)) {
    console.warn("  Skip (missing):", CEO_POD_PACKAGE);
    return false;
  }
  copyDiagrams(CEO_POD_PACKAGE, CEO_POD_DIAGRAMS);
  const archiver = await import("archiver");
  const outPath = join(OUT_DIR, "ceo-pod.zip");
  mkdirSync(OUT_DIR, { recursive: true });
  const output = createWriteStream(outPath);
  const archive = archiver.default("zip", { zlib: { level: 9 } });
  archive.pipe(output);
  archive.directory(CEO_POD_PACKAGE, "CEO-Pod-Complete");
  archive.finalize();
  return new Promise((resolve, reject) => {
    output.on("close", () => {
      console.log("  →", outPath);
      resolve(true);
    });
    archive.on("error", reject);
  });
}

async function buildMarketingPodZip(): Promise<boolean> {
  if (!existsSync(MARKETING_POD_PACKAGE)) {
    console.warn("  Skip (missing):", MARKETING_POD_PACKAGE);
    return false;
  }
  copyDiagrams(MARKETING_POD_PACKAGE, MARKETING_POD_DIAGRAMS);
  const archiver = await import("archiver");
  const outPath = join(OUT_DIR, "marketing-pod.zip");
  mkdirSync(OUT_DIR, { recursive: true });
  const output = createWriteStream(outPath);
  const archive = archiver.default("zip", { zlib: { level: 9 } });
  archive.pipe(output);
  archive.directory(MARKETING_POD_PACKAGE, "Marketing-Pod-Complete");
  archive.finalize();
  return new Promise((resolve, reject) => {
    output.on("close", () => {
      console.log("  →", outPath);
      resolve(true);
    });
    archive.on("error", reject);
  });
}

async function buildTechnicalPodZip(): Promise<boolean> {
  if (!existsSync(TECHNICAL_POD_PACKAGE)) {
    console.warn("  Skip (missing):", TECHNICAL_POD_PACKAGE);
    return false;
  }
  copyDiagrams(TECHNICAL_POD_PACKAGE, TECHNICAL_POD_DIAGRAMS);
  const archiver = await import("archiver");
  const outPath = join(OUT_DIR, "technical-pod.zip");
  mkdirSync(OUT_DIR, { recursive: true });
  const output = createWriteStream(outPath);
  const archive = archiver.default("zip", { zlib: { level: 9 } });
  archive.pipe(output);
  archive.directory(TECHNICAL_POD_PACKAGE, "Technical-Pod-Complete");
  archive.finalize();
  return new Promise((resolve, reject) => {
    output.on("close", () => {
      console.log("  →", outPath);
      resolve(true);
    });
    archive.on("error", reject);
  });
}

async function buildOperationsPodZip(): Promise<boolean> {
  if (!existsSync(OPERATIONS_POD_PACKAGE)) {
    console.warn("  Skip (missing):", OPERATIONS_POD_PACKAGE);
    return false;
  }
  copyDiagrams(OPERATIONS_POD_PACKAGE, OPERATIONS_POD_DIAGRAMS);
  const archiver = await import("archiver");
  const outPath = join(OUT_DIR, "operations-pod.zip");
  mkdirSync(OUT_DIR, { recursive: true });
  const output = createWriteStream(outPath);
  const archive = archiver.default("zip", { zlib: { level: 9 } });
  archive.pipe(output);
  archive.directory(OPERATIONS_POD_PACKAGE, "Operations-Pod-Complete");
  archive.finalize();
  return new Promise((resolve, reject) => {
    output.on("close", () => {
      console.log("  →", outPath);
      resolve(true);
    });
    archive.on("error", reject);
  });
}

async function buildGovernanceBoosterZip(): Promise<boolean> {
  if (!existsSync(GOVERNANCE_BOOSTER_PACKAGE)) {
    console.warn("  Skip (missing):", GOVERNANCE_BOOSTER_PACKAGE);
    return false;
  }
  copyDiagrams(GOVERNANCE_BOOSTER_PACKAGE, GOVERNANCE_BOOSTER_DIAGRAMS);
  const archiver = await import("archiver");
  const outPath = join(OUT_DIR, "governance-booster.zip");
  mkdirSync(OUT_DIR, { recursive: true });
  const output = createWriteStream(outPath);
  const archive = archiver.default("zip", { zlib: { level: 9 } });
  archive.pipe(output);
  archive.directory(GOVERNANCE_BOOSTER_PACKAGE, "Governance-Booster-Complete");
  archive.finalize();
  return new Promise((resolve, reject) => {
    output.on("close", () => {
      console.log("  →", outPath);
      resolve(true);
    });
    archive.on("error", reject);
  });
}

async function buildGrowthEngineZip(): Promise<boolean> {
  if (!existsSync(GROWTH_ENGINE_PACKAGE)) {
    console.warn("  Skip (missing):", GROWTH_ENGINE_PACKAGE);
    return false;
  }
  copyDiagrams(GROWTH_ENGINE_PACKAGE, GROWTH_ENGINE_DIAGRAMS);
  const archiver = await import("archiver");
  const outPath = join(OUT_DIR, "growth-engine.zip");
  mkdirSync(OUT_DIR, { recursive: true });
  const output = createWriteStream(outPath);
  const archive = archiver.default("zip", { zlib: { level: 9 } });
  archive.pipe(output);
  archive.directory(GROWTH_ENGINE_PACKAGE, "Growth-Engine-Complete");
  archive.finalize();
  return new Promise((resolve, reject) => {
    output.on("close", () => {
      console.log("  →", outPath);
      resolve(true);
    });
    archive.on("error", reject);
  });
}

async function buildPodOrchestratorZip(): Promise<boolean> {
  if (!existsSync(POD_ORCHESTRATOR_PACKAGE)) {
    console.warn("  Skip (missing):", POD_ORCHESTRATOR_PACKAGE);
    return false;
  }
  copyDiagrams(POD_ORCHESTRATOR_PACKAGE, POD_ORCHESTRATOR_DIAGRAMS);
  const archiver = await import("archiver");
  const outPath = join(OUT_DIR, "pod-os.zip");
  mkdirSync(OUT_DIR, { recursive: true });
  const output = createWriteStream(outPath);
  const archive = archiver.default("zip", { zlib: { level: 9 } });
  archive.pipe(output);
  archive.directory(POD_ORCHESTRATOR_PACKAGE, "Pod-Orchestrator-Complete");
  archive.finalize();
  return new Promise((resolve, reject) => {
    output.on("close", () => {
      console.log("  →", outPath);
      resolve(true);
    });
    archive.on("error", reject);
  });
}

async function buildZip(slug: string, sources: string[]): Promise<boolean> {
  const archiver = await import("archiver");
  const outPath = join(OUT_DIR, `${slug}.zip`);
  mkdirSync(OUT_DIR, { recursive: true });
  const output = createWriteStream(outPath);
  const archive = archiver.default("zip", { zlib: { level: 9 } });
  archive.pipe(output);

  for (const dir of sources) {
    addDirToArchive(archive, dir);
  }

  archive.finalize();
  return new Promise((resolve, reject) => {
    output.on("close", () => {
      console.log("  →", outPath);
      resolve(true);
    });
    archive.on("error", reject);
  });
}

async function main() {
  console.log("Building product ZIPs →", OUT_DIR);
  mkdirSync(OUT_DIR, { recursive: true });

  for (const [slug, sources] of Object.entries(PRODUCT_SOURCES)) {
    if (sources === null) {
      console.log("[skip]", slug, "(no source folder yet)");
      continue;
    }
    process.stdout.write(slug + " ");
    try {
      if (slug === "ceo-pod") {
        await buildCeoPodZip();
      } else if (slug === "marketing-pod") {
        await buildMarketingPodZip();
      } else if (slug === "technical-pod") {
        await buildTechnicalPodZip();
      } else if (slug === "operations-pod") {
        await buildOperationsPodZip();
      } else if (slug === "governance-booster") {
        await buildGovernanceBoosterZip();
      } else if (slug === "growth-engine") {
        await buildGrowthEngineZip();
      } else if (slug === "pod-os") {
        await buildPodOrchestratorZip();
      } else {
        await buildZip(slug, sources);
      }
    } catch (e) {
      console.error("\nFailed:", slug, e);
    }
  }

  console.log("Product ZIPs done. Playbook PDF: npx tsx scripts/export-pdf.ts");
}

main();
