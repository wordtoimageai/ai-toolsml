import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  relatedTo: string[];
}

const allCategories: Category[] = [
  { id: 'writing', name: 'Writing', icon: '✍️', description: 'AI writing assistants', relatedTo: ['marketing', 'seo', 'social'] },
  { id: 'design', name: 'Design', icon: '🎨', description: 'Creative design tools', relatedTo: ['video', 'marketing', 'social'] },
  { id: 'coding', name: 'Development', icon: '💻', description: 'Developer tools', relatedTo: ['automation', 'data', 'productivity'] },
  { id: 'marketing', name: 'Marketing', icon: '📈', description: 'Marketing automation', relatedTo: ['writing', 'seo', 'social', 'sales'] },
  { id: 'productivity', name: 'Productivity', icon: '⚡', description: 'Boost efficiency', relatedTo: ['automation', 'coding', 'writing'] },
  { id: 'audio', name: 'Audio', icon: '🎵', description: 'Audio processing', relatedTo: ['video', 'design', 'productivity'] },
  { id: 'video', name: 'Video', icon: '🎬', description: 'Video editing', relatedTo: ['audio', 'design', 'marketing'] },
  { id: 'research', name: 'Research', icon: '🔬', description: 'Research tools', relatedTo: ['data', 'writing', 'productivity'] },
  { id: 'data', name: 'Data & Analytics', icon: '📊', description: 'Data analysis tools', relatedTo: ['research', 'automation', 'marketing'] },
  { id: 'automation', name: 'Automation', icon: '🤖', description: 'Workflow automation', relatedTo: ['productivity', 'coding', 'sales'] },
  { id: 'sales', name: 'Sales & CRM', icon: '💼', description: 'Sales automation', relatedTo: ['marketing', 'automation', 'social'] },
  { id: 'social', name: 'Social Media', icon: '📱', description: 'Social media tools', relatedTo: ['marketing', 'design', 'writing'] },
  { id: 'seo', name: 'SEO', icon: '🔍', description: 'SEO optimization', relatedTo: ['writing', 'marketing', 'data'] },
];

interface RelatedCategoriesProps {
  currentCategory: string;
  className?: string;
}

/**
 * Related Categories Component
 * Shows categories related to the current category for better internal linking
 */
const RelatedCategories = ({ currentCategory, className }: RelatedCategoriesProps) => {
  const current = allCategories.find(c => c.id === currentCategory.toLowerCase());
  
  if (!current) return null;

  // Get related categories based on the relatedTo array
  const relatedCategories = allCategories
    .filter(cat => current.relatedTo.includes(cat.id))
    .slice(0, 4);

  if (relatedCategories.length === 0) return null;

  return (
    <section className={`py-16 bg-muted/30 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Related Categories
          </h2>
          <p className="text-muted-foreground">
            Explore similar AI tool categories that complement {current.name} tools
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedCategories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/50 hover:-translate-y-1">
                <CardContent className="p-5 text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {category.name} Tools
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="ml-1 w-3 h-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedCategories;
