import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedSEO from '@/components/AdvancedSEO';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Play, BookOpen } from 'lucide-react';

const tutorials = [
  {
    id: 1,
    title: "Getting Started with AI Writing Tools",
    description: "Learn how to effectively use AI writing tools like ChatGPT and Jasper to enhance your content creation workflow.",
    duration: "15 min",
    level: "Beginner",
    category: "Writing",
    icon: "✍️",
    steps: 5
  },
  {
    id: 2,
    title: "AI Image Generation Masterclass",
    description: "Master Midjourney, DALL-E, and Stable Diffusion to create stunning visuals for your projects.",
    duration: "25 min",
    level: "Intermediate",
    category: "Design",
    icon: "🎨",
    steps: 8
  },
  {
    id: 3,
    title: "Automating Your Workflow with AI",
    description: "Discover how to integrate multiple AI tools to create efficient automated workflows for your business.",
    duration: "20 min",
    level: "Advanced",
    category: "Productivity",
    icon: "⚡",
    steps: 6
  },
  {
    id: 4,
    title: "AI-Powered Code Generation",
    description: "Learn to use GitHub Copilot and other AI coding assistants to write better code faster.",
    duration: "18 min",
    level: "Intermediate",
    category: "Development",
    icon: "💻",
    steps: 7
  },
  {
    id: 5,
    title: "Marketing with AI Tools",
    description: "Boost your marketing efforts using AI for copywriting, design, and campaign optimization.",
    duration: "22 min",
    level: "Beginner",
    category: "Marketing",
    icon: "📈",
    steps: 6
  },
  {
    id: 6,
    title: "AI Research and Analysis",
    description: "Use AI tools like Perplexity and Claude for efficient research and data analysis.",
    duration: "16 min",
    level: "Intermediate",
    category: "Research",
    icon: "🔬",
    steps: 5
  }
];

const Tutorials = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      <AdvancedSEO 
        title="AI Tools Tutorials - Learn How to Use AI Effectively | ToolsML"
        description="Step-by-step tutorials on how to use AI tools effectively. From beginner guides to advanced techniques for AI mastery."
        keywords="AI tutorials, how to use AI tools, AI guides, artificial intelligence learning"
        url="/tutorials"
        pageType="homepage"
      />
      <Header />
      
      <main className="pt-20">
        <section className="hero-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h1 className="hero-title">
              AI Tools Tutorials
            </h1>
            <p className="hero-subtitle">
              Learn how to use AI tools effectively with our step-by-step guides
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tutorials.map((tutorial) => (
                <div key={tutorial.id} className="tool-card">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-2xl mr-4">
                      {tutorial.icon}
                    </div>
                    <div>
                      <Badge 
                        variant="secondary" 
                        className={`${getLevelColor(tutorial.level)} mb-1`}
                      >
                        {tutorial.level}
                      </Badge>
                      <div className="text-sm text-muted-foreground">{tutorial.category}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-card-foreground mb-3">
                    {tutorial.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {tutorial.description}
                  </p>

                  <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {tutorial.steps} steps
                    </div>
                  </div>

                  <Button className="btn-gradient w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Start Tutorial
                  </Button>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="search-container max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Can't find what you're looking for?
                </h3>
                <p className="text-muted-foreground mb-6">
                  We're constantly adding new tutorials. Suggest a topic or request a specific tutorial.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="btn-gradient">
                    Request Tutorial
                  </Button>
                  <Button variant="outline">
                    Browse All Tools
                  </Button>
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

export default Tutorials;