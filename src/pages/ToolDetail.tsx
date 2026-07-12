import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Star, Users, Calendar, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getToolById } from "@/data/tools";
import { useToast } from "@/hooks/use-toast";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { usePrivacyAnalytics } from "@/hooks/usePrivacyAnalytics";
import AdvancedSEO from "@/components/AdvancedSEO";
import ProductSchema from "@/components/ProductSchema";
import AdvancedMetaTags from "@/components/AdvancedMetaTags";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import { RelatedTools, ContextualCTA, CategoryLinks, PopularTags } from "@/components/InternalLinks";
import { AlternativeTools, TrendingTools, ToolCrossLinks } from "@/components/EnhancedInternalLinks";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserReviews from "@/components/UserReviews";
import SocialShare from "@/components/SocialShare";
import ToolRecommendations from "@/components/ToolRecommendations";
import FAQ, { generateFAQSchema } from "@/components/FAQ";
import { generateToolFAQs } from "@/data/tool-faq-generator";
import { tools } from "@/data/tools";

const ToolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { trackToolView, trackToolVisit } = usePrivacyAnalytics();
  const tool = id ? getToolById(id) : undefined;

  // Track page view and add to recently viewed
  useEffect(() => {
    if (tool) {
      trackToolView(tool.id, tool.title);
      addToRecentlyViewed(tool);
    }
  }, [tool, trackToolView, addToRecentlyViewed]);

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Tool Not Found</h1>
          <p className="text-muted-foreground mb-8">The tool you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleVisitTool = () => {
    if (tool) {
      trackToolVisit(tool.id, tool.title, tool.website);
    }
    toast({
      title: "Redirecting",
      description: `Opening ${tool.title} in a new tab...`,
    });
    window.open(tool.website, '_blank');
  };


  const pricingColor = {
    Free: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Freemium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    Paid: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    Subscription: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  };

  return (
    <div className="min-h-screen">
      <AdvancedSEO 
        tool={tool}
        url={`/tool/${tool.id}`}
        pageType="tool"
      />
      <ProductSchema tool={tool} />
      <AdvancedMetaTags
        title={`${tool.title} - ${tool.description}`}
        description={tool.longDescription}
        url={`/tool/${tool.id}`}
        type="product"
        tool={tool}
        tags={tool.tags}
        author={tool.company}
        publishedTime={tool.founded}
      />
      <PerformanceOptimizer
        preconnect={[tool.website]}
        criticalImages={['/og-image.jpg']}
        prefetch={[
          { href: `/category/${tool.category}`, as: 'document' }
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema(generateToolFAQs(tool)))}
        </script>
      </Helmet>
      <Header />
      
      <div className="pt-20">
      {/* Header - LCP optimized with contain for better rendering */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b" style={{ contain: 'layout style' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Tool Icon - LCP element with priority rendering */}
            <div className="flex-shrink-0">
              <div 
                className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-3xl text-primary-foreground"
                data-lcp="true"
                style={{ contain: 'layout style paint' }}
              >
                {tool.icon}
              </div>
            </div>
            
            <div className="flex-1">
              {/* Tool Title - LCP element */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <h1 className="text-4xl font-black text-foreground" data-lcp="true">{tool.title}</h1>
                <Badge className={pricingColor[tool.pricing]}>
                  {tool.pricing}
                </Badge>
              </div>
              
              <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                {tool.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {tool.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/tag/${encodeURIComponent(tag)}`;
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">{tool.rating}</span>
                  <span>({tool.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span>{tool.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Founded {tool.founded}</span>
                </div>
              </div>
              
              <Button onClick={handleVisitTool} size="lg" className="btn-gradient">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit {tool.title}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle asChild>
                  <h2>About {tool.title}</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {tool.longDescription}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle asChild>
                  <h2>Key Features</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle asChild className="text-green-600 dark:text-green-400">
                    <h2>Pros</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tool.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground text-sm">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle asChild className="text-red-600 dark:text-red-400">
                    <h2>Cons</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tool.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground text-sm">{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* User Reviews */}
            <UserReviews toolId={tool.id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Social Share */}
            <SocialShare tool={tool} />

            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground">Pricing Model</h4>
                  <p className="text-muted-foreground">{tool.pricing}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Category</h4>
                  <Link 
                    to={`/category/${tool.category}`}
                    className="text-primary hover:underline capitalize"
                  >
                    {tool.category} Tools
                  </Link>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Company</h4>
                  <p className="text-muted-foreground">{tool.company}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Founded</h4>
                  <p className="text-muted-foreground">{tool.founded}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Tags</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tool.tags.slice(0, 4).map(tag => (
                      <Link key={tag} to={`/tag/${encodeURIComponent(tag)}`}>
                        <Badge variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(tool.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-foreground">{tool.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {tool.reviewCount.toLocaleString()} reviews
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={handleVisitTool} className="w-full btn-gradient mb-3">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Website
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  External link to {tool.title}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alternative Tools - Strong internal linking */}
        <AlternativeTools 
          currentTool={tool}
          maxItems={4}
        />

        {/* Tool Recommendations */}
        <div className="mt-16">
          <ToolRecommendations 
            currentTool={tool}
            showSimilar={true}
            showTrending={true}
            showPersonalized={false}
          />
        </div>

        {/* Cross-links to related categories */}
        <ToolCrossLinks currentCategory={tool.category} />

        {/* Related Tools with Strategic Internal Linking */}
        <div className="mt-16">
          <RelatedTools 
            currentTool={tool}
            allTools={tools}
            maxItems={3}
          />
        </div>

        {/* Contextual CTA */}
        <div className="mt-8">
          <ContextualCTA 
            context="tool-detail"
            currentCategory={tool.category}
          />
        </div>

        {/* Trending Tools */}
        <TrendingTools excludeToolId={tool.id} maxItems={6} />

        {/* FAQ Section */}
        <div className="mt-16">
          <FAQ 
            items={generateToolFAQs(tool)}
            title={`${tool.title} - Frequently Asked Questions`}
            description={`Common questions about ${tool.title}, its features, pricing, and use cases`}
          />
        </div>

        {/* Explore Categories */}
        <div className="mt-16">
          <CategoryLinks currentCategory={tool.category} />
        </div>

        {/* Popular Tags */}
        <div className="mt-12">
          <PopularTags maxItems={12} />
        </div>
      </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ToolDetail;