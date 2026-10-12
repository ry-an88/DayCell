# Open-source tools and Claude Code skills for making content

Researched 11 Oct 2026. Licences marked ✓ were checked against a source tonight; the rest are from memory and should
be confirmed on the project's own page before relying on them. **Read every third-party skill's `SKILL.md` before
installing it**: skills run with Claude's permissions, and quality varies a lot.

## What we already use (in this folder, zero setup)

| Tool | What it does here |
|---|---|
| `tools/render.mjs` | Renders any HTML template to PNG, PDF (print) or MP4. Animations are plain CSS; the renderer seeks them frame by frame, so videos are deterministic. Same idea as Remotion, with no framework and no licence questions. |
| `tools/app-demo.mjs` | Drives the **real app** with Playwright and records a smooth vertical video of writing an entry. |
| `tools/screenshots.mjs` | Takes desktop and phone screenshots of the real app in light and dark. |
| `tools/demo-journal.mjs` | Generates a believable, clearly fictional journal so no real entries ever appear in marketing. |
| Playwright + FFmpeg + Chromium | Already installed in Claude's cloud sessions; on Windows, `npm i -D playwright` and install FFmpeg (`winget install ffmpeg`). |

**Recommendation:** keep using these for most content. Real UI footage is the most persuasive and most honest asset
a product like Daycell has, and the tooling is already done.

---

## Claude Code skills

| Skill / repo | Use for Daycell | Licence | Install |
|---|---|---|---|
| **anthropics/skills** → `canvas-design` | Posters and static art as PNG/PDF from a design brief. | Apache-2.0 (verify per skill) | `/plugin marketplace add anthropics/skills`, then install the plugin |
| **anthropics/skills** → `frontend-design` | The landing page: pushes toward a distinctive design instead of a template look. | same | same |
| **anthropics/skills** → `theme-factory` | Extra Pro themes and colourways for social templates. | same | same |
| **anthropics/skills** → `algorithmic-art` | Generative backgrounds (e.g. a "year in cells" art print) with p5.js. | same | same |
| **anthropics/skills** → `slack-gif-creator` | Small looping GIFs; works for README and X too. | same | same |
| **anthropics/skills** → `webapp-testing` | Playwright-driven checks of the landing page before launch. | same | same |
| **anthropics/skills** → `skill-creator` | Turn our render pipeline into a project skill ("make a Daycell promo video"). | same | same |
| **remotion-dev/skills** + `remotion-dev/claude-code-plugin` | Official Remotion skills: lets Claude write and render React-based videos. | Remotion licence: free for individuals and small companies, paid above that; check remotion.dev/license | `claude plugin marketplace add remotion-dev/claude-code-plugin` then `claude plugin install remotion@remotion` |
| **digitalsamba/claude-code-video-toolkit** ✓ | A full video pipeline for Claude Code: Remotion, FFmpeg, Playwright recording, TTS, music and AI video. Many parts run on paid cloud GPUs (Modal/RunPod), so treat as optional. | MIT ✓ | `git clone` the repo, `/setup` inside it |
| **coreyhaines31/marketingskills** | A large set of marketing skills (copywriting, launch strategy, pricing pages, SEO, emails). Good for second drafts of `copy/`. | check repo | `npx add-skill coreyhaines31/marketingskills --list` |
| **AgriciDaniel/claude-seo** ✓ | SEO audits, schema (JSON-LD), page checks for the landing and `/guides/` pages once live. | MIT ✓ | per its README |
| **ComposioHQ/awesome-claude-skills** | An index to browse for anything else (e.g. `content-research-writer`). | index | — |

Not recommended for now: AI-avatar/UGC-ad skills. Fake "customer" videos would break the honesty rules in
`STRATEGY.md`.

---

## Video

| Tool | Use | Licence |
|---|---|---|
| **Remotion** | React components → MP4. Best if videos get complex or need data-driven variants. | Free for individuals/small companies; company licence above a threshold ✓ (check terms) |
| **Motion Canvas** | Code-driven animation with a live editor; great for explainer-style motion. | MIT ✓ |
| **Revideo** | Motion Canvas fork with a server rendering API and templates. | MIT ✓ |
| **FFmpeg** | Encoding, trimming, captions, GIFs, resizing for each platform. | LGPL/GPL |
| **OBS Studio** | Screen and face-cam recording for founder videos. | GPL |
| **Kdenlive** / **Shotcut** | Free desktop editors for cutting face-cam and B-roll. | GPL |

## Images, posters, design

| Tool | Use | Licence |
|---|---|---|
| **Penpot** | Open-source Figma alternative for landing-page mockups. | MPL-2.0 |
| **Excalidraw** | Hand-drawn diagrams ("how saving works") for posts and docs. | MIT |
| **Inkscape** / **GIMP** | Vector posters / photo edits. | GPL |
| **Satori** (vercel) | JSX → SVG for dynamic OG images if the landing page needs per-page share images. | MPL-2.0 |
| **FLUX.1 [schnell]** | Open-weight image generation for abstract backgrounds or mood imagery. The `[dev]` variant is non-commercial, so use `[schnell]`. | Apache-2.0 (schnell only) |

Use AI imagery sparingly. Daycell's design taste is techy and minimal; real UI beats generated art, and generated
"people journaling" photos would read as stock filler.

## Voice and music

| Tool | Use | Licence |
|---|---|---|
| **Kokoro TTS** (82M) | Natural-sounding voiceover, runs on a CPU. | Apache-2.0 ✓ |
| **Piper TTS** | Faster, more robotic; fine for drafts. | GPL-3.0 (maintained fork) ✓ |
| **Pixabay Music**, **Free Music Archive** (CC0 filter) | Background tracks. Platform sound libraries (TikTok, Instagram) are fine when posting there. | per track |

## Publishing and measuring

| Tool | Use | Licence |
|---|---|---|
| **Postiz** | Self-hosted social scheduler (X, Bluesky, Instagram, TikTok, LinkedIn…). | AGPL-3.0 |
| **Mixpost** (Lite) | Alternative self-hosted scheduler. | check |
| **LittleLink** | Open-source link-in-bio page; host it on the same Netlify site. | MIT |
| **Umami** / **Plausible** / **GoatCounter** | Cookie-free analytics (from the launch plan). | MIT / AGPL / EUPL |
| **Listmonk** | Self-hosted newsletter if Buttondown's free tier runs out. | AGPL-3.0 |

Self-hosting a scheduler is optional; at launch scale, posting by hand is fine and keeps every post deliberate.

---

## Sources

- [How to use Remotion agent skills with Claude Code (Tella)](https://www.tella.com/blog/how-to-use-remotion-agent-skills-with-claude-code.md)
- [Remotion vs Motion Canvas vs Revideo, 2026 (PkgPulse)](https://www.pkgpulse.com/guides/remotion-vs-motion-canvas-vs-revideo-programmatic-video-2026)
- [claude-code-video-toolkit README (digitalsamba)](https://cdn.jsdelivr.net/gh/digitalsamba/claude-code-video-toolkit@main/README.md)
- [A tour of Anthropic's official skills (codenote)](https://codenote.net/en/posts/anthropic-official-skills-catalog-overview/)
- [Best Claude skills for marketers, 2026](https://www.rabinarayanpatra.com/blogs/best-claude-skills-for-marketers-2026)
- [Marketing skills for Claude Code (AI Engineer Guide)](https://aiengineerguide.com/til/marketing-skills-for-claude-code/)
- [Piper vs Kokoro TTS](https://www.promptquorum.com/power-local-llm/piper-vs-kokoro-tts)
