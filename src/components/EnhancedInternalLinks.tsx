import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, TrendingUp, Sparkles } from 'lucide-react';
import { tools, Tool } from '@/data/tools';

/**
 * Get tools from related categories
 */
const getRelatedCategoryTools = (category: string, maxItems = 4): Tool[] => {
  const categoryRelations: Record<string, string[]> = {
    writing: ['marketing', 'seo', 'social'],
    design: ['video', 'marketing', 'social'],
    coding: ['automation', 'data', 'productivity'],
    marketing: ['writing', 'seo', 'social', 'sales'],
    productivity: ['automation', 'coding', 'writing'],
    audio: ['video', 'design', 'productivity'],
    video: ['audio', 'design', 'marketing'],
    research: ['data', 'writing', 'productivity'],
    data: ['research', 'automation', 'marketing'],
    automation: ['productivity', 'coding', 'sales'],
    sales: ['marketing', 'automation', 'social'],
    social: ['marketing', 'design', 'writing'],
    seo: ['writing', 'marketing', 'data']
  };

  const relatedCategories = categoryRelations[category.toLowerCase()] || [];
  
  return tools
    .filter(tool => relatedCategories.includes(tool.category.toLowerCase()))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, maxItems);
};

/**
 * Get top tools by rating across all categories
 */
const getTopRatedTools = (maxItems = 6): Tool[] => {
  return [...tools]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, maxItems);
};

interface ToolCrossLinksProps {
  currentCategory: string;
  className?: string;
}

/**
 * Cross-links to tools from related categories
 * Helps crawlers discover content and reduces bounce rate
 */
export const ToolCrossLinks = ({ currentCategory, className }: ToolCrossLinksProps) => {
  const relatedTools = getRelatedCategoryTools(currentCategory, 4);
  
  if (relatedTools.length === 0) return null;

  return (
    <section className={`py-12 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              You Might Also Like
            </h2>
            <p className="text-muted-foreground mt-1">
              Popular tools from related categories
            </p>
          </div>
          <Link to="/" className="text-primary hover:underline text-sm flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedTools.map((tool) => (
            <Link
              key={tool.id}
              to={`/tool/${tool.id}`}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-xl text-white">
                      {tool.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {tool.title}
                      </h3>
                      <span className="text-xs text-muted-foreground capitalize">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{tool.rating}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {tool.pricing}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

interface TrendingToolsProps {
  excludeToolId?: string;
  maxItems?: number;
  className?: string;
}

/**
 * Trending tools section for homepage and tool pages
 * Provides strong internal linking signals
 */
export const TrendingTools = ({ excludeToolId, maxItems = 6, className }: TrendingToolsProps) => {
  const topTools = getTopRatedTools(maxItems + 1)
    .filter(tool => tool.id !== excludeToolId)
    .slice(0, maxItems);

  return (
    <section className={`py-12 bg-muted/30 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Trending AI Tools
            </h2>
            <p className="text-muted-foreground mt-1">
              Most popular tools this week
            </p>
          </div>
          <Link to="/browse" className="text-primary hover:underline text-sm flex items-center gap-1">
            Browse All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {topTools.map((tool, index) => (
            <Link
              key={tool.id}
              to={`/tool/${tool.id}`}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
                <CardContent className="p-4 text-center">
                  <div className="relative">
                    {index < 3 && (
                      <Badge 
                        variant="default" 
                        className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5"
                      >
                        #{index + 1}
                      </Badge>
                    )}
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-2xl text-white mx-auto mb-3 group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{tool.rating}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

interface CategoryQuickLinksProps {
  className?: string;
}

/**
 * Quick category navigation with tool counts
 */
export const CategoryQuickLinks = ({ className }: CategoryQuickLinksProps) => {
  const categories = [
    { id: 'writing', name: 'Writing', icon: '✍️' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'coding', name: 'Coding', icon: '💻' },
    { id: 'marketing', name: 'Marketing', icon: '📈' },
    { id: 'productivity', name: 'Productivity', icon: '⚡' },
    { id: 'audio', name: 'Audio', icon: '🎵' },
    { id: 'video', name: 'Video', icon: '🎬' },
    { id: 'research', name: 'Research', icon: '🔬' },
    { id: 'data', name: 'Data', icon: '📊' },
    { id: 'automation', name: 'Automation', icon: '🤖' },
    { id: 'sales', name: 'Sales', icon: '💼' },
    { id: 'social', name: 'Social', icon: '📱' },
    { id: 'seo', name: 'SEO', icon: '🔍' }
  ].map(cat => ({
    ...cat,
    count: tools.filter(t => t.category.toLowerCase() === cat.id).length
  }));

  return (
    <section className={`py-12 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">
          Explore by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="group"
            >
              <Badge 
                variant="outline" 
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all cursor-pointer"
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
                <span className="ml-2 text-xs opacity-70">({cat.count})</span>
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

interface AlternativeToolsProps {
  currentTool: Tool;
  maxItems?: number;
  className?: string;
}

/**
 * Alternative tools section - shows competitors/alternatives
 * Strong internal linking for tool detail pages
 */
export const AlternativeTools = ({ currentTool, maxItems = 4, className }: AlternativeToolsProps) => {
  // Get tools in same category with similar pricing
  const alternatives = tools
    .filter(tool => 
      tool.id !== currentTool.id && 
      tool.category === currentTool.category
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, maxItems);

  if (alternatives.length === 0) return null;

  return (
    <section className={`py-12 bg-muted/30 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Alternatives to {currentTool.title}
            </h2>
            <p className="text-muted-foreground mt-1">
              Compare similar {currentTool.category} tools
            </p>
          </div>
          <Link 
            to={`/category/${currentTool.category}`} 
            className="text-primary hover:underline text-sm flex items-center gap-1"
          >
            View All {currentTool.category} Tools <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {alternatives.map((tool) => (
            <Link
              key={tool.id}
              to={`/tool/${tool.id}`}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-2xl text-white">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {tool.title}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{tool.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({tool.reviewCount.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{tool.pricing}</Badge>
                    <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Compare <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to={`/compare?tools=${currentTool.id},${alternatives[0]?.id}`}>
              Compare {currentTool.title} vs {alternatives[0]?.title}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default {
  ToolCrossLinks,
  TrendingTools,
  CategoryQuickLinks,
  AlternativeTools
};
