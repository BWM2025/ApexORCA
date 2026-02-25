"use client";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", revenue: 1240 },
  { day: "Tue", revenue: 1890 },
  { day: "Wed", revenue: 2340 },
  { day: "Thu", revenue: 3120 },
  { day: "Fri", revenue: 4520 },
];

export default function RevenueChart() {
  return (
    <Card className="h-80">
      <CardContent className="p-6 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#00E5FF" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
