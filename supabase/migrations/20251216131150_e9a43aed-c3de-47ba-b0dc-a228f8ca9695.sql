-- Drop the existing view and recreate with SECURITY DEFINER
-- This allows public access to the view while keeping base table admin-only
DROP VIEW IF EXISTS public.affiliate_links_public;

CREATE VIEW public.affiliate_links_public
WITH (security_invoker = false)
AS
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

-- Grant access to the view for public use
GRANT SELECT ON public.affiliate_links_public TO anon, authenticated;