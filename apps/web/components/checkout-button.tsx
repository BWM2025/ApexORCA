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
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(false);
  };

  return (
    <Button onClick={handleCheckout} disabled={loading} className={className ?? "w-full"} size="lg">
      {loading ? "Redirecting to Stripe..." : children}
    </Button>
  );
}
