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
        // Use the public view which excludes sensitive commission_rate data
        const { data, error } = await supabase
          .from('affiliate_links_public')
          .select('id, tool_id, affiliate_url, is_active')
          .eq('tool_id', toolId)
          .single();

        if (error) {
          if (import.meta.env.DEV) {
            console.error('Error fetching affiliate link:', error);
          }
          setAffiliateUrl(null);
        } else {
          setAffiliateUrl(data.affiliate_url);
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Error fetching affiliate link:', error);
        }
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
      const { data: linkRow } = await supabase
        .from('affiliate_links_public')
        .select('id')
        .eq('tool_id', toolId)
        .eq('is_active', true)
        .single();

      if (linkRow) {
        await supabase.rpc('track_affiliate_click', {
          p_link_id: linkRow.id,
          p_session_id: getSessionId(),
          p_user_agent: getMinimalUserAgent(),
          p_referrer: document.referrer || null,
        });
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error tracking affiliate click:', error);
      }
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
        // Use the public view which excludes sensitive commission_rate data
        const { data, error } = await supabase
          .from('affiliate_links_public')
          .select('id, tool_id, affiliate_url, is_active')
          .eq('tool_id', toolId)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          if (import.meta.env.DEV) {
            console.error('Error fetching affiliate link:', error);
          }
        }
        
        setAffiliateUrl(data?.affiliate_url || null);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Error fetching affiliate link:', error);
        }
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
      const { data: linkRow } = await supabase
        .from('affiliate_links_public')
        .select('id')
        .eq('tool_id', toolId)
        .eq('is_active', true)
        .single();

      if (linkRow) {
        await supabase.rpc('track_affiliate_click', {
          p_link_id: linkRow.id,
          p_session_id: getSessionId(),
          p_user_agent: getMinimalUserAgent(),
          p_referrer: document.referrer || null,
        });
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error tracking affiliate click:', error);
      }
    }
  };

  return { affiliateUrl, isLoading, trackClick };
};