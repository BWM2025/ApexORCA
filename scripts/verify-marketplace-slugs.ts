/**
 * Verify all 8 marketplace products have consistent slugs in products, stripe priceMap, and downloads.
 * Run from repo root: npx tsx scripts/verify-marketplace-slugs.ts
 * Does not check that files exist in public/downloads (run export-pdf + generate-product-zips for that).
 */
import { getAllProductSlugs, getProduct } from "../apps/web/lib/products";
import { priceMap } from "../apps/web/lib/stripe";
import { getDownloadLinks } from "../apps/web/lib/downloads";

const slugs = getAllProductSlugs();
let failed = false;

console.log("Checking", slugs.length, "product slugs:\n");

for (const slug of slugs) {
  const inProducts = !!getProduct(slug);
  const inStripe = !!priceMap[slug];
  const links = getDownloadLinks(slug);
  const inDownloads = links.length > 0;

  const ok = inProducts && inStripe && inDownloads;
  if (!ok) {
    failed = true;
    if (!inProducts) console.log("  MISS products:", slug);
    if (!inStripe) console.log("  MISS priceMap:", slug);
    if (!inDownloads) console.log("  MISS downloads:", slug);
  } else {
    console.log("  OK", slug, "->", links.map((l) => l.href).join(", "));
  }
}

if (failed) {
  console.log("\nFix: add missing slug to lib/products.ts, lib/stripe.ts (priceMap), and/or lib/downloads.ts (productDownloads).");
  process.exit(1);
}

console.log("\nAll slugs have products, priceMap, and download links.");
