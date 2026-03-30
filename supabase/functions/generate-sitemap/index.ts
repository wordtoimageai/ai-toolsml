import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Tool and category data - in production, fetch from database
const toolsData = [
  { id: 'chatgpt', title: 'ChatGPT', category: 'writing', priority: 0.9 },
  { id: 'midjourney', title: 'Midjourney', category: 'image', priority: 0.9 },
  { id: 'claude', title: 'Claude', category: 'writing', priority: 0.9 },
  { id: 'dall-e', title: 'DALL-E', category: 'image', priority: 0.85 },
  { id: 'stable-diffusion', title: 'Stable Diffusion', category: 'image', priority: 0.85 },
  { id: 'jasper-ai', title: 'Jasper AI', category: 'writing', priority: 0.8 },
  { id: 'copy-ai', title: 'Copy.ai', category: 'writing', priority: 0.8 },
  { id: 'notion-ai', title: 'Notion AI', category: 'productivity', priority: 0.85 },
  { id: 'github-copilot', title: 'GitHub Copilot', category: 'coding', priority: 0.9 },
  { id: 'runway-ml', title: 'Runway ML', category: 'video', priority: 0.85 },
  { id: 'synthesia', title: 'Synthesia', category: 'video', priority: 0.8 },
  { id: 'descript', title: 'Descript', category: 'audio', priority: 0.8 },
  { id: 'murf-ai', title: 'Murf AI', category: 'audio', priority: 0.75 },
  { id: 'grammarly', title: 'Grammarly', category: 'writing', priority: 0.85 },
  { id: 'canva-ai', title: 'Canva AI', category: 'design', priority: 0.85 },
  { id: 'figma', title: 'Figma', category: 'design', priority: 0.8 },
  { id: 'writesonic', title: 'Writesonic', category: 'writing', priority: 0.75 },
  { id: 'perplexity', title: 'Perplexity', category: 'research', priority: 0.85 },
  { id: 'you-com', title: 'You.com', category: 'research', priority: 0.75 },
  { id: 'adobe-firefly', title: 'Adobe Firefly', category: 'image', priority: 0.85 },
];

const categories = [
  { id: 'writing', name: 'Writing', priority: 0.9 },
  { id: 'image', name: 'Image Generation', priority: 0.9 },
  { id: 'video', name: 'Video', priority: 0.85 },
  { id: 'audio', name: 'Audio', priority: 0.85 },
  { id: 'coding', name: 'Coding', priority: 0.9 },
  { id: 'productivity', name: 'Productivity', priority: 0.85 },
  { id: 'design', name: 'Design', priority: 0.85 },
  { id: 'research', name: 'Research', priority: 0.8 },
  { id: 'marketing', name: 'Marketing', priority: 0.8 },
  { id: 'customer-service', name: 'Customer Service', priority: 0.75 },
];

const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  { path: '/tutorials', priority: 0.7, changefreq: 'weekly' },
  { path: '/about', priority: 0.6, changefreq: 'monthly' },
  { path: '/submit', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.5, changefreq: 'monthly' },
  { path: '/api-docs', priority: 0.6, changefreq: 'monthly' },
  { path: '/changelog', priority: 0.5, changefreq: 'weekly' },
  { path: '/site-map', priority: 0.4, changefreq: 'monthly' },
  { path: '/advertise', priority: 0.5, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' },
];

const popularTags = [
  'ai-writing', 'image-generation', 'chatbot', 'code-assistant', 
  'text-to-speech', 'video-editing', 'content-creation', 'automation',
  'machine-learning', 'natural-language-processing', 'gpt', 'llm',
  'generative-ai', 'productivity', 'marketing-automation', 'seo-tools'
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

function generateMainSitemap(): string {
  const lastMod = getLastMod();
  const baseUrl = 'https://toolsml.com';
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
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
    <loc>${baseUrl}/category/${escapeXml(category.id)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${category.priority}</priority>
  </url>
`;
  }

  // Tool pages
  for (const tool of toolsData) {
    xml += `  <url>
    <loc>${baseUrl}/tool/${escapeXml(tool.id)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${tool.priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/tool-screenshots/${escapeXml(tool.id)}.jpg</image:loc>
      <image:title>${escapeXml(tool.title)} - AI Tool Screenshot</image:title>
    </image:image>
  </url>
`;
  }

  // Tag pages
  for (const tag of popularTags) {
    xml += `  <url>
    <loc>${baseUrl}/tag/${escapeXml(tag)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }

  xml += '</urlset>';
  return xml;
}

function generateSitemapIndex(): string {
  const lastMod = getLastMod();
  const baseUrl = 'https://toolsml.com';
  
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

  // Category-specific sitemaps
  for (const category of categories) {
    xml += `  <sitemap>
    <loc>${baseUrl}/sitemap-${escapeXml(category.id)}.xml</loc>
    <lastmod>${lastMod}</lastmod>
  </sitemap>
`;
  }

  xml += '</sitemapindex>';
  return xml;
}

function generateCategorySitemap(categoryId: string): string {
  const lastMod = getLastMod();
  const baseUrl = 'https://toolsml.com';
  const categoryTools = toolsData.filter(t => t.category === categoryId);
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/category/${escapeXml(categoryId)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;

  for (const tool of categoryTools) {
    xml += `  <url>
    <loc>${baseUrl}/tool/${escapeXml(tool.id)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${tool.priority}</priority>
  </url>
`;
  }

  xml += '</urlset>';
  return xml;
}

function generateImageSitemap(): string {
  const baseUrl = 'https://toolsml.com';
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  for (const tool of toolsData) {
    xml += `  <url>
    <loc>${baseUrl}/tool/${escapeXml(tool.id)}</loc>
    <image:image>
      <image:loc>${baseUrl}/tool-screenshots/${escapeXml(tool.id)}.jpg</image:loc>
      <image:title>${escapeXml(tool.title)} - AI Tool</image:title>
      <image:caption>${escapeXml(tool.title)} interface and features screenshot</image:caption>
    </image:image>
  </url>
`;
  }

  xml += '</urlset>';
  return xml;
}

function generateStats(): object {
  return {
    generated_at: new Date().toISOString(),
    total_urls: staticPages.length + categories.length + toolsData.length + popularTags.length,
    static_pages: staticPages.length,
    categories: categories.length,
    tools: toolsData.length,
    tags: popularTags.length,
    last_tool_added: toolsData[toolsData.length - 1]?.id || 'none'
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const type = url.searchParams.get('type') || 'main';
    const format = url.searchParams.get('format') || 'xml';
    const category = url.searchParams.get('category');

    let content: string;
    let contentType = 'application/xml; charset=utf-8';

    switch (type) {
      case 'index':
        content = generateSitemapIndex();
        break;
      case 'images':
        content = generateImageSitemap();
        break;
      case 'category':
        if (!category) {
          return new Response(JSON.stringify({ error: 'Category parameter required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        content = generateCategorySitemap(category);
        break;
      case 'stats':
        content = JSON.stringify(generateStats(), null, 2);
        contentType = 'application/json';
        break;
      case 'main':
      default:
        content = generateMainSitemap();
        break;
    }

    // Return JSON format if requested
    if (format === 'json' && type !== 'stats') {
      return new Response(JSON.stringify({ 
        type,
        generated_at: new Date().toISOString(),
        content_length: content.length,
        xml: content 
      }), {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }

    return new Response(content, {
      headers: {
        ...corsHeaders,
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'X-Sitemap-Generated': new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate sitemap',
      message: (error as Error).message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});