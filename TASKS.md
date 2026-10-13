# Daycell launch tasks

The working list for getting Daycell from "built" to "launched". It comes from the
[launch plan](https://claude.ai/artifact/RaWy4AmwyFsXEQcrafb7rZ) and the decisions Dip made on 2026-10-11, updated on 2026-10-13:

- **Free, every feature** (2026-10-13). The one-time Pro unlock, Polar and the licence function are gone.
- **The code goes public** (licence: FSL-1.1-MIT, see `LICENSE.md`).

Marketing work lives in `marketing/` and is tracked there. Legend: `[x]` done, `[ ]` to do.

---

## For Dip (needs your accounts, money or identity)

- [x] ~~Lemon Squeezy~~ declined the store application on 2026-10-13. Payments moved to Polar (code done, see below).
- [x] ~~Polar~~ dropped on 2026-10-13: Daycell is free, nothing to sell.
- [ ] **Netlify:** after the free redesign is merged, delete these environment variables if they're set:
      `CHECKOUT_URL`, `PORTAL_URL`, `LAUNCH_ENDS`, `POLAR_ORG_ID`, `POLAR_BENEFIT_ID`, `POLAR_API_URL`.
- [ ] **Made by Dip:** answer Claude's questions for the landing page section (what you do, paid work you want,
      photo, links, where "Let's chat" messages go).
- [ ] **Domain:** buy one (daycell.app was the favourite; check it's free) and connect it in Netlify.
- [ ] **Support email:** create an inbox (for example `hello@<your domain>`). The site uses `hello@daycell.app`;
      tell Claude if yours is different.
- [ ] **Read the privacy and terms pages** (`site/privacy.html`, `site/terms.html`). They're written plainly but aren't legal advice.
- [ ] **Analytics (optional but recommended):** make a free Umami Cloud account, add the site, and set
      `UMAMI_SRC` and `UMAMI_WEBSITE_ID` in Netlify. Nothing else to edit.
- [ ] **Make the repo public:** GitHub → Settings → General → Danger zone → Change visibility. History was checked on
      2026-10-11: no keys, tokens or journal entries in it.
- [ ] **Check the licence name line** in `LICENSE.md` (it says "ry-an88"). Put your legal name there if you prefer.
- [ ] **Trademark:** search "Daycell" on the UKIPO register (classes 9 and 42) before spending on marketing.
- [ ] **HMRC:** only relevant if paid work through the site passes the £1,000 trading allowance in a tax year.
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

### 3. Free, every feature (2026-10-13)
- [x] Remove the Pro unlock, the upgrade dialog, the licence function and its tests. Everything that was Pro
      (several journals, live files, year insights and image, accents, templates) is free.
- [x] Landing page, privacy and terms say "free"; no price, refunds or payment processor.
- [x] Premium redesign: readable light mode (WCAG AA+), calmer dark mode, variable fonts, solid borders, motion
      that respects reduced motion, notebook-style start screen.
- [x] Today cell: a ticker line (bundled quotes, facts, tips; nothing fetched) and a tiny robot, each with an on/off
      button that's remembered (`/ticker`, `/bot`, file panel).
- [ ] "Made by Dip" section on the landing page with a "Let's chat" form (waiting on Dip's answers).

### 4. Website
- [x] Landing page at `/` with the app at `/app/`.
- [x] Privacy policy, terms and FAQ.
- [x] Open Graph tags and a share image.
- [x] Netlify build that publishes the landing site, the app, and the service worker.

### 5. Habit and measurement
- [x] Daily reminder: download a repeating calendar event (`.ics`) that opens Daycell.
- [x] Cookie-free analytics hook (Umami), off until configured. Counts only, never entry text.

### 6. Quality
- [x] GitHub Actions: syntax checks plus browser smoke tests on every push.
- [x] Playwright smoke tests: start screen, new journal, write, reload, reminder file, no paywall, today-cell toggles, landing page.

### 7. Docs
- [x] README, CLAUDE.md and CHANGELOG updated.

### 8. From the marketing thread (approved by Dip, 2026-10-11)
- [x] Free shareable streak image with no entry text (status cell, insights, `/streak`).
- [x] Free import from Day One's JSON export, as a .zip or a single .json (`/import`, start screen, file panel).
- [x] Bug: "30 days ago" in the status cell had no space before the linked entry on desktop.

### Next (not started)
- [ ] Passphrase encryption for in-browser journals.
- [ ] Export to a styled HTML/PDF book.
- [ ] Images in entries (parked plan in README).
- [ ] Web push reminders for home-screen installs (iOS 16.4+).
- [ ] Tauri desktop app.
