-- Enable required extensions for cron scheduling
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a table to track sitemap regeneration history
CREATE TABLE IF NOT EXISTS public.sitemap_regeneration_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  regenerated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  trigger_source TEXT NOT NULL DEFAULT 'scheduled',
  status TEXT NOT NULL DEFAULT 'success',
  details JSONB,
  urls_count INTEGER
);

-- Enable RLS on the log table
ALTER TABLE public.sitemap_regeneration_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view regeneration logs
CREATE POLICY "Admins can view sitemap logs" 
ON public.sitemap_regeneration_log 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Create index for efficient querying
CREATE INDEX idx_sitemap_regeneration_log_date ON public.sitemap_regeneration_log(regenerated_at DESC);