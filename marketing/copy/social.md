# Social posts (drafts)

For X, Bluesky, Threads, Instagram, TikTok and YouTube Shorts. All drafts; Dip posts. Swap `[URL]` for the
landing link with a UTM tag (`?utm_source=x`, `?utm_source=ig`…). Hashtags: keep to 3–5 on Instagram and TikTok,
0–1 on X and Bluesky.

---

## Launch-day thread (X and Bluesky)

1/
I built a journal that's just a markdown file.

No account. No cloud. No subscription. Every entry lives in one plain .md file on your device.

It's called Daycell, and it launches today. 🧵
[attach: video/out/04-app-demo-dark.mp4]

2/
It looks like a code notebook. Each day is a cell.

b → new entry
shift+enter → commit
/ → command palette

[attach: screenshots/desktop-dark.png]

3/
This is what's on your disk. That's it. That's the database.

Open it in VS Code, Obsidian or Notepad. Back it up however you like.
[attach: images/out/ig-04-file.png]

4/
It nudges you to write without nagging:
- a prompt a day ("if today had a commit message, what would it be?")
- a streak and an activity grid
- mood and tag insights
[attach: screenshots/insights-dark.png]

5/
Pricing, decided in the open:
Writing is free. Forever. Prompts, streaks, search, export included.
Pro is £12, once. £9 this week, until [Mon 16 Nov, 23:59 UK].
No renewal.

6/
The code is public, so you don't have to take my word on privacy: [repo URL]

Try it in your browser, no sign-up: [URL]

I'll be replying to everything today.

---

## Build-in-public posts (weeks −3 to −1)

One a day is plenty; 3 a week is fine. Each has a suggested asset.

| # | Post | Asset |
|---|---|---|
| 1 | Building a journal app where the database is a single markdown file. Here's an entry and here's the file it writes. | `images/out/ig-04-file.png` |
| 2 | The prompts are written like a dev's inner monologue. Today's: "what's running in the background of your mind?" | `images/out/ig-03-prompt-n-3.png` |
| 3 | Decision: no 2-day trial. Writing stays free forever, Pro is a one-time unlock. A habit takes weeks; locking people out on day 3 is the opposite of what a journal should do. | none, text only |
| 4 | Every entry fills a square. 30 days in a row gets you a very dry "achievement unlocked". | `video/out/02-commit-your-day.mp4` |
| 5 | The whole app is one 2,000-line HTML file. No framework, no build step. It opens instantly and I can read all of it. | `screenshots/desktop-light.png` |
| 6 | Did the subscription maths on journaling apps. $49.99 a year adds up to $249.95 over five. (Day One's entry plan, Oct 2026.) Daycell Pro: £12, once. | `video/out/03-subscription-math.mp4` |
| 7 | Why a file? Apps get acquired, repriced and shut down. A file just opens. | `images/out/ig-01-hook.png` |
| 8 | Two devices writing one file without a server: each save sends the version it last saw; if the other device saved first, it merges and retries. | text, or a short screen recording |
| 9 | Phone layout is done. 16px inputs so iOS doesn't zoom, actions always visible on touch. | `screenshots/phone-dark.png` |
| 10 | Launching [Tue 10 Nov]. Writing is free forever; Pro is £9 that week, then £12. | `images/out/story-launch.png` |

---

## Instagram captions

### Carousel: "A file just opens" (ig-01 → ig-04 → ig-02)
> Apps get acquired, repriced and shut down. A file just opens.
>
> Daycell keeps your whole journal in one plain markdown file on your device. No account, no cloud.
> Free to write, forever.
>
> Link in bio.
> #journaling #journalingapp #markdown #productivity #plaintext

### Single: prompt of the day (ig-03-prompt-n-*)
> Today's prompt: [prompt]
>
> Answer in the comments, or in your own journal. One line counts. 📓
> #journalprompts #dailyjournal #reflection

### Single: streak (ig-05-streak)
> Watch the habit show up. Every entry fills a square.
>
> Streaks, milestones and an "on this day" look-back, all from a file on your device.
> #journalinghabit #habittracker #dailyjournal

### Single: price (ig-02-price)
> Do the subscription maths once.
>
> Daycell: writing is free forever. Pro is £12, once. No renewal.
> (Comparison uses Day One's listed entry plan price, Oct 2026. Prices change.)
> #journalingapp #nosubscription

### Story: launch (story-launch)
Use the link sticker to the landing page. Only post the £9 story during launch week.

---

## Short video captions (TikTok, Reels, Shorts)

Hooks are on screen in the first second; captions add the rest.

| Video | Caption |
|---|---|
| `01-just-a-file.mp4` | where does your journal actually live? mine's a .md file. 📁 #journaling #markdown #obsidian #productivity |
| `02-commit-your-day.mp4` | if today had a commit message, what would it be? mine: feat: finally trusted myself #commityourday #devlife #journaling |
| `03-subscription-math.mp4` | your journal shouldn't cost rent. pay once, keep the file. #journalingapp #nosubscription |
| `04-app-demo-dark.mp4` | writing today's entry in a journal that looks like a code notebook #journaling #codinglife #productivity |
| `04-app-demo-light.mp4` | same app, light mode. which one are you? #journaling #lightmode #darkmode |

---

## `#commityourday` challenge (launch week → L+30)

**Kick-off post:**
> 30 days, one entry a day, any length. Post your streak grid every Sunday with #commityourday.
>
> One line counts. "fix: went outside" counts.
> Your entries stay private; only the grid gets shared.

Uses the free shareable streak image (insights panel → "share image: my streak"). It shows squares only, no entry text.

**Weekly Sunday post:** a recap with the week's prompt and reposts of people who shared (with their permission).

---

## Ongoing: prompt of the day

The app has 30 built-in prompts, and `images/templates/ig-03-prompt.html?n=0..7` renders them as cards. Post one a
day in Stories and once a week in the feed. Add more prompts to the template's list as the app gets them.
