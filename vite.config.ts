import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Custom plugin to generate sitemaps during build
const sitemapPlugin = () => ({
  name: 'generate-sitemap',
  async closeBundle() {
    console.log('🗺️  Generating sitemaps...');
    try {
      await execAsync('node scripts/generate-sitemap.js');
      console.log('✅ Sitemaps generated successfully');
    } catch (error) {
      console.error('❌ Failed to generate sitemaps:', error);
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    mode === 'production' && sitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          supabase: ['@supabase/supabase-js'],
          query: ['@tanstack/react-query'],
          charts: ['recharts']
        },
        // Generate efficient file names with content hashing
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          } else if (/woff2?|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          return `${extType}/[name]-[hash][extname]`;
        }
      }
    },
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Optimize CSS
    cssCodeSplit: true,
    // Enable modern browser features with better compatibility
    target: 'es2020',
    minify: true, // Use default esbuild minifier which is faster and doesn't require terser
    // Drop console and debugger in production builds
    esbuild: mode === 'production' ? {
      drop: ['console', 'debugger']
    } : undefined
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@supabase/supabase-js',
      '@tanstack/react-query'
    ]
  }
}));
