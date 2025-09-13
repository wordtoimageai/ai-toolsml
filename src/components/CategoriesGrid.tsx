import { Link } from "react-router-dom";
import { 
  Pen, 
  Palette, 
  Video, 
  Code, 
  Megaphone, 
  Search, 
  Zap, 
  GraduationCap 
} from "lucide-react";

const categories = [
  {
    id: "writing",
    label: "Writing & Content",
    icon: Pen,
    description: "AI writers, editors, and content creators",
    count: "45+ tools"
  },
  {
    id: "design",
    label: "Design & Creative",
    icon: Palette,
    description: "Image generators, editors, and design tools",
    count: "38+ tools"
  },
  {
    id: "coding",
    label: "Development",
    icon: Code,
    description: "Development assistants and automation",
    count: "52+ tools"
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
    description: "Campaign tools and analytics platforms",
    count: "31+ tools"
  },
  {
    id: "productivity",
    label: "Productivity",
    icon: Zap,
    description: "Workflow automation and optimization",
    count: "41+ tools"
  },
  {
    id: "video",
    label: "Video & Media",
    icon: Video,
    description: "Video creation, editing, and enhancement",
    count: "29+ tools"
  },
  {
    id: "research",
    label: "Research & Analytics",
    icon: Search,
    description: "Data analysis and information discovery",
    count: "24+ tools"
  },
  {
    id: "audio",
    label: "Education & Learning",
    icon: GraduationCap,
    description: "Learning platforms and educational tools",
    count: "18+ tools"
  }
];

const CategoriesGrid = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Use Case
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect AI tool for your specific needs across these popular categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group bg-card hover:bg-accent/50 rounded-xl p-6 border border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-card-hover"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;