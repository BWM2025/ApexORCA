import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingTeaser() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <div className="text-4xl font-bold mb-4">Start with the $39 Playbook</div>
      <div className="text-2xl text-muted-foreground mb-10">Everything FelixCraft.ai sells — plus real ORCA Governance</div>
      <Button size="lg" asChild>
        <Link href="/playbook">Buy Now — Instant Access</Link>
      </Button>
    </div>
  );
}
