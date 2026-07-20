// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { stripLeadingH1, rewriteRepoLinks } from './src/lib/markdown-plugins.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://savio-project.pages.dev', // update when the domain exists
  outDir: process.env.ASTRO_OUT_DIR || './dist',
  cacheDir: process.env.ASTRO_CACHE_DIR || undefined,
  vite: {
    plugins: [tailwindcss()],
    // Keep vite's cache out of the project folder (plays nicer with sandboxed
    // filesystems and never needs committing/ignoring).
    cacheDir: process.env.VITE_CACHE_DIR || 'node_modules/.vite',
  },
  markdown: {
    processor: satteri({
      mdastPlugins: [stripLeadingH1, rewriteRepoLinks],
    }),
  },
});
