import { useEffect } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

const useAnalytics = () => {
  const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
    // Store analytics data in localStorage for now
    // In production, this would send to analytics service
    const analyticsData = {
      timestamp: new Date().toISOString(),
      action,
      category,
      label,
      value,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    try {
      const stored = localStorage.getItem('ai-tools-analytics') || '[]';
      const analytics = JSON.parse(stored);
      analytics.push(analyticsData);
      
      // Keep only last 1000 events
      if (analytics.length > 1000) {
        analytics.splice(0, analytics.length - 1000);
      }
      
      localStorage.setItem('ai-tools-analytics', JSON.stringify(analytics));
      
      // Console log for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics Event:', analyticsData);
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };

  const trackPageView = (pageName: string) => {
    trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: pageName
    });
  };

  const trackToolView = (toolId: string, toolName: string) => {
    trackEvent({
      action: 'tool_view',
      category: 'engagement',
      label: `${toolId}:${toolName}`
    });
  };

  const trackToolVisit = (toolId: string, toolName: string) => {
    trackEvent({
      action: 'tool_visit',
      category: 'conversion',
      label: `${toolId}:${toolName}`
    });
  };

  const trackSearch = (query: string, resultCount: number) => {
    trackEvent({
      action: 'search',
      category: 'engagement',
      label: query,
      value: resultCount
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackToolView,
    trackToolVisit,
    trackSearch
  };
};

export default useAnalytics;
