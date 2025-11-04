import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface ResourceHint {
  href: string;
  as?: 'script' | 'style' | 'font' | 'image' | 'fetch' | 'document';
  type?: string;
  crossorigin?: 'anonymous' | 'use-credentials';
}

interface PerformanceOptimizerProps {
  preconnect?: string[];
  dnsPrefetch?: string[];
  preload?: ResourceHint[];
  prefetch?: ResourceHint[];
  criticalImages?: string[];
}

/**
 * Performance Optimizer Component
 * Implements resource hints, preloading, and critical resource optimization
 */
const PerformanceOptimizer = ({
  preconnect = [],
  dnsPrefetch = [],
  preload = [],
  prefetch = [],
  criticalImages = []
}: PerformanceOptimizerProps) => {
  // Implement Intersection Observer for lazy loading
  useEffect(() => {
    // Lazy load images when they enter viewport
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    );

    // Observe all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => imageObserver.observe(img));

    return () => {
      imageObserver.disconnect();
    };
  }, []);

  // Prefetch next page resources on hover
  useEffect(() => {
    const prefetchOnHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && link.origin === window.location.origin) {
        const linkEl = document.createElement('link');
        linkEl.rel = 'prefetch';
        linkEl.href = link.href;
        document.head.appendChild(linkEl);
      }
    };

    document.addEventListener('mouseover', prefetchOnHover);
    return () => document.removeEventListener('mouseover', prefetchOnHover);
  }, []);

  // Implement idle-until-urgent pattern
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const idleCallbackId = requestIdleCallback(() => {
        // Preload non-critical resources during idle time
        prefetch.forEach((resource) => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = resource.href;
          if (resource.as) link.as = resource.as;
          document.head.appendChild(link);
        });
      });

      return () => cancelIdleCallback(idleCallbackId);
    }
  }, [prefetch]);

  return (
    <Helmet>
      {/* Critical inline CSS for above-the-fold content */}
      <style>{`
        .hero-gradient{background:linear-gradient(135deg,hsl(235,47%,55%),hsl(252,35%,45%));min-height:100vh}
        .hero-title{line-height:1.2;letter-spacing:-0.02em;font-weight:700}
        .hero-subtitle{line-height:1.6}
        .animate-fade-in{animation:fadeIn 0.6s ease-in}
        @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* Preconnect to critical origins - avoid duplicates */}
      {preconnect.length > 0 ? (
        preconnect.map((url) => (
          <link key={url} rel="preconnect" href={url} crossOrigin="anonymous" />
        ))
      ) : (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </>
      )}

      {/* DNS Prefetch for third-party domains */}
      {dnsPrefetch.length > 0 ? (
        dnsPrefetch.map((url) => (
          <link key={url} rel="dns-prefetch" href={url} />
        ))
      ) : (
        <link rel="dns-prefetch" href="//ai-toolsml.lovable.app" />
      )}

      {/* Preload critical resources with high priority */}
      {preload.map((resource, index) => (
        <link
          key={`${resource.href}-${index}`}
          rel="preload"
          href={resource.href}
          as={resource.as}
          type={resource.type}
          crossOrigin={resource.crossorigin}
          fetchPriority="high"
        />
      ))}

      {/* Prefetch next-page resources */}
      {prefetch.map((resource, index) => (
        <link
          key={`${resource.href}-${index}`}
          rel="prefetch"
          href={resource.href}
          as={resource.as}
        />
      ))}

      {/* Preload critical images with high priority */}
      {criticalImages.map((imageUrl) => (
        <link
          key={imageUrl}
          rel="preload"
          href={imageUrl}
          as="image"
          fetchPriority="high"
        />
      ))}
      
      {/* Optimize font loading with font-display swap */}
      <link 
        rel="preload" 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
        as="style"
      />
      <noscript>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </noscript>
      
      {/* Module preload for critical JS */}
      <link rel="modulepreload" href="/src/main.tsx" />
    </Helmet>
  );
};

export default PerformanceOptimizer;

/**
 * Hook for lazy loading components
 */
export const useLazyLoad = (callback: () => void, threshold = 0.1) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    const element = document.getElementById('lazy-load-trigger');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [callback, threshold]);
};