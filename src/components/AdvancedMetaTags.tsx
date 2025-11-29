import { Helmet } from 'react-helmet-async';
import { Tool } from '@/data/tools';
import { generateCanonicalUrl, generateOGImage } from '@/lib/seo-utils';

interface AdvancedMetaTagsProps {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  tool?: Tool;
}

/**
 * Advanced Meta Tags Component with dynamic OG image generation
 * Comprehensive OG, Twitter Card, and social media meta tags
 */
const AdvancedMetaTags = ({
  title,
  description,
  url,
  type = 'website',
  image,
  imageWidth = 1200,
  imageHeight = 630,
  imageAlt,
  publishedTime,
  modifiedTime,
  author = 'ToolsML Editorial Team',
  section,
  tags = [],
  tool
}: AdvancedMetaTagsProps) => {
  const baseUrl = 'https://toolsml.com';
  const fullUrl = url.startsWith('http') ? url : generateCanonicalUrl(url);
  
  // Generate dynamic OG image URL based on tool data
  const generateDynamicImage = (): string => {
    if (image) return image.startsWith('http') ? image : `${baseUrl}${image}`;
    
    // Use SEO utility to generate tool-specific OG image
    if (tool) {
      return generateOGImage(tool.title, tool.category);
    }
    
    return `${baseUrl}/og-image.jpg`;
  };

  const ogImage = generateDynamicImage();
  const finalImageAlt = imageAlt || (tool 
    ? `${tool.title} - AI ${tool.category} Tool Review | ToolsML` 
    : `${title} - ToolsML AI Tools Directory`);

  // Extract primary keyword for additional optimization
  const primaryKeyword = title.split(' ')[0];

  return (
    <Helmet>
      {/* Enhanced Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content={imageWidth.toString()} />
      <meta property="og:image:height" content={imageHeight.toString()} />
      <meta property="og:image:alt" content={finalImageAlt} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:site_name" content="ToolsML" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article-specific tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Product-specific tags with enhanced metadata */}
      {(type === 'product' || tool) && tool && (
        <>
          <meta property="product:price:amount" content={tool.pricing === 'Free' ? '0' : undefined} />
          <meta property="product:price:currency" content="USD" />
          <meta property="product:availability" content="in stock" />
          <meta property="product:condition" content="new" />
          <meta property="product:brand" content={tool.company} />
          <meta property="product:category" content={`AI ${tool.category} Tools`} />
          <meta property="product:rating:value" content={tool.rating.toString()} />
          <meta property="product:rating:count" content={tool.reviewCount.toString()} />
        </>
      )}

      {/* Enhanced Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@toolsml" />
      <meta name="twitter:creator" content="@toolsml" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={finalImageAlt} />
      <meta name="twitter:domain" content="toolsml.com" />
      <meta name="twitter:url" content={fullUrl} />
      
      {/* Twitter App Card (for mobile deep linking) */}
      <meta name="twitter:app:name:iphone" content="ToolsML" />
      <meta name="twitter:app:name:ipad" content="ToolsML" />
      <meta name="twitter:app:name:googleplay" content="ToolsML" />
      
      {/* Enhanced Facebook Tags */}
      <meta property="fb:app_id" content="your-facebook-app-id" />
      <meta property="fb:pages" content="your-facebook-page-id" />

      {/* LinkedIn Tags */}
      <meta property="og:see_also" content={`${baseUrl}/about`} />
      
      {/* Pinterest Tags */}
      <meta name="pinterest-rich-pin" content="true" />
      <meta property="og:description" content={description} />
      
      {/* Mobile App Tags */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="ToolsML" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="news_keywords" content={tags.join(', ')} />
      <meta name="subject" content={primaryKeyword} />
      <meta name="abstract" content={description} />
      <meta name="topic" content="Artificial Intelligence Tools" />
      <meta name="summary" content={description} />
      <meta name="classification" content="Technology" />
      <meta name="designer" content="ToolsML Team" />
      <meta name="reply-to" content="contact@toolsml.com" />
      <meta name="owner" content="ToolsML" />
      <meta name="directory" content="submission" />
      <meta name="category" content="Technology" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Structured Data - Alternative Tags */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={ogImage} />
    </Helmet>
  );
};

export default AdvancedMetaTags;