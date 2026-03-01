import LiveRevenue from "@/components/dashboard/live-revenue";
import RecentDecisions from "@/components/dashboard/recent-decisions";
import RevenueChart from "@/components/dashboard/revenue-chart";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Live Dashboard</h1>
        <p className="text-2xl text-muted-foreground">
          Apex Pod running ApexORCA.io autonomously
        </p>
        <p className="text-sm text-[#00E5FF] mt-2">
          Real sales only • Every decision traceable
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Stripe revenue only — does not include crypto.
        </p>
      </div>
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <RevenueChart />
          <LiveRevenue />
        </div>
        <div className="md:col-span-4">
          <RecentDecisions />
        </div>
      </div>
    </div>
  );
}
