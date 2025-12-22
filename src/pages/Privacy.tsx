import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedSEO from '@/components/AdvancedSEO';

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <AdvancedSEO 
        title="Privacy Policy - ToolsML | Data Protection & Security"
        description="Learn how ToolsML protects your privacy and handles your personal information. Transparent data practices and user rights."
        url="/privacy"
        pageType="homepage"
      />
      <Header />
      
      <main className="pt-20">
        <section className="hero-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="hero-title">
              Privacy Policy
            </h1>
            <p className="hero-subtitle">
              How we protect and handle your information
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="search-container prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-8">
                <strong>Last updated:</strong> March 2025
              </p>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
                  <p className="text-muted-foreground mb-4">
                    We collect information you provide directly to us, such as when you:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                    <li>Create an account or submit a tool</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Contact us for support</li>
                    <li>Use our search and filtering features</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                    <li>Provide and improve our services</li>
                    <li>Send you updates about new AI tools and features</li>
                    <li>Respond to your inquiries and provide support</li>
                    <li>Analyze usage patterns to enhance user experience</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Information Sharing</h2>
                  <p className="text-muted-foreground mb-6">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                    <li>With service providers who assist in operating our website</li>
                    <li>When required by law or to protect our rights</li>
                    <li>In connection with a business transfer or merger</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
                  <p className="text-muted-foreground mb-6">
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Cookies and Tracking</h2>
                  <p className="text-muted-foreground mb-6">
                    We use cookies and similar technologies to enhance your experience, analyze usage, and personalize content. You can control cookie settings through your browser preferences.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
                  <p className="text-muted-foreground mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                    <li>Access and update your personal information</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Request a copy of your data</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Children's Privacy</h2>
                  <p className="text-muted-foreground mb-6">
                    Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
                  <p className="text-muted-foreground mb-6">
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have any questions about this privacy policy, please contact us at{' '}
                    <a href="mailto:privacy@toolsml.com" className="text-primary hover:underline">
                      privacy@toolsml.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;