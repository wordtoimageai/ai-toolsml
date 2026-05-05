import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'GET, OPTIONS' };

const Y = new Date().getFullYear();

const T: Record<string, [string,string,string,string,string,string]> = {
'chatgpt':['ChatGPT','Advanced conversational AI used by 200M+ users weekly. Powered by GPT-4o for writing, coding, analysis, and creative tasks. Free tier available, Plus $20/mo.','Writing','4.8','OpenAI','https://chat.openai.com'],
'claude':['Claude','Anthropic AI assistant with industry-leading 200K context window. Best for long documents, complex analysis, and safe AI. Free tier available, Pro $20/mo.','Writing','4.6','Anthropic','https://claude.ai'],
'jasper-ai':['Jasper AI','AI marketing copywriting platform trusted by 100,000+ brands. Create blog posts, ads, social media copy 10x faster with Brand Voice consistency. Creator $49/mo.','Marketing','4.5','Jasper AI','https://jasper.ai'],
'copy-ai':['Copy.ai','AI copywriting tool for marketing content and social media.','Writing','4.4','Copy.ai','https://copy.ai'],
'grammarly':['Grammarly','AI-powered writing assistant for grammar and style.','Writing','4.7','Grammarly','https://grammarly.com'],
'writesonic':['Writesonic','AI content writer for articles, ads, and marketing copy.','Writing','4.3','Writesonic','https://writesonic.com'],
'midjourney':['Midjourney','The gold standard for AI image generation. Create photorealistic and artistic images from text. Used by 16M+ creators. Basic $10/mo, Standard $30/mo.','Design','4.7','Midjourney Inc.','https://midjourney.com'],
'stable-diffusion':['Stable Diffusion','Open-source text-to-image AI for detailed art.','Design','4.5','Stability AI','https://stability.ai'],
'dalle':['DALL-E','OpenAI image generator creating art from text.','Design','4.6','OpenAI','https://openai.com/dall-e-3'],
'dalle-3':['DALL-E 3','Latest OpenAI image generator with enhanced quality.','Design','4.6','OpenAI','https://openai.com/dall-e-3'],
'adobe-firefly':['Adobe Firefly','Adobe generative AI for images and creative content.','Design','4.4','Adobe','https://firefly.adobe.com'],
'figma':['Figma','#1 collaborative design platform used by 4M+ designers. Browser-based UI/UX design, prototyping, and dev handoff with AI features. Free for individuals, Pro $15/editor/mo.','Design','4.7','Figma','https://figma.com'],
'canva':['Canva','Design platform with AI-powered creative tools.','Design','4.7','Canva','https://canva.com'],
'canva-ai':['Canva AI','Design platform with AI tools and templates.','Design','4.7','Canva','https://canva.com'],
'leonardo-ai':['Leonardo AI','AI art generator for game assets and imagery.','Design','4.5','Leonardo.Ai','https://leonardo.ai'],
'github-copilot':['GitHub Copilot','AI pair programmer used by 1.8M+ developers. 55% faster task completion with real-time code suggestions in VS Code and JetBrains. $10/mo individual, $19/user/mo business.','Coding','4.6','GitHub/Microsoft','https://github.com/features/copilot'],
'cursor':['Cursor','AI-first code editor with coding assistance.','Coding','4.7','Cursor','https://cursor.sh'],
'replit-ghostwriter':['Replit Ghostwriter','AI coding assistant in Replit IDE.','Coding','4.3','Replit','https://replit.com'],
'deepseek':['DeepSeek','Advanced AI for code generation and reasoning.','Coding','4.5','DeepSeek','https://deepseek.com'],
'codesignal':['CodeSignal','AI-powered technical assessment platform.','Coding','4.2','CodeSignal','https://codesignal.com'],
'codium-ai':['CodiumAI','AI code integrity and test generation.','Coding','4.1','CodiumAI','https://codium.ai'],
'notion-ai':['Notion AI','AI-powered workspace used by 30M+ users. Deep AI integration for notes, docs, databases, and project management. Free plan, Plus $12/mo, AI add-on $10/member/mo.','Productivity','4.6','Notion Labs','https://notion.so'],
'otter-ai':['Otter.ai','AI meeting transcription and note-taking.','Productivity','4.5','Otter.ai','https://otter.ai'],
'reclaim-ai':['Reclaim AI','Automated scheduling and calendar management.','Productivity','4.4','Reclaim.ai','https://reclaim.ai'],
'clickup-ai':['ClickUp','Project management with AI automation.','Productivity','4.3','ClickUp','https://clickup.com'],
'beautiful-ai':['Beautiful.ai','AI-powered presentation maker.','Productivity','4.5','Beautiful.ai','https://beautiful.ai'],
'loom':['Loom','AI screen recording and video messaging.','Productivity','4.6','Loom','https://loom.com'],
'fireflies-ai':['Fireflies.ai','AI meeting transcription and analysis.','Productivity','4.3','Fireflies.ai','https://fireflies.ai'],
'synthesia':['Synthesia','AI video generation with virtual presenters.','Video','4.5','Synthesia','https://synthesia.io'],
'runway-ml':['Runway ML','Leading AI video generation platform with Gen-3 Alpha. Create and edit professional videos from text. Used by Hollywood studios. Free tier, Standard $15/mo.','Video','4.6','Runway AI','https://runwayml.com'],
'descript':['Descript','Edit video and audio by editing text. 97% accurate transcription, Overdub voice cloning, filler word removal. Used by 3M+ creators. Free plan, Pro $33/mo.','Video','4.7','Descript','https://descript.com'],
'luma-ai':['Luma AI','3D capture and generation with neural fields.','Video','4.4','Luma AI','https://lumalabs.ai'],
'elevenlabs':['ElevenLabs','Industry-leading AI voice generation with 300+ ultra-realistic voices in 32 languages. Voice cloning from 30 seconds of audio. Free tier, Starter $5/mo.','Audio','4.8','ElevenLabs','https://elevenlabs.io'],
'murf-ai':['Murf AI','Professional AI voiceover generator.','Audio','4.4','Murf AI','https://murf.ai'],
'mubert':['Mubert','AI royalty-free music generation.','Audio','4.3','Mubert','https://mubert.com'],
'perplexity':['Perplexity','AI search engine with cited answers.','Research','4.6','Perplexity AI','https://perplexity.ai'],
'arc-search':['Arc Search','Mobile AI search with smart browsing.','Research','4.5','The Browser Company','https://arc.net'],
'google-trends':['Google Trends','Real-time search data and market insights.','Data','4.4','Google','https://trends.google.com'],
'semrush-market-explorer':['Semrush Market Explorer','Market research and competitor analysis.','Data','4.5','Semrush','https://semrush.com'],
'hubspot-email-writer':['HubSpot Email Writer','AI email copywriting with CRM integration.','Marketing','4.3','HubSpot','https://hubspot.com'],
'albert-ai':['Albert.ai','Self-optimizing digital advertising platform.','Marketing','4.6','Albert Technologies','https://albert.ai'],
'sprout-social':['Sprout Social','AI social media management and analytics.','Social','4.4','Sprout Social','https://sproutsocial.com'],
'hubspot-ai':['HubSpot AI','CRM with AI sales and marketing automation.','Sales','4.3','HubSpot','https://hubspot.com'],
'gong':['Gong','Revenue AI for sales call analysis.','Sales','4.6','Gong','https://gong.io'],
'reply-io':['Reply.io','AI sales outreach automation.','Sales','4.2','Reply','https://reply.io'],
'surfer-seo':['Surfer SEO','AI SEO content optimization.','SEO','4.6','Surfer','https://surferseo.com'],
'semrush':['Semrush','All-in-one SEO and digital marketing platform.','SEO','4.5','Semrush','https://semrush.com'],
'marketmuse':['MarketMuse','AI content strategy and SEO optimization.','SEO','4.3','MarketMuse','https://marketmuse.com'],
'zapier':['Zapier','Automation platform with AI workflows.','Automation','4.5','Zapier','https://zapier.com'],
'wix-adi':['Wix ADI','Build professional websites in minutes with AI. No coding needed. Free plan available. 4.2★ from 200M+ users.','Automation','4.2','Wix.com','https://wix.com'],
};

// t[0]=name, t[1]=desc, t[2]=category, t[3]=rating, t[4]=company, t[5]=website

const CATS = ['writing','design','coding','marketing','productivity','audio','video','research','data','automation','sales','social','seo'];

const PM: Record<string,[string,string,string]> = {
'/': [`ToolsML - Discover 1,000+ Best AI Tools ${Y} | Free & Paid Options`,'🤖 Find the perfect AI tool from 1,000+ options. Compare features, pricing, and reviews. Updated daily.','Find the Perfect AI Tool for Every Task'],
'/browse': ['Browse 1,000+ AI Tools by Category | ToolsML','Explore our complete directory of AI tools. Filter by category, pricing, features, and ratings.','Browse All AI Tools'],
'/about': ['About ToolsML - #1 AI Tool Discovery Platform','ToolsML helps professionals discover and compare AI tools. Trusted by 50,000+ users worldwide.','About ToolsML'],
'/blog': [`AI Tools Blog - Reviews & Insights ${Y} | ToolsML`,'Expert AI tool reviews, comparison guides, and tutorials. Updated daily.','AI Tools Blog'],
'/contact': ['Contact ToolsML - Get Help & Partner With Us','Contact our team for support, partnerships, or tool submissions. Response time: 24 hours.','Contact Us'],
'/submit': ['Submit Your AI Tool - Get Listed on ToolsML','List your AI tool on ToolsML and reach 50,000+ potential customers. Free basic listing.','Submit Your AI Tool'],
'/privacy': ['Privacy Policy - ToolsML | GDPR Compliant','Learn how ToolsML protects your data. GDPR compliant. No selling of personal information.','Privacy Policy'],
'/terms': ['Terms of Service - ToolsML','ToolsML terms of service and user agreement.','Terms of Service'],
'/advertise': ['Advertise on ToolsML - Reach 50K+ AI Tool Buyers','Reach professionals actively searching for AI solutions. 50K+ monthly visitors.','Advertise with ToolsML'],
'/tutorials': ['AI Tools Tutorials - Step-by-Step Guides | ToolsML','Free tutorials on using AI tools effectively. Beginner-friendly guides.','AI Tools Tutorials'],
'/compare': ['Compare AI Tools Side-by-Side | ToolsML','Compare multiple AI tools: features, pricing, reviews side-by-side.','Compare AI Tools'],
'/comparison': ['AI Tool Comparison - Side-by-Side | ToolsML','Compare AI tools side-by-side: features, pricing, user ratings, pros/cons.','AI Tool Comparison'],
'/favorites': ['My Favorite AI Tools | ToolsML','Save and organize your favorite AI tools.','My Favorite AI Tools'],
'/changelog': [`Changelog - ToolsML Updates ${Y}`,'See what is new on ToolsML. New features and tool additions.','Changelog'],
'/api-docs': ['ToolsML API Documentation','Access ToolsML data via REST API. Free for non-commercial use.','API Documentation'],
'/site-map': ['Site Map - ToolsML','Browse all pages on ToolsML.','Site Map'],
'/other-ai-tools': [`Other AI Tools ${Y} — Hidden Gems Beyond ChatGPT & Midjourney`,`Discover 20+ lesser-known AI tools for automation, data analysis, sales, social media, SEO, audio, and research. Curated reviews with pricing.`,`Other AI Tools You Should Know in ${Y}`],
};

const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const tagLabel = (t: string) => t.split('-').map(cap).join(' ');

function getMeta(path: string) {
  const p = PM[path];
  if (p) return { title: p[0], description: p[1], h1: p[2], canonical: `https://toolsml.com${path === '/' ? '' : path}` };
  const tm = path.match(/^\/tool\/([a-z0-9-]+)$/);
  if (tm && T[tm[1]]) { const t = T[tm[1]]; return { title: `${t[0]} Review ${Y} - Pricing, Features & Alternatives (${t[3]}★)`, description: `${t[0]} by ${t[4]}: ${t[1]} Rating: ${t[3]}/5.`, h1: `${t[0]} - AI ${t[2]} Tool Review`, canonical: `https://toolsml.com/tool/${tm[1]}` }; }
  const cm = path.match(/^\/category\/([a-z0-9-]+)$/);
  if (cm) { const cn = cap(cm[1]); return { title: `Best ${cn} AI Tools ${Y} - Free & Paid | ToolsML`, description: `Top ${cn.toLowerCase()} AI tools with ratings and reviews. Compare features and pricing.`, h1: `Best AI ${cn} Tools ${Y}`, canonical: `https://toolsml.com/category/${cm[1]}` }; }
  const tg = path.match(/^\/tag\/([a-z0-9-]+)$/);
  if (tg) { const tn = tagLabel(tg[1]); return { title: `${tn} AI Tools ${Y} | ToolsML`, description: `Best ${tn.toLowerCase()} AI tools. Compare features, pricing, ratings.`, h1: `${tn} AI Tools`, canonical: `https://toolsml.com/tag/${tg[1]}` }; }
  return { title: `ToolsML - Best AI Tools ${Y}`, description: 'Find and compare AI tools for writing, design, video, code, and more.', h1: 'Discover the Best AI Tools', canonical: `https://toolsml.com${path}` };
}

function buildHtml(path: string): string {
  const m = getMeta(path);
  const tm = path.match(/^\/tool\/([a-z0-9-]+)$/);
  let body = `<h1>${esc(m.h1)}</h1><p>${esc(m.description)}</p>`;
  if (tm && T[tm[1]]) {
    const t = T[tm[1]];
    const rel = Object.entries(T).filter(([i,v]) => v[2]===t[2] && i!==tm[1]).slice(0,5).map(([i,v])=>`<a href="/tool/${i}">${v[0]}</a>`).join(' | ');
    body = `<article><h1>${esc(t[0])}</h1><p>${esc(t[1])}</p><p>Category: <a href="/category/${t[2].toLowerCase()}">${esc(t[2])}</a> | Rating: ${t[3]}/5 | By ${esc(t[4])}</p><a href="${t[5]}" rel="noopener" target="_blank">Visit ${esc(t[0])}</a>${rel?`<nav><h2>Related Tools</h2><p>${rel}</p></nav>`:''}</article>`;
  }
  const catLinks = CATS.map(c=>`<a href="/category/${c}">${cap(c)}</a>`).join(' | ');
  const toolLinks = Object.entries(T).map(([id,t])=>`<a href="/tool/${id}">${t[0]}</a>`).join(' | ');
  const canonical = esc(m.canonical);
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(m.title)}</title><meta name="description" content="${esc(m.description)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow"><meta property="og:title" content="${esc(m.title)}"><meta property="og:description" content="${esc(m.description)}"><meta property="og:url" content="${canonical}"></head><body><header><a href="/">ToolsML</a></header><main>${body}</main><footer><nav><p>${catLinks}</p><p>${toolLinks}</p></nav><p>&copy; ${Y} ToolsML</p></footer></body></html>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
  try {
    const url = new URL(req.url);
    const rawPath = url.searchParams.get('path') || '/';
    // Sanitize: only allow safe URL path characters to prevent injection
    const safePath = rawPath.replace(/[^a-zA-Z0-9\/_\-]/g, '');
    const np = safePath.startsWith('/') ? safePath : `/${safePath}`;
    const fmt = url.searchParams.get('format');
    if (fmt === 'json') return new Response(JSON.stringify(getMeta(np)), { headers: { ...cors, 'Content-Type': 'application/json' } });
    return new Response(buildHtml(np), { headers: { ...cors, 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=86400', 'X-Prerendered': 'true' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'fail' }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
});
