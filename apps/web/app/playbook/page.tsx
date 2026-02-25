import CheckoutButton from "@/components/checkout-button";

export default function PlaybookPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold mb-8">How to Hire an ORCA-Governed AI</h1>
      <p className="text-xl text-muted-foreground mb-12">
        75-page playbook + full template kit. Includes the complete &quot;Orcinus orca to ORCA&quot; research paper.
      </p>
      <div className="bg-zinc-900 p-10 rounded-3xl mb-12">
        <div className="text-6xl font-mono mb-4">$39</div>
        <div className="text-sm text-[#00E5FF]">One-time • Instant download • Lifetime updates</div>
      </div>
      <CheckoutButton productId="playbook">Buy Now — Instant Access</CheckoutButton>
    </div>
  );
}
