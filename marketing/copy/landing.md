# Landing page copy (draft)

For the landing page at `/` (the app moves to `/app`, per the launch plan). The launch-plan thread owns building the
page; this is the words for it. Section order follows the messaging hierarchy in `STRATEGY.md` §2.

---

## Hero

**A/B test these two headlines** (50/50 for two weeks, compare "started a journal" per visit):

- **A:** A journal that's just a `.md` file.
- **B:** Commit your day.

**Subhead:** Notebook-style daily writing with no account and no subscription. Your entries stay in one plain
markdown file on your device.

**Primary button:** `Start writing, free` → `/app`
**Secondary link:** `Open an existing .md` → `/app` (opens the file picker)
**Under the buttons, small:** No sign-up. Nothing leaves your device.

**Visual:** `video/out/04-app-demo-dark.mp4` autoplaying, muted, looped (or a GIF of it), with
`screenshots/desktop-dark.png` as the poster frame. Respect `prefers-color-scheme` and swap to the light versions.

---

## Section: "It's just a file"

**Heading:** Your journal is a file. Not a database you rent.

Left: an entry as you see it. Right: the same entry as it's saved (use `images/out/ig-04-file.png` as reference).

- **Open it in anything.** VS Code, Obsidian, Notepad, `cat`. It's markdown.
- **Back it up your way.** iCloud Drive, Dropbox, OneDrive, a USB stick, a private git repo.
- **Keep it for decades.** Plain text has outlived every app format there is.

---

## Section: "A notebook you'll want to open"

**Heading:** Every day is a cell.

Three short points with small screenshots:

- **A prompt when you're stuck.** "If today had a commit message, what would it be?"
- **A streak you can see.** An activity grid that fills one square per day, and milestones that cheer quietly.
- **Keyboard-first.** `b` new entry, `Shift+Enter` commit, `/` command palette. Or just tap, on iPad and phone.

---

## Section: Trust

**Heading:** Private by design, and you can check.

- **No account.** There's nothing to sign up for.
- **Nothing leaves your device.** Your entries are never sent anywhere. The only network request is checking a
  licence key, if you buy Pro.
- **No AI reads your journal.** Not ours, not anyone's.
- **The code is public.** Read it on GitHub. [live star count]

---

## Section: Pricing

**Heading:** Free to write. Forever.

| Free · £0 forever | Pro · £12 once |
|---|---|
| One journal, unlimited entries | Everything in Free |
| Daily prompts, streaks, milestones | More journals with a switcher · live file saving (Chrome, Edge) · a year of insights and the "year in cells" image · templates · accent colours |
| Activity grid, mood and tag insights | Up to 5 devices |
| Search, command palette, trash | One payment. No renewal. |
| Download, open and eject your `.md` any time | |

**Launch week banner (only from launch day to the real end date):** `Launch week: Pro is £9 until [Mon 16 Nov, 23:59 UK]. Then £12.`

**Small print under the table:** Prices include VAT where it applies. 14-day refund, no questions. [Confirm the refund
policy before publishing.]

---

## FAQ

- **Do I need an account?** No. Open the app and start writing.
- **Where are my entries stored?** With Pro in Chrome and Edge, in a `.md` file you choose on your device. Otherwise
  (free, or Safari, Firefox and iPad), in your browser, with a reminder to download a copy. Either way, never on our servers.
- **Does it sync between devices?** Not through a server. Put your file in a folder you already sync (iCloud Drive,
  Dropbox, OneDrive) and open it from each device.
- **Can I use it with Obsidian?** Yes. Mood and tags are saved as `mood:: good` and `tags:: #work`, the inline-field
  style Dataview reads. Point Daycell at a file in your vault.
- **What happens if Daycell disappears?** Your journal is still a markdown file on your device. The app is a single
  HTML file you can keep a copy of.
- **Why pay if writing is free?** Pro adds [features] and funds the work. You might never need it, and that's fine.
- **Is Pro a subscription?** No. One payment, no renewal, works on up to 5 devices.
- **I lost my licence key.** Use the "lost your key?" link in the unlock dialog; it looks up your order.

---

## Footer

Daycell · made in the UK by [Dip] · [Privacy] · [Terms] · [Refunds] · [GitHub] · [Contact: support email]

---

## Meta tags

- `<title>`: Daycell: a journal that's just a markdown file
- `description`: Notebook-style daily journal with no account and no subscription. Your entries stay in one plain .md
  file you own. Free forever; Pro is £12 once.
- `og:image`: `images/out/og-image.png` (1200×630)
