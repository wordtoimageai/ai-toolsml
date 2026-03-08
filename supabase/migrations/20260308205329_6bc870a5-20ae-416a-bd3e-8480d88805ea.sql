
-- Create a secure function for unsubscribing that doesn't expose email data
CREATE OR REPLACE FUNCTION public.unsubscribe_newsletter(p_email text, p_reason text DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rows_affected integer;
BEGIN
  UPDATE newsletter_subscribers
  SET is_active = false,
      unsubscribed_at = now(),
      unsubscribe_reason = p_reason
  WHERE email = lower(trim(p_email))
    AND is_active = true;
  
  GET DIAGNOSTICS rows_affected = ROW_COUNT;
  RETURN rows_affected > 0;
END;
$$;
