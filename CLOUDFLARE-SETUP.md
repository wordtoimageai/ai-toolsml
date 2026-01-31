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

## ⚠️ CRITICAL: Pre-Deployment Verification Checklist

Before deploying the Cloudflare Worker, verify these components are working:

### 1. Test Prerender Endpoint Directly

```bash
# Test homepage
curl -s "https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender?path=/" | head -20

# Expected: HTML with <title>ToolsML - Discover Best AI Tools 2025...</title>

# Test tool page
curl -s "https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender?path=/tool/chatgpt" | grep -E "<title>|<h1>"

# Expected:
# <title>ChatGPT Review 2025 - Features, Pricing & Alternatives | ToolsML</title>
# <h1 itemprop="name">ChatGPT</h1>

# Test category page  
curl -s "https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender?path=/category/writing" | grep -E "<title>|<h1>"

# Expected:
# <title>Best Writing AI Tools 2025 - Top Rated & Compared | ToolsML</title>
# <h1>Best AI Writing Tools 2025</h1>

# Test tag page
curl -s "https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender?path=/tag/free" | grep -E "<title>|<h1>"

# Expected:
# <title>Free AI Tools - Browse & Compare 2025 | ToolsML</title>
# <h1>Free AI Tools</h1>
```

### 2. Verify Canonical URLs

```bash
curl -s "https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender?path=/tool/chatgpt" | grep canonical

# Expected: <link rel="canonical" href="https://toolsml.com/tool/chatgpt">
```

### 3. Verify Structured Data

```bash
curl -s "https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender?path=/tool/chatgpt" | grep "application/ld+json"

# Expected: At least one <script type="application/ld+json"> tag
```

### 4. Verify External Outlinks

```bash
curl -s "https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender?path=/tool/chatgpt" | grep "chat.openai.com"

# Expected: Link to ChatGPT's official website
```

---

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

---

## ✅ Post-Deployment Testing Checklist

After deploying the Cloudflare Worker, run these tests:

### 1. Test Bot Detection

```bash
# With Googlebot user agent - should get prerendered HTML
curl -I -H "User-Agent: Googlebot" https://toolsml.com/tool/chatgpt

# Look for these headers:
# X-Prerendered: true
# Content-Type: text/html; charset=utf-8
```

### 2. Test Unique Titles

```bash
# Homepage
curl -s -H "User-Agent: Googlebot" https://toolsml.com/ | grep "<title>"
# Expected: <title>ToolsML - Discover Best AI Tools 2025 | 1000+ Curated Solutions</title>

# Tool page
curl -s -H "User-Agent: Googlebot" https://toolsml.com/tool/chatgpt | grep "<title>"
# Expected: <title>ChatGPT Review 2025 - Features, Pricing & Alternatives | ToolsML</title>

# Category page
curl -s -H "User-Agent: Googlebot" https://toolsml.com/category/writing | grep "<title>"
# Expected: <title>Best Writing AI Tools 2025 - Top Rated & Compared | ToolsML</title>

# Tag page
curl -s -H "User-Agent: Googlebot" https://toolsml.com/tag/free | grep "<title>"
# Expected: <title>Free AI Tools - Browse & Compare 2025 | ToolsML</title>
```

### 3. Test Canonical URLs

```bash
curl -s -H "User-Agent: Googlebot" https://toolsml.com/tool/chatgpt | grep canonical
# Expected: <link rel="canonical" href="https://toolsml.com/tool/chatgpt">

curl -s -H "User-Agent: Googlebot" https://toolsml.com/category/design | grep canonical
# Expected: <link rel="canonical" href="https://toolsml.com/category/design">
```

### 4. Test Structured Data (JSON-LD)

```bash
curl -s -H "User-Agent: Googlebot" https://toolsml.com/tool/chatgpt | grep -c "application/ld+json"
# Expected: At least 1 (should be 2-3 for tool pages)
```

### 5. Test Regular Users (No Prerender)

```bash
# Without bot UA - should proxy to origin
curl -I https://toolsml.com/

# Should NOT have X-Prerendered header
# Content should be the React SPA
```

### 6. Test Multiple Bot User Agents

```bash
# Bingbot
curl -s -H "User-Agent: Bingbot" https://toolsml.com/tool/claude | grep "<title>"

# Facebookexternalhit (Open Graph)
curl -s -H "User-Agent: facebookexternalhit" https://toolsml.com/tool/midjourney | grep "og:title"

# Twitterbot
curl -s -H "User-Agent: Twitterbot" https://toolsml.com/tool/github-copilot | grep "twitter:title"
```

---

## 🔍 Verify with SEO Tools

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

---

## 🐛 Troubleshooting

### Worker Not Triggering

**Symptoms:** No `X-Prerendered` header even with bot UA

**Solutions:**
- Ensure the orange cloud (Proxied) is enabled for DNS records
- Check that Worker Route matches your domain exactly (including www)
- Verify Worker is deployed and active in Cloudflare dashboard
- Check Worker logs for errors

### Prerender Returning Errors

**Symptoms:** 500 errors or empty responses for bot requests

**Solutions:**
1. Check Supabase Edge Function logs in Cloud View
2. Verify the prerender endpoint is accessible:
   ```bash
   curl "https://kpynatdltoakbpwbjxqm.supabase.co/functions/v1/prerender?path=/tool/chatgpt"
   ```
3. Ensure the path is properly URL-encoded
4. Check for timeout issues (prerender function has 10s limit)

### Caching Issues

**Symptoms:** Old content appearing, changes not reflecting

**Solutions:**
- Purge Cloudflare cache: **Caching** → **Configuration** → **Purge Everything**
- Wait a few minutes and re-test
- Use `?nocache=1` query param for testing

### SSL/HTTPS Issues

**Symptoms:** SSL errors or mixed content warnings

**Solutions:**
- Ensure SSL mode is set to **Full** in Cloudflare SSL/TLS settings
- Wait for SSL certificate provisioning (can take up to 24 hours for new domains)

### Duplicate Titles Still Appearing

**Symptoms:** Google Search Console shows duplicate titles

**Solutions:**
1. Verify Worker is routing bot traffic correctly
2. Check that prerender function returns unique titles
3. Wait 1-2 weeks for Google to re-crawl
4. Request re-indexing in Search Console for key pages

---

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

---

## 🚀 Next Steps After Setup

1. ✅ Request re-indexing in Google Search Console for key pages
2. ✅ Submit sitemap: `https://toolsml.com/sitemap.xml`
3. ✅ Monitor Search Console for indexing improvements over 1-2 weeks
4. ✅ Run SEO audit to confirm all 85+ pages now show unique titles and outlinks
5. ✅ Test social sharing on Facebook, Twitter, LinkedIn

## Expected Results

After successful deployment:

| Metric | Before | After |
|--------|--------|-------|
| Unique Titles | 0/35 | 35/35 |
| Schema.org JSON-LD | 0/35 | 35/35 |
| Canonical URLs | 0/35 | 35/35 |
| External Outlinks | 0/35 | 35/35 |
| Issues per page | 5 | 0 |