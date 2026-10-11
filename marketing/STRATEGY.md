# Daycell marketing strategy

Draft, 11 Oct 2026. Built on the [Daycell Launch Plan](https://claude.ai/artifact/RaWy4AmwyFsXEQcrafb7rZ) and the
decisions made since: a free-forever core, a one-time Pro at **£12** (**£9 in launch week**), and public code.

Nothing here has been posted anywhere. Every post, listing and email in `copy/` is a draft for Dip to publish.

---

## 1. The one-sentence position

> **Daycell is a journal that's just a markdown file: notebook-style daily writing with no account and no
> subscription, where your entries stay in one plain `.md` file you own.**

Everything else in this document is a way of saying that sentence to a particular person, in a particular place.

### Why this position wins

| What competitors make people feel | What Daycell lets us say, truthfully |
|---|---|
| "My journal is locked in their cloud." | Your journal is a file on your device. Open it in anything. |
| "I'm renting my own diary." ($49.99/yr for Day One's entry paid plan) | Writing is free forever. Pro is £12, once. |
| "Sync failed and entries vanished." (top complaint for Journey, Stoic) | There's no sync to fail. It's one file; back it up like any file. |
| "Export is hard." | There's nothing to export. It's already markdown. |
| "An AI is reading my entries." (Day One's top tier is AI over your journal) | Nothing leaves your device. The code is public, so you can check. |

### Who we talk to, in order

1. **Developers and "techy" journalers.** The notebook UI, `[1]:` cells, command palette and commit-message
   prompts are their language. Reachable on Hacker News, X/Bluesky, dev.to, r/programming-adjacent subs.
   *They judge on taste and honesty.* Show the real thing, admit limits, never hype.
2. **Obsidian and plain-text people.** The file uses Dataview-style `key:: value` fields, so it drops into a vault.
   Story: *"a journaling front-end for your vault."* Reachable on r/ObsidianMD, the Obsidian forum and Discord,
   PKM YouTube.
3. **Subscription-tired journal app users.** Bigger and less technical. Story: *"pay once, keep your file."*
   Reachable through search ("Day One alternative"), AlternativeTo, r/journaling, Instagram and TikTok.

Start with 1 and 2. They're small, reachable and they share tools. Group 3 arrives through search pages and
short videos once there's proof (stars, comments, real users quoting their own experience).

---

## 2. Messaging hierarchy

Use this order everywhere: hero, posts, video scripts.

1. **Hook (the file):** "A journal that's just a `.md` file." / "Where does your journal actually live?"
2. **Feel (the notebook):** "Each day is a cell. Commit your day." Show the UI; it sells itself to group 1.
3. **Trust (ownership):** "No account. No cloud. Nothing leaves your device. The code is public."
4. **Price (pay once):** "Free to write, forever. Pro is £12, once."
5. **Action:** "Start a journal in your browser. No sign-up."

### Taglines (pick one per channel; test two on the landing page)

- **Commit your day.** (primary; dev-native, short, works as a hashtag `#commityourday`)
- A journal that's just a `.md` file.
- Pay once. Keep the file.
- Your journal shouldn't cost rent.
- Apps get acquired, repriced and shut down. A file just opens.
- Write it down. Keep the file.

### Words to use and avoid

| Use | Avoid |
|---|---|
| file, plain text, markdown, your device, own, keep | cloud, sync (we don't have it), "AI-powered" |
| cell, commit, streak, changelog, prompt | "revolutionary", "the best", "game-changer" |
| free forever, once, no renewal | "lifetime" (sounds like a subscription upsell), "limited time" unless there's a real date |
| "Pro" for the paid tier | "Premium" (that's Day One's word) |

Voice matches the app's own `VOICE` lines: lowercase-friendly, dry, warm, a little nerdy
("committed. your future self says thanks."). No exclamation marks in headlines.

---

## 3. Persuasion, done honestly

These are the levers in the copy, and the line we don't cross for each one. Daycell's whole pitch is trust, so a
single dark pattern would cost more than it earns.

| Lever | How we use it | Line we don't cross |
|---|---|---|
| **Anchoring** | Show a real competitor price ($49.99/yr) next to £12 once, with the source and date. | No invented "was £49" prices. The only crossed-out price is £12, and only in launch week. |
| **Loss aversion** | "5 years of a journal subscription: $249.95." It's arithmetic on a published price. | No fear about other apps "deleting your data". Quote real, public complaints only. |
| **Real scarcity** | £9 for launch week, with an end date that is honoured exactly. | No countdown that resets, no fake "3 spots left", no extending "final hours" twice. |
| **Reciprocity** | Give first: the free core, daily prompts as posts, the open file format, a free Obsidian template. | Nothing that's "free" requires an email to use. |
| **Commitment and consistency** | Streaks, milestones, the activity grid. A shareable streak card makes the habit public. | No guilt notifications, no "you'll lose your streak!" nags. |
| **Endowment** | The free journal is already the user's file. Pro is offered when they want more of what they already own (a second journal, the all-time grid). | Never gate reading, search or export. Never interrupt writing with an upsell. |
| **Social proof** | GitHub stars, real quotes from real users (with permission), "built in public" progress. | **No fake reviews, testimonials, user counts or "as seen on".** Until there's real proof, we show the product instead. |
| **Authority / verifiability** | "The code is public. Read it." Link the repo and the file format spec. | No unverifiable privacy claims; say exactly what is sent (only the licence key, for checking). |
| **Identity** | "For people who think in commits." Speaks to who the buyer wants to be. | No mocking people who use other apps. |
| **Specificity** | "Pushed the release at 18:03." Concrete detail is more believable than adjectives. | Demo content is clearly made-up sample data, never presented as a user's journal. |

### Objections and answers (reuse in FAQ, replies and DMs)

- **"What if I lose the file?"** It's a normal file: put it in iCloud Drive, Dropbox, OneDrive, a git repo or a USB
  stick. That's the point; you choose. (In-browser journals remind you to download a copy.)
- **"Why not just use Obsidian / a text editor?"** You can, and Daycell's file works there. Daycell adds the
  daily ritual: prompts, a streak, insights, an entry-per-cell view. Use both.
- **"Why pay if the code is public?"** Pro is a one-time £12 that funds the work, and it's the easy way to get Pro on
  every device. Same reason people buy open-source apps on app stores.
- **"Does it sync?"** Not through a server. On Chrome/Edge it saves straight into a file you choose, so any folder sync
  you already use (iCloud, Dropbox, OneDrive, Syncthing) carries it. Be upfront about this; don't fudge it.
- **"Will it be around in 5 years?"** It doesn't need to be. Your journal is a markdown file, and the app is one HTML
  file you can keep a copy of.
- **"iPad / phone?"** Works in the browser on any device. (Say "installable and offline" only after the PWA work ships.)

---

## 4. Channels

Ranked by expected return for the effort, for a solo maker with no budget.

### A. Hacker News: Show HN (launch day)
- **Why:** group 1 lives here, and a front-page Show HN can bring thousands of visits in a day.
- **How:** post as the maker, Tuesday to Thursday, around 14:00–16:00 UK (morning US East). Plain title, no
  marketing words. First comment tells the story and the trade-offs, including what it *doesn't* do.
- **Draft:** `copy/launch-posts.md` → Show HN. Reply to every comment for the first 6 hours.

### B. Reddit (launch week, spread over days)
- r/ObsidianMD (the vault angle), r/journaling (the ritual and ownership angle), r/SideProject and
  r/IndieHackers (the build story), r/selfhosted only if it fits their rules (it's local-first, not self-hosted).
- Read each subreddit's self-promotion rules first. Post as the maker asking for feedback, with screenshots,
  and never cross-post the same text on the same day.
- **Drafts:** one tailored post per subreddit in `copy/launch-posts.md`.

### C. Short vertical video (TikTok, Instagram Reels, YouTube Shorts) — ongoing
- **Why:** the UI is visual and satisfying (cells appearing, the grid filling). Short video is where group 3 is.
- **How:** 3 posts a week from week −3. Same video to all three platforms, captions tailored. Hook in the first
  second, product on screen by second three, no voiceover needed.
- **Assets:** 5 rendered drafts in `video/out/`, 10 more scripts in `video/SCRIPTS.md`, and the tooling to make
  more in minutes (`tools/render.mjs`, `tools/app-demo.mjs`).

### D. X and Bluesky: build in public — ongoing
- Daily or near-daily: progress clips, a design decision, a number (visits, stars, sales once real).
- Weekly "prompt of the day" images (`images/out/ig-03-prompt-*.png`) invite replies.
- Launch day: the thread in `copy/social.md`.

### E. Product Hunt (launch week, a different day from HN)
- A good secondary spike plus a permanent listing. Launch 00:01 Pacific (08:01 UK).
- Gallery images: `images/out/ph-gallery*.png` plus screenshots. Maker comment drafted in `copy/launch-posts.md`.

### F. Search and directories — set up once, compounding
- Landing-site pages: "Day One alternative without a subscription", "markdown journal app",
  "Obsidian daily journal", "private journal app with no account" (outlines in `copy/seo-pages.md`).
- Listings: AlternativeTo (as an alternative to Day One, Journey, Diarium), SaaSHub, Uneed, Indie Hackers products,
  There's An AI For That is **not** relevant (no AI). Text in `copy/directories.md`.

### G. Open source as marketing — from the day the repo goes public
- A good README with the GIF at the top, the file format spec as its own page, `good first issue` labels.
- Submit to "awesome" lists that fit (awesome-markdown, awesome-obsidian if the template ships, awesome-selfhosted
  only if it qualifies).
- GitHub stars are honest social proof; show the live count on the landing page.

### H. Creators and newsletters — weeks −2 to +4
- PKM/Obsidian YouTubers, journaling creators, indie-dev newsletters. Offer a free Pro key and the Obsidian angle;
  never ask for a positive review, ask for an honest look. Templates in `copy/outreach.md`.
- Lemon Squeezy has a built-in affiliate program; offer creators 30% of each sale through their link.

### I. Instagram — slow burn
- Dip is creating the account. Three posts a week: carousels from `images/out/`, Reels from `video/out/`, daily
  prompt cards in Stories. Captions in `copy/social.md`.

### J. Email list (owned channel)
- A "tell me when it launches" form on the landing page (Buttondown free tier). Three emails total around launch,
  then a short monthly changelog. Drafts in `copy/email.md`.

---

## 5. Clever, cheap growth loops

These are product-side ideas that make marketing compound. They need the product thread's work, so they're
**proposals**, not decisions.

1. **Free shareable streak card.** A PNG of your activity grid and streak (no entry text), with a small `daycell`
   mark. Free users can share it; Pro removes the mark and adds the all-time "Year in cells". Every share is an ad
   that the user chose to post. Pairs with the `#commityourday` challenge below.
2. **Import from Day One (and Journey).** Day One exports JSON; a converter to Daycell markdown removes the
   biggest switching cost for group 3. Then the landing line "Bring your Day One journal with you" is true.
3. **`#commityourday` 30-day challenge.** Starts launch week. Post your streak card each week. It's a reason to
   come back on day 3 (the funnel's weakest step) and gives creators a hook.
4. **Obsidian template.** A free daily-note template that uses the Daycell format, linking back to the app. Gives
   group 2 something useful before asking for anything.
5. **"Journal in git" guide.** A short post: keep your Daycell file in a private git repo and every save is a real
   commit. Pure developer catnip, and true to the product.
6. **Prompt pack posts.** The app's own 30 prompts become a year of daily social posts at zero cost.
7. **Channel discount codes** (`HN`, `REDDIT`, `PH`, `IG`, `YT`) on launch week tell us which post sold, without tracking anyone.

---

## 6. Launch calendar

Proposed launch day: **Tuesday 10 November 2026** (week 4 of the launch plan). Move it if the product isn't ready;
the plan is relative to launch day (L).

| When | What | Channel | Asset |
|---|---|---|---|
| L−28 → L−21 | Make the repo public with a strong README and GIF. Set up X, Bluesky, Instagram, TikTok handles. | GitHub, socials | `screenshots/`, `video/out/04-app-demo-*.mp4` |
| L−21 → L−1 | Build in public: 3 short videos a week, a daily-ish post. Collect emails on the landing page. | X, Bluesky, IG, TikTok, Shorts | `video/out/`, `copy/social.md` weeks −3 to −1 |
| L−14 | Creator and newsletter outreach (free Pro keys). | Email/DM | `copy/outreach.md` |
| L−7 | Directory listings submitted (some take a week to approve). | AlternativeTo, SaaSHub, Uneed | `copy/directories.md` |
| L−2 | "Launching Tuesday" email to the list. | Email | `copy/email.md` #1 |
| **L (Tue)** | **Show HN** at ~15:00 UK. Launch thread on X/Bluesky. £9 price live. | HN, X, Bluesky | `copy/launch-posts.md`, `copy/social.md` |
| L+1 (Wed) | **Product Hunt** at 08:01 UK. r/SideProject. | PH, Reddit | `images/out/ph-gallery*.png` |
| L+2 (Thu) | r/ObsidianMD (vault angle). dev.to article. | Reddit, dev.to | `copy/launch-posts.md` |
| L+3 (Fri) | r/journaling (ritual and ownership angle). Indie Hackers post. | Reddit, IH | `copy/launch-posts.md` |
| L+5 (Sun) | "Last day of £9" email and post. Only if the deadline is real and honoured. | Email, socials | `copy/email.md` #3, `images/out/story-launch.png` |
| L+6 (Mon 23:59 UK) | £9 ends. Price goes to £12 on time. | — | — |
| L+7 → L+30 | `#commityourday` challenge, weekly changelog posts, SEO pages live, reply to every review. | All | `copy/social.md` |
| L+30 | Read the funnel (section 7). Decide the next bet. | — | — |

---

## 7. Measuring it

Use the launch plan's funnel targets and cookie-free analytics (Umami, Plausible or GoatCounter). Count only
events, never content.

| Step | Target | What fixes it if it's low |
|---|---|---|
| Landing visit → start a journal | 25% | Hero copy and the GIF. A/B the two top taglines. |
| Start → first entry | 18% of visits | The empty state: open on today's prompt. |
| First entry → back on day 3 | 8% of visits | Reminders (calendar file), the streak card, the challenge. |
| Visit → Pro | 2–3% | Pro value and the upgrade moment, not the price. |

Per channel, track visits (UTM tags in every link: `?utm_source=hn&utm_medium=launch`) and sales (the discount code).
After launch week, put more effort only into the two channels with the most **sales per hour spent**.

Day-90 goal from the launch plan: 5,000 landing visits and 150 Pro sales.

---

## 8. Things we will not do

- Fake reviews, testimonials, upvote rings, sock-puppet comments or bought followers.
- Ask friends to upvote on HN or Product Hunt (both penalise it, and it's dishonest).
- Fake urgency: resetting timers, "price going up soon" without a date, extending a "final" deadline.
- Imply sync, AI, encryption or offline support before they ship.
- Present demo entries as a real person's journal. All marketing journals are clearly made up.
- Post anywhere without Dip's go-ahead.
