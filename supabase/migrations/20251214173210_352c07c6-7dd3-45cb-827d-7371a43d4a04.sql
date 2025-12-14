-- Fix Issue 1: Analytics events INSERT policy - require authenticated users to use their own user_id
DROP POLICY IF EXISTS "Authenticated users can insert analytics events" ON public.analytics_events;

CREATE POLICY "Authenticated users can insert analytics events"
ON public.analytics_events
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Fix Issue 2: Restrict affiliate_links base table to admins only
-- Remove the public SELECT policy that exposes commission_rate
DROP POLICY IF EXISTS "Anyone can view active affiliate links" ON public.affiliate_links;

-- Create admin-only policy for base table
CREATE POLICY "Admins can view affiliate links"
ON public.affiliate_links
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));