<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>ToolsML - XML Sitemap</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <style type="text/css">
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        font-size: 14px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        margin: 0;
                        padding: 20px;
                        min-height: 100vh;
                    }
                    .container {
                        max-width: 1200px;
                        margin: 0 auto;
                        background: rgba(255, 255, 255, 0.95);
                        border-radius: 20px;
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    .header {
                        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                        color: white;
                        padding: 40px;
                        text-align: center;
                    }
                    .header h1 {
                        margin: 0 0 10px 0;
                        font-size: 2.5em;
                        font-weight: 700;
                    }
                    .header p {
                        margin: 0;
                        font-size: 1.2em;
                        opacity: 0.9;
                    }
                    .stats {
                        display: flex;
                        justify-content: center;
                        gap: 40px;
                        margin-top: 30px;
                        flex-wrap: wrap;
                    }
                    .stat {
                        text-align: center;
                    }
                    .stat-number {
                        display: block;
                        font-size: 2em;
                        font-weight: bold;
                        color: #fbbf24;
                    }
                    .stat-label {
                        font-size: 0.9em;
                        opacity: 0.8;
                    }
                    .content {
                        padding: 40px;
                    }
                    .section {
                        margin-bottom: 40px;
                    }
                    .section h2 {
                        color: #374151;
                        margin: 0 0 20px 0;
                        font-size: 1.5em;
                        padding-bottom: 10px;
                        border-bottom: 2px solid #e5e7eb;
                    }
                    .url-list {
                        display: grid;
                        gap: 12px;
                    }
                    .url-item {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 15px 20px;
                        background: #f9fafb;
                        border-radius: 10px;
                        border-left: 4px solid #6366f1;
                        transition: all 0.2s ease;
                    }
                    .url-item:hover {
                        background: #f3f4f6;
                        transform: translateX(5px);
                    }
                    .url-link {
                        color: #6366f1;
                        text-decoration: none;
                        font-weight: 500;
                        flex: 1;
                    }
                    .url-link:hover {
                        text-decoration: underline;
                    }
                    .url-meta {
                        display: flex;
                        gap: 15px;
                        align-items: center;
                        font-size: 0.85em;
                        color: #6b7280;
                    }
                    .priority {
                        background: #10b981;
                        color: white;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-weight: 500;
                    }
                    .priority.medium {
                        background: #f59e0b;
                    }
                    .priority.low {
                        background: #6b7280;
                    }
                    .changefreq {
                        background: #e5e7eb;
                        color: #374151;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 0.8em;
                    }
                    .footer {
                        background: #f9fafb;
                        padding: 30px 40px;
                        text-align: center;
                        color: #6b7280;
                        border-top: 1px solid #e5e7eb;
                    }
                    @media (max-width: 768px) {
                        .container {
                            margin: 10px;
                            border-radius: 15px;
                        }
                        .header {
                            padding: 30px 20px;
                        }
                        .content {
                            padding: 30px 20px;
                        }
                        .stats {
                            gap: 20px;
                        }
                        .url-item {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 10px;
                        }
                        .url-meta {
                            width: 100%;
                            justify-content: flex-start;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🛠️ ToolsML Sitemap</h1>
                        <p>Comprehensive directory of AI tools and resources</p>
                        <div class="stats">
                            <div class="stat">
                                <span class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
                                <span class="stat-label">Total Pages</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/tool/')])"/></span>
                                <span class="stat-label">AI Tools</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/category/')])"/></span>
                                <span class="stat-label">Categories</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="content">
                        <!-- Main Pages -->
                        <div class="section">
                            <h2>📄 Main Pages</h2>
                            <div class="url-list">
                                <xsl:for-each select="sitemap:urlset/sitemap:url[not(contains(sitemap:loc, '/tool/')) and not(contains(sitemap:loc, '/category/')) and not(contains(sitemap:loc, '/blog/')) and not(contains(sitemap:loc, '/tag/'))]">
                                    <div class="url-item">
                                        <a class="url-link" href="{sitemap:loc}">
                                            <xsl:value-of select="sitemap:loc"/>
                                        </a>
                                        <div class="url-meta">
                                            <span class="changefreq"><xsl:value-of select="sitemap:changefreq"/></span>
                                            <span>
                                                <xsl:attribute name="class">
                                                    priority
                                                    <xsl:choose>
                                                        <xsl:when test="sitemap:priority &gt;= 0.8">high</xsl:when>
                                                        <xsl:when test="sitemap:priority &gt;= 0.5">medium</xsl:when>
                                                        <xsl:otherwise>low</xsl:otherwise>
                                                    </xsl:choose>
                                                </xsl:attribute>
                                                <xsl:value-of select="sitemap:priority"/>
                                            </span>
                                        </div>
                                    </div>
                                </xsl:for-each>
                            </div>
                        </div>

                        <!-- AI Tools -->
                        <div class="section">
                            <h2>🤖 AI Tools</h2>
                            <div class="url-list">
                                <xsl:for-each select="sitemap:urlset/sitemap:url[contains(sitemap:loc, '/tool/')]">
                                    <div class="url-item">
                                        <a class="url-link" href="{sitemap:loc}">
                                            <xsl:value-of select="sitemap:loc"/>
                                        </a>
                                        <div class="url-meta">
                                            <span class="changefreq"><xsl:value-of select="sitemap:changefreq"/></span>
                                            <span class="priority high"><xsl:value-of select="sitemap:priority"/></span>
                                        </div>
                                    </div>
                                </xsl:for-each>
                            </div>
                        </div>

                        <!-- Categories -->
                        <div class="section">
                            <h2>📁 Categories</h2>
                            <div class="url-list">
                                <xsl:for-each select="sitemap:urlset/sitemap:url[contains(sitemap:loc, '/category/')]">
                                    <div class="url-item">
                                        <a class="url-link" href="{sitemap:loc}">
                                            <xsl:value-of select="sitemap:loc"/>
                                        </a>
                                        <div class="url-meta">
                                            <span class="changefreq"><xsl:value-of select="sitemap:changefreq"/></span>
                                            <span class="priority high"><xsl:value-of select="sitemap:priority"/></span>
                                        </div>
                                    </div>
                                </xsl:for-each>
                            </div>
                        </div>

                        <!-- Blog Posts -->
                        <xsl:if test="sitemap:urlset/sitemap:url[contains(sitemap:loc, '/blog/')]">
                            <div class="section">
                                <h2>📝 Blog Posts</h2>
                                <div class="url-list">
                                    <xsl:for-each select="sitemap:urlset/sitemap:url[contains(sitemap:loc, '/blog/')]">
                                        <div class="url-item">
                                            <a class="url-link" href="{sitemap:loc}">
                                                <xsl:value-of select="sitemap:loc"/>
                                            </a>
                                            <div class="url-meta">
                                                <span class="changefreq"><xsl:value-of select="sitemap:changefreq"/></span>
                                                <span class="priority medium"><xsl:value-of select="sitemap:priority"/></span>
                                            </div>
                                        </div>
                                    </xsl:for-each>
                                </div>
                            </div>
                        </xsl:if>

                        <!-- Tags -->
                        <xsl:if test="sitemap:urlset/sitemap:url[contains(sitemap:loc, '/tag/')]">
                            <div class="section">
                                <h2>🏷️ Popular Tags</h2>
                                <div class="url-list">
                                    <xsl:for-each select="sitemap:urlset/sitemap:url[contains(sitemap:loc, '/tag/')]">
                                        <div class="url-item">
                                            <a class="url-link" href="{sitemap:loc}">
                                                <xsl:value-of select="sitemap:loc"/>
                                            </a>
                                            <div class="url-meta">
                                                <span class="changefreq"><xsl:value-of select="sitemap:changefreq"/></span>
                                                <span class="priority medium"><xsl:value-of select="sitemap:priority"/></span>
                                            </div>
                                        </div>
                                    </xsl:for-each>
                                </div>
                            </div>
                        </xsl:if>
                    </div>
                    
                    <div class="footer">
                        <p>This sitemap contains <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> pages</strong> • Generated on <xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:lastmod"/> • <a href="https://toolsml.com" style="color: #6366f1;">ToolsML.com</a></p>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>