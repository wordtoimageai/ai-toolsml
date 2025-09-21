import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ExternalLink } from "lucide-react";
import { tools } from "@/data/tools";
import { format, subDays } from "date-fns";

const RecentlyAdded = () => {
  // Get 6 recent tools (simulating recent additions)
  const recentTools = tools
    .slice(0, 6)
    .map((tool, index) => ({
      ...tool,
      addedDate: subDays(new Date(), index * 2) // Simulate different added dates
    }));

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
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Recently Added
              </h2>
              <p className="text-muted-foreground">
                Latest AI tools added to our curated directory
              </p>
            </div>
          </div>
          
          <Link
            to="/updates"
            className="text-primary hover:underline font-medium hidden sm:block"
          >
            See all updates →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTools.map((tool) => (
            <Card key={tool.id} className="group hover:shadow-card-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-2xl">{tool.icon}</div>
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    New
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {tool.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getPricingColor(tool.pricing)}>
                    {tool.pricing}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Added {format(tool.addedDate, 'MMM d, yyyy')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
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
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link
            to="/updates"
            className="text-primary hover:underline font-medium"
          >
            See all updates →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentlyAdded;