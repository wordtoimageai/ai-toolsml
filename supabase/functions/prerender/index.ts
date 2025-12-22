import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

// Complete tool metadata for prerendering
const toolsMetadata: Record<string, { title: string; description: string; category: string; rating: string }> = {
  'chatgpt': {
    title: 'ChatGPT',
    description: 'Advanced conversational AI that can help with writing, coding, analysis, and creative tasks. Developed by OpenAI.',
    category: 'Writing',
    rating: '4.8'
  },
  'midjourney': {
    title: 'Midjourney',
    description: 'Create stunning, high-quality images from text descriptions using advanced AI algorithms.',
    category: 'Design',
    rating: '4.7'
  },
  'github-copilot': {
    title: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code faster with less work. Powered by OpenAI Codex.',
    category: 'Coding',
    rating: '4.6'
  },
  'claude': {
    title: 'Claude',
    description: 'Anthropic\'s AI assistant designed to be helpful, harmless, and honest. Excellent for analysis and writing.',
    category: 'Writing',
    rating: '4.7'
  },
  'jasper-ai': {
    title: 'Jasper AI',
    description: 'AI content platform that helps businesses create on-brand content faster.',
    category: 'Writing',
    rating: '4.5'
  },
  'perplexity': {
    title: 'Perplexity',
    description: 'AI-powered search engine that provides accurate, up-to-date answers with cited sources.',
    category: 'Research',
    rating: '4.6'
  },
  'stable-diffusion': {
    title: 'Stable Diffusion',
    description: 'Open-source text-to-image AI model for creating detailed images based on text descriptions.',
    category: 'Design',
    rating: '4.5'
  },
  'notion-ai': {
    title: 'Notion AI',
    description: 'AI writing assistant integrated into Notion for drafting, editing, and summarizing content.',
    category: 'Productivity',
    rating: '4.4'
  },
  'synthesia': {
    title: 'Synthesia',
    description: 'Create AI-generated videos with virtual presenters from text in minutes.',
    category: 'Video',
    rating: '4.5'
  },
  'runway-ml': {
    title: 'Runway ML',
    description: 'Creative AI toolkit for video editing, image generation, and multimodal AI tools.',
    category: 'Video',
    rating: '4.6'
  },
  'elevenlabs': {
    title: 'ElevenLabs',
    description: 'AI voice generator that creates natural-sounding speech and voice cloning.',
    category: 'Audio',
    rating: '4.7'
  },
  'adobe-firefly': {
    title: 'Adobe Firefly',
    description: 'Adobe\'s generative AI for creating images, text effects, and creative content.',
    category: 'Design',
    rating: '4.5'
  },
  'zapier': {
    title: 'Zapier',
    description: 'Automation platform that connects apps and automates workflows with AI assistance.',
    category: 'Automation',
    rating: '4.6'
  },
  'figma': {
    title: 'Figma',
    description: 'Collaborative design tool with AI features for prototyping and design systems.',
    category: 'Design',
    rating: '4.8'
  },
  'deepseek': {
    title: 'DeepSeek',
    description: 'Advanced AI model for code generation, reasoning, and complex problem-solving.',
    category: 'Coding',
    rating: '4.5'
  }
};

// Pre-rendered meta data for SEO crawlers
const pageMetadata: Record<string, {
  title: string;
  description: string;
  canonical: string;
  ogType: string;
  h1?: string;
}> = {
  '/': {
    title: 'ToolsML - Discover Best AI Tools 2025 | 1000+ Curated Solutions',
    description: 'Find perfect AI tools from 1000+ options across 200+ categories. Compare features, pricing, and reviews. Human-curated directory updated weekly with latest AI innovations.',
    canonical: 'https://toolsml.com/',
    ogType: 'website',
    h1: 'Find the Perfect AI Tool for Every Task'
  },
  '/browse': {
    title: 'Browse All AI Tools - Complete Directory of 1000+ Tools | ToolsML',
    description: 'Explore our complete directory of 1000+ AI tools. Filter by category, pricing, and features. Find the perfect AI tool for your needs with detailed reviews and comparisons.',
    canonical: 'https://toolsml.com/browse',
    ogType: 'website',
    h1: 'Browse All AI Tools'
  },
  '/about': {
    title: 'About ToolsML - AI Tool Discovery Platform | Trusted by 50K+ Users',
    description: 'Learn about ToolsML, the leading platform for discovering and comparing AI tools. Our mission is to help you find the perfect AI solutions with curated, weekly-updated listings.',
    canonical: 'https://toolsml.com/about',
    ogType: 'website',
    h1: 'About ToolsML'
  },
  '/blog': {
    title: 'AI Tools Blog - Latest Insights, Trends & Expert Reviews | ToolsML',
    description: 'Stay updated with the latest AI tools, trends, and insights. Expert reviews, guides, and industry analysis from ToolsML. Free AI tool resources.',
    canonical: 'https://toolsml.com/blog',
    ogType: 'website',
    h1: 'AI Tools Blog'
  },
  '/contact': {
    title: 'Contact Us - Get in Touch with ToolsML Team',
    description: 'Have questions or suggestions? Contact ToolsML team for support, partnerships, or tool submissions. We respond within 24 hours.',
    canonical: 'https://toolsml.com/contact',
    ogType: 'website',
    h1: 'Contact ToolsML'
  },
  '/submit': {
    title: 'Submit Your AI Tool - Get Listed on ToolsML | Free Submission',
    description: 'Submit your AI tool to ToolsML\'s curated directory. Reach thousands of potential users searching for AI solutions. Free submission for all tools.',
    canonical: 'https://toolsml.com/submit',
    ogType: 'website',
    h1: 'Submit Your AI Tool'
  },
  '/privacy': {
    title: 'Privacy Policy - ToolsML | Data Protection & Security',
    description: 'Learn how ToolsML protects your privacy and handles your personal information. Transparent data practices and user rights explained.',
    canonical: 'https://toolsml.com/privacy',
    ogType: 'website',
    h1: 'Privacy Policy'
  },
  '/terms': {
    title: 'Terms of Service - ToolsML | User Agreement',
    description: 'Read ToolsML\'s terms of service and user agreement. Understand your rights and responsibilities when using our AI tools directory.',
    canonical: 'https://toolsml.com/terms',
    ogType: 'website',
    h1: 'Terms of Service'
  },
  '/advertise': {
    title: 'Advertise on ToolsML - Reach AI Tool Buyers | Sponsorship Options',
    description: 'Advertise your AI tool on ToolsML and reach thousands of engaged users actively searching for AI solutions. Sponsored listings, display ads, and newsletter sponsorships.',
    canonical: 'https://toolsml.com/advertise',
    ogType: 'website',
    h1: 'Advertise with ToolsML'
  },
  '/tutorials': {
    title: 'AI Tools Tutorials - Learn How to Use AI Effectively | ToolsML',
    description: 'Step-by-step tutorials on how to use AI tools effectively. From beginner guides to advanced techniques for AI mastery. Free AI learning resources.',
    canonical: 'https://toolsml.com/tutorials',
    ogType: 'website',
    h1: 'AI Tools Tutorials'
  },
  '/api-docs': {
    title: 'API Documentation - ToolsML | Developer Integration Guide',
    description: 'Integrate ToolsML data into your applications with our comprehensive API documentation. Access 1000+ AI tools programmatically.',
    canonical: 'https://toolsml.com/api-docs',
    ogType: 'website',
    h1: 'API Documentation'
  },
  '/changelog': {
    title: 'Changelog - ToolsML Updates, New Features & Releases',
    description: 'Stay updated with the latest ToolsML features, improvements, and bug fixes. See our development history and what\'s new.',
    canonical: 'https://toolsml.com/changelog',
    ogType: 'website',
    h1: 'Changelog'
  },
  '/compare': {
    title: 'Compare AI Tools Side by Side - Feature Comparison | ToolsML',
    description: 'Compare AI tools side-by-side. Analyze features, pricing, pros & cons, and reviews to make informed decisions. Free tool comparison.',
    canonical: 'https://toolsml.com/compare',
    ogType: 'website',
    h1: 'Compare AI Tools'
  },
  '/favorites': {
    title: 'My Favorite AI Tools - Saved Collection | ToolsML',
    description: 'Your curated collection of favorite AI tools. Save and organize the best AI solutions for easy access and quick reference.',
    canonical: 'https://toolsml.com/favorites',
    ogType: 'website',
    h1: 'My Favorite AI Tools'
  }
};

// Category metadata with SEO-optimized content
const categories = ['writing', 'design', 'coding', 'marketing', 'productivity', 'audio', 'video', 'research', 'data', 'automation', 'sales', 'social', 'seo'];

const categoryDescriptions: Record<string, string> = {
  'writing': 'Discover the best AI writing tools for content creation, copywriting, and editing. Compare ChatGPT, Claude, Jasper, and more.',
  'design': 'Find top AI design tools for image generation, graphic design, and creative work. Compare Midjourney, DALL-E, Adobe Firefly, and more.',
  'coding': 'Explore AI coding assistants for faster development. Compare GitHub Copilot, Cursor, Replit Ghostwriter, and code generation tools.',
  'marketing': 'Discover AI marketing tools for content, ads, SEO, and automation. Compare HubSpot AI, Jasper, Copy.ai, and marketing platforms.',
  'productivity': 'Find AI productivity tools for task management, note-taking, and automation. Compare Notion AI, ClickUp, Otter.ai, and more.',
  'audio': 'Explore AI audio tools for voice generation, music creation, and podcasting. Compare ElevenLabs, Mubert, Descript, and audio AI.',
  'video': 'Discover AI video tools for editing, generation, and enhancement. Compare Synthesia, Runway, Descript, and video AI platforms.',
  'research': 'Find AI research tools for academic work, data analysis, and insights. Compare Perplexity, Semantic Scholar, and research AI.',
  'data': 'Explore AI data tools for analytics, visualization, and insights. Compare data AI platforms and business intelligence tools.',
  'automation': 'Discover AI automation tools for workflows and processes. Compare Zapier, Make, and workflow automation platforms.',
  'sales': 'Find AI sales tools for outreach, CRM, and pipeline management. Compare Reply.io, Gong, and sales AI platforms.',
  'social': 'Explore AI social media tools for content creation and management. Compare Sprout Social, Buffer AI, and social platforms.',
  'seo': 'Discover AI SEO tools for keyword research, content optimization, and rankings. Compare Surfer SEO, MarketMuse, and SEO AI.'
};

categories.forEach(cat => {
  const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
  pageMetadata[`/category/${cat}`] = {
    title: `Best ${catName} AI Tools 2025 - Compare Features & Pricing | ToolsML`,
    description: categoryDescriptions[cat] || `Discover the best ${catName.toLowerCase()} AI tools in 2025. Compare features, pricing, and reviews for top-rated ${catName.toLowerCase()} solutions.`,
    canonical: `https://toolsml.com/category/${cat}`,
    ogType: 'website',
    h1: `Best AI ${catName} Tools`
  };
});

// Generate tool page metadata dynamically
Object.entries(toolsMetadata).forEach(([id, tool]) => {
  pageMetadata[`/tool/${id}`] = {
    title: `${tool.title} Review 2025: ${tool.category} AI Tool - Features & Pricing | ToolsML`,
    description: `${tool.title} - ${tool.description} Rating: ${tool.rating}/5. Compare with alternatives, see pros & cons, and read user reviews.`,
    canonical: `https://toolsml.com/tool/${id}`,
    ogType: 'article',
    h1: `${tool.title} - AI ${tool.category} Tool Review`
  };
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generatePrerenderedHtml(path: string): string {
  const meta = pageMetadata[path] || {
    title: 'ToolsML - Discover & Compare the Best AI Tools 2025',
    description: 'Find and compare 1000+ AI tools for writing, design, video, code, and more. Human-curated directory with features, pricing, and reviews.',
    canonical: `https://toolsml.com${path}`,
    ogType: 'website',
    h1: 'Discover the Best AI Tools'
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": meta.title,
    "description": meta.description,
    "url": meta.canonical,
    "isPartOf": {
      "@type": "WebSite",
      "name": "ToolsML",
      "url": "https://toolsml.com"
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}">
  <link rel="canonical" href="${meta.canonical}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  
  <!-- Open Graph -->
  <meta property="og:type" content="${meta.ogType}">
  <meta property="og:url" content="${meta.canonical}">
  <meta property="og:title" content="${escapeHtml(meta.title)}">
  <meta property="og:description" content="${escapeHtml(meta.description)}">
  <meta property="og:image" content="https://toolsml.com/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="ToolsML">
  <meta property="og:locale" content="en_US">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(meta.title)}">
  <meta name="twitter:description" content="${escapeHtml(meta.description)}">
  <meta name="twitter:image" content="https://toolsml.com/og-image.jpg">
  <meta name="twitter:site" content="@toolsml">
  
  <!-- Additional SEO -->
  <meta name="author" content="ToolsML Editorial Team">
  <meta name="publisher" content="ToolsML">
  <meta name="theme-color" content="#667eea">
  
  <!-- Preconnect for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Structured Data -->
  <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <a href="/">ToolsML</a>
    </nav>
  </header>
  <main>
    <h1>${escapeHtml(meta.h1 || meta.title)}</h1>
    <p>${escapeHtml(meta.description)}</p>
    <p>Loading full application...</p>
  </main>
  <footer>
    <p>&copy; 2025 ToolsML. All rights reserved.</p>
  </footer>
  <script>
    // Redirect to SPA after prerender content is shown
    if (!window.__PRERENDER_INJECTED) {
      window.location.href = "${meta.canonical}";
    }
  </script>
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
        title: 'ToolsML - Discover & Compare the Best AI Tools 2025',
        description: 'Find and compare 1000+ AI tools for writing, design, video, code, and more.',
        canonical: `https://toolsml.com${path}`,
        ogType: 'website',
        h1: 'Discover the Best AI Tools'
      };

      return new Response(JSON.stringify(meta, null, 2), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
      });
    }

    if (format === 'all') {
      // Return all page metadata for debugging
      return new Response(JSON.stringify({
        generated: new Date().toISOString(),
        totalPages: Object.keys(pageMetadata).length,
        pages: pageMetadata
      }, null, 2), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
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
        'X-Prerender-Status': '200',
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