import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Optimized image component with lazy loading, WebP support, and proper SEO attributes
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate responsive image URLs (simulated - would be handled by CDN in production)
  const generateSrcSet = (originalSrc: string) => {
    const baseUrl = originalSrc.split('.').slice(0, -1).join('.');
    const extension = originalSrc.split('.').pop();
    
    return [
      `${baseUrl}-400.${extension} 400w`,
      `${baseUrl}-800.${extension} 800w`,
      `${baseUrl}-1200.${extension} 1200w`,
      `${baseUrl}-1600.${extension} 1600w`
    ].join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Fallback image for errors
  const fallbackSrc = '/placeholder.svg';

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {/* Main image */}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        srcSet={!hasError ? generateSrcSet(src) : undefined}
        sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        onLoad={handleLoad}
        onError={handleError}
        // SEO and accessibility attributes
        itemProp="image"
        style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
      />
      
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className={cn(
          'absolute inset-0 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted',
          'animate-pulse'
        )} />
      )}
    </div>
  );
};

/**
 * Tool icon component with optimized loading
 */
interface ToolIconProps {
  icon: string;
  title: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ToolIcon = ({ icon, title, size = 'md', className }: ToolIconProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-lg',
    md: 'w-8 h-8 text-xl',
    lg: 'w-12 h-12 text-3xl'
  };

  return (
    <div 
      className={cn(
        'flex items-center justify-center rounded-lg bg-background border border-border',
        sizeClasses[size],
        className
      )}
      aria-label={`${title} icon`}
    >
      <span role="img" aria-hidden="true">{icon}</span>
    </div>
  );
};

/**
 * Hero image component with optimizations for LCP
 */
interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const HeroImage = ({ src, alt, className }: HeroImageProps) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1200}
      height={630}
      className={className}
      priority={true}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
      quality={85}
      placeholder="blur"
    />
  );
};

/**
 * Tool screenshot component for tool detail pages
 */
interface ToolScreenshotProps {
  toolId: string;
  toolName: string;
  className?: string;
}

export const ToolScreenshot = ({ toolId, toolName, className }: ToolScreenshotProps) => {
  return (
    <OptimizedImage
      src={`/tool-screenshots/${toolId}.jpg`}
      alt={`${toolName} interface screenshot`}
      width={800}
      height={600}
      className={className}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 40vw"
      quality={80}
      placeholder="blur"
    />
  );
};