// @ts-check
import { defineConfig } from 'astro/config';

// Habitat for Humanity of Central Lane — site configuration.
// Temporary preview deployment: GitHub Pages project URL until DNS cutover.
//
// PRODUCTION DNS CUTOVER VALUES TO RESTORE:
// - site: 'https://habitatlane.org'
// - base: '/'
// - restore public/CNAME with: habitatlane.org
export default defineConfig({
  // Canonical preview origin (used for absolute URLs, sitemap, etc.).
  site: 'https://habitatlane.github.io',
  // GitHub Pages project sites serve from /<repo>/.
  base: '/website',
  // The old WordPress site used trailing-slash permalinks (/about/).
  // Keep parity so existing inbound links and search results still resolve.
  trailingSlash: 'always',
  build: {
    // Emit /about/index.html so trailing-slash URLs work on static hosting.
    format: 'directory',
  },
});
