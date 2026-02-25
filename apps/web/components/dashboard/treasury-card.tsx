import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export default function TreasuryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Wallet className="h-6 w-6" />
          Apex Pod Treasury (Base)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="text-4xl font-mono font-bold">34.82 ETH</div>
          <div className="text-sm text-[#00E5FF]">~$67,400</div>
        </div>
        <div>
          <div className="text-3xl font-mono">12,450 USDC</div>
        </div>
        <div className="text-xs text-muted-foreground pt-4 border-t">Address: 0x... (click to view on BaseScan)</div>
      </CardContent>
    </Card>
  );
}
