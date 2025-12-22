import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedSEO from '@/components/AdvancedSEO';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, Key, Book, Zap } from 'lucide-react';

const ApiDocs = () => {
  return (
    <div className="min-h-screen">
      <AdvancedSEO 
        title="API Documentation - ToolsML | Developer Integration"
        description="Integrate ToolsML data into your applications with our comprehensive API documentation. Access 1000+ AI tools programmatically."
        keywords="ToolsML API, AI tools API, developer documentation, API integration"
        url="/api-docs"
        pageType="homepage"
      />
      <Header />
      
      <main className="pt-20">
        <section className="hero-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">🔧</div>
            <h1 className="hero-title">
              API Documentation
            </h1>
            <p className="hero-subtitle">
              Integrate ToolsML data into your applications
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="search-container sticky top-24">
                  <h3 className="font-semibold text-foreground mb-4">API Reference</h3>
                  <nav className="space-y-2">
                    <a href="#getting-started" className="block text-sm text-muted-foreground hover:text-primary">Getting Started</a>
                    <a href="#authentication" className="block text-sm text-muted-foreground hover:text-primary">Authentication</a>
                    <a href="#endpoints" className="block text-sm text-muted-foreground hover:text-primary">Endpoints</a>
                    <a href="#rate-limits" className="block text-sm text-muted-foreground hover:text-primary">Rate Limits</a>
                    <a href="#examples" className="block text-sm text-muted-foreground hover:text-primary">Examples</a>
                    <a href="#sdks" className="block text-sm text-muted-foreground hover:text-primary">SDKs</a>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-12">
                {/* Getting Started */}
                <div id="getting-started" className="search-container">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Getting Started</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    The ToolsML API provides programmatic access to our comprehensive database of AI tools. 
                    Get detailed information about tools, categories, ratings, and more.
                  </p>

                  <div className="bg-muted rounded-lg p-4 mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Base URL:</p>
                    <code className="text-sm bg-background px-2 py-1 rounded">https://api.toolsml.com/v1</code>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary">1000+</div>
                      <div className="text-sm text-muted-foreground">AI Tools</div>
                    </div>
                    <div className="border border-border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary">25+</div>
                      <div className="text-sm text-muted-foreground">Categories</div>
                    </div>
                    <div className="border border-border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary">99.9%</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                </div>

                {/* Authentication */}
                <div id="authentication" className="search-container">
                  <div className="flex items-center gap-3 mb-6">
                    <Key className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Authentication</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    All API requests require authentication using an API key. Include your API key in the request header.
                  </p>

                  <div className="bg-gray-900 rounded-lg p-4 mb-6">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.toolsml.com/v1/tools`}
                    </pre>
                  </div>

                  <div className="flex gap-4">
                    <Button className="btn-gradient">
                      Get API Key
                    </Button>
                    <Button variant="outline">
                      View Pricing
                    </Button>
                  </div>
                </div>

                {/* Endpoints */}
                <div id="endpoints" className="search-container">
                  <div className="flex items-center gap-3 mb-6">
                    <Code className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">API Endpoints</h2>
                  </div>

                  <div className="space-y-6">
                    {/* GET Tools */}
                    <div className="border border-border rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">GET</Badge>
                        <code className="text-sm">/tools</code>
                      </div>
                      <p className="text-muted-foreground mb-4">Retrieve a list of AI tools with optional filtering and pagination.</p>
                      
                      <h4 className="font-semibold text-foreground mb-2">Query Parameters:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                        <li><code>category</code> - Filter by category (writing, design, coding, etc.)</li>
                        <li><code>search</code> - Search tools by name or description</li>
                        <li><code>limit</code> - Number of results per page (default: 50, max: 100)</li>
                        <li><code>offset</code> - Pagination offset</li>
                      </ul>

                      <div className="bg-gray-900 rounded-lg p-4">
                        <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "tools": [
    {
      "id": "chatgpt",
      "title": "ChatGPT",
      "description": "Advanced conversational AI...",
      "category": "writing",
      "pricing": "Freemium",
      "rating": 4.8,
      "website": "https://chat.openai.com"
    }
  ],
  "total": 1000,
  "page": 1,
  "pages": 20
}`}
                        </pre>
                      </div>
                    </div>

                    {/* GET Tool by ID */}
                    <div className="border border-border rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">GET</Badge>
                        <code className="text-sm">/tools/:id</code>
                      </div>
                      <p className="text-muted-foreground mb-4">Get detailed information about a specific AI tool.</p>
                      
                      <div className="bg-gray-900 rounded-lg p-4">
                        <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "id": "chatgpt",
  "title": "ChatGPT",
  "description": "Advanced conversational AI...",
  "longDescription": "ChatGPT is a powerful...",
  "category": "writing",
  "pricing": "Freemium",
  "rating": 4.8,
  "features": ["Text generation", "Code assistance"],
  "pros": ["Versatile", "User-friendly"],
  "cons": ["Can be inaccurate"],
  "website": "https://chat.openai.com"
}`}
                        </pre>
                      </div>
                    </div>

                    {/* GET Categories */}
                    <div className="border border-border rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">GET</Badge>
                        <code className="text-sm">/categories</code>
                      </div>
                      <p className="text-muted-foreground mb-4">Get all available tool categories.</p>
                      
                      <div className="bg-gray-900 rounded-lg p-4">
                        <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "categories": [
    {
      "id": "writing",
      "name": "Writing & Content",
      "description": "AI tools for content creation",
      "count": 150
    }
  ]
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rate Limits */}
                <div id="rate-limits" className="search-container">
                  <div className="flex items-center gap-3 mb-6">
                    <Book className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Rate Limits</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Free Tier</h4>
                      <div className="text-2xl font-bold text-primary mb-1">1,000</div>
                      <div className="text-sm text-muted-foreground">requests/month</div>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Pro Tier</h4>
                      <div className="text-2xl font-bold text-primary mb-1">50,000</div>
                      <div className="text-sm text-muted-foreground">requests/month</div>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Enterprise</h4>
                      <div className="text-2xl font-bold text-primary mb-1">Custom</div>
                      <div className="text-sm text-muted-foreground">contact us</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground">
                    Rate limits are applied per API key. Exceeding the limit returns a 429 status code.
                    All tiers include rate limiting headers in responses.
                  </p>
                </div>

                {/* Examples */}
                <div id="examples" className="search-container">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Code Examples</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">JavaScript/Node.js</h3>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <pre className="text-green-400 text-sm overflow-x-auto">
{`const response = await fetch('https://api.toolsml.com/v1/tools', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data.tools);`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Python</h3>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <pre className="text-green-400 text-sm overflow-x-auto">
{`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.toolsml.com/v1/tools', headers=headers)
tools = response.json()['tools']`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SDKs */}
                <div id="sdks" className="search-container">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Official SDKs</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-border rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">JavaScript SDK</h3>
                      <p className="text-muted-foreground mb-4">Official JavaScript/TypeScript SDK for web and Node.js applications.</p>
                      <Button variant="outline" className="w-full">
                        View on npm
                      </Button>
                    </div>
                    
                    <div className="border border-border rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Python SDK</h3>
                      <p className="text-muted-foreground mb-4">Official Python SDK with full API coverage and type hints.</p>
                      <Button variant="outline" className="w-full">
                        View on PyPI
                      </Button>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Need help getting started?</h3>
                    <div className="flex gap-4 justify-center">
                      <Button className="btn-gradient">
                        Get API Key
                      </Button>
                      <Button variant="outline">
                        Contact Support
                      </Button>
                    </div>
                  </div>
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

export default ApiDocs;