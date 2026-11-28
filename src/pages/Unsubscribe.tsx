import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHelmet } from "@/components/SEOHelmet";
import { MailX, CheckCircle, ArrowLeft, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Unsubscribe = () => {
  const { user, loading: authLoading } = useAuth();
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const { toast } = useToast();

  const accountEmail = user?.email?.trim().toLowerCase() ?? "";
  const isEmailVerified = Boolean(user?.email_confirmed_at);

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountEmail) {
      toast({
        title: "Sign in required",
        description: "Please sign in with the subscribed email address to unsubscribe.",
        variant: "destructive",
      });
      return;
    }

    if (!isEmailVerified) {
      toast({
        title: "Email verification required",
        description: "Please verify your email address before unsubscribing from the newsletter.",
        variant: "destructive",
      });
      return;
    }

    setIsUnsubscribing(true);
    
    try {
      const { data: success, error } = await supabase.rpc('unsubscribe_newsletter', {
        p_email: accountEmail,
        p_reason: reason ?? undefined,
      });

      if (error) throw error;

      if (!success) {
        toast({
          title: "Email not found",
          description: "This email is not subscribed to our newsletter.",
          variant: "destructive",
        });
        return;
      }

      setIsUnsubscribed(true);
      toast({
        title: "Successfully unsubscribed",
        description: "You will no longer receive newsletter emails.",
      });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "";
      toast({
        title: errMsg.toLowerCase().includes("verified email") ? "Email verification required" : "Something went wrong",
        description: errMsg.toLowerCase().includes("verified email")
          ? "Please verify your email address before unsubscribing from the newsletter."
          : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUnsubscribing(false);
    }
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
                      {user
                        ? "Confirm below to remove your account email from our weekly AI tools newsletter."
                        : "Sign in with your subscribed email address to verify and cancel your newsletter subscription."}
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
                ) : authLoading ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Checking your account...
                  </p>
                ) : !user ? (
                  <div className="space-y-4">
                    <Link to="/auth">
                      <Button className="w-full">
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In to Unsubscribe
                      </Button>
                    </Link>
                    <p className="text-xs text-muted-foreground text-center">
                      Don't have an account? Please <Link to="/contact" className="text-primary hover:underline">contact us</Link> and we'll remove your email for you.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleUnsubscribe} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="sr-only">Email address</label>
                      <Input
                        id="email"
                        type="email"
                        value={accountEmail}
                        readOnly
                        className="w-full bg-muted"
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      variant="destructive"
                      disabled={isUnsubscribing || !isEmailVerified}
                      className="w-full"
                    >
                      {isUnsubscribing ? "Unsubscribing..." : "Unsubscribe"}
                    </Button>
                    {!isEmailVerified && (
                      <p className="text-xs text-destructive text-center">
                        Please verify your email address via the confirmation link we sent you before unsubscribing.
                      </p>
                    )}
                    
                    <p className="text-xs text-muted-foreground text-center">
                      If you're having trouble, please <Link to="/contact" className="text-primary hover:underline">contact us</Link> for assistance.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
            
            {!isUnsubscribed && user && (
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p className="mb-2">We'd love to hear why you're leaving:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button variant={reason === 'too-many' ? 'default' : 'outline'} size="sm" className="text-xs" onClick={() => setReason('too-many')}>Too many emails</Button>
                  <Button variant={reason === 'not-relevant' ? 'default' : 'outline'} size="sm" className="text-xs" onClick={() => setReason('not-relevant')}>Not relevant</Button>
                  <Button variant={reason === 'other' ? 'default' : 'outline'} size="sm" className="text-xs" onClick={() => setReason('other')}>Other</Button>
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
