import { test, expect } from '@playwright/test';

const APP = '/app/?storage=browser';  // in-browser journals, so no native file dialogs

async function newJournal(page, name) {
  await page.locator('[data-act="startNew"], [data-fact="startNew"]').first().click();
  await page.fill('#mInput', name);
  await page.click('#mOk');
  await expect(page.locator('#fname')).toHaveText(`${name}.md`);
}
async function write(page, title, body) {
  await page.click('.add-cell');
  await page.fill('.cell.editing .f-title', title);
  await page.fill('.cell.editing .f-body', body);
  await page.keyboard.press('Shift+Enter');
  await expect(page.locator('.cell:not(.editing) .title', { hasText: title })).toBeVisible();
}
// the rail buttons toggle their panel, so only click when it isn't already open
async function openPanel(page, name) {
  const b = page.locator(`.rail [data-panel="${name}"]`);
  if (!(await b.getAttribute('class')).includes('active')) await b.click();
}
const idbGet = (page, key) => page.evaluate(k => new Promise(res => {
  const r = indexedDB.open('daycell', 1);
  r.onupgradeneeded = () => r.result.createObjectStore('kv');
  r.onsuccess = () => { const q = r.result.transaction('kv').objectStore('kv').get(k); q.onsuccess = () => res(q.result ?? null); };
}), key);

test('landing page links to the app and the legal pages', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('your journal is just a markdown file.');
  expect(await page.content()).not.toContain('__SITE_URL__');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://daycell.test/og.png');
  // the maker is named the same way everywhere, so search engines don't read 'Dip' as an alias
  await expect(page.locator('meta[name="author"]')).toHaveAttribute('content', 'Dip Raiyan');
  const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  const node = t => ld['@graph'].find(n => n['@type'] === t);
  expect(node('Person').name).toBe('Dip Raiyan');
  expect(node('WebApplication').url).toBe('https://daycell.test/');
  expect(node('WebApplication').author['@id']).toBe(node('Person')['@id']);
  for (const p of ['privacy.html', 'terms.html', 'app/', 'og.png', 'fonts/fonts.css']) {
    expect((await page.request.get(p)).status(), p).toBe(200);
  }
  // search engines can find every page, at the real address
  expect(await (await page.request.get('robots.txt')).text()).toContain('Sitemap: https://daycell.test/sitemap.xml');
  expect(await (await page.request.get('sitemap.xml')).text()).toContain('<loc>https://daycell.test/app/</loc>');
});

test('free: write an entry and it survives a reload', async ({ page }) => {
  await page.goto(APP);
  await expect(page.locator('.start')).toBeVisible();
  await newJournal(page, 'morning');
  await write(page, 'first light', 'a quiet start.');
  await page.reload();
  await expect(page.locator('.title', { hasText: 'first light' })).toBeVisible();
  expect(await idbGet(page, 'journal:morning.md')).toContain('— first light');
});

test('everything is free: several journals with a switcher, templates and accents', async ({ page }) => {
  await page.goto(APP);
  await newJournal(page, 'work');
  await write(page, 'standup notes', 'shipped it.');
  await openPanel(page, 'files');
  await newJournal(page, 'dreams');
  await expect(page.locator('.title', { hasText: 'standup notes' })).toHaveCount(0);
  await write(page, 'flying again', 'over the sea.');

  await openPanel(page, 'files');
  await page.click('[data-bjournal="work.md"]');
  await expect(page.locator('#fname')).toHaveText('work.md');
  await expect(page.locator('.title', { hasText: 'standup notes' })).toBeVisible();
  await expect(page.locator('.title', { hasText: 'flying again' })).toHaveCount(0);

  // a template nobody fills in is thrown away; a filled one is saved
  await page.keyboard.press('Escape');
  await page.keyboard.press('/');
  await page.fill('#palInput', 'review');
  await page.keyboard.press('Enter');
  await expect(page.locator('.cell.editing .f-title')).toHaveValue('daily review');
  await page.keyboard.press('Escape');
  await expect(page.locator('.title', { hasText: 'daily review' })).toHaveCount(0);
  await page.keyboard.press('/');
  await page.fill('#palInput', 'review');
  await page.keyboard.press('Enter');
  await page.locator('.cell.editing .f-body').press('End');
  await page.locator('.cell.editing .f-body').pressSequentially('call mum');
  await page.keyboard.press('Shift+Enter');
  await expect(page.locator('.title', { hasText: 'daily review' })).toBeVisible();

  await openPanel(page, 'files');
  await page.click('[data-fact="accent"][data-accent="violet"]');
  expect(await page.evaluate(() => document.documentElement.dataset.accent)).toBe('violet');

  // ejecting one journal leaves the others a click away on the start screen
  await page.click('#ejectBtn');
  const dl = page.waitForEvent('download');
  await page.click('#mOk');
  await dl;
  await page.click('[data-act="openKept"][data-name="dreams.md"]');
  await expect(page.locator('.title', { hasText: 'flying again' })).toBeVisible();
});

test('year view and the year-in-cells image', async ({ page }) => {
  await page.goto(APP);
  await newJournal(page, 'year');
  await write(page, 'one', 'a few words today.');
  await openPanel(page, 'insights');
  await page.click('[data-fact="heatYear"]');
  expect(await page.locator('.heat i').count()).toBe(53 * 7);
  const dl = page.waitForEvent('download');
  await page.click('[data-fact="yearCard"]');
  const file = await dl;
  expect(file.suggestedFilename()).toMatch(/^daycell-year-\d{4}\.png$/);
});

test('daily reminder downloads a repeating calendar event', async ({ page }) => {
  await page.goto(APP);
  await openPanel(page, 'files');
  await page.click('[data-fact="remind"]');
  await page.fill('#mInput', '7:30');
  const dl = page.waitForEvent('download');
  await page.click('#mOk');
  const file = await dl;
  expect(file.suggestedFilename()).toBe('daycell-reminder.ics');
  const text = await (await import('node:fs')).promises.readFile(await file.path(), 'utf8');
  expect(text).toContain('RRULE:FREQ=DAILY');
  expect(text).toMatch(/DTSTART:\d{8}T073000/);
  expect(text).toContain('URL:http://localhost:5180/app/');
});

test('eject downloads the file and clears it from the browser', async ({ page }) => {
  await page.goto(APP);
  await newJournal(page, 'leaving');
  await write(page, 'bye', 'see you.');
  await page.click('#ejectBtn');
  const dl = page.waitForEvent('download');
  await page.click('#mOk');
  expect((await dl).suggestedFilename()).toBe('leaving.md');
  await expect(page.locator('.start')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('daycell-library'))).toBe('[]');
  expect(await idbGet(page, 'journal:leaving.md')).toBeNull();
});

test('a journal saved by an older version (localStorage only) is moved into IndexedDB', async ({ page }) => {
  await page.addInitScript(() => {
    if (sessionStorage.getItem('seeded')) return;
    sessionStorage.setItem('seeded', '1');
    localStorage.setItem('daycell-md', '# Old\n\n## 2026-10-01 · 09:00 — from before\n\nstill here.\n\n---\n');
    localStorage.setItem('daycell-mount', JSON.stringify({ name: 'old.md', kind: 'browser', downloadedHash: null, lastDownload: null, created: '2026-10-01T09:00:00Z' }));
  });
  await page.goto(APP);
  await expect(page.locator('.title', { hasText: 'from before' })).toBeVisible();
  expect(await idbGet(page, 'journal:old.md')).toContain('from before');
  expect(JSON.parse(await page.evaluate(() => localStorage.getItem('daycell-library')))[0].name).toBe('old.md');
});

test('the app opens offline once it has been visited', async ({ page, context }) => {
  await page.goto('/app/');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();  // now controlled by the service worker, which caches the page
  await expect(page.locator('.start')).toBeVisible();
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('.start')).toBeVisible();
  await context.setOffline(false);
});

// ---------- Day One import, streak card, status cell ----------
import { deflateRawSync, crc32 } from 'node:zlib';

const DAY_ONE = {
  metadata: { version: '1.0' },
  entries: [
    { uuid: 'A', creationDate: '2024-03-10T08:15:00Z', timeZone: 'Europe/London', starred: true, tags: ['travel', 'big trip'],
      text: '# Lisbon\n\nTrams, tiles and pastéis\\. Best day\\!\n\n![](dayone-moment://ABC123)' },
    { uuid: 'B', creationDate: '2024-07-01T22:30:00Z', timeZone: 'America/New_York', text: 'Short note from the road' },
    { uuid: 'C', creationDate: '2024-07-02T12:00:00Z', timeZone: 'Europe/London', text: '' },
  ],
};
// a minimal deflate zip, like Day One's export
function zip(files) {
  const locals = [], centrals = [];
  let offset = 0;
  for (const [name, text] of Object.entries(files)) {
    const data = Buffer.from(text), comp = deflateRawSync(data), nm = Buffer.from(name), crc = crc32(data);
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(8, 8);
    lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(comp.length, 18); lh.writeUInt32LE(data.length, 22); lh.writeUInt16LE(nm.length, 26);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(8, 10);
    ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(comp.length, 20); ch.writeUInt32LE(data.length, 24); ch.writeUInt16LE(nm.length, 28);
    ch.writeUInt32LE(offset, 42);
    locals.push(lh, nm, comp); centrals.push(ch, nm);
    offset += 30 + nm.length + comp.length;
  }
  const cd = Buffer.concat(centrals), end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(centrals.length / 2, 8); end.writeUInt16LE(centrals.length / 2, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, cd, end]);
}

test('import a Day One zip into a new journal, then skip duplicates', async ({ page }) => {
  await page.goto(APP);
  const buffer = zip({ 'Journal.json': JSON.stringify(DAY_ONE), 'photos/abc.jpeg': 'x' });
  await page.locator('#importInput').setInputFiles({ name: 'export.zip', mimeType: 'application/zip', buffer });
  await expect(page.locator('#fname')).toHaveText('day-one.md');
  await expect(page.locator('#toast')).toContainText('imported 2 entries from Day One · 1 photo stays in Day One');
  const lisbon = page.locator('.cell', { has: page.locator('.title', { hasText: 'Lisbon' }) });
  await expect(lisbon).toContainText('2024-03-10 08:15');  // 08:15 UTC is 08:15 GMT in March
  await expect(lisbon).toContainText('pastéis. Best day!');
  await expect(lisbon).toContainText('#starred');
  await expect(lisbon).toContainText('#big-trip');
  // 22:30 UTC on 1 July is 18:30 in New York
  await expect(page.locator('.cell', { has: page.locator('.title', { hasText: 'Short note from the road' }) })).toContainText('2024-07-01 18:30');

  await page.locator('#importInput').setInputFiles({ name: 'Journal.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(DAY_ONE)) });
  await expect(page.locator('#toast')).toContainText('imported 0 entries from Day One · 2 already here');
  expect(await idbGet(page, 'journal:day-one.md')).toContain('## 2024-03-10 · 08:15 — Lisbon');
});

test('free: the streak image downloads and the status cell keeps its spacing', async ({ page }) => {
  await page.goto(APP);
  await newJournal(page, 'streaky');
  await write(page, 'day one', 'started.');
  const dl = page.waitForEvent('download');
  await page.click('[data-act="streakCard"]');
  expect((await dl).suggestedFilename()).toMatch(/^daycell-streak-\d{4}-\d{2}-\d{2}\.png$/);

  // an entry from 30 days ago shows as "30 days ago" next to its link, with a gap between them
  await page.evaluate(() => {
    const d = new Date(Date.now() - 30 * 864e5);
    state.entries.push({ id: 'old', date: isoDate(d), time: '09:00', title: 'a month back', body: 'x', mood: '', tags: [], deleted: '' });
    renderAll();
  });
  const label = page.locator('.cell.status .k', { hasText: '30 days ago' });
  const link = page.locator('.cell.status a[data-act="jump"]');
  const [a, b] = [await label.boundingBox(), await link.boundingBox()];
  expect(b.x - (a.x + a.width)).toBeGreaterThanOrEqual(6);
});

test('there is no paywall left anywhere', async ({ page }) => {
  await page.goto(APP);
  await expect(page.locator('#unlock')).toHaveCount(0);
  await newJournal(page, 'first');
  await openPanel(page, 'files');
  await expect(page.locator('#panel')).not.toContainText('· pro');
  await page.keyboard.press('/');
  await page.fill('#palInput', 'pro');
  await expect(page.locator('#palList')).not.toContainText('licence');
});

test('today cell: the ticker and the robot turn off, stay off, and nothing is fetched', async ({ page }) => {
  const outside = [];
  page.on('request', r => { if (!r.url().startsWith('http://localhost:5180/')) outside.push(r.url()); });
  await page.goto(APP);
  await newJournal(page, 'today');
  await expect(page.locator('#bot')).toBeVisible();
  await expect(page.locator('#ticker')).toContainText('#', { timeout: 5000 });
  await page.click('[data-act="toggleTicker"]');
  await page.click('[data-act="toggleBot"]');
  await expect(page.locator('#tickWrap')).toHaveClass(/off/);
  await expect(page.locator('#bot')).toHaveCount(0);
  await page.reload();
  await expect(page.locator('.cell.status')).toBeVisible();
  await expect(page.locator('#tickWrap')).toHaveClass(/off/);
  await expect(page.locator('#bot')).toHaveCount(0);
  await page.click('[data-act="toggleBot"]');
  await expect(page.locator('#bot')).toBeVisible();
  // committing an entry makes the robot hop
  await write(page, 'hello robot', 'a small hop.');
  await expect(page.locator('#bot.hop')).toHaveCount(1, { timeout: 2000 });
  expect(outside).toEqual([]);
});

test('landing page: the maker poster and its "say hello" form', async ({ page }) => {
  let posted = '';
  await page.route('**/', route => {
    if (route.request().method() !== 'POST') return route.fallback();
    posted = route.request().postData() || '';
    return route.fulfill({ status: 200, body: 'ok' });
  });
  await page.goto('/#maker');
  const form = page.locator('form[name="hello"]');
  await expect(page.locator('#maker .p-huge')).toBeVisible();
  await expect(form).toHaveAttribute('data-netlify', 'true');
  await expect(form.locator('input[name="bot-field"]')).toBeHidden();
  await form.locator('input[name="name"]').fill('Ada');
  await form.locator('input[name="email"]').fill('ada@example.com');
  await form.locator('textarea[name="message"]').fill('hello from a test');
  await form.locator('button[type="submit"]').click();
  await expect(form.locator('.f-note')).toHaveText('Sent. I’ll write back.');
  expect(new URLSearchParams(posted).get('form-name')).toBe('hello');
  expect(new URLSearchParams(posted).get('message')).toBe('hello from a test');
  await expect(form.locator('input[name="name"]')).toHaveValue('');
});

test('landing page: on a phone the maker window is at most 80% of the screen and scrolls inside', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto('/');
  const m = await page.evaluate(() => {
    const w = document.querySelector('.win'), p = document.querySelector('.poster');
    return { win: w.getBoundingClientRect().height, vh: innerHeight, scrolls: p.scrollHeight > p.clientHeight, wide: document.documentElement.scrollWidth > innerWidth };
  });
  expect(m.win).toBeLessThanOrEqual(m.vh * 0.8 + 1);
  expect(m.scrolls).toBe(true);
  expect(m.wide).toBe(false);
  await ctx.close();
});

test('editor: the prompt row closes and stays closed for that entry', async ({ page }) => {
  await page.goto(APP);
  await newJournal(page, 'prompts');
  await page.click('.add-cell');
  await expect(page.locator('.cell.editing .prompt-line')).toBeVisible();
  await page.click('.cell.editing .pclose');
  await expect(page.locator('.cell.editing .prompt-line')).toHaveCount(0);
  await page.click('.cell.editing .moodseg [data-mood="good"]');  // re-renders the cell
  await expect(page.locator('.cell.editing .prompt-line')).toHaveCount(0);
});

test('editor: on a phone with the keyboard up, the whole new entry fits above it', async ({ browser }) => {
  // the keyboard shrinks the page to ~470px (interactive-widget=resizes-content)
  const ctx = await browser.newContext({ viewport: { width: 393, height: 470 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(APP);
  await newJournal(page, 'phone');
  await page.click('.add-cell');
  await expect(page.locator('.cell.editing .f-title')).toBeFocused();
  const m = await page.evaluate(() => {
    const c = document.querySelector('.cell.editing').getBoundingClientRect(), nb = document.querySelector('#nb').getBoundingClientRect();
    return { top: c.top - nb.top, bottom: nb.bottom - c.bottom, wide: document.documentElement.scrollWidth > innerWidth };
  });
  expect(m.top).toBeGreaterThanOrEqual(0);
  expect(m.bottom).toBeGreaterThanOrEqual(0);
  expect(m.wide).toBe(false);
  await ctx.close();
});

test('editor: a long entry stops growing at a max height and scrolls inside the box', async ({ page }) => {
  await page.goto(APP);
  await newJournal(page, 'long');
  await page.click('.add-cell');
  const body = page.locator('.cell.editing .f-body');
  await body.fill(Array.from({ length: 80 }, (_, i) => `line ${i + 1}`).join('\n'));
  const m = await body.evaluate(t => ({ h: t.getBoundingClientRect().height, max: parseFloat(getComputedStyle(t).maxHeight), scrolls: t.scrollHeight > t.clientHeight, oy: getComputedStyle(t).overflowY }));
  expect(m.h).toBeLessThanOrEqual(m.max + 1);
  expect(m.scrolls).toBe(true);
  expect(m.oy).toBe('auto');
});
