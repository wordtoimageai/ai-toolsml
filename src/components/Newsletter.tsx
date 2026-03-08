import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string()
  .trim()
  .min(1, "Please enter your email")
  .email("Please enter a valid email address")
  .max(255, "Email must be less than 255 characters")
  .refine(
    (email) => !email.endsWith(".test") && !email.endsWith(".invalid"),
    "Please use a real email address"
  );

const RATE_LIMIT_COOLDOWN_MS = 30_000; // 30 seconds client-side cooldown

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const lastSubmitRef = useRef<number>(0);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Client-side validation
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setValidationError(result.error.errors[0].message);
      return;
    }

    // Client-side rate limit
    const now = Date.now();
    if (now - lastSubmitRef.current < RATE_LIMIT_COOLDOWN_MS) {
      const secondsLeft = Math.ceil((RATE_LIMIT_COOLDOWN_MS - (now - lastSubmitRef.current)) / 1000);
      setValidationError(`Please wait ${secondsLeft}s before trying again.`);
      return;
    }

    setIsSubscribing(true);
    lastSubmitRef.current = now;

    try {
      // Server-side rate limit check
      const { data: allowed, error: rlError } = await (supabase as any)
        .rpc('check_newsletter_rate_limit', { p_email: result.data });

      if (rlError) throw rlError;

      if (!allowed) {
        setValidationError("Too many signup attempts. Please try again later.");
        setIsSubscribing(false);
        return;
      }

      const { error } = await (supabase as any)
        .from('newsletter_subscribers')
        .upsert(
          { email: result.data.toLowerCase(), is_active: true, unsubscribed_at: null },
          { onConflict: 'email' }
        );

      if (error) throw error;

      toast({
        title: "Successfully subscribed!",
        description: `Thank you for subscribing with: ${result.data}. You can unsubscribe at any time from the link in our footer.`,
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
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setValidationError(null); }}
              className={`h-12 ${validationError ? 'border-destructive' : ''}`}
              required
            />
            {validationError && (
              <p className="text-destructive text-sm mt-1 text-left">{validationError}</p>
            )}
          </div>
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
