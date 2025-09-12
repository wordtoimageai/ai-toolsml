import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI Tools in 2025: What to Expect",
    excerpt: "Explore the emerging trends and breakthrough AI technologies that will shape how we work in 2025.",
    author: "Sarah Chen",
    date: "March 12, 2025",
    readTime: "5 min read",
    category: "Trends",
    image: "🚀"
  },
  {
    id: 2,
    title: "How to Choose the Right AI Writing Tool for Your Business",
    excerpt: "A comprehensive guide to evaluating AI writing tools based on your specific needs and budget.",
    author: "Mike Johnson",
    date: "March 10, 2025",
    readTime: "8 min read",
    category: "Guide",
    image: "✍️"
  },
  {
    id: 3,
    title: "Top 10 AI Design Tools That Will Transform Your Creative Workflow",
    excerpt: "Discover the most innovative AI design tools that are revolutionizing the creative industry.",
    author: "Lisa Wang",
    date: "March 8, 2025",
    readTime: "6 min read",
    category: "Tools",
    image: "🎨"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="AI Tools Blog - Latest Insights & Trends"
        description="Stay updated with the latest AI tools, trends, and insights. Expert reviews, guides, and industry analysis."
        keywords="AI tools blog, artificial intelligence news, AI trends, tech insights"
      />
      <Header />
      
      <main className="pt-20">
        <section className="hero-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">📰</div>
            <h1 className="hero-title">
              AI Tools Blog
            </h1>
            <p className="hero-subtitle">
              Latest insights, trends, and expert reviews on AI tools
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {blogPosts.map((post) => (
                <article key={post.id} className="search-container">
                  <div className="flex items-start gap-6">
                    <div className="text-4xl">{post.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <Badge variant="secondary">{post.category}</Badge>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <Link to={`/blog/${post.id === 1 ? 'future-ai-tools-2025' : post.id === 2 ? 'choose-ai-writing-tool' : 'ai-design-tools-2025'}`}>
                        <h2 className="text-2xl font-bold text-foreground mb-3 hover:text-primary transition-colors cursor-pointer">
                          {post.title}
                        </h2>
                      </Link>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/blog/${post.id === 1 ? 'future-ai-tools-2025' : post.id === 2 ? 'choose-ai-writing-tool' : 'ai-design-tools-2025'}`}>
                            Read More
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-16">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Want to stay updated?
              </h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter for the latest AI tools and insights
              </p>
              <Button asChild className="btn-gradient">
                <Link to="/#newsletter">
                  Subscribe to Newsletter
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;