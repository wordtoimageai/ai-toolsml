import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that injects prerender-friendly meta tags before React hydration
 * This helps SEO crawlers that don't execute JavaScript see proper meta tags
 */
const PrerenderMetaTags = () => {
  const location = useLocation();

  useEffect(() => {
    // Update canonical URL for the current page
    const canonicalLink = document.getElementById('canonical-link') as HTMLLinkElement;
    if (canonicalLink) {
      let path = location.pathname;
      // Remove trailing slashes except for root
      if (path !== '/' && path.endsWith('/')) {
        path = path.slice(0, -1);
      }
      canonicalLink.href = `https://toolsml.com${path}`;
    }

    // Add prerender status for crawlers
    const prerenderReady = document.createElement('meta');
    prerenderReady.setAttribute('name', 'prerender-status-code');
    prerenderReady.setAttribute('content', '200');
    document.head.appendChild(prerenderReady);

    // Signal to prerender services that the page is ready
    if (typeof window !== 'undefined') {
      (window as any).prerenderReady = true;
    }

    return () => {
      // Cleanup
      const existingMeta = document.querySelector('meta[name="prerender-status-code"]');
      if (existingMeta) {
        existingMeta.remove();
      }
    };
  }, [location.pathname]);

  return null;
};

export default PrerenderMetaTags;