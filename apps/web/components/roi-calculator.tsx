"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ROICalculator() {
  const [teamSize, setTeamSize] = useState<number>(5);
  const monthlySavings = teamSize * 8200;

  return (
    <Card className="max-w-6xl mx-auto border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl flex flex-nowrap items-center gap-0">
          <img src="/apex-logo-banner.png" alt="ApexORCA" className="w-auto inline-block align-middle shrink-0 mix-blend-screen" style={{ height: '2.5em' }} />
          <span className="leading-none">'s REAL Governance is what creates REAL Agency worth having</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Number of roles you want to replace
            </label>
            <Input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(Math.max(1, parseInt(e.target.value) || 1))}
              className="text-4xl font-mono text-center h-16"
            />
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-[#00E5FF] tracking-tighter">
              ${monthlySavings.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">saved every month</div>
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
