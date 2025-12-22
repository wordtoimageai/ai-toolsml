import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

// Tool and category data for sitemap generation
const tools = [
  'chatgpt', 'midjourney', 'github-copilot', 'jasper-ai', 'mubert', 'perplexity',
  'claude', 'stable-diffusion', 'notion-ai', 'otter-ai', 'reclaim-ai', 'clickup-ai',
  'synthesia', 'runway-ml', 'descript', 'elevenlabs', 'adobe-firefly', 'hubspot-email-writer',
  'albert-ai', 'sprout-social', 'reply-io', 'marketmuse', 'zapier', 'wix-adi',
  'loom', 'figma', 'google-trends', 'semrush-market-explorer', 'fireflies-ai',
  'surfer-seo', 'codesignal', 'codium-ai', 'replit-ghostwriter', 'deepseek', 'arc-search'
];

const categories = [
  'writing', 'design', 'coding', 'marketing', 'productivity',
  'audio', 'video', 'research', 'data', 'automation', 'sales', 'social', 'seo'
];

const tags = [
  'free', 'writing', 'image generation', 'productivity', 'ai automation',
  'marketing', 'video creation', 'audio', 'research', 'coding', 'conversation',
  'art', 'subscription', 'paid', 'text to speech', 'video editing',
  'voice cloning', 'seo', 'design', 'collaboration'
];

const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/browse', priority: '0.9', changefreq: 'daily' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/tutorials', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/submit', priority: '0.7', changefreq: 'monthly' },
  { path: '/compare', priority: '0.7', changefreq: 'weekly' },
  { path: '/changelog', priority: '0.7', changefreq: 'weekly' },
  { path: '/api-docs', priority: '0.6', changefreq: 'monthly' },
  { path: '/advertise', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.6', changefreq: 'yearly' },
  { path: '/terms', priority: '0.6', changefreq: 'yearly' },
  { path: '/favorites', priority: '0.5', changefreq: 'daily' },
  { path: '/site-map', priority: '0.5', changefreq: 'monthly' },
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
    <loc>${baseUrl}/category/${category}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  // Tool pages
  for (const tool of tools) {
    xml += `  <url>
    <loc>${baseUrl}/tool/${escapeXml(tool)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
  }

  // Tag pages
  for (const tag of tags) {
    const encodedTag = encodeURIComponent(tag.toLowerCase());
    xml += `  <url>
    <loc>${baseUrl}/tag/${encodedTag}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
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
          tools: tools.length,
          tags: tags.length,
          total: staticPages.length + categories.length + tools.length + tags.length
        },
        pages: {
          static: staticPages,
          categories,
          tools,
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