import { Helmet } from 'react-helmet-async';
import { Tool } from '@/data/tools';

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
 * Advanced SEO component with comprehensive optimization
 */
export const AdvancedSEO = ({
  title,
  description,
  keywords,
  image,
  url = window.location.href,
  tool,
  category,
  pageType = 'homepage'
}: AdvancedSEOProps) => {
  // Generate optimized content
  const seoTitle = title || (tool ? `${tool.title} - AI ${tool.category} Tool | ToolsML` : 
    category ? `Best AI ${category.charAt(0).toUpperCase() + category.slice(1)} Tools 2025 | ToolsML` :
    'ToolsML — Discover & Compare the Best AI Tools (Curated Weekly)');
  
  const seoDescription = description || (tool ? 
    `${tool.description} Compare features, pricing & alternatives. Top-rated ${tool.category} AI tool with ${tool.reviewCount}+ reviews. Get started today.` :
    category ? `Discover top AI ${category} tools in 2025. Compare features, pricing & user reviews. Find the best AI ${category} solution for your needs today.` :
    'Find & compare 1000+ AI tools for writing, design, video, coding & more. Human-curated directory updated weekly. Compare features, pricing & reviews.');
  
  const seoKeywords = keywords || (tool ? 
    `${tool.title}, ${tool.category} AI tool, ${tool.tags.join(', ')}, AI software, artificial intelligence` :
    category ? `AI ${category} tools, best ${category} software, ${category} automation, AI assistant` :
    'AI tools, artificial intelligence, productivity tools, AI directory, AI comparison');
  
  const canonicalUrl = url.startsWith('http') ? url : `https://ai-toolsml.lovable.app${url}`;
  const ogImage = image || '/og-image.jpg';
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `https://ai-toolsml.lovable.app${ogImage}`;
  
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
      "url": "https://ai-toolsml.lovable.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ai-toolsml.lovable.app/?search={search_term_string}",
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
      <link rel="dns-prefetch" href="//ai-toolsml.lovable.app" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
      
      {/* Additional tool-specific meta tags */}
      {tool && (
        <>
          <meta property="product:price:amount" content={tool.pricing === 'Free' ? '0' : undefined} />
          <meta property="product:price:currency" content="USD" />
          <meta name="application-name" content={tool.title} />
        </>
      )}
    </Helmet>
  );
};

export default AdvancedSEO;