import { Helmet } from 'react-helmet-async';
import { Tool } from '@/data/tools';

interface CollectionPageSchemaProps {
  category: string;
  tools: Tool[];
  description: string;
}

/**
 * CollectionPage Schema for category and tag pages
 * Provides rich structured data for tool collection pages
 */
const CollectionPageSchema = ({ 
  category, 
  tools, 
  description 
}: CollectionPageSchemaProps) => {
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Best ${categoryName} AI Tools 2025`,
    "description": description,
    "url": `https://toolsml.com/category/${category}`,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "ToolsML",
      "url": "https://toolsml.com"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://toolsml.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Categories",
          "item": "https://toolsml.com/categories"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": categoryName,
          "item": `https://toolsml.com/category/${category}`
        }
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": `Top ${categoryName} AI Tools`,
      "description": `Curated list of the best ${categoryName} AI tools`,
      "numberOfItems": tools.length,
      "itemListElement": tools.slice(0, 20).map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "@id": `https://toolsml.com/tool/${tool.id}`,
          "name": tool.title,
          "description": tool.description,
          "url": `https://toolsml.com/tool/${tool.id}`,
          "applicationCategory": categoryName,
          "operatingSystem": "Web",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": tool.rating.toString(),
            "reviewCount": tool.reviewCount.toString(),
            "bestRating": "5",
            "worstRating": "1"
          },
          "offers": {
            "@type": "Offer",
            "price": tool.pricing === 'Free' ? "0" : null,
            "priceCurrency": "USD"
          }
        }
      }))
    },
    "about": {
      "@type": "Thing",
      "name": `${categoryName} AI Tools`,
      "description": `Collection of AI-powered ${categoryName} tools`
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(collectionSchema)}
      </script>
    </Helmet>
  );
};

export default CollectionPageSchema;