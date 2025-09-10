import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useUrlState, SortOption } from '@/hooks/useUrlState';

const categories = [
  { id: 'writing', label: '✍️ Writing', value: 'writing' },
  { id: 'design', label: '🎨 Design', value: 'design' },
  { id: 'coding', label: '💻 Coding', value: 'coding' },
  { id: 'marketing', label: '📈 Marketing', value: 'marketing' },
  { id: 'productivity', label: '⚡ Productivity', value: 'productivity' },
  { id: 'audio', label: '🎵 Audio', value: 'audio' },
  { id: 'video', label: '🎬 Video', value: 'video' },
  { id: 'research', label: '🔬 Research', value: 'research' },
];

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Name A-Z', value: 'name' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Category', value: 'category' },
  { label: 'Pricing', value: 'pricing' },
];

const ToolFilters = () => {
  const { search, category, sort, updateCategory, updateSort, clearFilters } = useUrlState();

  const activeFiltersCount = [search, category].filter(Boolean).length;

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">Filter by:</span>
        
        <Select value={category || 'all'} onValueChange={(value) => updateCategory(value === 'all' ? '' : value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={updateSort}>
          <SelectTrigger className="w-[150px]">
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

      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {search && (
            <Badge variant="secondary" className="gap-1">
              Search: "{search}"
            </Badge>
          )}
          
          {category && (
            <Badge variant="secondary" className="gap-1">
              {categories.find(c => c.value === category)?.label || category}
              <button
                onClick={() => updateCategory('')}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default ToolFilters;