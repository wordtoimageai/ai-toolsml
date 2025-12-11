-- Create composite index for rate limiting query optimization
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_rate_limit 
ON public.affiliate_clicks(affiliate_link_id, user_id, created_at DESC);