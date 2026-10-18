// Takes marketing screenshots of the real app, filled with the fictional demo journal.
//
//   npx http-server -p 5180 .        (from the repo root, in another terminal)
//   node marketing/tools/screenshots.mjs [http://localhost:5180/daycell.html]
//
// Needs Playwright (npm i -D playwright). Writes PNGs to marketing/screenshots/.
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, '..', 'screenshots');
const url = (process.argv[2] || 'http://localhost:5180/daycell.html') + '?storage=browser';
const md = execFileSync(process.execPath, [path.join(here, 'demo-journal.mjs')]).toString();
const mount = JSON.stringify({ name: 'journal.md', kind: 'browser', downloadedHash: 'demo', lastDownload: new Date().toISOString(), created: new Date().toISOString() });

const shots = [
  { name: 'desktop-light', theme: 'light', viewport: { width: 1440, height: 900 }, panel: 'contents' },
  { name: 'desktop-dark', theme: 'dark', viewport: { width: 1440, height: 900 }, panel: 'contents' },
  { name: 'insights-dark', theme: 'dark', viewport: { width: 1440, height: 900 }, panel: 'insights' },
  { name: 'insights-light', theme: 'light', viewport: { width: 1440, height: 900 }, panel: 'insights' },
  { name: 'phone-dark', theme: 'dark', viewport: { width: 390, height: 844 }, panel: 'none', mobile: true },
  { name: 'phone-light', theme: 'light', viewport: { width: 390, height: 844 }, panel: 'none', mobile: true },
];

const browser = await chromium.launch();
for (const s of shots) {
  const ctx = await browser.newContext({ viewport: s.viewport, deviceScaleFactor: 2, isMobile: !!s.mobile, hasTouch: !!s.mobile });
  await ctx.addInitScript(([md, mount, theme, panel]) => {
    localStorage.setItem('daycell-md', md);
    localStorage.setItem('daycell-mount', mount);
    localStorage.setItem('daycell-theme', theme);
    localStorage.setItem('daycell-panel', panel);
  }, [md, mount, s.theme, s.panel]);
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // mark the demo journal as downloaded so the status dot is green, and show the whole newest entry
  await page.evaluate(() => {
    const m = getMount(); m.downloadedHash = hash(serialize()); setMount(m); renderChrome();
    const nb = document.querySelector('#nb'); nb.scrollTop = nb.scrollHeight - nb.clientHeight - (innerWidth < 600 ? 560 : 260);
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, `${s.name}.png`) });
  console.log('wrote', s.name);
  await ctx.close();
}
await browser.close();
