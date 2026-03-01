"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ROICalculator() {
  const [agentCount, setAgentCount] = useState<number>(5);
  const monthlyLabourSavings = agentCount * 8200;
  const outputMultiplier = agentCount; // e.g. 5 agents = 5x 24/7 output potential

  return (
    <Card className="max-w-6xl mx-auto bg-zinc-900/40 backdrop-blur-sm border border-white/10">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-white font-bold">
          Ready-to-Run Compliant Super Agents with Real Capabilities and Real Agency
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Roles you&apos;re delegating to governed agents
            </label>
            <p className="text-xs text-[#A1AAB8] mb-2">Re-invent roles: delegate, automate, run 24/7</p>
            <Input
              type="number"
              min={1}
              max={20}
              value={agentCount}
              onChange={(e) => setAgentCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
              className="text-3xl font-mono text-center h-14"
            />
          </div>
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-[#00E5FF] tracking-tighter">
              ${monthlyLabourSavings.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">labour savings / month</div>
            <div className="text-sm text-white/90 pt-1">
              {outputMultiplier}× 24/7 output potential
            </div>
          </div>
          <div>
            <Button size="lg" className="w-full text-lg" asChild>
              <a href="/playbook">Get the $39 Playbook →</a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
