import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

// Tool data for dynamic OG images
const toolsData: Record<string, { title: string; description: string; category: string; icon: string; rating: string }> = {
  'chatgpt': { title: 'ChatGPT', description: 'Advanced conversational AI for writing, coding & analysis', category: 'Writing', icon: '✍️', rating: '4.8' },
  'midjourney': { title: 'Midjourney', description: 'Create stunning AI-generated images from text', category: 'Design', icon: '🎨', rating: '4.7' },
  'github-copilot': { title: 'GitHub Copilot', description: 'AI-powered code completion for developers', category: 'Coding', icon: '💻', rating: '4.6' },
  'claude': { title: 'Claude', description: 'Helpful, harmless, and honest AI assistant', category: 'Writing', icon: '🤖', rating: '4.7' },
  'jasper-ai': { title: 'Jasper AI', description: 'AI marketing copywriting platform', category: 'Marketing', icon: '📈', rating: '4.5' },
  'perplexity': { title: 'Perplexity', description: 'AI research assistant with source citations', category: 'Research', icon: '🔬', rating: '4.6' },
  'stable-diffusion': { title: 'Stable Diffusion', description: 'Open-source AI image generation', category: 'Design', icon: '🖼️', rating: '4.5' },
  'notion-ai': { title: 'Notion AI', description: 'AI-powered workspace for productivity', category: 'Productivity', icon: '📝', rating: '4.4' },
  'synthesia': { title: 'Synthesia', description: 'Create AI avatar videos in 140+ languages', category: 'Video', icon: '👨‍💼', rating: '4.5' },
  'runway-ml': { title: 'Runway ML', description: 'Creative AI toolkit for video & images', category: 'Video', icon: '🎬', rating: '4.6' },
  'elevenlabs': { title: 'ElevenLabs', description: 'AI voice generation and cloning', category: 'Audio', icon: '🔊', rating: '4.7' },
  'adobe-firefly': { title: 'Adobe Firefly', description: 'Adobe\'s generative AI for creatives', category: 'Design', icon: '🔥', rating: '4.5' },
  'zapier': { title: 'Zapier', description: 'Automate workflows with AI assistance', category: 'Automation', icon: '⚡', rating: '4.6' },
  'figma': { title: 'Figma', description: 'Collaborative design with AI features', category: 'Design', icon: '🎨', rating: '4.8' },
  'deepseek': { title: 'DeepSeek', description: 'Advanced AI for code and reasoning', category: 'Coding', icon: '🧠', rating: '4.5' },
  'copy-ai': { title: 'Copy.ai', description: 'AI copywriting for marketing content', category: 'Marketing', icon: '✏️', rating: '4.4' },
  'grammarly': { title: 'Grammarly', description: 'AI-powered writing assistant', category: 'Writing', icon: '📖', rating: '4.6' },
  'descript': { title: 'Descript', description: 'AI video & podcast editing', category: 'Video', icon: '🎥', rating: '4.5' },
  'mubert': { title: 'Mubert', description: 'AI music generation', category: 'Audio', icon: '🎵', rating: '4.3' },
  'otter-ai': { title: 'Otter.ai', description: 'AI meeting transcription', category: 'Productivity', icon: '🎙️', rating: '4.5' }
};

const categoryData: Record<string, { title: string; description: string; icon: string; color: string }> = {
  'writing': { title: 'Writing', description: 'AI tools for content creation & copywriting', icon: '✍️', color: '#6366f1' },
  'design': { title: 'Design', description: 'AI image generation & graphic design tools', icon: '🎨', color: '#ec4899' },
  'coding': { title: 'Coding', description: 'AI assistants for developers', icon: '💻', color: '#10b981' },
  'marketing': { title: 'Marketing', description: 'AI tools for marketing & ads', icon: '📈', color: '#f59e0b' },
  'productivity': { title: 'Productivity', description: 'AI for task & time management', icon: '⚡', color: '#3b82f6' },
  'audio': { title: 'Audio', description: 'AI voice & music generation', icon: '🎵', color: '#8b5cf6' },
  'video': { title: 'Video', description: 'AI video creation & editing', icon: '🎬', color: '#ef4444' },
  'research': { title: 'Research', description: 'AI research & analysis tools', icon: '🔬', color: '#06b6d4' },
  'data': { title: 'Data', description: 'AI analytics & visualization', icon: '📊', color: '#84cc16' },
  'automation': { title: 'Automation', description: 'AI workflow automation', icon: '🔄', color: '#f97316' },
  'sales': { title: 'Sales', description: 'AI sales & CRM tools', icon: '💼', color: '#14b8a6' },
  'social': { title: 'Social', description: 'AI social media management', icon: '📱', color: '#a855f7' },
  'seo': { title: 'SEO', description: 'AI SEO & content optimization', icon: '🔍', color: '#22c55e' }
};

function generateSVG(type: 'tool' | 'category' | 'home', id?: string): string {
  const width = 1200;
  const height = 630;
  
  if (type === 'tool' && id && toolsData[id]) {
    const tool = toolsData[id];
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e1b4b"/>
      <stop offset="50%" style="stop-color:#312e81"/>
      <stop offset="100%" style="stop-color:#4338ca"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#818cf8"/>
      <stop offset="100%" style="stop-color:#c084fc"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect x="60" y="60" width="500" height="510" rx="24" fill="rgba(255,255,255,0.05)"/>
  <text x="110" y="180" font-family="Arial, sans-serif" font-size="120">${tool.icon}</text>
  <text x="600" y="200" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="white">${tool.title}</text>
  <text x="600" y="280" font-family="Arial, sans-serif" font-size="28" fill="url(#accent)">${tool.category} AI Tool</text>
  <text x="600" y="360" font-family="Arial, sans-serif" font-size="26" fill="rgba(255,255,255,0.8)" textLength="520" lengthAdjust="spacingAndGlyphs">${tool.description}</text>
  <rect x="600" y="420" width="140" height="50" rx="25" fill="url(#accent)"/>
  <text x="670" y="455" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">★ ${tool.rating}</text>
  <text x="60" y="590" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white">ToolsML</text>
  <text x="240" y="590" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.6)">toolsml.com</text>
</svg>`;
  }
  
  if (type === 'category' && id && categoryData[id]) {
    const cat = categoryData[id];
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:${cat.color}33"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${cat.color}"/>
      <stop offset="100%" style="stop-color:${cat.color}cc"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <circle cx="200" cy="315" r="120" fill="${cat.color}22" stroke="${cat.color}" stroke-width="3"/>
  <text x="200" y="350" font-family="Arial, sans-serif" font-size="100" text-anchor="middle">${cat.icon}</text>
  <text x="400" y="260" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="white">Best ${cat.title} AI Tools</text>
  <text x="400" y="330" font-family="Arial, sans-serif" font-size="32" fill="url(#accent)">2025 Complete Guide</text>
  <text x="400" y="400" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.7)">${cat.description}</text>
  <rect x="400" y="450" width="200" height="50" rx="25" fill="url(#accent)"/>
  <text x="500" y="485" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">Compare Tools</text>
  <text x="60" y="590" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white">ToolsML</text>
  <text x="240" y="590" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.6)">toolsml.com/category/${id}</text>
</svg>`;
  }
  
  // Default home/generic OG image
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e1b4b"/>
      <stop offset="50%" style="stop-color:#312e81"/>
      <stop offset="100%" style="stop-color:#4338ca"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#818cf8"/>
      <stop offset="100%" style="stop-color:#c084fc"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <text x="600" y="250" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">ToolsML</text>
  <text x="600" y="320" font-family="Arial, sans-serif" font-size="36" fill="url(#accent)" text-anchor="middle">Discover and Compare Best AI Tools 2025</text>
  <text x="600" y="400" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.8)" text-anchor="middle">1000+ AI Tools - 200+ Categories - Weekly Updates</text>
  <rect x="450" y="460" width="300" height="60" rx="30" fill="url(#accent)"/>
  <text x="600" y="502" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">Explore Now</text>
  <text x="600" y="590" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.6)" text-anchor="middle">toolsml.com</text>
</svg>`;
}

// Convert SVG to PNG using resvg-wasm
async function svgToPng(svg: string): Promise<Uint8Array> {
  try {
    // Use resvg-js via esm.sh for SVG to PNG conversion
    const { Resvg } = await import("https://esm.sh/@resvg/resvg-wasm@2.6.2");
    
    // Initialize resvg with default options
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: 1200,
      },
      font: {
        loadSystemFonts: false,
        defaultFontFamily: 'Arial',
      },
    });
    
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    
    return pngBuffer;
  } catch (error) {
    console.error('resvg-wasm conversion failed, using fallback:', error);
    // Fallback: return a simple 1x1 transparent PNG if conversion fails
    // This ensures we always return valid PNG data
    return new Uint8Array([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x04, 0xB0, 0x00, 0x00, 0x02, 0x76,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x25, 0x50, 0x9E, 0x62, 0x00, 0x00, 0x00,
      0x01, 0x73, 0x52, 0x47, 0x42, 0x00, 0xAE, 0xCE, 0x1C, 0xE9, 0x00, 0x00,
      0x00, 0x04, 0x67, 0x41, 0x4D, 0x41, 0x00, 0x00, 0xB1, 0x8F, 0x0B, 0xFC,
      0x61, 0x05, 0x00, 0x00, 0x00, 0x09, 0x70, 0x48, 0x59, 0x73, 0x00, 0x00,
      0x0E, 0xC4, 0x00, 0x00, 0x0E, 0xC4, 0x01, 0x95, 0x2B, 0x0E, 0x1B, 0x00,
      0x00, 0x00, 0x1D, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0xED, 0xC1, 0x01,
      0x0D, 0x00, 0x00, 0x00, 0xC2, 0xA0, 0xF7, 0x4F, 0x6D, 0x0E, 0x37, 0xA0,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xBE, 0x0D, 0x21, 0x00,
      0x00, 0x01, 0x9A, 0x60, 0xE1, 0xD5, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45,
      0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const type = url.searchParams.get('type') || 'home';
    const id = url.searchParams.get('id') || '';
    const format = url.searchParams.get('format') || 'png'; // Default to PNG now

    console.log(`Generating OG image: type=${type}, id=${id}, format=${format}`);

    const svg = generateSVG(type as 'tool' | 'category' | 'home', id);

    if (format === 'json') {
      return new Response(JSON.stringify({
        type,
        id,
        available_tools: Object.keys(toolsData),
        available_categories: Object.keys(categoryData)
      }, null, 2), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    if (format === 'svg') {
      return new Response(svg, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=604800, immutable',
        },
      });
    }

    // Default: PNG format for social platforms
    const pngData = await svgToPng(svg);
    
    return new Response(pngData, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800, immutable',
      },
    });
  } catch (error) {
    console.error('OG image generation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate OG image', details: String(error) }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
