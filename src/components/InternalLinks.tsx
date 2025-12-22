import { Link } from 'react-router-dom';
import { Tool, tools as allToolsData } from '@/data/tools';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Sparkles, Star, Clock, Tag } from 'lucide-react';

// Get all unique categories from tools
const getAllCategories = () => {
  const categories = [...new Set(allToolsData.map(tool => tool.category))];
  const categoryData: Record<string, { name: string; icon: string; description: string }> = {
    writing: { name: 'Writing', icon: '✍️', description: 'AI writing assistants' },
    design: { name: 'Design', icon: '🎨', description: 'Creative design tools' },
    coding: { name: 'Coding', icon: '💻', description: 'Developer tools' },
    marketing: { name: 'Marketing', icon: '📈', description: 'Marketing automation' },
    productivity: { name: 'Productivity', icon: '⚡', description: 'Boost efficiency' },
    audio: { name: 'Audio', icon: '🎵', description: 'Audio processing' },
    video: { name: 'Video', icon: '🎬', description: 'Video editing' },
    research: { name: 'Research', icon: '🔬', description: 'Research tools' },
    data: { name: 'Data', icon: '📊', description: 'Data analytics' },
    automation: { name: 'Automation', icon: '🤖', description: 'Workflow automation' },
    sales: { name: 'Sales', icon: '💼', description: 'Sales & CRM tools' },
    social: { name: 'Social', icon: '📱', description: 'Social media tools' },
    seo: { name: 'SEO', icon: '🔍', description: 'SEO optimization' },
  };
  return categories.map(cat => ({
    id: cat,
    ...categoryData[cat] || { name: cat.charAt(0).toUpperCase() + cat.slice(1), icon: '🔧', description: `${cat} tools` }
  }));
};

// Get popular tags from all tools
const getPopularTagsData = () => {
  const tagCounts: Record<string, number> = {};
  allToolsData.forEach(tool => {
    tool.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

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
  showAll?: boolean;
}

export const CategoryLinks = ({ currentCategory, className, showAll = false }: CategoryLinksProps) => {
  const categories = getAllCategories();

  const displayCategories = currentCategory
    ? categories.filter(cat => cat.id !== currentCategory)
    : categories;
  
  const finalCategories = showAll ? displayCategories : displayCategories.slice(0, 6);

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Explore More Categories
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {finalCategories.map((category) => (
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
      {!showAll && displayCategories.length > 6 && (
        <div className="text-center mt-4">
          <Link to="/browse" className="text-primary hover:underline text-sm font-medium">
            View all categories →
          </Link>
        </div>
      )}
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
  tags?: Array<{ name: string; count: number }>;
  maxItems?: number;
  className?: string;
}

export const PopularTags = ({ tags, maxItems = 15, className }: PopularTagsProps) => {
  const displayTags = (tags || getPopularTagsData())
    .sort((a, b) => b.count - a.count)
    .slice(0, maxItems);

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Tag className="h-5 w-5" />
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
 * Featured Tools Quick Links
 * Top tools with quick navigation
 */
interface FeaturedToolsLinksProps {
  maxItems?: number;
  className?: string;
}

export const FeaturedToolsLinks = ({ maxItems = 8, className }: FeaturedToolsLinksProps) => {
  const topTools = [...allToolsData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, maxItems);

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        Top Rated Tools
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {topTools.map((tool) => (
          <Link
            key={tool.id}
            to={`/tool/${tool.id}`}
            className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-all group"
          >
            <span className="text-xl">{tool.icon}</span>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{tool.title}</p>
              <p className="text-xs text-muted-foreground">★ {tool.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

/**
 * Recent/New Tools Links
 */
export const RecentToolsLinks = ({ maxItems = 6, className }: { maxItems?: number; className?: string }) => {
  // Get tools sorted by "newest" (using founded date as proxy)
  const recentTools = [...allToolsData]
    .sort((a, b) => parseInt(b.founded) - parseInt(a.founded))
    .slice(0, maxItems);

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Recently Added
      </h3>
      <ul className="space-y-2">
        {recentTools.map((tool) => (
          <li key={tool.id}>
            <Link
              to={`/tool/${tool.id}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <span>{tool.icon}</span>
              <span className="text-sm">{tool.title}</span>
              <Badge variant="secondary" className="text-xs ml-auto">{tool.category}</Badge>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Quick Navigation Component
 * Comprehensive site navigation for SEO
 */
export const QuickNavigation = ({ className }: { className?: string }) => {
  const categories = getAllCategories();
  const topTools = [...allToolsData].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const popularTags = getPopularTagsData().slice(0, 8);

  return (
    <section className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Categories */}
        <div>
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Categories
          </h4>
          <ul className="space-y-2">
            {categories.slice(0, 8).map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/category/${cat.id}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span>{cat.icon}</span>
                  {cat.name} Tools
                </Link>
              </li>
            ))}
            <li>
              <Link to="/browse" className="text-sm text-primary hover:underline font-medium">
                Browse all →
              </Link>
            </li>
          </ul>
        </div>

        {/* Top Tools */}
        <div>
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Star className="h-4 w-4" />
            Top Tools
          </h4>
          <ul className="space-y-2">
            {topTools.map((tool) => (
              <li key={tool.id}>
                <Link
                  to={`/tool/${tool.id}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span>{tool.icon}</span>
                  {tool.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/browse" className="text-sm text-primary hover:underline font-medium">
                View all tools →
              </Link>
            </li>
          </ul>
        </div>

        {/* Popular Tags */}
        <div>
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Popular Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Link key={tag.name} to={`/tag/${encodeURIComponent(tag.name)}`}>
                <Badge variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/browse" className="text-sm text-muted-foreground hover:text-primary transition-colors">Browse All Tools</Link></li>
            <li><Link to="/compare" className="text-sm text-muted-foreground hover:text-primary transition-colors">Compare Tools</Link></li>
            <li><Link to="/favorites" className="text-sm text-muted-foreground hover:text-primary transition-colors">My Favorites</Link></li>
            <li><Link to="/submit" className="text-sm text-muted-foreground hover:text-primary transition-colors">Submit a Tool</Link></li>
            <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">AI Blog</Link></li>
            <li><Link to="/tutorials" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tutorials</Link></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

/**
 * Footer Navigation Links
 * Strategic footer links for SEO and navigation
 */
export const FooterNavLinks = () => {
  const categories = getAllCategories();
  const topTools = [...allToolsData].sort((a, b) => b.rating - a.rating).slice(0, 6);

  const footerSections = [
    {
      title: 'Popular Categories',
      links: categories.slice(0, 8).map(cat => ({
        label: `${cat.name} AI Tools`,
        href: `/category/${cat.id}`
      }))
    },
    {
      title: 'Top Tools',
      links: topTools.map(tool => ({
        label: tool.title,
        href: `/tool/${tool.id}`
      }))
    },
    {
      title: 'Resources',
      links: [
        { label: 'Browse All Tools', href: '/browse' },
        { label: 'Compare Tools', href: '/compare' },
        { label: 'Blog', href: '/blog' },
        { label: 'Tutorials', href: '/tutorials' },
        { label: 'API Documentation', href: '/api-docs' },
        { label: 'Changelog', href: '/changelog' },
        { label: 'Site Map', href: '/site-map' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Advertise', href: '/advertise' },
        { label: 'Submit Tool', href: '/submit' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
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
  context: 'tool-detail' | 'category' | 'homepage' | 'tag';
  currentCategory?: string;
  className?: string;
}

export const ContextualCTA = ({ context, currentCategory, className }: ContextualCTAProps) => {
  const ctaContent = {
    'tool-detail': {
      title: 'Compare with Similar Tools',
      description: 'See how this tool stacks up against alternatives',
      link: '/compare',
      secondary: { label: 'Browse Category', link: currentCategory ? `/category/${currentCategory}` : '/browse' }
    },
    'category': {
      title: 'Can\'t Find What You Need?',
      description: 'Submit a tool suggestion or explore other categories',
      link: '/submit',
      secondary: { label: 'View All Tools', link: '/browse' }
    },
    'homepage': {
      title: 'Stay Updated with AI Tools',
      description: 'Get weekly updates on the latest AI tools and trends',
      link: '/blog',
      secondary: { label: 'Compare Tools', link: '/compare' }
    },
    'tag': {
      title: 'Explore More Topics',
      description: 'Discover tools across different categories and use cases',
      link: '/browse',
      secondary: { label: 'View All Categories', link: '/#categories' }
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

/**
 * Tools by Category Preview
 * Shows a few tools from each category for cross-linking
 */
export const ToolsByCategoryPreview = ({ className }: { className?: string }) => {
  const categories = getAllCategories().slice(0, 4);
  
  return (
    <div className={className}>
      <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
        Explore AI Tools by Category
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const categoryTools = allToolsData
            .filter(t => t.category === category.id)
            .slice(0, 3);
          
          return (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <Link to={`/category/${category.id}`} className="group">
                  <CardTitle className="flex items-center gap-3 group-hover:text-primary transition-colors">
                    <span className="text-2xl">{category.icon}</span>
                    {category.name} AI Tools
                  </CardTitle>
                </Link>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {categoryTools.map((tool) => (
                    <li key={tool.id}>
                      <Link
                        to={`/tool/${tool.id}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <span>{tool.icon}</span>
                        <span>{tool.title}</span>
                        <Badge variant="secondary" className="text-xs ml-auto">
                          ★ {tool.rating}
                        </Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/category/${category.id}`}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-4"
                >
                  View all {category.name} tools
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="text-center mt-8">
        <Link to="/browse" className="text-primary hover:underline font-medium">
          Browse all categories and tools →
        </Link>
      </div>
    </div>
  );
};