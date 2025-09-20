import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  jsonLd?: Record<string, any>;
}

const SEO = ({ 
  title = "ToolsML — Discover & Compare the Best AI Tools (Curated Weekly)",
  description = "Find and compare the best AI tools for writing, design, video, code, and more. Human-curated, updated weekly with features, pricing, and real use-cases.",
  keywords = "AI tools, artificial intelligence, machine learning, productivity, automation, AI directory, AI software, best AI tools",
  image = "/og-image.png",
  url = "https://ai-toolsml.lovable.app",
  type = "website",
  jsonLd
}: SEOProps) => {
  const fullTitle = title.includes('ToolsML') ? title : `${title} | ToolsML`;

  // Default structured data for the homepage
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://ai-toolsml.lovable.app/#website",
        "url": "https://ai-toolsml.lovable.app",
        "name": "ToolsML",
        "description": "Discover and compare the best AI tools with our human-curated directory",
        "publisher": {
          "@id": "https://ai-toolsml.lovable.app/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://ai-toolsml.lovable.app/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": "https://ai-toolsml.lovable.app/#organization",
        "name": "ToolsML",
        "url": "https://ai-toolsml.lovable.app",
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": "https://ai-toolsml.lovable.app/#/schema/logo/image/",
          "url": "https://ai-toolsml.lovable.app/favicon.png",
          "contentUrl": "https://ai-toolsml.lovable.app/favicon.png",
          "width": 512,
          "height": 512,
          "caption": "ToolsML"
        },
        "image": {
          "@id": "https://ai-toolsml.lovable.app/#/schema/logo/image/"
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
          "@id": "https://ai-toolsml.lovable.app/#website"
        },
        "about": {
          "@id": "https://ai-toolsml.lovable.app/#organization"
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
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="ToolsML" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
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