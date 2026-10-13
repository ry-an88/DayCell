// Builds the website into dist/: the landing pages at /, the app at /app/.
// Only these files are published; the launcher, journals and everything else stay off the internet.
//
// Optional settings, read from the environment (set them in Netlify → Site configuration → Environment variables):
//   CHECKOUT_URL      the Polar checkout link for Daycell Pro. Without it, the hosted app has no paywall.
//   PORTAL_URL        optional: where buyers find a lost key (your Polar customer portal). Defaults to emailing support.
//   LAUNCH_ENDS       last day of launch week, YYYY-MM-DD. Until then the £9 launch price shows and is applied.
//   UMAMI_SRC         Umami script URL, e.g. https://cloud.umami.is/script.js   } both needed to turn on
//   UMAMI_WEBSITE_ID  the website ID Umami gives you                            } cookie-free analytics
//   SITE_URL          public address, e.g. https://daycell.app (Netlify sets URL, which is used if this is empty)
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const env = process.env;
const CHECKOUT_URL = env.CHECKOUT_URL || '';
const SITE_URL = (env.SITE_URL || env.URL || 'https://daycell.app').replace(/\/$/, '');
const REPO_URL = 'https://github.com/ry-an88/daycell';
const js = v => JSON.stringify(v || '').slice(1, -1).replace(/'/g, "\\'");
const date = v => (/^\d{4}-\d{2}-\d{2}$/.test(v || '') ? v : '');

function replaceOnce(text, find, repl, file) {
  if (!text.includes(find)) throw new Error(`${file}: expected to find ${find}`);
  return text.replace(find, repl);
}

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/app', { recursive: true });
cpSync('site', 'dist', { recursive: true });
for (const f of ['manifest.webmanifest', 'sw.js', 'icon.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png']) {
  cpSync(join('web', f), join('dist/app', f));
}
cpSync('web/icon.svg', 'dist/favicon.svg');

// the app: self-hosted fonts, plus the checkout, launch and analytics settings
let app = readFileSync('daycell.html', 'utf8');
app = app.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\n<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\n<link href="https:\/\/fonts\.googleapis\.com[^"]*" rel="stylesheet">/,
  '<link rel="stylesheet" href="../fonts/fonts.css">');
if (app.includes('fonts.googleapis.com')) throw new Error('daycell.html: Google Fonts link not replaced');
app = replaceOnce(app, "checkoutUrl: '',", `checkoutUrl: '${js(CHECKOUT_URL)}',`, 'daycell.html');
if (env.PORTAL_URL) app = replaceOnce(app, /recoverUrl: '[^']*',/.exec(app)[0], `recoverUrl: '${js(env.PORTAL_URL)}',`, 'daycell.html');
app = replaceOnce(app, "launchEnds: '',", `launchEnds: '${date(env.LAUNCH_ENDS)}',`, 'daycell.html');
app = replaceOnce(app, "const ANALYTICS = { src: '', websiteId: '' };", `const ANALYTICS = { src: '${js(env.UMAMI_SRC)}', websiteId: '${js(env.UMAMI_WEBSITE_ID)}' };`, 'daycell.html');
writeFileSync('dist/app/index.html', app);

// the landing pages
const analytics = env.UMAMI_SRC && env.UMAMI_WEBSITE_ID
  ? `<script defer src="${env.UMAMI_SRC}" data-website-id="${env.UMAMI_WEBSITE_ID}"></script>` : '';
for (const f of readdirSync('dist').filter(f => f.endsWith('.html'))) {
  const p = join('dist', f);
  writeFileSync(p, readFileSync(p, 'utf8')
    .replaceAll('__SITE_URL__', SITE_URL).replaceAll('__REPO_URL__', REPO_URL).replace('<!--analytics-->', analytics));
}
const sitejs = 'dist/site.js';
writeFileSync(sitejs, readFileSync(sitejs, 'utf8').replace('__LAUNCH_ENDS__', date(env.LAUNCH_ENDS)));

console.log(`built dist/ for ${SITE_URL}${CHECKOUT_URL ? ' (paywall on)' : ' (no checkout link: everything unlocked)'}`);
