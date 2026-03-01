import { Check } from "lucide-react";
import React from "react";

const frameworkRows = [
  { feature: "Sells ready-to-run AI employees (CEO, Marketing, CTO, COO) as downloadable products", apexorca: true, crewai: false, autogpt: false, langchain: false },
  { feature: "Provides framework/tools to build your own agents (requires development)", apexorca: false, crewai: true, autogpt: true, langchain: true },
  { feature: "HEARTBEAT nightly self-audit (automatic performance review & improvement)", apexorca: true, crewai: false, autogpt: false, langchain: false },
  { feature: "Zero-drift memory with traceability anchors on every action", apexorca: true, crewai: false, autogpt: false, langchain: false },
  { feature: "Public live dashboard showing real revenue, decisions, and operations", apexorca: true, crewai: false, autogpt: false, langchain: false },
];

function Cell({ value }: { value: boolean }) {
  return value ? <Check className="h-5 w-5 text-[#00E5FF]" /> : <span className="text-[#A1AAB8]/50">—</span>;
}

export default function CompetitorComparison() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold mb-4">Real Agents = Real Agency</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] mx-auto border-collapse rounded-xl overflow-hidden bg-zinc-900/60 border border-white/10">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-6 text-[#A1AAB8] font-semibold">Feature</th>
              <th className="text-center py-4 px-6 text-[#00E5FF] font-semibold">
                <span className="block">ApexORCA</span>
                <span className="text-sm font-normal text-[#A1AAB8]">ORCA-Governed</span>
              </th>
              <th className="text-center py-4 px-6 text-[#A1AAB8] font-semibold">
                <span className="block">CrewAI</span>
                <span className="text-sm font-normal text-[#A1AAB8]/80">Multi-agent</span>
              </th>
              <th className="text-center py-4 px-6 text-[#A1AAB8] font-semibold">
                <span className="block">Auto-GPT</span>
                <span className="text-sm font-normal text-[#A1AAB8]/80">Autonomous</span>
              </th>
              <th className="text-center py-4 px-6 text-[#A1AAB8] font-semibold">
                <span className="block">LangChain</span>
                <span className="text-sm font-normal text-[#A1AAB8]/80">Orchestration</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {frameworkRows.map((row, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0">
                <td className="py-4 px-6 text-[#A1AAB8]">{row.feature}</td>
                <td className="py-4 px-6 text-center"><Cell value={row.apexorca} /></td>
                <td className="py-4 px-6 text-center"><Cell value={row.crewai} /></td>
                <td className="py-4 px-6 text-center"><Cell value={row.autogpt} /></td>
                <td className="py-4 px-6 text-center"><Cell value={row.langchain} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
