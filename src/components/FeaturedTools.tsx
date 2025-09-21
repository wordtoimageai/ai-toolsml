import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink, Crown } from "lucide-react";
import { tools } from "@/data/tools";

const FeaturedTools = () => {
  // Get top 8 featured tools based on rating and popularity
  const featuredTools = tools
    .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
    .slice(0, 8);

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'Free': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Freemium': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Paid': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Subscription': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Tools
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hand-picked AI tools that deliver exceptional value and user satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTools.map((tool, index) => (
            <Card key={tool.id} className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{tool.icon}</div>
                  {index < 3 && (
                    <Badge variant="secondary" className="text-xs">
                      Editor's Pick
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {tool.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {tool.features.slice(0, 3).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Tags and Pricing */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={getPricingColor(tool.pricing)}>
                    {tool.pricing}
                  </Badge>
                  {tool.tags.slice(0, 2).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{tool.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({tool.reviewCount.toLocaleString()})
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/tool/${tool.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View details
                    </Link>
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="nofollow sponsored"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`Visit ${tool.title} website`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
          >
            View All Tools
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;