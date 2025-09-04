import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full nav-glass z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-black text-gradient">
            ToolsML
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-foreground/80 hover:text-primary font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary font-medium transition-colors">
              Categories
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary font-medium transition-colors">
              Submit Tool
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary font-medium transition-colors">
              Blog
            </a>
            <a href="#" className="text-foreground/80 hover:text-primary font-medium transition-colors">
              About
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <a href="#" className="block px-4 py-2 text-foreground/80 hover:text-primary">Home</a>
            <a href="#" className="block px-4 py-2 text-foreground/80 hover:text-primary">Categories</a>
            <a href="#" className="block px-4 py-2 text-foreground/80 hover:text-primary">Submit Tool</a>
            <a href="#" className="block px-4 py-2 text-foreground/80 hover:text-primary">Blog</a>
            <a href="#" className="block px-4 py-2 text-foreground/80 hover:text-primary">About</a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;