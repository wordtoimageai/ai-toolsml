// GA4 event helpers. Mirrors the hostname gate used in index.html and useAuth
// so preview/lovable.app domains never send events to the production property.

const isProductionHost = () =>
  typeof window !== 'undefined' &&
  (window.location.hostname === 'toolsml.com' ||
    window.location.hostname === 'www.toolsml.com');

type GtagParams = Record<string, unknown>;

export const trackEvent = (eventName: string, params: GtagParams = {}): void => {
  if (!isProductionHost()) return;
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
};

/** Fire on successful signup form submission. */
export const trackQualifyLead = (method: string = 'email'): void => {
  trackEvent('qualify_lead', { method });
};

/** Fire on meaningful engagement (e.g. favoriting a tool). */
export const trackCloseConvertLead = (params: GtagParams = {}): void => {
  trackEvent('close_convert_lead', params);
};

/** Fire on paid plan upgrade / Stripe success. */
export const trackPurchase = (params: {
  transaction_id: string;
  value: number;
  currency?: string;
  items?: GtagParams[];
}): void => {
  trackEvent('purchase', { currency: 'USD', ...params });
};