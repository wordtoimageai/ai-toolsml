
-- Create a public-safe view for approved tool submissions that excludes sensitive data
-- This view only exposes non-sensitive fields, hiding submission_data from public access

CREATE OR REPLACE VIEW public.tool_submissions_public
WITH (security_invoker=on) AS
  SELECT 
    id,
    tool_name,
    tool_description,
    tool_url,
    tool_logo_url,
    category,
    pricing_model,
    status,
    created_at,
    updated_at
    -- Explicitly excludes: vendor_id, submission_data
  FROM public.tool_submissions
  WHERE status = 'approved';

-- Grant SELECT on the view to authenticated and anon roles
GRANT SELECT ON public.tool_submissions_public TO authenticated;
GRANT SELECT ON public.tool_submissions_public TO anon;

-- Update the RLS policy for public viewing to deny direct table access
-- First drop the existing permissive policy that allows public viewing
DROP POLICY IF EXISTS "Public can view approved submissions" ON public.tool_submissions;

-- Create a restrictive policy that denies public SELECT entirely
-- This forces all public access through the secure view
CREATE POLICY "Deny public direct table access"
  ON public.tool_submissions
  FOR SELECT
  TO anon
  USING (false);

-- Keep authenticated users from directly accessing approved submissions
-- They should use the view instead
-- Note: Vendors can still see their own submissions via existing policy

COMMENT ON VIEW public.tool_submissions_public IS 'Public-safe view of approved tool submissions. Excludes sensitive vendor_id and submission_data fields.';
