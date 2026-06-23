# website
Habitat for Humanity of Central Lane — main website (Astro + GitHub Pages + Sveltia CMS)

Temporary GitHub Pages preview URL: `https://habitatlane.github.io/website/`.

Environment-specific values (site origin, base path, CNAME, CMS OAuth worker
URL) are build-time config — see `SETUP-CMS.md` ("Build-time configuration").

**Production DNS cutover — the single switch:** set the GitHub Actions
repository variable `DEPLOY_TARGET=prod`. That flips `site` to
`https://habitatlane.org`, `base` to `/`, and emits `public/CNAME`
automatically. No code change required.
