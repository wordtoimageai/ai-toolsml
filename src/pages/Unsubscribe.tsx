import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHelmet } from "@/components/SEOHelmet";
import { MailX, CheckCircle, ArrowLeft } from "lucide-react";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const { toast } = useToast();

  // Pre-fill email from URL parameter if provided
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleUnsubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    setIsUnsubscribing(true);
    
    // Simulate unsubscribe process
    setTimeout(() => {
      setIsUnsubscribing(false);
      setIsUnsubscribed(true);
      toast({
        title: "Successfully unsubscribed",
        description: "You will no longer receive newsletter emails.",
      });
    }, 1500);
  };

  return (
    <>
      <SEOHelmet
        title="Unsubscribe from Newsletter | ToolsML"
        description="Unsubscribe from ToolsML newsletter. Manage your email preferences and stop receiving our weekly AI tools updates."
        keywords="unsubscribe, newsletter, email preferences, ToolsML"
        url="/unsubscribe"
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="py-20">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                {isUnsubscribed ? (
                  <>
                    <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-2xl">You're Unsubscribed</CardTitle>
                    <CardDescription>
                      We're sorry to see you go! You've been successfully removed from our newsletter.
                    </CardDescription>
                  </>
                ) : (
                  <>
                    <div className="mx-auto mb-4 w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <MailX className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-2xl">Unsubscribe from Newsletter</CardTitle>
                    <CardDescription>
                      Enter your email address to unsubscribe from our weekly AI tools newsletter.
                    </CardDescription>
                  </>
                )}
              </CardHeader>
              
              <CardContent>
                {isUnsubscribed ? (
                  <div className="space-y-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Changed your mind? You can always resubscribe from our homepage.
                    </p>
                    <Link to="/">
                      <Button className="w-full">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Homepage
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleUnsubscribe} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="sr-only">Email address</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      variant="destructive"
                      disabled={isUnsubscribing}
                      className="w-full"
                    >
                      {isUnsubscribing ? "Unsubscribing..." : "Unsubscribe"}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      If you're having trouble, please <Link to="/contact" className="text-primary hover:underline">contact us</Link> for assistance.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
            
            {/* Feedback section */}
            {!isUnsubscribed && (
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p className="mb-2">We'd love to hear why you're leaving:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button variant="outline" size="sm" className="text-xs">Too many emails</Button>
                  <Button variant="outline" size="sm" className="text-xs">Not relevant</Button>
                  <Button variant="outline" size="sm" className="text-xs">Other</Button>
                </div>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Unsubscribe;
