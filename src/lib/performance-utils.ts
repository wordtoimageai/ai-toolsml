/**
 * Performance optimization utilities for Core Web Vitals improvement
 * Optimizes LCP, CLS, and FID through lazy loading, image optimization, and code splitting
 */

// Track CLS value across session
let clsValue = 0;
let clsEntries: PerformanceEntry[] = [];

/**
 * Preload critical resources for faster LCP
 */
export const preloadCriticalResources = () => {
  // Preload critical fonts with display swap
  const fontPreloadLink = document.createElement('link');
  fontPreloadLink.rel = 'preload';
  fontPreloadLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
  fontPreloadLink.as = 'style';
  fontPreloadLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontPreloadLink);

  // Preload LCP candidate images
  const lcpImages = ['/og-image.jpg', '/favicon.png'];
  lcpImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });

  // DNS prefetch for external resources
  const dnsPrefetchDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com'
  ];
  
  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with Intersection Observer for better LCP
 */
export const setupLazyLoading = () => {
  if (!('IntersectionObserver' in window)) return;

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Load the actual image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          // Load srcset if available
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }
          
          img.classList.remove('lazy');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px 0px', // Start loading 50px before entering viewport
      threshold: 0.01
    }
  );

  // Observe all lazy images
  document.querySelectorAll('img[data-src], img.lazy').forEach(img => {
    imageObserver.observe(img);
  });

  return imageObserver;
};

/**
 * Reduce CLS by reserving space for dynamic content
 */
export const preventLayoutShift = () => {
  // Add aspect ratio boxes for images without dimensions
  document.querySelectorAll('img:not([width]):not([height])').forEach(img => {
    const imgElement = img as HTMLImageElement;
    if (imgElement.naturalWidth && imgElement.naturalHeight) {
      const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
      imgElement.style.aspectRatio = String(aspectRatio);
    }
  });

  // Ensure fonts don't cause layout shift
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      document.body.classList.add('fonts-loaded');
    });
  }
};

/**
 * Measure and report Core Web Vitals
 */
export const measureCoreWebVitals = () => {
  // Only measure in production
  if (typeof window === 'undefined') return;

  if (!('PerformanceObserver' in window)) return;

  // LCP (Largest Contentful Paint)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
      
      const lcpValue = Math.round(lastEntry.startTime);
      
      // Report to analytics if available
      reportWebVital('LCP', lcpValue);
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    // LCP not supported
  }

  // FID (First Input Delay) - Now using INP (Interaction to Next Paint)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: PerformanceEntry & { processingStart?: number; startTime: number }) => {
        if (entry.processingStart) {
          const fidValue = Math.round(entry.processingStart - entry.startTime);
          reportWebVital('FID', fidValue);
        }
      });
    });
    
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    // FID not supported
  }

  // CLS (Cumulative Layout Shift)
  try {
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: PerformanceEntry & { hadRecentInput?: boolean; value?: number }) => {
        if (!entry.hadRecentInput && entry.value) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      });

      // Report final CLS value
      reportWebVital('CLS', Math.round(clsValue * 1000));
    });
    
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    // CLS not supported
  }

  // INP (Interaction to Next Paint) - New metric replacing FID
  try {
    const inpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: PerformanceEntry & { duration?: number }) => {
        if (entry.duration) {
          reportWebVital('INP', Math.round(entry.duration));
        }
      });
    });
    
    inpObserver.observe({ type: 'event', buffered: true });
  } catch (e) {
    // INP not supported
  }

  // TTFB (Time to First Byte)
  try {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry) {
      const ttfb = Math.round(navEntry.responseStart - navEntry.requestStart);
      reportWebVital('TTFB', ttfb);
    }
  } catch (e) {
    // TTFB not available
  }
};

/**
 * Report web vital metric
 */
const reportWebVital = (name: string, value: number) => {
  // Log for debugging
  if (typeof window !== 'undefined' && (window as typeof window & { __DEV__?: boolean }).__DEV__) {
    console.log(`[Web Vital] ${name}: ${value}`);
  }

  // Send to analytics if available
  if (typeof window !== 'undefined' && (window as typeof window & { gtag?: (event: string, name: string, data: Record<string, unknown>) => void }).gtag) {
    (window as typeof window & { gtag: (event: string, name: string, data: Record<string, unknown>) => void }).gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: name,
      value: value,
      non_interaction: true,
    });
  }
};

/**
 * Optimize bundle loading with modulepreload
 */
export const optimizeBundleLoading = () => {
  // Preload critical route chunks
  const criticalChunks = [
    '/src/pages/Index.tsx',
    '/src/pages/ToolDetail.tsx',
    '/src/components/Header.tsx',
    '/src/components/Footer.tsx',
    '/src/components/ToolCard.tsx'
  ];

  criticalChunks.forEach(chunk => {
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
  if (!('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });
    
    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content available
            console.log('New content available, refresh to update');
          }
        });
      }
    });
  } catch (error) {
    console.error('Service worker registration failed:', error);
  }
};

/**
 * Critical CSS injection for above-the-fold content
 */
export const injectCriticalCSS = () => {
  const criticalCSS = `
    /* Critical above-the-fold styles for faster FCP */
    :root {
      --font-display: swap;
    }
    
    /* Prevent FOUT (Flash of Unstyled Text) */
    .fonts-loading body {
      visibility: hidden;
    }
    .fonts-loaded body {
      visibility: visible;
    }
    
    /* Hero section placeholder to prevent CLS */
    .hero-section { 
      min-height: 60vh;
      contain: layout style paint;
    }
    
    /* Navigation glass effect */
    .nav-glass {
      background-color: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    
    /* Loading skeleton animation */
    .loading-skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite ease-in-out;
    }
    
    @keyframes skeleton-loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    /* Lazy loaded images */
    img.lazy {
      opacity: 0;
      transition: opacity 0.3s ease-in;
    }
    img.loaded {
      opacity: 1;
    }
    
    /* Content visibility for offscreen content */
    .content-visibility-auto {
      content-visibility: auto;
      contain-intrinsic-size: 0 500px;
    }
  `;

  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = criticalCSS;
  
  // Insert at the beginning of head for highest priority
  if (document.head.firstChild) {
    document.head.insertBefore(style, document.head.firstChild);
  } else {
    document.head.appendChild(style);
  }
};

/**
 * Optimize images for different screen sizes
 */
export const setupResponsiveImages = () => {
  const images = document.querySelectorAll('img[data-sizes]');
  
  images.forEach(img => {
    const imgElement = img as HTMLImageElement;
    const sizes = imgElement.dataset.sizes;
    
    if (sizes) {
      imgElement.sizes = sizes;
    }
  });
};

/**
 * Defer non-critical resources
 */
export const deferNonCriticalResources = () => {
  // Defer non-critical scripts
  document.querySelectorAll('script[data-defer]').forEach(script => {
    const scriptElement = script as HTMLScriptElement;
    scriptElement.defer = true;
  });

  // Load non-critical CSS asynchronously
  document.querySelectorAll('link[data-async]').forEach(link => {
    const linkElement = link as HTMLLinkElement;
    linkElement.media = 'print';
    linkElement.onload = () => {
      linkElement.media = 'all';
    };
  });
};

/**
 * Initialize all performance optimizations
 */
export const initPerformanceOptimizations = () => {
  // Run immediately for fastest impact
  injectCriticalCSS();
  preloadCriticalResources();
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupLazyLoading();
      preventLayoutShift();
      optimizeBundleLoading();
      setupResponsiveImages();
      deferNonCriticalResources();
    });
  } else {
    setupLazyLoading();
    preventLayoutShift();
    optimizeBundleLoading();
    setupResponsiveImages();
    deferNonCriticalResources();
  }
  
  // Run when page is fully loaded
  window.addEventListener('load', () => {
    measureCoreWebVitals();
    setupServiceWorker();
  });
};

/**
 * Debounce function for scroll/resize events
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for high-frequency events
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
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

/**
 * Request Idle Callback polyfill for non-critical tasks
 */
export const requestIdleCallback = (
  callback: () => void,
  options?: { timeout: number }
): number => {
  const win = window as Window & typeof globalThis & { requestIdleCallback?: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number };
  if (win.requestIdleCallback) {
    return win.requestIdleCallback(callback, options);
  }
  
  // Fallback for browsers that don't support requestIdleCallback
  return setTimeout(callback, options?.timeout || 1) as unknown as number;
};

/**
 * Preload route for faster navigation
 */
export const preloadRoute = (path: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = path;
  document.head.appendChild(link);
};
