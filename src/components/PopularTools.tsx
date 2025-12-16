import { Link } from 'react-router-dom';
import { tools } from '@/data/tools';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, ArrowRight } from 'lucide-react';

/**
 * Popular Tools Section for Homepage
 * Displays highest-rated tools with direct links for SEO internal linking
 */
const PopularTools = () => {
  // Get top 8 highest-rated tools
  const popularTools = [...tools]
    .sort((a, b) => {
      // Sort by rating first, then by review count
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, 8);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Most Popular</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Highest Rated AI Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular AI tools based on user ratings and reviews. 
            These tools have earned the trust of thousands of users.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTools.map((tool, index) => (
            <Link 
              key={tool.id} 
              to={`/tool/${tool.id}`}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{tool.icon}</div>
                    {index < 3 && (
                      <Badge variant="secondary" className="text-xs">
                        #{index + 1} Top Rated
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{tool.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({tool.reviewCount.toLocaleString()})
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {tool.pricing}
                    </Badge>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            to="/compare" 
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Compare All Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularTools;
