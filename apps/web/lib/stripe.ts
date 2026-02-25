import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const priceMap: Record<string, string> = {
  playbook: "price_1QTestPlaybook123",
  "ceo-pod": "price_1QTestCEOPod456",
  "marketing-pod": "price_1QTestMarketingPod457",
  "technical-pod": "price_1QTestTechnicalPod458",
  "operations-pod": "price_1QTestOperationsPod463",
  "governance-booster": "price_1QTestGovernance459",
  "x-growth": "price_1QTestXGrowth460",
  "sentry-pro": "price_1QTestSentry461",
  "aeo-booster": "price_1QTestAEOBooster462",
};

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
