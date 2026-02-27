import PersonaGrid from "@/components/marketplace/persona-grid";
import SkillGrid from "@/components/marketplace/skill-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MarketplacePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">AgentForge Marketplace</h1>
        <p className="text-2xl text-muted-foreground">ORCA-Governed Pods and Skills for OpenClaw</p>
      </div>
      <Tabs defaultValue="personas" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-2xl mx-auto">
          <TabsTrigger value="personas">Personas (Full Pods)</TabsTrigger>
          <TabsTrigger value="skills">Skills & Boosters</TabsTrigger>
        </TabsList>
        <TabsContent value="personas" className="mt-8">
          <PersonaGrid />
        </TabsContent>
        <TabsContent value="skills" className="mt-8">
          <SkillGrid />
        </TabsContent>
      </Tabs>
    </div>
  );
}
