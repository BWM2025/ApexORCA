import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { isEmailConfigured, sendPurchaseEmail } from "@/lib/email";
import { getProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // Compliance: only PII we store is email + purchase record. No card data. See lib/compliance.ts and Privacy Policy.
    const productId = session.metadata?.productId;
    const userEmail = session.customer_details?.email || session.customer_email;
    const sessionId = session.id;
    const amount = session.amount_total ? session.amount_total / 100 : 0;

    if (!productId || !userEmail || !sessionId) {
      console.error("Missing required purchase data:", { productId, userEmail, sessionId });
      return NextResponse.json({ received: true }); // Still return success to Stripe
    }

    console.log(`Payment successful for ${productId} — session ${sessionId}`);

    // Save directly to database (no HTTP call needed) — client created at runtime so build never needs env
    const supabase = getSupabase();
    if (supabase) {
      const { error } = await supabase.from("purchases").insert({
        product_id: productId,
        user_email: userEmail,
        session_id: sessionId,
        amount: amount,
      });

      if (error) {
        if (error.code === "23505") {
          // Unique violation (session_id): duplicate webhook event — idempotent, treat as success
          console.log("Purchase already recorded for session", sessionId);
        } else {
          console.error("Failed to record purchase:", error);
        }
      } else {
        console.log("Purchase recorded successfully");
      }
    }

    // Send purchase confirmation email with download links when Resend is configured
    if (isEmailConfigured()) {
      try {
        const product = getProduct(productId);
        const result = await sendPurchaseEmail({
          to: userEmail,
          productId,
          productName: product?.name,
        });
        if (!result.ok) {
          console.warn("[webhook] Purchase email not sent:", result.error);
        }
      } catch (emailErr) {
        console.warn("[webhook] Purchase email error:", emailErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
