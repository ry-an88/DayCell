# Daycell

A journal app that looks like a coding notebook and stores everything in **one plain markdown file you own**.
No account, no cloud. Each entry is a "cell"; your journal is a `.md` file you can open in any text editor.

- **Use it:** [daycell.app](https://daycell.app). It's free, with every feature, and runs in your browser.
- **Made by** Dip Raiyan, an independent developer in the UK. Say hello at
  [hello@daycell.app](mailto:hello@daycell.app).
- **Licence:** the source is public so you can read it and check how your journal is handled. It is not open
  source: all rights reserved (see [`LICENSE`](LICENSE)).
- **Status:** working and deployed, still being launched. [`TASKS.md`](TASKS.md) has what's left and
  [`CHANGELOG.md`](CHANGELOG.md) has what changed.

---

## Contents

- [Quick start](#quick-start)
- [What's in this folder](#whats-in-this-folder)
- [The journal file format](#the-journal-file-format)
- [Features](#features)
- [Three ways it runs](#three-ways-it-runs)
- [Web version: open, download and eject](#web-version-open-download-and-eject)
- [Price: free, every feature](#price-free-every-feature)
- [The website](#the-website)
- [Deploying the web version](#deploying-the-web-version)
- [Tests](#tests)
- [Security and privacy](#security-and-privacy)
- [Renaming the app](#renaming-the-app)
- [Naming](#naming)
- [Decisions log](#decisions-log)
- [Known limitations](#known-limitations)
- [What's been tested (and what hasn't)](#whats-been-tested-and-what-hasnt)
- [Next steps](#next-steps)

---

## Quick start

**In a browser:** open [daycell.app](https://daycell.app) and click through to the app (`/app/`). Start a new journal
or open a `.md` you already have. Nothing to install, and your entries never leave your device.

**The local launcher** (the maker's own Windows setup, from a copy of this folder):

**On this PC:** double-click **`Start Daycell.bat`**. It opens the app in your browser and saves every entry to
`Journals/daycell.md`. Keep the black launcher window open while you write; close it to stop.

**On your iPad or tablet as well:** close the normal launcher and double-click **`Start Daycell (iPad & tablet).bat`**.
Then in the app click the **folder icon** (left rail) and scan the QR code with the iPad's camera. Both devices
must be on the same Wi-Fi and the PC must be on. The first time, Windows may ask about the firewall: allow
**private networks only**.

The launcher needs Python 3 and nothing else. The `.bat` files are for Windows; elsewhere, run `python daycell.py`
(add `--lan` for tablet access).

---

## What's in this folder

| File | What it is |
|---|---|
| `daycell.html` | The whole app (UI + logic) in one file. The same file runs locally and as the web version. |
| `daycell.py` | Local launcher/server. Serves the app and reads/writes journals in `Journals/`. |
| `Start Daycell.bat` | Starts the launcher for this PC only. |
| `Start Daycell (iPad & tablet).bat` | Starts the launcher with iPad/tablet access over your Wi-Fi (`--lan`). |
| `Journals/` | Your journals (`daycell.md`, plus any others you create). **Private: never published or committed.** |
| `web/` | The app's manifest, icons and service worker (install to home screen, works offline). |
| `site/` | The website: landing page, privacy, terms, styles, self-hosted fonts and the share image. |
| `tools/build.mjs` | Builds `dist/`: the site at `/` and the app at `/app/`, filling in settings from the environment. |
| `tools/check.mjs` | Syntax checks (app script, service worker, manifest). |
| `tools/make-images.py` | Redraws the icons and the share image (needs Pillow and the JetBrains Mono font files). |
| `tests/` | Browser smoke tests (Playwright). `npm test` builds and runs them. |
| `netlify.toml` | Hosting config for the web version. |
| `docs/file-format.md` | The journal file format as a short open spec. |
| `LICENSE` | Copyright © 2026 Dip Raiyan. All rights reserved. The code is public to read, not to reuse. |
| `TASKS.md` | The launch task list. |
| `CHANGELOG.md` | What changed, newest first. |
| `marketing/` | Launch strategy, copy, brand assets and screenshots. |
| `package.json`, `playwright.config.mjs` | Node scripts (`build`, `check`, `test`) and the test setup. |
| `.github/workflows/ci.yml` | CI: syntax checks and the smoke tests on every push and pull request. |
| `.gitignore` | Keeps `Journals/` and the iPad pairing secret out of git. |
| `CLAUDE.md` | Working notes for Claude sessions: code map, safe-testing rules, preferences and current state. |
| `.daycell-key` | Created automatically in iPad mode. The secret in the QR code. Delete it to un-pair all devices. |

---

## The journal file format

One `.md` file per journal. Every entry is a `##` heading; metadata uses `key:: value` lines (the same inline-field
style Obsidian's Dataview plugin understands). Deleted entries move to a `# Trash` section at the bottom until the
trash is emptied.

```markdown
# Journal

## 2026-10-07 · 21:14 — Title of the entry
mood:: good
tags:: #work #ideas

Body in markdown: **bold**, lists, - [ ] tasks, `code`, > quotes.

---

# Trash

## 2026-10-01 · 08:30 — An old entry
deleted:: 2026-10-07 21:20

Text of the old entry.

---
```

- **Moods:** `rough`, `meh`, `okay`, `good`, `great`.
- **Hand edits are fine.** Unknown `key:: value` lines stay in the entry body untouched.
- **Download stamp:** a copy downloaded from the web version gets one hidden line after the title,
  `<!-- daycell:saved 2026-10-07T20:15:00Z -->`. It's used to warn you if you later open an older copy.

---

## Features

- **Notebook look:** entries are numbered cells (`[1]:`, `[2]:`…), an edit mode and a command mode, a toolbar, and a
  status bar. Fonts are Inter and JetBrains Mono, with light and dark themes. The start screen is a notebook too
  (`daycell.start()` with `[1]: new journal`, `[2]: open a .md`, `[3]: import from day one`).
- **Design system (redesign, 2026-10-13):** warm neutral greys; light mode is off-white paper, never pure white
  (body text about 16:1, secondary text 7:1 or more, faint text 4.5:1 or more); the accent marks only what is active
  or clickable; two corner radii (6px controls, 10px surfaces); dashed borders only on the `[~]` cell; mono text a
  touch heavier in light mode. Motion: a commit "runs" the cell (a sweep down its edge), new cells fade up, panels
  slide in, dialogs and toasts ease in, and switching themes crossfades. All of it is off with reduced motion.
- **Autosave:** text is saved about a second after you stop typing. **Shift+Enter** commits the cell.
- **Trash:** the bin moves an entry to the trash with a 5-second undo. Restore it, delete it forever, or empty the
  trash.
- **Status cell `[~]`** (`daycell.today()`) at the bottom, where the app opens:
  - a greeting, your streak and this week's stats
  - an "on this day" link to an entry from the same date in an earlier year, or from 30 days ago
  - today's writing prompt
  - a **ticker line** under `daycell.today()` that types out a short quote, a small fact, an "on this day" line or a
    tip, about every 12 seconds. The lines ship inside the app (about 70, plus 31 dates), so it works offline and
    fetches nothing. Click it for the next one; it waits while you write or hover it.
  - a **tiny robot** drawn in the same line style as the icons. It reacts to what you do: waves when the app opens,
    hops when you commit, celebrates milestones, covers its eyes when you trash an entry, bobs while you type, gets
    dizzy after five prompt shuffles and falls asleep after 3 idle minutes. Its eyes follow the pointer; click it for
    a random trick. With reduced motion switched on it stays still.
  - two small buttons in the cell's corner turn the ticker and the robot off (also `/ticker`, `/bot` and the file
    panel). The choice is remembered on that device (`daycell-ticker`, `daycell-bot`).
- **Daily prompts:** 30 prompts in a dev-flavoured voice ("if today had a commit message, what would it be?").
  You can shuffle them or use one in a new entry.
- **Insights panel:**
  - streak and longest streak, entry and word totals
  - a GitHub-style activity grid of the last 22 weeks; click a square to jump to that day
  - mood trend and top tags
- **A voice:** playful save messages and streak milestones (3, 7, 14, 30, 50, 100, 365 days).
- **Command palette** (`/` or Ctrl+K): `/new`, `/prompt`, `/today`, `/random`, `/stats`, `/search`, `/trash`,
  `/files`, `/theme`, `/save`, `/download`, `/eject`, `/remind`, `/streak`, `/year`, `/import`, `/ticker`, `/bot`, and the templates (`/review`,
  `/gratitude`, `/retro`, `/standup`, `/decision`).
- **Works on any screen:** desktop, iPad and phone, with touch-friendly controls. Text fields are 16px so iOS
  doesn't zoom in, and the layout respects the iPhone/iPad home bar.

**Keyboard shortcuts:**

| Key | Does |
|---|---|
| `b` | new entry |
| `Enter` | edit the selected entry |
| `Shift+Enter` | commit the cell |
| `Esc` | leave edit mode |
| `↑ ↓` / `j k` | move selection |
| `d d` | move to trash |
| `Ctrl+S` | save now |
| `/` or `Ctrl+K` | command palette |

On touch screens, tap an entry once to select it and again to edit it.

---

## Three ways it runs

| Mode | How you start it | Where entries live | Cost |
|---|---|---|---|
| **Launcher** (personal use) | `Start Daycell.bat` | `Journals/*.md` on this PC | free |
| **Launcher + iPad** | `Start Daycell (iPad & tablet).bat` | `Journals/*.md` on this PC; the iPad writes into the same file | free |
| **Web version** (the product) | open the hosted website (`/app/`) | in the browser until ejected; a live file on disk in Chrome/Edge | free |

The app detects the mode by itself: if it's served by `daycell.py` it uses the launcher; otherwise it's the web version.

**Two devices, one file (launcher + iPad).** Each save tells the server which version of the file it last saw. If
the other device saved in between, the server refuses, and the app merges the other device's new entries before
saving again. Coming back to the app (tab focus, or every 20 seconds) also pulls in changes. New entries are never
lost; if both devices edit the *same* entry at the same moment, the last save wins.

---

## Web version: open, download and eject

The hosted site has **no accounts**. On first visit it shows a start screen with two choices.

- **New journal:** name it (for example "Morning Pages") and it's created and opened.
- **Open a .md:** load an existing journal from the device.

| How the journal is kept | When |
|---|---|
| **In the browser** (IndexedDB, with a backup copy of the open journal in localStorage) | Free, every browser. Every keystroke is saved, so closing the tab loses nothing. |
| **Live file:** the app saves straight into the `.md` you created or picked | Chrome/Edge on desktop. After a restart, one click reconnects it. |

- **Several journals:** the file panel lists every journal kept in this browser and switches between them.
- **Download a copy** (in-browser journals): saves the `.md` to the device and keeps the journal open. The status
  shows `in browser · not downloaded` until you do. After 3 days without a download, a reminder banner appears.
- **Safari warning:** on iPhone, iPad and Mac Safari a banner explains that Safari clears site storage after 7 days
  without a visit, and (on iPhone/iPad) to add Daycell to the home screen. It can be dismissed.
- **Persistent storage:** the app asks the browser to keep its storage (`navigator.storage.persist()`).
- **Eject** (the ⏏ button next to the file name, the file panel, or `/eject`):
  - In-browser journals: the file downloads, then the journal is cleared from the browser.
  - Live files: the file stays in its folder and the app just forgets it.
  - A short "ejected" animation plays, and an **undo** button stays up for 9 seconds, because browsers don't report
    whether a download finished.
- **Older-copy warning:** browsers rename repeat downloads (`journal (1).md`). If you open a copy older than the one
  you last downloaded in that browser, the app asks before opening it.
- **Installable and offline:** the app has a manifest, icons and a service worker (`web/`). Once visited, it opens
  with no connection. The page is fetched fresh when online, so updates show on the next open.
- **Streak image** (free; the image button on the status cell's streak line, insights, or `/streak`): a 1200×630 PNG
  with the streak, longest streak, entry and word counts and a 26-week grid. **It never contains entry text**, so
  sharing it is safe, and it carries the site's address, so every share works as an ad.
- **Import from Day One** (free; the start screen, the file panel or `/import`): pick Day One's JSON export (`.zip`
  or a single `.json`). Entries merge into the open journal, or into a new `day-one.md` if none is open. Dates and
  times are converted to each entry's own time zone; the first line becomes the title when it's short; tags carry
  over, plus `#starred`; with several journals in the zip, each entry is also tagged with its journal's name. Photos
  stay in Day One (each one leaves a note), and entries already in the journal (same date and time) are skipped.
- **Daily reminder** (file panel or `/remind`): downloads a calendar event (`.ics`) that repeats every day at the time
  you pick and links back to the app. Free.
- **Testing tip:** add `?storage=browser` to the URL to force the in-browser mode in Chrome/Edge.

---

## Price: free, every feature

**Decided 2026-10-13:** Daycell is **free, with every feature**: several journals, live files, the full-year grid and
year image, templates and accent colours included. There is no paywall, licence key or upgrade screen anywhere.

- This replaces the free + one-time Pro model (2026-10-11) and the Polar setup (2026-10-13). No real purchases were
  made; the Polar sandbox product can be left as it is.
- The licence function (`netlify/functions/license.mjs`), its tests and the `CHECKOUT_URL`, `PORTAL_URL`,
  `LAUNCH_ENDS` build settings were removed.
- **Netlify:** the old payment variables are unused and can be deleted (see [Deploying](#deploying-the-web-version)).
- **Ads:** not inside the app (see the decisions log and parked ideas).

---

## The website

`node tools/build.mjs` builds `dist/`:

| Path | From | What |
|---|---|---|
| `/` | `site/index.html` | landing page: hero, the file format, features, price (free), privacy, the maker poster with a "say hello" form, FAQ |
| `/privacy.html`, `/terms.html` | `site/` | privacy policy and terms (free to use, no payments) |
| `/app/` | `daycell.html` + `web/` | the app, its manifest, icons and service worker |
| `/fonts/` | `site/fonts/` | Inter and JetBrains Mono (plus Anton and Archivo for the maker poster only), self-hosted so visitors never contact Google |
| `/og.png` | `site/og.png` | share image for links |
| `/robots.txt`, `/sitemap.xml` | `site/` | tell search engines every page exists, at the real address (`__SITE_URL__` is filled by the build) |

The contact address on the site is `hello@daycell.app`. It forwards to Dip's inbox through Cloudflare Email
Routing, so there's no separate mailbox to check.

**The maker section** (`#maker`) is a window into a different design world on purpose: a street poster inside
Daycell's own frame, with its own paper, ink, square corners and type (Anton + Archivo), and it stays light in dark
mode. Its "say hello" form uses **Netlify Forms** (form name `hello`, a hidden spam trap, sent in the background with
`fetch`; without JavaScript it posts normally). To receive messages: Netlify → **Forms → enable form detection**, then
redeploy, then **Forms → hello → Form notifications → Email notification** to your inbox. The free tier takes 100
messages a month.

---

## Deploying the web version

The live site, [daycell.app](https://daycell.app), is on Netlify and deploys from `main`: every merge to `main` goes
live. The free tier is enough. To set it up from scratch:

1. In Netlify: **Add new site → Import from GitHub**, then pick the repo. `netlify.toml` runs `node tools/build.mjs`
   and publishes `dist/`.
2. **Site configuration → Environment variables:**

   | Variable | Needed? | What |
   |---|---|---|
   | `UMAMI_SRC`, `UMAMI_WEBSITE_ID` | optional | cookie-free analytics (Umami Cloud has a free tier) |
   | `SITE_URL` | optional | the public address for share links (Netlify's own `URL` is used otherwise) |

3. Deploy, then connect your domain. Changing a variable needs a redeploy (Deploys → Trigger deploy).

There are no payment or licence variables any more. If `CHECKOUT_URL`, `PORTAL_URL`, `LAUNCH_ENDS` or any `POLAR_*`
variable is still set in Netlify, it can be deleted: nothing reads it.

The site must be served over **HTTPS** (Netlify does this). Live files and the service worker require it.

**Analytics** only count events, never journal text: `journal-new`, `journal-open`, `first-entry`, `return-day3`,
`reminder`, `streak-card`, `year-card`, `import-dayone`, plus page views.

---

## Tests

- `npm ci` once, then `npm test`: builds `dist/` and runs the 14 Playwright smoke tests in `tests/smoke.spec.mjs`
  (Chromium). They cover the landing page and legal pages, writing and reloading, no paywall anywhere, journal
  switching, templates and accents, the year view and image, the reminder file, eject, the move from localStorage to
  IndexedDB, opening offline, Day One import (zip and JSON), the streak image and the status cell's spacing, the
  ticker and robot switching off and staying off with nothing fetched, and the maker poster with its form (including
  its size on a phone).
- First run on a new machine: `npx playwright install chromium`.
- `npm run check`: syntax checks with no browser (app script, service worker, manifest). For the launcher,
  `python -m py_compile daycell.py`.
- GitHub Actions (`.github/workflows/ci.yml`) runs all of these on every push and pull request.

---

## Security and privacy

- **The web version never receives journal text.** Entries stay on the user's device: in their file, or in their
  browser until ejected. The only thing sent anywhere is, if analytics
  are switched on, anonymous event counts. The ticker's lines ship inside the app.
- **Fonts are self-hosted** on the website, so visitors' browsers don't contact Google. (The launcher still loads
  them from Google Fonts.)
- **The launcher:**
  - Normal mode listens on this PC only (`127.0.0.1`).
  - iPad mode listens on the local network, but every device must be paired with the secret key from the QR code.
    Pairing sets a 1-year, HttpOnly cookie.
  - Unpaired devices get a "not paired" page, and requests with an unexpected `Host` are refused.
  - It only ever serves `daycell.html`, the icons and manifest from `web/`, and its own API, never `daycell.py`,
    `.daycell-key` or raw files from `Journals/`.
  - Writes are atomic (temp file then rename), so a crash can't leave a half-written journal.
- **Hosting** publishes only `dist/` (the site and the app). `Journals/` is never uploaded.
- **Storage keys** in the browser always use the fixed prefix `daycell-` (the `STORE_KEY` constant), and in-browser
  journals are stored in IndexedDB as `journal:<name>`. Renaming the app can't make anyone's saved journal disappear.
- **The source is public to read**, with all rights reserved (see `LICENSE`). Git history was checked for secrets and journal content on 2026-10-11.

---

## Renaming the app

1. In `daycell.html`, edit `const APP = { name: 'Daycell', slug: 'daycell', glyph: 'd/' }`. This changes the title,
   wordmark, logo, status cell and messages.
2. **Do not change `STORE_KEY`** (`'daycell'`), or saved data is orphaned. It was `'daybook'` until 2026-10-11;
   `migrateStorage()` moves old `daybook-` browser keys over, `loadHandle()` falls back to the old `daybook`
   IndexedDB, and the launcher renames an old `.daybook-key` to `.daycell-key` so paired iPads keep working.
3. Rename the `.bat` files and update the text in them, and in `daycell.py` (window title and printed messages).
   The file names `daycell.html` and `daycell.py` can stay as they are, or be renamed together with
   `netlify.toml` and the `.bat` files.

---

## Naming

Candidates were checked against app stores and journaling-app lists (web search only, on 2026-10-07):

| Name | Idea | Clash found |
|---|---|---|
| **Daycell** (favourite) | one cell per day, like a notebook | none found |
| Daydiff | "the diff of your day" | only date-calculator apps called DateDiff |
| Dayfile | "your days, in one file" | none found |
| stdin | "standard input for your life" | none, but a generic programming term that's hard to search |
| Entrypoint | a journal *entry* and a code *entry point* | none found, but a generic word |

**Already taken or crowded:** Daybook, Day One, Day Log, Daylio, DayPlus, Inkwell (several apps).

**Checked on 2026-10-11 (web search only):** no app or software product called Daycell turned up. The only
trademark found is **DAYCELL COSMETICS Co., Ltd.** (Korean cosmetics, a different class from software). The
domain **daycell.app** is now in use.

**Reported on 2026-10-14:** Google's AI Mode, asked "who made daycell.app", described a different app called
Daycell (a year-at-a-glance tracker on iOS and Android, by Ramazan Çapaci) and credited it with our domain. Web
search from here could not find that listing, so it is unconfirmed; Google cited the App Store for it. Our site now
says plainly that Daycell is a web app and isn't on the app stores. If the other app is real, it's a different
category (year planner, not a markdown journal), but it shares the name: worth including in the trademark search.

**Before launch:** search the UK trademark register (UKIPO) and the US one (USPTO). Reddit couldn't be searched from here; it can be checked by hand or through Claude in Chrome.

---

## Decisions log

| Date | Decision | Why |
|---|---|---|
| 2026-10-02 | One `.md` file per journal, `##` per entry, `key:: value` metadata | Readable by people and by Obsidian; easy to hand-edit |
| 2026-10-02 | Notebook / "techy minimal" design, no cursive fonts | User preference; stands apart from paper-style journal apps |
| 2026-10-02 | Trash lives in a `# Trash` section of the same file | It travels with the journal; restorable until emptied |
| 2026-10-02 | Local launcher (`daycell.py`) instead of browser file pickers | Reliable saving to a known file, in any browser |
| 2026-10-07 | Import/export buttons removed from the launcher | Not needed when saving straight to the file |
| 2026-10-07 | Personality: prompts, streaks, insights, voice, command palette | Make it memorable and shareable (the streak grid is the marketing visual) |
| 2026-10-07 | iPad access via opt-in LAN mode, paired by QR + secret key | Lets an iPad write to the PC's journal without exposing it to the network |
| 2026-10-07 | Conflict-safe saving (version check + merge) | Two devices on one file must never silently lose entries |
| 2026-10-07 | Web version: **no accounts** | The server never stores journals, so accounts would add cost and risk for no benefit |
| 2026-10-07 | Web version: open/eject model; live file on Chrome/Edge, in-browser copy elsewhere | Clear ownership story; nothing lost if the tab closes |
| 2026-10-07 | $5 one-time licence key via Lemon Squeezy, 2-day trial | Simple for a small price; Lemon Squeezy handles tax and key emails |
| 2026-10-13 | Payments move from Lemon Squeezy to **Polar** | Lemon Squeezy declined the store application. Polar is also a merchant of record (VAT handled), has licence keys with an activation limit, lists the UK for payouts and prices in GBP. The app-facing licence API did not change |
| 2026-10-07 | Never lock reading/eject behind the paywall | Trust, reviews, and the "your file" promise |
| 2026-10-07 | Accept that a client-side licence can be bypassed | At $5 it's an honesty system; anti-piracy effort isn't worth it |
| 2026-10-11 | Name: **Daycell**, internals included (files, storage keys, stamp, default journal `daycell.md`) | No journaling app clash found; old `daybook` data is migrated automatically |
| 2026-10-11 | **Free forever + one-time Pro** instead of a 2-day trial; writing is never locked | The free version keeps the essence; habits take weeks to form, and the free tier is the marketing |
| 2026-10-11 | **Pro: £12 once, £9 in launch week** (was $5) | At $5, fees take ~15% and it reads as a toy; still far below Day One's $49.99/yr |
| 2026-10-11 | Pro = more journals, live files, a year of insights + share image, templates, accent colours | Costs nothing to run (all in the browser); gates extras, never your own writing |
| 2026-10-11 | In-browser journals move to IndexedDB, request persistent storage, warn Safari users | Safari clears site storage after 7 days without a visit; localStorage caps at ~5 MB |
| 2026-10-11 | Installable web app with a service worker | A journal has to open offline |
| 2026-10-11 | Landing page at `/`, app at `/app/`; self-hosted fonts; cookie-free analytics (optional) | People need to understand the product before starting a journal; privacy story stays clean |
| 2026-10-11 | **Code goes public** under **FSL-1.1-MIT** | Builds trust with developers; blocks competing copies; becomes MIT after two years |
| 2026-10-11 | Daily reminder as a downloadable calendar event | Reminders drive journaling habits; no server or push needed |
| 2026-10-11 | Free streak share image with no entry text | Sharing it is safe, and each share is an ad the user chose to post (from the marketing thread) |
| 2026-10-11 | Free import from Day One's JSON export | Switching should cost nothing; Day One users are the main subscription-tired audience |
| 2026-10-13 | **Everything free.** No Pro, no licence keys; the Polar setup is dropped | Dip's call: grow first and use Daycell to show Dip's work. A free journal with no catch is the easiest thing to share |
| 2026-10-13 | **Redesign:** warm neutrals, off-white light mode, a one-job accent, solid borders except the `[~]` cell, a small motion set, a notebook start screen | Remove the generic look and the glare in light mode while keeping the notebook foundations (approved from a clickable preview) |
| 2026-10-13 | `daycell.today()` gets a ticker line and a tiny robot, each with an off button | Personality without clutter; the lines are bundled, so it stays offline and private |
| 2026-10-13 | **Maker section as a street poster** ("Because why not.", rules I keep, a "say hello" form) that deliberately doesn't match the site, and keeps its light paper in dark mode | Dip wanted the "who I am" part to feel like a window into another world. Picked over a broadsheet and a paperback (mockups in the project files). Anton + Archivo are allowed inside the poster only; the rest of the site stays Inter + JetBrains Mono |
| 2026-10-13 | The maker is named **Dip Raiyan** everywhere (privacy page, poster, footer, `meta author` and schema.org JSON-LD) and the window bar no longer says "vicarious" | Google's AI answer called Dip "an alias" writing under the "vicarious" umbrella, because the privacy page said only "an independent developer" and the bar label read like a brand |
| 2026-10-13 | **Licence: all rights reserved**, replacing FSL-1.1-MIT before the repo goes public | A licence can be loosened later but not tightened; it stops someone cloning Daycell and running it with their own ads, and people can still read the code to check their journal never leaves their device |
| 2026-10-13 | No news in the ticker, no ad networks in the app | Both need a third-party request on every open, which breaks offline use and the "nothing leaves your device" promise |
| 2026-10-14 | `robots.txt` + `sitemap.xml`, schema.org as one linked graph (app, site, Person with `@id`), the app page gets `meta author`, and a "Who makes Daycell?" FAQ saying it isn't on the app stores | Google's AI answer credited daycell.app to the maker of a different Daycell app; the site had no sitemap, so Google had little of its own to go on |

---

## Known limitations

- **Same-entry edits on two devices:** if both edit the same entry at once, the last save wins (new entries are
  always merged safely).
- **The iPad mode needs the PC switched on** and on the same Wi-Fi.
- **Safari can clear in-browser journals** after 7 days without a visit unless the app is on the home screen. The app
  warns about this and nudges downloads; it can't prevent it.
- **The journal switcher covers in-browser journals.** Live files are one at a time (open another to switch).
- **The QR code** loads a small library from cdnjs. If you're offline, use the address printed in the launcher window.
- **Older-copy warnings** only know about downloads made in the same browser.
- **Entries are matched across devices by date + time**, so two different entries saved in the same minute on two
  devices would be treated as one during a merge (rare).

---

## What's been tested (and what hasn't)

**Tested:**
- **Launcher:** saving, reading back, hand-edited files, trash, switching between journals, autosave.
- **Two devices on one file:** concurrent saves merge without loss, and the app picks up changes when you return to it.
- **iPad mode security:** unpaired devices and wrong keys refused; private files never served; foreign `Host` header
  refused; conflict detection.
- **Layout:** desktop (1400px), iPad landscape and portrait, iPad mini, and phone with touch mode, including the
  editor, panels, backdrop and tap-to-edit.
- **Web version (the earlier $5 trial build, 2026-10-07):** start screen, creating and naming a journal, autosave surviving a reload, download (with the
  stamp), eject and undo, opening an older copy (warning shown), the paywall after the trial, wrong and right keys,
  refunded key locking writing, offline never locking.

**Tested on 2026-10-11 (automated, `npm test`, Chromium):** landing page and legal pages; free writing surviving a
reload; free users getting the upgrade dialog for every Pro feature; Pro journal switching, templates (an untouched
template is discarded), accent colours, the year view and image; the reminder `.ics`; eject clearing IndexedDB; an
older localStorage-only journal being moved to IndexedDB; the app reopening offline. The launcher was re-checked by
hand with a scratch journal (reads, writes, serves the manifest, no service worker).

**Tested on 2026-10-13 (redesign, automated and by screenshot, Chromium):** every former Pro feature opens with no
dialog; no paywall text left in the panel or palette; the ticker and robot switch off and stay off after a reload; a
commit makes the robot hop; no request leaves the site. Screenshots checked at desktop and phone width in light and
dark.

**Tested on 2026-10-13 (landing page):** the maker poster renders, its "say hello" form posts to Netlify Forms, and on
a phone the poster window stays within 80% of the screen and scrolls inside.

**Not tested yet:**
- **A real iPad:** the Safari camera/QR scan and the home-screen flow end to end.
- **The QR image** (the test setup couldn't load the library).
- **The Windows firewall prompt** (deliberately not triggered).
- **Safari and Firefox** for the new storage, service worker and banners (the tests run in Chromium).
- **Chrome/Edge live-file pickers in the web version** (file dialogs can't be driven in the test browser; the same
  code path already worked in the earlier version).

---

## Next steps

The live list is [`TASKS.md`](TASKS.md). In short:

1. **Dip:** delete the old payment variables in Netlify, turn on the form notification for `hello`, make the repo
   public, trademark search, HMRC/ICO checks, a real iPad test. (The domain and `hello@daycell.app` are done.)
2. **Marketing:** lives in `marketing/` (a separate thread).
3. **Next features:** more ticker lines and robot moves, passphrase
   encryption, export to a styled book, images in entries, web push reminders, and the Tauri desktop app.

### Parked ideas

**Made by Dip, still open** (2026-10-13). The poster section is built. Still to add once Dip shares them: a photo
or sketch, more links (LinkedIn, Instagram), and possibly a small "made by Dip" link in the app's file panel. The
broadsheet direction ("The Vicarious") was liked too and is kept as a reference for a later page.

**Money without a paywall** (discussed 2026-10-13). A "support Daycell" tip link (Ko-fi or GitHub Sponsors); a
sponsor slot on the website and README. Later, at a few thousand daily writers, possibly one clearly labelled
sponsor line bundled into the ticker: no script, no cookies, no tracking, at most once a day, hidden by the same off
button. Ad networks (AdSense, even EthicalAds) are ruled out inside the app; EthicalAds also needs 50,000+ pageviews
a month and pays about $2.50 per 1,000 views.

**More personality** (2026-10-13). Grow the ticker towards ~300 lines and more "on this day" dates, add robot moves.
News stays out unless it can come from our own server, opt-in.

**Images in entries** (discussed 2026-10-08, parked).
- **What it would do:** paste an image (or tap 📎 on touch screens). It shows as a small attachment chip in the
  entry, and tapping it opens the image in a popup (Esc or ✕ closes it; arrow keys move between images).
- **Recommended approach:** embed the images *inside* the `.md`, so the journal stays one file that can be ejected.
  - Resize to about 1600px and compress on paste (about 150–300 KB per image).
  - Keep entries readable with reference tags (`![photo][img-3]`) and put the image data in an `# Attachments`
    section at the bottom of the file, like `# Trash`.
  - For in-browser journals, move storage from `localStorage` (about 5 MB) to IndexedDB (hundreds of MB).
- **Trade-off:** the file grows, roughly 5 MB per 20 photos.
- **Rejected alternative:** a `journal.assets/` folder next to the file. It keeps the `.md` small, but download and
  eject would become a zip, and Chrome/Edge would need access to a whole folder.
