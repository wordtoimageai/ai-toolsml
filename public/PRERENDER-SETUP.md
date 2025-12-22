# Prerender Service Setup Guide for ToolsML

This guide explains how to set up prerender services to serve SEO-friendly HTML to search engine crawlers.

## Available Endpoints

### 1. Prerender Middleware
Detects bots and serves prerendered content:
```
GET https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender-middleware?path=/tool/chatgpt
```

### 2. Direct Prerender
Gets prerendered HTML for any page:
```
GET https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender?path=/tool/chatgpt
```

### 3. Dynamic Sitemap
```
GET https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/sitemap
```

### 4. Dynamic OG Images
```
GET https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/og-image?type=tool&id=chatgpt
GET https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/og-image?type=category&id=writing
GET https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/og-image?type=home
```

## Option 1: Prerender.io Integration

1. Sign up at https://prerender.io
2. Get your Prerender token
3. Configure middleware in your hosting platform

### Vercel Middleware (vercel.json):
```json
{
  "rewrites": [
    {
      "source": "/((?!api|_next|static|favicon.ico).*)",
      "has": [
        {
          "type": "header",
          "key": "user-agent",
          "value": ".*(googlebot|bingbot|slurp|duckduckbot|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|telegrambot).*"
        }
      ],
      "destination": "https://service.prerender.io/https://toolsml.com/:path*"
    }
  ]
}
```

### Vercel Edge Middleware (middleware.ts):
```typescript
import { NextRequest, NextResponse } from 'next/server';

const BOT_AGENTS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
  'yandexbot', 'facebot', 'facebookexternalhit', 'twitterbot',
  'linkedinbot', 'discordbot', 'telegrambot', 'slackbot'
];

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const isBot = BOT_AGENTS.some(bot => userAgent.includes(bot));
  
  if (isBot) {
    const prerenderUrl = `https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender?path=${encodeURIComponent(request.nextUrl.pathname)}`;
    return NextResponse.rewrite(prerenderUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
```

## Option 2: Cloudflare Workers

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const BOT_AGENTS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
  'yandexbot', 'facebot', 'facebookexternalhit', 'twitterbot',
  'linkedinbot', 'discordbot', 'telegrambot', 'slackbot', 'whatsapp'
];

async function handleRequest(request) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const isBot = BOT_AGENTS.some(bot => userAgent.includes(bot));
  
  if (isBot) {
    const url = new URL(request.url);
    const prerenderUrl = `https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender?path=${encodeURIComponent(url.pathname)}`;
    
    const response = await fetch(prerenderUrl);
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
        'X-Prerender-Status': '200'
      }
    });
  }
  
  return fetch(request);
}
```

## Option 3: Nginx Configuration

```nginx
upstream prerender {
    server kpynatdltoakbpwbjxqm.supabase.co:443;
}

map $http_user_agent $prerender {
    default 0;
    "~*googlebot" 1;
    "~*bingbot" 1;
    "~*slurp" 1;
    "~*duckduckbot" 1;
    "~*facebookexternalhit" 1;
    "~*twitterbot" 1;
    "~*linkedinbot" 1;
    "~*discordbot" 1;
    "~*telegrambot" 1;
    "~*whatsapp" 1;
}

server {
    listen 80;
    server_name toolsml.com;
    
    location / {
        if ($prerender = 1) {
            rewrite ^(.*)$ /functions/v1/prerender?path=$1 break;
            proxy_pass https://kpynatdltoakbpwbjxqm.supabase.co;
            proxy_set_header Host kpynatdltoakbpwbjxqm.supabase.co;
            proxy_ssl_verify off;
        }
        
        # Serve normal SPA for regular users
        try_files $uri $uri/ /index.html;
    }
}
```

## Option 4: Apache .htaccess

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Check for bot user agents
    RewriteCond %{HTTP_USER_AGENT} googlebot|bingbot|slurp|duckduckbot|facebookexternalhit|twitterbot|linkedinbot|discordbot|telegrambot|whatsapp [NC]
    
    # Proxy to prerender service
    RewriteRule ^(.*)$ https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender?path=/$1 [P,L]
    
    # Normal SPA fallback
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

## Testing the Prerender Setup

### 1. Test Bot Detection
```bash
# Simulate Googlebot
curl -H "User-Agent: Googlebot/2.1" "https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender-middleware?path=/tool/chatgpt&format=check"
```

### 2. Test Prerendered HTML
```bash
curl "https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender?path=/tool/chatgpt"
```

### 3. Test OG Image Generation
```bash
# View in browser
https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/og-image?type=tool&id=chatgpt
```

### 4. Test with Google's Tools
- [Google Search Console URL Inspection](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Detected Bots

The prerender middleware detects these user agents:
- Google: googlebot, google page speed, chrome-lighthouse
- Bing: bingbot
- Yahoo: slurp
- DuckDuckGo: duckduckbot
- Baidu: baiduspider
- Yandex: yandexbot
- Social: facebookexternalhit, twitterbot, linkedinbot, discordbot, telegrambot, whatsapp, pinterest, slack
- Other: applebot, flipboard, tumblr, reddit

## Caching

All prerendered content is cached with these headers:
- `Cache-Control: public, max-age=86400, s-maxage=86400` (24 hours)
- OG images: `Cache-Control: public, max-age=604800, immutable` (7 days)

## Troubleshooting

### Issue: Empty or incomplete prerendered content
- Check that the path parameter is URL-encoded
- Verify the page exists in the metadata

### Issue: OG images not loading
- Ensure the tool/category ID matches exactly
- Check available IDs: `?format=json`

### Issue: Bot not detected
- Check user agent string format
- Use `?format=check` to debug detection
