import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import ToolCard from "./ToolCard";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useAnalytics from "@/hooks/useAnalytics";

const RecentlyViewed = () => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const { toast } = useToast();
  const { trackToolVisit } = useAnalytics();

  const handleVisitTool = (toolId: string, toolName: string, website: string) => {
    trackToolVisit(toolId, toolName, website);
    toast({
      title: "Visiting Tool",
      description: `Redirecting to ${toolName}...`,
    });
    window.open(website, '_blank');
  };

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Recently Viewed
          </h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearRecentlyViewed}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear History
          </Button>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-4">
          {recentlyViewed.slice(0, 5).map((tool) => (
            <div key={tool.id} className="flex-shrink-0 w-80">
              <ToolCard
                tool={tool}
                onVisit={() => handleVisitTool(tool.id, tool.title, tool.website)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;