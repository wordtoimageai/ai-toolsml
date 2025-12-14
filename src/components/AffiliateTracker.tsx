import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

// Minimal user agent to reduce fingerprinting
const getMinimalUserAgent = (): string => {
  const ua = navigator.userAgent;
  const match = ua.match(/(Chrome|Firefox|Safari|Edge)\/(\d+)/);
  return match ? `${match[1]}/${match[2]}` : 'Unknown';
};

// Get or create a session ID for anonymous rate limiting
const getSessionId = (): string => {
  const storageKey = 'affiliate_session_id';
  let sessionId = sessionStorage.getItem(storageKey);
  if (!sessionId) {
    sessionId = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    sessionStorage.setItem(storageKey, sessionId);
  }
  return sessionId;
};

interface AffiliateTrackerProps {
  toolId: string;
  children: (props: { 
    affiliateUrl: string | null; 
    isLoading: boolean; 
    trackClick: () => Promise<void>;
  }) => React.ReactNode;
}

export const AffiliateTracker = ({ toolId, children }: AffiliateTrackerProps) => {
  const { user } = useAuth();
  const [affiliateUrl, setAffiliateUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAffiliateLink = async () => {
      try {
        const { data, error } = await supabase
          .from('affiliate_links')
          .select('id, tool_id, affiliate_url, is_active')
          .eq('tool_id', toolId)
          .eq('is_active', true)
          .single();

        if (error) {
          console.error('Error fetching affiliate link:', error);
          setAffiliateUrl(null);
        } else {
          setAffiliateUrl(data.affiliate_url);
        }
      } catch (error) {
        console.error('Error fetching affiliate link:', error);
        setAffiliateUrl(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAffiliateLink();
  }, [toolId]);

  const trackClick = async () => {
    if (!affiliateUrl) return;

    try {
      // Get affiliate link details
      const { data: affiliateLink } = await supabase
        .from('affiliate_links')
        .select('id')
        .eq('tool_id', toolId)
        .eq('is_active', true)
        .single();

      if (affiliateLink) {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        const sessionId = getSessionId();

        // Rate limiting: Check for recent click from this user or session (within last hour)
        if (user?.id) {
          // Authenticated user rate limiting
          const { data: recentClick } = await supabase
            .from('affiliate_clicks')
            .select('id')
            .eq('affiliate_link_id', affiliateLink.id)
            .eq('user_id', user.id)
            .gte('created_at', oneHourAgo)
            .limit(1)
            .maybeSingle();

          if (recentClick) {
            return; // Skip tracking - user already clicked recently
          }
        } else {
          // Anonymous user rate limiting via session_id
          const { data: recentClick } = await supabase
            .from('affiliate_clicks')
            .select('id')
            .eq('affiliate_link_id', affiliateLink.id)
            .eq('session_id', sessionId)
            .is('user_id', null)
            .gte('created_at', oneHourAgo)
            .limit(1)
            .maybeSingle();

          if (recentClick) {
            return; // Skip tracking - session already clicked recently
          }
        }

        // Track the click
        await supabase
          .from('affiliate_clicks')
          .insert({
            affiliate_link_id: affiliateLink.id,
            user_id: user?.id || null,
            session_id: sessionId,
            ip_address: null,
            user_agent: getMinimalUserAgent(),
            referrer: document.referrer || null
          });
      }
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
    }
  };

  return children({ affiliateUrl, isLoading, trackClick });
};

// Hook version for easier usage
export const useAffiliateTracker = (toolId: string) => {
  const { user } = useAuth();
  const [affiliateUrl, setAffiliateUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAffiliateLink = async () => {
      try {
        const { data, error } = await supabase
          .from('affiliate_links')
          .select('id, tool_id, affiliate_url, is_active')
          .eq('tool_id', toolId)
          .eq('is_active', true)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          console.error('Error fetching affiliate link:', error);
        }
        
        setAffiliateUrl(data?.affiliate_url || null);
      } catch (error) {
        console.error('Error fetching affiliate link:', error);
        setAffiliateUrl(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAffiliateLink();
  }, [toolId]);

  const trackClick = async () => {
    if (!affiliateUrl) return;

    try {
      const { data: affiliateLink } = await supabase
        .from('affiliate_links')
        .select('id')
        .eq('tool_id', toolId)
        .eq('is_active', true)
        .single();

      if (affiliateLink) {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        const sessionId = getSessionId();

        // Rate limiting: Check for recent click from this user or session (within last hour)
        if (user?.id) {
          // Authenticated user rate limiting
          const { data: recentClick } = await supabase
            .from('affiliate_clicks')
            .select('id')
            .eq('affiliate_link_id', affiliateLink.id)
            .eq('user_id', user.id)
            .gte('created_at', oneHourAgo)
            .limit(1)
            .maybeSingle();

          if (recentClick) {
            return;
          }
        } else {
          // Anonymous user rate limiting via session_id
          const { data: recentClick } = await supabase
            .from('affiliate_clicks')
            .select('id')
            .eq('affiliate_link_id', affiliateLink.id)
            .eq('session_id', sessionId)
            .is('user_id', null)
            .gte('created_at', oneHourAgo)
            .limit(1)
            .maybeSingle();

          if (recentClick) {
            return;
          }
        }

        await supabase
          .from('affiliate_clicks')
          .insert({
            affiliate_link_id: affiliateLink.id,
            user_id: user?.id || null,
            session_id: sessionId,
            ip_address: null,
            user_agent: getMinimalUserAgent(),
            referrer: document.referrer || null
          });
      }
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
    }
  };

  return { affiliateUrl, isLoading, trackClick };
};