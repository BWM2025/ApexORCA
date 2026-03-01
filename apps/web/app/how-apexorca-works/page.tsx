import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "How ApexORCA Works",
  description:
    "A full AI company that runs itself—with governance you can trust. Governed pods on OpenClaw. One afternoon to running. Your LLM, one-time purchase.",
};

export default function HowApexORCAWorksPage() {
  return (
    <article className="max-w-xl mx-auto px-4 sm:px-5 py-6 text-white text-sm leading-relaxed">
      <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
        How ApexORCA Works
      </h1>
      <p className="text-lg text-[#A1AAB8] mb-6">
        A full AI company that runs itself—with governance you can trust.
      </p>

      <p className="text-[#A1AAB8] mb-4">
        ApexORCA gives you a pod of governed AI agents: strategy (CEO), marketing, technical, ops, and growth. They run on OpenClaw. You send short mandates from WhatsApp or Telegram; the pod executes with full traceability, phase-locked steps, and automatic halt on risk. No drift, no black boxes—agency you can audit.
      </p>

      <p className="text-[#A1AAB8] mb-4">
        ORCA Governance runs in the background. Every action is logged. Workflows are phased; the Trust Meter is available on request; Moby vetoes risky or irreversible moves. You get natural replies—and a full audit trail whenever you need it.
      </p>

      <p className="text-[#A1AAB8] mb-4">
        You get a full pod or individual agents (ZIPs, $19–$129). Install into OpenClaw in one afternoon; use your own LLM—Grok, Claude, local—no lock-in. One-time purchase. Run strategy, marketing, code, ops, and growth autonomously, or start with the playbook and build your own. A nightly HEARTBEAT brief keeps you in the loop without micromanaging.
      </p>

      <p className="text-[#A1AAB8] mb-6">
        Other agent platforms don’t enforce governance. ApexORCA does—so you get reliability and full autonomy without the risk.
      </p>

      <div className="flex flex-wrap gap-2">
        <Button asChild className="bg-[#00E5FF] text-[#050A0F] hover:bg-[#00E5FF]/90 h-9 px-5 text-sm font-medium">
          <Link href="/dashboard">Get Started</Link>
        </Button>
        <Button asChild variant="outline" className="border-white/25 text-white/90 hover:bg-white/10 h-9 px-5 text-sm font-medium">
          <Link href="/playbook">Read the Playbook</Link>
        </Button>
        <Button asChild variant="outline" className="border-white/25 text-white/90 hover:bg-white/10 h-9 px-5 text-sm font-medium">
          <Link href="/marketplace">Browse Marketplace</Link>
        </Button>
      </div>
    </article>
  );
}
