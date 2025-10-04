import { Search, Filter, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Search & Discover",
      description: "Browse through our comprehensive collection of 1000+ AI tools across 200+ categories. Use our intelligent search to find exactly what you need, whether it's for content creation, automation, design, or development."
    },
    {
      icon: Filter,
      title: "Filter & Compare",
      description: "Narrow down your options using advanced filters including pricing models (free, freemium, paid), features, user ratings, and specific use cases. Compare multiple tools side-by-side to make informed decisions."
    },
    {
      icon: Star,
      title: "Read Reviews & Ratings",
      description: "Access authentic user reviews and detailed ratings for each tool. Learn from real experiences, understand the pros and cons, and discover how others are using these AI solutions in their workflows."
    },
    {
      icon: TrendingUp,
      title: "Stay Updated",
      description: "Get weekly updates on newly added AI tools, trending solutions, and emerging technologies. Our curated editorial team continuously evaluates and adds the latest innovations to keep you ahead of the curve."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How to Find Your Perfect AI Tool
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ToolsML simplifies the process of discovering and evaluating AI tools. Our platform is designed to help you make confident decisions about which AI solutions will work best for your specific needs and budget.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-card border border-border/50 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Why Choose ToolsML?</h3>
          <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Human-Curated Quality</h4>
              <p>Every AI tool in our directory is manually reviewed and evaluated by our expert team. We assess functionality, reliability, pricing transparency, and user experience to ensure only high-quality solutions make it to our platform.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Comprehensive Coverage</h4>
              <p>From generative AI and machine learning platforms to specialized automation tools, we cover the entire spectrum of AI solutions. Whether you're a developer, marketer, designer, or business owner, you'll find tools tailored to your profession.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Transparent Information</h4>
              <p>We provide clear, unbiased information about pricing, features, limitations, and use cases. No hidden fees, no affiliate bias—just honest assessments to help you make the right choice for your needs and budget.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Active Community</h4>
              <p>Join thousands of users who share their experiences, insights, and recommendations. Our community-driven approach ensures you get real-world perspectives on how these AI tools perform in actual production environments.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;