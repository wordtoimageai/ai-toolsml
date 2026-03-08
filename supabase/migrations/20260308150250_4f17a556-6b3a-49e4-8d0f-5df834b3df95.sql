CREATE OR REPLACE FUNCTION public.check_newsletter_rate_limit(p_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  recent_count integer;
BEGIN
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
$$;