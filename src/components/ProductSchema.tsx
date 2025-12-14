import { Helmet } from 'react-helmet-async';
import { Tool } from '@/data/tools';
import { generateOGImage } from '@/lib/seo-utils';

interface ProductSchemaProps {
  tool: Tool;
}

/**
 * Product Schema component for tool detail pages with dynamic structured data
 * Provides comprehensive structured data for individual tools with rich metadata
 */
const ProductSchema = ({ tool }: ProductSchemaProps) => {
  const baseUrl = "https://toolsml.com";
  const toolUrl = `${baseUrl}/tool/${tool.id}`;
  const toolImage = generateOGImage(tool.title, tool.category);
  const currentYear = new Date().getFullYear();
  const priceValidUntil = new Date(new Date().setFullYear(currentYear + 1)).toISOString().split('T')[0];
  
  // Determine price - use "0" for Free/Freemium, otherwise indicate it's a paid product
  const getOfferDetails = () => {
    if (tool.pricing === 'Free') {
      return {
        "@type": "Offer",
        "url": tool.website,
        "priceCurrency": "USD",
        "price": "0",
        "priceValidUntil": priceValidUntil,
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": tool.company
        }
      };
    } else if (tool.pricing === 'Freemium') {
      return {
        "@type": "Offer",
        "url": tool.website,
        "priceCurrency": "USD",
        "price": "0",
        "priceValidUntil": priceValidUntil,
        "availability": "https://schema.org/InStock",
        "description": "Free tier available with premium options",
        "seller": {
          "@type": "Organization",
          "name": tool.company
        }
      };
    } else {
      // For Paid/Subscription - use AggregateOffer to indicate variable pricing
      return {
        "@type": "AggregateOffer",
        "url": tool.website,
        "priceCurrency": "USD",
        "lowPrice": "0",
        "highPrice": "999",
        "offerCount": "1",
        "availability": "https://schema.org/InStock",
        "description": `${tool.pricing} - Visit website for pricing details`,
        "seller": {
          "@type": "Organization",
          "name": tool.company
        }
      };
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": toolUrl,
    "name": tool.title,
    "description": tool.longDescription,
    "image": toolImage,
    "url": toolUrl,
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": `AI ${tool.category} Tools`,
    "operatingSystem": "Web Browser",
    "author": {
      "@type": "Organization",
      "name": tool.company
    },
    "publisher": {
      "@type": "Organization",
      "name": tool.company
    },
    "datePublished": `${tool.founded}-01-01`,
    "keywords": tool.tags.join(', '),
    "offers": getOfferDetails(),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": tool.rating.toFixed(1),
      "reviewCount": tool.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": tool.rating.toFixed(1),
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Organization",
        "name": "ToolsML Editorial Team",
        "url": baseUrl
      },
      "publisher": {
        "@type": "Organization",
        "name": "ToolsML",
        "url": baseUrl
      },
      "datePublished": `${tool.founded}-01-01`,
      "reviewBody": `${tool.description} Key features include: ${tool.features.slice(0, 3).join(', ')}. Strengths: ${tool.pros.slice(0, 2).join(', ')}.`,
      "name": `${tool.title} Review`
    },
    "featureList": tool.features
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
    </Helmet>
  );
};

export default ProductSchema;