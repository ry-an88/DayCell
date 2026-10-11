# Changelog

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
- A website: landing page, privacy policy, terms, share image. The app moves to `/app/`.

**Behind the scenes**
- Self-hosted fonts on the website; optional cookie-free analytics (counts only).
- A build script, syntax checks, Playwright smoke tests and GitHub Actions CI.
- Licence: FSL-1.1-MIT. The journal file format is written up in `docs/file-format.md`.
