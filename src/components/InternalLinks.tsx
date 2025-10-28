import { Link } from 'react-router-dom';
import { Tool } from '@/data/tools';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp } from 'lucide-react';

/**
 * Related Tools Component - Strategic internal linking
 * Shows related tools based on category, tags, or similarity
 */
interface RelatedToolsProps {
  currentTool: Tool;
  allTools: Tool[];
  maxItems?: number;
}

export const RelatedTools = ({ currentTool, allTools, maxItems = 3 }: RelatedToolsProps) => {
  // Find related tools by category and tags
  const relatedTools = allTools
    .filter(tool => tool.id !== currentTool.id)
    .map(tool => {
      let score = 0;
      
      // Same category = high relevance
      if (tool.category === currentTool.category) score += 5;
      
      // Shared tags = medium relevance
      const sharedTags = tool.tags.filter(tag => currentTool.tags.includes(tag));
      score += sharedTags.length * 2;
      
      // Similar pricing model
      if (tool.pricing === currentTool.pricing) score += 1;
      
      return { tool, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxItems)
    .map(({ tool }) => tool);

  if (relatedTools.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground">Related Tools You Might Like</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {relatedTools.map((tool) => (
          <Link 
            key={tool.id} 
            to={`/tool/${tool.id}`}
            className="group"
          >
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">{tool.icon}</div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                </div>
                <CardDescription className="line-clamp-2">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{tool.pricing}</Badge>
                  <span className="flex items-center text-sm text-primary">
                    View <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

/**
 * Category Navigation Component
 * Strategic links to related categories
 */
interface CategoryLinksProps {
  currentCategory?: string;
  className?: string;
}

export const CategoryLinks = ({ currentCategory, className }: CategoryLinksProps) => {
  const categories = [
    { id: 'writing', name: 'Writing', icon: '✍️', description: 'AI writing assistants' },
    { id: 'design', name: 'Design', icon: '🎨', description: 'Creative design tools' },
    { id: 'coding', name: 'Coding', icon: '💻', description: 'Developer tools' },
    { id: 'marketing', name: 'Marketing', icon: '📈', description: 'Marketing automation' },
    { id: 'productivity', name: 'Productivity', icon: '⚡', description: 'Boost efficiency' },
    { id: 'audio', name: 'Audio', icon: '🎵', description: 'Audio processing' },
    { id: 'video', name: 'Video', icon: '🎬', description: 'Video editing' },
    { id: 'research', name: 'Research', icon: '🔬', description: 'Research tools' },
  ];

  const displayCategories = currentCategory
    ? categories.filter(cat => cat.id !== currentCategory).slice(0, 4)
    : categories.slice(0, 6);

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Explore More Categories
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {displayCategories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="group"
          >
            <Card className="h-full transition-all hover:shadow-md hover:border-primary">
              <CardContent className="p-4">
                <div className="text-3xl mb-2">{category.icon}</div>
                <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {category.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

/**
 * Breadcrumb with Strategic Links
 * Enhanced breadcrumb with better internal linking
 */
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbLinksProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const BreadcrumbLinks = ({ items, className }: BreadcrumbLinksProps) => {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => (
          <li 
            key={index}
            className="flex items-center gap-2"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {item.href ? (
              <>
                <Link
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
                <meta itemProp="position" content={String(index + 1)} />
                {index < items.length - 1 && (
                  <span className="text-muted-foreground">/</span>
                )}
              </>
            ) : (
              <>
                <span className="text-foreground font-medium" itemProp="name">
                  {item.label}
                </span>
                <meta itemProp="position" content={String(index + 1)} />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

/**
 * Popular Tags Component
 * Strategic tag cloud with internal links
 */
interface PopularTagsProps {
  tags: Array<{ name: string; count: number }>;
  maxItems?: number;
  className?: string;
}

export const PopularTags = ({ tags, maxItems = 15, className }: PopularTagsProps) => {
  const displayTags = tags
    .sort((a, b) => b.count - a.count)
    .slice(0, maxItems);

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Popular Topics
      </h3>
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag) => (
          <Link key={tag.name} to={`/tag/${encodeURIComponent(tag.name)}`}>
            <Badge 
              variant="outline" 
              className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >
              {tag.name} ({tag.count})
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};

/**
 * Footer Navigation Links
 * Strategic footer links for SEO and navigation
 */
export const FooterNavLinks = () => {
  const footerSections = [
    {
      title: 'Popular Categories',
      links: [
        { label: 'AI Writing Tools', href: '/category/writing' },
        { label: 'AI Design Tools', href: '/category/design' },
        { label: 'AI Coding Tools', href: '/category/coding' },
        { label: 'AI Marketing Tools', href: '/category/marketing' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Tutorials', href: '/tutorials' },
        { label: 'API Documentation', href: '/api-docs' },
        { label: 'Changelog', href: '/changelog' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Advertise', href: '/advertise' },
        { label: 'Submit Tool', href: '/submit' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Sitemap', href: '/site-map' },
      ]
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {footerSections.map((section) => (
        <div key={section.title}>
          <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

/**
 * Contextual CTA Links
 * Smart call-to-action links based on user context
 */
interface ContextualCTAProps {
  context: 'tool-detail' | 'category' | 'homepage';
  currentCategory?: string;
  className?: string;
}

export const ContextualCTA = ({ context, currentCategory, className }: ContextualCTAProps) => {
  const ctaContent = {
    'tool-detail': {
      title: 'Compare with Similar Tools',
      description: 'See how this tool stacks up against alternatives',
      link: '/compare',
      secondary: { label: 'Browse Category', link: currentCategory ? `/category/${currentCategory}` : '/tools' }
    },
    'category': {
      title: 'Can\'t Find What You Need?',
      description: 'Submit a tool suggestion or explore other categories',
      link: '/submit',
      secondary: { label: 'View All Tools', link: '/tools' }
    },
    'homepage': {
      title: 'Stay Updated with AI Tools',
      description: 'Get weekly updates on the latest AI tools and trends',
      link: '/blog',
      secondary: { label: 'Compare Tools', link: '/compare' }
    }
  };

  const cta = ctaContent[context];

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {cta.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {cta.description}
            </p>
            <div className="flex gap-3">
              <Link to={cta.link}>
                <Badge className="cursor-pointer hover:bg-primary/90">
                  {cta.title.split(' ')[0]} Now
                </Badge>
              </Link>
              <Link to={cta.secondary.link}>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  {cta.secondary.label}
                </Badge>
              </Link>
            </div>
          </div>
          <TrendingUp className="h-8 w-8 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
};