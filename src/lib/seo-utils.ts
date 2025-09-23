import { Tool } from '../data/tools';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  url: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, any>;
}

/**
 * Generate SEO-optimized title with proper length and keywords
 */
export const generateSEOTitle = (
  toolName?: string, 
  category?: string, 
  action?: string
): string => {
  const baseName = "ToolsML";
  
  if (toolName && category && action) {
    // Tool-specific action pages: "ChatGPT Review & Pricing | AI Writing Tools | ToolsML"
    return `${toolName} ${action} | AI ${category} Tools | ${baseName}`;
  }
  
  if (toolName) {
    // Tool detail pages: "ChatGPT - AI Writing Assistant | ToolsML"
    return `${toolName} - AI Assistant | ${baseName}`;
  }
  
  if (category) {
    // Category pages: "Best AI Writing Tools 2025 | ToolsML"
    return `Best AI ${category.charAt(0).toUpperCase() + category.slice(1)} Tools 2025 | ${baseName}`;
  }
  
  // Default homepage
  return `${baseName} — Discover & Compare the Best AI Tools (Curated Weekly)`;
};

/**
 * Generate SEO-optimized meta description with keywords and calls-to-action
 */
export const generateMetaDescription = (
  toolName?: string,
  category?: string,
  description?: string,
  action?: string
): string => {
  const maxLength = 155;
  
  if (toolName && description) {
    // Tool-specific descriptions with use cases
    const baseDesc = `${toolName}: ${description} Compare features, pricing, pros & cons.`;
    return baseDesc.length <= maxLength ? baseDesc : baseDesc.substring(0, maxLength - 3) + '...';
  }
  
  if (category) {
    // Category-specific descriptions
    const categoryDesc = `Discover the best AI ${category} tools of 2025. Compare features, pricing, and user reviews. Find the perfect AI solution for your needs.`;
    return categoryDesc.length <= maxLength ? categoryDesc : categoryDesc.substring(0, maxLength - 3) + '...';
  }
  
  // Default description
  return "Find and compare the best AI tools for writing, design, video, code, and more. Human-curated, updated weekly with features, pricing, and real use-cases.";
};

/**
 * Generate comprehensive structured data for tools using SoftwareApplication schema
 */
export const generateToolStructuredData = (tool: Tool, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.title,
    "description": tool.longDescription,
    "url": tool.website,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": tool.pricing === 'Free' ? '0' : undefined,
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": tool.pricing === 'Free' ? '0' : undefined,
        "priceCurrency": "USD"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": tool.rating,
      "reviewCount": tool.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "author": {
      "@type": "Organization",
      "name": tool.company
    },
    "datePublished": tool.founded,
    "featureList": tool.features,
    "screenshot": `https://ai-toolsml.lovable.app/tool-screenshots/${tool.id}.jpg`,
    "softwareVersion": "Latest",
    "downloadUrl": tool.website,
    "installUrl": tool.website,
    "storageRequirements": "No installation required",
    "memoryRequirements": "Web browser with internet connection",
    "processorRequirements": "Any modern device",
    "keywords": tool.tags.join(', '),
    "isAccessibleForFree": tool.pricing === 'Free',
    "hasPart": tool.features.map((feature, index) => ({
      "@type": "SoftwareFeature",
      "name": feature,
      "description": `${tool.title} ${feature.toLowerCase()}`
    }))
  };
};

/**
 * Generate category page structured data
 */
export const generateCategoryStructuredData = (
  category: string, 
  tools: Tool[], 
  url: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Best AI ${category.charAt(0).toUpperCase() + category.slice(1)} Tools`,
    "description": `Comprehensive collection of the best AI ${category} tools, compared and reviewed.`,
    "url": url,
    "hasPart": tools.slice(0, 10).map(tool => ({
      "@type": "SoftwareApplication",
      "@id": `https://ai-toolsml.lovable.app/tool/${tool.id}`,
      "name": tool.title,
      "description": tool.description,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": tool.rating,
        "reviewCount": tool.reviewCount
      }
    })),
    "numberOfItems": tools.length,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": tools.slice(0, 10).map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "@id": `https://ai-toolsml.lovable.app/tool/${tool.id}`,
          "name": tool.title,
          "description": tool.description
        }
      }))
    }
  };
};

/**
 * Generate breadcrumb structured data
 */
export const generateBreadcrumbStructuredData = (
  breadcrumbs: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

/**
 * Generate FAQ structured data for tool pages
 */
export const generateToolFAQStructuredData = (tool: Tool) => {
  const faqs = [
    {
      question: `What is ${tool.title}?`,
      answer: tool.longDescription
    },
    {
      question: `How much does ${tool.title} cost?`,
      answer: `${tool.title} offers ${tool.pricing.toLowerCase()} pricing. ${
        tool.pricing === 'Free' ? 'It is completely free to use.' :
        tool.pricing === 'Freemium' ? 'It offers both free and premium features.' :
        tool.pricing === 'Subscription' ? 'It requires a subscription to access.' :
        'It requires a one-time payment.'
      }`
    },
    {
      question: `What are the main features of ${tool.title}?`,
      answer: `Key features include: ${tool.features.slice(0, 5).join(', ')}.`
    }
  ];

  return {
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
  };
};

/**
 * Generate review structured data for tools
 */
export const generateReviewStructuredData = (tool: Tool) => {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": tool.title,
      "description": tool.description
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": tool.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "author": {
      "@type": "Organization",
      "name": "ToolsML Editorial Team"
    },
    "reviewBody": `${tool.title} is ${tool.description.toLowerCase()} Key strengths: ${tool.pros.join(', ')}. Areas for improvement: ${tool.cons.join(', ')}.`,
    "datePublished": new Date().toISOString()
  };
};

/**
 * Generate optimized keywords for pages
 */
export const generateKeywords = (
  toolName?: string,
  category?: string,
  tags?: string[]
): string => {
  const baseKeywords = ['AI tools', 'artificial intelligence', 'software comparison', 'productivity tools'];
  const keywords = [...baseKeywords];
  
  if (toolName) {
    keywords.push(
      toolName,
      `${toolName} review`,
      `${toolName} pricing`,
      `${toolName} alternatives`,
      `${toolName} features`
    );
  }
  
  if (category) {
    keywords.push(
      `AI ${category} tools`,
      `best ${category} software`,
      `${category} automation`,
      `${category} AI assistant`
    );
  }
  
  if (tags) {
    keywords.push(...tags.map(tag => tag.toLowerCase()));
  }
  
  return [...new Set(keywords)].join(', ');
};

/**
 * Generate canonical URL with proper formatting
 */
export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://ai-toolsml.lovable.app';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

/**
 * Generate Open Graph image URL for tools
 */
export const generateOGImage = (toolName?: string, category?: string): string => {
  const baseUrl = 'https://ai-toolsml.lovable.app';
  
  if (toolName) {
    // Tool-specific OG image
    return `${baseUrl}/og-images/tool-${toolName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
  }
  
  if (category) {
    // Category-specific OG image
    return `${baseUrl}/og-images/category-${category}.jpg`;
  }
  
  // Default OG image
  return `${baseUrl}/og-image.jpg`;
};

/**
 * Validate and optimize meta description length
 */
export const optimizeMetaDescription = (description: string): string => {
  const maxLength = 155;
  const minLength = 120;
  
  if (description.length <= maxLength && description.length >= minLength) {
    return description;
  }
  
  if (description.length > maxLength) {
    return description.substring(0, maxLength - 3) + '...';
  }
  
  // If too short, pad with relevant keywords
  return description + ' Compare features, pricing, reviews, and alternatives.';
};