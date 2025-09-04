import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  onVisit: () => void;
  onLearnMore: () => void;
}

const ToolCard = ({ icon, title, description, tags, onVisit, onLearnMore }: ToolCardProps) => {
  return (
    <div className="tool-card animate-fade-in group">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
      </div>
      
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
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
          Visit Tool
        </Button>
        <Button 
          variant="outline" 
          onClick={onLearnMore}
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default ToolCard;