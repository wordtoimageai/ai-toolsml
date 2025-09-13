-- Add secure SELECT policies for analytics_events table
-- This fixes the security issue where analytics data could potentially be accessed by anyone

-- Policy 1: Allow users to view only their own analytics events
CREATE POLICY "Users can view their own analytics events" 
ON analytics_events 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy 2: Allow viewing anonymous analytics events only by service role
-- (Anonymous events have user_id = NULL and should only be accessible by admins/service)
CREATE POLICY "Service role can view anonymous analytics events" 
ON analytics_events 
FOR SELECT 
USING (
  auth.jwt() ->> 'role' = 'service_role' 
  AND user_id IS NULL
);

-- Optional: Create a security definer function for admin analytics access
-- This allows controlled access to analytics data for legitimate business purposes
CREATE OR REPLACE FUNCTION public.get_analytics_summary(
  start_date timestamp with time zone DEFAULT now() - interval '30 days',
  end_date timestamp with time zone DEFAULT now()
)
RETURNS TABLE(
  event_type text,
  event_count bigint,
  unique_users bigint
) 
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    ae.event_type,
    COUNT(*) as event_count,
    COUNT(DISTINCT ae.user_id) as unique_users
  FROM analytics_events ae
  WHERE ae.created_at >= start_date 
    AND ae.created_at <= end_date
  GROUP BY ae.event_type
  ORDER BY event_count DESC;
$$;

-- Grant execute permission on the analytics function to authenticated users
-- This allows the app to show aggregated analytics without exposing individual user data
GRANT EXECUTE ON FUNCTION public.get_analytics_summary TO authenticated;