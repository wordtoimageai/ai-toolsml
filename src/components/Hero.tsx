import { Search, Star, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const suggestedSearches = [
    "AI writer", "background remover", "video editor", "code assistant", "chatbot", "image generator"
  ];

  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in space-y-8">
          <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Discover the Best AI Tools for 2025 — Fast & Free
          </h1>
          <p className="hero-subtitle text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Human-curated directory of 1000+ AI tools with detailed pricing comparisons, feature breakdowns, and real-world use cases. Find the perfect AI solution for content creation, automation, design, development, and more.
          </p>
          
          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">Curated Weekly</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">Actionable Filters</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">200+ Categories</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Try: AI writer, background remover, video editor..."
                  className="w-full py-4 pl-14 pr-6 bg-white rounded-full text-lg border-2 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </form>
            
            {/* Suggested Searches */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-white/80 text-sm">Popular:</span>
              {suggestedSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(search);
                    navigate(`/?search=${encodeURIComponent(search)}`);
                  }}
                  className="text-white/90 hover:text-white text-sm underline underline-offset-2 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;