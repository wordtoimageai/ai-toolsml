import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

type ToolMeta = { t: string; d: string; c: string; r: string; co: string; w: string };

// Compact tool data: t=title, d=description, c=category, r=rating, co=company, w=website
const T: Record<string, ToolMeta> = {
  'chatgpt': { t: 'ChatGPT', d: 'Advanced conversational AI for writing, coding, analysis by OpenAI.', c: 'Writing', r: '4.8', co: 'OpenAI', w: 'https://chat.openai.com' },
  'claude': { t: 'Claude', d: 'Anthropic AI assistant for helpful conversations and analysis.', c: 'Writing', r: '4.6', co: 'Anthropic', w: 'https://claude.ai' },
  'jasper-ai': { t: 'Jasper AI', d: 'AI marketing copywriting platform for business content.', c: 'Marketing', r: '4.5', co: 'Jasper AI', w: 'https://jasper.ai' },
  'copy-ai': { t: 'Copy.ai', d: 'AI copywriting tool for marketing content and social media.', c: 'Writing', r: '4.4', co: 'Copy.ai', w: 'https://copy.ai' },
  'grammarly': { t: 'Grammarly', d: 'AI-powered writing assistant for grammar and style.', c: 'Writing', r: '4.7', co: 'Grammarly', w: 'https://grammarly.com' },
  'writesonic': { t: 'Writesonic', d: 'AI content writer for articles, ads, and marketing copy.', c: 'Writing', r: '4.3', co: 'Writesonic', w: 'https://writesonic.com' },
  'midjourney': { t: 'Midjourney', d: 'AI image generation from text prompts with artistic styles.', c: 'Design', r: '4.7', co: 'Midjourney Inc.', w: 'https://midjourney.com' },
  'stable-diffusion': { t: 'Stable Diffusion', d: 'Open-source text-to-image AI for detailed art.', c: 'Design', r: '4.5', co: 'Stability AI', w: 'https://stability.ai' },
  'dalle': { t: 'DALL-E', d: 'OpenAI image generator creating art from text.', c: 'Design', r: '4.6', co: 'OpenAI', w: 'https://openai.com/dall-e-3' },
  'dalle-3': { t: 'DALL-E 3', d: 'Latest OpenAI image generator with enhanced quality.', c: 'Design', r: '4.6', co: 'OpenAI', w: 'https://openai.com/dall-e-3' },
  'adobe-firefly': { t: 'Adobe Firefly', d: 'Adobe generative AI for images and creative content.', c: 'Design', r: '4.4', co: 'Adobe', w: 'https://firefly.adobe.com' },
  'figma': { t: 'Figma', d: 'Collaborative design tool with AI features.', c: 'Design', r: '4.7', co: 'Figma', w: 'https://figma.com' },
  'canva': { t: 'Canva', d: 'Design platform with AI-powered creative tools.', c: 'Design', r: '4.7', co: 'Canva', w: 'https://canva.com' },
  'canva-ai': { t: 'Canva AI', d: 'Design platform with AI tools and templates.', c: 'Design', r: '4.7', co: 'Canva', w: 'https://canva.com' },
  'leonardo-ai': { t: 'Leonardo AI', d: 'AI art generator for game assets and imagery.', c: 'Design', r: '4.5', co: 'Leonardo.Ai', w: 'https://leonardo.ai' },
  'github-copilot': { t: 'GitHub Copilot', d: 'AI pair programmer with intelligent code suggestions.', c: 'Coding', r: '4.6', co: 'GitHub/Microsoft', w: 'https://github.com/features/copilot' },
  'cursor': { t: 'Cursor', d: 'AI-first code editor with coding assistance.', c: 'Coding', r: '4.7', co: 'Cursor', w: 'https://cursor.sh' },
  'replit-ghostwriter': { t: 'Replit Ghostwriter', d: 'AI coding assistant in Replit IDE.', c: 'Coding', r: '4.3', co: 'Replit', w: 'https://replit.com' },
  'deepseek': { t: 'DeepSeek', d: 'Advanced AI for code generation and reasoning.', c: 'Coding', r: '4.5', co: 'DeepSeek', w: 'https://deepseek.com' },
  'codesignal': { t: 'CodeSignal', d: 'AI-powered technical assessment platform.', c: 'Coding', r: '4.2', co: 'CodeSignal', w: 'https://codesignal.com' },
  'codium-ai': { t: 'CodiumAI', d: 'AI code integrity and test generation.', c: 'Coding', r: '4.1', co: 'CodiumAI', w: 'https://codium.ai' },
  'notion-ai': { t: 'Notion AI', d: 'AI writing assistant integrated into Notion.', c: 'Productivity', r: '4.6', co: 'Notion Labs', w: 'https://notion.so' },
  'otter-ai': { t: 'Otter.ai', d: 'AI meeting transcription and note-taking.', c: 'Productivity', r: '4.5', co: 'Otter.ai', w: 'https://otter.ai' },
  'reclaim-ai': { t: 'Reclaim AI', d: 'Automated scheduling and calendar management.', c: 'Productivity', r: '4.4', co: 'Reclaim.ai', w: 'https://reclaim.ai' },
  'clickup-ai': { t: 'ClickUp', d: 'Project management with AI automation.', c: 'Productivity', r: '4.3', co: 'ClickUp', w: 'https://clickup.com' },
  'beautiful-ai': { t: 'Beautiful.ai', d: 'AI-powered presentation maker.', c: 'Productivity', r: '4.5', co: 'Beautiful.ai', w: 'https://beautiful.ai' },
  'loom': { t: 'Loom', d: 'AI screen recording and video messaging.', c: 'Productivity', r: '4.6', co: 'Loom', w: 'https://loom.com' },
  'fireflies-ai': { t: 'Fireflies.ai', d: 'AI meeting transcription and analysis.', c: 'Productivity', r: '4.3', co: 'Fireflies.ai', w: 'https://fireflies.ai' },
  'synthesia': { t: 'Synthesia', d: 'AI video generation with virtual presenters.', c: 'Video', r: '4.5', co: 'Synthesia', w: 'https://synthesia.io' },
  'runway-ml': { t: 'Runway ML', d: 'Creative AI toolkit for video editing.', c: 'Video', r: '4.6', co: 'Runway AI', w: 'https://runwayml.com' },
  'descript': { t: 'Descript', d: 'AI audio and video editing.', c: 'Video', r: '4.7', co: 'Descript', w: 'https://descript.com' },
  'luma-ai': { t: 'Luma AI', d: '3D capture and generation with neural fields.', c: 'Video', r: '4.4', co: 'Luma AI', w: 'https://lumalabs.ai' },
  'elevenlabs': { t: 'ElevenLabs', d: 'AI voice synthesis and voice cloning.', c: 'Audio', r: '4.8', co: 'ElevenLabs', w: 'https://elevenlabs.io' },
  'murf-ai': { t: 'Murf AI', d: 'Professional AI voiceover generator.', c: 'Audio', r: '4.4', co: 'Murf AI', w: 'https://murf.ai' },
  'mubert': { t: 'Mubert', d: 'AI royalty-free music generation.', c: 'Audio', r: '4.3', co: 'Mubert', w: 'https://mubert.com' },
  'perplexity': { t: 'Perplexity', d: 'AI search engine with cited answers.', c: 'Research', r: '4.6', co: 'Perplexity AI', w: 'https://perplexity.ai' },
  'arc-search': { t: 'Arc Search', d: 'Mobile AI search with smart browsing.', c: 'Research', r: '4.5', co: 'The Browser Company', w: 'https://arc.net' },
  'google-trends': { t: 'Google Trends', d: 'Real-time search data and market insights.', c: 'Data', r: '4.4', co: 'Google', w: 'https://trends.google.com' },
  'semrush-market-explorer': { t: 'Semrush Market Explorer', d: 'Market research and competitor analysis.', c: 'Data', r: '4.5', co: 'Semrush', w: 'https://semrush.com' },
  'hubspot-email-writer': { t: 'HubSpot Email Writer', d: 'AI email copywriting with CRM integration.', c: 'Marketing', r: '4.3', co: 'HubSpot', w: 'https://hubspot.com' },
  'albert-ai': { t: 'Albert.ai', d: 'Self-optimizing digital advertising platform.', c: 'Marketing', r: '4.6', co: 'Albert Technologies', w: 'https://albert.ai' },
  'sprout-social': { t: 'Sprout Social', d: 'AI social media management and analytics.', c: 'Social', r: '4.4', co: 'Sprout Social', w: 'https://sproutsocial.com' },
  'hubspot-ai': { t: 'HubSpot AI', d: 'CRM with AI sales and marketing automation.', c: 'Sales', r: '4.3', co: 'HubSpot', w: 'https://hubspot.com' },
  'gong': { t: 'Gong', d: 'Revenue AI for sales call analysis.', c: 'Sales', r: '4.6', co: 'Gong', w: 'https://gong.io' },
  'reply-io': { t: 'Reply.io', d: 'AI sales outreach automation.', c: 'Sales', r: '4.2', co: 'Reply', w: 'https://reply.io' },
  'surfer-seo': { t: 'Surfer SEO', d: 'AI SEO content optimization.', c: 'SEO', r: '4.6', co: 'Surfer', w: 'https://surferseo.com' },
  'semrush': { t: 'Semrush', d: 'All-in-one SEO and digital marketing platform.', c: 'SEO', r: '4.5', co: 'Semrush', w: 'https://semrush.com' },
  'marketmuse': { t: 'MarketMuse', d: 'AI content strategy and SEO optimization.', c: 'SEO', r: '4.3', co: 'MarketMuse', w: 'https://marketmuse.com' },
  'zapier': { t: 'Zapier', d: 'Automation platform with AI workflows.', c: 'Automation', r: '4.5', co: 'Zapier', w: 'https://zapier.com' },
  'wix-adi': { t: 'Wix ADI', d: 'AI website builder for custom sites.', c: 'Automation', r: '4.2', co: 'Wix.com', w: 'https://wix.com' },
};

const Y = new Date().getFullYear();
const CATS = ['writing','design','coding','marketing','productivity','audio','video','research','data','automation','sales','social','seo'];
const TAGS = ['free','writing','image-generation','coding','chatbot','productivity','marketing','video','audio','research','conversation','art','subscription','paid','text-to-speech','video-editing','voice-cloning','seo','design','collaboration','automation','assistant','analysis','open-source','business','ai-writing','ai-design','ai-coding','ai-video','ai-audio','text-generation','image-editing','content-creation','data-analysis'];

const catDesc: Record<string, string> = {
  writing: 'Best AI writing tools for content creation. Compare ChatGPT, Claude, Jasper AI, Grammarly.',
  design: 'Top AI design tools for image generation. Compare Midjourney, DALL-E, Stable Diffusion, Canva AI.',
  coding: 'AI coding assistants for faster development. GitHub Copilot, Cursor, Replit reviews.',
  marketing: 'AI marketing tools for content, ads, SEO. Jasper AI, Copy.ai, HubSpot AI.',
  productivity: 'AI productivity tools for tasks and meetings. Notion AI, Otter.ai, ClickUp.',
  audio: 'AI audio tools for voice and music. ElevenLabs, Mubert, Murf AI.',
  video: 'AI video tools for editing and generation. Synthesia, Runway ML, Descript.',
  research: 'AI research tools for analysis. Perplexity, Arc Search, Google Trends.',
  data: 'AI data tools for analytics. Semrush, Google Trends.',
  automation: 'AI automation tools for workflows. Zapier, Wix ADI, Make.',
  sales: 'AI sales tools for outreach and CRM. Reply.io, Gong, HubSpot AI.',
  social: 'AI social media tools. Sprout Social, Buffer AI.',
  seo: 'AI SEO tools for optimization. Surfer SEO, MarketMuse, Semrush.',
};

const PM: Record<string, [string, string, string]> = {
  '/': [`ToolsML - Discover Best AI Tools ${Y} | 1000+ Curated Solutions`, 'Find perfect AI tools from 1000+ options. Compare features, pricing, reviews. Updated weekly.', 'Find the Perfect AI Tool for Every Task'],
  '/browse': ['Browse All AI Tools - Complete Directory | ToolsML', 'Explore 1000+ AI tools. Filter by category, pricing, features.', 'Browse All AI Tools'],
  '/about': ['About ToolsML - AI Tool Discovery Platform', 'Learn about ToolsML, the leading AI tools platform trusted by 50K+ users.', 'About ToolsML'],
  '/blog': ['AI Tools Blog - Latest Insights & Reviews | ToolsML', 'Latest AI tools, trends, and expert reviews.', 'AI Tools Blog'],
  '/contact': ['Contact ToolsML - Get in Touch', 'Contact ToolsML for support, partnerships, or submissions.', 'Contact Us'],
  '/submit': ['Submit Your AI Tool - Get Listed on ToolsML', 'Submit your AI tool to reach thousands of users.', 'Submit Your AI Tool'],
  '/privacy': ['Privacy Policy - ToolsML', 'How ToolsML protects your privacy.', 'Privacy Policy'],
  '/terms': ['Terms of Service - ToolsML', 'ToolsML terms of service and user agreement.', 'Terms of Service'],
  '/advertise': ['Advertise on ToolsML - Reach AI Tool Buyers', 'Reach engaged users searching for AI solutions.', 'Advertise with ToolsML'],
  '/tutorials': ['AI Tools Tutorials - Learn How to Use AI | ToolsML', 'Step-by-step tutorials on AI tools.', 'AI Tools Tutorials'],
  '/compare': ['Compare AI Tools Side by Side | ToolsML', 'Compare features, pricing, and reviews.', 'Compare AI Tools'],
  '/comparison': ['Tool Comparison - Compare AI Tools Side by Side | ToolsML', 'Compare multiple AI tools side-by-side.', 'AI Tool Comparison'],
  '/favorites': ['My Favorite AI Tools | ToolsML', 'Your curated collection of favorite AI tools.', 'My Favorite AI Tools'],
  '/changelog': ['Changelog - ToolsML Updates', 'Latest ToolsML features and improvements.', 'Changelog'],
  '/api-docs': ['API Documentation | ToolsML', 'Integrate ToolsML data with our API.', 'API Documentation'],
  '/site-map': ['Site Map | ToolsML', 'Navigate all pages on ToolsML.', 'Site Map'],
};

const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const tagLabel = (t: string) => t.split('-').map(cap).join(' ');

function getMeta(path: string) {
  const p = PM[path];
  if (p) return { title: p[0], description: p[1], h1: p[2], canonical: `https://toolsml.com${path === '/' ? '' : path}` };

  const tm = path.match(/^\/tool\/([a-z0-9-]+)$/);
  if (tm) {
    const tool = T[tm[1]];
    if (tool) return {
      title: `${tool.t} Review ${Y} - Features, Pricing & Alternatives | ToolsML`,
      description: `${tool.t} by ${tool.co}: ${tool.d} Rating: ${tool.r}/5.`,
      h1: `${tool.t} - AI ${tool.c} Tool Review`,
      canonical: `https://toolsml.com/tool/${tm[1]}`,
    };
  }

  const cm = path.match(/^\/category\/([a-z0-9-]+)$/);
  if (cm) {
    const cn = cap(cm[1]);
    return {
      title: `Best ${cn} AI Tools ${Y} - Top Rated & Compared | ToolsML`,
      description: catDesc[cm[1]] || `Best ${cn.toLowerCase()} AI tools with ratings and reviews.`,
      h1: `Best AI ${cn} Tools ${Y}`,
      canonical: `https://toolsml.com/category/${cm[1]}`,
    };
  }

  const tgm = path.match(/^\/tag\/([a-z0-9-]+)$/);
  if (tgm) {
    const tn = tagLabel(tgm[1]);
    return {
      title: `${tn} AI Tools - Browse & Compare ${Y} | ToolsML`,
      description: `Find the best ${tn.toLowerCase()} AI tools. Compare features and pricing.`,
      h1: `${tn} AI Tools`,
      canonical: `https://toolsml.com/tag/${tgm[1]}`,
    };
  }

  return {
    title: `ToolsML - Discover & Compare the Best AI Tools ${Y}`,
    description: 'Find and compare 1000+ AI tools for writing, design, video, code, and more.',
    h1: 'Discover the Best AI Tools',
    canonical: `https://toolsml.com${path}`,
  };
}

function toolHtml(id: string): string {
  const tool = T[id];
  if (!tool) return '';
  const rel = Object.entries(T).filter(([i, t]) => t.c === tool.c && i !== id).slice(0, 5)
    .map(([i, t]) => `<a href="/tool/${i}">${t.t}</a>`).join(' | ');
  return `<article itemscope itemtype="https://schema.org/SoftwareApplication"><h1 itemprop="name">${esc(tool.t)}</h1><p itemprop="description">${esc(tool.d)}</p><div><span itemprop="applicationCategory">Category: <a href="/category/${tool.c.toLowerCase()}">${esc(tool.c)}</a></span> <span>Company: <span itemprop="author">${esc(tool.co)}</span></span> <div itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">Rating: <span itemprop="ratingValue">${tool.r}</span>/5</div></div><a href="${tool.w}" rel="noopener noreferrer" target="_blank" itemprop="url">Visit ${esc(tool.t)}</a>${rel ? `<nav><h2>Related ${tool.c} Tools</h2><p>${rel}</p></nav>` : ''}</article>`;
}

function navHtml(): string {
  const catLinks = CATS.map(c => `<a href="/category/${c}">${cap(c)} AI Tools</a>`).join(' | ');
  const toolLinks = Object.entries(T).map(([id, t]) => `<a href="/tool/${id}">${t.t}</a>`).join(' | ');
  const tagLinks = TAGS.map(t => `<a href="/tag/${t}">${tagLabel(t)}</a>`).join(' | ');
  const byCat = CATS.map(c => {
    const ct = Object.entries(T).filter(([,t]) => t.c.toLowerCase() === c).map(([id,t]) => `<a href="/tool/${id}">${t.t}</a>`).join(' | ');
    return ct ? `<section><h3>${cap(c)} Tools</h3><p>${ct}</p></section>` : '';
  }).filter(Boolean).join('');
  return `<nav><h2>AI Tool Categories</h2><p>${catLinks}</p></nav><nav><h2>AI Tools Directory</h2>${byCat}</nav><nav><h2>All AI Tools</h2><p>${toolLinks}</p></nav><nav><h2>Browse by Tag</h2><p>${tagLinks}</p></nav><nav><a href="/browse">Browse</a> | <a href="/compare">Compare</a> | <a href="/blog">Blog</a> | <a href="/tutorials">Tutorials</a> | <a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/advertise">Advertise</a> | <a href="/submit">Submit</a> | <a href="/favorites">Favorites</a> | <a href="/api-docs">API</a> | <a href="/changelog">Changelog</a> | <a href="/site-map">Site Map</a> | <a href="/privacy">Privacy</a> | <a href="/terms">Terms</a></nav>`;
}

function buildPage(path: string): string {
  const m = getMeta(path);
  const tm = path.match(/^\/tool\/([a-z0-9-]+)$/);
  const tc = tm ? toolHtml(tm[1]) : '';
  const d = new Date().toISOString().split('T')[0];
  const sd = JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":m.title,"description":m.description,"url":m.canonical,"dateModified":d,"isPartOf":{"@type":"WebSite","name":"ToolsML","url":"https://toolsml.com"},"publisher":{"@type":"Organization","name":"ToolsML","url":"https://toolsml.com","logo":{"@type":"ImageObject","url":"https://toolsml.com/favicon.png"}}});

  const bi: Array<{[k:string]:unknown}> = [{"@type":"ListItem","position":1,"name":"Home","item":"https://toolsml.com"}];
  if (path.startsWith('/category/')) { const c = path.slice(10); bi.push({"@type":"ListItem","position":2,"name":cap(c)+" AI Tools","item":m.canonical}); }
  else if (path.startsWith('/tool/')) { const id = path.slice(6); const t = T[id]; if (t) { bi.push({"@type":"ListItem","position":2,"name":t.c+" Tools","item":`https://toolsml.com/category/${t.c.toLowerCase()}`},{"@type":"ListItem","position":3,"name":t.t,"item":m.canonical}); } }
  else if (path.startsWith('/tag/')) { const tg = path.slice(5); bi.push({"@type":"ListItem","position":2,"name":tagLabel(tg)+" Tools","item":m.canonical}); }
  const bd = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":bi});

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${esc(m.title)}</title><meta name="description" content="${esc(m.description)}"><link rel="canonical" href="${m.canonical}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><meta property="og:type" content="${path.startsWith('/tool/')?'article':'website'}"><meta property="og:url" content="${m.canonical}"><meta property="og:title" content="${esc(m.title)}"><meta property="og:description" content="${esc(m.description)}"><meta property="og:image" content="https://toolsml.com/og-image.jpg"><meta property="og:site_name" content="ToolsML"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(m.title)}"><meta name="twitter:description" content="${esc(m.description)}"><meta name="twitter:image" content="https://toolsml.com/og-image.jpg"><link rel="icon" type="image/png" href="/favicon.png"><script type="application/ld+json">${sd}</script><script type="application/ld+json">${bd}</script></head><body><header><nav><a href="/">ToolsML</a> <a href="/browse">Browse</a> <a href="/compare">Compare</a> <a href="/blog">Blog</a> <a href="/tutorials">Tutorials</a></nav></header><main>${tc||`<h1>${esc(m.h1)}</h1><p>${esc(m.description)}</p>`}<noscript><p>This page works best with JavaScript enabled.</p></noscript></main><footer>${navHtml()}<p>&copy; ${Y} ToolsML. All rights reserved.</p><nav><a href="/privacy">Privacy</a> | <a href="/terms">Terms</a> | <a href="/site-map">Site Map</a> | <a href="/contact">Contact</a></nav></footer></body></html>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const url = new URL(req.url);
    const path = url.searchParams.get('path') || '/';
    const np = path.startsWith('/') ? path : `/${path}`;
    const fmt = url.searchParams.get('format') || 'html';

    console.log(`Prerender: path=${np}, format=${fmt}`);

    if (fmt === 'json') {
      return new Response(JSON.stringify(getMeta(np), null, 2), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=86400, s-maxage=604800' },
      });
    }
    if (fmt === 'all') {
      return new Response(JSON.stringify({ generated: new Date().toISOString(), totalTools: Object.keys(T).length, totalCategories: CATS.length, totalTags: TAGS.length, staticPages: Object.keys(PM).length, tools: Object.keys(T), categories: CATS, tags: TAGS }, null, 2), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
      });
    }

    const html = buildPage(np);
    const meta = getMeta(np);
    return new Response(html, {
      headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400', 'X-Prerendered': 'true', 'X-Prerender-Path': np, 'X-Canonical-URL': meta.canonical, 'X-Robots-Tag': 'index, follow', 'Link': `<${meta.canonical}>; rel="canonical"` },
    });
  } catch (error) {
    console.error('Prerender error:', error);
    return new Response(JSON.stringify({ error: 'Prerender failed' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
