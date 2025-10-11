import { useEffect } from 'react';
import { markPageReady, isBotUserAgent, ensureCriticalContent } from '@/lib/prerender-utils';

/**
 * Component to signal when page is ready for prerendering
 * This helps search engine crawlers know when to capture the page
 */
export const PrerenderReady = () => {
  useEffect(() => {
    // Wait for page to be fully loaded and interactive
    const handleLoad = () => {
      // Ensure critical content is in the DOM
      ensureCriticalContent();
      
      // Mark page as ready for prerendering after a short delay
      // This ensures all dynamic content has finished rendering
      const timeout = setTimeout(() => {
        markPageReady();
        
        if (isBotUserAgent()) {
          console.log('🤖 Bot detected - page marked as ready for crawling');
        }
      }, 1000); // 1 second delay to ensure content is rendered

      return () => clearTimeout(timeout);
    };

    // If page already loaded, run immediately
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Otherwise wait for load event
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PrerenderReady;
