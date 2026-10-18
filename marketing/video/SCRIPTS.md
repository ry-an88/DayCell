# Video scripts

Vertical 1080×1920, 12–20 seconds, no voiceover needed (most people watch muted), captions burned in where there's
speech. Hook on screen in the first second; product visible by second three; one idea per video.

## Rendered drafts (in `out/`)

| File | Length | Idea | Made with |
|---|---|---|---|
| `01-just-a-file.mp4` | 17s | "Where does your journal actually live?" → an entry types itself → the same entry as markdown on disk → "Opens in 2050." | `scenes/01-just-a-file.html` |
| `02-commit-your-day.mp4` | 16s | The commit-message prompt, an answer typed, Shift+Enter, "committed. your future self says thanks.", the 30th square fills. | `scenes/02-commit-your-day.html` |
| `03-subscription-math.mp4` | 15s | A subscription total ticks up year by year ($49.99 → $249.95) next to Daycell's £0. | `scenes/03-subscription-math.html` |
| `04-app-demo-dark.mp4` | 16s | The **real app** on a phone layout: new entry from a prompt, mood, body, tag, commit, insights. | `tools/app-demo.mjs --theme=dark` |
| `04-app-demo-light.mp4` | 16s | Same, light theme. | `tools/app-demo.mjs --theme=light` |

These have no music. Add a track in CapCut/TikTok's own library when posting (their licensed sounds are cleared for
that platform), or use a CC0 track from Pixabay Music / Free Music Archive for YouTube.

To change text or timing, edit the scene HTML (each element has `--at` = when it appears) and re-render:
`node marketing/tools/render.mjs marketing/video/scenes/02-commit-your-day.html`.

---

## More scripts to make next

Each line is: **on-screen hook** · what we see · end card. Scripts 5–9 can be built as scenes like the drafts above;
10–14 need Dip on camera or screen-recording on a real device.

5. **"POV: your journal app got acquired"** · a toast "terms of service updated" over a generic app, cut to the
   Daycell file opening in Notepad · "A file just opens." (Don't name or show a real competitor's UI.)
6. **"The changelog for my week"** · an entry in the app: **Added** a Sunday walk / **Fixed** checking my phone first
   thing / **Removed** two meetings · "Write the changelog for your week."
7. **"d d"** · keyboard close-up overlay: `d d` moves an entry to trash, toast "binned. not gone, just resting.",
   undo · "Your journal has an undo button."
8. **"150 days in 15 seconds"** · the activity grid fills day by day with a ticking date, milestones pop at 7, 30,
   100 · "Watch the habit show up."
9. **"Prompts for people who think in code"** · 5 prompts flash one per second, last one stays · "30 prompts built in."
10. **"Journal in git"** (dev audience) · terminal: `git log --oneline journal.md` shows a month of daily commits ·
    "Every day, a real commit."
11. **"I opened my journal in Obsidian"** · split screen, Daycell left, Obsidian right, same entry, Dataview mood
    table · "Same file. Both apps."
12. **Founder face-cam, 15s:** "I didn't trust journal apps with my journal, so I made one that's just a text file.
    Here's what it looks like." · real screen.
13. **iPad on the sofa** · hand writes an entry on the iPad, the laptop on the desk shows it arrive (launcher LAN
    mode) · "One file. Two devices. No cloud."
14. **Launch day: "now live"** · `images/out/story-launch.png` as a 6-second still with a slow zoom ·
    "daycell.app".

## Hooks bank (first 1–2 seconds)

- Where does your journal actually live?
- Your journal shouldn't cost rent.
- If today had a commit message, what would it be?
- I made a journal app with no database.
- Apps get shut down. Files don't care.
- The most private journal app is a text file.
- Stop renting your diary.
