// lib/downloads.ts
// © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore
// Single source of truth: which download(s) each product delivers.
// Build playbook PDF: npx tsx scripts/export-pdf.ts
// Build product ZIPs: npx tsx scripts/generate-product-zips.ts
// All files live in apps/web/public/downloads/

import { getAllProductSlugs } from "@/lib/products";

export interface DownloadItem {
  label: string;
  href: string;
}

/** Product slug → list of download links shown after purchase. 7 products + playbook = 8. */
const productDownloads: Record<string, DownloadItem[]> = {
  playbook: [
    { label: "Playbook (PDF)", href: "/downloads/playbook.pdf" },
  ],
  "ceo-pod": [
    { label: "CEO Pod Complete (ZIP)", href: "/downloads/ceo-pod.zip" },
  ],
  "marketing-pod": [
    { label: "Marketing Pod Complete (ZIP)", href: "/downloads/marketing-pod.zip" },
  ],
  "technical-pod": [
    { label: "Technical Pod Complete (ZIP)", href: "/downloads/technical-pod.zip" },
  ],
  "operations-pod": [
    { label: "Operations Pod Complete (ZIP)", href: "/downloads/operations-pod.zip" },
  ],
  "governance-booster": [
    { label: "Governance Booster Complete (ZIP)", href: "/downloads/governance-booster.zip" },
  ],
  "growth-engine": [
    { label: "Growth Engine Complete (ZIP)", href: "/downloads/growth-engine.zip" },
  ],
  "pod-os": [
    { label: "Pod Orchestrator Complete (ZIP)", href: "/downloads/pod-os.zip" },
  ],
};

export function getDownloadLinks(productId: string): DownloadItem[] {
  return productDownloads[productId] ?? [];
}

// Ensure every marketplace product has download links (dev guard)
const _allSlugs = getAllProductSlugs();
const _missingDownloads = _allSlugs.filter((id) => !productDownloads[id]?.length);
if (typeof window === "undefined" && _missingDownloads.length > 0) {
  console.warn("[downloads] No links for:", _missingDownloads.join(", "));
}
