import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { buildJsonLd, buildSitemap, buildRobots } from './seo.js';

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
