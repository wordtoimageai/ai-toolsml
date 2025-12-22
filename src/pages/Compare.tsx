import { useSearchParams, Link } from 'react-router-dom';
import { getToolById } from '@/data/tools';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedSEO from '@/components/AdvancedSEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Compare = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const ids = searchParams.get('ids')?.split(',') || [];
  
  const tools = ids
    .map(id => getToolById(id.trim()))
    .filter(tool => tool !== undefined);

  const handleVisitTool = (toolName: string, website: string) => {
    toast({
      title: "Visiting Tool",
      description: `Redirecting to ${toolName}...`,
    });
    window.open(website, '_blank');
  };

  if (tools.length === 0) {
    return (
      <div className="min-h-screen">
        <AdvancedSEO title="Compare AI Tools - ToolsML" url="/compare" pageType="homepage" />
        <Header />
        
        <main className="pt-20">
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="text-6xl mb-4">⚖️</div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                No Tools to Compare
              </h1>
              <p className="text-muted-foreground mb-8">
                Add tools to comparison from the main directory
              </p>
              <Button asChild className="btn-gradient">
                <Link to="/">
                  Browse Tools
                </Link>
              </Button>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdvancedSEO 
        title={`Compare ${tools.map(t => t.title).join(' vs ')} - AI Tools | ToolsML`}
        description={`Side-by-side comparison of ${tools.map(t => t.title).join(', ')}. Compare features, pricing, and reviews.`}
        url="/compare"
        pageType="homepage"
      />
      <Header />
      
      <main className="pt-20">
        <section className="hero-gradient py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-4xl mb-4">⚖️</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Compare AI Tools
            </h1>
            <p className="text-xl text-white/90">
              Side-by-side comparison of {tools.length} tools
            </p>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <div className="min-w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                {tools.map((tool) => (
                  <div key={tool.id} className="tool-card">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-3xl mx-auto mb-4">
                        {tool.icon}
                      </div>
                      <h3 className="text-xl font-bold text-card-foreground mb-2">
                        {tool.title}
                      </h3>
                      <Badge 
                        variant={tool.pricing === 'Free' ? 'secondary' : 'default'}
                        className="mb-4"
                      >
                        {tool.pricing}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(tool.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          {tool.rating}/5
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 text-center">
                      {tool.description}
                    </p>

                    {/* Key Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {tool.features.slice(0, 5).map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Categories */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">
                        Category
                      </h4>
                      <Badge variant="outline">{tool.category}</Badge>
                    </div>

                    {/* Company */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">
                        Company
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {tool.company} • Founded {tool.founded}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => handleVisitTool(tool.title, tool.website)}
                        className="btn-gradient flex-1"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit
                      </Button>
                      <Button 
                        variant="outline"
                        asChild
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Link to={`/tool/${tool.id}`}>
                          Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link to="/">
                  Back to Browse
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Compare;