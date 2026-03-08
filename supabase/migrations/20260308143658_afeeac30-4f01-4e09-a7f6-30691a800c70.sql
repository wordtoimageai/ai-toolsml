
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  unsubscribe_reason TEXT
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe (insert)
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to update their own subscription by email (for unsubscribe)
CREATE POLICY "Anyone can unsubscribe by email" ON public.newsletter_subscribers
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Allow reading to check subscription status
CREATE POLICY "Anyone can check subscription" ON public.newsletter_subscribers
  FOR SELECT TO anon, authenticated
  USING (true);
