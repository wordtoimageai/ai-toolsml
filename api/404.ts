import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * This function serves the 404 page with a proper 404 HTTP status code.
 * This is crucial for SEO - search engines need to see a 404 status code
 * to know the page doesn't exist and should not be indexed.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = req.query.path as string || req.url || '/';
  
  console.log(`[404 Handler] Serving 404 for path: ${path}`);
  
  // Read the index.html and serve it with 404 status
  // The React app will handle showing the NotFound component
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Not Found - ToolsML</title>
    <meta name="robots" content="noindex, nofollow" />
    <meta name="description" content="The page you're looking for doesn't exist." />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        font-family: system-ui, -apple-system, sans-serif;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0a0a0a;
        color: #fafafa;
      }
      .container { text-align: center; padding: 2rem; }
      h1 { font-size: 6rem; font-weight: bold; color: #3b82f6; margin-bottom: 1rem; }
      p { font-size: 1.25rem; color: #a1a1aa; margin-bottom: 1.5rem; }
      a { 
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background: #3b82f6;
        color: white;
        text-decoration: none;
        border-radius: 0.375rem;
        transition: background 0.2s;
      }
      a:hover { background: #2563eb; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>404</h1>
      <p>Oops! Page not found</p>
      <a href="/">Return to Home</a>
    </div>
    <script>
      // Redirect to React app with 404 handling if JS is enabled
      if (window.history && window.history.replaceState) {
        // Store the current path for the React app to know it's a 404
        sessionStorage.setItem('was404', 'true');
      }
    </script>
  </body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.status(404).send(html);
}
