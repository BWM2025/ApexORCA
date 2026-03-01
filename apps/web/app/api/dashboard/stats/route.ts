import { stripe } from "@/lib/stripe";

// Prevent Next from running this at build time (needs Stripe/Supabase env at runtime only)
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Real revenue from Stripe only (paid checkout sessions)
    const sessions = await stripe.checkout.sessions.list({
      status: "complete",
      limit: 100,
    });

    const calculateRevenue = (days: number | null) => {
      const cutoff = days ? Date.now() - days * 24 * 60 * 60 * 1000 : 0;
      return sessions.data
        .filter((s) => !days || (s.created && s.created * 1000 > cutoff))
        .reduce((sum, s) => sum + (s.amount_total ?? 0) / 100, 0);
    };

    const sevenDay = calculateRevenue(7);
    const thirtyDay = calculateRevenue(30);
    const lifetime = calculateRevenue(null);

    // Last 7 days revenue by day (for chart)
    const revenueByDay: { day: string; revenue: number }[] = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);
      const rev = sessions.data
        .filter(
          (s) =>
            s.created &&
            s.created * 1000 >= dayStart.getTime() &&
            s.created * 1000 <= dayEnd.getTime()
        )
        .reduce((sum, s) => sum + (s.amount_total ?? 0) / 100, 0);
      revenueByDay.push({
        day: dayNames[dayStart.getDay()],
        revenue: Math.round(rev * 100) / 100,
      });
    }

    // Optional: recent purchases from Supabase (if configured)
    let decisions: { time: string; action: string; result: string }[] = [];
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data: purchases } = await supabase
          .from("purchases")
          .select("*")
          .order("purchased_at", { ascending: false })
          .limit(5);
        decisions =
          purchases?.map((p: { purchased_at: string; product_id: string }) => ({
            time: new Date(p.purchased_at).toLocaleString(),
            action: `Purchase: ${p.product_id}`,
            result: "Completed",
          })) ?? [];
      } catch {
        // Supabase not configured or error — leave decisions empty
      }
    }

    return Response.json({
      revenue: {
        sevenDay: Math.round(sevenDay * 100) / 100,
        thirtyDay: Math.round(thirtyDay * 100) / 100,
        lifetime: Math.round(lifetime * 100) / 100,
      },
      revenueByDay,
      decisions,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return Response.json(
      {
        revenue: { sevenDay: 0, thirtyDay: 0, lifetime: 0 },
        revenueByDay: [],
        decisions: [],
      },
      { status: 500 }
    );
  }
}
