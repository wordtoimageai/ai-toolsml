import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface PrivacyAwareAnalyticsEvent {
  event_type: string;
  event_data?: Record<string, any>;
  tool_id?: string;
}

// Session and User Agent helpers with privacy considerations
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

const getMinimalUserAgent = (): string => {
  const ua = navigator.userAgent;
  // Extract only browser name and major version for minimal fingerprinting
  const match = ua.match(/(Chrome|Firefox|Safari|Edge)\/(\d+)/);
  return match ? `${match[1]}/${match[2]}` : 'Unknown';
};

export const usePrivacyAnalytics = () => {
  const { isAuthenticated, profile, user } = useAuth();
  const [privacyPreferences, setPrivacyPreferences] = useState({
    analytics_consent: true,
    marketing_consent: false,
    data_retention_months: 12,
    opt_out_analytics: false
  });

  // Update privacy preferences when profile changes
  useEffect(() => {
    if (profile?.privacy_preferences) {
      setPrivacyPreferences(profile.privacy_preferences);
    }
  }, [profile]);

  // Listen for privacy preference changes
  useEffect(() => {
    const handlePrivacyChange = (event: CustomEvent) => {
      setPrivacyPreferences(event.detail);
    };

    window.addEventListener('privacyPreferencesChanged', handlePrivacyChange as EventListener);
    return () => {
      window.removeEventListener('privacyPreferencesChanged', handlePrivacyChange as EventListener);
    };
  }, []);

  const shouldTrack = useCallback((): boolean => {
    // Check localStorage for anonymous users
    const localConsent = localStorage.getItem('privacy_consent');
    const localOptOut = localStorage.getItem('privacy_opt_out_analytics');
    
    if (!isAuthenticated) {
      return localConsent === 'true' && localOptOut !== 'true';
    }

    // For authenticated users, use profile preferences
    return privacyPreferences.analytics_consent && !privacyPreferences.opt_out_analytics;
  }, [isAuthenticated, privacyPreferences]);

  const trackEvent = useCallback(async ({ event_type, event_data, tool_id }: PrivacyAwareAnalyticsEvent) => {
    if (!shouldTrack()) {
      console.log('[Privacy] Analytics tracking blocked by user preferences');
      return;
    }

    try {
      // Sanitize event data to remove PII
      const sanitizedData = event_data ? {
        ...event_data,
        // Remove potentially sensitive fields
        email: undefined,
        phone: undefined,
        address: undefined,
        full_name: undefined
      } : undefined;

      const eventPayload = {
        event_type,
        event_data: sanitizedData,
        tool_id,
        user_id: isAuthenticated ? user?.id : null,
        session_id: getSessionId(),
        user_agent: getMinimalUserAgent(),
        ip_address: null, // We don't collect IP addresses for privacy
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('analytics_events')
        .insert([eventPayload]);

      if (error) {
        console.error('Analytics tracking error:', error);
      }
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }, [shouldTrack, isAuthenticated, user?.id]);

  const trackPageView = useCallback((pageName: string, additionalData?: Record<string, any>) => {
    return trackEvent({
      event_type: 'page_view',
      event_data: {
        page: pageName,
        timestamp: Date.now(),
        ...additionalData
      }
    });
  }, [trackEvent]);

  const trackToolView = useCallback((toolId: string, toolName: string, additionalData?: Record<string, any>) => {
    return trackEvent({
      event_type: 'tool_view',
      tool_id: toolId,
      event_data: {
        tool_name: toolName,
        timestamp: Date.now(),
        ...additionalData
      }
    });
  }, [trackEvent]);

  const trackToolVisit = useCallback((toolId: string, toolName: string, url: string) => {
    return trackEvent({
      event_type: 'tool_visit',
      tool_id: toolId,
      event_data: {
        tool_name: toolName,
        destination_domain: new URL(url).hostname, // Only track domain, not full URL
        timestamp: Date.now()
      }
    });
  }, [trackEvent]);

  const trackSearch = useCallback((query: string, resultCount: number, filters?: Record<string, any>) => {
    return trackEvent({
      event_type: 'search',
      event_data: {
        query_length: query.length, // Track query length instead of actual query for privacy
        result_count: resultCount,
        has_filters: !!filters && Object.keys(filters).length > 0,
        timestamp: Date.now()
      }
    });
  }, [trackEvent]);

  const trackConversion = useCallback((conversionType: string, value?: number, additionalData?: Record<string, any>) => {
    return trackEvent({
      event_type: 'conversion',
      event_data: {
        conversion_type: conversionType,
        value,
        timestamp: Date.now(),
        ...additionalData
      }
    });
  }, [trackEvent]);

  const trackFeatureUsage = useCallback((featureName: string, additionalData?: Record<string, any>) => {
    return trackEvent({
      event_type: 'feature_usage',
      event_data: {
        feature: featureName,
        timestamp: Date.now(),
        ...additionalData
      }
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackToolView,
    trackToolVisit,
    trackSearch,
    trackConversion,
    trackFeatureUsage,
    shouldTrack: shouldTrack(),
    privacyPreferences
  };
};

// Hook for automatic page tracking with privacy respect
export const usePrivacyPageTracking = (pageName: string, additionalData?: Record<string, any>) => {
  const { trackPageView } = usePrivacyAnalytics();

  useEffect(() => {
    trackPageView(pageName, additionalData);
  }, [pageName, trackPageView]);
};