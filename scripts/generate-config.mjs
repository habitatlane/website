// Generates the environment-specific static files that get published, from
// templates in config/, using the resolved deploy configuration. Run before
// every astro dev/build/preview (see package.json scripts) so local dev works
// with sensible defaults and CI can inject GitHub Actions variables/secrets.
//
// Generated outputs are gitignored — the templates in config/ are the source
// of truth, and no environment-specific value is committed.
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';

import { cmsAuthBaseUrl, cname, deployTarget, siteUrl, basePath } from './deploy-target.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tmpl = (p) => join(root, 'config', p);
const out = (p) => join(root, 'public', p);

// Replace only the exact ${CMS_AUTH_BASE_URL} token. A generic envsubst would
// also clobber the callback's own ${authCallbackURL}/${params} JS literals.
const render = (templatePath) =>
  readFileSync(templatePath, 'utf8').replaceAll('${CMS_AUTH_BASE_URL}', cmsAuthBaseUrl);

const write = (outPath, contents) => {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, contents);
};

write(out('admin/config.yml'), render(tmpl('admin-config.yml.tmpl')));
write(out('callback/index.html'), render(tmpl('callback.html.tmpl')));

// CNAME: written only for the custom-domain (prod) target. On the GitHub Pages
// preview project path there must be no CNAME, or it would hijack routing.
const cnamePath = out('CNAME');
if (cname) {
  write(cnamePath, `${cname}\n`);
} else if (existsSync(cnamePath)) {
  rmSync(cnamePath);
}

console.log(
  `[generate-config] target=${deployTarget} site=${siteUrl} base=${basePath} ` +
    `cms=${cmsAuthBaseUrl} cname=${cname ?? '(none)'}`,
);
