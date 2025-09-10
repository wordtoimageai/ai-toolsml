import { getToolById } from '@/data/tools';
import { useFavorites } from '@/hooks/useFavorites';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import SEO from '@/components/SEO';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Favorites = () => {
  const { favorites } = useFavorites();
  const { toast } = useToast();

  const favoriteTools = favorites
    .map(id => getToolById(id))
    .filter(tool => tool !== undefined);

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
        title="My Favorite AI Tools"
        description="Your curated collection of favorite AI tools."
      />
      <Header />
      
      <main className="pt-20">
        <section className="hero-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">❤️</div>
            <h1 className="hero-title">
              My Favorites
            </h1>
            <p className="hero-subtitle">
              Your curated collection of AI tools
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {favoriteTools.length} Favorite Tools
              </h2>
              <p className="text-muted-foreground">
                Tools you've saved for easy access
              </p>
            </div>

            {favoriteTools.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">💔</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  No favorites yet
                </h3>
                <p className="text-muted-foreground mb-8">
                  Start exploring and save your favorite AI tools!
                </p>
                <Button asChild className="btn-gradient">
                  <Link to="/">
                    Discover Tools
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteTools.map((tool, index) => (
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

export default Favorites;