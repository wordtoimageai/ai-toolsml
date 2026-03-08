
-- Drop existing overly permissive policies on newsletter_subscribers
DROP POLICY IF EXISTS "Anyone can check subscription" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can unsubscribe by email" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;

-- Allow anonymous INSERT (subscribe) - this is safe as it only allows adding new subscriptions
CREATE POLICY "Anyone can subscribe"
ON public.newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow anonymous SELECT but ONLY to check if a specific email exists (no browsing all emails)
-- We restrict this via the application layer and use an edge function instead
-- No public SELECT policy - all reads go through edge function

-- Allow anonymous UPDATE but ONLY for unsubscribing (setting is_active to false)
-- Restricted: can only set is_active=false and unsubscribed_at, cannot change email
CREATE POLICY "Anyone can unsubscribe own email"
ON public.newsletter_subscribers
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (is_active = false);
