CREATE TABLE public.public_tool_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_name TEXT NOT NULL,
  tool_description TEXT NOT NULL,
  tool_url TEXT NOT NULL,
  category TEXT NOT NULL,
  pricing_model TEXT NOT NULL,
  company TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.public_tool_submissions TO anon;
GRANT INSERT, SELECT ON public.public_tool_submissions TO authenticated;
GRANT ALL ON public.public_tool_submissions TO service_role;

ALTER TABLE public.public_tool_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a tool"
ON public.public_tool_submissions FOR INSERT TO anon, authenticated
WITH CHECK (
  length(tool_name) BETWEEN 2 AND 120
  AND length(tool_description) BETWEEN 10 AND 2000
  AND length(tool_url) BETWEEN 5 AND 500
  AND length(contact_email) <= 254
  AND status = 'pending'
);

CREATE POLICY "Admins can read submissions"
ON public.public_tool_submissions FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update submissions"
ON public.public_tool_submissions FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete submissions"
ON public.public_tool_submissions FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));