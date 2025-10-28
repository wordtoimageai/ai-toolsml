import { Helmet } from 'react-helmet-async';
import { Tool } from '@/data/tools';

interface ProductSchemaProps {
  tool: Tool;
}

/**
 * Product Schema component for tool detail pages
 * Provides comprehensive structured data for individual tools
 */
const ProductSchema = ({ tool }: ProductSchemaProps) => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://ai-toolsml.lovable.app/tool/${tool.id}`,
    "name": tool.title,
    "description": tool.longDescription,
    "image": "https://ai-toolsml.lovable.app/og-image.jpg",
    "url": `https://ai-toolsml.lovable.app/tool/${tool.id}`,
    "brand": {
      "@type": "Brand",
      "name": tool.company
    },
    "manufacturer": {
      "@type": "Organization",
      "name": tool.company
    },
    "category": tool.category,
    "audience": {
      "@type": "Audience",
      "audienceType": "Business Professional"
    },
    "offers": {
      "@type": "Offer",
      "url": tool.website,
      "priceCurrency": "USD",
      "price": tool.pricing === 'Free' ? "0" : tool.pricing === 'Freemium' ? "0" : null,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": tool.company
      },
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": tool.rating.toString(),
      "reviewCount": tool.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": tool.rating.toString(),
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Organization",
          "name": "ToolsML Editorial Team"
        },
        "datePublished": tool.founded,
        "reviewBody": tool.description
      }
    ],
    "additionalProperty": tool.features.map(feature => ({
      "@type": "PropertyValue",
      "name": "Feature",
      "value": feature
    })),
    "positiveNotes": {
      "@type": "ItemList",
      "itemListElement": tool.pros.map((pro, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": pro
      }))
    },
    "negativeNotes": {
      "@type": "ItemList",
      "itemListElement": tool.cons.map((con, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": con
      }))
    }
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