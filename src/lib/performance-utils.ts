/**
 * Performance optimization utilities for Core Web Vitals improvement
 */

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
  fontLink.as = 'style';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);

  // Preload hero images (only existing images)
  const heroImages = ['/og-image.jpg'];
  heroImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with Intersection Observer
 */
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

/**
 * Measure Core Web Vitals
 */
export const measureCoreWebVitals = () => {
  // Only measure in production
  if (process.env.NODE_ENV !== 'production') return;

  // LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        // Track LCP
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(lastEntry.startTime),
            non_interaction: true,
          });
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Fail silently
    }

    // FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FID',
              value: Math.round(entry.processingStart - entry.startTime),
              non_interaction: true,
            });
          }
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Fail silently
    }

    // CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'CLS',
            value: Math.round(clsValue * 1000),
            non_interaction: true,
          });
        }
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Fail silently
    }
  }
};

/**
 * Optimize bundle loading
 */
export const optimizeBundleLoading = () => {
  // Preload critical chunks
  const preloadChunks = [
    '/src/pages/Index.tsx',
    '/src/pages/ToolDetail.tsx',
    '/src/components/Header.tsx',
    '/src/components/Footer.tsx'
  ];

  preloadChunks.forEach(chunk => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = chunk;
    document.head.appendChild(link);
  });
};

/**
 * Setup service worker for caching
 */
export const setupServiceWorker = async () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  }
};

/**
 * Critical CSS injection for above-the-fold content
 */
export const injectCriticalCSS = () => {
  const criticalCSS = `
    /* Critical above-the-fold styles */
    .hero-section { 
      min-height: 60vh; 
      background: linear-gradient(135deg, hsl(235 47% 55%) 0%, hsl(252 35% 45%) 100%);
    }
    .nav-glass {
      background-color: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
    }
    .loading-skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

/**
 * Initialize all performance optimizations
 */
export const initPerformanceOptimizations = () => {
  // Run immediately
  preloadCriticalResources();
  injectCriticalCSS();
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupLazyLoading();
      optimizeBundleLoading();
    });
  } else {
    setupLazyLoading();
    optimizeBundleLoading();
  }
  
  // Run when page is fully loaded
  window.addEventListener('load', () => {
    measureCoreWebVitals();
    setupServiceWorker();
  });
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for scroll events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};