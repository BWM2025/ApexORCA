import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Shield, Users } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">How ApexORCA Works</h2>
        <p className="text-2xl text-[#A1AAB8] max-w-3xl mx-auto">
          REAL Governance is what creates REAL agency worth having
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 hover:border-[#00E5FF]/30 transition-colors flex flex-col">
          <CardContent className="p-8 text-center flex flex-col flex-1">
            <Brain className="h-12 w-12 text-[#00E5FF] mx-auto mb-6 shrink-0" />
            <h3 className="text-2xl font-bold mb-3">Infinite Memory</h3>
            <p className="text-[#A1AAB8] flex-1">Three-layer memory with a traceability anchor on every action. OpenClaw gives your pod infinite context across sessions; nightly HEARTBEAT consolidates. Every decision logged and auditable—no black boxes, no forgotten context.</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 hover:border-[#00E5FF]/30 transition-colors flex flex-col">
          <CardContent className="p-8 text-center flex flex-col flex-1">
            <Zap className="h-12 w-12 text-[#00E5FF] mx-auto mb-6 shrink-0" />
            <h3 className="text-2xl font-bold mb-3">Self-Learning</h3>
            <p className="text-[#A1AAB8] flex-1">Nightly HEARTBEAT is a self-audit: matrix validation, Trust Meter™ check, 0.99 intent threshold. It tracks open work and in-flight sessions so nothing is dropped. When confidence dips, the pod triggers fixes and learns from logs. You get a daily brief; your pod gets smarter every day.</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 hover:border-[#00E5FF]/30 transition-colors flex flex-col">
          <CardContent className="p-8 text-center flex flex-col flex-1">
            <Shield className="h-12 w-12 text-[#00E5FF] mx-auto mb-6 shrink-0" />
            <h3 className="text-2xl font-bold mb-3">Governance</h3>
            <p className="text-[#A1AAB8] flex-1">Traceability matrix and phase-locked execution run in the background. Deviation triggers a silent halt and natural response; Trust Meter™ on request; Moby vetoes risky or irreversible moves. Zero drift, zero fabricated output—agency that feels natural and is fully auditable.</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 hover:border-[#00E5FF]/30 transition-colors flex flex-col">
          <CardContent className="p-8 text-center flex flex-col flex-1">
            <Users className="h-12 w-12 text-[#00E5FF] mx-auto mb-6 shrink-0" />
            <h3 className="text-2xl font-bold mb-3">Ready-to-Run</h3>
            <p className="text-[#A1AAB8] flex-1">No build-from-scratch. Drop the pod files into OpenClaw, add your LLM key (Grok, Claude, or local), and you’re running in one afternoon. One-time purchase, no subscription. You send short mandates from WhatsApp or Telegram; the pod runs autonomously. Real agency without the lock-in.</p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
