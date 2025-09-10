import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import ToolsGrid from "@/components/ToolsGrid";
import StatsSection from "@/components/StatsSection";
import Newsletter from "@/components/Newsletter";
import RecentlyViewed from "@/components/RecentlyViewed";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import useAnalytics from "@/hooks/useAnalytics";

const Index = () => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView('home');
  }, [trackPageView]);

  return (
    <div className="min-h-screen">
      <SEO />
      <Header />
      <Hero />
      <SearchSection />
      <RecentlyViewed />
      <ToolsGrid />
      <StatsSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
