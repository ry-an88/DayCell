# Changelog

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
