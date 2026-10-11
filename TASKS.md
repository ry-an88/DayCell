# Daycell launch tasks

The working list for getting Daycell from "built" to "selling". It comes from the
[launch plan](https://claude.ai/artifact/RaWy4AmwyFsXEQcrafb7rZ) and the decisions Dip made on 2026-10-11:

- **Free forever core** plus a **one-time Pro** unlock (no trial that locks writing).
- **Price:** £12 once, **£9 in launch week**.
- **The code goes public** (licence: FSL-1.1-MIT, see `LICENSE.md`).

Marketing work lives in `marketing/` and is tracked there. Legend: `[x]` done, `[ ]` to do.

---

## For Dip (needs your accounts, money or identity)

- [ ] **Lemon Squeezy:** create the product **"Daycell Pro"**, a single payment of **£12**, with licence keys on and
      an activation limit of **5**. Add a discount code **`LAUNCH`** for **£3 off**, limited to launch week. Note the checkout link,
      store ID and product ID for the next step.
- [ ] **Netlify:** import the GitHub repo and set these environment variables, then deploy and do one test-mode
      purchase: `LS_STORE_ID`, `LS_PRODUCT_ID`, `LS_CHECKOUT_URL` (the checkout link; this switches the paywall on),
      and `LAUNCH_ENDS` (last day of the £9 week, `YYYY-MM-DD`) when you launch. Full table in the README under
      "Deploying the web version".
- [ ] **Domain:** buy one (daycell.app was the favourite; check it's free) and connect it in Netlify.
- [ ] **Support email:** create an inbox (for example `hello@<your domain>`). The site uses `hello@daycell.app`;
      tell Claude if yours is different.
- [ ] **Read the privacy and terms pages** (`site/privacy.html`, `site/terms.html`), especially the 14-day refund
      promise. They're written plainly but aren't legal advice.
- [ ] **Analytics (optional but recommended):** make a free Umami Cloud account, add the site, and set
      `UMAMI_SRC` and `UMAMI_WEBSITE_ID` in Netlify. Nothing else to edit.
- [ ] **Make the repo public:** GitHub → Settings → General → Danger zone → Change visibility. History was checked on
      2026-10-11: no keys, tokens or journal entries in it.
- [ ] **Check the licence name line** in `LICENSE.md` (it says "ry-an88"). Put your legal name there if you prefer.
- [ ] **Trademark:** search "Daycell" on the UKIPO register (classes 9 and 42) before spending on marketing.
- [ ] **HMRC:** register for Self Assessment once sales pass the £1,000 trading allowance in a tax year.
- [ ] **ICO:** take the data protection fee self-assessment (ico.org.uk). Daycell stores no user data, so you may be
      exempt, but check.
- [ ] **Real iPad test:** open the hosted site in Safari, add it to the home screen, write an entry, close it, reopen.

## For Claude (code and docs)

### 1. Prepare the repo to go public
- [x] Scan git history for secrets and personal content (clean).
- [x] Add a licence: **FSL-1.1-MIT** (public, free for personal use, nobody may sell a competing copy; every version
      turns into plain MIT two years after release).
- [x] Write the journal file format as a short open spec (`docs/file-format.md`).

### 2. Make the web version safe on iPad and Safari
- [x] Web app manifest and icons, so it can be added to the home screen and installed.
- [x] Service worker, so the app opens offline.
- [x] Store in-browser journals in IndexedDB (bigger than localStorage's ~5 MB), with localStorage as a backup copy.
- [x] Ask the browser to keep storage persistent (`navigator.storage.persist()`).
- [x] "Add to Home Screen" nudge on iPhone and iPad Safari, explaining why (Safari can clear site data after 7 days).

### 3. Free forever + one-time Pro
- [x] Remove the 2-day trial. Writing is never locked.
- [x] Pro gates (web version only; the launcher is never gated):
  - [x] more than one journal in the browser, with a journal switcher
  - [x] live file saving straight to disk (Chrome/Edge)
  - [x] insights beyond 22 weeks (a full year) and the shareable **Year in cells** image
  - [x] accent colours
  - [x] entry templates
- [x] Price shown as £12, with the £9 launch-week line driven by `LICENSE.launchEnds`.
- [x] Upgrade prompts only at natural moments (a second journal, a Pro feature), never mid-entry.

### 4. Website
- [x] Landing page at `/` with the app at `/app/`.
- [x] Privacy policy, terms (with refunds) and FAQ.
- [x] Open Graph tags and a share image.
- [x] Netlify build that publishes the landing site, the app, the service worker and the licence function only.

### 5. Habit and measurement
- [x] Daily reminder: download a repeating calendar event (`.ics`) that opens Daycell.
- [x] Cookie-free analytics hook (Umami), off until configured. Counts only, never entry text.

### 6. Quality
- [x] GitHub Actions: syntax checks plus browser smoke tests on every push.
- [x] Playwright smoke tests: start screen, new journal, write, reload, Pro gates, reminder file, landing page.

### 7. Docs
- [x] README, CLAUDE.md and CHANGELOG updated.

### 8. From the marketing thread (approved by Dip, 2026-10-11)
- [x] Free shareable streak image with no entry text (status cell, insights, `/streak`).
- [x] Free import from Day One's JSON export, as a .zip or a single .json (`/import`, start screen, file panel).
- [x] Bug: "30 days ago" in the status cell had no space before the linked entry on desktop.

### Next (not started)
- [ ] Passphrase encryption for in-browser journals (Pro).
- [ ] Export to a styled HTML/PDF book (Pro).
- [ ] Images in entries (parked plan in README).
- [ ] Web push reminders for home-screen installs (iOS 16.4+).
- [ ] Price test: £12 vs £15 with two checkout links, after launch.
- [ ] Tauri desktop app.
