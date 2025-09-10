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
            <Link to="/about" className="text-foreground/80 hover:text-primary font-medium transition-colors">
              About
            </Link>
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