import { readFileSync } from 'node:fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const CONTENT_FILE = new URL('./src/data/content.json', import.meta.url);

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// Fills the %SEO_*% placeholders in index.html from src/data/content.json (HTML-escaped).
// Read on every transform so edits show up in dev without a restart. %VITE_*% / %BASE_URL%
// are left to Vite's own env replacement.
function contentHtml() {
  return {
    name: 'content-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const { seo, property: p } = JSON.parse(readFileSync(CONTENT_FILE, 'utf8'));
        const values = {
          SEO_LANGUAGE: seo.language,
          SEO_TITLE: seo.title,
          SEO_DESCRIPTION: seo.description,
          SEO_THEME_COLOR: seo.themeColor,
          SEO_GEO_REGION: p.address.regionCode,
          SEO_GEO_PLACENAME: seo.geoPlaceName,
          SEO_GEO_POSITION: `${p.geo.lat};${p.geo.lng}`,
          SEO_ICBM: `${p.geo.lat}, ${p.geo.lng}`,
          SEO_SITE_NAME: p.name,
          SEO_LOCALE: seo.locale,
          SEO_SOCIAL_TITLE: seo.socialTitle,
          SEO_SOCIAL_DESCRIPTION: seo.socialDescription,
          SEO_SOCIAL_IMAGE_ALT: seo.socialImageAlt,
          SEO_NOSCRIPT_BEFORE: seo.noscriptBeforePhone,
          SEO_NOSCRIPT_AFTER: seo.noscriptAfterPhone,
          SEO_PHONE: p.phone,
          SEO_PHONE_DISPLAY: p.phoneDisplay
        };
        return html.replace(/%(SEO_[A-Z_]+)%/g, (m, key) => {
          if (!(key in values)) throw new Error(`index.html: unknown placeholder ${m}`);
          return escapeHtml(values[key]);
        });
      }
    }
  };
}

// VITE_SITE_URL is the canonical public URL (used for canonical, OG, sitemap, JSON-LD).
// The build's base path is derived from it, so a GitHub Pages sub-path or a custom
// domain both work by changing that one value.
export default defineConfig(({ mode, command, isPreview }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = env.VITE_SITE_URL || 'http://localhost:5173';
  const base = command === 'build' || isPreview ? new URL(siteUrl).pathname.replace(/\/?$/, '/') : '/';

  return {
    base,
    plugins: [contentHtml(), react()],
    build: { assetsInlineLimit: 0 }
  };
});
