import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

// Pre-rendered meta data for SEO crawlers
const pageMetadata: Record<string, {
  title: string;
  description: string;
  canonical: string;
  ogType: string;
}> = {
  '/': {
    title: 'ToolsML — Discover & Compare the Best AI Tools (Curated Weekly)',
    description: 'Find and compare the best AI tools for writing, design, video, code, and more. Human-curated, updated weekly with features, pricing, and real use-cases.',
    canonical: 'https://toolsml.com/',
    ogType: 'website'
  },
  '/browse': {
    title: 'Browse All AI Tools - Complete Directory | ToolsML',
    description: 'Explore our complete directory of 1000+ AI tools. Filter by category, pricing, and features. Find the perfect AI tool for your needs.',
    canonical: 'https://toolsml.com/browse',
    ogType: 'website'
  },
  '/about': {
    title: 'About ToolsML - Your Trusted AI Tools Directory',
    description: 'Learn about ToolsML\'s mission to help professionals discover and compare the best AI tools available. Join 50K+ users finding perfect AI solutions.',
    canonical: 'https://toolsml.com/about',
    ogType: 'website'
  },
  '/blog': {
    title: 'AI Tools Blog - Tips, Guides & News | ToolsML',
    description: 'Stay updated with the latest AI tools news, tutorials, and insights. Expert guides to help you make the most of AI technology.',
    canonical: 'https://toolsml.com/blog',
    ogType: 'website'
  },
  '/contact': {
    title: 'Contact ToolsML - Get in Touch',
    description: 'Have questions about AI tools? Contact the ToolsML team for support, partnerships, or tool submissions.',
    canonical: 'https://toolsml.com/contact',
    ogType: 'website'
  },
  '/submit': {
    title: 'Submit AI Tool - ToolsML | Get Featured',
    description: 'Submit your AI tool to be featured in our directory. Share innovative AI solutions with our community of 50K+ users.',
    canonical: 'https://toolsml.com/submit',
    ogType: 'website'
  },
  '/privacy': {
    title: 'Privacy Policy - ToolsML | Data Protection & Security',
    description: 'Learn how ToolsML protects your privacy and handles your personal information. Transparent data practices and user rights.',
    canonical: 'https://toolsml.com/privacy',
    ogType: 'website'
  },
  '/terms': {
    title: 'Terms of Service - ToolsML',
    description: 'Read our terms of service to understand the rules and guidelines for using ToolsML.',
    canonical: 'https://toolsml.com/terms',
    ogType: 'website'
  },
  '/advertise': {
    title: 'Advertise with ToolsML - Reach AI Tool Users',
    description: 'Promote your AI tool to thousands of professionals and decision-makers. Multiple advertising options available.',
    canonical: 'https://toolsml.com/advertise',
    ogType: 'website'
  },
  '/tutorials': {
    title: 'AI Tools Tutorials - Learn How to Use AI Effectively | ToolsML',
    description: 'Step-by-step tutorials on how to use AI tools effectively. From beginner guides to advanced techniques for AI mastery.',
    canonical: 'https://toolsml.com/tutorials',
    ogType: 'website'
  },
  '/api-docs': {
    title: 'API Documentation - ToolsML | Developer Integration',
    description: 'Integrate ToolsML data into your applications with our comprehensive API documentation. Access 1000+ AI tools programmatically.',
    canonical: 'https://toolsml.com/api-docs',
    ogType: 'website'
  },
  '/changelog': {
    title: 'Changelog - ToolsML Updates & Releases',
    description: 'Stay updated with the latest ToolsML features, improvements, and bug fixes. See our development history.',
    canonical: 'https://toolsml.com/changelog',
    ogType: 'website'
  },
  '/compare': {
    title: 'Compare AI Tools - Side by Side | ToolsML',
    description: 'Compare AI tools side-by-side. Analyze features, pricing, and reviews to make informed decisions.',
    canonical: 'https://toolsml.com/compare',
    ogType: 'website'
  },
  '/favorites': {
    title: 'My Favorite AI Tools - ToolsML',
    description: 'Your curated collection of favorite AI tools. Save and organize the best AI solutions for easy access.',
    canonical: 'https://toolsml.com/favorites',
    ogType: 'website'
  }
};

// Category metadata
const categories = ['writing', 'design', 'coding', 'marketing', 'productivity', 'audio', 'video', 'research', 'data', 'automation', 'sales', 'social', 'seo'];

categories.forEach(cat => {
  const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
  pageMetadata[`/category/${cat}`] = {
    title: `Best ${catName} AI Tools 2025 - Compare & Review | ToolsML`,
    description: `Discover the best ${catName.toLowerCase()} AI tools in 2025. Compare features, pricing, and reviews for top-rated ${catName.toLowerCase()} solutions.`,
    canonical: `https://toolsml.com/category/${cat}`,
    ogType: 'website'
  };
});

function generatePrerenderedHtml(path: string): string {
  const meta = pageMetadata[path] || {
    title: 'ToolsML — Discover & Compare the Best AI Tools',
    description: 'Find and compare the best AI tools for your needs.',
    canonical: `https://toolsml.com${path}`,
    ogType: 'website'
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  <link rel="canonical" href="${meta.canonical}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta property="og:type" content="${meta.ogType}">
  <meta property="og:url" content="${meta.canonical}">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:image" content="https://toolsml.com/og-image.jpg">
  <meta property="og:site_name" content="ToolsML">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="https://toolsml.com/og-image.jpg">
  <meta name="twitter:site" content="@toolsml">
</head>
<body>
  <h1>${meta.title}</h1>
  <p>${meta.description}</p>
  <p>Loading full application...</p>
  <script>window.location.href = "${meta.canonical}";</script>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.searchParams.get('path') || '/';
    const format = url.searchParams.get('format') || 'html';

    if (format === 'json') {
      // Return metadata as JSON
      const meta = pageMetadata[path] || {
        title: 'ToolsML — Discover & Compare the Best AI Tools',
        description: 'Find and compare the best AI tools for your needs.',
        canonical: `https://toolsml.com${path}`,
        ogType: 'website'
      };

      return new Response(JSON.stringify(meta, null, 2), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
      });
    }

    // Return pre-rendered HTML
    const html = generatePrerenderedHtml(path);
    
    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Prerender error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate prerendered content' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});