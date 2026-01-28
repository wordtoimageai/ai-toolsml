import { Search, Sparkles, ArrowRight, Star, TrendingUp, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(0);

  const suggestedSearches = [
    "AI writer", "background remover", "video editor", "code assistant", "chatbot", "image generator"
  ];

  const featuredCategories = [
    { name: "Writing", icon: "✍️", count: "200+" },
    { name: "Design", icon: "🎨", count: "150+" },
    { name: "Coding", icon: "💻", count: "180+" },
    { name: "Video", icon: "🎬", count: "120+" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % featuredCategories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="hero-gradient min-h-[90vh] flex items-center justify-center pt-20 pb-16 relative">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-[15%] w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-1/2 right-[25%] w-40 h-40 bg-primary-foreground/3 rounded-full blur-2xl animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/10 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">Discover 1000+ AI Tools</span>
            <span className="text-primary-foreground/60">•</span>
            <span className="text-sm text-primary-foreground/80">Updated Weekly</span>
          </div>

          {/* Main Title - LCP Element with priority rendering */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h1 className="hero-title max-w-4xl mx-auto" data-lcp="true">
              Find the Perfect AI Tool
              <br />
              <span className="italic">for Every Task</span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <p className="hero-subtitle max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Human-curated directory with detailed pricing, features, and real-world use cases. 
            Trusted by 50,000+ professionals to find their ideal AI solutions.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-0 bg-primary-foreground/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-primary-foreground rounded-2xl p-1.5 shadow-2xl">
                <div className="flex items-center">
                  <Search className="absolute left-5 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search AI tools by name, category, or use case..."
                    className="w-full py-4 pl-14 pr-36 bg-transparent rounded-xl text-foreground placeholder:text-muted-foreground text-lg outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Search
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
            
            {/* Suggested Searches */}
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              <span className="text-primary-foreground/60 text-sm">Popular:</span>
              {suggestedSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(search);
                    navigate(`/?search=${encodeURIComponent(search)}`);
                  }}
                  className="text-primary-foreground/80 hover:text-primary-foreground text-sm px-3 py-1 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-200"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 pt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 text-primary-foreground/90">
              <div className="p-2 bg-primary-foreground/10 rounded-lg">
                <Star className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-semibold">4.8/5</div>
                <div className="text-sm text-primary-foreground/60">Avg Rating</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/90">
              <div className="p-2 bg-primary-foreground/10 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-semibold">200+</div>
                <div className="text-sm text-primary-foreground/60">Categories</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/90">
              <div className="p-2 bg-primary-foreground/10 rounded-lg">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-semibold">50K+</div>
                <div className="text-sm text-primary-foreground/60">Monthly Users</div>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {featuredCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
                  index === activeCategory
                    ? 'bg-primary-foreground text-foreground shadow-lg scale-105'
                    : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'
                }`}
              >
                <span>{category.icon}</span>
                <span className="font-medium">{category.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  index === activeCategory ? 'bg-primary/10 text-primary' : 'bg-primary-foreground/20'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
