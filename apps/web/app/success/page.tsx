"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface DownloadItem {
  label: string;
  href: string;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [links, setLinks] = useState<DownloadItem[]>([]);
  const [productId, setProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!sessionId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    fetch(`/api/downloads?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not load downloads");
        return res.json();
      })
      .then((data: { productId: string; links: DownloadItem[] }) => {
        setProductId(data.productId);
        setLinks(data.links ?? []);
      })
      .catch(() => setError("Could not load your download links."))
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-8">🎉</div>
        <h1 className="text-5xl font-bold mb-6">Purchase Successful!</h1>

        {loading && (
          <p className="text-xl text-muted-foreground mb-12">Loading your downloads…</p>
        )}

        {error && (
          <p className="text-xl text-muted-foreground mb-12">
            {error} You can contact support with your order details.
          </p>
        )}

        {!loading && !error && links.length > 0 && (
          <>
            <p className="text-xl text-muted-foreground mb-6">
              Your files are ready. Download below:
            </p>
            <div className="flex flex-col gap-3 mb-10">
              {links.map((item) => (
                <Button key={item.href} size="lg" asChild>
                  <a href={item.href} download target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </Button>
              ))}
            </div>
          </>
        )}

        {!loading && !error && links.length === 0 && sessionId && (
          <p className="text-xl text-muted-foreground mb-12">
            Your order is confirmed. If you don&apos;t see your download links above, refresh the page or contact support with your order details.
          </p>
        )}

        {!sessionId && !loading && (
          <p className="text-xl text-muted-foreground mb-12">
            Return here after checkout to access your downloads, or go to the marketplace to browse.
          </p>
        )}

        <Button variant="outline" size="lg" asChild>
          <Link href="/marketplace">Browse More Products</Link>
        </Button>
      </div>
    </div>
  );
}
