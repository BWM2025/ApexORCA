import ProductCard from "./product-card";

const skills = [
  { slug: "governance-booster", name: "ORCA Governance Booster", price: 49, description: "Instantly upgrade any OpenClaw agent with full ORCA Governance DNA. Phase-locking, self-audit, traceability, and zero drift — dropped straight into your existing setup." },
  { slug: "x-growth", name: "X Growth Booster", price: 19, description: "Autonomous X/Twitter growth with ORCA governance. Phase-locked posting, audience building, and engagement — no spam, no drift, no guessing." },
  { slug: "sentry-pro", name: "Pipeline Security Booster", price: 29, description: "Auto-fix, secure deployments, pipeline monitoring, and full traceability. ORCA-Governed security that catches problems before they become disasters." },
  { slug: "aeo-booster", name: "AEO Visibility Booster", price: 39, description: "Get your content ranked and visible in Perplexity, ChatGPT Search, Grok, Claude, and all AI search engines. ORCA-Governed AEO that makes you the answer." },
];

export default function SkillGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {skills.map((s) => (
        <ProductCard key={s.slug} product={s} type="skill" />
      ))}
    </div>
  );
}
