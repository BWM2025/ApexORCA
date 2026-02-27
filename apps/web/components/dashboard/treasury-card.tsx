"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";

/** Legacy treasury card: reads from /api/treasury. Use NEXT_PUBLIC_TREASURY_ADDRESS for live Base wallet (empty = placeholder). */
export default function TreasuryCard() {
  const [treasury, setTreasury] = useState<{ eth: string; usdc: string } | null>(null);
  const address =
    typeof window !== "undefined"
      ? (process.env.NEXT_PUBLIC_TREASURY_ADDRESS ?? "")
      : "";

  useEffect(() => {
    fetch("/api/treasury")
      .then((r) => r.json())
      .then((data) => setTreasury({ eth: data.eth ?? "0", usdc: data.usdc ?? "0" }))
      .catch(() => setTreasury({ eth: "0", usdc: "0" }));
  }, []);

  const hasAddress = address && address.length > 10;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Wallet className="h-6 w-6 text-[#00E5FF]" />
          Apex Pod Treasury (Base)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!hasAddress && (
          <p className="text-sm text-muted-foreground border border-dashed rounded-md p-3">
            Treasury activates post-launch. AI-CEO coordinates; see docs/BIGGIE_ACTIVATION_ROADMAP.md.
          </p>
        )}
        {hasAddress && treasury && (
          <>
            <div>
              <div className="text-4xl font-mono font-bold">{treasury.eth} ETH</div>
              <div className="text-sm text-[#00E5FF]">
                ~${(parseFloat(treasury.eth) * 1930).toFixed(0)}
              </div>
            </div>
            <div>
              <div className="text-3xl font-mono">{treasury.usdc} USDC</div>
            </div>
            <div className="text-xs text-muted-foreground pt-4 border-t">
              <a
                href={`https://basescan.org/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00E5FF]"
              >
                View on BaseScan
              </a>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
