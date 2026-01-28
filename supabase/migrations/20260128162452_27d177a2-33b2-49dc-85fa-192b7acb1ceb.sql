-- Fix: Restrict public access to affiliate_links base table to protect commission_rate
-- The affiliate_links_public view already excludes commission_rate and should be used for public access

-- Drop the existing policy that exposes commission_rate to public
DROP POLICY IF EXISTS "Public can view active affiliate links" ON public.affiliate_links;

-- Create a restrictive policy that denies direct public SELECT access
-- This forces public access through the affiliate_links_public view
CREATE POLICY "Deny public direct table access"
  ON public.affiliate_links
  FOR SELECT
  TO anon
  USING (false);

-- Ensure the public view has proper grants
GRANT SELECT ON public.affiliate_links_public TO anon;
GRANT SELECT ON public.affiliate_links_public TO authenticated;

-- Add comment explaining the security design
COMMENT ON TABLE public.affiliate_links IS 'Base affiliate links table with sensitive commission_rate. Public access should use affiliate_links_public view.';
COMMENT ON VIEW public.affiliate_links_public IS 'Public-safe view of active affiliate links. Excludes commission_rate for business confidentiality.';