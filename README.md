# Daycell

A journal app that looks like a coding notebook and stores everything in **one plain markdown file you own**.
No account, no cloud. Each entry is a "cell"; your journal is a `.md` file you can open in any text editor.

> **Renamed from "Daybook" to Daycell on 2026-10-11.** An established app called "Daybook: AI Journal & Diary"
> already exists on iOS and Android. See [Naming](#naming).

---

## Contents

- [Quick start](#quick-start)
- [What's in this folder](#whats-in-this-folder)
- [The journal file format](#the-journal-file-format)
- [Features](#features)
- [Three ways it runs](#three-ways-it-runs)
- [Web version: open, download and eject](#web-version-open-download-and-eject)
- [Pricing, trial and licence keys](#pricing-trial-and-licence-keys)
- [Deploying the web version](#deploying-the-web-version)
- [Security and privacy](#security-and-privacy)
- [Renaming the app](#renaming-the-app)
- [Naming](#naming)
- [Decisions log](#decisions-log)
- [Known limitations](#known-limitations)
- [What's been tested (and what hasn't)](#whats-been-tested-and-what-hasnt)
- [Next steps](#next-steps)

---

## Quick start

**On this PC:** double-click **`Start Daycell.bat`**. It opens the app in your browser and saves every entry to
`Journals/daycell.md`. Keep the black launcher window open while you write; close it to stop.

**On your iPad or tablet as well:** close the normal launcher and double-click **`Start Daycell (iPad & tablet).bat`**.
Then in the app click the **folder icon** (left rail) and scan the QR code with the iPad's camera. Both devices
must be on the same Wi-Fi and the PC must be on. The first time, Windows may ask about the firewall: allow
**private networks only**.

Requires Python 3 (already installed on this PC). No other installs.

---

## What's in this folder

| File | What it is |
|---|---|
| `daycell.html` | The whole app (UI + logic) in one file. The same file runs locally and as the web version. |
| `daycell.py` | Local launcher/server. Serves the app and reads/writes journals in `Journals/`. |
| `Start Daycell.bat` | Starts the launcher for this PC only. |
| `Start Daycell (iPad & tablet).bat` | Starts the launcher with iPad/tablet access over your Wi-Fi (`--lan`). |
| `Journals/` | Your journals (`daycell.md`, plus any others you create). **Private: never published or committed.** |
| `netlify.toml` | Hosting config for the web version. Publishes only `daycell.html` (as `index.html`). |
| `netlify/functions/license.mjs` | Tiny server function that checks licence keys with Lemon Squeezy. |
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
  status bar. Fonts are Inter and JetBrains Mono, with light and dark themes.
- **Autosave:** text is saved about a second after you stop typing. **Shift+Enter** commits the cell.
- **Trash:** the bin moves an entry to the trash with a 5-second undo. Restore it, delete it forever, or empty the
  trash.
- **Status cell `[~]`** at the bottom, where the app opens:
  - a greeting, your streak and this week's stats
  - an "on this day" link to an entry from the same date in an earlier year, or from 30 days ago
  - today's writing prompt
- **Daily prompts:** 30 prompts in a dev-flavoured voice ("if today had a commit message, what would it be?").
  You can shuffle them or use one in a new entry.
- **Insights panel:**
  - streak and longest streak, entry and word totals
  - a GitHub-style activity grid of the last 22 weeks; click a square to jump to that day
  - mood trend and top tags
- **A voice:** playful save messages and streak milestones (3, 7, 14, 30, 50, 100, 365 days).
- **Command palette** (`/` or Ctrl+K): `/new`, `/prompt`, `/today`, `/random`, `/stats`, `/search`, `/trash`,
  `/files`, `/theme`, `/save`, `/download`, `/eject`, `/unlock`.
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

| Mode | How you start it | Where entries live | Paywall |
|---|---|---|---|
| **Launcher** (personal use) | `Start Daycell.bat` | `Journals/*.md` on this PC | never |
| **Launcher + iPad** | `Start Daycell (iPad & tablet).bat` | `Journals/*.md` on this PC; the iPad writes into the same file | never |
| **Web version** (the product) | open the hosted website | a live file on the user's device (Chrome/Edge) or the browser until ejected (others) | trial, then $5 |

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

What happens next depends on the browser.

| Browser | How the journal is kept |
|---|---|
| **Chrome / Edge (desktop)** | **Live file.** The app saves straight into the `.md` you created or picked. Nothing to download. After a restart, one click reconnects it. |
| **Safari, Firefox, iPad, phones** | **Kept in the browser.** Every keystroke is saved in the browser, so closing the tab loses nothing. Use **download a copy** for a backup, or **eject** to take it with you. |

- **Download a copy** (in-browser journals): saves the `.md` to the device and keeps the journal open. The status
  shows `in browser · not downloaded` until you do. After 3 days without a download, a reminder banner appears.
- **Eject** (the ⏏ button next to the file name, the file panel, or `/eject`):
  - In-browser journals: the file downloads, then the journal is cleared from the browser.
  - Live files: the file stays in its folder and the app just forgets it.
  - A short "ejected" animation plays, and an **undo** button stays up for 9 seconds, because browsers don't report
    whether a download finished.
- **Older-copy warning:** browsers rename repeat downloads (`journal (1).md`). If you open a copy older than the one
  you last downloaded in that browser, the app asks before opening it.
- **Testing tip:** add `?storage=browser` to the URL to force the in-browser mode in Chrome/Edge.

---

## Pricing, trial and licence keys

**Model:** free for 2 days, then **$5 once** (no subscription), unlocked with a licence key. Sold through
**Lemon Squeezy**, which handles VAT/sales tax as merchant of record and emails the key to the buyer automatically.

**Rules decided:**
- **The trial** starts when the user first creates or opens a journal. It's counted in the browser, so clearing site
  data resets it. That's accepted at this price.
- **After the trial, only writing is locked** (new entries and edits). Reading, search, insights, download and eject
  stay free, so nobody is ever locked out of their own journal.
- **Activation:** the key is checked once per device, and it works offline after that.
- **Monthly re-check:** the key is quietly re-checked about every 30 days when online. If the check fails because
  of being offline or a server problem, nothing locks. If Lemon Squeezy says the key is refunded or disabled,
  writing locks and reading stays.
- **Device limit:** the activation limit is set in Lemon Squeezy (recommended: **5 devices**). Users can free one with
  **remove this device** in the file panel.
- **Lost keys:** the unlock dialog links to Lemon Squeezy's order lookup ("lost your key?").
- **The launcher never shows the paywall.** It's for personal use.

**Licensing is switched off until you set it up.** In `daycell.html`, find the `LICENSE` settings:

```js
const LICENSE = {
  price: '$5',
  trialDays: 2,
  checkoutUrl: '',  // paste your Lemon Squeezy checkout link here; licensing stays off until you do
  recoverUrl: 'https://app.lemonsqueezy.com/my-orders',
  endpoint: '/api/license',
  recheckDays: 30,
};
```

**Setting up Lemon Squeezy (you do this; it needs your identity and bank details):**
1. Create a Lemon Squeezy account and store.
2. Create a product priced at $5, a single payment.
3. Turn on **license keys** for the product and set the activation limit (5 recommended).
4. Copy the product's checkout link into `checkoutUrl`.
5. Note your **store ID** and **product ID** for the deploy step.

**Why there's a server function:** Lemon Squeezy's licence API blocks calls made directly from web pages, so
`netlify/functions/license.mjs` forwards them. It also:
- rejects keys that belong to someone else's Lemon Squeezy product (checked against your store and product IDs)
- strips the buyer's name and email before anything reaches the browser
- only allows `activate`, `validate` and `deactivate`

---

## Deploying the web version

Netlify (free tier is enough):

1. Put this folder in a GitHub repository. `.gitignore` keeps `Journals/` and `.daycell-key` out.
2. In Netlify: **Add new site → Import from GitHub**, then pick the repo. `netlify.toml` already sets the build:
   it copies `daycell.html` to `dist/index.html` and publishes only that.
3. **Site configuration → Environment variables:** add `LS_STORE_ID` and `LS_PRODUCT_ID`.
4. Deploy, then (optionally) connect your domain.
5. Set `checkoutUrl` in `daycell.html`, commit, and Netlify redeploys.

The site must be served over **HTTPS** (Netlify does this). Live-file saving in Chrome and Edge requires it.

---

## Security and privacy

- **The web version never receives journal text.** Entries stay on the user's device: in their file, or in their
  browser until ejected. The only thing sent anywhere is the licence key, during activation and the monthly check.
- **The launcher:**
  - Normal mode listens on this PC only (`127.0.0.1`).
  - iPad mode listens on the local network, but every device must be paired with the secret key from the QR code.
    Pairing sets a 1-year, HttpOnly cookie.
  - Unpaired devices get a "not paired" page, and requests with an unexpected `Host` are refused.
  - It only ever serves `daycell.html` and its own API, never `daycell.py`, `.daycell-key` or raw files from `Journals/`.
  - Writes are atomic (temp file then rename), so a crash can't leave a half-written journal.
- **Hosting** publishes only `index.html` plus the licence function. Your `Journals/` folder is never uploaded.
- **Storage keys** in the browser always use the fixed prefix `daycell-` (the `STORE_KEY` constant), even after a
  rename, so renaming can't make anyone's saved journal disappear.

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
trademark found is **DAYCELL COSMETICS Co., Ltd.** (Korean cosmetics, a different class from software). Domain
lookups were blocked from Claude's environment, so availability of daycell.com / daycell.app is unconfirmed.

**Before launch:** check the domain, and search the UK trademark register (UKIPO) and the US one
(USPTO). Reddit couldn't be searched from here; it can be checked by hand or through Claude in Chrome.

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
| 2026-10-07 | Never lock reading/eject behind the paywall | Trust, reviews, and the "your file" promise |
| 2026-10-07 | Accept that a client-side licence can be bypassed | At $5 it's an honesty system; anti-piracy effort isn't worth it |
| 2026-10-11 | Name: **Daycell**, internals included (files, storage keys, stamp, default journal `daycell.md`) | No journaling app clash found; old `daybook` data is migrated automatically |

---

## Known limitations

- **Same-entry edits on two devices:** if both edit the same entry at once, the last save wins (new entries are
  always merged safely).
- **The iPad mode needs the PC switched on** and on the same Wi-Fi.
- **The trial can be reset** by clearing site data or using a private window (accepted).
- **The licence check can be removed** by someone editing the page's code (accepted).
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
- **Web version:** start screen, creating and naming a journal, autosave surviving a reload, download (with the
  stamp), eject and undo, opening an older copy (warning shown), the paywall after the trial, wrong and right keys,
  refunded key locking writing, offline never locking.
- **Licence function** (with faked Lemon Squeezy replies): activation, foreign-product rejection, personal data
  stripped, bad requests refused.

**Not tested yet:**
- **A real iPad:** the Safari camera/QR scan and the home-screen flow end to end.
- **The QR image** (the test setup couldn't load the library).
- **The Windows firewall prompt** (deliberately not triggered).
- **Real Lemon Squeezy calls** and a **real Netlify deploy** (they need your accounts).
- **Chrome/Edge live-file pickers in the web version** (file dialogs can't be driven in the test browser; the same
  code path already worked in the earlier version).

---

## Next steps

1. ~~**Pick a name** and rename~~ Done 2026-10-11: **Daycell**. Still to do by hand: register the domain and run
   a proper UKIPO/USPTO search (see [Naming](#naming)).
2. **Set up Lemon Squeezy** (product, licence keys, activation limit 5), then paste the checkout link.
3. **Deploy to Netlify** with `LS_STORE_ID` / `LS_PRODUCT_ID` set; do one real purchase in test mode.
4. **Try it on a real iPad** (web version and launcher iPad mode).
5. **Marketing:**
   - short vertical videos: "your journal is just a .md file", "commit your day", the streak grid filling up
   - launch posts on Reddit (r/ObsidianMD, r/journaling, r/productivity), Show HN and Product Hunt
   - an Instagram page, which you create; posts only go out with your go-ahead
6. **Later:** a downloadable desktop app (Tauri) for an even stronger "your file, your computer" story.

### Parked ideas

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
