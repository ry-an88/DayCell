// Records a vertical (1080x1920) MP4 of the real app: a new entry is written from a prompt, committed, then the
// insights panel opens. It drives daycell.html with Playwright and captures frame by frame, so typing is smooth.
//
//   npx http-server -p 5180 .        (from the repo root, in another terminal)
//   node marketing/tools/app-demo.mjs [http://localhost:5180/daycell.html] [--theme=dark|light]
//
// Uses the fictional demo journal from demo-journal.mjs. Writes marketing/video/out/04-app-demo-<theme>.mp4.
import { chromium } from 'playwright';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const theme = (args.find(a => a.startsWith('--theme=')) || '--theme=dark').slice(8);
const base = args.find(a => !a.startsWith('--')) || 'http://localhost:5180/daycell.html';
const out = path.join(here, '..', 'video', 'out', `04-app-demo-${theme}.mp4`);
fs.mkdirSync(path.dirname(out), { recursive: true });
const FPS = 30;

const md = execFileSync(process.execPath, [path.join(here, 'demo-journal.mjs')]).toString();
const mount = JSON.stringify({ name: 'journal.md', kind: 'browser', downloadedHash: 'demo', lastDownload: new Date().toISOString(), created: new Date().toISOString() });

const browser = await chromium.launch();
// 432x768 CSS pixels at 2.5x = 1080x1920, a phone-sized layout rendered sharp
const ctx = await browser.newContext({ viewport: { width: 432, height: 768 }, deviceScaleFactor: 2.5, isMobile: true, hasTouch: true });
await ctx.addInitScript(([md, mount, theme]) => {
  localStorage.setItem('daycell-md', md);
  localStorage.setItem('daycell-mount', mount);
  localStorage.setItem('daycell-theme', theme);
  localStorage.setItem('daycell-panel', 'none');
}, [md, mount, theme]);
const page = await ctx.newPage();
await page.goto(base + '?storage=browser', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => { const m = getMount(); m.downloadedHash = hash(serialize()); setMount(m); renderChrome(); });

const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  '-vf', 'scale=1080:1920', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-movflags', '+faststart', out],
  { stdio: ['pipe', 'inherit', 'inherit'] });
let frames = 0;
const frame = async () => {
  const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  frames++;
};
// real time passes between captures, so CSS transitions and toasts still play; hold() spreads frames over the wait
const hold = async secs => { for (let i = 0; i < secs * FPS; i++) { await frame(); } };
const type = async (text, cps = 16) => {
  for (const ch of text) {
    await page.keyboard.type(ch);
    for (let i = 0; i < Math.round(FPS / cps); i++) await frame();
  }
};

await hold(1.5);
await page.evaluate(() => newEntry('if today had a commit message, what would it be?'));
await hold(0.6);
await page.focus('.f-title');
await type('commit message for today');
await hold(0.3);
const great = await page.$('[data-mood="great"]');
if (great) { await great.click(); await hold(0.5); }
await page.focus('.f-body');
await page.keyboard.press('End');
await page.evaluate(() => { const t = document.querySelector('.f-body'); t.setSelectionRange(t.value.length, t.value.length); });
await type('feat: finally trusted myself', 14);
await hold(0.4);
await page.focus('.f-tags');
await type('#wins', 10);
await hold(0.6);
await page.keyboard.press('Shift+Enter');
await hold(2.5);
await page.evaluate(() => openPanel('insights'));
await hold(3);
// end card drawn over the app with the same tokens, so it matches either theme
await page.evaluate(() => {
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;inset:0;z-index:99;background:var(--bg);display:grid;align-content:center;gap:16px;padding:0 32px;opacity:0;transition:opacity .4s';
  d.innerHTML = `<div style="display:flex;align-items:center;gap:10px;font:600 26px var(--mono)"><span style="display:grid;place-items:center;width:44px;height:44px;border-radius:9px;background:var(--text);color:var(--bg)">d/</span><span>daycell<span style="color:var(--faint)">.md</span></span></div>
    <div style="font:700 34px/1.1 var(--sans);letter-spacing:-.03em">Commit your day.</div>
    <div style="font:400 19px/1.45 var(--sans);color:var(--muted)">One plain .md file you own.<br>Free to write, forever. Pro is £12, once.</div>`;
  document.body.appendChild(d);
  requestAnimationFrame(() => d.style.opacity = 1);
});
await hold(2.5);
ff.stdin.end();
await new Promise((res, rej) => ff.on('close', c => c ? rej(new Error('ffmpeg exited ' + c)) : res()));
await browser.close();
console.log(`wrote ${path.relative(process.cwd(), out)} (${(frames / FPS).toFixed(1)}s)`);
