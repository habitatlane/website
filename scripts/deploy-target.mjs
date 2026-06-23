// Single source of truth for environment-specific deploy configuration.
//
// Everything here is driven by environment variables so the SAME build can
// produce either the GitHub Pages preview (default) or the production
// habitatlane.org site. Nothing environment-specific is hardcoded in the
// files that get published.
//
// THE ONE SWITCH FOR PRODUCTION CUTOVER:
//   Set the GitHub Actions repository variable  DEPLOY_TARGET = prod
//   (Settings -> Secrets and variables -> Actions -> Variables).
//   No code change required. Unset/anything-else => preview.

// GitHub Actions exposes unset `vars.*` / `secrets.*` as empty strings, so
// treat blank values as "not provided" and fall back to the preset default.
const env = (key) => {
  const value = process.env[key];
  return value && value.trim() !== '' ? value.trim() : undefined;
};

const PRESETS = {
  preview: {
    // GitHub Pages project site: https://habitatlane.github.io/website/
    site: 'https://habitatlane.github.io',
    base: '/website',
    // No custom domain on the preview project path.
    cname: null,
  },
  prod: {
    site: 'https://habitatlane.org',
    base: '/',
    cname: 'habitatlane.org',
  },
};

const requested = (env('DEPLOY_TARGET') ?? 'preview').toLowerCase();
export const deployTarget = requested in PRESETS ? requested : 'preview';

const preset = PRESETS[deployTarget];

// Per-value overrides (rarely needed; useful for one-off/staging builds).
export const siteUrl = env('SITE_URL') ?? preset.site;
export const basePath = env('BASE_PATH') ?? preset.base;
export const cname = env('SITE_CNAME') ?? preset.cname;

// Public CMS OAuth worker base URL. This endpoint is called by the browser and
// therefore always ends up in the published static output — a GitHub "secret"
// would give it no real confidentiality. Keeping it as build-time config means
// it is not hardcoded in committed source and is trivially rotatable / can be
// swapped to an org-owned domain at cutover without touching code.
export const cmsAuthBaseUrl =
  env('CMS_AUTH_BASE_URL') ?? 'https://habitatlane-cms-auth.example.workers.dev';
