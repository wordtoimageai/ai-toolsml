import { useParams, Navigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedSEO from '@/components/AdvancedSEO';
import ToolCard from '@/components/ToolCard';
import Breadcrumb from '@/components/Breadcrumb';
import { getAllTools, tools } from '@/data/tools';
import { Badge } from '@/components/ui/badge';
import { CategoryLinks, PopularTags, ContextualCTA, FeaturedToolsLinks } from '@/components/InternalLinks';
import { ArrowRight } from 'lucide-react';

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

  const canonicalUrl = `/tag/${encodeURIComponent(decodedTag.toLowerCase().replace(/\s+/g, '-'))}`;

  // Get related tags (tags that appear with this tag)
  const relatedTags: Record<string, number> = {};
  filteredTools.forEach(tool => {
    tool.tags.forEach(t => {
      if (t.toLowerCase() !== decodedTag.toLowerCase()) {
        relatedTags[t] = (relatedTags[t] || 0) + 1;
      }
    });
  });
  const sortedRelatedTags = Object.entries(relatedTags)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Get categories that have this tag
  const categoriesWithTag = [...new Set(filteredTools.map(t => t.category))];

  return (
    <div className="min-h-screen">
      <AdvancedSEO 
        title={`${decodedTag} AI Tools - Discover ${filteredTools.length}+ Solutions | ToolsML`}
        description={`Discover the best AI tools tagged with "${decodedTag}". Find ${filteredTools.length} cutting-edge AI solutions for ${decodedTag.toLowerCase()}. Compare features, pricing & reviews.`}
        url={canonicalUrl}
        pageType="category"
      />
      <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Tags', href: '/browse' },
            { label: decodedTag }
          ]} />
        </div>

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
            
            {/* Categories containing this tag */}
            {categoriesWithTag.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-6">
                <span className="text-sm text-muted-foreground">Found in:</span>
                {categoriesWithTag.map(cat => (
                  <Link key={cat} to={`/category/${cat}`}>
                    <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors capitalize">
                      {cat}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
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
                <p className="text-muted-foreground mb-6">
                  No tools are currently tagged with "{decodedTag}". Check out our other categories!
                </p>
                <Link 
                  to="/browse"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Browse all tools <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Related Tags */}
        {sortedRelatedTags.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-bold mb-6">Related Tags</h2>
              <div className="flex flex-wrap gap-2">
                {sortedRelatedTags.map((relatedTag) => (
                  <Link key={relatedTag.name} to={`/tag/${encodeURIComponent(relatedTag.name)}`}>
                    <Badge 
                      variant="outline" 
                      className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      {relatedTag.name} ({relatedTag.count})
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Explore Categories */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CategoryLinks showAll={false} />
          </div>
        </section>

        {/* Popular Tags */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PopularTags maxItems={20} />
          </div>
        </section>

        {/* Featured Tools */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedToolsLinks maxItems={8} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContextualCTA context="tag" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Tag;