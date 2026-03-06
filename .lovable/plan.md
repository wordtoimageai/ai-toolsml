

# Deploy Workflow Audit & Next Steps

## Current Status: What's Working

| Component | Status | Verified |
|-----------|--------|----------|
| **Prerender edge function** | LIVE (200 OK) | Titles contain "2026", Jasper AI has "10x faster", `/comparison` route present |
| **Sitemap edge function** | Deployed | `verify_jwt = false` in config |
| **OG Image edge function** | Deployed | `verify_jwt = false` in config |
| **`.env` in `.gitignore`** | Done (line 14) | `.env` excluded from version control |
| **`vercel.json` removed** | Done | File no longer exists in project |
| **Cloudflare Worker** | Code ready | Explicit `/sitemap.xml`, `/robots.txt` bypass present (lines 207-215) |
| **Dynamic year** | Done | `const Y = new Date().getFullYear()` on line 5 |

## Complete Deploy Workflow

```text
┌─────────────────────────────────────────────────────┐
│                    DEPLOY PIPELINE                    │
├─────────────────────────────────────────────────────┤
│                                                       │
│  1. FRONTEND (Lovable)                                │
│     ├─ Edit code in Lovable                           │
│     ├─ Preview automatically updates                  │
│     └─ Click "Publish" → "Update" to go live          │
│         → Serves at: ai-toolsml.lovable.app           │
│                                                       │
│  2. EDGE FUNCTIONS (automatic)                        │
│     ├─ Edit files in supabase/functions/*/index.ts    │
│     └─ Auto-deployed on save (no manual step)         │
│         → prerender, sitemap, og-image,               │
│           prerender-middleware, generate-sitemap       │
│                                                       │
│  3. CLOUDFLARE WORKER (manual)                        │
│     ├─ Edit cloudflare-worker.js locally              │
│     └─ Deploy via Cloudflare dashboard or CLI:        │
│           wrangler deploy cloudflare-worker.js         │
│         → Routes: toolsml.com/*                       │
│                                                       │
│  4. DATABASE MIGRATIONS (automatic)                   │
│     └─ Run via Lovable migration tool                 │
│                                                       │
│  REQUEST FLOW:                                        │
│  User → toolsml.com → Cloudflare Worker               │
│    ├─ Bot? → Supabase prerender function → HTML       │
│    ├─ Static SEO file? → Origin pass-through          │
│    └─ Human? → Lovable SPA (ai-toolsml.lovable.app)  │
│                                                       │
└─────────────────────────────────────────────────────┘
```

## Remaining Action Items

### Must Do (you, outside Lovable)

1. **Deploy Cloudflare Worker** — The `cloudflare-worker.js` file in your repo has the updated static file bypass logic and rate limiting. You need to deploy it to Cloudflare via the dashboard or `wrangler deploy`. Without this, bots hitting `toolsml.com` won't be routed to the prerender function.

2. **Submit sitemap in Google Search Console** — Go to Search Console → Sitemaps → submit `sitemap.xml`. This triggers Google to re-crawl with the new prerender metadata.

3. **Verify Cloudflare Worker `ORIGIN_HOST`** — Line 90 of `cloudflare-worker.js` currently points to `ai-toolsml.lovable.app`. Confirm this is the correct Lovable origin hostname for your published site.

### Should Do (in Lovable, next session)

4. **Add homepage internal links** — Add a visible "Browse by Category" and "Featured Tools" link section to `src/pages/Index.tsx` so Google discovers category and tool pages from the homepage via HTML links (not just JS routing).

5. **Create `/other-ai-tools` page** — Per your Search Console data, this query gets 503 impressions with 0 clicks. Creating a dedicated page would capture that traffic.

6. **Add detailed content to top tool pages** — The tool detail pages in the SPA likely have thin content. Adding longer descriptions, pros/cons, and use cases to `src/data/tools.ts` would improve rankings.

### Nice to Have

7. **Data retention policy** — Add a scheduled cleanup for `analytics_events` older than 90 days.
8. **Cloudflare Worker distributed rate limiting** — Replace in-memory `Map` with Workers KV for rate limiting across edge locations.

