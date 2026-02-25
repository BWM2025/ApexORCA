import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import ROICalculator from "@/components/roi-calculator";
import InteractiveDemo from "@/components/interactive-demo";
import CompetitorComparison from "@/components/competitor-comparison";
import PricingTeaser from "@/components/pricing-teaser";
import TrustBar from "@/components/trust-bar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <HowItWorks />
      <div className="py-12">
        <ROICalculator />
      </div>
      <div className="py-12">
        <InteractiveDemo />
      </div>
      <CompetitorComparison />
      <PricingTeaser />
      <TrustBar />
    </main>
  );
}
