import type { VercelRequest, VercelResponse } from '@vercel/node';

// Bot user agents for crawler detection
const BOT_USER_AGENTS = [
  'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'slurp', 'baiduspider',
  'facebookexternalhit', 'twitterbot', 'rogerbot', 'linkedinbot', 'embedly',
  'quora link preview', 'showyoubot', 'outbrain', 'pinterest', 'slackbot',
  'vkshare', 'w3c_validator', 'redditbot', 'applebot', 'whatsapp', 'flipboard',
  'tumblr', 'bitlybot', 'skypeuripreview', 'nuzzel', 'discordbot', 'qwantify',
  'pinterestbot', 'bitrix', 'xing-contenttabreceiver', 'chrome-lighthouse',
  'telegrambot', 'seznambot', 'ahrefsbot', 'semrushbot', 'mj12bot', 'petalbot'
];

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userAgent = req.headers['user-agent'] || '';
  const path = req.query.path as string || req.url || '/';
  
  // Only prerender for bots
  if (!isBot(userAgent)) {
    // Return 302 to original path for non-bots
    res.redirect(302, path);
    return;
  }
  
  console.log(`[Prerender API] Bot detected: ${userAgent.substring(0, 50)}... Path: ${path}`);
  
  try {
    // Get the Supabase function URL
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    
    if (!supabaseUrl) {
      console.error('[Prerender API] SUPABASE_URL not configured');
      res.redirect(302, path);
      return;
    }
    
    const prerenderUrl = `${supabaseUrl}/functions/v1/prerender?path=${encodeURIComponent(path)}`;
    
    const response = await fetch(prerenderUrl, {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html',
      },
    });
    
    if (!response.ok) {
      console.error(`[Prerender API] Prerender function returned ${response.status}`);
      res.redirect(302, path);
      return;
    }
    
    const html = await response.text();
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    res.setHeader('X-Prerendered', 'true');
    res.status(200).send(html);
    
  } catch (error) {
    console.error('[Prerender API] Error:', error);
    res.redirect(302, path);
  }
}
