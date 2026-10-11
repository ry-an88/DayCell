// Renders HTML templates to PNG, PDF or MP4 with headless Chromium. No build step, no framework.
//
//   node marketing/tools/render.mjs <template.html> [out] [--query=a=b&c=d]
//
// A template declares its own output in <meta> tags:
//   <meta name="size" content="1080x1350">        pixel size (rendered at 1x; PNGs are crisp because sizes are already large)
//   <meta name="duration" content="18">           seconds. When present the template is a video and becomes an MP4.
//   <meta name="format" content="pdf">            optional, for print posters (size is then a CSS page size, e.g. "A3")
//
// Video templates animate with plain CSS animations (or the Web Animations API). The renderer pauses every
// animation and seeks it frame by frame, so output is deterministic and never drops frames. A template can also
// define window.seek(t) (t in seconds) for anything CSS can't express, such as typing text.
//
// Needs Playwright and ffmpeg on PATH.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const query = (args.find(a => a.startsWith('--query=')) || '').slice(8);
const fps = Number((args.find(a => a.startsWith('--fps=')) || '--fps=30').slice(6));
const [input, outArg] = args.filter(a => !a.startsWith('--'));
if (!input) { console.error('usage: render.mjs <template.html> [out] [--query=...] [--fps=30]'); process.exit(1); }

const url = pathToFileURL(path.resolve(input)).href + (query ? '?' + query : '');
const browser = await chromium.launch();
const probe = await browser.newPage();
await probe.goto(url);
const meta = await probe.evaluate(() => Object.fromEntries([...document.querySelectorAll('meta[name]')].map(m => [m.name, m.content])));
await probe.close();

const format = meta.format || (meta.duration ? 'mp4' : 'png');
const base = path.basename(input, '.html') + (query ? '-' + query.replace(/[^a-z0-9]+/gi, '-').slice(0, 40) : '');
const out = outArg || path.join(path.dirname(path.resolve(input)), '..', 'out', `${base}.${format}`);
fs.mkdirSync(path.dirname(out), { recursive: true });

if (format === 'pdf') {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, format: meta.size || 'A3', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
} else {
  const [width, height] = (meta.size || '1080x1080').split('x').map(Number);
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  if (format === 'png') {
    // static images show the end state of any animation
    await page.evaluate(() => document.getAnimations().forEach(a => a.finish()));
    await page.screenshot({ path: out });
  } else {
    const duration = Number(meta.duration);
    const frames = Math.round(duration * fps);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-movflags', '+faststart', out],
      { stdio: ['pipe', 'inherit', 'inherit'] });
    await page.evaluate(() => document.getAnimations().forEach(a => a.pause()));
    for (let i = 0; i < frames; i++) {
      const t = i / fps;
      await page.evaluate(t => {
        // animations created after load (e.g. by window.seek) are picked up every frame
        document.getAnimations().forEach(a => { a.pause(); a.currentTime = t * 1000; });
        if (window.seek) window.seek(t);
      }, t);
      const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % fps === 0) process.stdout.write(`\r${path.basename(out)} ${Math.round(t)}s/${duration}s`);
    }
    ff.stdin.end();
    await new Promise((res, rej) => ff.on('close', c => c ? rej(new Error('ffmpeg exited ' + c)) : res()));
    process.stdout.write('\n');
  }
}
await browser.close();
console.log('wrote', path.relative(process.cwd(), out));
