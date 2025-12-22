import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedSEO from '@/components/AdvancedSEO';

const Terms = () => {
  return (
    <div className="min-h-screen">
      <AdvancedSEO 
        title="Terms of Service - ToolsML | User Agreement"
        description="Read ToolsML's terms of service and user agreement. Understand your rights and responsibilities when using our AI tools directory."
        url="/terms"
        pageType="homepage"
      />
      <Header />
      
      <main className="pt-20">
        <section className="hero-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h1 className="hero-title">
              Terms of Service
            </h1>
            <p className="hero-subtitle">
              User agreement and terms of use
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
                  <h2 className="text-2xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
                  <p className="text-muted-foreground mb-6">
                    By accessing and using ToolsML, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and contributors of content.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Use License</h2>
                  <p className="text-muted-foreground mb-4">
                    Permission is granted to temporarily download one copy of ToolsML materials for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display</li>
                    <li>attempt to reverse engineer any software contained on the website</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">User Accounts</h2>
                  <p className="text-muted-foreground mb-6">
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Content Submission</h2>
                  <p className="text-muted-foreground mb-4">
                    Users may submit AI tools and related content. By submitting content, you grant ToolsML a worldwide, non-exclusive, royalty-free license to use, modify, and display such content. You represent and warrant that:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                    <li>You own or have the necessary rights to the content</li>
                    <li>The content does not infringe any third-party rights</li>
                    <li>The content is accurate and not misleading</li>
                    <li>The content complies with applicable laws and regulations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Prohibited Uses</h2>
                  <p className="text-muted-foreground mb-4">
                    You may not use our service:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Service Availability</h2>
                  <p className="text-muted-foreground mb-6">
                    ToolsML reserves the right to modify or discontinue the service at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimer</h2>
                  <p className="text-muted-foreground mb-6">
                    The information on this website is provided on an 'as is' basis. To the fullest extent permitted by law, ToolsML excludes all representations, warranties, conditions and terms whether express or implied by statute, common law or otherwise.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
                  <p className="text-muted-foreground mb-6">
                    In no event shall ToolsML or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use ToolsML materials.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law</h2>
                  <p className="text-muted-foreground mb-6">
                    These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
                  <p className="text-muted-foreground">
                    If you have any questions about these Terms of Service, please contact us at{' '}
                    <a href="mailto:legal@toolsml.com" className="text-primary hover:underline">
                      legal@toolsml.com
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

export default Terms;