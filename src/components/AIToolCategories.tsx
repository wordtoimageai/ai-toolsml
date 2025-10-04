import { 
  Sparkles, Image, Video, Code, MessageSquare, FileText, 
  Music, Brain, Briefcase, TrendingUp, Palette, Search 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const AIToolCategories = () => {
  const popularCategories = [
    {
      icon: Sparkles,
      name: "AI Writing & Content",
      description: "Generate high-quality content, blog posts, articles, and marketing copy with advanced AI writing assistants powered by GPT-4 and Claude.",
      toolCount: 150,
      slug: "writing"
    },
    {
      icon: Image,
      name: "AI Image Generation",
      description: "Create stunning visuals, artwork, and designs using Stable Diffusion, Midjourney, and DALL-E based image generation tools.",
      toolCount: 120,
      slug: "image-generation"
    },
    {
      icon: Video,
      name: "Video Editing & Production",
      description: "Edit, enhance, and create professional videos with AI-powered tools for cutting, effects, subtitles, and automated video generation.",
      toolCount: 85,
      slug: "video"
    },
    {
      icon: Code,
      name: "Developer Tools & Coding",
      description: "Accelerate development with AI code assistants, debugging tools, documentation generators, and automated testing solutions.",
      toolCount: 95,
      slug: "developer-tools"
    },
    {
      icon: MessageSquare,
      name: "Chatbots & Conversational AI",
      description: "Build intelligent chatbots, virtual assistants, and customer support solutions with natural language processing capabilities.",
      toolCount: 75,
      slug: "chatbots"
    },
    {
      icon: Brain,
      name: "Machine Learning & AI Models",
      description: "Train, deploy, and manage machine learning models with platforms offering pre-built models and custom training capabilities.",
      toolCount: 60,
      slug: "machine-learning"
    },
    {
      icon: Music,
      name: "Audio & Music Generation",
      description: "Create music, sound effects, voiceovers, and podcasts with AI audio synthesis and voice cloning technologies.",
      toolCount: 45,
      slug: "audio"
    },
    {
      icon: Briefcase,
      name: "Business & Productivity",
      description: "Streamline operations, automate workflows, analyze data, and boost productivity with AI-powered business intelligence tools.",
      toolCount: 110,
      slug: "productivity"
    },
    {
      icon: Palette,
      name: "Design & Creative Tools",
      description: "Design logos, graphics, presentations, and UI/UX elements with AI design assistants and creative automation platforms.",
      toolCount: 70,
      slug: "design"
    },
    {
      icon: TrendingUp,
      name: "Marketing & SEO",
      description: "Optimize campaigns, analyze competitors, generate ad copy, and improve search rankings with AI marketing automation tools.",
      toolCount: 80,
      slug: "marketing"
    },
    {
      icon: FileText,
      name: "Document Processing",
      description: "Extract data, summarize documents, translate text, and automate document workflows with intelligent OCR and NLP tools.",
      toolCount: 55,
      slug: "document-processing"
    },
    {
      icon: Search,
      name: "Research & Data Analysis",
      description: "Analyze datasets, generate insights, create visualizations, and conduct research with AI-powered analytics platforms.",
      toolCount: 65,
      slug: "research"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Explore AI Tools by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Browse our extensive collection of AI tools organized by use case and industry. Each category features carefully selected tools with detailed reviews, pricing information, and feature comparisons to help you find the perfect solution for your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCategories.map((category, index) => (
            <Link 
              key={index}
              to={`/category/${category.slug}`}
              className="block group"
            >
              <Card className="h-full border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          {category.toolCount} tools
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? We're constantly adding new categories and tools.
          </p>
          <Link 
            to="/categories" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            View All Categories
            <Search className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AIToolCategories;