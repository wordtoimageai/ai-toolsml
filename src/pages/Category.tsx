import { useParams } from 'react-router-dom';
import { getToolsByCategory } from '@/data/tools';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import SEO from '@/components/SEO';
import { useToast } from '@/hooks/use-toast';

const categoryEmojis: Record<string, string> = {
  writing: '✍️',
  design: '🎨',
  coding: '💻',
  marketing: '📈',
  productivity: '⚡',
  audio: '🎵',
  video: '🎬',
  research: '🔬'
};

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const { toast } = useToast();
  
  if (!category) {
    return <div>Category not found</div>;
  }

  const tools = getToolsByCategory(category);
  const emoji = categoryEmojis[category.toLowerCase()] || '🔧';
  const displayName = category.charAt(0).toUpperCase() + category.slice(1);

  const handleVisitTool = (toolName: string, website: string) => {
    toast({
      title: "Visiting Tool",
      description: `Redirecting to ${toolName}...`,
    });
    window.open(website, '_blank');
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title={`${displayName} AI Tools`}
        description={`Discover the best AI tools for ${category}. Compare features, pricing, and reviews.`}
        keywords={`${category} AI tools, ${category} artificial intelligence, ${category} automation`}
      />
      <Header />
      
      <main className="pt-20">
        <section className="hero-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">{emoji}</div>
            <h1 className="hero-title">
              {displayName} AI Tools
            </h1>
            <p className="hero-subtitle">
              Discover the best AI-powered tools for {category}
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {tools.length} Tools Found
              </h2>
              <p className="text-muted-foreground">
                Professional-grade AI tools for {category}
              </p>
            </div>

            {tools.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  No tools found
                </h3>
                <p className="text-muted-foreground">
                  We're constantly adding new tools. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tools.map((tool, index) => (
                  <div
                    key={tool.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ToolCard
                      tool={tool}
                      onVisit={() => handleVisitTool(tool.title, tool.website)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Category;