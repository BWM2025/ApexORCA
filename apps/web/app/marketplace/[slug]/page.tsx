import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import CheckoutButton from "@/components/checkout-button";
import ProductPageBackground from "@/components/product-page-background";
import { getProduct } from "@/lib/products";
import Link from "next/link";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <ProductPageBackground>
    <div className="max-w-3xl mx-auto px-6 py-10 text-white">
      <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
      <div className="text-5xl font-bold text-[#00E5FF] mb-8">${product.price}</div>

      <p className="text-xl font-semibold text-white mb-4">{product.headline}</p>
      <p className="text-lg text-[#A1AAB8] mb-10 whitespace-pre-line">{product.blurb}</p>

      <h2 className="text-2xl font-bold mb-4">What you get</h2>
      <ul className="list-disc list-inside text-[#A1AAB8] space-y-2 mb-10">
        {product.whatYouGet.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <p className="text-lg text-[#A1AAB8] mb-2">
        <span className="font-semibold text-white">Who it&apos;s for:</span> {product.whoItsFor}
      </p>
      <p className="text-sm text-[#00E5FF]/90 mb-8">
        <span className="font-semibold">ORCA DNA included:</span> {product.orcaDna}
      </p>
      <p className="text-sm text-muted-foreground mb-10">{product.priceLine}</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <CheckoutButton productId={slug} className="flex-1">
          Buy Now — Instant Download
        </CheckoutButton>
        <Button variant="outline" asChild className="border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF]/10">
          <Link href="/marketplace">← Back to Marketplace</Link>
        </Button>
      </div>
    </div>
    </ProductPageBackground>
  );
}
