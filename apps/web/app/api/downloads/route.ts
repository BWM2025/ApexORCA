import { stripe } from "@/lib/stripe";
import { getDownloadLinks } from "@/lib/downloads";
import { NextResponse } from "next/server";

/**
 * GET /api/downloads?session_id=cs_...
 * Returns download links for the product just purchased.
 * Validates session with Stripe so only paid customers get links.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 403 });
    }

    const productId = session.metadata?.productId;
    if (!productId) {
      return NextResponse.json({ error: "No product in session" }, { status: 400 });
    }

    const links = getDownloadLinks(productId);
    return NextResponse.json({ productId, links });
  } catch (e) {
    console.error("Downloads API error:", e);
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }
}
