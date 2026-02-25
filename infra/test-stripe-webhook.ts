/**
 * Test script to verify Stripe webhook and purchase recording
 * Run with: npx tsx infra/test-stripe-webhook.ts
 * © 2026 ApexORCA.io — All rights reserved. Founder: B.W. Moore
 */

import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-28.basil",
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function testPurchaseFlow() {
  console.log("🧪 Testing ApexORCA Purchase Flow...\n");

  // 1. Check recent Stripe sessions
  console.log("1. Checking Stripe sessions...");
  const sessions = await stripe.checkout.sessions.list({
    status: "complete",
    limit: 5,
  });
  console.log(`   Found ${sessions.data.length} completed sessions\n`);

  // 2. Check Supabase purchases
  console.log("2. Checking Supabase purchases...");
  const { data: purchases, error } = await supabase
    .from("purchases")
    .select("*")
    .order("purchased_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("   ❌ Error:", error.message);
    console.log("   💡 Make sure schema is applied in Supabase\n");
  } else {
    console.log(`   Found ${purchases?.length || 0} purchases in database\n`);
  }

  // 3. Compare Stripe vs Supabase
  console.log("3. Comparing Stripe vs Supabase...");
  const stripeSessionIds = new Set(sessions.data.map((s) => s.id));
  const dbSessionIds = new Set(purchases?.map((p) => p.session_id) || []);

  const missing = sessions.data.filter((s) => !dbSessionIds.has(s.id));
  if (missing.length > 0) {
    console.log(`   ⚠️  ${missing.length} Stripe sessions not in database:`);
    missing.forEach((s) => {
      console.log(`      - ${s.id} (${s.metadata?.productId || "unknown"})`);
    });
    console.log("   💡 Webhook may not be firing or saving correctly\n");
  } else {
    console.log("   ✅ All Stripe sessions are in database\n");
  }

  // 4. Test dashboard API
  console.log("4. Testing dashboard stats calculation...");
  const calculateRevenue = (days: number | null) => {
    const cutoff = days ? Date.now() - days * 24 * 60 * 60 * 1000 : 0;
    return sessions.data
      .filter((s) => !days || new Date(s.created * 1000).getTime() > cutoff)
      .reduce((sum, s) => sum + (s.amount_total || 0) / 100, 0);
  };

  const sevenDay = calculateRevenue(7);
  const thirtyDay = calculateRevenue(30);
  const lifetime = calculateRevenue(null);

  console.log(`   7-day revenue: $${Math.round(sevenDay)}`);
  console.log(`   30-day revenue: $${Math.round(thirtyDay)}`);
  console.log(`   Lifetime revenue: $${Math.round(lifetime)}\n`);

  console.log("✅ Test complete!");
  console.log("\nNext: Visit /dashboard to see this data displayed");
}

testPurchaseFlow().catch(console.error);
