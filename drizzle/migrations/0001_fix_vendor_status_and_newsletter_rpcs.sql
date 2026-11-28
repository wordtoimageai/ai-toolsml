-- 1. Prevent vendors from self-approving or changing status on public.tool_submissions
DROP POLICY IF EXISTS "Vendors can insert their own submissions" ON public.tool_submissions;
CREATE POLICY "Vendors can insert their own submissions"
  ON public.tool_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = vendor_id
    AND public.has_role(auth.uid(), 'vendor'::public.app_role)
    AND status = 'pending'
  );

DROP POLICY IF EXISTS "Vendors can update their own submissions" ON public.tool_submissions;
CREATE POLICY "Vendors can update their pending submissions and admins can manage"
  ON public.tool_submissions
  FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR (
      auth.uid() = vendor_id
      AND public.has_role(auth.uid(), 'vendor'::public.app_role)
      AND status = 'pending'
    )
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR (
      auth.uid() = vendor_id
      AND public.has_role(auth.uid(), 'vendor'::public.app_role)
      AND status = 'pending'
    )
  );

CREATE OR REPLACE FUNCTION public.protect_tool_submission_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.role() = 'service_role' OR public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    IF NEW.status IS DISTINCT FROM 'pending' THEN
      RAISE EXCEPTION 'Tool submissions must start with pending status';
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF NEW.status IS DISTINCT FROM OLD.status OR NEW.status IS DISTINCT FROM 'pending' THEN
      RAISE EXCEPTION 'Only administrators can change submission status';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.protect_tool_submission_status() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS protect_tool_submission_status_trigger ON public.tool_submissions;
CREATE TRIGGER protect_tool_submission_status_trigger
  BEFORE INSERT OR UPDATE ON public.tool_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_tool_submission_status();

-- 2. Lock down public.check_newsletter_rate_limit(text) so anon/authenticated cannot probe recent signups
CREATE OR REPLACE FUNCTION public.check_newsletter_rate_limit(p_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  recent_count integer;
BEGIN
  IF auth.role() IS DISTINCT FROM 'service_role'
     AND NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;

  SELECT COUNT(*) INTO recent_count
  FROM public.newsletter_subscribers
  WHERE email = lower(trim(p_email))
    AND subscribed_at > now() - interval '5 minutes';

  IF recent_count > 0 THEN
    RETURN false;
  END IF;

  SELECT COUNT(*) INTO recent_count
  FROM public.newsletter_subscribers
  WHERE split_part(email, '@', 2) = split_part(lower(trim(p_email)), '@', 2)
    AND subscribed_at > now() - interval '1 hour';

  IF recent_count >= 5 THEN
    RETURN false;
  END IF;

  RETURN true;
END;
$function$;

REVOKE ALL ON FUNCTION public.check_newsletter_rate_limit(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_newsletter_rate_limit(text) TO service_role;
COMMENT ON FUNCTION public.check_newsletter_rate_limit(text) IS 'DEPRECATED for public use: restricted to service_role and admins to prevent recent newsletter signup enumeration.';

-- 3. Require authenticated ownership on public.unsubscribe_newsletter(text, text)
CREATE OR REPLACE FUNCTION public.unsubscribe_newsletter(p_email text, p_reason text DEFAULT NULL::text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  rows_affected integer;
  v_uid uuid := auth.uid();
  v_user_email text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required to unsubscribe' USING ERRCODE = '42501';
  END IF;

  SELECT lower(trim(email)) INTO v_user_email
  FROM auth.users
  WHERE id = v_uid;

  IF v_user_email IS NULL THEN
    RETURN false;
  END IF;

  IF p_email IS NOT NULL AND lower(trim(p_email)) IS DISTINCT FROM v_user_email THEN
    RETURN false;
  END IF;

  UPDATE public.newsletter_subscribers
  SET is_active = false,
      unsubscribed_at = now(),
      unsubscribe_reason = CASE
        WHEN p_reason IS NULL THEN NULL
        ELSE left(trim(p_reason), 200)
      END
  WHERE email = v_user_email
    AND is_active = true;

  GET DIAGNOSTICS rows_affected = ROW_COUNT;
  RETURN rows_affected > 0;
END;
$function$;

REVOKE ALL ON FUNCTION public.unsubscribe_newsletter(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.unsubscribe_newsletter(text, text) TO authenticated, service_role;