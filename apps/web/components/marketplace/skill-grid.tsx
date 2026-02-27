import ProductCard from "./product-card";
import { getProduct, getProductIdsByCategory } from "@/lib/products";

export default function SkillGrid() {
  const { skills: skillIds } = getProductIdsByCategory();
  const skills = skillIds
    .map((id) => getProduct(id))
    .filter(Boolean)
    .map((s) => ({ slug: s!.slug, name: s!.name, price: s!.price, description: s!.blurb }));

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {skills.map((s) => (
        <ProductCard key={s.slug} product={s} type="skill" />
      ))}
    </div>
  );
}
