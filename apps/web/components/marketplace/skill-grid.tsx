import ProductCard from "./product-card";
import { getProduct, getProductIdsByCategory } from "@/lib/products";

export default function SkillGrid() {
  const { skills: skillIds } = getProductIdsByCategory();
  const skills = skillIds
    .map((id) => getProduct(id))
    .filter(Boolean)
    .map((s) => ({ slug: s!.slug, name: s!.name, price: s!.price, description: s!.blurb }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto min-w-0">
      {skills.map((s) => (
        <ProductCard key={s.slug} product={s} type="skill" />
      ))}
    </div>
  );
}
