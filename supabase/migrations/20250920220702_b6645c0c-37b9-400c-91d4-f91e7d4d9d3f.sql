-- Data Retention and Privacy Enhancement Migration

-- 1. Create function to clean up old analytics events (12+ months)
CREATE OR REPLACE FUNCTION public.cleanup_old_analytics_events()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Delete analytics events older than 12 months
  DELETE FROM analytics_events 
  WHERE created_at < NOW() - INTERVAL '12 months';
  
  -- Log the cleanup
  RAISE NOTICE 'Analytics cleanup completed at %', NOW();
END;
$$;

-- 2. Create function to clean up old affiliate clicks (6+ months)
CREATE OR REPLACE FUNCTION public.cleanup_old_affiliate_clicks()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Delete affiliate clicks older than 6 months
  DELETE FROM affiliate_clicks 
  WHERE clicked_at < NOW() - INTERVAL '6 months';
  
  -- Log the cleanup
  RAISE NOTICE 'Affiliate clicks cleanup completed at %', NOW();
END;
$$;

-- 3. Create function to anonymize old analytics data (3+ months)
CREATE OR REPLACE FUNCTION public.anonymize_old_analytics()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Anonymize analytics events older than 3 months by removing PII
  UPDATE analytics_events 
  SET 
    user_agent = NULL,
    ip_address = NULL,
    event_data = CASE 
      WHEN event_data IS NOT NULL THEN 
        jsonb_strip_nulls(event_data - 'user_agent' - 'ip_address' - 'referrer')
      ELSE NULL 
    END
  WHERE created_at < NOW() - INTERVAL '3 months'
    AND (user_agent IS NOT NULL OR ip_address IS NOT NULL);
  
  -- Log the anonymization
  RAISE NOTICE 'Analytics anonymization completed at %', NOW();
END;
$$;

-- 4. Add privacy preferences to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS privacy_preferences jsonb DEFAULT '{
  "analytics_consent": true,
  "marketing_consent": false,
  "data_retention_months": 12,
  "opt_out_analytics": false
}'::jsonb;

-- 5. Add constraints to prevent storing full user agents in new records
ALTER TABLE analytics_events ADD CONSTRAINT check_user_agent_length 
CHECK (user_agent IS NULL OR length(user_agent) <= 200);

ALTER TABLE affiliate_clicks ADD CONSTRAINT check_user_agent_length 
CHECK (user_agent IS NULL OR length(user_agent) <= 200);

-- 6. Create audit log table for security monitoring
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text NOT NULL,
  user_id uuid,
  ip_address inet,
  user_agent text,
  event_data jsonb,
  severity text DEFAULT 'info' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only allow service role to access audit logs
CREATE POLICY "Service role can manage audit logs" 
ON public.security_audit_log 
FOR ALL 
USING (auth.jwt() ->> 'role' = 'service_role');

-- 7. Create function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_event_type text,
  p_user_id uuid DEFAULT NULL,
  p_ip_address inet DEFAULT NULL,
  p_user_agent text DEFAULT NULL,
  p_event_data jsonb DEFAULT NULL,
  p_severity text DEFAULT 'info'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO security_audit_log (
    event_type, user_id, ip_address, user_agent, event_data, severity
  ) VALUES (
    p_event_type, p_user_id, p_ip_address, p_user_agent, p_event_data, p_severity
  );
END;
$$;

-- 8. Schedule cleanup jobs using pg_cron (if available)
-- Note: These will only work if pg_cron extension is enabled
SELECT cron.schedule(
  'cleanup-analytics-monthly',
  '0 2 1 * *', -- Run at 2 AM on the 1st of every month
  'SELECT public.cleanup_old_analytics_events();'
) WHERE EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron');

SELECT cron.schedule(
  'cleanup-affiliate-clicks-monthly', 
  '0 3 1 * *', -- Run at 3 AM on the 1st of every month
  'SELECT public.cleanup_old_affiliate_clicks();'
) WHERE EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron');

SELECT cron.schedule(
  'anonymize-analytics-weekly',
  '0 1 * * 0', -- Run at 1 AM every Sunday
  'SELECT public.anonymize_old_analytics();'
) WHERE EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron');

-- 9. Add indexes for better performance on cleanup queries
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_clicked_at ON affiliate_clicks(clicked_at);
CREATE INDEX IF NOT EXISTS idx_security_audit_log_created_at ON security_audit_log(created_at);

-- 10. Update RLS policies to respect privacy preferences
CREATE OR REPLACE FUNCTION public.user_allows_analytics(user_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (privacy_preferences->>'opt_out_analytics')::boolean = false,
    true -- Default to allowing analytics if no preference set
  )
  FROM profiles 
  WHERE id = user_uuid;
$$;