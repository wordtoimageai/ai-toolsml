import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, user-agent, x-prerender-token',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Common bot/crawler user agents
const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'exabot',
  'facebot',
  'facebookexternalhit',
  'ia_archiver',
  'twitterbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest',
  'slack',
  'vkshare',
  'w3c_validator',
  'whatsapp',
  'redditbot',
  'applebot',
  'flipboard',
  'tumblr',
  'bitlybot',
  'skypeuripreview',
  'nuzzel',
  'discordbot',
  'google page speed',
  'qwantify',
  'pinterestbot',
  'bitrix link preview',
  'xing-contenttabreceiver',
  'chrome-lighthouse',
  'telegrambot',
  'integration-test',
  'prerender',
  // Common prerender service bots
  'prerendercloud',
  'rendertron',
  'headlesschrome'
];

// Escaped fragment patterns for old-style AJAX crawling
const ESCAPED_FRAGMENT_PATTERN = /_escaped_fragment_=/;

function isBot(userAgent: string): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot));
}

function shouldPrerender(req: Request): { should: boolean; reason: string } {
  const userAgent = req.headers.get('user-agent') || '';
  const url = new URL(req.url);
  
  // Check for _escaped_fragment_ query parameter (legacy AJAX crawling)
  if (ESCAPED_FRAGMENT_PATTERN.test(url.search)) {
    return { should: true, reason: 'escaped_fragment' };
  }
  
  // Check for prerender header (from prerender services)
  if (req.headers.get('x-prerender')) {
    return { should: false, reason: 'already_prerendered' };
  }
  
  // Check for bot user agent
  if (isBot(userAgent)) {
    return { should: true, reason: 'bot_detected' };
  }
  
  // Check for explicit prerender request
  if (url.searchParams.get('_prerender') === 'true') {
    return { should: true, reason: 'explicit_request' };
  }
  
  return { should: false, reason: 'regular_user' };
}

// Generate prerendered HTML for the page
async function getPrerenderContent(path: string, supabaseUrl: string): Promise<string> {
  try {
    const prerenderUrl = `${supabaseUrl}/functions/v1/prerender?path=${encodeURIComponent(path)}`;
    const response = await fetch(prerenderUrl, {
      headers: {
        'Content-Type': 'text/html',
      }
    });
    
    if (response.ok) {
      return await response.text();
    }
    
    throw new Error(`Prerender failed: ${response.status}`);
  } catch (error) {
    console.error('Error fetching prerender content:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.searchParams.get('path') || '/';
    const format = url.searchParams.get('format') || 'json';
    
    const userAgent = req.headers.get('user-agent') || '';
    const prerenderCheck = shouldPrerender(req);

    console.log(`Prerender middleware check: path=${path}, userAgent=${userAgent.substring(0, 50)}..., should=${prerenderCheck.should}, reason=${prerenderCheck.reason}`);

    if (format === 'check') {
      // Return prerender decision as JSON
      return new Response(JSON.stringify({
        path,
        userAgent: userAgent.substring(0, 100),
        shouldPrerender: prerenderCheck.should,
        reason: prerenderCheck.reason,
        detectedBots: BOT_USER_AGENTS.filter(bot => userAgent.toLowerCase().includes(bot)),
        timestamp: new Date().toISOString()
      }, null, 2), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });
    }

    if (format === 'bots') {
      // Return list of known bots
      return new Response(JSON.stringify({
        bots: BOT_USER_AGENTS,
        count: BOT_USER_AGENTS.length
      }, null, 2), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    if (prerenderCheck.should) {
      // Get prerendered content
      const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
      const html = await getPrerenderContent(path, supabaseUrl);
      
      return new Response(html, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
          'X-Prerender-Status': '200',
          'X-Prerender-Reason': prerenderCheck.reason,
        },
      });
    }

    // For regular users, return instructions
    return new Response(JSON.stringify({
      message: 'Not a bot request - serve normal SPA',
      shouldPrerender: false,
      reason: prerenderCheck.reason,
      instructions: {
        cloudflare: 'Use Cloudflare Workers to check user-agent and proxy to this endpoint',
        nginx: 'Use ngx_http_proxy_module to detect bots and proxy to this endpoint',
        vercel: 'Use Edge Middleware to check user-agent and rewrite to prerender endpoint',
        prerender_io: 'Configure Prerender.io middleware with token and this endpoint as fallback'
      }
    }, null, 2), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Prerender middleware error:', error);
    return new Response(
      JSON.stringify({ error: 'Prerender middleware failed' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
