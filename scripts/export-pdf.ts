/**
 * Export master playbook to PDF for instant delivery after purchase.
 * Source: content/playbook/playbook.md (and content/playbook/figures/ for images).
 * Output: apps/web/public/downloads/playbook.pdf — do not edit the PDF by hand.
 * © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore
 */
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const ROOT = join(process.cwd());
const PLAYBOOK_MD = join(ROOT, "content", "playbook", "playbook.md");
const PLAYBOOK_BASEDIR = join(ROOT, "content", "playbook");
const OUT_DIR = join(ROOT, "apps", "web", "public", "downloads");
const OUT_PDF = join(OUT_DIR, "playbook.pdf");

async function exportPlaybook() {
  try {
    const { mdToPdf } = await import("md-to-pdf");
    const md = await readFile(PLAYBOOK_MD, "utf-8");
    const pdf = await mdToPdf(
      { content: md },
      {
        dest: OUT_PDF,
        basedir: PLAYBOOK_BASEDIR,
      }
    );
    await mkdir(OUT_DIR, { recursive: true });
    if (pdf?.content) {
      await writeFile(OUT_PDF, pdf.content);
      console.log("Playbook PDF exported successfully →", OUT_PDF);
      console.log("© 2026 ApexORCA.io");
    }
  } catch (e) {
    console.error("Export failed.", e);
    console.error("Ensure content/playbook/playbook.md exists and content/playbook/figures/ has all images. Install: npm i -D md-to-pdf");
  }
}

exportPlaybook();
