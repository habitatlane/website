# Sveltia CMS setup

The site includes Sveltia CMS at `/admin/`. The CMS edits Markdown files in
`src/content/` and commits changes to `habitatlane/website` on the `main`
branch.

## Build-time configuration (no hardcoded environment values)

Environment-specific values are **not** committed in the published files.
The served `public/admin/config.yml`, `public/callback/index.html`, and
`public/CNAME` are generated at build time by `scripts/generate-config.mjs`
from the templates in `config/`, using these environment variables:

| Variable            | Default (preview)                                       | Purpose |
| ------------------- | ------------------------------------------------------- | ------- |
| `CMS_AUTH_BASE_URL` | `https://habitatlane-cms-auth.example.workers.dev`   | Base URL of the Cloudflare CMS OAuth worker. Public (the browser calls it), but build-time config so it is not hardcoded in source and is trivially rotatable / swappable to an org-owned domain. |
| `DEPLOY_TARGET`     | `preview`                                               | `preview` => `habitatlane.github.io` + base `/website`, no CNAME. `prod` => `habitatlane.org` + base `/` + `CNAME`. |
| `SITE_URL`          | from `DEPLOY_TARGET` preset                             | Optional override of the canonical site origin. |
| `BASE_PATH`         | from `DEPLOY_TARGET` preset                             | Optional override of the Astro base path. |
| `SITE_CNAME`        | from `DEPLOY_TARGET` preset                             | Optional override of the custom domain written to `public/CNAME`. |

In CI these come from GitHub Actions repository **variables** (Settings ->
Secrets and variables -> Actions -> Variables); see `.github/workflows/deploy.yml`.
Local `npm run dev` / `npm run build` work with the defaults, so no setup is
required for local development. To preview prod-mode output locally:
`DEPLOY_TARGET=prod npm run build`.

Genuine secrets (the GitHub OAuth **client secret**, any API keys) are never
placed in this repo — they live only in the Cloudflare Worker environment.

## One-time GitHub setup

1. Create a GitHub OAuth app in the Habitat Lane GitHub account or organization.
2. Set the homepage URL to `https://habitatlane.org`.
3. Set the authorization callback URL to the callback route served by the
   Cloudflare auth worker, usually:

   `https://YOUR-WORKER-DOMAIN/callback`

   For the current preview worker, that is:

   `https://habitatlane-cms-auth.example.workers.dev/callback`

   The preview site also includes a static `/callback/` bridge for GitHub
   Pages. If an existing OAuth app is temporarily pointed at
   `https://habitatlane.github.io/website/callback`, that page forwards the
   OAuth response to the worker callback so the popup can finish sign-in.

4. Save the generated client ID and client secret.

## One-time Cloudflare Worker setup

1. Deploy a Sveltia/Decap-compatible GitHub OAuth worker to Cloudflare Workers.
2. Add the GitHub OAuth client ID and client secret as worker environment
   variables or secrets, following the worker template instructions.
3. Allow the production site origin: `https://habitatlane.org`.
4. While using the GitHub Pages preview, also allow `habitatlane.github.io`.
5. Confirm the worker callback route matches the GitHub OAuth callback URL.
6. Point the site at the deployed worker by setting the GitHub Actions
   repository variable `CMS_AUTH_BASE_URL` to the worker origin, for example:

   `https://habitatlane-cms-auth.example.workers.dev`

   (Do **not** edit `public/admin/config.yml` — it is generated at build time
   from `config/admin-config.yml.tmpl`. See "Build-time configuration" above.)
   If the variable is unset, the build falls back to the current preview worker.

## GitHub Pages setup

1. In GitHub, open Settings -> Pages for `habitatlane/website`.
2. Set Build and deployment -> Source to GitHub Actions.
3. Add the custom domain `habitatlane.org` if it is not already configured.
4. Ensure DNS points the domain to GitHub Pages.

## Editor login

After the OAuth worker is deployed and `CMS_AUTH_BASE_URL` points at it,
editors can open `https://habitatlane.org/admin/`, sign in with GitHub, and
publish content through pull requests or the editorial workflow.
