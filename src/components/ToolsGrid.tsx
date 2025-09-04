import ToolCard from "./ToolCard";
import { useToast } from "@/hooks/use-toast";

const tools = [
  {
    icon: "✍️",
    title: "ChatGPT",
    description: "Advanced conversational AI that can help with writing, coding, analysis, and creative tasks.",
    tags: ["Writing", "Conversation", "Free"]
  },
  {
    icon: "🎨",
    title: "Midjourney",
    description: "Create stunning, high-quality images from text descriptions using advanced AI algorithms.",
    tags: ["Image Generation", "Art", "Paid"]
  },
  {
    icon: "💻",
    title: "GitHub Copilot",
    description: "AI-powered code completion tool that helps developers write better code faster.",
    tags: ["Coding", "Productivity", "Subscription"]
  },
  {
    icon: "📈",
    title: "Jasper AI",
    description: "AI-powered marketing copywriting platform for creating high-converting content.",
    tags: ["Marketing", "Copywriting", "Business"]
  },
  {
    icon: "🎵",
    title: "Mubert",
    description: "Generate royalty-free music and soundtracks using AI for any project or mood.",
    tags: ["Music", "Audio", "Creative"]
  },
  {
    icon: "🔬",
    title: "Perplexity",
    description: "AI-powered research assistant that provides accurate answers with source citations.",
    tags: ["Research", "Search", "Education"]
  }
];

const ToolsGrid = () => {
  const { toast } = useToast();

  const handleVisitTool = (toolName: string) => {
    toast({
      title: "Visiting Tool",
      description: `Redirecting to ${toolName}...`,
    });
  };

  const handleLearnMore = (toolName: string) => {
    toast({
      title: "Learn More",
      description: `Loading more information about ${toolName}...`,
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Featured AI Tools
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the most popular and effective AI tools used by professionals worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={tool.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ToolCard
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                tags={tool.tags}
                onVisit={() => handleVisitTool(tool.title)}
                onLearnMore={() => handleLearnMore(tool.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;