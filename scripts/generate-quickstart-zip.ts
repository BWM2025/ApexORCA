/**
 * Generate quickstart ZIP for customers.
 * Run from repo root: npx tsx scripts/generate-quickstart-zip.ts
 * Output: apps/web/public/downloads/quickstart.zip (same as playbook PDF and product ZIPs).
 * Requires: npm i -D archiver
 */
import { createWriteStream, mkdirSync } from "fs";
import { join, dirname } from "path";

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, "apps", "web", "public", "downloads");

async function generateQuickstart() {
  try {
    const archiver = await import("archiver");
    const outPath = join(OUT_DIR, "quickstart.zip");
    mkdirSync(dirname(outPath), { recursive: true });
    const output = createWriteStream(outPath);
    const archive = archiver.default("zip", { zlib: { level: 9 } });
    archive.pipe(output);
    archive.directory(join(ROOT, "packages", "agent-configs", "quickstart"), false);
    archive.file(join(ROOT, "docs", "LLM_PROVIDER_SETUP_GUIDE.md"), { name: "LLM_PROVIDER_SETUP_GUIDE.md" });
    archive.file(join(ROOT, "packages", "agent-configs", "shared", "ORCA_MATRIX_AND_HALT_TEMPLATE.md"), { name: "ORCA_MATRIX_AND_HALT_TEMPLATE.md" });
    archive.finalize();
    await new Promise<void>((resolve, reject) => {
      output.on("close", () => resolve());
      archive.on("error", reject);
    });
    console.log("Quickstart ZIP generated successfully — © 2026 ApexORCA.io");
  } catch (e) {
    console.error("ZIP failed. Install: npm i -D archiver", e);
  }
}

generateQuickstart();
