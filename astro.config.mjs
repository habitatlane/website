// @ts-check
import { defineConfig } from 'astro/config';

import { siteUrl, basePath } from './scripts/deploy-target.mjs';

// Habitat for Humanity of Central Lane — site configuration.
//
// `site` and `base` are environment-driven (see scripts/deploy-target.mjs) so
// the SAME build produces either the GitHub Pages preview (default) or the
// production habitatlane.org site.
//
// PRODUCTION DNS CUTOVER — the single switch:
//   Set the GitHub Actions repository variable  DEPLOY_TARGET = prod
//   That flips site -> 'https://habitatlane.org', base -> '/', and emits
//   public/CNAME with 'habitatlane.org'. No code change required.
export default defineConfig({
  // Canonical origin (used for absolute URLs, sitemap, etc.).
  site: siteUrl,
  // GitHub Pages project sites serve from /<repo>/; prod serves from /.
  base: basePath,
  // The old WordPress site used trailing-slash permalinks (/about/).
  // Keep parity so existing inbound links and search results still resolve.
  trailingSlash: 'always',
  build: {
    // Emit /about/index.html so trailing-slash URLs work on static hosting.
    format: 'directory',
  },
});
