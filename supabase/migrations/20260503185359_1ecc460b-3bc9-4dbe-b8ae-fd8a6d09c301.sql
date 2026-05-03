CREATE POLICY "Admins can view all tool submissions"
ON public.tool_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));