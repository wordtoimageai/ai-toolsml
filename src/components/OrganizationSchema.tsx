import { Helmet } from 'react-helmet-async';

/**
 * Organization Schema component for enhanced SEO
 * Provides structured data about ToolsML as an organization
 */
const OrganizationSchema = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ToolsML",
    "url": "https://ai-toolsml.lovable.app",
    "logo": "https://ai-toolsml.lovable.app/og-image.jpg",
    "description": "Your trusted guide to discovering and comparing the best AI tools across 200+ categories",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/toolsml",
      "https://linkedin.com/company/toolsml"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "contact@toolsml.com",
      "availableLanguage": ["English"]
    },
    "areaServed": "Worldwide",
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning Tools",
      "AI Software",
      "Business Automation",
      "Productivity Tools"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ToolsML",
    "url": "https://ai-toolsml.lovable.app",
    "description": "Discover, compare, and find the perfect AI tools for your needs",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://ai-toolsml.lovable.app/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ToolsML",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ai-toolsml.lovable.app/og-image.jpg"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default OrganizationSchema;