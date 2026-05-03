-- 1. Explicit deny for anonymous INSERT on affiliate_clicks
CREATE POLICY "Deny anonymous insert to affiliate_clicks"
ON public.affiliate_clicks
FOR INSERT
TO anon
WITH CHECK (false);

-- 2. Explicit deny policies on user_roles_audit for direct writes
-- (rows are only inserted via the SECURITY DEFINER trigger audit_user_roles_changes)
CREATE POLICY "Deny all direct inserts to user_roles_audit"
ON public.user_roles_audit
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "Deny all updates to user_roles_audit"
ON public.user_roles_audit
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny all deletes from user_roles_audit"
ON public.user_roles_audit
FOR DELETE
TO anon, authenticated
USING (false);