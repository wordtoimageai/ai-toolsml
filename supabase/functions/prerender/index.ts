import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

// Complete tool metadata for all tools
const toolsMetadata: Record<string, { title: string; description: string; category: string; rating: string }> = {
  'chatgpt': { title: 'ChatGPT', description: 'Advanced conversational AI for writing, coding, analysis, and creative tasks by OpenAI.', category: 'Writing', rating: '4.8' },
  'midjourney': { title: 'Midjourney', description: 'Create stunning AI-generated images from text prompts with unique artistic styles.', category: 'Design', rating: '4.7' },
  'github-copilot': { title: 'GitHub Copilot', description: 'AI pair programmer that helps write code faster with intelligent suggestions.', category: 'Coding', rating: '4.6' },
  'claude': { title: 'Claude', description: 'Anthropic AI assistant for helpful, harmless conversations and analysis.', category: 'Writing', rating: '4.7' },
  'jasper-ai': { title: 'Jasper AI', description: 'AI marketing copywriting platform for high-converting business content.', category: 'Marketing', rating: '4.5' },
  'perplexity': { title: 'Perplexity', description: 'AI-powered search engine with accurate, cited answers in real-time.', category: 'Research', rating: '4.6' },
  'stable-diffusion': { title: 'Stable Diffusion', description: 'Open-source text-to-image AI for creating detailed art and images.', category: 'Design', rating: '4.5' },
  'notion-ai': { title: 'Notion AI', description: 'AI writing assistant integrated into Notion for drafting and editing.', category: 'Productivity', rating: '4.4' },
  'synthesia': { title: 'Synthesia', description: 'Create AI-generated videos with virtual presenters from text.', category: 'Video', rating: '4.5' },
  'runway-ml': { title: 'Runway ML', description: 'Creative AI toolkit for video editing and multimodal AI tools.', category: 'Video', rating: '4.6' },
  'elevenlabs': { title: 'ElevenLabs', description: 'AI voice generator for natural speech synthesis and voice cloning.', category: 'Audio', rating: '4.7' },
  'adobe-firefly': { title: 'Adobe Firefly', description: 'Adobe generative AI for images, text effects, and creative content.', category: 'Design', rating: '4.5' },
  'zapier': { title: 'Zapier', description: 'Automation platform connecting apps with AI-powered workflows.', category: 'Automation', rating: '4.6' },
  'figma': { title: 'Figma', description: 'Collaborative design tool with AI features for prototyping.', category: 'Design', rating: '4.8' },
  'deepseek': { title: 'DeepSeek', description: 'Advanced AI model for code generation and complex reasoning.', category: 'Coding', rating: '4.5' },
  'copy-ai': { title: 'Copy.ai', description: 'AI copywriting tool for marketing content and social media.', category: 'Marketing', rating: '4.4' },
  'grammarly': { title: 'Grammarly', description: 'AI-powered writing assistant for grammar and style improvement.', category: 'Writing', rating: '4.7' },
  'dalle': { title: 'DALL-E', description: 'OpenAI image generator creating art from text descriptions.', category: 'Design', rating: '4.6' },
  'cursor': { title: 'Cursor', description: 'AI-first code editor with intelligent coding assistance.', category: 'Coding', rating: '4.7' },
  'otter-ai': { title: 'Otter.ai', description: 'AI meeting assistant for transcription and note-taking.', category: 'Productivity', rating: '4.5' },
  'descript': { title: 'Descript', description: 'AI-powered audio and video editing with text-based editing.', category: 'Video', rating: '4.6' },
  'murf-ai': { title: 'Murf AI', description: 'Professional AI voiceover generator for content creators.', category: 'Audio', rating: '4.4' },
  'canva-ai': { title: 'Canva AI', description: 'Design platform with AI-powered creative tools and templates.', category: 'Design', rating: '4.7' },
  'leonardo-ai': { title: 'Leonardo AI', description: 'AI art generator for game assets and creative imagery.', category: 'Design', rating: '4.5' },
  'replit-ghostwriter': { title: 'Replit Ghostwriter', description: 'AI coding assistant integrated into Replit IDE.', category: 'Coding', rating: '4.4' },
  'writesonic': { title: 'Writesonic', description: 'AI content writer for articles, ads, and marketing copy.', category: 'Writing', rating: '4.3' },
  'beautiful-ai': { title: 'Beautiful.ai', description: 'AI-powered presentation maker with smart design.', category: 'Productivity', rating: '4.5' },
  'luma-ai': { title: 'Luma AI', description: '3D capture and generation using neural radiance fields.', category: 'Video', rating: '4.4' },
  'surfer-seo': { title: 'Surfer SEO', description: 'AI SEO tool for content optimization and keyword research.', category: 'SEO', rating: '4.5' },
  'semrush': { title: 'Semrush', description: 'All-in-one SEO and digital marketing platform with AI features.', category: 'SEO', rating: '4.6' },
  'hubspot-ai': { title: 'HubSpot AI', description: 'CRM with AI-powered sales and marketing automation.', category: 'Sales', rating: '4.5' },
  'gong': { title: 'Gong', description: 'Revenue AI platform for sales call analysis and insights.', category: 'Sales', rating: '4.6' },
  'arc-search': { title: 'Arc Search', description: 'Mobile AI search engine with intelligent browsing features.', category: 'Research', rating: '4.5' }
};

// Page metadata for static pages
const pageMetadata: Record<string, { title: string; description: string; h1: string }> = {
  '/': {
    title: 'ToolsML - Discover Best AI Tools 2025 | 1000+ Curated Solutions',
    description: 'Find perfect AI tools from 1000+ options across 200+ categories. Compare features, pricing, and reviews. Human-curated directory updated weekly.',
    h1: 'Find the Perfect AI Tool for Every Task'
  },
  '/browse': {
    title: 'Browse All AI Tools - Complete Directory | ToolsML',
    description: 'Explore our complete directory of 1000+ AI tools. Filter by category, pricing, and features with detailed reviews.',
    h1: 'Browse All AI Tools'
  },
  '/about': {
    title: 'About ToolsML - AI Tool Discovery Platform',
    description: 'Learn about ToolsML, the leading platform for discovering and comparing AI tools trusted by 50K+ users.',
    h1: 'About ToolsML'
  },
  '/blog': {
    title: 'AI Tools Blog - Latest Insights & Reviews | ToolsML',
    description: 'Stay updated with the latest AI tools, trends, and expert reviews. Free AI learning resources.',
    h1: 'AI Tools Blog'
  },
  '/contact': {
    title: 'Contact ToolsML - Get in Touch',
    description: 'Have questions? Contact ToolsML team for support, partnerships, or tool submissions.',
    h1: 'Contact Us'
  },
  '/submit': {
    title: 'Submit Your AI Tool - Get Listed on ToolsML',
    description: 'Submit your AI tool to ToolsML directory. Reach thousands of users searching for AI solutions.',
    h1: 'Submit Your AI Tool'
  },
  '/privacy': {
    title: 'Privacy Policy - ToolsML',
    description: 'Learn how ToolsML protects your privacy and handles personal information.',
    h1: 'Privacy Policy'
  },
  '/terms': {
    title: 'Terms of Service - ToolsML',
    description: 'Read ToolsML terms of service and user agreement.',
    h1: 'Terms of Service'
  },
  '/advertise': {
    title: 'Advertise on ToolsML - Reach AI Tool Buyers',
    description: 'Advertise your AI tool on ToolsML and reach engaged users searching for AI solutions.',
    h1: 'Advertise with ToolsML'
  },
  '/tutorials': {
    title: 'AI Tools Tutorials - Learn How to Use AI | ToolsML',
    description: 'Step-by-step tutorials on how to use AI tools effectively. From beginner to advanced.',
    h1: 'AI Tools Tutorials'
  },
  '/compare': {
    title: 'Compare AI Tools Side by Side | ToolsML',
    description: 'Compare AI tools features, pricing, and reviews to make informed decisions.',
    h1: 'Compare AI Tools'
  },
  '/favorites': {
    title: 'My Favorite AI Tools | ToolsML',
    description: 'Your curated collection of favorite AI tools for easy access.',
    h1: 'My Favorite AI Tools'
  },
  '/changelog': {
    title: 'Changelog - ToolsML Updates',
    description: 'Stay updated with the latest ToolsML features and improvements.',
    h1: 'Changelog'
  },
  '/api-docs': {
    title: 'API Documentation | ToolsML',
    description: 'Integrate ToolsML data into your applications with our API.',
    h1: 'API Documentation'
  }
};

const categories = ['writing', 'design', 'coding', 'marketing', 'productivity', 'audio', 'video', 'research', 'data', 'automation', 'sales', 'social', 'seo'];
const categoryDescriptions: Record<string, string> = {
  'writing': 'Discover the best AI writing tools for content creation, copywriting, and editing.',
  'design': 'Find top AI design tools for image generation, graphic design, and creative work.',
  'coding': 'Explore AI coding assistants for faster development and code generation.',
  'marketing': 'Discover AI marketing tools for content, ads, SEO, and automation.',
  'productivity': 'Find AI productivity tools for task management and automation.',
  'audio': 'Explore AI audio tools for voice generation and music creation.',
  'video': 'Discover AI video tools for editing, generation, and enhancement.',
  'research': 'Find AI research tools for academic work and data analysis.',
  'data': 'Explore AI data tools for analytics and visualization.',
  'automation': 'Discover AI automation tools for workflows and processes.',
  'sales': 'Find AI sales tools for outreach and CRM.',
  'social': 'Explore AI social media tools for content and management.',
  'seo': 'Discover AI SEO tools for keyword research and optimization.'
};

const tags = ['free', 'writing', 'image-generation', 'coding', 'chatbot', 'productivity', 'marketing', 'video', 'audio', 'research'];

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getMetadata(path: string): { title: string; description: string; h1: string; canonical: string } {
  if (pageMetadata[path]) {
    return { ...pageMetadata[path], canonical: `https://toolsml.com${path}` };
  }

  const toolMatch = path.match(/^\/tool\/([a-z0-9-]+)$/);
  if (toolMatch) {
    const toolId = toolMatch[1];
    const tool = toolsMetadata[toolId];
    if (tool) {
      return {
        title: `${tool.title} Review 2025 - ${tool.category} AI Tool | ToolsML`,
        description: `${tool.title} - ${tool.description} Rating: ${tool.rating}/5. Compare with alternatives.`,
        h1: `${tool.title} - AI ${tool.category} Tool Review`,
        canonical: `https://toolsml.com/tool/${toolId}`
      };
    }
  }

  const categoryMatch = path.match(/^\/category\/([a-z0-9-]+)$/);
  if (categoryMatch) {
    const cat = categoryMatch[1];
    const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
    return {
      title: `Best ${catName} AI Tools 2025 | ToolsML`,
      description: categoryDescriptions[cat] || `Discover the best ${catName.toLowerCase()} AI tools.`,
      h1: `Best AI ${catName} Tools`,
      canonical: `https://toolsml.com/category/${cat}`
    };
  }

  const tagMatch = path.match(/^\/tag\/([a-z0-9-]+)$/);
  if (tagMatch) {
    const tag = tagMatch[1];
    const tagName = tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      title: `${tagName} AI Tools - Browse & Compare | ToolsML`,
      description: `Find the best ${tagName.toLowerCase()} AI tools. Compare features, pricing, and reviews.`,
      h1: `${tagName} AI Tools`,
      canonical: `https://toolsml.com/tag/${tag}`
    };
  }

  return {
    title: 'ToolsML - Discover & Compare the Best AI Tools 2025',
    description: 'Find and compare 1000+ AI tools for writing, design, video, code, and more.',
    h1: 'Discover the Best AI Tools',
    canonical: `https://toolsml.com${path}`
  };
}

function generateInternalLinks(): string {
  const categoryLinks = categories.map(cat => {
    const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
    return `<a href="/category/${cat}">${catName} AI Tools</a>`;
  }).join(' | ');

  const toolLinks = Object.entries(toolsMetadata).slice(0, 12).map(([id, tool]) => 
    `<a href="/tool/${id}">${tool.title}</a>`
  ).join(' | ');

  const tagLinks = tags.map(tag => {
    const tagName = tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return `<a href="/tag/${tag}">${tagName}</a>`;
  }).join(' | ');

  return `
    <nav aria-label="Categories"><h2>AI Tool Categories</h2><p>${categoryLinks}</p></nav>
    <nav aria-label="Popular Tools"><h2>Popular AI Tools</h2><p>${toolLinks}</p></nav>
    <nav aria-label="Popular Tags"><h2>Browse by Tag</h2><p>${tagLinks}</p></nav>
    <nav aria-label="Resources">
      <a href="/browse">Browse All Tools</a> | <a href="/compare">Compare Tools</a> | 
      <a href="/blog">Blog</a> | <a href="/tutorials">Tutorials</a> | 
      <a href="/about">About</a> | <a href="/contact">Contact</a>
    </nav>
  `;
}

function generateHTML(path: string): string {
  const meta = getMetadata(path);
  const internalLinks = generateInternalLinks();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": meta.title,
    "description": meta.description,
    "url": meta.canonical,
    "isPartOf": { "@type": "WebSite", "name": "ToolsML", "url": "https://toolsml.com" },
    "publisher": { "@type": "Organization", "name": "ToolsML", "url": "https://toolsml.com", "logo": "https://toolsml.com/favicon.png" }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}">
  <link rel="canonical" href="${meta.canonical}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${meta.canonical}">
  <meta property="og:title" content="${escapeHtml(meta.title)}">
  <meta property="og:description" content="${escapeHtml(meta.description)}">
  <meta property="og:image" content="https://toolsml.com/og-image.jpg">
  <meta property="og:site_name" content="ToolsML">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(meta.title)}">
  <meta name="twitter:description" content="${escapeHtml(meta.description)}">
  <meta name="twitter:image" content="https://toolsml.com/og-image.jpg">
  <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <a href="/">ToolsML - AI Tools Directory</a>
      <a href="/browse">Browse Tools</a>
      <a href="/compare">Compare</a>
      <a href="/blog">Blog</a>
    </nav>
  </header>
  <main>
    <h1>${escapeHtml(meta.h1)}</h1>
    <p>${escapeHtml(meta.description)}</p>
    <p>Loading interactive application...</p>
  </main>
  <footer>
    ${internalLinks}
    <p>&copy; 2025 ToolsML. All rights reserved.</p>
    <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a> | <a href="/sitemap">Sitemap</a>
  </footer>
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
      const meta = getMetadata(path);
      return new Response(JSON.stringify(meta, null, 2), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=86400' },
      });
    }

    if (format === 'all') {
      const allPages = {
        generated: new Date().toISOString(),
        totalTools: Object.keys(toolsMetadata).length,
        totalCategories: categories.length,
        totalTags: tags.length,
        staticPages: Object.keys(pageMetadata).length,
        tools: Object.keys(toolsMetadata),
        categories,
        tags
      };
      return new Response(JSON.stringify(allPages, null, 2), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
      });
    }

    const html = generateHTML(path);
    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'X-Prerender-Status': '200',
        'X-Prerender-Path': path,
      },
    });
  } catch (error) {
    console.error('Prerender error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate prerendered content' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});