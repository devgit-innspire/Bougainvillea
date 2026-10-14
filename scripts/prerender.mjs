// Static prerender: inject server-rendered markup + JSON-LD into dist/index.html,
// then write sitemap.xml and robots.txt. Runs after the client and SSR builds.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, buildJsonLd, buildSitemap, buildRobots } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c');

if (!template.includes('<!--app-html-->') || !template.includes('<!--json-ld-->')) {
  throw new Error('index.html is missing the <!--app-html--> or <!--json-ld--> placeholder');
}

const html = template
  .replace('<!--app-html-->', render())
  .replace('<!--json-ld-->', `<script type="application/ld+json">${jsonLd}</script>`);

await writeFile(path.join(dist, 'index.html'), html);
await writeFile(path.join(dist, 'sitemap.xml'), buildSitemap());
await writeFile(path.join(dist, 'robots.txt'), buildRobots());
await rm(ssrDir, { recursive: true, force: true });

console.log('Prerendered dist/index.html, wrote sitemap.xml and robots.txt');
