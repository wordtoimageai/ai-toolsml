import { Link } from "react-router-dom";
import { Shield, Users, TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TrustSignals = () => {
  const trustMetrics = [
    {
      icon: Users,
      value: "50K+",
      label: "Monthly Users",
      description: "Professionals trust our recommendations"
    },
    {
      icon: CheckCircle,
      value: "200+",
      label: "Curated Tools",
      description: "Hand-reviewed and regularly updated"
    },
    {
      icon: TrendingUp,
      value: "Weekly",
      label: "Updates",
      description: "Fresh tools and reviews every week"
    },
    {
      icon: Shield,
      value: "Human",
      label: "Verified",
      description: "Real testing by our editorial team"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="text-center hover:shadow-card transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-primary mb-2">
                    {metric.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {metric.description}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Methodology Section */}
        <div className="bg-muted/50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            How ToolsML Curates AI Tools
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
            Our editorial team manually tests every AI tool before adding it to our directory. 
            We evaluate functionality, pricing transparency, user experience, and real-world value 
            to ensure you get reliable recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow transition-all duration-300"
            >
              Our Methodology
            </Link>
            <Link
              to="/submit"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Submit a Tool
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;