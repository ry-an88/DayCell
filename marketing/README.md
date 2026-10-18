# Daycell marketing

Strategy, copy, images and videos for launching Daycell, plus the tools that made them. Everything is a **draft**:
nothing has been posted, listed or emailed. Dip publishes.

## Start here

1. **[STRATEGY.md](STRATEGY.md)**: positioning, audiences, the honest-persuasion rules, channels, the launch
   calendar (proposed launch: Tue 10 Nov 2026) and how to measure it.
2. **[copy/](copy/)**: ready-to-edit words.
   - [launch-posts.md](copy/launch-posts.md): Show HN, Product Hunt, four Reddit posts, a dev.to outline, reply snippets
   - [social.md](copy/social.md): launch thread, 10 build-in-public posts, Instagram and short-video captions, the `#commityourday` challenge
   - [landing.md](copy/landing.md): landing page words, A/B headlines, pricing table, FAQ, meta tags
   - [email.md](copy/email.md): three launch emails and a changelog template
   - [directories.md](copy/directories.md), [outreach.md](copy/outreach.md), [seo-pages.md](copy/seo-pages.md)
3. **[images/out/](images/out/)**: share image (1200×630), Instagram posts (1080×1350), a launch story (1080×1920),
   Product Hunt gallery images and an A3 print poster (PDF).
4. **[video/out/](video/out/)**: five vertical videos (1080×1920). Two are real recordings of the app, and `app-demo.gif` is a small loop for the GitHub README. Scripts for
   ten more are in [video/SCRIPTS.md](video/SCRIPTS.md).
5. **[screenshots/](screenshots/)**: the real app, desktop and phone, light and dark.
6. **[TOOLS.md](TOOLS.md)**: open-source tools and Claude Code skills for making more content.

All journal content in these assets is **made-up sample data** from `tools/demo-journal.mjs`. No real journal was
used.

## Making more

From the repo root, with Node, Playwright and FFmpeg installed:

```bash
# serve the app for screenshots and the app demo
npx http-server -p 5180 .

node marketing/tools/screenshots.mjs                 # → marketing/screenshots/*.png
node marketing/tools/app-demo.mjs --theme=dark       # → marketing/video/out/04-app-demo-dark.mp4

# any template → PNG / PDF / MP4 (the template's <meta> tags decide which)
node marketing/tools/render.mjs marketing/images/templates/og-image.html
node marketing/tools/render.mjs marketing/images/templates/ig-03-prompt.html --query=n=6
node marketing/tools/render.mjs marketing/images/templates/story-launch.html "--query=until=Mon 16 Nov"
node marketing/tools/render.mjs marketing/video/scenes/02-commit-your-day.html
```

Templates share [brand/brand.css](brand/brand.css) (the app's own colours and fonts: Inter and JetBrains Mono).
To make a new video, copy a scene in `video/scenes/`; each element appears at its `--at` time, and `data-type`
makes text type itself.

## Before anything goes out

- Fill every `[bracket]` with real details. Don't claim features that haven't shipped (sync,
  encryption, AI).
- Daycell is free with every feature (decided 2026-10-13). Older drafts in `copy/` still mention Pro and £12 in
  places; the Instagram and video captions in `copy/social.md` are up to date.
- Re-check the Day One price on its pricing page the week you post the comparison, and update the date.
