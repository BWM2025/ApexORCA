import Stripe from "stripe";
import { getAllProductSlugs } from "@/lib/products";

// Lazy init so Vercel build (env often not set) does not throw
let _stripe: Stripe | null = null;
export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(key, { apiVersion: "2024-06-20" });
  }
  return _stripe;
}
/** Use getStripe() in API routes. Kept for backward compatibility; lazy-initialized. */
export const stripe = {
  get checkout() {
    return getStripe().checkout;
  },
  get webhooks() {
    return getStripe().webhooks;
  },
};

// TEMPORARY: Test Price IDs for zero-real-money test. Switch back to Live IDs for production.
export const priceMap: Record<string, string> = {
  playbook:           "price_1T4ALFB7fHGes7w8j74QRRrX",   // test version of playbook
  "ceo-pod":          "price_1T4AN3B7fHGes7w86e1W5Khz",
  "marketing-pod":    "price_1T4AO0B7fHGes7w8WufKaSh8",
  "technical-pod":    "price_1T4AOqB7fHGes7w8OVwaSneJ",
  "operations-pod":   "price_1T4APkB7fHGes7w8u2uIKDnz",
  "governance-booster":"price_1T4AQRB7fHGes7w8o32woLuS",
  "growth-engine":    "price_1T4ARZB7fHGes7w8IWYSLaq6",
  "pod-os":           "price_1T5CjSB7fHGes7w8NVSScX3e",
};

const slugs = getAllProductSlugs();
const missing = slugs.filter((id) => !priceMap[id]);
if (missing.length > 0) {
  console.warn("[stripe] Missing Price IDs for:", missing.join(", "));
}

export async function createCheckoutSession(productId: string) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: priceMap[productId], quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/marketplace`,
    metadata: { productId },
  });
  return session;
}
