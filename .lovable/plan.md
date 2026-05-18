## Goal
Fix the "Discovered/Crawled — not indexed" issues from the GSC guide by removing crawl-budget drain (thin `/tag/*` pages) and beefing up the `/about` page. This is the "Week 1 — stop the bleeding" set from the guide; the rest (per-tool 500-word reviews) is editorial work better tackled separately.

## Changes

### 1. Noindex all `/tag/*` pages
`src/pages/Tag.tsx` — pass `noIndex` through `AdvancedSEO` (or add a `<Helmet><meta name="robots" content="noindex, follow" /></Helmet>`) so every tag page returns `noindex, follow`. This stops Google from wasting crawl budget on thin tag lists while still letting it follow outbound links to tool pages.

### 2. Remove tag URLs from sitemaps
- `supabase/functions/generate-sitemap/index.ts` — delete the `for (const tag of popularTags)` block (lines ~127–136) and the `tags` count in the summary.
- `src/lib/sitemap-generator.ts` — if it emits `/tag/*` entries (used by `scripts/generate-sitemap.js` → `public/sitemap.xml`), remove them too.
- Regenerate `public/sitemap.xml` so the static fallback no longer lists tag URLs.

### 3. Expand `/about` to 300+ words of substantive content
`src/pages/About.tsx` — replace the four short emoji cards with real editorial copy: who runs ToolsML, when it launched, editorial process (how tools are picked, tested, updated weekly), independence/no-pay-to-play stance, contact + submission CTA. Target ~400 words total across the page so Google has something to index.

### 4. Optional permanent noindex for low-value tag names
The guide flags `/tag/free`, `/tag/paid`, `/tag/subscription` as inherently low value. Already covered by step 1 (all tags noindexed). No extra work needed unless we later un-noindex other tags.

## Out of scope (flagged for follow-up)
- **Per-tool 500-word reviews + pros/cons + pricing** for Midjourney/Deepseek/Jasper/etc. — editorial content work, not a code change. Schema markup (`SoftwareApplication`) is already present via `ProductSchema`/`ToolDetail` — verified earlier.
- **Manual GSC actions**: re-submitting sitemap, "Request Indexing" on top tools, removing tag URLs in GSC — these are user-side actions in Search Console.
- **Cloudflare worker redeploy** — needed only if you also want stale tag URLs to 410; not required for this fix.

## Verification
- Visit `/tag/video` in preview, view source, confirm `<meta name="robots" content="noindex, follow">`.
- Open `/sitemap.xml` (or the edge function output) and confirm no `/tag/` entries.
- `/about` shows expanded copy without layout breakage.