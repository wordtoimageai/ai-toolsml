-- Drop the existing permissive INSERT policy
DROP POLICY IF EXISTS "Authenticated users can insert analytics events" ON public.analytics_events;

-- Create a new policy that enforces user_id matches the authenticated user or is null
CREATE POLICY "Authenticated users can insert analytics events"
ON public.analytics_events
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid() OR user_id IS NULL);