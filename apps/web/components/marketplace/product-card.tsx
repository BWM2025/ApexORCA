import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    price: number;
    description: string;
    badge?: string;
  };
  type: "persona" | "skill";
}

export default function ProductCard({ product, type }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col min-w-0 bg-zinc-900/40 backdrop-blur-sm border border-white/10 hover:border-[#00E5FF]/30 transition-colors">
      <CardHeader>
        <div className="flex justify-between items-start gap-2 min-w-0">
          <CardTitle className="text-white break-words min-w-0">{product.name}</CardTitle>
          {product.badge && <Badge variant="secondary">{product.badge}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col text-[#A1AAB8] min-w-0">
        <p className="mb-6 flex-1 break-words">{product.description}</p>
        <div className="mt-auto space-y-4">
          <div className="text-3xl font-bold text-[#00E5FF]">${product.price}</div>
          <Button asChild className="w-full">
            <Link href={`/marketplace/${product.slug}`}>Buy Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
