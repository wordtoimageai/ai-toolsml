import { useCompare } from '@/hooks/useCompare';
import { getToolById } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Scale } from 'lucide-react';

const CompareBar = () => {
  const { compareList, removeFromCompare, goToCompare, clearCompare, compareCount } = useCompare();

  if (compareCount === 0) return null;

  const tools = compareList.map(id => getToolById(id)).filter(Boolean);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card border border-border rounded-2xl shadow-2xl p-4 max-w-4xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Compare Tools</span>
            <Badge variant="secondary">{compareCount}/3</Badge>
          </div>
          
          <div className="flex items-center gap-2 flex-1">
            {tools.map((tool) => (
              <div 
                key={tool.id} 
                className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2"
              >
                <span className="text-sm font-medium">{tool.title}</span>
                <button
                  onClick={() => removeFromCompare(tool.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={goToCompare}
              disabled={compareCount < 2}
              className="btn-gradient"
            >
              Compare Now
            </Button>
            <Button
              onClick={clearCompare}
              variant="outline"
              size="sm"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;