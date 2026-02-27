"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CheckoutButtonProps {
  productId: string;
  children: React.ReactNode;
  className?: string;
}

export default function CheckoutButton({ productId, children, className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      const msg = data.error || (res.status === 404 ? "Checkout endpoint not found. Please redeploy." : "Checkout failed. Try again.");
      alert(msg);
    } catch (e) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={loading} className={className ?? "w-full"} size="lg">
      {loading ? "Redirecting to Stripe..." : children}
    </Button>
  );
}
