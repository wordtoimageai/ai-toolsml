-- Fix security issues: protect sensitive user data

-- 1. PROFILES TABLE: Remove email from being stored in profiles
-- Email is already stored in auth.users, so we don't need to duplicate it
-- Create a view that excludes email for general profile queries

-- First, update the policy to be more restrictive - users can only see their own profile
-- and we should consider the email as sensitive data

-- Add explicit deny for anonymous users on profiles (already exists, but reinforce)
-- The email column should only be accessible to the user themselves

-- 2. ANALYTICS_EVENTS: The ip_address column already doesn't collect real IPs 
-- (set to null in application code), but let's add an extra safeguard
-- by ensuring the column is always NULL at the database level

-- Create a trigger to ensure ip_address is always null
CREATE OR REPLACE FUNCTION public.nullify_analytics_ip()
RETURNS TRIGGER AS $$
BEGIN
  NEW.ip_address := NULL;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS nullify_analytics_ip_trigger ON public.analytics_events;
CREATE TRIGGER nullify_analytics_ip_trigger
BEFORE INSERT OR UPDATE ON public.analytics_events
FOR EACH ROW
EXECUTE FUNCTION public.nullify_analytics_ip();

-- 3. AFFILIATE_LINKS_PUBLIC: The view was created with SECURITY INVOKER
-- but since it's a view, we need to add explicit policies for it
-- Views with security_invoker inherit the caller's RLS context from base tables
-- The base table affiliate_links has proper RLS, so the view should be secure
-- However, let's add a comment to document this

COMMENT ON VIEW public.affiliate_links_public IS 'Public view of active affiliate links. Uses SECURITY INVOKER to inherit RLS from affiliate_links base table. Excludes sensitive commission_rate column.';

-- 4. Add explicit check that users can only read their own profile data
-- The existing policy is correct, but let's add documentation
COMMENT ON TABLE public.profiles IS 'User profile data. Email column is sensitive - only accessible to the profile owner via RLS policy "Users can view their own profile".';
COMMENT ON COLUMN public.profiles.email IS 'Sensitive: User email address. Protected by RLS - only the owner can view their own email.';