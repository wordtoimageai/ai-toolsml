import { Helmet } from 'react-helmet-async';
import { Tool } from '@/data/tools';
import { 
  generateSEOTitle, 
  generateMetaDescription, 
  generateKeywords,
  generateCanonicalUrl,
  generateOGImage
} from '@/lib/seo-utils';

interface AdvancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  tool?: Tool;
  category?: string;
  pageType?: 'homepage' | 'tool' | 'category' | 'blog';
}

/**
 * Advanced SEO component with comprehensive optimization and dynamic meta tag generation
 */
export const AdvancedSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  tool,
  category,
  pageType = 'homepage'
}: AdvancedSEOProps) => {
  // Generate optimized, dynamic content using SEO utility functions
  const seoTitle = title || (
    tool 
      ? `${tool.title} Review ${new Date().getFullYear()}: Features, Pricing & Alternatives | ToolsML`
      : category 
        ? generateSEOTitle(undefined, category)
        : generateSEOTitle()
  );
  
  const seoDescription = description || (
    tool 
      ? generateMetaDescription(tool.title, tool.category, tool.longDescription)
      : category 
        ? generateMetaDescription(undefined, category)
        : generateMetaDescription()
  );
  
  const seoKeywords = keywords || generateKeywords(tool?.title, tool?.category, tool?.tags);
  
  // Generate proper canonical URL - use provided path or derive from tool/category
  // IMPORTANT: Never use window.location for SSR/crawler compatibility
  const getCanonicalPath = (): string => {
    if (url) {
      // If URL is already full, extract path; otherwise use as-is
      if (url.includes('http')) {
        try {
          return new URL(url).pathname;
        } catch {
          return url;
        }
      }
      return url;
    }
    if (tool) return `/tool/${tool.id}`;
    if (category) return `/category/${category}`;
    return '/';
  };
  
  const cleanPath = getCanonicalPath();
  // Use explicit base URL with proper path handling - never rely on runtime detection
  const canonicalUrl = `https://toolsml.com${cleanPath === '/' ? '' : (cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`)}`;
  
  // Generate dynamic Open Graph image based on tool data
  const ogImage = image || (tool ? generateOGImage(tool.title, tool.category) : generateOGImage());
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `https://toolsml.com${ogImage}`;
  // Generate structured data
  const generateStructuredData = () => {
    if (tool) {
      return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.title,
        "description": tool.description,
        "url": tool.website,
        "applicationCategory": "AI Tool",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": tool.pricing === 'Free' ? '0' : undefined,
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tool.rating,
          "reviewCount": tool.reviewCount,
          "bestRating": 5,
          "worstRating": 1
        },
        "author": {
          "@type": "Organization",
          "name": tool.company
        },
        "featureList": tool.features
      };
    }
    
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ToolsML",
      "description": "Human-curated directory of AI tools with pricing, features, and reviews",
      "url": "https://toolsml.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://toolsml.com/?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType === 'tool' ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${seoTitle} - AI Tools Directory`} />
      <meta property="og:site_name" content="ToolsML" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={fullImageUrl} />
      <meta property="twitter:image:alt" content={`${seoTitle} - AI Tools Directory`} />
      <meta name="twitter:site" content="@toolsml" />
      <meta name="twitter:creator" content="@toolsml" />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="ToolsML Editorial Team" />
      <meta name="publisher" content="ToolsML" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#667eea" />
      
      {/* Performance hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//toolsml.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
      
      {/* Additional tool-specific meta tags for rich results */}
      {tool && (
        <>
          <meta property="product:price:amount" content={tool.pricing === 'Free' ? '0' : undefined} />
          <meta property="product:price:currency" content="USD" />
          <meta name="application-name" content={tool.title} />
          <meta property="product:brand" content={tool.company} />
          <meta property="product:category" content={`AI ${tool.category} Tools`} />
          <meta property="product:rating:value" content={tool.rating.toString()} />
          <meta property="product:rating:count" content={tool.reviewCount.toString()} />
          {tool.features.length > 0 && (
            <meta name="keywords" content={`${tool.title}, ${tool.features.slice(0, 3).join(', ')}, ${tool.tags.join(', ')}`} />
          )}
        </>
      )}
    </Helmet>
  );
};

export default AdvancedSEO;