-- Fix migration: avoid nested $$ inside EXECUTE

-- 1) Recreate the view explicitly as SECURITY INVOKER (no definer privileges)
CREATE OR REPLACE VIEW public.affiliate_links_public
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

-- 2) Ensure RLS is enabled on the base table
ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;

-- 3) Add an explicit public SELECT policy on active rows (idempotent)
DO $do$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'affiliate_links'
      AND policyname = 'Public can view active affiliate links'
  ) THEN
    EXECUTE 'CREATE POLICY "Public can view active affiliate links" ON public.affiliate_links FOR SELECT USING (is_active = true)';
  END IF;
END
$do$;

-- 4) Column-level privileges: allow anon/authenticated to read only non-sensitive columns
REVOKE ALL ON TABLE public.affiliate_links FROM anon, authenticated;
GRANT SELECT (id, tool_id, tool_name, original_url, affiliate_url, is_active, created_at, updated_at)
  ON TABLE public.affiliate_links TO anon, authenticated;

-- 5) Allow anon/authenticated to read the public view
GRANT SELECT ON public.affiliate_links_public TO anon, authenticated;
