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
 * Optimized for 150-160 characters for best search engine display
 */
export const generateMetaDescription = (
  toolName?: string,
  category?: string,
  description?: string,
  action?: string
): string => {
  const minLength = 150;
  const maxLength = 160;
  
  if (toolName && description) {
    // Tool-specific descriptions with use cases
    let baseDesc = `${toolName}: ${description}`;
    
    // Add call-to-action to reach optimal length
    if (baseDesc.length < minLength) {
      baseDesc += ' Compare features, pricing & alternatives.';
    }
    
    if (baseDesc.length < minLength) {
      baseDesc += ' Read reviews & get started today.';
    }
    
    // Truncate if too long
    if (baseDesc.length > maxLength) {
      return baseDesc.substring(0, maxLength - 3) + '...';
    }
    
    return baseDesc;
  }
  
  if (category) {
    // Category-specific descriptions
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    let categoryDesc = `Discover top AI ${category} tools in 2025. Compare features, pricing & user reviews.`;
    
    // Pad to optimal length if needed
    if (categoryDesc.length < minLength) {
      categoryDesc += ` Find the best AI ${categoryTitle} solution for your needs.`;
    }
    
    // Truncate if too long
    if (categoryDesc.length > maxLength) {
      return categoryDesc.substring(0, maxLength - 3) + '...';
    }
    
    return categoryDesc;
  }
  
  // Default description optimized for 150-160 characters
  return "Find & compare 1000+ AI tools for writing, design, video, coding & more. Human-curated directory updated weekly. Compare features, pricing & reviews.";
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
    "softwareVersion": "Latest",
    "downloadUrl": tool.website,
    "installUrl": tool.website,
    "storageRequirements": "No installation required",
    "memoryRequirements": "Web browser with internet connection",
    "processorRequirements": "Any modern device",
    "keywords": tool.tags.join(', '),
    "isAccessibleForFree": tool.pricing === 'Free',
    "screenshot": `https://toolsml.com/tool-screenshots/${tool.id}.jpg`,
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
      "@id": `https://toolsml.com/tool/${tool.id}`,
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
          "@id": `https://toolsml.com/tool/${tool.id}`,
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
 * Ensures consistent URLs without trailing slashes (except for root)
 * IMPORTANT: Uses hardcoded base URL to ensure SSR/crawler compatibility
 */
export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://toolsml.com';
  
  // Handle empty or root path - return base URL without trailing slash
  if (!path || path === '/') {
    return baseUrl;
  }
  
  // Ensure path starts with / and remove trailing slashes
  let cleanPath = path.startsWith('/') ? path : `/${path}`;
  cleanPath = cleanPath.replace(/\/+$/, ''); // Remove trailing slashes
  cleanPath = cleanPath.replace(/\/+/g, '/'); // Remove duplicate slashes
  
  return `${baseUrl}${cleanPath}`;
};

/**
 * Generate Open Graph image URL for tools using dynamic edge function
 * Falls back to static images if tool/category not recognized
 */
export const generateOGImage = (toolName?: string, category?: string): string => {
  const supabaseUrl = 'https://kpynatdltoakbpwbjxqm.supabase.co';
  
  if (toolName) {
    // Generate dynamic PNG OG image for tools via edge function (better social platform compatibility)
    const toolId = toolName.toLowerCase().replace(/\s+/g, '-');
    return `${supabaseUrl}/functions/v1/og-image?type=tool&id=${encodeURIComponent(toolId)}&format=png`;
  }
  
  if (category) {
    // Generate dynamic PNG OG image for categories via edge function
    return `${supabaseUrl}/functions/v1/og-image?type=category&id=${encodeURIComponent(category.toLowerCase())}&format=png`;
  }
  
  // Default PNG OG image - use edge function for consistent branding
  return `${supabaseUrl}/functions/v1/og-image?type=home&format=png`;
};

/**
 * Validate and optimize meta description length to 150-160 characters
 * This is the sweet spot for search engine display
 */
export const optimizeMetaDescription = (description: string): string => {
  const minLength = 150;
  const maxLength = 160;
  
  // Already optimal length
  if (description.length >= minLength && description.length <= maxLength) {
    return description;
  }
  
  // Too long - truncate intelligently
  if (description.length > maxLength) {
    // Try to truncate at a sentence or word boundary
    const truncated = description.substring(0, maxLength - 3);
    const lastPeriod = truncated.lastIndexOf('.');
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastPeriod > maxLength - 20) {
      return truncated.substring(0, lastPeriod + 1);
    }
    
    if (lastSpace > maxLength - 10) {
      return truncated.substring(0, lastSpace) + '...';
    }
    
    return truncated + '...';
  }
  
  // Too short - pad with relevant keywords and CTAs
  let padded = description;
  
  const paddingOptions = [
    ' Compare features & pricing.',
    ' Read user reviews.',
    ' Find the best solution for your needs.',
    ' Updated weekly with new tools.',
    ' Start your free trial today.'
  ];
  
  for (const padding of paddingOptions) {
    if (padded.length >= minLength) break;
    if (padded.length + padding.length <= maxLength) {
      padded += padding;
    }
  }
  
  return padded;
};