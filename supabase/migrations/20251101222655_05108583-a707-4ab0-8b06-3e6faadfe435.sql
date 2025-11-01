-- =====================================================
-- COMPREHENSIVE SECURITY FIX MIGRATION (SIMPLIFIED)
-- Addresses: vendor_status_client_side, affiliate_clicks_no_select
-- =====================================================

-- 1. Create app_role enum for role-based access control
CREATE TYPE public.app_role AS ENUM ('admin', 'vendor', 'user');

-- 2. Create user_roles table (admin-controlled)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 4. Create helper function to get user roles
CREATE OR REPLACE FUNCTION public.get_user_roles(_user_id UUID)
RETURNS SETOF public.app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
$$;

-- 5. RLS Policies for user_roles table
-- Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Only admins can insert/update/delete roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. Protect is_vendor field with trigger (prevent unauthorized changes)
CREATE OR REPLACE FUNCTION public.protect_is_vendor()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If is_vendor is being changed and user is not admin, prevent the change
  IF OLD.is_vendor IS DISTINCT FROM NEW.is_vendor THEN
    IF NOT public.has_role(auth.uid(), 'admin') THEN
      -- Keep the old value
      NEW.is_vendor := OLD.is_vendor;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER protect_is_vendor_trigger
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.protect_is_vendor();

-- 7. Add SELECT policy for affiliate_clicks (admin access)
CREATE POLICY "Admins can view affiliate clicks"
ON public.affiliate_clicks
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- 8. Add SELECT policy for analytics_events (admin access)
CREATE POLICY "Admins can view all analytics"
ON public.analytics_events
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- 9. Create function to sync is_vendor with user_roles for backward compatibility
CREATE OR REPLACE FUNCTION public.sync_vendor_role_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- When vendor role is added, set is_vendor to true
  IF NEW.role = 'vendor' THEN
    UPDATE public.profiles
    SET is_vendor = true
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.sync_vendor_role_delete()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- When vendor role is removed, check if user still has vendor role
  IF OLD.role = 'vendor' THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = OLD.user_id AND role = 'vendor'
    ) THEN
      UPDATE public.profiles
      SET is_vendor = false
      WHERE id = OLD.user_id;
    END IF;
  END IF;
  
  RETURN OLD;
END;
$$;

-- Create triggers to sync vendor status
CREATE TRIGGER sync_vendor_role_insert_trigger
AFTER INSERT ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.sync_vendor_role_insert();

CREATE TRIGGER sync_vendor_role_delete_trigger
AFTER DELETE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.sync_vendor_role_delete();

-- 10. Migrate existing vendors to user_roles table
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'vendor'::public.app_role
FROM public.profiles
WHERE is_vendor = true
ON CONFLICT (user_id, role) DO NOTHING;

-- 11. Add index for performance
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);