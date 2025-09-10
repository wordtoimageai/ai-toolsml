import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import ToolsGrid from "@/components/ToolsGrid";
import StatsSection from "@/components/StatsSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO />
      <Header />
      <Hero />
      <SearchSection />
      <ToolsGrid />
      <StatsSection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
