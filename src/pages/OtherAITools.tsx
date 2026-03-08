import { useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHelmet from "@/components/SEOHelmet";
import ItemListSchema from "@/components/ItemListSchema";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import { getAllTools } from "@/data/tools";
import { useToast } from "@/hooks/use-toast";
import { usePrivacyAnalytics } from "@/hooks/usePrivacyAnalytics";
import { Sparkles, ArrowRight } from "lucide-react";

const NICHE_CATEGORIES = ["automation", "data", "sales", "social", "seo", "audio", "research"];

const OtherAITools = () => {
  const { toast } = useToast();
  const { trackToolVisit } = usePrivacyAnalytics();
  const year = new Date().getFullYear();

  const nicheTools = useMemo(() => {
    const all = getAllTools();
    return all.filter(t => NICHE_CATEGORIES.includes(t.category.toLowerCase()));
  }, []);

  const grouped = useMemo(() => {
    const map: Record<string, typeof nicheTools> = {};
    nicheTools.forEach(t => {
      const cat = t.category.toLowerCase();
      if (!map[cat]) map[cat] = [];
      map[cat].push(t);
    });
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length);
  }, [nicheTools]);

  const handleVisit = (id: string, name: string, url: string) => {
    trackToolVisit(id, name, url);
    toast({ title: "Visiting Tool", description: `Redirecting to ${name}...` });
    window.open(url, "_blank");
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Other AI Tools ${year} — Hidden Gems Beyond ChatGPT`,
    description: `Discover ${nicheTools.length}+ lesser-known AI tools for automation, data analysis, sales, social media, SEO, audio, and research.`,
    url: "https://toolsml.com/other-ai-tools",
    isPartOf: { "@id": "https://toolsml.com/#website" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://toolsml.com" },
        { "@type": "ListItem", position: 2, name: "Other AI Tools", item: "https://toolsml.com/other-ai-tools" },
      ],
    },
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <SEOHelmet
        title={`Other AI Tools ${year} — Hidden Gems Beyond ChatGPT & Midjourney`}
        description={`Discover ${nicheTools.length}+ lesser-known AI tools for automation, data analysis, sales, social media, SEO, audio, and research. Curated reviews with pricing and ratings.`}
        keywords="other ai tools, ai tools list, alternative ai tools, niche ai tools, ai automation tools, ai data tools, ai sales tools"
        url="https://toolsml.com/other-ai-tools"
        structuredData={structuredData}
      />

      <ItemListSchema
        items={nicheTools}
        listName={`Other AI Tools ${year}`}
        listDescription={`Curated collection of ${nicheTools.length}+ niche AI tools beyond the mainstream options.`}
        maxItems={20}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Other AI Tools" },
          ]}
        />

        {/* Hero */}
        <section className="text-center mb-16 mt-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>{nicheTools.length}+ Tools Beyond the Mainstream</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Other AI Tools You Should Know in {year}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Move beyond ChatGPT and Midjourney. These lesser-known AI tools for automation, data, sales, SEO, audio, and research can transform your workflow.
          </p>
        </section>

        {/* Quick nav */}
        <nav className="flex flex-wrap gap-2 justify-center mb-12" aria-label="Category quick links">
          {grouped.map(([cat, tools]) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {capitalize(cat)} <span className="opacity-60">({tools.length})</span>
            </Link>
          ))}
        </nav>

        {/* Grouped tool sections */}
        {grouped.map(([cat, tools]) => (
          <section key={cat} className="mb-16" id={cat}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Best AI {capitalize(cat)} Tools
              </h2>
              <Link
                to={`/category/${cat}`}
                className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-medium"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map(tool => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onVisit={() => handleVisit(tool.id, tool.title, tool.website)}
                />
              ))}
            </div>
          </section>
        ))}

        {/* Internal links */}
        <section className="mt-20 border-t border-border pt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Explore More AI Tool Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["writing", "design", "coding", "marketing", "productivity", "video"].map(cat => (
              <Link
                key={cat}
                to={`/category/${cat}`}
                className="block p-4 rounded-xl border border-border bg-card hover:bg-accent transition-colors text-center"
              >
                <span className="font-semibold text-foreground">{capitalize(cat)} AI Tools</span>
              </Link>
            ))}
            <Link
              to="/browse"
              className="block p-4 rounded-xl border border-border bg-card hover:bg-accent transition-colors text-center"
            >
              <span className="font-semibold text-foreground">Browse All Tools</span>
            </Link>
            <Link
              to="/comparison"
              className="block p-4 rounded-xl border border-border bg-card hover:bg-accent transition-colors text-center"
            >
              <span className="font-semibold text-foreground">Compare AI Tools</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OtherAITools;
