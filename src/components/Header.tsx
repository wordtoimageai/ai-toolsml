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
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/browse">Browse Tools</NavLink>
            
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 outline-none">
                Categories
                <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 grid grid-cols-1 gap-0">
                <DropdownMenuItem asChild>
                  <Link to="/category/writing" className="w-full">✍️ Writing Tools</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/design" className="w-full">🎨 Design Tools</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/video" className="w-full">🎬 Video Tools</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/coding" className="w-full">💻 Coding Tools</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/audio" className="w-full">🎵 Audio Tools</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/marketing" className="w-full">📈 Marketing Tools</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/productivity" className="w-full">⚡ Productivity Tools</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/seo" className="w-full">🔍 SEO Tools</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/automation" className="w-full">🤖 Automation Tools</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/data" className="w-full">📊 Data Tools</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/research" className="w-full">🔬 Research Tools</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/sales" className="w-full">💰 Sales Tools</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/social" className="w-full">📱 Social Media Tools</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in max-h-[80vh] overflow-y-auto">
            <div className="space-y-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-foreground hover:bg-muted/50 rounded-lg font-medium">Home</Link>
              <Link to="/browse" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">Browse Tools</Link>
              
              {/* Categories Section */}
              <div className="px-4 pt-3 pb-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Categories</span>
              </div>
              <div className="grid grid-cols-2 gap-1 px-2">
                <Link to="/category/writing" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg">✍️ Writing</Link>
                <Link to="/category/design" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg">🎨 Design</Link>
                <Link to="/category/video" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg">🎬 Video</Link>
                <Link to="/category/coding" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg">💻 Coding</Link>
                <Link to="/category/audio" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg">🎵 Audio</Link>
                <Link to="/category/marketing" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg">📈 Marketing</Link>
                <Link to="/category/productivity" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg">⚡ Productivity</Link>
                <Link to="/category/seo" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg">🔍 SEO</Link>
                <Link to="/category/automation" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg">🤖 Automation</Link>
                <Link to="/category/data" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg">📊 Data</Link>
                <Link to="/category/research" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg">🔬 Research</Link>
                <Link to="/category/sales" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg">💰 Sales</Link>
                <Link to="/category/social" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-sm text-muted-foreground hover:bg-muted/50 rounded-lg col-span-2">📱 Social Media</Link>
              </div>

              <div className="border-t border-border/50 my-2" />

              {/* Resources Section */}
              <div className="px-4 pt-2 pb-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resources</span>
              </div>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">Blog</Link>
              <Link to="/tutorials" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">Tutorials</Link>
              <Link to="/api-docs" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">API Docs</Link>
              <Link to="/changelog" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">Changelog</Link>

              <div className="border-t border-border/50 my-2" />

              {/* Company Section */}
              <div className="px-4 pt-2 pb-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</span>
              </div>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">About Us</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">Contact</Link>
              <Link to="/advertise" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">Advertise</Link>
              <Link to="/submit" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">Submit Tool</Link>

              <div className="border-t border-border/50 my-2" />

              {/* User Actions */}
              <Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Favorites
                </span>
                {favoriteCount > 0 && <Badge variant="secondary" className="text-xs">{favoriteCount}</Badge>}
              </Link>
              {compareCount > 0 && (
                <Link to="/compare" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">
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
                    <Link to="/vendor-dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-muted-foreground hover:bg-muted/50 rounded-lg">
                      <Settings className="w-4 h-4" />
                      Vendor Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => { signOut(); setIsMenuOpen(false); }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-destructive hover:bg-destructive/10 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-primary font-medium hover:bg-primary/10 rounded-lg">Sign In</Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
