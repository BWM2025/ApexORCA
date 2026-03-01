import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import CompetitorComparison from "@/components/competitor-comparison";
import ROICalculator from "@/components/roi-calculator";
import InteractiveDemo from "@/components/interactive-demo";
import PricingTeaser from "@/components/pricing-teaser";
import TrustBar from "@/components/trust-bar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <div className="py-12">
        <ROICalculator />
      </div>
      <CompetitorComparison />
      <div id="interactive-demo" className="py-12 scroll-mt-20">
        <InteractiveDemo />
      </div>
      <PricingTeaser />
      <TrustBar />
    </main>
  );
}
