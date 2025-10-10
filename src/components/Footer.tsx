import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-gradient">ToolsML</h3>
            <p className="text-gray-400 leading-relaxed">
              Your trusted directory for discovering the best AI tools across all industries and use cases.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/category/writing" className="hover:text-white transition-colors">Writing & Content</Link></li>
              <li><Link to="/category/design" className="hover:text-white transition-colors">Design & Creative</Link></li>
              <li><Link to="/category/coding" className="hover:text-white transition-colors">Development</Link></li>
              <li><Link to="/category/marketing" className="hover:text-white transition-colors">Marketing</Link></li>
              <li><Link to="/category/productivity" className="hover:text-white transition-colors">Productivity</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/tutorials" className="hover:text-white transition-colors">Tutorials</Link></li>
              <li><Link to="/api-docs" className="hover:text-white transition-colors">API Documentation</Link></li>
              <li><Link to="/submit" className="hover:text-white transition-colors">Submit a Tool</Link></li>
              <li><Link to="/changelog" className="hover:text-white transition-colors">Changelog</Link></li>
              <li><Link to="/site-map" className="hover:text-white transition-colors">Site Map</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/advertise" className="hover:text-white transition-colors">Advertise</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ToolsML. All rights reserved. Built with ❤️ for the AI community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;