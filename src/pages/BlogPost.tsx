import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const blogPosts = {
  'future-ai-tools-2025': {
    id: 1,
    title: "The Future of AI Tools in 2025: What to Expect",
    excerpt: "Explore the emerging trends and breakthrough AI technologies that will shape how we work in 2025.",
    content: `
      <p>The artificial intelligence landscape is evolving at an unprecedented pace, and 2025 promises to be a pivotal year for AI tools. From sophisticated language models to revolutionary design assistants, we're witnessing a transformation that will fundamentally change how we approach work, creativity, and problem-solving.</p>

      <h2>Key Trends Shaping AI Tools in 2025</h2>

      <h3>1. Multimodal AI Integration</h3>
      <p>The future belongs to AI tools that can seamlessly process and generate multiple types of content - text, images, audio, and video. Tools like GPT-4 Vision and Midjourney are just the beginning. We're moving toward unified platforms that understand context across all media types.</p>

      <h3>2. Specialized Industry Solutions</h3>
      <p>Generic AI tools are giving way to highly specialized solutions tailored for specific industries. Legal AI for contract analysis, medical AI for diagnostic assistance, and architectural AI for design optimization are becoming more sophisticated and reliable.</p>

      <h3>3. Real-Time Collaboration</h3>
      <p>AI is becoming a collaborative partner rather than just a tool. Real-time AI assistance in collaborative environments like Figma, Notion, and Google Workspace is enhancing team productivity and creativity.</p>

      <h2>What This Means for Professionals</h2>

      <p>The democratization of AI tools means that small businesses and individual professionals now have access to capabilities that were once exclusive to large corporations. The key is choosing the right tools for your specific needs and learning to integrate them effectively into your workflow.</p>

      <h2>Preparing for the AI Future</h2>

      <p>To stay competitive in 2025, professionals should focus on:</p>
      <ul>
        <li>Understanding AI capabilities and limitations</li>
        <li>Developing prompt engineering skills</li>
        <li>Staying updated with the latest tool developments</li>
        <li>Experimenting with different AI workflows</li>
      </ul>
    `,
    author: "Sarah Chen",
    date: "March 12, 2025",
    readTime: "5 min read",
    category: "Trends",
    image: "🚀",
    tags: ["AI Trends", "Future Tech", "Productivity"]
  },
  'choose-ai-writing-tool': {
    id: 2,
    title: "How to Choose the Right AI Writing Tool for Your Business",
    excerpt: "A comprehensive guide to evaluating AI writing tools based on your specific needs and budget.",
    content: `
      <p>With dozens of AI writing tools available, choosing the right one for your business can be overwhelming. This comprehensive guide will help you navigate the options and make an informed decision based on your specific needs, budget, and use cases.</p>

      <h2>Understanding Your Writing Needs</h2>

      <p>Before diving into specific tools, it's crucial to understand what type of content you need to create:</p>

      <h3>Content Types to Consider:</h3>
      <ul>
        <li><strong>Blog posts and articles:</strong> Long-form, SEO-optimized content</li>
        <li><strong>Marketing copy:</strong> Ads, emails, social media posts</li>
        <li><strong>Technical documentation:</strong> User guides, API docs, tutorials</li>
        <li><strong>Creative writing:</strong> Stories, scripts, creative campaigns</li>
      </ul>

      <h2>Key Evaluation Criteria</h2>

      <h3>1. Content Quality and Accuracy</h3>
      <p>The most important factor is the quality of generated content. Look for tools that produce coherent, well-structured, and factually accurate text. Test tools with your specific use cases before committing.</p>

      <h3>2. Customization and Brand Voice</h3>
      <p>Your chosen tool should allow you to maintain your brand's unique voice and tone. Look for features like:</p>
      <ul>
        <li>Custom tone settings</li>
        <li>Brand voice training</li>
        <li>Style guide integration</li>
        <li>Template customization</li>
      </ul>

      <h3>3. Integration Capabilities</h3>
      <p>Consider how well the tool integrates with your existing workflow:</p>
      <ul>
        <li>CMS integration (WordPress, Webflow, etc.)</li>
        <li>Marketing platforms (HubSpot, Mailchimp)</li>
        <li>Design tools (Canva, Figma)</li>
        <li>Project management tools (Asana, Notion)</li>
      </ul>

      <h2>Top AI Writing Tools Compared</h2>

      <h3>For Businesses: Jasper AI</h3>
      <p>Best for: Marketing teams and agencies
      Strengths: Brand voice training, team collaboration, extensive templates
      Pricing: Starting at $39/month</p>

      <h3>For Content Creators: ChatGPT Plus</h3>
      <p>Best for: Individual creators and small businesses
      Strengths: Versatility, cost-effectiveness, regular updates
      Pricing: $20/month</p>

      <h3>For SEO: Surfer AI</h3>
      <p>Best for: Content marketers focused on SEO
      Strengths: SEO optimization, content scoring, SERP analysis
      Pricing: Starting at $99/month</p>

      <h2>Making Your Decision</h2>

      <p>The best AI writing tool for your business depends on your specific needs, budget, and team size. Start with free trials to test functionality, then gradually scale up based on results and ROI.</p>
    `,
    author: "Mike Johnson",
    date: "March 10, 2025",
    readTime: "8 min read",
    category: "Guide",
    image: "✍️",
    tags: ["AI Writing", "Business Tools", "Guide"]
  },
  'ai-design-tools-2025': {
    id: 3,
    title: "Top 10 AI Design Tools That Will Transform Your Creative Workflow",
    excerpt: "Discover the most innovative AI design tools that are revolutionizing the creative industry.",
    content: `
      <p>The creative industry is experiencing a renaissance powered by artificial intelligence. From generating stunning visuals to automating repetitive design tasks, AI tools are empowering designers to push creative boundaries like never before.</p>

      <h2>The AI Design Revolution</h2>

      <p>AI design tools aren't replacing human creativity—they're amplifying it. These tools handle the technical heavy lifting, allowing designers to focus on conceptual thinking, strategy, and refinement.</p>

      <h2>Top 10 AI Design Tools for 2025</h2>

      <h3>1. Midjourney - AI Image Generation</h3>
      <p><strong>Best for:</strong> Concept art, illustrations, creative exploration
      <strong>Strengths:</strong> Exceptional artistic quality, style variety
      <strong>Use cases:</strong> Marketing visuals, concept development, artistic inspiration</p>

      <h3>2. Canva Magic Studio - All-in-One Design</h3>
      <p><strong>Best for:</strong> Non-designers, social media content
      <strong>Strengths:</strong> User-friendly interface, template variety
      <strong>Use cases:</strong> Social media posts, presentations, marketing materials</p>

      <h3>3. Adobe Firefly - Creative Suite Integration</h3>
      <p><strong>Best for:</strong> Professional designers using Adobe products
      <strong>Strengths:</strong> Seamless Creative Cloud integration
      <strong>Use cases:</strong> Photo editing, graphic design, digital art</p>

      <h3>4. Figma AI - UI/UX Design</h3>
      <p><strong>Best for:</strong> Interface designers, product teams
      <strong>Strengths:</strong> Real-time collaboration, design systems
      <strong>Use cases:</strong> Website design, app interfaces, prototyping</p>

      <h3>5. RunwayML - Video Creation</h3>
      <p><strong>Best for:</strong> Video creators, motion designers
      <strong>Strengths:</strong> Advanced video AI, easy-to-use interface
      <strong>Use cases:</strong> Video editing, motion graphics, visual effects</p>

      <h2>Choosing the Right Tool for Your Needs</h2>

      <h3>For Beginners: Canva Magic Studio</h3>
      <p>Perfect for those new to design with intuitive templates and AI assistance.</p>

      <h3>For Professionals: Adobe Firefly</h3>
      <p>Ideal for experienced designers who need powerful tools integrated with professional workflows.</p>

      <h3>For Creative Exploration: Midjourney</h3>
      <p>Best for pushing creative boundaries and generating unique artistic concepts.</p>

      <h2>The Future of AI in Design</h2>

      <p>As AI design tools continue to evolve, we can expect even more sophisticated capabilities, better integration with existing workflows, and new possibilities for creative expression. The key is to embrace these tools as creative partners rather than replacements for human ingenuity.</p>
    `,
    author: "Lisa Wang",
    date: "March 8, 2025",
    readTime: "6 min read",
    category: "Tools",
    image: "🎨",
    tags: ["AI Design", "Creative Tools", "Productivity"]
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();

  if (!slug || !blogPosts[slug as keyof typeof blogPosts]) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const post = blogPosts[slug as keyof typeof blogPosts];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Blog post link copied to clipboard!",
      });
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": new Date(post.date).toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "ToolsML"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        type="article"
        jsonLd={jsonLd}
      />
      <Header />
      
      <main className="pt-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Navigation */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className="ml-auto gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
            
            <div className="text-6xl mb-6">{post.image}</div>
            <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
            <div className="text-sm text-muted-foreground mt-4">{post.date}</div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-li:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground">Tags:</span>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </article>

        {/* Related Posts CTA */}
        <section className="bg-muted/30 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              More AI Tools Insights
            </h2>
            <p className="text-muted-foreground mb-8">
              Discover more expert reviews and guides on the latest AI tools
            </p>
            <Button asChild className="btn-gradient">
              <Link to="/blog">
                View All Posts
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;