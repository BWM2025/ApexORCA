"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center text-white relative">
      <div className="text-center px-6 max-w-5xl mx-auto">
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-2 mb-6 bg-white/10 hover:bg-white/15 rounded-full px-4 py-1 text-sm text-left transition-colors cursor-pointer border-0"
            >
              <BookOpen className="h-4 w-4 text-[#00E5FF] shrink-0" />
              <span>Nature&apos;s blueprint for governed AI</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-lg bg-[#050A0F] border-[#1a2332] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">
                Orca pods → ORCA agents
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-[#A1AAB8] text-sm leading-relaxed">
              <p>
                Wild orca pods are a natural governance case study: matrilineal structure, cultural transmission of hunting tactics, phase-locked coordination, and distinct vocal dialects. Their success depends on constraint and coordination, not brute force — power is channeled into narrow, culturally defined behaviors.
              </p>
              <p>
                We map that onto AI: phase-locked reasoning instead of ad-hoc prompting; role-separated agents instead of one undifferentiated model; stable protocols and traceability instead of one-off prompts. The result is a conceptual bridge: oceanic orca as proof that high capability and high constraint can coexist; ApexORCA as the engineering realization of that balance in artificial systems.
              </p>
              <p className="text-[#00E5FF]/90">
                The analogy is conceptual, not literal — it informs how we build. The full research paper is in the playbook.
              </p>
            </div>
            <Link
              href="/playbook"
              className="inline-block mt-2 text-sm font-medium text-[#00E5FF] hover:underline"
            >
              Playbook (includes full paper) →
            </Link>
          </DialogContent>
        </Dialog>
        <h1 className="text-7xl font-bold tracking-tighter mb-6">
          <span className="font-apex-logo">Apex</span> Intelligence
          <br />
          for Your AI Agents
        </h1>
        <p className="text-2xl text-[#A1AAB8] max-w-3xl mx-auto mb-6">
          REAL Governance that creates<br />
          <span className="text-[#00E5FF] font-semibold">REAL Agency worth having.</span>
        </p>
        <p className="text-base text-[#A1AAB8]/90 max-w-3xl mx-auto mb-10">
          Traceability and phase-locked execution aren’t add-ons—they’re the core. Every agent runs with a persistent <strong className="text-white">traceability matrix</strong>, anchored steps, automatic <strong className="text-white">halt on deviation</strong>, and a <strong className="text-white">Trust Meter™</strong> you can request anytime. You get agency you can audit: no drift, no fabricated progress. Model-agnostic: use any LLM. No extra API cost when you use your own key or run locally.
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
