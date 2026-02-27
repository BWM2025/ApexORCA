"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Biggie Treasury (Base) — Live when AI-CEO activates post-launch. Placeholder until then. */
export default function BiggieTreasury() {
  const [treasury, setTreasury] = useState({
    eth: "0",
    usdc: "0",
    yieldThisMonth: "0",
  });
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetch("/api/treasury/biggie")
      .then((r) => r.json())
      .then((data) => {
        setTreasury({
          eth: data.eth ?? "0",
          usdc: data.usdc ?? "0",
          yieldThisMonth: data.yieldThisMonth ?? "0",
        });
        setActive(parseFloat(data.eth ?? "0") > 0 || parseFloat(data.usdc ?? "0") > 0);
      })
      .catch(() => {});
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Wallet className="h-6 w-6 text-[#00E5FF]" />
          Biggie Treasury (Base) — {active ? "Live" : "Post-launch"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!active && (
          <p className="text-sm text-muted-foreground border border-dashed rounded-md p-3">
            To be completed by AI-CEO and team as CEO dictates, a few days after launch. See docs/BIGGIE_ACTIVATION_ROADMAP.md.
          </p>
        )}
        {active && (
          <>
            <div className="flex justify-between">
              <div>
                <div className="text-4xl font-mono font-bold">{treasury.eth} ETH</div>
                <div className="text-sm text-[#00E5FF]">
                  ~${(parseFloat(treasury.eth) * 1930).toFixed(0)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-mono">{treasury.usdc} USDC</div>
              </div>
            </div>
            <div className="pt-4 border-t flex items-center gap-2 text-sm text-[#00E5FF]">
              <TrendingUp className="h-4 w-4" />
              Yield this month: ${treasury.yieldThisMonth}
            </div>
            <div className="text-xs text-muted-foreground">
              <a
                href="https://basescan.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00E5FF]"
              >
                View on BaseScan (address set by AI-team)
              </a>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
