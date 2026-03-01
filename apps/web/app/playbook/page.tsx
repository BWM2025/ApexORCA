import CheckoutButton from "@/components/checkout-button";
import ProductPageBackground from "@/components/product-page-background";
import { getProduct } from "@/lib/products";

export default function PlaybookPage() {
  const product = getProduct("playbook");
  if (!product) return null;
  return (
    <ProductPageBackground>
    <div className="max-w-3xl mx-auto px-6 py-10 text-white">
      <h1 className="text-5xl font-bold mb-8">ApexORCA™ Playbook: How to Hire a Governed AI with Real Agency</h1>
      <p className="text-xl text-[#A1AAB8] mb-12">
        {product.blurb}
      </p>
      <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 p-10 rounded-3xl mb-12">
        <div className="text-6xl font-mono mb-4">${product.price}</div>
        <div className="text-sm text-[#00E5FF]">{product.priceLine}</div>
      </div>
      <CheckoutButton productId="playbook">Buy Now — Instant Access</CheckoutButton>
    </div>
    </ProductPageBackground>
  );
}
