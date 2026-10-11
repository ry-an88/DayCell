# CLAUDE.md

Context for working on this project in a new session. **Read `README.md` too.** It's the product reference: features,
file format, the three run modes, pricing rules, deploy steps, the decisions log, and what's been tested.

## What this is

**Daycell** (renamed from the working name Daybook on 2026-10-11) is a journal app with a Jupyter/marimo-style "notebook" UI.
All entries live in **one plain `.md` file** per journal. It's being turned into a $5 web product: no accounts,
users own the file.

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
- **The user does the outward-facing account work:** Lemon Squeezy, Netlify, domain, Instagram. Posting or
  publishing anything needs their explicit go-ahead each time.
- **Keep `README.md` updated** when behaviour, decisions or setup steps change. The user asked for all important
  info to be recorded there, including the decisions log and parked ideas.

## The user

- Based in the UK (timestamps are BST/GMT). Works on Windows 11 with Git Bash, PowerShell and Python 3.10. Node is
  available.
- **Design taste:** techy, minimal, notebook-like. **No cursive or decorative fonts** (Inter + JetBrains Mono only),
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
| `netlify.toml`, `netlify/functions/license.mjs` | Web hosting: publishes only `dist/index.html` (a copy of `daycell.html`) plus the licence proxy function. |
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
     `handleTarget(h)` (File System Access, Chrome/Edge) or `browserTarget(name)` (web, kept in browser storage).
   - `writeFile()` always caches the markdown in `localStorage` (`daycell-md`), then `target.write()` runs through a
     promise chain.
   - `connect(target)`, `mergeRemote()` (matches entries across devices by `entrySig = date + ' ' + time`) and
     `refreshFromServer()` (runs on focus/visibility and every 20 s).
7. **web version:**
   - `webMode()` is `!state.server && !state.unpaired`.
   - The **mount** (`daycell-mount`) is `{ name, kind: 'handle' | 'browser', downloadedHash, lastDownload }`.
   - `startNew`, `startOpen`, `openUploaded` (with the older-copy warning), `downloadMd` (adds the stamp, records it
     in `daycell-exports`), `eject` (with a 9 s undo) and `startHtml()` (the start screen).
   - `LIVE_FILES` is false with `?storage=browser`.
8. **licence + trial:**
   - `LICENSE` config. `licensingOn()` needs `webMode()` **and** a non-empty `checkoutUrl`, so it's off by default.
   - `canWrite()`, `trialDaysLeft()` (`daycell-trial`) and `getLic()` (`daycell-licence`).
   - `activateKey`, `recheckLicence` (every 30 days; network failure never locks), `deactivateDevice`,
     `showUnlock` and `friendlyLicenceError`.
9. **entry actions:** `newEntry(prompt)` and `startEdit` are **gated by `canWrite()`**. Also `syncEditor`,
   `exitEdit` (toasts and milestones), `revert`, `trash`/`restore`/`purge`/`emptyTrash` (purges are remembered in
   `state.purged` so merges can't resurrect them) and `jumpTo`.
10. **rendering:**
    - Templates are built with `innerHTML`, including `renderCells`.
    - The start screen shows when web mode has no target, and the status cell `[~]` sits at the **bottom**.
    - Also `cellHtml`, `renderPanel`/`renderPanelBody` (contents, insights, trash, files), `insightsHtml`,
      `deviceHtml` (iPad QR, which lazy-loads qrcodejs from cdnjs), `licenceHtml`, `setStatus` and `renderChrome`.
11. **command palette:** the `COMMANDS` list.
12. **events:** handled by delegation on `#cells` (`data-act`, `data-mood`), `#panel` (`data-fact`, `data-tact`,
    `data-sfile`, `data-date`, `.row`) and a global `keydown` (command-mode keys: b, Enter, j/k, d d, /, Ctrl+K,
    Ctrl+S).
13. **boot:** `init()` detects the launcher (`GET /api/files`). Otherwise it's the web path: reopen the mounted
    journal or show the start screen.

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

- **Syntax:**
  - Extract the `<script>` from `daycell.html` with Python and run `node --check` on it.
  - Run `node --check netlify/functions/license.mjs`.
  - Run `python -m py_compile daycell.py`, then delete the `__pycache__/` it creates.
- **UI (web/browser mode):**
  - Copy `daycell.html` into a scratchpad folder and add a temporary launch config:
    `python -m http.server 5180 --directory <scratch>`.
  - Open `http://localhost:5180/daycell.html?storage=browser`, then seed data with JS (`state.entries = [...]`,
    `renderAll()`).
  - Stub downloads (`HTMLAnchorElement.prototype.click`) so nothing lands in the user's Downloads folder.
  - Mock `/api/license` by overriding `window.fetch`, and set `LICENSE.checkoutUrl` in the page to switch
    licensing on.
  - Clear that origin's `localStorage` and IndexedDB afterwards.
- **Launcher:** copy `daycell.py` and `daycell.html` into a scratch folder with its own `Journals/`, then run
  `python <scratch>/daycell.py --no-browser --port=8797` from a temporary launch config.
- **LAN/pairing logic:** import `daycell` in Python with `sys.argv = ['daycell.py', '--lan']`, override
  `Handler.is_local` (e.g. treat requests with an `X-Remote` header as remote), add the test host to
  `ALLOWED_HOSTS` and bind to `127.0.0.1`. That way there's no firewall prompt.
- **Licence function:** import it in Node, stub `globalThis.fetch` and call it with a `Request`.
- **Screen sizes:** use `resize_window` (the `mobile` preset also turns on touch emulation), then reset to `desktop`.
- **Known quirks:**
  - Screenshots in the browser pane sometimes lag a step behind, so verify with JS measurements.
  - Python's `http.server` occasionally resets a connection and the page half-loads; reload.

## Current state (as of 2026-10-11)

- **Done:**
  - notebook UI, trash, autosave, launcher
  - personality: status cell, prompts, insights, voice, palette
  - responsive layout and touch support
  - iPad LAN mode with QR pairing and conflict-safe merging
  - web version (start screen, live file / in-browser, download, eject with undo, older-copy warning)
  - licence and trial (off until `checkoutUrl` is set), Netlify config and licence function
  - README
- **Not done or not verified:**
  - a real iPad, the QR image, the firewall prompt
  - real Lemon Squeezy calls and a Netlify deploy
  - the Chrome/Edge file pickers in web mode
- **Next steps, from the user's plan:**
  1. ~~Pick a name~~ Done: Daycell (internals renamed too, 2026-10-11).
  2. The user sets up Lemon Squeezy (a $5 product with licence keys, activation limit 5) and pastes the checkout URL.
  3. Deploy to Netlify with `LS_STORE_ID` and `LS_PRODUCT_ID` set.
  4. Marketing: short vertical promo videos, launch posts, and an Instagram page (the user creates the account).
- **Parked:** images in entries (plan in the README under "Parked ideas"), and a desktop app (Tauri) later.
