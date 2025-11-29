import { useParams, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedSEO from '@/components/AdvancedSEO';
import ToolCard from '@/components/ToolCard';
import { getAllTools } from '@/data/tools';
import { Badge } from '@/components/ui/badge';

const Tag = () => {
  const { tag } = useParams<{ tag: string }>();
  
  if (!tag) {
    return <Navigate to="/" replace />;
  }

  const decodedTag = decodeURIComponent(tag);
  
  // Filter tools that have this tag
  const filteredTools = getAllTools().filter(tool => 
    tool.tags.some(t => t.toLowerCase() === decodedTag.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <AdvancedSEO 
        title={`${decodedTag} AI Tools - Discover ${filteredTools.length}+ Solutions`}
        description={`Discover the best AI tools tagged with "${decodedTag}". Find cutting-edge solutions for your needs. Browse ${filteredTools.length} tools.`}
        url={`/tag/${encodeURIComponent(tag)}`}
        pageType="homepage"
      />
      <Header />
      
      <main className="pt-20">
        <section className="hero-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {decodedTag}
              </Badge>
            </div>
            <h1 className="hero-title">
              {decodedTag} AI Tools
            </h1>
            <p className="hero-subtitle">
              {filteredTools.length} tools tagged with "{decodedTag}"
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTools.map((tool, index) => (
                  <div
                    key={tool.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ToolCard
                      tool={tool}
                      onVisit={() => {
                        window.open(tool.website, '_blank');
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  No tools found
                </h3>
                <p className="text-muted-foreground">
                  No tools are currently tagged with "{decodedTag}". Check out our other categories!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Tag;