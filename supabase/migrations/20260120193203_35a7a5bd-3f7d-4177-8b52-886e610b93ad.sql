-- Explicitly deny anonymous SELECT access to sensitive tables (defense-in-depth)

-- PROFILES: contains PII
CREATE POLICY "Deny anonymous access to profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);

-- ANALYTICS_EVENTS: can contain tracking-related data
CREATE POLICY "Deny anonymous access to analytics_events"
ON public.analytics_events
FOR SELECT
TO anon
USING (false);
