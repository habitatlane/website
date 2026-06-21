# Sveltia CMS setup

The site includes Sveltia CMS at `/website/admin/` while the GitHub Pages
project URL is in use. After DNS cutover, it will move back to `/admin/`.
The CMS edits Markdown files in
`src/content/` and commits changes to `habitatlane/website` on the `main`
branch.

DNS cutover note: restore `public/CNAME` with `habitatlane.org`, set
`astro.config.mjs` back to `site: 'https://habitatlane.org'` and `base: '/'`,
and update CMS `site_url`, `display_url`, and `public_folder` back to the
custom-domain root.

## One-time GitHub setup

1. Create a GitHub OAuth app in the Habitat Lane GitHub account or organization.
2. Set the homepage URL to `https://habitatlane.github.io/website` until DNS
   cutover. After cutover, use `https://habitatlane.org`.
3. Set the authorization callback URL to the callback route served by the
   Cloudflare auth worker, usually:

   `https://YOUR-WORKER-DOMAIN/callback`

4. Save the generated client ID and client secret.

## One-time Cloudflare Worker setup

1. Deploy a Sveltia/Decap-compatible GitHub OAuth worker to Cloudflare Workers.
2. Add the GitHub OAuth client ID and client secret as worker environment
   variables or secrets, following the worker template instructions.
3. Allow the preview site origin: `https://habitatlane.github.io` until DNS
   cutover. After cutover, allow `https://habitatlane.org`.
4. Confirm the worker callback route matches the GitHub OAuth callback URL.
5. Update `public/admin/config.yml` and replace:

   `https://REPLACE-WITH-CLOUDFLARE-AUTH-WORKER.example.com`

   with the deployed worker origin, for example:

   `https://habitatlane-cms-auth.example.workers.dev`

## GitHub Pages setup

1. In GitHub, open Settings -> Pages for `habitatlane/website`.
2. Set Build and deployment -> Source to GitHub Actions.
3. Do not add the custom domain until DNS is ready.
4. At DNS cutover, add the custom domain `habitatlane.org`, restore CNAME,
   and ensure DNS points the domain to GitHub Pages.

## Editor login

After the OAuth worker is deployed and `public/admin/config.yml` has the worker
URL, editors can open `https://habitatlane.github.io/website/admin/`, sign in
with GitHub, and publish content through pull requests or the editorial
workflow. After DNS cutover, use `https://habitatlane.org/admin/`.
