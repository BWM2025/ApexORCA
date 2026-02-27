import ProductCard from "./product-card";
import { getProduct, getProductIdsByCategory } from "@/lib/products";

export default function BundleGrid() {
  const { bundles: bundleIds } = getProductIdsByCategory();
  const bundles = bundleIds
    .map((id) => getProduct(id))
    .filter(Boolean)
    .map((b) => ({ slug: b!.slug, name: b!.name, price: b!.price, description: b!.blurb }));

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bundles.map((b) => (
        <ProductCard key={b.slug} product={b} type="skill" />
      ))}
    </div>
  );
}
