import { Helmet } from 'react-helmet-async';
import { 
  generateSEOTitle, 
  generateMetaDescription, 
  generateKeywords,
  generateCanonicalUrl,
  optimizeMetaDescription
} from '@/lib/seo-utils';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  jsonLd?: Record<string, any>;
  toolName?: string;
  category?: string;
  tags?: string[];
}

const SEO = ({ 
  title,
  description,
  keywords,
  image = "/og-image.png",
  url = "https://toolsml.com",
  type = "website",
  jsonLd,
  toolName,
  category,
  tags
}: SEOProps) => {
  // Generate optimized SEO data
  const seoTitle = title || generateSEOTitle(toolName, category);
  const seoDescription = description || generateMetaDescription(toolName, category);
  const seoKeywords = keywords || generateKeywords(toolName, category, tags);
  const canonicalUrl = generateCanonicalUrl(url);
  const optimizedDescription = optimizeMetaDescription(seoDescription);
  
  const fullTitle = seoTitle.includes('ToolsML') ? seoTitle : `${seoTitle} | ToolsML`;

  // Default structured data for the homepage
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://toolsml.com/#website",
        "url": "https://toolsml.com",
        "name": "ToolsML",
        "description": "Discover and compare the best AI tools with our human-curated directory",
        "publisher": {
          "@id": "https://toolsml.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://toolsml.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": "https://toolsml.com/#organization",
        "name": "ToolsML",
        "url": "https://toolsml.com",
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": "https://toolsml.com/#/schema/logo/image/",
          "url": "https://toolsml.com/favicon.png",
          "contentUrl": "https://toolsml.com/favicon.png",
          "width": 512,
          "height": 512,
          "caption": "ToolsML"
        },
        "image": {
          "@id": "https://toolsml.com/#/schema/logo/image/"
        },
        "sameAs": [],
        "description": "Human-curated directory of AI tools with pricing, features, and reviews"
      },
      {
        "@type": "CollectionPage",
        "@id": url + "#webpage",
        "url": url,
        "name": fullTitle,
        "isPartOf": {
          "@id": "https://toolsml.com/#website"
        },
        "about": {
          "@id": "https://toolsml.com/#organization"
        },
        "description": description,
        "breadcrumb": {
          "@id": url + "#breadcrumb"
        },
        "inLanguage": "en-US"
      }
    ]
  };

  const finalStructuredData = jsonLd || defaultStructuredData;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${fullTitle} - AI Tools Comparison`} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="ToolsML" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${fullTitle} - AI Tools Comparison`} />
      <meta name="twitter:site" content="@toolsml" />
      <meta name="twitter:creator" content="@toolsml" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="ToolsML Editorial Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#667eea" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Additional meta tags for better SEO */}
      <meta name="generator" content="ToolsML" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-TileColor" content="#667eea" />
      
      {/* Apple touch icon and favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Helmet>
  );
};

export default SEO;