-- Deny UPDATE on affiliate_clicks for everyone (records are immutable)
CREATE POLICY "Deny all updates to affiliate_clicks"
ON public.affiliate_clicks
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- Deny DELETE for anon and non-admin authenticated users; allow admins only
CREATE POLICY "Deny anonymous delete from affiliate_clicks"
ON public.affiliate_clicks
FOR DELETE
TO anon
USING (false);

CREATE POLICY "Only admins can delete affiliate_clicks"
ON public.affiliate_clicks
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));