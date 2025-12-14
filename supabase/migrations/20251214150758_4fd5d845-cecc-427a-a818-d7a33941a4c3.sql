-- Create a secure view for affiliate_links that excludes commission_rate
CREATE OR REPLACE VIEW public.affiliate_links_public AS
SELECT 
  id,
  tool_id,
  tool_name,
  original_url,
  affiliate_url,
  is_active,
  created_at,
  updated_at
FROM public.affiliate_links
WHERE is_active = true;

-- Grant access to the view
GRANT SELECT ON public.affiliate_links_public TO anon, authenticated;

-- Add index on session_id for anonymous rate limiting queries
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_session_rate_limit 
ON public.affiliate_clicks(affiliate_link_id, session_id, created_at DESC)
WHERE user_id IS NULL;