// @ts-check
import { defineConfig } from 'astro/config';

// Habitat for Humanity of Central Lane — site configuration.
// Deployed to GitHub Pages behind the custom domain habitatlane.org.
export default defineConfig({
  // Canonical production origin (used for absolute URLs, sitemap, etc.).
  site: 'https://habitatlane.org',
  // Custom domain serves from the root, so the base path is '/'.
  base: '/',
  // The old WordPress site used trailing-slash permalinks (/about/).
  // Keep parity so existing inbound links and search results still resolve.
  trailingSlash: 'always',
  build: {
    // Emit /about/index.html so trailing-slash URLs work on static hosting.
    format: 'directory',
  },
});
