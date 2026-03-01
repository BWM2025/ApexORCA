import Stripe from "stripe";
import { getAllProductSlugs } from "@/lib/products";

// Fallback key only so build (no env) doesn't throw; runtime must have real key in Vercel env
const key = process.env.STRIPE_SECRET_KEY || "sk_test_build_placeholder";
export const stripe = new Stripe(key, { apiVersion: "2024-06-20" });

// Updated test Price IDs created by subagent
export const priceMap: Record<string, string> = {
  playbook:           "price_1T67ZdB7fHGes7w8156xQStV",
  "ceo-pod":          "price_1T67ZdB7fHGes7w8YwOyJ6n7",
  "marketing-pod":    "price_1T67ZeB7fHGes7w8xXjByNE7",
  "technical-pod":    "price_1T67ZeB7fHGes7w8FYIb3Os2",
  "operations-pod":   "price_1T67ZeB7fHGes7w8ngmKAZL6",
  "governance-booster":"price_1T67ZfB7fHGes7w8azHZSAHX",
  "growth-engine":    "price_1T67ZfB7fHGes7w8SJsHqYtG",
  "pod-os":           "price_1T67ZfB7fHGes7w8LFXHvU9K",
};

const slugs = getAllProductSlugs();
const missing = slugs.filter((id) => !priceMap[id]);
if (missing.length > 0) {
  console.warn("[stripe] Missing Price IDs for:", missing.join(", "));
}

export async function createCheckoutSession(productId: string) {
  const priceId = priceMap[productId];
  if (!priceId) {
    throw new Error(`No Stripe Price ID for product "${productId}". Add it to priceMap in lib/stripe.ts.`);
  }
  const baseUrl =
    process.env.NEXT_PUBLIC_URL ||
    (process.env.NODE_ENV === "production" ? "" : "http://localhost:3000");
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_URL must be set to your site URL (e.g. https://apexorca.io) in Vercel env.");
  }
  if (process.env.NODE_ENV === "production" && !baseUrl.startsWith("https://")) {
    throw new Error("NEXT_PUBLIC_URL must be https:// in production (e.g. https://apexorca.io).");
  }
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/marketplace`,
    metadata: { productId },
  });
  return session;
}