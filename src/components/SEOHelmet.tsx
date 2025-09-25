import { Helmet } from 'react-helmet-async';

interface SEOHelmetProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: Record<string, any>;
}

/**
 * Minimal, focused SEO component for basic meta tags
 */
export const SEOHelmet = ({
  title,
  description,
  keywords,
  image = '/favicon.png',
  url = 'https://ai-toolsml.lovable.app',
  type = 'website',
  structuredData
}: SEOHelmetProps) => {
  const fullTitle = title.includes('ToolsML') ? title : `${title} | ToolsML`;
  const canonicalUrl = url.startsWith('http') ? url : `https://ai-toolsml.lovable.app${url}`;
  const imageUrl = image.startsWith('http') ? image : `https://ai-toolsml.lovable.app${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="ToolsML" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="author" content="ToolsML Editorial Team" />
    </Helmet>
  );
};

export default SEOHelmet;