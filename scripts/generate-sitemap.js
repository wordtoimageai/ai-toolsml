#!/usr/bin/env node

/**
 * Build-time sitemap generation script
 * Run this script to generate comprehensive sitemaps for SEO
 * Usage: node scripts/generate-sitemap.js
 */

import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { 
  generateSitemapXML,
  generateImageSitemapXML, 
  generateNewsSitemapXML,
  generateSitemapIndex,
  generateCategorySitemapXML,
  generateRobotsTxt 
} from '../src/lib/sitemap-generator.ts';
import { CATEGORIES } from '../src/lib/constants.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '../public');

console.log('🚀 Generating sitemaps for ToolsML...\n');

try {
  // Ensure public directory exists
  mkdirSync(publicDir, { recursive: true });

  // Generate main sitemap
  console.log('📝 Generating main sitemap...');
  const mainSitemap = generateSitemapXML();
  writeFileSync(join(publicDir, 'sitemap.xml'), mainSitemap, 'utf8');
  console.log('✅ Generated sitemap.xml');

  // Generate image sitemap
  console.log('📝 Generating image sitemap...');
  const imageSitemap = generateImageSitemapXML();
  writeFileSync(join(publicDir, 'sitemap-images.xml'), imageSitemap, 'utf8');
  console.log('✅ Generated sitemap-images.xml');

  // Generate news sitemap
  console.log('📝 Generating news sitemap...');
  const newsSitemap = generateNewsSitemapXML();
  writeFileSync(join(publicDir, 'sitemap-news.xml'), newsSitemap, 'utf8');
  console.log('✅ Generated sitemap-news.xml');

  // Generate category-specific sitemaps
  console.log('📝 Generating category-specific sitemaps...');
  CATEGORIES.forEach(category => {
    const categorySitemap = generateCategorySitemapXML(category.value);
    writeFileSync(join(publicDir, `sitemap-${category.value}.xml`), categorySitemap, 'utf8');
    console.log(`✅ Generated sitemap-${category.value}.xml`);
  });

  // Generate sitemap index
  console.log('📝 Generating sitemap index...');
  const sitemapIndex = generateSitemapIndex();
  writeFileSync(join(publicDir, 'sitemap-index.xml'), sitemapIndex, 'utf8');
  console.log('✅ Generated sitemap-index.xml');

  // Generate robots.txt
  console.log('📝 Generating robots.txt...');
  const robotsTxt = generateRobotsTxt();
  writeFileSync(join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
  console.log('✅ Generated robots.txt');

  console.log('\n🎉 All sitemaps generated successfully!');
  console.log('\n📊 Summary:');
  console.log('   - sitemap.xml (main sitemap with all URLs)');
  console.log('   - sitemap-images.xml (image sitemap for tool screenshots)');
  console.log('   - sitemap-news.xml (news sitemap for blog posts)');
  CATEGORIES.forEach(category => {
    console.log(`   - sitemap-${category.value}.xml (${category.label} category sitemap)`);
  });
  console.log('   - sitemap-index.xml (sitemap index file)');
  console.log('   - robots.txt (robots file with sitemap references)');
  console.log('\n📤 Next steps:');
  console.log('   1. Verify generated sitemaps in /public directory');
  console.log('   2. Submit sitemap-index.xml to Google Search Console');
  console.log('   3. Submit to Bing Webmaster Tools');
  console.log('   4. Monitor indexation in search console dashboards\n');

} catch (error) {
  console.error('❌ Error generating sitemaps:', error);
  process.exit(1);
}
