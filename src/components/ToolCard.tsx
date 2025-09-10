import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
  onVisit: () => void;
}

const ToolCard = ({ tool, onVisit }: ToolCardProps) => {
  return (
    <div className="tool-card animate-fade-in group">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
          {tool.icon}
        </div>
        <h3 className="text-xl font-bold text-card-foreground">{tool.title}</h3>
      </div>
      
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {tool.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tool.tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex gap-3">
        <Button 
          onClick={onVisit}
          className="btn-gradient flex-1"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Visit Tool
        </Button>
        <Button 
          variant="outline"
          asChild
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Link to={`/tool/${tool.id}`}>
            Learn More
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ToolCard;