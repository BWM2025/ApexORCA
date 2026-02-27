import { Check, X } from "lucide-react";
import React from "react";

const features = [
  { feature: "Sells AI employees as downloadable products", apex: true, felixcraft: true, crewai: false, autogpt: false, langchain: false },
  { feature: "ORCA Governance DNA (phase-locked execution, zero-drift memory, self-audit)", apex: true, felixcraft: false, crewai: false, autogpt: false, langchain: false },
  { feature: "Public live revenue dashboard showing real operations", apex: true, felixcraft: true, crewai: false, autogpt: false, langchain: false },
  { feature: "Dedicated governance auditor agent with veto power", apex: true, felixcraft: false, crewai: false, autogpt: false, langchain: false },
  { feature: "Traceability matrix on every action", apex: true, felixcraft: false, crewai: false, autogpt: false, langchain: false },
  { feature: "Academic research foundation (real orca paper + PhD validation)", apex: true, felixcraft: false, crewai: false, autogpt: false, langchain: false },
  { feature: "Ready-to-run without any coding or development required", apex: true, felixcraft: true, crewai: false, autogpt: false, langchain: false },
  { feature: "Model agnostic (Claude / GPT / Grok / local)", apex: true, felixcraft: true, crewai: true, autogpt: false, langchain: "partial" as const },
];

export default function CompetitorComparison() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">Real Agents with Real Governance</h2>
      </div>

      <div className="grid grid-cols-6 gap-px bg-zinc-800 rounded-3xl overflow-hidden border border-zinc-800">
        {/* Header row */}
        <div className="bg-[#050A0F] p-6 font-bold text-lg text-white border-r border-zinc-800">
          Feature
        </div>
        <div className="bg-[#050A0F] p-6 flex items-center justify-center min-h-[280px] border-r border-zinc-800">
          <img src="/apex-logo-trans.png" alt="ApexORCA" className="h-[16rem] w-auto max-w-full object-contain -translate-y-3" title="ApexORCA" />
        </div>
        <div className="bg-[#050A0F] p-6 flex flex-col items-center justify-center min-h-[280px] border-r border-zinc-800">
          <div className="font-bold text-xl text-white mb-1">FelixCraft.ai</div>
          <div className="text-xs text-[#A1AAB8]">Ready-to-run</div>
        </div>
        <div className="bg-[#050A0F] p-6 flex flex-col items-center justify-center min-h-[280px] border-r border-zinc-800">
          <div className="font-bold text-xl text-white mb-1">CrewAI</div>
          <div className="text-xs text-[#A1AAB8]">Framework</div>
        </div>
        <div className="bg-[#050A0F] p-6 flex flex-col items-center justify-center min-h-[280px] border-r border-zinc-800">
          <div className="font-bold text-xl text-white mb-1">Auto-GPT</div>
          <div className="text-xs text-[#A1AAB8]">Autonomous</div>
        </div>
        <div className="bg-[#050A0F] p-6 flex flex-col items-center justify-center min-h-[280px]">
          <div className="font-bold text-xl text-white mb-1">LangChain</div>
          <div className="text-xs text-[#A1AAB8]">Orchestration</div>
        </div>

        {/* Features */}
        {features.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="bg-zinc-900 p-6 font-medium text-[#A1AAB8] text-sm border-r border-b border-zinc-800">
              {row.feature}
            </div>
            <div className="bg-zinc-900 p-6 flex items-center justify-center border-r border-b border-zinc-800">
              {row.apex ? <Check className="h-6 w-6 text-[#00E5FF]" /> : <X className="h-6 w-6 text-zinc-600" />}
            </div>
            <div className="bg-zinc-900 p-6 flex items-center justify-center border-r border-b border-zinc-800">
              {row.felixcraft ? <Check className="h-6 w-6 text-zinc-400" /> : <X className="h-6 w-6 text-zinc-600" />}
            </div>
            <div className="bg-zinc-900 p-6 flex items-center justify-center border-r border-b border-zinc-800">
              {row.crewai ? <Check className="h-6 w-6 text-zinc-400" /> : <X className="h-6 w-6 text-zinc-600" />}
            </div>
            <div className="bg-zinc-900 p-6 flex items-center justify-center border-r border-b border-zinc-800">
              {row.autogpt ? <Check className="h-6 w-6 text-zinc-400" /> : <X className="h-6 w-6 text-zinc-600" />}
            </div>
            <div className="bg-zinc-900 p-6 flex items-center justify-center border-b border-zinc-800">
              {row.langchain === true ? <Check className="h-6 w-6 text-zinc-400" /> : row.langchain === "partial" ? <span className="text-xs text-zinc-500">Partial</span> : <X className="h-6 w-6 text-zinc-600" />}
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="mt-12 p-6 bg-[#0A1421] rounded-2xl border border-[#00E5FF]/20">
        <p className="text-center text-sm text-[#A1AAB8] mb-2">
          <span className="text-[#00E5FF] font-semibold">ApexORCA</span> sells AI employees as downloadable products (CEO Pod $129, Marketing Pod $59, Technical Pod $79, Operations Pod $99). <span className="text-white">FelixCraft.ai</span> showed what&apos;s possible — we built the version with real ORCA Governance DNA; <span className="text-white">CrewAI, Auto-GPT, and LangChain</span> are frameworks that require you to build and maintain your own agents.
        </p>
        <p className="text-center text-xs text-muted-foreground mt-2">
          <span className="text-[#00E5FF]">ORCA Governance DNA™</span> (phase-locked execution, zero-drift memory, self-audit) is the reliability layer built into every ApexORCA product. Comparison verified against public documentation as of February 2026.
        </p>
      </div>
    </div>
  );
}
