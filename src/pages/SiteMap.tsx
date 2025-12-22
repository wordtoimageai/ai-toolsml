import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePrivacyAnalytics } from "@/hooks/usePrivacyAnalytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdvancedSEO from "@/components/AdvancedSEO";
import Breadcrumb from "@/components/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { tools as allTools } from "@/data/tools";
import { 
  Home, FileText, Folder, Tag, Wrench, Users, BookOpen, 
  HelpCircle, Shield, Mail, TrendingUp, Star, Clock, 
  Grid3X3, ExternalLink
} from "lucide-react";

const SiteMap = () => {
  const { trackPageView } = usePrivacyAnalytics();

  useEffect(() => {
    trackPageView('sitemap');
  }, [trackPageView]);

  // Get all unique categories with tool counts
  const categories = useMemo(() => {
    const catCounts: Record<string, { count: number; tools: typeof allTools }> = {};
    allTools.forEach(tool => {
      if (!catCounts[tool.category]) {
        catCounts[tool.category] = { count: 0, tools: [] };
      }
      catCounts[tool.category].count++;
      catCounts[tool.category].tools.push(tool);
    });
    
    const categoryNames: Record<string, { name: string; icon: string }> = {
      writing: { name: 'Writing & Content', icon: '✍️' },
      design: { name: 'Design & Creative', icon: '🎨' },
      coding: { name: 'Development', icon: '💻' },
      marketing: { name: 'Marketing', icon: '📈' },
      productivity: { name: 'Productivity', icon: '⚡' },
      video: { name: 'Video', icon: '🎬' },
      audio: { name: 'Audio', icon: '🎵' },
      research: { name: 'Research', icon: '🔬' },
      data: { name: 'Data & Analytics', icon: '📊' },
      automation: { name: 'Automation', icon: '🤖' },
      sales: { name: 'Sales & CRM', icon: '💼' },
      social: { name: 'Social Media', icon: '📱' },
      seo: { name: 'SEO', icon: '🔍' },
    };
    
    return Object.entries(catCounts)
      .map(([id, data]) => ({
        id,
        name: categoryNames[id]?.name || id.charAt(0).toUpperCase() + id.slice(1),
        icon: categoryNames[id]?.icon || '🔧',
        count: data.count,
        tools: data.tools.sort((a, b) => b.rating - a.rating)
      }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Get all unique tags with counts
  const tags = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    allTools.forEach(tool => {
      tool.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Static pages
  const staticPages = [
    { name: "Home", path: "/", icon: Home, description: "Discover the best AI tools" },
    { name: "Browse All Tools", path: "/browse", icon: Grid3X3, description: "Complete tool directory" },
    { name: "Compare Tools", path: "/compare", icon: TrendingUp, description: "Side-by-side comparisons" },
    { name: "Favorites", path: "/favorites", icon: Star, description: "Your saved tools" },
    { name: "Submit a Tool", path: "/submit", icon: Wrench, description: "Submit your AI tool" },
  ];

  const resourcePages = [
    { name: "Blog", path: "/blog", icon: BookOpen, description: "AI news and articles" },
    { name: "Tutorials", path: "/tutorials", icon: FileText, description: "How-to guides" },
    { name: "API Documentation", path: "/api-docs", icon: FileText, description: "Developer API" },
    { name: "Changelog", path: "/changelog", icon: Clock, description: "Recent updates" },
  ];

  const companyPages = [
    { name: "About Us", path: "/about", icon: Users, description: "Our story" },
    { name: "Contact", path: "/contact", icon: Mail, description: "Get in touch" },
    { name: "Advertise", path: "/advertise", icon: TrendingUp, description: "Advertising options" },
  ];

  const legalPages = [
    { name: "Privacy Policy", path: "/privacy", icon: Shield, description: "Data protection" },
    { name: "Terms of Service", path: "/terms", icon: FileText, description: "Usage terms" },
  ];

  return (
    <>
      <AdvancedSEO 
        title="Sitemap - Complete Index of AI Tools & Categories | ToolsML"
        description={`Browse our complete sitemap with ${allTools.length}+ AI tools organized by ${categories.length} categories and ${tags.length}+ topics. Find every tool, category, and resource on ToolsML.`}
        pageType="homepage"
        url="/site-map"
      />
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="hero-gradient py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: 'Sitemap' }
            ]} />
            <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
              Complete Site Map
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Navigate our complete directory of {allTools.length}+ AI tools across {categories.length} categories 
              and {tags.length}+ topics. Find exactly what you're looking for.
            </p>
            <div className="flex gap-4 mt-6">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {allTools.length} Tools
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {categories.length} Categories
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {tags.length} Tags
              </Badge>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          {/* Main Navigation */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Home className="h-6 w-6" />
              Main Pages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {staticPages.map((page) => (
                <Link key={page.path} to={page.path}>
                  <Card className="h-full hover:border-primary hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <page.icon className="h-5 w-5 text-primary mb-2" />
                      <h3 className="font-semibold">{page.name}</h3>
                      <p className="text-xs text-muted-foreground">{page.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Categories with Tools */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Folder className="h-6 w-6" />
              Categories & Tools ({allTools.length} total)
            </h2>
            <Accordion type="multiple" className="space-y-4">
              {categories.map((category) => (
                <AccordionItem key={category.id} value={category.id} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <Link 
                          to={`/category/${category.id}`}
                          className="font-semibold hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {category.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {category.count} tools
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-4">
                      {category.tools.map((tool) => (
                        <Link
                          key={tool.id}
                          to={`/tool/${tool.id}`}
                          className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-all group"
                        >
                          <span className="text-lg">{tool.icon}</span>
                          <div className="overflow-hidden flex-1">
                            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                              {tool.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>★ {tool.rating}</span>
                              <Badge variant="outline" className="text-[10px] px-1 py-0">
                                {tool.pricing}
                              </Badge>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link 
                      to={`/category/${category.id}`}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      View all {category.name} tools
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Tags Cloud */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Tag className="h-6 w-6" />
              All Tags ({tags.length})
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link key={tag.name} to={`/tag/${encodeURIComponent(tag.name)}`}>
                      <Badge 
                        variant="outline" 
                        className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                      >
                        {tag.name}
                        <span className="ml-1 text-xs opacity-70">({tag.count})</span>
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Resources */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {resourcePages.map((page) => (
                <Link key={page.path} to={page.path}>
                  <Card className="h-full hover:border-primary hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <page.icon className="h-5 w-5 text-primary mb-2" />
                      <h3 className="font-semibold">{page.name}</h3>
                      <p className="text-xs text-muted-foreground">{page.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Company & Legal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="h-6 w-6" />
                Company
              </h2>
              <div className="space-y-3">
                {companyPages.map((page) => (
                  <Link key={page.path} to={page.path}>
                    <Card className="hover:border-primary hover:shadow-md transition-all">
                      <CardContent className="p-4 flex items-center gap-3">
                        <page.icon className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-semibold">{page.name}</h3>
                          <p className="text-xs text-muted-foreground">{page.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Legal
              </h2>
              <div className="space-y-3">
                {legalPages.map((page) => (
                  <Link key={page.path} to={page.path}>
                    <Card className="hover:border-primary hover:shadow-md transition-all">
                      <CardContent className="p-4 flex items-center gap-3">
                        <page.icon className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-semibold">{page.name}</h3>
                          <p className="text-xs text-muted-foreground">{page.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* All Tools A-Z */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Wrench className="h-6 w-6" />
              All Tools A-Z
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {[...allTools]
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map((tool) => (
                      <Link
                        key={tool.id}
                        to={`/tool/${tool.id}`}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <span className="text-sm">{tool.icon}</span>
                        <span className="text-sm truncate group-hover:text-primary transition-colors">
                          {tool.title}
                        </span>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Quick Stats */}
          <section className="bg-muted/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Site Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-primary">{allTools.length}</div>
                <div className="text-sm text-muted-foreground">AI Tools</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">{categories.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">{tags.length}</div>
                <div className="text-sm text-muted-foreground">Tags</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">
                  {staticPages.length + resourcePages.length + companyPages.length + legalPages.length}
                </div>
                <div className="text-sm text-muted-foreground">Pages</div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default SiteMap;