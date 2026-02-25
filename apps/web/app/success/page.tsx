import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-8">🎉</div>
        <h1 className="text-5xl font-bold mb-6">Purchase Successful!</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Your ORCA-Governed agent files are ready. Check your email for the download link.
        </p>
        <Button size="lg" asChild>
          <Link href="/marketplace">Browse More Products</Link>
        </Button>
      </div>
    </div>
  );
}
