import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    try {
      const { error } = await (supabase as any)
        .from('newsletter_subscribers')
        .upsert(
          { email: email.trim().toLowerCase(), is_active: true, unsubscribed_at: null },
          { onConflict: 'email' }
        );

      if (error) throw error;

      const unsubscribeUrl = `/unsubscribe?email=${encodeURIComponent(email)}`;
      
      toast({
        title: "Successfully subscribed!",
        description: `Thank you for subscribing with: ${email}. You can unsubscribe at any time from the link in our footer.`,
      });
      setEmail("");
    } catch (error: unknown) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Get weekly updates on the latest AI tools and trends delivered to your inbox
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-scale-in">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12"
            required
          />
          <Button
            type="submit"
            disabled={isSubscribing}
            className="btn-gradient h-12 px-8 whitespace-nowrap"
          >
            {isSubscribing ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        
        <p className="mt-4 text-xs text-muted-foreground">
          We respect your privacy. <Link to="/unsubscribe" className="underline hover:text-primary">Unsubscribe</Link> at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
