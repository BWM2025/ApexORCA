# Master Playbook — Source of Truth for PDF Download

**Do not edit these files except when intentionally updating the playbook.**

This folder is the **only** source used to generate the playbook PDF that customers download from the site. The PDF is never edited by hand.

## Contents

- **`playbook.md`** — The full playbook (How to Hire a Governed AI with Real Agency). This is the master copy. Replace it only with your final, approved version.
- **`figures/`** — All diagram and logo images. The playbook references them as `figures/filename.png`.

## Required files in `figures/`

Place these exact filenames here so the PDF renders correctly:

- `apexorca-logo.png`
- `figure-1-three-component-merge.png`
- `figure-2-orca-pod-vs-ai-pod-structure.png`
- `figure-3-three-layer-memory-stack.png`
- `figure-4-six-phase-cycle-flowchart.png`
- `figure-5-reversibility-tiers-pyramid.png`
- `figure-6-pod-architecture.png`
- `figure-7-overnight-build-workflow-flowchart.png`
- `figure-8-growth-efficiency-flywheel.png`

## Verification (product description accuracy)

- **TOC (playbook.md):** **7 chapters** (Ch 1–7) + **1 bonus section** (“Orcinus orca to ORCA” Research Paper) = **8 sections total**. There is no Chapter 8; the bonus is a separate section.
- **Current source:** `playbook.md` is ~1,300 words, 187 lines.
- **PDF page count:** Run `npx tsx scripts/export-pdf.ts` and open `apps/web/public/downloads/playbook.pdf` to get the exact page count. Product copy in `apps/web/lib/products.ts` should match (e.g. add “X-page” only after verifying).

## How to publish a new playbook version

1. Update **only** `playbook.md` and/or files in `figures/` as needed.
2. From the **ApexORCA Code Base** root, run:  
   `npx tsx scripts/export-pdf.ts`
3. The script generates `apps/web/public/downloads/playbook.pdf`. That file is what the site serves for instant download after purchase.
4. Deploy. Do not edit `playbook.pdf` manually.

## One-time setup (if this folder was just created)

1. Copy your finished playbook Markdown into this folder and name it **`playbook.md`**.
2. Copy all 9 images (logo + 8 diagrams) into **`figures/`** with the exact names listed above.
3. Run the export script once to confirm the PDF builds and looks correct.
