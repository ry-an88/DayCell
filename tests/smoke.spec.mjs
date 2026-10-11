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
const goPro = page => page.addInitScript(() => {
  localStorage.setItem('daycell-licence', JSON.stringify({ key: 'test', instanceId: 'i', device: 'test', status: 'active', validatedAt: Date.now() }));
});
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
  for (const p of ['privacy.html', 'terms.html', 'app/', 'og.png', 'fonts/fonts.css']) {
    expect((await page.request.get(p)).status(), p).toBe(200);
  }
});

test('free: write an entry and it survives a reload', async ({ page }) => {
  await page.goto(APP);
  await expect(page.locator('.start')).toBeVisible();
  await expect(page.locator('.start-price')).toContainText('free forever');
  await newJournal(page, 'morning');
  await write(page, 'first light', 'a quiet start.');
  await page.reload();
  await expect(page.locator('.title', { hasText: 'first light' })).toBeVisible();
  expect(await idbGet(page, 'journal:morning.md')).toContain('— first light');
});

test('free: pro features show the upgrade dialog instead', async ({ page }) => {
  await page.goto(APP);
  await newJournal(page, 'solo');
  await write(page, 'something', 'so insights have data.');
  const dialog = page.locator('#unlock');
  const close = () => page.click('#uCancel');

  await openPanel(page, 'files');
  await page.click('[data-fact="startNew"]');
  await expect(dialog).toBeVisible();
  await expect(page.locator('#uText')).toContainText('free keeps one journal');
  await expect(page.locator('#uBuy')).toHaveAttribute('href', 'https://example.com/checkout');
  await expect(page.locator('#uBuy')).toContainText('£12');
  await close();

  await page.click('[data-fact="accent"][data-accent="violet"]');
  await expect(dialog).toBeVisible();
  await close();
  expect(await page.evaluate(() => document.documentElement.dataset.accent)).toBeUndefined();

  await openPanel(page, 'insights');
  await page.click('[data-fact="heatYear"]');
  await expect(dialog).toBeVisible();
  await close();

  await page.keyboard.press('/');
  await page.fill('#palInput', 'retro');
  await page.keyboard.press('Enter');
  await expect(dialog).toBeVisible();
  await close();
  await expect(page.locator('.cell.editing')).toHaveCount(0);

  // writing itself is never locked
  await write(page, 'still free', 'writing is never locked.');
});

test('pro: several journals with a switcher, templates and accents', async ({ page }) => {
  await goPro(page);
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
  await expect(page.locator('#unlock')).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.dataset.accent)).toBe('violet');

  // ejecting one journal leaves the others a click away on the start screen
  await page.click('#ejectBtn');
  const dl = page.waitForEvent('download');
  await page.click('#mOk');
  await dl;
  await page.click('[data-act="openKept"][data-name="dreams.md"]');
  await expect(page.locator('.title', { hasText: 'flying again' })).toBeVisible();
});

test('pro: year view and the year-in-cells image', async ({ page }) => {
  await goPro(page);
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
