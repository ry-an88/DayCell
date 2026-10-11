# Launch posts (drafts)

Every post here is a draft for Dip to edit and publish. Lines in `[square brackets]` need Dip's real details.
Replace `[URL]` with the landing page link plus the channel's UTM tag, for example
`[URL]?utm_source=hn&utm_medium=launch`. Don't post any of these until the product, price and landing page are live.

---

## Show HN

**Title** (pick one; HN strips marketing language, so keep it plain):

- `Show HN: Daycell – a journal that's just a markdown file`
- `Show HN: A notebook-style journal that saves to one plain .md file`

**URL field:** the landing page (or the GitHub repo, which HN readers often prefer for a first look).

**First comment (post immediately after submitting):**

> Hi HN, I'm [Dip], and I built Daycell.
>
> I wanted to keep a daily journal, but every app I tried kept my entries in its own cloud, charged yearly for sync,
> and made export an afterthought. [One sentence on your real moment, e.g. "I lost a year of entries when…" — only if true.]
>
> So Daycell keeps the whole journal in one plain markdown file. Each entry is a `##` heading, with mood and tags as
> `key:: value` lines (the Dataview style, so it drops into an Obsidian vault). The UI is a Jupyter-style notebook:
> each day is a cell, there's a command mode, `b` for a new entry, `Shift+Enter` to commit, `/` for a command palette.
>
> How it saves:
> - In Chrome/Edge it writes straight into a file you choose (File System Access API). Put that file in any folder
>   you already sync.
> - In Safari/Firefox/iPad it keeps the journal in the browser and reminds you to download the `.md`.
> - There's also a tiny Python launcher if you'd rather run it locally and write from an iPad on your Wi-Fi.
>
> There's no account and no server for your entries. The only network call is checking a licence key if you buy Pro.
> The code is public: [repo URL].
>
> Pricing: writing is free forever (prompts, streaks, search, export). Pro is a one-time £12 (£9 this week) for
> [the Pro list as shipped: live file saving, multiple journals, encryption, all-time insights]. No subscription.
>
> Things it deliberately doesn't do: sync through a server, AI over your entries, or lock you out of reading your own
> journal. Things it doesn't do *yet*: [be honest, e.g. images in entries].
>
> I'd love feedback on the file format and on what would make you trust a journal app with years of writing.

**Rules for the day:** reply to every comment, thank critics, fix small bugs live and say so, never argue about price.
Don't ask anyone to upvote.

---

## Product Hunt

**Name:** Daycell
**Tagline (60 chars max):** `A journal that's just a markdown file. Commit your day.` (55)
**Alternative:** `Notebook-style journal. One .md file. No subscription.` (54)
**Topics:** Productivity, Writing, Note-taking, Developer Tools
**Gallery:** `images/out/ph-gallery.png`, `images/out/ph-gallery-shot-insights-light.png`, `screenshots/phone-dark.png`,
`video/out/04-app-demo-dark.mp4` (as the video), `images/out/ig-04-file.png`.

**Description (260 chars max):**

> Daycell is a daily journal that looks like a code notebook and saves every entry to one plain markdown file you own.
> No account, no cloud, no subscription. Prompts, streaks and insights are free forever; Pro is a one-time £12.

**Maker comment:**

> Hey Product Hunt 👋 I'm [Dip].
>
> Daycell started because I wanted my journal to outlive whatever app I was using. So it's just a `.md` file:
> open it in VS Code, Obsidian or Notepad, back it up however you like, read it in 2050.
>
> On top of the file there's a notebook UI I actually enjoy opening: every day is a cell, prompts like
> *"if today had a commit message, what would it be?"*, a streak grid, mood and tag insights, and a command palette.
>
> Free forever: unlimited entries, prompts, streaks, search, export.
> Pro, one-time £12 (£9 for launch week): [Pro features as shipped].
>
> The code is public at [repo URL]. I'd love to hear what you'd want from a journal you'll keep for decades.

---

## Reddit

Read each subreddit's rules on self-promotion first, and check if they have a weekly "share your project" thread
instead. Post from Dip's own account, as the maker, and reply to everything. Don't post more than one subreddit a day.

### r/ObsidianMD — the vault angle

**Title:** `I made a notebook-style journaling app whose file is plain markdown with Dataview fields, so it lives in your vault`

> I journal daily but wanted something more ritual-like than a daily note, without leaving my vault. So I built
> Daycell: it reads and writes one `.md` file where each entry is
>
> ```markdown
> ## 2026-10-08 · 19:30 — long run by the river
> mood:: good
> tags:: #health
>
> 9 km, no headphones.
> ```
>
> Because mood and tags are `key:: value`, Dataview can query them (e.g. a mood table by month). Point Daycell at a
> file inside your vault (Chrome/Edge save straight into it) and both tools see the same entries.
>
> What it adds on top: a cell-per-entry notebook view, a prompt each day, a streak grid, and mood/tag insights.
> Free to use; there's an optional one-time Pro. No account, nothing leaves your machine. Code: [repo URL].
>
> [Screenshot] Would a Dataview snippet pack for it be useful? Happy to share the queries I use.

### r/journaling — the ritual and ownership angle

**Title:** `I built a journal app where your journal is just a text file you keep. Looking for honest feedback`

> I kept switching journal apps and every time it was a pain to get my entries out. So I made one where the journal
> *is* a plain text file (markdown) on your own device. No account, nothing uploaded.
>
> Every day shows up as a "cell", there's a prompt if you're stuck ("what gave you energy today, and what drained
> it?"), a streak, and a little activity grid so you can see the habit.
>
> It's free to write forever. There's an optional one-time upgrade, no subscription.
>
> What would make you trust an app with years of your writing? That's the question I'm trying to answer. [link]

### r/SideProject — the build story

**Title:** `Daycell: a journal app that's one HTML file and saves to one markdown file. Launching today`

> Stack: a single vanilla HTML/JS file (~2,000 lines, no framework, no build step), a 200-line Python launcher for
> local use, and one Netlify function for licence keys. Entries never touch a server.
>
> Pricing decision I went back and forth on: a 2-day trial that locked writing, vs. a free-forever core with a
> one-time Pro. I went with free forever, because a journal habit takes weeks to form and locking people out on day
> 3 felt wrong. Pro is £12 once (£9 this week).
>
> Happy to answer anything about building it. [link] · code: [repo URL]

### r/IndieHackers or the Indie Hackers site — the numbers angle (post on L+3, then a 30-day follow-up)

**Title:** `Launched a no-subscription journal app this week. Here's what happened`

> [Write this after the launch with real numbers: visits by channel, sales by discount code, what surprised you.
> Real numbers are the whole value of this post. Don't round up.]

---

## dev.to article

**Title:** `I built a journal that's just a markdown file (and you can keep it in git)`
**Tags:** `#showdev #javascript #productivity #opensource`

Outline (about 900 words):

1. **The problem in one paragraph:** journals are the longest-lived data most people create, and they're stored in the
   shortest-lived places.
2. **The file format.** Show the markdown, explain `key:: value`, the `# Trash` section, the download stamp comment.
3. **Saving without a server.** File System Access API on Chromium, the localStorage fallback, the merge-on-409 trick
   the launcher uses for two devices writing one file (`X-Base-Version`, entry signature `date + time`).
4. **The notebook UI.** Command mode vs edit mode, `d d` to delete, the `[~]` status cell.
5. **Journal in git.** Put the file in a private repo; a tiny cron or editor hook commits it daily. Your diary gets a
   real commit history.
6. **Pricing in the open.** Why free forever plus one-time Pro.
7. **Try it / read the code.** Links.

---

## Launch-day reply snippets

Short, honest answers for the questions that will come up. Adjust to what has actually shipped.

- **"Why not just a text editor?"** — You can! The file works anywhere. Daycell adds the ritual: a prompt, a streak, an
  entry-per-cell view, insights. Some days that's the difference between writing and not.
- **"No sync?"** — Not through my servers, on purpose. In Chrome/Edge it saves into a file in whatever folder you
  pick, so iCloud/Dropbox/OneDrive/Syncthing carries it.
- **"Is it open source?"** — Source-available: the code is public at [repo URL] under FSL-1.1-MIT, so you can read,
  run and modify it for yourself, and every version becomes plain MIT two years after release. The one thing it rules
  out is selling a competing copy. Pro is how I fund it.
- **"£12 for a text file?"** — Fair! Writing is free forever, so you may never need Pro. Pro is for [features].
- **"Bug: …"** — Thanks, reproduced, fixing now. (Then actually post when it's fixed.)
