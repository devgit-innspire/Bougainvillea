import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Admin panel tracker (client only). Set VITE_ADMIN_URL to enable; leave empty to disable.
const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;
if (ADMIN_URL) {
  window.sa = window.sa || function () { (window.sa.q = window.sa.q || []).push(arguments); };
  const s = document.createElement('script');
  s.async = true; s.src = ADMIN_URL.replace(/\/$/, '') + '/t.js'; s.dataset.site = 'bougainvillea';
  document.head.appendChild(s);
}

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production HTML is prerendered (see scripts/prerender.mjs); dev renders from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
