"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LiveRevenue() {
  const [stats, setStats] = useState({
    sevenDay: 12450,
    thirtyDay: 38920,
    lifetime: 124560,
  });

  useEffect(() => {
    // Fetch real data from API
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard/stats");
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType?.includes("application/json")) {
          return; // Keep existing state; API may have returned HTML (e.g. error page)
        }
        const data = await res.json();
        if (data?.revenue) {
          setStats({
            sevenDay: data.revenue.sevenDay ?? 0,
            thirtyDay: data.revenue.thirtyDay ?? 0,
            lifetime: data.revenue.lifetime ?? 0,
          });
        }
      } catch (e) {
        console.error("Failed to fetch revenue stats:", e);
      }
    };

    fetchStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Revenue (USD)</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-4xl font-mono font-bold text-[#00E5FF]">${stats.sevenDay.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Last 7 days</div>
        </div>
        <div>
          <div className="text-4xl font-mono font-bold">${stats.thirtyDay.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Last 30 days</div>
        </div>
        <div>
          <div className="text-4xl font-mono font-bold">${stats.lifetime.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Lifetime</div>
        </div>
      </CardContent>
    </Card>
  );
}
