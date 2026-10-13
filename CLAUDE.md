# CLAUDE.md

Context for working on this project in a new session. **Read `README.md` too.** It's the product reference: features,
file format, the three run modes, pricing rules, deploy steps, the decisions log, and what's been tested.

## What this is

**Daycell** (renamed from the working name Daybook on 2026-10-11) is a journal app with a Jupyter/marimo-style "notebook" UI.
All entries live in **one plain `.md` file** per journal. It's being turned into a web product: no accounts, users
own the file. **Free, with every feature** (decided 2026-10-13; the earlier free + £12 Pro model and Polar are gone). The repo is
going public under FSL-1.1-MIT. The launch checklist is `TASKS.md`; marketing lives in `marketing/` (owned by a
separate thread, leave it alone).

## Golden rules

- **`Journals/daycell.md` holds the user's real, private journal entries.** Never write to it, overwrite it or
  "reset" it during development or tests, and don't read its contents unless the user asks. Test against copies in
  the scratchpad.
- **The `daycell` config in `.claude/launch.json` runs the launcher against the real `Journals/` folder.** Don't use
  it for testing. Add temporary test configs instead (see [Testing](#testing)), then restore `launch.json` to the
  single `daycell` config afterwards.
- **Never run broad process-kill commands** (e.g. `taskkill /FI "WINDOWTITLE eq *"`). Stop servers by PID or with
  `preview_stop`.
- **Never bind the launcher to the network during tests** (`--lan` with `0.0.0.0`). It pops a Windows Firewall
  dialog on the user's screen. Test LAN logic as described in [Testing](#testing).
- **The user does the outward-facing account work:** Netlify, domain, Instagram. Posting or
  publishing anything needs their explicit go-ahead each time.
- **Keep `README.md` updated** when behaviour, decisions or setup steps change. The user asked for all important
  info to be recorded there, including the decisions log and parked ideas.

## The user

- Based in the UK (timestamps are BST/GMT). Works on Windows 11 with Git Bash, PowerShell and Python 3.10. Node is
  available.
- **Design taste:** techy, minimal, notebook-like. **No cursive or decorative fonts** (Inter + JetBrains Mono only; the one exception is the landing page's maker poster, which uses Anton + Archivo on purpose),
  and it should not look like a paper journal.
- Likes things built and tested rather than just discussed, but sometimes parks ideas ("we'll look back at it later").
  Record parked ideas in the README.
- Reddit is blocked for Claude in both the built-in browser and WebSearch. Claude in Chrome could reach it if the
  user agrees.

## Files

| File | Role |
|---|---|
| `daycell.html` | The entire app: CSS, markup and JS in one file (~2,000 lines). The same file runs under the launcher and as the hosted web version. |
| `daycell.py` | Local server. Serves only `/daycell.html` plus an API, and reads/writes `Journals/*.md`. Flags: `--lan`, `--no-browser`, `--port=NNNN`. |
| `Start Daycell.bat` / `Start Daycell (iPad & tablet).bat` | Launchers (the second adds `--lan`). |
| `web/` | Manifest, icons and `sw.js` for the app. The launcher serves the manifest and icons (not the service worker). |
| `site/` | Landing page, privacy, terms, `site.css`, self-hosted fonts, `og.png`. Placeholders `__SITE_URL__`, `__REPO_URL__` and `<!--analytics-->` are filled by the build. |
| `tools/build.mjs` | Builds `dist/` (site at `/`, app at `/app/`), swaps Google Fonts for the self-hosted ones and fills `ANALYTICS` from env (`UMAMI_SRC`, `UMAMI_WEBSITE_ID`). |
| `tools/check.mjs`, `tests/`, `playwright.config.mjs` | Syntax checks and Playwright smoke tests (`npm test`). CI in `.github/workflows/ci.yml`. |
| `netlify.toml` | Web hosting: runs the build and publishes `dist/`. There is no server function any more. |
| `.gitignore` | Excludes `Journals/`, `.daycell-key`, `dist/`, caches. |
| `.daycell-key` | Created by `--lan` mode: the QR pairing secret. Never served, never committed. |

## How `daycell.html` is organised

The CSS sections are marked `/* ---------- name ---------- */` and the JS sections `/* ============ name ============ */`.
In order:

1. **icons:** `P` (Lucide SVG paths) and the `I(name, size)` helper.
2. **identity + voice:**
   - `APP = { name, slug, glyph }` is the one place to rename the app.
   - `STORE_KEY = 'daycell'` is the browser storage prefix. **Never change it**, or users' saved data is orphaned.
     (It was `'daybook'` before 2026-10-11; `migrateStorage()` moves old keys.)
   - `VOICE` (toast lines, milestones) and `PROMPTS` (30 daily prompts).
3. **stats:** `computeStats(excludeId)` returns streak, longest, week stats, tags, moods and on-this-day.
4. **markdown file format:** `parse(text)` returns `{ preamble, entries, savedStamp }`; `serialize()` turns state
   back into the file. Entries are `{ id, date, time, title, body, mood, tags, deleted }`. A `# Trash` section holds
   entries with `deleted`. `<!-- daycell:saved ISO -->` (the download stamp) is lifted out of the preamble.
5. **tiny markdown renderer:** `renderMd`, `inline`. All user text goes through `esc()`.
6. **file I/O:**
   - A **target** is where the journal saves: `serverTarget(name)` (launcher API with version check and 409 merge),
     `handleTarget(h)` (File System Access, Chrome/Edge) or `browserTarget(name)` (web: IndexedDB key
     `journal:<name>` in the `daycell` db's `kv` store; falls back to the localStorage copy for pre-IndexedDB journals).
   - `writeFile()` always caches the markdown in `localStorage` (`daycell-md`), then `target.write()` runs through a
     promise chain.
   - `connect(target)`, `mergeRemote()` (matches entries across devices by `entrySig = date + ' ' + time`) and
     `refreshFromServer()` (runs on focus/visibility and every 20 s).
7. **web version:**
   - `webMode()` is `!state.server && !state.unpaired`.
   - The **mount** (`daycell-mount`) is `{ name, kind: 'handle' | 'browser', downloadedHash, lastDownload }`.
     `setMount()` also upserts browser mounts into the **library** (`daycell-library`), the list of journals kept in
     this browser; `switchJournal(name)` hops between them; `forgetJournal` runs on eject.
   - `settle()` exits edit mode and flushes the write before switching or opening another journal.
   - `IOS`, `MAC_SAFARI`, `STANDALONE` and `safariWarning()` drive the 7-day storage banner; `askPersist()`.
   - `startNew`, `startOpen`, `openUploaded` (with the older-copy warning), `downloadMd` (adds the stamp, records it
     in `daycell-exports`), `eject` (with a 9 s undo) and `startHtml()` (the start screen).
   - `LIVE_FILES` is false with `?storage=browser` and in browsers without the File System Access API.
8. **free:** there is no paywall (removed 2026-10-13); every feature works in every mode. Don't reintroduce
   `needPro`/`isPro`; if money comes back, read the README's parked ideas first.
9. **entry actions:** `newEntry(prompt, tpl)` and `startEdit`. Also `syncEditor`, `exitEdit` (toasts, milestones;
   drops an untouched template; `e.fresh`/`e.tpl` are transient flags), `revert`, `trash`/`restore`/`purge`/
   `emptyTrash` (purges are remembered in `state.purged` so merges can't resurrect them) and `jumpTo`.
10. **rendering:**
    - Templates are built with `innerHTML`, including `renderCells`.
    - The start screen (`daycell.start()` plus `[1]`–`[3]` option cells) shows when web mode has no target, and the
      status cell `[~]` sits at the **bottom**.
    - **today cell: ticker line + robot** (its own section just before rendering): `TICKER` (bundled lines) and
      `ON_THIS_DAY` (`MM-DD` keys), `nextLine()` types a line out and holds it 12 s (paused while editing or hovered);
      `BOT_SVG`, `bot(move, ms, then)` plays a CSS class on `#bot` 30 ms later (so it survives a re-render),
      `botCommit`, `botCheer`, `pokeBot`, `sleepBot`/`wakeBot`, `botIdle()`. `toggleTicker`/`toggleBot` store
      `daycell-ticker`/`daycell-bot` = `off`. `state.flashId` marks a just-committed cell for the one-off sweep.
    - Also `cellHtml`, `renderPanel`/`renderPanelBody` (contents, insights, trash, files), `insightsHtml` (22 weeks, or
      53 with `state.heatYear`),
      `deviceHtml` (iPad QR, which lazy-loads qrcodejs from cdnjs), `setStatus` and `renderChrome`.
    - After `applyTheme`: `ACCENTS`/`accentCss()`/`applyAccent`/`chooseAccent`, `TEMPLATES`/`newFromTemplate`,
      `downloadReminder()` (`.ics`), `saveBlob`, `drawCard()` shared by `streakCard()` and `yearCard()`
      — share images never draw entry text, `ANALYTICS`/`loadAnalytics`/
      `track(event)` (Umami; counts only, never entry text).
    - **import from Day One:** `startImport()` → `#importInput` → `importDayOne(file)`; `unzipJson()` is a tiny zip
      reader (stored or deflate via `DecompressionStream`), `fromDayOne()` maps entries, `localParts()` converts to the
      entry's time zone.
11. **command palette:** the `COMMANDS` list. `openPalette(q)` can prefill (the editor's "template" button uses it).
12. **events:** handled by delegation on `#cells` (`data-act`, `data-mood`), `#panel` (`data-fact`, `data-tact`,
    `data-sfile`, `data-date`, `.row`) and a global `keydown` (command-mode keys: b, Enter, j/k, d d, /, Ctrl+K,
    Ctrl+S).
13. **boot:** `init()` detects the launcher (`GET /api/files`). Otherwise it's the web path: reopen the mounted
    journal (reading it from IndexedDB and writing it back, which migrates localStorage-only journals) or show the
    start screen. `webExtras()` (web only) registers `sw.js`, loads analytics and counts a day-3 return.

**Styling:**
- Colour tokens live on `:root`. Dark mode is defined twice: under `prefers-color-scheme` (guarded by
  `:not([data-theme="light"])`) and under `[data-theme="dark"]`.
- Breakpoints: `max-width: 900px` makes the side panel an overlay with a `#scrim` backdrop; `600px` is phone
  layout; `(hover: none) and (pointer: coarse)` is touch mode (16px inputs, always-visible actions, tap-to-edit).
- `[hidden] { display: none !important; }` is required, because `.ib` and `.btn` set `display`.

## `daycell.py` API

- `GET /api/files` returns `{ dir, files, remote }`, plus `lan: { url, address }` for local requests in `--lan` mode.
- `GET /api/file?name=x.md` returns `{ name, exists, text, version }`, where `version` is the file's mtime in ns.
- `PUT /api/file?name=x.md` with header `X-Base-Version`. If the file changed since that version it returns `409`
  with the latest text, and the client merges and retries. Writes are atomic (temp file then `os.replace`) under a lock.
- Security:
  - `Host` must be localhost or 127.0.0.1 (or the LAN IP in `--lan` mode).
  - Non-local clients need the `daycell_key` cookie, set by visiting `/?key=SECRET`.
  - Only `/daycell.html` is served as a static file.

## Testing

- **Automated (do this first):** `npm ci` once, then `npm run check` (syntax) and `npm test` (builds `dist/` and runs the Playwright smoke tests against `python -m http.server 5180`). In the cloud container,
  Chromium is preinstalled for Playwright 1.56.1. Add a test to `tests/smoke.spec.mjs` for new behaviour.
- **Syntax:**
  - `npm run check` covers the app script, `web/sw.js` and the manifest.
  - Run `python -m py_compile daycell.py`, then delete the `__pycache__/` it creates.
- **UI (web/browser mode):**
  - Copy `daycell.html` into a scratchpad folder and add a temporary launch config:
    `python -m http.server 5180 --directory <scratch>` (or serve `dist/` after `node tools/build.mjs`).
  - Open `http://localhost:5180/daycell.html?storage=browser`, then seed data with JS (`state.entries = [...]`,
    `renderAll()`).
  - Stub downloads (`HTMLAnchorElement.prototype.click`) so nothing lands in the user's Downloads folder.
  - Clear that origin's `localStorage` and IndexedDB afterwards.
- **Launcher:** copy `daycell.py` and `daycell.html` into a scratch folder with its own `Journals/`, then run
  `python <scratch>/daycell.py --no-browser --port=8797` from a temporary launch config.
- **LAN/pairing logic:** import `daycell` in Python with `sys.argv = ['daycell.py', '--lan']`, override
  `Handler.is_local` (e.g. treat requests with an `X-Remote` header as remote), add the test host to
  `ALLOWED_HOSTS` and bind to `127.0.0.1`. That way there's no firewall prompt.
- **Screen sizes:** use `resize_window` (the `mobile` preset also turns on touch emulation), then reset to `desktop`.
- **Known quirks:**
  - Screenshots in the browser pane sometimes lag a step behind, so verify with JS measurements.
  - Python's `http.server` occasionally resets a connection and the page half-loads; reload.

## Current state (as of 2026-10-13)

- **Done:**
  - notebook UI, trash, autosave, launcher, personality, responsive layout and touch support
  - iPad LAN mode with QR pairing and conflict-safe merging
  - web version (start screen, in-browser journals in IndexedDB, live files, download, eject with undo,
    older-copy warning, Safari storage banner, persistent storage request)
  - **everything free** (2026-10-13): several journals, live files, year insights + image, templates, accents
  - redesign (2026-10-13): warm neutrals, off-white light mode, notebook start screen, motion, plus a ticker line and
    a tiny robot in the today cell, each with an off button
  - installable/offline (manifest, icons, service worker), daily reminder `.ics`, analytics hook (off until set)
  - landing page, privacy, terms, self-hosted fonts, share image; Node build; CI with 14 smoke tests
  - free streak share image (no entry text) and a free Day One importer (zip or JSON)
  - licence FSL-1.1-MIT; history checked for secrets; file format spec in `docs/`
- **Not done or not verified:** see `TASKS.md`. Notably: Safari/Firefox and a real iPad,
  the Chrome/Edge file pickers.
- **Dip's next steps** (accounts and identity): delete the Polar/checkout env vars in Netlify, a "made by Dip" section,
  domain, support inbox, make the repo public, UKIPO search, HMRC/ICO.
- **Parked:** images in entries (plan in the README under "Parked ideas"), passphrase encryption and a book export,
  ads/sponsor ideas, web push reminders, and a desktop app (Tauri).
