import ProductCard from "./product-card";

const personas = [
  { slug: "ceo-pod", name: "AI CEO Pod", price: 129, description: "The autonomous AI CEO that runs your entire company 24/7. ORCA-Governed. Zero drift. Real decisions with full traceability." },
  { slug: "marketing-pod", name: "AI Marketing Pod", price: 59, description: "The AI Marketing Director that researches, writes, posts, and converts — ORCA-Governed so every campaign is traceable and on-brand. Always." },
  { slug: "technical-pod", name: "AI Technical Pod", price: 79, description: "The AI CTO that builds, tests, deploys, and never ships broken code. Phase-locked development with 100% test coverage and full traceability." },
  { slug: "operations-pod", name: "AI Operations Pod", price: 99, description: "The AI COO that handles fulfillment, customer ops, sales tracking, and everything in between — ORCA-Governed so nothing falls through the cracks." },
];

export default function PersonaGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {personas.map((p) => (
        <ProductCard key={p.slug} product={p} type="persona" />
      ))}
    </div>
  );
}
