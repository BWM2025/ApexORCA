import { NextRequest } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { getProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();
    if (!productId || typeof productId !== "string") {
      return Response.json({ error: "productId required" }, { status: 400 });
    }
    if (!getProduct(productId)) {
      return Response.json({ error: "Invalid product" }, { status: 400 });
    }
    const session = await createCheckoutSession(productId);
    return Response.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[checkout] Stripe error:", message, error);
    return Response.json(
      { error: message || "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
