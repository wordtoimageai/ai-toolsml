import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface AnalyticsEvent {
  event_type: string;
  event_data?: Record<string, any>;
  tool_id?: string;
}

// Generate a session ID that persists during the browser session
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

export const useAnalytics = () => {
  const { user } = useAuth();
  
  const trackEvent = async ({ event_type, event_data, tool_id }: AnalyticsEvent) => {
    try {
      await supabase
        .from('analytics_events')
        .insert({
          user_id: user?.id || null,
          event_type,
          event_data: event_data || null,
          tool_id: tool_id || null,
          session_id: getSessionId(),
          ip_address: null, // Will be handled server-side if needed
          user_agent: navigator.userAgent
        });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  // Specific tracking functions
  const trackPageView = (pageName: string, additionalData?: Record<string, any>) => {
    trackEvent({
      event_type: 'page_view',
      event_data: {
        page: pageName,
        url: window.location.href,
        referrer: document.referrer,
        ...additionalData
      }
    });
  };

  const trackToolView = (toolId: string, toolName: string, additionalData?: Record<string, any>) => {
    trackEvent({
      event_type: 'tool_view',
      tool_id: toolId,
      event_data: {
        tool_name: toolName,
        ...additionalData
      }
    });
  };

  const trackToolVisit = (toolId: string, toolName: string, url: string) => {
    trackEvent({
      event_type: 'tool_visit',
      tool_id: toolId,
      event_data: {
        tool_name: toolName,
        tool_url: url,
        timestamp: new Date().toISOString()
      }
    });
  };

  const trackSearch = (query: string, resultCount: number, filters?: Record<string, any>) => {
    trackEvent({
      event_type: 'search',
      event_data: {
        query,
        result_count: resultCount,
        filters: filters || {},
        timestamp: new Date().toISOString()
      }
    });
  };

  const trackConversion = (conversionType: string, value?: number, additionalData?: Record<string, any>) => {
    trackEvent({
      event_type: 'conversion',
      event_data: {
        conversion_type: conversionType,
        value: value || 0,
        ...additionalData
      }
    });
  };

  const trackFeatureUsage = (featureName: string, additionalData?: Record<string, any>) => {
    trackEvent({
      event_type: 'feature_usage',
      event_data: {
        feature: featureName,
        ...additionalData
      }
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackToolView,
    trackToolVisit,
    trackSearch,
    trackConversion,
    trackFeatureUsage
  };
};

// Auto-track page views hook
export const usePageTracking = (pageName: string, additionalData?: Record<string, any>) => {
  const { trackPageView } = useAnalytics();
  
  useEffect(() => {
    trackPageView(pageName, additionalData);
  }, [pageName, trackPageView]);
};

export default useAnalytics;
