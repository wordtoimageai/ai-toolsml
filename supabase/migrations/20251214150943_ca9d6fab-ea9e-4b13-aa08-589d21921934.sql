-- Explicitly set the view to use SECURITY INVOKER (the default, but being explicit)
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

-- Grant access to the view
GRANT SELECT ON public.affiliate_links_public TO anon, authenticated;