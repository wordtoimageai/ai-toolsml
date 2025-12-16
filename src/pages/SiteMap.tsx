import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePrivacyAnalytics } from "@/hooks/usePrivacyAnalytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdvancedSEO from "@/components/AdvancedSEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

const SiteMap = () => {
  const { trackPageView } = usePrivacyAnalytics();

  useEffect(() => {
    trackPageView('sitemap');
  }, [trackPageView]);

  const pages = [
    { name: "Home", path: "/", status: "complete", features: ["Hero", "Categories", "Featured Tools", "Recently Added", "Stats", "Newsletter"] },
    { name: "Tool Detail", path: "/tool/:id", status: "complete", features: ["Full tool info", "Reviews", "Comparisons", "Share", "Affiliates"] },
    { name: "Category", path: "/category/:category", status: "complete", features: ["Filtered tools", "SEO optimized", "Advanced filters"] },
    { name: "Tag", path: "/tag/:tag", status: "complete", features: ["Tag-based filtering", "SEO optimized"] },
    { name: "Compare", path: "/compare", status: "complete", features: ["Side-by-side comparison", "Feature matrix"] },
    { name: "Favorites", path: "/favorites", status: "complete", features: ["Saved tools", "User preferences"] },
    { name: "Submit Tool", path: "/submit", status: "complete", features: ["Vendor submissions", "Form validation"] },
    { name: "Blog", path: "/blog", status: "complete", features: ["Article listing", "SEO optimized"] },
    { name: "Blog Post", path: "/blog/:slug", status: "complete", features: ["Article content", "Structured data"] },
    { name: "Tutorials", path: "/tutorials", status: "complete", features: ["Tutorial guides"] },
    { name: "About", path: "/about", status: "complete", features: ["Company info", "Team"] },
    { name: "Contact", path: "/contact", status: "complete", features: ["Contact form"] },
    { name: "Privacy Policy", path: "/privacy", status: "complete", features: ["GDPR compliant", "Privacy dashboard"] },
    { name: "Terms of Service", path: "/terms", status: "complete", features: ["Legal terms"] },
    { name: "API Docs", path: "/api-docs", status: "complete", features: ["API documentation"] },
    { name: "Changelog", path: "/changelog", status: "complete", features: ["Version history"] },
    { name: "Advertise", path: "/advertise", status: "complete", features: ["Advertising info"] },
    { name: "Auth", path: "/auth", status: "complete", features: ["Login/Signup"] },
    { name: "Vendor Dashboard", path: "/vendor/dashboard", status: "complete", features: ["Tool management", "Analytics"] },
    { name: "Privacy Dashboard", path: "/user/privacy", status: "complete", features: ["Privacy controls", "Data export"] },
  ];

  const coreFeatures = [
    { name: "Advanced SEO", status: "complete", items: ["Meta tags", "Structured data", "Open Graph", "Twitter Cards", "Canonical URLs"] },
    { name: "Performance", status: "complete", items: ["Lazy loading", "Image optimization", "Code splitting", "Preconnect links"] },
    { name: "Analytics", status: "complete", items: ["Page views", "Tool clicks", "User tracking", "Privacy compliant"] },
    { name: "User Authentication", status: "complete", items: ["Supabase auth", "Protected routes", "User profiles"] },
    { name: "Database", status: "complete", items: ["Tool submissions", "Analytics events", "User profiles", "Affiliate tracking"] },
    { name: "Search & Filters", status: "complete", items: ["Full-text search", "Category filters", "Tag filters", "Advanced filters"] },
    { name: "Social Features", status: "complete", items: ["Favorites", "Recently viewed", "Share tools", "Reviews"] },
    { name: "Affiliate System", status: "complete", items: ["Link tracking", "Click analytics"] },
    { name: "Design System", status: "complete", items: ["Tailwind config", "Semantic tokens", "Dark mode", "Responsive"] },
  ];

  const pendingFeatures = [
    { name: "AI Recommendations", status: "pending", priority: "high" },
    { name: "User Generated Reviews", status: "pending", priority: "high" },
    { name: "Tool Comparison Matrix", status: "partial", priority: "medium" },
    { name: "Premium Features", status: "partial", priority: "medium" },
    { name: "Email Notifications", status: "pending", priority: "low" },
    { name: "Tool Upvoting", status: "pending", priority: "low" },
  ];

  return (
    <>
      <AdvancedSEO 
        title="Site Map - ToolsML Website Structure"
        description="Comprehensive overview of ToolsML website structure, features, and implementation status"
        pageType="homepage"
        url="https://toolsml.com/site-map"
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Website Map</h1>
            <p className="text-lg text-muted-foreground">
              Complete overview of ToolsML architecture, features, and implementation status
            </p>
          </div>

          {/* Pages Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Pages & Routes ({pages.length})
              </CardTitle>
              <CardDescription>All website pages with their features and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pages.map((page) => (
                  <Link 
                    key={page.path} 
                    to={page.path.includes(':') ? page.path.replace(':id', '1').replace(':category', 'productivity').replace(':tag', 'automation').replace(':slug', 'getting-started') : page.path}
                    className="block"
                  >
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base">{page.name}</CardTitle>
                          <Badge variant={page.status === 'complete' ? 'default' : 'secondary'}>
                            {page.status}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs font-mono">{page.path}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {page.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2">
                              <Circle className="w-2 h-2 fill-current" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Core Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Core Features Implemented
              </CardTitle>
              <CardDescription>Foundational features and systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {coreFeatures.map((feature) => (
                  <Card key={feature.name}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{feature.name}</CardTitle>
                        <Badge variant="default">{feature.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {feature.items.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                Pending & Partial Features
              </CardTitle>
              <CardDescription>Features in development or planned for implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pendingFeatures.map((feature) => (
                  <Card key={feature.name} className="border-dashed">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{feature.name}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant={feature.status === 'partial' ? 'secondary' : 'outline'}>
                            {feature.status}
                          </Badge>
                          <Badge variant={
                            feature.priority === 'high' ? 'destructive' : 
                            feature.priority === 'medium' ? 'default' : 
                            'secondary'
                          }>
                            {feature.priority}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Stack */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Stack</CardTitle>
              <CardDescription>Technologies and frameworks used</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="font-semibold mb-3">Frontend</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      React 18 + TypeScript
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Vite Build System
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      React Router v7
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Tailwind CSS
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Shadcn/ui Components
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Backend</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Supabase Database
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Supabase Auth
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Edge Functions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Row Level Security
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Features</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      SEO Optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Analytics Tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Dark Mode
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Responsive Design
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Privacy Compliance
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SiteMap;