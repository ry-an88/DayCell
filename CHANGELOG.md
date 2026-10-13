# Changelog

## 2026-10-13 · free, a redesign and a livelier today cell

**Free, every feature**
- Daycell Pro is gone: several journals, live files, a year of insights and its image, templates and accents are free
  for everyone. No upgrade dialog, no licence checks.
- The licence function, its unit tests and the checkout settings are removed. Netlify no longer needs
  `CHECKOUT_URL`, `PORTAL_URL`, `LAUNCH_ENDS` or the `POLAR_*` variables.
- Landing page, privacy policy and terms say "free" and no longer mention payments or refunds.

**Redesign**
- Light mode is readable and easy on the eyes: an off-white page instead of glare, darker text and accent (WCAG AA
  or better throughout).
- Calmer dark mode, variable Inter and JetBrains Mono, consistent radii, solid borders, quieter tags and buttons,
  tabular numbers, visible keyboard focus.
- Small, quick motion: new cells rise in, a commit sweeps the cell, the panel and dialogs ease in, the theme switch
  crossfades. All of it is off with "reduce motion".
- The start screen is a notebook too: `daycell.start()` with numbered options.

**Today cell**
- A ticker line types out a short quote, fact or tip (bundled in the app; nothing is fetched), with an "on this day"
  line first. Click for the next one; it pauses while you hover or write.
- A tiny robot reacts: it hops when you commit, cheers on milestones, covers its eyes when you trash an entry, gets
  dizzy from too many prompt shuffles, follows your pointer and falls asleep when you're idle. Poke it.
- Each has its own on/off button on the cell, remembered per browser (also `/ticker`, `/bot` and the file panel).

**Tests**
- New smoke tests: no paywall anywhere, and the ticker and robot turn off, stay off and make no network requests.

## 2026-10-13 · payments move to Polar

- Lemon Squeezy declined the store application, so Pro is now sold through Polar (also a merchant of record).
- The licence function talks to Polar's licence-key API; the app's own licence calls are unchanged.
- Environment variables: `POLAR_ORG_ID`, `POLAR_BENEFIT_ID`, `POLAR_API_URL` (testing), `CHECKOUT_URL` and `PORTAL_URL`
  replace `LS_STORE_ID`, `LS_PRODUCT_ID` and `LS_CHECKOUT_URL`.
- The launch discount is added to the checkout link as `?discount_code=LAUNCH`.
- Privacy policy and terms name Polar. New unit tests for the licence function, and a test for the launch link.

## 2026-10-11 · launch preparation

**Pricing model**
- The 2-day trial is gone. Writing is free forever, with no time limit.
- New one-time **Daycell Pro** (£12, £9 in launch week): more journals with a switcher, live files on disk, a full year
  of insights and a "year in cells" share image, entry templates, accent colours.

**Safer in the browser**
- In-browser journals are stored in IndexedDB (far more room than before); journals saved by earlier versions move
  over automatically.
- The app asks the browser to keep its storage, and warns iPhone, iPad and Mac Safari users that Safari clears site
  data after 7 days without a visit.
- Installable to the home screen or dock, and opens offline.

**New**
- Daily reminder: download a repeating calendar event that opens Daycell (`/remind`).
- Templates in the command palette and from a new entry's "template" button.
- A free streak image to share: your streak, counts and a grid of squares, never any entry text (`/streak`).
- Import from Day One: pick its JSON export (.zip or .json) and your entries come across with dates, times and tags.

**Fixed**
- The status cell's "30 days ago" label ran straight into the entry link on desktop.
- The start screen opened scrolled down, hiding its heading.
- A website: landing page, privacy policy, terms, share image. The app moves to `/app/`.

**Behind the scenes**
- Self-hosted fonts on the website; optional cookie-free analytics (counts only).
- A build script, syntax checks, Playwright smoke tests and GitHub Actions CI.
- Licence: FSL-1.1-MIT. The journal file format is written up in `docs/file-format.md`.
