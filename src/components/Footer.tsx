import { Link } from "react-router-dom";
import { tools } from "@/data/tools";

// Get all unique categories
const getCategories = () => {
  const categories = [...new Set(tools.map(tool => tool.category))];
  const categoryNames: Record<string, string> = {
    writing: 'Writing & Content',
    design: 'Design & Creative',
    coding: 'Development',
    marketing: 'Marketing',
    productivity: 'Productivity',
    video: 'Video',
    audio: 'Audio',
    research: 'Research',
    data: 'Data & Analytics',
    automation: 'Automation',
    sales: 'Sales & CRM',
    social: 'Social Media',
    seo: 'SEO & Content'
  };
  return categories.map(cat => ({
    id: cat,
    name: categoryNames[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)
  }));
};

// Get top tools by rating
const getTopTools = () => {
  return [...tools]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);
};

// Get popular tags
const getPopularTags = () => {
  const tagCounts: Record<string, number> = {};
  tools.forEach(tool => {
    tool.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([tag]) => tag);
};

const Footer = () => {
  const categories = getCategories();
  const topTools = getTopTools();
  const popularTags = getPopularTags();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-black text-gradient">ToolsML</h3>
            <p className="text-gray-400 leading-relaxed">
              Your trusted directory for discovering the best AI tools across all industries and use cases.
            </p>
            <div className="flex gap-4">
              <Link to="/about" className="text-gray-400 hover:text-white text-sm">About</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link>
              <Link to="/advertise" className="text-gray-400 hover:text-white text-sm">Advertise</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              {categories.slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.id}`} className="hover:text-white transition-colors text-sm">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Top Tools</h4>
            <ul className="space-y-2 text-gray-400">
              {topTools.slice(0, 8).map((tool) => (
                <li key={tool.id}>
                  <Link to={`/tool/${tool.id}`} className="hover:text-white transition-colors text-sm">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tags */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Popular Tags</h4>
            <ul className="space-y-2 text-gray-400">
              {popularTags.map((tag) => (
                <li key={tag}>
                  <Link to={`/tag/${encodeURIComponent(tag)}`} className="hover:text-white transition-colors text-sm">
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/browse" className="hover:text-white transition-colors text-sm">Browse All Tools</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors text-sm">Compare Tools</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors text-sm">Blog</Link></li>
              <li><Link to="/tutorials" className="hover:text-white transition-colors text-sm">Tutorials</Link></li>
              <li><Link to="/api-docs" className="hover:text-white transition-colors text-sm">API Documentation</Link></li>
              <li><Link to="/changelog" className="hover:text-white transition-colors text-sm">Changelog</Link></li>
              <li><Link to="/submit" className="hover:text-white transition-colors text-sm">Submit a Tool</Link></li>
              <li><Link to="/site-map" className="hover:text-white transition-colors text-sm">Site Map</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            &copy; 2025 ToolsML. All rights reserved. Built with ❤️ for the AI community.
          </p>
          <div className="flex gap-6 text-gray-400 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/site-map" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;