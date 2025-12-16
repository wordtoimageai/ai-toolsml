import { Helmet } from 'react-helmet-async';

/**
 * Organization Schema component for enhanced SEO
 * Provides comprehensive structured data about ToolsML as an organization
 */
const OrganizationSchema = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ToolsML",
    "alternateName": "Tools ML",
    "url": "https://toolsml.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://toolsml.com/og-image.jpg",
      "width": "1200",
      "height": "630"
    },
    "image": "https://toolsml.com/og-image.jpg",
    "description": "Your trusted guide to discovering and comparing the best AI tools across 200+ categories. We curate, review, and update 1000+ AI solutions weekly.",
    "slogan": "Discover, Compare, and Choose the Perfect AI Tools",
    "foundingDate": "2024",
    "founder": {
      "@type": "Organization",
      "name": "ToolsML Team"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://twitter.com/toolsml",
      "https://linkedin.com/company/toolsml",
      "https://github.com/toolsml"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "contact@toolsml.com",
        "availableLanguage": ["en", "English"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "Technical Support",
        "email": "support@toolsml.com",
        "availableLanguage": ["en", "English"]
      }
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning Tools",
      "AI Software",
      "Business Automation",
      "Productivity Tools",
      "AI Content Creation",
      "AI Code Generation",
      "AI Design Tools",
      "AI Marketing Tools",
      "AI Analytics"
    ],
    "award": [
      "Best AI Tools Directory 2024",
      "Top Tech Resource Platform"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2500",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ToolsML - Best AI Tools Directory 2025",
    "alternateName": "ToolsML",
    "url": "https://toolsml.com",
    "description": "Discover, compare, and find the perfect AI tools for your needs. 1000+ curated AI solutions across 200+ categories, updated weekly.",
    "inLanguage": "en-US",
    "copyrightYear": "2024",
    "copyrightHolder": {
      "@type": "Organization",
      "name": "ToolsML"
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://toolsml.com/?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "ToolsML",
      "logo": {
        "@type": "ImageObject",
        "url": "https://toolsml.com/og-image.jpg",
        "width": "1200",
        "height": "630"
      }
    },
    "audience": {
      "@type": "Audience",
      "audienceType": ["Developers", "Marketers", "Content Creators", "Business Owners", "Students"]
    },
    "keywords": "AI tools, artificial intelligence, machine learning, AI software, productivity tools, AI directory"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://toolsml.com"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default OrganizationSchema;