import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Shield, Users } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 bg-[#050A0F]">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">How ApexORCA Works</h2>
        <p className="text-2xl text-[#A1AAB8] max-w-3xl mx-auto">
          REAL Governance is what creates REAL agency worth having
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-[#00E5FF]/20 bg-[#0A1421]">
          <CardContent className="p-8 text-center">
            <Brain className="h-12 w-12 text-[#00E5FF] mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3">Infinite Memory</h3>
            <p className="text-[#A1AAB8]">3-layer memory that never forgets context. Every decision is traceable across sessions.</p>
          </CardContent>
        </Card>

        <Card className="border-[#00E5FF]/20 bg-[#0A1421]">
          <CardContent className="p-8 text-center">
            <Zap className="h-12 w-12 text-[#00E5FF] mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3">Self-Learning</h3>
            <p className="text-[#A1AAB8]">Nightly HEARTBEAT self-audit automatically improves performance. The pod gets smarter every single day.</p>
          </CardContent>
        </Card>

        <Card className="border-[#00E5FF]/20 bg-[#0A1421]">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-[#00E5FF] mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3">Customized Governance</h3>
            <p className="text-[#A1AAB8]">Phase-locked execution with reversibility tiers. Moby vetoes risky actions. Zero drift, zero hallucinations.</p>
          </CardContent>
        </Card>

        <Card className="border-[#00E5FF]/20 bg-[#0A1421]">
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-[#00E5FF] mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3">Anyone Can Use It</h3>
            <p className="text-[#A1AAB8]">No coding required. Just drop the files into OpenClaw. Zero cost to start beyond your one-time purchase. Anyone with a seed idea can have real agency today.</p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12">
        <p className="text-xl text-[#A1AAB8] max-w-4xl mx-auto whitespace-nowrap">
          Governance is the missing layer that turns powerful AI into agents you can actually trust with your business
        </p>
      </div>
    </div>
  );
}
