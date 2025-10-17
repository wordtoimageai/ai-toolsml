import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Code, PenTool, TrendingUp, GraduationCap, Users } from 'lucide-react';

interface UseCase {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
  category: string;
  benefits: string[];
}

const useCases: UseCase[] = [
  {
    icon: <PenTool className="w-8 h-8 text-primary" />,
    title: "Content Creators & Writers",
    description: "AI tools transform content creation with intelligent writing assistance, automated editing, and creative ideation. Perfect for bloggers, journalists, copywriters, and social media managers looking to scale their content output while maintaining quality.",
    examples: ["Blog writing", "Social media posts", "Email campaigns", "SEO content"],
    category: "writing",
    benefits: ["3x faster content production", "Improved SEO optimization", "Consistent brand voice"]
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Developers & Engineers",
    description: "Accelerate your development workflow with AI-powered code completion, automated testing, and intelligent debugging. These tools help developers write cleaner code faster, catch bugs early, and focus on solving complex problems rather than repetitive tasks.",
    examples: ["Code generation", "Bug detection", "Documentation", "API integration"],
    category: "coding",
    benefits: ["40% faster coding", "Fewer bugs in production", "Automated documentation"]
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    title: "Marketers & Growth Teams",
    description: "Drive growth with AI-powered marketing automation, customer insights, and campaign optimization. From content creation to analytics, AI tools help marketing teams make data-driven decisions and execute campaigns at scale.",
    examples: ["Ad copy generation", "A/B testing", "Customer segmentation", "Campaign analytics"],
    category: "marketing",
    benefits: ["Higher conversion rates", "Better ROI tracking", "Automated reporting"]
  },
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: "Business Owners & Entrepreneurs",
    description: "Streamline operations and boost productivity with AI tools that handle routine tasks, analyze business data, and provide strategic insights. Perfect for small business owners and entrepreneurs who need to do more with limited resources.",
    examples: ["Business planning", "Financial analysis", "Customer support", "Workflow automation"],
    category: "productivity",
    benefits: ["Save 10+ hours/week", "Better decision making", "Reduced operational costs"]
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-primary" />,
    title: "Students & Educators",
    description: "Enhance learning and teaching with AI-powered educational tools. Students can get personalized tutoring and study assistance, while educators can create engaging content, automate grading, and provide better feedback to students.",
    examples: ["Research assistance", "Study guides", "Assignment feedback", "Lesson planning"],
    category: "research",
    benefits: ["Personalized learning", "Faster research", "Better comprehension"]
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Teams & Collaborators",
    description: "Improve team productivity and collaboration with AI tools that facilitate communication, project management, and knowledge sharing. These tools help distributed teams work more efficiently and maintain alignment across time zones.",
    examples: ["Meeting summaries", "Task automation", "Document collaboration", "Knowledge management"],
    category: "productivity",
    benefits: ["Better team alignment", "Reduced meeting time", "Centralized knowledge"]
  }
];

export const AIToolsByUseCase = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            AI Tools for Every Use Case
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're creating content, building software, growing a business, or learning something new, 
            there's an AI tool designed specifically for your needs. Discover how AI can transform your workflow 
            and help you achieve more in less time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {useCases.map((useCase, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow duration-300 border-border/50"
            >
              <CardHeader>
                <div className="mb-4">{useCase.icon}</div>
                <CardTitle className="text-xl mb-2">{useCase.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {useCase.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-2">Common Use Cases:</h4>
                  <div className="flex flex-wrap gap-2">
                    {useCase.examples.map((example, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {useCase.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full mt-4"
                >
                  <Link to={`/category/${useCase.category}`}>
                    Explore {useCase.title.split(" ")[0]} Tools
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Not sure which tools are right for you? Our curated collections make it easy to find 
            the perfect AI tools for your specific needs and workflow.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="btn-gradient">
              <Link to="/#categories">
                Browse All Categories
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/submit">
                Suggest a Tool
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIToolsByUseCase;
