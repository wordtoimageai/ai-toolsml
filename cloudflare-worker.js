/**
 * Cloudflare Worker for Bot Detection and Prerendering
 * 
 * This worker intercepts requests to toolsml.com and routes
 * search engine crawlers to the prerender endpoint for SEO.
 * 
 * Deploy this to Cloudflare Workers and configure the route:
 * toolsml.com/*
 * 
 * Rate Limiting Configuration:
 * - Uses in-memory sliding window rate limiting
 * - For production, consider Cloudflare Rate Limiting Rules (dashboard)
 *   or Workers KV for distributed rate limiting across edge locations
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

// Legitimate search engine bots that should bypass rate limiting
const TRUSTED_BOTS = [
  'googlebot',
  'bingbot',
  'applebot',
  'yandexbot',
  'duckduckbot',
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'slackbot',
  'discordbot',
  'whatsapp'
];

// Your Supabase prerender endpoint
const PRERENDER_URL = 'https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender';

// Your origin (Lovable hosting)
const ORIGIN_HOST = 'ai-toolsml.lovable.app';

// Static file extensions to skip
const STATIC_EXTENSIONS = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map|json|xml|txt|webp|avif|mp4|webm|pdf)$/i;

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  // Maximum prerender requests per IP per window
  maxRequests: 30,
  // Time window in seconds
  windowSeconds: 60,
  // Maximum requests for suspicious/unknown bots
  suspiciousBotMaxRequests: 10,
};

// In-memory rate limit store (per worker instance)
// Note: For distributed rate limiting across edge locations, use Workers KV
const rateLimitStore = new Map();

/**
 * Clean up expired rate limit entries
 */
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now - data.windowStart > RATE_LIMIT_CONFIG.windowSeconds * 1000) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Check if request should be rate limited
 * Returns { limited: boolean, remaining: number, resetIn: number }
 */
function checkRateLimit(clientIP, isTrustedBot) {
  const now = Date.now();
  const maxRequests = isTrustedBot 
    ? RATE_LIMIT_CONFIG.maxRequests * 2 // Double limit for trusted bots
    : RATE_LIMIT_CONFIG.maxRequests;
  
  // Clean up old entries periodically (1% chance per request)
  if (Math.random() < 0.01) {
    cleanupRateLimitStore();
  }
  
  const key = `prerender:${clientIP}`;
  const existing = rateLimitStore.get(key);
  
  if (!existing || (now - existing.windowStart > RATE_LIMIT_CONFIG.windowSeconds * 1000)) {
    // Start new window
    rateLimitStore.set(key, {
      windowStart: now,
      count: 1
    });
    return { 
      limited: false, 
      remaining: maxRequests - 1,
      resetIn: RATE_LIMIT_CONFIG.windowSeconds
    };
  }
  
  // Check if over limit
  if (existing.count >= maxRequests) {
    const resetIn = Math.ceil((existing.windowStart + RATE_LIMIT_CONFIG.windowSeconds * 1000 - now) / 1000);
    return { 
      limited: true, 
      remaining: 0,
      resetIn
    };
  }
  
  // Increment counter
  existing.count++;
  rateLimitStore.set(key, existing);
  
  return { 
    limited: false, 
    remaining: maxRequests - existing.count,
    resetIn: Math.ceil((existing.windowStart + RATE_LIMIT_CONFIG.windowSeconds * 1000 - now) / 1000)
  };
}

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

/**
 * Get client IP from request
 */
function getClientIP(request) {
  // Cloudflare provides the client IP in CF-Connecting-IP header
  return request.headers.get('CF-Connecting-IP') || 
         request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
         'unknown';
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('User-Agent') || '';
    const clientIP = getClientIP(request);
    
    // Explicit bypass for core SEO and static files
    // This ensures Lovable serves them correctly instead of trying to prerender them
    if (url.pathname === '/sitemap.xml' || url.pathname === '/robots.txt' || 
        url.pathname === '/manifest.json' || url.pathname === '/llms.txt') {
      const originUrl = new URL(request.url);
      originUrl.host = ORIGIN_HOST;
      return fetch(originUrl.toString(), {
        method: request.method,
        headers: request.headers,
      });
    }

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
      const trusted = isTrustedBot(userAgent);
      
      // Apply rate limiting for prerender requests
      const rateLimit = checkRateLimit(clientIP, trusted);
      
      if (rateLimit.limited) {
        console.log(`[Rate Limited] IP: ${clientIP}, UA: ${userAgent.substring(0, 50)}...`);
        
        return new Response('Too Many Requests', {
          status: 429,
          headers: {
            'Content-Type': 'text/plain',
            'Retry-After': String(rateLimit.resetIn),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(rateLimit.resetIn),
            // Allow search engines to retry later
            'X-Robots-Tag': 'noindex',
          },
        });
      }
      
      try {
        // Build prerender URL with the path
        const prerenderUrl = `${PRERENDER_URL}?path=${encodeURIComponent(url.pathname)}`;
        
        console.log(`[Bot Detected] IP: ${clientIP}, UA: ${userAgent.substring(0, 50)}..., Path: ${url.pathname}, Trusted: ${trusted}`);
        
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
              'X-RateLimit-Remaining': String(rateLimit.remaining),
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
