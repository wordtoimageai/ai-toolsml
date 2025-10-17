import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, Target } from 'lucide-react';
import { Tool } from '@/data/tools';

interface TutorialProps {
  tool: Tool;
}

const generateTutorialSteps = (tool: Tool) => {
  const category = tool.category;
  
  // Generate category-specific tutorial steps
  const tutorialMap: Record<string, Array<{ title: string; description: string; tips: string[] }>> = {
    writing: [
      {
        title: "Sign Up and Set Preferences",
        description: `Create your ${tool.title} account and customize your writing preferences. Choose your preferred tone, style, and target audience to get personalized suggestions.`,
        tips: [
          "Use a professional email for better support",
          "Complete your profile for personalized recommendations",
          "Set up API integrations early if needed"
        ]
      },
      {
        title: "Start Your First Project",
        description: "Begin with a simple writing task to familiarize yourself with the interface. Try generating a blog post outline or social media caption to understand the tool's capabilities.",
        tips: [
          "Start with clear, specific prompts",
          "Experiment with different prompt styles",
          "Save successful prompts for reuse"
        ]
      },
      {
        title: "Refine and Edit Output",
        description: "Review the AI-generated content and make necessary adjustments. Use the editing features to fine-tune tone, length, and style to match your brand voice.",
        tips: [
          "Always review AI content for accuracy",
          "Blend AI output with your personal touch",
          "Use the regenerate feature for alternatives"
        ]
      },
      {
        title: "Optimize Your Workflow",
        description: "Create templates, save favorite prompts, and integrate with your existing tools. Set up automated workflows to maximize productivity and consistency.",
        tips: [
          "Build a prompt library for common tasks",
          "Connect with Google Docs or Notion",
          "Schedule regular content creation sessions"
        ]
      }
    ],
    coding: [
      {
        title: "Install and Configure",
        description: `Install ${tool.title} extension or CLI tool and configure it with your development environment. Connect to your repositories and set coding preferences.`,
        tips: [
          "Review privacy and security settings",
          "Configure language-specific preferences",
          "Set up keyboard shortcuts"
        ]
      },
      {
        title: "Write Your First AI-Assisted Code",
        description: "Start with a simple function or component. Write a comment describing what you want, and let the AI suggest implementations. Review and accept suggestions.",
        tips: [
          "Write detailed comments for better suggestions",
          "Review all AI-generated code carefully",
          "Test generated code thoroughly"
        ]
      },
      {
        title: "Debug and Optimize",
        description: "Use AI assistance to identify bugs, optimize performance, and improve code quality. Ask for explanations of complex code sections.",
        tips: [
          "Use AI for code reviews",
          "Ask for performance optimization tips",
          "Generate unit tests automatically"
        ]
      },
      {
        title: "Advanced Features",
        description: "Explore advanced capabilities like refactoring, documentation generation, and code translation. Integrate with your CI/CD pipeline.",
        tips: [
          "Automate documentation updates",
          "Use for learning new languages",
          "Create custom code snippets"
        ]
      }
    ],
    design: [
      {
        title: "Explore the Interface",
        description: `Familiarize yourself with ${tool.title}'s tools and features. Understand the prompt system, style controls, and output options.`,
        tips: [
          "Start with example prompts",
          "Review community galleries for inspiration",
          "Save your favorite settings"
        ]
      },
      {
        title: "Create Your First Design",
        description: "Generate your first AI design with a clear prompt. Experiment with different keywords, styles, and parameters to understand how the AI interprets your requests.",
        tips: [
          "Use descriptive, specific prompts",
          "Reference art styles and artists",
          "Iterate on successful prompts"
        ]
      },
      {
        title: "Refine and Iterate",
        description: "Use variation and editing tools to refine your designs. Adjust parameters, combine elements, and create multiple versions until you achieve your desired result.",
        tips: [
          "Generate multiple variations",
          "Use upscaling for final versions",
          "Combine AI with manual editing"
        ]
      },
      {
        title: "Export and Integrate",
        description: "Export your designs in appropriate formats and integrate them into your workflow. Organize your library and establish a consistent design system.",
        tips: [
          "Export in highest quality available",
          "Organize files with clear naming",
          "Keep a prompt journal"
        ]
      }
    ]
  };

  // Default steps for other categories
  const defaultSteps = [
    {
      title: "Get Started with Setup",
      description: `Create your ${tool.title} account and complete the initial setup. Configure your preferences and connect any necessary integrations.`,
      tips: [
        "Complete all onboarding steps",
        "Review privacy and security settings",
        "Explore the interface thoroughly"
      ]
    },
    {
      title: "Learn the Basics",
      description: "Start with simple tasks to understand how the tool works. Follow the built-in tutorials and explore example projects.",
      tips: [
        "Take advantage of tutorials",
        "Join community forums",
        "Experiment with core features"
      ]
    },
    {
      title: "Integrate Into Workflow",
      description: "Connect the tool with your existing workflow and tools. Set up automation and establish regular usage patterns.",
      tips: [
        "Connect with your main tools",
        "Create routine workflows",
        "Set up notifications and reminders"
      ]
    },
    {
      title: "Master Advanced Features",
      description: "Explore advanced capabilities and optimization techniques. Share knowledge with team members and refine your processes.",
      tips: [
        "Explore all features systematically",
        "Share best practices with team",
        "Keep learning from community"
      ]
    }
  ];

  return tutorialMap[category] || defaultSteps;
};

export const ToolTutorial = ({ tool }: TutorialProps) => {
  const steps = generateTutorialSteps(tool);
  const estimatedTime = steps.length * 10; // 10 minutes per step

  // Generate HowTo schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Use ${tool.title}: Complete Guide`,
    "description": `Step-by-step tutorial on how to get started with ${tool.title} and master its core features. Learn best practices and pro tips.`,
    "totalTime": `PT${estimatedTime}M`,
    "tool": {
      "@type": "SoftwareApplication",
      "name": tool.title,
      "applicationCategory": `${tool.category} Tool`,
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": tool.pricing === 'Free' ? "0" : "varies",
        "priceCurrency": "USD"
      }
    },
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.description,
      "url": `${window.location.href}#step-${index + 1}`
    }))
  };

  return (
    <section className="py-12">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      </Helmet>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          How to Use {tool.title}: Step-by-Step Guide
        </h2>
        <p className="text-muted-foreground text-lg mb-4">
          Master {tool.title} in {estimatedTime} minutes with this comprehensive tutorial. 
          Follow these steps to go from beginner to proficient user.
        </p>
        
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{estimatedTime} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>{steps.length} steps</span>
          </div>
          <Badge variant="secondary">Beginner Friendly</Badge>
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <Card key={index} id={`step-${index + 1}`} className="border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Pro Tips
                    </h4>
                    <ul className="space-y-2">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-primary mr-2 flex-shrink-0">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Steps */}
      <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
        <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
          🎉 You're Ready to Go!
        </h3>
        <p className="text-muted-foreground text-center mb-6 max-w-2xl mx-auto">
          You now have the foundation to use {tool.title} effectively. Remember, mastery comes 
          with practice. Don't hesitate to experiment, make mistakes, and learn from the 
          community. The more you use {tool.title}, the better you'll become at leveraging 
          its full potential.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="text-center p-4">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-semibold text-sm mb-1">Read the Docs</h4>
            <p className="text-xs text-muted-foreground">
              Explore official documentation for advanced features
            </p>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl mb-2">👥</div>
            <h4 className="font-semibold text-sm mb-1">Join Community</h4>
            <p className="text-xs text-muted-foreground">
              Connect with other users and share experiences
            </p>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold text-sm mb-1">Practice Daily</h4>
            <p className="text-xs text-muted-foreground">
              Build the habit of using {tool.title} in your workflow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolTutorial;
