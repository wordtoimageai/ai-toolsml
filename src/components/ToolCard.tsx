import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ExternalLink, Heart, Plus, Check } from "lucide-react";
import { Tool } from "@/data/tools";
import { useFavorites } from "@/hooks/useFavorites";
import { useCompare } from "@/hooks/useCompare";
import { useToast } from "@/hooks/use-toast";

interface ToolCardProps {
  tool: Tool;
  onVisit: () => void;
}

const ToolCard = ({ tool, onVisit }: ToolCardProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompare();
  const { toast } = useToast();

  const handleFavoriteClick = () => {
    toggleFavorite(tool.id);
    toast({
      title: isFavorite(tool.id) ? "Removed from favorites" : "Added to favorites",
      description: tool.title,
    });
  };

  const handleCompareClick = () => {
    if (isInCompare(tool.id)) {
      removeFromCompare(tool.id);
      toast({
        title: "Removed from comparison",
        description: tool.title,
      });
    } else if (canAddMore) {
      addToCompare(tool.id);
      toast({
        title: "Added to comparison",
        description: tool.title,
      });
    } else {
      toast({
        title: "Comparison limit reached",
        description: "You can compare up to 3 tools at once",
        variant: "destructive",
      });
    }
  };

  return (
    <article className="tool-card animate-fade-in group relative p-6" role="article" aria-labelledby={`tool-title-${tool.id}`}>
      {/* Actions in top right */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity" role="group" aria-label="Tool actions">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleFavoriteClick}
          className={`p-2 ${isFavorite(tool.id) ? 'text-red-500' : 'text-muted-foreground'}`}
          aria-label={isFavorite(tool.id) ? `Remove ${tool.title} from favorites` : `Add ${tool.title} to favorites`}
        >
          <Heart className={`w-4 h-4 ${isFavorite(tool.id) ? 'fill-current' : ''}`} />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCompareClick}
          className={`p-2 ${isInCompare(tool.id) ? 'text-primary' : 'text-muted-foreground'}`}
          aria-label={isInCompare(tool.id) ? `Remove ${tool.title} from comparison` : `Add ${tool.title} to comparison`}
        >
          {isInCompare(tool.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
          {tool.icon}
        </div>
        <h3 id={`tool-title-${tool.id}`} className="text-xl font-semibold text-card-foreground font-sans">{tool.title}</h3>
      </div>
      
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {tool.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tool.tags.map((tag, index) => (
          <Badge 
            key={index} 
            variant="secondary" 
            className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/tag/${encodeURIComponent(tag)}`;
            }}
          >
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex gap-3">
        <Button 
          onClick={onVisit}
          className="btn-gradient flex-1"
          aria-label={`Visit ${tool.title} website`}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Visit Tool
        </Button>
        <Button 
          variant="outline"
          asChild
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Link to={`/tool/${tool.id}`} aria-label={`Learn more about ${tool.title}`}>
            Learn More
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default ToolCard;