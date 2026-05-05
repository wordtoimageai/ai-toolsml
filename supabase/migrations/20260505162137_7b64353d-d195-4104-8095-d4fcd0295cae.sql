
-- Create SECURITY DEFINER RPC for affiliate click tracking with server-side rate limiting
CREATE OR REPLACE FUNCTION public.track_affiliate_click(
  p_link_id uuid,
  p_session_id text DEFAULT NULL,
  p_user_agent text DEFAULT NULL,
  p_referrer text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_recent_count integer;
  v_link_active boolean;
BEGIN
  -- Verify the affiliate link exists and is active
  SELECT is_active INTO v_link_active
  FROM public.affiliate_links
  WHERE id = p_link_id;

  IF v_link_active IS NULL OR v_link_active = false THEN
    RETURN false;
  END IF;

  -- Server-side rate limiting: 1 click per link per hour per user/session
  IF v_user_id IS NOT NULL THEN
    SELECT COUNT(*) INTO v_recent_count
    FROM public.affiliate_clicks
    WHERE affiliate_link_id = p_link_id
      AND user_id = v_user_id
      AND created_at > now() - interval '1 hour';
  ELSE
    IF p_session_id IS NULL OR length(p_session_id) < 5 THEN
      RETURN false;
    END IF;
    SELECT COUNT(*) INTO v_recent_count
    FROM public.affiliate_clicks
    WHERE affiliate_link_id = p_link_id
      AND session_id = p_session_id
      AND user_id IS NULL
      AND created_at > now() - interval '1 hour';
  END IF;

  IF v_recent_count > 0 THEN
    RETURN false;
  END IF;

  -- Insert the click
  INSERT INTO public.affiliate_clicks (
    affiliate_link_id, user_id, session_id, user_agent, referrer, ip_address
  ) VALUES (
    p_link_id, v_user_id, p_session_id,
    LEFT(COALESCE(p_user_agent, ''), 200),
    LEFT(COALESCE(p_referrer, ''), 500),
    NULL
  );

  RETURN true;
END;
$$;

-- Allow both authenticated and anonymous users to call the RPC
GRANT EXECUTE ON FUNCTION public.track_affiliate_click(uuid, text, text, text) TO anon, authenticated;

-- Remove direct INSERT access; force all writes through the RPC
DROP POLICY IF EXISTS "Authenticated users can insert affiliate clicks" ON public.affiliate_clicks;

CREATE POLICY "Deny direct insert to affiliate_clicks"
ON public.affiliate_clicks
FOR INSERT
TO authenticated
WITH CHECK (false);
