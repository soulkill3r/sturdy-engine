import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://your-domain.com',
  integrations: [
    mdx(),
    sitemap()
  ],  // ← virgule ajoutée ici
  vite: {
    plugins: [tailwindcss()],
  },
});