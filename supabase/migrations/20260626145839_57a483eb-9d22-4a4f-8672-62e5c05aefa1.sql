CREATE OR REPLACE FUNCTION public.unsubscribe_newsletter(p_email text, p_reason text DEFAULT NULL::text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  rows_affected integer;
  recent_unsubs integer;
  v_uid uuid := auth.uid();
  v_user_email text;
  v_normalized_email text := lower(trim(p_email));
BEGIN
  -- If authenticated, require the email to match the authenticated user's email
  IF v_uid IS NOT NULL THEN
    SELECT lower(email) INTO v_user_email FROM auth.users WHERE id = v_uid;
    IF v_user_email IS DISTINCT FROM v_normalized_email THEN
      RETURN false;
    END IF;
  END IF;

  -- Global rate limit: block mass-unsubscribe attacks
  -- Max 3 successful unsubscribes within any 5-minute window
  SELECT COUNT(*) INTO recent_unsubs
  FROM public.newsletter_subscribers
  WHERE unsubscribed_at IS NOT NULL
    AND unsubscribed_at > now() - interval '5 minutes';

  IF recent_unsubs >= 3 THEN
    RETURN false;
  END IF;

  UPDATE newsletter_subscribers
  SET is_active = false,
      unsubscribed_at = now(),
      unsubscribe_reason = p_reason
  WHERE email = v_normalized_email
    AND is_active = true;

  GET DIAGNOSTICS rows_affected = ROW_COUNT;
  RETURN rows_affected > 0;
END;
$function$;