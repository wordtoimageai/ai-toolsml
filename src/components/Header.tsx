import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Scale } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useCompare } from "@/hooks/useCompare";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favoriteCount } = useFavorites();
  const { compareCount } = useCompare();

  return (
    <header className="fixed top-0 w-full nav-glass z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-black text-gradient">
            ToolsML
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground/80 hover:text-primary font-medium transition-colors">
              Home
            </Link>
            
            {/* Resources Dropdown */}
            <div className="relative group">
              <button className="text-foreground/80 hover:text-primary font-medium transition-colors flex items-center gap-1">
                Resources
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 bg-background border rounded-lg shadow-lg py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/blog" className="block px-4 py-2 text-foreground/80 hover:bg-muted hover:text-primary transition-colors">Blog</Link>
                <Link to="/tutorials" className="block px-4 py-2 text-foreground/80 hover:bg-muted hover:text-primary transition-colors">Tutorials</Link>
                <Link to="/api-docs" className="block px-4 py-2 text-foreground/80 hover:bg-muted hover:text-primary transition-colors">API Documentation</Link>
                <Link to="/changelog" className="block px-4 py-2 text-foreground/80 hover:bg-muted hover:text-primary transition-colors">Changelog</Link>
              </div>
            </div>

            {/* Company Dropdown */}
            <div className="relative group">
              <button className="text-foreground/80 hover:text-primary font-medium transition-colors flex items-center gap-1">
                Company
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 bg-background border rounded-lg shadow-lg py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/about" className="block px-4 py-2 text-foreground/80 hover:bg-muted hover:text-primary transition-colors">About Us</Link>
                <Link to="/contact" className="block px-4 py-2 text-foreground/80 hover:bg-muted hover:text-primary transition-colors">Contact</Link>
                <Link to="/advertise" className="block px-4 py-2 text-foreground/80 hover:bg-muted hover:text-primary transition-colors">Advertise</Link>
                <Link to="/privacy" className="block px-4 py-2 text-foreground/80 hover:bg-muted hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="block px-4 py-2 text-foreground/80 hover:bg-muted hover:text-primary transition-colors">Terms of Service</Link>
              </div>
            </div>

            <Link to="/submit" className="text-foreground/80 hover:text-primary font-medium transition-colors">
              Submit Tool
            </Link>
            <Link 
              to="/favorites" 
              className="text-foreground/80 hover:text-primary font-medium transition-colors flex items-center gap-1"
            >
              <Heart className="w-4 h-4" />
              Favorites {favoriteCount > 0 && <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">{favoriteCount}</span>}
            </Link>
            {compareCount > 0 && (
              <Link 
                to="/compare" 
                className="text-foreground/80 hover:text-primary font-medium transition-colors flex items-center gap-1"
              >
                <Scale className="w-4 h-4" />
                Compare ({compareCount})
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link to="/" className="block px-4 py-2 text-foreground/80 hover:text-primary">Home</Link>
            <Link to="/about" className="block px-4 py-2 text-foreground/80 hover:text-primary">About</Link>
            <Link to="/submit" className="block px-4 py-2 text-foreground/80 hover:text-primary">Submit Tool</Link>
            <Link to="/favorites" className="block px-4 py-2 text-foreground/80 hover:text-primary flex items-center gap-1">
              <Heart className="w-4 h-4" />
              Favorites {favoriteCount > 0 && <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">{favoriteCount}</span>}
            </Link>
            {compareCount > 0 && (
              <Link to="/compare" className="block px-4 py-2 text-foreground/80 hover:text-primary flex items-center gap-1">
                <Scale className="w-4 h-4" />
                Compare ({compareCount})
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;