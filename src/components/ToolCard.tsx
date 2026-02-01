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
    <article className="tool-card animate-fade-in group relative p-4 sm:p-6" role="article" aria-labelledby={`tool-title-${tool.id}`}>
      {/* Actions in top right - always visible on mobile, hover on desktop */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" role="group" aria-label="Tool actions">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleFavoriteClick}
          className={`p-2.5 sm:p-2 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 ${isFavorite(tool.id) ? 'text-red-500' : 'text-muted-foreground'}`}
          aria-label={isFavorite(tool.id) ? `Remove ${tool.title} from favorites` : `Add ${tool.title} to favorites`}
        >
          <Heart className={`w-5 h-5 sm:w-4 sm:h-4 ${isFavorite(tool.id) ? 'fill-current' : ''}`} />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCompareClick}
          className={`p-2.5 sm:p-2 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 ${isInCompare(tool.id) ? 'text-primary' : 'text-muted-foreground'}`}
          aria-label={isInCompare(tool.id) ? `Remove ${tool.title} from comparison` : `Add ${tool.title} to comparison`}
        >
          {isInCompare(tool.id) ? <Check className="w-5 h-5 sm:w-4 sm:h-4" /> : <Plus className="w-5 h-5 sm:w-4 sm:h-4" />}
        </Button>
      </div>

      <div className="flex items-center mb-3 sm:mb-4 pr-20 sm:pr-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-xl sm:text-2xl mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
          {tool.icon}
        </div>
        <h3 id={`tool-title-${tool.id}`} className="text-lg sm:text-xl font-semibold text-card-foreground font-sans line-clamp-2">{tool.title}</h3>
      </div>
      
      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed line-clamp-3">
        {tool.description}
      </p>
      
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        {tool.tags.slice(0, 3).map((tag, index) => (
          <Badge 
            key={index} 
            variant="secondary" 
            className="text-xs px-2 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/tag/${encodeURIComponent(tag)}`;
            }}
          >
            {tag}
          </Badge>
        ))}
        {tool.tags.length > 3 && (
          <Badge variant="outline" className="text-xs px-2 py-1">
            +{tool.tags.length - 3}
          </Badge>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Button 
          onClick={onVisit}
          className="btn-gradient flex-1 min-h-[44px] text-sm sm:text-base"
          aria-label={`Visit ${tool.title} website`}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Visit Tool
        </Button>
        <Button 
          variant="outline"
          asChild
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground min-h-[44px] text-sm sm:text-base"
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