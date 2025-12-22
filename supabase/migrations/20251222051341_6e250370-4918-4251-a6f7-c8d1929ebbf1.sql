-- Fix: Update affiliate_links_public view to use SECURITY INVOKER mode
-- This ensures the view respects RLS policies without elevated privileges

DROP VIEW IF EXISTS public.affiliate_links_public;

CREATE VIEW public.affiliate_links_public 
WITH (security_invoker = true) AS
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

-- Grant select on the new view to authenticated and anon roles
GRANT SELECT ON public.affiliate_links_public TO authenticated;
GRANT SELECT ON public.affiliate_links_public TO anon;