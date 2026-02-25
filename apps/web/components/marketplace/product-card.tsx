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
    <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{product.name}</CardTitle>
          {product.badge && <Badge variant="secondary">{product.badge}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-muted-foreground mb-6 flex-1">{product.description}</p>
        <div className="mt-auto space-y-4">
          <div className="text-3xl font-bold">${product.price}</div>
          <Button asChild className="w-full">
            <Link href={`/marketplace/${product.slug}`}>Buy Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
