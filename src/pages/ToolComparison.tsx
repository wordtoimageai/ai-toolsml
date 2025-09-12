import { useSearchParams, Link } from 'react-router-dom';
import { getToolById } from '@/data/tools';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Star, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ToolComparison = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const toolIds = searchParams.get('tools')?.split(',') || [];
  const tools = toolIds.map(id => getToolById(id)).filter(Boolean);

  if (tools.length < 2) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Select Tools to Compare
            </h1>
            <p className="text-muted-foreground mb-8">
              Choose at least 2 tools from our directory to see a detailed comparison.
            </p>
            <Button asChild>
              <Link to="/">Browse Tools</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleVisitTool = (toolName: string, website: string) => {
    toast({
      title: "Visiting Tool",
      description: `Redirecting to ${toolName}...`,
    });
    window.open(website, '_blank');
  };

  const comparisonCategories = [
    { key: 'pricing', label: 'Pricing' },
    { key: 'category', label: 'Category' },
    { key: 'rating', label: 'Rating' },
    { key: 'company', label: 'Company' },
    { key: 'founded', label: 'Founded' },
    { key: 'teamSize', label: 'Team Size' },
    { key: 'features', label: 'Key Features' },
    { key: 'integrations', label: 'Tags' },
    { key: 'useCases', label: 'Features' }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Compare ${tools.map(t => t.title).join(' vs ')}`,
    "description": `Detailed comparison of ${tools.map(t => t.title).join(' and ')} AI tools`,
    "mainEntity": {
      "@type": "Table",
      "about": tools.map(tool => ({
        "@type": "SoftwareApplication",
        "name": tool.title,
        "applicationCategory": "AI Tool",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": tool.pricing.split(' ')[0],
          "priceCurrency": "USD"
        }
      }))
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title={`Compare ${tools.map(t => t.title).join(' vs ')} - AI Tools Comparison`}
        description={`Detailed side-by-side comparison of ${tools.map(t => t.title).join(' and ')}. Compare features, pricing, and capabilities.`}
        keywords={`${tools.map(t => t.title).join(' vs ')}, AI tools comparison, ${tools.map(t => t.category).join(' ')}`}
        jsonLd={jsonLd}
      />
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[
            { label: 'Compare', href: '/compare' },
            { label: `${tools.map(t => t.title).join(' vs ')}` }
          ]} />
          
          <div className="mt-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {tools.map(t => t.title).join(' vs ')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Side-by-side comparison of features, pricing, and capabilities
            </p>
          </div>

          {/* Tool Headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tools.map((tool) => (
              <Card key={tool.id} className="p-6 text-center">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{tool.title}</h3>
                <p className="text-muted-foreground mb-4">{tool.description}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{tool.rating}</span>
                </div>
                <Button 
                  onClick={() => handleVisitTool(tool.title, tool.website)}
                  className="w-full gap-2"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground min-w-[200px]">
                      Feature
                    </th>
                    {tools.map((tool) => (
                      <th key={tool.id} className="text-left p-4 font-semibold text-foreground min-w-[200px]">
                        {tool.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonCategories.map((category, index) => (
                    <tr key={category.key} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                      <td className="p-4 font-medium text-foreground border-r border-border">
                        {category.label}
                      </td>
                      {tools.map((tool) => (
                        <td key={tool.id} className="p-4 text-foreground">
                          {category.key === 'features' && (
                            <div className="space-y-1">
                              {tool.features.slice(0, 3).map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          )}
                          {category.key === 'integrations' && (
                            <div className="flex flex-wrap gap-1">
                              {tool.tags.slice(0, 3).map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {category.key === 'useCases' && (
                            <div className="space-y-1">
                              {tool.features.slice(0, 3).map((feature, idx) => (
                                <div key={idx} className="text-sm text-muted-foreground">
                                  • {feature}
                                </div>
                              ))}
                            </div>
                          )}
                          {category.key === 'rating' && (
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{tool.rating}</span>
                            </div>
                          )}
                          {!['features', 'integrations', 'useCases', 'rating'].includes(category.key) && (
                            <span>{tool[category.key as keyof typeof tool] || 'N/A'}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Bottom CTA */}
          <div className="text-center mt-12 py-12 bg-muted/30 rounded-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Choose?
            </h2>
            <p className="text-muted-foreground mb-8">
              Try these tools yourself to see which one fits your workflow best
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {tools.map((tool) => (
                <Button 
                  key={tool.id}
                  onClick={() => handleVisitTool(tool.title, tool.website)}
                  variant="outline"
                  className="gap-2"
                >
                  Try {tool.title}
                  <ExternalLink className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToolComparison;