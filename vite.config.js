import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_SITE_URL is the canonical public URL (used for canonical, OG, sitemap, JSON-LD).
// The build's base path is derived from it, so a GitHub Pages sub-path or a custom
// domain both work by changing that one value.
export default defineConfig(({ mode, command, isPreview }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = env.VITE_SITE_URL || 'http://localhost:5173';
  const base = command === 'build' || isPreview ? new URL(siteUrl).pathname.replace(/\/?$/, '/') : '/';

  return {
    base,
    plugins: [react()],
    build: { assetsInlineLimit: 0 }
  };
});
