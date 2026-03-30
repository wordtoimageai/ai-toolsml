import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

// Complete tool data for sitemap generation with SEO metadata
const toolsData = [
  { id: 'chatgpt', title: 'ChatGPT', category: 'writing', priority: '0.95', image: '/og-image.jpg' },
  { id: 'midjourney', title: 'Midjourney', category: 'design', priority: '0.95', image: '/og-image.jpg' },
  { id: 'github-copilot', title: 'GitHub Copilot', category: 'coding', priority: '0.95', image: '/og-image.jpg' },
  { id: 'jasper-ai', title: 'Jasper AI', category: 'writing', priority: '0.9', image: '/og-image.jpg' },
  { id: 'mubert', title: 'Mubert', category: 'audio', priority: '0.85', image: '/og-image.jpg' },
  { id: 'perplexity', title: 'Perplexity', category: 'research', priority: '0.9', image: '/og-image.jpg' },
  { id: 'claude', title: 'Claude', category: 'writing', priority: '0.95', image: '/og-image.jpg' },
  { id: 'stable-diffusion', title: 'Stable Diffusion', category: 'design', priority: '0.9', image: '/og-image.jpg' },
  { id: 'notion-ai', title: 'Notion AI', category: 'productivity', priority: '0.9', image: '/og-image.jpg' },
  { id: 'otter-ai', title: 'Otter AI', category: 'productivity', priority: '0.85', image: '/og-image.jpg' },
  { id: 'reclaim-ai', title: 'Reclaim AI', category: 'productivity', priority: '0.8', image: '/og-image.jpg' },
  { id: 'clickup-ai', title: 'ClickUp AI', category: 'productivity', priority: '0.85', image: '/og-image.jpg' },
  { id: 'synthesia', title: 'Synthesia', category: 'video', priority: '0.9', image: '/og-image.jpg' },
  { id: 'runway-ml', title: 'Runway ML', category: 'video', priority: '0.9', image: '/og-image.jpg' },
  { id: 'descript', title: 'Descript', category: 'video', priority: '0.85', image: '/og-image.jpg' },
  { id: 'elevenlabs', title: 'ElevenLabs', category: 'audio', priority: '0.9', image: '/og-image.jpg' },
  { id: 'adobe-firefly', title: 'Adobe Firefly', category: 'design', priority: '0.9', image: '/og-image.jpg' },
  { id: 'hubspot-email-writer', title: 'HubSpot Email Writer', category: 'marketing', priority: '0.8', image: '/og-image.jpg' },
  { id: 'albert-ai', title: 'Albert AI', category: 'marketing', priority: '0.8', image: '/og-image.jpg' },
  { id: 'sprout-social', title: 'Sprout Social', category: 'social', priority: '0.8', image: '/og-image.jpg' },
  { id: 'reply-io', title: 'Reply.io', category: 'sales', priority: '0.8', image: '/og-image.jpg' },
  { id: 'marketmuse', title: 'MarketMuse', category: 'seo', priority: '0.85', image: '/og-image.jpg' },
  { id: 'zapier', title: 'Zapier', category: 'automation', priority: '0.9', image: '/og-image.jpg' },
  { id: 'wix-adi', title: 'Wix ADI', category: 'design', priority: '0.8', image: '/og-image.jpg' },
  { id: 'loom', title: 'Loom', category: 'productivity', priority: '0.85', image: '/og-image.jpg' },
  { id: 'figma', title: 'Figma', category: 'design', priority: '0.9', image: '/og-image.jpg' },
  { id: 'google-trends', title: 'Google Trends', category: 'research', priority: '0.85', image: '/og-image.jpg' },
  { id: 'semrush-market-explorer', title: 'Semrush Market Explorer', category: 'seo', priority: '0.85', image: '/og-image.jpg' },
  { id: 'fireflies-ai', title: 'Fireflies AI', category: 'productivity', priority: '0.85', image: '/og-image.jpg' },
  { id: 'surfer-seo', title: 'Surfer SEO', category: 'seo', priority: '0.85', image: '/og-image.jpg' },
  { id: 'codesignal', title: 'CodeSignal', category: 'coding', priority: '0.8', image: '/og-image.jpg' },
  { id: 'codium-ai', title: 'Codium AI', category: 'coding', priority: '0.85', image: '/og-image.jpg' },
  { id: 'replit-ghostwriter', title: 'Replit Ghostwriter', category: 'coding', priority: '0.85', image: '/og-image.jpg' },
  { id: 'deepseek', title: 'DeepSeek', category: 'coding', priority: '0.85', image: '/og-image.jpg' },
  { id: 'arc-search', title: 'Arc Search', category: 'research', priority: '0.8', image: '/og-image.jpg' },
  { id: 'grammarly', title: 'Grammarly', category: 'writing', priority: '0.9', image: '/og-image.jpg' },
  { id: 'copy-ai', title: 'Copy.ai', category: 'writing', priority: '0.85', image: '/og-image.jpg' },
  { id: 'writesonic', title: 'Writesonic', category: 'writing', priority: '0.85', image: '/og-image.jpg' },
  { id: 'dalle-3', title: 'DALL-E 3', category: 'design', priority: '0.95', image: '/og-image.jpg' },
  { id: 'canva-ai', title: 'Canva AI', category: 'design', priority: '0.9', image: '/og-image.jpg' },
];

const categories = [
  { id: 'writing', name: 'Writing', count: 15, description: 'AI-powered writing assistants and content generators' },
  { id: 'design', name: 'Design', count: 12, description: 'Creative AI tools for graphics and visual content' },
  { id: 'coding', name: 'Coding', count: 10, description: 'AI code assistants and development tools' },
  { id: 'marketing', name: 'Marketing', count: 8, description: 'AI marketing automation and analytics tools' },
  { id: 'productivity', name: 'Productivity', count: 14, description: 'AI tools to boost work efficiency' },
  { id: 'audio', name: 'Audio', count: 6, description: 'AI audio generation and editing tools' },
  { id: 'video', name: 'Video', count: 8, description: 'AI video creation and editing tools' },
  { id: 'research', name: 'Research', count: 5, description: 'AI research and data analysis tools' },
  { id: 'data', name: 'Data', count: 4, description: 'AI data processing and analytics tools' },
  { id: 'automation', name: 'Automation', count: 6, description: 'AI workflow automation tools' },
  { id: 'sales', name: 'Sales', count: 5, description: 'AI sales and CRM tools' },
  { id: 'social', name: 'Social', count: 4, description: 'AI social media management tools' },
  { id: 'seo', name: 'SEO', count: 5, description: 'AI SEO optimization and content tools' }
];

const tags = [
  'free', 'writing', 'image generation', 'productivity', 'ai automation',
  'marketing', 'video creation', 'audio', 'research', 'coding', 'conversation',
  'art', 'subscription', 'paid', 'text to speech', 'video editing',
  'voice cloning', 'seo', 'design', 'collaboration', 'chatbot', 'content creation',
  'machine learning', 'natural language', 'computer vision', 'deep learning'
];

const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily', title: 'ToolsML - Discover Best AI Tools 2025' },
  { path: '/browse', priority: '0.9', changefreq: 'daily', title: 'Browse All AI Tools' },
  { path: '/about', priority: '0.8', changefreq: 'monthly', title: 'About ToolsML' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly', title: 'AI Tools Blog' },
  { path: '/tutorials', priority: '0.7', changefreq: 'monthly', title: 'AI Tool Tutorials' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly', title: 'Contact Us' },
  { path: '/submit', priority: '0.7', changefreq: 'monthly', title: 'Submit Your AI Tool' },
  { path: '/compare', priority: '0.7', changefreq: 'weekly', title: 'Compare AI Tools' },
  { path: '/changelog', priority: '0.7', changefreq: 'weekly', title: 'Changelog' },
  { path: '/api-docs', priority: '0.6', changefreq: 'monthly', title: 'API Documentation' },
  { path: '/advertise', priority: '0.6', changefreq: 'monthly', title: 'Advertise with ToolsML' },
  { path: '/privacy', priority: '0.6', changefreq: 'yearly', title: 'Privacy Policy' },
  { path: '/terms', priority: '0.6', changefreq: 'yearly', title: 'Terms of Service' },
  { path: '/favorites', priority: '0.5', changefreq: 'daily', title: 'Your Favorite Tools' },
  { path: '/site-map', priority: '0.5', changefreq: 'monthly', title: 'Site Map' },
];

// Recent blog posts for news sitemap
const blogPosts = [
  { 
    slug: 'future-ai-tools-2025', 
    title: 'Future of AI Tools in 2025: Trends and Predictions',
    publishDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    keywords: ['AI trends', 'AI tools 2025', 'machine learning']
  },
  { 
    slug: 'choose-ai-writing-tool', 
    title: 'How to Choose the Best AI Writing Tool for Your Needs',
    publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    keywords: ['AI writing', 'content creation', 'copywriting']
  },
  { 
    slug: 'ai-design-tools-2025', 
    title: 'Top AI Design Tools Compared: Complete Guide',
    publishDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    keywords: ['AI design', 'image generation', 'creative AI']
  },
  { 
    slug: 'ai-coding-assistants-review', 
    title: 'AI Coding Assistants Review: GitHub Copilot vs Alternatives',
    publishDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    keywords: ['AI coding', 'GitHub Copilot', 'code generation']
  },
  { 
    slug: 'ai-productivity-tips', 
    title: '10 Ways AI Tools Can Boost Your Productivity',
    publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    keywords: ['AI productivity', 'automation', 'work efficiency']
  }
];

function getLastMod(): string {
  return new Date().toISOString().split('T')[0];
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate main sitemap XML
function generateSitemapXml(): string {
  const baseUrl = 'https://toolsml.com';
  const lastMod = getLastMod();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  // Static pages
  for (const page of staticPages) {
    xml += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  // Category pages
  for (const category of categories) {
    xml += `  <url>
    <loc>${baseUrl}/category/${category.id}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>
`;
  }

  // Tool pages with images
  for (const tool of toolsData) {
    xml += `  <url>
    <loc>${baseUrl}/tool/${escapeXml(tool.id)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${tool.priority}</priority>
    <image:image>
      <image:loc>${baseUrl}${tool.image}</image:loc>
      <image:title>${escapeXml(tool.title)} - AI ${escapeXml(tool.category.charAt(0).toUpperCase() + tool.category.slice(1))} Tool</image:title>
    </image:image>
  </url>
`;
  }

  // Tag pages
  for (const tag of tags) {
    const encodedTag = encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'));
    xml += `  <url>
    <loc>${baseUrl}/tag/${encodedTag}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }

  // Blog post pages
  for (const post of blogPosts) {
    xml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
`;
  }

  xml += `</urlset>`;
  return xml;
}

// Generate image sitemap XML
function generateImageSitemapXml(): string {
  const baseUrl = 'https://toolsml.com';
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Homepage image
  xml += `  <url>
    <loc>${baseUrl}</loc>
    <image:image>
      <image:loc>${baseUrl}/og-image.jpg</image:loc>
      <image:title>ToolsML - AI Tools Directory</image:title>
      <image:caption>Discover and compare the best AI tools for every use case</image:caption>
    </image:image>
  </url>
`;

  // Tool page images
  for (const tool of toolsData) {
    xml += `  <url>
    <loc>${baseUrl}/tool/${escapeXml(tool.id)}</loc>
    <image:image>
      <image:loc>${baseUrl}${tool.image}</image:loc>
      <image:title>${escapeXml(tool.title)} - ${escapeXml(tool.category)} AI Tool</image:title>
      <image:caption>${escapeXml(tool.title)} is a powerful AI ${escapeXml(tool.category)} tool</image:caption>
    </image:image>
  </url>
`;
  }

  // Category page images
  for (const category of categories) {
    xml += `  <url>
    <loc>${baseUrl}/category/${category.id}</loc>
    <image:image>
      <image:loc>${baseUrl}/og-image.jpg</image:loc>
      <image:title>Best AI ${escapeXml(category.name)} Tools</image:title>
      <image:caption>${escapeXml(category.description)}</image:caption>
    </image:image>
  </url>
`;
  }

  xml += `</urlset>`;
  return xml;
}

// Generate news sitemap XML (for recent blog posts)
function generateNewsSitemapXml(): string {
  const baseUrl = 'https://toolsml.com';
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;

  for (const post of blogPosts) {
    xml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>ToolsML</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${post.publishDate}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
      <news:keywords>${post.keywords.join(', ')}</news:keywords>
    </news:news>
  </url>
`;
  }

  xml += `</urlset>`;
  return xml;
}

// Generate category-specific sitemap
function generateCategorySitemapXml(categoryId: string): string {
  const baseUrl = 'https://toolsml.com';
  const lastMod = getLastMod();
  const categoryTools = toolsData.filter(t => t.category === categoryId);
  const category = categories.find(c => c.id === categoryId);
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Category page
  xml += `  <url>
    <loc>${baseUrl}/category/${categoryId}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${baseUrl}/og-image.jpg</image:loc>
      <image:title>Best AI ${escapeXml(category?.name || categoryId)} Tools</image:title>
    </image:image>
  </url>
`;

  // Tools in this category
  for (const tool of categoryTools) {
    xml += `  <url>
    <loc>${baseUrl}/tool/${escapeXml(tool.id)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${tool.priority}</priority>
    <image:image>
      <image:loc>${baseUrl}${tool.image}</image:loc>
      <image:title>${escapeXml(tool.title)}</image:title>
    </image:image>
  </url>
`;
  }

  xml += `</urlset>`;
  return xml;
}

// Generate sitemap index
function generateSitemapIndex(): string {
  const baseUrl = 'https://toolsml.com';
  const lastMod = getLastMod();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${lastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-images.xml</loc>
    <lastmod>${lastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-news.xml</loc>
    <lastmod>${lastMod}</lastmod>
  </sitemap>
`;

  // Category sitemaps
  for (const category of categories) {
    xml += `  <sitemap>
    <loc>${baseUrl}/sitemap-${category.id}.xml</loc>
    <lastmod>${lastMod}</lastmod>
  </sitemap>
`;
  }

  xml += `</sitemapindex>`;
  return xml;
}

// Generate video sitemap (for video tools)
function generateVideoSitemapXml(): string {
  const baseUrl = 'https://toolsml.com';
  const videoTools = toolsData.filter(t => t.category === 'video');
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

  for (const tool of videoTools) {
    xml += `  <url>
    <loc>${baseUrl}/tool/${escapeXml(tool.id)}</loc>
    <video:video>
      <video:thumbnail_loc>${baseUrl}${tool.image}</video:thumbnail_loc>
      <video:title>${escapeXml(tool.title)} Tutorial</video:title>
      <video:description>Learn how to use ${escapeXml(tool.title)} for AI video creation</video:description>
    </video:video>
  </url>
`;
  }

  xml += `</urlset>`;
  return xml;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const format = url.searchParams.get('format') || 'xml';
    const type = url.searchParams.get('type') || 'main';
    const category = url.searchParams.get('category');
    
    console.log(`Sitemap request: format=${format}, type=${type}, category=${category}`);
    
    let responseContent: string;
    let contentType: string;
    
    switch (type) {
      case 'index':
        responseContent = generateSitemapIndex();
        contentType = 'application/xml';
        break;
        
      case 'images':
        responseContent = generateImageSitemapXml();
        contentType = 'application/xml';
        break;
        
      case 'news':
        responseContent = generateNewsSitemapXml();
        contentType = 'application/xml';
        break;
        
      case 'video':
        responseContent = generateVideoSitemapXml();
        contentType = 'application/xml';
        break;
        
      case 'category':
        if (category) {
          responseContent = generateCategorySitemapXml(category);
        } else {
          responseContent = generateSitemapXml();
        }
        contentType = 'application/xml';
        break;
        
      case 'json':
        const data = {
          generated: getLastMod(),
          baseUrl: 'https://toolsml.com',
          counts: {
            staticPages: staticPages.length,
            categories: categories.length,
            tools: toolsData.length,
            tags: tags.length,
            blogPosts: blogPosts.length,
            total: staticPages.length + categories.length + toolsData.length + tags.length + blogPosts.length
          },
          pages: {
            static: staticPages,
            categories,
            tools: toolsData,
            tags,
            blogPosts
          },
          sitemaps: [
            'sitemap.xml',
            'sitemap-images.xml',
            'sitemap-news.xml',
            'sitemap-video.xml',
            ...categories.map(c => `sitemap-${c.id}.xml`)
          ]
        };
        responseContent = JSON.stringify(data, null, 2);
        contentType = 'application/json';
        break;
        
      default:
        responseContent = generateSitemapXml();
        contentType = 'application/xml';
    }
    
    return new Response(responseContent, {
      headers: {
        ...corsHeaders,
        'Content-Type': `${contentType}; charset=utf-8`,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Sitemap-Generated': new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate sitemap', details: (error as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
