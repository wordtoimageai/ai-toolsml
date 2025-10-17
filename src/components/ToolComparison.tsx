import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, ArrowRight } from 'lucide-react';
import { Tool } from '@/data/tools';

interface ComparisonProps {
  currentTool: Tool;
  alternatives: Tool[];
}

export const ToolComparison = ({ currentTool, alternatives }: ComparisonProps) => {
  const allTools = [currentTool, ...alternatives];
  
  // Extract unique features across all tools
  const allFeatures = Array.from(
    new Set(allTools.flatMap(tool => tool.features))
  ).slice(0, 8); // Limit to 8 features for readability

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Compare {currentTool.title} with Alternatives
        </h2>
        <p className="text-muted-foreground text-lg">
          See how {currentTool.title} stacks up against other popular {currentTool.category} tools. 
          Compare features, pricing, and ratings to make the best choice for your needs.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${allTools.length}, 1fr)` }}>
            {/* Header Row */}
            <div className="font-semibold text-muted-foreground">Features</div>
            {allTools.map((tool, index) => (
              <Card key={tool.id} className={index === 0 ? 'border-primary border-2' : ''}>
                <CardHeader className="pb-3">
                  <div className="text-3xl mb-2">{tool.icon}</div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={tool.pricing === 'Free' ? 'default' : 'secondary'}>
                      {tool.pricing}
                    </Badge>
                    {index === 0 && (
                      <Badge variant="default" className="bg-primary">Current</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-semibold">{tool.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({tool.reviewCount.toLocaleString()})
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Feature Rows */}
          {allFeatures.map((feature, featureIndex) => (
            <div 
              key={featureIndex}
              className="grid gap-4 py-3 border-t border-border/50"
              style={{ gridTemplateColumns: `200px repeat(${allTools.length}, 1fr)` }}
            >
              <div className="text-sm font-medium text-foreground flex items-center">
                {feature}
              </div>
              {allTools.map(tool => (
                <div key={tool.id} className="flex justify-center items-center">
                  {tool.features.includes(feature) ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-muted-foreground/30" />
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Pricing Row */}
          <div 
            className="grid gap-4 py-4 border-t border-border"
            style={{ gridTemplateColumns: `200px repeat(${allTools.length}, 1fr)` }}
          >
            <div className="text-sm font-semibold text-foreground flex items-center">
              Pricing Model
            </div>
            {allTools.map(tool => (
              <div key={tool.id} className="text-center">
                <Badge variant="outline" className="text-xs">
                  {tool.pricing}
                </Badge>
              </div>
            ))}
          </div>

          {/* Company Row */}
          <div 
            className="grid gap-4 py-4 border-t border-border/50"
            style={{ gridTemplateColumns: `200px repeat(${allTools.length}, 1fr)` }}
          >
            <div className="text-sm font-semibold text-foreground flex items-center">
              Company
            </div>
            {allTools.map(tool => (
              <div key={tool.id} className="text-center text-sm text-muted-foreground">
                {tool.company}
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div 
            className="grid gap-4 py-4 border-t border-border"
            style={{ gridTemplateColumns: `200px repeat(${allTools.length}, 1fr)` }}
          >
            <div className="text-sm font-semibold text-foreground flex items-center">
              Learn More
            </div>
            {allTools.map((tool, index) => (
              <div key={tool.id} className="flex justify-center">
                {index === 0 ? (
                  <Button 
                    asChild
                    className="btn-gradient w-full"
                  >
                    <a href={tool.website} target="_blank" rel="noopener noreferrer">
                      Visit Site
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                ) : (
                  <Button 
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <Link to={`/tool/${tool.id}`}>
                      View Details
                    </Link>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-green-500">✓</span> Why Choose {currentTool.title}?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentTool.pros.map((pro, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-orange-500">!</span> Things to Consider
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentTool.cons.map((con, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <span className="text-orange-500 mr-2 flex-shrink-0">•</span>
                  {con}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-6 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          <strong className="text-foreground">Making a decision?</strong> Consider trying multiple tools 
          with their free tiers or trial periods to see which one fits your workflow best. Most AI tools 
          offer generous free plans that let you test core features before committing.
        </p>
      </div>
    </section>
  );
};

export default ToolComparison;
