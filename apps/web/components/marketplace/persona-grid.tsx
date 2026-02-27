import ProductCard from "./product-card";
import { getProduct, getProductIdsByCategory } from "@/lib/products";

export default function PersonaGrid() {
  const { personas: personaIds } = getProductIdsByCategory();
  const personas = personaIds
    .map((id) => getProduct(id))
    .filter(Boolean)
    .map((p) => ({ slug: p!.slug, name: p!.name, price: p!.price, description: p!.blurb }));

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {personas.map((p) => (
        <ProductCard key={p.slug} product={p} type="persona" />
      ))}
    </div>
  );
}
