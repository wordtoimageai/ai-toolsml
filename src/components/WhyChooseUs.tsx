import { CheckCircle, Shield, Zap, Users, TrendingUp, Award } from "lucide-react";

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Human-Curated Quality",
      description: "Every AI tool is personally tested and reviewed by our expert team. We don't just list tools—we evaluate them for real-world performance, reliability, and value. Our rigorous vetting process ensures you only see tools worth your time and investment."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Always Up-to-Date",
      description: "The AI landscape evolves rapidly. We update our directory weekly with the latest tools, pricing changes, and feature updates. Never miss out on breakthrough AI innovations or important changes to your favorite tools. Stay ahead of the curve with fresh discoveries every week."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Unbiased Comparisons",
      description: "No sponsored rankings or hidden agendas. Our tool comparisons are based on objective criteria: features, pricing, user reviews, and real performance metrics. We help you make informed decisions by presenting honest, data-driven insights from actual users and industry experts."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Smart Recommendations",
      description: "Our intelligent recommendation engine analyzes your needs, budget, and use case to suggest the perfect AI tools. Whether you're a startup founder, content creator, developer, or enterprise team, we match you with tools that actually solve your specific challenges."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Comprehensive Details",
      description: "Go beyond basic listings with in-depth reviews covering pricing tiers, feature breakdowns, integration capabilities, learning curves, and customer support quality. We provide the complete picture so you can evaluate tools confidently before committing."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Community-Driven Insights",
      description: "Benefit from thousands of real user reviews and ratings. Our community shares honest experiences, use cases, and tips to help you understand how tools perform in real-world scenarios across different industries and team sizes."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose ToolsML for Your AI Tool Discovery?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're not just another directory. ToolsML is your trusted partner in navigating the complex world of AI tools. 
            Here's what makes us different and why thousands of professionals, creators, and teams rely on us every day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-foreground font-medium">
              Trusted by 100,000+ users worldwide to find the perfect AI tools
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
