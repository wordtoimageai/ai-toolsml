import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ToolCard from "@/components/ToolCard";
import Pagination from "@/components/Pagination";
import { ToolsGridSkeleton } from "@/components/LoadingStates";
import ItemListSchema from "@/components/ItemListSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllTools, searchTools } from "@/data/tools";
import { useUrlState } from "@/hooks/useUrlState";
import { usePrivacyAnalytics } from "@/hooks/usePrivacyAnalytics";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X, Grid3X3, List, SlidersHorizontal } from "lucide-react";

const TOOLS_PER_PAGE = 24;

const categories = [
  { id: "all", label: "All Categories", value: "" },
  { id: "writing", label: "Writing", value: "Writing" },
  { id: "design", label: "Design", value: "Design" },
  { id: "coding", label: "Coding", value: "Coding" },
  { id: "marketing", label: "Marketing", value: "Marketing" },
  { id: "productivity", label: "Productivity", value: "Productivity" },
  { id: "video", label: "Video", value: "Video" },
  { id: "audio", label: "Audio", value: "Audio" },
  { id: "research", label: "Research", value: "Research" },
  { id: "data", label: "Data", value: "Data" },
  { id: "automation", label: "Automation", value: "Automation" },
  { id: "sales", label: "Sales", value: "Sales" },
  { id: "social", label: "Social", value: "Social" },
  { id: "seo", label: "SEO", value: "SEO" },
];

const sortOptions = [
  { label: "Best Match", value: "rating" },
  { label: "Most Popular", value: "popularity" },
  { label: "Newest First", value: "name" },
  { label: "Category", value: "category" },
  { label: "Pricing", value: "pricing" },
];

const pricingFilters = [
  { id: "all", label: "All Pricing" },
  { id: "free", label: "Free" },
  { id: "freemium", label: "Freemium" },
  { id: "paid", label: "Paid" },
];

const BrowseTools = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { search, category, sort, page, updateSearch, updateCategory, updateSort, updatePage, clearFilters } = useUrlState();
  const { trackEvent } = usePrivacyAnalytics();
  const [localSearch, setLocalSearch] = useState(search);
  const [pricingFilter, setPricingFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        updateSearch(localSearch);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch]);

  const allTools = getAllTools();

  const filteredTools = useMemo(() => {
    let tools = search ? searchTools(search) : allTools;

    if (category) {
      tools = tools.filter(tool => 
        tool.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (pricingFilter !== "all") {
      tools = tools.filter(tool => 
        tool.pricing.toLowerCase() === pricingFilter.toLowerCase()
      );
    }

    // Sort tools
    switch (sort) {
      case "rating":
        tools = [...tools].sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
        tools = [...tools].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "category":
        tools = [...tools].sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "pricing":
        const pricingOrder = { free: 0, freemium: 1, paid: 2 };
        tools = [...tools].sort((a, b) => 
          (pricingOrder[a.pricing.toLowerCase() as keyof typeof pricingOrder] || 2) - 
          (pricingOrder[b.pricing.toLowerCase() as keyof typeof pricingOrder] || 2)
        );
        break;
      case "name":
      default:
        tools = [...tools].sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return tools;
  }, [allTools, search, category, sort, pricingFilter]);

  const totalPages = Math.ceil(filteredTools.length / TOOLS_PER_PAGE);
  const paginatedTools = filteredTools.slice(
    (page - 1) * TOOLS_PER_PAGE,
    page * TOOLS_PER_PAGE
  );

  const handleVisitTool = (tool: typeof allTools[0]) => {
    trackEvent({ event_type: 'tool_visit', event_data: { toolId: tool.id, toolName: tool.title } });
    window.open(tool.website, '_blank', 'noopener,noreferrer');
  };

  const activeFiltersCount = [search, category, pricingFilter !== "all"].filter(Boolean).length;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Browse All Tools" }
  ];

  const seoTitle = category 
    ? `Browse ${category} AI Tools - Complete Directory | ToolsML`
    : "Browse All AI Tools - Complete Directory | ToolsML";
  
  const seoDescription = category
    ? `Explore our complete collection of ${category} AI tools. Filter by pricing, features, and more. Find the perfect AI tool for your needs.`
    : `Explore ${allTools.length}+ AI tools in our complete directory. Filter by category, pricing, and features. Find the perfect AI tool for your needs.`;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <ToolsGridSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords="AI tools directory, browse AI tools, AI software, machine learning tools, artificial intelligence applications"
        url="https://toolsml.com/browse"
      />
      <ItemListSchema 
        items={paginatedTools}
        listName="All AI Tools Directory"
        listDescription={`Complete directory of ${allTools.length}+ AI tools and software applications`}
      />
      
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ fontFamily: 'Instrument Serif, serif' }}>
              Browse All AI Tools
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our complete directory of {allTools.length}+ AI tools. Filter, search, and find the perfect tool for your needs.
            </p>
          </div>

          {/* Filters Section */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tools by name, feature, or use case..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={category || "all"} onValueChange={(val) => updateCategory(val === "all" ? "" : val)}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Pricing Filter */}
              <Select value={pricingFilter} onValueChange={setPricingFilter}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                  {pricingFilters.map((pricing) => (
                    <SelectItem key={pricing.id} value={pricing.id}>
                      {pricing.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sort || "rating"} onValueChange={updateSort}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters & View Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-border">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredTools.length} tools found
                </span>
                
                {activeFiltersCount > 0 && (
                  <>
                    <span className="text-border">|</span>
                    {search && (
                      <Badge variant="secondary" className="gap-1">
                        Search: {search}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => { setLocalSearch(""); updateSearch(""); }} />
                      </Badge>
                    )}
                    {category && (
                      <Badge variant="secondary" className="gap-1">
                        {category}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => updateCategory("")} />
                      </Badge>
                    )}
                    {pricingFilter !== "all" && (
                      <Badge variant="secondary" className="gap-1">
                        {pricingFilter}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setPricingFilter("all")} />
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => { clearFilters(); setPricingFilter("all"); setLocalSearch(""); }}>
                      Clear all
                    </Button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tools Grid/List */}
          {paginatedTools.length === 0 ? (
            <div className="text-center py-20">
              <SlidersHorizontal className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tools found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={() => { clearFilters(); setPricingFilter("all"); setLocalSearch(""); }}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
            }>
              {paginatedTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onVisit={() => handleVisitTool(tool)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination 
            currentPage={page}
            totalPages={totalPages}
            onPageChange={updatePage}
          />

          {/* Category Quick Links for SEO */}
          <section className="mt-16 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-6 text-center">Browse by Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.filter(c => c.id !== "all").map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm font-medium transition-colors"
                >
                  {cat.label} AI Tools
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrowseTools;
