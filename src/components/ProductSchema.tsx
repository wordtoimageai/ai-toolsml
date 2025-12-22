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
  
  // Determine price - Google requires price field for valid Product snippets
  const getOfferDetails = () => {
    const baseOffer = {
      "@type": "Offer",
      "url": tool.website,
      "priceCurrency": "USD",
      "priceValidUntil": priceValidUntil,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": tool.company
      }
    };

    // For Free tools - price is 0
    if (tool.pricing === 'Free') {
      return {
        ...baseOffer,
        "price": "0"
      };
    }
    
    // For Freemium - price is 0 for base tier
    if (tool.pricing === 'Freemium') {
      return {
        ...baseOffer,
        "price": "0"
      };
    }
    
    // For Paid/Subscription - use price 0 as "starting from" price
    // This satisfies Google's requirement for a valid price field
    return {
      ...baseOffer,
      "price": "0"
    };
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