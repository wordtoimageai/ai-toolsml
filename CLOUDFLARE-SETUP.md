# Cloudflare Worker Setup for SEO Bot Detection

This guide explains how to set up Cloudflare as a proxy in front of your Lovable-hosted site to route search engine crawlers to the prerender endpoint.

## Overview

```
                                    ┌─────────────────────┐
                                    │   Regular Users     │
                                    │   (SPA Experience)  │
                                    └──────────┬──────────┘
                                               │
┌──────────────┐    ┌──────────────────┐      │      ┌─────────────────────┐
│   Visitors   │───▶│ Cloudflare Edge  │──────┴─────▶│   Lovable Hosting   │
│   & Bots     │    │    (Worker)      │             │  ai-toolsml.lovable │
└──────────────┘    └────────┬─────────┘             └─────────────────────┘
                             │
                             │ Bot Detected?
                             ▼
                    ┌──────────────────┐
                    │  Supabase Edge   │
                    │    Function      │
                    │   /prerender     │
                    └──────────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  SEO-Optimized   │
                    │      HTML        │
                    │ (unique titles,  │
                    │  outlinks, etc)  │
                    └──────────────────┘
```

## Prerequisites

- A Cloudflare account (free tier works)
- Access to your domain registrar to update nameservers
- The domain `toolsml.com` (or your custom domain)

## Step 1: Create Cloudflare Account & Add Domain

1. Go to [cloudflare.com](https://cloudflare.com) and create an account
2. Click "Add a Site" and enter `toolsml.com`
3. Select the **Free** plan (sufficient for this use case)
4. Cloudflare will scan your existing DNS records
5. **Important:** Keep all existing DNS records

## Step 2: Update Nameservers

1. Cloudflare will provide two nameservers (e.g., `bob.ns.cloudflare.com`)
2. Go to your domain registrar (where you bought `toolsml.com`)
3. Update the nameservers to point to Cloudflare's servers
4. Wait for propagation (usually 1-24 hours)

## Step 3: Configure DNS Records

Once your domain is active on Cloudflare:

1. Go to **DNS** settings
2. Add/update these records:

For Lovable custom domain (if using `toolsml.com`):
```
Type: A
Name: @
Content: 185.158.133.1
Proxy status: Proxied (orange cloud ON)
```

```
Type: A
Name: www
Content: 185.158.133.1
Proxy status: Proxied (orange cloud ON)
```

**Important:** The orange cloud (Proxied) MUST be enabled for the Worker to intercept requests.

## Step 4: Create the Cloudflare Worker

1. Go to **Workers & Pages** in your Cloudflare dashboard
2. Click **Create Application** → **Create Worker**
3. Name it `toolsml-prerender` (or similar)
4. Click **Deploy** to create the worker
5. Click **Edit Code**
6. Replace all code with the contents of `cloudflare-worker.js` from this repository
7. Click **Save and Deploy**

## Step 5: Configure Worker Route

1. Go back to your domain in Cloudflare dashboard
2. Navigate to **Workers Routes**
3. Click **Add Route**
4. Configure:
   - **Route:** `toolsml.com/*`
   - **Worker:** Select `toolsml-prerender`
5. Click **Save**
6. Add another route for www:
   - **Route:** `www.toolsml.com/*`
   - **Worker:** Select `toolsml-prerender`

## Step 6: Configure Worker Settings (Optional but Recommended)

1. Go to your Worker → **Settings** → **Variables**
2. You can add environment variables if needed:
   - `PRERENDER_URL`: Your Supabase prerender endpoint
   - `ORIGIN_HOST`: Your Lovable hosting domain

## Step 7: Test the Setup

### Test Bot Detection Locally

```bash
# Test with Googlebot user agent
curl -I -H "User-Agent: Googlebot" https://toolsml.com/tool/chatgpt

# Should return:
# X-Prerendered: true
# Content-Type: text/html
```

### Test Full Content

```bash
# Get full prerendered HTML
curl -H "User-Agent: Googlebot" https://toolsml.com/tool/chatgpt | head -100

# Should show unique <title>, <h1>, and external links
```

### Test Regular User Experience

```bash
# Regular browser request (no bot UA)
curl -I https://toolsml.com/

# Should NOT have X-Prerendered header
```

## Step 8: Verify with SEO Tools

After setup, verify using:

1. **Google Search Console**
   - URL Inspection tool
   - Request indexing for key pages

2. **Facebook Sharing Debugger**
   - https://developers.facebook.com/tools/debug/
   - Enter your URL to see OG metadata

3. **Twitter Card Validator**
   - https://cards-dev.twitter.com/validator
   - Test Twitter card rendering

4. **LinkedIn Post Inspector**
   - https://www.linkedin.com/post-inspector/
   - Verify link preview

5. **Screaming Frog / Sitebulb**
   - Run a fresh crawl
   - Verify all pages show unique titles and outlinks

## Troubleshooting

### Worker Not Triggering

- Ensure the orange cloud (Proxied) is enabled for DNS records
- Check that Worker Route matches your domain exactly
- Verify Worker is deployed and active

### Prerender Returning Errors

- Check Supabase Edge Function logs
- Verify the prerender endpoint is accessible:
  ```bash
  curl "https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender?path=/tool/chatgpt"
  ```

### Caching Issues

- Purge Cloudflare cache: **Caching** → **Configuration** → **Purge Everything**
- Wait a few minutes and re-test

### SSL/HTTPS Issues

- Ensure SSL mode is set to **Full** in Cloudflare SSL/TLS settings
- Wait for SSL certificate provisioning (can take up to 24 hours for new domains)

## Bot List Included

The worker detects these bots/crawlers:

| Category | Bots |
|----------|------|
| Search Engines | Googlebot, Bingbot, Slurp (Yahoo), DuckDuckBot, Baiduspider, Yandexbot |
| Social Media | Facebookexternalhit, Twitterbot, LinkedInbot, Pinterest, Discordbot, Slackbot, WhatsApp, Telegram |
| SEO Tools | Semrushbot, Ahrefsbot, Screaming Frog, MJ12bot, Dotbot, Rogerbot |
| AI Crawlers | GPTBot, ChatGPT-User, ClaudeBot, Anthropic-AI, Bytespider |
| Others | Applebot, Amazonbot, Petalbot, Lighthouse, W3C_Validator |

## Performance Considerations

- **Caching:** Prerendered responses are cached for 24 hours (`max-age=86400`)
- **Edge Location:** Cloudflare serves from 300+ edge locations worldwide
- **Fallback:** If prerender fails, users get the normal SPA (graceful degradation)

## Cost

- **Cloudflare Free Tier:** 100,000 Worker requests/day (more than enough for bot traffic)
- **Supabase Free Tier:** 500,000 Edge Function invocations/month

For most sites, this solution is completely free.

## Monitoring

View Worker analytics in Cloudflare dashboard:
- **Workers & Pages** → **Your Worker** → **Metrics**
- See request counts, CPU time, and errors

## Next Steps After Setup

1. Request re-indexing in Google Search Console for key pages
2. Submit sitemap: `https://toolsml.com/sitemap.xml`
3. Monitor Search Console for indexing improvements over 1-2 weeks
4. Run SEO audit to confirm all 85 pages now show unique titles and outlinks
