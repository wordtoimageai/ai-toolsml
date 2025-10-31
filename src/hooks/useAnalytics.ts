/**
 * @deprecated This hook is deprecated in favor of usePrivacyAnalytics.
 * Please use usePrivacyAnalytics instead for better privacy protection and PII sanitization.
 * 
 * This file is kept for backwards compatibility but will be removed in a future version.
 * All analytics tracking should use usePrivacyAnalytics which includes:
 * - Privacy consent checking
 * - Deep PII sanitization
 * - Minimal user agent collection
 * - Session-based tracking
 */

import { usePrivacyAnalytics } from './usePrivacyAnalytics';

/**
 * @deprecated Use usePrivacyAnalytics instead
 */
export const useAnalytics = () => {
  console.warn('useAnalytics is deprecated. Please use usePrivacyAnalytics instead for better privacy protection.');
  return usePrivacyAnalytics();
};

/**
 * @deprecated Use usePrivacyPageTracking instead
 */
export const usePageTracking = (pageName: string, additionalData?: Record<string, any>) => {
  console.warn('usePageTracking is deprecated. Please use usePrivacyPageTracking instead for better privacy protection.');
  const { trackPageView } = usePrivacyAnalytics();
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    trackPageView(pageName, additionalData);
  }, [pageName, trackPageView]);
};

export default useAnalytics;

// Re-export for backwards compatibility
import * as React from 'react';
