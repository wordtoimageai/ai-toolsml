/**
 * Cloudflare Worker for Bot Detection and Prerendering
 * 
 * This worker intercepts requests to toolsml.com and routes
 * search engine crawlers to the prerender endpoint for SEO.
 * 
 * Deploy this to Cloudflare Workers and configure the route:
 * toolsml.com/*
 */

const BOT_AGENTS = [
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
  'pinterestbot',
  'slack',
  'slackbot',
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
  'bitrix link preview',
  'xing-contenttabreceiver',
  'chrome-lighthouse',
  'telegrambot',
  'screaming frog',
  'semrushbot',
  'ahrefsbot',
  'petalbot',
  'mj12bot',
  'dotbot',
  'rogerbot',
  'gptbot',
  'chatgpt-user',
  'claudebot',
  'anthropic-ai',
  'bytespider',
  'amazonbot'
];

// Your Supabase prerender endpoint
const PRERENDER_URL = 'https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender';

// Your origin (Lovable hosting)
const ORIGIN_HOST = 'ai-toolsml.lovable.app';

// Static file extensions to skip
const STATIC_EXTENSIONS = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map|json|xml|txt|webp|avif|mp4|webm|pdf)$/i;

/**
 * Check if the user agent is a known bot/crawler
 */
function isBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_AGENTS.some(bot => ua.includes(bot));
}

/**
 * Check if the request is for a static file
 */
function isStaticFile(pathname) {
  return STATIC_EXTENSIONS.test(pathname);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('User-Agent') || '';
    
    // Skip static files - pass through to origin
    if (isStaticFile(url.pathname)) {
      const originUrl = new URL(request.url);
      originUrl.host = ORIGIN_HOST;
      return fetch(originUrl.toString(), {
        method: request.method,
        headers: request.headers,
      });
    }
    
    // Check if this is a bot request
    if (isBot(userAgent)) {
      try {
        // Build prerender URL with the path
        const prerenderUrl = `${PRERENDER_URL}?path=${encodeURIComponent(url.pathname)}`;
        
        console.log(`[Bot Detected] UA: ${userAgent.substring(0, 50)}... Path: ${url.pathname}`);
        
        const prerenderResponse = await fetch(prerenderUrl, {
          headers: {
            'Accept': 'text/html',
            'User-Agent': userAgent,
          },
        });
        
        if (prerenderResponse.ok) {
          const html = await prerenderResponse.text();
          
          return new Response(html, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=86400, s-maxage=86400',
              'X-Prerendered': 'true',
              'X-Prerender-Bot': userAgent.substring(0, 100),
              'X-Robots-Tag': 'index, follow',
            },
          });
        } else {
          console.error(`[Prerender Failed] Status: ${prerenderResponse.status}`);
          // Fall through to origin on prerender failure
        }
      } catch (error) {
        console.error(`[Prerender Error] ${error.message}`);
        // Fall through to origin on error
      }
    }
    
    // For regular users or failed prerender, proxy to origin
    const originUrl = new URL(request.url);
    originUrl.host = ORIGIN_HOST;
    
    const originResponse = await fetch(originUrl.toString(), {
      method: request.method,
      headers: request.headers,
    });
    
    // Clone and return the response
    return new Response(originResponse.body, {
      status: originResponse.status,
      statusText: originResponse.statusText,
      headers: originResponse.headers,
    });
  },
};
