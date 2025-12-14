import { Search, Filter, Star, TrendingUp, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      step: "01",
      title: "Search & Discover",
      description: "Browse 1000+ AI tools across 200+ categories with our intelligent search."
    },
    {
      icon: Filter,
      step: "02",
      title: "Filter & Compare",
      description: "Narrow options by pricing, features, ratings. Compare tools side-by-side."
    },
    {
      icon: Star,
      step: "03",
      title: "Read Reviews",
      description: "Access authentic reviews and learn from real user experiences."
    },
    {
      icon: TrendingUp,
      step: "04",
      title: "Stay Updated",
      description: "Get weekly updates on new tools and emerging AI technologies."
    }
  ];

  const benefits = [
    "Human-curated quality — every tool manually reviewed",
    "Transparent pricing — no hidden fees or affiliate bias",
    "200+ categories — from development to marketing",
    "Active community — real-world user perspectives"
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-medium text-primary mb-3">
            How It Works
          </span>
          <h2 className="section-title mb-4">
            Find Your Perfect AI Tool
          </h2>
          <p className="section-subtitle mx-auto">
            Our platform simplifies discovering and evaluating AI solutions for your needs
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group relative bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
            >
              {/* Step number */}
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground shadow-lg">
                {step.step}
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connection line (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-border" />
              )}
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="relative overflow-hidden bg-gradient-primary rounded-3xl p-8 md:p-12">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
          </div>
          
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl text-primary-foreground mb-4" style={{ fontFamily: 'Instrument Serif, serif' }}>
                Why Choose ToolsML?
              </h3>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Join thousands of professionals who trust us to discover the best AI tools for their workflows.
              </p>
            </div>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 text-primary-foreground">
                  <div className="mt-0.5 p-1 bg-primary-foreground/20 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-primary-foreground/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
