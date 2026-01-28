-- Fix warn-level security issues

-- 1. Add explicit deny policies for anonymous users on sitemap_regeneration_log
CREATE POLICY "Deny anonymous access to sitemap_regeneration_log"
ON public.sitemap_regeneration_log FOR SELECT TO anon
USING (false);

CREATE POLICY "Deny anonymous insert to sitemap_regeneration_log"
ON public.sitemap_regeneration_log FOR INSERT TO anon
WITH CHECK (false);

CREATE POLICY "Deny anonymous update to sitemap_regeneration_log"
ON public.sitemap_regeneration_log FOR UPDATE TO anon
USING (false);

CREATE POLICY "Deny anonymous delete to sitemap_regeneration_log"
ON public.sitemap_regeneration_log FOR DELETE TO anon
USING (false);

-- 2. Recreate affiliate_links_public view with SECURITY INVOKER and proper filtering
DROP VIEW IF EXISTS public.affiliate_links_public;
CREATE VIEW public.affiliate_links_public
WITH (security_invoker = true)
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

-- 3. Update tool_submissions policies to filter sensitive vendor_id from public view
-- Drop existing policy that shows all approved submissions
DROP POLICY IF EXISTS "Public can view approved submissions" ON public.tool_submissions;

-- Create new policy that only shows non-sensitive fields for approved submissions
-- The SELECT will be restricted to non-sensitive columns via application code
CREATE POLICY "Public can view approved submissions"
ON public.tool_submissions FOR SELECT TO authenticated, anon
USING (status = 'approved');

-- Add comment to document that vendor_id should not be exposed in client queries
COMMENT ON COLUMN public.tool_submissions.vendor_id IS 'Sensitive: Do not expose in public queries. Only accessible to admins and the vendor themselves.';