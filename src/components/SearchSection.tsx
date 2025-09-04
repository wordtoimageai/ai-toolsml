import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: 'writing', label: '✍️ Writing', emoji: '✍️' },
  { id: 'design', label: '🎨 Design', emoji: '🎨' },
  { id: 'coding', label: '💻 Coding', emoji: '💻' },
  { id: 'marketing', label: '📈 Marketing', emoji: '📈' },
  { id: 'productivity', label: '⚡ Productivity', emoji: '⚡' },
  { id: 'audio', label: '🎵 Audio', emoji: '🎵' },
  { id: 'video', label: '🎬 Video', emoji: '🎬' },
  { id: 'research', label: '🔬 Research', emoji: '🔬' },
];

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Search Results",
        description: `Found AI tools related to: "${searchTerm}"`,
      });
    }, 1500);
  };

  const handleCategoryFilter = (category: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Category Filter Applied",
        description: `Showing AI tools in: ${category}`,
      });
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative -mt-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-4xl mx-auto">
        <div className="search-container animate-scale-in">
          <div className="relative mb-8">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
            <Input
              type="text"
              placeholder="Search for AI tools, categories, or use cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input pl-16"
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="absolute right-2 top-2 bottom-2 btn-gradient px-8"
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                onClick={() => handleCategoryFilter(category.label)}
                className="btn-category hover-lift"
                disabled={isLoading}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;