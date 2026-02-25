/**
 * Export playbook.mdx to PDF for instant delivery after purchase.
 * © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore
 */
import { readFile, writeFile, mkdir } from "fs/promises";
import { dirname } from "path";

async function exportPlaybook() {
  try {
    const { mdToPdf } = await import("md-to-pdf");
    const md = await readFile("docs/playbook.mdx", "utf-8");
    const pdf = await mdToPdf(
      { content: md },
      { dest: "public/downloads/playbook.pdf" }
    );
    await mkdir("public/downloads", { recursive: true });
    if (pdf && pdf.content) {
      await writeFile("public/downloads/playbook.pdf", pdf.content);
      console.log("Playbook PDF exported successfully — © 2026 ApexORCA.io");
    }
  } catch (e) {
    console.error("Export failed. Install: npm i -D md-to-pdf", e);
  }
}

exportPlaybook();
