import ProductCard from "./product-card";
import { getProduct, getProductIdsByCategory } from "@/lib/products";

export default function PersonaGrid() {
  const { personas: personaIds } = getProductIdsByCategory();
  const personas = personaIds
    .map((id) => getProduct(id))
    .filter(Boolean)
    .map((p) => ({ slug: p!.slug, name: p!.name, price: p!.price, description: p!.blurb }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
      {personas.map((p) => (
        <ProductCard key={p.slug} product={p} type="persona" />
      ))}
    </div>
  );
}
