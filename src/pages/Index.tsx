import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoriesGrid from "@/components/CategoriesGrid";
import FeaturedTools from "@/components/FeaturedTools";
import RecentlyAdded from "@/components/RecentlyAdded";
import TrustSignals from "@/components/TrustSignals";
import StatsSection from "@/components/StatsSection";
import Newsletter from "@/components/Newsletter";
import RecentlyViewed from "@/components/RecentlyViewed";
import Footer from "@/components/Footer";
import { AdvancedSEO } from "@/components/AdvancedSEO";
import { SitemapGenerator } from "@/components/SitemapGenerator";
import useAnalytics from "@/hooks/useAnalytics";
import { tools } from "@/data/tools";

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
    <div className="min-h-screen">
      <AdvancedSEO 
        pageType="homepage"
        title="ToolsML — Discover & Compare the Best AI Tools (Curated Weekly)"
        description="Find and compare the best AI tools for writing, design, video, code, and more. Human-curated, updated weekly with features, pricing, and real use-cases."
        url="/"
        image="/og-image.jpg"
      />
      <SitemapGenerator />
      <Header />
      <Hero />
      <CategoriesGrid />
      <RecentlyViewed />
      <FeaturedTools />
      <RecentlyAdded />
      <TrustSignals />
      <StatsSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
