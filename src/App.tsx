import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToolsGridSkeleton } from "./components/LoadingStates";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CompareBar from "./components/CompareBar";
import PrivacyConsentBanner from "./components/PrivacyConsentBanner";
import PreconnectLinks from "./components/PreconnectLinks";
import PrerenderReady from "./components/PrerenderReady";
import PrerenderMetaTags from "./components/PrerenderMetaTags";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const ToolDetail = lazy(() => import("./pages/ToolDetail"));
const Category = lazy(() => import("./pages/Category"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Compare = lazy(() => import("./pages/Compare"));
const Submit = lazy(() => import("./pages/Submit"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Tutorials = lazy(() => import("./pages/Tutorials"));
const ApiDocs = lazy(() => import("./pages/ApiDocs"));
const Changelog = lazy(() => import("./pages/Changelog"));
const Advertise = lazy(() => import("./pages/Advertise"));
const Tag = lazy(() => import("./pages/Tag"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ToolComparison = lazy(() => import("./pages/ToolComparison"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const VendorDashboard = lazy(() => import("./components/VendorDashboard"));
const UserPrivacyDashboard = lazy(() => import("./components/UserPrivacyDashboard"));
const AffiliateAnalyticsDashboard = lazy(() => import("./components/AffiliateAnalyticsDashboard").then(m => ({ default: m.AffiliateAnalyticsDashboard })));
const SiteMap = lazy(() => import("./pages/SiteMap"));
const BrowseTools = lazy(() => import("./pages/BrowseTools"));

const queryClient = new QueryClient();

const PageSkeleton = () => (
  <div className="min-h-screen bg-background">
    <ToolsGridSkeleton />
  </div>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <PreconnectLinks />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <PrerenderReady />
              <PrerenderMetaTags />
              <CompareBar />
              <PrivacyConsentBanner />
              <Suspense fallback={<PageSkeleton />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/tool/:id" element={<ToolDetail />} />
                  <Route path="/category/:category" element={<Category />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/submit" element={<Submit />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/api-docs" element={<ApiDocs />} />
                  <Route path="/changelog" element={<Changelog />} />
                  <Route path="/tools" element={<Index />} />
                  <Route path="/browse" element={<BrowseTools />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route 
                    path="/vendor-dashboard" 
                    element={
                      <ProtectedRoute requireVendor>
                        <VendorDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/privacy-dashboard" 
                    element={
                      <ProtectedRoute>
                        <UserPrivacyDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/affiliate-analytics" 
                    element={
                      <ProtectedRoute requireAdmin>
                        <AffiliateAnalyticsDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/advertise" element={<Advertise />} />
                  <Route path="/tag/:tag" element={<Tag />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/comparison" element={<ToolComparison />} />
                  <Route path="/site-map" element={<SiteMap />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
