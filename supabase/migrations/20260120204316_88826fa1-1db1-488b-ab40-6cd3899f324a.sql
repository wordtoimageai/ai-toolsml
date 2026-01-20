-- Fix analytics_events security issues

-- 1. Update RLS policy to require user_id = auth.uid() (no NULL allowed for authenticated users)
DROP POLICY IF EXISTS "Authenticated users can insert analytics events" ON public.analytics_events;
CREATE POLICY "Authenticated users can insert analytics events"
ON public.analytics_events FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

-- 2. Add CHECK constraint for valid event types
ALTER TABLE public.analytics_events
ADD CONSTRAINT valid_event_type 
CHECK (event_type IN ('page_view', 'tool_view', 'tool_visit', 'search', 'conversion', 'feature_usage'));