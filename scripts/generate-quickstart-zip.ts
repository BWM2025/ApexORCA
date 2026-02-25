/**
 * Generate quickstart ZIP for customers.
 * Run from repo root: npx tsx scripts/generate-quickstart-zip.ts
 * Requires: npm i -D archiver
 */
import { createWriteStream, mkdirSync } from "fs";
import { dirname } from "path";

async function generateQuickstart() {
  try {
    const archiver = await import("archiver");
    const outPath = "public/downloads/quickstart.zip";
    mkdirSync(dirname(outPath), { recursive: true });
    const output = createWriteStream(outPath);
    const archive = archiver.default("zip", { zlib: { level: 9 } });
    archive.pipe(output);
    archive.directory("packages/agent-configs/quickstart", false);
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
