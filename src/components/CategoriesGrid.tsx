import { Link } from "react-router-dom";
import { 
  Pen, 
  Palette, 
  Video, 
  Code, 
  Megaphone, 
  Search, 
  Zap, 
  GraduationCap,
  ArrowRight
} from "lucide-react";

const categories = [
  {
    id: "writing",
    label: "Writing & Content",
    icon: Pen,
    description: "AI writers, editors, and content creators",
    count: "45+",
    color: "from-violet-500 to-purple-600"
  },
  {
    id: "design",
    label: "Design & Creative",
    icon: Palette,
    description: "Image generators, editors, and design tools",
    count: "38+",
    color: "from-pink-500 to-rose-600"
  },
  {
    id: "coding",
    label: "Development",
    icon: Code,
    description: "Development assistants and automation",
    count: "52+",
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
    description: "Campaign tools and analytics platforms",
    count: "31+",
    color: "from-orange-500 to-amber-600"
  },
  {
    id: "productivity",
    label: "Productivity",
    icon: Zap,
    description: "Workflow automation and optimization",
    count: "41+",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "video",
    label: "Video & Media",
    icon: Video,
    description: "Video creation, editing, and enhancement",
    count: "29+",
    color: "from-red-500 to-pink-600"
  },
  {
    id: "research",
    label: "Research & Analytics",
    icon: Search,
    description: "Data analysis and information discovery",
    count: "24+",
    color: "from-indigo-500 to-violet-600"
  },
  {
    id: "audio",
    label: "Education & Learning",
    icon: GraduationCap,
    description: "Learning platforms and educational tools",
    count: "18+",
    color: "from-sky-500 to-cyan-600"
  }
];

const CategoriesGrid = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-medium text-primary mb-3">
            Explore Categories
          </span>
          <h2 className="section-title mb-4">
            Browse by Use Case
          </h2>
          <p className="section-subtitle mx-auto">
            Find the perfect AI tool for your specific needs across these popular categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative bg-card hover:bg-card rounded-2xl p-6 border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
                
                <div className="relative flex flex-col space-y-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {category.label}
                      </h3>
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                    Explore tools
                    <ArrowRight className="w-4 h-4" />
                  </div>
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
