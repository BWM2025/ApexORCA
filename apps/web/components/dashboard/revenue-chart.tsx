"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DayPoint {
  day: string;
  revenue: number;
}

export default function RevenueChart() {
  const [data, setData] = useState<DayPoint[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard/stats");
        if (!res.ok) return;
        const json = await res.json();
        setData(json.revenueByDay ?? []);
      } catch {
        setData([]);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const hasSales = data.some((d) => d.revenue > 0);

  return (
    <Card className="h-80">
      <CardContent className="p-6 h-full">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Loading…
          </div>
        ) : !hasSales ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
            <p className="text-lg font-medium">Real sales (USD)</p>
            <p>$0 — Sales will appear here as customers purchase.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke="#00E5FF" strokeWidth={3} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
