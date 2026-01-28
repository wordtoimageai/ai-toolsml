import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initPerformanceOptimizations } from './lib/performance-utils'

// LCP Optimization: Defer non-critical initialization
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Initialize performance optimizations after initial render
if (typeof requestIdleCallback !== 'undefined') {
  requestIdleCallback(() => {
    initPerformanceOptimizations();
  });
} else {
  setTimeout(() => {
    initPerformanceOptimizations();
  }, 100);
}

// Performance monitoring - deferred to avoid blocking LCP
if (typeof window !== 'undefined' && 'performance' in window) {
  window.addEventListener('load', () => {
    // Use requestIdleCallback to avoid blocking
    const trackMetrics = () => {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log('Navigation timing:', {
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart
            });
          }
          // Track LCP
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
        });
      });
      observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint'] });
    };

    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(trackMetrics);
    } else {
      setTimeout(trackMetrics, 0);
    }
  });
}
