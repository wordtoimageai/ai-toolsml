import { Link } from "react-router-dom";
import { tools } from "@/data/tools";

// All categories for comprehensive internal linking
const allCategories = [
  { id: 'writing', name: 'AI Writing Tools', emoji: '✍️' },
  { id: 'design', name: 'AI Design Tools', emoji: '🎨' },
  { id: 'video', name: 'AI Video Tools', emoji: '🎬' },
  { id: 'coding', name: 'AI Coding Tools', emoji: '💻' },
  { id: 'audio', name: 'AI Audio Tools', emoji: '🎵' },
  { id: 'marketing', name: 'AI Marketing Tools', emoji: '📈' },
  { id: 'productivity', name: 'Productivity Tools', emoji: '⚡' },
  { id: 'seo', name: 'SEO Tools', emoji: '🔍' },
  { id: 'automation', name: 'Automation Tools', emoji: '🤖' },
  { id: 'data', name: 'Data Tools', emoji: '📊' },
  { id: 'research', name: 'Research Tools', emoji: '🔬' },
  { id: 'sales', name: 'Sales Tools', emoji: '💰' },
  { id: 'social', name: 'Social Media Tools', emoji: '📱' },
];

// Get top tools by rating
const getTopTools = () => {
  return [...tools]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 12);
};

// Get ALL tags (no slicing - includes every tag for comprehensive internal linking)
const getAllTags = () => {
  const tagCounts: Record<string, number> = {};
  tools.forEach(tool => {
    tool.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([tag]) => tag);
};

const Footer = () => {
  const topTools = getTopTools();
  const allTags = getAllTags();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid - 5 Columns for extensive internal linking */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-2xl font-black text-gradient">ToolsML</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Discover and compare 500+ AI tools for every task. Human-curated directory updated weekly.
            </p>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link>
              <Link to="/advertise" className="text-gray-400 hover:text-white text-sm transition-colors">Advertise</Link>
              <Link to="/submit" className="text-gray-400 hover:text-white text-sm transition-colors">Submit Tool</Link>
              <Link to="/other-ai-tools" className="text-gray-400 hover:text-white text-sm transition-colors">Other AI Tools</Link>
            </div>
          </div>

          {/* All Categories - Critical for SEO */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Browse by Category</h4>
            <ul className="space-y-2 text-gray-400">
              {allCategories.map((cat) => (
                <li key={cat.id}>
                  <Link 
                    to={`/category/${cat.id}`} 
                    className="hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Popular AI Tools</h4>
            <ul className="space-y-2 text-gray-400">
              {topTools.map((tool) => (
                <li key={tool.id}>
                  <Link to={`/tool/${tool.id}`} className="hover:text-white transition-colors text-sm">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* All Tags - Comprehensive for SEO */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Browse by Tag</h4>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Link 
                  key={tag} 
                  to={`/tag/${encodeURIComponent(tag)}`} 
                  className="text-xs text-gray-400 hover:text-white transition-colors bg-gray-800 px-2 py-1 rounded"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources & Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/browse" className="hover:text-white transition-colors text-sm">Browse All Tools</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors text-sm">Compare Tools</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors text-sm">Blog</Link></li>
              <li><Link to="/tutorials" className="hover:text-white transition-colors text-sm">Tutorials</Link></li>
              <li><Link to="/api-docs" className="hover:text-white transition-colors text-sm">API Documentation</Link></li>
              <li><Link to="/changelog" className="hover:text-white transition-colors text-sm">Changelog</Link></li>
              <li><Link to="/favorites" className="hover:text-white transition-colors text-sm">My Favorites</Link></li>
              <li><Link to="/site-map" className="hover:text-white transition-colors text-sm">Site Map</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-2">
            &copy; {new Date().getFullYear()} ToolsML by{' '}
            <a 
              href="https://startbd.org" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-white transition-colors font-medium"
            >
              Start BD
            </a>. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-gray-400 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/unsubscribe" className="hover:text-white transition-colors">Unsubscribe</Link>
            <Link to="/site-map" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;