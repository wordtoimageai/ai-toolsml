import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      
      // Generate unsubscribe link with encoded email
      const unsubscribeUrl = `/unsubscribe?email=${encodeURIComponent(email)}`;
      
      toast({
        title: "Successfully subscribed!",
        description: (
          <div className="space-y-2">
            <p>Thank you for subscribing with: {email}</p>
            <p className="text-xs text-muted-foreground">
              You can <Link to={unsubscribeUrl} className="underline hover:text-primary">unsubscribe</Link> at any time.
            </p>
          </div>
        ),
      });
      setEmail("");
    }, 1500);
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
        
        {/* Unsubscribe link */}
        <p className="mt-4 text-xs text-muted-foreground">
          We respect your privacy. <Link to="/unsubscribe" className="underline hover:text-primary">Unsubscribe</Link> at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;