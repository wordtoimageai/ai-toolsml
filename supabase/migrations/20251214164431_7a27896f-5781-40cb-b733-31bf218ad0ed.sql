-- Fix Issue 1: Analytics events INSERT policy - ensure user_id matches auth.uid() when not null
DROP POLICY IF EXISTS "Authenticated users can insert analytics events" ON public.analytics_events;

CREATE POLICY "Authenticated users can insert analytics events"
ON public.analytics_events
FOR INSERT
TO authenticated
WITH CHECK (
  user_id IS NULL OR user_id = auth.uid()
);

-- Fix Issue 2: Add audit logging for user_roles changes
-- Create audit log table
CREATE TABLE IF NOT EXISTS public.user_roles_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  user_id uuid NOT NULL,
  role app_role NOT NULL,
  performed_by uuid,
  performed_at timestamp with time zone DEFAULT now(),
  old_data jsonb,
  new_data jsonb
);

-- Enable RLS on audit table (only admins can view)
ALTER TABLE public.user_roles_audit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view role audit logs"
ON public.user_roles_audit
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Audit trigger function
CREATE OR REPLACE FUNCTION public.audit_user_roles_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.user_roles_audit (action, user_id, role, performed_by, new_data)
    VALUES ('INSERT', NEW.user_id, NEW.role, auth.uid(), to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.user_roles_audit (action, user_id, role, performed_by, old_data, new_data)
    VALUES ('UPDATE', NEW.user_id, NEW.role, auth.uid(), to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.user_roles_audit (action, user_id, role, performed_by, old_data)
    VALUES ('DELETE', OLD.user_id, OLD.role, auth.uid(), to_jsonb(OLD));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Create triggers for audit logging
DROP TRIGGER IF EXISTS audit_user_roles_insert ON public.user_roles;
DROP TRIGGER IF EXISTS audit_user_roles_update ON public.user_roles;
DROP TRIGGER IF EXISTS audit_user_roles_delete ON public.user_roles;

CREATE TRIGGER audit_user_roles_insert
AFTER INSERT ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.audit_user_roles_changes();

CREATE TRIGGER audit_user_roles_update
AFTER UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.audit_user_roles_changes();

CREATE TRIGGER audit_user_roles_delete
AFTER DELETE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.audit_user_roles_changes();

-- Update admin role management policy to enforce created_by
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin') AND (created_by IS NULL OR created_by = auth.uid()));