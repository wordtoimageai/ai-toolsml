import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

// Complete tool data for sitemap generation with SEO metadata
const toolsData = [
  { id: 'chatgpt', title: 'ChatGPT', category: 'writing', priority: '0.95' },
  { id: 'midjourney', title: 'Midjourney', category: 'design', priority: '0.95' },
  { id: 'github-copilot', title: 'GitHub Copilot', category: 'coding', priority: '0.95' },
  { id: 'jasper-ai', title: 'Jasper AI', category: 'writing', priority: '0.9' },
  { id: 'mubert', title: 'Mubert', category: 'audio', priority: '0.85' },
  { id: 'perplexity', title: 'Perplexity', category: 'research', priority: '0.9' },
  { id: 'claude', title: 'Claude', category: 'writing', priority: '0.95' },
  { id: 'stable-diffusion', title: 'Stable Diffusion', category: 'design', priority: '0.9' },
  { id: 'notion-ai', title: 'Notion AI', category: 'productivity', priority: '0.9' },
  { id: 'otter-ai', title: 'Otter AI', category: 'productivity', priority: '0.85' },
  { id: 'reclaim-ai', title: 'Reclaim AI', category: 'productivity', priority: '0.8' },
  { id: 'clickup-ai', title: 'ClickUp AI', category: 'productivity', priority: '0.85' },
  { id: 'synthesia', title: 'Synthesia', category: 'video', priority: '0.9' },
  { id: 'runway-ml', title: 'Runway ML', category: 'video', priority: '0.9' },
  { id: 'descript', title: 'Descript', category: 'video', priority: '0.85' },
  { id: 'elevenlabs', title: 'ElevenLabs', category: 'audio', priority: '0.9' },
  { id: 'adobe-firefly', title: 'Adobe Firefly', category: 'design', priority: '0.9' },
  { id: 'hubspot-email-writer', title: 'HubSpot Email Writer', category: 'marketing', priority: '0.8' },
  { id: 'albert-ai', title: 'Albert AI', category: 'marketing', priority: '0.8' },
  { id: 'sprout-social', title: 'Sprout Social', category: 'social', priority: '0.8' },
  { id: 'reply-io', title: 'Reply.io', category: 'sales', priority: '0.8' },
  { id: 'marketmuse', title: 'MarketMuse', category: 'seo', priority: '0.85' },
  { id: 'zapier', title: 'Zapier', category: 'automation', priority: '0.9' },
  { id: 'wix-adi', title: 'Wix ADI', category: 'design', priority: '0.8' },
  { id: 'loom', title: 'Loom', category: 'productivity', priority: '0.85' },
  { id: 'figma', title: 'Figma', category: 'design', priority: '0.9' },
  { id: 'google-trends', title: 'Google Trends', category: 'research', priority: '0.85' },
  { id: 'semrush-market-explorer', title: 'Semrush Market Explorer', category: 'seo', priority: '0.85' },
  { id: 'fireflies-ai', title: 'Fireflies AI', category: 'productivity', priority: '0.85' },
  { id: 'surfer-seo', title: 'Surfer SEO', category: 'seo', priority: '0.85' },
  { id: 'codesignal', title: 'CodeSignal', category: 'coding', priority: '0.8' },
  { id: 'codium-ai', title: 'Codium AI', category: 'coding', priority: '0.85' },
  { id: 'replit-ghostwriter', title: 'Replit Ghostwriter', category: 'coding', priority: '0.85' },
  { id: 'deepseek', title: 'DeepSeek', category: 'coding', priority: '0.85' },
  { id: 'arc-search', title: 'Arc Search', category: 'research', priority: '0.8' }
];

const categories = [
  { id: 'writing', name: 'Writing', count: 15 },
  { id: 'design', name: 'Design', count: 12 },
  { id: 'coding', name: 'Coding', count: 10 },
  { id: 'marketing', name: 'Marketing', count: 8 },
  { id: 'productivity', name: 'Productivity', count: 14 },
  { id: 'audio', name: 'Audio', count: 6 },
  { id: 'video', name: 'Video', count: 8 },
  { id: 'research', name: 'Research', count: 5 },
  { id: 'data', name: 'Data', count: 4 },
  { id: 'automation', name: 'Automation', count: 6 },
  { id: 'sales', name: 'Sales', count: 5 },
  { id: 'social', name: 'Social', count: 4 },
  { id: 'seo', name: 'SEO', count: 5 }
];

const tags = [
  'free', 'writing', 'image generation', 'productivity', 'ai automation',
  'marketing', 'video creation', 'audio', 'research', 'coding', 'conversation',
  'art', 'subscription', 'paid', 'text to speech', 'video editing',
  'voice cloning', 'seo', 'design', 'collaboration'
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

function getLastMod(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

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

  // Static pages with enhanced SEO
  for (const page of staticPages) {
    xml += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  // Category pages with high priority
  for (const category of categories) {
    xml += `  <url>
    <loc>${baseUrl}/category/${category.id}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>
`;
  }

  // Tool pages with highest priority for individual tools
  for (const tool of toolsData) {
    xml += `  <url>
    <loc>${baseUrl}/tool/${escapeXml(tool.id)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${tool.priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/og-image.jpg</image:loc>
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
  const blogPosts = [
    'future-ai-tools-2025',
    'choose-ai-writing-tool',
    'ai-design-tools-2025'
  ];
  
  for (const post of blogPosts) {
    xml += `  <url>
    <loc>${baseUrl}/blog/${post}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
`;
  }

  xml += `</urlset>`;
  
  return xml;
}

function generateSitemapIndex(): string {
  const baseUrl = 'https://toolsml.com';
  const lastMod = getLastMod();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${lastMod}</lastmod>
  </sitemap>
</sitemapindex>`;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const format = url.searchParams.get('format') || 'xml';
    
    if (format === 'index') {
      const sitemapIndex = generateSitemapIndex();
      return new Response(sitemapIndex, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      });
    }
    
    if (format === 'json') {
      // Return JSON format for debugging/API usage
      const data = {
        generated: getLastMod(),
        baseUrl: 'https://toolsml.com',
        counts: {
          staticPages: staticPages.length,
          categories: categories.length,
          tools: toolsData.length,
          tags: tags.length,
          blogPosts: 3,
          total: staticPages.length + categories.length + toolsData.length + tags.length + 3
        },
        pages: {
          static: staticPages,
          categories,
          tools: toolsData,
          tags
        }
      };
      
      return new Response(JSON.stringify(data, null, 2), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      });
    }
    
    // Default: XML sitemap
    const sitemap = generateSitemapXml();
    
    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate sitemap' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});