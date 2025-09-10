import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUrlState } from "@/hooks/useUrlState";
import { useDebounce } from "use-debounce";

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
  const { search, updateSearch, updateCategory } = useUrlState();
  const [localSearch, setLocalSearch] = useState(search);
  const [debouncedSearch] = useDebounce(localSearch, 500);

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateSearch(debouncedSearch);
    }
  }, [debouncedSearch, search, updateSearch]);

  const handleCategoryFilter = (categoryLabel: string) => {
    const categoryMap: Record<string, string> = {
      '✍️ Writing': 'writing',
      '🎨 Design': 'design',
      '💻 Coding': 'coding',
      '📈 Marketing': 'marketing',
      '⚡ Productivity': 'productivity',
      '🎵 Audio': 'audio',
      '🎬 Video': 'video',
      '🔬 Research': 'research',
    };
    
    const category = categoryMap[categoryLabel] || categoryLabel.toLowerCase();
    updateCategory(category);
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
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="search-input pl-16"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                onClick={() => handleCategoryFilter(category.label)}
                className="btn-category hover-lift"
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