-- 1) Remove permissive newsletter UPDATE policy (USING true). 
-- Unsubscribes are routed through public.unsubscribe_newsletter() SECURITY DEFINER RPC.
DROP POLICY IF EXISTS "Anyone can unsubscribe own email" ON public.newsletter_subscribers;

-- 2) Tighten tool_submissions INSERT/UPDATE to require vendor role
DROP POLICY IF EXISTS "Vendors can insert their own submissions" ON public.tool_submissions;
DROP POLICY IF EXISTS "Vendors can update their own submissions" ON public.tool_submissions;

CREATE POLICY "Vendors can insert their own submissions"
  ON public.tool_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = vendor_id
    AND public.has_role(auth.uid(), 'vendor'::public.app_role)
  );

CREATE POLICY "Vendors can update their own submissions"
  ON public.tool_submissions
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = vendor_id
    AND public.has_role(auth.uid(), 'vendor'::public.app_role)
  )
  WITH CHECK (
    auth.uid() = vendor_id
    AND public.has_role(auth.uid(), 'vendor'::public.app_role)
  );

-- Also restrict SELECT to authenticated only (already vendor-scoped via auth.uid())
DROP POLICY IF EXISTS "Vendors can view their own submissions" ON public.tool_submissions;
CREATE POLICY "Vendors can view their own submissions"
  ON public.tool_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = vendor_id);

-- 3) Lock down SECURITY DEFINER trigger/helper functions from PostgREST exposure.
-- Trigger functions should never be called via the API.
REVOKE ALL ON FUNCTION public.protect_is_vendor() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.sync_vendor_role_insert() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.sync_vendor_role_delete() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.protect_subscription_fields() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.nullify_analytics_ip() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.audit_user_roles_changes() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- has_role and get_user_roles: keep callable by authenticated (used in RLS policies via SQL),
-- but block anon to prevent role probing.
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

REVOKE ALL ON FUNCTION public.get_user_roles(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_user_roles(uuid) TO authenticated;

-- unsubscribe_newsletter and check_newsletter_rate_limit must remain callable by anon
-- (newsletter signup/unsubscribe pages are public). Ensure grants are explicit.
REVOKE ALL ON FUNCTION public.unsubscribe_newsletter(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.unsubscribe_newsletter(text, text) TO anon, authenticated;

REVOKE ALL ON FUNCTION public.check_newsletter_rate_limit(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_newsletter_rate_limit(text) TO anon, authenticated;