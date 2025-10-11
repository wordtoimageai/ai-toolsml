import { useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
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
import HowItWorks from "@/components/HowItWorks";
import AIToolCategories from "@/components/AIToolCategories";
import WhyChooseUs from "@/components/WhyChooseUs";
import AITrends from "@/components/AITrends";
import FAQ, { generateFAQSchema } from "@/components/FAQ";
import { tools } from "@/data/tools";
import { homepageFAQs } from "@/data/homepage-faq";

const Index = () => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView('home');
  }, [trackPageView]);

  // Structured data for featured tools
  const featuredToolsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Featured AI Tools",
    "description": "Top-rated AI tools curated by ToolsML editorial team",
    "numberOfItems": 8,
    "itemListElement": tools.slice(0, 8).map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": tool.title,
        "description": tool.description,
        "url": `https://ai-toolsml.lovable.app/tool/${tool.id}`,
        "applicationCategory": "AI Tool",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": tool.pricing === 'Free' ? "0" : null,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tool.rating,
          "reviewCount": tool.reviewCount,
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    }))
  };

  return (
    <>
      <AdvancedSEO 
        title="ToolsML - Discover Best AI Tools 2025 | 1000+ Curated Solutions"
        description="Find perfect AI tools from 1000+ options across 200+ categories. Compare features, pricing, and reviews. Updated weekly with latest AI innovations."
        pageType="homepage"
        url="https://ai-toolsml.lovable.app"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema(homepageFAQs))}
        </script>
      </Helmet>
      <OrganizationSchema />
      <SitemapGenerator />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <WhyChooseUs />
        <CategoriesGrid />
        <AIToolCategories />
        <AITrends />
        <RecentlyViewed />
        <FeaturedTools />
        <RecentlyAdded />
        <FAQ 
          items={homepageFAQs}
          title="Frequently Asked Questions"
          description="Everything you need to know about finding and using AI tools on ToolsML"
        />
        <TrustSignals />
        <StatsSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Index;
