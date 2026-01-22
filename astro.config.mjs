import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import markdoc from '@astrojs/markdoc';

export default defineConfig({
  site: 'https://sion-portfolio.vercel.app', // <--- ADD THIS LINE (Use your Vercel project name)
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }), 
  integrations: [
    tailwind(),
    react(),
    keystatic(),
    markdoc()
  ],
});
