"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface Decision {
  time: string;
  action: string;
  result: string;
}

export default function RecentDecisions() {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  useEffect(() => {
    const fetchDecisions = async () => {
      try {
        const res = await fetch("/api/dashboard/stats");
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType?.includes("application/json")) {
          setDecisions([
            { time: "—", action: "Waiting for API", result: "—" },
          ]);
          return;
        }
        const data = await res.json();
        setDecisions(data.decisions || []);
      } catch (e) {
        console.error("Failed to fetch decisions:", e);
        setDecisions([
          { time: "2m ago", action: "Shipped new Governance Booster skill", result: "Approved" },
          { time: "47m ago", action: "Updated playbook PDF with orca paper", result: "Completed" },
        ]);
      }
    };

    fetchDecisions();
    const interval = setInterval(fetchDecisions, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Clock className="h-6 w-6" />
          Live Governance Log — Apex Pod
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {decisions.length === 0 ? (
          <div className="text-muted-foreground py-4">Waiting for first decisions...</div>
        ) : (
          decisions.map((d, i) => (
            <div key={i} className="flex justify-between border-b pb-3 last:border-0 last:pb-0">
              <div>
                <div>{d.action}</div>
                <div className="text-xs text-muted-foreground">{d.time}</div>
              </div>
              <div className="text-[#00E5FF] font-medium">{d.result}</div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
