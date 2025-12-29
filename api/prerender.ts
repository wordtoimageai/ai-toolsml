import type { VercelRequest, VercelResponse } from '@vercel/node';

// Bot user agents to detect crawlers
const BOT_USER_AGENTS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 
  'yandexbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot', 
  'discordbot', 'telegrambot', 'whatsapp', 'slackbot', 'applebot',
  'pinterest', 'redditbot', 'semrushbot', 'ahrefsbot', 'mj12bot', 
  'petalbot', 'screaming frog', 'dotbot', 'rogerbot'
];

// Complete tool metadata for all tools
const toolsMetadata: Record<string, { title: string; description: string; category: string; rating: string; company: string }> = {
  'chatgpt': { title: 'ChatGPT', description: 'Advanced conversational AI for writing, coding, analysis, and creative tasks by OpenAI.', category: 'Writing', rating: '4.8', company: 'OpenAI' },
  'midjourney': { title: 'Midjourney', description: 'Create stunning AI-generated images from text prompts with unique artistic styles.', category: 'Design', rating: '4.7', company: 'Midjourney Inc.' },
  'github-copilot': { title: 'GitHub Copilot', description: 'AI pair programmer that helps write code faster with intelligent suggestions.', category: 'Coding', rating: '4.6', company: 'GitHub/Microsoft' },
  'claude': { title: 'Claude', description: 'Anthropic AI assistant for helpful, harmless conversations and analysis.', category: 'Writing', rating: '4.7', company: 'Anthropic' },
  'jasper-ai': { title: 'Jasper AI', description: 'AI marketing copywriting platform for high-converting business content.', category: 'Marketing', rating: '4.5', company: 'Jasper AI' },
  'perplexity': { title: 'Perplexity', description: 'AI-powered search engine with accurate, cited answers in real-time.', category: 'Research', rating: '4.6', company: 'Perplexity AI' },
  'stable-diffusion': { title: 'Stable Diffusion', description: 'Open-source text-to-image AI for creating detailed art and images.', category: 'Design', rating: '4.5', company: 'Stability AI' },
  'notion-ai': { title: 'Notion AI', description: 'AI writing assistant integrated into Notion for drafting and editing.', category: 'Productivity', rating: '4.6', company: 'Notion Labs' },
  'synthesia': { title: 'Synthesia', description: 'Create AI-generated videos with virtual presenters from text.', category: 'Video', rating: '4.5', company: 'Synthesia' },
  'runway-ml': { title: 'Runway ML', description: 'Creative AI toolkit for video editing and multimodal AI tools.', category: 'Video', rating: '4.6', company: 'Runway AI' },
  'elevenlabs': { title: 'ElevenLabs', description: 'AI voice generator for natural speech synthesis and voice cloning.', category: 'Audio', rating: '4.8', company: 'ElevenLabs' },
  'adobe-firefly': { title: 'Adobe Firefly', description: 'Adobe generative AI for images, text effects, and creative content.', category: 'Design', rating: '4.4', company: 'Adobe' },
  'zapier': { title: 'Zapier', description: 'Automation platform connecting apps with AI-powered workflows.', category: 'Automation', rating: '4.5', company: 'Zapier' },
  'figma': { title: 'Figma', description: 'Collaborative design tool with AI features for prototyping.', category: 'Design', rating: '4.7', company: 'Figma' },
  'deepseek': { title: 'DeepSeek', description: 'Advanced AI model for code generation and complex reasoning.', category: 'Coding', rating: '4.5', company: 'DeepSeek' },
  'copy-ai': { title: 'Copy.ai', description: 'AI copywriting tool for marketing content and social media.', category: 'Writing', rating: '4.4', company: 'Copy.ai' },
  'grammarly': { title: 'Grammarly', description: 'AI-powered writing assistant for grammar and style improvement.', category: 'Writing', rating: '4.7', company: 'Grammarly' },
  'dalle': { title: 'DALL-E', description: 'OpenAI image generator creating art from text descriptions.', category: 'Design', rating: '4.6', company: 'OpenAI' },
  'cursor': { title: 'Cursor', description: 'AI-first code editor with intelligent coding assistance.', category: 'Coding', rating: '4.7', company: 'Cursor' },
  'otter-ai': { title: 'Otter.ai', description: 'AI meeting assistant for transcription and note-taking.', category: 'Productivity', rating: '4.5', company: 'Otter.ai' },
  'descript': { title: 'Descript', description: 'AI-powered audio and video editing with text-based editing.', category: 'Video', rating: '4.7', company: 'Descript' },
  'murf-ai': { title: 'Murf AI', description: 'Professional AI voiceover generator for content creators.', category: 'Audio', rating: '4.4', company: 'Murf AI' },
  'canva-ai': { title: 'Canva AI', description: 'Design platform with AI-powered creative tools and templates.', category: 'Design', rating: '4.7', company: 'Canva' },
  'leonardo-ai': { title: 'Leonardo AI', description: 'AI art generator for game assets and creative imagery.', category: 'Design', rating: '4.5', company: 'Leonardo.Ai' },
  'replit-ghostwriter': { title: 'Replit Ghostwriter', description: 'AI coding assistant integrated into Replit IDE.', category: 'Coding', rating: '4.3', company: 'Replit' },
  'writesonic': { title: 'Writesonic', description: 'AI content writer for articles, ads, and marketing copy.', category: 'Writing', rating: '4.3', company: 'Writesonic' },
  'beautiful-ai': { title: 'Beautiful.ai', description: 'AI-powered presentation maker with smart design.', category: 'Productivity', rating: '4.5', company: 'Beautiful.ai' },
  'luma-ai': { title: 'Luma AI', description: '3D capture and generation using neural radiance fields.', category: 'Video', rating: '4.4', company: 'Luma AI' },
  'surfer-seo': { title: 'Surfer SEO', description: 'AI SEO tool for content optimization and keyword research.', category: 'SEO', rating: '4.6', company: 'Surfer' },
  'semrush': { title: 'Semrush', description: 'All-in-one SEO and digital marketing platform with AI features.', category: 'SEO', rating: '4.5', company: 'Semrush' },
  'hubspot-ai': { title: 'HubSpot AI', description: 'CRM with AI-powered sales and marketing automation.', category: 'Sales', rating: '4.3', company: 'HubSpot' },
  'gong': { title: 'Gong', description: 'Revenue AI platform for sales call analysis and insights.', category: 'Sales', rating: '4.6', company: 'Gong' },
  'arc-search': { title: 'Arc Search', description: 'Mobile AI search engine with intelligent browsing features.', category: 'Research', rating: '4.5', company: 'The Browser Company' },
  'mubert': { title: 'Mubert', description: 'Generate royalty-free music and soundtracks using AI.', category: 'Audio', rating: '4.3', company: 'Mubert' },
  'reclaim-ai': { title: 'Reclaim AI', description: 'Automated scheduling and calendar management for deep work.', category: 'Productivity', rating: '4.4', company: 'Reclaim.ai' },
  'clickup-ai': { title: 'ClickUp', description: 'All-in-one project management with AI-powered automation.', category: 'Productivity', rating: '4.3', company: 'ClickUp' },
  'dalle-3': { title: 'DALL-E 3', description: 'Latest OpenAI image generator with enhanced quality.', category: 'Design', rating: '4.6', company: 'OpenAI' },
  'canva': { title: 'Canva', description: 'Design platform with AI-powered creative tools.', category: 'Design', rating: '4.7', company: 'Canva' }
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
  },
  '/site-map': {
    title: 'Site Map | ToolsML',
    description: 'Navigate all pages and tools on ToolsML with our complete site map.',
    h1: 'Site Map'
  }
};

// Category metadata
const categories = ['writing', 'design', 'coding', 'marketing', 'productivity', 'audio', 'video', 'research', 'data', 'automation', 'sales', 'social', 'seo'];
const categoryDescriptions: Record<string, string> = {
  'writing': 'Discover the best AI writing tools for content creation, copywriting, and editing. Compare ChatGPT, Claude, Jasper AI, Grammarly and more.',
  'design': 'Find top AI design tools for image generation, graphic design, and creative work. Compare Midjourney, DALL-E, Stable Diffusion, Canva AI.',
  'coding': 'Explore AI coding assistants for faster development and code generation. GitHub Copilot, Cursor, Replit Ghostwriter reviews.',
  'marketing': 'Discover AI marketing tools for content, ads, SEO, and automation. Jasper AI, Copy.ai, HubSpot AI comparisons.',
  'productivity': 'Find AI productivity tools for task management, meetings, and automation. Notion AI, Otter.ai, ClickUp reviews.',
  'audio': 'Explore AI audio tools for voice generation, music creation, and podcast editing. ElevenLabs, Mubert, Murf AI comparisons.',
  'video': 'Discover AI video tools for editing, generation, and enhancement. Synthesia, Runway ML, Descript reviews.',
  'research': 'Find AI research tools for academic work and data analysis. Perplexity, Arc Search, Google Trends reviews.',
  'data': 'Explore AI data tools for analytics, visualization, and market research. Semrush, Google Trends comparisons.',
  'automation': 'Discover AI automation tools for workflows and processes. Zapier, Wix ADI, Make reviews.',
  'sales': 'Find AI sales tools for outreach, CRM, and call analysis. Reply.io, Gong, HubSpot AI comparisons.',
  'social': 'Explore AI social media tools for content and management. Sprout Social, Buffer AI reviews.',
  'seo': 'Discover AI SEO tools for keyword research and optimization. Surfer SEO, MarketMuse, Semrush reviews.'
};

// Popular tags
const tags = ['free', 'writing', 'image-generation', 'coding', 'chatbot', 'productivity', 'marketing', 'video', 'audio', 'research', 'conversation', 'art', 'subscription', 'paid', 'text-to-speech'];

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function isBot(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot));
}

function getMetadata(path: string): { title: string; description: string; h1: string; canonical: string } {
  // Static pages
  if (pageMetadata[path]) {
    return { ...pageMetadata[path], canonical: `https://toolsml.com${path === '/' ? '' : path}` };
  }

  // Tool pages
  const toolMatch = path.match(/^\/tool\/([a-z0-9-]+)$/);
  if (toolMatch) {
    const toolId = toolMatch[1];
    const tool = toolsMetadata[toolId];
    if (tool) {
      return {
        title: `${tool.title} Review 2025 - Features, Pricing & Alternatives | ToolsML`,
        description: `${tool.title} by ${tool.company}: ${tool.description} Rating: ${tool.rating}/5. Compare with alternatives and read user reviews.`,
        h1: `${tool.title} - AI ${tool.category} Tool Review`,
        canonical: `https://toolsml.com/tool/${toolId}`
      };
    }
  }

  // Category pages
  const categoryMatch = path.match(/^\/category\/([a-z0-9-]+)$/);
  if (categoryMatch) {
    const cat = categoryMatch[1];
    const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
    return {
      title: `Best ${catName} AI Tools 2025 - Top Rated & Compared | ToolsML`,
      description: categoryDescriptions[cat] || `Discover the best ${catName.toLowerCase()} AI tools with ratings, reviews, and feature comparisons.`,
      h1: `Best AI ${catName} Tools 2025`,
      canonical: `https://toolsml.com/category/${cat}`
    };
  }

  // Tag pages
  const tagMatch = path.match(/^\/tag\/([a-z0-9-]+)$/);
  if (tagMatch) {
    const tag = tagMatch[1];
    const tagName = tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      title: `${tagName} AI Tools - Browse & Compare 2025 | ToolsML`,
      description: `Find the best ${tagName.toLowerCase()} AI tools. Compare features, pricing, and user reviews to find your perfect tool.`,
      h1: `${tagName} AI Tools`,
      canonical: `https://toolsml.com/tag/${tag}`
    };
  }

  // Default
  return {
    title: 'ToolsML - Discover & Compare the Best AI Tools 2025',
    description: 'Find and compare 1000+ AI tools for writing, design, video, code, and more. Human-curated directory with ratings and reviews.',
    h1: 'Discover the Best AI Tools',
    canonical: `https://toolsml.com${path}`
  };
}

function generateToolContent(toolId: string): string {
  const tool = toolsMetadata[toolId];
  if (!tool) return '';
  
  return `
    <article itemscope itemtype="https://schema.org/SoftwareApplication">
      <h1 itemprop="name">${escapeHtml(tool.title)}</h1>
      <p itemprop="description">${escapeHtml(tool.description)}</p>
      <div class="tool-meta">
        <span itemprop="applicationCategory">Category: ${escapeHtml(tool.category)}</span>
        <span>Company: <span itemprop="author">${escapeHtml(tool.company)}</span></span>
        <div itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
          Rating: <span itemprop="ratingValue">${tool.rating}</span>/5
        </div>
      </div>
    </article>
  `;
}

function generateInternalLinks(): string {
  const categoryLinks = categories.map(cat => {
    const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
    return `<a href="/category/${cat}">${catName} AI Tools</a>`;
  }).join(' | ');

  const toolLinks = Object.entries(toolsMetadata).slice(0, 15).map(([id, tool]) => 
    `<a href="/tool/${id}">${tool.title}</a>`
  ).join(' | ');

  const tagLinks = tags.slice(0, 12).map(tag => {
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
      <a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/site-map">Site Map</a>
    </nav>
  `;
}

function generateHTML(path: string): string {
  const meta = getMetadata(path);
  const internalLinks = generateInternalLinks();
  const toolMatch = path.match(/^\/tool\/([a-z0-9-]+)$/);
  const toolContent = toolMatch ? generateToolContent(toolMatch[1]) : '';
  const currentDate = new Date().toISOString().split('T')[0];

  // Main WebPage structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": meta.title,
    "description": meta.description,
    "url": meta.canonical,
    "dateModified": currentDate,
    "isPartOf": { "@type": "WebSite", "name": "ToolsML", "url": "https://toolsml.com" },
    "publisher": { 
      "@type": "Organization", 
      "name": "ToolsML", 
      "url": "https://toolsml.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://toolsml.com/favicon.png"
      }
    }
  };

  // Breadcrumb structured data
  const breadcrumbData: { "@context": string; "@type": string; itemListElement: Array<{ "@type": string; position: number; name: string; item: string }> } = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolsml.com" }
    ]
  };

  // Add breadcrumb items based on path
  if (path.startsWith('/category/')) {
    const cat = path.replace('/category/', '');
    breadcrumbData.itemListElement.push({
      "@type": "ListItem", "position": 2, "name": cat.charAt(0).toUpperCase() + cat.slice(1) + " AI Tools", "item": meta.canonical
    });
  } else if (path.startsWith('/tool/')) {
    const toolId = path.replace('/tool/', '');
    const tool = toolsMetadata[toolId];
    if (tool) {
      breadcrumbData.itemListElement.push(
        { "@type": "ListItem", "position": 2, "name": tool.category + " Tools", "item": `https://toolsml.com/category/${tool.category.toLowerCase()}` },
        { "@type": "ListItem", "position": 3, "name": tool.title, "item": meta.canonical }
      );
    }
  } else if (path.startsWith('/tag/')) {
    const tag = path.replace('/tag/', '');
    breadcrumbData.itemListElement.push({
      "@type": "ListItem", "position": 2, "name": tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + " Tools", "item": meta.canonical
    });
  }

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
  <meta property="og:type" content="${path.startsWith('/tool/') ? 'article' : 'website'}">
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
  
  <!-- Hreflang for international SEO -->
  <link rel="alternate" hreflang="en" href="${meta.canonical}">
  <link rel="alternate" hreflang="x-default" href="${meta.canonical}">
  
  <link rel="icon" type="image/png" href="/favicon.png">
  <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbData)}</script>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <a href="/" title="ToolsML - AI Tools Directory">ToolsML</a>
      <a href="/browse" title="Browse All AI Tools">Browse Tools</a>
      <a href="/compare" title="Compare AI Tools">Compare</a>
      <a href="/blog" title="AI Tools Blog">Blog</a>
      <a href="/tutorials" title="AI Tools Tutorials">Tutorials</a>
    </nav>
  </header>
  <main>
    ${toolContent || `<h1>${escapeHtml(meta.h1)}</h1><p>${escapeHtml(meta.description)}</p>`}
    <noscript>
      <p>This page works best with JavaScript enabled. Loading interactive AI tools directory...</p>
    </noscript>
  </main>
  <footer>
    ${internalLinks}
    <p>&copy; ${new Date().getFullYear()} ToolsML. All rights reserved. Your trusted AI tools directory.</p>
    <nav aria-label="Footer links">
      <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a> | 
      <a href="/site-map">Site Map</a> | <a href="/contact">Contact</a>
    </nav>
  </footer>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = (req.query.path as string) || '/';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const userAgent = req.headers['user-agent'] || '';
  const isBotRequest = isBot(userAgent);
  
  console.log(`[Prerender] Request: path=${normalizedPath}, userAgent=${userAgent.substring(0, 50)}, isBot=${isBotRequest}`);
  
  try {
    const html = generateHTML(normalizedPath);
    const meta = getMetadata(normalizedPath);
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400');
    res.setHeader('X-Prerendered', 'true');
    res.setHeader('X-Prerender-Path', normalizedPath);
    res.setHeader('X-Canonical-URL', meta.canonical);
    res.setHeader('X-Robots-Tag', 'index, follow');
    res.setHeader('Link', `<${meta.canonical}>; rel="canonical"`);
    res.status(200).send(html);
  } catch (error) {
    console.error('[Prerender] Error:', error);
    // Return a basic HTML page instead of redirect
    const fallbackMeta = getMetadata(normalizedPath);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Canonical-URL', fallbackMeta.canonical);
    res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(fallbackMeta.title)}</title>
  <meta name="description" content="${escapeHtml(fallbackMeta.description)}">
  <link rel="canonical" href="${fallbackMeta.canonical}">
  <meta name="robots" content="index, follow">
</head>
<body>
  <h1>${escapeHtml(fallbackMeta.h1)}</h1>
  <p>${escapeHtml(fallbackMeta.description)}</p>
</body>
</html>`);
  }
}