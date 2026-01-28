import { useEffect } from "react";
import { usePrivacyAnalytics } from "@/hooks/usePrivacyAnalytics";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoriesGrid from "@/components/CategoriesGrid";
import RecentlyViewed from "@/components/RecentlyViewed";
import FeaturedTools from "@/components/FeaturedTools";
import RecentlyAdded from "@/components/RecentlyAdded";
import TrustSignals from "@/components/TrustSignals";
import StatsSection from "@/components/StatsSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import AdvancedSEO from "@/components/AdvancedSEO";
import SitemapGenerator from "@/components/SitemapGenerator";
import OrganizationSchema from "@/components/OrganizationSchema";
import ItemListSchema from "@/components/ItemListSchema";
import AdvancedMetaTags from "@/components/AdvancedMetaTags";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import { CategoryLinks, PopularTags, QuickNavigation, ToolsByCategoryPreview, AllToolsLinksSection } from "@/components/InternalLinks";
import HowItWorks from "@/components/HowItWorks";
import AIToolCategories from "@/components/AIToolCategories";
import PopularTools from "@/components/PopularTools";
import WhyChooseUs from "@/components/WhyChooseUs";
import AITrends from "@/components/AITrends";
import FAQ, { generateFAQSchema } from "@/components/FAQ";
import { tools } from "@/data/tools";
import { homepageFAQs } from "@/data/homepage-faq";

const Index = () => {
  const { trackPageView } = usePrivacyAnalytics();

  useEffect(() => {
    trackPageView('home');
  }, [trackPageView]);

  // Get top rated tools for ItemList schema
  const topRatedTools = [...tools].sort((a, b) => b.rating - a.rating).slice(0, 10);
  const featuredTools = tools.slice(0, 8);

  // Generate popular tags for internal linking
  const allTags = tools.flatMap(tool => tool.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const popularTags = Object.entries(tagCounts).map(([name, count]) => ({ name, count }));

  return (
    <>
      <AdvancedSEO 
        title="ToolsML - Discover Best AI Tools 2025 | 1000+ Curated Solutions"
        description="Find perfect AI tools from 1000+ options across 200+ categories. Compare features, pricing, and reviews. Updated weekly with latest AI innovations."
        pageType="homepage"
        url="/"
      />
      <AdvancedMetaTags
        title="ToolsML - Discover Best AI Tools 2025 | 1000+ Curated Solutions"
        description="Find perfect AI tools from 1000+ options across 200+ categories. Compare features, pricing, and reviews. Updated weekly with latest AI innovations."
        url="/"
        type="website"
        tags={['AI tools', 'artificial intelligence', 'machine learning', 'productivity']}
      />
      <PerformanceOptimizer
        dnsPrefetch={[
          '//toolsml.com'
        ]}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema(homepageFAQs))}
        </script>
      </Helmet>
      <OrganizationSchema />
      <ItemListSchema 
        items={featuredTools}
        listName="Featured AI Tools 2025"
        listDescription="Top-rated AI tools curated by ToolsML editorial team"
        maxItems={8}
      />
      <ItemListSchema 
        items={topRatedTools}
        listName="Highest Rated AI Tools"
        listDescription="Best AI tools based on user ratings and reviews"
        maxItems={10}
      />
      <SitemapGenerator />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <WhyChooseUs />
        <CategoriesGrid />
        <AIToolCategories />
        <PopularTools />
        <AITrends />
        <RecentlyViewed />
        <FeaturedTools />
        <RecentlyAdded />
        <FAQ 
          items={homepageFAQs}
          title="Frequently Asked Questions"
          description="Everything you need to know about finding and using AI tools on ToolsML"
        />
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ToolsByCategoryPreview className="mb-12" />
            <CategoryLinks className="mb-12" />
            <PopularTags tags={popularTags} />
          </div>
        </section>
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuickNavigation />
          </div>
        </section>
        {/* Comprehensive Internal Links Section - All Tools, Categories, Tags */}
        <section className="py-12 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Complete AI Tools Directory
            </h2>
            <AllToolsLinksSection />
          </div>
        </section>
        <TrustSignals />
        <StatsSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Index;
