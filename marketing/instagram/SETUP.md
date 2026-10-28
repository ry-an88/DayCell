# Daycell on Instagram: setup, first posts, campaign and timeline

Everything here is a draft for Dip to act on. Nothing has been posted. Assets are in `marketing/images/out/` and
`marketing/video/out/`; the new profile picture and highlight covers are in `marketing/images/out/instagram/`.

## 1. Account setup (about 20 minutes)

1. Create the account with a **Professional account** (type: Creator or Business, category "App page" or "Software").
   That gives you insights, and lets you add a link and a contact button. Use a Daycell email, not your personal one.
2. Handle: pick the first one that's free (I can't check availability from here):
   `@daycell.app` (best: matches the domain) → `@daycell.md` → `@getdaycell` → `@daycellapp`.
   Use the same handle on X, Bluesky and TikTok if you can.
3. Name field (this is what search matches on, so put the keywords here): **Daycell · markdown journal**
4. Profile picture: upload one of three files (all 1080×1080, the `d/` logo inside the circle crop).
   - `profile-pic-dark.png`: **my pick**. Off-white tile on near-black. Matches the app and stays readable at 40px.
   - `profile-pic-teal.png`: dark tile on the teal accent. Stands out most in a feed of dark and white avatars.
   - `profile-pic-light.png`: dark tile on warm paper, matching the landing page.
5. Bio (limit 150 characters; this is 98):

   ```
   a journal that's just a .md file
   free · every feature · no account
   commit your day ↓
   ```

   Alternatives: `your journal, as one plain markdown file. free, no account, works offline. 📓` (89) or
   `notebook-style journaling. one .md file you own. no subscription.` (65).
6. Link: `https://daycell.app/?utm_source=ig&utm_medium=bio`. One link is enough. A link-in-bio tool (Linktree and
   similar) would only add a page between people and the app, so skip it. Instagram now allows several links; add
   `https://daycell.app/app/?utm_source=ig` as the second ("open the app") if you want a direct door in.
7. Contact: add your support email once it exists (it's on your list in `CLAUDE.md`). Don't add a phone number.
8. Highlights (the circles under the bio; covers are done, `highlight-*.png`). Fill them from the Stories you post at
   launch, in this order:

   | Highlight | Cover | What goes in it |
   |---|---|---|
   | start | ▶ | the 16s app-demo Reel, "how it works" screenshots |
   | file | .md | `ig-04-file`, the "a file just opens" story |
   | prompts | ? | the daily prompt cards (each one added as you post it) |
   | streak | ▦ | `ig-05-streak`, the `#commityourday` streak grids |
   | free | £0 | `ig-02-price`, the subscription maths, "free, every feature" |

9. Turn on: 2-step login, auto-captions on Reels, "suggest account to others" (Settings → Accounts Center / Privacy).
10. Post **9 pieces before you tell anyone** (see section 3). An empty grid converts badly; a full one looks real.

Honesty rules for the page (same as the strategy): no fake testimonials, no invented user numbers, no "as seen in".
Say "made by one person" and mean it. Don't name a competitor's UI; the Day One price comparison is fine if it's
labelled with its date.

## 2. Content: what exists and what's missing

**Ready to post now (no work needed):**

| Asset | Use as |
|---|---|
| `ig-01-hook.png`, `ig-04-file.png`, `ig-02-price.png` | Carousel "a file just opens" (caption in `copy/social.md`) |
| `ig-05-streak.png` | Single post, "watch the habit show up" |
| `ig-03-prompt-n-0…4.png` | Daily prompt cards (Stories daily, feed once a week) |
| `story-launch.png` | Launch-day story, with the link sticker |
| `01-just-a-file.mp4` | Reel 1: "where does your journal actually live?" |
| `02-commit-your-day.mp4` | Reel 2: the commit-message prompt |
| `03-subscription-math.mp4` | Reel 3: "your journal shouldn't cost rent" |
| `04-app-demo-dark.mp4`, `04-app-demo-light.mp4` | Reels 4 and 5: the real app, dark and light |
| `screenshots/*.png` | Carousel "a tour": desktop-dark, phone-light, insights |

Add music inside Instagram's own library when you post (it's licensed for the platform). Captions are already
written in `copy/social.md`.

**Still to create (I can make these when you say go):**

1. **"A tour of Daycell" carousel**, 6 slides from the real screenshots with one-line captions. Template: new.
2. **Prompt cards 5–7** (`ig-03-prompt.html?n=5..7`), to reach a week of Stories without repeating.
3. **Reel 6, "the changelog for my week"** and **Reel 7, "d d"** from `video/SCRIPTS.md` (scripts 6 and 7). Both
   buildable as scenes, no camera needed.
4. **Reel 8, "150 days in 15 seconds"**: the activity grid filling, from the real app.
5. **A "meet Daycell" story set** with the robot, once you decide how much of yourself goes on the page.
6. **Needs you:** a 15-second face-cam ("I didn't trust journal apps with my journal, so I made one that's just a text
   file", script 12), and a screen recording of the iPad pairing demo (script 13). Optional, but a human face is the
   single biggest trust boost for a one-person product.

## 3. First batch: 9 posts before launch

Post one a day or every other day, 26 Oct to 7 Nov (see timeline). Format, asset, caption source:

| # | Format | Asset | Hook / angle |
|---|---|---|---|
| 1 | Reel | `01-just-a-file.mp4` | "Where does your journal actually live?" |
| 2 | Carousel | ig-01 → ig-04 → ig-02 | "A file just opens." |
| 3 | Single | `ig-03-prompt-n-3.png` | A prompt as a question to the reader (comments invite) |
| 4 | Reel | `02-commit-your-day.mp4` | "If today had a commit message, what would it be?" |
| 5 | Single | `ig-05-streak.png` | "Watch the habit show up." |
| 6 | Reel | `04-app-demo-dark.mp4` | The real app, 16 seconds |
| 7 | Carousel | tour (to create) | "How it works in 6 screens" |
| 8 | Reel | `03-subscription-math.mp4` | "Your journal shouldn't cost rent." |
| 9 | Single or face-cam | story-launch / face-cam | "Launching 10 Nov. Free, every feature." |

Every post: 3–5 hashtags (`#journaling #journalingapp #markdown #plaintext #productivity`), one clear line of text,
and "link in bio" only where it's relevant. Reels are what reach new people; carousels get saved and shared.

### 3b. The five videos: exactly what to post

All five are 1080×1920, under 20 seconds, so they work as Instagram Reels, TikToks and YouTube Shorts. The files are in
`marketing/video/out/` and copied to the project folder `instagram/videos/`. Post each one as a **Reel** (not a feed
video), and paste the caption exactly as written. Captions and hashtags below are final; swap nothing but the
`[bracketed]` bits.

For every Reel:
- **Audio:** pick a quiet, instrumental track from Instagram's own music library (it's licensed there). Turn the
  volume of the track down to about 15–20% so the on-screen text carries it. There's no voiceover.
- **Cover:** pick a frame with the hook text visible (usually the first second), then crop it so the text sits in the
  middle 4:5 area, because the profile grid shows a centred 4:5 crop.
- **Captions:** switch on auto-captions only if the Reel has speech. These don't, so leave them off.
- **Share to feed:** on. **Also share to Facebook:** your choice. **Alt text:** use the line given below.
- **Tag/location:** none. Don't tag competitors.
- **First comment (pin it):** the link line in each post below, so the caption stays clean. Instagram doesn't make
  caption links clickable, so the real link is in your bio and in the pinned comment as a text prompt.
- **Time:** weekday evening about 18:00–20:00 UK, or lunchtime about 12:00. That's a common default, not a measured
  one for your audience. After two weeks, check Insights → Followers → Most active times and move to those.

| # | File | Length | On-screen hook | Post when |
|---|---|---|---|---|
| 1 | `01-just-a-file.mp4` | 17s | "Where does your journal actually live?" | Mon 26 Oct (or your first posting day) |
| 2 | `02-commit-your-day.mp4` | 16s | "If today had a commit message…" | Mon 2 Nov |
| 3 | `04-app-demo-dark.mp4` | 16s | the real app on a phone | Fri 6 Nov |
| 4 | `03-subscription-math.mp4` | 15s | "Your journal shouldn't cost rent." | Mon 9 Nov |
| 5 | `04-app-demo-light.mp4` | 16s | same app, light mode | Fri 13 Nov (launch week + 3) |

(If your first post is later than 26 Oct, keep the order and the gaps and slide every date.)

#### Reel 1: `01-just-a-file.mp4`
**Caption**
```
where does your journal actually live?

mine's a .md file. one plain text file on my device. no account, no cloud, no company in the middle.

open it in anything, back it up anywhere, keep it for decades.

daycell is free, with every feature. link in bio.

#journaling #markdown #plaintext #obsidian #productivity
```
**Alt text:** An entry types itself in a notebook-style journal, then the same entry appears as a plain markdown file.
**Pinned comment:** `try it in your browser, no sign-up: daycell.app`

#### Reel 2: `02-commit-your-day.mp4`
**Caption**
```
if today had a commit message, what would it be?

mine: feat: finally trusted myself

answer in the comments. one line counts. 📓

#commityourday #journaling #devlife #dailyjournal #journalprompts
```
**Alt text:** A journal prompt asks "if today had a commit message, what would it be?", an answer is typed, and today's square fills in the streak grid.
**Pinned comment:** `daycell.app is free, with every feature. link in bio.`
This Reel is the seed for the `#commityourday` habit, so it matters most for replies. Answer every comment.

#### Reel 3: `04-app-demo-dark.mp4` (the real app)
**Caption**
```
writing today's entry in a journal that looks like a code notebook.

each day is a cell. shift+enter to commit. your whole journal stays in one markdown file you own.

free, every feature, no account.

#journaling #journalingapp #codinglife #productivity #markdown
```
**Alt text:** Screen recording of Daycell on a phone: a new entry is written from a prompt, a mood and a tag are added, it is committed, and the insights panel opens.
**Pinned comment:** `try it free in your browser: daycell.app`

#### Reel 4: `03-subscription-math.mp4`
**Caption**
```
do the subscription maths once.

$49.99 a year is $249.95 over five. (Day One's entry plan, as listed in October 2026. prices change.)

daycell: £0. every feature. no subscription, no paywall.

#journalingapp #nosubscription #journaling #productivity #plaintext
```
**Alt text:** A running total of a journaling subscription counts up year by year to $249.95, next to Daycell's price of £0.
**Pinned comment:** `daycell.app. free, with every feature.`
**Before you post:** re-check Day One's price on their pricing page that week. If it changed, tell me and I'll
re-render the video and fix the caption. Don't post a price comparison you haven't checked.

#### Reel 5: `04-app-demo-light.mp4`
**Caption**
```
same app, light mode. which one are you? ☀️🌙

(it follows your device by default, and you can switch in the app.)

#journaling #journalingapp #lightmode #darkmode #productivity
```
**Alt text:** The same Daycell journal entry flow as before, shown in the light theme.
**Pinned comment:** `daycell.app`
Add a Story poll the same day ("dark or light?") to get replies.

#### Posting the same videos elsewhere
- **TikTok and YouTube Shorts:** upload the original `.mp4` from `video/out/` (not a screen-recording of Instagram, which
  adds a watermark). Use the same caption and 3–4 hashtags. On YouTube, add `#Shorts` and put `daycell.app` first in
  the description.
- **X and Bluesky:** attach the video to the launch-thread post that matches it (see `copy/social.md`).

### 3c. The image posts: exactly what to post

Same rules as the Reels: paste the caption as written, add the alt text, pin the comment. Posts #2, #3, #5, #7 and #9
in the table in section 3 are these. Normal capitalisation here (the Reel captions are lowercase; a mixed grid is fine).

#### Post 2: carousel "A file just opens" (Wed 28 Oct)
**Slides, in order:** `ig-01-hook.png` → `ig-04-file.png` → `ig-02-price.png`
**Caption**
```
Apps get acquired, repriced and shut down. A file just opens.

Daycell keeps your whole journal in one plain markdown file on your device. No account, no cloud. Free, with every feature.

(Price on the last slide: Day One's listed entry plan, October 2026. Prices change.)

Link in bio.

#journaling #journalingapp #markdown #productivity #plaintext
```
**Alt text:** Three slides: "Apps get acquired, repriced and shut down. A file just opens.", a journal entry shown as a plain markdown file, and a subscription price compared with Daycell's £0.
**Pinned comment:** `try it in your browser, no sign-up: daycell.app`
**Before you post:** re-check Day One's price (the last slide quotes it).

#### Post 3: prompt card (Fri 30 Oct) — `ig-03-prompt-n-3.png`
**Caption**
```
Today's prompt: what's running in the background of your mind?

Answer in the comments, or in your own journal. One line counts. 📓

Daycell has a prompt a day built in, free. Link in bio.

#journalprompts #dailyjournal #reflection #journaling #mindfulness
```
**Alt text:** A card reading "what's running in the background of your mind?" in the Daycell notebook style.
**Pinned comment:** `one line is plenty. what's yours?`
Reply to every answer. A reply to a comment is worth more here than the post itself.

#### Post 5: streak single (Wed 4 Nov) — `ig-05-streak.png`
**Caption**
```
Watch the habit show up. Every entry fills a square.

Streaks, milestones and an "on this day" look-back, all from a plain file on your device. Free, no account.

Link in bio.

#journalinghabit #habittracker #dailyjournal #journaling #productivity
```
**Alt text:** A grid of squares filling in day by day, one square for every journal entry written.
**Pinned comment:** `how long is your longest streak? mine's...` (fill in your real number, or leave the line out)

#### Post 7: the tour carousel (Sun 8 Nov) — **not made yet, ask me to build it**
It uses the real app screenshots. Caption to use once it exists:
```
How Daycell works, in 6 screens.

Each day is a cell. Write, tag it, commit it with shift+enter. Your whole journal stays in one markdown file you own.

Free, every feature, no account. Link in bio.

#journalingapp #journaling #markdown #productivity #plaintext
```
**Alt text:** Six screenshots of the Daycell app: writing an entry, choosing a mood, the activity grid, insights, the markdown file and the light theme.

#### Post 9 and Story: launch (Tue 10 Nov) — `story-launch.png`
**Feed caption (use the image as a single post)**
```
Daycell is live. 📓

A journal that's just a markdown file. Notebook-style daily writing, no account, no subscription, works offline.

Free, with every feature. Try it in your browser: link in bio.

Made by one person. Tell me what you'd change.

#journaling #journalingapp #markdown #nosubscription #productivity
```
**Alt text:** "Now live. Daycell: a journal that's just a .md file. Free, every feature." on a notebook-style background.
**Story:** the same image with a **link sticker** to `https://daycell.app/?utm_source=ig-story`. Add a "share your first entry" prompt sticker if you like.
**Pinned comment:** `try it in your browser, no sign-up: daycell.app`

#### Daily prompt-card Stories (cards 0, 1, 2 and 4)
Post one card a day in Stories (add a question sticker so people can reply). Use this text as the sticker prompt, with
no hashtags needed on Stories:

| Card | Story text (on the sticker) |
|---|---|
| `ig-03-prompt-n-0.png` | "if today had a commit message, what would it be?" |
| `ig-03-prompt-n-1.png` | "what did you debug in your life today?" |
| `ig-03-prompt-n-2.png` | "what's one thing you'd refactor about today?" |
| `ig-03-prompt-n-4.png` | "write the changelog for this week." |

Once a week, turn one of these into a feed post with the caption from Post 3, swapping in the card's prompt.

#### Don'ts
- Don't post a Reel without checking it plays with the sound off and the text is readable on a phone.
- Don't use a trending sound that isn't in Instagram's library for business accounts; it can be muted or flagged.
- Don't reply to comments with a link to a competitor, or argue about price. Say what Daycell does and move on.
- Don't write that you have users, reviews or press. You can say "free, every feature, no account", because it's true.

## 4. Campaign strategy

**Goal (be modest):** a small, real audience that sends people to daycell.app and feeds the `#commityourday` habit
loop. Targets by 30 days after launch: 300–500 followers, 1,000 profile visits, 150 link clicks (tagged
`utm_source=ig`), 20 `#commityourday` posts from other people. If you're below half of these after 6 weeks, drop to
Stories-only and put the time into Reddit and Hacker News instead (see `STRATEGY.md`).

**Who we talk to:** two groups on Instagram, not the developer crowd on HN.
1. *Subscription-tired journalers*: "free, every feature, no account" is the hook.
2. *Plain-text and productivity people* (Obsidian, notes, markdown): "it's just a file" is the hook.

**Content pillars (rotate, one idea per post):**
1. *Show it*: real-app clips and screenshots (the product is visual).
2. *The file*: privacy and ownership, "a file just opens".
3. *The habit*: prompts, streaks, `#commityourday`. This is what turns viewers into users.
4. *Honest maker*: short build-in-public notes. Real, small, no hype.

**Cadence:** 3 feed posts a week (2 Reels + 1 carousel or single), a prompt-card Story most days. About 2 hours a
week once the batch is made; I can generate the next batch each month.

**Engagement (the part people skip):** 10 minutes a day replying to every comment and DM, and leaving real comments
on 5 journaling, Obsidian and productivity accounts. No follow/unfollow tricks, no engagement pods, no bought
followers.

**The `#commityourday` loop:** week 1 of launch, post the kick-off text (in `copy/social.md`), invite people to share
their streak grid image from the app's insights panel (squares only, never entry text), and repost with permission
every Sunday.

**Cross-promotion:** the same Reels go to TikTok and YouTube Shorts (remove the Instagram watermark by exporting from
the file, not by re-recording), and the best carousel frames go to X and Bluesky.

**Measure weekly (Instagram Insights + Umami):** reach per Reel, saves and shares (more important than likes), profile
visits, link clicks, and `utm_source=ig` visits to the app. Double down on the format with the most saves; drop what
gets under 100 views after 3 tries.

**Paid:** none to start. If you ever test ads, wait until one Reel has organic proof and spend a fixed £30, not more.

## 5. Timeline (L = launch day, proposed Tue 10 Nov 2026; shift every date if you launch earlier or later)

| When | Do |
|---|---|
| **Tue 20 – Sat 24 Oct** | Create the account, profile picture, bio, link. Upload highlight covers (empty for now). Tell me to build the missing assets (section 2). Decide face or no face. |
| **Mon 26 Oct** | Post #1 (Reel: just a file). Start Stories: one prompt card a day. |
| **Wed 28 Oct** | Post #2 (carousel). |
| **Fri 30 Oct** | Post #3 (prompt single). |
| **Mon 2 Nov** | Post #4 (Reel: commit message). |
| **Wed 4 Nov** | Post #5 (streak). |
| **Fri 6 Nov** | Post #6 (real-app Reel). Tell your friends and anyone from your own network to follow. |
| **Sun 8 Nov** | Post #7 (tour carousel). Story poll: "morning or evening writer?" |
| **Mon 9 Nov** | Post #8 (subscription maths Reel). Story countdown sticker to launch. |
| **L − 1: Mon 9 Nov, evening** | Pin the carousel and the real-app Reel. Check the link opens daycell.app on a phone. |
| **L: Tue 10 Nov** | Post #9 (launch single + story with link sticker). Same-day posts on X and Bluesky. Reply to every comment within the hour. |
| **L + 1 – L + 6** | Daily Story (prompt card or a customer-free "what's new"). Kick off `#commityourday` on L + 1 (Wed 11 Nov). |
| **Sun 15 Nov** | First weekly `#commityourday` recap. Review insights: which Reel got the most saves? |
| **L + 7 – L + 30** | 3 posts a week, weekly Sunday recap, monthly asset batch (ask me). Fill the highlights as stories accumulate. |
| **Mon 8 Dec (L + 28)** | Retro: compare to the targets above and decide: keep, shrink to Stories-only, or stop. |

Dip-only actions, never mine: creating the accounts, posting, replying, and changing the launch date.
