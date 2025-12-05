-- Drop the existing open INSERT policy
DROP POLICY IF EXISTS "Anyone can insert affiliate clicks" ON public.affiliate_clicks;

-- Create a new policy that restricts inserts to authenticated users only
CREATE POLICY "Authenticated users can insert affiliate clicks"
ON public.affiliate_clicks
FOR INSERT
TO authenticated
WITH CHECK (true);