import { useParams } from 'react-router-dom';
import { getToolsByCategory } from '@/data/tools';
import { generateCategoryStructuredData, generateSEOTitle, generateMetaDescription } from "@/lib/seo-utils";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Zap, Award } from 'lucide-react';

const categoryEmojis: Record<string, string> = {
  writing: '✍️',
  design: '🎨',
  coding: '💻',
  marketing: '📈',
  productivity: '⚡',
  audio: '🎵',
  video: '🎬',
  research: '🔬',
  data: '📊',
  automation: '🤖'
};

const categoryGuides: Record<string, {
  subtitle: string;
  introduction: string;
  sections: Array<{
    title: string;
    content: string;
    tools?: string[];
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}> = {
  writing: {
    subtitle: "Transform your writing workflow with AI-powered tools",
    introduction: "AI writing tools are revolutionizing content creation, offering everything from basic grammar checks to full article generation. Whether you're a blogger, marketer, or professional writer, these tools can enhance your productivity and creativity.",
    sections: [
      {
        title: "Best for Content Creation",
        content: "Long-form content requires tools that understand context and maintain consistency throughout lengthy pieces.",
        tools: ["ChatGPT", "Jasper AI", "Claude"]
      },
      {
        title: "SEO-Optimized Writing",
        content: "Combine AI writing with SEO optimization to create content that ranks well in search engines.",
        tools: ["Surfer AI", "MarketMuse", "Frase"]
      },
      {
        title: "Quick Copy Generation",
        content: "For social media posts, ad copy, and marketing materials that need to be punchy and engaging.",
        tools: ["Copy.ai", "Jasper AI", "Writesonic"]
      }
    ],
    cta: {
      title: "Start Writing with AI Today",
      description: "Try these AI writing tools and transform your content creation process",
      buttonText: "Explore Writing Tools"
    }
  },
  design: {
    subtitle: "Create stunning visuals with AI-powered design tools",
    introduction: "AI design tools are democratizing creativity, enabling anyone to create professional-quality graphics, logos, and layouts without extensive design experience.",
    sections: [
      {
        title: "Image Generation & Art",
        content: "Create original artwork, illustrations, and concept designs from simple text prompts.",
        tools: ["Midjourney", "DALL-E 3", "Adobe Firefly"]
      },
      {
        title: "User Interface Design",
        content: "Design websites, mobile apps, and digital interfaces with AI assistance.",
        tools: ["Figma AI", "Uizard", "Sketch2React"]
      },
      {
        title: "Brand & Logo Design",
        content: "Generate professional logos and brand assets tailored to your business.",
        tools: ["Looka", "Brandmark", "Canva AI"]
      }
    ],
    cta: {
      title: "Start Designing with AI",
      description: "Discover tools that will revolutionize your creative workflow",
      buttonText: "Explore Design Tools"
    }
  },
  coding: {
    subtitle: "Accelerate development with AI coding assistants",
    introduction: "AI coding tools are transforming software development by providing intelligent code suggestions, automated testing, and debugging assistance.",
    sections: [
      {
        title: "Code Generation & Completion",
        content: "Get intelligent code suggestions and completions that understand your project context.",
        tools: ["GitHub Copilot", "TabNine", "CodeWhisperer"]
      },
      {
        title: "Code Review & Optimization",
        content: "Automatically review code for bugs, security issues, and performance improvements.",
        tools: ["DeepCode", "SonarQube", "CodeClimate"]
      },
      {
        title: "Documentation & Testing",
        content: "Generate documentation and write tests automatically from your codebase.",
        tools: ["Mintlify", "TestCraft", "Swimm"]
      }
    ],
    cta: {
      title: "Code Smarter with AI",
      description: "Boost your development productivity with these AI coding tools",
      buttonText: "Explore Coding Tools"
    }
  }
};

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const { toast } = useToast();
  
  if (!category) {
    return <div>Category not found</div>;
  }

  const tools = getToolsByCategory(category);
  const emoji = categoryEmojis[category.toLowerCase()] || '🔧';
  const displayName = category.charAt(0).toUpperCase() + category.slice(1);
  const guide = categoryGuides[category.toLowerCase()];

  const handleVisitTool = (toolName: string, website: string) => {
    toast({
      title: "Visiting Tool",
      description: `Redirecting to ${toolName}...`,
    });
    window.open(website, '_blank');
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${displayName} AI Tools`,
    "description": `Discover the best AI tools for ${category}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": tools.length,
      "itemListElement": tools.map((tool, index) => ({
        "@type": "SoftwareApplication",
        "@id": `https://toolsml.com/tool/${tool.id}`,
        "position": index + 1,
        "name": tool.title,
        "description": tool.description,
        "applicationCategory": "AI Tool",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": tool.pricing === 'Free' ? "0" : tool.pricing,
          "priceCurrency": "USD"
        }
      }))
    }
  };

    <div className="min-h-screen">
      <SEO 
        title={`${displayName} AI Tools - Best ${displayName} Solutions 2025`}
        description={guide?.introduction || `Discover the best AI tools for ${category}. Compare features, pricing, and reviews.`}
        keywords={`${category} AI tools, ${category} artificial intelligence, ${category} automation, best ${category} tools`}
        jsonLd={jsonLd}
      />
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[
            { label: 'Categories', href: '/' },
            { label: `${displayName} Tools` }
          ]} />
        </div>

        <section className="hero-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">{emoji}</div>
            <h1 className="hero-title">
              {displayName} AI Tools
            </h1>
            <p className="hero-subtitle">
              {guide?.subtitle || `Discover the best AI-powered tools for ${category}`}
            </p>
            <div className="flex justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {tools.length} Tools
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Trusted by 10K+ users
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Expert curated
              </div>
            </div>
          </div>
        </section>

        {/* Category Guide */}
        {guide && (
          <section className="py-20 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-foreground text-center mb-8">
                Complete Guide to {displayName} AI Tools
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12 leading-relaxed">
                {guide.introduction}
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {guide.sections.map((section, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{section.content}</p>
                      {section.tools && (
                        <div className="flex flex-wrap gap-2">
                          {section.tools.map((toolName) => (
                            <Badge key={toolName} variant="secondary" className="text-xs">
                              {toolName}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {tools.length} {displayName} Tools Found
              </h2>
              <p className="text-muted-foreground">
                Professional-grade AI tools for {category}
              </p>
            </div>

            {tools.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  No tools found
                </h3>
                <p className="text-muted-foreground">
                  We're constantly adding new tools. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tools.map((tool, index) => (
                  <div
                    key={tool.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ToolCard
                      tool={tool}
                      onVisit={() => handleVisitTool(tool.title, tool.website)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        {guide && (
          <section className="py-20 bg-primary/5">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {guide.cta.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {guide.cta.description}
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild className="btn-gradient">
                  <Link to="/#newsletter">
                    Get Tool Updates
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/submit">
                    Suggest a Tool
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
};

export default Category;