# Search pages (outlines)

Pages on the landing site that answer what people actually search for. Each is useful on its own, links to the app,
and stays accurate (update prices and features when they change). Plain HTML pages are fine; the launch-plan thread
can add them under `/guides/`.

Verify search demand with a free tool (Google Search Console once the site is live, or Google Trends) before writing
all of them; start with 1 and 2.

---

## 1. Day One alternative without a subscription
**URL:** `/guides/day-one-alternative`
**Title:** A Day One alternative with no subscription (your journal stays a plain file)

1. Who this is for: you like Day One but don't want to pay yearly, or want your entries in a format you control.
2. Honest comparison table: Day One (features it has that Daycell doesn't: photos, audio, server sync, apps) vs
   Daycell (one file, no account, one-time Pro, public code). Cite Day One's pricing page and the date checked.
3. How to move your entries: [only if the Day One importer ships; otherwise "export from Day One as Markdown/JSON,
   then…" with real steps].
4. Who should stay on Day One: if you need photo journaling and automatic sync, it's the better fit. (Saying this builds trust.)
5. Try Daycell free.

## 2. Markdown journal app
**URL:** `/guides/markdown-journal`
**Title:** Keep your journal in markdown: a plain-text daily journal app

1. Why markdown for a journal (longevity, portability, any editor).
2. The Daycell file format, with a real example.
3. Ways to edit it: Daycell, VS Code, Obsidian, iA Writer.
4. Backups and versioning, including git.

## 3. Obsidian daily journal
**URL:** `/guides/obsidian-journal`
**Title:** A journaling front-end for your Obsidian vault

1. The file lives in your vault; Daycell and Obsidian edit the same entries.
2. Dataview queries: mood by month, entries by tag, "on this day" (give working snippets).
3. Free template download.

## 4. Private journal app with no account
**URL:** `/guides/private-journal`
**Title:** A private journal app with no account and nothing uploaded

1. What "private" means here, precisely: what's stored where, the one network call (licence check).
2. How to verify it yourself (open DevTools → Network while writing; read the code).
3. Encrypting the file at rest: [Pro passphrase feature if shipped; otherwise OS-level options like FileVault/BitLocker].

## 5. Journal prompts for developers
**URL:** `/prompts`
**Title:** 30 journal prompts for people who think in code

All 30 prompts from the app, each with a one-line example answer. Highly shareable; links to "use this prompt in
Daycell".
