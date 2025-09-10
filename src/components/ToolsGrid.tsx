import { useMemo } from "react";
import ToolCard from "./ToolCard";
import ToolFilters from "./ToolFilters";
import Pagination from "./Pagination";
import { useToast } from "@/hooks/use-toast";
import { tools, searchTools, getAllTools } from "@/data/tools";
import { useUrlState } from "@/hooks/useUrlState";

const TOOLS_PER_PAGE = 9;

const ToolsGrid = () => {
  const { toast } = useToast();
  const { search, category, sort, page, updatePage } = useUrlState();

  const filteredAndSortedTools = useMemo(() => {
    const allTools = getAllTools();
    let filtered = search ? searchTools(search) : allTools;
    
    // Filter by category
    if (category) {
      filtered = filtered.filter(tool => 
        tool.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort tools
    filtered.sort((a, b) => {
      switch (sort) {
        case 'rating':
          return b.rating - a.rating;
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
  }, [search, category, sort]);

  const totalPages = Math.ceil(filteredAndSortedTools.length / TOOLS_PER_PAGE);
  const startIndex = (page - 1) * TOOLS_PER_PAGE;
  const paginatedTools = filteredAndSortedTools.slice(startIndex, startIndex + TOOLS_PER_PAGE);

  const handleVisitTool = (toolName: string, website: string) => {
    toast({
      title: "Visiting Tool",
      description: `Redirecting to ${toolName}...`,
    });
    window.open(website, '_blank');
  };

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
                    onVisit={() => handleVisitTool(tool.title, tool.website)}
                  />
                </div>
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={updatePage}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default ToolsGrid;