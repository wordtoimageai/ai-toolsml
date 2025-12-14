-- Fix 1: affiliate_clicks INSERT should validate user_id matches auth.uid() when provided
DROP POLICY IF EXISTS "Authenticated users can insert affiliate clicks" ON public.affiliate_clicks;

CREATE POLICY "Authenticated users can insert affiliate clicks"
ON public.affiliate_clicks
FOR INSERT
TO authenticated
WITH CHECK (
  (user_id IS NULL OR user_id = auth.uid())
);

-- Fix 2: Protect subscription fields in profiles table with a trigger
CREATE OR REPLACE FUNCTION public.protect_subscription_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to modify subscription fields
  IF OLD.subscription_tier IS DISTINCT FROM NEW.subscription_tier 
     OR OLD.subscription_expires_at IS DISTINCT FROM NEW.subscription_expires_at THEN
    IF NOT public.has_role(auth.uid(), 'admin') THEN
      -- Keep the old subscription values
      NEW.subscription_tier := OLD.subscription_tier;
      NEW.subscription_expires_at := OLD.subscription_expires_at;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_subscription_fields_trigger ON public.profiles;

CREATE TRIGGER protect_subscription_fields_trigger
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.protect_subscription_fields();

-- Fix 3: Update user_roles admin policy to enforce created_by
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin') AND created_by = auth.uid());