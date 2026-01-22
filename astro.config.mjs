import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel'; // FIXED: Removed '/serverless'
import markdoc from '@astrojs/markdoc';

export default defineConfig({
  output: 'static', // FIXED: Changed 'hybrid' to 'static' (Astro 5 default)
  adapter: vercel({
    webAnalytics: { enabled: true } // Bonus: Adds free analytics
  }),
  integrations: [
    tailwind(),
    react(),
    keystatic(),
    markdoc()
  ],
});
