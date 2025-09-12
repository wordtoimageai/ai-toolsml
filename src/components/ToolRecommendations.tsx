import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Tool } from '@/data/tools';
import { useRecommendations } from '@/hooks/useRecommendations';
import useAnalytics from '@/hooks/useAnalytics';

interface ToolRecommendationsProps {
  currentTool?: Tool;
  showPersonalized?: boolean;
  showTrending?: boolean;
  showSimilar?: boolean;
  className?: string;
}

const ToolRecommendations = ({ 
  currentTool, 
  showPersonalized = true,
  showTrending = true,
  showSimilar = true,
  className = ""
}: ToolRecommendationsProps) => {
  const { similar, trending, personalized } = useRecommendations(currentTool);
  const { trackEvent } = useAnalytics();

  const handleRecommendationClick = (tool: Tool, source: 'similar' | 'trending' | 'personalized') => {
    trackEvent({
      action: 'recommendation_click',
      category: 'engagement',
      label: `${tool.id}:${tool.title}:${source}:${currentTool?.id || 'none'}`
    });
  };

  const ToolPreview = ({ tool, source }: { tool: Tool; source: 'similar' | 'trending' | 'personalized' }) => (
    <Link 
      to={`/tool/${tool.id}`}
      className="block group"
      onClick={() => handleRecommendationClick(tool, source)}
    >
      <Card className="h-full transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-1">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white text-sm">
                {tool.icon}
              </div>
              <div>
                <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {tool.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{tool.rating}</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {tool.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {tool.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{tool.category}</span>
            <span className="font-medium text-primary">{tool.pricing}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  if (!similar.length && !trending.length && !personalized.length) {
    return null;
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Similar Tools */}
      {showSimilar && similar.length > 0 && currentTool && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="w-5 h-5 text-primary" />
              Similar to {currentTool.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map((tool) => (
                <ToolPreview key={tool.id} tool={tool} source="similar" />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trending Tools */}
      {showTrending && trending.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
              Trending Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trending.slice(0, 6).map((tool) => (
                <ToolPreview key={tool.id} tool={tool} source="trending" />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" asChild>
                <Link to="/">
                  View All Tools
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Personalized Recommendations */}
      {showPersonalized && personalized.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="w-5 h-5 text-primary" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {personalized.slice(0, 4).map((tool) => (
                <ToolPreview key={tool.id} tool={tool} source="personalized" />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ToolRecommendations;