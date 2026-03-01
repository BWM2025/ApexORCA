import PersonaGrid from "@/components/marketplace/persona-grid";
import SkillGrid from "@/components/marketplace/skill-grid";
import ProductPageBackground from "@/components/product-page-background";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MarketplacePage() {
  return (
    <ProductPageBackground>
      <div className="w-full max-w-6xl min-w-0 mx-auto px-4 sm:px-6 py-12 text-white">
        <div className="text-center mb-12 min-w-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 break-words">AgentForge Marketplace</h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-[#A1AAB8] break-words">ORCA-Governed Pods and Skills for OpenClaw</p>
        </div>
        <Tabs defaultValue="personas" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-2xl mx-auto">
            <TabsTrigger value="personas">Agents (Full Pods)</TabsTrigger>
            <TabsTrigger value="skills">Guides & Tools</TabsTrigger>
          </TabsList>
          <TabsContent value="personas" className="mt-8">
            <PersonaGrid />
          </TabsContent>
          <TabsContent value="skills" className="mt-8">
            <SkillGrid />
          </TabsContent>
        </Tabs>
      </div>
    </ProductPageBackground>
  );
}
