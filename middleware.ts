import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Bot user agents for crawler detection
const BOT_USER_AGENTS = [
  'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'slurp', 'baiduspider',
  'facebookexternalhit', 'twitterbot', 'rogerbot', 'linkedinbot', 'embedly',
  'quora link preview', 'showyoubot', 'outbrain', 'pinterest', 'slackbot',
  'vkshare', 'w3c_validator', 'redditbot', 'applebot', 'whatsapp', 'flipboard',
  'tumblr', 'bitlybot', 'skypeuripreview', 'nuzzel', 'discordbot', 'qwantify',
  'pinterestbot', 'bitrix', 'xing-contenttabreceiver', 'chrome-lighthouse',
  'telegrambot', 'seznambot', 'ahrefsbot', 'semrushbot', 'mj12bot', 'petalbot',
  'ia_archiver', 'archive.org_bot', 'screaming frog'
];

// Paths that should be prerendered
const PRERENDERABLE_PATHS = [
  '/',
  '/tools',
  '/browse',
  '/categories',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/blog',
  '/tutorials',
  '/submit',
  '/advertise',
  '/changelog',
  '/api-docs',
  '/sitemap',
  '/favorites',
  '/compare'
];

// Path patterns for dynamic routes
const DYNAMIC_PATH_PATTERNS = [
  /^\/tool\/[a-z0-9-]+$/,
  /^\/category\/[a-z0-9-]+$/,
  /^\/tag\/[a-z0-9-]+$/,
  /^\/blog\/[a-z0-9-]+$/,
  /^\/compare\/[a-z0-9-]+/
];

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot));
}

function shouldPrerender(pathname: string): boolean {
  // Check static paths
  if (PRERENDERABLE_PATHS.includes(pathname)) {
    return true;
  }
  
  // Check dynamic path patterns
  return DYNAMIC_PATH_PATTERNS.some(pattern => pattern.test(pathname));
}

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const pathname = request.nextUrl.pathname;
  
  // Skip for static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // Skip files with extensions
  ) {
    return NextResponse.next();
  }
  
  // Check if request is from a bot and path should be prerendered
  if (isBot(userAgent) && shouldPrerender(pathname)) {
    console.log(`[Prerender Middleware] Bot detected: ${userAgent.substring(0, 50)}... Path: ${pathname}`);
    
    // Get the Supabase function URL from environment
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    
    if (supabaseUrl) {
      const prerenderUrl = `${supabaseUrl}/functions/v1/prerender?path=${encodeURIComponent(pathname)}`;
      
      // Rewrite to prerender endpoint
      return NextResponse.rewrite(new URL(prerenderUrl));
    }
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (robots.txt, sitemap.xml, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
};
