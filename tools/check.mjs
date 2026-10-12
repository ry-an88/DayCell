// Syntax checks that need no browser: the app's inline script, the service worker and the licence function.
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const html = readFileSync('daycell.html', 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (!scripts.length) throw new Error('no inline script found in daycell.html');
const dir = mkdtempSync(join(tmpdir(), 'daycell-'));
scripts.forEach((js, i) => {
  const f = join(dir, `inline-${i}.js`);
  writeFileSync(f, js);
  execFileSync(process.execPath, ['--check', f], { stdio: 'inherit' });
});
for (const f of ['web/sw.js', 'netlify/functions/license.mjs']) execFileSync(process.execPath, ['--check', f], { stdio: 'inherit' });
JSON.parse(readFileSync('web/manifest.webmanifest', 'utf8'));
console.log('syntax ok');
