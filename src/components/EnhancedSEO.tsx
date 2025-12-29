import { Helmet } from 'react-helmet-async';
import { Tool } from '@/data/tools';
import { 
  generateToolStructuredData,
  generateToolFAQStructuredData,
  generateReviewStructuredData,
  generateBreadcrumbStructuredData,
  generateSEOTitle,
  generateMetaDescription,
  generateKeywords,
  generateCanonicalUrl,
  generateOGImage
} from '@/lib/seo-utils';

interface EnhancedSEOProps {
  tool?: Tool;
  category?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  pageType?: 'tool' | 'category' | 'homepage' | 'comparison';
  customTitle?: string;
  customDescription?: string;
  url?: string;
}

/**
 * Enhanced SEO component with comprehensive structured data and optimization
 */
export const EnhancedSEO = ({
  tool,
  category,
  breadcrumbs,
  pageType = 'homepage',
  customTitle,
  customDescription,
  url
}: EnhancedSEOProps) => {
  // Derive URL from tool/category if not provided - NEVER use window.location for SSR/crawler compatibility
  const derivedPath = url || (tool ? `/tool/${tool.id}` : category ? `/category/${category}` : '/');
  
  // Ensure clean path without double slashes
  const cleanPath = derivedPath.startsWith('/') ? derivedPath : `/${derivedPath}`;
  
  // Generate optimized SEO content
  const title = customTitle || generateSEOTitle(tool?.title, category);
  const description = customDescription || generateMetaDescription(tool?.title, category, tool?.description);
  const keywords = generateKeywords(tool?.title, category, tool?.tags);
  // Use explicit base URL - never rely on runtime detection
  const canonicalUrl = `https://toolsml.com${cleanPath === '/' ? '' : cleanPath}`;
  const ogImage = generateOGImage(tool?.title, category);

  // Generate structured data based on page type
  const generateStructuredData = () => {
    const structuredDataArray = [];

    // Always include website schema
    structuredDataArray.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://toolsml.com/#website",
      "url": "https://toolsml.com",
      "name": "ToolsML",
      "description": "Human-curated directory of AI tools with pricing, features, and reviews",
      "publisher": {
        "@type": "Organization",
        "name": "ToolsML",
        "url": "https://toolsml.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://toolsml.com/favicon.png"
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://toolsml.com/?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    });

    // Tool-specific structured data
    if (tool && pageType === 'tool') {
      structuredDataArray.push(generateToolStructuredData(tool, canonicalUrl));
      structuredDataArray.push(generateToolFAQStructuredData(tool));
      structuredDataArray.push(generateReviewStructuredData(tool));
    }

    // Breadcrumb structured data
    if (breadcrumbs && breadcrumbs.length > 1) {
      structuredDataArray.push(generateBreadcrumbStructuredData(breadcrumbs));
    }

    return {
      "@context": "https://schema.org",
      "@graph": structuredDataArray
    };
  };

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Advanced SEO */}
      <meta name="author" content="ToolsML Editorial Team" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Open Graph Enhanced */}
      <meta property="og:type" content={pageType === 'tool' ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - AI Tools Directory`} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="ToolsML" />
      <meta property="og:locale" content="en_US" />
      
      {/* Tool-specific Open Graph */}
      {tool && (
        <>
          <meta property="og:type" content="article" />
          <meta property="article:author" content="ToolsML Editorial Team" />
          <meta property="article:section" content={`AI ${category} Tools`} />
          <meta property="article:tag" content={tool.tags.join(', ')} />
          <meta property="og:price:amount" content={tool.pricing === 'Free' ? '0' : undefined} />
          <meta property="og:price:currency" content="USD" />
        </>
      )}

      {/* Twitter Card Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${title} - AI Tools Directory`} />
      <meta name="twitter:site" content="@toolsml" />
      <meta name="twitter:creator" content="@toolsml" />
      
      {/* Additional Twitter metadata for tools */}
      {tool && (
        <>
          <meta name="twitter:label1" content="Category" />
          <meta name="twitter:data1" content={`AI ${category} Tools`} />
          <meta name="twitter:label2" content="Rating" />
          <meta name="twitter:data2" content={`${tool.rating}/5 (${tool.reviewCount} reviews)`} />
        </>
      )}

      {/* Performance and SEO hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//toolsml.com" />
      
      {/* App-specific meta tags */}
      <meta name="application-name" content="ToolsML" />
      <meta name="apple-mobile-web-app-title" content="ToolsML" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Security headers */}
      <meta name="referrer" content="origin-when-cross-origin" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>

      {/* Hreflang for international SEO (if needed) */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
    </Helmet>
  );
};

export default EnhancedSEO;