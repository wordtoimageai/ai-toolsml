import { useMemo, useState, useEffect } from "react";
import ToolCard from "./ToolCard";
import ToolFilters from "./ToolFilters";
import AdvancedFilters from "./AdvancedFilters";
import ToolRecommendations from "./ToolRecommendations";
import Pagination from "./Pagination";
import { ToolsGridSkeleton } from "./LoadingStates";
import { useToast } from "@/hooks/use-toast";
import { tools, searchTools, getAllTools } from "@/data/tools";
import { useUrlState, PriceRange } from "@/hooks/useUrlState";
import { usePrivacyAnalytics } from "@/hooks/usePrivacyAnalytics";

const TOOLS_PER_PAGE = 9;

const ToolsGrid = () => {
  const { toast } = useToast();
  const { search, category, sort, page, priceRange, features, userRole, updatePage } = useUrlState();
  const { trackSearch, trackToolVisit } = usePrivacyAnalytics();
  const [isLoading, setIsLoading] = useState(true);

  const filteredAndSortedTools = useMemo(() => {
    const allTools = getAllTools();
    let filtered = search ? searchTools(search) : allTools;
    
    // Filter by category
    if (category) {
      filtered = filtered.filter(tool => 
        tool.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by price range
    if (priceRange) {
      filtered = filtered.filter(tool => {
        const toolPricing = tool.pricing.toLowerCase();
        switch (priceRange) {
          case 'free':
            return toolPricing === 'free';
          case 'freemium':
            return toolPricing === 'freemium';
          case 'paid':
            return toolPricing === 'paid' || toolPricing === 'subscription';
          case 'enterprise':
            return toolPricing === 'enterprise' || toolPricing.includes('enterprise');
          default:
            return true;
        }
      });
    }

    // Filter by features
    if (features.length > 0) {
      filtered = filtered.filter(tool =>
        features.every(feature => tool.features.some(f => 
          f.toLowerCase().includes(feature.toLowerCase())
        ))
      );
    }

    // Filter by user role (based on category relevance)
    if (userRole) {
      const roleCategories: Record<string, string[]> = {
        'developer': ['coding', 'productivity', 'research'],
        'marketer': ['marketing', 'design', 'content'],
        'designer': ['design', 'video', 'content'],
        'content-creator': ['content', 'video', 'audio', 'design'],
        'product-manager': ['productivity', 'research', 'marketing'],
        'business-owner': ['marketing', 'productivity', 'research'],
      };
      
      const relevantCategories = roleCategories[userRole] || [];
      if (relevantCategories.length > 0) {
        filtered = filtered.filter(tool =>
          relevantCategories.includes(tool.category.toLowerCase())
        );
      }
    }

    // Sort tools
    filtered.sort((a, b) => {
      switch (sort) {
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
          return b.reviewCount - a.reviewCount;
        case 'category':
          return a.category.localeCompare(b.category);
        case 'pricing':
          const pricingOrder: Record<string, number> = { 'Free': 0, 'Freemium': 1, 'Paid': 2, 'Enterprise': 3 };
          return pricingOrder[a.pricing] - pricingOrder[b.pricing];
        case 'name':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [search, category, sort, priceRange, features, userRole]);

  const totalPages = Math.ceil(filteredAndSortedTools.length / TOOLS_PER_PAGE);
  const startIndex = (page - 1) * TOOLS_PER_PAGE;
  const paginatedTools = filteredAndSortedTools.slice(startIndex, startIndex + TOOLS_PER_PAGE);

  // Track search when it changes
  useEffect(() => {
    if (search) {
      trackSearch(search, filteredAndSortedTools.length);
    }
  }, [search, filteredAndSortedTools.length, trackSearch]);

  // Simulate loading for better UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, category, sort, priceRange, features, userRole]);

  const handleVisitTool = (toolId: string, toolName: string, website: string) => {
    trackToolVisit(toolId, toolName, website);
    toast({
      title: "Visiting Tool",
      description: `Redirecting to ${toolName}...`,
    });
    window.open(website, '_blank');
  };

  if (isLoading) {
    return <ToolsGridSkeleton />;
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            {search || category ? 'Search Results' : 'Featured AI Tools'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {search || category 
              ? `Found ${filteredAndSortedTools.length} tools matching your criteria`
              : 'Discover the most popular and effective AI tools used by professionals worldwide'
            }
          </p>
        </div>

        <ToolFilters />
        <AdvancedFilters />

        {paginatedTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              No tools found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedTools.map((tool, index) => (
                <div
                  key={tool.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ToolCard
                    tool={tool}
                    onVisit={() => handleVisitTool(tool.id, tool.title, tool.website)}
                  />
                </div>
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={updatePage}
            />

            {/* Show recommendations when no search/filter is active */}
            {!search && !category && !priceRange && features.length === 0 && (
              <div className="mt-16">
                <ToolRecommendations
                  showPersonalized={true}
                  showTrending={true}
                  showSimilar={false}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ToolsGrid;