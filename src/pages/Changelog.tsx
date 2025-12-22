import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedSEO from '@/components/AdvancedSEO';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Bug, Zap, Palette } from 'lucide-react';

const changelogEntries = [
  {
    version: "2.1.0",
    date: "March 15, 2025",
    type: "major",
    changes: [
      {
        type: "feature",
        title: "Advanced Comparison Tool",
        description: "Compare up to 3 AI tools side-by-side with detailed feature breakdown"
      },
      {
        type: "feature", 
        title: "Personal Favorites",
        description: "Save and organize your favorite AI tools for quick access"
      },
      {
        type: "improvement",
        title: "Enhanced Search",
        description: "Improved search algorithm with better relevance and filtering"
      }
    ]
  },
  {
    version: "2.0.5",
    date: "March 10, 2025",
    type: "minor",
    changes: [
      {
        type: "fix",
        title: "Fixed Category Filtering",
        description: "Resolved issue where category filters weren't persisting across page refreshes"
      },
      {
        type: "improvement",
        title: "Performance Optimization",
        description: "Reduced page load times by 40% through image optimization and caching"
      }
    ]
  },
  {
    version: "2.0.0",
    date: "March 5, 2025",
    type: "major",
    changes: [
      {
        type: "feature",
        title: "Complete UI Redesign",
        description: "Brand new interface with improved navigation and user experience"
      },
      {
        type: "feature",
        title: "Tool Submission Portal",
        description: "New streamlined process for submitting AI tools to our directory"
      },
      {
        type: "feature",
        title: "Advanced Filtering",
        description: "Filter tools by pricing model, rating, category, and more"
      },
      {
        type: "feature",
        title: "SEO Optimization",
        description: "Improved search engine visibility and performance"
      }
    ]
  },
  {
    version: "1.8.2",
    date: "February 28, 2025",
    type: "patch",
    changes: [
      {
        type: "fix",
        title: "Mobile Responsiveness",
        description: "Fixed layout issues on mobile devices and tablets"
      },
      {
        type: "fix",
        title: "Newsletter Signup",
        description: "Resolved email validation issues in newsletter subscription"
      }
    ]
  },
  {
    version: "1.8.0",
    date: "February 20, 2025",
    type: "minor",
    changes: [
      {
        type: "feature",
        title: "Tool Categories",
        description: "Added dedicated category pages for better tool organization"
      },
      {
        type: "improvement",
        title: "Loading Performance",
        description: "Implemented lazy loading for tool cards and images"
      },
      {
        type: "feature",
        title: "Dark Mode Support",
        description: "Added dark mode toggle for better user experience"
      }
    ]
  }
];

const Changelog = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature': return <Plus className="w-4 h-4 text-green-600" />;
      case 'improvement': return <Zap className="w-4 h-4 text-blue-600" />;
      case 'fix': return <Bug className="w-4 h-4 text-red-600" />;
      case 'design': return <Palette className="w-4 h-4 text-purple-600" />;
      default: return <Plus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getVersionBadge = (type: string) => {
    switch (type) {
      case 'major': return <Badge className="bg-primary text-primary-foreground">Major Release</Badge>;
      case 'minor': return <Badge variant="secondary">Minor Update</Badge>;
      case 'patch': return <Badge variant="outline">Patch</Badge>;
      default: return <Badge variant="outline">Update</Badge>;
    }
  };

  return (
    <div className="min-h-screen">
      <AdvancedSEO 
        title="Changelog - ToolsML Updates & Releases"
        description="Stay updated with the latest ToolsML features, improvements, and bug fixes. See our development history."
        keywords="ToolsML changelog, updates, new features, bug fixes, releases"
        url="/changelog"
        pageType="homepage"
      />
      <Header />
      
      <main className="pt-20">
        <section className="hero-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h1 className="hero-title">
              Changelog
            </h1>
            <p className="hero-subtitle">
              Stay updated with our latest features and improvements
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {changelogEntries.map((entry) => (
                <div key={entry.version} className="search-container">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl font-bold text-foreground">
                        Version {entry.version}
                      </h2>
                      {getVersionBadge(entry.type)}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {entry.date}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {entry.changes.map((change, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                        {getTypeIcon(change.type)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {change.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {change.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="search-container max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Want to suggest a feature?
                </h3>
                <p className="text-muted-foreground mb-6">
                  We're always looking to improve ToolsML. Share your ideas and feedback with us.
                </p>
                <div className="flex gap-4 justify-center">
                  <Badge variant="outline" className="px-3 py-1">
                    <Plus className="w-3 h-3 mr-1" />
                    New Feature
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    <Zap className="w-3 h-3 mr-1" />
                    Improvement
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    <Bug className="w-3 h-3 mr-1" />
                    Bug Fix
                  </Badge>
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

export default Changelog;