import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedSEO from '@/components/AdvancedSEO';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen">
      <AdvancedSEO 
        title="About ToolsML - AI Tool Discovery Platform"
        description="Learn about ToolsML, the leading platform for discovering and comparing AI tools. Our mission is to help you find the perfect AI solutions for your needs with curated, weekly-updated listings."
        url="/about"
        pageType="homepage"
      />
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'About ToolsML' }]} />
        </div>
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
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  ToolsML is an independent, human-curated directory of artificial intelligence
                  tools, launched in 2024 to help professionals, creators, developers, and small
                  businesses cut through the noise of a market that adds dozens of new AI products
                  every week. We believe AI should be accessible, well-documented, and easy to
                  compare — without sponsored rankings, paid placement, or marketing fluff
                  disguised as reviews. Every tool in our directory is evaluated by a real person,
                  not an automated scraper, and our listings are refreshed weekly so pricing,
                  features, and screenshots stay accurate.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Today ToolsML tracks more than 1,000 AI tools across writing, design, video,
                  coding, marketing, productivity, audio, research, and more. We publish detailed
                  comparisons, pricing breakdowns, and use-case guides so you can decide in
                  minutes — not weeks — which tool actually fits your workflow.
                </p>
              </div>

              <div className="search-container mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">How We Curate Tools</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Our editorial process is intentionally hands-on. Every submission — whether
                  from a vendor, a community member, or our own research — is reviewed against
                  four criteria before it ever appears on the site:
                </p>
                <ul className="text-muted-foreground text-lg leading-relaxed list-disc pl-6 space-y-2">
                  <li><strong>Real product, real users.</strong> The tool must be live, working, and have actual customers — no vaporware or pre-launch landing pages.</li>
                  <li><strong>Clear AI value.</strong> The product must use machine learning or generative AI in a meaningful way, not just as a marketing label.</li>
                  <li><strong>Transparent pricing.</strong> We require a published pricing page (free, freemium, or paid) so visitors aren't surprised at checkout.</li>
                  <li><strong>Hands-on verification.</strong> An editor signs up, tests the core workflow, and writes the summary, pros, and cons in their own words.</li>
                </ul>
              </div>

              <div className="search-container mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">Independent and Reader-Funded</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  ToolsML is not owned by any AI vendor and does not accept payment for higher
                  rankings, "featured" badges, or favorable reviews. Some links are affiliate
                  links, which means we may earn a small commission if you sign up for a paid plan
                  after clicking through — this never affects which tools we list, where they
                  rank, or what we write about them. Vendors can submit their tool for free and
                  request corrections at any time, but editorial decisions stay with our team.
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
                  Built an AI tool you'd like listed? Spotted a pricing change or a tool that's
                  no longer maintained? We rely on readers and makers to keep ToolsML accurate.
                  Submit a tool, send corrections, or just say hello — we read every message.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button asChild className="btn-gradient">
                    <Link to="/submit">Submit a Tool</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/">Browse Tools</Link>
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