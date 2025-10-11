/**
 * Prerendering and bot detection utilities for SEO optimization
 * Helps identify search engine crawlers and prepare content for optimal indexing
 */

/**
 * List of known search engine bot user agents
 */
const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'slurp', // Yahoo
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
  'slackbot',
  'discordbot',
  'pinterestbot',
  'redditbot',
  'applebot',
  'petalbot', // Huawei
  'amazonbot',
  'anthropic-ai', // Claude
  'gptbot', // OpenAI
  'ia_archiver' // Alexa
];

/**
 * Detect if the current user agent is a search engine bot
 */
export const isBotUserAgent = (userAgent?: string): boolean => {
  if (!userAgent) {
    userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  }
  
  const lowerCaseUA = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => lowerCaseUA.includes(bot));
};

/**
 * Check if we're in a prerendering context
 */
export const isPrerendering = (): boolean => {
  if (typeof window === 'undefined') return true; // SSR context
  
  // Check for common prerendering indicators
  return !!(
    (window as any).__PRERENDER_INJECTED ||
    (window as any).navigator?.userAgent?.includes('Prerender') ||
    (document as any).__isPrerendered
  );
};

/**
 * Generate prerender meta tag for dynamic rendering
 */
export const getPrerenderMeta = (): { name: string; content: string } => {
  return {
    name: 'prerender-status-code',
    content: '200'
  };
};

/**
 * Mark page as ready for prerendering
 * Call this after your dynamic content has loaded
 */
export const markPageReady = (): void => {
  if (typeof window !== 'undefined') {
    // Signal to prerender services that page is ready
    (window as any).prerenderReady = true;
    
    // Dispatch custom event for prerender detection
    window.dispatchEvent(new Event('prerender-ready'));
    
    console.log('Page marked as ready for prerendering');
  }
};

/**
 * Get optimal rendering strategy based on user agent
 */
export const getRenderingStrategy = (): 'static' | 'dynamic' | 'hybrid' => {
  if (isBotUserAgent()) {
    return 'static'; // Serve static content to bots
  }
  
  if (isPrerendering()) {
    return 'static'; // Serve static content during prerendering
  }
  
  return 'dynamic'; // Full interactive experience for users
};

/**
 * Create snapshot-ready HTML for prerendering
 * Ensures critical content is in the DOM before prerendering
 */
export const ensureCriticalContent = (): void => {
  if (!isBotUserAgent() && !isPrerendering()) {
    return; // Only needed for bots and prerendering
  }
  
  // Add prerender-specific optimizations
  const html = document.documentElement;
  html.setAttribute('data-prerendered', 'true');
  
  // Add meta tag to indicate prerender readiness
  const meta = document.createElement('meta');
  meta.name = 'prerender-status-code';
  meta.content = '200';
  document.head.appendChild(meta);
};

/**
 * Configuration for prerender.io or similar services
 */
export const PRERENDER_CONFIG = {
  // Prerender service endpoint (configure based on your service)
  serviceUrl: 'https://service.prerender.io/',
  
  // Token for prerender.io (should be in environment variables)
  token: import.meta.env.VITE_PRERENDER_TOKEN || '',
  
  // Cache duration in seconds
  cacheDuration: 86400, // 24 hours
  
  // Pages that should always be prerendered
  prerenderAlways: [
    '/',
    '/about',
    '/blog',
    '/tutorials',
    '/contact'
  ],
  
  // URL patterns that should NOT be prerendered
  excludePatterns: [
    /\/api\//,
    /\/admin\//,
    /\/_internal\//,
    /\.(json|xml|txt|css|js|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot)$/
  ]
};

/**
 * Check if a URL should be prerendered
 */
export const shouldPrerender = (url: string): boolean => {
  // Check if URL matches exclude patterns
  const isExcluded = PRERENDER_CONFIG.excludePatterns.some(pattern => 
    pattern.test(url)
  );
  
  if (isExcluded) return false;
  
  // Check if it's a bot or prerendering context
  return isBotUserAgent() || isPrerendering();
};

/**
 * Generate prerender-friendly meta tags
 */
export const generatePrerenderMetaTags = () => {
  return {
    'prerender-status-code': '200',
    'prerender-header': 'Cache-Control: max-age=86400, stale-while-revalidate=604800',
    'fragment': '!' // For escaped fragment URLs
  };
};

/**
 * Instructions for setting up prerendering service
 * This should be implemented at the server/CDN level
 */
export const PRERENDER_SETUP_INSTRUCTIONS = `
# Setting up Prerendering for ToolsML

## Option 1: Prerender.io (Recommended)

1. Sign up at https://prerender.io
2. Add your domain: toolsml.com
3. Copy your token
4. Add to environment: VITE_PRERENDER_TOKEN=your_token_here
5. Configure your server/CDN to proxy bot requests:

### Nginx Configuration:
location / {
  if ($http_user_agent ~* "googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit") {
    proxy_pass https://service.prerender.io;
    proxy_set_header X-Prerender-Token YOUR_TOKEN;
    rewrite .* /https://toolsml.com$request_uri break;
  }
  try_files $uri $uri/ /index.html;
}

### Cloudflare Worker:
- Install Cloudflare Prerender Worker from marketplace
- Configure with your prerender.io token

## Option 2: Self-hosted Prerender

1. Use rendertron (Google's prerendering service)
2. Deploy: docker run -p 3000:3000 rendertron
3. Configure server to proxy bot requests to rendertron

## Option 3: Static Site Generation (Best for long-term)

1. Consider migrating to Next.js for built-in SSR/SSG
2. Or use react-snap for build-time prerendering:
   - npm install --save-dev react-snap
   - Add to package.json: "postbuild": "react-snap"
   - Generates static HTML for all routes

## Testing Prerendering

1. Test with Google Search Console's URL Inspection Tool
2. Use: curl -A "Googlebot" https://toolsml.com
3. Verify with: https://search.google.com/test/mobile-friendly
4. Check with: view-source: in browser while spoofing user agent
`;

export default {
  isBotUserAgent,
  isPrerendering,
  markPageReady,
  getRenderingStrategy,
  shouldPrerender,
  ensureCriticalContent,
  generatePrerenderMetaTags,
  PRERENDER_CONFIG,
  PRERENDER_SETUP_INSTRUCTIONS
};
