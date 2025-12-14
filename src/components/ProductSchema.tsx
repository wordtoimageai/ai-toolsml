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
  const toolUrl = `https://toolsml.com/tool/${tool.id}`;
  const toolImage = generateOGImage(tool.title, tool.category);
  
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": toolUrl,
    "name": tool.title,
    "description": tool.longDescription,
    "image": toolImage,
    "url": toolUrl,
    "brand": {
      "@type": "Brand",
      "name": tool.company
    },
    "manufacturer": {
      "@type": "Organization",
      "name": tool.company
    },
    "category": `AI ${tool.category} Tools`,
    "keywords": tool.tags.join(', '),
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
        "datePublished": `${tool.founded}-01-01`,
        "reviewBody": `${tool.description} Key features include: ${tool.features.slice(0, 3).join(', ')}. Strengths: ${tool.pros.join(', ')}.`
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