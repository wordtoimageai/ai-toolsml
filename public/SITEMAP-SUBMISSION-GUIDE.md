# Sitemap Submission Guide for ToolsML

This guide explains how to submit your updated sitemap to Google Search Console and Bing Webmaster Tools for faster indexing.

## Updated Sitemap Location

Your sitemap is available at: **https://toolsml.com/sitemap.xml**

Last Updated: 2025-12-24

## Google Search Console Submission

### Step 1: Access Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Select the `toolsml.com` property (or add it if not already added)

### Step 2: Submit the Sitemap
1. In the left sidebar, click on **"Sitemaps"**
2. In the "Add a new sitemap" field, enter: `sitemap.xml`
3. Click **"Submit"**

### Step 3: Verify Submission
- The status should change to "Success" after Google processes it
- You can see discovered URLs and any errors in the Sitemaps report
- Google typically processes sitemaps within a few hours to a few days

### Step 4: Request Indexing for Important Pages
For priority pages, you can request individual indexing:
1. Go to **"URL Inspection"** in the sidebar
2. Enter the URL you want indexed (e.g., `https://toolsml.com/tool/chatgpt`)
3. Click **"Request Indexing"**

Priority pages to request indexing for:
- https://toolsml.com/
- https://toolsml.com/browse
- https://toolsml.com/category/writing
- https://toolsml.com/category/design
- https://toolsml.com/category/coding
- https://toolsml.com/tool/chatgpt
- https://toolsml.com/tool/midjourney
- https://toolsml.com/tool/claude

---

## Bing Webmaster Tools Submission

### Step 1: Access Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Sign in with your Microsoft account
3. Select or add the `toolsml.com` property

### Step 2: Submit the Sitemap
1. In the left sidebar, click on **"Sitemaps"**
2. Click **"Submit Sitemap"**
3. Enter the full URL: `https://toolsml.com/sitemap.xml`
4. Click **"Submit"**

### Step 3: Verify and Monitor
- Check the sitemap status for any errors
- Bing typically processes sitemaps within 24-48 hours
- Monitor the "URL Submission" section for crawl status

### Step 4: Submit URLs Manually (Optional)
For faster indexing of key pages:
1. Go to **"Submit URLs"** in the sidebar
2. Enter priority URLs one per line
3. Click **"Submit"**

---

## Robots.txt Verification

Ensure your `robots.txt` file includes the sitemap reference:

```
User-agent: *
Allow: /
Sitemap: https://toolsml.com/sitemap.xml
```

Your current robots.txt is correctly configured at: https://toolsml.com/robots.txt

---

## Monitoring Indexing Progress

### Google Search Console
- Check **Coverage** report for indexed pages
- Use **Performance** report to see clicks and impressions
- Review **Enhancements** for structured data validation

### Bing Webmaster Tools
- Check **Site Explorer** for indexed pages
- Use **Search Performance** for traffic insights
- Review **SEO Reports** for optimization suggestions

---

## Troubleshooting

### Common Issues and Fixes

1. **Pages marked as "Discovered - currently not indexed"**
   - Ensure pages have unique, valuable content
   - Check for canonical URL issues
   - Improve internal linking to the page

2. **Pages marked as "Crawled - currently not indexed"**
   - Improve page content quality
   - Add more internal links
   - Ensure meta tags are properly set

3. **Canonical URL errors**
   - Verify each page has correct `<link rel="canonical">` tag
   - Ensure canonical points to the correct URL

4. **Slow indexing**
   - Request indexing for important pages manually
   - Build quality backlinks to your site
   - Ensure fast page load times

---

## Additional SEO Actions

### After Sitemap Submission

1. **Monitor Core Web Vitals** in Google Search Console
2. **Check Mobile Usability** report for any issues
3. **Review Rich Results** status for structured data
4. **Set up email alerts** for crawl errors
5. **Resubmit sitemap** whenever you add new tools or pages

### Recommended Frequency
- **Sitemap resubmission**: After adding 10+ new pages
- **Manual URL submission**: For high-priority new content
- **Performance review**: Weekly during initial indexing period

---

## Contact

For SEO-related questions or issues, contact the ToolsML team at contact@toolsml.com
