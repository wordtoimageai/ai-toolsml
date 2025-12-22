/**
 * Schema.org Structured Data Utilities
 * Comprehensive schema templates for rich snippets in Google search results
 */

import { Tool, getSchemaPrice } from '@/data/tools';

const BASE_URL = 'https://toolsml.com';

// Organization Schema - Use on Home Page and globally
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ToolsML",
  "url": BASE_URL,
  "logo": `${BASE_URL}/og-image.jpg`,
  "description": "Discover and compare the best AI tools. Human-curated directory of 1000+ AI tools for writing, design, video, code, and more.",
  "foundingDate": "2024",
  "sameAs": [
    "https://twitter.com/toolsml",
    "https://linkedin.com/company/toolsml"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "url": `${BASE_URL}/contact`,
    "email": "hello@toolsml.com"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "50000",
    "bestRating": "5",
    "worstRating": "1"
  }
};

// WebSite Schema with SearchAction - Use on Home Page
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ToolsML",
  "alternateName": "Tools ML - AI Tool Directory",
  "url": BASE_URL,
  "description": "Find and compare 1000+ AI tools for writing, design, video, code, and more.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/browse?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ToolsML",
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/og-image.jpg`
    }
  }
};

// Breadcrumb Schema Generator
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
  }))
});

// Software Application Schema - Use on individual tool pages
export const generateToolSchema = (tool: Tool) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": tool.title,
  "applicationCategory": `${tool.category.charAt(0).toUpperCase() + tool.category.slice(1)} Software`,
  "applicationSubCategory": "AI Tool",
  "description": tool.longDescription || tool.description,
  "url": `${BASE_URL}/tool/${tool.id}`,
  "image": `${BASE_URL}/og-image.jpg`,
  "operatingSystem": "Web",
  "datePublished": `${tool.founded}-01-01`,
  "author": {
    "@type": "Organization",
    "name": tool.company
  },
  "publisher": {
    "@type": "Organization",
    "name": "ToolsML"
  },
  "offers": {
    "@type": "Offer",
    "price": getSchemaPrice(tool),
    "priceCurrency": tool.priceInfo?.currency || "USD",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    ...(tool.priceInfo?.priceDescription && { "description": tool.priceInfo.priceDescription })
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": tool.rating.toFixed(1),
    "reviewCount": tool.reviewCount.toString(),
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": tool.features,
  "keywords": tool.tags.join(", ")
});

// Product Review Schema for tool pages
export const generateReviewSchema = (tool: Tool) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "SoftwareApplication",
    "name": tool.title,
    "applicationCategory": "AI Tool"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": tool.rating.toFixed(1),
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Organization",
    "name": "ToolsML Editorial Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ToolsML"
  },
  "datePublished": new Date().toISOString().split('T')[0],
  "reviewBody": `${tool.title} is a ${tool.pricing.toLowerCase()} ${tool.category} AI tool. ${tool.description}`,
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
});

// ItemList Schema for tool collections
export const generateItemListSchema = (
  items: Array<{ name: string; url: string; description?: string; image?: string }>,
  listName: string,
  listDescription: string
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": listName,
  "description": listDescription,
  "numberOfItems": items.length,
  "itemListOrder": "https://schema.org/ItemListOrderDescending",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "url": item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    "name": item.name,
    ...(item.description && { "description": item.description }),
    ...(item.image && { "image": item.image })
  }))
});

// CollectionPage Schema for category/tag pages
export const generateCollectionPageSchema = (options: {
  name: string;
  description: string;
  url: string;
  toolCount: number;
  tools?: Tool[];
}) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": options.name,
  "description": options.description,
  "url": options.url.startsWith('http') ? options.url : `${BASE_URL}${options.url}`,
  "inLanguage": "en-US",
  "isPartOf": {
    "@type": "WebSite",
    "name": "ToolsML",
    "url": BASE_URL
  },
  "numberOfItems": options.toolCount,
  ...(options.tools && options.tools.length > 0 && {
    "mainEntity": {
      "@type": "ItemList",
      "name": options.name,
      "numberOfItems": options.tools.length,
      "itemListElement": options.tools.slice(0, 20).map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "@id": `${BASE_URL}/tool/${tool.id}`,
          "name": tool.title,
          "description": tool.description,
          "url": `${BASE_URL}/tool/${tool.id}`,
          "applicationCategory": tool.category,
          "operatingSystem": "Web"
        }
      }))
    }
  })
});

// FAQ Schema Generator
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// How-To Schema for tutorial pages
export const generateHowToSchema = (options: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; url?: string }>;
  totalTime?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": options.name,
  "description": options.description,
  ...(options.totalTime && { "totalTime": options.totalTime }),
  "step": options.steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    ...(step.url && { "url": step.url })
  }))
});

// Article Schema for blog posts
export const generateArticleSchema = (options: {
  title: string;
  description: string;
  url: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": options.title,
  "description": options.description,
  "url": options.url.startsWith('http') ? options.url : `${BASE_URL}${options.url}`,
  "datePublished": options.datePublished,
  "dateModified": options.dateModified || options.datePublished,
  "author": {
    "@type": "Person",
    "name": options.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "ToolsML",
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/og-image.jpg`
    }
  },
  "image": options.image || `${BASE_URL}/og-image.jpg`,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": options.url.startsWith('http') ? options.url : `${BASE_URL}${options.url}`
  }
});

// Combine multiple schemas into a graph
export const combineSchemas = (...schemas: object[]) => ({
  "@context": "https://schema.org",
  "@graph": schemas.map(schema => {
    // Remove @context from individual schemas when combining
    const { "@context": _, ...rest } = schema as Record<string, unknown>;
    return rest;
  })
});

// Generate complete tool page schema (combines multiple schemas)
export const generateCompleteToolSchema = (tool: Tool) => {
  const toolSchema = generateToolSchema(tool);
  const reviewSchema = generateReviewSchema(tool);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: tool.category.charAt(0).toUpperCase() + tool.category.slice(1), url: `/category/${tool.category}` },
    { name: tool.title, url: `/tool/${tool.id}` }
  ]);
  
  return combineSchemas(toolSchema, reviewSchema, breadcrumbSchema);
};

// Generate category page schema
export const generateCompleteCategorySchema = (category: string, tools: Tool[], description: string) => {
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  const collectionSchema = generateCollectionPageSchema({
    name: `Best ${categoryName} AI Tools 2025`,
    description,
    url: `/category/${category}`,
    toolCount: tools.length,
    tools
  });
  
  const itemListSchema = generateItemListSchema(
    tools.slice(0, 10).map(tool => ({
      name: tool.title,
      url: `/tool/${tool.id}`,
      description: tool.description
    })),
    `Top ${categoryName} AI Tools`,
    `Curated list of the best ${categoryName} AI tools`
  );
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Categories", url: "/browse" },
    { name: categoryName, url: `/category/${category}` }
  ]);
  
  return combineSchemas(collectionSchema, itemListSchema, breadcrumbSchema);
};

export default {
  organizationSchema,
  websiteSchema,
  generateBreadcrumbSchema,
  generateToolSchema,
  generateReviewSchema,
  generateItemListSchema,
  generateCollectionPageSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateArticleSchema,
  combineSchemas,
  generateCompleteToolSchema,
  generateCompleteCategorySchema
};
