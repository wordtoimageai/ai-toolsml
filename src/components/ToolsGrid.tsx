import ToolCard from "./ToolCard";
import { useToast } from "@/hooks/use-toast";
import { tools } from "@/data/tools";

const ToolsGrid = () => {
  const { toast } = useToast();

  const handleVisitTool = (toolName: string, website: string) => {
    toast({
      title: "Visiting Tool",
      description: `Redirecting to ${toolName}...`,
    });
    window.open(website, '_blank');
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Featured AI Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the most popular and effective AI tools used by professionals worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.slice(0, 6).map((tool, index) => (
            <div
              key={tool.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ToolCard
                tool={tool}
                onVisit={() => handleVisitTool(tool.title, tool.website)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;