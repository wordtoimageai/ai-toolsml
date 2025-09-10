import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Target, Users, TrendingUp, Star, CheckCircle } from 'lucide-react';

const advertisingOptions = [
  {
    title: "Featured Tool Listing",
    price: "$299/month",
    description: "Get your AI tool featured prominently on our homepage and category pages",
    features: [
      "Homepage featured placement",
      "Category page priority",
      "Enhanced tool card design",
      "Analytics dashboard access",
      "Monthly performance report"
    ],
    popular: false
  },
  {
    title: "Sponsored Content",
    price: "$199/month",
    description: "Publish detailed articles and reviews about your AI tool",
    features: [
      "Guest blog post publication",
      "SEO-optimized content",
      "Social media promotion",
      "Newsletter inclusion",
      "Permanent backlink"
    ],
    popular: true
  },
  {
    title: "Banner Advertising",
    price: "$99/month",
    description: "Display targeted banner ads across our platform",
    features: [
      "Premium ad placements",
      "Mobile-responsive design",
      "Geographic targeting",
      "Click-through analytics",
      "A/B testing support"
    ],
    popular: false
  }
];

const stats = [
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    number: "50K+",
    label: "Monthly Active Users",
    description: "Decision-makers and AI enthusiasts"
  },
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    number: "85%",
    label: "Professional Audience",
    description: "Business owners and tech professionals"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    number: "40%",
    label: "Monthly Growth",
    description: "Rapidly expanding user base"
  },
  {
    icon: <Star className="w-8 h-8 text-primary" />,
    number: "4.9/5",
    label: "User Satisfaction",
    description: "Highly trusted platform"
  }
];

const Advertise = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Advertise with ToolsML - Reach AI Tool Users"
        description="Promote your AI tool to thousands of professionals and decision-makers. Multiple advertising options available."
        keywords="advertise AI tools, AI tool marketing, sponsored content, banner ads"
      />
      <Header />
      
      <main className="pt-20">
        <section className="hero-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">📢</div>
            <h1 className="hero-title">
              Advertise with ToolsML
            </h1>
            <p className="hero-subtitle">
              Reach thousands of professionals actively searching for AI solutions
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Advertise on ToolsML?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Connect with a highly engaged audience of AI tool users, developers, and business decision-makers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="tool-card text-center">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Advertising Options
              </h2>
              <p className="text-xl text-muted-foreground">
                Choose the perfect plan to showcase your AI tool
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advertisingOptions.map((option, index) => (
                <Card key={index} className={`relative ${option.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                  {option.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold text-foreground mb-2">
                      {option.title}
                    </CardTitle>
                    <div className="text-3xl font-black text-primary mb-2">
                      {option.price}
                    </div>
                    <p className="text-muted-foreground">
                      {option.description}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {option.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full ${option.popular ? 'btn-gradient' : ''}`}
                      variant={option.popular ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Solutions */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="search-container">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Need a Custom Solution?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We offer custom advertising packages tailored to your specific needs and budget. 
                From enterprise partnerships to exclusive sponsorships, we can create a solution that works for you.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 border border-border rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Enterprise Partnerships</h3>
                  <p className="text-sm text-muted-foreground">Long-term partnerships with enhanced visibility and co-marketing opportunities</p>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Event Sponsorships</h3>
                  <p className="text-sm text-muted-foreground">Sponsor our webinars, tutorials, and community events</p>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Newsletter Placement</h3>
                  <p className="text-sm text-muted-foreground">Featured placement in our weekly newsletter to engaged subscribers</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button asChild className="btn-gradient">
                  <Link to="/contact">
                    Contact Our Team
                  </Link>
                </Button>
                <Button variant="outline">
                  Download Media Kit
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="search-container">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How do I get started with advertising?
                </h3>
                <p className="text-muted-foreground">
                  Simply choose your preferred advertising package and contact our team. We'll guide you through the setup process and help optimize your campaign for maximum impact.
                </p>
              </div>

              <div className="search-container">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  What kind of analytics do you provide?
                </h3>
                <p className="text-muted-foreground">
                  We provide detailed analytics including impressions, clicks, conversions, and audience demographics. Monthly reports are included with all advertising packages.
                </p>
              </div>

              <div className="search-container">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Can I target specific audiences?
                </h3>
                <p className="text-muted-foreground">
                  Yes! We offer targeting options based on categories, user behavior, geographic location, and more to ensure your ads reach the most relevant audience.
                </p>
              </div>

              <div className="search-container">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Is there a minimum commitment period?
                </h3>
                <p className="text-muted-foreground">
                  Our standard packages have a minimum 3-month commitment, but we offer flexible terms for enterprise clients. Contact us to discuss your specific needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Advertise;