import { tools } from '../data/tools';
import { CATEGORIES } from './constants';

/**
 * Dynamic sitemap generation utilities for better SEO crawling
 */

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Generate sitemap entries for all pages
 */
export const generateSitemapEntries = (): SitemapEntry[] => {
  const baseUrl = 'https://toolsml.com';
  const currentDate = new Date().toISOString().split('T')[0];
  const entries: SitemapEntry[] = [];

  // Homepage
  entries.push({
    url: baseUrl,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: 1.0
  });

  // Static pages
  const staticPages = [
    { path: '/about', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/contact', priority: 0.7, changefreq: 'monthly' as const },
    { path: '/privacy', priority: 0.6, changefreq: 'yearly' as const },
    { path: '/terms', priority: 0.6, changefreq: 'yearly' as const },
    { path: '/blog', priority: 0.8, changefreq: 'weekly' as const },
    { path: '/tutorials', priority: 0.7, changefreq: 'monthly' as const },
    { path: '/api-docs', priority: 0.6, changefreq: 'monthly' as const },
    { path: '/changelog', priority: 0.7, changefreq: 'weekly' as const },
    { path: '/advertise', priority: 0.6, changefreq: 'monthly' as const },
    { path: '/submit', priority: 0.7, changefreq: 'monthly' as const },
    { path: '/favorites', priority: 0.5, changefreq: 'daily' as const },
    { path: '/compare', priority: 0.7, changefreq: 'weekly' as const },
    { path: '/site-map', priority: 0.5, changefreq: 'monthly' as const }
  ];

  staticPages.forEach(page => {
    entries.push({
      url: `${baseUrl}${page.path}`,
      lastmod: currentDate,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  // Tool detail pages
  tools.forEach(tool => {
    entries.push({
      url: `${baseUrl}/tool/${tool.id}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    });
  });

  // Category pages
  const categories = [...new Set(tools.map(tool => tool.category))];
  categories.forEach(category => {
    entries.push({
      url: `${baseUrl}/category/${category}`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8
    });
  });

  // Tag pages (top 50 most popular tags)
  const tagCounts = new Map<string, number>();
  tools.forEach(tool => {
    tool.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  const topTags = Array.from(tagCounts.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 50)
    .map(([tag]) => tag);

  topTags.forEach(tag => {
    entries.push({
      url: `${baseUrl}/tag/${encodeURIComponent(tag.toLowerCase())}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7
    });
  });

  // Comparison pages (most popular tools)
  const topTools = tools
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, 20);

  topTools.forEach((tool, index) => {
    if (index < topTools.length - 1) {
      const otherTool = topTools[index + 1];
      entries.push({
        url: `${baseUrl}/compare/${tool.id}-vs-${otherTool.id}`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.6
      });
    }
  });

  return entries;
};

/**
 * Generate XML sitemap content with XSL stylesheet for better visualization
 */
export const generateSitemapXML = (): string => {
  const entries = generateSitemapEntries();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
  xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';
  
  entries.forEach(entry => {
    xml += '  <url>\n';
    xml += `    <loc>${entry.url}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

/**
 * Generate robots.txt content
 */
export const generateRobotsTxt = (): string => {
  const baseUrl = 'https://toolsml.com';
  
  // Build category sitemap references
  const categorySitemaps = CATEGORIES.map(cat => `Sitemap: ${baseUrl}/sitemap-${cat.value}.xml`).join('\n');
  
  return `User-agent: *
Allow: /

# Sitemap index (includes all sitemaps)
Sitemap: ${baseUrl}/sitemap-index.xml

# Individual sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-images.xml
Sitemap: ${baseUrl}/sitemap-news.xml
${categorySitemaps}

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin and internal paths
Disallow: /admin/
Disallow: /api/
Disallow: /_internal/
Disallow: /auth
Disallow: /vendor-dashboard
Disallow: /privacy-dashboard

# Allow specific important paths for better crawling
Allow: /tool/
Allow: /category/
Allow: /tag/
Allow: /compare/
Allow: /blog/
Allow: /about
Allow: /tutorials
Allow: /contact
Allow: /submit
Allow: /advertise

# SEO optimization for specific bots
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /
Crawl-delay: 2

User-agent: Yandex
Allow: /
Crawl-delay: 2

# Social media crawlers (for link previews)
User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: TelegramBot
Allow: /

User-agent: Slackbot
Allow: /

User-agent: Discordbot
Allow: /

# AI crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

# Block bad bots and scrapers
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: BLEXBot
Disallow: /`;
};

/**
 * Generate image sitemap for tool screenshots and logos
 */
export const generateImageSitemapXML = (): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  const baseUrl = 'https://toolsml.com';
  
  // Homepage images
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}</loc>\n`;
  xml += '    <image:image>\n';
  xml += `      <image:loc>${baseUrl}/hero-image.jpg</image:loc>\n`;
  xml += '      <image:title>ToolsML - AI Tools Directory</image:title>\n';
  xml += '      <image:caption>Discover and compare the best AI tools</image:caption>\n';
  xml += '    </image:image>\n';
  xml += '  </url>\n';
  
  // Tool detail page images
  tools.slice(0, 100).forEach(tool => { // Limit to prevent huge sitemaps
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/tool/${tool.id}</loc>\n`;
    xml += '    <image:image>\n';
    xml += `      <image:loc>${baseUrl}/tool-screenshots/${tool.id}.jpg</image:loc>\n`;
    xml += `      <image:title>${tool.title} Screenshot</image:title>\n`;
    xml += `      <image:caption>${tool.title} - ${tool.description}</image:caption>\n`;
    xml += '    </image:image>\n';
    xml += '    <image:image>\n';
    xml += `      <image:loc>${baseUrl}/tool-logos/${tool.id}.png</image:loc>\n`;
    xml += `      <image:title>${tool.title} Logo</image:title>\n`;
    xml += `      <image:caption>Official ${tool.title} logo</image:caption>\n`;
    xml += '    </image:image>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

/**
 * Generate news sitemap for blog posts and updates
 */
export const generateNewsSitemapXML = (): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';
  
  const baseUrl = 'https://toolsml.com';
  const currentDate = new Date();
  
  // Recent blog posts (last 7 days for news sitemap)
  const recentPosts = [
    {
      id: 'ai-tools-2025-trends',
      title: 'Top AI Tool Trends to Watch in 2025',
      publishDate: new Date(currentDate.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'best-ai-writing-tools',
      title: 'Best AI Writing Tools Compared: ChatGPT vs Claude vs Jasper',
      publishDate: new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'ai-productivity-guide',
      title: 'Complete Guide to AI Productivity Tools for Remote Teams',
      publishDate: new Date(currentDate.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
  
  recentPosts.forEach(post => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/blog/${post.id}</loc>\n`;
    xml += '    <news:news>\n';
    xml += '      <news:publication>\n';
    xml += '        <news:name>ToolsML</news:name>\n';
    xml += '        <news:language>en</news:language>\n';
    xml += '      </news:publication>\n';
    xml += '      <news:publication_date>' + post.publishDate + '</news:publication_date>\n';
    xml += `      <news:title>${post.title}</news:title>\n`;
    xml += '    </news:news>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

/**
 * Generate category-specific sitemap for a given category
 */
export const generateCategorySitemapXML = (categoryValue: string): string => {
  const baseUrl = 'https://toolsml.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Filter tools by category
  const categoryTools = tools.filter(tool => tool.category === categoryValue);
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
  xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';
  
  // Category page itself
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}/category/${categoryValue}</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += '    <changefreq>daily</changefreq>\n';
  xml += '    <priority>0.9</priority>\n';
  xml += '  </url>\n';
  
  // Tool pages in this category
  categoryTools.forEach(tool => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/tool/${tool.id}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

/**
 * Generate sitemap index file
 */
export const generateSitemapIndex = (): string => {
  const baseUrl = 'https://toolsml.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  const sitemaps = [
    { url: `${baseUrl}/sitemap.xml`, lastmod: currentDate },
    { url: `${baseUrl}/sitemap-images.xml`, lastmod: currentDate },
    { url: `${baseUrl}/sitemap-news.xml`, lastmod: currentDate }
  ];
  
  // Add category-specific sitemaps
  CATEGORIES.forEach(category => {
    sitemaps.push({
      url: `${baseUrl}/sitemap-${category.value}.xml`,
      lastmod: currentDate
    });
  });
  
  sitemaps.forEach(sitemap => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${sitemap.url}</loc>\n`;
    xml += `    <lastmod>${sitemap.lastmod}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  
  xml += '</sitemapindex>';
  
  return xml;
};