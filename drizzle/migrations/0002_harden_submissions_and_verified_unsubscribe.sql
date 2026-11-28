-- 1. Require active vendor role to view own tool_submissions (immediate revocation when vendor role is removed)
DROP POLICY IF EXISTS "Vendors can view their own submissions" ON public.tool_submissions;
DROP POLICY IF EXISTS "Admins can view all tool submissions" ON public.tool_submissions;
CREATE POLICY "Active vendors view own and admins view all submissions"
  ON public.tool_submissions
  FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR (
      auth.uid() = vendor_id
      AND public.has_role(auth.uid(), 'vendor'::public.app_role)
    )
  );

-- 2. Prevent administrators from approving or reviewing their own tool_submissions
DROP POLICY IF EXISTS "Vendors can update their pending submissions and admins can man" ON public.tool_submissions;
DROP POLICY IF EXISTS "Vendors can update their pending submissions and admins can manage" ON public.tool_submissions;
CREATE POLICY "Vendors edit own pending and admins review others"
  ON public.tool_submissions
  FOR UPDATE
  TO authenticated
  USING (
    (
      public.has_role(auth.uid(), 'admin'::public.app_role)
      AND vendor_id IS DISTINCT FROM auth.uid()
    )
    OR (
      auth.uid() = vendor_id
      AND public.has_role(auth.uid(), 'vendor'::public.app_role)
      AND status = 'pending'
    )
  )
  WITH CHECK (
    (
      public.has_role(auth.uid(), 'admin'::public.app_role)
      AND vendor_id IS DISTINCT FROM auth.uid()
    )
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
SET search_path TO 'public'
AS $$
BEGIN
  IF auth.role() = 'service_role' THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    IF NEW.status IS DISTINCT FROM 'pending' THEN
      RAISE EXCEPTION 'Tool submissions must start with pending status' USING ERRCODE = '42501';
    END IF;
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' THEN
    IF NEW.vendor_id IS DISTINCT FROM OLD.vendor_id THEN
      RAISE EXCEPTION 'Submission owner cannot be changed' USING ERRCODE = '42501';
    END IF;

    IF NEW.status IS DISTINCT FROM OLD.status THEN
      IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
        RAISE EXCEPTION 'Only administrators can change submission status' USING ERRCODE = '42501';
      END IF;
      IF OLD.vendor_id IS NOT DISTINCT FROM auth.uid() OR NEW.vendor_id IS NOT DISTINCT FROM auth.uid() THEN
        RAISE EXCEPTION 'Administrators cannot review or approve their own tool submissions' USING ERRCODE = '42501';
      END IF;
      RETURN NEW;
    END IF;

    IF NOT (
      public.has_role(auth.uid(), 'admin'::public.app_role)
      AND OLD.vendor_id IS DISTINCT FROM auth.uid()
    ) THEN
      IF OLD.status IS DISTINCT FROM 'pending' OR NEW.status IS DISTINCT FROM 'pending' THEN
        RAISE EXCEPTION 'Only pending submissions can be edited by their submitter' USING ERRCODE = '42501';
      END IF;
    END IF;

    RETURN NEW;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.protect_tool_submission_status() FROM PUBLIC, anon, authenticated;

-- 3. Require a verified email address to unsubscribe from the newsletter
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
  v_email_confirmed_at timestamptz;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required to unsubscribe' USING ERRCODE = '42501';
  END IF;

  SELECT lower(trim(email)), email_confirmed_at
  INTO v_user_email, v_email_confirmed_at
  FROM auth.users
  WHERE id = v_uid;

  IF v_user_email IS NULL OR v_email_confirmed_at IS NULL THEN
    RAISE EXCEPTION 'Verified email required to unsubscribe' USING ERRCODE = '42501';
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