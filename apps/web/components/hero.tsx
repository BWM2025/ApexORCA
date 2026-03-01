import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-[#050A0F] text-white relative overflow-hidden">
      <video
        key="orca-lobster-hero"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src="/hero-orca-lobster.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(#00E5FF_0.8px,transparent_1px)] [background-size:40px_40px] opacity-10" />
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6 bg-white/10 rounded-full px-4 py-1 text-sm">
          <Award className="h-4 w-4 text-[#00E5FF]" /> Based on real orca research
        </div>
        <div className="inline-flex items-center gap-2 mb-6 bg-white/10 rounded-full px-4 py-1 text-sm">
          <span className="text-[#00E5FF]">✓ Zero API cost option (Claude Pro or LM Studio)</span>
        </div>
        <h1 className="text-7xl font-bold tracking-tighter mb-6">
          Apex Intelligence
          <br />
          for Your AI Agents
        </h1>
        <p className="text-2xl text-[#A1AAB8] max-w-3xl mx-auto mb-6">
          REAL Governance is what creates<br />
          <span className="text-[#00E5FF] font-semibold">REAL agency worth having.</span>
        </p>
        <p className="text-base text-[#A1AAB8]/90 max-w-2xl mx-auto mb-10">
          Every agent runs with an <strong className="text-white">invisible ORCA cage</strong>: traceability matrix and phase-locked steps in the background, halts on deviation, and <strong className="text-white">Trust Meter on request</strong>. No drift, no fake progress — natural, governed responses.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild className="text-lg px-10 bg-[#00E5FF] text-black hover:bg-[#00E5FF]/90">
            <Link href="/playbook">Buy Playbook — $39</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg px-10 border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF]/10">
            <Link href="/marketplace">Browse Marketplace</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
