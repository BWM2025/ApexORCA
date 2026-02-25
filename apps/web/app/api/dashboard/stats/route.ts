import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // Get real revenue from Stripe
    const sessions = await stripe.checkout.sessions.list({
      status: 'complete',
      limit: 100,
    });

    const calculateRevenue = (days: number | null) => {
      const cutoff = days ? Date.now() - days * 24 * 60 * 60 * 1000 : 0;
      return sessions.data
        .filter(s => !days || new Date(s.created * 1000).getTime() > cutoff)
        .reduce((sum, s) => sum + (s.amount_total || 0) / 100, 0);
    };

    const sevenDay = calculateRevenue(7);
    const thirtyDay = calculateRevenue(30);
    const lifetime = calculateRevenue(null);

    // Get real recent purchases
    const { data: purchases, error: purchasesError } = await supabase
      .from('purchases')
      .select('*')
      .order('purchased_at', { ascending: false })
      .limit(5);

    if (purchasesError) {
      console.error("Error fetching purchases:", purchasesError);
    }

    return Response.json({
      revenue: { 
        sevenDay: Math.round(sevenDay), 
        thirtyDay: Math.round(thirtyDay), 
        lifetime: Math.round(lifetime) 
      },
      treasury: { eth: "34.82", usdc: "12450" }, // Keep static for now or connect later
      decisions: purchases?.map(p => ({
        time: new Date(p.purchased_at).toLocaleString(),
        action: `Purchase: ${p.product_id}`,
        result: "Completed",
      })) || [],
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    // Return fallback data on error
    return Response.json({
      revenue: { sevenDay: 0, thirtyDay: 0, lifetime: 0 },
      treasury: { eth: "34.82", usdc: "12450" },
      decisions: [],
    }, { status: 500 });
  }
}
