import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedSEO from '@/components/AdvancedSEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen">
      <AdvancedSEO 
        title="About ToolsML - Your Trusted AI Tools Directory"
        description="Learn about ToolsML's mission to help professionals discover and compare the best AI tools available. Join 50K+ users finding perfect AI solutions."
        url={window.location.href}
        pageType="homepage"
      />
      <Header />
      
      <main className="pt-20">
        <section className="hero-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">🤖</div>
            <h1 className="hero-title">
              About ToolsML
            </h1>
            <p className="hero-subtitle">
              Your trusted guide to the world of AI tools
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="search-container mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  At ToolsML, we believe AI should be accessible to everyone. Our mission is to help 
                  professionals, creators, and businesses discover the perfect AI tools for their needs. 
                  We curate, review, and compare the best AI-powered solutions across every industry.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="search-container">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Why We Started</h3>
                  <p className="text-muted-foreground">
                    The AI landscape changes rapidly. We created ToolsML to cut through the noise 
                    and help you find tools that actually solve real problems.
                  </p>
                </div>

                <div className="search-container">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">What We Do</h3>
                  <p className="text-muted-foreground">
                    We thoroughly test and review AI tools, providing honest insights about 
                    features, pricing, and real-world performance.
                  </p>
                </div>

                <div className="search-container">
                  <div className="text-4xl mb-4">🌟</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Our Values</h3>
                  <p className="text-muted-foreground">
                    Transparency, accuracy, and user-first approach guide everything we do. 
                    No sponsored rankings, just honest recommendations.
                  </p>
                </div>

                <div className="search-container">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To become the most trusted resource for AI tool discovery, helping millions 
                    harness the power of artificial intelligence.
                  </p>
                </div>
              </div>

              <div className="search-container text-center">
                <h2 className="text-3xl font-bold text-foreground mb-6">Join Our Community</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Have an AI tool to share? Found an amazing solution? We'd love to hear from you!
                </p>
                <div className="flex gap-4 justify-center">
                  <Button asChild className="btn-gradient">
                    <Link to="/submit">
                      Submit a Tool
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/">
                      Browse Tools
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-12">By the Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="stat-number">1000+</div>
                <div className="stat-label">Tools Reviewed</div>
              </div>
              <div>
                <div className="stat-number">50K+</div>
                <div className="stat-label">Monthly Users</div>
              </div>
              <div>
                <div className="stat-number">25+</div>
                <div className="stat-label">Categories</div>
              </div>
              <div>
                <div className="stat-number">99%</div>
                <div className="stat-label">User Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;