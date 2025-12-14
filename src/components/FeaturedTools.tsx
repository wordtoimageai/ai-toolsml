import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import { tools } from "@/data/tools";

const FeaturedTools = () => {
  const featuredTools = tools
    .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
    .slice(0, 8);

  const getPricingStyle = (pricing: string) => {
    switch (pricing) {
      case 'Free': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800';
      case 'Freemium': return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-400 dark:border-sky-800';
      case 'Paid': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800';
      case 'Subscription': return 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-400 dark:border-violet-800';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">Editor's Choice</span>
            </div>
            <h2 className="section-title">Featured Tools</h2>
            <p className="section-subtitle mt-2">
              Hand-picked AI tools that deliver exceptional value and user satisfaction
            </p>
          </div>
          <Link
            to="/tools"
            className="group flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            View all tools
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredTools.map((tool, index) => (
            <Link 
              key={tool.id} 
              to={`/tool/${tool.id}`}
              className="group tool-card p-5 block"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl p-2 bg-muted/50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                {index < 3 && (
                  <Badge className="bg-gradient-secondary text-white border-0 text-xs font-medium">
                    Top Pick
                  </Badge>
                )}
              </div>
              
              {/* Title & Description */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {tool.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                {tool.description}
              </p>

              {/* Features */}
              <div className="space-y-1.5 mb-4">
                {tool.features.slice(0, 2).map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="line-clamp-1">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Tags and Pricing */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Badge className={`${getPricingStyle(tool.pricing)} text-xs font-medium border`}>
                  {tool.pricing}
                </Badge>
                {tool.tags.slice(0, 1).map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline" className="text-xs font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-semibold text-foreground">{tool.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({tool.reviewCount.toLocaleString()})
                  </span>
                </div>
                
                <span className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Explore
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/tools"
            className="btn-gradient inline-flex items-center gap-2 text-base"
          >
            Explore All 1000+ Tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;
