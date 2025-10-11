import { TrendingUp, Sparkles, Brain, Rocket, Globe, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const AITrends = () => {
  const trends = [
    {
      icon: <Brain className="w-6 h-6" />,
      category: "Multimodal AI",
      title: "Text, Image, Video & Audio Combined",
      description: "AI tools are evolving beyond single-format processing. The latest generation seamlessly handles text, images, videos, and audio in one unified workflow. GPT-4V, Gemini, and Claude now understand images contextually, while tools like Runway ML and Descript merge video editing with AI transcription and voice cloning.",
      trend: "📈 +285% adoption in 2025",
      tools: ["GPT-4V", "Gemini Ultra", "Claude Opus"]
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      category: "AI Agents",
      title: "Autonomous Task Execution",
      description: "Moving beyond chatbots, AI agents can now execute complex multi-step tasks independently. From AutoGPT to Microsoft Copilot, these agents plan, research, write code, and complete projects with minimal human intervention. They're revolutionizing productivity by handling entire workflows autonomously.",
      trend: "🚀 Top growth category of 2025",
      tools: ["AutoGPT", "AgentGPT", "Microsoft Copilot"]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      category: "Real-Time AI",
      title: "Instant Processing & Responses",
      description: "Latency is disappearing. New AI tools deliver real-time responses, live translation, instant video generation, and on-the-fly image editing. Tools like ElevenLabs provide natural voice synthesis in milliseconds, while Midjourney v6 generates high-quality images in under 10 seconds.",
      trend: "⚡ Sub-second response times",
      tools: ["ElevenLabs", "Midjourney v6", "Claude Instant"]
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      category: "Personalized AI",
      title: "Custom-Trained Models for Your Needs",
      description: "Generic AI is giving way to personalized solutions. Tools now learn your writing style, understand your brand voice, and adapt to your specific workflows. Custom GPTs, fine-tuned models, and personal knowledge bases create AI assistants that truly understand your unique context and preferences.",
      trend: "🎯 80% of users want personalization",
      tools: ["Custom GPTs", "Jasper Brand Voice", "Notion AI"]
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      category: "No-Code AI",
      title: "AI Development for Everyone",
      description: "Building AI-powered applications no longer requires coding expertise. Platforms like Bubble AI, Zapier AI, and Make.com democratize AI development with visual builders, pre-built templates, and drag-and-drop workflows. Anyone can now create sophisticated AI automation and apps without writing a single line of code.",
      trend: "👥 10M+ no-code AI creators",
      tools: ["Bubble AI", "Zapier AI", "Make.com"]
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      category: "Enterprise AI",
      title: "Secure, Scalable Business Solutions",
      description: "Enterprise adoption accelerates with AI tools offering enterprise-grade security, compliance, and scalability. From secure data handling to SOC 2 certification, business-focused AI platforms now meet corporate requirements while delivering ROI through automation, insights, and efficiency gains.",
      trend: "💼 70% of Fortune 500 use AI tools",
      tools: ["Azure OpenAI", "Google Vertex AI", "AWS Bedrock"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">2025 Industry Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Latest AI Tool Trends & Innovations
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay ahead of the curve with the newest developments in artificial intelligence. 
            From breakthrough capabilities to emerging categories, discover what's shaping the future of AI tools in 2025.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {trends.map((trend, index) => (
            <div 
              key={index}
              className="group bg-card border border-border rounded-xl p-8 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {trend.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-primary mb-1">
                    {trend.category}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {trend.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                {trend.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm font-semibold text-primary">
                  {trend.trend}
                </span>
                <div className="flex gap-2">
                  {trend.tools.slice(0, 2).map((tool, i) => (
                    <span 
                      key={i}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Discover Tools at the Forefront of Innovation
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Explore our curated collection of cutting-edge AI tools across all categories. 
            From emerging startups to established platforms, find the innovations that will transform your workflow.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/category/writing">
                Browse AI Writing Tools
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/blog">
                Read Latest AI News
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITrends;
