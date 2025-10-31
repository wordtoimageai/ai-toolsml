-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  subscription_expires_at TIMESTAMPTZ,
  is_vendor BOOLEAN DEFAULT false,
  vendor_company TEXT,
  privacy_preferences JSONB DEFAULT '{"analytics_consent": true, "marketing_consent": false, "data_retention_months": 12, "opt_out_analytics": false}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create analytics_events table
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  tool_id TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on analytics_events
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Analytics policies
CREATE POLICY "Users can view their own analytics"
  ON public.analytics_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert analytics events"
  ON public.analytics_events FOR INSERT
  WITH CHECK (true);

-- Create affiliate_links table
CREATE TABLE public.affiliate_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  original_url TEXT NOT NULL,
  affiliate_url TEXT NOT NULL,
  commission_rate DECIMAL(5,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on affiliate_links
ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;

-- Affiliate links policies (publicly readable, admin writable)
CREATE POLICY "Anyone can view active affiliate links"
  ON public.affiliate_links FOR SELECT
  USING (is_active = true);

-- Create affiliate_clicks table
CREATE TABLE public.affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_link_id UUID REFERENCES public.affiliate_links(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on affiliate_clicks
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

-- Affiliate clicks policies
CREATE POLICY "Anyone can insert affiliate clicks"
  ON public.affiliate_clicks FOR INSERT
  WITH CHECK (true);

-- Create tool_submissions table
CREATE TABLE public.tool_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,
  tool_description TEXT,
  tool_url TEXT NOT NULL,
  tool_logo_url TEXT,
  category TEXT NOT NULL,
  pricing_model TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submission_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on tool_submissions
ALTER TABLE public.tool_submissions ENABLE ROW LEVEL SECURITY;

-- Tool submissions policies
CREATE POLICY "Vendors can view their own submissions"
  ON public.tool_submissions FOR SELECT
  USING (auth.uid() = vendor_id);

CREATE POLICY "Vendors can insert their own submissions"
  ON public.tool_submissions FOR INSERT
  WITH CHECK (auth.uid() = vendor_id);

CREATE POLICY "Vendors can update their own submissions"
  ON public.tool_submissions FOR UPDATE
  USING (auth.uid() = vendor_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_affiliate_links_updated_at
  BEFORE UPDATE ON public.affiliate_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tool_submissions_updated_at
  BEFORE UPDATE ON public.tool_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, is_vendor, vendor_company)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE((NEW.raw_user_meta_data->>'is_vendor')::boolean, false),
    NEW.raw_user_meta_data->>'vendor_company'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better query performance
CREATE INDEX idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at);
CREATE INDEX idx_affiliate_clicks_link_id ON public.affiliate_clicks(affiliate_link_id);
CREATE INDEX idx_affiliate_clicks_created_at ON public.affiliate_clicks(created_at);
CREATE INDEX idx_tool_submissions_vendor_id ON public.tool_submissions(vendor_id);
CREATE INDEX idx_tool_submissions_status ON public.tool_submissions(status);