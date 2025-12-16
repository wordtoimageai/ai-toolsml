import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Scale, User, LogOut, Settings, Crown, Menu, X, ChevronDown } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useCompare } from "@/hooks/useCompare";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { favoriteCount } = useFavorites();
  const { compareCount } = useCompare();
  const { isAuthenticated, user, profile, isPro, isVendor, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link 
      to={to} 
      className={`relative text-sm font-medium transition-colors py-2 ${
        isActive(to) 
          ? 'text-foreground' 
          : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {children}
      {isActive(to) && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'nav-glass shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'Instrument Serif, serif' }}>
              ToolsML
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/browse">Browse Tools</NavLink>
            
            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 outline-none">
                Resources
                <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/blog" className="w-full">Blog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/tutorials" className="w-full">Tutorials</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/api-docs" className="w-full">API Documentation</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/changelog" className="w-full">Changelog</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Company Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 outline-none">
                Company
                <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/about" className="w-full">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/contact" className="w-full">Contact</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/advertise" className="w-full">Advertise</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/privacy" className="w-full">Privacy Policy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/terms" className="w-full">Terms of Service</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink to="/submit">Submit Tool</NavLink>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Favorites */}
            <Link 
              to="/favorites" 
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted/50"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden lg:inline">Favorites</span>
              {favoriteCount > 0 && (
                <Badge variant="secondary" className="h-5 min-w-5 px-1.5 text-xs">
                  {favoriteCount}
                </Badge>
              )}
            </Link>

            {/* Compare */}
            {compareCount > 0 && (
              <Link 
                to="/compare" 
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted/50"
              >
                <Scale className="w-4 h-4" />
                <span className="hidden lg:inline">Compare</span>
                <Badge variant="secondary" className="h-5 min-w-5 px-1.5 text-xs">
                  {compareCount}
                </Badge>
              </Link>
            )}

            <div className="h-5 w-px bg-border hidden sm:block" />

            <ThemeToggle />
            
            {/* Authentication Section */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative flex items-center gap-2 rounded-lg">
                    <div className="w-7 h-7 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">
                      {profile?.full_name?.split(' ')[0] || 'Account'}
                    </span>
                    {isPro && <Crown className="w-3.5 h-3.5 text-secondary" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <div className="font-medium">{profile?.full_name || 'User'}</div>
                    <div className="text-sm text-muted-foreground truncate">{user?.email}</div>
                    <div className="flex gap-1.5 mt-2">
                      {isPro && <Badge className="text-xs bg-gradient-secondary text-white border-0">Pro</Badge>}
                      {isVendor && <Badge variant="outline" className="text-xs">Vendor</Badge>}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {isVendor && (
                    <DropdownMenuItem asChild>
                      <Link to="/vendor-dashboard" className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Vendor Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/privacy-dashboard" className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Privacy Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="rounded-lg bg-gradient-primary hover:opacity-90 transition-opacity">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
            
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground rounded-lg hover:bg-muted/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="space-y-1">
              <Link to="/" className="block px-4 py-2.5 text-foreground hover:bg-muted/50 rounded-lg font-medium">Home</Link>
              <Link to="/browse" className="block px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">Browse Tools</Link>
              <Link to="/about" className="block px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">About</Link>
              <Link to="/blog" className="block px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">Blog</Link>
              <Link to="/submit" className="block px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">Submit Tool</Link>
              <Link to="/favorites" className="flex items-center justify-between px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Favorites
                </span>
                {favoriteCount > 0 && <Badge variant="secondary" className="text-xs">{favoriteCount}</Badge>}
              </Link>
              {compareCount > 0 && (
                <Link to="/compare" className="flex items-center justify-between px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">
                  <span className="flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    Compare
                  </span>
                  <Badge variant="secondary" className="text-xs">{compareCount}</Badge>
                </Link>
              )}
              
              <div className="border-t border-border/50 my-2" />
              
              {isAuthenticated ? (
                <>
                  {isVendor && (
                    <Link to="/vendor-dashboard" className="flex items-center gap-2 px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">
                      <Settings className="w-4 h-4" />
                      Vendor Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={signOut}
                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-destructive hover:bg-destructive/10 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/auth" className="block px-4 py-2.5 text-primary font-medium hover:bg-primary/10 rounded-lg">Sign In</Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
