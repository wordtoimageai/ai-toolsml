import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Fires a GA4 `page_view` event on every SPA route change.
 *
 * Why: in index.html we initialize gtag with `send_page_view: false` and only
 * send the initial page_view from there. Without this component, client-side
 * navigations (e.g. `/tag/copywriting`, `/category/*`, `/tool/*`) never reach
 * GA4 and show up as "Not tagged" in Tag Coverage.
 *
 * The analytics script itself is gated to the production hostname in
 * index.html, so this is a no-op on preview / lovable.app domains.
 */
const AnalyticsPageViews = () => {
  const location = useLocation();

  useEffect(() => {
    const w = window as typeof window & {
      gtag?: (...args: unknown[]) => void;
      __lastTrackedPath?: string;
    };
    if (typeof w.gtag !== "function") return;

    const path = location.pathname + location.search;
    if (w.__lastTrackedPath === path) return;
    w.__lastTrackedPath = path;

    // Defer slightly so document.title reflects the new route (set by Helmet).
    const t = window.setTimeout(() => {
      w.gtag?.("event", "page_view", {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 50);

    return () => window.clearTimeout(t);
  }, [location.pathname, location.search]);

  return null;
};

export default AnalyticsPageViews;