import { Helmet } from 'react-helmet-async';
import { Tool } from '@/data/tools';

interface ItemListSchemaProps {
  items: Tool[];
  listName: string;
  listDescription: string;
  maxItems?: number;
}

/**
 * ItemList Schema component for collections of tools
 * Enhances SEO for tool listings on homepage, categories, and search results
 */
const ItemListSchema = ({ 
  items, 
  listName, 
  listDescription, 
  maxItems = 10 
}: ItemListSchemaProps) => {
  const displayItems = items.slice(0, maxItems);
  
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": listName,
    "description": listDescription,
    "numberOfItems": displayItems.length,
    "itemListOrder": "https://schema.org/ItemListOrderDescending",
    "itemListElement": displayItems.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://ai-toolsml.lovable.app/tool/${tool.id}`,
      "item": {
        "@type": "SoftwareApplication",
        "@id": `https://ai-toolsml.lovable.app/tool/${tool.id}`,
        "name": tool.title,
        "description": tool.description,
        "url": `https://ai-toolsml.lovable.app/tool/${tool.id}`,
        "applicationCategory": "AI Tool",
        "applicationSubCategory": tool.category,
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": tool.pricing === 'Free' ? "0" : tool.pricing === 'Freemium' ? "0" : null,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tool.rating.toString(),
          "reviewCount": tool.reviewCount.toString(),
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Organization",
          "name": tool.company
        },
        "datePublished": tool.founded,
        "image": "https://ai-toolsml.lovable.app/og-image.jpg",
        "keywords": tool.tags.join(", ")
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(itemListSchema)}
      </script>
    </Helmet>
  );
};

export default ItemListSchema;