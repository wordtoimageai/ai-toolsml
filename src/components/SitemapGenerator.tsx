import { useEffect } from 'react';
import { tools } from '@/data/tools';

/**
 * Component that generates and updates sitemap on the client side
 * This helps ensure the sitemap is always up to date with current data
 */
export const SitemapGenerator = () => {
  useEffect(() => {
    // Generate sitemap data
    const generateSitemap = () => {
      const baseUrl = 'https://ai-toolsml.lovable.app';
      const currentDate = new Date().toISOString().split('T')[0];
      
      // Static pages with proper priorities
      const staticPages = [
        { url: '/', priority: '1.0', changefreq: 'daily' },
        { url: '/blog', priority: '0.8', changefreq: 'weekly' },
        { url: '/tutorials', priority: '0.7', changefreq: 'weekly' },
        { url: '/about', priority: '0.6', changefreq: 'monthly' },
        { url: '/submit', priority: '0.7', changefreq: 'monthly' },
        { url: '/contact', priority: '0.5', changefreq: 'monthly' },
        { url: '/api-docs', priority: '0.6', changefreq: 'monthly' },
        { url: '/changelog', priority: '0.5', changefreq: 'weekly' },
        { url: '/site-map', priority: '0.4', changefreq: 'monthly' },
        { url: '/advertise', priority: '0.5', changefreq: 'monthly' },
        { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
        { url: '/terms', priority: '0.3', changefreq: 'yearly' }
      ];

      // Category pages - high priority for SEO
      const categories = [...new Set(tools.map(tool => tool.category))];
      const categoryPages = categories.map(category => ({
        url: `/category/${category}`,
        priority: '0.9',
        changefreq: 'weekly'
      }));

      // Tool pages - highest priority for content
      const toolPages = tools.map(tool => ({
        url: `/tool/${tool.id}`,
        priority: '0.8',
        changefreq: 'weekly'
      }));

      // Tag pages - get all tags with proper prioritization
      const allTags = tools.flatMap(tool => tool.tags);
      const tagCounts = allTags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      // Include top 50 tags for comprehensive coverage
      const popularTags = Object.entries(tagCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 50)
        .map(([tag]) => tag);

      const tagPages = popularTags.map(tag => ({
        url: `/tag/${encodeURIComponent(tag)}`,
        priority: '0.7',
        changefreq: 'weekly'
      }));

      // Combine all pages
      const allPages = [...staticPages, ...categoryPages, ...toolPages, ...tagPages];

      // Generate XML
      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      // Store in localStorage for debugging
      localStorage.setItem('generated-sitemap', sitemapXml);
      
      // Send to server if we had an endpoint (for future implementation)
      console.log('Generated sitemap with', allPages.length, 'pages');
    };

    generateSitemap();
  }, []);

  return null; // This component doesn't render anything
};

export default SitemapGenerator;